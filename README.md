# microfrontend-webpack-config
Some defaults for webpack configs at Creditas.

## Usage
First, install the library as a devDependency.
```bash
yarn add --dev @creditas/microfrontend-webpack-config @babel/runtime @babel/plugin-transform-runtime
```

Now create a webpack.config.js file. This file will use @creditas/microfrontned-webpack-config and allow you to override anything you want to about the defaults. Inside of the
file, call the `webpackConfigModuleApp()` function to get some defaults and add/override to your webpack config. See example below:

```js
// webpack.config.js

const {webpackConfigModuleApp} = require('@creditas/microfront-webpack-config')

module.exports = webpackConfigModuleApp('calculator', {
  // Override or add anything you want to your webpack config
  module: {
    rules: [
      // e.g. apply a css loader if using css-modules
      {loader: 'css-loader'},
    ],
  },
})
```

Finally, create the following `scripts` in your package.json:

```json
{
  "scripts": {
    "start": "webpack-dev-server --config ./webpack.config.js --env.standalone",
    "start:single-spa": "webpack-dev-server --config ./webpack.config.js --port 8000",
    "build": "webpack -p --config webpack.config.js --env.analyze=static",
    "analyze": "webpack --config webpack.config.js --env.analyze=server",
  }
}
```

## Debugging
To see your full webpack config, simply add a `--env.debug` to your webpack cli command.
