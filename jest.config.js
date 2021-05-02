module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/api-tests/'],
  setupFilesAfterEnv: ['./src/app/testHelper/testSetup.ts'],
};
