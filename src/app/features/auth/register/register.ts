import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  email = '';
  password = '';
  confirmPassword = '';

  showPassword = false;
  showConfirm = false;
  isLoading = false;

  emailError = '';
  errorMessage = '';

  passwordStrength = 0;
  strengthLabel = '';
  strengthClass = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email) {
      this.emailError = 'Email is required.';
    } else if (!emailRegex.test(this.email)) {
      this.emailError = 'Enter a valid email address.';
    } else {
      this.emailError = '';
    }
  }

  onPasswordInput(): void {
    const p = this.password;
    let score = 0;
    if (p.length >= 8)           score++;
    if (/[A-Z]/.test(p))         score++;
    if (/[0-9]/.test(p))         score++;
    if (/[^A-Za-z0-9]/.test(p))  score++;

    this.passwordStrength = Math.min(score, 4);

    if (score <= 1) {
      this.strengthLabel = 'Weak';
      this.strengthClass = 'text-weak';
    } else if (score === 2) {
      this.strengthLabel = 'Fair';
      this.strengthClass = 'text-medium';
    } else {
      this.strengthLabel = 'Strong';
      this.strengthClass = 'text-strong';
    }
  }

  onConfirmInput(): void {
    // Reactivity handled by passwordsMatch getter
  }

  register(): void {
    this.errorMessage = '';
    this.validateEmail();

    if (this.emailError) return;

    if (!this.password) {
      this.errorMessage = 'Password is required.';
      return;
    }
    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters.';
      return;
    }
    if (!this.confirmPassword) {
      this.errorMessage = 'Please confirm your password.';
      return;
    }
    if (!this.passwordsMatch) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;

    const data = { email: this.email, password: this.password };

    this.authService.register(data).subscribe({
      next: (res) => {
        console.log('Register success:', res);
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Register error:', err);
        this.isLoading = false;
        this.errorMessage = err?.error?.message || err?.error || 'Registration failed. Please try again.';
      }
    });
  }
}

// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../../../core/services/auth';
// import { Router } from '@angular/router';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [FormsModule, CommonModule,RouterLink],
//   templateUrl: './register.html',
//   styleUrl: './register.css'
// })
// export class Register {

//   email = '';
//   password = '';
//   confirmPassword = '';

//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   register() {

//     // 🔴 Validation
//     if (!this.email || !this.password || !this.confirmPassword) {
//       alert('All fields are required');
//       return;
//     }

//     if (this.password !== this.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     const data = {
//       email: this.email,
//       password: this.password
//     };

//     this.authService.register(data).subscribe({
//       next: (res) => {
//         console.log('Register success:', res);
//         alert('Registration successful ✅');

//         // redirect to login
//         this.router.navigate(['/login']);
//       },
//       error: (err) => {
//         console.error('Register error:', err);
//         alert(err.error || 'Registration failed ❌');
//       }
//     });
//   }
// }