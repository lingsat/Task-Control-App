import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AuthService } from '../../services/auth.service';
import { LoginFormComponent } from './login-form.component';
import { DashboardComponent } from 'src/app/features/components/dashboard/dashboard.component';
import { testResData } from '../../../mockData/mockData';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let debugElement: DebugElement;
  let fakeAuthService: Pick<
    AuthService,
    'setLoginMode' | 'login' | 'checkEmailValidator'
  >;

  beforeEach(async () => {
    fakeAuthService = {
      setLoginMode: jasmine.createSpy('setLoginMode'),
      login: jasmine.createSpy('login').and.returnValue(of(testResData)),
      checkEmailValidator: jasmine.createSpy('checkEmailValidator'),
    };

    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent, DashboardComponent],
      providers: [{ provide: AuthService, useValue: fakeAuthService }],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: DashboardComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show register form', () => {
    debugElement.query(By.css('a')).triggerEventHandler('click', null);
    expect(fakeAuthService.setLoginMode).toHaveBeenCalled();
  });

  it('submit login form', () => {
    component.onSubmit();
    expect(fakeAuthService.login).toHaveBeenCalled();
  });

  it('error on submit login form', () => {
    spyOn(window, 'alert').and.callFake(() => true);
    fakeAuthService.login = jasmine
      .createSpy('login')
      .and.returnValue(throwError(() => new Error('Some error')));
    component.onSubmit();
    expect(fakeAuthService.login).toHaveBeenCalled();
  });
});
