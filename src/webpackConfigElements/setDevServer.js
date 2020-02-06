const devServer = isDevServer => {
  if (!isDevServer) {
    return {}
  }

  return {
    devServer: {
      contentBase: './build',
      historyApiFallback: true,
      port: 3000,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  }
}

const setDevServer = ({envs}) => config => {
  return {
    ...config,
    ...devServer(envs.isDevServer),
  }
}

module.exports = {setDevServer}
