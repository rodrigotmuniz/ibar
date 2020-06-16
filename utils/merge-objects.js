const { isObject } = require('../validations/is-object');

exports.mergeObjects = (actualObject, newObject) => {
  if (!isObject(actualObject)) throw 'actualObject should be an object.';
  if (!isObject(newObject)) throw 'newObject should be an object.';

  for (newObjectKey in newObject) {
    if (isObject(actualObject[newObjectKey]))
      actualObject[newObjectKey] = this.mergeObjects(actualObject[newObjectKey], newObject[newObjectKey])
    else actualObject[newObjectKey] = newObject[newObjectKey]
  }
  return actualObject;
}