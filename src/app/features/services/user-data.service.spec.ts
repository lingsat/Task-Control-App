import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserDataService } from './user-data.service';
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

describe('UserDataService', () => {
  let service: UserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('return empty boards', () => {
    const resBoards = service.getBoards();
    expect(resBoards).toEqual([]);
  });

  it('set boards', () => {
    service.setBoards(boardsArr);
    const resBoards = service.getBoards();
    expect(resBoards).toEqual(boardsArr);
    expect(resBoards).not.toEqual([]);
  });
});
