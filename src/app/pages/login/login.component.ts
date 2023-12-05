import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: AuthService, private router: Router, private api: DataService) { }

  ngOnInit(): void {
  }

  onLogin():void {
    const loginData = { email: this.email, password: this.password };
    this.auth.login(loginData).subscribe({
      next: (res) => {
        if (res.success && res.statusCode === 200) {
          // Navigate to another page on success
          this.router.navigate(['/dashboard']); // Update with your success route
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      },
      error: (error) => {
        this.errorMessage = 'Login failed';
        // Handle the error (e.g., display error message)
      }
    });
  }
  // end user login with success

}
