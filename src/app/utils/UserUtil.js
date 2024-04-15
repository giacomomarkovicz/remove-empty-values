const _ = require("lodash");

const isValidString = (string) => !_.isEmpty(string) && !_.isEqual(string, "#");

const isNumberOrValidValue = (value) => _.isFinite(value) || isValidString(value);

const compactWithValidValues = (array) => _.filter(array, (value) => isNumberOrValidValue(value));

const removeEmptyValues = (body) => {
  return _.transform(body, (result, value, key) => {
    if (_.isObject(value) && !_.isArray(value)) {

      result[key] = removeEmptyValues(value);

    } else if (_.isArray(value)) {

      result[key] = compactWithValidValues(value);

    } else if (isNumberOrValidValue(value)) {

      result[key] = value;

    }
  });
};

module.exports = { removeEmptyValues, isValidString, isNumberOrValidValue, compactWithValidValues };
