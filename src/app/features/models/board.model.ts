export interface Board {
  userId: string | undefined;
  id: string;
  name: string;
  description: string;
  createdDate: Date;
  tasks?: Task[];
}

export interface Task {
  id: string;
  boardId: string;
  name: string;
  status: 'todo' | 'progress' | 'done';
  createdDate: Date;
  comments?: string[];
}