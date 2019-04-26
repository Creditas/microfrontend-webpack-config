const externals = isDevServer => {
  if (isDevServer) {
    return {}
  }

  return {
    externals: [
      /^.+!sofe$/,
      /^single-spa$/,
      /^react$/,
      /^react\/lib.*/,
      /^react-dom$/,
      /.*react-dom.*/,
    ],
  }
}

const setExternals = (config, {envs}) => {
  return {
    ...config,
    ...externals(envs.isDevServer),
  }
}

module.exports = {setExternals}
