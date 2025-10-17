module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  moduleFileExtensions: ['ts', 'js', 'html'],
  roots: ['<rootDir>/src'],
};