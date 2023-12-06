import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private api: DataService) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
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
