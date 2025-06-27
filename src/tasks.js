import { todoList, saveTodoList, deleteTaskById } from "./todoData.js";
import { getCurrentView, setCurrentView } from "./state.js";
import {
  getAllTasks,
  getImportantTasks,
  getTodayTasks,
  getTomorrowTasks,
  getWeekTasks,
  getFinishedTasks,
} from "./taskFilters.js";
import editIcons from "./images/edit-box-icon.png";
import deleteIcons from "./images/delete-icon.png";

export class Task {
  constructor(title, dueDate, project, priority, completed = false) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.dueDate = dueDate;
    this.project = project;
    this.priority = priority;
    this.completed = completed;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  render() {
    const container = document.createElement("div");
    container.classList.add("task");

    const leftSide = document.createElement("div");
    leftSide.classList.add("left-side");

    const rightSide = document.createElement("div");
    rightSide.classList.add("right-side");

    const title = document.createElement("p");
    title.textContent = this.title;

    const dueDate = document.createElement("p");
    dueDate.textContent = `${this.dueDate}`;

    const iconContainer = document.createElement("div");

    const completedCheckbox = document.createElement("input");
    completedCheckbox.type = "checkbox";
    completedCheckbox.checked = this.completed;

    completedCheckbox.addEventListener("change", () => {
      this.completed = !this.completed;
      container.classList.toggle("completed", this.completed);
      saveTodoList();
    });

    if (this.completed) container.classList.add("completed");

    const editIcon = document.createElement("img");
    editIcon.src = editIcons;
    editIcon.alt = "Edit";
    editIcon.classList.add("icons");

    editIcon.addEventListener("click", () => {
      const formModal = document.getElementById("toDoFormModal");
      formModal.classList.remove("hidden");

      document.getElementById("form-title").value = this.title;
      document.getElementById("form-dueDate").value = this.dueDate;
      document.getElementById("form-todo-project").value = this.project;
      document.getElementById("form-priority").checked = this.priority;

      formModal.setAttribute("data-edit-id", this.id);
    });

    const deleteIcon = document.createElement("img");
    deleteIcon.src = deleteIcons;
    deleteIcon.alt = "Delete";
    deleteIcon.classList.add("icons");

    deleteIcon.addEventListener("click", () => {
      deleteTaskById(this.id);
      renderCurrentViewTasks();
    });

    if (this.priority) {
      const important = document.createElement("span");
      important.textContent = "IMPORTANT";
      important.classList.add("important-label");
      rightSide.appendChild(important);
    }

    iconContainer.appendChild(editIcon);
    iconContainer.appendChild(deleteIcon);

    leftSide.appendChild(completedCheckbox);
    leftSide.appendChild(title);

    rightSide.appendChild(dueDate);
    rightSide.appendChild(iconContainer);

    container.appendChild(leftSide);
    container.appendChild(rightSide);

    return container;
  }
}

export function renderTasksByProject(projectTitle) {
  const todoContent = document.getElementById("todoContent");
  todoContent.innerHTML = "";

  if (!projectTitle) {
    todoContent.innerHTML = "<p>Select a project or create a new one</p>";
    return;
  }
  const filteredTodos = todoList.filter(
    (task) => task.project === projectTitle
  );

  if (filteredTodos.length === 0) {
    todoContent.innerHTML = "<p>No tasks for this project yet</p>";
    return;
  }

  filteredTodos.forEach((task) => {
    const todoElement = task.render();
    todoContent.appendChild(todoElement);
  });
}

export function renderTasksByList(taskArray, headerText, descriptionText) {
  const todoContent = document.getElementById("todoContent");
  const header = document.getElementById("projectHeader");
  todoContent.innerHTML = "";
  header.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = headerText;
  heading.id = "generalHeaderTitle";
  header.appendChild(heading);

  const descript = document.createElement("p");
  descript.textContent = descriptionText;
  header.appendChild(descript);

  if (!taskArray || taskArray.length === 0) {
    todoContent.innerHTML = "<p>No tasks to show</p>";
    return;
  }

  taskArray.forEach((task) => {
    const todoElement = task.render();
    todoContent.appendChild(todoElement);
  });
}

export function renderCurrentViewTasks() {
  const currentView = getCurrentView();

  if (currentView.type === "project") {
    renderTasksByProject(currentView.value);
  } else if (currentView.type === "list") {
    switch (currentView.value) {
      case "All tasks":
        renderTasksByList(getAllTasks(), "All tasks", "Here are all the tasks");
        break;
      case "Due today":
        renderTasksByList(
          getTodayTasks(),
          "Due today",
          "Here are the tasks for today"
        );
        break;
      case "Due Tomorrow":
        renderTasksByList(
          getTomorrowTasks(),
          "Due Tomorrow",
          "Here are the tasks for tomorrow"
        );
        break;
      case "Due this week":
        renderTasksByList(
          getWeekTasks(),
          "Due this week",
          "Here are the tasks for this week"
        );
        break;
      case "Important":
        renderTasksByList(
          getImportantTasks(),
          "Important",
          "Here are the important tasks"
        );
        break;
      case "Finished":
        renderTasksByList(
          getFinishedTasks(),
          "Finished",
          "Here are the finished tasks"
        );
        break;
      default:
        renderTasksByList(getAllTasks(), "All tasks", "Here are all the tasks");
    }
  }
}

export function mainOnLoad() {
  setCurrentView("list", "All tasks");
  renderTasksByList(getAllTasks(), "All tasks", "Here are all the tasks");
}
