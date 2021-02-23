module.exports = {
  verbose: true,
  setupFilesAfterEnv: [
    'jest-plugin-context/setup',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/_archive/',
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/.cache',
  ],
};
