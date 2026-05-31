import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email = '';
  password = '';

  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  login(): void {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter your email and password.';
      return;
    }

    const payload = {
      email: this.email.trim(),
      password: this.password.trim()
    };

    console.log('Payload:', payload);
    this.isLoading = true;

    this.authService.login(payload).subscribe({
      next: (res: any) => {
        console.log('Response:', res);
        this.isLoading = false;
        localStorage.setItem('token', res.token);
        this.router.navigate(['/chat']);
      },
      error: (err: any) => {
        console.error('Error:', err);
        this.isLoading = false;
        this.errorMessage = err?.error?.message || err?.error?.title || 'Login failed. Please try again.';
      }
    });
  }
}

// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../../core/services/auth';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-login',
//     standalone: true,
//   imports: [FormsModule,CommonModule,RouterLink],
//   templateUrl: './login.html',
//   styleUrl: './login.css',
// })
// export class Login {
//    email = '';
//   password = '';

//   constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}
// login() {
//   if (!this.email || !this.password) {
//     alert('Please enter email and password');
//     return;
//   }

//   const payload = {
//     email: this.email.trim(),
//     password: this.password.trim()
//   };

//   console.log('Payload:', payload);

//   this.authService.login(payload).subscribe({
//     next: (res: any) => {
//       console.log('Response:', res);

//       localStorage.setItem('token', res.token);
//       this.router.navigate(['/chat']);
//     },
//     error: (err: any) => {
//       console.error('Error:', err);
//       alert(err.error?.title || 'Login failed');
//     }
//   });
// }
// }
