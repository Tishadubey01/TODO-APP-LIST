 require("../routes/controller");
const taskForm = document.getElementById('taskForm');
const title= document.getElementById('title');
const priority= document.getElementById('priority');
const getcount= document.getElementById('getcount');
taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title1 = title.value;
    try{
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title1})
        });
        if(response.ok){
            title.value='';
            fetchTasks();
            fetchTaskCount();
    }
    }catch(error){
        console.log(error);
    }
});
// async function fetchTasks(){
//     try{
//         const response = await fetch('/tasks');
//         const tasks = await response.json();
//         renderTasks(tasks);
//     }catch(error){
//         console.log(error);
//     }
// }
// async function fetchTaskCount(){
//     try{
//         const response = await fetch('/getcount');
//         const count = await response.json();
//         renderTaskCount(count);
//     }catch(error){
//         console.log(error);
//     }

// }
// function renderTasks(tasks){
//     taskList.innerHTML='';
//     tasks.forEach((task,index) => {
//         const li = document.createElement('li');
//         li.textContent=task.title;
//         taskList.appendChild(li);
//     });
// }
// function renderTaskCount(count){
//     count.innerHTML='';
//     count.textContent=count;
// }
//fetchTasks();
fetchTaskCount();


// taskForm.addEventListener('submit', create);
async function findAll() {
    const response = await fetch('/alltasks');
    const data = await response.json();
    data.sort((a, b) => a.priority - b.priority);
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    data.forEach((task,index) => {
        const li = document.createElement('li');
        li.classList.add('task');
        if(task.completed){
            li.classList.add('completed');
        } else if(task.canceled){
            li.classList.add('canceled');
        }
        const title= document.createElement('span');
        title.classList.add('title');

        title.textContent= `${index+1}. ${task.title} (${task.priority}) `;
        li.appendChild(title);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', async () => {
            completed(task._id, checkbox.checked);
        });
        li.appendChild(checkbox);
        const complete= document.createElement('button');
        complete.textContent = 'completed';
        complete.addEventListener('click', async () => {
            completed(task._id, true);
        });
        li.appendChild(complete);

        const cancel = document.createElement('button');
        cancel.textContent = 'canceled';
        cancel.addEventListener('click', async () => {
            canceled(task._id, true);
        });
        li.appendChild(cancel);
        const del = document.createElement('button');
        del.textContent = 'deleted';
        del.addEventListener('click', async () => {
            deleted(task._id);
        });
        li.appendChild(del);

        taskList.appendChild(li);
    });
}
//findAll();
// }
async function create(event){
    event.preventDefault();
    const title = document.getElementById('title').value;
    const priority = document.getElementById('priority').value;
    const response = await fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, priority })
    });
    if(response.ok){
        findAll();
        title.value='';
        priority.value='';

    }

}
async function completed(id, completed){
    const response = await fetch(`/tasks/${id}/completed`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed })
    });
    if(response.ok){
        findAll();
    }
}
async function canceled(id, cancel){
    const response = await fetch(`/tasks/${id}/canceled`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ canceled })
    });
    if(response.ok){
        findAll();
    }
}
async function deleted(id){
    const response = await fetch(`/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok){
        findAll();
    }
}

async function getcount() {
    const response = await fetch('/getcount');
    const data = await response.json();
    return data;
}

 findAll();
