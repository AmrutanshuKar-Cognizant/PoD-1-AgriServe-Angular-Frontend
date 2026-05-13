import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.html',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';
  private toastTimer: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      contactInfo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      role: ['Farmer', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]],
      landSize: [null, [Validators.required, Validators.min(0.1)]],
      cropType: ['', Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.toastMessage = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: (response: any) => {
        this.handleSuccess();
      },
      error: (err: any) => {
        if (err.status === 201 || err.status === 200) {
          this.handleSuccess();
          return;
        }

        this.isLoading = false;
        let parsedErrorMessage = 'Registration failed. Please try again.';

        if (err.error && typeof err.error === 'object') {
          const firstErrorKey = Object.keys(err.error)[0];
          parsedErrorMessage = err.error[firstErrorKey] || parsedErrorMessage;
        } else if (typeof err.error === 'string') {
          parsedErrorMessage = err.error;
        }

        this.showToast(parsedErrorMessage, 'error');
      }
    });
  }

  private handleSuccess() {
    this.isLoading = false;
    this.showToast('Registration Successful! Redirecting...', 'success');

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2500);
  }

  private showToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.cdr.detectChanges();

    if (this.toastTimer) clearTimeout(this.toastTimer);

    if (type === 'error') {
      this.toastTimer = setTimeout(() => {
        this.toastMessage = '';
        this.cdr.detectChanges();
      }, 4000);
    }
  }
}