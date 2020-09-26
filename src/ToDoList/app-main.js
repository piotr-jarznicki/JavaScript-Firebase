firebase.initializeApp(firebaseConfig);
const firestoreActiveTasks = firebase.firestore().collection("activeTasks");
const firestoreFinishedTasks = firebase.firestore().collection("finishedTasks");
const firestoreDeletedTasks = firebase.firestore().collection("deletedTasks");
firestoreActiveTasks.onSnapshot((activeTasks) => renderTasks(activeTasks));
firestoreActiveTasks.onSnapshot((activeTasks) => updateValues(activeTasks));
firestoreDeletedTasks.onSnapshot((deletedTasks) => updateValues(deletedTasks));
firestoreFinishedTasks.onSnapshot(() => updateValues);

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
console.log(numberOfTasks)
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
// e.preventDefault();
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
    }).catch(error => alert(error))

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
    })
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
    }).catch(error => alert(error))
  loginForm.reset();
}

function updateValues(tasks) {

    firestoreActiveTasks.get().then((snap) => {
      numberOfTasks[0].innerText = snap.size;
    })
    firestoreDeletedTasks.get().then((snap) => {
      numberOfTasks[2].innerText = snap.size;
    });
  firestoreFinishedTasks.get().then((snap) => {
    numberOfTasks[1].innerText = snap.size;
  });
}

updateValues();
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
  const isInputTextValueEqual0 = inputText.trim().length === 0;
  const isInputTextValueTooLong = inputText.trim().length > maximumLetterAmount;
  isInputTextValueEqual0 || isInputTextValueTooLong
    ? alert("Add valid task text!")
    : firestoreActiveTasks.add({ text: inputText });

  updateMessage();
  createTaskInput.value = "";
}

const renderTasks = (activeTasks) => {
  activeTasksList.innerHTML = "";
  activeTasks !== undefined
    ? activeTasks.forEach((task) => {
        const data = task.data();
        activeTasksList.innerHTML += `
   <li class="task" id = "${task.id}" >
               <div class="task-container ">
                   <div class="white-background">
                       <p class="task-info">${data.text}</p>
                   </div>
                   <div class="delete-task"> <i class="fas fa-trash"></i></div>
                   <div class="complete-task"><i class="fas fa-check"></i></div>
               </div>
   `;
      })
    : console.log("elko");

  const deleteTaskButtons = getAll("li.task .task-container .delete-task");
  deleteTaskButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", deleteTask);
  });

  const finishTaskButtons = getAll("li.task .task-container .complete-task");
  finishTaskButtons.forEach((finishButton) => {
    finishButton.addEventListener("click", finishTask);
  });
};

const renderDeletedTasks = (deletedTasks) => {
  deletedTasksList.innerHTML = "";
  deletedTasks.forEach((task) => {
    const data = task.data();
    deletedTasksList.innerHTML += `
    <li class="task" id = "${task.id}" >
    <div class="task-container ">
        <div class="white-background">
            <p class="task-info">${data.text}</p>
        </div>
        <div class="redo-task"> <i class="fas fa-redo"></i></div>
    </div>
     `;
  });

  const restoreTaskButtons = getAll("li.task .task-container .redo-task");
  restoreTaskButtons.forEach((restoreButton) => {
    restoreButton.addEventListener("click", restoreTask);
  });
};

const renderFinishedTasks = (finishedTasks) => {
  finishedTasksList.innerHTML = "";
  finishedTasks.forEach((task) => {
    const data = task.data();

    finishedTasksList.innerHTML += `
      <li style="opacity:0.5; pointer-events:none" class="task" id = "${data.id}" >
      <div class="task-container ">
          <div class="white-background">
              <p class="task-info">${data.text}</p>
          </div>
          <div  class="delete-task"> <i class="fas fa-trash"></i></div>
          <div  class="complete-task"><i class="fas fa-check"></i></div>
      </div>
       `;
  });
};

const deleteTask = (e) => {
  const taskId = e.target.parentElement.parentElement.id;

  firestoreActiveTasks
    .doc(taskId)
    .get()
    .then((task) => {
      firestoreDeletedTasks.add(task.data());
      firestoreActiveTasks
        .doc(taskId)
        .delete()
        .then((el) => {
          console.log(el);
        });
    })
    .catch((error) => {});

  updateMessage();
};

const finishTask = (e) => {
  const taskId = e.target.parentElement.parentElement.id;
  firestoreActiveTasks
    .doc(taskId)
    .get()
    .then((task) => {
      firestoreFinishedTasks.add(task.data());
      firestoreActiveTasks
        .doc(taskId)
        .delete()
        .then((el) => {
          console.log(el);
        });
    })
    .catch((error) => {});
};

const restoreTask = (e) => {
  const taskId = e.target.parentElement.parentElement.id;

  firestoreDeletedTasks
    .doc(taskId)
    .get()
    .then((task) => {
      firestoreActiveTasks.add(task.data());
      firestoreDeletedTasks
        .doc(taskId)
        .delete()
        .then(() => {});
    })
    .catch((error) => {});
};

function showActiveTasks() {
  firestoreActiveTasks.onSnapshot((activeTasks) => renderTasks(activeTasks));
  deletedTasksList.style.display = "none";
  activeTasksList.style.display = "block";
  finishedTasksList.style.display = "none";
  createTaskInput.disabled = false;
  renderTasks(activeTasks, activeTasksList);
}
function showDeletedTasks() {
  firestoreDeletedTasks.onSnapshot((deletedTasks) =>
    renderDeletedTasks(deletedTasks)
  );
  activeTasksList.style.display = "none";
  deletedTasksList.style.display = "block";
  finishedTasksList.style.display = "none";
  createTaskInput.disabled = true;
  message.style.display = "none";
  renderTasks(deletedTasks, deletedTasksList);
}
function showFinishedTasks() {
  firestoreFinishedTasks.onSnapshot((finishedTasks) =>
    renderFinishedTasks(finishedTasks)
  );
  activeTasksList.style.display = "none";
  deletedTasksList.style.display = "none";
  finishedTasksList.style.display = "block";
  createTaskInput.disabled = true;
  message.style.display = "none";
  renderFinishedTasks(finishedTasks, finishedTasksList);
}
