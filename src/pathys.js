'use strict';

function getPath(obj, propertyValue, paths) {

  return Object.keys(obj)
    .some(objectKey => {
      const objectProperty = obj[objectKey];

      paths.push(objectKey);

      if (typeof objectProperty === 'object') {
        return getPath(objectProperty, propertyValue, paths);
      }

      if (objectProperty === propertyValue) {
        return true;
      }

      paths.pop();
    });
}

module.exports = exports = (object, property, defaultValue) => {

  /**
   * The object is not valid.
   */
  if (typeof object !== 'object') {
    return defaultValue || property;
  }

  const path = [];

  const wasFound = getPath(object, property, path);

  if (!wasFound) {
    return defaultValue || property;
  }

  return path.join('.');
};
