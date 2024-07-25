import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
//import {AngularFireModule} from '@angular/fire'
//import { AngularFireAuthModule } from '@angular/fire/auth';
//import { AngularFirestoreModule } from '@angular/fire/firestore';
//import { AngularFireDatabaseModule } from '@angular/fire/database';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import { RegisterComponent } from './authentication/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ExcelService } from './shared/services/crud.service';
import { AgmCoreModule } from '@agm/core';
import { ForgetpasswordComponent } from './authentication/forgetpassword/forgetpassword.component';
import { ConfirmOTPComponent } from './authentication/confirm-otp/confirm-otp.component';
import { AlltripsComponent } from './components/reports/alltrips/alltrips.component';
// import * as angular from 'node_modules/@types';
// import { ForgetPasswordComponent } from './forget-password/forget-password.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterComponent,
    ForgetpasswordComponent,
    ConfirmOTPComponent,
    AlltripsComponent,
    // ForgetPasswordComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    RouterModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    // AngularFireAuthModule,
    // AngularFireDatabaseModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCRzByDjNttORvQ31CJD1H8d2LTc3SHlt4',
      libraries: ['places']

    }),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpClient, ExcelService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
