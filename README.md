# form-my-simple-validation

[![Build Status](https://travis-ci.com/DanielAdek/form-my-simple-validation.svg?branch=master)](https://travis-ci.com/DanielAdek/form-my-simple-validation) [![Coverage Status](https://coveralls.io/repos/github/DanielAdek/form-my-simple-validation/badge.svg?branch=master)](https://coveralls.io/github/DanielAdek/form-my-simple-validation?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/a0b8deaadc35c112e8de/maintainability)](https://codeclimate.com/github/DanielAdek/form-my-simple-validation/maintainability) [![npm version](https://badge.fury.io/js/form-my-simple-validation.svg)](https://badge.fury.io/js/form-my-simple-validation) [![dependency badge](https://david-dm.org/DanielAdek/form-my-simple-validation.svg)](https://david-dm.org/DanielAdek/form-my-simple-validation.svg) [![license](https://img.shields.io/github/license/DanielAdek/form-my-simple-validation)](https://img.shields.io/github/license/DanielAdek/form-my-simple-validation) [![issues](https://img.shields.io/github/issues/DanielAdek/form-my-simple-validation)](https://img.shields.io/github/issues/DanielAdek/form-my-simple-validation)

## Table of Contents

 * [Introduction](#introduction)
 * [Installation](#installation)
 * [Usage](#usage)
    * [params](#params)
    * [Usage example](#usage-example)
 * [APIs](#apis)

## Introduction

As a JavaScript web developer, you will always need to validate your forms where applicable, ensuring that each input fields are properly taken care of, to avoid unexpected errors in your application.

Sometimes, validating input fields can be really boring and time consuming. To save your time and avoid boring moment, this package can help take care of some simple validations. 
_All you have to do is: `form-my-simple-validation`_

This npm-package is created for web applications. It can be applied both on the client-side and server-side JavaScript application.

## Installation

```bash
$ npm install form-my-simple-validation
```
_If you are using yarn, then run the below._

```bash
$ yarn add form-my-simple-validation
```


## Usage

###### ___Import the package___

```js
const { Form } = require('form-my-simple-validation');

// OR,

// if you have a babel configured for your project, use:
import { Form } from 'form-my-simple-validation';
```

###### ___Call the function___
```js
const validationResult = Form.validateFields(formType, formSchema, userForm, customeError, allowNullOrUndefinedValue);

if (validationResult.error) {
    console.log(validationResult); // this will console an object
}
```

##### Params

_The first three parameters are compulsory, while the rest are optional. The table below explains params._

|Params            | Data-Types        | Description
-------------------|-------------------|--------------
formType _`(required)`_ | _`String`_ | The type of form you want to perform validation on. _`(Note: The form type should be written as is, in the formSchema)`_|
formSchema _`(required)`_ | _`Object`_ | The schema for validating your form |
userForm _`(required)`_ | _`Object`_ | User form i.e an object containing form details, with the keys corresponding to the fields specified in your schema |
customError _`(optional)`_ | _`String` or `object`_ | The message you want to return when validation requirement is not met. This field is optional because a default message is returned if `customError` is not specifield or when set to `null`.|
allowNullOrUndefinedValue _`(optional)`_ | _`Boolean`_ | When set to `false`, an error message is returned when `null` or `undefined` is passed as a value to the user form object. |



#### Usage example.

_You need to create a schema as a validation requirement for the user-form object, in the format below:_

_Note: you may create schema in a separate JavaScript file._

___formSchema.js___ ***file***
```js
// Sample form schema for sign-up
const Schema =  {
  form: {
    formType: 'signup',
    Email: { field: 'email', isEmail: true, required: true },
    FullName: { field: 'fullName', required: true, isName: true },
    Phone: { field: 'phoneNumber', required: true, isPhoneNumber: true },
    Password: {
      field: 'password', required: true, minLength: 8, maxLength: 15
    },
  }
};

module.exports = Schema;

// OR

// if you have configured babel in your project, use:
export default Schema;

```

___sample.js___ ***file***
```js

const { Form } = require('form-my-simple-validation');
const formSchema = require('./path-to-formSchema-js-file')

// OR,

// if you have a babel configured for your project, use:
import { Form } from 'form-my-simple-validation';
import formSchema from './path-to-formSchema-js-file';

// sample user form object
const userForm = {
  fullName: 'Daniel Adek',
  phoneNumber: '+2348100000001',
  email: 'wrong-email.com', // note: email does not meet requirement in the formSchema, email field (isEmail: true) 
  password: '12345678'
}

// Note: the keys in userForm corresponds to the fields in the schema object above e.g email correspond to Schema.form.Email.field

const validationResult = Form.validateFields('signup', formSchema, userForm);

if (validationResult.error) {
    console.log(validationResult); // result is shown below
}

// validation result sample
"error": {
  "error": true,
  "Stacktrace": "ValidationError",
  "metadata": [
    {
      "statusCode": 400,
      "field": "email",
      "target": "SIGNUP"
    }
  ],
  "message": "email is invalid. Email should look like e.g example@mail.com",
  "details": {
  "error": true,
  "operationStatus": "Processs Terminated!"
  }
}

```

## APIs

The following is a table of the options you can use in your schema for validation requirement.

| Options                | Values(DataTypes)     | Description
------------------------ | --------------------- | -------------------
| `required`               | `true` or `false` (Boolean)              | Set `true` value to ensure that the input field should not be empty and vice versa. |
| `isEmail`  | `true` or `false` (Boolean)             | This will ensure that the value entered is a valid email format. e.g `not-email-format` will not be accepted but `email-format@gmail.com` will be accepted. _(Note: this does not validate valid email address, only deals with format)_ |
| `isName` | `true` or `false` (Boolean)              | This ensures that special characters like (#,:,0-9,%, e.t.c) should not be included in a name field. Input field allows spaces, a comma, a dot between names, e.g `Daniel, Adek`, `John Doe`, but does not accept values like `Daniel Adek2`, or `John? Doe!`. |
| `isPhoneNumber`                   | `true` or `false` (Boolean)             | Input field will accept only a valid phone number format. e.g `+2348100000001` but does not accept `+234-81-00-0-00-001` _(Note: this does not validate valid number, only deals with format)_ |
| `isInteger`               | `true` or `false` (Boolean)             | Input field accepts integer value only. |
| `range`                   | `{ from: Number, to: Number }` (Object)  | This ensures that the input value for this field is within the range specification in the `formSchema` |
| `isDecimal`                | `true` or `false` (Boolean)| Input field accepts only decimal values.
| `isAlpha`                    | `true` or `false` (Boolean)                | Input field only accept alphabets. It does not allow space or special characters. |
| `minLength`       | `Number`         | Validate the field and ensure that the characters it is not lesser than specifield minimum length. |
| `maxLength`          | `Number`                 | Validate the field and ensure that the characters it is not more than specifield maximum length. |
| `isArray`                | `true` or `false` (Boolean)              | This only allows array as the value. |
| `isObject`               | `true` or `false` (Boolean)         | Only allows object as value |


## License

[The MIT License](https://choosealicense.com/licenses/mit/)

***Copyright &copy; 2019 DanielAdek***