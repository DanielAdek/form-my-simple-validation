export default {
  loginForm: {
    formType: 'login',
    dataField: { field: 'email', required: true, isEmail: true },
    password: { field: 'password', required: true }
  },
  signupForm: {
    formType: 'signup',
    email: { field: 'email', required: true, isEmail: true },
    fullName: { field: 'fullName', required: true, isName: true },
    phone: { field: 'phoneNumber', required: true, isPhoneNumber: true },
    password: {
      field: 'password', required: true, minLength: 8, maxLength: 15
    },
  },
  sampleForm: {
    formType: 'sampleForm',
    obj: { field: 'rating', isInteger: true, range: { from: 1, to: 5 } }
  }
};
