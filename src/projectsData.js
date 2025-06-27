export const projectsList =
  JSON.parse(localStorage.getItem("projectsList")) || [];

export function saveProjectsList() {
  localStorage.setItem("projectsList", JSON.stringify(projectsList));
}

export function getProjectsList() {
  return [...projectsList];
}

export function addProject(project) {
  projectsList.push(project);
  saveProjectsList();
}
