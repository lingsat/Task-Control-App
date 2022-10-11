import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Task } from 'src/app/features/models/board.model';
import { FilteringPipe } from 'src/app/features/pipes/filtering.pipe';
import { SortingPipe } from 'src/app/features/pipes/sorting.pipe';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent, FilteringPipe, SortingPipe],
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
    const testTask: Task = {
      id: '123',
      boardId: '12345',
      name: 'Draggable task',
      status: 'progress',
      createdDate: new Date(),
      comments: [],
      commentsCounter: 0,
    };
    component.onDragStart(testTask);
    expect(component.currentDraggableTask).toEqual(testTask);
  });
});
