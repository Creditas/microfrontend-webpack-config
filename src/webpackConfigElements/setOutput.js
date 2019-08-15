const path = require('path');

const target = (rootApp, name) => {
  if (rootApp) {
    return {};
  }
  return {
    library: name,
    libraryTarget: 'amd',
  };
};

const setOutput = (config, {envs, name}) => {
  const rootFileName = 'index.root.js';
  const moduleFileName = 'index.singlespa.js';
  const filename = envs.rootApp ? rootFileName : moduleFileName;

  const output = {
    output: {
      filename,
      path: path.resolve(process.cwd(), 'build'),
      ...target(envs.rootApp, name),
    },
  };

  return {
    ...config,
    ...output,
  };
};

module.exports = {
  setOutput,
};
