module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/tamagochi/'
  //   : '/'
  
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/tamagochi/'
    : '/'
}
