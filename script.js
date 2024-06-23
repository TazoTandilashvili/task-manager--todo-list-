"use strict";

// !open close value option
const selectValue = document.querySelector(".value-dropdwn");
const valueOption = document.querySelector(".value-options");

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

// !get data from  new task
let tasks = [];

const taskTitleInput = document.getElementById("task-title");
const taskDescriptionInput = document.getElementById("task-description");
const addTask = function () {
  const title = taskTitleInput.value;
  const description = taskDescriptionInput.value;
  let statusText = selectValueTxt.textContent.toLocaleLowerCase();

  if (title !== "" && description !== "") {
    const newTask = {
      id: tasks.length + 1,
      title: title,
      description: description,
      status: statusText === 'completed' || statusText === 'pending' ? statusText : 'pending',
    };
    createTask(newTask);
    tasks.push(newTask);
    console.log('addtask', tasks)
  }
}

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
  const taskListSection = document.getElementById("task-list");
  taskListSection.appendChild(container);

  // TODO delete task 
  const deleteBtn = container.querySelector('.status-delete-btn');
  deleteBtn.addEventListener('click', function () {
    deleteTask(newTask.id);
    container.remove();
  });
  const deleteTask = function (taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
  };

  // TODO edit complete 
  const editBtn = container.querySelector('.status-edit-btn');
  const editWindow = document.getElementById('editTask');
  editBtn.addEventListener('click', function () {
    editWindow.style.display = 'flex';

    console.log('pressed', tasks)
    console.log('pressed', newTask.id)
    let taskEdit = newTask.id
    const saveChange = document.getElementById('edit-task');
    saveChange.addEventListener('click', function () {
      const editedTitle = document.getElementById('edited-title').value;
      const editedDescription = document.getElementById('edited-description').value;
      console.log('saved', tasks)
      console.log('saved', newTask.id, taskEdit)

      const taskTitle = container.querySelector('.task-title');
      const taskDescriptionInput = container.querySelector('.task-desctiption')
      editWindow.style.display = 'none';
      tasks = tasks.map(task => {
        if (task.id === taskEdit) {
          taskTitle.textContent = editedTitle;
          taskDescriptionInput.textContent = editedDescription;
          console.log(tasks);
          return { title: editedTitle, description: editedDescription, ...task, };
        }

        return tasks
      });
    })
  });

  const statusBtn = container.querySelector('.status-change-btn');
  statusBtn.addEventListener('click', function () {
    let taskStatus = container.querySelector('.task-status');
    taskStatus.classList.remove("pending");
    taskStatus.classList.add("completed");
    tasks = tasks.map(task => {
      if (task.id === newTask.id) {
        return { ...task, status: 'completed' };
      };
      return task;
    });
  });




}


