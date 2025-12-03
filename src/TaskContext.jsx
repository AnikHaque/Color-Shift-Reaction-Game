import React, { createContext, useReducer } from "react";
import defaultTasksRaw from "./utils/defaultTasks.json";
import { formatDateToShort } from "./utils/dateUtils";

export const TaskContext = createContext();

// Format default tasks from JSON
const defaultTasks = defaultTasksRaw.map(task => ({
  ...task,
  date: formatDateToShort(task.date)
}));

// Load saved tasks OR fallback to default tasks
const storedTasks =
  JSON.parse(localStorage.getItem("kanban_tasks")) || defaultTasks;

const initialState = { tasks: storedTasks };

// Reducer
function taskReducer(state, action) {
  let updatedState;

  switch (action.type) {
    case "ADD_TASK":
      updatedState = {
        tasks: [
          ...state.tasks,
          {
            ...action.payload,
            date: formatDateToShort(action.payload.date)
          }
        ]
      };
      break;

    case "UPDATE_TASK":
      updatedState = {
        tasks: state.tasks.map(t =>
          t.id === action.payload.id
            ? { ...action.payload, date: formatDateToShort(action.payload.date) }
            : t
        )
      };
      break;

    case "DELETE_TASK":
      updatedState = {
        tasks: state.tasks.filter(t => t.id !== action.payload)
      };
      break;

    default:
      updatedState = state;
  }

  localStorage.setItem("kanban_tasks", JSON.stringify(updatedState.tasks));
  return updatedState;
}

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        addTask: (task) => dispatch({ type: "ADD_TASK", payload: task }),
        updateTask: (task) => dispatch({ type: "UPDATE_TASK", payload: task }),
        deleteTask: (id) => dispatch({ type: "DELETE_TASK", payload: id }),
        dispatch
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
