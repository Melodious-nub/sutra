import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // Inject a service here
  constructor( private auth: AuthService, private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      // Logic for AuthGuard Login block
    if (!this.auth.isLoggedIn()){
      this.router.navigate(['login']);
      return false;
    }
    else{
      return this.auth.isLoggedIn();
    }
  }
  
}
