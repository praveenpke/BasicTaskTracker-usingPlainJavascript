const task_input = document.querySelector("#task-input");
const form = document.querySelector('#task-form');
const clear_btn = document.querySelector(".clear-tasks");
const ul = document.querySelector(".collection");
const filter = document.querySelector('#filter');

console.log(task_input);
console.log(form);
console.log(clear_btn);
console.log(ul);
console.log(filter);

loadAllEvents();

function loadAllEvents() {

    //load tasks from local storage
    document.addEventListener('DOMContentLoaded', loadTasks);
    //submit event
    form.addEventListener("submit", onSubmit);
    //delete task
    ul.addEventListener('click', onRemoveTask);

    //clear All tasks
    clear_btn.addEventListener('click', onClearTasks);
    //filter list items
    filter.addEventListener('keyup', onFilter);


}


//load tasks on dom loaded
function loadTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        link = document.createElement('a');
        link.className = 'secondary-content delete-item';
        link.innerHTML = '<i class="fas fa-times"></i>';
        li.appendChild(link);

        ul.appendChild(li);
    })
}




function onSubmit(e) {

    if (task_input.value === '') {
        alert("Please Enter a Task");

    } else {

        li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task_input.value));

        link = document.createElement('a');
        link.className = 'secondary-content delete-item';
        link.innerHTML = '<i class="fas fa-times"></i>';
        li.appendChild(link);

        ul.appendChild(li);
        console.log(li);
        //storing to Local Storage
        storeToLocal(task_input.value);

    }

    task_input.value = '';
    e.preventDefault();
}



function storeToLocal(task) {

    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



function onRemoveTask(e) {

    value = confirm("Are You Sure?");

    if (value) {
        if (e.target.parentElement.parentElement.classList.contains('delete-item')) {
            console.log(e.target.parentElement.parentElement.parentElement);
            e.target.parentElement.parentElement.parentElement.remove();

            //on remove - remove from local storage

            let tasks;

            if (localStorage.getItem('tasks') === null) {
                tasks = []
            } else {
                tasks = JSON.parse(localStorage.getItem('tasks'));
            }

            task = e.target.parentElement.parentElement.parentElement.firstChild.textContent;

            index = tasks.indexOf(task);
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

}

function onClearTasks(e) {
    console.log(e);
    console.log(ul.children);

    value = confirm("Are You Sure?");

    if (value) {
        while (ul.firstElementChild) {
            ul.firstElementChild.remove();
        }
    }

    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks=[];
    localStorage.setItem('tasks', JSON.stringify(tasks));


    e.preventDefault();
}


function onFilter(e) {
    console.log(e.target.value.toLowerCase());

    enter_value = e.target.value.toLowerCase();

    list_items = document.querySelectorAll('.collection-item').forEach(function (list_item_each) {
        item = list_item_each.firstChild.textContent.toLowerCase();

        console.log(enter_value);
        console.log(item);

        if (item.indexOf(enter_value) != -1) {
            list_item_each.style.display = "block";
        } else {
            list_item_each.style.display = "none";
        }
    })
}