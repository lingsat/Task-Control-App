import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';
import { FilteringPipe } from '../../pipes/filtering.pipe';
import { SortingPipe } from '../../pipes/sorting.pipe';
import { FormsService } from '../../services/forms.service';
import { UserDataService } from '../../services/user-data.service';
import { DashboardComponent } from './dashboard.component';
import { testBoards } from '../../../mockData/mockData';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let debugElement: DebugElement;
  let fakeFormService: Pick<
    FormsService,
    'openAddBoardForm' | 'setEditedBoardId'
  >;
  let fakeUserDataService: Pick<
    UserDataService,
    'deleteBoard' | 'fetchBoards' | 'getBoardsObs'
  >;

  beforeEach(async () => {
    fakeFormService = {
      openAddBoardForm: jasmine.createSpy('openAddBoardForm'),
      setEditedBoardId: jasmine.createSpy('setEditedBoardId'),
    };
    fakeUserDataService = {
      deleteBoard: jasmine.createSpy('deleteBoard'),
      fetchBoards() {},
      getBoardsObs: jasmine.createSpy('getBoardsObs').and.returnValue(of([])),
    };

    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        LoadingSpinnerComponent,
        FilteringPipe,
        SortingPipe,
      ],
      providers: [
        { provide: FormsService, useValue: fakeFormService },
        { provide: UserDataService, useValue: fakeUserDataService },
      ],
      imports: [HttpClientTestingModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggle show small form value', () => {
    debugElement
      .query(By.css('.content__burger'))
      .triggerEventHandler('click', null);
    expect(component.showSmallForm).toBeTruthy();
  });

  it('open add board modal', () => {
    debugElement
      .query(By.css('#addBoardBtn'))
      .triggerEventHandler('click', null);
    expect(fakeFormService.openAddBoardForm).toHaveBeenCalled();
  });

  it('opens edit board modal with data', () => {
    component.onEditBoard(testBoards[2]);
    expect(fakeFormService.setEditedBoardId).toHaveBeenCalledWith(
      testBoards[2]._id,
      testBoards[2].name,
      testBoards[2].description
    );
  });

  it('delete board by id with UserDataService', () => {
    spyOn(window, 'confirm').and.callFake(() => true);
    component.onDeleteBoard('124567');
    expect(fakeUserDataService.deleteBoard).toHaveBeenCalledWith('124567');
  });

  it('cancel delete board by id - false confirm', () => {
    spyOn(window, 'confirm').and.callFake(() => false);
    component.onDeleteBoard('124567');
    expect(fakeUserDataService.deleteBoard).toHaveBeenCalled();
  });
});
