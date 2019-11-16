import { expect } from 'chai';
import { Form } from '../../app';
import formSchema from './schema';

describe('FORM VALIDATION', () => {
  it('Should return an object containing property error with value false', () => {
    const form = { email: 'my-email@gmail.com', password: '1234567890' };
    const validate = Form.validateFields('login', formSchema, form);
    /**
       * @desc TEST FOR PROPERTIES
       */
    expect(validate).property('error');
    /**
       * @desc TEST FOR DATA-TYPES
       */
    expect(typeof validate).equal('object');
    /**
       * @desc TEST FOR VALUES
       */
    expect(validate.error).equal(false);
  });


  it('Should return an object containing message (There are 2 fields missing in your request: email,password)', () => {
    const validate = Form.validateFields('login', formSchema, {});
    /**
       * @desc TEST FOR PROPERTIES
       */
    expect(validate.error).property('error');
    expect(validate.error).property('details');
    expect(validate.error).property('message');
    expect(validate.error).property('metadata');
    expect(validate.error).property('Stacktrace');
    expect(validate.error.details).property('error');
    expect(validate.error.metadata[0]).property('field');
    expect(validate.error.metadata[0]).property('target');
    expect(validate.error.metadata[0]).property('statusCode');
    expect(validate.error.details).property('operationStatus');
    /**
       * @desc TEST FOR DATA-TYPES
       */
    expect(typeof validate).equal('object');
    expect(typeof validate.error).equal('object');
    expect(typeof validate.error.error).equal('boolean');
    expect(typeof validate.error.message).equal('string');
    expect(typeof validate.error.metadata).equal('object');
    expect(typeof validate.error.Stacktrace).equal('string');
    expect(typeof validate.error.details.error).equal('boolean');
    expect(typeof validate.error.metadata[0].field).equal('string');
    expect(typeof validate.error.metadata[0].target).equal('string');
    expect(typeof validate.error.metadata[0].statusCode).equal('number');
    expect(typeof validate.error.details.operationStatus).equal('string');
    /**
       * @desc TEST FOR VALUES
       */
    expect(validate.error.error).equal(true);
    expect(validate.error.details.error).equal(true);
    expect(validate.error.metadata[0].field).equal('email,password');
    expect(validate.error.metadata[0].target).equal('Request Body');
    expect(validate.error.metadata[0].statusCode).equal(400);
    expect(validate.error.Stacktrace).equal('Missing Fields');
    expect(validate.error.details.operationStatus).equal('Processs Terminated!');
    expect(validate.error.message).equal('There are 2 fields missing in your request: email,password');
  });


  it('Should return an object containing message with value string', () => {
    const form = { email: '', password: '1234567890' };
    const validate = Form.validateFields('login', formSchema, form);
    /**
       * @desc TEST FOR PROPERTIES
       */
    expect(validate.error).property('error');
    expect(validate.error).property('details');
    expect(validate.error).property('message');
    expect(validate.error).property('metadata');
    expect(validate.error).property('Stacktrace');
    expect(validate.error.details).property('error');
    expect(validate.error.metadata[0]).property('field');
    expect(validate.error.metadata[0]).property('target');
    expect(validate.error.metadata[0]).property('statusCode');
    expect(validate.error.details).property('operationStatus');
    /**
       * @desc TEST FOR DATA-TYPES
       */
    expect(typeof validate).equal('object');
    expect(typeof validate.error).equal('object');
    expect(typeof validate.error.error).equal('boolean');
    expect(typeof validate.error.message).equal('string');
    expect(typeof validate.error.metadata).equal('object');
    expect(typeof validate.error.Stacktrace).equal('string');
    expect(typeof validate.error.details.error).equal('boolean');
    expect(typeof validate.error.metadata[0].field).equal('string');
    expect(typeof validate.error.metadata[0].target).equal('string');
    expect(typeof validate.error.metadata[0].statusCode).equal('number');
    expect(typeof validate.error.details.operationStatus).equal('string');
    /**
       * @desc TEST FOR VALUES
       */
    expect(validate.error.error).equal(true);
    expect(validate.error.details.error).equal(true);
    expect(validate.error.metadata[0].field).equal('email');
    expect(validate.error.metadata[0].target).equal('login');
    expect(validate.error.metadata[0].statusCode).equal(422);
    expect(validate.error.Stacktrace).equal('Validation Error');
    expect(validate.error.details.operationStatus).equal('Processs Terminated!');
    expect(validate.error.message).equal('EMAIL is invalid. Email should look like e.g example@mail.com');
  });

  it('Should return an object containing message (PASSWORD cannot be empty)', () => {
    const form = { email: 'you@email.com', password: '' };
    const validate = Form.validateFields('login', formSchema, form);
    /**
       * @desc TEST FOR PROPERTIES
       */
    expect(validate.error).property('error');
    expect(validate.error).property('details');
    expect(validate.error).property('message');
    expect(validate.error).property('metadata');
    expect(validate.error).property('Stacktrace');
    expect(validate.error.details).property('error');
    expect(validate.error.metadata[0]).property('field');
    expect(validate.error.metadata[0]).property('target');
    expect(validate.error.metadata[0]).property('statusCode');
    expect(validate.error.details).property('operationStatus');
    /**
       * @desc TEST FOR DATA-TYPES
       */
    expect(typeof validate).equal('object');
    expect(typeof validate.error).equal('object');
    expect(typeof validate.error.error).equal('boolean');
    expect(typeof validate.error.message).equal('string');
    expect(typeof validate.error.metadata).equal('object');
    expect(typeof validate.error.Stacktrace).equal('string');
    expect(typeof validate.error.details.error).equal('boolean');
    expect(typeof validate.error.metadata[0].field).equal('string');
    expect(typeof validate.error.metadata[0].target).equal('string');
    expect(typeof validate.error.metadata[0].statusCode).equal('number');
    expect(typeof validate.error.details.operationStatus).equal('string');
    /**
       * @desc TEST FOR VALUES
       */
    expect(validate.error.error).equal(true);
    expect(validate.error.details.error).equal(true);
    expect(validate.error.metadata[0].field).equal('password');
    expect(validate.error.metadata[0].target).equal('login');
    expect(validate.error.metadata[0].statusCode).equal(400);
    expect(validate.error.Stacktrace).equal('Validation Error');
    expect(validate.error.details.operationStatus).equal('Processs Terminated!');
    expect(validate.error.message).equal('PASSWORD cannot be empty');
  });


  it('Should return an object containing message (Value null or undefined not accepted. Replace (null or undefined) with empty string, if you mean to return nothing)', () => {
    const form = { email: 'you@email.com', password: null };
    const validate = Form.validateFields('login', formSchema, form, null, true);
    /**
       * @desc TEST FOR PROPERTIES
       */
    expect(validate.error).property('error');
    expect(validate.error).property('details');
    expect(validate.error).property('message');
    expect(validate.error).property('metadata');
    expect(validate.error).property('Stacktrace');
    expect(validate.error.details).property('error');
    expect(validate.error.metadata[0]).property('field');
    expect(validate.error.metadata[0]).property('target');
    expect(validate.error.metadata[0]).property('statusCode');
    expect(validate.error.details).property('operationStatus');
    /**
       * @desc TEST FOR DATA-TYPES
       */
    expect(typeof validate).equal('object');
    expect(typeof validate.error).equal('object');
    expect(typeof validate.error.error).equal('boolean');
    expect(typeof validate.error.message).equal('string');
    expect(typeof validate.error.metadata).equal('object');
    expect(typeof validate.error.Stacktrace).equal('string');
    expect(typeof validate.error.details.error).equal('boolean');
    expect(typeof validate.error.metadata[0].field).equal('string');
    expect(typeof validate.error.metadata[0].target).equal('string');
    expect(typeof validate.error.metadata[0].statusCode).equal('number');
    expect(typeof validate.error.details.operationStatus).equal('string');
    /**
       * @desc TEST FOR VALUES
       */
    expect(validate.error.error).equal(true);
    expect(validate.error.details.error).equal(true);
    expect(validate.error.metadata[0].field).equal('password');
    expect(validate.error.metadata[0].target).equal('Request Body');
    expect(validate.error.metadata[0].statusCode).equal(400);
    expect(validate.error.Stacktrace).equal('Object Property (value: null or undefined not accepted)');
    expect(validate.error.details.operationStatus).equal('Processs Terminated!');
    expect(validate.error.message).equal('Value null or undefined not accepted. Replace (null or undefined) with empty string, if you mean to return nothing');
  });


  it('Should return an object containing message (The minLength characters expected for this field: PASSWORD, is 8 with a maxLength of 15.)', () => {
    const form = {
      fullName: 'Daniel Adek', phoneNumber: '+2348100000000', email: 'you@email.com', password: '123456'
    };
    const validate = Form.validateFields('signup', formSchema, form);
    /**
       * @desc TEST FOR PROPERTIES
       */
    expect(validate.error).property('error');
    expect(validate.error).property('details');
    expect(validate.error).property('message');
    expect(validate.error).property('metadata');
    expect(validate.error).property('Stacktrace');
    expect(validate.error.details).property('error');
    expect(validate.error.metadata[0]).property('field');
    expect(validate.error.metadata[0]).property('target');
    expect(validate.error.metadata[0]).property('statusCode');
    expect(validate.error.details).property('operationStatus');
    /**
       * @desc TEST FOR DATA-TYPES
       */
    expect(typeof validate).equal('object');
    expect(typeof validate.error).equal('object');
    expect(typeof validate.error.error).equal('boolean');
    expect(typeof validate.error.message).equal('string');
    expect(typeof validate.error.metadata).equal('object');
    expect(typeof validate.error.Stacktrace).equal('string');
    expect(typeof validate.error.details.error).equal('boolean');
    expect(typeof validate.error.metadata[0].field).equal('string');
    expect(typeof validate.error.metadata[0].target).equal('string');
    expect(typeof validate.error.metadata[0].statusCode).equal('number');
    expect(typeof validate.error.details.operationStatus).equal('string');
    /**
       * @desc TEST FOR VALUES
       */
    expect(validate.error.error).equal(true);
    expect(validate.error.details.error).equal(true);
    expect(validate.error.metadata[0].field).equal('password');
    expect(validate.error.metadata[0].target).equal('signup');
    expect(validate.error.metadata[0].statusCode).equal(400);
    expect(validate.error.Stacktrace).equal('Validation Error');
    expect(validate.error.details.operationStatus).equal('Processs Terminated!');
    expect(validate.error.message).equal('The minLength characters expected for this field: PASSWORD, is 8 with a maxLength of 15.');
  });


  it('Should return an object containing message (The minLength characters expected for this field: PASSWORD, is 8 with a maxLength of 15.)', () => {
    const form = {
      fullName: 'Daniel Adek', phoneNumber: '+2348100000000', email: 'you@email.com', password: '123456123456123456'
    };
    const validate = Form.validateFields('signup', formSchema, form);
    /**
       * @desc TEST FOR PROPERTIES
       */
    expect(validate.error).property('error');
    expect(validate.error).property('details');
    expect(validate.error).property('message');
    expect(validate.error).property('metadata');
    expect(validate.error).property('Stacktrace');
    expect(validate.error.details).property('error');
    expect(validate.error.metadata[0]).property('field');
    expect(validate.error.metadata[0]).property('target');
    expect(validate.error.metadata[0]).property('statusCode');
    expect(validate.error.details).property('operationStatus');
    /**
       * @desc TEST FOR DATA-TYPES
       */
    expect(typeof validate).equal('object');
    expect(typeof validate.error).equal('object');
    expect(typeof validate.error.error).equal('boolean');
    expect(typeof validate.error.message).equal('string');
    expect(typeof validate.error.metadata).equal('object');
    expect(typeof validate.error.Stacktrace).equal('string');
    expect(typeof validate.error.details.error).equal('boolean');
    expect(typeof validate.error.metadata[0].field).equal('string');
    expect(typeof validate.error.metadata[0].target).equal('string');
    expect(typeof validate.error.metadata[0].statusCode).equal('number');
    expect(typeof validate.error.details.operationStatus).equal('string');
    /**
       * @desc TEST FOR VALUES
       */
    expect(validate.error.error).equal(true);
    expect(validate.error.details.error).equal(true);
    expect(validate.error.metadata[0].field).equal('password');
    expect(validate.error.metadata[0].target).equal('signup');
    expect(validate.error.metadata[0].statusCode).equal(400);
    expect(validate.error.Stacktrace).equal('Validation Error');
    expect(validate.error.details.operationStatus).equal('Processs Terminated!');
    expect(validate.error.message).equal('The minLength characters expected for this field: PASSWORD, is 8 with a maxLength of 15.');
  });


  it('Should return an object containing message (PHONE NUMBER is invalid. You can try using a number like +2348180000009)', () => {
    const form = {
      fullName: 'Daniel Adek', phoneNumber: '+23481-82-52-u', email: 'you@email.com', password: '12345678'
    };
    const validate = Form.validateFields('signup', formSchema, form);
    /**
       * @desc TEST FOR PROPERTIES
       */
    expect(validate.error).property('error');
    expect(validate.error).property('details');
    expect(validate.error).property('message');
    expect(validate.error).property('metadata');
    expect(validate.error).property('Stacktrace');
    expect(validate.error.details).property('error');
    expect(validate.error.metadata[0]).property('field');
    expect(validate.error.metadata[0]).property('target');
    expect(validate.error.metadata[0]).property('statusCode');
    expect(validate.error.details).property('operationStatus');
    /**
       * @desc TEST FOR DATA-TYPES
       */
    expect(typeof validate).equal('object');
    expect(typeof validate.error).equal('object');
    expect(typeof validate.error.error).equal('boolean');
    expect(typeof validate.error.message).equal('string');
    expect(typeof validate.error.metadata).equal('object');
    expect(typeof validate.error.Stacktrace).equal('string');
    expect(typeof validate.error.details.error).equal('boolean');
    expect(typeof validate.error.metadata[0].field).equal('string');
    expect(typeof validate.error.metadata[0].target).equal('string');
    expect(typeof validate.error.metadata[0].statusCode).equal('number');
    expect(typeof validate.error.details.operationStatus).equal('string');
    /**
       * @desc TEST FOR VALUES
       */
    expect(validate.error.error).equal(true);
    expect(validate.error.details.error).equal(true);
    expect(validate.error.metadata[0].statusCode).equal(422);
    expect(validate.error.metadata[0].target).equal('signup');
    expect(validate.error.Stacktrace).equal('Validation Error');
    expect(validate.error.metadata[0].field).equal('phoneNumber');
    expect(validate.error.details.operationStatus).equal('Processs Terminated!');
    expect(validate.error.message).equal('PHONE NUMBER is invalid. You can try using a number like +2348180000009');
  });


  it('Should return an object containing message (FULL NAME should be a proper name, and it should not contain special characters like: (#@$!±^&*+=">?{</}_|))', () => {
    const form = {
      fullName: '09-kk', phoneNumber: '+2348100000000', email: 'you@email.com', password: '12345678'
    };
    const validate = Form.validateFields('signup', formSchema, form);
    /**
       * @desc TEST FOR PROPERTIES
       */
    expect(validate.error).property('error');
    expect(validate.error).property('details');
    expect(validate.error).property('message');
    expect(validate.error).property('metadata');
    expect(validate.error).property('Stacktrace');
    expect(validate.error.details).property('error');
    expect(validate.error.metadata[0]).property('field');
    expect(validate.error.metadata[0]).property('target');
    expect(validate.error.metadata[0]).property('statusCode');
    expect(validate.error.details).property('operationStatus');
    /**
       * @desc TEST FOR DATA-TYPES
       */
    expect(typeof validate).equal('object');
    expect(typeof validate.error).equal('object');
    expect(typeof validate.error.error).equal('boolean');
    expect(typeof validate.error.message).equal('string');
    expect(typeof validate.error.metadata).equal('object');
    expect(typeof validate.error.Stacktrace).equal('string');
    expect(typeof validate.error.details.error).equal('boolean');
    expect(typeof validate.error.metadata[0].field).equal('string');
    expect(typeof validate.error.metadata[0].target).equal('string');
    expect(typeof validate.error.metadata[0].statusCode).equal('number');
    expect(typeof validate.error.details.operationStatus).equal('string');
    /**
       * @desc TEST FOR VALUES
       */
    expect(validate.error.error).equal(true);
    expect(validate.error.details.error).equal(true);
    expect(validate.error.metadata[0].statusCode).equal(400);
    expect(validate.error.metadata[0].target).equal('signup');
    expect(validate.error.metadata[0].field).equal('fullName');
    expect(validate.error.Stacktrace).equal('Validation Error');
    expect(validate.error.details.operationStatus).equal('Processs Terminated!');
    expect(validate.error.message).equal('FULL NAME should be a proper name, and it should not contain special characters like: (#@$!±^&*+=">?{</}_|)');
  });
});
