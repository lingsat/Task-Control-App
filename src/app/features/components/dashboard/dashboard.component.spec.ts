import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Board } from '../../models/board.model';
import { FilteringPipe } from '../../pipes/filtering.pipe';
import { SortingPipe } from '../../pipes/sorting.pipe';
import { FormsService } from '../../services/forms.service';
import { UserDataService } from '../../services/user-data.service';

import { DashboardComponent } from './dashboard.component';

let testBoard: Board = {
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
};

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let fakeFormService: Pick<
    FormsService,
    'openAddBoardForm' | 'setEditedBoardId'
  >;
  let fakeUserDataService: Pick<UserDataService, 'deleteBoard' | 'fetchBoards' | 'getBoardsObs'>;

  beforeEach(async () => {
    fakeFormService = {
      openAddBoardForm: jasmine.createSpy('openAddBoardForm'),
      setEditedBoardId: jasmine.createSpy('setEditedBoardId'),
    };
    fakeUserDataService = {
      deleteBoard: jasmine.createSpy('deleteBoard'),
      fetchBoards() {},
      getBoardsObs: jasmine.createSpy('getBoardsObs').and.returnValue(of([])),
    }

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, FilteringPipe, SortingPipe],
      providers: [
        { provide: FormsService, useValue: fakeFormService },
        { provide: UserDataService, useValue: fakeUserDataService },
      ],
      imports: [HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggle show small form value', () => {
    component.onToggleFilterFormShow();
    expect(component.showSmallForm).toBeTruthy();
  });

  it('open add board modal', () => {
    component.onOpenAddBoardModal();
    expect(fakeFormService.openAddBoardForm).toHaveBeenCalled();
  });

  it('opens edit board modal with data', () => {
    component.onEditBoard(testBoard);
    expect(fakeFormService.setEditedBoardId).toHaveBeenCalledWith(
      testBoard._id,
      testBoard.name,
      testBoard.description
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
