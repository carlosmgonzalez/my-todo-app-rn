export interface TaskDB {
  category: string;
  date: string;
  description: string;
  name: string;
  done: boolean;
}

export interface Task {
  id: string;
  category: string;
  date: Date;
  description: string;
  name: string;
  done: boolean;
}

export type TaskResponse = Record<string, TaskDB>;
