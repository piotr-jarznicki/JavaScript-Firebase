const get = (...args) => document.querySelector(...args);
const getAll = (...args) => document.querySelectorAll(...args);

const activeTasksTile = get(".active-tasks");
const finishedTasksTile = get(".finished-tasks");
const deletedTasksTile = get(".deleted-tasks");

const createTaskButton = get(".btn-add-task");
const createTaskInput = get(".add-task-input");

const activeTasksList = get(".active-tasks-list");
const deletedTasksList = get(".deleted-tasks-list");
const finishedTasksList = get(".finished-tasks-list");

const numberOfTasks = getAll(".task-number");

const message = get(".message");

const inputContainer = get(".input-container");

activeTasksTile.addEventListener("click", showActiveTasks);
deletedTasksTile.addEventListener("click", showDeletedTasks);
finishedTasksTile.addEventListener("click", showFinishedTasks);

let activeTasks = [];
let deletedTasks = [];
let finishedTasks = [];

const updateValues = (actionType) => {
  // Zamień to na switcha.
  if (actionType === "create") {
    numberOfTasks[0].innerText = activeTasks.length;
  } else if (actionType === "delete") {
    numberOfTasks[2].innerText = deletedTasks.length;
    numberOfTasks[0].innerText = activeTasks.length;
  } else if (actionType === "finish") {
    numberOfTasks[1].innerText = finishedTasks.length;
    numberOfTasks[0].innerText = activeTasks.length;
  } else if (actionType === "restore") {
    numberOfTasks[2].innerText = deletedTasks.length;
    numberOfTasks[0].innerText = activeTasks.length;
  }
};

const updateMessage = () => {
  if (activeTasks.length > 0) {
    message.style.display = "none";
  } else {
    message.style.display = "block";
  }
};

createTaskButton.addEventListener("click", createTask);
function createTask() {
  const maximumLetterAmount = 40;
  const inputText = createTaskInput.value;
  const taskId = activeTasks.length;
  const isInputTextValueEqual0 = inputText.trim().length === 0;
  const isInputTextValueTooLong = inputText.trim().length > maximumLetterAmount;
  isInputTextValueEqual0 || isInputTextValueTooLong
    ? alert("Add valid task text!")
    : (activeTasks = [...activeTasks, { id: taskId, text: inputText }]);
  updateValues("create");
  updateMessage();
  renderTask();
  createTaskInput.value = "";
}

const renderTask = (
  tasksArray = activeTasks,
  htmlTasksList = activeTasksList
) => {
  htmlTasksList.innerHTML = "";
  tasksArray.forEach((task) => {
    if (tasksArray === deletedTasks)
      htmlTasksList.innerHTML += `
        <li  class="task" id = "${task.id}" >
                    <div class="task-container ">
                        <div class="white-background">
                            <p class="task-info">${task.text}</p>
                        </div>
                        <div class="redo-task"> <i class="fas fa-redo"></i></div>
                    </div>
        `;
    else if (tasksArray === finishedTasks) {
      htmlTasksList.innerHTML += `
      <li style="opacity:0.5; pointer-events:none" class="task" id = "${task.id}" >
                  <div class="task-container ">
                      <div class="white-background">
                          <p class="task-info">${task.text}</p>
                      </div>
                      <div  class="delete-task"> <i class="fas fa-trash"></i></div>
                      <div  class="complete-task"><i class="fas fa-check"></i></div>
                  </div>

      `;
    } else {
      htmlTasksList.innerHTML += `
      <li class="task" id = "${task.id}" >
                  <div class="task-container ">
                      <div class="white-background">
                          <p class="task-info">${task.text}</p>
                      </div>
                      <div class="delete-task"> <i class="fas fa-trash"></i></div>
                      <div class="complete-task"><i class="fas fa-check"></i></div>
                  </div>

      `;
    }
  });
  const deleteTaskButtons = getAll("li.task .task-container .delete-task");
  deleteTaskButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", deleteTask);
  });

  const finishTaskButtons = getAll("li.task .task-container .complete-task");
  finishTaskButtons.forEach((finishButton) => {
    finishButton.addEventListener("click", finishTask);
  });

  const restoreTaskButtons = getAll("li.task .task-container .redo-task");
  restoreTaskButtons.forEach((restoreButton) => {
    restoreButton.addEventListener("click", restoreTask);
  });
};

const deleteTask = (e) => {
  const taskId = e.target.parentElement.parentElement.id;
  const index = activeTasks.findIndex((task) => {
    if (task.id === Number(taskId)) {
      return true;
    }
  });

  const taskIndexArr = activeTasks.splice(index, 1);
  const deletedTask = taskIndexArr.shift();
  deletedTasks.push(deletedTask);
  renderTask();
  updateValues("delete");
  updateMessage();
};

const finishTask = (e) => {
  const taskId = e.target.parentElement.parentElement.id;
  const index = activeTasks.findIndex((task) => {
    if (task.id === Number(taskId)) {
      return true;
    }
  });
  const taskIndexArr = activeTasks.splice(index, 1);
  const finishedTask = taskIndexArr.shift();
  finishedTasks.push(finishedTask);
  renderTask();
  updateValues("finish");
};

const restoreTask = (e) => {
  const taskId = e.target.parentElement.parentElement.id;
  const index = deletedTasks.findIndex((task) => {
    if (task.id === Number(taskId)) {
      return true;
    }
  });
  const taskIndexArr = deletedTasks.splice(index, 1);
  const restoredTask = taskIndexArr.shift();
  activeTasks.push(restoredTask);
  renderTask(deletedTasks, deletedTasksList);
  updateValues("restore");
};

function showActiveTasks() {
  deletedTasksList.style.display = "none";
  activeTasksList.style.display = "block";
  finishedTasksList.style.display = "none";
  createTaskInput.disabled = false;
  renderTask(activeTasks, activeTasksList);
}
function showDeletedTasks() {
  activeTasksList.style.display = "none";
  deletedTasksList.style.display = "block";
  finishedTasksList.style.display = "none";
  createTaskInput.disabled = true;
  message.style.display = "none";
  renderTask(deletedTasks, deletedTasksList);
}
function showFinishedTasks() {
  activeTasksList.style.display = "none";
  deletedTasksList.style.display = "none";
  finishedTasksList.style.display = "block";
  createTaskInput.disabled = true;
  message.style.display = "none";
  renderTask(finishedTasks, finishedTasksList);
}
