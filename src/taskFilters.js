import { todoList } from "./todoData";
import { isToday, isTomorrow, isThisWeek, parseISO } from "date-fns";

export function getImportantTasks() {
  return todoList.filter((task) => task.priority);
}

export function getFinishedTasks() {
  return todoList.filter((task) => task.completed);
}

export function getAllTasks() {
  return todoList;
}

export function getTomorrowTasks() {
  return todoList.filter((task) => {
    const dueDate = parseISO(task.dueDate);
    return isTomorrow(dueDate);
  });
}

export function getWeekTasks() {
  return todoList.filter((task) => {
    const dueDate = parseISO(task.dueDate);
    return isThisWeek(dueDate, { weekStartsOn: 1 });
  });
}

export function getTodayTasks() {
  return todoList.filter((task) => {
    const dueDate = parseISO(task.dueDate);
    return isToday(dueDate);
  });
}
