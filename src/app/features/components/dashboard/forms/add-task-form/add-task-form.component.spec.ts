import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AddTaskFormComponent } from './add-task-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { FormsService } from 'src/app/features/services/forms.service';
import { UserDataService } from 'src/app/features/services/user-data.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AddTaskFormComponent', () => {
  let component: AddTaskFormComponent;
  let fixture: ComponentFixture<AddTaskFormComponent>;
  let debugElement: DebugElement;
  let fakeFormService: Pick<
    FormsService,
    | 'defaultTaskStatus'
    | 'editTaskMode'
    | 'editedTaskId'
    | 'editDefaultTaskName'
    | 'closeAddTaskForm'
    | 'clearTaskMode'
  >;
  let fakeUserDataService: Pick<UserDataService, 'addTask' | 'editTask'>;

  beforeEach(async () => {
    fakeFormService = {
      defaultTaskStatus: '',
      editTaskMode: false,
      editedTaskId: '123456',
      editDefaultTaskName: '',
      closeAddTaskForm: jasmine.createSpy('closeAddTaskForm'),
      clearTaskMode: jasmine.createSpy('clearTaskMode'),
    };
    fakeUserDataService = jasmine.createSpyObj<UserDataService>(
      'UserDataService',
      {
        addTask: undefined,
        editTask: undefined,
      }
    );

    await TestBed.configureTestingModule({
      declarations: [AddTaskFormComponent],
      providers: [
        { provide: FormsService, useValue: fakeFormService },
        { provide: UserDataService, useValue: fakeUserDataService },
      ],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close Add Task Modal', () => {
    debugElement.query(By.css('.form__close')).triggerEventHandler('click', null);
    expect(fakeFormService.closeAddTaskForm).toHaveBeenCalled();
    expect(fakeFormService.clearTaskMode).toHaveBeenCalled();
  });

  it('add task submit', () => {
    const testForm = <NgForm>{
      value: {
        taskState: 'todo',
        task: 'Test task',
      },
      reset() {
        this.value.taskState = '';
        this.value.task = '';
      },
    };
    component.currentBoardId = '1234qwety';
    component.onSubmit(testForm);
    expect(fakeUserDataService.addTask).toHaveBeenCalled();
    expect(fakeFormService.clearTaskMode).toHaveBeenCalled();
    expect(testForm.value.taskState).toBe('');
    expect(testForm.value.task).toBe('');
  });

  it('edit task submit', () => {
    const testForm = <NgForm>{
      value: {
        taskState: 'todo',
        task: 'Test task',
      },
      reset() {
        this.value.taskState = '';
        this.value.task = '';
      },
    };
    component.editMode = true;
    component.currentBoardId = '1234qwety';
    component.editedTaskId = '1234';
    component.onSubmit(testForm);
    expect(fakeUserDataService.editTask).toHaveBeenCalled();
    expect(fakeUserDataService.editTask).toHaveBeenCalledWith('1234qwety', '1234', 'Test task', 'todo');
  });
});
