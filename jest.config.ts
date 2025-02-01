export default {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'jest-transform-stub',
  },
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@ant-design|@ricons|your-other-modules-to-transform)/',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx']
};