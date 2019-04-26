const path = require('path')
const autoprefixer = require('autoprefixer')

const setModule = (config, {name}) => {
  return {
    ...config,
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: [path.resolve(process.cwd(), 'node_modules')],
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
        {
          parser: {
            system: false,
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
                  return [autoprefixer]
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
  }
}

module.exports = {setModule}
