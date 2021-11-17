const { validator } = require('./validator');
const { pipeline } = require('stream');
const transformStream = require('./streams/transformStream');
const ReadStream = require('./streams/readStream');
const WriteStream = require('./streams/writeStream');

const { input, output, config } = validator(process.argv.slice(2));

let readStream = process.stdin;
input && (readStream = new ReadStream(input));

let writeStream = process.stdout;
output && (writeStream = new WriteStream(output));

const getTransforms = () => {
  const transformArray = [];
  config.split('-').forEach(code => transformArray.push(new transformStream(code)));
  return transformArray;
};
const transformStreams = getTransforms();

pipeline(
  readStream,
  ...transformStreams,
  writeStream,
  err => {
    if (err) console.log(err);
    else console.log('Success');
  }
);