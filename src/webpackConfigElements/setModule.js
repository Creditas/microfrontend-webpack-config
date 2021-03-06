const path = require('path');
const autoprefixer = require('autoprefixer');

const setModule = ({name}) => config => {
  return {
    ...config,
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: [path.resolve(process.cwd(), 'node_modules')],
          loader: require.resolve('babel-loader'),
        },
        {
          parser: {
            system: false,
          },
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        {
          test: /\.css$/,
          exclude: [path.resolve(process.cwd(), 'node_modules'), /\.krem.css$/],
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [autoprefixer];
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          include: [path.resolve(process.cwd(), 'node_modules')],
          exclude: [/\.krem.css$/],
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.krem.css$/,
          exclude: [path.resolve(process.cwd(), 'node_modules')],
          use: [
            {
              loader: 'kremling-loader',
              options: {
                namespace: name,
                postcss: {
                  plugins: {
                    autoprefixer: {},
                  },
                },
              },
            },
          ],
        },
      ],
    },
  };
};

module.exports = {setModule};
