const { createSuccessResponse } = require('./create-response');

describe('createSuccessResponse = (result)', () => {
  test('should return a new SuccessResponseModel when request comes from database and is valid', async () => {
    const result = {
      StatusCode: 'statusCode',
      Payload: {
        Item: 'item',
        Items: [],
        Count: 'count',
        ScannedCount: 'scannedCount'
      }
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

    const received = createSuccessResponse(result);
    expect(received).toEqual(expected);
  })

  test('should return a new SuccessResponseModel when request comes from function and is valid', async () => {
    const result = {
      StatusCode: 'statusCode',
      Payload: {
        statusCode: 'statusCode',
        payload: {
          item: 'item',
          items: [],
          count: 'count',
          scannedCount: 'scannedCount'
        }
      }
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

    const received = createSuccessResponse(result);
    
    expect(received).toEqual(expected);
  })
})