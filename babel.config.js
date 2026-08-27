module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@core': './src/core',
          '@app': './src/core',
          '@features': './src/features',
          '@shared': './src/shared',
          '@infrastructure': './src/infrastructure',
          '@assets': './assets',
        },
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
