const get = (...args) => document.querySelector(...args);
const getAll = (...args) => document.querySelectorAll(...args);

const activeTasksButton = get(".active-tasks");
const finishedTasksButton = get(".finished-tasks");
const deletedTasksButton = get(".deleted-tasks");

const createTaskButton = get(".btn-add-task");

const createTaskInput = get(".add-task-input");
const activeTasksList = get(".active-tasks-list");
const deletedTasksList = get(".deleted-tasks-list");

const numberOfTasks = getAll(".task-number");

let activeTasks = [];
let deletedTasks = [];
const updateValues = (actionType) => {
  // Zamień to na switcha.
  if (actionType === "create") {
    numberOfTasks[0].innerText = activeTasks.length;
  } else if (actionType === "delete") {
    numberOfTasks[2].innerText = deletedTasks.length;
    numberOfTasks[0].innerText = activeTasks.length;
  }
};

createTaskButton.addEventListener("click", createTask);
function createTask() {
  const inputText = createTaskInput.value;
  if (inputText.trim().length === 0) {
    alert("Add valid task text!");
  } else {
    const id = activeTasks.length;
    activeTasks = [...activeTasks, { id: id, text: inputText }];
    updateValues("create");
    renderTask();
  }
}

const renderTask = (tempActiveTasks) => {
  const del = tempActiveTasks;
  console.log(del);
  if (true) {
    activeTasksList.innerHTML = "";
    activeTasks.forEach((task) => {
      activeTasksList.innerHTML += `
        <li class="task" id = "${task.id}" >
                    <div class="task-container ">
                        <div class="white-background">
                            <p class="task-info">${
                              activeTasks[task.id].text
                            }</p>
                        </div>
                        <div class="delete-task"> <i class="fas fa-trash"></i></div>
                        <div class="complete-task"><i class="fas fa-check"></i></div>
                    </div> 
    
        `;
    });
    const deleteTaskButtons = getAll("li.task .task-container .delete-task");
    deleteTaskButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", deleteTask);
    });
  }
};

const deleteTask = (e) => {
  const taskId = e.target.parentElement.parentElement.id;

  console.log("task.id:", activeTasks[taskId].id, "tasketargetId:", taskId);

  const el = activeTasks.splice(activeTasks[taskId], 1);
  const kk = [...el];
  // W deletedTask nie będzie zachowana kolejność id, trzeba find index
  deletedTasks.push(kk);
  console.log(deletedTasks);
  renderTask(activeTasks);
  console.log(activeTasks);
  console.log(kk);

  updateValues("delete");
};
