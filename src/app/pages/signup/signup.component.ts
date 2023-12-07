import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { passwordMatchValidator } from '../../services/passwordMatchValidator';

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

export class SignupComponent implements OnInit {

  firstFormGroup!: FormGroup;

  secondFormGroup!: FormGroup;

  companyIdCardFile: File | null = null;
  companyLicenseFile: File | null = null;
  companyIdName:string = '';
  companyLicenseName:string = '';

  hide = true;
  hideC = true;

  constructor(private api: DataService, private router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      companyIdCardFile: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });

    this.secondFormGroup = this._formBuilder.group({
      companyName: ['', Validators.required],
      country: ['', Validators.required],
      companyAddress: ['', Validators.required],
      companyEmail: ['', Validators.required],
      companyLicenseFile: [null, Validators.required],
    });
  }

  // for comapny id card file
  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const fileType = file.type;

      // Check if the file type is an image or a PDF
      if (fileType.match(/image\/*/) || fileType === 'application/pdf') {
        this.companyIdCardFile = file;
        this.companyIdName = file.name;
        this.firstFormGroup.patchValue({ companyIdCardFile: file });
      } else {
        alert('Only images and PDFs are allowed.');
        this.clearFile();
      }
    }
  }

  // for clearing company id card
  clearFile() {
    this.companyIdCardFile = null;
    this.companyIdName = '';
    this.firstFormGroup.patchValue({ companyIdCardFile: null });
  }

  // for company bussiness license
  onFileSelectedLicense(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const fileType = file.type;

      // Check if the file type is an image or a PDF
      if (fileType.match(/image\/*/) || fileType === 'application/pdf') {
        this.companyLicenseFile = file;
        this.companyLicenseName = file.name;
        this.secondFormGroup.patchValue({ companyLicenseFile: file });
      } else {
        alert('Only images and PDFs are allowed.');
        this.clearFile();
      }
    }
  }

  // for clearing company license file
  clearFileLicense() {
    this.companyLicenseFile = null;
    this.companyLicenseName = '';
    this.firstFormGroup.patchValue({ companyLicenseFile: null });
  }

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
