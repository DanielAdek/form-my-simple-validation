import { errorMsg, sampleRequestSchema } from './message';
import {
  isEmail, isAlpha, isDecimal,
  isEmpty, isPhoneNumber, isName,
  isInteger, splitCamelCaseWord
} from './regex';
/**
 * @desc VALIDATES PROVIDED FIELDS
 * @param {object} expectedRequest REQUEST TO BE PASSED
 * @param {object} requestBody REQUEST BODY
 * @param {Boolean} allowNullOrUndefinedValue CHECK FOR NULL OR UNDEFINED VALUES
 * @returns {object} JSON
 */
const compareTwoObjectsKeys = (expectedRequest, requestBody, allowNullOrUndefinedValue) => {
  let isNullOrUndefined = false;
  const keyWithIsNullOrUndefined = [];

  /*eslint-disable */
  if (allowNullOrUndefinedValue) {
  const validateDataType = (obj) => {
    for (const value in obj) {
      if (obj[value] === null) {
        isNullOrUndefined = true;
        keyWithIsNullOrUndefined.push(value);
      }
      if (obj[value] === undefined) {
        isNullOrUndefined = true;
        keyWithIsNullOrUndefined.push(value);
      }
    }
  };
    /* eslint-enable */
    validateDataType(expectedRequest);
    validateDataType(requestBody);
  }

  const mainArray = Object.keys(expectedRequest);
  const secondaryArray = Object.keys(requestBody);
  const result = mainArray.filter((n) => !secondaryArray.includes(n));

  return {
    missingFields: result, count: result.length, isNullOrUndefined, keyWithIsNullOrUndefined
  };
};

/**
 * @desc VALIDATES INPUT FIELDS
 * @param {*} formType TYPE OF ACTION
 * @param {object} requestSchema THE REQUEST SCHEMA FOR VALIDATION REQUIREMENT
 * @param {object} requestBody THE REQUEST BODY TO BE VALIDATED
 * @param {object} customError THE PREFERED RESPONSE BY USER
 * @param {Boolean} allowNullOrUndefinedValue DECLINE NULL OR UNDEFINED VALUES
 * @returns {object} JSON
 */
