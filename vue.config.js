module.exports = {
  pwa: {
    name: 'se-learning',
    themeColor: '#1976d2',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      background_color: '#fffafa'
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'public/service-worker.js'
    }
  },
  transpileDependencies: ['vuetify']
}
