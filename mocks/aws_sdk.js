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
            "dbParams":{"TableName":"tableName"}},
            "errorMessage":"errorMessage",
            "statusCode":400
          }`
    }
  },
  put: {
    success: {
      StatusCode: 200,
      ExecutedVersion: 'version',
      Payload: JSON.stringify({ statusCode: 200, payload: {} })
    },
    error: {
      StatusCode: 200,
      ExecutedVersion: 'version',
      Payload: JSON.stringify({
        inputData: {
          method: 'put',
          dbParams: { Item: {id: 3, name: 'Test 3'}, TableName: 'tableName' }
        },
        errorMessage: 'One or more parameter values were invalid: Type mismatch for key id expected: N actual: S',
        statusCode: 400
      })
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
    else if (invokeParams.Payload.method == 'put') method = 'put';
    else return { promise: () => Promise.reject(`${invokeParams.Payload.method} is not a valid method`) };

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
    get(dbParams) {
      if (dbParams.error) return { promise: () => Promise.reject({ message: 'errorMessage.', statusCode: 'statusCode' }) };
      const id = dbParams.Key.id;
      const response = successResponse.get.id[id] || {};
      return { promise: () => Promise.resolve(response) };
    }

    query(dbParams) {
      const id = dbParams.ExpressionAttributeValues[':id'];
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
