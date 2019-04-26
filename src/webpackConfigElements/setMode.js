const setMode = (config, {envs}) => {
  return {
    ...config,
    mode: envs.dev || envs.isDevServer ? 'development' : 'production',
  }
}

module.exports = {
  setMode,
}
