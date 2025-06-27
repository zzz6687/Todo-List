import { projectsList, saveProjectsList } from "./projectsData.js";
import { todoList, saveTodoList } from "./todoData.js";
import { mainOnLoad, renderTasksByProject } from "./tasks.js";
import { setCurrentProject, setCurrentView } from "./state.js";

export class Project {
  constructor(title, description) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
  }
}

export function renderProjects() {
  const ul = document.querySelector("#project-buttons");
  ul.innerHTML = "";

  projectsList.forEach((project) => {
    const list = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = project.title;
    button.classList.add("project-show-btn");
    list.appendChild(button);
    ul.appendChild(list);

    button.addEventListener("click", function () {
      projectDisplay(project);
    });
  });
}

export function populateProjectSelection() {
  const selectedProject = document.getElementById("form-todo-project");
  selectedProject.innerHTML = `<option value="">--Select a project--</option>`;

  projectsList.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.title;
    option.textContent = project.title;
    selectedProject.appendChild(option);
  });
}

function clearMain() {
  document.getElementById("projectHeader").innerHTML = "";
  document.getElementById("todoContent").innerHTML = "";
}

export function projectDisplay(project) {
  const ul = document.querySelector("#project-buttons");
  const projectHeader = document.getElementById("projectHeader");
  clearMain();

  const headerTop = document.createElement("div");
  headerTop.classList.add("project-header-top");

  const projectTitle = document.createElement("h2");
  projectTitle.textContent = project.title;

  const projectDescription = document.createElement("p");
  projectDescription.textContent = project.description;
  projectDescription.classList.add("project-description");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete project";
  deleteBtn.classList.add("delete-project-btn");

  headerTop.appendChild(projectTitle);
  headerTop.appendChild(deleteBtn);

  projectHeader.appendChild(headerTop);
  projectHeader.appendChild(projectDescription);

  setCurrentView("project", project.title);

  deleteBtn.addEventListener("click", (e) => {
    const remainingTasks = todoList.filter(
      (task) => task.project !== project.title
    );
    todoList.length = 0;
    todoList.push(...remainingTasks);
    saveTodoList();

    const index = projectsList.findIndex((p) => p.id === project.id);
    if (index !== -1) {
      projectsList.splice(index, 1);
      saveProjectsList();
      populateProjectSelection();
      setCurrentProject(null);
      renderProjects();
      clearMain();
      mainOnLoad();
    }
  });
  setCurrentProject(project.title);
  renderTasksByProject(project.title);
}
