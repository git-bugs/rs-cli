const { validator } = require('./validator');
const { pipeline } = require('stream');
const transformStream = require('./streams/transformStream');

const { readStream, writeStream, config } = validator(process.argv.slice(2));

const getTransforms = () => {
  const transformArray = [];
  config.forEach(code => transformArray.push(new transformStream(code)));
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