import { AuthResponseData } from "../auth/models/response.model";
import { Board, Task } from "../features/models/board.model";

export const testResData: AuthResponseData = {
  jwt_token: 'Bearer qwerty1234',
  userId: '12345',
  email: 'testEmail@gmail.com',
  login: 'testLogin',
};

export const testTasks: Task[] = [
  {
    id: '1',
    boardId: '123',
    name: 'First task',
    status: 'todo',
    createdDate: new Date(),
    comments: ['Comment example'],
    commentsCounter: 1,
  },
  {
    id: '2',
    boardId: '123',
    name: 'Second task',
    status: 'progress',
    createdDate: new Date(),
    comments: [],
    commentsCounter: 0,
  },
  {
    id: '3',
    boardId: '123',
    name: 'Third task',
    status: 'done',
    createdDate: new Date(),
    comments: [],
    commentsCounter: 0,
  },
  {
    id: '4',
    boardId: '123',
    name: 'Fourth task',
    status: 'progress',
    createdDate: new Date(),
    comments: [],
    commentsCounter: 0,
  },
  {
    id: '5',
    boardId: '123',
    name: 'Fourth task',
    status: 'done',
    createdDate: new Date(),
    comments: [],
    commentsCounter: 0,
  },
];

export const testBoards: Board[] = [
  {
    userId: '123',
    _id: '1245',
    name: 'First board',
    description: 'This is my first board',
    createdDate: new Date(),
    tasks: [
      {
        id: '123',
        boardId: '1245',
        name: 'Test task',
        status: 'todo',
        createdDate: new Date(),
        comments: [],
        commentsCounter: 0,
      },
      {
        id: '124',
        boardId: '1245',
        name: 'Test task v2',
        status: 'progress',
        createdDate: new Date(),
        comments: [],
        commentsCounter: 0,
      },
      {
        id: '125',
        boardId: '1245',
        name: 'Test task v3',
        status: 'done',
        createdDate: new Date(),
        comments: [],
        commentsCounter: 0,
      }
    ],
    todoCount: 1,
    progressCount: 1,
    doneCount: 1,
    archive: [],
    colColors: {
      todo: '#fff',
      progress: '#fff',
      done: '#fff',
    },
    __v: 0,
  },
  {
    userId: '1234',
    _id: '12456',
    name: 'Second board',
    description: 'This is my second board',
    createdDate: new Date(),
    tasks: [],
    todoCount: 0,
    progressCount: 0,
    doneCount: 0,
    archive: [],
    colColors: {
      todo: '#fff',
      progress: '#fff',
      done: '#fff',
    },
    __v: 0,
  },
  {
    userId: '12345',
    _id: '124567',
    name: 'Third board',
    description: 'This is my third board',
    createdDate: new Date(),
    tasks: [],
    todoCount: 0,
    progressCount: 0,
    doneCount: 0,
    archive: [
      {
        id: '1234567',
        boardId: '1245',
        name: 'Archived task',
        status: 'todo',
        createdDate: new Date(),
        comments: [],
        commentsCounter: 0,
      },
    ],
    colColors: {
      todo: '#fff',
      progress: '#fff',
      done: '#fff',
    },
    __v: 0,
  },
];