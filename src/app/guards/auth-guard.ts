import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticate()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.messageService.add('You are not authenticated.', 'Ok');
      return false;
    }
  }
}
