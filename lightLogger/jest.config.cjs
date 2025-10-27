/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',  // important for ESM
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],        // treat TS files as ESM
  globals: {
    'ts-jest': {
      useESM: true
    }
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest', // or 'ts-jest'
  },
};
