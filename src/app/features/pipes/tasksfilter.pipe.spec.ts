import { Task } from '../models/board.model';
import { TasksfilterPipe } from './tasksfilter.pipe';

const tasksArr: Task[] = [
  {
    id: '1',
    boardId: '123',
    name: 'First task',
    status: 'todo',
    createdDate: new Date(),
    comments: [],
    commentsCounter: 0,
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
];

describe('TasksfilterPipe', () => {
  let pipe: TasksfilterPipe;

  beforeEach(() => {
    pipe = new TasksfilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  
  it('todo task count', () => {
    let todoTasksCount: number = pipe.transform(tasksArr, 'todo');
    expect(todoTasksCount).toBe(1);
  });
  
  it('progress task count', () => {
    let progressTasksCount: number = pipe.transform(tasksArr, 'progress');
    expect(progressTasksCount).toBe(2);
  });

  it('done task count', () => {
    let doneTasksCount: number = pipe.transform(tasksArr, 'done');
    expect(doneTasksCount).toBe(1);
  });
});
