import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserDataService } from './user-data.service';
import { Board, Task } from '../models/board.model';
import { environment as env } from 'src/environments/environment';

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
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserDataService);
    controller = TestBed.inject(HttpTestingController);
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

  it('fetch boards', () => {
    service.fetchBoards();
    const request = controller.expectOne({
      method: 'GET',
      url: `${env.SERVER_URL}/api/board`,
    });
    request.flush(boardsArr);
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards[0].name).toBe('First board');
    expect(savedBoards).toEqual(boardsArr);
  });

  it('add board', () => {
    service.addBoard('First board', 'This is my first board');
    const request = controller.expectOne({
      method: 'POST',
      url: `${env.SERVER_URL}/api/board`,
    });
    request.flush(boardsArr[0]);
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards.length).toBe(1);
    expect(savedBoards[0].name).toBe('First board');
    expect(savedBoards[0].name).not.toBe('Test board');
    expect(savedBoards).toEqual([boardsArr[0]]);
  });

  it('delete board', () => {
    spyOn(window, 'confirm').and.callFake(() => true);
    service.setBoards(boardsArr);
    let delBoardId: string = '124567';
    service.deleteBoard(delBoardId);
    const request = controller.expectOne({
      method: 'DELETE',
      url: `${env.SERVER_URL}/api/board/${delBoardId}`,
    });
    request.flush({ message: 'Board deleted successfully' });
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards.length).not.toBe(3);
    expect(savedBoards.length).toBe(2);
    expect(savedBoards[1].name).toBe('Second board');
  });

  it('edit board', () => {
    service.setBoards(boardsArr);
    let editBoardId: string = '1245';
    service.editBoard(editBoardId, 'Test Name');
    const request = controller.expectOne({
      method: 'PUT',
      url: `${env.SERVER_URL}/api/board/${editBoardId}`,
    });
    request.flush({ message: 'Board name changed successfully' });
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards.length).toBe(boardsArr.length);
    expect(savedBoards[0].name).not.toBe('First Name');
    expect(savedBoards[0].name).toBe('Test Name');
  });

  it('set board color', () => {
    service.setBoards(boardsArr);
    let editBoardId: string = '1245';
    service.setBoardColor(editBoardId, 'todo', '#217074');
    const request = controller.expectOne({
      method: 'PUT',
      url: `${env.SERVER_URL}/api/board/setcolor/${editBoardId}`,
    });
    request.flush({
      ...boardsArr[0],
      colColors: {
        todo: '#217074',
        progress: '#fff',
        done: '#fff',
      },
    });
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards.length).toBe(boardsArr.length);
    expect(savedBoards[0].colColors['todo']).toBe('#217074');
    expect(savedBoards[0].colColors['todo']).not.toBe('#fff');
  });

  it('add task', () => {
    service.setBoards(boardsArr);
    let editBoardId: string = '1245';
    service.addTask(editBoardId, 'Test todo task', 'todo');
    const request = controller.expectOne({
      method: 'PUT',
      url: `${env.SERVER_URL}/api/board/task/${editBoardId}`,
    });
    request.flush({
      ...boardsArr[0],
      tasks: [
        {
          id: '123',
          boardId: '1245',
          name: 'Test todo task',
          status: 'todo',
          createdDate: new Date(),
          comments: [],
          commentsCounter: 0,
        },
      ],
    });
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards[0].tasks[0].name).toBe('Test todo task');
    expect(savedBoards[0].tasks[0].name).not.toBe('Some text');
  });

  it('delete task', () => {
    spyOn(window, 'confirm').and.callFake(() => true);
    let boardWithTask: Board[] = JSON.parse(JSON.stringify(boardsArr));
    let testTask: Task = {
      id: '123',
      boardId: '1245',
      name: 'Test task',
      status: 'todo',
      createdDate: new Date(),
      comments: [],
      commentsCounter: 0,
    };
    boardWithTask[0].tasks.push(testTask);
    service.setBoards(boardWithTask);
    let editBoardId: string = '1245';
    service.deleteTask(editBoardId, '123');
    const request = controller.expectOne({
      method: 'DELETE',
      url: `${env.SERVER_URL}/api/board/task/${editBoardId}`,
    });
    request.flush(boardsArr[0]);
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards[0].tasks.length).toBe(0);
  });

  it('edit task', () => {
    let boardWithTask: Board[] = JSON.parse(JSON.stringify(boardsArr));
    let testTask: Task = {
      id: '123',
      boardId: '1245',
      name: 'Test task',
      status: 'todo',
      createdDate: new Date(),
      comments: [],
      commentsCounter: 0,
    };
    boardWithTask[0].tasks.push(testTask);
    service.setBoards(boardWithTask);
    let editBoardId: string = '1245';
    service.editTask(editBoardId, '123', 'Changed name', 'progress');
    const request = controller.expectOne({
      method: 'PUT',
      url: `${env.SERVER_URL}/api/board/task/edit/${editBoardId}`,
    });
    request.flush({
      ...boardWithTask[0],
      tasks: [
        {
          id: '123',
          boardId: '1245',
          name: 'Changed name',
          status: 'progress',
          createdDate: new Date(),
          comments: [],
          commentsCounter: 0,
        },
      ],
    });
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards[0].tasks.length).toBe(1);
    expect(savedBoards[0].tasks[0].name).toBe('Changed name');
    expect(savedBoards[0].tasks[0].status).toBe('progress');
  });

  it('change task status', () => {
    let boardWithTask: Board[] = JSON.parse(JSON.stringify(boardsArr));
    let testTask: Task = {
      id: '123',
      boardId: '1245',
      name: 'Test task',
      status: 'todo',
      createdDate: new Date(),
      comments: [],
      commentsCounter: 0,
    };
    boardWithTask[0].tasks.push(testTask);
    service.setBoards(boardWithTask);
    let editBoardId: string = '1245';
    service.changeTaskStatus(editBoardId, '123', 'progress');
    const request = controller.expectOne({
      method: 'PUT',
      url: `${env.SERVER_URL}/api/board/task/status/${editBoardId}`,
    });
    request.flush({
      ...boardWithTask[0],
      tasks: [
        {
          ...boardWithTask[0].tasks[0],
          status: 'progress',
        },
      ],
    });
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards[0].tasks.length).toBe(1);
    expect(savedBoards[0].tasks[0].name).toBe('Test task');
    expect(savedBoards[0].tasks[0].status).toBe('progress');
  });

  it('add task comment', () => {
    let editBoardId: string = '1245';
    let editTaskId: string = '123';
    service.addTaskComment(editBoardId, editTaskId, 'New comment');
    const request = controller.expectOne({
      method: 'PUT',
      url: `${env.SERVER_URL}/api/board/task/comment/${editBoardId}`,
    });
    request.flush({ message: 'Comment added successfully!' });
    expect(request.request.body.comment).toBe('New comment');
  });

  it('delete task comment', () => {
    spyOn(window, 'confirm').and.callFake(() => true);
    let editBoardId: string = '1245';
    let editTaskId: string = '123';
    service.deleteTaskComment(editBoardId, editTaskId, 0);
    const request = controller.expectOne({
      method: 'DELETE',
      url: `${env.SERVER_URL}/api/board/task/comment/${editBoardId}`,
    });
    request.flush({ message: 'Comment deleted successfully!' });
    expect(request.request.body.taskId).toBe('123');
    expect(request.request.body.commentIndex).toBe(0);
  });

  it('replace task to board archive', () => {
    spyOn(window, 'confirm').and.callFake(() => true);
    let boardWithTask: Board[] = JSON.parse(JSON.stringify(boardsArr));
    let testTask: Task = {
      id: '123',
      boardId: '1245',
      name: 'Test task',
      status: 'todo',
      createdDate: new Date(),
      comments: [],
      commentsCounter: 0,
    };
    boardWithTask[0].tasks.push(testTask);
    service.setBoards(boardWithTask);
    let editBoardId: string = '1245';
    let editTaskId: string = '123';
    service.archiveTask(editBoardId, editTaskId);
    const request = controller.expectOne({
      method: 'DELETE',
      url: `${env.SERVER_URL}/api/board/task/archive/${editBoardId}`,
    });
    request.flush({
      ...boardsArr[0],
      archive: [
        {
          ...boardWithTask[0].tasks[0],
          status: 'progress',
        },
      ],
      tasks: []
    });
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards[0].tasks.length).toBe(0);
    expect(savedBoards[0].archive.length).toBe(1);
  });

  it('clear archive', () => {
    spyOn(window, 'confirm').and.callFake(() => true);
    let boardWithTask: Board[] = JSON.parse(JSON.stringify(boardsArr));
    let testTask: Task = {
      id: '123',
      boardId: '1245',
      name: 'Test task',
      status: 'todo',
      createdDate: new Date(),
      comments: [],
      commentsCounter: 0,
    };
    boardWithTask[0].archive.push(testTask);
    service.setBoards(boardWithTask);
    service.clearArchive();
    const request = controller.expectOne({
      method: 'PUT',
      url: `${env.SERVER_URL}/api/board/archive/clear`,
    });
    request.flush(boardsArr);
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards.every(board => board.archive.length === 0)).toBeTrue();
    expect(savedBoards[0].archive.length).toBe(0);
  });
});
