import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserDataService } from './user-data.service';
import { Board, Task } from '../models/board.model';
import { environment as env } from 'src/environments/environment';
import { testBoards } from '../../mockData/mockData';

let boardsArr: Board[];

describe('UserDataService', () => {
  let service: UserDataService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserDataService);
    controller = TestBed.inject(HttpTestingController);
    boardsArr = JSON.parse(JSON.stringify(testBoards));
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
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards.length).not.toBe(3);
    expect(savedBoards.length).toBe(2);
    expect(savedBoards[1].name).toBe('Second board');
  });

  it('edit board', () => {
    service.setBoards(boardsArr);
    let editBoardId: string = '1245';
    service.editBoard(editBoardId, 'Test Name');
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards.length).toBe(boardsArr.length);
    expect(savedBoards[0].name).not.toBe('First Name');
    expect(savedBoards[0].name).toBe('Test Name');
  });

  it('set board color - todo', () => {
    service.setBoards(boardsArr);
    let editBoardId: string = '1245';
    service.setBoardColor(editBoardId, 'todo', '#217074');
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards.length).toBe(boardsArr.length);
    expect(savedBoards[0].colColors['todo']).toBe('#217074');
    expect(savedBoards[0].colColors['todo']).not.toBe('#fff');
  });

  it('set board color - progress', () => {
    service.setBoards(boardsArr);
    let editBoardId: string = '1245';
    service.setBoardColor(editBoardId, 'progress', '#217074');
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards.length).toBe(boardsArr.length);
    expect(savedBoards[0].colColors['progress']).toBe('#217074');
    expect(savedBoards[0].colColors['progress']).not.toBe('#fff');
  });

  it('set board color - done', () => {
    service.setBoards(boardsArr);
    let editBoardId: string = '1245';
    service.setBoardColor(editBoardId, 'done', '#217074');
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards.length).toBe(boardsArr.length);
    expect(savedBoards[0].colColors['done']).toBe('#217074');
    expect(savedBoards[0].colColors['done']).not.toBe('#fff');
  });

  it('add task', () => {
    service.setBoards(boardsArr);
    let editBoardId: string = '1245';
    service.addTask(editBoardId, 'Test todo task', 'todo');
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards[0].tasks[3].name).toBe('Test todo task');
    expect(savedBoards[0].tasks[3].name).not.toBe('Some text');
  });

  it('delete task', () => {
    spyOn(window, 'confirm').and.callFake(() => true);
    service.setBoards(boardsArr);
    let editBoardId: string = '1245';
    service.deleteTask(editBoardId, '123');
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards[0].tasks.length).toBe(2);
  });

  it('edit task', () => {
    service.setBoards(boardsArr);
    let editBoardId: string = '1245';
    service.editTask(editBoardId, '123', 'Changed name', 'progress');
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards[0].tasks.length).toBe(3);
    expect(savedBoards[0].tasks[0].name).toBe('Changed name');
    expect(savedBoards[0].tasks[0].status).toBe('progress');
  });

  it('change task status', () => {
    service.setBoards(boardsArr);
    let editBoardId: string = '1245';
    service.changeTaskStatus(editBoardId, '123', 'progress');
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards[0].tasks.length).toBe(3);
    expect(savedBoards[0].tasks[2].name).toBe('Test task');
    expect(savedBoards[0].tasks[2].status).toBe('progress');
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
    service.setBoards(boardsArr);
    let editBoardId: string = '1245';
    let editTaskId: string = '123';
    service.archiveTask(editBoardId, editTaskId);
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards[0].tasks.length).toBe(2);
    expect(savedBoards[0].archive.length).toBe(1);
  });

  it('clear archive', () => {
    spyOn(window, 'confirm').and.callFake(() => true);
    service.setBoards(boardsArr);
    service.clearArchive();
    const savedBoards: Board[] = service.getBoards();
    expect(savedBoards.every((board) => board.archive.length === 0)).toBeTrue();
    expect(savedBoards[0].archive.length).toBe(0);
  });
});
