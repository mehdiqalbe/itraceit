import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl,Validators,FormBuilder} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NavigationStart, Router } from '@angular/router';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  public Forgetpassword:FormGroup;
  username: string='';
  sub: boolean=false;
  constructor(private authservice: AuthService, private router: Router, private formBuilder : FormBuilder) {
    this.Forgetpassword = new FormGroup({
      groupid :new FormControl('',[Validators.required]),
      userid : new FormControl('',[Validators.required]),
      // email : new FormControl('',[Validators.required])
    });
   }

  ngOnInit(): void {
  }
forget_password(){
  this.sub=true;
  // this.router.navigateByUrl('/auth/confirm');
  if(this.Forgetpassword.status=='VALID'){

    const formData = new FormData();
    formData.append('GroupId',this.Forgetpassword.controls['groupid'].value);
    formData.append('UserName',this.Forgetpassword.controls['userid'].value);
    // formData.append('AccessToken',acc);
     this.authservice.forget(formData).subscribe((resp: any) => {
        if (resp.Status === 'fail') {
          alert(resp.Message);
        } else { 

        this.router.navigateByUrl('/auth/confirm');
           localStorage.setItem('GroupId', this.Forgetpassword.controls['groupid'].value);
           localStorage.setItem('UserName', this.Forgetpassword.controls['userid'].value);
        }
        })
}else{
  
}
}
}