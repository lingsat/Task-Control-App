import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AddBoardFormComponent } from '../components/dashboard/forms/add-board-form/add-board-form.component';
import { ClickOutsideDirective } from './click-outside.directive';

describe('BoardHighlightDirective', () => {
  let fixture: ComponentFixture<AddBoardFormComponent>;
  let addBoardComponent: AddBoardFormComponent;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClickOutsideDirective, AddBoardFormComponent],
      imports: [HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBoardFormComponent);
    fixture.detectChanges();
    addBoardComponent = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create an component instance', () => {
    expect(addBoardComponent).toBeTruthy();
  });

  it('click outside form - modal window will be closed', () => {
    spyOn(addBoardComponent, 'onCloseAddBoardModal');
    const innerElement = fixture.debugElement.query(By.css('.background'));
    innerElement.nativeElement.click();
    expect(addBoardComponent.onCloseAddBoardModal).toHaveBeenCalled();
    expect(addBoardComponent.onCloseAddBoardModal).toHaveBeenCalledTimes(1);
  });

  it('click inside form wrapper - modal window will not closed', () => {
    spyOn(addBoardComponent, 'onCloseAddBoardModal');
    const innerElement = fixture.debugElement.query(By.css('.wrapper'));
    innerElement.nativeElement.click();
    expect(addBoardComponent.onCloseAddBoardModal).not.toHaveBeenCalled();
  });
});
