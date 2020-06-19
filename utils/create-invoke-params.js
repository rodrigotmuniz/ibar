const { ErrorResponseModel } = require('../models/error-response-model')
const { isObject } = require('../validations/is-object');

exports.createInvokeParams = (functionName, method, tableName, stage = 'dev', dbParams = {}) => {
  const inputData = { functionName, method, tableName, stage, dbParams };
  if (typeof functionName != 'string') return [undefined, new ErrorResponseModel(inputData, '"functionName" should be a string.', 400)];
  if (typeof method != 'string') return [undefined, new ErrorResponseModel(inputData, '"method" should be a string.', 400)];
  if (typeof tableName != 'string') return [undefined, new ErrorResponseModel(inputData, '"tableName" should be a string.', 400)];
  if (typeof stage != 'string' && stage !== undefined)
    return [undefined, new ErrorResponseModel(inputData, '"stage" should be a string or undefined.', 400)];
  if (!isObject(dbParams)) return [undefined, new ErrorResponseModel(inputData, '"dbParams" should be an object or undefined.', 400)];

  const payload = {
    tableName: tableName,
    method: method,
    body: dbParams.body,
    projectionExpression: dbParams.projectionExpression,
    keyConditionExpression: dbParams.keyConditionExpression,
    filterExpression: dbParams.filterExpression,
    expressionAttributeNames: dbParams.expressionAttributeNames,
    expressionAttributeValues: dbParams.expressionAttributeValues,
    params: dbParams.params,
    keys: dbParams.keys
  };

  return [{
    FunctionName: functionName,
    Qualifier: stage,
    Payload: JSON.stringify(payload),
  }];

}