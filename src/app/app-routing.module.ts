import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './services/auth.guard';
import { AccountConfirmationComponent } from './pages/account-confirmation/account-confirmation.component';

const routes: Routes = [
    { path:'', component: LandingComponent},
    { path:'login', component: LoginComponent},
    { path:'signup', component: SignupComponent},
    // { path:'employee', component: EmployeeLoginComponent},
    // { path:'consumer', component: ConsumerLandingComponent},
    // { path:'forgot-password', component: ForgetPasswordComponent},
    { path: 'account-confirmation', component: AccountConfirmationComponent },
    { path: '',   redirectTo: '/', pathMatch: 'full' },
    // Lazzy Loading Route 1
    {
      path: 'admin',
      canActivate: [AuthGuard],
      loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    },
  
    // wildCard for notfound
    { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
