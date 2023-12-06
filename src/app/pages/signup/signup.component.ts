import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  hide = true;
  hideC = true;
  isChecked!: boolean;
  // for phone number input
  model: any = {};
  dropValue = 1;

  constructor(private api: DataService, private router: Router) { }

  // Registation Section will update here
  onRegSubmit(registerForm: NgForm) {
    // this.api.login(registerForm).subscribe({
    //   next: (res: any) => {
    //     if (res.success && res.statusCode === 200) {
    //       console.log(res,'login');
    //     } else {
    //       // this.errorMessage = 'Invalid credentials';
    //     }
    //   },
    //   error: (error: any) => {
    //     // this.errorMessage = 'Login failed';
    //     // Handle the error (e.g., display error message)
    //   }
    // });
    }

}
