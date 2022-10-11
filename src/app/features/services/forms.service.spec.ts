import { TestBed } from '@angular/core/testing';

import { FormsService } from './forms.service';

describe('FormsServiceService', () => {
  let service: FormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('hide add board form', () => {
    service.closeAddBoardForm();
    expect(service.showAddBoardForm).toBeFalse();
  });

  it('show add board form', () => {
    service.openAddBoardForm();
    expect(service.showAddBoardForm).toBeTrue();
  });

  it('hide add task form', () => {
    service.closeAddTaskForm();
    expect(service.showAddTaskForm).toBeFalse();
  });

  it('show add task form with task status', () => {
    service.openAddTaskForm('done');
    expect(service.showAddTaskForm).toBeTrue();
    expect(service.defaultTaskStatus).toBe('done');
  });

  it('clear board data and refresh mode to default', () => {
    service.clearBoardMode();
    expect(service.editBoardMode).toBeFalse();
    expect(service.editDefaultBoardData).toEqual({ name: '', description: '' });
  });

  it('clear task data and refresh mode to default', () => {
    service.clearTaskMode();
    expect(service.editTaskMode).toBeFalse();
    expect(service.editDefaultTaskName).toBe('');
  });

  it('set edited board', () => {
    service.setEditedBoardId('123', 'First Board', 'First Board Description');
    expect(service.editBoardMode).toBeTrue();
    expect(service.editedBoardId).toBe('123');
    expect(service.editedBoardId).not.toBe('124');
    expect(service.editDefaultBoardData).toEqual({
      name: 'First Board',
      description: 'First Board Description',
    });
    expect(service.editDefaultBoardData).not.toEqual({
      name: 'Second Board',
      description: 'Second Board Description',
    });
  });

  it('set edited task', () => {
    service.setEditedTaskId('qwerty1234', 'First Task', 'progress');
    expect(service.editTaskMode).toBeTrue();
    expect(service.editedTaskId).toBe('qwerty1234');
    expect(service.editedTaskId).not.toBe('124');
    expect(service.editDefaultTaskName).toBe('First Task');
    expect(service.editDefaultTaskName).not.toBe('Other Task');
  });
});
