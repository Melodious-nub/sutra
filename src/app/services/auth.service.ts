import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { DataService } from './data.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Inject PLATFORM_ID to determine the current platform context (browser or server)
  constructor(private router: Router, private api: DataService, @Inject(PLATFORM_ID) private platformId: Object) { }

  /**
   * Saves a user token to localStorage if running in the browser.
   * On the server, this method does nothing.
   * 
   * @param token The token to be saved.
   */
  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  /**
   * Retrieves a user token from localStorage if running in the browser.
   * On the server, or if the token is not set, this returns null.
   * 
   * @returns The token as a string or null if not set.
   */    
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  /**
   * Checks if a user token is present, indicating logged-in status.
   * 
   * @returns true if the user is logged in (token is present), false otherwise.
   */  
  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    // localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['login']);
  }

  token:any;
  login(data: any): Observable<any> {
    return this.api.login(data).pipe(
      map(res => {
        if (res.success === true && res.statusCode === 200) {
          this.token = res.data.token;
          this.setToken(this.token);
          return res;
        } else {
          return res;
        }
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
  
}
