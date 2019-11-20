const { errorMsg, sampleformSchema } = require('./message');
const {
  isEmail, isAlpha, isDecimal,
  isEmpty, isPhoneNumber, isName,
  isInteger, splitCamelCaseWord
} = require('./regex');

/**
 * @desc SENDS ERROR TO USER
 * @param {object} customError USER'S CUSTOM ERROR
 * @param {object} defaultError PACKAGE DEFAULT ERROR
 * @returns {object} JSON
 */
const errorSender = (customError, defaultError) => (customError ? { error: true, customError: (typeof customError === 'string' ? { message: customError, defaultError } : { customError, defaultError }) } : defaultError);

/**
 * @desc VALIDATES PROVIDED FIELDS
 * @param {object} expectedRequest REQUEST TO BE PASSED
 * @param {object} userForm REQUEST BODY
 * @param {Boolean} allowNullOrUndefinedValue CHECK FOR NULL OR UNDEFINED VALUES
 * @returns {object} JSON
 */
const compareTwoObjectsKeys = (expectedRequest, userForm, allowNullOrUndefinedValue) => {
  let isNullOrUndefined = false;
  const keyWithIsNullOrUndefined = [];

  /*eslint-disable */
  if (!allowNullOrUndefinedValue && typeof allowNullOrUndefinedValue === 'boolean') {
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
    validateDataType(userForm);
  }

  const mainArray = Object.keys(expectedRequest);
  const secondaryArray = Object.keys(userForm);
  const result = mainArray.filter((n) => !secondaryArray.includes(n));

  return {
    missingFields: result, count: result.length, isNullOrUndefined, keyWithIsNullOrUndefined
  };
};

/**
 * @desc VALIDATES INPUT FIELDS
 * @param {*} formType TYPE OF ACTION
 * @param {object} formSchema THE FORM SCHEMA FOR VALIDATION REQUIREMENT
 * @param {object} userForm THE USER FORM BODY TO BE VALIDATED
 * @param {object} customError THE PREFERED RESPONSE BY USER
 * @param {Boolean} allowNullOrUndefinedValue DECLINE NULL OR UNDEFINED VALUES
 * @returns {object} JSON
 */
