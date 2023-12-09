import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-account-confirmation',
  templateUrl: './account-confirmation.component.html',
  styleUrl: './account-confirmation.component.css'
})
export class AccountConfirmationComponent implements OnInit {

  emailConfirmed: boolean = false;
  urlParams: any = {};
  link = 'http://localhost:4200/account-confirmation?url=';

  constructor(private route: ActivatedRoute, private api: DataService, private router: Router, private toastr: ToastrService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.urlParams.url = this.route.snapshot.queryParamMap.get('url');
    // alert('Click ok to confirm');
    if(this.urlParams.url !== null && isPlatformBrowser(this.platformId)) {
      this.confirmEmail();
    }
  }

  confirmEmail() {    
    this.api.verifyEmail(this.urlParams).subscribe({
      next: (res: any) => {
        // console.log("inside");
        if (res.success == true) {
          this.toastr.success(res.message, 'Congratulation.');
          this.emailConfirmed = true;
        } else {
          this.emailConfirmed = false;
          this.toastr.warning(res.message);
        }
      },
      error: (error: any) => {
        this.toastr.error(error);
      }
    });
  }

  // for navigating login
  navigateLogin() {
    this.router.navigate(['login']);
  }

}
