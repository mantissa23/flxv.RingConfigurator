module.exports = {
  verbose: true,

  notify: true,

  globals: {
    'vue-jest': {
      babelConfig: true,
    },
  },

  setupFiles: [
    '<rootDir>/test/setupTests.js',
  ],

  snapshotSerializers: ['jest-serializer-vue'],

  watchPlugins: ['jest-runner-eslint/watch-fix'],

  watchPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/coverage',
    '<rootDir>/.eslintcache',
  ],

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|sass|less)$': '<rootDir>/__mocks__/styleMock.js',
    '^~/(.*)$': '<rootDir>/$1',
  },

  moduleFileExtensions: ['js', 'vue', 'json'],

  testMatch: [
    '<rootDir>/test/*.test.js',
    '<rootDir>/test/*.unittest.js',
  ],

  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },

  transformIgnorePatterns: ['/node_modules/(?!vuetify)'],

  collectCoverage: true,

  coverageDirectory: '<rootDir>/coverage',

  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/layouts/*.vue',
    // 'client/components/**/*.vue'
  ],

  coveragePathIgnorePatterns: [
    '\\.runtime\\.js$',
    '<rootDir>/test',
    '<rootDir>/node_modules',
  ],

  coverageReporters: ['html', 'json', 'text-summary'],
};
