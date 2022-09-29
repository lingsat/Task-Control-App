import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // redirect authorized user to dashboard - lazy loading handle
    if (localStorage.getItem('userData')) {
      this.router.navigate(['/dashboard']);
    }

    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    const { email, password } = this.authForm.value;

    this.isLoading = true;
    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          alert(error.error.message);
        },
      });
    } else {
      this.authService.register(email, password).subscribe({
        next: (resData) => {         
          this.isLoading = false;
          this.isLoginMode = true;
          alert(resData.message);
        },
        error: (error) => {
          this.isLoading = false;
          alert(error.error.message);
        },
      });
    }
    this.authForm.reset();
  }
}