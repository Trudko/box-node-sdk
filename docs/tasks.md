Tasks
=====

Tasks enable file-centric workflows in Box. User can create tasks on files and assign them to collaborators on Box.

* [Create a Task](#create-a-task)
* [Update a Task Assignment](#update-a-task-assignment)

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

Update a Task Assignment
------------------------

To update a task assignment call the [`tasks.updateAssignment(assignmentID, options, callback)`](http://opensource.box.com/box-node-sdk/Tasks.html#updateAssignment) method.

```js
client.tasks.updateAssignment(
	'1234',
	{
		message: 'Optional Message',
		resolutionState: client.resolutionStates.COMPLETED
	},
	callback
);
```
