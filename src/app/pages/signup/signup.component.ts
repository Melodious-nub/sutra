import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class SignupComponent {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private api: DataService, private router: Router, private _formBuilder: FormBuilder) { }

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
