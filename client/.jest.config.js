module.exports = {
  testEnvironment: 'jsdom',
  // Collect coverage reports
  collectCoverage: true,
  
  // Where to output coverage reports
  coverageDirectory: "coverage",

  // Mock CSS and LESS imports to prevent syntax errors
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/fileMock.js"
  },

  // Transform settings to use babel-jest for JS/JSX files
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },

  // Specify transformation ignore patterns except for specific modules like axios
  transformIgnorePatterns: [
    "node_modules/(?!axios).+\\.js$"
  ],

  // Setup Enzyme (if you're using it) or other testing utilities
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],

  // Coverage thresholds (optional, customize as needed)
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: -10
    }
  }
};

