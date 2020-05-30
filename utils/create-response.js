const { SuccessResponseModel } = require('../models/success-response-model');
const { ErrorResponseModel } = require('../models/error-response-model');

exports.createSuccessResponse = (result) => {
  const isFromDb = result.Payload.payload == undefined;
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
  return isFromDb ? new ErrorResponseModel(inputData, result.message, result.statusCode) : result.Payload;
}