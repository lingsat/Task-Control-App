import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { FilteringPipe } from '../pipes/filtering.pipe';
import { SortingPipe } from '../pipes/sorting.pipe';
import { BoardHighlightDirective } from './board-highlight.directive';

describe('BoardHighlightDirective', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardHighlightDirective, DashboardComponent, FilteringPipe, SortingPipe],
      imports: [HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('hover element', () => {
    const divEl = debugElement.query(By.css('#addBoardBtn'));
    divEl.triggerEventHandler('mouseenter', null);
    expect(divEl.nativeElement.style.backgroundColor).toBeTruthy();
    expect(divEl.nativeElement.style.backgroundColor).toBe('rgb(210, 210, 212)');
  });

  it('leave element', () => {
    const divEl = debugElement.query(By.css('#addBoardBtn'));
    divEl.triggerEventHandler('mouseleave', null);
    expect(divEl.nativeElement.style.backgroundColor).toBeTruthy();
    expect(divEl.nativeElement.style.backgroundColor).toBe('rgb(231, 234, 239)');
  });
});
