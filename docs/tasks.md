Tasks
=====

Tasks enable file-centric workflows in Box. User can create tasks on files and assign them to collaborators on Box.

* [Create a Task](#create-a-task)
* [Delete a Task Assignement](#delete-a-task-assignement)

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

Delete A Task Assignment
------------------------

To permanently delete a task assignment call the [`tasks.deleteAssignement(assignmentID, callback)`](http://opensource.box.com/box-node-sdk/Tasks.html#deleteAssignement) method.

```js
client.tasks.deleteAssignement('1234', callback);
```
