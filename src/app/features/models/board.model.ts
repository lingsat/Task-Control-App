export interface Board {
  userId: string | undefined;
  id: string;
  name: string;
  description: string;
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
}

export interface Task {
  id: string;
  boardId: string;
  name: string;
  status: 'todo' | 'progress' | 'done';
  createdDate: Date;
  comments?: string[];
}

// export interface BoardsResponseObj {
//   boards: BoardResponse[];
// }

export interface BoardResponse {
  createdDate: string;
  description: string;
  name: string;
  tasks: Task[]; // change
  todoCount: number;
  progressCount: number;
  doneCount: number;
  archive: Task[];
  colColors: {
    todo: string;
    progress: string;
    done: string;
  };
  userId: string;
  __v?: number;
  _id: string;
}
