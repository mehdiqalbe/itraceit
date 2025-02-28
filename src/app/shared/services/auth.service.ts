import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  dataform: any;
                //private afu: AngularFireAuth,
  constructor( private router: Router,private http: HttpClient,) { 
    // // this.afu.authState.subscribe((auth =>{
    // //   this.authState = auth;
    // }))
  }

  // all firebase getdata functions

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }

  get currentUserName(): string {
    return this.authState['email']
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

// registerWithEmail(email: string, password: string) {
//     return this.afu.createUserWithEmailAndPassword(email, password)
//       .then((user) => {
//         this.authState = user
//       })
//       .catch(_error => {
//         console.log(_error)
//         throw _error
//       });
//   }

  

  // loginWithEmail(email: string, password: string)
  // {
  //   return this.afu.signInWithEmailAndPassword(email, password)
  //     .then((user) => {
  //       this.authState = user
  //     })
  //     .catch(_error => {
  //       console.log(_error)
  //       throw _error
  //     });
  // }

  // singout(): void
  // {
  //   this.afu.signOut();
  //   this.router.navigate(['/login']);
  // }


  //  Ajay Added

  loginSpecificUser(data: any) {
    return this.http.post<any>('https://apinode2.secutrak.in/dev-app-itraceit/getSpecificGroup', data);
  }
  loginServiceHandler(data) {
    
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/loginGroupZip', data);
  }
  loginServiceHandlernew(data) {
    // 
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/loginV2', data);
    // return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/loginV2', data);

  }
  // loginServiceHandlernew(data) {
    
  //   return this.http.post('https://api.secutrak.in/dev-app-secutrak/loginByAccessTokenV2', data);
  // }
  logout(data) {
    
    // return this.http.post('https://api.secutrak.in/dev-app-secutrak/loginV2', data);
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/logout', data);

  }
  Access(data){
    // https://api.secutrak.in/dev-app-secutrak
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/loginByAccessTokenV2', data);
    // return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/loginByAccessTokenV2', data);
  }
  forget(data){
    return this.http.post('https://api.secutrak.in/dev-app-secutrak/forgotPassword', data);
  }
  verifyOTP(data){
    return this.http.post('https://api.secutrak.in/dev-app-secutrak/verifyOTP', data);
  }
  
IsLoggedIn(){
 
  return ! ! localStorage.getItem('AccessToken');
}
change_password(val:any){
  return this.http.post('https://api.secutrak.in/dev-app-secutrak/changePassword',val);
}
}
