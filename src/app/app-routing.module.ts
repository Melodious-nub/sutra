import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
    { path:'', component: LandingComponent},
    { path:'login', component: LoginComponent},
    { path:'signup', component: SignupComponent},
    // { path:'forgot-password', component: ForgetPasswordComponent},
    // Lazzy Loading Route 1
    // {
    //   path: 'admin',
    //   canActivate: [AuthGuard],
    //   loadChildren: () =>
    //   import('./admin/admin.module').then((m) => m.AdminModule),
    // },
  
    // wildCard for notfound
    { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
