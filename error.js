class CustomError extends Error {
  constructor(message){
    super();
    this.isCustom = true;
    this.message = message;
  }
};

module.exports = CustomError;