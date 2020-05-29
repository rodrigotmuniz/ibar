const { isObject } = require('../verifications/is-object')

exports.ErrorResponseModel = class ErrorResponseModel {
  constructor(event, result) {
    this._verifyInput(result);

    this.event = event;
    this.errorMessage = result.Payload.errorMessage;
    this.code = result.Payload.code;
    this.statusCode = result.Payload.statusCode;
    this.executedVersion = result.ExecutedVersion;
  }

  _verifyInput(result) {
    if (!isObject(result))
      throw { input: result, errorMessage: 'result must be an object.', }
    if (!isObject(result.Payload))
      throw { input: result, errorMessage: 'Payload must be a object.', }
  };
}