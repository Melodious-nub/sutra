import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {  
  hide = true;

  constructor(private auth: AuthService, private router: Router, private api: DataService, private toastr: ToastrService) { }

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
          this.toastr.success(res.message);
          // Navigate to another page on success
          this.router.navigate(['admin']); // Update with your success route
        } else {
          // this.errorMessage = 'Invalid credentials';
          this.toastr.warning(res.message);
        }
      },
      error: (error: any) => {
        this.toastr.error(error);
        // this.errorMessage = 'Login failed';
        // Handle the error (e.g., display error message)
      }
    });
  }
  // end user login with success

}
