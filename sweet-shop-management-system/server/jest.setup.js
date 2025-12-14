// jest.setup.js
const { TextEncoder, TextDecoder } = require('util');

if (typeof global.TextEncoder === 'undefined') global.TextEncoder = TextEncoder;
if (typeof global.TextDecoder === 'undefined') global.TextDecoder = TextDecoder;

// Any other globals for tests can be set here
