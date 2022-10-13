import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FormsService } from 'src/app/features/services/forms.service';
import { UserDataService } from 'src/app/features/services/user-data.service';

import { AddBoardFormComponent } from './add-board-form.component';

describe('AddBoardFormComponent', () => {
  let component: AddBoardFormComponent;
  let fixture: ComponentFixture<AddBoardFormComponent>;
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close Add Board Modal', () => {
    component.onCloseAddBoardModal();
    expect(fakeFormService.closeAddBoardForm).toHaveBeenCalled();
    expect(fakeFormService.clearBoardMode).toHaveBeenCalled();
  });
});
