const path = require('path')

const target = standalone => {
  if (standalone) {
    return {}
  }
  return {
    libraryTarget: 'amd',
  }
}

const setOutput = (config, {envs, name}) => {
  const output = {
    output: {
      filename: 'index.singlespa.js',
      library: name,
      path: path.resolve(process.cwd(), 'build'),
      ...target(envs.standalone),
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
