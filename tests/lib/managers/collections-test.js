/**
 * @fileoverview Collections Manager Tests
 * @author tjin
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var sinon = require('sinon'),
	mockery = require('mockery'),
	leche = require('leche');

var BoxClient = require('../../../lib/box-client');


// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------
var sandbox = sinon.sandbox.create(),
	boxClientFake = leche.fake(BoxClient.prototype),
	Collections,
	collections,
	FOLDER_ID = '4567',
	MODULE_FILE_PATH = '../../../lib/managers/collections';


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

describe('Collections', function() {

	before(function() {
		// Enable Mockery
		mockery.enable({ useCleanCache: true });
		// Register Mocks
		mockery.registerAllowable('../util/url-path');
		mockery.registerAllowable(MODULE_FILE_PATH);
	});

	beforeEach(function() {
		// Setup File Under Test
		Collections = require(MODULE_FILE_PATH);
		collections = new Collections(boxClientFake);
	});

	afterEach(function() {
		sandbox.verifyAndRestore();
		mockery.resetCache();
	});

	after(function() {
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('getAll()', function() {

		it('should make GET request to get all collections info when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/collections');
			collections.getAll();
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/collections').yieldsAsync();
			collections.getAll(done);
		});

	});

	describe('getItems()', function() {

		var collectionID,
			testQS = { testQSKey: 'testQSValue' };

		beforeEach(function() {
			collectionID = '1234';
		});

		it('should make GET request to get all items from a collection when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('get').withArgs('/collections/1234/items');
			collections.getItems(collectionID);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').returns(done);
			sandbox.stub(boxClientFake, 'get').withArgs('/collections/1234/items', {qs: testQS}).yieldsAsync();
			collections.getItems(collectionID, testQS, done);
		});

	});

	describe('update()', function() {

		var collectionList,
			expectedParams;

		beforeEach(function() {
			collectionList = [{id: '1234'},{id: '5678'}];
			expectedParams = {
				body: {
					collections: collectionList
				}
			};
		});

		it('should make PUT request to create or delete item from a collection when called', function() {
			sandbox.stub(boxClientFake, 'defaultResponseHandler');
			sandbox.mock(boxClientFake).expects('put').withArgs('/folders/' + FOLDER_ID, expectedParams);
			collections.update(FOLDER_ID, ['1234', '5678']);
		});

		it('should call BoxClient defaultResponseHandler method with the callback when response is returned', function(done) {
			sandbox.mock(boxClientFake).expects('defaultResponseHandler').withArgs(done).returns(done);
			sandbox.stub(boxClientFake, 'put').withArgs('/folders/' + FOLDER_ID).yieldsAsync();
			collections.update(FOLDER_ID, ['1234', '5678'], done);
		});
	});

});
