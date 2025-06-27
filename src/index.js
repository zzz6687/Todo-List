import "./styles.css";
import "./images/favicon.ico";
import {
  Project,
  renderProjects,
  populateProjectSelection,
} from "./projects.js";
import { mainOnLoad } from "./tasks.js";
import { addProject } from "./projectsData.js";
import { Task } from "./tasks.js";
import { todoList, addTask, getTodoList } from "./todoData.js";
import { DomManipulation } from "./domManipulation.js";

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("hasInitialized")) {
    const defaultProject = new Project("General", "Default project");
    addProject(defaultProject);

    const defaultTask = new Task(
      "Welcome Task",
      new Date().toISOString().split("T")[0],
      "General",
      false
    );
    addTask(defaultTask);

    localStorage.setItem("hasInitialized", "true");
  }

  todoList.length = 0;
  todoList.push(...getTodoList());

  mainOnLoad();

  populateProjectSelection();
  renderProjects();

  DomManipulation();
});
