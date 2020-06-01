const { ErrorResponseModel } = require('../models/error-response-model')
const { isObject } = require('../validations/is-object');

exports.createInvokeParams = (functionName, method, tableName, stage = 'dev', dbParams = {}) => {
  const inputData = { functionName, method, tableName, stage, dbParams };
  if (typeof functionName != 'string') return new ErrorResponseModel(inputData, '"functionName" should be a string.', 400);
  if (typeof method != 'string') return new ErrorResponseModel(inputData, '"method" should be a string.', 400);
  if (typeof tableName != 'string') return new ErrorResponseModel(inputData, '"tableName" should be a string.', 400);
  if (typeof stage != 'string' && stage !== undefined)
    return new ErrorResponseModel(inputData, '"stage" should be a string or undefined.', 400);
  if (!isObject(dbParams)) return new ErrorResponseModel(inputData, '"dbParams" should be an object or undefined.', 400);

  const payload = {
    method: method,
    dbParams: dbParams
  };
  payload.dbParams.TableName = tableName 

  return {
    FunctionName: functionName,
    Qualifier: stage,
    Payload: JSON.stringify(payload),
  };

}