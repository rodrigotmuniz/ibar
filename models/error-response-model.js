exports.ErrorResponseModel = class ErrorResponseModel {
  constructor(inputData, errorMessage, version, statusCode = 400) {
    this.inputData = inputData;
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
    this.version = version;
  }
} 