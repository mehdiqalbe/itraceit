import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl,Validators,FormBuilder} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NavigationStart, Router } from '@angular/router';
@Component({
  selector: 'app-confirm-otp',
  templateUrl: './confirm-otp.component.html',
  styleUrls: ['./confirm-otp.component.scss']
})
export class ConfirmOTPComponent implements OnInit {
  Confirm: FormGroup;
  showPassword:boolean=false;
  showPassword1:boolean=false;
  sub:boolean=false;
  constructor(private authservice: AuthService, private router: Router, private formBuilder : FormBuilder) {
    this.Confirm = this.formBuilder.group({
      OTP :new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required]),
      Repeat : new FormControl('',[Validators.required])
    });
   }

  ngOnInit(): void {
  }
  repeatrpassword(){
    this.showPassword1=!this.showPassword1;
  }
  eye(){
 this.showPassword=!this.showPassword;
  }
  forget_password(){
    // this.router.navigateByUrl('/auth/confirm');
    this.sub=true;
    if(this.Confirm.status=='VALID'){
      const formData = new FormData();
      formData.append('GroupId',localStorage.getItem('GroupId')!);
      formData.append('UserName',localStorage.getItem('UserName')!);
      formData.append('OTP',this.Confirm.controls['OTP'].value);
      formData.append('NewPwd',this.Confirm.controls['password'].value);
      formData.append('CnfPwd',this.Confirm.controls['Repeat'].value);
      // formData.append('AccessToken',acc);
       this.authservice.verifyOTP(formData).subscribe((resp: any) => {
          if (resp.Status === 'fail') {
            alert(resp.Message);
          } else { 
          alert(resp.Message);
          // this.router.navigateByUrl('//');
          this.router.navigate(['/auth/login']);
          this.sub=false;
          }
          })
        }
  }
}
