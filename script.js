"use strict";

// !open close value option
const selectValue = document.querySelector(".value-dropdwn");
const valueOption = document.querySelector(".value-options");

const editTask = document.getElementById("editTask");
const editedTitle = document.getElementById("edited-title");
const editedDescription = document.getElementById("edited-description");

const searchInput = document.getElementById("search-input");

selectValue.addEventListener("click", function () {
  valueOption.classList.toggle("open");
});
// get value
const selectOptions = document.querySelectorAll(".value-options div");
const selectValueTxt = document.querySelector(".select-value-txt");
selectOptions.forEach((selectOption) => {
  selectOption.addEventListener("click", function () {
    const selectedValue = this.textContent.trim();
    selectValueTxt.textContent = selectedValue;
    valueOption.classList.add("open");
  });
});
// !get data from new task
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// !get data from  new task
// let tasks = [];

const taskTitleInput = document.getElementById("task-title");
const taskDescriptionInput = document.getElementById("task-description");
const pushTask = function () {
  let statusText = selectValueTxt.textContent.toLocaleLowerCase();

  const newTask = {
    id: tasks.length + 1,
    title: taskTitleInput.value,
    description: taskDescriptionInput.value,
    status:
      statusText === "completed" || statusText === "pending"
        ? statusText
        : "pending",
  };
  tasks.push(newTask);
  createTask(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// !create new task
const createTask = function (newTask) {
  const container = document.createElement("div");
  container.classList.add("task");

  // Construct the inner HTML for the container
  container.innerHTML = `
  <h1 class="task-title">${newTask.title}</h1>
  <p class="task-desctiption">
   ${newTask.description}
  </p>
  <div class="task-customize">
    <p class="task-status ${newTask.status} ">${newTask.status}</p>
    <button class="status-change-btn">
      <ion-icon id="status-icons" name="checkmark"></ion-icon>
    </button>
    <button class="status-edit-btn">
      <ion-icon id="status-icons" name="create-outline"></ion-icon>
    </button>
    <button class="status-delete-btn">
      <ion-icon id="status-icons" name="trash-outline"></ion-icon>
    </button>
  </div>
  `;
  // detele function
  attachDeleteTaskListener(container, newTask);

  const taskListSection = document.getElementById("task-list");
  taskListSection.appendChild(container);
};

const attachDeleteTaskListener = function (container, newTask) {
  const deleteTask = container.querySelector(".status-delete-btn");
  deleteTask.addEventListener("click", function () {
    const taskId = newTask.id;
    tasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    container.remove();
  });

  const editBtn = container.querySelector(".status-edit-btn");
  const editTaskBtn = document.getElementById("edit-task");
  const changeTitleBtn = container.querySelector(".task-title");
  const changedDescriptionBtn = container.querySelector(".task-desctiption");
  editBtn.addEventListener("click", function () {
    editTask.style.display = "flex";
    editTaskBtn.addEventListener("click", function () {
      newTask.title = editedTitle.value;
      newTask.description = editedDescription.value;

      changeTitleBtn.textContent = newTask.title;
      changedDescriptionBtn.textContent = newTask.description;
      localStorage.setItem("tasks", JSON.stringify(tasks));

      editTask.style.display = "none";
    });
  });

  const editStatusBtn = container.querySelector(".status-change-btn");
  editStatusBtn.addEventListener("click", function () {
    const taskStatus = container.querySelector(".task-status");

    if (newTask.status === "pending") {
      newTask.status = "completed";
      taskStatus.textContent = "completed";
      taskStatus.classList.remove("pending");
      taskStatus.classList.add("completed");
    } else {
      newTask.status = "pending";
      taskStatus.textContent = "pending";
      taskStatus.classList.remove("completed");
      taskStatus.classList.add("pending");
    }

    // Update the tasks array to reflect the new status
    tasks = tasks.map((task) => (task.id === newTask.id ? newTask : task));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
};
searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  const taskList = document.getElementById("task-list");
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
  );
  taskList.innerHTML = "";
  filteredTasks.forEach((task) => {
    createTask(task);
  });
});
window.addEventListener("load", function () {
  tasks.forEach((task) => createTask(task));
});
const addTask = function () {
  pushTask();
};
