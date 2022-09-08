const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListener();


function loadEventListener(){
  document.addEventListener('DOMContentLoaded', getTask)
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearButton.addEventListener('click', clearTask);
  filter.addEventListener('keyup', filterTask);
}

function getTask(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    li = document.createElement('li');

    li.className = 'collection-item';
  
    li.appendChild(document.createTextNode(task));
  
    link = document.createElement('a');
  
    link.className = 'delete-item secondary-content';
  
    link.innerHTML = '<i class="fa fa-remove"></i>';
  
    li.appendChild(link);
  
    taskList.appendChild(li);
  });
}

function addTask(e){
  if(taskInput.value === ''){
    alert('Add a Task')
  }
  
  li = document.createElement('li');

  li.className = 'collection-item';

  li.appendChild(document.createTextNode(taskInput.value));

  link = document.createElement('a');

  link.className = 'delete-item secondary-content';

  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  taskList.appendChild(li);

  storeInLocalStorage(taskInput.value);

  //Clear Value
  taskInput.value = '';


  e.preventDefault();
}



function storeInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();

      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTask(){
  // taskList.innerHTML = '';

  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage(){
  localStorage.clear();
}

function filterTask(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent
    if(item.toLocaleLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else{
      task.style.display = 'none';
    }
  });
}