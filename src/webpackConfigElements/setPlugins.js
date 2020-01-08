const path = require('path');
const {
  BannerPlugin,
  NamedModulesPlugin,
  HotModuleReplacementPlugin,
} = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const DotEnvPlugin = require('dotenv-webpack');
const {UnusedFilesWebpackPlugin} = require('unused-files-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const setPlugins = (config, {envs, dotEnvFile}) => {
  return {
    ...config,
    plugins: [
      new CleanWebpackPlugin(),
      new DotEnvPlugin({
        path: dotEnvFile,
      }),
      new BannerPlugin({
        banner: '"format amd";',
        raw: true,
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: envs.analyze || 'disabled',
      }),
      !envs.rootApp &&
        new UnusedFilesWebpackPlugin({
          globOptions: {
            cwd: path.resolve(process.cwd(), 'src'),
            ignore: [
              '**/*.test.js',
              '**/*.spec.js',
              '**/*.js.snap',
              '**/test-setup.js',
              '**/index.root.js',
            ],
          },
        }),
      new HtmlWebpackPlugin({
        template: path.resolve(process.cwd(), './public/index.html'),
      }),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, envs),
      envs.isDevServer && new NamedModulesPlugin(),
      envs.isDevServer && new HotModuleReplacementPlugin(),
      envs.rootApp &&
        new CopyWebpackPlugin([
          {from: path.resolve(process.cwd(), './public')},
        ]),
    ].filter(Boolean),
  };
};

module.exports = {setPlugins};
