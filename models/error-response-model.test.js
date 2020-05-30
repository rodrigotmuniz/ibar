const { ErrorResponseModel } = require('./error-response-model');

describe('constructor(inputData, errorMessage, statusCode, version)', () => {
  test('should return a new model when request is valid', async () => {
    const inputData = 'inputData';
    const errorMessage = 'errorMessage';
    const statusCode = 'statusCode';
    const version = 'version';

    const expected = {
      inputData: 'inputData',
      errorMessage: 'errorMessage',
      statusCode: 'statusCode',
      version: 'version',
    };

    const received = new ErrorResponseModel(inputData, errorMessage, version, statusCode);
    expect(received).toEqual(expected);
  })
})