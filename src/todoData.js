import { Task, renderCurrentViewTasks } from "./tasks";

export const todoList = [];

export function saveTodoList() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

export function getTodoList() {
  const storedList = JSON.parse(localStorage.getItem("todoList")) || [];
  return storedList.map(
    (taskData) =>
      new Task(
        taskData.title,
        taskData.dueDate,
        taskData.project,
        taskData.priority,
        taskData.completed
      )
  );
}

export function addTask(task) {
  todoList.push(task);
  saveTodoList();
}

export function deleteTaskById(taskId) {
  const index = todoList.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    todoList.splice(index, 1);
    saveTodoList();
    renderCurrentViewTasks();
  }
}
