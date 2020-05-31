const db = [{ id: 1, name: 'Test 1' }, { id: 2, name: 'Test 2' }];

const responses = {
  getAll: {
    success: {
      StatusCode: 200,
      ExecutedVersion: 'version',
      Payload: JSON.stringify({
        statusCode: 200,
        payload: {
          items: db,
          count: db.length,
          scannedCount: db.length,
        },
      })
    },
    error: {
      StatusCode: 200,
      ExecutedVersion: 'version', 
      Payload: `{
          "inputData":{
            "method":"method",
            "searchParams":{"TableName":"tableName"}},
            "errorMessage":"errorMessage",
            "statusCode":400
          }`
    }
  }
}


exports.config = {
  update: () => { }
};

exports.Lambda = class Lambda {
  invoke(invokeParams) {
    invokeParams.Payload = JSON.parse(invokeParams.Payload);
    const isError = invokeParams.Payload.inputData != undefined;
    let method = '';
    if (invokeParams.Payload.method == 'scan') method = 'getAll';
    return { promise: () => Promise.resolve(responses[method][isError ? 'error' : 'success']) };
  }
}


const successResponse = {
  get: {
    id: {
      1: {
        Item: {
          id: 1,
          name: 'Test 1'
        }
      },
      2: {
        Item: {
          id: 2,
          name: 'Test 2'
        }
      }
    }
  },
}

exports.DynamoDB = {
  DocumentClient: class DocumentClient {
    get(searchParams) {
      if (searchParams.error) return { promise: () => Promise.reject({ message: 'errorMessage.', statusCode: 'statusCode' }) };
      const id = searchParams.Key.id;
      const response = successResponse.get.id[id] || {};
      return { promise: () => Promise.resolve(response) };
    }

    query(searchParams) {
      const id = searchParams.ExpressionAttributeValues[':id'];
      const response = successResponse.get.id[id] || { Items: [], Count: 0, ScannedCount: 0 };
      return {
        promise: () => Promise.resolve(
          response.Items
            ? response
            : { Items: [response.Item], Count: 1, ScannedCount: 1 }
        )
      };
    }

    scan() {
      return {
        promise: () => Promise.resolve({
          Items: [
            { id: 1, name: 'Test 1' },
            { id: 2, name: 'Test 2' },
          ],
          Count: 2,
          ScannedCount: 2
        })
      };
    }



    delete() {
      return { promise: () => Promise.resolve({}) };
    }

    put() {
      return { promise: () => Promise.resolve({}) };
    }
  }
}
