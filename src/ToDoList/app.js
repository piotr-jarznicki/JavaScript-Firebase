firebase.initializeApp(firebaseConfig);
const firestoreActiveTasks = firebase.firestore().collection("activeTasks");
const firestoreFinishedTasks = firebase.firestore().collection("finishedTasks");
const firestoreDeletedTasks = firebase.firestore().collection("deletedTasks");

firestoreActiveTasks.onSnapshot((activeTasks) => renderTasks(activeTasks));

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

const showSignUpModalButton = get(".sign-up-link");
const showSignInModalButton = get(".sign-in-link");
const signOutButton = get(".sign-out-button");
const signInModal = get(".login-page");
const signUpModal = get(".register-page");

const registerForm = get(".register-form");
const loginForm = get(".login-form");

registerForm.addEventListener("submit", signUpUser);
loginForm.addEventListener("submit", signInUser);

showSignUpModalButton.addEventListener("click", showSignUpModal);
showSignInModalButton.addEventListener("click", showSignInModal);
signOutButton.addEventListener("click", signOutUser);
function showSignUpModal(e) {
  e.preventDefault();

  signInModal.style.display = "none";
  signUpModal.style.display = "flex";
}

function showAppView() {
  signInModal.style.display = "none";
  signUpModal.style.display = "none";
}

function showSignInModal(e) {
  e.preventDefault();

  signInModal.style.display = "flex";
  signUpModal.style.display = "none";
}

function signUpUser(e) {
  e.preventDefault();
  const email = registerForm.email.value;
  const password = registerForm.password.value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      showAppView();
    });

  registerForm.reset();
}

function signOutUser(e) {
  e.preventDefault();

  firebase
    .auth()
    .signOut()
    .then(() => {
      signInModal.style.display = "flex";
      signUpModal.style.display = "none";
    });
}

function signInUser(e) {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      showAppView();
    });
  loginForm.reset();
}

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
    : (activeTasks = [...activeTasks, { id: taskId, text: inputText }]) &&
      firestoreActiveTasks.add({ id: taskId, text: inputText });

  updateValues("create");
  updateMessage();
  firestoreActiveTasks.onSnapshot((activeTasks) => renderTasks(activeTasks));

  createTaskInput.value = "";
}

// function renderTask(tasksArray = activeTasks, htmlTasksList = activeTasksList) {
//   htmlTasksList.innerHTML = "";
//   tasksArray.forEach((task) => {
//     const data = task.data();

//     if (tasksArray === deletedTasks)
//       htmlTasksList.innerHTML += `
//         <li  class="task" id = "${data.id}" >
//                     <div class="task-container ">
//                         <div class="white-background">
//                             <p class="task-info">${data.text}</p>
//                         </div>
//                         <div class="redo-task"> <i class="fas fa-redo"></i></div>
//                     </div>
//         `;
//   });
// }

const renderTasks = (
  tasksArray = activeTasks,
  htmlTasksList = activeTasksList
) => {
  htmlTasksList.innerHTML = "";
  tasksArray.forEach((task) => {
    // console.log(task.id);
    if (tasksArray === deletedTasks) {
      firestoreDeletedTasks.onSnapshot((deletedTasks) =>
        renderTasks(deletedTasks)
      );
      const data = task.data();

      htmlTasksList.innerHTML += `
        <li  class="task" id = "${data.id}" >
                    <div class="task-container ">
                        <div class="white-background">
                            <p class="task-info">${data.text}</p>
                        </div>
                        <div class="redo-task"> <i class="fas fa-redo"></i></div>
                    </div>
        `;
    } else if (tasksArray === finishedTasks) {
      firestoreFinishedTasks.onSnapshot((finishedTasks) =>
        renderTasks(finishedTasks)
      );
      const data = task.data();
      htmlTasksList.innerHTML += `
      <li style="opacity:0.5; pointer-events:none" class="task" id = "${data.id}" >
                  <div class="task-container ">
                      <div class="white-background">
                          <p class="task-info">${data.text}</p>
                      </div>
                      <div  class="delete-task"> <i class="fas fa-trash"></i></div>
                      <div  class="complete-task"><i class="fas fa-check"></i></div>
                  </div>

      `;
    } else {
      // firestoreActiveTasks.onSnapshot((activeTasks) => renderTasks(activeTasks));
      const data = task.data();
      htmlTasksList.innerHTML += `
      <li class="task" id = "${data.id}" >
                  <div class="task-container ">
                      <div class="white-background">
                          <p class="task-info">${data.text}</p>
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
  console.log(activeTasks);
  const taskIndexArr = activeTasks.splice(index, 1);
  console.log(taskIndexArr);

  const deletedTask = taskIndexArr.shift();

  console.log(deletedTask);
  deletedTasks.push(deletedTask);
  firestoreDeletedTasks.add(deletedTask);
  firestoreDeletedTasks.onSnapshot((deletedTasks) => renderTasks(deletedTasks));

  renderTasks();
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
  renderTasks();
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
  renderTasks(deletedTasks, deletedTasksList);
  updateValues("restore");
};

function showActiveTasks() {
  deletedTasksList.style.display = "none";
  activeTasksList.style.display = "block";
  finishedTasksList.style.display = "none";
  createTaskInput.disabled = false;
  renderTasks(activeTasks, activeTasksList);
}
function showDeletedTasks() {
  activeTasksList.style.display = "none";
  deletedTasksList.style.display = "block";
  finishedTasksList.style.display = "none";
  createTaskInput.disabled = true;
  message.style.display = "none";
  renderTasks(deletedTasks, deletedTasksList);
}
function showFinishedTasks() {
  activeTasksList.style.display = "none";
  deletedTasksList.style.display = "none";
  finishedTasksList.style.display = "block";
  createTaskInput.disabled = true;
  message.style.display = "none";
  renderTasks(finishedTasks, finishedTasksList);
}

console.log(activeTasks);
