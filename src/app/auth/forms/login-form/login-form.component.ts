import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        this.authService.checkEmailValidator,
      ]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onShowRegisterForm() {
    this.authService.setLoginMode(false);
    this.loginForm.reset();
  }

  onSubmit() {
    this.isLoading = true;
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      },
      error: (error) => {
        this.isLoading = false;
        alert(error.error);
      },
    });
    this.loginForm.reset();
  }
}
