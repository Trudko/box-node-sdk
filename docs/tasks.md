Tasks
=====

Tasks enable file-centric workflows in Box. User can create tasks on files and assign them to collaborators on Box.

* [Create a Task](#create-a-task)
* [Create Task Assignment With User ID](#create-task-assignment-with-user-id)
* [Create Task Assignment With User Login](#create-task-assignment-with-user-login)

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

Create Task Assignment With User ID
-----------------------------------

To create a task Assignment by using user ID call the [`tasks.createAssignmentWithUserID(taskID, userID, callback)`](http://opensource.box.com/box-node-sdk/Tasks.html#createAssignmentWithUserID) method.

```js
client.tasks.createAssignmentWithUserID('1234', '1234', callback);
```

Create Task Assignment With User Login
--------------------------------------
To create a task Assignment by using user ID call the [`tasks.createAssignmentWithUserLogin(taskID, login, callback)`](http://opensource.box.com/box-node-sdk/Tasks.html#createAssignmentWithUserLogin) method.

```js
client.tasks.createAssignmentWithUserLogin('1234','sean@box.com', callback);
```
