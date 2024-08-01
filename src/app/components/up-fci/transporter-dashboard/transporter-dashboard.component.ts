import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { NavService } from 'src/app/shared/services/nav.service';
import { NgbAccordion, NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { DatePipe } from '@angular/common';
import { dateRangeValidator } from 'src/app/shared/validations/dateValidators';
import { NgxSpinnerService } from 'ngx-spinner';
import * as echarts from 'echarts';

declare var $:any;

@Component({
  selector: 'app-transporter-dashboard',
  templateUrl: './transporter-dashboard.component.html',
  styleUrls: ['./transporter-dashboard.component.scss']
})
export class TransporterDashboardComponent implements OnInit {

  ///////////////////////mehndir////////////////
  vehicleCapacityType:any=''
  vehicleBodyType:any=''
  vehicleFuelType:any=''
  vehicleCategory:any=''
  vehicleMake:any=''
  vehicleModel:any=''
  vehicleDocumentType:any=''
  selectVehicleIds:Array<any>=[]
  qallVehicleSelected: boolean = false;
  vehicleTableData:Array<any>=[]

  ShipmentNo: any;
  token: any = '';
  fullres: any = [];

  driverDashboardData:any={}
  vehicleDashboardData:any={}
  driverTableData:Array<any>=[]
  
  isLoadingDriverTable:Boolean=true
  allDriverSelected: boolean = false;
  selectedDriverIds:Array<any>=[]

  ///////////////////////////////////////////////////
  uploadfiledsk:any
  AgreementForm: FormGroup;
  // token:any
  Based:any=''
  account_id:any;
  venderList:any=[];
  billingForm!: FormGroup;
  filterForm!: FormGroup;
  isLoadingBilling:Boolean=false
  saveBillButton:Boolean=true
  customers: Array<{ id: string, value: string }> = [];
  accessToken:string='';
  vehicleList: Array<{ vehicle_id: string, vehicle_no: string }> = [];
  filterData:Array<any>=[]
  allSelected: boolean = false;
  selectedIds:Array<any>=[]
  customerItemsCount:number=0
  tripF:any=''
  TimeCheck:boolean=true
  filterDataagreement:any=[]
  /////////////////////////saumya///////////////////////////////////////////
  @ViewChild('accordion', { static: true }) accordion!: NgbAccordion;
  plus = [1]; // Initial array to create three panels
  panels = ['panel1', 'panel2']; 
  lastPanelId: string | null = null;
  defaultPanelId = 'panel0'; // Assuming the default active panel is the first one
  Assign_vehicle: FormGroup;
  datetimepicker1: any;
  // token: any;
  // account_id: any;
  account_type: any;
  group_id: any;
  GroupTypeId: any;
  Source:any=[];
  Destination:any=[];
  client: any=[];
  All_data: boolean=true;
  searched_data: any=[];
  orderId: any;
  expiryDate: any;
  documentMasters_list: any;
  Expiry_status: boolean=false;
  Issue_status: boolean=false;
  Dcopy: any;
  Driver_list: any=[];
  Vehicle_list: any=[];
  Driver_name='Ram';
  select: any;
  store_eve: any;
  vehicledriver_list: any=[];
  Vehiclefull_information: any=[];
  driverfull_information: any=[];
  current_id: any;
  Document_id: any;
  Document_name: any;
  edit_data: any;
  imageURL: any;
  Dcopy_edit: any;
  imageURL_edit: any;
  info_store: any=[];
  submite:boolean=false;
  isCollapsed: boolean[] = [];
  
  Safety_list:any=[
    {
      "name": "Registration Certificate",
      "img": "assets/imagesnew/Icon/Elock.png"
    },
    {
      "name": "Pollution Certificate",
      "img": "assets/imagesnew/Icon/GPS.png"
    },
    {
      "name": "Vehicle Insurance",
      "img": "assets/imagesnew/Icon/DualDriver.png"
    },
    {
      "name": "National Goods Permit",
      "img": "assets/imagesnew/Icon/FireExtinguisher.png"
    }];
    // activePanelIds: string[] | null = ['panel0'];
    // activePanelIds: string | string[] | null = ['panel0']; 
    activePanelIds: string | readonly string[] = ['panel0']; 
  name_vehicle:any=[
    {
      "name": "Registration Certificate",
      "img": "assets/imagesnew/Icon/RC.png"
    },
    {
      "name": "Pollution Certificate",
      "img": "assets/imagesnew/Icon/PollutionCertificate.png"
    },
    {
      "name": "Vehicle Insurance",
      "img": "assets/imagesnew/Icon/Insurance.png"
    },
    {
      "name": "National Goods Permit",
      "img": "assets/imagesnew/Icon/NationalGoodsPermit.png"
    },
    {
      "name": "All India Permit",
      "img": "assets/imagesnew/Icon/AllIndiaPermit.png"
    },
    {
      "name": "Fitness Certificate",
      "img": "assets/imagesnew/Icon/Fitness.png"
    }
  ];
  info_store_driver: any=[];
  Driver_documentList:any = [   
    { name: "Aadhaar Card", img: "assets/imagesnew/Icon/Aadhar.png" },
    
    { name: "Pan Card", img: "assets/imagesnew/Icon/PanCard.jpg" },
    
    { name: "Driving License", img: "assets/imagesnew/Icon/DrivingLicense.png" },
    { name: "Photograph", img: "assets/imagesnew/Icon/man.jpg" }
    // { name: "Voter Id Card", img: "assets/imagesnew/Icon/Voteridcard.jpg" }
  ];
  isqDriverChartLoading:Boolean=false;
  indx: any;
  isRadioSelected: boolean=false;
  vehicle_limit: any;
  invoicearray: any;
  store_filtersubmit_data: any;
  OneRow_Data: any;
  document_for: any;
  table_show: boolean=false;
  full_view: any;
  isqVehicleChartLoading:Boolean=true;
 isLoadingVehicleTable:boolean=true;

  /////////////////////////////////////////////////////////////////////
  constructor(
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private navServices: NavService,
    private modalService: NgbModal,
    private router: Router,
    private datepipe: DatePipe,
    private crudService: CrudService,
     private service: CrudService, private SpinnerService: NgxSpinnerService, 
  ) {
    this.AgreementForm = this.formBuilder.group({
      VenderName:new FormControl('', Validators.required),
      AgreementCode:new FormControl('', Validators.required),
      AgreementDate:new FormControl('', Validators.required),
      AgreementFile:new FormControl('', Validators.required),
      TotalnoVehicle:new FormControl('', Validators.required),
      Agreement: this.formBuilder.array([this.gettable()]),
    }); 
    ///////////////////////////////////////////////////////////
    this.Assign_vehicle = this.formBuilder.group({
      invoicearray: this.formBuilder.array([]),
      Quote: [{ value: '', disabled: true }]
      })
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('AccessToken')!
    console.log("token",this.token)
    this.account_id = localStorage.getItem('AccountId')!
    this.datetimepicker1 = this.datepipe.transform((new Date), 'yyyy-MM-dd');
    this.group_id = localStorage.getItem('GroupId')!;
    this.GroupTypeId = localStorage.getItem('GroupTypeId')!;
    this.orderfilterfilter_list();
    // this.masterUploadTable()
    this.initForms();
    this.initSidebar();
    this.fetchCustomerAndVehicleData();
    this.filterDataagreementF()
    this.transporterDataF()
    
      this.Dateselect()
      this.Dateselect1();
      this.masterUploadTable1();
      this.documentMasters();
      this.vehicleDashboard();
      this.driverDashboard('')
  }

  initForms(): void {
    this.billingForm = this.fb.group({
      transporter: [null, Validators.required],
      vehicles: this.fb.array([])
    });

    this.filterForm = this.fb.group({
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
      transporter: [null, Validators.required],
      status: [null, Validators.required]
    },{
      validators:dateRangeValidator()
    });
  }

  initSidebar(): void {
    const App = document.querySelector('.app');
    App?.classList.add('sidenav-toggled');
  }

  get vehicles(): FormArray {
    return this.billingForm.get('vehicles') as FormArray;
  }

  addVehicle(): void {
    const vehicleGroup = this.fb.group({
      customer:this.billingForm.value?.transporter,
      Vehicle_Type: [null, Validators.required],
      Billing_Start_Data: ['', Validators.required],
      Billing_End_Data: ['', Validators.required],
      Billing_Mode : [null, Validators.required],
      No_of_Unit: ['', [Validators.required, Validators.min(0)]],
      Per_Unit_Charges: ['', [Validators.required, Validators.min(0)]],
      numberOfUnitsLabel: ['Number of Units'],
      perUnitChargesLabel: ['Per Unit Charges'],
      Total_Amount : [0]
    },{
      validators:dateRangeValidator()
    });

    vehicleGroup.get('No_of_Unit')?.valueChanges.subscribe(() => this.updateTotalCharges(vehicleGroup));
    vehicleGroup.get('Per_Unit_Charges')?.valueChanges.subscribe(() => this.updateTotalCharges(vehicleGroup));

    this.vehicles.push(vehicleGroup);
  }

  removeVehicle(index: number): void {
    this.vehicles.removeAt(index);
  }

  updateTotalCharges(vehicleGroup: FormGroup): void {
    const No_of_Unit  = vehicleGroup.get('No_of_Unit')?.value || 0;
    const Per_Unit_Charges = vehicleGroup.get('Per_Unit_Charges')?.value || 0;
    const Total_Amount  = No_of_Unit  * Per_Unit_Charges;
    vehicleGroup.get('Total_Amount')?.setValue(Total_Amount , { emitEvent: false });
  }

  onBillingModeChange(vehicleIndex: number): void {
    const vehicleGroup = this.vehicles.at(vehicleIndex) as FormGroup;
    const Billing_Mode  = vehicleGroup.get('Billing_Mode')?.value;

    let numberOfUnitsLabel = 'Number of Units';
    let perUnitChargesLabel = 'Per Unit Charges';

    switch (Billing_Mode ) {
      case 'trip':
        numberOfUnitsLabel = 'Number of Trips';
        perUnitChargesLabel = 'Per Trip Charges';
        break;
      case 'km':
        numberOfUnitsLabel = 'KM Running';
        perUnitChargesLabel = 'Per KM Charges';
        break;
      case 'day':
        numberOfUnitsLabel = 'Number of Days';
        perUnitChargesLabel = 'Per Day Charges';
        break;
    }

    vehicleGroup.patchValue({
      numberOfUnitsLabel,
      perUnitChargesLabel,
      Total_Amount : 0
    });
  }

  onSubmit(value:any) {
    if(this.billingForm.valid){    
              this.postCustomerBilling()
             
    }
   
  }

  closeTransporterModal(){
    const modalElement = $('#transporterModal')
    if (modalElement) {
      modalElement.removeClass("show")
      modalElement.modal('hide') 
      
    }
  }
  onFilter(): void {
    const filterValues = this.filterForm.value;
    console.log(this.filterForm);
    this.getBillingDetails(filterValues)

    
  }
 

masterUploadTable1() {
  var tbl = $('#Assign-vehicle')
  var table = $('#Assign-vehicle').DataTable();
  table.clear()
  table.destroy();
  // table.draw()
  // $('#masterUpload').DataTable().clear;
  // if(datatable.length!=)
  // console.log("table length",datatable.length)
  //  $('#masterUpload tbody').empty();

  
  

  $(document).ready(function () {



    $('#Assign-vehicle').DataTable({


      "language": {
        search: '',
        searchPlaceholder: 'Search'
      },
      pageLength: 10,
      fixedHeader: true,
      // // scrollX: true,
      sScrollY: '450px',
      scrollCollapse: true,
      paging: true,
      sScrollX: true,
      destroy: false,
      responsive: true,


      //   fixedColumns:   {
      //     leftColumns: 11,
      //     select: true,

      //     // rightColumns: 5
      // },


      "order": [],
      dom: '<"html5buttons"B>lTfgitp',
      columnDefs: [
        { targets: 'no-sort', orderable: false }
      ],

      buttons:
        [


          {
            extend: 'csv',
            footer: true,
            autoClose: 'true',
            titleAttr: 'Download csv file',

            className: 'datatablecsv-btn fa fa-file-text-o ',
            text: '',
            tag: 'span',

            exportOptions: {

              columns: ':visible',


            },
            title: 'dashboard_repor'
          },
          {
            extend: 'pdf',
            footer: true,
            orientation: 'landscape',
            pageSize: 'LEGAL',

            autoClose: 'true',

            titleAttr: 'Download Pdf file',
            tag: 'span',

            className: 'datatablepdf-btn fa fa-file-pdf-o ',
            text: '',
            // customize: function (doc) {
            //   var colCount = new Array();
            //   $(tbl).find('tbody tr:first-child td').each(() => {
            //     if ($(this).attr('colspan')) {
            //       for (var i = 1; i <= $(this).attr('colspan'); i++) {
            //         colCount.push('*');
            //       }
            //     } else { colCount.push('*'); }
            //   });
            //   doc.content[1].table.widths = colCount;
            // },


            exportOptions: {

              columns: ':visible',
              //  columns: [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 ]

            },
            title: 'dashboard_repor'
          },
          {
            extend: 'copy',
            footer: true,
            titleAttr: ' Copy  file',

            tag: 'span',

            className: 'datatablecopy-btn fa fa-copy ',
            text: '',
            orientation: 'landscape',
            pageSize: 'LEGAL',
            exportOptions: {

              columns: ':visible'

            },
            title: 'dashboard_repor'
          },
          {
            extend: 'excel',
            footer: true,
            autoClose: 'true',
            //text: '',
            //className: 'fa fa-file-pdf-o',
            //color:'#ff0000',

            buttons: ['excel'],
            titleAttr: ' Download excel file',

            tag: 'span',

            className: 'datatableexcel-btn fa fa-file-excel-o',
            text: '',
            exportOptions: {

              columns: ':visible'

            },
            title: 'dashboard_repor'
          }]
    }

    );
  });


  //  setTimeout(() => {
  //  this.SpinnerService.hide();
  // console.log("Timeout")
  //  this.SpinnerService.hide("LastAlert")

  //  }, 3000);

  // console.log("table length2",datatable.length)
}

fetchCustomerAndVehicleData(): void {
   this.accessToken = localStorage.getItem('AccessToken')||'';
  const formData = new FormData();
  formData.append('AccessToken', this.accessToken);

  this.crudService.getCustomers(formData).subscribe(
   
    response => {
      this.customers=response
      console.log("customer",this.customers);
      
    },
    error => {
      console.error('Error sending data:', error);
    }
    // console.log("Customer",this.customers)
  );
  this.crudService.getVehicles(formData).subscribe(
    response=>{
      this.vehicleList=(response.VehicleList);
      console.log(response,"Vehicle List TMS Billing");
      
    },
    error => {
      console.error('Error sending data:', error);
    }
  )
}

postCustomerBilling():void{
  this.saveBillButton=false
  const formData = new FormData();
  formData.append('AccessToken', this.accessToken);
  formData.append('Vehicles',JSON.stringify(this.billingForm.value.vehicles))
  this.crudService.postBillingCustomer(formData).subscribe(
    response=>{
      console.log(response);
      if(response.Status=='sucess'){
        alert("Successfully added")
        this.saveBillButton=true
        this.closeTransporterModal()
        this.vehicles.clear();
      }else{
        alert(response.Message)
        this.saveBillButton=true
      }
     
      
    },
    error => {
      console.error('Error sending data:', error);
    }
  )
}

getBillingDetails({transporter,dateFrom,dateTo,status}):void{
  this.isLoadingBilling = true; // Start loading
   const formData=new FormData()
   formData.append('AccessToken', this.accessToken);
   formData.append('customer_id',transporter)
   formData.append('from_date',dateFrom)
   formData.append('to_date',dateTo)
   formData.append('status',status)

   this.crudService.billingDetails(formData).subscribe(
    response=>{
     this.filterData=response?.data
     this.isLoadingBilling=false;
     this.billingDetailsTable()
     console.log("full",response);
     this.customerItemsCount =this.filterData.filter(item => item?.Raised_By === 'customer').length
     console.log(this.customerItemsCount);
     
      
    },
    error=>{
      console.error("error getting data",error)
      this.isLoadingBilling=false;
    }
   )
}
toggleAllSelection() {
  this.allSelected = !this.allSelected;
  if (this.allSelected) {
    this.selectedIds = [];
    this.filterData.forEach((item, index) => {
      if (item?.Raised_By === 'customer') {
        this.selectedIds.push(item?._id);
      }
    });
  } else {
    this.selectedIds = [];
  }
  console.log("selected", this.selectedIds);
}

    toggleSelection(itemId: any) {
      const index = this.selectedIds.indexOf(itemId);
      if (index > -1) {
        this.selectedIds.splice(index, 1);
      } else {
        this.selectedIds.push(itemId);
      }
      this.allSelected = this.selectedIds.length ===this.customerItemsCount;
      console.log("selected", JSON.stringify(this.selectedIds))
    }

    isSelected(itemId: any): boolean {
      return this.selectedIds.includes(itemId);
    }
    onAccept(): void {
      const selectedItems:any = this.filterData.filter((item,ind) => (item?.Raised_By === 'customer') && this.isSelected('checkbox-' + ind));
    ;
      if (confirm('Do you want to accept the bills?')) {
        this.isLoadingBilling=true
        const formData = new FormData();
        formData.append('AccessToken', this.accessToken);
        formData.append('billing_data', JSON.stringify(this.selectedIds));
        formData.append('userflag',JSON.stringify(1))
        formData.append('status',JSON.stringify(2))
        formData.append('status_remark','approved')
        console.log(formData)
        
        this.crudService.billingStatus(formData).subscribe(
          (response) => {
            console.log(response);
            this.selectedIds=[]
            this.allSelected=false
            this.getBillingDetails(this.filterForm.value)
          },
          (error) => {
            console.error('error getting data', error);
            this.isLoadingBilling = false;
          }
        );
      }
      else{
        console.log("Selected items:Reject", selectedItems)
      }
    }
    onReject(): void {
      const selectedItems = this.filterData.filter((item,ind) => (item?.Raised_By === 'customer') && this.isSelected('checkbox-' + ind));
    ;
      if (confirm('Do you want to reject the bills?')) {
        this.isLoadingBilling = true
        const formData = new FormData();
        formData.append('AccessToken', this.accessToken);
        formData.append('billing_data', JSON.stringify(this.selectedIds));
        formData.append('userflag',JSON.stringify(1))
        formData.append('status',JSON.stringify(3))
        formData.append('status_remark','rejected')
        console.log(formData)
        this.crudService.billingStatus(formData).subscribe(
          (response) => {
            console.log(response);
            this.selectedIds=[]
            this.allSelected=false
            this.getBillingDetails(this.filterForm.value)
          },
          (error) => {
            console.error('error getting data', error);
            this.isLoadingBilling = false;
          }
        );
      }
      else{
        console.log("Selected items:Reject", selectedItems)
      }
    }
    gettable(): FormGroup {
      // alert(0)
      return this.formBuilder.group({
        Noofvehcle: new FormControl(''),
        vehcleType: new FormControl(''),
        vehcleCapacity: new FormControl(''),
        tripType: new FormControl(''),
        tolltax: new FormControl(''),
        fromdate: new FormControl(''),
        todate: new FormControl(''),
        NighFrom: new FormControl(''),
        NightTo: new FormControl(''),
        Tminoftrips: new FormControl(''),
        ttripcost: new FormControl(''),
        TTentativeDistance: new FormControl(''),
        TFixedCharges: new FormControl(''),
        tMinimumMonthlyCost: new FormControl(''),
        DMinimumDistance: new FormControl(''),
        DDistanceCost: new FormControl(''),
        dTentativeDistance: new FormControl(''),
        dFixedCharges: new FormControl(''),
        dMinimumMonthlyCost: new FormControl(''),
        hMinimumDuration: new FormControl(''),
        hHourlyCost: new FormControl(''),
        hTentativeDistance: new FormControl(''),
        hFixedCharges: new FormControl(''),
        hMinimumMonthlyCost: new FormControl(''),
        dhMinimumDailyDistance: new FormControl(''),
        dhMinimumDailyDuration: new FormControl(''),
        dhDistanceCost: new FormControl(''),
        dhHourlyCost: new FormControl(''),
        dhTentativeDistance: new FormControl(''),
        dhTentativeDurations: new FormControl(''),
        dhFixedCharges: new FormControl(''),
        dhMinimumMonthlyCost: new FormControl(''),
   
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
      var agrmnt:any=[]
      for(var i=0;i<value.Agreement.length;i++)
      {
        

        let tempagree=
        {
          "vehicle_type_data":{
            "vehicle_type_id":value.Agreement[i].vehcleType.id,
            "vehicle_type":value.Agreement[i].vehcleType.value
          },
          "agreement_type_data":{
            "agreement_type_id":value.Agreement[i].tripType.id,
            "agreement_type_":value.Agreement[i].tripType.value
          },
          "toll_tax":value.Agreement[i].tolltax,
          // "Night_Charges":value.Agreement[i].tolltax,
          "Night_Time_from":value.Agreement[i].NighFrom,
          "Night_Time_to":value.Agreement[i].NightTo,
          "from_Time":value.Agreement[i].fromdate,
          "to_Time":value.Agreement[i].todate,
          "no_of_Vehicle":value.Agreement[i].Noofvehcle,

          "vehicle_capacity_data":{
            "vehicle_capacity_id":value.Agreement[i].vehcleCapacity.id,
            
            "vehicle_capacity":value.Agreement[i].vehcleCapacity.capacity
            
          },
          "trip_based":{
            "TFixedCharges":value.Agreement[i].TFixedCharges,
            "TTentativeDistance":value.Agreement[i].TTentativeDistance,
            "Tminoftrips":value.Agreement[i].Tminoftrips,
            "tMinimumMonthlyCost":value.Agreement[i].tMinimumMonthlyCost,
            "ttripcost":value.Agreement[i].ttripcost,
          },
          "distance_based":{
            "DDistanceCost":value.Agreement[i].DDistanceCost,
            "DMinimumDistance":value.Agreement[i].DMinimumDistance,
            "dMinimumMonthlyCost":value.Agreement[i].dMinimumMonthlyCost,
            "dTentativeDistance":value.Agreement[i].dTentativeDistance,
            "dFixedCharges":value.Agreement[i].dFixedCharges,
          },
          "hourly_based":{
            "hFixedCharges":value.Agreement[i].hFixedCharges,
            "hHourlyCost":value.Agreement[i].hHourlyCost,
            "hMinimumDuration":value.Agreement[i].hMinimumDuration,
            "hMinimumMonthlyCost":value.Agreement[i].hMinimumMonthlyCost,
            "hTentativeDistance":value.Agreement[i].hTentativeDistance,
          },
          "distance_hourly_based":{
            "dhDistanceCost":value.Agreement[i].dhDistanceCost,
            "dhFixedCharges":value.Agreement[i].dhFixedCharges,
            "dhHourlyCost":value.Agreement[i].dhHourlyCost,
            "dhMinimumDailyDistance":value.Agreement[i].dhMinimumDailyDistance,
            "dhMinimumMonthlyCost":value.Agreement[i].dhMinimumMonthlyCost,
            "dhTentativeDistance":value.Agreement[i].dhTentativeDistance,
            "dhTentativeDurations":value.Agreement[i].dhTentativeDurations,
          },
        }
        agrmnt.push(tempagree)

       
      }
      let permaAgree=
      {
        "agreeemnt_code":value.AgreementCode,
        "agreement_date":value.AgreementDate,
        "total_number_of_vehicles":value.TotalnoVehicle,
        "assigned_group_id":value.VenderName.id,
        "transporter_id":"",
        // "agreement_doc":this.uploadfiledsk
      }
      // uploadfiledsk
      console.log("perma",permaAgree)
      var formdataCustomer = new FormData()
      formdataCustomer.append('AccessToken',this.token)
      formdataCustomer.append('userflag', '2');
      formdataCustomer.append('agreement_doc', this.uploadfiledsk);
      formdataCustomer.append('agreement_mapping_data', JSON.stringify(agrmnt));
      formdataCustomer.append('agreement_data',JSON.stringify(permaAgree));
      
      
      this.service.agreementS(formdataCustomer).subscribe((res: any) => {
        console.log("agreementassign",res);
        alert(res.Message)
        
        
        // this.venderList=res.Filter.customer
      })

      console.log("agrmnt",agrmnt)
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
    transporterDataF()
    {
      var formdataCustomer = new FormData()
      formdataCustomer.append('AccessToken',this.token)
      // formdataCustomer.append('GroupId', '0986');
      // formdataCustomer.append('UserType', 'master');
      // formdataCustomer.append('DataFilter', js);
      
      
      this.service.venderListS(formdataCustomer).subscribe((res: any) => {
        console.log("res", res);
        this.venderList=res.Filter.customer
      })
    }
    filterDataagreementF()
    {
      var formdataCustomer = new FormData()
      formdataCustomer.append('AccessToken',this.token)
      // formdataCustomer.append('GroupId', '0986');
      // formdataCustomer.append('UserType', 'master');
      // formdataCustomer.append('DataFilter', js);
      
      
      this.service.filterS(formdataCustomer).subscribe((res: any) => {
        console.log("allfilter",res);
        this.filterDataagreement = res.data
        // this.venderList=res.Filter.customer
      })
    }
    TripTypeF(value)
    {
      console.log(value);
       if(value==undefined)
        {
          this.Based=" ";
          this.tripF='';
          
        }
      else   if(value.id==1)
      {
        this.Based="Trip Based";
        this.tripF='T';
        
      }
      
    else  if(value.id==3)
      {
        this.Based="Hourly Based";
        this.tripF='H';
       
      }
    else  if(value.id==2)
      {
        this.Based="Distance Based";
        this.tripF='D';
       
      }
    else  if(value.id==4)
      {
        this.Based="Distance & Hourly Based";
        this.tripF='DH';
        
      }
   
    }
    Nightf(e)
    {
          if(e.target.checked==true)
          {
            this.TimeCheck=true;
          }
          if(e.target.checked==false)
          {
            this.TimeCheck=false;
          }
    }
    /////////////////////////////saumya////////////////////////////////////////////////////////////////////////
    closeAllAccordions() {
      if (this.accordion) {
        this.accordion.activeIds = [];
      }
    }
    accordian_increase() {
      if(this.plus.length<this.vehicle_limit ){
       
      this.getinvoice().push(this.putNewinvoice());
      // this.status.push(this.putNewinvoice1());
      // if(this.plus.length<=this.vehicle_limit ){
      this.plus.push(this.plus.length + 1); // Add a new item to the array
      }
    }
    getinvoice() {
  
      return this.Assign_vehicle.get('invoicearray') as FormArray;
  
    }
    
    putNewinvoice() {
  
      return this.formBuilder.group({
  // const group = this.formBuilder.group({
        Vehicle: new FormControl('', [Validators.required,]),
        Capacity: new FormControl('', [Validators.required,]),
        Type: new FormControl(''),
  
        Driver: new FormControl('', [Validators.required,]),
        Phone: new FormControl('', [Validators.required,]),
        // Photograph: new FormControl('', [Validators.required,]),
        // checkbox:new FormControl('', [Validators.required,]),
        checkbox: ['', Validators.required],
        remark :new FormControl(),
        safetyFeatures: this.formBuilder.array([]),
        VehicleDocument:new FormControl(),
        DriverDocument:new FormControl(),
        // invoicearray: this.formBuilder.array([])
        // city: new FormControl('', [Validators.required,]),
        // customername: new FormControl('', [Validators.required,]),
  
      })
  
    }
  
    
  
    orderData_assign(){
  
  
  
  
      var tbl = $('#Assignvehicle')
      var table = $('#Assignvehicle').DataTable();
      table.clear()
      table.destroy();
      // table.draw()
      // $('#masterUpload').DataTable().clear;
      // if(datatable.length!=)
  
      //  $('#masterUpload tbody').empty();
  
  
  
      $(document).ready(function () {
  
  
  
        $('#Assignvehicle').DataTable({
  
  
          "language": {
            search: '',
            searchPlaceholder: 'Search'
          },
          pageLength: 10,
          fixedHeader: true,
          // scrollX: true,
          scrollY: '450px',
          scrollCollapse: true,
          paging: true,
          scrollX: true,
          destroy: true,
          responsive: true,
          // dom: '<f>t',
          //  dom: 'Bfrtip',
  
  
          //   fixedColumns:   {
          //     leftColumns: 11,
          //     select: true,
  
          //     // rightColumns: 5
          // },
  
  
          "order": [],
          dom: '<"html5buttons"B>lTfgitp',
          columnDefs: [
            { targets: 'no-sort', orderable: false }
          ],
  
          buttons:
            [
  
  
              {
                extend: 'csv',
                footer: true,
                autoClose: 'true',
                titleAttr: 'Download csv file',
  
                className: 'datatablecsv-btn fa fa-file-text-o ',
                text: '',
                tag: 'span',
                charset: 'utf-8',
                extension: '.csv',
  
                // fieldSeparator: ';',
                // fieldBoundary: '',
                filename: 'export',
                bom: true,
                columns: ':visible',
  
                exportOptions: {
  
                  columns: ':visible',
  
  
                },
                title: 'report'
              },
              {
                extend: 'pdf',
                footer: true,
                orientation: 'landscape',
                pageSize: 'LEGAL',
  
                autoClose: 'true',
  
                titleAttr: 'Download Pdf file',
                tag: 'span',
                charset: 'utf-8',
                // extension: '.pdf',
                columns: ':visible',
                // fieldSeparator: ';',
                // fieldBoundary: '',
                // filename: 'export',
                bom: true,
  
                className: 'datatablepdf-btn fa fa-file-pdf-o ',
                text: '',
                customize: function (doc) {
  
                  //   pdfMake.fonts = {
                  //     Roboto: {
                  //         normal: 'Roboto-Regular.ttf',
                  //         bold: 'Roboto-Medium.ttf',
                  //         italics: 'Roboto-Italic.ttf',
                  //         bolditalics: 'Roboto-MediumItalic.ttf'
                  //     },
                  //     nikosh: {
                  //         normal: "NikoshBAN.ttf",
                  //         bold: "NikoshBAN.ttf",
                  //         italics: "NikoshBAN.ttf",
                  //         bolditalics: "NikoshBAN.ttf"
                  //     }
                  // };
                  var colCount = new Array();
                  $(tbl).find('tbody tr:first-child td').each(() => {
                    if ($(this).attr('colspan')) {
                      for (var i = 1; i <= $(this).attr('colspan'); i++) {
                        colCount.push('*');
                      }
                    } else { colCount.push('*'); }
                  });
                  // doc.defaultStyle.font = "arial";
                  doc.content[1].table.widths = colCount;
                  // doc.defaultStyle.fontSize = 'Arial';
                  // processDoc(doc);
  
                  // doc.defaultStyle= {alef:'alef' } ;
  
                },
  
  
                exportOptions: {
  
                  columns: ':visible',
                  //  columns: [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 ]
  
                },
                title: 'report'
              },
              {
                extend: 'copy',
                footer: true,
                titleAttr: ' Copy  file',
  
                tag: 'span',
  
                className: 'datatablecopy-btn fa fa-copy ',
                text: '',
                orientation: 'landscape',
                pageSize: 'LEGAL',
                exportOptions: {
  
                  columns: ':visible'
  
                },
                title: 'dashboard_repor'
              },
              {
                extend: 'excel',
                footer: true,
                autoClose: 'true',
                //text: '',
                //className: 'fa fa-file-pdf-o',
                //color:'#ff0000',
  
                buttons: ['excel'],
                titleAttr: ' Download excel file',
  
                tag: 'span',
  
                className: 'datatableexcel-btn fa fa-file-excel-o',
                text: '',
                exportOptions: {
  
                  columns: ':visible'
  
                },
                title: 'dashboard_repor'
              },
            ]
        }
  
        );
      });
  
  
      setTimeout(() => {
        this.SpinnerService.hide();
      }, 3000);
  
  
    }
    // updateFormStatusValues(): void {
    //   const invoiceArray = this.getinvoice();
    
    //   invoiceArray.controls.forEach((group:any, idx) => {
    //     const documents = this.Vehiclefull_information[idx]?.documents;
    //     if (documents) {
    //       for (let item in documents) {
    //         const status = documents[item]?.status;
    //         if (status !== undefined) {
    //           group.get('status').setValue(status);
    //         }
    //       }
    //     }
    //   });
    // }
    patchSafetyFeatures(index: number) {
      this.submite=true;
      this.closeAllAccordions();
      var k:any=[]
      const invoiceArray = this.getinvoice();
      const safetyFeaturesArray = (this.getinvoice().controls[index] as FormGroup).get('VehicleDocument') as FormArray;
      
      safetyFeaturesArray.patchValue(this.Vehiclefull_information[index]?.documents);
      const DriverDocument  = (this.getinvoice().controls[index] as FormGroup).get('DriverDocument') as FormArray;
      
      DriverDocument.patchValue(this.driverfull_information[index]?.documents);
     
      if (this.Assign_vehicle.controls.invoicearray.valid) {
        // Handle form submission
        this.submite=false;
        this.collapsePanel('panel-' + index)
        
      }
    }
    Assign_vehicle_Addsubmit() {
      console.log(this.Assign_vehicle.value.Quote)
      // this.updateFormStatusValues();
      if (this.Assign_vehicle.valid) {
        var formdata=new FormData()
        formdata.append('AccessToken',this.token)
        formdata.append('order_id',this.orderId)
        formdata.append('quote',this.Assign_vehicle.value.Quote)
        formdata.append('vehicle_data',JSON.stringify(this.Assign_vehicle.value.invoicearray))
        
        
        this.service.indentvehicleassignment(formdata).subscribe((data:any) => {
        
        if(data.Status=="sucess"){
         
          alert(data.Message);
          $('#desklastalertModal').modal('hide');
          this.clearAllForms();
          this.filterSubmit( this.store_filtersubmit_data)
          this.plus=[];
      
      }else{
        alert(data.Message)
      }
      })
       
      } else {
        // Handle invalid form state (optional)
        this.markFormGroupTouched(this.Assign_vehicle); // Mark all controls as touched for validation
      }
    
    }
    clearAllForms() {
      this.getinvoice().clear();
      this.isCollapsed = []; // Reset collapse states
      this.Vehiclefull_information=[];
      this.driverfull_information=[];
  
    }
  
    markFormGroupTouched(formGroup: FormGroup) {
      Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();
  
        if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        }
      });
    }
    panelShadow($event: NgbPanelChangeEvent, shadow) {
  
  
      const { nextState, panelId } = $event;
      const activePanelElem: any = document.getElementById(panelId);
  
      if (nextState) {
        activePanelElem.parentElement.classList.add('open');
      } else {
        activePanelElem.parentElement.classList.remove('open');
      }
  
      if (this.lastPanelId && this.lastPanelId !== panelId) {
        const lastPanelElem: any = document.getElementById(this.lastPanelId);
        lastPanelElem.parentElement.classList.remove('open');
      }
  
      this.lastPanelId = nextState ? panelId : null;
    }
    collapsePanel(panelId: string) {
    
      this.accordion.toggle(panelId);
      // const lastPanelElem: any = document.getElementById(panelId);
      // lastPanelElem.parentElement.classList.remove('open');
    }
   
    addSafetyFeature(idx: number, safetyFeature: string) {
      const safetyFeatures = this.Vehiclefull_information[idx]?.vehicle_data?.safety_features;
  
      // Initialize FormArray for safetyFeatures
      const safetyFeaturesArray = this.getinvoice().at(idx).get('safetyFeatures') as FormArray;
      
      // Clear existing controls if needed
      safetyFeaturesArray.clear();
      
      // Add new form controls based on safetyFeatures
      safetyFeatures.forEach(safty => {
        safetyFeaturesArray.push(new FormControl(safty.value));
      }); // Initialize with false or appropriate default value
    }
    
    // Function to remove a safety feature from a specific vehicle assignment
    removeSafetyFeature(idx: number, featureIndex: number) {
      const safetyFeaturesArray = this.getinvoice().at(idx).get('safetyFeatures') as FormArray;
      safetyFeaturesArray.removeAt(featureIndex);
    }
    
    // Helper function to get the FormArray instance for safetyFeatures
    getSafetyFeaturesArray(idx: number): FormArray {
      return this.getinvoice().at(idx).get('safetyFeatures') as FormArray;
    }
    // initializeSafetyFeatures() {
    //   return this.Safety_list.map(() => new FormControl(false));
    // }
    delete_accordian(index: number) {
      this.plus.splice(index, 1); 
      this.getinvoice().removeAt(index);
      // Remove the item at the specified index
    }
    
    Dateselect(){
   
      $(document).ready(() => {
        $("#Date-select").datepicker({
          format: "yyyy-mm-dd",
    todayBtn: "linked",
    keyboardNavigation: false,
    forceParse: false,
    autoclose: true,
    defaultViewDate: new Date()
  
  }).datepicker('setDate', new Date());
      })
    
  }
  
  Dateselect1(){
   
    $(document).ready(() => {
      $("#Date-select_end").datepicker({
        format: "yyyy-mm-dd",
  todayBtn: "linked",
  keyboardNavigation: false,
  forceParse: false,
  autoclose: true,
  defaultViewDate: new Date()
  }).datepicker('setDate', new Date());
    })
  
  }
  Expiry(){
    this.Expiry_status=false;
    $(document).ready(() => {
      $("#Date-Expiry").datepicker({
        format: "yyyy-mm-dd",
  todayBtn: "linked",
  keyboardNavigation: false,
  forceParse: false,
  autoclose: true,
  defaultViewDate: new Date()
  }).datepicker('setDate', new Date());
    })
   
  // this.expiryDate=
  }
  
  Issue(){
    this.Issue_status=false;
    $(document).ready(() => {
      $("#Date-Issue").datepicker({
        format: "yyyy-mm-dd",
  todayBtn: "linked",
  keyboardNavigation: false,
  forceParse: false,
  autoclose: true,
  defaultViewDate: new Date()
  }).datepicker('setDate', new Date());
    })
  
  }
  // orderfilter
  orderfilterfilter_list(){
    
    var formdata=new FormData()
    formdata.append('AccessToken',this.token)
    
    
    this.service.orderfilter(formdata).subscribe((data:any) => {
    
    if(data.Status=="sucess"){
     
     var Filter:any=[];
     Filter=data.Filter;
  
      this.Source=Filter.Source;
      this.Destination=Filter.Destination;
      this.client=Filter.customer;
      
  
  }else{
    // alert(data.Message)
  }
  })
  }
  orderstatus_Decline(){
  
    if (confirm('Are you sure you want to decline this?')) {
     
    
    // 1=pending
    // 2= Decline(Rejected)
    // 
    var formdata=new FormData()
    formdata.append('AccessToken',this.token)
    formdata.append('status','2')
    formdata.append('order_id',this.orderId)
    formdata.append('status_remark','Rejected')
    
    this.service.orderstatus(formdata).subscribe((data:any) => {
      
    if(data.Status=="sucess"){
      alert(data.Message)
      this.filterSubmit(this.store_filtersubmit_data)
  
  }else{
    alert(data.Message)
  }
  })
    }
  
  
  
  
  }
  selected_radio(order:any,event:any){
    this.OneRow_Data=event;
    this.orderId=order;
    this.vehicle_limit=event.No_of_Vehicles
    this.isRadioSelected = true;
    if (this.OneRow_Data?.Status == '5') {
      this.Assign_vehicle?.get('Quote')?.setValidators([Validators.required]);
      this.Assign_vehicle?.get('Quote')?.enable();
    } else {
      this.Assign_vehicle?.get('Quote')?.clearValidators();
      this.Assign_vehicle?.get('Quote')?.disable();
    }
    this.Assign_vehicle?.get('Quote')?.updateValueAndValidity();
    
  }
  isSubmitDisabled(): boolean {
    if (this.OneRow_Data?.Status == '5') {
      return this.Assign_vehicle?.get('Quote')?.invalid || false;
    }
    return false;
  }
  filterSubmit(eve: any) {
    
    if(eve.status == 'VALID'){
      this.SpinnerService.show('spinner-5');
    this.store_filtersubmit_data=eve;
    const startDate = $("#Date-select").val();
    const endDate = $("#Date-select_end").val();
    
    if (startDate <= endDate) {
      let future: any;
      if (this.All_data) {
        future = new Date(endDate);
      } else {
        future = new Date(startDate);
      }
  
      // Calculate the date 10 days later
      const futureDate = new Date(future.getTime() + 10 * 24 * 60 * 60 * 1000);
      const date_10_days_later: any = this.datepipe.transform(futureDate, 'yyyy-MM-dd HH:mm:ss');
      //  alert(date_10_days_later);
      if (endDate <= date_10_days_later) {
       
  
        var formdata=new FormData()
        formdata.append('AccessToken',this.token)
        formdata.append('order_id',eve.value.Order_id)
        formdata.append('customer',JSON.stringify(eve.value.Client))
        formdata.append('from_date',eve.value.from_Date)
        formdata.append('to_date',eve.value.To_Date)
        // formdata.append('Source',eve.value.From)
        // formdata.append('Destination',eve.value.To)
        
        this.service.orderdata(formdata).subscribe((data:any) => {
          
        if(data.Status=="sucess"){
          this.SpinnerService.hide('spinner-5');
          this.table_show=true;
          this.searched_data=data.Data;
          this.orderData_assign()
      
      }else{
        this.SpinnerService.hide('spinner-5');
        alert(data.Message)
      }
      })
  
      } else {
        // alert('Message');
        alert('The selected date range exceeds the allowed limit of 10 days.');
      }
    } else {
      alert('The start date must be earlier than or equal to the end date.');
    }
  
  }
  }
  change_status(){
    this.All_data=false;
  }
  change_status1(){
    this.All_data=true;
  }
  getStyle(score: number): any {
    if (score > 70) {
        return { 'color': 'green' };
    } else if (score > 40 && score <= 70) {
        return { 'color': 'blue' };
    } else {
        return { 'color': 'red' };
    }
  }
  getButtonColor(score: number): string {
  if (score == 0) {
      return 'green';
  } else if (score ==1) {
      return 'blue';
  } else if (score ==3) {
    return 'brown';
  } else if (score ==5) {
    return 'orange';
  } else {
      return 'red';
  }
  }
  Open_modal1(){
  
    $('#desklastalertModal').modal('show');
    this.plus=[];
    this.accordian_increase();
    // this.documentMasters();
    // this.vehicledriverlist();
  }
  view_info(eve,name,select,full){
    console.log(full)
     this.select=select;
     this.edit_data=eve;
     this.Driver_name=name;
     this.Document_id=eve.id;
     this.Document_name=eve.name;
     this.full_view=full;
    
     // this.current_id=id;
     $('#upload-View').modal('show');
   }
  Driver_edit(eve,name,select,indx,id){
    // 
    
    this.select=select;
    this.edit_data=eve;
    this.Driver_name=name;
    this.Document_id=eve.id;
    this.Document_name=eve.name;
    this.indx=indx;
    this.current_id=id;
    $('#upload-edit').modal('show');
  }
  vehicle_upload(eve,name,id,indx,doc){
    // this.destroyModal()
      this.select=eve;
      this.Driver_name=name;
      this.current_id=id;
      this.indx=indx;
      this.document_for=doc;
      if(this.select=='V'){
        for(var k=0;k<=this.documentMasters_list.vehicle.length;k++){
          if(this.documentMasters_list.vehicle[k]?.name==doc){
            this.Document_id=this.documentMasters_list.vehicle[k]?.id;
            this.Document_name=this.documentMasters_list.vehicle[k]?.name;
          }
        }
      }
      if(this.select=='D'){
        for(var k=0;k<=this.documentMasters_list.driver.length;k++){
          if(this.documentMasters_list.driver[k]?.name==doc){
            this.Document_id=this.documentMasters_list.driver[k]?.id;
            this.Document_name=this.documentMasters_list.driver[k]?.name;
          }
        }
      }
      this.requiresExpiryDate()
    $('#upload').modal('show');
  }
  requiresExpiryDate(): boolean {
    //    
    return !(this.document_for === 'Aadhaar Card' || this.document_for === 'Pan Card' || this.document_for === 'Photograph');
  }
  // (ngModelChange)="onDocumentTypeChange($event)"
  onDocumentTypeChange(value:any) {
  
    this.document_for = value.name;
    this.requiresExpiryDate()
    // if (this.requiresExpiryDate()) {
    //   this.edit_data.expiry_date = ''; // Ensure the field is empty if required
    // } else {
    //   this.edit_data.expiry_date = null; // Clear the expiry date if not required
    // }
  }
  
  
  documentMasters() {
    var formData = new FormData();
    formData.append('AccessToken', this.token);
    this.service.documentMasters(formData).subscribe((res: any) => {
      
      if (res.Status == 'success') {
        this.Driver_list=res.DriverList;
        this.Vehicle_list=res.VehicleList;
        this.documentMasters_list = res.DocumentType;
  
      }
    })
  }
  Get_vehicle(vehicle_id,index){
    this.SpinnerService.show('spniiner-1');
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    formData.append('vehicle_id', vehicle_id);
    this.service.vehicledetails(formData).subscribe((res: any) => {
     
      if (res.Status == "sucess") {
        console.log(res)
        this.SpinnerService.hide('spniiner-1');
        this.Vehiclefull_information[index]=res.data;
        var store:any=[];
        for (const [key, value] of Object.entries(this.Vehiclefull_information[index].documents)) {
          store.push(key);
        }
        this.info_store=store;
      
  
  
        // this.status().push(this.putNewinvoice1());
        // (this.getinvoice().push(this.putNewinvoice()))
        this.addSafetyFeature(index, 'New Safety Feature');
        const selectedVehicle = this.Vehicle_list.find(v => v.vehicle_id === vehicle_id);
     
          if (selectedVehicle) {
            const formArray = this.getinvoice();
            const formGroup = formArray.at(index) as FormGroup;
            if (formGroup) {
              
              const capacityControl = formGroup.get('Capacity');
              if (capacityControl) {
                capacityControl.setValue(this.Vehiclefull_information?.vehicle_data?.vehicle_capacity_tons);
              }
              const capacityControl1 = formGroup.get('Type');
              if (capacityControl) {
                capacityControl.setValue(this.Vehiclefull_information?.vehicle_data?.vehicle_type);
              }
            }
          }
  
          var k:any=[]
          const invoiceArray = this.getinvoice();
          const safetyFeaturesArray = (this.getinvoice().controls[index] as FormGroup).get('Capacity') as FormArray;
          safetyFeaturesArray.patchValue(this.Vehiclefull_information[index]?.vehicle_data?.vehicle_capacity_tons);
          const DriverDocument  = (this.getinvoice().controls[index] as FormGroup).get('Type') as FormArray;
        
          DriverDocument.patchValue(this.Vehiclefull_information[index]?.vehicle_data?.vehicle_type);
         
      }else{
        this.SpinnerService.hide('spniiner-1');
      }
    })
   
  }
  get_driver(driver_id,index){
    this.SpinnerService.show('spniiner-1');
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    formData.append('driver_id', driver_id);
    this.service.driverdetails(formData).subscribe((res: any) => {
      
      if (res.Status == "sucess") {
        this.SpinnerService.hide('spniiner-1');
        this.driverfull_information[index]=res.data;
        var store:any=[];
        for (const [key, value] of Object.entries(this.driverfull_information[index]?.documents)) {
          store.push(key);
        }
        this.info_store_driver=store;
      
        const selectedVehicle = this.Driver_list.find(v => v.id === driver_id);
     
          if (selectedVehicle) {
            const formArray = this.getinvoice();
            const formGroup = formArray.at(index) as FormGroup;
            if (formGroup) {
              
              const capacityControl = formGroup.get('Phone');
              if (capacityControl) {
                capacityControl.setValue(this.driverfull_information?.driver_data?.mob_no);
              }
              // const capacityControl1 = formGroup.get('Type');
              // if (capacityControl) {
              //   capacityControl.setValue(this.Vehiclefull_information?.vehicle_data?.vehicle_type);
              // }
            }
          }
          const DriverDocument  = (this.getinvoice().controls[index] as FormGroup).get('Phone') as FormArray;
        
          DriverDocument.patchValue(this.driverfull_information[index]?.driver_data?.mob_no);
          
      }else{
        this.SpinnerService.hide('spniiner-1');
      }
    })
   
  }
  onFileChange_doc(event: any) {
    if (event.target.files.length > 0) {
      const image = (event.target as HTMLInputElement).files![0];
      // Driverupload.patchValue({
        this.Dcopy= image;
      // });
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.imageURL = e.target.result;
       
      }
    }
  }
  onFileChange_doc_edit(event: any) {
    this.showIframe=false;
    if (event.target.files.length > 0) {
      const image = (event.target as HTMLInputElement).files![0];
      // Driverupload.patchValue({
        this.Dcopy_edit= image;
      // });
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.imageURL_edit = e.target.result;
      
      }
    }
  }
  uploaddriver_submit(eve:any,stauus:any){
    this.store_eve=eve;
   
    // const Issue = $("#Date-Issue").val();
    // const Expiry = $("#Date-Expiry").val();
    // if(Issue==''){
    //   this.Issue_status=true;
    // }else{
    //   this.Issue_status=false;
    // }
    // if(Expiry==''){
    //   this.Expiry_status=true;
    // }else{
    //   this.Expiry_status=false;
    // }
    // if()
  if(eve.status=='VALID'){
    // if (this.document_data.status == 'VALID') {
      var formData = new FormData();
      formData.append('AccessToken', localStorage.getItem('AccessToken')!);
      if (this.group_id !== undefined) {
        formData.append('GroupId', this.group_id);
      }
      if(this.select=='D'){
      formData.append('Category', 'driver');
      formData.append('DriverId', this.current_id);
      }
      if(this.select=='V'){
        formData.append('Category', 'vehicle');
        formData.append('VehicleId', this.current_id);
        }
     
        
      
      // if (this.show_vehicle1) {
      //   formData.append('VehicleId', this.document_data.value.DV);
      // }  
  
      formData.append('DocumentTypeId', this.Document_id);
      formData.append('DocumentTypeName', this.Document_name);
   
        formData.append('DocumentNo', eve.value.documentNumber_1);
      
     
        formData.append('IssueDate', eve.value.from_Date_1);
        formData.append('ExpiryDate', eve.value.To_Date_1);
      
      formData.append('DocumentFile', this.Dcopy);
      formData.append('Remark', eve.value.remark_1);
  
      this.service.documentAdd(formData).subscribe((res: any) => {
      
        if (res.Status == 'success') {
          this.store_eve.resetForm();
          // this.modalService.close();
          alert(res.Message);
          $('#upload').modal('hide');
  
         
          if(this.select=='D'){
            this.get_driver(this.current_id,this.indx);
            }
            if(this.select=='V'){
              this.Get_vehicle(this.current_id,this.indx);
              }
          
        } else {
          
          alert(res.Message);
        }
      })
  
    
  }
  }
  
  // uploaddriver_submit(form: NgForm, status: any) {
  //   if (form.valid) {
  //     const formData = new FormData();
  //     formData.append('AccessToken', localStorage.getItem('AccessToken')!);
  //     // Append other form data
  //     if(this.select=='D'){
  //       formData.append('Category', 'driver');
  //       formData.append('DriverId', this.current_id);
  //       }
  //       if(this.select=='V'){
  //         formData.append('Category', 'vehicle');
  //         formData.append('VehicleId', this.current_id);
  //         }
       
  //     formData.append('DocumentTypeId', this.document_for.id);
  //     formData.append('DocumentTypeName', this.document_for.name);
  //     formData.append('DocumentNo', form.value.documentNumber_1.toString());
  //     formData.append('IssueDate', form.value.from_Date_1);
  //     formData.append('ExpiryDate', form.value.To_Date_1);
  //     formData.append('DocumentFile', this.Dcopy);
  //     formData.append('Remark', form.value.remark_1);
  
  //     // Call your service method to submit the form data
  //     this.service.documentAdd(formData).subscribe((res: any) => {
  //       if (res.Status === 'success') {
  //         form.resetForm(); // Reset the form upon success
  //         // alert(res.Message);
  //         // Additional logic after successful submission
  //       } else {
  //         alert(res.Message); // Handle error case
  //       }
  //     });
  //   } else {
  //     alert('Form is invalid. Please check all fields.'); // Handle invalid form
  //   }
  // }
  removeImage() {
    this.imageURL_edit = null; // Remove the image by setting the URL to null
  }
  
  toggleSafetyFeature(idx: number, s: number) {
    const safetyFeatureControl = this.getSafetyFeatureControl(idx, s);
    safetyFeatureControl.setValue(!safetyFeatureControl.value);
  }
  getSafetyFeatureControl(idx: number, s: number): FormControl {
    return this.getSafetyFeatures(idx).at(s) as FormControl;
  }
  getSafetyFeatures(idx: number): FormArray {
    return this.getinvoice().at(idx).get('safetyFeatures') as FormArray;
  }
  updatesubmit(eve:any,stauus:any){
  
    this.store_eve=eve;
   
  if(eve.status=='VALID'){
    // if (this.document_data.status == 'VALID') {
      var formData = new FormData();
      formData.append('AccessToken', localStorage.getItem('AccessToken')!);
      
      formData.append('DocumentId', this.Document_id);
      // formData.append('DocumentTypeName', eve.value.Documenttype.name);
   
        formData.append('DocumentNo', eve.value.documentNumber);
      
     
        formData.append('IssueDate', eve.value.from_Date);
        formData.append('ExpiryDate', eve.value.To_Date);
        if(eve.value.uploadDocument==''){
         
          formData.append('DocumentFile','' );
        }else{
      formData.append('DocumentFile', this.Dcopy_edit);
    }
     formData.append('Remark', eve.value.remark);
  
      this.service.documentEdit(formData).subscribe((res: any) => {
  
        if (res.Status == 'success') {
          // this.store_eve.resetForm();
          $('#upload-edit').modal('hide');
          // $('#upload').modal('hide');
  
         
          if(this.select=='D'){
            this.get_driver(this.current_id,this.indx);
            }
            if(this.select=='V'){
              this.Get_vehicle(this.current_id,this.indx);
              }
          // this.modalService.close();
          alert(res.Message);
         
        } else {
          alert(res.Message);
        }
      })
  
    
  }
  }
  showIframe: boolean = false;
  
    toggleIframe() {
      this.showIframe = !this.showIframe;
    }
    documentChangeStatus(eve){
      if (confirm('Are you sure you want to decline this?')) {
      var formData = new FormData();
      formData.append('AccessToken', localStorage.getItem('AccessToken')!);
      
      formData.append('DocumentId', eve);
      formData.append('Status', 'delete');
   
       
      this.service.documentChangeStatus(formData).subscribe((res: any) => {
  
        if (res.Status == 'success') {
          // this.store_eve.resetForm();
          $('#upload-edit').modal('hide');
          // this.modalService.close();
          alert(res.Message);
        } else {
          alert(res.Message);
        }
      })
  
    
  
    }
  }
  selectFile(event) {
    // this.uploadfiledsk.push(event.target.files[0])
    this.uploadfiledsk=(event.target.files[0])
    // console.log("uploadfiledsk", event.target.files)
    // this.imageurl = ''
    // const file = (event.target).files[0]
    // // this.uploadfiledsk = event.target.files[0]


    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.imageurl = reader.result as string;
    // }
    // reader.readAsDataURL(file)
    // const input = event.target as HTMLInputElement;
    // if (input.files) {
    //   for (let i = 0; i < input.files.length; i++) {
        
    //     const file = input.files[i];
    //     const reader = new FileReader();
    //     reader.onload = (e: any) => {
    //       // this.imageurl.push(e.target.result);
    //     };
    //     reader.readAsDataURL(file);
    //   }
    
    


  }
  
  
    isCheckboxInvalid(index: number,formname:string): boolean {
      const invoiceFormGroup:any = this.getinvoice().at(index) as FormGroup;
      const fieldControl = invoiceFormGroup.get(formname);
      return fieldControl?.invalid && (fieldControl?.dirty || fieldControl?.touched ||this.submite);
    }
    toggleCollapse(idx: number) {
      this.isCollapsed[idx] = !this.isCollapsed[idx];
    }
  
    private initializeCollapseState() {
      this.invoicearray.controls.forEach((_, idx) => {
        this.isCollapsed[idx] = true; // Initialize all as collapsed
      });
    }
  
    addNewInvoice() {
      const newGroup = this.formBuilder.group({
        // Define your form controls here
      });
      this.invoicearray.push(newGroup);
      this.isCollapsed.push(true); // Initialize new group as collapsed
    }
    closeAllPanels() {
      this.activePanelIds = [];
      // this.plus=[] // Set active panel IDs to empty array to close all panels
    }
    isCheckboxSelected(index: number): boolean {
      return this.getinvoice().at(index).get('checkbox')?.value;
    }

    ////////////////////mehndi code ///////////////////////////////////////////////////////////////////////////////////////////////////

    getDocumentPath(item: any, docTypeId: number): string | null {
      if(item?.document?.length)
      {
        const doc = item?.document?.find((d: any) => d.doc_type_id === docTypeId);
 
        return doc ? doc.file_path : null;
      }
      return null
   }
 
   onVehicleFilter(value: any) {
     var formdata: any = new FormData();
     formdata.append('AccessToken', this.token);
     formdata.append('from_date',value?.from_date||'')
     formdata.append('to_date',value?.to_date||'')
     this.isLoadingVehicleTable=true

     console.log(value);
     
     this.service.vehicleDashboard(formdata).subscribe((res: any) => {
      this.isLoadingVehicleTable=false;

       this.vehicleDashboardData = res?.Data;
       this.vehicleTableData=this.vehicleDashboardData?.listing_data?.vehicle_data
        console.log("vehicleTableData",this.vehicleTableData);
        
       // this.vehicleDashboardData = res.Data;
       // console.log(this.fullres);
 
       // this.chart1();
       // // this.chart2()
       // this.chart3();
       // this.chart4();
       this.masterUploadTable();
     });
   }
   vehicleDashboard(){
     var formdata: any = new FormData();
     formdata.append('AccessToken', this.token);
     formdata.append('from_date','')
     formdata.append('to_date','')
     this.isqVehicleChartLoading=true;
     this.isLoadingVehicleTable=true;
     this.service.vehicleDashboard(formdata).subscribe((res: any) => {
      this.isqVehicleChartLoading=false;
      this.isLoadingVehicleTable=false;
       this.vehicleDashboardData = res?.Data;
       this.vehicleTableData=this.vehicleDashboardData?.listing_data?.vehicle_data
       this.vehicleCategory=this.vehicleDashboardData?.listing_data?.filters_name?.category
       this.vehicleMake=this.vehicleDashboardData?.listing_data?.filters_name?.make
       this.vehicleModel=this.vehicleDashboardData?.listing_data?.filters_name?.model
       this.vehicleFuelType=this.vehicleDashboardData?.listing_data?.filters_name?.vehicle_FuelType
       this.vehicleBodyType=this.vehicleDashboardData?.listing_data?.filters_name?.vehicle_body_type
       this.vehicleCapacityType=this.vehicleDashboardData?.listing_data?.filters_name?.vehicle_capacity_data
       this.vehicleDocumentType=this.vehicleDashboardData?.listing_data?.filters_name?.vehicle_DocType
       console.log(this.vehicleTableData,"aman");
       console.log(this.vehicleModel)
       this.chart1();
       // this.chart2()
       this.chart3();
       this.chart4();
       this.masterUploadTable();
     });
   }
   qtoggleVehcileAllSelection() {
     this.qallVehicleSelected = !this.qallVehicleSelected;
     if (this.qallVehicleSelected) {
       this.selectVehicleIds = [];
       console.log(this.vehicleTableData);
       
       this.vehicleTableData?.forEach((item, index) => {
           this.selectVehicleIds.push(item?.vehicle?.id);
       });
     } else {
       this.selectVehicleIds = [];
     }
     console.log('selected', this.selectVehicleIds);
   }
 
   qtoggleVehicleSelection(itemId: any) {
     const index = this.selectVehicleIds.indexOf(itemId);
     if (index > -1) {
       this.selectVehicleIds.splice(index, 1);
     } else {
       this.selectVehicleIds.push(itemId);
     }
     this.qallVehicleSelected = this.selectVehicleIds.length === this.vehicleTableData?.length;
     console.log('selected', JSON.stringify(this.selectVehicleIds));
   }
   isVehicleSelected(itemId: any): boolean {
     return this.selectVehicleIds.includes(itemId);
   }
 
   updateVehicleStatus(status: string,values) {
    let vehicleID= this.selectVehicleIds.reduce((acc, id, index) => {
      acc[index] = String(id);
      return acc;
    }, {})
    const formData=new FormData()
    formData.append("AccessToken",this.token)
    formData.append('action',status)
    formData.append('vehicle_id',JSON.stringify(vehicleID))
    console.log(formData);
    if (confirm(`Do you want to ${status}?`)) {
       this.isLoadingVehicleTable=true
    this.service.vehicleUpdateStatus(formData).subscribe((res: any) => {
     console.log(res);
    if(res.Status==="Success")
    {
      this.selectVehicleIds=[]
      this.onVehicleFilter(values)
      alert(res.Message)
    }
    else{
      if(res.Status==='Fail')
      {
        alert('error in updating status')
        this.isLoadingVehicleTable=false
      }
    }
    },
    error => {
      console.error('Error:', error);
      // Handle the error accordingly
      this.isLoadingVehicleTable=false
    });
  }
  else{
    console.log("cancel");
    
  }
  }
   chart1() {
     // var cons=this.SummaryData?.vehicleStatus;
     // console.log("Cons", cons);
     // alert("chart1")
     // let chartDom = document.getElementById('myChart1');
     // let echart = echarts.init(chartDom, {
     //     renderer: 'canvas',
     //     useDirtyRect: false
     // });
     let chartDom: any = document.getElementById('consSt');
     //  var echart = echarts.init(chartDom);
     chartDom.style.height = '150px'; // Specify units (e.g., pixels)
     chartDom.style.width = '150px';
 
     var echart = echarts.init(chartDom, {
       renderer: 'canvas',
       useDirtyRect: false,
     });
     var option;
 
     option = {
       title: {
         // text: 'Donut Chart',
         // subtext: 'Living Expenses in Shenzhen'
       },
       tooltip: {
         trigger: 'item',
         formatter: '{a} <br/>{b}: {c} ({d}%)',
       },
       legend: {
         show: false,
         orient: 'horizontal',
         left: 'left',
         // top:60,
         bottom: -6,
         textStyle: {
           fontSize: 10,
           fontweight: 'bold',
           // lineHeight: 10, // Adjust the line height if necessary
           // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
         },
         itemHeight: 8,
         itemWidth: 8,
         // data: ['Running', 'Stop','In-Active','Non GPS'],
         layout: 'horizontal',
         // align: 'right',
         // verticalAlign: 'bottom',
         borderWidth: 0,
         width: '100%',
       },
       series: [
         {
           name: 'Shipment',
           type: 'pie',
           radius: ['40%', '70%'],
           avoidLabelOverlap: false,
           color: ['rgb(239, 91, 11)', '#1D4380', 'red', 'grey'],
           label: {
             show: false,
             // position: 'center'
             position: 'inside',
             fontSize: '15',
             // rotate:'145',
             color: 'white',
             formatter: '{c}', // display value
           },
           emphasis: {
             label: {
               show: true,
               fontSize: '15',
               color: 'white',
               // rotate:'145',
               fontWeight: 'bold',
             },
           },
           labelLine: {
             show: false,
           },
           data: [
             // { value:cons?.Good , name: 'Good' },
             // { value:cons?.KpiViolation, name: 'KPI Violation' },
             // { value: cons?.InActive, name: 'In-Active' },
             // { value: cons?.NoGps, name: 'Non GPS' },
             {
               value: this.vehicleDashboardData?.vehicle?.existing_vehicle,
               name: 'Existing Transporter',
             },
             {
               value: this.vehicleDashboardData?.vehicle?.new_vehicle,
               name: 'New Transporter',
             },
             // { value: 30, name: 'In-Active'},
             // { value:55, name: 'Non GPS' },
           ],
         },
         {
           type: 'pie',
           radius: ['0%', '40%'],
           silent: true,
           color: 'white',
 
           label: {
             show: true,
             position: 'center',
             color: '#1D4380',
 
             formatter: function (params) {
               var total = 0;
               for (var i = 0; i < option.series[0].data.length; i++) {
                 total += option.series[0].data[i].value;
               }
               return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
               // return  total;
             },
             fontSize: 16,
             fontWeight: 'bold',
           },
           data: [{ value: 1, name: 'Total' }],
         },
       ],
     };
 
     option && echart.setOption(option);
 
     //   echart.on('click',  (params) => {
     //     if (params.componentType === 'series') {
     //         // Access the clicked data
     //         var name = params.name;
     //         var value = params.value;
 
     //         console.log('You clicked on', name, 'with value', value);
 
     //         if(name=='Good')
     //           {
     //             this.consSTtAct('ConsignmentStatus','GoodTrips');
     //           }
     //        else   if(name=='KPI Violation')
     //             {
     //               this.consSTtAct('ConsignmentStatus','KPIViolation');
     //             }
     //             else   if(name=='In-Active')
     //               {
     //                 this.consSTtAct('ConsignmentStatus','InActive');
     //               }
     //               else   if(name=='Non GPS')
     //                 {
     //                   this.consSTtAct('ConsignmentStatus','NonGps');
     //                 }
 
     //         // Perform actions based on the clicked segment
     //         // alert('You clicked on ' + name + ' with value ' + value);
     //     }
     // });
   }
 
   chart2() {
     // var cons=this.SummaryData?.customer
 
     // alert("chart1")
     // let chartDom = document.getElementById('myChart1');
     // let echart = echarts.init(chartDom, {
     //     renderer: 'canvas',
     //     useDirtyRect: false
     // });
     let chartDom: any = document.getElementById('tripSt');
     //  var echart = echarts.init(chartDom);
     chartDom.style.height = '150px'; // Specify units (e.g., pixels)
     chartDom.style.width = '150px';
 
     var echart = echarts.init(chartDom, {
       renderer: 'canvas',
       useDirtyRect: false,
     });
     var option;
 
     option = {
       title: {
         // text: 'Donut Chart',
         // subtext: 'Living Expenses in Shenzhen'
       },
       tooltip: {
         trigger: 'item',
         formatter: '{a} <br/>{b}: {c} ({d}%)',
       },
       legend: {
         show: false,
         orient: 'horizontal',
         left: 'left',
         // top:60,
         bottom: -6,
         textStyle: {
           fontSize: 10,
           fontweight: 'bold',
           // lineHeight: 10, // Adjust the line height if necessary
           // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
         },
         itemHeight: 8,
         itemWidth: 8,
 
         // data: ['Existing Client', 'New Client'],
         layout: 'horizontal',
         // align: 'right',
         // verticalAlign: 'bottom',
         borderWidth: 0,
         width: '100%',
         // height: 25,
       },
       series: [
         {
           name: 'Shipment',
           type: 'pie',
           radius: ['30%', '70%'],
           avoidLabelOverlap: false,
           color: ['#EC6625', '#1D4380', '#613704'],
           label: {
             show: false,
             // position: 'center'
             position: 'inside',
             fontSize: '15',
             // rotate:'145',
             color: 'white',
             formatter: '{c}', // display value
           },
           emphasis: {
             label: {
               show: true,
               fontSize: '15',
               color: 'white',
               // rotate:'145',
               fontWeight: 'bold',
             },
           },
           labelLine: {
             show: false,
           },
           data: [
             //
 
             // { value:cons?.PartialDelivered, name: 'Partial Delivered' },
             // { value:cons?.Delayed, name: 'Delayed' },
             // { value: cons?.InActive, name: 'In-Active' },
             // { value: cons?.NoGps, name: 'Non GPS' },
             { value:this.vehicleDashboardData?.body_type?.existing_vehicle, name: 'Heavy Duty' },
             { value: 40, name: 'Medium Duty ' },
             { value: 30, name: 'Light Duty' },
           ],
         },
         {
           type: 'pie',
           radius: ['0%', '40%'],
           silent: true,
           color: 'white',
 
           label: {
             show: true,
             position: 'center',
             color: '#1D4380',
 
             formatter: function (params) {
               var total = 0;
               for (var i = 0; i < option.series[0].data.length; i++) {
                 total += option.series[0].data[i].value;
               }
               return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
               // return  total;
             },
             fontSize: 16,
             fontWeight: 'bold',
           },
           data: [{ value: 1, name: 'Total' }],
         },
       ],
     };
 
     option && echart.setOption(option);
     //   echart.on('click',  (params) => {
     // //     if (params.componentType === 'series') {
     // //         // Access the clicked data
     // //         var name = params.name;
     // //         var value = params.value;
 
     // //         console.log('You clicked on', name, 'with value', value);
 
     // //         if(name=='Partial Delivered')
     // //           {
     // //             this.tripSTtAct('TripStatus','PartialDelivered')
     // //           }
     // //        else   if(name=='Delayed')
     // //             {
     // //               this.tripSTtAct('TripStatus','Delay');
     // //             }
     // //             else   if(name=='In-Active')
     // //               {
     // //                 this.tripSTtAct('TripStatus','InActive');
     // //               }
     // //               else   if(name=='Non GPS')
     // //                 {
     // //                   this.tripSTtAct('TripStatus','NonGps');
     // //                 }
 
     // //         // Perform actions based on the clicked segment
     // //         // alert('You clicked on ' + name + ' with value ' + value);
     // //     }
     // // });
   }
 
   chart3() {
     // var cons=this.SummaryData?.Iot
 
     // alert("chart1")
     // let chartDom = document.getElementById('myChart1');
     // let echart = echarts.init(chartDom, {
     //     renderer: 'canvas',
     //     useDirtyRect: false
     // });
     let chartDom: any = document.getElementById('deliverySt');
     //  var echart = echarts.init(chartDom);
     chartDom.style.height = '150px'; // Specify units (e.g., pixels)
     chartDom.style.width = '150px';
 
     var echart = echarts.init(chartDom, {
       renderer: 'canvas',
       useDirtyRect: false,
     });
     var option;
 
     option = {
       title: {
         // text: 'Donut Chart',
         // subtext: 'Living Expenses in Shenzhen'
       },
       tooltip: {
         trigger: 'item',
         formatter: '{a} <br/>{b}: {c} ({d}%)',
       },
       legend: {
         show: false,
         orient: 'horizontal',
         left: 'left',
         // top:60,
         bottom: -6,
         textStyle: {
           fontSize: 10,
           fontweight: 'bold',
           // lineHeight: 10, // Adjust the line height if necessary
           // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
         },
         itemHeight: 8,
         itemWidth: 8,
         // data: ['GPS', 'E-Lock','Fuel Sensor'],
         layout: 'horizontal',
         // align: 'right',
         // verticalAlign: 'bottom',
         borderWidth: 0,
         width: '100%',
       },
       series: [
         {
           name: 'Shipment',
           type: 'pie',
           radius: ['30%', '70%'],
           avoidLabelOverlap: false,
           color: ['#EC6625', '#1D4380', 'rgb(253, 195, 5)'],
           label: {
             show: false,
             // position: 'center'
             position: 'inside',
             fontSize: '15',
             // rotate:'145',
             color: 'white',
             formatter: '{c}', // display value
           },
           emphasis: {
             label: {
               show: true,
               fontSize: '15',
               color: 'white',
               // rotate:'145',
               fontWeight: 'bold',
             },
           },
           labelLine: {
             show: false,
           },
           data: [
             // { value:cons?.PartialDelivered, name: 'GPS' },
             // { value:cons?.NonEpod, name: 'E-Lock'},
             // { value: cons?.Epod, name: 'Fuel Sensor'},
             { value:this.vehicleDashboardData?.body_type?.open_body, name: 'Open Body' },
             {
               value: this.vehicleDashboardData?.body_type?.closed_body,
               name: 'Closed Body',
             },
             { value: this.vehicleDashboardData?.body_type?.container, name: 'Container' },
           ],
         },
         {
           type: 'pie',
           radius: ['0%', '40%'],
           silent: true,
           color: 'white',
 
           label: {
             show: true,
             position: 'center',
             color: '#1D4380',
 
             formatter: function (params) {
               var total = 0;
               for (var i = 0; i < option.series[0].data.length; i++) {
                 total += option.series[0].data[i].value;
               }
               return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
               // return  total;
             },
             fontSize: 16,
             fontWeight: 'bold',
           },
           data: [{ value: 1, name: 'Total' }],
         },
       ],
     };
 
     option && echart.setOption(option);
     //   echart.on('click',  (params) => {
     //     if (params.componentType === 'series') {
     //         // Access the clicked data
     //         var name = params.name;
     //         var value = params.value;
 
     //         console.log('You clicked on', name, 'with value', value);
 
     //         if(name=='Partial Delivered')
     //           {
     //             this.deliverySTtAct('DeliveryStatus','PartialDelivered')
     //           }
     //        else   if(name=='Non-EPOD')
     //             {
     //               this.deliverySTtAct('DeliveryStatus','NonEpod');
     //             }
     //             else   if(name=='EPOD')
     //               {
     //                 this.deliverySTtAct('DeliveryStatus','Epod');
     //               }
     //               else   if(name=='Geofence')
     //                 {
     //                   this.deliverySTtAct('DeliveryStatus','Geofence');
     //                 }
 
     //         // Perform actions based on the clicked segment
     //         // alert('You clicked on ' + name + ' with value ' + value);
     //     }
     // });
   }
 
   chart4() {
     // var cons=this.SummaryData?.VehicleStatus
     // alert("chart1")
     // let chartDom = document.getElementById('myChart1');
     // let echart = echarts.init(chartDom, {
     //     renderer: 'canvas',
     //     useDirtyRect: false
     // });
     let chartDom: any = document.getElementById('vehicleSt');
     //  var echart = echarts.init(chartDom);
     chartDom.style.height = '150px'; // Specify units (e.g., pixels)
     chartDom.style.width = '150px';
 
     var echart = echarts.init(chartDom, {
       renderer: 'canvas',
       useDirtyRect: false,
     });
     var option;
 
     option = {
       title: {
         // text: 'Donut Chart',
         // subtext: 'Living Expenses in Shenzhen'
       },
       tooltip: {
         trigger: 'item',
         formatter: '{a} <br/>{b}: {c} ({d}%)',
       },
       legend: {
         display: false,
         show: false,
         orient: 'horizontal',
         left: 'left',
         // top:60,
         bottom: -6,
         textStyle: {
           fontSize: 10,
           fontweight: 'bold',
           // lineHeight: 10, // Adjust the line height if necessary
           // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
         },
         itemHeight: 8,
         itemWidth: 8,
         // data: ['Active', 'Tamper','In-Active','Non-GPS'],
         layout: 'horizontal',
         // align: 'right',
         // verticalAlign: 'bottom',
         borderWidth: 0,
         width: '100%',
       },
       series: [
         {
           name: 'Shipment',
           type: 'pie',
           radius: ['30%', '70%'],
           avoidLabelOverlap: false,
           color: ['#EC6625', '#1D4380', '#613704'],
           label: {
             show: false,
             // position: 'center'
             position: 'inside',
             fontSize: '15',
             // rotate:'145',
             color: 'white',
             formatter: '{c}', // display value
           },
           emphasis: {
             label: {
               show: true,
               fontSize: '15',
               color: 'white',
               // rotate:'145',
               fontWeight: 'bold',
             },
           },
           labelLine: {
             show: false,
           },
           data: [
             //
             // { value: this.trip_status.delayed, name: 'Delayed' },
             // { value: this.trip_status.without_gps, name: 'W/O GPS' },
             // { value: 0, name: 'No Data' },
             {
               value: this.vehicleDashboardData?.vehicle_rating?.less_than_two,
               name: 'Less Than 2',
             },
             {
               value: this.vehicleDashboardData?.vehicle_rating?.two_to_four,
               name: '2 TO 4',
             },
             {
               value: this.vehicleDashboardData?.vehicle_rating?.more_than_four,
               name: 'Less Than 4',
             },
             // { value: 6, name: 'Non-GPS' },
           ],
         },
         {
           type: 'pie',
           radius: ['0%', '40%'],
           silent: true,
           color: 'white',
 
           label: {
             show: true,
             position: 'center',
             color: '#1D4380',
 
             formatter: function (params) {
               var total = 0;
               for (var i = 0; i < option.series[0].data.length; i++) {
                 total += option.series[0].data[i].value;
               }
               return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
               // return  total;
             },
             fontSize: 16,
             fontWeight: 'bold',
           },
           data: [{ value: 1, name: 'Total' }],
         },
       ],
     };
 
     option && echart.setOption(option);
     //   echart.on('click',  (params) => {
     //     if (params.componentType === 'series') {
     //         // Access the clicked data
     //         var name = params.name;
     //         var value = params.value;
 
     //         console.log('You clicked on', name, 'with value', value);
 
     //         if(name=='Active')
     //           {
     //             this.vehicleStAct('VehicleStatus','Active')
     //           }
     //        else   if(name=='Non-GPS')
     //             {
     //               this.vehicleStAct('VehicleStatus','NonGps');
     //             }
     //             else   if(name=='In-Active')
     //               {
     //                 this.vehicleStAct('VehicleStatus','InActive');
     //               }
     //               else   if(name=='Tamper')
     //                 {
     //                   this.vehicleStAct('VehicleStatus','Tamper');
     //                 }
 
     //         // Perform actions based on the clicked segment
     //         // alert('You clicked on ' + name + ' with value ' + value);
     //     }
     // });
   }
   
   chartD1() {
     // var cons=this.SummaryData?.vehicleStatus;
     // console.log("Cons", cons);
     // alert("chart1")
     // let chartDom = document.getElementById('myChart1');
     // let echart = echarts.init(chartDom, {
     //     renderer: 'canvas',
     //     useDirtyRect: false
     // });
     let chartDom: any = document.getElementById('DconsSt');
     //  var echart = echarts.init(chartDom);
     chartDom.style.height = '150px'; // Specify units (e.g., pixels)
     chartDom.style.width = '150px';
 
     var echart = echarts.init(chartDom, {
       renderer: 'canvas',
       useDirtyRect: false,
     });
     var option;
 
     option = {
       title: {
         // text: 'Donut Chart',
         // subtext: 'Living Expenses in Shenzhen'
       },
       tooltip: {
         trigger: 'item',
         formatter: '{a} <br/>{b}: {c} ({d}%)',
       },
       legend: {
         show: false,
         orient: 'horizontal',
         left: 'left',
         // top:60,
         bottom: -6,
         textStyle: {
           fontSize: 10,
           fontweight: 'bold',
           // lineHeight: 10, // Adjust the line height if necessary
           // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
         },
         itemHeight: 8,
         itemWidth: 8,
         // data: ['Running', 'Stop','In-Active','Non GPS'],
         layout: 'horizontal',
         // align: 'right',
         // verticalAlign: 'bottom',
         borderWidth: 0,
         // width: '100%',
       },
       series: [
         {
           name: 'Shipment',
           type: 'pie',
           radius: ['40%', '70%'],
           avoidLabelOverlap: false,
           color: ['rgb(239, 91, 11)', '#1D4380', 'red', 'grey'],
           label: {
             show: false,
             // position: 'center'
             position: 'inside',
             fontSize: '15',
             // rotate:'145',
             color: 'white',
             formatter: '{c}', // display value
           },
           emphasis: {
             label: {
               show: true,
               fontSize: '15',
               color: 'white',
               // rotate:'145',
               fontWeight: 'bold',
             },
           },
           labelLine: {
             show: false,
           },
           data: [
             // { value:cons?.Good , name: 'Good' },
             // { value:cons?.KpiViolation, name: 'KPI Violation' },
             // { value: cons?.InActive, name: 'In-Active' },
             // { value: cons?.NoGps, name: 'Non GPS' },
             { value: this.driverDashboardData?.Driver_Enrollment?.Authenticated_Drivers, name: 'Authenticated Drivers' },
             { value: this.driverDashboardData?.Driver_Enrollment?.Enrolled_Drivers, name: 'Enrolled Drivers' },
             // { value: 30, name: 'In-Active'},
             // { value:55, name: 'Non GPS' },
           ],
         },
         {
           type: 'pie',
           radius: ['0%', '40%'],
           silent: true,
           color: 'white',
 
           label: {
             show: true,
             position: 'center',
             color: '#1D4380',
 
             formatter: function (params) {
               var total = 0;
               for (var i = 0; i < option.series[0].data.length; i++) {
                 total += option.series[0].data[i].value;
               }
               return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
               // return  total;
             },
             fontSize: 16,
             fontWeight: 'bold',
           },
           data: [{ value: 1, name: 'Total' }],
         },
       ],
     };
 
     option && echart.setOption(option);
 
     //   echart.on('click',  (params) => {
     //     if (params.componentType === 'series') {
     //         // Access the clicked data
     //         var name = params.name;
     //         var value = params.value;
 
     //         console.log('You clicked on', name, 'with value', value);
 
     //         if(name=='Good')
     //           {
     //             this.consSTtAct('ConsignmentStatus','GoodTrips');
     //           }
     //        else   if(name=='KPI Violation')
     //             {
     //               this.consSTtAct('ConsignmentStatus','KPIViolation');
     //             }
     //             else   if(name=='In-Active')
     //               {
     //                 this.consSTtAct('ConsignmentStatus','InActive');
     //               }
     //               else   if(name=='Non GPS')
     //                 {
     //                   this.consSTtAct('ConsignmentStatus','NonGps');
     //                 }
 
     //         // Perform actions based on the clicked segment
     //         // alert('You clicked on ' + name + ' with value ' + value);
     //     }
     // });
   }
 
   chartD2() {
     // var cons=this.SummaryData?.customer
 
     // alert("chart1")
     // let chartDom = document.getElementById('myChart1');
     // let echart = echarts.init(chartDom, {
     //     renderer: 'canvas',
     //     useDirtyRect: false
     // });
     let chartDom: any = document.getElementById('DtripSt');
     //  var echart = echarts.init(chartDom);
     chartDom.style.height = '150px'; // Specify units (e.g., pixels)
     chartDom.style.width = '150px';
 
     var echart = echarts.init(chartDom, {
       renderer: 'canvas',
       useDirtyRect: false,
     });
     var option;
 
     option = {
       title: {
         // text: 'Donut Chart',
         // subtext: 'Living Expenses in Shenzhen'
       },
       tooltip: {
         trigger: 'item',
         formatter: '{a} <br/>{b}: {c} ({d}%)',
       },
       legend: {
         show: false,
         orient: 'horizontal',
         left: 'left',
         // top:60,
         bottom: -6,
         textStyle: {
           fontSize: 10,
           fontweight: 'bold',
           // lineHeight: 10, // Adjust the line height if necessary
           // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
         },
         itemHeight: 8,
         itemWidth: 8,
 
         // data: ['Existing Client', 'New Client'],
         layout: 'horizontal',
         // align: 'right',
         // verticalAlign: 'bottom',
         borderWidth: 0,
         width: '100%',
         // height: 25,
       },
       series: [
         {
           name: 'Shipment',
           type: 'pie',
           radius: ['30%', '70%'],
           avoidLabelOverlap: false,
           color: ['#EC6625', '#1D4380', '#613704'],
           label: {
             show: false,
             // position: 'center'
             position: 'inside',
             fontSize: '15',
             // rotate:'145',
             color: 'white',
             formatter: '{c}', // display value
           },
           emphasis: {
             label: {
               show: true,
               fontSize: '15',
               color: 'white',
               // rotate:'145',
               fontWeight: 'bold',
             },
           },
           labelLine: {
             show: false,
           },
           data: [
             //
 
             // { value:cons?.PartialDelivered, name: 'Partial Delivered' },
             // { value:cons?.Delayed, name: 'Delayed' },
             // { value: cons?.InActive, name: 'In-Active' },
             // { value: cons?.NoGps, name: 'Non GPS' },
             { value: this.driverDashboardData?.Vehicle_Types?.Heavy_Duty, name: 'Heavy Duty' },
             { value: this.driverDashboardData?.Vehicle_Types?.Medium_Duty, name: 'Medium Duty ' },
             { value: this.driverDashboardData?.Vehicle_Types?.Light_Duty, name: 'Light Duty' },
           ],
         },
         {
           type: 'pie',
           radius: ['0%', '40%'],
           silent: true,
           color: 'white',
 
           label: {
             show: true,
             position: 'center',
             color: '#1D4380',
 
             formatter: function (params) {
               var total = 0;
               for (var i = 0; i < option.series[0].data.length; i++) {
                 total += option.series[0].data[i].value;
               }
               return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
               // return  total;
             },
             fontSize: 16,
             fontWeight: 'bold',
           },
           data: [{ value: 1, name: 'Total' }],
         },
       ],
     };
 
     option && echart.setOption(option);
     //   echart.on('click',  (params) => {
     // //     if (params.componentType === 'series') {
     // //         // Access the clicked data
     // //         var name = params.name;
     // //         var value = params.value;
 
     // //         console.log('You clicked on', name, 'with value', value);
 
     // //         if(name=='Partial Delivered')
     // //           {
     // //             this.tripSTtAct('TripStatus','PartialDelivered')
     // //           }
     // //        else   if(name=='Delayed')
     // //             {
     // //               this.tripSTtAct('TripStatus','Delay');
     // //             }
     // //             else   if(name=='In-Active')
     // //               {
     // //                 this.tripSTtAct('TripStatus','InActive');
     // //               }
     // //               else   if(name=='Non GPS')
     // //                 {
     // //                   this.tripSTtAct('TripStatus','NonGps');
     // //                 }
 
     // //         // Perform actions based on the clicked segment
     // //         // alert('You clicked on ' + name + ' with value ' + value);
     // //     }
     // // });
   }
 
   chartD3() {
     // var cons=this.SummaryData?.Iot
 
     // alert("chart1")
     // let chartDom = document.getElementById('myChart1');
     // let echart = echarts.init(chartDom, {
     //     renderer: 'canvas',
     //     useDirtyRect: false
     // });
     let chartDom: any = document.getElementById('DdeliverySt');
     //  var echart = echarts.init(chartDom);
     chartDom.style.height = '150px'; // Specify units (e.g., pixels)
     chartDom.style.width = '150px';
 
     var echart = echarts.init(chartDom, {
       renderer: 'canvas',
       useDirtyRect: false,
     });
     var option;
 
     option = {
       title: {
         // text: 'Donut Chart',
         // subtext: 'Living Expenses in Shenzhen'
       },
       tooltip: {
         trigger: 'item',
         formatter: '{a} <br/>{b}: {c} ({d}%)',
       },
       legend: {
         show: false,
         orient: 'horizontal',
         left: 'left',
         // top:60,
         bottom: -6,
         textStyle: {
           fontSize: 10,
           fontweight: 'bold',
           // lineHeight: 10, // Adjust the line height if necessary
           // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
         },
         itemHeight: 8,
         itemWidth: 8,
         // data: ['GPS', 'E-Lock','Fuel Sensor'],
         layout: 'horizontal',
         // align: 'right',
         // verticalAlign: 'bottom',
         borderWidth: 0,
         width: '100%',
       },
       series: [
         {
           name: 'Shipment',
           type: 'pie',
           radius: ['30%', '70%'],
           avoidLabelOverlap: false,
           color: ['#EC6625', '#1D4380', 'rgb(253, 195, 5)'],
           label: {
             show: false,
             // position: 'center'
             position: 'inside',
             fontSize: '15',
             // rotate:'145',
             color: 'white',
             formatter: '{c}', // display value
           },
           emphasis: {
             label: {
               show: true,
               fontSize: '15',
               color: 'white',
               // rotate:'145',
               fontWeight: 'bold',
             },
           },
           labelLine: {
             show: false,
           },
           data: [
             // { value:cons?.PartialDelivered, name: 'GPS' },
             // { value:cons?.NonEpod, name: 'E-Lock'},
             // { value: cons?.Epod, name: 'Fuel Sensor'},
             { value: this.driverDashboardData?.Driver_Experience?.Less_than_5_yrs, name: 'Less than 5 years' },
             { value: this.driverDashboardData?.Driver_Experience?.Between_5_to_10_yrs, name: 'Between 5 to 10 years' },
             { value: this.driverDashboardData?.Driver_Experience?.More_than_10_yrs, name: 'More than 10 years' },
           ],
         },
         {
           type: 'pie',
           radius: ['0%', '40%'],
           silent: true,
           color: 'white',
 
           label: {
             show: true,
             position: 'center',
             color: '#1D4380',
 
             formatter: function (params) {
               var total = 0;
               for (var i = 0; i < option.series[0].data.length; i++) {
                 total += option.series[0].data[i].value;
               }
               return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
               // return  total;
             },
             fontSize: 16,
             fontWeight: 'bold',
           },
           data: [{ value: 1, name: 'Total' }],
         },
       ],
     };
 
     option && echart.setOption(option);
     //   echart.on('click',  (params) => {
     //     if (params.componentType === 'series') {
     //         // Access the clicked data
     //         var name = params.name;
     //         var value = params.value;
 
     //         console.log('You clicked on', name, 'with value', value);
 
     //         if(name=='Partial Delivered')
     //           {
     //             this.deliverySTtAct('DeliveryStatus','PartialDelivered')
     //           }
     //        else   if(name=='Non-EPOD')
     //             {
     //               this.deliverySTtAct('DeliveryStatus','NonEpod');
     //             }
     //             else   if(name=='EPOD')
     //               {
     //                 this.deliverySTtAct('DeliveryStatus','Epod');
     //               }
     //               else   if(name=='Geofence')
     //                 {
     //                   this.deliverySTtAct('DeliveryStatus','Geofence');
     //                 }
 
     //         // Perform actions based on the clicked segment
     //         // alert('You clicked on ' + name + ' with value ' + value);
     //     }
     // });
   }
 
   chartD4() {
     // var cons=this.SummaryData?.VehicleStatus
     // alert("chart1")
     // let chartDom = document.getElementById('myChart1');
     // let echart = echarts.init(chartDom, {
     //     renderer: 'canvas',
     //     useDirtyRect: false
     // });
     let chartDom: any = document.getElementById('DvehicleSt');
     //  var echart = echarts.init(chartDom);
     chartDom.style.height = '150px'; // Specify units (e.g., pixels)
     chartDom.style.width = '150px';
 
     var echart = echarts.init(chartDom, {
       renderer: 'canvas',
       useDirtyRect: false,
     });
     var option;
 
     option = {
       title: {
         // text: 'Donut Chart',
         // subtext: 'Living Expenses in Shenzhen'
       },
       tooltip: {
         trigger: 'item',
         formatter: '{a} <br/>{b}: {c} ({d}%)',
       },
       legend: {
         display: false,
         show: false,
         orient: 'horizontal',
         left: 'left',
         // top:60,
         bottom: -6,
         textStyle: {
           fontSize: 10,
           fontweight: 'bold',
           // lineHeight: 10, // Adjust the line height if necessary
           // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
         },
         itemHeight: 8,
         itemWidth: 8,
         // data: ['Active', 'Tamper','In-Active','Non-GPS'],
         layout: 'horizontal',
         // align: 'right',
         // verticalAlign: 'bottom',
         borderWidth: 0,
         width: '100%',
       },
       series: [
         {
           name: 'Shipment',
           type: 'pie',
           radius: ['30%', '70%'],
           avoidLabelOverlap: false,
           color: ['#EC6625', '#1D4380', '#613704'],
           label: {
             show: false,
             // position: 'center'
             position: 'inside',
             fontSize: '15',
             // rotate:'145',
             color: 'white',
             formatter: '{c}', // display value
           },
           emphasis: {
             label: {
               show: true,
               fontSize: '15',
               color: 'white',
               // rotate:'145',
               fontWeight: 'bold',
             },
           },
           labelLine: {
             show: false,
           },
           data: [
             //
             // { value: this.trip_status.delayed, name: 'Delayed' },
             // { value: this.trip_status.without_gps, name: 'W/O GPS' },
             // { value: 0, name: 'No Data' },
             { value: this.driverDashboardData?.Driver_Rating?.Less_than_2, name: 'Less Than 2' },
             { value: this.driverDashboardData?.Driver_Rating?.Between_2_to_4, name: '2 TO 4' },
             { value: this.driverDashboardData?.Driver_Rating?.More_than_4, name: 'More Than 4' },
             // { value: 6, name: 'Non-GPS' },
           ],
         },
         {
           type: 'pie',
           radius: ['0%', '40%'],
           silent: true,
           color: 'white',
 
           label: {
             show: true,
             position: 'center',
             color: '#1D4380',
 
             formatter: function (params) {
               var total = 0;
               for (var i = 0; i < option.series[0].data.length; i++) {
                 total += option.series[0].data[i].value;
               }
               return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
               // return  total;
             },
             fontSize: 16,
             fontWeight: 'bold',
           },
           data: [{ value: 1, name: 'Total' }],
         },
       ],
     };
 
     option && echart.setOption(option);
     //   echart.on('click',  (params) => {
     //     if (params.componentType === 'series') {
     //         // Access the clicked data
     //         var name = params.name;
     //         var value = params.value;
 
     //         console.log('You clicked on', name, 'with value', value);
 
     //         if(name=='Active')
     //           {
     //             this.vehicleStAct('VehicleStatus','Active')
     //           }
     //        else   if(name=='Non-GPS')
     //             {
     //               this.vehicleStAct('VehicleStatus','NonGps');
     //             }
     //             else   if(name=='In-Active')
     //               {
     //                 this.vehicleStAct('VehicleStatus','InActive');
     //               }
     //               else   if(name=='Tamper')
     //                 {
     //                   this.vehicleStAct('VehicleStatus','Tamper');
     //                 }
 
     //         // Perform actions based on the clicked segment
     //         // alert('You clicked on ' + name + ' with value ' + value);
     //     }
     // });
   }
 
   scrollButtonB() {
     // this.scrollFlag=true
     window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
   }
   ////////////////////
   masterUploadTable2() {
     var tbl = $('#DmasterUpload');
     var table = $('#DmasterUpload').DataTable();
     table.clear()
     table.destroy();
     // table.draw()
     // $('#masterUpload').DataTable().clear;
     // if(datatable.length!=)
     // console.log("table length",datatable.length)
     //  $('#masterUpload tbody').empty();
 
     $(document).ready(function () {
       $('#DmasterUpload').DataTable({
         language: {
           search: '',
           searchPlaceholder: 'Search',
         },
         pageLength: 10,
         fixedHeader: true,
         // scrollX: true,
         scrollY: '450px',
         scrollCollapse: true,
         paging: true,
         scrollX: true,
         destroy: true,
         responsive: true,
 
         //   fixedColumns:   {
         //     leftColumns: 11,
         //     select: true,
 
         //     // rightColumns: 5
         // },
 
         order: [],
         dom: '<"html5buttons"B>lTfgitp',
         columnDefs: [{ targets: 'no-sort', orderable: false }],
 
         buttons: [
           {
             extend: 'csv',
             footer: true,
             autoClose: 'true',
             titleAttr: 'Download csv file',
 
             className: 'datatablecsv-btn fa fa-file-text-o ',
             text: '',
             tag: 'span',
 
             exportOptions: {
               columns: ':visible',
             },
             title: 'dashboard_repor',
           },
           {
             extend: 'pdf',
             footer: true,
             orientation: 'landscape',
             pageSize: 'LEGAL',
 
             autoClose: 'true',
 
             titleAttr: 'Download Pdf file',
             tag: 'span',
 
             className: 'datatablepdf-btn fa fa-file-pdf-o ',
             text: '',
             // customize: function (doc) {
             //   var colCount = new Array();
             //   $(tbl)
             //     .find('tbody tr:first-child td')
             //     .each(() => {
             //       if ($(this).attr('colspan')) {
             //         for (var i = 1; i <= $(this).attr('colspan'); i++) {
             //           colCount.push('*');
             //         }
             //       } else {
             //         colCount.push('*');
             //       }
             //     });
             //   doc.content[1].table.widths = colCount;
             // },
 
             exportOptions: {
               columns: ':visible',
               //  columns: [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 ]
             },
             title: 'dashboard_repor',
           },
           {
             extend: 'copy',
             footer: true,
             titleAttr: ' Copy  file',
 
             tag: 'span',
 
             className: 'datatablecopy-btn fa fa-copy ',
             text: '',
             orientation: 'landscape',
             pageSize: 'LEGAL',
             exportOptions: {
               columns: ':visible',
             },
             title: 'dashboard_repor',
           },
           {
             extend: 'excel',
             footer: true,
             autoClose: 'true',
             //text: '',
             //className: 'fa fa-file-pdf-o',
             //color:'#ff0000',
 
             buttons: ['excel'],
             titleAttr: ' Download excel file',
 
             tag: 'span',
 
             className: 'datatableexcel-btn fa fa-file-excel-o',
             text: '',
             exportOptions: {
               columns: ':visible',
             },
             title: 'dashboard_repor',
           },
         ],
       });
     });
 
     //  setTimeout(() => {
     //  this.SpinnerService.hide();
     // console.log("Timeout")
     //  this.SpinnerService.hide("LastAlert")
 
     //  }, 3000);
 
     // console.log("table length2",datatable.length)
   }
   masterUploadTable() {
     var tbl = $('#masterUpload');
     var table = $('#masterUpload').DataTable();
     table.clear();
     table.destroy();
     // table.draw()
     // $('#masterUpload').DataTable().clear;
     // if(datatable.length!=)
     // console.log("table length",datatable.length)
     //  $('#masterUpload tbody').empty();
 
     $(document).ready(function () {
       $('#masterUpload').DataTable({
         language: {
           search: '',
           searchPlaceholder: 'Search',
         },
         pageLength: 10,
         fixedHeader: true,
         // scrollX: true,
         scrollY: '450px',
         scrollCollapse: true,
         paging: true,
         scrollX: true,
         destroy: true,
         responsive: true,
 
         //   fixedColumns:   {
         //     leftColumns: 11,
         //     select: true,
 
         //     // rightColumns: 5
         // },
 
         order: [],
         dom: '<"html5buttons"B>lTfgitp',
         columnDefs: [{ targets: 'no-sort', orderable: false }],
 
         buttons: [
           {
             extend: 'csv',
             footer: true,
             autoClose: 'true',
             titleAttr: 'Download csv file',
 
             className: 'datatablecsv-btn fa fa-file-text-o ',
             text: '',
             tag: 'span',
 
             exportOptions: {
               columns: ':visible',
             },
             title: 'dashboard_repor',
           },
           {
             extend: 'pdf',
             footer: true,
             orientation: 'landscape',
             pageSize: 'LEGAL',
 
             autoClose: 'true',
 
             titleAttr: 'Download Pdf file',
             tag: 'span',
 
             className: 'datatablepdf-btn fa fa-file-pdf-o ',
             text: '',
             // customize: function (doc) {
             //   var colCount = new Array();
             //   $(tbl)
             //     .find('tbody tr:first-child td')
             //     .each(() => {
             //       if ($(this).attr('colspan')) {
             //         for (var i = 1; i <= $(this).attr('colspan'); i++) {
             //           colCount.push('*');
             //         }
             //       } else {
             //         colCount.push('*');
             //       }
             //     });
             //   doc.content[1].table.widths = colCount;
             // },
 
             exportOptions: {
               columns: ':visible',
               //  columns: [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 ]
             },
             title: 'dashboard_repor',
           },
           {
             extend: 'copy',
             footer: true,
             titleAttr: ' Copy  file',
 
             tag: 'span',
 
             className: 'datatablecopy-btn fa fa-copy ',
             text: '',
             orientation: 'landscape',
             pageSize: 'LEGAL',
             exportOptions: {
               columns: ':visible',
             },
             title: 'dashboard_repor',
           },
           {
             extend: 'excel',
             footer: true,
             autoClose: 'true',
             //text: '',
             //className: 'fa fa-file-pdf-o',
             //color:'#ff0000',
 
             buttons: ['excel'],
             titleAttr: ' Download excel file',
 
             tag: 'span',
 
             className: 'datatableexcel-btn fa fa-file-excel-o',
             text: '',
             exportOptions: {
               columns: ':visible',
             },
             title: 'dashboard_repor',
           },
         ],
       });
     });
 
     //  setTimeout(() => {
     //  this.SpinnerService.hide();
     // console.log("Timeout")
     //  this.SpinnerService.hide("LastAlert")
 
     //  }, 3000);
 
     // console.log("table length2",datatable.length)
   }
   billingDetailsTable() {
    var tbl = $('#billing-table');
    var table = $('#billing-table').DataTable();
    table.clear();
    table.destroy();


    $(document).ready(function () {
      $('#billing-table').DataTable({
        language: {
          search: '',
          searchPlaceholder: 'Search',
        },
        pageLength: 10,
        fixedHeader: true,
        // // scrollX: true,
        sScrollY: '450px',
        scrollCollapse: true,
        paging: true,
        sScrollX: true,
        destroy: false,
        responsive: true,

        //   fixedColumns:   {
        //     leftColumns: 11,
        //     select: true,

        //     // rightColumns: 5
        // },

        order: [],
        dom: '<"html5buttons"B>lTfgitp',
        columnDefs: [{ targets: 'no-sort', orderable: false }],

        buttons: [
          {
            extend: 'csv',
            footer: true,
            autoClose: 'true',
            titleAttr: 'Download csv file',

            className: 'datatablecsv-btn fa fa-file-text-o ',
            text: '',
            tag: 'span',

            exportOptions: {
              columns: ':visible',
            },
            title: 'dashboard_repor',
          },
          {
            extend: 'pdf',
            footer: true,
            orientation: 'landscape',
            pageSize: 'LEGAL',

            autoClose: 'true',

            titleAttr: 'Download Pdf file',
            tag: 'span',

            className: 'datatablepdf-btn fa fa-file-pdf-o ',
            text: '',
            // customize: function (doc) {
            //   var colCount = new Array();
            //   $(tbl).find('tbody tr:first-child td').each(() => {
            //     if ($(this).attr('colspan')) {
            //       for (var i = 1; i <= $(this).attr('colspan'); i++) {
            //         colCount.push('*');
            //       }
            //     } else { colCount.push('*'); }
            //   });
            //   doc.content[1].table.widths = colCount;
            // },

            exportOptions: {
              columns: ':visible',
              //  columns: [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 ]
            },
            title: 'dashboard_repor',
          },
          {
            extend: 'copy',
            footer: true,
            titleAttr: ' Copy  file',

            tag: 'span',

            className: 'datatablecopy-btn fa fa-copy ',
            text: '',
            orientation: 'landscape',
            pageSize: 'LEGAL',
            exportOptions: {
              columns: ':visible',
            },
            title: 'dashboard_repor',
          },
          {
            extend: 'excel',
            footer: true,
            autoClose: 'true',
            //text: '',
            //className: 'fa fa-file-pdf-o',
            //color:'#ff0000',

            buttons: ['excel'],
            titleAttr: ' Download excel file',

            tag: 'span',

            className: 'datatableexcel-btn fa fa-file-excel-o',
            text: '',
            exportOptions: {
              columns: ':visible',
            },
            title: 'dashboard_repor',
          },
        ],
      });
    });

    //  setTimeout(() => {
    //  this.SpinnerService.hide();
    // console.log("Timeout")
    //  this.SpinnerService.hide("LastAlert")

    //  }, 3000);

    // console.log("table length2",datatable.length)
  }
   switch(vehicleData:any=null) {
     this.router.navigate(['/ILgic/Vehicle_dashboared'],{state:{vehicle:vehicleData,filters:this.vehicleDashboardData?.listing_data?.filters_name}});
   }
   switch2(driverData: any = null) {
     this.router.navigate(['/ILgic/Driver_dashboared'], { state: { driver: driverData } });
     console.log(driverData);
     
   }
   onFilterDriver(value) {
     // this.fullres=[];
     this.SpinnerService.show('')
     console.log('value', value);
     this.isLoadingDriverTable=true
     var formdata: any = new FormData();
     formdata.append('AccessToken', this.token);
     formdata.append('FromDate', value?.from_timeD||'');
     formdata.append('ToDate', value?.to_timeD||'');
     formdata.append('UserCategory', "Transporter");
     formdata.append('TransporterID', "");
     console.log(formdata);
     
     this.service.Driverdashboard(formdata).subscribe((res: any) => {
       // console.log(res);
       this.isLoadingDriverTable=false
       this.driverTableData=res?.Driver_Data
       this.masterUploadTable2();
       console.log(res);
 
       //  this.chart1()
       // this.chart2()
       // this.chart3()
       // this.chart4()
       // this.masterUploadTable()
     });
     // if (filterForm.valid) {
     //   // Access form values
     //   const formValues = filterForm.value;
     //   console.log('Form Values:', formValues);
 
     //   // Extract specific values
     //   const fromTime = formValues.from_time;
     //   const toTime = formValues.to_time;
 
     //   console.log('From:', fromTime);
     //   console.log('To:', toTime);
 
     //   // You can now use these values for further processing
     // }
   }
   
   driverDashboard(value){
    
    this.isLoadingDriverTable=true
    var formdata: any = new FormData();
    formdata.append('AccessToken', this.token);
    formdata.append('FromDate', value?.from_timeD||'');
    formdata.append('ToDate', value?.to_timeD||'');
    formdata.append('UserCategory', "Transporter");
    formdata.append('TransporterID', "");
    this.isqDriverChartLoading=true;
    console.log(formdata);
    this.service.Driverdashboard(formdata).subscribe((res: any) => {
      this.driverTableData=res?.Driver_Data
      this.driverDashboardData=res
      this.isLoadingDriverTable=false;
      this.isqDriverChartLoading=false;
      console.log(res);
    
      this.chartD1();
      this.chartD2();
      this.chartD3();
      this.chartD4(); 
      this.masterUploadTable2();
     

    });
  }






  toggleDriverAllSelection() {
    this.allDriverSelected = !this.allDriverSelected;
    if (this.allDriverSelected) {
      this.selectedDriverIds = [];
      this.driverTableData?.forEach((item:any, index) => {
          this.selectedDriverIds.push(item?.DriverId);
      });
    } else {
      this.selectedDriverIds = [];
    }
    console.log('selected', this.selectedDriverIds);
  }

  toggleDriverSelection(itemId: any) {
    const index = this.selectedDriverIds.indexOf(itemId);
    if (index > -1) {
      this.selectedDriverIds.splice(index, 1);
    } else {
      this.selectedDriverIds.push(itemId);
    }
    this.allDriverSelected = this.selectedDriverIds.length === this.driverTableData?.length;
    console.log('selected', JSON.stringify(this.selectedDriverIds));
  }
  isDriverSelected(itemId: any): boolean {
    return this.selectedDriverIds.includes(itemId);
  }
  updateDriverStatus(status: string,values) {
  
    let DriverID= this.selectedDriverIds.reduce((acc, id, index) => {
      acc[index] = String(id);
      return acc;
    }, {})
    const formData=new FormData()
    formData.append("AccessToken",this.token)
    formData.append('Status',status)
    formData.append('DriverID',JSON.stringify(DriverID))
    console.log(formData);
    if (confirm(`Do you want to ${status}?`)) {
      this.isLoadingDriverTable = true;
    this.service.driverUpdateStatus(formData).subscribe((res: any) => {
     console.log(res);
     if(res.status==="success") 
      {
        alert(res.Message)
        this.selectedDriverIds = [];
        this.onFilterDriver(values);
      }
      else{
        alert("error in updating status")
        this.isLoadingDriverTable = false;
      }
    },
    error => {
      console.error('Error:', error);
      this.isLoadingDriverTable = false;
      // Handle the error accordingly
    });
  }
  else{
    console.log("cancel");
    
  }
  }

  editDriver(data:any){
   console.log(data);
   this.switch2(data)
  }

}
