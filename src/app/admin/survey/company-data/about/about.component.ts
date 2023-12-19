import { Component } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
interface AboutForm {
  companyName: string | null;
  country: string | null;
  address: string | null;
  contactNumber: string | null;
  faxNumber: string | null;
  email: string | null;
  websiteUrl: string | null;
  vision: string | null;
  mission: string | null;
  highLight: string | null;
  anyGroupOfCompanyExists: boolean | null;
  memberOfAnyAssociation: boolean | null;
  belongingGroupName: string | null;
  membership: [
    { membershipName: string | null, sinceMembership: string | null }
  ];
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  // total about form with imported interface
  aboutForm: AboutForm = {
    companyName: null,
    country: null,
    address: null,
    contactNumber: null,
    faxNumber: null,
    email: null,
    websiteUrl: null,
    vision: null,
    mission: null,
    highLight: null,
    anyGroupOfCompanyExists: false,
    memberOfAnyAssociation: false,
    belongingGroupName: null,
    membership: [
      { membershipName: '', sinceMembership: '' }
    ]
  };
  companyFrontGateImages: File[] = [];
  memberShipFile: File[] = [];

  // options are contain 195 country names on string array
  options: string[] = [];

  constructor(private api: DataService, private router: Router, private toastr: ToastrService,) {
    this.options = this.api.options;
   }
  
  // typehead method
  search = (text$: Observable<string>) => 
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? [] : this.options.filter(v => v.toLowerCase().includes(term.toLowerCase())).slice(0, 10))
    );

  formatter = (result: string) => result;

  // multiple file uplaoad for company gate
  onGateFilesSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        if (file.type.match(/image\/*/)) {
          this.companyFrontGateImages.push(file);
        } else {
          alert('Only image files are allowed.');
        }
      }
    }
  }

  // for removing files
  removeGateFile(index: number) {
    this.companyFrontGateImages.splice(index, 1);
  }

  // for adding membership
  addMembership(): void {
    this.aboutForm.membership.push({ membershipName: '', sinceMembership: '' });
  }

  // for removing membership
  removeMembership(index: number): void {
    if (index > -1 && this.aboutForm.membership.length > 1) {
      this.aboutForm.membership.splice(index, 1);
      this.memberShipFile.splice(index, 1);
    }
  }

  // membership file handle
  onMemberFileSelected(event: any, index: number): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        if (file.type.match(/image\/*/) || file.type === 'application/pdf') {
          this.memberShipFile.push(file);
        } else {
          alert('Only image files and PDFs are allowed.');
        }
      }
    }
  }

  onAboutSubmit() {
    const formData = new FormData();

    // for multiple file upload front gate image
    for (let i = 0; i < this.companyFrontGateImages.length; i++) {
      formData.append("FrontGatePicture", this.companyFrontGateImages[i]);
    }
    // for multiple file upload, membership
    for (let i = 0; i < this.memberShipFile.length; i++) {
      formData.append("MembershipCertificate", this.memberShipFile[i]);
    }
    // overallbodyPost for rest of the form
    formData.append('CompanyAboutData', JSON.stringify(this.aboutForm));
    // console.log(this.aboutForm);

    this.api.companyAboutData(formData).subscribe({
      next: (res: any) => {
        if (res.success && res.statusCode === 200) {
          // console.log(res);
          this.toastr.success(res.message);
          // Navigate to another page on success
          // this.router.navigate(['admin']);
        } else {
          this.toastr.warning(res.message);
          // console.log(res.message, 'warning');
        }
      },
      error: (error: any) => {
        this.toastr.error(error);
        // console.log(error, "error");
      }
    });
  }

}
