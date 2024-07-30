import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {  
  hide = true;

  constructor(private auth: AuthService, private router: Router, private api: DataService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

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
    this.spinner.show();
    const loginData = { email: loginForm.value.email, password: this.password };
    if(loginForm.valid) {
      this.auth.login(loginData).subscribe({
        next: (res: any) => {
          if (res.success && res.statusCode === 200) {
            this.spinner.hide();
            this.toastr.success(res.message);
            // Navigate to another page on success
            this.router.navigate(['admin']); // Update with your success route
          } else {
            // this.errorMessage = 'Invalid credentials';
            this.spinner.hide();
            this.toastr.warning(res.message);
          }
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error(error);
          // this.errorMessage = 'Login failed';
          // Handle the error (e.g., display error message)
        }
      });
    } else {
      this.spinner.hide();
      this.toastr.error("Please ensure all login credentials are correctly filled in.");
    }
  }
  // end user login with success

}
