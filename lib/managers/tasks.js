/**
 * @fileoverview Manager for the Tasks Resource
 * @author ptoth
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var urlPath = require('../util/url-path');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
var BASE_PATH = '/tasks',
	ASSIGNMENT_SUBRESOURCE_PATH = '/assignments',
	REVIEW_ACTION = 'review';

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'Tasks' endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function Tasks(client) {
	this.client = client;
}

/**
 * Used to create a single task for single user on a single file.
 *
 * API Endpoint: '/tasks'
 * Method: POST
 *
 * @param {String} fileID - The ID of the item this task is for
 * @param {?Object} options - Additional parameters
 * @param {string} [options.message] - An optional message to include with the task
 * @param {string} [options.dueAt] - The day at which this task is due
 * @param {Function} callback - Passed the new task information if it was acquired successfully, error otherwise
 * @returns {void}
 */
Tasks.prototype.create = function(fileID, options, callback) {
	var apiPath = urlPath(BASE_PATH),
		params = {
			body: {
				item: {
					type: 'file',
					id: fileID
				},
				action: REVIEW_ACTION
			}
		};

	if (options && options.message) {
		params.body.message = options.message;
	}

	if (options && options.dueAt) {
		params.body.due_at = options.dueAt;
	}

	this.client.post(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Retrieves all of the assignments for a given task.
 *
 * API Endpoint: '/tasks/:taskID/assignments'
 * Method: GET
 *
 * @param {String} taskID - The Box ID of task to retrieve assignments for
 * @param {?Object} qs - Additional options can be passed with the request via querystring
 * @param {Function} callback - Passed the task assignments if it was acquired successfully, error otherwise
 * @returns {void}
 */
Tasks.prototype.getAssignments = function(taskID, qs, callback) {
	var apiPath = urlPath(BASE_PATH, taskID, ASSIGNMENT_SUBRESOURCE_PATH),
		params = {
			qs: qs
		};

	this.client.get(apiPath, params, this.client.defaultResponseHandler(callback));
};

module.exports = Tasks;
