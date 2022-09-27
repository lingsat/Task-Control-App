import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import {
  AuthResponseData,
  RegistrationResponseData,
} from '../models/response.model';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  register(
    email: string,
    password: string
  ): Observable<RegistrationResponseData> {
    return this.http.post<RegistrationResponseData>(
      `http://localhost:8080/api/auth/register`,
      { email, password }
    );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(`http://localhost:8080/api/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((resData) => {
          this.handleAuth(resData.email, resData.userId,resData.jwt_token);
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      userId: string;
      _token: string;
    } = JSON.parse(localStorage.getItem('userData')!);

    if (!userData) {
      return;
    }
    const loadedUser = new User(
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

  private handleAuth(email: string, userId: string, token: string) {
    const user = new User(email, userId, token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
