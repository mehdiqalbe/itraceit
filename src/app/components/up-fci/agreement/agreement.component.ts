import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NavService } from 'src/app/shared/services/nav.service';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements OnInit {
  AgreementForm: FormGroup;
  token:any
  account_id:any;
  venderList:any=[];
 

  constructor(private navServices: NavService, private modalService: NgbModal, private formBuilder: FormBuilder, private router: Router, private service: CrudService, private SpinnerService: NgxSpinnerService, private datepipe: DatePipe) {
    this.AgreementForm = this.formBuilder.group({
      VenderName:new FormControl('', Validators.required),
      Agreement: this.formBuilder.array([this.gettable()]),
    });
   }
   ngOnInit(): void {
    let App = document.querySelector('.app')
    // this.navServices.collapseSidebar = this.navServices.collapseSidebar
    App?.classList.add('sidenav-toggled');

    this.token = localStorage.getItem('AccessToken')!
    console.log("Access", this.token)
    this.account_id = localStorage.getItem('AccountId')!
    this.transporterData()
  }
   gettable(): FormGroup {
    // alert(0)
    return this.formBuilder.group({
      Name: new FormControl(''),
      age: new FormControl(''),
      // customer: new FormControl(''),
      // invoiceNo: new FormControl(''),
      // invoiceDate: new FormControl(''),
      // eta: new FormControl(''),
      // upload: new FormControl(''),
      // rows: new FormGroup({
      //   invoicearray: this.formBuilder.array([this.putNewinvoice()])
      // }),


    });

  }
  getcustumerinvoice() {
    return this.AgreementForm.get('Agreement') as FormArray;
  }

 
  submitForm(value)
  {
    console.log("Submit",value)
  }
  addtable() {
    this.getcustumerinvoice().push(this.gettable());
  }
  deletetable(index) {
    this.getcustumerinvoice().removeAt(index);
  }
  sidebarToggle() {

    let App = document.querySelector('.app')
    if ((this.navServices.collapseSidebar = !this.navServices.collapseSidebar)) {
      App?.classList.remove('sidenav-toggled');
    }
    else {
      App?.classList.add('sidenav-toggled');
    }
  }
  transporterData()
  {
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    // formdataCustomer.append('GroupId', '0986');
    // formdataCustomer.append('UserType', 'master');
    // formdataCustomer.append('DataFilter', js);
    
    
    this.service.venderListS(formdataCustomer).subscribe((res: any) => {
      console.log(res);
      this.venderList=res.Filter.customer
    })
  }

}
