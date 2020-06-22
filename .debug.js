const { debugResult } = require('./index');

const handler = async (event) => {
  return Promise.reject(JSON.stringify(event))
}

debugResult(handler({}))
