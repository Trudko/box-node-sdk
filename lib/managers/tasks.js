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
	TASK_ASSIGNMENTS_PATH = '/task_assignments',
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
 * Used to assign a task to a single user. There can be multiple assignments on a given task.
 *
 * @private
 * @param {string} taskID - The ID of the task this assignment is for
 * @param {Object} assignTo - The user this assignment is for. At least one of id or login is required in this object.
 * @param {Function} callback - Passed the new task assignment information if it was acquired successfully, error otherwise
 * @returns {void}
 */
Tasks.prototype.createAssignment = function(taskID, assignTo, callback) {
	var apiPath = urlPath(TASK_ASSIGNMENTS_PATH),
		params = {
			body: {
				item: {
					type: 'task',
					id: taskID
				},
				assign_to: assignTo
			}
		};

	this.client.post(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Used to assign a task to a single user. There can be multiple assignments on a given task.
 *
 * API Endpoint: '/tasks'
 * Method: POST
 *
 * @param {string} taskID - The ID of the task this assignment is for
 * @param {string} userID - The ID of the user this assignment is for
 * @param {Function} callback - Passed the new task assignment information if it was acquired successfully, error otherwise
 * @returns {void}
 */
Tasks.prototype.createAssignmentWithUserID = function(taskID, userID, callback) {
	var assignTo = {
		id: userID
	};

	this.createAssignment(taskID, assignTo, callback);
};

/**
 * Used to assign a task to a single user. There can be multiple assignments on a given task.
 *
 * API Endpoint: '/tasks'
 * Method: POST
 *
 * @param {string} taskID - The ID of the task this assignment is for
 * @param {string} login - The login of the user this assignment is for.
 * @param {Function} callback - Passed the new task assignment information if it was acquired successfully, error otherwise
 * @returns {void}
 */
Tasks.prototype.createAssignmentWithUserLogin = function(taskID, login, callback) {
	var assignTo = {
		login: login
	};

	this.createAssignment(taskID, assignTo, callback);
};

module.exports = Tasks;
