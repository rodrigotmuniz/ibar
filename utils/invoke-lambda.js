exports.invokeLambda = async (invokeParams) => {
  const invokeResult = await lambda.invoke(invokeParams).promise();
  if (invokeResult.FunctionError) throw JSON.parse(invokeResult.Payload).errorMessage;

  const [data, error] = JSON.parse(invokeResult.Payload)
  if (('' + invokeResult.StatusCode).startsWith('2') && !error)
    return [data]
  return [, error]
}