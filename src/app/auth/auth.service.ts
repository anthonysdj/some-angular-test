import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated: boolean = false;

  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    const authTime = localStorage.getItem('authenticated');

    if (authTime) {
      const expireTime = new Date(Number(authTime)).getTime() + 1*60000;

      if (Number(expireTime) > Date.now()) {
        return true;
      }
    }

    return false;
  }

  redirectToDashboard(): void {
    this.router.navigateByUrl('/');
  }

  redirectToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
