'use strict';

// Function to fetch tasks from localStorage
const fetchTasksFromStorage = () => {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
};

// Function to save tasks to localStorage
const saveTasksToStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to initialize tasks from localStorage
const initializeTasks = () => {
  let tasks = fetchTasksFromStorage();
  tasks.forEach(task => {
    createTask(task);
  });
};

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

// !get data from new task
let tasks = fetchTasksFromStorage(); // Initialize tasks from localStorage

const taskTitleInput = document.getElementById("task-title");
const taskDescriptionInput = document.getElementById("task-description");

const addTask = function () {
  const title = taskTitleInput.value;
  const description = taskDescriptionInput.value;
  let statusText = selectValueTxt.textContent.toLowerCase();

  if (title !== "" && description !== "") {
    const newTask = {
      id: tasks.length + 1,
      title: title,
      description: description,
      status: statusText === 'completed' || statusText === 'pending' ? statusText : 'pending',
    };
    createTask(newTask);
    tasks.push(newTask);

    saveTasksToStorage(tasks); // Save tasks to localStorage after adding

    // Clear input fields
    taskTitleInput.value = '';
    taskDescriptionInput.value = '';
    selectValueTxt.textContent = 'Pending'; // Reset dropdown text
  }
}

// Function to create a task and append to UI
const createTask = function (newTask) {
  const container = document.createElement("div");
  container.classList.add("task");

  // Construct the inner HTML for the container
  container.innerHTML = `
    <h1 class="task-title">${newTask.title}</h1>
    <p class="task-description">${newTask.description}</p>
    <p class="id">asdasd${newTask.id} asdasd</p>
    <div class="task-customize">
      <p class="task-status ${newTask.status}">${newTask.status}</p>
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

  // Event listener for delete button
  const deleteBtn = container.querySelector('.status-delete-btn');
  deleteBtn.addEventListener('click', function () {
    deleteTask(newTask.id);
    container.remove();
  });

  // Function to delete a task
  const deleteTask = function (taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasksToStorage(tasks); // Save updated tasks after deletion
  };

  // Event listener for edit button console.log(newTask.id);
  const editBtn = container.querySelector('.status-edit-btn');
  const editWindow = document.getElementById('editTask');
  editBtn.addEventListener('click', function () {
    editWindow.style.display = 'flex';

    const saveChange = document.getElementById('edit-task');
    saveChange.addEventListener('click', function () {
      const editedTitle = document.getElementById('edited-title').value;
      const editedDescription = document.getElementById('edited-description').value;

      const taskTitle = container.querySelector('.task-title');
      const taskDescriptionInput = container.querySelector('.task-description');
      editWindow.style.display = 'none';
      console.log('saved', newTask.id);
      // Update task in UI and tasks array
      tasks = tasks.map(task => {
        if (task.id === newTask.id) {
          taskTitle.textContent = editedTitle;
          taskDescriptionInput.textContent = editedDescription;
          return { ...task, title: editedTitle, description: editedDescription };
        }
        return task;
      });

      saveTasksToStorage(tasks); // Save updated tasks after edit
    });
  });

  // Event listener for status change button
  const statusBtn = container.querySelector('.status-change-btn');
  statusBtn.addEventListener('click', function () {
    console.log(newTask.id);
    const taskStatus = container.querySelector('.task-status');
    taskStatus.classList.remove("pending");
    taskStatus.classList.add("completed");
    // Update task status in tasks array
    tasks = tasks.map(task => {
      if (task.id === newTask.id) {
        return { ...task, status: 'completed' };
      }
      return task;
    });

    saveTasksToStorage(tasks); // Save updated tasks after status change
  });
};

// Initialize tasks on page load
document.addEventListener('DOMContentLoaded', function () {
  initializeTasks();
});
