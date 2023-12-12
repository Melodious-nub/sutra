import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';
import { CompanyDataComponent } from './survey/company-data/company-data.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'home', component: HomeComponent},
    { path: 'profile', component: SurveyComponent, children: [
      { path: 'company-data', component: CompanyDataComponent, children: [
        
      ]},
    ]},
    // { path: 'cap', component: CapComponent },
    // { path: 'manage', component: ManageComponent },
    // ...other routes
    { path: 'home', component: HomeComponent},
    { path: '', redirectTo: '/admin/home', pathMatch: 'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
