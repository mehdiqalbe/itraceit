import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import{ ForgetpasswordComponent} from './authentication/forgetpassword/forgetpassword.component'
import { RegisterComponent } from './authentication/register/register.component';
import { ContentStyleComponent } from './shared/components/layouts/content-style/content-style.component';
import { ErrorStyleComponent } from './shared/components/layouts/error-style/error-style.component';
import { FullContentComponent } from './shared/components/layouts/full-content/full-content.component';
import { custom_content } from './shared/routes/custom-content-router';
import { error_content } from './shared/routes/error-content-router';
import { full_content } from './shared/routes/full-content-router';
import { AuthGuard } from './shared/services/auth.guard';
import { AuthService } from './shared/services/auth.service';
import{ConfirmOTPComponent } from './authentication/confirm-otp/confirm-otp.component'

const routes: Routes = [
  // /UPFCS/FCS/
  { path: '', redirectTo:'auth/login', pathMatch: 'full'},
  // { path: '', redirectTo:'auth/login', pathMatch: 'full'},
  // { path: '', redirectTo:'/maps', pathMatch: 'full'},
  { path: 'auth/login', component: LoginPageComponent },
  // { path: '/maps', component: LeafletComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/Forget', component: ForgetpasswordComponent },
  { path: 'auth/confirm', component: ConfirmOTPComponent },
  { path: '', component: FullContentComponent, children: full_content },
  // { path: '', component: HoriFullLayoutComponent, children: full_content },
  { path: '', component: ErrorStyleComponent, children: error_content },
  { path: '', component: ContentStyleComponent, children: custom_content },
  { path: '**', redirectTo: '' },
 { path: '', loadChildren: 'reports/reports.module#ReportsModule' },
 
//  { path: 'cv', loadChildren: () => import('./cv/cv.module').then(m => m.CVModule) },
{ path: 'cv', loadChildren: () => import('./cv/cv.module').then(m => m.CVModule), canActivate: [AuthGuard] },

  // { path: '', redirectTo: 'cv', pathMatch: 'full', canActivate: [AuthGuard] },
  // { path: '**', redirectTo: 'cv', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [[RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
