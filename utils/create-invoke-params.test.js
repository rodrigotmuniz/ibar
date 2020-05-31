const { createInvokeParams } = require('./create-invoke-params');

describe('createInvokeParams = (functionName, method, tableName, stage = "dev", searchParams = {})', () => {
  test('should return a successful object when all params sended are valid.', async () => {
    const functionName = 'functionName';
    const method = 'method';
    const tableName = 'tableName';
    const stage = 'stage';
    const searchParams = { key: 'value' };

    const payload = {
      method: method,
      searchParams: searchParams
    };
    payload.searchParams.TableName = tableName

    const expected = {
      FunctionName: functionName,
      Qualifier: stage,
      Payload: JSON.stringify(payload),
    };

    const received = createInvokeParams(functionName, method, tableName, stage, searchParams);
    expect(received).toEqual(expected);
  })

  test('should return an error message when "functionName" is not a string', async () => {
    const functionNames = [1, true, null, undefined, {}, [], () => { }];
    const method = 'method';
    const tableName = 'tableName';
    const stage = 'stage';
    const searchParams = { key: 'value' };

    for (let functionName of functionNames) {
      const payload = {
        method: method,
        searchParams: searchParams
      };
      payload.searchParams.TableName = tableName;

      const inputData = { functionName, method, tableName, stage, searchParams };

      const expected = {
        errorMessage: '"functionName" should be a string.',
        statusCode: 400,
        inputData: inputData
      };

      const received = createInvokeParams(functionName, method, tableName, stage, searchParams);
      expect(received).toEqual(expected);
    }
  })

  test('should return an error message when "method" is not a string', async () => {
    const functionName = 'functionName';
    const methods = [1, true, null, undefined, {}, [], () => { }];
    const tableName = 'tableName';
    const stage = 'stage';
    const searchParams = { key: 'value' };

    for (let method of methods) {
      const payload = {
        method: method,
        searchParams: searchParams
      };
      payload.searchParams.TableName = tableName;

      const inputData = { functionName, method, tableName, stage, searchParams };

      const expected = {
        errorMessage: '"method" should be a string.',
        statusCode: 400,
        inputData: inputData
      };

      const received = createInvokeParams(functionName, method, tableName, stage, searchParams);
      expect(received).toEqual(expected);
    }
  })
  test('should return an error message when "tableName" is not a string', async () => {
    const functionName = 'functionName';
    const method = 'method';
    const tableNames = [1, true, null, undefined, {}, [], () => { }];
    const stage = 'stage';
    const searchParams = { key: 'value' };

    for (let tableName of tableNames) {
      const payload = {
        method: method,
        searchParams: searchParams
      };
      payload.searchParams.TableName = tableName;

      const inputData = { functionName, method, tableName, stage, searchParams };

      const expected = {
        errorMessage: '"tableName" should be a string.',
        statusCode: 400,
        inputData: inputData
      };

      const received = createInvokeParams(functionName, method, tableName, stage, searchParams);
      expect(received).toEqual(expected);
    }
  })
  test('should return an error message when "stage" is not a string or undefined', async () => {
    const functionName = 'functionName';
    const method = 'method';
    const tableName = 'tableName';
    const stages = [1, true, null, {}, [], () => { }];
    const searchParams = { key: 'value' };

    for (let stage of stages) {
      const payload = {
        method: method,
        searchParams: searchParams
      };
      payload.searchParams.TableName = tableName;

      const inputData = { functionName, method, tableName, stage, searchParams };

      const expected = {
        errorMessage: '"stage" should be a string or undefined.',
        statusCode: 400,
        inputData: inputData
      };

      const received = createInvokeParams(functionName, method, tableName, stage, searchParams);
      expect(received).toEqual(expected);
    }
  })
  test('should return an error message when "searchParams" is not an object or undefined', async () => { 
    const functionName = 'functionName';
    const method = 'method';
    const tableName = 'tableName';
    const stage = 'stage';
    const searchParamsList = [1, true, null, '', [], () => { }];

    for (let searchParams of searchParamsList) {
      const payload = {
        method: method,
        searchParams: searchParams
      };
      const inputData = { functionName, method, tableName, stage, searchParams };

      const expected = {
        errorMessage: '"searchParams" should be an object or undefined.',
        statusCode: 400,
        inputData: inputData
      };

      const received = createInvokeParams(functionName, method, tableName, stage, searchParams);
      expect(received).toEqual(expected);
    }
   })

})

