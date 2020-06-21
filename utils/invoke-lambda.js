

exports.invokeLambda = async (lambda, invokeParams) => {
  const result = await lambda.invoke(invokeParams).promise();
  if (result.FunctionError) throw JSON.parse(result.Payload).errorMessage;
  return JSON.parse(result.Payload)
}