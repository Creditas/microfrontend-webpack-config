const errorParamName =
  'microfront-webpack-config expects a string name as the first argument'

const errorParamOverrides = overrides =>
  `microfront-webpack-config expects an object as a second argument to override the canopy defaults. Received ${typeof overrides}`

module.exports = {
  errorParamName,
  errorParamOverrides,
}
