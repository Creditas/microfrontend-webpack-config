const isString = value => typeof value === 'string'
const isNotString = value => !isString(value)
const isFn = fn => typeof fn === 'function'
const isObj = obj => typeof obj === 'object'
const isNotObjFn = obj => !isObj(obj) && !isFn(obj)

const isStg = value => value === 'staging'
const isDev = value => value === 'development'
const isProd = value => value === 'production'
const log = debug => message => debug && console.log(message) //eslint-disable-line no-console

const getEnvFile = environment => {
  if (isDev(environment)) {
    return '.env.development'
  } else if (isStg(environment)) {
    return '.env.staging'
  } else if (isProd(environment)) {
    return '.env.production'
  }

  return '.env'
}
module.exports = {
  isString,
  isNotString,
  isNotObjFn,
  isFn,
  isObj,
  isStg,
  isProd,
  getEnvFile,
  log,
}
