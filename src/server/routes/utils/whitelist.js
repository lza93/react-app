module.exports = function (object, arrayOfKeys) {
  const newObject = {};
  arrayOfKeys.forEach((keyName) => {
    if (object[keyName]) {
      newObject[keyName] = object[keyName];
    }
  });
  return newObject;
};
