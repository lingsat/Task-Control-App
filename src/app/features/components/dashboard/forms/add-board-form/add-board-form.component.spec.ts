import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FormsService } from 'src/app/features/services/forms.service';
import { UserDataService } from 'src/app/features/services/user-data.service';
import { AddBoardFormComponent } from './add-board-form.component';

describe('AddBoardFormComponent', () => {
  let component: AddBoardFormComponent;
  let fixture: ComponentFixture<AddBoardFormComponent>;
  let debugElement: DebugElement;
  let fakeFormService: Pick<
    FormsService,
    | 'closeAddBoardForm'
    | 'clearBoardMode'
    | 'editedBoardId'
    | 'editBoardMode'
    | 'editDefaultBoardData'
  >;
  let fakeUserDataService: Pick<UserDataService, 'addBoard' | 'editBoard'>;

  beforeEach(async () => {
    fakeFormService = {
      editedBoardId: '1234567',
      editBoardMode: false,
      editDefaultBoardData: {
        name: '',
        description: '',
      },
      closeAddBoardForm: jasmine.createSpy('closeAddBoardForm'),
      clearBoardMode: jasmine.createSpy('clearBoardMode'),
    };
    fakeUserDataService = jasmine.createSpyObj<UserDataService>(
      'UserDataService',
      {
        addBoard: undefined,
        editBoard: undefined,
      }
    );

    await TestBed.configureTestingModule({
      declarations: [AddBoardFormComponent],
      providers: [
        { provide: FormsService, useValue: fakeFormService },
        { provide: UserDataService, useValue: fakeUserDataService },
      ],
      imports: [HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBoardFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close Add Board Modal', () => {
    debugElement.query(By.css('.form__close')).triggerEventHandler('click', null);   
    expect(fakeFormService.closeAddBoardForm).toHaveBeenCalled();
    expect(fakeFormService.clearBoardMode).toHaveBeenCalled();
  });

  it('add board submit', () => {
    const testForm = <NgForm>{
      value: {
        name: 'Test name',
        description: 'Test description'
      },
      reset() {
        this.value.name = '';
        this.value.description = '';
      },
    };
    component.onSubmit(testForm);
    expect(fakeUserDataService.addBoard).toHaveBeenCalled();
    expect(fakeUserDataService.addBoard).toHaveBeenCalledWith('Test name', 'Test description');
    expect(fakeFormService.clearBoardMode).toHaveBeenCalled();
  });

  it('edit board submit', () => {
    const testForm = <NgForm>{
      value: {
        name: 'Test name',
        description: 'Test description'
      },
      reset() {
        this.value.name = '';
        this.value.description = '';
      },
    };
    component.editMode = true;
    component.onSubmit(testForm);
    expect(fakeUserDataService.editBoard).toHaveBeenCalled();
  });
});
