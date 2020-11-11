module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      mainProcessWatch: ['src/backend/**/*'],
    }
  }
};
