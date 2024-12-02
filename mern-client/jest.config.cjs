module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Sử dụng babel-jest để chuyển đổi JSX/JS trước khi chạy test
  },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    testEnvironment: 'jest-environment-jsdom',
  };
  