import { SortingPipe } from './sorting.pipe';
import { Task } from '../models/board.model';

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

describe('SortingPipe', () => {
  let pipe: SortingPipe;

  beforeEach(() => {
    pipe = new SortingPipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('sort by name ascending', () => {
    const sortedByNameArr: Task[] = pipe.transform(tasksArr, 'name', 'asc');
    expect(sortedByNameArr[0].name).toBe('First task');
    expect(sortedByNameArr[1].name).toBe('Fourth task');
    expect(sortedByNameArr[2].name).toBe('Fourth task');
    expect(sortedByNameArr[3].name).toBe('Second task');
    expect(sortedByNameArr[4].id).toBe('3');
  });

  it('sort by name descending', () => {
    const sortedByNameArr: Task[] = pipe.transform(tasksArr, 'name', 'desc');
    expect(sortedByNameArr[0].name).toBe('Third task');
    expect(sortedByNameArr[1].name).toBe('Second task');
    expect(sortedByNameArr[2].name).toBe('Fourth task');
    expect(sortedByNameArr[3].name).toBe('Fourth task');
    expect(sortedByNameArr[4].name).toBe('First task');
  });
});
