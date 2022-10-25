import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { first } from 'rxjs';

import { AuthService } from './auth.service';
import { environment as env } from '../../../environments/environment';
import { AuthComponent } from '../auth.component';
import { User } from '../models/user.model';
import { testResData } from '../../mockData/mockData';

describe('AuthService', () => {
  let service: AuthService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'auth', component: AuthComponent },
        ]),
      ],
    });
    service = TestBed.inject(AuthService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('registration', () => {
    service
      .register('testLogin', 'testEmail@gmail.com', '12345')
      .pipe(first())
      .subscribe((userData) => {
        expect(userData).toEqual(testResData);
      });

    const request = controller.expectOne({
      method: 'POST',
      url: `${env.SERVER_URL}/api/auth/register`,
    });
    request.flush(testResData);
    controller.verify();
  });

  it('login', () => {
    service
      .login('testEmail@gmail.com', '12345')
      .pipe(first())
      .subscribe((userData) => {
        expect(userData).toEqual(testResData);
      });

    const request = controller.expectOne({
      method: 'POST',
      url: `${env.SERVER_URL}/api/auth/login`,
    });
    request.flush(testResData);
    controller.verify();
  });

  it('logout', () => {
    service.logout();
    service.user
      .subscribe((user) => {
        expect(user).toBeNull();
      })
      .unsubscribe();
  });

  it('set login mode - true', () => {
    service.setLoginMode(true);
    service.isLoginMode
      .subscribe((mode) => {
        expect(mode).toBeTrue();
      })
      .unsubscribe();
  });

  it('set login mode - false', () => {
    service.setLoginMode(false);
    service.isLoginMode
      .subscribe((mode) => {
        expect(mode).toBeFalse();
      })
      .unsubscribe();
  });

  it('autologin', () => {
    localStorage.setItem(
      'userData',
      '{"login":"testLogin","email":"testEmail@gmail.com","userId":"12345","_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"}'
    );
    service.autoLogin();
    service.user
      .subscribe((user) => {
        let testUser = new User(
          'testLogin',
          'testEmail@gmail.com',
          '12345',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
        );
        expect(user).toEqual(testUser);
      })
      .unsubscribe();
    localStorage.clear();
  });

  it('email validation - invalid', () => {
    let emailInput = new FormControl('andrew');
    let isEmailValid = service.checkEmailValidator(emailInput);
    expect(isEmailValid).toEqual({ checkEmailValidator: true });
  });

  it('email validation - valid', () => {
    let emailInput = new FormControl('testEmail@gmail.com');
    let isEmailValid = service.checkEmailValidator(emailInput);
    expect(isEmailValid).toBeNull();
  });
});
