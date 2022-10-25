import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FormsService } from 'src/app/features/services/forms.service';
import { UserDataService } from 'src/app/features/services/user-data.service';
import { TaskComponent } from './task.component';


describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let debugElement: DebugElement;
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
      id: '1',
      boardId: '123',
      name: 'First task',
      status: 'done',
      createdDate: new Date(),
      comments: ['Comment example'],
      commentsCounter: 1,
    };
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show task controls', () => {
    debugElement.query(By.css('.task__btn')).triggerEventHandler('click', null);
    expect(component.showControls).toBeTrue();
  });
  
  it('show task comments', () => {
    debugElement.query(By.css('.task__comments')).triggerEventHandler('click', null);
    expect(component.showComments).toBeTrue();
  });
  
  it('edit task with data', () => {
    debugElement.query(By.css('.btn__edit')).triggerEventHandler('click', null);
    expect(fakeFormsService.setEditedTaskId).toHaveBeenCalled();
    expect(fakeFormsService.setEditedTaskId).toHaveBeenCalledWith(
      '1',
      'First task',
      'done'
    );
  });

  it('delete task', () => {
    debugElement.query(By.css('.btn__delete')).triggerEventHandler('click', null);
    expect(fakeUserDataService.deleteTask).toHaveBeenCalled();
    expect(fakeUserDataService.deleteTask).toHaveBeenCalledWith(
      '123',
      '1'
    );
  });

  it('archive task', () => {
    debugElement.query(By.css('.btn__archive')).triggerEventHandler('click', null);
    expect(fakeUserDataService.archiveTask).toHaveBeenCalled();
    expect(fakeUserDataService.archiveTask).toHaveBeenCalledWith(
      '123',
      '1'
    );
  });

  it('delete comment from task', () => {
    component.task.comments = ['first comment', 'second comment'];
    component.task.commentsCounter = 2;
    debugElement.query(By.css('.comments__delete')).triggerEventHandler('click', null);
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
    component.onSubmit(testForm);
    expect(component.task.comments).toEqual(['Comment example', 'Test comment']);
    expect(component.task.commentsCounter).toBe(2);
    expect(fakeUserDataService.addTaskComment).toHaveBeenCalled();
    expect(testForm.value.comment).toBe('');
  });

  it('add empty comment', () => {
    spyOn(window, 'confirm').and.callFake(() => true);
    const testForm = <NgForm>{
      value: {
        comment: '   ',
      },
      reset() {
        this.value.comment = '';
      },
    };
    component.onSubmit(testForm);
    expect(component.task.comments).toEqual(['Comment example']);
    expect(component.task.commentsCounter).toBe(1);
    expect(fakeUserDataService.addTaskComment).not.toHaveBeenCalled();
    expect(testForm.value.comment).toBe('');
  });
});
