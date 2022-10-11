import { FilteringPipe } from './filtering.pipe';
import { Board } from '../models/board.model';

const boardsArr: Board[] = [
  {
    userId: '123',
    _id: '1245',
    name: 'First board',
    description: 'This is my first board',
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
    archive: [],
    colColors: {
      todo: '#fff',
      progress: '#fff',
      done: '#fff',
    },
    __v: 0,
  },
];

describe('FilteringPipe', () => {
  let pipe: FilteringPipe;

  beforeEach(() => {
    pipe = new FilteringPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('filtering array by name', () => {
    const termName: string | undefined = 'second';
    const filteredArr: Board[] = pipe.transform(boardsArr, termName);
    expect(filteredArr[0].name).toBe('Second board');
    expect(filteredArr.length).toBe(1);
  });

  it('filtering array with undefined termName', () => {
    const termName: string | undefined = undefined;
    const filteredArr: Board[] = pipe.transform(boardsArr, termName);
    expect(filteredArr[0].name).toBe('First board');
    expect(filteredArr.length).toBe(boardsArr.length);
  });
});
