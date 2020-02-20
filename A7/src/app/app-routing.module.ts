import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentsComponent } from './dashboard/documents/documents.component';
import { PaymentComponent } from './dashboard/payment/payment.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AccountComponent } from './dashboard/account/account.component';
import { CountriesComponent } from './dashboard/countries/countries.component';
import { CountryAdminComponent } from './dashboard/country-admin/country-admin.component';
import { ApplicantListComponent } from './dashboard/applicant-list/applicant-list.component';
import { AboutPortalComponent } from './dashboard/about-portal/about-portal.component';
import { MessageComponent } from './dashboard/message/message.component';
import { CountriesListComponent } from './dashboard/countries-list/countries-list.component';
import { SellingItemsComponent } from './dashboard/selling-items/selling-items.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },

  {

    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: AboutPortalComponent

      },
      {
        path: 'order_items',
        component: SellingItemsComponent
      },
      {
        path: 'about',
        component: HomeComponent
      },
      {
        path: 'documents',
        component: DocumentsComponent
      },
      {
        path: 'message',
        component: MessageComponent
      },
      {
        path: 'payment/:reason',
        component: PaymentComponent
      },
      {
        path: 'docs/:userId',
        component: RegisterComponent
      },
      {
        path: 'account/:userId',
        component: AccountComponent
      },
      {
        path: 'available_countries',
        component: CountriesComponent
      },
      {
        path: 'admin_add_countries/:cntryId',
        component: CountryAdminComponent
      },
      {
        path: 'admin_list_applicant',
        component: ApplicantListComponent
      },
      {
        path: 'admin_countries_list',
        component: CountriesListComponent
      },

   
      ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
