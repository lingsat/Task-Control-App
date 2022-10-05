import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  authSub!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // redirect authorized user to dashboard - lazy loading handle
    if (localStorage.getItem('userData')) {
      this.router.navigate(['/dashboard']);
    }

    this.authSub = this.authService.isLoginMode.subscribe((loginMode) => {
      this.isLoginMode = loginMode;
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
