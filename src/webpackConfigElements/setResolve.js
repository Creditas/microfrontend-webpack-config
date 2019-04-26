const setResolve = config => {
  return {
    ...config,
    resolve: {
      modules: [process.cwd(), 'node_modules'],
    },
  }
}

module.exports = {setResolve}
