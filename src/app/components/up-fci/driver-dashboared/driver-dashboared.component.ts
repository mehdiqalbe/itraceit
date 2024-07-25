import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavService } from 'src/app/shared/services/nav.service';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { DatePipe } from '@angular/common';
import { TaskService } from 'src/app/shared/services/task.service';
import { JsonPipe, KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import * as echarts from 'echarts';
declare var $: any;

@Component({
  selector: 'app-driver-dashboared',
  templateUrl: './driver-dashboared.component.html',
  styleUrls: ['./driver-dashboared.component.scss']
})
export class DriverDashboaredComponent implements OnInit,AfterViewInit {
  UserCategory:string='Transporter'
  customerList:any=''
  UserType:any=''
  driverFormTitle: string = 'Add New Driver';
  action:string='add'
  editDocs:any=''
  addDriverForm!: FormGroup;
  states:any = [];
  cities: any = []; // Replace with actual cities
  editStateId:any=''
  editCityId:any=''
  editCustomerId:any=''
  drivenVehicleTypes: string[] = ['HMV', 'LMV', 'MGV']; // Replace with actual vehicle types
  accessToken:string=''
  token: any='';
  filter:any=[]
  uploadfiledsk: any='';
  uploadfiledsk1: any='';
  uploadfiledsk2: any='';
  uploadfiledsk3: any='';
  uploadfiledsk4: any='';
  GroupId:any=''
  Category:any='driver'  
  driverId:any=''
  pendingDocument:any=0
  constructor(private fb: FormBuilder,private Task_Service: TaskService, private navServices: NavService,private modalService: NgbModal,  private router: Router, private service: CrudService,  private SpinnerService: NgxSpinnerService, private datepipe: DatePipe) { }
  documentDetails: any[] = [
    { id: 1, name: "Aadhaar Card" },
    { id: 2, name: "Pan Card" },
    { id: 3, name: "Driving License" },
    { id: 4, name: "Bank Passbook" },
    { id: 5, name: "Registration Certificate" },
    { id: 6, name: "Pollution Certificate" },
    { id: 7, name: "Vehicle Insurance" },
    { id: 8, name: "Permit" },
    { id: 9, name: "All India Permit" },
    { id: 10, name: "National Goods Permit" },
    { id: 11, name: "Road Tax" },
    { id: 12, name: "Photograph" }
  ];''
  ngOnInit(): void {
    const state =window.history.state
    
    this.UserType = localStorage.getItem('UserType')!;
    this.token = localStorage.getItem('AccessToken')
  
    
 
    if (state && state.driver) {

      this.driverFormTitle = 'Edit Driver';
      this.action='edit'

      this.driverId=state?.driver?.DriverId
      this.editDocs=state?.driver?.Documents

      this.initForm();
      this.populateForm(state.driver);
    } else {
      this.initForm();
    } 

    if(this.UserType=='13')
      {
        this.fetchTransporters()
        this.UserCategory='Corporate'
          this.addDriverForm.addControl('customer', this.fb.control(null, Validators.required));
      }

  
  }
  ngAfterViewInit() {
    this.Dateselect();
  }
  initForm(){
    this.addDriverForm = this.fb.group({
      DriverName: ['', Validators.required],
      Gender: [null, Validators.required],
      dob: ['', [Validators.required, this.dateValidator, this.ageValidator(18)]],
      Mobilenum: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      atlMobile: ['', Validators.pattern(/^[6-9]\d{9}$/)],
      Email: ['', [Validators.email]],
      State: [null, Validators.required],
      City: [null, Validators.required],
      Address: ['', Validators.required],
      PinCode: ['', Validators.required],
      DrivingSince: [null, Validators.required],
      DrivenvehicleType: [null, Validators.required],
      LicenseDocumentNumber: [''],
      Licenseissuedate: [''],
      LicenseExpiryDate: [''],
      License_file: [null],
      LicenseRemarks: [''],
      AadhaarNumber: [''],
      Aadhaarissuedate: [''],
      AadhaarExpiryDate: [''],
      Aadhaarfile: [null],
      AadhaarRemarks: [''],
      PANNumber: [''],
      PANissuedate: [''],
      PANExpiryDate: [''],
      PANfile: [null],
      PANremarks: [''],
      VoterNumber: [''],
      Voterissuedate: [''],
      VoterExpiryDate: [''],
      Voterfile: [null],
      Voterremarks: [''],
      PassportNumber: [''],
      Passportissuedate: [''],
      PassportExpiryDate: [''],
      Passportfile: [null],
      Passportremarks: ['']
    },{
      validators: [
        this.fileAndNumberValidator('License_file', 'LicenseDocumentNumber', 'Licenseissuedate', 'LicenseExpiryDate', true),
        this.fileAndNumberValidator('Aadhaarfile', 'AadhaarNumber', 'Aadhaarissuedate', 'AadhaarExpiryDate', false),
        this.fileAndNumberValidator('PANfile', 'PANNumber', 'PANissuedate', 'PANExpiryDate', false),
        this.fileAndNumberValidator('Voterfile', 'VoterNumber', 'Voterissuedate', 'VoterExpiryDate', true),
        this.fileAndNumberValidator('Passportfile', 'PassportNumber', 'Passportissuedate', 'PassportExpiryDate', true)
      ]
    
    });
    this.stateData()
  }
  driverForm(){
    const formData=new FormData()
    formData.append('AccessToken',this.token)
    console.log(this.addDriverForm.value);
   
     
        const driverDetails = {
          DriverName: this.addDriverForm.get('DriverName')?.value,
          Gender: this.addDriverForm.get('Gender')?.value,
          DOB: this.addDriverForm.get('dob')?.value,
          MobileNo: this.addDriverForm.get('Mobilenum')?.value,
          AlternateMobNo: this.addDriverForm.get('atlMobile')?.value || '',
          Email: this.addDriverForm.get('Email')?.value,
          State_id: String(this.addDriverForm.get('State')?.value?.StateID||this.editStateId),
          City_id: String(this.addDriverForm.get('City')?.value?.CityID||this.editCityId),
          Address: this.addDriverForm.get('Address')?.value,
          Pincode: this.addDriverForm.get('PinCode')?.value,
          YrsofExp: String(this.addDriverForm.get('DrivingSince')?.value),
          DrivenVehType: this.addDriverForm.get('DrivenvehicleType')?.value
        };
        if (this.UserType === '13') {
          driverDetails['TransporterId'] = String(this.addDriverForm.get('customer')?.value?.id||this.editCustomerId); // replace 'some value' with the appropriate value
        }
        formData.append('UserCategory',this.UserCategory)
        formData.append('DriverDetails',JSON.stringify(driverDetails))

        console.log(formData);
        if (this.action==='edit') {
          formData.append('DriverID',String(this.driverId))
            console.log(this.documentDetails,"edit");
            this.SpinnerService.show("qDriverFormSpinner")
            this.service.editDriver(formData).subscribe(
              response => {
                this.documentDetails=response?.DocumentDetails
                this.driverId=response?.DriverID
                this.GroupId=response?.GroupID
                if(response.status==='success')
                this.uploadDocuments(this.documentDetails)
                console.log('Driver updated successfully', response);
              },
              error => {
                console.error('Error creating driver:', error);
              }
            );
            // this.uploadDocuments(this.documentDetails)
            // console.log(this.editDocs);
            
        }
        else{
          this.service.createDriver(formData).subscribe(
            response => {
              this.documentDetails=response?.DocumentDetails
              this.driverId=response?.DriverID
              this.GroupId=response?.GroupID
              if(this.documentDetails)
              this.uploadDocuments(this.documentDetails)
              else
              alert(response.Message)
              console.log('Driver created successfully', response);
            },
            error => {
              console.error('Error creating driver:', error);
            }
          );
        }
       
        console.log(this.addDriverForm);
        
      
  }
  fetchTransporters(): void {
    this.accessToken = localStorage.getItem('AccessToken') || '';
    const formData = new FormData();
    formData.append('AccessToken', this.accessToken);

    this.service.getTransporter(formData).subscribe(
      (response) => {
        this.customerList = response;
        console.log(response);
      },
      (error) => {
        console.error('Error sending data:', error);
      }
    );
  }
  dateValidator(control: AbstractControl): ValidationErrors | null {
    const dateValue = control.value;
    if (!dateValue) {
      return null;
    }
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) {
      return { 'invalidDate': true };
    }
    return null;
  }
  
  ageValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateValue = control.value;
      if (!dateValue) {
        return null;
      }
      const dob = new Date(dateValue);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return age >= minAge ? null : { 'ageInvalid': true };
    };
  }
  fileAndNumberValidator(fileControlName: string, numberControlName: string, issueDateControlName: string, expiryDateControlName: string, expiryDateRequired: boolean): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.get(fileControlName);
      const number = control.get(numberControlName);
      const issueDate = control.get(issueDateControlName);
      const expiryDate = control.get(expiryDateControlName);
  
      if (file && file.value) {
        if (!number?.value) {
          return { fileAndNumberRequired: true };
        }
        if (!issueDate?.value) {
          return { fileAndIssueDateRequired: true };
        }
        if (expiryDateRequired && !expiryDate?.value) {
          return { fileAndExpiryDateRequired: true };
        }
      }
  
      return null;
    };
  }
  onStateChange(state,cityId=''){
    const formData=new FormData();
    formData.append("AccessToken",this.accessToken)
    formData.append('StateID',state?.StateID)
    console.log(state);
    this.cities = [];
    if(!cityId)
    {
    this.addDriverForm.get('City')?.setValue(null);
    this.addDriverForm.get('City')?.markAsTouched();
    this.addDriverForm.get('City')?.updateValueAndValidity();
    }
   
    console.log(this.addDriverForm);
    
    if(state?.StateID)
    {
      this.service.cityData(formData).subscribe(
        response => {
          this.cities=response
          console.log(response);
          
        },
        error => {
          console.error('Error sending data:', error);
        }
      ) 
    }
   
  }
  stateData(){
    const formData=new FormData();
    this.accessToken=localStorage.getItem('AccessToken')||'';
    formData.append("AccessToken",this.accessToken)
    this.service.stateData(formData).subscribe(
      response => {
         this.states=response
        console.log(response);
        
      },
      error => {
        console.error('Error sending data:', error);
      }
    )
  }
  vehicleDrivenData(){
    const formData=new FormData();
    this.accessToken=localStorage.getItem('AccessToken')||'';
    formData.append("AccessToken",this.accessToken)
    formData.append('from_date','2024-06-02')
    formData.append('end_date','2024-07-03')
    this.service.vehicleFilterData(formData).subscribe(
      res => {
       const data=res;
       console.log(data.Filters_name);
       
      },
      error => {
        console.error('Error sending data:', error);
      }
    )
  }
  submitdata(){
    var formdata: any = new FormData();
    this.service.vehicladashboared(formdata).subscribe((res:any)=>{
      // console.log(res);
    })
  }
  filterdata(){
    var formdata: any = new FormData();
    formdata.append('AccessToken',this.token )
    
    this.service.vehicladashboaredfilter(formdata).subscribe((res:any)=>{
      console.log('filter',res.Data);
      this.filter=res.Data
    })
      
    }
  // }
  sidebarToggle(){
    
    let App = document.querySelector('.app')
    // App?.classList.add('sidenav-toggled');
    if ((this.navServices.collapseSidebar = !this.navServices.collapseSidebar)) {
      App?.classList.remove('sidenav-toggled');
    }
    else {
      App?.classList.add('sidenav-toggled');
    }
  }
  addDriver(value:any){
    console.log(value)
  }
  Dateselect() {
    const self = this;
    $(document).ready(() => {
      const currentYear = new Date().getFullYear();
      $("#Date-select").datepicker({
        format: "yyyy",
        weekStart: 1,
        orientation: "bottom",
        keyboardNavigation: false,
        viewMode: "years",
        minViewMode: "years",
        endDate: new Date(currentYear, 11, 31)
      }).on('changeDate', function(e) {
        const selectedYear = e.date.getFullYear();
        self.addDriverForm.patchValue({
          DrivingSince: selectedYear
        });
      })
    });
  }
  selectFile(event, controlName) {
    const file = event?.target?.files[0];
    this.addDriverForm.patchValue({
      [controlName]: file
    });
  }

