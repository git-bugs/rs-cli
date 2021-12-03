const fs = require('fs');
const path = require('path');
const ReadStream = require('./streams/readStream');
const WriteStream = require('./streams/writeStream');

const keys = {
  config: ['-c', '--config'],
  input: ['-i', '--input'],
  output: ['-o', '--output']
};

const doubleCheck = (arguments) => {
  for (let item in keys) {
    const flagOne = arguments.filter(el => el === keys[item][0]);
    const flagTwo = arguments.filter(el => el === keys[item][1]);
    if ((arguments.includes(keys[item][0]) && arguments.includes(keys[item][1])) || flagOne.length > 1 || flagTwo.length > 1) {
      process.stderr.write(`Duplicate argument - ${item}!\n`);
      process.exit(1);
    }
  }
}

module.exports = (arguments) => {
  const configFlag = arguments.filter(item => item === '-c' || item === '--config');
  if (!configFlag.length) {
    process.stderr.write(`No configuration set!\n`);
    process.exit(1);
  }

  const config = arguments[arguments.indexOf(configFlag[0]) + 1];
  const configCheck = (/^(\s{0}|[RC][01][-]|[A][-])+([RC][01]|[A])$/).test(config);
  if (!configCheck) {
    process.stderr.write(`Incorrect configuration!\n`);
    process.exit(1);
  }

  doubleCheck(arguments);

  let readStream;
  const inputFlag = arguments.filter(item => item === '-i' || item === '--input')
  if (inputFlag.length) {
    const inputName = arguments[arguments.indexOf(inputFlag[0]) + 1];
    const inputCheck = fs.existsSync(path.join(__dirname, inputName));
    if (!inputCheck) {
      process.stderr.write(`Input file (${inputName}) not found!\n`);
      process.exit(1);
    }
    readStream = new ReadStream(inputName);
  } else readStream = process.stdin;

  let writeStream;
  const outputFlag = arguments.filter(item => item === '-o' || item === '--output');
  if (outputFlag.length) {
    const outputName = arguments[arguments.indexOf(outputFlag[0]) + 1];
    const outputCheck = fs.existsSync(path.join(__dirname, outputName));
    if (!outputCheck) {
      process.stderr.write(`Output file (${outputName}) not found!\n`);
      process.exit(1);
    }
    writeStream = new WriteStream(outputName)
  } else writeStream = process.stdout;

  return { readStream, writeStream, config: config.split('-') };
}