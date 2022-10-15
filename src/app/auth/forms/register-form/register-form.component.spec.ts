import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { DashboardComponent } from 'src/app/features/components/dashboard/dashboard.component';
import { AuthResponseData } from '../../models/response.model';
import { AuthService } from '../../services/auth.service';

import { RegisterFormComponent } from './register-form.component';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let fakeAuthService: Pick<
    AuthService,
    'setLoginMode' | 'register' | 'checkEmailValidator'
  >;

  beforeEach(async () => {
    let testResData: AuthResponseData = {
      jwt_token: 'Bearer qwerty1234',
      userId: '12345',
      email: 'testEmail@gmail.com',
      login: 'testLogin',
    };
    fakeAuthService = {
      setLoginMode: jasmine.createSpy('setLoginMode'),
      register: jasmine.createSpy('register').and.returnValues(of(testResData)),
      checkEmailValidator: jasmine.createSpy('checkEmailValidator'),
    };

    await TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      providers: [{ provide: AuthService, useValue: fakeAuthService }],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: DashboardComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show login form', () => {
    component.onShowLoginForm();
    expect(fakeAuthService.setLoginMode).toHaveBeenCalled();
  });

  it('submit register form', () => {
    component.onSubmit();
    expect(fakeAuthService.register).toHaveBeenCalled();
  });

  it('error on submit register form', () => {
    spyOn(window, 'alert').and.callFake(() => true);
    fakeAuthService.register = jasmine
      .createSpy('regoster')
      .and.returnValue(throwError(() => new Error('Some error')));
    component.onSubmit();
    expect(fakeAuthService.register).toHaveBeenCalled();
  });
});
