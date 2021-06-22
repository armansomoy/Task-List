// Define UI Element 
let taskInput = document.getElementById('new_tasks');
let form = document.getElementById('task_form');

let taskList = document.querySelector('ul');

let clearBtn = document.getElementById('clear_task');
let filterBtn = document.getElementById('task_filter');


// Define  Event listener
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filterBtn.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);




// Define Functions

// add Task 
function addTask(e) {
    if (taskInput.value === '') {
        alert('Please Add Task');
    } else {
        // create  li element with
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + ' '));
        taskList.appendChild(li);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);


        storeTaskInLocalStorage(taskInput.value);


        taskInput.value = '';
    }
    e.preventDefault();
}

// Remove Task 
function removeTask(e) {
    if (e.target.hasAttribute('href')) {
        if (confirm('Are you sure you want to remove')) {
            let ele = e.target.parentElement;
            ele.remove();
            // console.log(ele);


            removeFromLocalStorage(ele);
        }

    }
}

// Clear Task 
function clearTask(e) {
    taskList.innerHTML = '';

    // while (taskList.firstChild){
    //     taskList.removeChild(taskList.firstChild);
    // }

    localStorage.clear();
}

// Filter Task 
function filterTask(e) {
    let text = e.target.value.toLowerCase();
    console.log(text);


    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

// store in local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + ' '));
        taskList.appendChild(li);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
    })
}

function removeFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}