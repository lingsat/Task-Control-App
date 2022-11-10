import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Task } from 'src/app/features/models/board.model';
import { FilteringPipe } from 'src/app/features/pipes/filtering.pipe';
import { SortingPipe } from 'src/app/features/pipes/sorting.pipe';
import { FormsService } from 'src/app/features/services/forms.service';
import { UserDataService } from 'src/app/features/services/user-data.service';
import { BoardComponent } from './board.component';
import { testBoards, testTasks } from '../../../../mockData/mockData';
import { ActivatedRoute } from '@angular/router';
import { TaskComponent } from './task/task.component';


describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let fakeFormsService: Pick<FormsService, 'openAddTaskForm'>;
  let fakeUserDataService: Pick<UserDataService, 'setBoardColor' | 'changeTaskStatus' | 'fetchBoards' | 'getBoardsObs'>;
  let testTask: Task;

  beforeEach(async () => {
    testTask = { ...testTasks[0] };

    fakeFormsService = {
      openAddTaskForm: jasmine.createSpy('openAddTaskForm'),
    };
    fakeUserDataService = {
      setBoardColor: jasmine.createSpy('setBoardColor'),
      changeTaskStatus: jasmine.createSpy('changeTaskStatus'),
      fetchBoards() {},
      getBoardsObs: jasmine.createSpy('getBoardsObs').and.returnValue(of(testBoards)),
    };

    await TestBed.configureTestingModule({
      declarations: [BoardComponent, TaskComponent, FilteringPipe, SortingPipe],
      providers: [
        { provide: FormsService, useValue: fakeFormsService },
        { provide: UserDataService, useValue: fakeUserDataService },
        { provide: ActivatedRoute, useValue: { params: of({id: '1245'}) } }
      ],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show todo colors block', () => {
    component.onShowColors('todo');
    expect(component.showTodoColors).toBeTrue();
    expect(component.showProgressColors).toBeFalse();
    expect(component.showDoneColors).toBeFalse();
  });

  it('show progress colors block', () => {
    component.onShowColors('progress');
    expect(component.showProgressColors).toBeTrue();
  });

  it('show done colors block', () => {
    component.onShowColors('done');
    expect(component.showDoneColors).toBeTrue();
  });

  it('show filter/sort block on small screens on toggle trigger', () => {
    component.onToggleFilterFormShow();
    expect(component.showSmallForm).toBeTrue();
  });

  it('set current draggable task', () => {
    component.onDragStart(testTask);
    expect(component.currentDraggableTask).toEqual(testTask);
  });

  it('open Add Task Form with defined status', () => {
    component.onOpenAddTaskForm('progress');
    expect(fakeFormsService.openAddTaskForm).toHaveBeenCalled();
    expect(fakeFormsService.openAddTaskForm).toHaveBeenCalledWith('progress');
    expect(fakeFormsService.openAddTaskForm).not.toHaveBeenCalledWith('done');
  });

  it('set background color for todo column', () => {
    component.onSetColor('todo', '#81BECE');
    expect(component.showTodoColors).toBeFalse();
    expect(fakeUserDataService.setBoardColor).toHaveBeenCalled();
  });

  it('set background color for progress column', () => {
    component.onSetColor('progress', '#81BECE');
    expect(component.showProgressColors).toBeFalse();
    expect(fakeUserDataService.setBoardColor).toHaveBeenCalled();
  });

  it('set background color for done column', () => {
    component.onSetColor('done', '#81BECE');
    expect(component.showDoneColors).toBeFalse();
    expect(fakeUserDataService.setBoardColor).toHaveBeenCalled();
  });

  it('change task status on Drop task - from todo to progress', () => {
    component.onDragStart(testTask);
    component.onDrop('progress');
    expect(fakeUserDataService.changeTaskStatus).toHaveBeenCalled();
  });

  it('change task status on Drop task - from todo to done', () => {
    testTask.status = 'todo';
    component.onDragStart(testTask);
    component.onDrop('done');
    expect(fakeUserDataService.changeTaskStatus).toHaveBeenCalled();
  });

  it('change task status on Drop task - from done to todo', () => {
    testTask.status = 'done';
    component.onDragStart(testTask);
    component.onDrop('todo');
    expect(fakeUserDataService.changeTaskStatus).toHaveBeenCalled();
  });

  it('get correct board from boards array', () => {  
    expect(component.boardName).toBe('First board');
  });

  it('set correct tasks from board', () => {  
    expect(component.todoTasks[0].id).toBe('123');
    expect(component.progressTasks[0].id).toBe('124');
    expect(component.doneTasks[0].id).toBe('125');
  });
});
