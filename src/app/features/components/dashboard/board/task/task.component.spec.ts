import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { FormsService } from 'src/app/features/services/forms.service';
import { UserDataService } from 'src/app/features/services/user-data.service';

import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let fakeFormsService: Pick<FormsService, 'setEditedTaskId'>;
  let fakeUserDataService: Pick<
    UserDataService,
    'deleteTask' | 'archiveTask' | 'deleteTaskComment' | 'addTaskComment'
  >;

  beforeEach(async () => {
    fakeFormsService = {
      setEditedTaskId: jasmine.createSpy('setEditedTaskId'),
    };
    fakeUserDataService = {
      deleteTask: jasmine.createSpy('deleteTask'),
      archiveTask: jasmine.createSpy('archiveTask'),
      deleteTaskComment: jasmine.createSpy('deleteTaskComment'),
      addTaskComment: jasmine.createSpy('addTaskComment'),
    };

    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
      providers: [
        { provide: FormsService, useValue: fakeFormsService },
        { provide: UserDataService, useValue: fakeUserDataService },
      ],
      imports: [HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = {
      id: '123',
      boardId: '456',
      name: 'TestName',
      status: 'todo',
      createdDate: new Date(),
      comments: ['Comment example'],
      commentsCounter: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show task controls', () => {
    component.onToggleControls();
    expect(component.showControls).toBeTrue();
  });

  it('show task comments', () => {
    component.onToggleComments();
    expect(component.showComments).toBeTrue();
  });

  it('edit task with data', () => {
    component.task.id = '123';
    component.task.name = 'Edited task test name';
    component.task.status = 'todo';
    component.onEditTask();
    expect(fakeFormsService.setEditedTaskId).toHaveBeenCalled();
    expect(fakeFormsService.setEditedTaskId).toHaveBeenCalledWith(
      '123',
      'Edited task test name',
      'todo'
    );
  });

  it('delete task', () => {
    component.task.boardId = 'qwerty123456';
    component.task.id = '123';
    component.onDeleteTask();
    expect(fakeUserDataService.deleteTask).toHaveBeenCalled();
    expect(fakeUserDataService.deleteTask).toHaveBeenCalledWith(
      'qwerty123456',
      '123'
    );
  });

  it('archive task', () => {
    component.task.boardId = 'qwerty123456';
    component.task.id = '123';
    component.onArchiveTask();
    expect(fakeUserDataService.archiveTask).toHaveBeenCalled();
    expect(fakeUserDataService.archiveTask).toHaveBeenCalledWith(
      'qwerty123456',
      '123'
    );
  });

  it('delete comment from task', () => {
    component.task.comments = ['first comment', 'second comment'];
    component.task.commentsCounter = 2;
    component.onDeleteComment(0);
    expect(component.task.comments).toEqual(['second comment']);
    expect(component.task.comments).not.toEqual(['first comment']);
    expect(component.task.commentsCounter).toBe(1);
    expect(component.task.commentsCounter).not.toBe(2);
    expect(fakeUserDataService.deleteTaskComment).toHaveBeenCalled();
  });

  it('add comment form submit', () => {
    const testForm = <NgForm>{
      value: {
        comment: 'Test comment',
      },
      reset() {
        this.value.comment = '';
      },
    };
    component.task.comments = ['First comment'];
    component.onSubmit(testForm);
    expect(component.task.comments).toEqual(['First comment', 'Test comment']);
    expect(component.task.commentsCounter).toBe(2);
    expect(fakeUserDataService.addTaskComment).toHaveBeenCalled();
    expect(testForm.value.comment).toBe('');
  });
});
