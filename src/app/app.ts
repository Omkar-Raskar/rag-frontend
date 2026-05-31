import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Nav } from 'react-bootstrap';
import { Navbar } from './shared/navbar/navbar';
import { AuthService } from './core/services/auth';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App   {

  constructor(private authService: AuthService) {}

  // ngOnInit() {
  //   this.authService.autoLogin();
  // }
}