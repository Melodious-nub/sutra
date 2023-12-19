import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrl: './dashboard-navbar.component.css'
})
export class DashboardNavbarComponent implements OnInit {
  isSurveyRouteActive = false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.checkIfProfileIsActive(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.checkIfProfileIsActive(event.urlAfterRedirects);
    });
  }

  private checkIfProfileIsActive(url: string) {
    // Check if the URL contains the 'survey' segment
    this.isSurveyRouteActive = url.includes('/admin/profile');
  }

  goAbout() {
    this.router.navigate(['/admin/profile/company-data/about'])
  }

  logout(): void {    
    this.auth.logout();
  }

}
