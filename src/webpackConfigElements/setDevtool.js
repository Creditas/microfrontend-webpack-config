const setDevtool = config => {
  return {
    ...config,
    devtool: 'source-map',
  }
}

module.exports = {setDevtool}
