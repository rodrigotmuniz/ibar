const { mergeObjects } = require('./merge-objects')

describe('mergeObjects = (actualObject, newObject)', () => {
  test('should return success object', async () => {
    const actualObject = {
      a: 1,
      b: 2,
      c: {
        ca: 1,
        cb: 2,
        cc: {
          cca: 100,
          ccb: 200
        }
      }
    };

    const newObject = {
      a: 10,
      c: {
        ca: 10,
        cb: 20,
        cc: {
          cca: 101,
          ccb: 202
        }
      }
    };

    const expected = {
      a: 10,
      b: 2,
      c: {
        ca: 10,
        cb: 20,
        cc: {
          cca: 101,
          ccb: 202
        }
      }
    };;

    const received = mergeObjects(actualObject, newObject);
    expect(received).toEqual(expected);

  });

  test('should return error message when actualObject is not object', async () => {
    const expected = 'actualObject should be an object.';
    const actualObjects = [1, '', 'a', [], () => { }, null, undefined, false];
    const newObject = {};

    for (let actualObject of actualObjects) {
      try {
        mergeObjects(actualObject, newObject);
      } catch (received) {
        expect(received).toEqual(expected);
      }
    }
  });

  test('should return error message when newObject is not object', async () => {
    const expected = 'newObject should be an object.';
    const newObjects = [1, '', 'a', [], () => { }, null, undefined, false];
    const actualObject = {};

    for (let newObject of newObjects) {
      try {
        mergeObjects(actualObject, newObject);
      } catch (received) {
        expect(received).toEqual(expected);
      }
    }
  });

})

