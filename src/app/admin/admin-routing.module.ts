import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';
import { CompanyDataComponent } from './survey/company-data/company-data.component';
import { AboutComponent } from './survey/company-data/about/about.component';
import { ProductComponent } from './survey/product/product.component';
import { ProductTypeComponent } from './survey/product/product-type/product-type.component';
import { GeneralDataComponent } from './survey/company-data/general-data/general-data.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'home', component: HomeComponent},
    // profile route with survey
    { path: 'profile', component: SurveyComponent, children: [
      { path: 'company-data', component: CompanyDataComponent, children: [
        { path: 'about', component: AboutComponent },
        { path: 'general-data', component: GeneralDataComponent },
      ]},
      { path: 'product', component: ProductComponent, children: [
        { path: 'product-type', component: ProductTypeComponent },
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
