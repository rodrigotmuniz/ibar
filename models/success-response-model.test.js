const { SuccessResponseModel } = require('./success-response-model');

describe('constructor(payload, statusCode)', () => {
  test('should return a new model when request is valid', async () => {
    const statusCode = 'statusCode';
    const payload = {
      Item: 'item',
      Items: [],
      Count: 'count',
      ScannedCount: 'scannedCount'
    };

    const expected = {
      statusCode: 'statusCode',
      payload: {
        item: 'item',
        items: [],
        count: 'count',
        scannedCount: 'scannedCount'
      }
    };

    const received = new SuccessResponseModel(payload, statusCode);
    expect(received).toEqual(expected);
  })
})