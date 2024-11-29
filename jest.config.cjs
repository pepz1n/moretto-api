module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',  // Transforma JS/TS com Babel
  },
  testEnvironment: 'node',  // Use o ambiente Node.js para testar APIs ou backends
};
