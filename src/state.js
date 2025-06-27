export let currentProject = null;

export function getCurrentProject() {
  return currentProject;
}

export function setCurrentProject(title) {
  currentProject = title;
}

let currentView = { type: "project", value: null };

export function setCurrentView(type, value = null) {
  currentView = { type, value };
}

export function getCurrentView() {
  return currentView;
}
