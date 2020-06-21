const { isObject } = require('../validations/is-object');
const { ErrorResponseModel } = require('../models/error-response-model');

exports.mergeObjects = (actualObject, newObject) => {
  if (!isObject(actualObject)) throw new ErrorResponseModel(actualObject, 'actualObject should be an object.', 400);
  if (!isObject(newObject)) throw new ErrorResponseModel(newObject, 'newObject should be an object.', 400); ;

  for (newObjectKey in newObject) {
    if (isObject(actualObject[newObjectKey]))
      actualObject[newObjectKey] = this.mergeObjects(actualObject[newObjectKey], newObject[newObjectKey])
    else actualObject[newObjectKey] = newObject[newObjectKey]
  }
  return actualObject;
}  