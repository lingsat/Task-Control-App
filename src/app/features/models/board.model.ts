export type taskStatus = 'todo' | 'progress' | 'done';

export interface Board {
  userId: string | undefined;
  _id: string;
  name: string;
  readonly description: string;
  createdDate: Date;
  tasks: Task[];
  todoCount: number;
  progressCount: number;
  doneCount: number;
  archive: Task[];
  colColors: {
    todo: string;
    progress: string;
    done: string;
  };
  __v?: number;
}

export interface Task {
  id: string;
  boardId: string;
  name: string;
  status: taskStatus;
  createdDate: Date;
  comments: string[];
  commentsCounter: number;
}
