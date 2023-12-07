import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { passwordMatchValidator } from '../../services/passwordMatchValidator';
import { Observable, map, startWith } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TermsAndConditionsComponent } from '../../modals/terms-and-conditions/terms-and-conditions.component';

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

  // options are contain 195 country names on string array
  options: string[] = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
    'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the',
    'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor (Timor-Leste)',
    'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland',
    'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea',
    'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq',
    'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'North Korea',
    'South Korea', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya',
    'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands',
    'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique',
    'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia',
    'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
    'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa',
    'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia',
    'Solomon Islands', 'Somalia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan', 'Sudan, South', 'Suriname', 'Sweden', 'Switzerland',
    'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
    'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
    'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
  ];
  filteredOptions!: Observable<string[]>;

  constructor(private api: DataService, private router: Router, private _formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit() {
    // reactive form group model
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
      companyEmail: ['', [Validators.required, Validators.email]],
      companyLicenseFile: [null, Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    });

    // for country value autocomplete
    const countryControl = this.secondFormGroup.get('country');
    if (countryControl) {
      this.filteredOptions = countryControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    }
  }

  // private filter method for country autocomplete
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
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
    console.log(this.firstFormGroup.controls['fullName'].value, this.secondFormGroup.get('companyEmail')?.value);
    
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

    // for modal behaviour used angular material modal
    openDialog() {
      const dialogRef = this.dialog.open(TermsAndConditionsComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        // console.log(`Dialog result: ${result}`);
      });
    }

}
