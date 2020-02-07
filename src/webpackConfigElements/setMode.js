const setMode = ({envs}) => config => {
  return {
    ...config,
    mode: envs.dev || envs.isDevServer ? 'development' : 'production',
  }
}

module.exports = {
  setMode,
}
