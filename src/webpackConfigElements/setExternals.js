const externals = (isDevServer, rootApp) => {
  if (isDevServer || rootApp) {
    return {};
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
  };
};

const setExternals = ({envs}) => config => {
  return {
    ...config,
    ...externals(envs.isDevServer, envs.rootApp),
  };
};

module.exports = {setExternals};
