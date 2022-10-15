import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { environment as env } from '../../../environments/environment';
import { first } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthComponent } from '../auth.component';
import { User } from '../models/user.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
      .register('Andrew', 'andrew@gmail.com', '123456')
      .pipe(first())
      .subscribe((userData) => {
        expect(userData).toEqual(response);
      });

    const request = controller.expectOne({
      method: 'POST',
      url: `${env.SERVER_URL}/api/auth/register`,
    });
    let response = {
      jwt_token: 'Bearer qwerty12345678',
      email: 'andrew@gmail.com',
      userId: 'newid123',
      login: 'Andrew',
    };
    request.flush(response);
    controller.verify();
  });

  it('login', () => {
    service
      .login('andrew@gmail.com', '123456')
      .pipe(first())
      .subscribe((userData) => {
        expect(userData).toEqual(response);
      });

    const request = controller.expectOne({
      method: 'POST',
      url: `${env.SERVER_URL}/api/auth/login`,
    });
    let response = {
      jwt_token: 'Bearer qwerty12345678',
      email: 'andrew@gmail.com',
      userId: 'newid123',
      login: 'Andrew',
    };
    request.flush(response);
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
      '{"login":"andrew","email":"andrew@gmail.com","userId":"633ad3f926d9618d602e7a96","_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"}'
    );
    service.autoLogin();
    service.user
      .subscribe((user) => {
        let testUser = new User(
          'andrew',
          'andrew@gmail.com',
          '633ad3f926d9618d602e7a96',
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
    let emailInput = new FormControl('andrew@gmail.com');
    let isEmailValid = service.checkEmailValidator(emailInput);
    expect(isEmailValid).toBeNull();
  });
});
