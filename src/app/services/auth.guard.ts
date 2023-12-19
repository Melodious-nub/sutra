import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // Inject a service here, platform_id for ssr rendering
  constructor( private auth: AuthService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      // this is for ssr refreshing problem solve
      if (isPlatformBrowser(this.platformId)) {
        // Logic for AuthGuard Login block
        if (!this.auth.isLoggedIn()) {
          this.router.navigate(['login']);
          return false;
        }
        return true;
      } else {
        // On the server, always return true and let client-side handle the redirect
        return true;
      }
  }
  
}
