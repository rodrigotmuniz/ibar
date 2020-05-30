exports.ErrorResponseModel = class ErrorResponseModel {
  constructor(inputData, errorMessage, statusCode = 400, version ) {
    this.inputData = inputData;
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
  }
} 