//   selectFile1(event) {
   
//     // const file = (event.target).files[0]
//     this.uploadfiledsk1 = event.target.files[0]


    


// }
//   selectFile2(event) {
    
//     // const file = (event.target).files[0]
//     this.uploadfiledsk2 = event.target.files[0]


    



// }
//   selectFile3(event) {
   
//     // const file = (event.target).files[0]
//     this.uploadfiledsk3 = event.target.files[0]
//     console.log("file",this.uploadfiledsk3)
    



// }
//   selectFile4(event) {
   
//     // const file = (event.target).files[0]
//     this.uploadfiledsk4 = event.target.files[0]
//     console.log("file",this.uploadfiledsk4)

// }
uploadDocuments(documentDetails: any): void {
  const documents = [
    {
      DocumentId: documentDetails.find(doc => doc.name === 'Driving License')?.id,
      DocId:this.editDocs?.DrivingLicense,
      DocumentName: 'Driving License',
      DocumentNo: this.addDriverForm.get('LicenseDocumentNumber')?.value,
      IssueDate: this.addDriverForm.get('Licenseissuedate')?.value,
      ExpiryDate: this.addDriverForm.get('LicenseExpiryDate')?.value,
      Remark: this.addDriverForm.get('LicenseRemarks')?.value,
      DocumentFile: this.addDriverForm.get('License_file')?.value
    },
    {
      DocumentId: documentDetails.find(doc => doc.name === 'Aadhaar Card')?.id,
      DocId:this.editDocs?.AadhaarCard,
      DocumentName: 'Aadhaar Card',
      DocumentNo: this.addDriverForm.get('AadhaarNumber')?.value,
      IssueDate: this.addDriverForm.get('Aadhaarissuedate')?.value,
      ExpiryDate: this.addDriverForm.get('AadhaarExpiryDate')?.value,
      Remark: this.addDriverForm.get('AadhaarRemarks')?.value,
      DocumentFile: this.addDriverForm.get('Aadhaarfile')?.value
    },
    {
      DocumentId: documentDetails.find(doc => doc.name === 'Pan Card')?.id,
      DocId:this.editDocs?.PanCard,
      DocumentName: 'PAN Card',
      DocumentNo: this.addDriverForm.get('PANNumber')?.value,
      IssueDate: this.addDriverForm.get('PANissuedate')?.value,
      ExpiryDate: this.addDriverForm.get('PANExpiryDate')?.value,
      Remark: this.addDriverForm.get('PANremarks')?.value,
      DocumentFile: this.addDriverForm.get('PANfile')?.value
    },
      {
        DocumentId: documentDetails.find(doc => doc.name === 'Voter ID Card')?.id,
        DocId:this.editDocs?.VoterId,
        DocumentName: 'Voter ID Card',
        DocumentNo: this.addDriverForm.get('VoterNumber')?.value,
        IssueDate: this.addDriverForm.get('Voterissuedate')?.value,
        ExpiryDate: this.addDriverForm.get('VoterExpiryDate')?.value,
        Remark: this.addDriverForm.get('Voterremarks')?.value,
        DocumentFile: this.addDriverForm.get('PANfile')?.value
      },
      {
        DocumentId: documentDetails.find(doc => doc.name === 'Passport')?.id,
        DocId:this.editDocs?.Passport,
        DocumentName: 'Passport',
        DocumentNo: this.addDriverForm.get('PassportNumber')?.value,
        IssueDate: this.addDriverForm.get('Passportissuedate')?.value,
        ExpiryDate: this.addDriverForm.get('PassportExpiryDate')?.value,
        Remark: this.addDriverForm.get('Passportremarks')?.value,
        DocumentFile: this.addDriverForm.get('PANfile')?.value
      },
      // Add other documents similarly
  
  ];
  this.pendingDocument=documents.length

  documents.forEach(doc => {
    if (doc.DocumentFile&&doc.DocumentId) {
      const formData = new FormData();
      formData.append('AccessToken', this.accessToken);
      formData.append('GroupId', this.GroupId);
      formData.append('Category', this.Category);
      formData.append('DriverId', this.driverId);
      formData.append('DocumentTypeId', doc.DocumentId);
      formData.append('DocumentTypeName', doc.DocumentName);
      formData.append('DocumentNo', doc.DocumentNo);
      formData.append('IssueDate', doc.IssueDate);
      formData.append('ExpiryDate', doc.ExpiryDate);
      formData.append('Remark', doc?.Remark||'');
      formData.append('DocumentFile', doc.DocumentFile);
     
      if (doc.DocId) {
        formData.append('DocumentId', doc?.DocId?.DocId);
        this.editDocument(formData);
        // console.log(formData,"Edit");
        
      } else {
        this.addDocument(formData);
        // console.log(formData,"new");
        
      }

    }
    else{
      this.onCompleteDocumentIndicator()
    }
  });
  
}
onCompleteDocumentIndicator = () => {
  this.pendingDocument--;
  if (this.pendingDocument=== 0) {
    // this.loading = false;
    this.SpinnerService.hide("qDriverFormSpinner")
    if(this.action=='edit')
      alert('Driver details updated successfully');
       else
       alert('Driver details added successfully');
    this.qSwitchBackTD()
  }
};
editDocument(formData: FormData) {
  this.service.uploadEditDriverDocument(formData).subscribe(
    response => {
      console.log('Document edited successfully', response);
      this.onCompleteDocumentIndicator()
    },
    error => {
      console.error('Error editing document:', error);
    }
  );
}