exports.validateFields = (formType, requestSchema, requestBody, customError, allowNullOrUndefinedValue = false) => {
  /**
   * @desc VALIDATE PARAMS
   */
  // first parameter
  if (typeof formType !== 'string') {
    return errorMsg('Unexpected Data-Type!', 400, 'argument', 'formType', 'Expected first argument should be string', { error: true, operationStatus: 'Processs Terminated!' });
  }
  // second parameter
  if (typeof requestSchema === 'string' && !requestSchema) {
    return errorMsg('Unexpected Data-Type!', 400, 'argument', 'requestSchema', 'Expected second argument to be provided', { error: true, operationStatus: 'Processs Terminated!' });
  }
  if (requestSchema === null || requestSchema === undefined) {
    return errorMsg('Unexpected Data-Type!', 400, 'argument', 'requestSchema', 'Second argument cannot be null or undefind', { error: true, operationStatus: 'Processs Terminated!' });
  }
  if (typeof requestSchema !== 'object' || Array.isArray(requestSchema)) {
    return errorMsg('Unexpected Data-Type!', 400, 'argument', 'requestSchema', 'Expected second argument to be of an object: Your request schema should follow the format below', { error: true, operationStatus: 'Processs Terminated!', format: sampleRequestSchema });
  }
  if ((Object.keys(requestSchema).map((data) => data)).length < 1) {
    return errorMsg('Unexpected Data', 400, 'argument', 'requestSchema', 'Request_Schema should not be empty', { error: true, operationStatus: 'Processs Terminated!' });
  }
  let x = false;
  let xMsg = null;

  Object.keys(requestSchema).forEach((request) => {
    if (typeof requestSchema[request] !== 'object' || Array.isArray(requestSchema[request]) || requestSchema[request] == null) {
      x = true; xMsg = errorMsg('Unexpected Data-Type!', 400, 'argument', 'requestSchema', 'Your request schema should follow the format below', { error: true, operationStatus: 'Processs Terminated!', format: sampleRequestSchema });
      return;
    }
    if (typeof requestSchema[request].formType !== 'string' || !requestSchema[request].formType) {
      x = true; xMsg = errorMsg('Unexpected Data-Type!', 400, 'argument', 'formType missing in requestSchema', 'Your request schema should follow the format below', { error: true, operationStatus: 'Processs Terminated!', format: sampleRequestSchema });
      return;
    }

    const objects = Object.keys(requestSchema[request])
      .filter((data) => typeof requestSchema[request][data] === 'object' && requestSchema[request][data] !== null && !Array.isArray(requestSchema[request][data]));

    if (!objects.length) {
      x = true; xMsg = errorMsg('Unexpected!', 400, 'fields-not-found', 'Form property', 'Pre-define your inputs. Follow the format below', { error: true, operationStatus: 'Processs Terminated!', format: sampleRequestSchema });
      return;
    }

    objects.forEach((key) => {
      if (!(Object.keys(requestSchema[request][key]).map((data) => data)).length) {
        x = true; xMsg = errorMsg('Unexpected Data!', 400, `${formType}.${key}`, `Schema.${formType}`, 'No Requirement found for input field', { error: true, operationStatus: 'Processs Terminated!', format: sampleRequestSchema });
        return;
      }
      if (typeof requestSchema[request][key].field !== 'string') {
        x = true; xMsg = errorMsg('Unexpected Data-Type!', 400, `${formType}.${key}`, `Schema.${formType}`, 'Schema object property "field" is missing or is not a string. Follow the format below', { error: true, operationStatus: 'Processs Terminated!', format: sampleRequestSchema });
        return;
      }
      if (requestSchema[request][key].field.trim() === '') {
        x = true; xMsg = errorMsg('Unexpected empty field!', 400, `${formType}.${key}`, `Schema.${formType}`, '"field" should be not be empty". Follow the format below', { error: true, operationStatus: 'Processs Terminated!', format: sampleRequestSchema });
      }
    });
  });

  if (x) { return xMsg; }

  // Third parameter
  if (typeof requestBody !== 'object' || Array.isArray(requestSchema) || requestBody === null) {
    return errorMsg('Expected Request-Body!', 400, 'argument', 'requestBody', 'Expected third argument to be of an object: e.g { data: "my-data-value" }', { error: true, operationStatus: 'Processs Terminated!' });
  }

  // set variables
  const emailField = [];
  const phoneFields = [];
  const maxMinFields = [];
  const requiredFields = [];
  const expectedFields = {};
  const fieldsWithNameValues = [];
  const fieldsWithAlphaValues = [];
  const fieldsWithIntegerValues = [];
  const fieldsWithDecimalValues = [];
  const fieldsWithArrayAsValues = [];
  const fieldsWithObjectAsValues = [];
  let errorMessage, errorCompareKeys;

  Object.keys(requestSchema).forEach((request) => {
    if (typeof requestSchema[request].formType === 'string' && typeof formType === 'string') {
      if (requestSchema[request].formType.toLowerCase().trim() === formType.toLowerCase().trim()) {
        /**
         * @desc GET VALIDATION REQUIREMENTs
         */
        Object.keys(requestSchema[request])
          .filter((data) => typeof requestSchema[request][data] === 'object')
          .forEach((keys) => {
            expectedFields[requestSchema[request][keys].field] = '</>';
            // Requirement for required field
            if (requestSchema[request][keys].required) {
              requiredFields.push(requestSchema[request][keys]);
            }
            // Requirement for alpha field
            if (requestSchema[request][keys].isAlpha) {
              fieldsWithAlphaValues.push(requestSchema[request][keys]);
            }
            // Requirement for decimal field
            if (requestSchema[request][keys].isDecimal) {
              fieldsWithDecimalValues.push(requestSchema[request][keys]);
            }
            // Requirement for name field
            if (requestSchema[request][keys].isName) {
              fieldsWithNameValues.push(requestSchema[request][keys]);
            }
            // Requirement for digit field
            if (requestSchema[request][keys].isInteger) {
              fieldsWithIntegerValues.push(requestSchema[request][keys]);
            }
            // Requirement for email
            if (requestSchema[request][keys].isEmail) {
              emailField.push(requestSchema[request][keys]);
            }
            // Requirement for phone number validation
            if (requestSchema[request][keys].isPhoneNumber) {
              phoneFields.push(requestSchema[request][keys]);
            }
            // Requirement for minLength and maxLength validation
            if (typeof requestSchema[request][keys].minLength === 'number' || typeof requestSchema[request][keys].maxLength === 'number') {
              maxMinFields.push(requestSchema[request][keys]);
            }
            // Requirement for array
            if (requestSchema[request][keys].isArray) {
              fieldsWithArrayAsValues.push(requestSchema[request][keys]);
            }
            // Requirement for object not null
            if (requestSchema[request][keys].isObject) {
              fieldsWithObjectAsValues.push(requestSchema[request][keys]);
            }
          });

        /**
         * @desc Find MISSING KEYS IN USER'S REQUEST-BODY
         */
        const foundMissingKeys = compareTwoObjectsKeys(expectedFields, requestBody, allowNullOrUndefinedValue);
        if (foundMissingKeys.missingFields.length || foundMissingKeys.isNullOrUndefined) {
          errorCompareKeys = customError ? { error: true, data: (typeof customError === 'string' ? { message: customError } : customError) } : errorMsg(`${foundMissingKeys.isNullOrUndefined ? 'Object Property (value: null or undefined not accepted)' : 'Missing Fields'}`, 400, `${foundMissingKeys.missingFields.length ? foundMissingKeys.missingFields : foundMissingKeys.keyWithIsNullOrUndefined}`, 'Request Body', `${foundMissingKeys.isNullOrUndefined ? 'Value null or undefined not accepted. Replace (null or undefined) with empty string, if you mean to return nothing' : `There are ${foundMissingKeys.count} fields missing in your request: ${foundMissingKeys.missingFields}`}`, { error: true, operationStatus: 'Processs Terminated!' });
        }

        /**
         * @desc VALIDATE FOR REQUIRED FIELDS
         */
        if (requiredFields.length) {
          requiredFields.forEach((obj) => {
            Object.keys(requestBody).forEach((key) => {
              if (obj.field === key) {
                if (isEmpty(requestBody[key]) || !requestBody[key]) {
                  errorMessage = customError ? { error: true, data: (typeof customError === 'string' ? { message: customError } : customError) } : errorMsg('Validation Error', 400, `${obj.field}`, `${formType}`, `${splitCamelCaseWord(obj.field)} cannot be empty`, { error: true, operationStatus: 'Processs Terminated!' });
                }
              }
            });
          });
        }

        /**
         * @desc VALIDATE FOR EMAIL FIELDs
         */
        if (emailField.length) {
          Object.keys(requestBody).forEach((key) => {
            emailField.forEach((obj) => {
              if (key === obj.field && !isEmail(requestBody[key])) {
                errorMessage = customError ? { error: true, data: (typeof customError === 'string' ? { message: customError } : customError) } : errorMsg('Validation Error', 422, `${obj.field}`, `${formType}`, `${splitCamelCaseWord(obj.field)} is invalid. Email should look like e.g example@mail.com`, { error: true, operationStatus: 'Processs Terminated!' });
              }
            });
          });
        }

        /**
         * @desc VALIDATE FOR PHONE FIELD
         */
        if (phoneFields.length) {
          Object.keys(requestBody).forEach((key) => {
            phoneFields.forEach((obj) => {
              if (obj.field === key && !isPhoneNumber(requestBody[key])) {
                errorMessage = customError ? { error: true, data: (typeof customError === 'string' ? { message: customError } : customError) } : errorMsg('Validation Error', 422, `${key}`, `${formType}`, `${splitCamelCaseWord(obj.field)} is invalid. You can try using a number like +2348180000009`, { error: true, operationStatus: 'Processs Terminated!' });
              }
            });
          });
        }

        /**
         * @desc VALIDATE FOR MAX AND MIN LENGTH
         */
        if (maxMinFields.length) {
          Object.keys(requestBody).forEach((key) => {
            maxMinFields.forEach((obj) => {
              if (obj.field === key) {
                if (requestBody[key].length < obj.minLength || requestBody[key].length > obj.maxLength) {
                  errorMessage = customError ? { error: true, data: (typeof customError === 'string' ? { message: customError } : customError) } : errorMsg('Validation Error', 400, `${key}`, `${formType}`, `The minLength characters expected for this field: ${splitCamelCaseWord(obj.field)}, is ${obj.minLength} with a maxLength of ${obj.maxLength}.`, { error: true, operationStatus: 'Processs Terminated!' });
                }
              }
            });
          });
        }

        /**
         * @desc VALIDATE FOR ARRAY VALUES
         */
        if (fieldsWithArrayAsValues.length) {
          Object.keys(requestBody).forEach((key) => {
            fieldsWithArrayAsValues.forEach((obj) => {
              if (obj.field === key && !Array.isArray(requestBody[key])) {
                errorMessage = customError ? { error: true, data: (typeof customError === 'string' ? { message: customError } : customError) } : errorMsg('Validation Error', 400, `${key}`, `${formType}`, `${splitCamelCaseWord(obj.field)} should be an array dataType`, { error: true, operationStatus: 'Processs Terminated!' });
              }
            });
          });
        }

        /**
         * @desc VALIDATE FOR OBJECTS AS VALUE
         */
        if (fieldsWithObjectAsValues.length) {
          Object.keys(requestBody).forEach((key) => {
            fieldsWithObjectAsValues.forEach((obj) => {
              if (obj.field === key && typeof requestBody[key] !== 'object' && requestBody[key] !== null) {
                errorMessage = customError ? { error: true, data: (typeof customError === 'string' ? { message: customError } : customError) } : errorMsg('Validation Error', 400, `${key}`, `${formType}`, `${splitCamelCaseWord(obj.field)} should be an object literal dataType`, { error: true, operationStatus: 'Processs Terminated!' });
              }
            });
          });
        }

        /**
         * @desc VALIDATE FOR DECIMAL VALUE
         */
        if (fieldsWithDecimalValues.length) {
          Object.keys(requestBody).forEach((key) => {
            fieldsWithDecimalValues.forEach((obj) => {
              if (obj.field === key && (!isDecimal(requestBody[key]) || !requestBody[key])) {
                errorMessage = customError ? { error: true, data: (typeof customError === 'string' ? { message: customError } : customError) } : errorMsg('Validation Error', 400, `${key}`, `${formType}`, `${splitCamelCaseWord(obj.field)} should be a decimal value`, { error: true, operationStatus: 'Processs Terminated!' });
              }
            });
          });
        }

        /**
         * @desc VALIDATE FOR ALPHA VALUE
         */
        if (fieldsWithAlphaValues.length) {
          Object.keys(requestBody).forEach((key) => {
            fieldsWithAlphaValues.forEach((obj) => {
              if (obj.field === key && (!isAlpha(requestBody[key]) || !requestBody[key])) {
                errorMessage = customError ? { error: true, data: (typeof customError === 'string' ? { message: customError } : customError) } : errorMsg('Validation Error', 400, `${key}`, `${formType}`, `${splitCamelCaseWord(obj.field)} should only be alphabets`, { error: true, operationStatus: 'Processs Terminated!' });
              }
            });
          });
        }

        /**
         * @desc VALIDATE FOR DIGITS VALUE
         */
        if (fieldsWithIntegerValues.length) {
          Object.keys(requestBody).forEach((key) => {
            fieldsWithIntegerValues.forEach((obj) => {
              if (obj.field === key && (!isInteger(requestBody[key]) || !requestBody[key])) {
                errorMessage = customError ? { error: true, data: (typeof customError === 'string' ? { message: customError } : customError) } : errorMsg('Validation Error', 400, `${key}`, `${formType}`, `${splitCamelCaseWord(obj.field)} should only be integers`, { error: true, operationStatus: 'Processs Terminated!' });
              }
            });
          });
        }
        /**
         * @desc VALIDATE FOR NAMES VALUE
         */
        if (fieldsWithNameValues.length) {
          Object.keys(requestBody).forEach((key) => {
            fieldsWithNameValues.forEach((obj) => {
              if (obj.field === key) {
                if (!isName(requestBody[key]) || !requestBody[key]) {
                  errorMessage = customError ? { error: true, data: (typeof customError === 'string' ? { message: customError } : customError) } : errorMsg('Validation Error', 400, `${key}`, `${formType}`, `${splitCamelCaseWord(obj.field)} should be a proper name, and it should not contain special characters like: (#@$!±^&*+=">?{</}_|)`, { error: true, operationStatus: 'Processs Terminated!' });
                }
              }
            });
          });
        }
      }
    }
  });
  return errorCompareKeys || errorMessage || { error: false };
};
