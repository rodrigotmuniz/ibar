const { ErrorResponseModel } = require('./error-response-model');

describe('_verifyInput(result)', () => {
  test('should return undefined when result is an object', async () => {
    const expected = undefined;
    const result = { Payload: {} }

    const received = new ErrorResponseModel(null, result)._verifyInput(result);
    expect(received).toEqual(expected);
  });

  test('should return an error object when result is not an object', async () => {
    const notObjects = [1, 's', true, null, [], () => { }];

    for (let result of notObjects) {
      const expected = { input: result, errorMessage: 'result must be an object.' };
      const validResult = { Payload: {} }

      try {
        new ErrorResponseModel(null, validResult)._verifyInput(result);
      } catch (received) {
        expect(received).toEqual(expected);
      }
    }
  });

  test('should return an error object when result.Payload is not an object', async () => {
    const notObjects = [1, 's', true, null, [], () => { }];

    for (let payload of notObjects) {
      const result = {
        Payload: payload
      }
      const expected = { input: result, errorMessage: 'Payload must be a object.' };
      const validResult = { Payload: {} }

      try {
        new ErrorResponseModel(null, validResult)._verifyInput(result);
      } catch (received) {
        expect(received).toEqual(expected);
      }
    }
  });
})

describe('constructor(event, result)', () => {
  test('should return a new model when request is valid', async () => {
    const event = 'event';
    const result = {
      ExecutedVersion: 'executedVersion',
      Payload: {
        errorMessage: 'errorMessage',
        code: 'code',
        statusCode: 'statusCode',
      }
    };

    const expected = {
      event: 'event',
      errorMessage: 'errorMessage',
      code: 'code',
      statusCode: 'statusCode',
      executedVersion: 'executedVersion',
    };

    const received = new ErrorResponseModel(event, result);
    expect(received).toEqual(expected);
  })
})