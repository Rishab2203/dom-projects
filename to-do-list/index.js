let tasks = [];

let isInList = false;

let tasks_list = document.querySelector(".tasks-list");
let input = document.querySelector(".task-input");

function renderTasks() {
  tasks_list.innerHTML = "";
  tasks.forEach(({ id, task, completed }) => {
    let li = document.createElement("li");

    li.innerHTML = `<div>
     <input ${
       completed ? "checked" : ""
     } onChange=editCompletion(${id}) type ="checkbox">
    <span id=${id}>${task}</span>
    </div>
   
    <div>
     <button class="btn" onClick= editTask(${id})>Edit</button>
        <button class="btn" onClick = deleteTask(${id})>Delete</button>
    </div>
       `;

    tasks_list.appendChild(li);
  });
}

function editCompletion(uinqId) {
  let selectedTask = tasks.filter((task) => task.id === uinqId);
  selectedTask[0].completed = !selectedTask[0].completed;

  renderTasks();
}

function addTask() {
  let newTask = { task: input.value.trim() };
  newTask.id = Date.now();
  newTask.completed = isInList ? true : false;
  isInList = false;
  if (newTask.task === "") return;
  input.value = "";
  tasks.push(newTask);
  console.log(tasks);

  tasks_list.innerHTML = "";
  renderTasks();
}

let add_btn = document.querySelector(".add-btn");

add_btn.addEventListener("click", addTask);

function editTask(uniqId) {
  isInList = true;
  let selectedTask = tasks.filter((task) => task.id === uniqId);
  input.value = selectedTask[0].task;
  deleteTask(uniqId);
}
function deleteTask(uniqId) {
  tasks = tasks.filter((task) => task.id != uniqId);
  renderTasks();
}
