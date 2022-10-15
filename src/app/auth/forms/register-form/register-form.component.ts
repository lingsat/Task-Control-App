import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, this.authService.checkEmailValidator]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
    });
  }

  onShowLoginForm() {
    this.authService.setLoginMode(true);
    this.registerForm.reset();
  }

  onSubmit() {
    this.isLoading = true;
    const { login, email, password } = this.registerForm.value;

    this.authService.register(login, email, password).subscribe({
      next: () => {      
        this.authService.setLoginMode(true);
        this.isLoading = false;
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        })
      },
      error: (error) => {
        this.isLoading = false;
        alert(error.error.message);
      },
      });

    this.registerForm.reset();  
  }
}
