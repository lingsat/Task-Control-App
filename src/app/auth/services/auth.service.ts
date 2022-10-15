import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { AuthResponseData } from '../models/response.model';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  isLoginMode = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient, private router: Router) {}

  register(
    login: string,
    email: string,
    password: string
  ): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(`${env.SERVER_URL}/api/auth/register`, {
        login,
        email,
        password,
      })
      .pipe(
        tap((resData) => {
          this.handleAuth(
            resData.login,
            resData.email,
            resData.userId,
            resData.jwt_token
          );
        })
      );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(`${env.SERVER_URL}/api/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((resData) => {
          this.handleAuth(
            resData.login,
            resData.email,
            resData.userId,
            resData.jwt_token
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      login: string;
      email: string;
      userId: string;
      _token: string;
    } = JSON.parse(localStorage.getItem('userData')!);

    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.login,
      userData.email,
      userData.userId,
      userData._token
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
  }

  private handleAuth(
    login: string,
    email: string,
    userId: string,
    token: string
  ) {
    const user = new User(login, email, userId, token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  setLoginMode(value: boolean) {
    this.isLoginMode.next(value);
  }

  // Validators
  checkEmailValidator(control: FormControl) {
    const isValid = /^\S+@\S+\.\S+$/.test(control.value);
    if (control.value !== null && !isValid) {
      return { checkEmailValidator: true };
    }
    return null;
  }
}
