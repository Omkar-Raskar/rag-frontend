import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Chat } from './features/chat/chat/chat';
import { AuthGuard } from './core/guards/auth-guard';
import { Profile } from './features/profile/profile';

export const routes: Routes = [
    { path: 'login', component: Login, canActivate: [AuthGuard] },

{ path: 'register', component: Register, canActivate: [AuthGuard] },

{ path: 'chat', component: Chat, canActivate: [AuthGuard] },

{ path: 'profile', component: Profile, canActivate: [AuthGuard] },

{ path: '', redirectTo: '/login', pathMatch: 'full' }
];
