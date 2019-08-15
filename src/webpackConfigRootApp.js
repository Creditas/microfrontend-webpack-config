const merge = require('webpack-merge');
const dotEnv = require('dotenv');
const {errorParamName, errorParamOverrides} = require('./messages');
const {isNotString, isNotObjFn, isFn, getEnvFile, log} = require('./helpers');
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

    let defaultConfig = {};

    // mode
    defaultConfig = setMode(defaultConfig, {envs});

    // entry
    defaultConfig = setEntry(defaultConfig, {envs});

    // output
    defaultConfig = setOutput(defaultConfig, {envs});

    // module
    defaultConfig = setModule(defaultConfig, {envs});

    // resolve
    defaultConfig = setResolve(defaultConfig, {envs});

    // plugins
    defaultConfig = setPlugins(defaultConfig, {envs, dotEnvFile});

    // devtool
    defaultConfig = setDevtool(defaultConfig, {envs});

    // externals
    defaultConfig = setExternals(defaultConfig, {envs});

    // devServer
    defaultConfig = setDevServer(defaultConfig, {envs});

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
