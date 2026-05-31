import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';

import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const isLoggedIn = this.authService.isLoggedIn();

    // User already logged in and tries login/register
    if (
      (route.routeConfig?.path === 'login' ||
       route.routeConfig?.path === 'register')
      &&
      isLoggedIn
    ) {
      this.router.navigateByUrl('/chat', { replaceUrl: true });
      return false;
    }

    // User not logged in and tries protected pages
    if (
      (route.routeConfig?.path === 'chat' ||
       route.routeConfig?.path === 'profile')
      &&
      !isLoggedIn
    ) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}