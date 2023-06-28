import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from './message.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtToken!: string;
  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private messageService: MessageService
  ) {}

  login(credentials: any) {
    this.http.post<any>(`${this.baseUrl}accounts/login`, credentials).subscribe(
      (response) => {
        if (response.success) {
          this.router.navigate(['/admin']);
          this.jwtToken = response.content;
          localStorage.setItem('jwtToken', this.jwtToken);
          this.messageService.add('Login Successful', 'Ok');
        } else {
          this.messageService.add(response.Messages[0], 'Ok');
        }
      },
      (error) => {
        console.log('Login failed:', error);
      }
    );
  }

  validateToken() {
    if (this.jwtToken) {
      if (this.jwtHelper.isTokenExpired(this.jwtToken)) {
        this.messageService.add('Session is expired, Please login!', 'close');
        this.router.navigate(['/login']);
      }
    } else {
      this.messageService.add('Please login!', 'close');
      this.router.navigate(['/login']);
    }
  }

  isAuthenticate() {
    const decodeToken = this.jwtHelper.decodeToken(this.jwtToken);
    if (this.jwtToken === '') {
      return false;
    } else {
      const role =
        decodeToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ];
      if (role === '2') {
        return true;
      } else {
        return false;
      }
    }
  }

  getJwtToken(): string {
    return this.jwtToken;
  }

  logOut(): void {
    this.jwtToken = '';
    localStorage.setItem('jwtToken', this.jwtToken);
    this.router.navigate(['/login']);
    this.messageService.add('Logged out successfully.', 'close');
  }
}
