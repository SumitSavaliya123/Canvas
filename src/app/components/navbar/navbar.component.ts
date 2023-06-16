import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  cartCount: number = 5; // Replace with your own cart count
  notificationCount: number = 10; // Replace with your own notification count
  commentCount: number = 3; // Replace with your own comment count
}
