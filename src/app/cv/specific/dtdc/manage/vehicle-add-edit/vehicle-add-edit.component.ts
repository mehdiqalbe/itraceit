import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavService } from 'src/app/shared/services/nav.service';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { DatePipe } from '@angular/common';
import { TaskService } from 'src/app/shared/services/task.service';
import { JsonPipe, KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import * as echarts from 'echarts';
declare var $: any;
@Component({
  selector: 'app-vehicle-add-edit',
  templateUrl: './vehicle-add-edit.component.html',
  styleUrls: ['./vehicle-add-edit.component.scss']
})
export class VehicleAddEditComponent implements OnInit {
  customerList:any=[]
  UserType:any=''
  editDocs: any=[];
  vehicleForm!: FormGroup;
  category: any = 'vehicle';
  VehicleId: any = '';
  GroupId: any = '5674';
  vehicleFormTitle = 'Add New Vehicle';
  action = 'add';
  token: any = '';
  filter: any = {};
  populateFilter: any = {};
  editFilter: any = '';
  pendingDocument: any = 0;
  documentDetails: { [key: number]: string } = {
    5: 'Registration Certificate',
    6: 'Pollution Certificate',
    7: 'Vehicle Insurance',
    8: 'Permit',
    9: 'All India Permit',
    10: 'National Goods Permit',
    11: 'Road Tax',
    13: 'Fitness Certificate',
  };
  selectedFiles: { [key: string]: File } = {};
  // Object/: any;

  constructor(
    private fb: FormBuilder,
    private Task_Service: TaskService,
    private navServices: NavService,
    private modalService: NgbModal,
    private router: Router,
    private service: CrudService,
    private SpinnerService: NgxSpinnerService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    const state = window.history.state;
    this.UserType = localStorage.getItem('UserType')!;

    this.token = localStorage.getItem('AccessToken')!;
    
    if (state && state.vehicle) {
      console.log(state);
      
      this.vehicleFormTitle = 'Edit Vehicle Details';
      this.action = 'edit';
      this.VehicleId = state?.vehicle?.vehicle?.id;
      this.editDocs = state?.vehicle?.document||[];
      
      
      this.populateFilter = state.filters;
      this.filter=state.filters
     console.log("populate Filter");
     
      this.initForm();
      this.addDynamicControls()
      this.populateForm(state.vehicle);
    } else {
      this.filterdata();
      this.initForm();
    }
  
    
    if(this.UserType=='13')
      {
        this.fetchTransporters()
          this.vehicleForm.addControl('customer', this.fb.control(null, Validators.required));
      }
  }
  initForm() {
    this.vehicleForm = this.fb.group(
      {
        Category: [null, Validators.required],
        Make: [null, Validators.required],
        Model: [null, Validators.required],
        VehicleNumber: ['', Validators.required],
        VehicleType: [null, Validators.required],
        vehicleSize:[null,Validators.required],
        Registration: ['', Validators.required],
        RegistrationDate: ['', Validators.required],
        VehicleCapacity: [null, Validators.required],
        FuelType: [null, Validators.required],
        OverSpeed: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],

        RegistrationDocumentNumber: [''],
        RegistrationIssueDate: [''],
        RegistrationExpiryDate: [''],
        RegistrationRemarks: [''],
        Registrationfile: [null],

        PollutionDocumentNumber: [''],
        PollutionIssueDate: [''],
        PollutionExpiryDate: [''],
        PollutionRemarks: [''],
        Pollutionfile: [null],

        PermitDocumentNumber: [''],
        PermitIssueDate: [''],
        PermitExpiryDate: [''],
        PermitRemarks: [''],
        Permitfile: [null],

        InsuranceDocumentNumber: [''],
        InsuranceIssueDate: [''],
        InsuranceExpiryDate: [''],
        InsuranceRemarks: [''],
        Insurancefile: [null],

        FitnessDocumentNumber: [''],
        FitnessIssueDate: [''],
        FitnessExpiryDate: [''],
        FitnessRemarks: [''],
        Fitnessfile: [null],

        // GPS: [false],
        // Fixed_Door: [false],
        // Refrigerated: [false],
        // Fire_Extinguisher: [false],
      },
      {
        validators: [
          this.fileRequiredValidator('Registrationfile', [
            'RegistrationDocumentNumber',
            'RegistrationIssueDate',
            'RegistrationExpiryDate',
          ]),
          this.fileRequiredValidator('Pollutionfile', [
            'PollutionDocumentNumber',
            'PollutionIssueDate',
            'PollutionExpiryDate',
          ]),
          this.fileRequiredValidator('Permitfile', [
            'PermitDocumentNumber',
            'PermitIssueDate',
            'PermitExpiryDate',
          ]),
          this.fileRequiredValidator('Insurancefile', [
            'InsuranceDocumentNumber',
            'InsuranceIssueDate',
            'InsuranceExpiryDate',
          ]),
          this.fileRequiredValidator('Fitnessfile', [
            'FitnessDocumentNumber',
            'FitnessIssueDate',
            'FitnessExpiryDate',
          ]),
        ],
      }
    );

  }

  fileRequiredValidator(
    fileControlName: string,
    relatedControls: string[]
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fileControl = control.get(fileControlName);
      const hasFile = fileControl && fileControl.value;

      if (hasFile) {
        const errors = relatedControls.reduce((acc, controlName) => {
          const relatedControl = control.get(controlName);
          if (!relatedControl || !relatedControl.value) {
            acc[controlName] = true;
          }
          return acc;
        }, {});

        return Object.keys(errors).length ? { fileRequired: errors } : null;
      }

      return null;
    };
  }
  getFormControlName(value: any): string {
    return value as string;
  }
  addDynamicControls() {
    Object.keys(this.populateFilter?.vehicle_feature).forEach(key => {
       console.log(key,"---",this.populateFilter?.vehicle_feature[key]);
       
      this.vehicleForm.addControl(this.populateFilter?.vehicle_feature[key], new FormControl(false));
    });
    console.log(this.vehicleForm);
    
  }
  hasVehicleFeatures(): boolean {
    return this.populateFilter?.vehicle_feature && Object.keys(this.populateFilter.vehicle_feature).length > 0;
  }
  submitdata() {
    var formdata: any = new FormData();
    formdata.append('vehicle_data', this.token);

    this.service.vehicladashboared(formdata).subscribe((res: any) => {
      // console.log(res);
    });
  }
  filterdata() {
    var formdata: any = new FormData();
    formdata.append('AccessToken', this.token);

    this.service.vehicladashboaredfilter(formdata).subscribe((res: any) => {
      console.log('vehicle filter popup', res);
      this.documentDetails = res.Data.vehicle_document_type;
      this.filter = res.Data;
      this.populateFilter=res.Data
      this.addDynamicControls();
    }); 
  }
  // }
  sidebarToggle() {
    let App = document.querySelector('.app');
    // App?.classList.add('sidenav-toggled');
    if (
      (this.navServices.collapseSidebar = !this.navServices.collapseSidebar)
    ) {
      App?.classList.remove('sidenav-toggled');
    } else {
      App?.classList.add('sidenav-toggled');
    }
  }
  fetchTransporters(): void {
    this.token = localStorage.getItem('AccessToken') || '';
    const formData = new FormData();
    formData.append('AccessToken', this.token);

    this.service.getTransporter(formData).subscribe(
      (response) => {
        this.customerList = response;
        console.log(response,"vehicle customer list");
      },
      (error) => {
        console.error('Error sending data:', error);
      }
    );
  }
  onSubmitVehicle() {
    console.log(this.vehicleForm,"add vehicle form raw data");
    const formData = new FormData();
    const vehicle_feature={}
    formData.append('AccessToken', this.token);
    Object.entries(this.populateFilter?.vehicle_feature).forEach(([key, value]) => {
      console.log(`Key: ${key}, Value: ${value} form: ${this.vehicleForm.get(value as string)?.value}`);
      vehicle_feature[key]=this.vehicleForm.get(value as string)?.value?1:0
    });
    const vehicleData = {
      id: this.VehicleId,
      category:
        this.vehicleForm.get('Category')?.value?.key ||
        this.editFilter?.Category,
      make: this.vehicleForm.get('Make')?.value?.key || this.editFilter?.Make,
      vehicle_size:this.vehicleForm.get('vehicleSize')?.value?.key ||this.editFilter?.vehicleSize,
      model:
        this.vehicleForm.get('Model')?.value?.key || this.editFilter?.Model,
      vehicle_no: this.vehicleForm.get('VehicleNumber')?.value,
      vehicle_feature:vehicle_feature,
      vehicle_type:
        this.vehicleForm.get('VehicleType')?.value?.key ||
        this.editFilter?.VehicleType,
      registration_no: this.vehicleForm.get('Registration')?.value,
      registeration_date: this.vehicleForm.get('RegistrationDate')?.value,
      vehicle_capacity:
        this.vehicleForm.get('VehicleCapacity')?.value?.key ||
        this.editFilter?.VehicleCapacity,
      fuel_type:
        this.vehicleForm.get('FuelType')?.value?.key ||
        this.editFilter?.FuelType,
      over_speed_limit: this.vehicleForm.get('OverSpeed')?.value,
      gps: this.vehicleForm.get('GPS')?.value ? 1 : 0,
      fixed_door_e_lock: this.vehicleForm.get('Fixed_Door')?.value ? 1 : 0,
      refrigerated_vehicle: this.vehicleForm.get('Refrigerated')?.value ? 1 : 0,
      fire_extinguisher: this.vehicleForm.get('Fire_Extinguisher')?.value ? 1 : 0,
    };
    if(this.UserType=='13')
      {
        vehicleData['customer_id']=this.vehicleForm.get('customer')?.value?.id||this.editFilter?.customer
        console.log(this.vehicleForm.get('customer')?.value,"----",this.editFilter?.customer);
        
      }
    formData.append('vehicle_data', JSON.stringify(vehicleData));
    console.log(formData,"vehicle form data");
   
    if (this.action === 'edit') {
      console.log(this.documentDetails, 'edit');
      this.SpinnerService.show('qDriverFormSpinner');
      this.service.qEditVehicle(formData).subscribe(
        (response) => {
          // this.documentDetails=response?.DocumentDetails
          this.GroupId = response?.group_id;
          console.log(response,"edit vehicle res");

          if (response.Status === 'Success') {
            this.uploadDocuments(this.vehicleForm.value);
            console.log('Driver updated successfully', response);
          } else {
            this.SpinnerService.hide('qDriverFormSpinner');
            alert(response?.Message);
          }
        },
        (error) => {
          console.error('Error creating driver:', error);
        }
      );
    } else {
      this.SpinnerService.show('qDriverFormSpinner');
      this.service.addVehicle(formData).subscribe(
        (response) => {
          console.log('add vehicle resp', response);
          this.GroupId = response?.group_id;
          this.VehicleId = response?.Vehicle_id;
          if (response.Status !== 'Failed')
            this.uploadDocuments(this.vehicleForm.value);
          else {
            this.SpinnerService.hide('qDriverFormSpinner');
            alert(response.Message);
          }
        },
        (error) => {
          console.error('Error adding vehicle', error);
        }
      );
    }
  
  }


  selectFile(event: any, documentType: string) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFiles[documentType] = file;
    }
  }
  /////////////////////////////////////////////////

  uploadDocuments(vehicleForm): void {
   this.editDocs=Array.isArray(this.editDocs)?this.editDocs:[];
    
    const documents = [
      {
        DocumentTypeId: '5',
        DocId: this.editDocs?.find((doc) => doc.doc_type_id === 5)?.id,
        DocumentTypeName: 'Registration Certificate',
        DocumentNo: vehicleForm.RegistrationDocumentNumber,
        IssueDate: vehicleForm.RegistrationIssueDate,
        ExpiryDate: vehicleForm.RegistrationExpiryDate,
        Remark: vehicleForm.RegistrationRemarks,
        DocumentFile: this.selectedFiles['Registrationfile'],
      },
      {
        DocumentTypeId: '6',
        DocId: this.editDocs?.find((doc) => doc.doc_type_id === 6)?.id,
        DocumentTypeName: 'Pollution Certificate',
        DocumentNo: vehicleForm.PollutionDocumentNumber,
        IssueDate: vehicleForm.PollutionIssueDate,
        ExpiryDate: vehicleForm.PollutionExpiryDate,
        Remark: vehicleForm.PollutionRemarks,
        DocumentFile: this.selectedFiles['Pollutionfile'],
      },
      {
        DocumentTypeId: '8',
        DocId: this.editDocs?.find((doc) => doc.doc_type_id === 8)?.id,
        DocumentTypeName: 'Permit',
        DocumentNo: vehicleForm.PermitDocumentNumber,
        IssueDate: vehicleForm.PermitIssueDate,
        ExpiryDate: vehicleForm.PermitExpiryDate,
        Remark: vehicleForm.PermitRemarks,
        DocumentFile: this.selectedFiles['Permitfile'],
      },
      {
        DocumentTypeId: '7',
        DocId: this.editDocs?.find((doc) => doc.doc_type_id === 7)?.id,
        DocumentTypeName: 'Insurance Certificate',
        DocumentNo: vehicleForm.InsuranceDocumentNumber,
        IssueDate: vehicleForm.InsuranceIssueDate,
        ExpiryDate: vehicleForm.InsuranceExpiryDate,
        Remark: vehicleForm.InsuranceRemarks,
        DocumentFile: this.selectedFiles['Insurancefile'],
      },
      {
        DocumentTypeId: '9',
        DocId: this.editDocs?.find((doc) => doc.doc_type_id === 9)?.id,
        DocumentTypeName: 'All India Permit',
        DocumentNo: vehicleForm.AllIndiaPermitDocumentNumber,
        IssueDate: vehicleForm.AllIndiaPermitIssueDate,
        ExpiryDate: vehicleForm.AllIndiaPermitExpiryDate,
        Remark: vehicleForm.AllIndiaPermitRemarks,
        DocumentFile: this.selectedFiles['AllIndiaPermitfile'],
      },
      {
        DocumentTypeId: '10',
        DocId: this.editDocs?.find((doc) => doc.doc_type_id === 10)?.id,
        DocumentTypeName: 'National Goods Permit',
        DocumentNo: vehicleForm.NationalGoodsPermitDocumentNumber,
        IssueDate: vehicleForm.NationalGoodsPermitIssueDate,
        ExpiryDate: vehicleForm.NationalGoodsPermitExpiryDate,
        Remark: vehicleForm.NationalGoodsPermitRemarks,
        DocumentFile: this.selectedFiles['NationalGoodsPermitfile'],
      },
      {
        DocumentTypeId: '11',
        DocId: this.editDocs?.find((doc) => doc.doc_type_id === 11)?.id,
        DocumentTypeName: 'Road Tax',
        DocumentNo: vehicleForm.RoadTaxDocumentNumber,
        IssueDate: vehicleForm.RoadTaxIssueDate,
        ExpiryDate: vehicleForm.RoadTaxExpiryDate,
        Remark: vehicleForm.RoadTaxRemarks,
        DocumentFile: this.selectedFiles['RoadTaxfile'],
      },
      {
        DocumentTypeId: '13',
        DocId: this.editDocs?.find((doc) => doc.doc_type_id === 13)?.id,
        DocumentTypeName: 'Fitness Certificate',
        DocumentNo: vehicleForm.FitnessDocumentNumber,
        IssueDate: vehicleForm.FitnessIssueDate,
        ExpiryDate: vehicleForm.FitnessExpiryDate,
        Remark: vehicleForm.FitnessRemarks,
        DocumentFile: this.selectedFiles['Fitnessfile'],
      },
      // Add other documents similarly if needed
    ];
    this.pendingDocument = documents.length;
    documents.forEach((doc) => {
      if (doc.DocumentFile) {
        const formData = new FormData();
        formData.append('AccessToken', this.token);
        formData.append('GroupId', this.GroupId);
        formData.append('Category', this.category);
        formData.append('VehicleId', this.VehicleId);
        formData.append('DocumentTypeId', doc.DocumentTypeId);
        formData.append('DocumentTypeName', doc.DocumentTypeName);
        formData.append('DocumentNo', doc.DocumentNo);
        formData.append('IssueDate', doc.IssueDate);
        formData.append('ExpiryDate', doc.ExpiryDate);
        formData.append('Remark', doc.Remark);
        formData.append('DocumentFile', doc.DocumentFile);

  
        if (doc.DocId) {
          formData.append('DocumentId', doc?.DocId);
          this.editDocument(formData);
          // console.log(formData,"Edit");
        } else {
          this.addDocument(formData);
          // console.log(formData,"new");
        }
      } else this.onCompleteDocumentIndicator();
    });

    // Reset form and selected files after submission
    // vehicleForm.resetForm();
    // this.selectedFiles.clear();
  }
  addDocument(formData: FormData) {
    this.service.uploadNewDriverDocument(formData).subscribe(
      (response) => {
        console.log('Document added successfully', response);
        this.onCompleteDocumentIndicator();
      },
      (error) => {
        console.error('Error adding document:', error);
      }
    );
    console.log(formData, 'Add Docs');
  }
  editDocument(formData: FormData) {
    this.service.uploadEditDriverDocument(formData).subscribe(
      (response) => {
        console.log('Document edited successfully', response);
        this.onCompleteDocumentIndicator();
      },
      (error) => {
        console.error('Error editing document:', error);
      }
    );
    console.log(formData, 'Edit Docs');
  }
  onCompleteDocumentIndicator = () => {
    this.pendingDocument--;
    if (this.pendingDocument === 0) {
      // this.loading = false;
      this.SpinnerService.hide('qDriverFormSpinner');
      if(this.action=='edit')
      alert('vehicle  details updated successfully');
       else
       alert('vehicle  details added successfully');

           
      this.qSwitchBackTD()
    }
  };
  qSwitchBackTD() {
    if(this.UserType=='13'||this.UserType=='6')
      this.router.navigate(['/ILgic/cv'],{state:{tab:'vehicle'}});
    else
    this.router.navigate(['/ILgic/TransporterDashboard'],{state:{tab:'vehicle'}});
  }

  populateForm(data) {
     
    if(this.UserType=='13')
      {
          this.vehicleForm.addControl('customer', this.fb.control(null, Validators.required));
          this.vehicleForm.patchValue({
            customer:data?.cust_data?.name
          })
          this.vehicleForm.get('customer')?.disable()
      }
    

    const vehicle = data?.vehicle;
    const documents = Array.isArray(data?.document) ? data?.document : [];
    console.log(documents, 'documents');

    console.log(vehicle, 'edit vehicle Data');
    this.editFilter = this.editFilter || {};
    this.editFilter['Category'] = vehicle?.vehicle_category_id;
    this.editFilter['Make'] = vehicle?.vehicle_make_id;
    this.editFilter['Model'] = vehicle?.vehicle_model_id;
    this.editFilter['VehicleType'] = vehicle?.body_type_id;
    this.editFilter['VehicleCapacity'] = vehicle?.vehicle_capacity_tons;
    this.editFilter['FuelType'] = vehicle?.fuel_type;
    this.editFilter['customer']=data?.cust_data?.id;
    this.editFilter['vehicleSize']=vehicle?.vehicle_size
    console.log(this.editFilter,"edit filter");
    console.log(this.populateFilter,"populate filter");
    

    this.vehicleForm.patchValue({
        

      Category: this.populateFilter?.category[this.editFilter?.Category],
      Make: this.populateFilter?.make[this.editFilter?.Make],
      Model: this.populateFilter?.model[this.editFilter?.Model],
      VehicleNumber: vehicle?.vehicle_number,
      vehicleSize:this.populateFilter?.vehicle_size[this.editFilter?.vehicleSize],
      VehicleType:
        this.populateFilter?.vehicle_body_type[this.editFilter?.VehicleType],
      Registration: vehicle?.registration_no,
      RegistrationDate: vehicle?.registration_date,
      VehicleCapacity:
        this.populateFilter?.vehicle_capacity_data[
          this.editFilter?.VehicleCapacity
        ],
      FuelType:
        this.populateFilter?.vehicle_FuelType[this.editFilter?.FuelType],
      OverSpeed: vehicle?.max_speed,

      RegistrationDocumentNumber: '',
      RegistrationIssueDate: '',
      RegistrationExpiryDate: '',
      RegistrationRemarks: '',
      Registrationfile: '',

      PollutionDocumentNumber: '',
      PollutionIssueDate: '',
      PollutionExpiryDate: '',
      PollutionRemarks: '',
      Pollutionfile: '',

      PermitDocumentNumber: '',
      PermitIssueDate: '',
      PermitExpiryDate: '',
      PermitRemarks: '',
      Permitfile: '',

      InsuranceDocumentNumber: '',
      InsuranceIssueDate: '',
      InsuranceExpiryDate: '',
      InsuranceRemarks: '',
      Insurancefile: '',

      FitnessDocumentNumber: '',
      FitnessIssueDate: '',
      FitnessExpiryDate: '',
      FitnessRemarks: '',
      Fitnessfile: '',

      GPS: vehicle?.is_gps,
      Fixed_Door: vehicle?.is_fixed_door_e_lock,
      Refrigerated: vehicle?.is_refrigrated,
      Fire_Extinguisher: vehicle?.is_fire_extinguisher,
    });
  

      Object.keys(vehicle.features).forEach(featureId => {
        console.log(featureId);
        const isEnabled = vehicle.features[featureId] === 1;
        this.vehicleForm.patchValue({ [this.populateFilter?.vehicle_feature[featureId]]: isEnabled });
      });
    
        

    documents?.forEach((doc) => {
      if (doc.doc_type_id === 5) {
        // Registration Certificate
        this.vehicleForm.patchValue({
          RegistrationDocumentNumber: doc.doc_no,
          RegistrationIssueDate: doc.issue_date,
          RegistrationExpiryDate: doc.expiry_date,
          RegistrationRemarks: doc.remark,
        });
        this.selectedFiles['Registrationfile'] = doc.file_path; // Store the file path
      } else if (doc.doc_type_id === 6) {
        // Pollution Certificate
        this.vehicleForm.patchValue({
          PollutionDocumentNumber: doc.doc_no,
          PollutionIssueDate: doc.issue_date,
          PollutionExpiryDate: doc.expiry_date,
          PollutionRemarks: doc.remark,
        });
        this.selectedFiles['Pollutionfile'] = doc.file_path; // Store the file path
      } else if (doc.doc_type_id === 7) {
        // Vehicle Insurance
        this.vehicleForm.patchValue({
          InsuranceDocumentNumber: doc.doc_no,
          InsuranceIssueDate: doc.issue_date,
          InsuranceExpiryDate: doc.expiry_date,
          InsuranceRemarks: doc.remark,
        });
        this.selectedFiles['Insurancefile'] = doc.file_path; // Store the file path
      } else if (doc.doc_type_id === 8) {
        // Permit
        this.vehicleForm.patchValue({
          PermitDocumentNumber: doc.doc_no,
          PermitIssueDate: doc.issue_date,
          PermitExpiryDate: doc.expiry_date,
          PermitRemarks: doc.remark,
        });
        this.selectedFiles['Permitfile'] = doc.file_path; // Store the file path
      } else if (doc.doc_type_id === 13) {
        // Fitness Certificate
        this.vehicleForm.patchValue({
          FitnessDocumentNumber: doc.doc_no,
          FitnessIssueDate: doc.issue_date,
          FitnessExpiryDate: doc.expiry_date,
          FitnessRemarks: doc.remark,
        });
        this.selectedFiles['Fitnessfile'] = doc.file_path; // Store the file path
      }
    });
  }
}