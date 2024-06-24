// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import * as firebaseAuth from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
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
import { Dispatch, SetStateAction } from "react";
import { TaskDB, TaskResponse } from "@/interfaces/tasks.interface";

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});

const db = getDatabase(app);

export const handleLogin = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export const createTask = (
  userId: string,
  name: string,
  description: string,
  category: string,
  date: Date
) => {
  const userTasksRef = ref(db, "users/" + userId);
  const newTaskRef = push(userTasksRef);
  set(newTaskRef, {
    name,
    description,
    category: category.toLowerCase().trim(),
    date: date.toISOString(),
    done: false,
  });
};

export const getAllTasks = (
  userId: string,
  setTasks: Dispatch<SetStateAction<TaskResponse | undefined>>
) => {
  const allTaskRef = ref(db, "users/" + userId);
  onValue(allTaskRef, (snapshot) => {
    if (snapshot.val()) {
      const tasks = snapshot.val();
      setTasks(tasks);
    }
  });
};

export const getTaskById = (
  userId: string,
  taskId: string,
  setTask: Dispatch<SetStateAction<TaskDB | undefined>>
) => {
  const taskRef = ref(db, "users/" + userId + "/" + taskId);
  onValue(taskRef, (snapshot) => {
    if (snapshot.val()) {
      const task = snapshot.val();
      setTask(task);
    }
  });
};

export const toggleTaskDone = async (userId: string, taskId: string) => {
  const taskRef = ref(db, "users/" + userId + "/" + taskId);

  try {
    const snapshot = await get(taskRef);

    if (snapshot.exists()) {
      const task = snapshot.val();
      const currentTaskDone = task.done;

      await update(taskRef, { done: !currentTaskDone });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (userId: string, taskId: string) => {
  const taskRef = ref(db, "users/" + userId + "/" + taskId);

  try {
    await remove(taskRef);
  } catch (error) {
    console.log(error);
  }
};