exports.validateFields = (formType, formSchema, userForm, customError, allowNullOrUndefinedValue = true) => {
  /**
   * @desc VALIDATE PARAMS
   */
  // first parameter
  if (typeof formType !== 'string') {
    return errorMsg('Unexpected Data-Type!', 400, 'argument', 'formType', 'Expected first argument should be string', { error: true, operationStatus: 'Processs Terminated!' });
  }
  // second parameter
  if (typeof formSchema === 'string' && !formSchema) {
    return errorMsg('Unexpected Data-Type!', 400, 'argument', 'formSchema', 'Expected second argument to be provided', { error: true, operationStatus: 'Processs Terminated!' });
  }
  if (formSchema === null || formSchema === undefined) {
    return errorMsg('Unexpected Data-Type!', 400, 'argument', 'formSchema', 'Second argument cannot be null or undefind', { error: true, operationStatus: 'Processs Terminated!' });
  }
  if (typeof formSchema !== 'object' || Array.isArray(formSchema)) {
    return errorMsg('Unexpected Data-Type!', 400, 'argument', 'formSchema', 'Expected second argument to be of an object: Your request schema should follow the format below', { error: true, operationStatus: 'Processs Terminated!', format: sampleformSchema });
  }
  if ((Object.keys(formSchema).map((data) => data)).length < 1) {
    return errorMsg('Unexpected Data', 400, 'argument', 'formSchema', 'Form_Schema should not be empty', { error: true, operationStatus: 'Processs Terminated!' });
  }
  let x = false;
  let xMsg = null;

  Object.keys(formSchema).forEach((request) => {
    if (typeof formSchema[request] !== 'object' || Array.isArray(formSchema[request]) || formSchema[request] == null) {
      x = true; xMsg = errorMsg('Unexpected Data-Type!', 400, 'argument', 'formSchema', 'Your request schema should follow the format below', { error: true, operationStatus: 'Processs Terminated!', format: sampleformSchema });
      return;
    }
    if (typeof formSchema[request].formType !== 'string' || !formSchema[request].formType) {
      x = true; xMsg = errorMsg('Unexpected Data-Type!', 400, 'argument', 'formType missing in formSchema', 'Your request schema should follow the format below', { error: true, operationStatus: 'Processs Terminated!', format: sampleformSchema });
      return;
    }

    const objects = Object.keys(formSchema[request])
      .filter((data) => typeof formSchema[request][data] === 'object' && formSchema[request][data] !== null && !Array.isArray(formSchema[request][data]));

    if (!objects.length) {
      x = true; xMsg = errorMsg('Unexpected!', 400, 'fields-not-found', 'Form property', 'Pre-define your inputs. Follow the format below', { error: true, operationStatus: 'Processs Terminated!', format: sampleformSchema });
      return;
    }

    objects.forEach((key) => {
      if (!(Object.keys(formSchema[request][key]).map((data) => data)).length) {
        x = true; xMsg = errorMsg('Unexpected Data!', 400, `${formType}.${key}`, `Schema.${formType}`, 'No Requirement found for input field', { error: true, operationStatus: 'Processs Terminated!', format: sampleformSchema });
        return;
      }
      if (typeof formSchema[request][key].field !== 'string') {
        x = true; xMsg = errorMsg('Unexpected Data-Type!', 400, `${formType}.${key}`, `Schema.${formType}`, 'Schema object property "field" is missing or is not a string. Follow the format below', { error: true, operationStatus: 'Processs Terminated!', format: sampleformSchema });
        return;
      }
      if (formSchema[request][key].field.trim() === '') {
        x = true; xMsg = errorMsg('Unexpected empty field!', 400, `${formType}.${key}`, `Schema.${formType}`, '"field" should be not be empty". Follow the format below', { error: true, operationStatus: 'Processs Terminated!', format: sampleformSchema });
      }
    });
  });

  if (x) { return xMsg; }

  // Third parameter
  if (typeof userForm !== 'object' || Array.isArray(formSchema) || userForm === null) {
    return errorMsg('Expected Request-Body!', 400, 'argument', 'userForm', 'Expected third argument to be of an object: e.g { data: "my-data-value" }', { error: true, operationStatus: 'Processs Terminated!' });
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

  Object.keys(formSchema).forEach((request) => {
    if (typeof formSchema[request].formType === 'string' && typeof formType === 'string') {
      if (formSchema[request].formType.toLowerCase().trim() === formType.toLowerCase().trim()) {
        /**
         * @desc GET VALIDATION REQUIREMENTs
         */
        Object.keys(formSchema[request])
          .filter((data) => typeof formSchema[request][data] === 'object')
          .forEach((keys) => {
            expectedFields[formSchema[request][keys].field] = '</>';
            // Requirement for required field
            if (typeof formSchema[request][keys].required === 'boolean' && formSchema[request][keys].required) {
              requiredFields.push(formSchema[request][keys]);
            }
            // Requirement for alpha field
            if (typeof formSchema[request][keys].isAlpha === 'boolean' && formSchema[request][keys].isAlpha) {
              fieldsWithAlphaValues.push(formSchema[request][keys]);
            }
            // Requirement for decimal field
            if (typeof formSchema[request][keys].isDecimal === 'boolean' && formSchema[request][keys].isDecimal) {
              fieldsWithDecimalValues.push(formSchema[request][keys]);
            }
            // Requirement for name field
            if (typeof formSchema[request][keys].isName === 'boolean' && formSchema[request][keys].isName) {
              fieldsWithNameValues.push(formSchema[request][keys]);
            }
            // Requirement for digit field
            if (typeof formSchema[request][keys].isInteger === 'boolean' && formSchema[request][keys].isInteger) {
              fieldsWithIntegerValues.push(formSchema[request][keys]);
            }
            // Requirement for email
            if (typeof formSchema[request][keys].isEmail === 'boolean' && formSchema[request][keys].isEmail) {
              emailField.push(formSchema[request][keys]);
            }
            // Requirement for phone number validation
            if (typeof formSchema[request][keys].isPhoneNumber === 'boolean' && formSchema[request][keys].isPhoneNumber) {
              phoneFields.push(formSchema[request][keys]);
            }
            // Requirement for minLength and maxLength validation
            if (typeof formSchema[request][keys].minLength === 'number' || typeof formSchema[request][keys].maxLength === 'number') {
              maxMinFields.push(formSchema[request][keys]);
            }
            // Requirement for array
            if (typeof formSchema[request][keys].isArray === 'boolean' && formSchema[request][keys].isArray) {
              fieldsWithArrayAsValues.push(formSchema[request][keys]);
            }
            // Requirement for object not null
            if (typeof formSchema[request][keys].isObject === 'boolean' && formSchema[request][keys].isObject) {
              fieldsWithObjectAsValues.push(formSchema[request][keys]);
            }
          });

        /**
         * @desc Find MISSING KEYS IN USER'S REQUEST-BODY
         */
        const foundMissingKeys = compareTwoObjectsKeys(expectedFields, userForm, allowNullOrUndefinedValue);
        if (foundMissingKeys.missingFields.length || foundMissingKeys.isNullOrUndefined) {
          const defaultError = errorMsg(`${foundMissingKeys.isNullOrUndefined ? 'Object Property (value: null or undefined not accepted)' : 'Missing Fields'}`, 400, `${foundMissingKeys.missingFields.length ? foundMissingKeys.missingFields : foundMissingKeys.keyWithIsNullOrUndefined}`, 'userForm', `${foundMissingKeys.isNullOrUndefined ? 'Value null or undefined not accepted. Replace (null or undefined) with empty string, if you mean to return nothing' : `There are ${foundMissingKeys.count} fields missing in your request: ${foundMissingKeys.missingFields}`}`, { error: true, operationStatus: 'Processs Terminated!' });
          errorCompareKeys = errorSender(customError, defaultError);
        }

        /**
         * @desc VALIDATE FOR REQUIRED FIELDS
         */
        if (requiredFields.length) {
          requiredFields.forEach((obj) => {
            Object.keys(userForm).forEach((key) => {
              if (obj.field === key) {
                if (isEmpty(userForm[key]) || !userForm[key]) {
                  const defaultError = errorMsg('ValidationError', 400, `${obj.field}`, `${formType}`, `${splitCamelCaseWord(obj.field)} cannot be empty`, { error: true, operationStatus: 'Processs Terminated!' });
                  errorMessage = errorSender(customError, defaultError);
                }
              }
            });
          });
        }

        /**
         * @desc VALIDATE FOR EMAIL FIELDs
         */
        if (emailField.length) {
          Object.keys(userForm).forEach((key) => {
            emailField.forEach((obj) => {
              if (userForm[key]) {
                if (key === obj.field && !isEmail(userForm[key])) {
                  const defaultError = errorMsg('ValidationError', 422, `${obj.field}`, `${formType}`, `${splitCamelCaseWord(obj.field)} is invalid. Email should look like e.g example@mail.com`, { error: true, operationStatus: 'Processs Terminated!' });
                  errorMessage = errorSender(customError, defaultError);
                }
              }
            });
          });
        }

        /**
         * @desc VALIDATE FOR PHONE FIELD
         */
        if (phoneFields.length) {
          Object.keys(userForm).forEach((key) => {
            phoneFields.forEach((obj) => {
              if (userForm[key]) {
                if (obj.field === key && !isPhoneNumber(userForm[key])) {
                  const defaultError = errorMsg('ValidationError', 422, `${key}`, `${formType}`, `${splitCamelCaseWord(obj.field)} is invalid. You can try using a number like +2348180000009`, { error: true, operationStatus: 'Processs Terminated!' });
                  errorMessage = errorSender(customError, defaultError);
                }
              }
            });
          });
        }

        /**
         * @desc VALIDATE FOR MAX AND MIN LENGTH
         */
        if (maxMinFields.length) {
          Object.keys(userForm).forEach((key) => {
            maxMinFields.forEach((obj) => {
              if (obj.field === key) {
                if (userForm[key]) {
                  if (userForm[key].length < obj.minLength || userForm[key].length > obj.maxLength) {
                    const defaultError = errorMsg('ValidationError', 400, `${key}`, `${formType}`, `The minLength characters expected for this field: ${splitCamelCaseWord(obj.field)}, is ${obj.minLength} with a maxLength of ${obj.maxLength}.`, { error: true, operationStatus: 'Processs Terminated!' });
                    errorMessage = errorSender(customError, defaultError);
                  }
                }
              }
            });
          });
        }

        /**
         * @desc VALIDATE FOR ARRAY VALUES
         */
        if (fieldsWithArrayAsValues.length) {
          Object.keys(userForm).forEach((key) => {
            fieldsWithArrayAsValues.forEach((obj) => {
              if (userForm[key]) {
                if (obj.field === key && !Array.isArray(userForm[key])) {
                  const defaultError = errorMsg('ValidationError', 400, `${key}`, `${formType}`, `${splitCamelCaseWord(obj.field)} should be an array dataType`, { error: true, operationStatus: 'Processs Terminated!' });
                  errorMessage = errorSender(customError, defaultError);
                }
              }
            });
          });
        }

        /**
         * @desc VALIDATE FOR OBJECTS AS VALUE
         */
        if (fieldsWithObjectAsValues.length) {
          Object.keys(userForm).forEach((key) => {
            fieldsWithObjectAsValues.forEach((obj) => {
              if (userForm[key]) {
                if (obj.field === key && typeof userForm[key] !== 'object' && userForm[key] !== null) {
                  const defaultError = errorMsg('ValidationError', 400, `${key}`, `${formType}`, `${splitCamelCaseWord(obj.field)} should be an object literal dataType`, { error: true, operationStatus: 'Processs Terminated!' });
                  errorMessage = errorSender(customError, defaultError);
                }
              }
            });
          });
        }

        /**
         * @desc VALIDATE FOR DECIMAL VALUE
         */
        if (fieldsWithDecimalValues.length) {
          Object.keys(userForm).forEach((key) => {
            fieldsWithDecimalValues.forEach((obj) => {
              if (userForm[key]) {
                if (obj.field === key && !isDecimal(userForm[key])) {
                  const defaultError = errorMsg('ValidationError', 400, `${key}`, `${formType}`, `${splitCamelCaseWord(obj.field)} should be a decimal value`, { error: true, operationStatus: 'Processs Terminated!' });
                  errorMessage = errorSender(customError, defaultError);
                }
              }
            });
          });
        }

        /**
         * @desc VALIDATE FOR ALPHA VALUE
         */
        if (fieldsWithAlphaValues.length) {
          Object.keys(userForm).forEach((key) => {
            fieldsWithAlphaValues.forEach((obj) => {
              if (userForm[key]) {
                if (obj.field === key && !isAlpha(userForm[key])) {
                  const defaultError = errorMsg('ValidationError', 400, `${key}`, `${formType}`, `${splitCamelCaseWord(obj.field)} should only be alphabets`, { error: true, operationStatus: 'Processs Terminated!' });
                  errorMessage = errorSender(customError, defaultError);
                }
              }
            });
          });
        }

        /**
         * @desc VALIDATE FOR DIGITS VALUE
         */
        if (fieldsWithIntegerValues.length) {
          Object.keys(userForm).forEach((key) => {
            fieldsWithIntegerValues.forEach((obj) => {
              if (userForm[key]) {
                if (obj.field === key && !isInteger(userForm[key])) {
                  const defaultError = errorMsg('ValidationError', 400, `${key}`, `${formType}`, `${splitCamelCaseWord(obj.field)} should only be integers`, { error: true, operationStatus: 'Processs Terminated!' });
                  errorMessage = errorSender(customError, defaultError);
                }
              }
            });
          });
        }
        /**
         * @desc VALIDATE FOR NAMES VALUE
         */
        if (fieldsWithNameValues.length) {
          Object.keys(userForm).forEach((key) => {
            fieldsWithNameValues.forEach((obj) => {
              if (obj.field === key) {
                if (userForm[key]) {
                  if (!isName(userForm[key])) {
                    const defaultError = errorMsg('ValidationError', 400, `${key}`, `${formType}`, `${splitCamelCaseWord(obj.field)} should be a proper name, and it should not contain special characters like: (#@$!±^&*+=">?{</}_|)`, { error: true, operationStatus: 'Processs Terminated!' });
                    errorMessage = errorSender(customError, defaultError);
                  }
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
