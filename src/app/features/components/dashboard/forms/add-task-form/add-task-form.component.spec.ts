import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AddTaskFormComponent } from './add-task-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { FormsService } from 'src/app/features/services/forms.service';
import { UserDataService } from 'src/app/features/services/user-data.service';

describe('AddTaskFormComponent', () => {
  let component: AddTaskFormComponent;
  let fixture: ComponentFixture<AddTaskFormComponent>;
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close Add Task Modal', () => {
    component.onCloseAddTaskModal();
    expect(fakeFormService.closeAddTaskForm).toHaveBeenCalled();
    expect(fakeFormService.clearTaskMode).toHaveBeenCalled();
  });
});
