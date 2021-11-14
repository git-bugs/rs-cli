const { Transform } = require('stream');
const cipher = require('../cipher');

class TransformStream extends Transform {
  constructor(code) {
    super();
    this.code = code;
  }
  _transform(chunk, encoding, next) {
    this.push(cipher(chunk.toString(), this.code));
    next();
  }
};

module.exports = TransformStream;