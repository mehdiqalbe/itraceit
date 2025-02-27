import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService} from './auth.service';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth :  AuthService, private router:Router){}
  canActivate(
    ) {
      if(this.auth.IsLoggedIn()){
        const formData = new FormData();
        formData.append('AccessToken',String(localStorage.getItem('AccessToken')));
        this.auth.Access(formData).subscribe((resp: any) => {
          console.log(resp)
          if (resp.Status== "failed") {
           this.router.navigate([`/auth/login`]);
           return false
          }else{
          return true;
          }
          }) 
      }
      else{
        this.router.navigate([ '/auth/login'])
        return false;
      }
    return true
  }
  
}
