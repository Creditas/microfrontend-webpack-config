const path = require('path')

const target = (standalone, name) => {
  if (standalone) {
    return {}
  }
  return {
    library: name,
    libraryTarget: 'amd',
  }
}

const setOutput = (config, {envs, name}) => {
  const output = {
    output: {
      filename: 'index.singlespa.js',
      path: path.resolve(process.cwd(), 'build'),
      ...target(envs.standalone, name),
    },
  }

  return {
    ...config,
    ...output,
  }
}

module.exports = {
  setOutput,
}
