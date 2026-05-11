import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.html',
})
export class RegisterComponent {
  registerData = {
    name: '',
    email: '',
    contactInfo: '',
    password: '',
    role: 'Farmer',
    dob: '',
    gender: '',
    address: '',
    landSize: null as unknown as number, 
    cropType: ''
  };

  errorMessage: string = '';
  isLoading: boolean = false;
  showSuccessPopup: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.registerData).subscribe({
      next: (response: any) => { 
        console.log('✅ Registration successful', response);
        this.isLoading = false;
        this.showSuccessPopup = true;

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2500); 
      },
      error: (err: any) => { 
        
        // 🚨 THE FIX: Catch the "Fake Error" caused by plain-text 201 responses
        if (err.status === 201 || err.status === 200) {
          console.log('✅ Registration actually succeeded (Caught text response)');
          this.isLoading = false;
          this.showSuccessPopup = true;
          
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2500); 
          return; // Stop the rest of the error block from running!
        }

        // --- Normal Error Handling Below ---
        this.isLoading = false;
        
        if (err.error && typeof err.error === 'object') {
            const firstErrorKey = Object.keys(err.error)[0];
            this.errorMessage = err.error[firstErrorKey] || 'Invalid input. Please check your form.';
        } else {
            // Also updated this to handle plain text errors gracefully
            this.errorMessage = typeof err.error === 'string' ? err.error : 'Registration failed. Please try again.';
        }
        console.error('❌ Registration error', err);
      }
    });
  }
}