addDocument(formData: FormData) {
  this.service.uploadNewDriverDocument(formData).subscribe(
    response => {
      console.log('Document added successfully', response);
      this.onCompleteDocumentIndicator()
    },
    error => {
      console.error('Error adding document:', error);
    }
  );
}


populateForm(data: any) {
  if(this.UserType=='13')
    {
        this.addDriverForm.addControl('customer', this.fb.control(null, Validators.required));
        this.editCustomerId=data?.Customer?.Id
        this.addDriverForm.patchValue({
          customer:data?.Customer?.Name
        })
    }
  const state={StateID:data?.StateID,StateName:data?.StateName}
  const city={CityID:data?.CityID,CityName:data?.CityName}
  
  this.editCityId=city?.CityID;
  this.editStateId=state?.StateID
  
  this.addDriverForm.patchValue({
    DriverName: data?.Name,
    Gender: data?.Gender,
    dob: data?.BirthDate,
    Mobilenum: data?.MobileNo,
    atlMobile: data?.AlternateMobNo,
    Email: data?.Email,
    State: data?.StateName,
    City: data?.CityName,
    Address: data?.Address,
    PinCode: data?.Pincode,
    DrivingSince: data?.DrivingSinceYrs,
    DrivenvehicleType: data?.VehicleDutyTypeList,
    LicenseDocumentNumber: data?.Documents?.DrivingLicense?.Number,
    Licenseissuedate: data?.Documents?.DrivingLicense?.IssueDate,
    LicenseExpiryDate: data?.Documents?.DrivingLicense?.ExpiryDate,
    License_file: data?.Documents?.DrivingLicense?.Path,
    LicenseRemarks: data?.Documents?.DrivingLicense?.Remark,
    AadhaarNumber: data?.Documents?.AadhaarCard?.Number,
    Aadhaarissuedate: data?.Documents?.AadhaarCard?.IssueDate,
    AadhaarExpiryDate: data?.Documents?.AadhaarCard?.ExpiryDate,
    Aadhaarfile: data?.Documents?.AadhaarCard?.Path,
    AadhaarRemarks: data?.Documents?.AadhaarCard?.Remark,
    PANNumber: data?.Documents?.PanCard?.Number,
    PANissuedate: data?.Documents?.PanCard?.IssueDate,
    PANExpiryDate: data?.Documents?.PanCard?.ExpiryDate,
    PANfile: data?.Documents?.PanCard?.Path,
    PANremarks: data?.Documents?.PanCard?.Remark
  });
  // if (this.UserType === '13') {
  //   this.addDriverForm.patchValue({
  //     customer:data?.Customer?.Name
  //   })
  //   console.log(this.addDriverForm.value,"populated Value");
    
  // }
  console.log(this.editCustomerId,"customerId");
  
  this.onStateChange(state,city.CityID)
  console.log(city);
  
}

qSwitchBackTD(){
  if(this.UserType=='13'||this.UserType=='6')
    this.router.navigate(['/ILgic/cv']);
  else
  this.router.navigate(['/ILgic/TransporterDashboard']);
  
}
}

