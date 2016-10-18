Tasks
=====

Tasks enable file-centric workflows in Box. User can create tasks on files and assign them to collaborators on Box.

* [Create a Task](#create-a-task)
* [Get Assignments](#get-assignments)

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

Get Assignments
---------------

To get all assignments for a task call the [`tasks.getAssignments(taskID, qs, callback)`](http://opensource.box.com/box-node-sdk/Tasks.html#getAssignments) method.  Use the `qs` parameter to specify the desired task assignment fields.
```js
client.tasks.getAssignments(
	'1234',{fields: 'resolution_state,item'}, callback
);
```
