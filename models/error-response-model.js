exports.ErrorResponseModel = class ErrorResponseModel {
  constructor(inputData, errorMessage, statusCode, version) {
    this.inputData = inputData;
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
    this.version = version;
  }
} 