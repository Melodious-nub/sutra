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
  hide = true;

  constructor(private auth: AuthService, private router: Router, private api: DataService) { }

  ngOnInit(): void {
  }

  passwordVisible = false;
  password: string = '';

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    let passwordInput = document.getElementById('Password') as HTMLInputElement;
    passwordInput.type = this.passwordVisible ? 'text' : 'password';
  }

  onLogin(loginForm: NgForm):void {
    const loginData = { email: loginForm.value.email, password: this.password };
    this.auth.login(loginData).subscribe({
      next: (res: any) => {
        if (res.success && res.statusCode === 200) {
          console.log(res,'login');
          
          // Navigate to another page on success
          this.router.navigate(['admin']); // Update with your success route
        } else {
          // this.errorMessage = 'Invalid credentials';
        }
      },
      error: (error: any) => {
        // this.errorMessage = 'Login failed';
        // Handle the error (e.g., display error message)
      }
    });
  }
  // end user login with success

}
