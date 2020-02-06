const merge = require('webpack-merge');
const dotEnv = require('dotenv');
const R = require('ramda');
const {errorParamOverrides} = require('./messages');
const {isNotObjFn, isFn, getEnvFile, log} = require('./helpers');
const {
  setMode,
  setEntry,
  setOutput,
  setModule,
  setResolve,
  setPlugins,
  setDevtool,
  setExternals,
  setDevServer,
} = require('./webpackConfigElements');

dotEnv.config();

let isDevServer = false;

if (process.argv.some(arg => arg.includes('webpack-dev-server'))) {
  isDevServer = true;
}

const webpackConfigRootApp = (overridesConfig = {}) => {
  if (isNotObjFn(overridesConfig)) {
    throw new Error(errorParamOverrides(overridesConfig));
  }

  return (env = {}) => {
    const envs = {
      rootApp: true,
      PUBLIC_URL: '',
      isDevServer,
      ...process.env,
      ...env,
    };
    const {environment} = envs;
    const dotEnvFile = getEnvFile(environment);
    const debug = log(envs.debug);

    let defaultConfig = R.pipe(
      setMode({envs}), // mode
      setEntry({envs}), // entry
      setOutput({envs}), // output
      setModule({envs}), // module
      setResolve, // resolve
      setPlugins({envs, dotEnvFile}), // plugins
      setDevtool, // devtool
      setExternals({envs}), // externals
      setDevServer({envs}), // devServer
    )({});

    overridesConfig = isFn(overridesConfig)
      ? overridesConfig(envs)
      : overridesConfig;

    const finalConfig = merge.smart(defaultConfig, overridesConfig);

    debug({name: 'root', overridesConfig});
    debug({finalConfig: JSON.stringify(finalConfig)});

    return finalConfig;
  };
};

module.exports = {
  webpackConfigRootApp,
};
