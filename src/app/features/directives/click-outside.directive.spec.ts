import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { fromEvent } from 'rxjs';
import { AddBoardFormComponent } from '../components/dashboard/forms/add-board-form/add-board-form.component';
import { ClickOutsideDirective } from './click-outside.directive';

describe('BoardHighlightDirective', () => {
  let fixture: ComponentFixture<AddBoardFormComponent>;
  let addBoardComponent: AddBoardFormComponent;
  let debugElement: DebugElement;
  let backgroundEl: ElementRef;
  let clickOutsideDirective: ClickOutsideDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClickOutsideDirective, AddBoardFormComponent],
      imports: [HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBoardFormComponent);
    fixture.detectChanges();
    addBoardComponent = fixture.componentInstance;
    debugElement = fixture.debugElement;
    backgroundEl = debugElement.query(By.css('.background'));
    clickOutsideDirective = new ClickOutsideDirective(backgroundEl, document);
  });

  it('should create an instance', () => {
    expect(clickOutsideDirective).toBeTruthy();
  });

  it('click inside', () => {
    let isClickedInside = clickOutsideDirective.isInside(backgroundEl.nativeElement);
    expect(isClickedInside).toBeTrue();
  });
});
