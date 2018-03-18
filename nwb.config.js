module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'Masc',
      externals: {
        react: 'React'
      }
    }
  }
}
