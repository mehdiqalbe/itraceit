import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  active:any;
  accestoken:any;
  acces_store: string='';
  date = new Date();
  sub_lg:boolean=false;
  show_html:boolean=true;
  constructor(private authservice: AuthService, private router: Router, private formBuilder : FormBuilder) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Could add more chars url:path?=;other possible
        const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
        let currentUrlPath = event.url.slice(1).split(urlDelimitators)[0];
     
      
      }
    });
   }
  //  21S86KPgcDQT746104o0Y19OH7385421
  ngOnInit(): void {
    
    // alert("oninit")
    // if( this.acces_store==''){
    this.access_token(); 
  
    this.loginForm = this.formBuilder.group({
      groupid : [""],
      userid : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required])
    });
    // this.Access();
  }
  // http://localhost:4200/auth/login/?exttkn=028796o6C7vW014LuODFhy7itAeNj521
// http://localhost:64759/auth/login ?exttkn=13FCB0050lkEw3385o14cN4ZX3y85410

  // https://test-beta.secutrak.in/up_fci/?exttkn=92M3BAuX648k6scDEofv1giPKdxWwZ11 


  // https://beta.secutrak.in/secutrak/?exttkn=028796o6C7vW014LuODFhy7itAeNj521

  // http://beta.secutrak.in/secutrak/?exttkn=90EhQW2rojs013m0A07k900827wy3150

  // http://beta.secutrak.in/secutrak/?exttkn=80EB570vkdA8L44G9f40s74Zy8e21K11
  access_token(){
    var token=this.router.url;
   var k= token.split('?exttkn='); 
   if(k[1]!==undefined){
    var acc=k[1];
    if(acc==undefined){
     }else{
    this.show_html=false;
    this.Access(acc);
  }

   }

  }     
  errorMessage = ''; // validation _error handle
  _error: { name: string, message: string } = { name: '', message: '' }; // for firbase _error handle

  clearErrorMessage() {
    this.errorMessage = '';
    this._error = { name: '', message: '' };
  }
   Access(acc:any){
    // alert("Access token")
    this.clearErrorMessage();
    const formData = new FormData();
    formData.append('AccessToken',acc);
    // if (this.validateForm(this.loginForm.controls['userid'].value, this.loginForm.controls['password'].value)) {
      this.authservice.Access(formData).subscribe((resp: any) => {
        console.log(resp)
        if (resp.Status === 'error') {
         
        } else { 
          console.log(resp)

          // localStorage.setItem('Json', '1');       
          localStorage.setItem('AccessToken',acc);
          localStorage.setItem('GroupId', resp.Data.GroupId);
          localStorage.setItem('AccountType', resp.Data.AccountType);
          // localStorage.setItem('UserName', resp.Data.UserName);
          localStorage.setItem('UserName', resp.Data.AccountName);
          localStorage.setItem('GroupType',  resp.Data.GroupType);
          localStorage.setItem('GroupTypeId',  resp.Data.GroupTypeId);
          localStorage.setItem('AccountId',  resp.Data.AccountId);
          localStorage.setItem('AccountId',  resp.Data.AccountId);
          
          if(resp.Data.AccountType=="10" )
            {
              this.router.navigate(['/ILgic/Transport']);
              localStorage.setItem('path', '/ILgic/Transport'); 
              localStorage.setItem('Title', 'Transporter Dashboard');
              localStorage.setItem('path2', '/ILgic/TransporterDashboard'); 
              localStorage.setItem('Title2', 'TMS Dashboard');
              
            }
       else  if(resp.Data.AccountType=="6"||resp.Data.AccountType=="13")
            {
              this.router.navigate(['/ILgic/ilgic']);
              localStorage.setItem('path', '/ILgic/ilgic');  
              localStorage.setItem('Title', 'ILGIC Dashboard');
              localStorage.setItem('path2', '/ILgic/cv'); 
              localStorage.setItem('Title2', 'TMS Dashboard');
            }
            else
                     {
          this.router.navigate(['/ILgic/Agent']);
          localStorage.setItem('path', '/ILgic/Agent'); 
          localStorage.setItem('Title', 'Agent Dashboard');
                     }
         
        //  this.router.navigate(['/ILgic/ilgic']);
        //  concatMap(() => from(this.router.navigateByUrl('/maps')))
        // this.router.navigateByUrl('/maps');
        // window.open('/maps/Live'); 
       
        }
        })
       
   }
 
  Submit()
  { 
    this.sub_lg=true;
    if(this.loginForm.status){
    this.clearErrorMessage();
    const formData = new FormData();
    formData.append('Json', '1');
    formData.append('GroupId', this.loginForm.controls['groupid'].value);
    formData.append('UserId', this.loginForm.controls['userid'].value);
    formData.append('Password', this.loginForm.controls['password'].value);
    // if (this.validateForm(this.loginForm.controls['userid'].value, this.loginForm.controls['password'].value)) {
      this.authservice.loginServiceHandlernew(formData)
      .subscribe((resp: any) => {

      
        console.log(resp);
        if (resp.Status === 'error') {
          
        } else { 
          //localStorage.clear();
        console.log(resp);
         this.accestoken= resp.Data.AccessToken;
          localStorage.setItem('Json', '1');       
          localStorage.setItem('AccessToken', resp.Data.AccessToken);
          localStorage.setItem('GroupId',resp.Data.GroupId);
          localStorage.setItem('AccountId',  resp.Data.AccountId);
          localStorage.setItem('AccountType', resp.Data.AccountType);
          localStorage.setItem('UserName', this.loginForm.controls['userid'].value);
          localStorage.setItem('GroupType',  resp.Data.GroupType);
          localStorage.setItem('GroupTypeId',  resp.Data.GroupTypeId);
          localStorage.setItem('UserType',  resp.Data.UserType);
          
          // this.router.navigate(['/maps']);
          
          // this.router.navigate(['/UPFCS/FCS/']);
          if(resp.Data.UserType=="10" )
            {
              this.router.navigate(['/ILgic/Transport']);
              localStorage.setItem('path', '/ILgic/Transport'); 
              localStorage.setItem('Title', 'Transporter Dashboard');
              localStorage.setItem('path2', '/ILgic/TransporterDashboard'); 
              localStorage.setItem('Title2', 'TMS Dashboard');
              
            }
       else  if(resp.Data.UserType=="6" ||resp.Data.UserType=="13")
            {
              this.router.navigate(['/ILgic/ilgic']);
              localStorage.setItem('path', '/ILgic/ilgic');  
              localStorage.setItem('Title', 'ILGIC Dashboard');
              localStorage.setItem('path2', '/ILgic/cv'); 
              localStorage.setItem('Title2', 'TMS Dashboard');
            }
            else
                     {
          this.router.navigate(['/ILgic/Agent']);
          localStorage.setItem('path', '/ILgic/Agent'); 
          localStorage.setItem('Title', 'Agent Dashboard');
                     }
         
         
        }
        
      }, err => {
        
      });
    }
  }

  validateForm(email:string, password:string) {
    if (email.length === 0) {
      this.errorMessage = "please enter user id";
      return false;
    }

    if (password.length === 0) {
      this.errorMessage = "please enter password";
      return false;
    }

    if (password.length < 6) {
      this.errorMessage = "password should be at least 6 char";
      return false;
    }

    this.errorMessage = '';
    return true;

  }

  //angular
  public loginForm! : FormGroup;
  public error:any = '';
  
  get form(){
    return this.loginForm.controls;
  }
  
  // Submit(){
  //   if (this.loginForm.controls['username'].value === "admin@demo.com" && this.loginForm.controls['password'].value === "admindemo" )
  //   {
  //     this.router.navigate(['/dashboard/sales-dashboard']);
  //   }
  //   else{
  //     this.error = "Please check email and passowrd"
  //   }
  // }

}
