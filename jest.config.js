export const testEnvironment = 'jest-environment-jsdom';
export const setupFiles = ['./jest.setup.js'];
export const transformIgnorePatterns = [];
export const moduleNameMapper = {
    '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.js',
};

export default {
    testEnvironment,
    setupFiles,
    moduleNameMapper,
    transformIgnorePatterns,
};