const fs = require('fs');
const path = require('path');
const ReadStream = require('./streams/readStream');
const WriteStream = require('./streams/writeStream');

const keys = {
  config: ['-c', '--config'],
  input: ['-i', '--input'],
  output: ['-o', '--output']
};

const doubleCheck = (args) => {
  let result = true;
  for (let item in keys) {
    const flagOne = args.filter(el => el === keys[item][0]);
    const flagTwo = args.filter(el => el === keys[item][1]);
    if ((args.includes(keys[item][0]) && args.includes(keys[item][1])) || flagOne.length > 1 || flagTwo.length > 1) {
      process.stderr.write(`Duplicate argument - ${item}!\n`);
      result = false;
    }
  };
  return result;
};

const configCheck = (args) => {
  let result = true;
  const configFlag = args.filter(item => item === '-c' || item === '--config');
  if (!configFlag.length) {
    process.stderr.write(`No configuration set!\n`);
    result = false;
  }
  return result;
};

const configValid = (args) => {
  const configFlag = args.filter(item => item === '-c' || item === '--config');
  const config = args[args.indexOf(configFlag[0]) + 1];
  let result = config;
  const configCheck = (/^(\s{0}|[RC][01][-]|[A][-])+([RC][01]|[A])$/).test(config);
  if (!configCheck) {
    process.stderr.write(`Incorrect configuration!\n`);
    result = null;
  }
  return result;
};

const validator = (args) => {
  const configCheckResult = configCheck(args);
  if (!configCheckResult) process.exit(1);

  const config = configValid(args);
  if (!config) process.exit(1);

  const doubleCheckResult = doubleCheck(args);
  if (!doubleCheckResult) process.exit(1);

  let readStream;
  const inputFlag = args.filter(item => item === '-i' || item === '--input');
  if (inputFlag.length) {
    const inputName = args[args.indexOf(inputFlag[0]) + 1];
    const inputCheck = fs.existsSync(path.join(__dirname, inputName));
    if (!inputCheck) {
      process.stderr.write(`Input file (${inputName}) not found!\n`);
      process.exit(1);
    }
    readStream = new ReadStream(inputName);
  } else readStream = process.stdin;

  let writeStream;
  const outputFlag = args.filter(item => item === '-o' || item === '--output');
  if (outputFlag.length) {
    const outputName = args[args.indexOf(outputFlag[0]) + 1];
    const outputCheck = fs.existsSync(path.join(__dirname, outputName));
    if (!outputCheck) {
      process.stderr.write(`Output file (${outputName}) not found!\n`);
      process.exit(1);
    }
    writeStream = new WriteStream(outputName)
  } else writeStream = process.stdout;

  return { readStream, writeStream, config: config.split('-') };
};

module.exports = { validator, doubleCheck, configCheck, configValid };