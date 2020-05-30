const { SuccessResponseModel } = require('../models/success-response-model');
const { ErrorResponseModel } = require('../models/error-response-model');

exports.createSuccessResponse = (result) => {
  const isFromDb = result.Payload.payload == undefined;
  // if (!isFromDb) result.Payload = JSON.parse(result.Payload);
  const payload = isFromDb ? result.Payload : {
    Item: result.Payload.payload.item,
    Items: result.Payload.payload.items,
    Count: result.Payload.payload.count,
    ScannedCount: result.Payload.payload.scannedCount
  };
  const statusCode = result.StatusCode;

  return new SuccessResponseModel(payload, statusCode)
}


exports.createErrorResponse = (inputData, result) => {
  const isFromDb = result.Payload == undefined;
  // if (!isFromDb) result.Payload = JSON.parse(result.Payload);
  return isFromDb ? new ErrorResponseModel(inputData, result.message, result.statusCode) : result.Payload;
}

exports.createResponse = (result, inputData) => {
  if (result.Payload && typeof result.Payload == 'string') result.Payload = JSON.parse(result.Payload);
  if (result.message || result.Payload && result.Payload.errorMessage)
    return this.createErrorResponse(inputData, result);
  return this.createSuccessResponse(result);
}