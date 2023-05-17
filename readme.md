## Todo-App List
### Aim:
Create a To-Do List API Using Express and Mongo DB
### Description:
This is a simple To-Do List API which can be used to create, read all tasks, update and delete tasks. It is created using Express and Mongo DB.
### Installation:
1. Clone the repository
2. Install the dependencies using `npm init -y` `npm install express mongodb`
3. Run the server using `node server.js`
4. Open the postman and test the API
### Routes:
1. GET `/alltasks` - To get all the tasks
2. POST `/tasks` - To create a new task
3. PUT `/tasks/:id/completed` - To update a task as complete.
4. PUT `/tasks/:id/canceled` - To update a task as cancel
5. GET `/tasks/:id` - To get a task by id
6. DELETE `/tasks/:id` - To delete a task by id
7. GET `/tasks` - To get all the tasks based on its priority and status. It can be filtered by priority and status. 1. First Task (priority)[].
8. GET `/getcount` - To get the count of tasks  as how many are copleted, canceled, active and total number of tasks.

### Usage:
1. To create a new task, use the route `/tasks` with the body as:

```
METHOD: POST
Body: JSON Object with task details(title,priority)
Response:
- Status Code: 201(CREATED)
    - Body:
{
    "task": "Task 1",
    "priority": 1,
    "completed": "false",
    "canceled": "false"

}
- Status Code: 400(BAD REQUEST)
    - Body: {
    "message": "Task validation failed: task: Path `task` is required., priority: Path `priority` is required."
}
```
2. To update a task as complete, use the route `/tasks/:id/completed` with the body as:

```
METHOD: PUT
Params: id
Response:
- Status Code: 200(OK)
    - Body: {
    "task": "Task 1",
    "priority": 1,
    "completed": "true",
    "canceled": "false"

}
- Status Code: 404(NOT FOUND)
    - Body: {
    "message": "Task not found with id "
}

```
3. To update a task as cancel, use the route `/tasks/:id/canceled` with the body as:

```
METHOD: PUT
Params: id
Response:
- Status Code: 200(OK)
    - Body: {
    "task": "Task 1",
    "priority": 1,
    "completed": "false",
    "canceled": "true"

}
- Status Code: 404(NOT FOUND)
    - Body: {
    "message": "Task not found with id "
}

```
4. To get a task by id, use the route `/tasks/:id` with the body as:

```
METHOD: GET
Params: id
Response:
- Status Code: 200(OK)
    - Body: {
    "task": "Task 1",
    "priority": 1,
    "completed": "false",
    "canceled": "false"

}
- Status Code: 404(NOT FOUND)
    - Body: {
    "message": "Task not found with id "
}
```
5. To delete a task by id, use the route `/tasks/:id/deleted` with the body as:

```
METHOD: PUT
Params: id
Response:
- Status Code: 200(OK)
    - Body: {
    "message": "Task deleted successfully!"
}
- Status Code: 404(NOT FOUND)
    - Body: {
    "message": "Task not found with id "
}


```
6. To get all the tasks based on its priority and status, use the route `/tasks` with the body as excluding the deleted tasks:

```
METHOD: GET
Response:
Status Code: 200(OK)
    - Body: [
    {
        Task1(2)[ ],
        Task2(1)[ ],
        }
```
7. To get the count of tasks  as how many are copleted, canceled, active and total number of tasks, use the route `/getcount` with the body as:

```
METHOD: GET
Response:
Status Code: 200(OK)
    - Body: {
    "completed": 1,
    "canceled": 1,
    "pending": 1,
    "total": 3,
    "deleted":1
}
```


### Schema
```
{
    task: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    canceled: {
        type: Boolean,
        required: true
    }
}
```
### Screenshots:
- The screenshots are from postman.
1. To create a new task:
![image](https://i.imgur.com/cVUcvZ6.jpeg)

2. To get all the tasks:
![image](https://i.imgur.com/xzyNISp.jpeg)

3. To get a task by id:
![image](https://i.imgur.com/57S38wZ.jpeg)

4. To get task list based on priority and completion status:
![image](https://i.imgur.com/a4Jo10f.jpeg)

5. To get the count of tasks:
![image](https://i.imgur.com/1U2yfOz.jpeg)


