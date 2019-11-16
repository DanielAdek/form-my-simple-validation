import { expect } from 'chai';
import { Form } from '../../app';


describe('VALIDATION', () => {
  describe('MUST BE FUNCTION', () => {
    it('Should be a function', () => {
      const validate = Form.validateFields;
      expect(typeof validate).to.be.equal('function');
    });
  });

  describe('ARGUMENTS', () => {
    it('Should return an object containing message (Expected first argument should be string)', () => {
      const validate = Form.validateFields();
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
      expect(validate.error.metadata[0].field).equal('argument');
      expect(validate.error.metadata[0].target).equal('formType');
      expect(validate.error.metadata[0].statusCode).equal(400);
      expect(validate.error.Stacktrace).equal('Unexpected Data-Type!');
      expect(validate.error.details.operationStatus).equal('Processs Terminated!');
      expect(validate.error.message).equal('Expected first argument should be string');
    });


    it('Should return an object containing message (Expected second argument to be provided)', () => {
      const validate = Form.validateFields('login', '');
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
      expect(validate.error.metadata[0].field).equal('argument');
      expect(validate.error.metadata[0].target).equal('requestSchema');
      expect(validate.error.metadata[0].statusCode).equal(400);
      expect(validate.error.Stacktrace).equal('Unexpected Data-Type!');
      expect(validate.error.details.operationStatus).equal('Processs Terminated!');
      expect(validate.error.message).equal('Expected second argument to be provided');
    });


    it('Should return an object containing message (Second argument cannot be null or undefind', () => {
      const validate = Form.validateFields('login', null);
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
      expect(validate.error.metadata[0].field).equal('argument');
      expect(validate.error.metadata[0].target).equal('requestSchema');
      expect(validate.error.metadata[0].statusCode).equal(400);
      expect(validate.error.Stacktrace).equal('Unexpected Data-Type!');
      expect(validate.error.details.operationStatus).equal('Processs Terminated!');
      expect(validate.error.message).equal('Second argument cannot be null or undefind');
    });

    it('Should return an object containing message (Expected second argument to be of an object: Your request schema should follow the format below)', () => {
      const validate = Form.validateFields('login', []);
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
      expect(validate.error.metadata[0].field).equal('argument');
      expect(validate.error.metadata[0].target).equal('requestSchema');
      expect(validate.error.metadata[0].statusCode).equal(400);
      expect(validate.error.Stacktrace).equal('Unexpected Data-Type!');
      expect(validate.error.details.operationStatus).equal('Processs Terminated!');
      expect(validate.error.message).equal('Expected second argument to be of an object: Your request schema should follow the format below');
    });


    it('Should return an object containing message (Request_Schema should not be empty)', () => {
      const validate = Form.validateFields('login', {});
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
      expect(validate.error.metadata[0].field).equal('argument');
      expect(validate.error.metadata[0].target).equal('requestSchema');
      expect(validate.error.metadata[0].statusCode).equal(400);
      expect(validate.error.Stacktrace).equal('Unexpected Data');
      expect(validate.error.details.operationStatus).equal('Processs Terminated!');
      expect(validate.error.message).equal('Request_Schema should not be empty');
    });


    it('Should return an object containing message (Your request schema should follow the format below)', () => {
      const validate = Form.validateFields('login', { login: [] });
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
      expect(validate.error.metadata[0].field).equal('argument');
      expect(validate.error.metadata[0].target).equal('requestSchema');
      expect(validate.error.metadata[0].statusCode).equal(400);
      expect(validate.error.Stacktrace).equal('Unexpected Data-Type!');
      expect(validate.error.details.operationStatus).equal('Processs Terminated!');
      expect(validate.error.message).equal('Your request schema should follow the format below');
    });


    it('Should return an object containing message (Your request schema should follow the format below)', () => {
      const validate = Form.validateFields('login', { login: null });
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
      expect(validate.error.metadata[0].field).equal('argument');
      expect(validate.error.metadata[0].target).equal('requestSchema');
      expect(validate.error.metadata[0].statusCode).equal(400);
      expect(validate.error.Stacktrace).equal('Unexpected Data-Type!');
      expect(validate.error.details.operationStatus).equal('Processs Terminated!');
      expect(validate.error.message).equal('Your request schema should follow the format below');
    });


    it('Should return an object containing message (Your request schema should follow the format below)', () => {
      const validate = Form.validateFields('login', { login: {} });
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
      expect(validate.error.metadata[0].field).equal('argument');
      expect(validate.error.Stacktrace).equal('Unexpected Data-Type!');
      expect(validate.error.details.operationStatus).equal('Processs Terminated!');
      expect(validate.error.metadata[0].target).equal('formType missing in requestSchema');
      expect(validate.error.message).equal('Your request schema should follow the format below');
    });


    it('Should return an object containing message (Pre-define your inputs. Follow the format below)', () => {
      const validate = Form.validateFields('login', { login: { formType: 'login' } });
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
      expect(validate.error.Stacktrace).equal('Unexpected!');
      expect(validate.error.metadata[0].statusCode).equal(400);
      expect(validate.error.metadata[0].target).equal('Form property');
      expect(validate.error.metadata[0].field).equal('fields-not-found');
      expect(validate.error.details.operationStatus).equal('Processs Terminated!');
      expect(validate.error.message).equal('Pre-define your inputs. Follow the format below');
    });


    it('Should return an object containing message (No Requirement found for input field)', () => {
      const validate = Form.validateFields('login', { login: { formType: 'login', fullName: {} } });
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
      expect(validate.error.Stacktrace).equal('Unexpected Data!');
      expect(validate.error.metadata[0].statusCode).equal(400);
      expect(validate.error.metadata[0].target).equal('Schema.login');
      expect(validate.error.metadata[0].field).equal('login.fullName');
      expect(validate.error.details.operationStatus).equal('Processs Terminated!');
      expect(validate.error.message).equal('No Requirement found for input field');
    });


    it('Should return an object containing message (Schema object property "field" is missing or is not a string. Follow the format below)', () => {
      const validate = Form.validateFields('login', { login: { formType: 'login', fullName: { required: true } } });
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
      expect(validate.error.Stacktrace).equal('Unexpected Data-Type!');
      expect(validate.error.metadata[0].statusCode).equal(400);
      expect(validate.error.metadata[0].target).equal('Schema.login');
      expect(validate.error.metadata[0].field).equal('login.fullName');
      expect(validate.error.details.operationStatus).equal('Processs Terminated!');
      expect(validate.error.message).equal('Schema object property "field" is missing or is not a string. Follow the format below');
    });


    it('Should return an object containing message (Schema object property "field" is missing or is not a string. Follow the format below)', () => {
      const validate = Form.validateFields('login', { login: { formType: 'login', fullName: { field: null } } });
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
      expect(validate.error.Stacktrace).equal('Unexpected Data-Type!');
      expect(validate.error.metadata[0].statusCode).equal(400);
      expect(validate.error.metadata[0].target).equal('Schema.login');
      expect(validate.error.metadata[0].field).equal('login.fullName');
      expect(validate.error.details.operationStatus).equal('Processs Terminated!');
      expect(validate.error.message).equal('Schema object property "field" is missing or is not a string. Follow the format below');
    });


    it('Should return an object containing message ("field" should be not be empty". Follow the format below)', () => {
      const validate = Form.validateFields('login', { login: { formType: 'login', fullName: { field: '' } } });
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
      expect(validate.error.Stacktrace).equal('Unexpected empty field!');
      expect(validate.error.metadata[0].statusCode).equal(400);
      expect(validate.error.metadata[0].target).equal('Schema.login');
      expect(validate.error.metadata[0].field).equal('login.fullName');
      expect(validate.error.details.operationStatus).equal('Processs Terminated!');
      expect(validate.error.message).equal('"field" should be not be empty". Follow the format below');
    });


    it('Should return an object containing message (Expected third argument to be of an object: e.g { data: "my-data-value" }', () => {
      const validate = Form.validateFields('login', { login: { formType: 'login', fullName: { field: 'fullName' } } });
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
      expect(validate.error.Stacktrace).equal('Expected Request-Body!');
      expect(validate.error.metadata[0].field).equal('argument');
      expect(validate.error.metadata[0].target).equal('requestBody');
      expect(validate.error.details.operationStatus).equal('Processs Terminated!');
      expect(validate.error.message).equal('Expected third argument to be of an object: e.g { data: "my-data-value" }');
    });
  });
});
