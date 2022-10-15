import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from '../features/components/dashboard/dashboard.component';
import { FormControl } from '@angular/forms';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: DashboardComponent },
        ]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });  

  it('navigate to dashboard', () => {
    localStorage.setItem('userData', 'true');
    component.ngOnInit();
    expect(localStorage.getItem('userData')).toBe('true');
    expect(component).toBeTruthy();
    localStorage.clear();
  });  
});
