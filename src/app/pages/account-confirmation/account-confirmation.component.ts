import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-account-confirmation',
  templateUrl: './account-confirmation.component.html',
  styleUrl: './account-confirmation.component.css'
})
export class AccountConfirmationComponent implements OnInit {

  emailConfirmed: boolean = false;
  urlParams: any = {};
  link = 'http://localhost:4200/account-confirmation?token=';

  constructor(private route: ActivatedRoute, private api: DataService, private router: Router,) { }

  ngOnInit(): void {
    this.urlParams.verificationToken = this.route.snapshot.queryParamMap.get('token');
    this.confirmEmail();
    console.log(this.urlParams.verificationToken, 'token');
  }

  confirmEmail() {
    // this.api.emailVerify(this.urlParams).subscribe(
    //   res => {
    //     if (res.success === true) {
    //       this.toastr.success(res.message, 'Congratulation.');
    //       this.emailConfirmed = true;
    //     } else {
    //       this.emailConfirmed = false;
    //       this.toastr.warning(res.message, 'Oops!');
    //     }
    //   },
    //   error => {
    //     this.toastr.warning(error.message, 'Server Error!')
    //   }
    // )
  }

  // for navigating login
  navigateLogin() {
    this.router.navigate(['login']);
  }

}
