import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  sideBarStatus: boolean = true;
  @Output() logout = new EventEmitter<any>();

  @Output() sidebar = new EventEmitter<boolean>();

  toggleSidebar() {
    this.sideBarStatus = !this.sideBarStatus;
    this.sidebar.emit(this.sideBarStatus);
  }

  logoutRequest() {
    this.logout.emit();
  }
}
