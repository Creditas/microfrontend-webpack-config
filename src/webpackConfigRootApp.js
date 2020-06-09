const merge = require('webpack-merge');
const dotEnv = require('dotenv');
const R = require('ramda');
const path = require('path');
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

let isDevServer = false;

if (process.argv.some(arg => arg.includes('webpack-dev-server'))) {
  isDevServer = true;
}

const webpackConfigRootApp = (overridesConfig = {}) => {
  if (isNotObjFn(overridesConfig)) {
    throw new Error(errorParamOverrides(overridesConfig));
  }

  return (env = {}) => {
    let localEnvs = {
      rootApp: true,
      PUBLIC_URL: '',
      isDevServer,
      ...process.env,
      ...env,
    };
    const {environment} = localEnvs;
    const dotEnvFile = getEnvFile(environment);
    const debug = log(localEnvs.debug);
    const resultEnv = dotEnv.config({
      path: path.resolve(process.cwd(), dotEnvFile),
    });

    const envs = {...localEnvs, ...resultEnv.parsed};
    debug({envs});

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
