import { db } from "@/firebase/firebaseConfig";
import { TaskDB, TaskResponse } from "@/interfaces";
import {
  get,
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";

export const createTask = async (
  userId: string,
  name: string,
  description: string,
  category: string,
  date: Date
) => {
  try {
    const userTasksRef = ref(db, "users/" + userId + "/tasks");
    const newTaskRef = push(userTasksRef);

    await set(newTaskRef, {
      name,
      description,
      category: category.toLowerCase().trim(),
      date: date.toISOString(),
      done: false,
    });
  } catch (error) {
    throw error;
  }
};

export const getAllTasks = (
  userId: string,
  setTasks: React.Dispatch<React.SetStateAction<TaskResponse | undefined>>
) => {
  try {
    const allTaskRef = ref(db, "users/" + userId + "/tasks");
    onValue(allTaskRef, (snapshot) => {
      if (snapshot.val()) {
        const tasks = snapshot.val();
        setTasks(tasks);
      }
    });
  } catch (error) {
    throw error;
  }
};

export const getTaskById = (
  userId: string,
  taskId: string,
  setTask: React.Dispatch<React.SetStateAction<TaskDB | undefined>>
) => {
  try {
    const taskRef = ref(db, "users/" + userId + "/tasks/" + taskId);
    onValue(taskRef, (snapshot) => {
      if (snapshot.val()) {
        const task = snapshot.val();
        setTask(task);
      }
    });
  } catch (error) {
    throw error;
  }
};

export const toggleTaskDone = async (userId: string, taskId: string) => {
  try {
    const taskRef = ref(db, "users/" + userId + "/tasks/" + taskId);
    const snapshot = await get(taskRef);

    if (snapshot.exists()) {
      const task = snapshot.val();
      const currentTaskDone = task.done;

      await update(taskRef, { done: !currentTaskDone });
    }
  } catch (error) {
    throw error;
  }
};

export const deleteTaskById = async (userId: string, taskId: string) => {
  try {
    const taskRef = ref(db, "users/" + userId + "/tasks/" + taskId);
    await remove(taskRef);
  } catch (error) {
    throw error;
  }
};
