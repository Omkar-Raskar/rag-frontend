import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // store login state
  constructor(private router: Router, private http: HttpClient) {}

  login(data: any) {
  return this.http.post<any>(
    'https://documentanalyzer-i8d0.onrender.com/api/auth/login',
    data
  );
}

register(data: any) {
  return this.http.post<any>('http://localhost:5004/api/auth/register', data);
}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getProfile() {
  const token = localStorage.getItem('token');

  return this.http.get<any>('https://documentanalyzer-i8d0.onrender.com/api/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
}