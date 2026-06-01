import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Form } from 'react-bootstrap';
import { RouterOutlet } from '@angular/router';
import { Login } from '../../features/auth/login/login';
import { Register } from '../../features/auth/register/register';
import { Chat } from '../../features/chat/chat/chat';
import { AuthService } from '../../core/services/auth';
import { CommonModule } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  constructor(public authService: AuthService,private router: Router) {}

  logout() {
    this.authService.logout();
  }

 
  onLoginClick() {
    console.log('Login clicked');
    this.router.navigate(['/login']);
  }

  onRegisterClick() {
    console.log('Register clicked');
    this.router.navigate(['/register']);
  }   

  onChatClick() {
    console.log('Chat clicked');
    this.router.navigate(['/chat']);
  } 

}
