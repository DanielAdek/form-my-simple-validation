/**
 * @desc VALIDATES INPUT FIELDS
 * @param {*} value VALUE PASSED
 * @returns {Boolean} BOOLEAN
 */
const isEmpty = (value) => (typeof value === 'string' ? value.trim() === '' : value);

/**
 * @function isEmail
 * @param {*} value
 * @return {*} boolean
 */
const isEmail = (value) => {
  const regex = /([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ /* eslint-disable-line */
  return regex.test(value);
};

/**
 * @function isAlpha
 * @param {*} value
 * @returns {Boolean} BOOLEAN
 */
const isAlpha = (value) => ((/^[A-Z]+$/ig).test(value));

/**
 * @function isInteger
 * @param {*} value
 * @returns {Boolean} BOOLEAN
 */
const isInteger = (value) => ((/^(\d)+$/g).test(value));

/**
 * @function isName
 * @param {*} value
 * @returns {Boolean} BOOLEAN
 */
const isName = (value) => ((/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/ig).test(value));

/**
 * @function isDecimal
 * @param {*} value
 * @returns {Boolean} BOOLEAN
 */
const isDecimal = (value) => ((/^(\d*\.)?\d+$/igm).test(value));

/**
 * @function isPhoneNumber
 * @param {*} value
 * @returns {Boolean} BOOLEAN
 */
const isPhoneNumber = (value) => /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(value);

/**
 * @function splitCamelCaseWord
 * @param {*} word
 * @returns {Boolean} BOOLEAN
 */
const splitCamelCaseWord = (word) => word.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();

export {
  isAlpha, isDecimal, isEmail, isEmpty, isPhoneNumber, isInteger, isName, splitCamelCaseWord
};
