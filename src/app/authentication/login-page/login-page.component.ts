import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router,ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';


import { AuthService } from 'src/app/shared/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  showPassword: boolean = false;
  active:any;
  accestoken:any;
  acces_store: string='';
  date = new Date();
  sub_lg:boolean=false;
  show_html:boolean=true;
  transporterAccessData:any=[]
  path: any;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private authservice: AuthService, private router: Router, private formBuilder : FormBuilder, private route:ActivatedRoute) {
   
   
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
   alert(0)
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




  // transporterAccess()
  // {
  //   const formData = new FormData();
  //   console.log("accesstoken for access",localStorage.getItem('AccessToken')!)
  //   formData.append('AccessToken', localStorage.getItem('AccessToken')!);
   
  //     this.authservice.transpermissionS(formData).subscribe((resp: any) => {
  //       console.log("transporteraccess",resp)
  //       this.transporterAccessData = resp.Data[0]
  //       console.log("transporteraccess1",this.transporterAccessData)
  //     })
  // }
  // http://localhost:4200/auth/login/?exttkn=32h87N31SoA1yP8vwiT6zF70eHOg8401
// http://localhost:64759/auth/login ?exttkn=13FCB0050lkEw3385o14cN4ZX3y85410


  // https://test-beta.secutrak.in/up_fci/?exttkn=92M3BAuX648k6scDEofv1giPKdxWwZ11




  // https://beta.secutrak.in/secutrak/?exttkn=028796o6C7vW014LuODFhy7itAeNj521


  // http://beta.secutrak.in/secutrak/?exttkn=90EhQW2rojs013m0A07k900827wy3150


  // http://beta.secutrak.in/secutrak/?exttkn=80EB570vkdA8L44G9f40s74Zy8e21K11




  access_token(){
    var token=this.router.url;
  //  var k= token.split('?exttkn=');
  console.log("Qalbe");
 
  var k= token?.split('?exttkn=')[1]?.split('&forGroup=')[0];
  // this.path= this.router.url?.split('$')[1]||'';
  this.path=decodeURIComponent( this.router.url?.split('$')[1]||'');
  console.log("pathk",k)
   if(k!==undefined){
    var acc=k;
    if(acc==undefined){
     }else{
    this.show_html=false;
    // alert(acc)
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
   
    var url=this.router.url;
    var k= url.split('=');
    localStorage.setItem('URL',k[0]);
    // console.log("Submit",url);
    // this.transporterAccess()
    // alert("Access token")
    this.clearErrorMessage();
    const formData = new FormData();
    formData.append('AccessToken',acc);
    // if (this.validateForm(this.loginForm.controls['userid'].value, this.loginForm.controls['password'].value)) {
      this.authservice.Access(formData).subscribe((resp: any) => {
        console.log(resp)
        if (resp.Status === 'fail') {
         alert(resp.Message);
         this.router.navigate([`/auth/login`]);
        } else {
          // console.log(resp)
          const formDataspecific = new FormData();
          formDataspecific.append('AccessToken', resp.Data.AccessToken);
          this.authservice.loginSpecificUser(formDataspecific)
          .subscribe((res: any) => {
            //  console.log("specific",res)


             
             if(res?.specific_permission?.irun_alert_dashboard=='1'){
            //  localStorage.setItem('IrunDashboard',resp?.specific_permission?.irun_alert_dashboard)
            // console.log("local storage set");
           
            localStorage.setItem('path6', `/ILgic/Irun`);
              localStorage.setItem('Title6', 'IRUN Dashboard');
             }else{
              //  localStorage.setItem('IrunDashboard',resp?.specific_permission?.irun_alert_dashboard)
              // console.log("local storage set");
             
              localStorage.setItem('path6', `/ILgic/generic/Irun`);
                localStorage.setItem('Title6', 'IRUN Dashboard');
               }
          })
          // localStorage.setItem('Json', '1');      
          localStorage.setItem('AccessToken',acc);
          localStorage.setItem('GroupId', resp.Data.GroupId);
          localStorage.setItem('AccountType', resp.Data.AccountType);
          // localStorage.setItem('UserName', resp.Data.UserName);
          localStorage.setItem('UserName', resp.Data.AccountName);
          localStorage.setItem('GroupType',  resp.Data.GroupType);
          localStorage.setItem('GroupTypeId',  resp.Data.GroupTypeId);
          localStorage.setItem('AccountId',  resp.Data.AccountId);
          localStorage.setItem('FullImage',resp.Data.FullImage);
          localStorage.setItem('ThumbImage',resp.ThumbImage);
          localStorage.setItem('AccountId',  resp.Data.AccountId);
          localStorage.setItem('UserType',  resp.Data.AccountType);
          localStorage.setItem('specific_permission',resp.specific_permission);
          localStorage.setItem('Class',resp.Data.Class);
          localStorage.setItem('AccessMenu', JSON.stringify(resp.AccessMenu));
          localStorage.setItem('ActivePage', JSON.stringify(resp.ActivePage));
          
              console.log(this.path)
             
          this.router.navigate([`/cv/${resp.Data.Class}/${this.path}`]);
     
        }
        })
       
   }
 
  Submit()
  {
    // $('#loginModal').modal('hide'); 
    localStorage.clear()


    const domain = window.location.origin;
    console.log("this.router.url",domain)
    const fullUrl = this.router.url ;
 
    localStorage.setItem('URL', fullUrl);
    localStorage.setItem('Domain', domain);
   
    // console.log("Submit1", this.router);
    // console.log("Full URL:", fullUrl);
    // var k= token.split('?exttkn=');
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
        if (resp.Status !== 'success') {
          alert(resp?.Message)
        } else {
        // console.log(resp);
         this.accestoken= resp.Data.AccessToken;
          localStorage.setItem('Json', '1');      
          localStorage.setItem('AccessToken', resp.Data.AccessToken);
          localStorage.setItem('GroupId',resp.Data.GroupId);
          localStorage.setItem('AccountId',  resp.Data.AccountId);
          localStorage.setItem('AccountType', resp.Data.AccountType);
          localStorage.setItem('UserName', this.loginForm.controls['userid'].value);
          localStorage.setItem('loginUser',resp.Data.AccountName)
          localStorage.setItem('GroupType',  resp.Data.GroupType);
          localStorage.setItem('GroupTypeId',  resp.Data.GroupTypeId);
          localStorage.setItem('UserType',  resp.Data.UserType);
          localStorage.setItem('FullImage',resp.Data.FullImage);
          localStorage.setItem('ThumbImage',resp.ThumbImage);
          localStorage.setItem('specific_permission',resp.specific_permission);
          localStorage.setItem('Class',resp.Data.Class);
          localStorage.setItem('AccessMenu', JSON.stringify(resp.AccessMenu));
          // localStorage.setItem('ActivePage', JSON.stringify(resp?.AccessMenu.ActivePage));
          
           
              // var full_menu =localStorage.getItem('AccessMenu')!;
              // console.log("full_menu",(JSON.parse(localStorage.getItem('AccessMenu')||'')).ActivePage[0].name,(JSON.parse(localStorage.getItem('AccessMenu')||'')).ActivePage);
          // Check if specific_permission have values ---
         
        
          this.router.navigate([`/cv/${resp.Data.Class}`]);
        
      //     if(resp.specific_permission){
      //       // Check if specific_trip have values 1 ---
      //       if(resp.specific_permission.specific_trip==1){


      //         if(resp.specific_permission?.irun_alert_dashboard==1){
      //           localStorage.setItem('path6', `/ILgic/Irun`);
      //           localStorage.setItem('Title6', 'IRUN Dashboard');
      //           }
      //       else{
      //         localStorage.setItem('path6', '');
      //           localStorage.setItem('Title6', '');
      //          }


               
      //         // For Delay Dashboard-----------------------------------




      //       //    if(resp.specific_permission?.delay_dashboard==1){
      //       //     localStorage.setItem('path7', `/ILgic/Delay/Dashboard`);
      //       //     localStorage.setItem('Title7', 'Delay Dashboard');
      //       //     }
      //       // else{
      //       //   localStorage.setItem('path7', '');
      //       //     localStorage.setItem('Title7', '');
      //       //    }


      //             // For Trip dashboard ---------------------------
      //          if(resp.specific_permission?.schedule_dashboard==1){
      //           localStorage.setItem('path4', '/ILgic/Trip-Dashboard');
      //           localStorage.setItem('Title4', 'Trip Dashboard');
      //           }
      //       else{
      //         localStorage.setItem('path4', '');
      //           localStorage.setItem('Title4', '');
      //          }










      //       }else{
           
      //     if(resp.specific_permission?.irun_alert_dashboard==1){
           
      //         localStorage.setItem('path6', `/ILgic/generic/Irun`);
      //         localStorage.setItem('Title6', 'IRUN Dashboard');
      //     }
      //     else{
      //       localStorage.setItem('path6', '');
      //         localStorage.setItem('Title6', '');
      //        }
      //     // For schedule dashboard ---------------------------
      //        if(resp.specific_permission?.schedule_dashboard==1){
      //         localStorage.setItem('path4', '/ILgic/Generic/TripDashboard');
      //         localStorage.setItem('Title4', 'Trip Dashboard');
      //         }
      //     else{
      //       localStorage.setItem('path4', '');
      //         localStorage.setItem('Title4', '');
      //        }  
         
         
      //     // For Delay Dashboard---------------------------
      //   //   if(resp.specific_permission?.delay_dashboard==1){
      //   //     localStorage.setItem('path7', `/ILgic/generic/Delay/Dashboard`);
      //   //     localStorage.setItem('Title7', 'Delay Dashboard');
      //   //     }
      //   // else{
      //   //   localStorage.setItem('path7', '');
      //   //     localStorage.setItem('Title7', '');
      //   //    }


      //       }
      //       }else{
      //       //  Need to Blank all only show Trip Dashboard -----------------------
      //       localStorage.setItem('path6', '');
      //       localStorage.setItem('Title6', '');
      //       localStorage.setItem('path4', '/ILgic/Generic/TripDashboard');
      //       localStorage.setItem('Title4', 'Trip Dashboard');
           
      //        }
      //     // this.router.navigate(['/maps']);
         
      //     // this.router.navigate(['/UPFCS/FCS/']);
      //     if(resp.Data.UserType=="10" )
      //       {
      //         // this.transporterAccess()
             
      //         // console.log("transporter",this.transporterAccessData)
             
      //         // this.router.navigate(['/ILgic/Transport']);
      //         // localStorage.setItem('path', '/ILgic/Transport');
      //         // localStorage.setItem('Title', 'Transporter Dashboard');
      //         // console.log("transporter",this.transporterAccessData)
      //         // if(this.transporterAccessData.document_wallet==1)
      //         // {
      //         //   localStorage.setItem('path3', '/ILgic/wallet');
      //         // localStorage.setItem('Title3', 'Document Wallet');
      //         // }
      //         // else
      //         // {
      //         //   localStorage.setItem('path3', '');
      //         //   localStorage.setItem('Title3', '');
      //         // }
      //         // if(this.transporterAccessData.tms_dashboard==1)
      //         //   {
      //         //     localStorage.setItem('path2', '/ILgic/TransporterDashboard');
      //         // localStorage.setItem('Title2', 'TMS Dashboard');
      //         //   }
      //         //   else
      //         //   {
      //         //     localStorage.setItem('path2', '');
      //         //     localStorage.setItem('Title2', '');
      //         //   }
      //         //   if(this.transporterAccessData.trip_dashboard==1)
      //         //     {
      //               // localStorage.setItem('path4', '/ILgic/Trip');
      //               // localStorage.setItem('Title4', 'Trip Dashboardt');
      //         //     }
      //         //     else
      //         //     {
      //         //       localStorage.setItem('path4', '');
      //         //       localStorage.setItem('Title4', '');
      //         //     }
           
      //         this.router.navigate(['/ILgic/Transport']);
      //         localStorage.setItem('path', '/ILgic/Transport');
      //         localStorage.setItem('Title', 'Transporter Dashboard');
      //         localStorage.setItem('path2', '/ILgic/TransporterDashboard');
      //         localStorage.setItem('Title2', 'TMS Dashboard');
      //         localStorage.setItem('path3', '/ILgic/wallet');
      //         localStorage.setItem('Title3', 'Document Wallet');
      //         // localStorage.setItem('path4', '/ILgic/Trip');
      //         // localStorage.setItem('Title4', 'Trip Dashboard');
      //         localStorage.setItem('path5', 'https://itraceit.in/reports/transporter_fleet_performance_report/?exttkn='+localStorage.getItem('AccessToken')!);
      //         localStorage.setItem('Title5', 'Fleet Performance');
             
      //       }
      //  else  if(resp.Data.UserType=="6")
      //       {
             
      //         if(resp.Data.GroupTypeId=='7'||resp.Data.GroupTypeId=='20')
      //         {
      //           this.router.navigate(['/ILgic/wallet'])
      //           // localStorage.setItem('path', '/ILgic/wallet');  
      //           // localStorage.setItem('Title', 'Doc wallet');
      //         }
      //         else
      //         {
      //           this.router.navigate(['/ILgic/ilgic']);
      //           localStorage.setItem('path', '/ILgic/ilgic');  
      //           localStorage.setItem('Title', 'Consolidated Dashboard');
      //         }


         
      //           localStorage.setItem('path2', '/ILgic/cv');
      //           localStorage.setItem('Title2', 'TMS Dashboard');
      //           localStorage.setItem('path3', '/ILgic/wallet');
      //           localStorage.setItem('Title3', 'Document Wallet')
      //           // localStorage.setItem('path4', '/ILgic/Trip');
      //           // localStorage.setItem('Title4', 'Trip Dashboard');
      //           localStorage.setItem('path5', 'https://itraceit.in/reports/transporter_fleet_performance_report/?exttkn='+localStorage.getItem('AccessToken')!);
      //           localStorage.setItem('Title5', 'Fleet Performance');
             
           
      //       }
      //       else if(resp.Data.UserType=="24")
      //                {
      //                 this.router.navigate(['/ILgic/Agent']);
      //                 localStorage.setItem('path', '/ILgic/Agent');
      //                 localStorage.setItem('Title', 'Agent Dashboard');
      //                 localStorage.setItem('path3', '/ILgic/wallet');
      //                     localStorage.setItem('Title3', 'Document Wallet');
      //                     localStorage.setItem('path4', '');
      //         localStorage.setItem('Title4', '');
      //                     localStorage.setItem('path2', '');
      //         localStorage.setItem('Title2', '');
      //                }
      //                else
      //                {
      //     this.router.navigate(['/ILgic/cv']);
      //     localStorage.setItem('path2', '/ILgic/cv');
      //     localStorage.setItem('Title2', 'TMS Dashboard');
      //     // localStorage.setItem('path4', '/ILgic/Trip');
      //     //     localStorage.setItem('Title4', 'Trip Dashboard');
      //     localStorage.setItem('path', '');
      //         localStorage.setItem('Title', '');
      //                }
         
         
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

