import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { DashboardNavbarComponent } from './dashboard-navbar/dashboard-navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { SurveyComponent } from './survey/survey.component';
import { CompanyDataComponent } from './survey/company-data/company-data.component';
import { AboutComponent } from './survey/company-data/about/about.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './survey/product/product.component';
import { ProductTypeComponent } from './survey/product/product-type/product-type.component';
import { GeneralDataComponent } from './survey/company-data/general-data/general-data.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    DashboardNavbarComponent,
    SurveyComponent,
    CompanyDataComponent,
    AboutComponent,
    ProductComponent,
    ProductTypeComponent,
    GeneralDataComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbTypeaheadModule,
  ]
})
export class AdminModule { }
