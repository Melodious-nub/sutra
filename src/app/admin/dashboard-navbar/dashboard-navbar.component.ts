import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrl: './dashboard-navbar.component.css'
})
export class DashboardNavbarComponent {

  constructor(private route: Router) {}

  goToHome() {
    this.route.navigate(["admin/home"]);
  }

  view = false;
  toggle() {
    this.view = !this.view;
  }

}
