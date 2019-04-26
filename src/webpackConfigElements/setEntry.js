const path = require('path')

const setEntry = (config, {envs}) => {
  return {
    ...config,
    entry: path.resolve(
      process.cwd(),
      envs.standalone ? './src/index.js' : './src/index.singlespa.js',
    ),
  }
}

module.exports = {setEntry}
