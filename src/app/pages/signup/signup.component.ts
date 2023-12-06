import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

function passwordMatchValidator(password: string, confirmPassword: string) {
  return function(form: AbstractControl) {
    const passwordValue = form.get(password)?.value
    const confirmPasswordValue = form.get(confirmPassword)?.value

    if(passwordValue === confirmPasswordValue) {
      return null;
    }
    return {passwordMismatchError: true}
  }
}

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
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    designation: ['', Validators.required],
    companyIdCardFile: [new FormControl(null), Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, [passwordMatchValidator("password", "confirmPassword")]);

  secondFormGroup = this._formBuilder.group({
    companyName: ['', Validators.required],
    country: ['', Validators.required],
    companyAddress: ['', Validators.required],
    companyEmail: ['', Validators.required],
    companyLicense: [new FormControl(null), Validators.required],
  });

  companyIdCardFile:  File[] = [];
  companyLicense:  File[] = [];
  
  removebtnCompanyId:boolean = false;
  removebtnCompanyLicense:boolean = false;

  hide = true;
  hideC = true;

  model: any = {};

  // for company id card files - single file
  companyIdName:any;
  onSelect (event: any) {
    const allowedExtensions = ['jpg', 'png', 'gif', 'jpeg'];
    let file = event.target.files[0];;
    // logic for files mime type checking
    if (file) {
      const fileName = file.name.split('.').pop();
      if (!allowedExtensions.includes(fileName.toLowerCase())) {
        alert('Unsupported file type!');
        file = [];
        (event.target as HTMLInputElement).value = ''; // Clear the input
        this.companyIdCardFile = [];
        this.companyIdName = '';
        this.removebtnCompanyId = false;
      } else {
        // for upload files after bypassing the security
        this.removebtnCompanyId = true;
        this.companyIdName = event.target.files[0].name;
        this.companyIdCardFile.push(event.target.files[0]);
      }
    }
  }

  // for company license document
  companyLicenseName:any;
  onSelectLicense (event: any) {
    const allowedExtensions = ['jpg', 'png', 'gif', 'jpeg'];
    let file = event.target.files[0];;
    // logic for files mime type checking
    if (file) {
      const fileName = file.name.split('.').pop();
      if (!allowedExtensions.includes(fileName.toLowerCase())) {
        alert('Unsupported file type!');
        file = [];
        (event.target as HTMLInputElement).value = ''; // Clear the input
        this.companyLicense = [];
        this.companyLicenseName = '';
        this.removebtnCompanyLicense = false;
      } else {
        // for upload files after bypassing the security
        this.removebtnCompanyLicense = true;
        this.companyLicenseName = event.target.files[0].name;
        this.companyLicense.push(event.target.files[0]);
      }
    }
  }

  // for file remove company picture
  removeCompanyId() {
    this.companyIdCardFile = [];
    this.companyIdName = '';
    this.removebtnCompanyId = false;
  }

  removeCompanyLicense() {
    this.companyLicense = [];
    this.companyLicenseName = '';
    this.removebtnCompanyLicense = false;
  }

  resetBtnClicked() {
    this.removeCompanyId();
    this.removeCompanyLicense();
  }

  constructor(private api: DataService, private router: Router, private _formBuilder: FormBuilder) { }

  // Registation Section will update here
  onRegSubmit() {
    // console.log(this.firstFormGroup.controls, this.secondFormGroup);
    
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
