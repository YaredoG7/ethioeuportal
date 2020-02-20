import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { DocumentsComponent } from './dashboard/documents/documents.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { ClrIconModule } from '@clr/angular';
import { PaymentComponent } from './dashboard/payment/payment.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AccountComponent } from './dashboard/account/account.component';
import { CountriesComponent } from './dashboard/countries/countries.component';
import { CountryAdminComponent } from './dashboard/country-admin/country-admin.component';
import { ApplicantListComponent } from './dashboard/applicant-list/applicant-list.component';
import { AboutPortalComponent } from './dashboard/about-portal/about-portal.component';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {NgbRatingModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import { MessageComponent } from './dashboard/message/message.component';
import { NgxEditorModule } from 'ngx-editor';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CountriesListComponent } from './dashboard/countries-list/countries-list.component';
import { CommonOnRolesComponent } from './dashboard/common-on-roles/common-on-roles.component';
import { SellingItemsComponent } from './dashboard/selling-items/selling-items.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    DocumentsComponent,
    PaymentComponent,
    HomeComponent,
    AccountComponent,
    CountriesComponent,
    CountryAdminComponent,
    ApplicantListComponent,
    AboutPortalComponent,
    MessageComponent,
    CountriesListComponent,
    CommonOnRolesComponent,
    SellingItemsComponent
  ],
  imports: [
    ClrIconModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule ,
    BrowserModule,
    ToasterModule.forRoot(),
    TooltipModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot(),
    NgxEditorModule,
    ToastContainerModule ,
    ClarityModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FileUploadModule,
    NgbRatingModule,
    NgbTypeaheadModule
  ],
  providers: [
    CookieService,
    ToasterService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
