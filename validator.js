const fs = require('fs');
const path = require('path');
const CustomError = require('./error');

const keys = {
  config: ['-c', '--config'],
  input: ['-i', '--input'],
  output: ['-o', '--output']
};

const doubleCheck = (args) => {
  for (let item in keys) {
    const flagOne = args.filter(el => el === keys[item][0]);
    const flagTwo = args.filter(el => el === keys[item][1]);
    if ((args.includes(keys[item][0]) && args.includes(keys[item][1])) || flagOne.length > 1 || flagTwo.length > 1) throw new CustomError(`Duplicate argument - "${item}"!`);
  };
};

const configCheck = (args) => {
  const configFlag = args.filter(item => item === '-c' || item === '--config');
  if (!configFlag.length) throw new CustomError('No configuration set!');
};

const configValid = (args) => {
  const configFlag = args.filter(item => item === '-c' || item === '--config');
  const config = args[args.indexOf(configFlag[0]) + 1];
  const configCheck = (/^(\s{0}|[RC][01][-]|[A][-])+([RC][01]|[A])$/).test(config);
  if (!configCheck) throw new CustomError('Incorrect configuration!');
  return config;
};

const fileCheck = (file) => {
  try {
    fs.accessSync(path.join(__dirname, file), fs.constants.R_OK | fs.constants.W_OK);
  } catch (error) {
    throw new CustomError(`No Read or Write access to "${file}"!`);
  }
};

const validator = (args) => {
  try {
    configCheck(args);
    const config = configValid(args);
    doubleCheck(args);

    let input = null;
    const inputFlag = args.filter(item => item === '-i' || item === '--input');
    if (inputFlag.length) {
      const inputName = args[args.indexOf(inputFlag[0]) + 1];
      fileCheck(inputName);
      input = inputName;
    }

    let output = null;
    const outputFlag = args.filter(item => item === '-o' || item === '--output');
    if (outputFlag.length) {
      const outputName = args[args.indexOf(outputFlag[0]) + 1];
      fileCheck(outputName);
      output = outputName;
    }

    return { input, output, config };
  } catch (error) {
    errorHandler(error);
  }
};

const errorHandler = (err) => {
  const { isCustom, message } = err;
  if (isCustom) {
    process.stderr.write(message + '\n');
    process.exit(1);
  } else throw err
};

module.exports = { validator, doubleCheck, configCheck, configValid, fileCheck, errorHandler };