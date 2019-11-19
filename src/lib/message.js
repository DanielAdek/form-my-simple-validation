/**
 * @desc ERROR COMPOSER
 * @param {*} Stacktrace ERROR TRACER
 * @param {*} statusCode ERROR CODE LOG
 * @param {*} field ERROR FIELD
 * @param {*} target TARGETED ACTION
 * @param {*} message ERROR EXPLAINED
 * @param {*} details MORE ERROR DETAILS
 * @returns {object} JSON
 */
exports.errorMsg = (Stacktrace, statusCode, field, target, message, details) => ({
  error: {
    error: true,
    Stacktrace,
    metadata: [
      {
        statusCode,
        field,
        target
      }
    ],
    message: message || 'Error!',
    details
  }
});

/**
 * @desc SAMPLE REQUEST SCHEMA
 */
exports.sampleRequestSchema = {
  login: {
    formType: 'login',
    dataField: { field: 'email', required: true, isEmail: true },
    password: { field: 'password', required: true }
  },
  signupRequestBody: {
    formType: 'signup',
    FullName: { field: 'fullName', required: true, isName: true },
    username: { field: 'username', required: true, isName: true },
    email: { field: 'email', required: true, isEmail: true },
    password: {
      field: 'password', required: true, min: 8, max: 15
    },
    PhoneNumber: { field: 'phoneNumber', required: true, isPhoneNumber: true }
  },
};
