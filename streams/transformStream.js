const { Transform } = require('stream');
const { encryption } = require('../cipher');

class TransformStream extends Transform {
  constructor(code) {
    super();
    this.code = code;
  }
  _transform(chunk, encoding, next) {
    this.push(encryption(chunk.toString(), this.code));
    next();
  }
};

module.exports = TransformStream;