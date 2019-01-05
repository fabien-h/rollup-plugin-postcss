module.exports = {
  collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**'],
  notify: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  watchPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/src/'],
};
