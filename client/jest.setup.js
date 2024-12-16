require('@testing-library/jest-dom');
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.importMetaEnv = {
  VITE_API_URL: "http://localhost:3001",
};


global.importMeta = {
  env: global.importMetaEnv,
};

Object.defineProperty(window, 'import', {
  value: {
    meta: {
      env: {
        VITE_API_URL: 'http://localhost:3001'
      }
    }
  },
  writable: true
});