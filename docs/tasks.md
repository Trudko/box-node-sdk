Tasks
=====

Tasks enable file-centric workflows in Box. User can create tasks on files and assign them to collaborators on Box.

* [Create a Task](#create-a-task)
* [Get an Assignment Information](#get-an-assignment-information)

Create a Task
-------------

To create a task call the [`tasks.create(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/Tasks.html#create) method.

```js
client.tasks.create(
	'1234',
	{
		message: 'Optional Message',
		dueAt: '2014-04-03T11:09:43-07:00'
	},
	callback
);
```

Get an Assignment Information
-----------------------------

To get a task assignment information call the [`tasks.getAssignment(assignmentID, qs, callback)`](http://opensource.box.com/box-node-sdk/Tasks.html#getAssignment) method.

```js
client.tasks.getAssignment('1234', null, callback);
```

Requesting information for only the fields you need with the `fields` query
string parameter can improve performance and reduce the size of the network
request.

```js
client.tasks.getAssignment('1234', {fields: 'assigned_to,resolution_state'}, callback);
```