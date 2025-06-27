import "./styles.css";
import {
  Project,
  renderProjects,
  populateProjectSelection,
  projectDisplay,
} from "./projects.js";
import {
  getAllTasks,
  getImportantTasks,
  getTodayTasks,
  getTomorrowTasks,
  getWeekTasks,
  getFinishedTasks,
} from "./taskFilters.js";
import { setCurrentView } from "./state.js";
import {
  renderTasksByList,
  renderCurrentViewTasks,
  mainOnLoad,
} from "./tasks.js";
import { addProject } from "./projectsData.js";
import { Task } from "./tasks.js";
import { todoList, addTask, saveTodoList } from "./todoData.js";

export function DomManipulation() {
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.getElementById("sidebarToggle");
  const overlay = document.getElementById("sidebarOverlay");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("hidden");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.add("hidden");
  });

  document.getElementById("addProjectBtn").addEventListener("click", () => {
    document.getElementById("projectFormModal").classList.remove("hidden");
  });

  document
    .getElementById("modalCancelProject")
    .addEventListener("click", () => {
      closeModal();
    });

  document.getElementById("addTodoBtn").addEventListener("click", () => {
    document.getElementById("toDoFormModal").classList.remove("hidden");
  });

  document.getElementById("modalCancelTodo").addEventListener("click", () => {
    closeModal();
  });

  document.getElementById("newProjectForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("formProject-title").value.trim();
    const description = document
      .getElementById("formProject-description")
      .value.trim();

    if (title.length > 25) {
      alert("The title is too long");
      return;
    } else if (title && description) {
      const project = new Project(title, description);
      addProject(project);
      renderProjects();
      populateProjectSelection();
      closeModal();
      projectDisplay(project);
      e.target.reset();
    }
  });

  document.getElementById("newToDoForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const formModal = document.getElementById("toDoFormModal");
    const editId = formModal.getAttribute("data-edit-id");

    const title = document.getElementById("form-title").value.trim();
    const dueDate = document.getElementById("form-dueDate").value;
    const project = document.getElementById("form-todo-project").value;
    const priority = document.getElementById("form-priority").checked;

    if (!title && !dueDate && !project) {
      alert("Please fill all required fields");
      return;
    }

    if (editId) {
      const taskToEdit = todoList.find((t) => t.id === editId);
      if (taskToEdit) {
        taskToEdit.title = title;
        taskToEdit.dueDate = dueDate;
        taskToEdit.project = project;
        taskToEdit.priority = priority;
      }
    } else {
      const task = new Task(title, dueDate, project, priority);
      addTask(task);
    }

    saveTodoList();
    renderCurrentViewTasks();
    closeModal();
    mainOnLoad();
    e.target.reset();
    formModal.removeAttribute("data-edit-id");
  });

  document.getElementById("allTasks").addEventListener("click", () => {
    setCurrentView("list", "All tasks");
    renderTasksByList(getAllTasks(), "All tasks", "Here are all the tasks");
  });

  document.getElementById("todayTasks").addEventListener("click", () => {
    setCurrentView("list", "Due today");
    renderTasksByList(
      getTodayTasks(),
      "Due today",
      "Here are the tasks for today"
    );
  });

  document.getElementById("weekTasks").addEventListener("click", () => {
    setCurrentView("list", "Due this week");
    renderTasksByList(
      getWeekTasks(),
      "Due this week",
      "Here are the tasks for this week"
    );
  });

  document.getElementById("importantTasks").addEventListener("click", () => {
    setCurrentView("list", "Important");
    renderTasksByList(
      getImportantTasks(),
      "Important",
      "Here are the important tasks"
    );
  });

  document.getElementById("tomorrowTasks").addEventListener("click", () => {
    setCurrentView("list", "Due Tomorrow");
    renderTasksByList(
      getTomorrowTasks(),
      "Due Tomorrow",
      "Here are the tasks for tomorrow"
    );
  });

  document.getElementById("finishedTasks").addEventListener("click", () => {
    setCurrentView("list", "Finished");
    renderTasksByList(
      getFinishedTasks(),
      "Finished",
      "Here are the finished tasks"
    );
  });
}

function closeModal() {
  const formModal = document.getElementById("toDoFormModal");
  formModal.classList.add("hidden");
  formModal.removeAttribute("data-edit-id");
  document.getElementById("projectFormModal").classList.add("hidden");
  document.getElementById("toDoFormModal").classList.add("hidden");
}
