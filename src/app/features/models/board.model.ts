export interface Board {
  userId: string | undefined;
  id: string;
  name: string;
  description: string;
  createdDate: Date;
  tasks: Task[];
}

export interface Task {
  id: string;
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
  userId: string;
  __v?: number;
  _id: string;
}
