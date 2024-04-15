const _ = require("lodash");
const {
  isValidString,
  isNumberOrValidValue,
  removeEmptyValues,
  compactWithValidValues
} = require("../utils/UserUtil");

describe("isValidString function", () => {
  test("should return true for a valid string", () => {
    expect(isValidString("hello")).toBe(true);
  });

  test("should return false for an empty string", () => {
    expect(isValidString("")).toBe(false);
  });

  test("should return false for a special character string", () => {
    expect(isValidString("#")).toBe(false);
  });
});

describe("isNumberOrValidValue function", () => {
  test("should return true for a number", () => {
    expect(isNumberOrValidValue(2)).toBe(true);
  });

  test("should return true for a valid string", () => {
    expect(isNumberOrValidValue("valid string")).toBe(true);
  });

  test("should return false for an invalid string", () => {
    expect(isNumberOrValidValue("#")).toBe(false);
  });

  test("should return false for null value", () => {
    expect(isNumberOrValidValue(null)).toBe(false);
  });
});

describe("removeEmptyValues function", () => {
  test("should remove empty values from an object", () => {
    const obj = {
      name: "name",
      emptyString: "",
      invalidString: "#",
      validNumber: 5,
      object: {
        emptyString: "",
        validNumber: 2,
      },
      array: [1, "", "#", 2],
    };

    const result = removeEmptyValues(obj);

    expect(result).toEqual({
      name: "name",
      validNumber: 5,
      object: {
        validNumber: 2,
      },
      array: [1, 2],
    });
  });

  test("should not modify object if it contains only valid values", () => {
    const validObject = {
      name: "name",
      validNumber: 5,
      object: {
        validNumber: 2,
      },
      array: [1, 2],
    };

    const result = removeEmptyValues(validObject);

    expect(result).toEqual(validObject);
  });
});

describe('compactWithValidValues function', () => {
  test('should remove invalid values from the array', () => {
    const array = [1, '', 'string', '#', null, undefined, 2];
    const result = compactWithValidValues(array);
    expect(result).toEqual([1, 'string', 2]);
  });

  test('should return an empty array if all values are invalid', () => {
    const array = ['', '#', null, undefined];
    const result = compactWithValidValues(array);
    expect(result).toEqual([]);
  });

  test('should return the same array if all values are valid', () => {
    const array = [1, 2, 'hello', 'world'];
    const result = compactWithValidValues(array);
    expect(result).toEqual(array);
  });
});
