const path = require('path');

const setEntry = (config, {envs}) => {
  const rootFile = './src/index.root.js';
  const moduleFile = './src/index.singlespa.js';
  const entryFile = envs.rootApp ? rootFile : moduleFile;

  return {
    ...config,
    entry: path.resolve(process.cwd(), entryFile),
  };
};

module.exports = {setEntry};
