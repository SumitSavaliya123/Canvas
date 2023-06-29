import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  openCloseSidebar: boolean = true;

  constructor(private authService: AuthService) {}

  adminSidebar(event: any) {
    this.openCloseSidebar = event;
  }

  adminLogout() {
    console.log('Admin');
    this.authService.logOut();
  }
}
