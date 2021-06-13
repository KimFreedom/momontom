const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pendingUL = document.querySelector(".js-pendingUL"),
  finishedUL = document.querySelector(".js-finishedUL");

const PENDING_LS = "PENDING",
  FINISHED_LS = "FINISHED";
let pendingTasks = [],
  finishedTasks = [];

  function savePendingTasks() {
    localStorage.setItem(PENDING_LS, JSON.stringify(pendingTasks));
  }
  
  function saveFinishedTasks() {
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishedTasks));
  }
  
  function getDeletePendingTaskButton() {
    const deleteTask = document.createElement("button");
    deleteTask.innerText = "❌";
    deleteTask.addEventListener("click", handleDeletePendingTask);
    return deleteTask;
  }
  
  function getDeleteFinishedTaskButton() {
    const deleteTask = document.createElement("button");
    deleteTask.innerText = "❌";
    deleteTask.addEventListener("click", handleDeleteFinishedTask);
    return deleteTask;
  }
  
  function getMoveToPendingButton() {
    const moveToPending = document.createElement("button");
    moveToPending.innerText = "⏪";
    moveToPending.addEventListener("click", handleMoveToPendingTask);
    return moveToPending;
  }
  
  function getMoveToFinishedButton() {
    const moveToFinished = document.createElement("button");
    moveToFinished.innerText = "✅";
    moveToFinished.addEventListener("click", handleMoveToFinishedTask);
    return moveToFinished;
  }
  
  function addPendingTask(task) {
    const taskItem = document.createElement("li");
    taskItem.id = task.id;
    taskItem.innerText = task.text;
  
    const deleteTask = getDeletePendingTaskButton();
    taskItem.appendChild(deleteTask);
  
    const moveToFinished = getMoveToFinishedButton();
    taskItem.appendChild(moveToFinished);
  
    pendingUL.appendChild(taskItem);
    pendingTasks.push(task);
    savePendingTasks();
  }
  
  function addFinishedTask(task) {
    const taskItem = document.createElement("li");
    taskItem.id = task.id;
    taskItem.innerText = task.text;
  
    const deleteTask = getDeleteFinishedTaskButton();
    taskItem.appendChild(deleteTask);
  
    const moveToPending = getMoveToPendingButton();
    taskItem.appendChild(moveToPending);
  
    finishedUL.appendChild(taskItem);
    finishedTasks.push(task);
    saveFinishedTasks();
  }
  
  function handleAddTask(event) {
    event.preventDefault();
    const taskName = toDoInput.value;
    if (taskName !== "") {
      const task = {
        id: Date.now(),
        text: taskName
      };
      addPendingTask(task);
      toDoInput.value = "";
    }
  }
  
  function handleDeletePendingTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingUL.removeChild(li);
    const cleanTasks = pendingTasks.filter((task) => {
      return task.id !== parseInt(li.id, 10);
    });
    pendingTasks = cleanTasks;
    savePendingTasks();
  }
  
  function handleMoveToFinishedTask(event) {
    const oldMoveBtn = event.target;
    const li = oldMoveBtn.parentNode;
    const parsedID = parseInt(li.id, 10);
    li.removeChild(oldMoveBtn);
  
    const oldDeleteBtn = li.querySelector("button");
    li.removeChild(oldDeleteBtn);
  
    const newDeleteBtn = getDeleteFinishedTaskButton();
    li.appendChild(newDeleteBtn);
  
    const newMoveBtn = getMoveToPendingButton();
    li.appendChild(newMoveBtn);
  
    pendingUL.removeChild(li);
    finishedUL.appendChild(li);
  
    const moveTasks = pendingTasks.filter((task) => {
      return task.id === parsedID;
    });
    finishedTasks.push(moveTasks[0]);
    saveFinishedTasks();
  
    const cleanTasks = pendingTasks.filter((task) => {
      return task.id !== parsedID;
    });
    pendingTasks = cleanTasks;
    savePendingTasks();
  }
  
  function handleDeleteFinishedTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishedUL.removeChild(li);
    const cleanTasks = finishedTasks.filter((task) => {
      return task.id !== parseInt(li.id, 10);
    });
    finishedTasks = cleanTasks;
    saveFinishedTasks();
  }
  
  function handleMoveToPendingTask(event) {
    const oldMoveBtn = event.target;
    const li = oldMoveBtn.parentNode;
    const parsedID = parseInt(li.id, 10);
    li.removeChild(oldMoveBtn);
  
    const oldDeleteBtn = li.querySelector("button");
    li.removeChild(oldDeleteBtn);
  
    const newDeleteBtn = getDeletePendingTaskButton();
    li.appendChild(newDeleteBtn);
  
    const newMoveBtn = getMoveToFinishedButton();
    li.appendChild(newMoveBtn);
  
    finishedUL.removeChild(li);
    pendingUL.appendChild(li);
  
    const moveTasks = finishedTasks.filter((task) => {
      return task.id === parsedID;
    });
    pendingTasks.push(moveTasks[0]);
    savePendingTasks();
  
    const cleanTasks = finishedTasks.filter((task) => {
      return task.id !== parsedID;
    });
    finishedTasks = cleanTasks;
    saveFinishedTasks();
  }
  
  function loadPendingTasks() {
    const currentPendingTasks = localStorage.getItem(PENDING_LS);
    if (currentPendingTasks !== null) {
      const parsedTasks = JSON.parse(currentPendingTasks);
      parsedTasks.forEach((task) => {
        addPendingTask(task);
      });
    }
  }
  
  function loadFinishedTasks() {
    const currentFinishedTasks = localStorage.getItem(FINISHED_LS);
    if (currentFinishedTasks !== null) {
      const parsedTask = JSON.parse(currentFinishedTasks);
      parsedTask.forEach((task) => {
        addFinishedTask(task);
      });
    }
  }
  
  function init() {
    loadPendingTasks();
    loadFinishedTasks();
    toDoForm.addEventListener("submit", handleAddTask);
  }

init();
