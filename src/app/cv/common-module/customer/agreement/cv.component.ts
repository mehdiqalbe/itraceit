import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavService } from 'src/app/shared/services/nav.service';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { DatePipe } from '@angular/common';
import { TaskService } from 'src/app/shared/services/task.service';
import { data } from 'jquery';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { dateRangeValidator } from 'src/app/shared/validations/dateValidators';
import * as echarts from 'echarts';
declare var $: any;
declare var bootstrap: any;
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
})
export class CvComponent implements OnInit {
  Object=Object;
AgreementData:any=[]
    viewdocFile:any=""
quoteStartDate:any
quoteEndDate:any

  totalBids: number = 100; // Example value
  pendingBids: number = 20; // Example value
  completedBids: number = 70; // Example value
  canceledBids: number = 10; //
  showOrderTile = false;

  quoteArrayData1: any = [];
  quoteMinMax: any;

  selectedRoutes: any = []; 
  tripF: any = '';
  venderList: any = [];
  TimeCheck: boolean = true;
  filterDataagreement: any = [];
  datetimepicker1: any;
  currentDateTime: any;
  RegionData: any = [];
  hide_column: boolean = true;
  token: any;
  account_id: any;
  account_type: any;
  group_id: any;
  GroupTypeId: any;
  Source: any = [];
  Destination: any = [];
  Safety_ceck_list: any = [];
  selectedItems: any = [];
  Load_type: any;
  Vehicle_capacity: any = [];
  Vehicle_Body_Type: any = [];
  Booking_Type: any = [];
  searched_data: any = [];
  indentFilter: any = [];
  indentdata: any = [];
  timepicker1: any;
  timepicker2: any;
  All_data: boolean = true;
  client: any = [];
  searched_data_order: any = [];
  searched_data_quote: any = [];
  Safety_list: any = [
    {
      name: 'Registration Certificate',
      img: 'assets/imagesnew/Icon/Elock.png',
    },
    {
      name: 'Pollution Certificate',
      img: 'assets/imagesnew/Icon/GPS.png',
    },
    {
      name: 'Vehicle Insurance',
      img: 'assets/imagesnew/Icon/DualDriver.png',
    },
    {
      name: 'National Goods Permit',
      img: 'assets/imagesnew/Icon/FireExtinguisher.png',
    },
  ];
  Assigned_vehicle: any = [];
  OneRow_Data: any;
  orderId: any;
  store_filtersubmit_data: any;
  isRadioSelected: boolean = false;
  table_show: boolean = false;
  table_show_order: boolean = false;
  accessToken: string = '';
  filterForm!: FormGroup;
  filterForm_Q!: FormGroup;
  transporters: Array<{ id: string; value: string }> = [];
  billingForm!: FormGroup;
  vehicleList: Array<{ vehicle_id: string; vehicle_no: string }> = [];
  filterData: Array<any> = [];
  isLoadingBilling: Boolean = false;
  saveBillButton: Boolean = true;
  anyCheckboxSelected = false;
  allSelected: boolean = false;
  selectedIds: Array<any> = [];
  customerItemsCount: number = 0;
  //  token:any
  Based: any = '';
  //  account_id:any;
  AgreementForm: FormGroup;
  UserType: any;
  uploadfiledsk: any;
  ////////////////////////////////mehndir:any;////////////////////////////////
  selectVehicleIds: Array<any> = [];
  qallVehicleSelected: boolean = false;
  vehicleTableData: Array<any> = [];
  qTransporterList: any = '';
  isLoadingVehicleTable: Boolean = true;
  isqVehicleChartLoading: Boolean = true;
  vehicleCapacityType: any = '';
  vehicleBodyType: any = '';
  vehicleFuelType: any = '';
  vehicleCategory: any = '';
  vehicleMake: any = '';
  vehicleModel: any = '';
  ShipmentNo: any;
  fullres: any = [];
  driverDashboardData: any = {};
  vehicleDashboardData: any = {};
  driverTableData: Array<any> = [];
  isLoadingDriverTable: Boolean = true;
  allDriverSelected: boolean = false;
  isqDriverChartLoading: Boolean = true;
  selectedDriverIds: Array<any> = [];
  routeLocationId: any;
  routeSequence: any;
  popupQuoteTable: any;
  popupQuoteVehicleDriver:any;
  new_array: any;
  driverDocImage:any={
    3:'assets/icon/labelIcon/DL.png',
    1:'assets/icon/labelIcon/Adhar Card.png',
    2:'assets/icon/labelIcon/Pan card.png',
    15:'assets/icon/labelIcon/Voter.png',
    14:'assets/icon/labelIcon/Passport.png',
   }
  ///////////////////mehndi close////////////////////////////////
  constructor(
    private Task_Service: TaskService,
    private navServices: NavService,
    private modalService: NgbModal,
    private router: Router,
    private service: CrudService,
    private SpinnerService: NgxSpinnerService,
    private datepipe: DatePipe,
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    // private Task_Service: TaskService,
    // private navServices: NavService,/
    // private modalService: NgbModal,
    // private router: Router,
    // private service: CrudService,
    // private SpinnerService: NgxSpinnerService,
    // private datepipe: DatePipe,
    private crudService: CrudService
  ) {
    this.AgreementForm = this.formBuilder.group({
      VenderName: new FormControl('', Validators.required),
      AgreementCode: new FormControl('', Validators.required),
      AgreementDate: new FormControl('', Validators.required),
      AgreementFile: new FormControl('', Validators.required),
      TotalnoVehicle: new FormControl('', Validators.required),
      Agreement: this.formBuilder.array([this.gettable()]),
    });
  }

  ngOnInit(): void {
    
    this.token = localStorage.getItem('AccessToken')!;
    this.account_id = localStorage.getItem('AccountId')!;
    this.account_type = localStorage.getItem('AccountType')!;
    this.UserType = localStorage.getItem('UserType')!;
    // AccountId
    this.group_id = localStorage.getItem('GroupId')!;
    this.GroupTypeId = localStorage.getItem('GroupTypeId')!;

    this.indentingfilter_list();
    this.datetimepicker1 = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.quoteStartDate=this.datetimepicker1
    this.quoteEndDate=this.quoteStartDate
    this.timepicker1 = this.datepipe.transform(new Date(), 'HH:mm');
    this.timepicker2 = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    console.log(this.datetimepicker1);
    let App = document.querySelector('.app');
    App?.classList.add('sidenav-toggled');
    this.DateselectGroup();
    console.log('GroupTypeId', this.GroupTypeId == '7');

    // ------------------------------------------------------------

    this.orderfilterfilter_list();
    this.Dateselect2();
    this.Dateselect1();
    this.initForms();
    this.initSidebar();
    this.fetchTransporters();
    this.filterDataagreementF();
    this.transporterDataF();
    this.getQTransporterList();
    const state = window.history.state;
    if (state?.tab === 'driver') {
      $('#nav-Driver-tab').click();
    } else if (state?.tab == 'vehicle') {
      $('#nav-Vehicle-tab').click();
    }
    console.log(state, 'navigation');

    // this.quoteCreateTable('a')

    //////////////////////////////////mehndi rest codes////////////////////////////////
  }

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
       "from_Time":value.Agreement[i].fromdate.replace('T', ' '),
       "to_Time":value.Agreement[i].todate.replace('T', ' '),
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
     "agreement_date":value.AgreementDate.replace('T', ' '),
     "total_number_of_vehicles":value.TotalnoVehicle,
     "assigned_group_id":this.group_id,
     "transporter_id":value.VenderName.id,
   }
   console.log("perma",permaAgree)
   var formdataCustomer = new FormData()
   formdataCustomer.append('AccessToken',this.token)
   formdataCustomer.append('userflag', '1');
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
  selectFile(event) {
    // this.uploadfiledsk.push(event.target.files[0])
    this.uploadfiledsk = event.target.files[0];
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
/////////////////////////////////////////agreement display////////////////////////////////
agreementView()
{
  $('#agreementView').modal('show');
}
AgreementList(value)
{
console.log(value);
let formdata: FormData = new FormData();
  formdata.append('AccessToken', localStorage.getItem('AccessToken')!);
  formdata.append('customer_id', value.Client.id);
  formdata.append('agreement_type_id',value.Agreement.id ); 
  // formdata.append('Alert', '0');
  // formdata.append('Zip', '1');

  this.service.agreementDisplayS(formdata).subscribe((data: any) => {

    console.log(data);
    this.AgreementData = data?.data;
    this. AgreementTable()
  })
}
viewF(item)
{
  console.log("viewitem",item)
  this.viewdocFile=item.agreement_documents

  const width = 600;  // Set the desired width of the window
  const height = 400; // Set the desired height of the window

  // Calculate the position to center the window on the screen
  const left = (screen.width - width) / 2;
  const top = (screen.height - height) / 2;

  window.open(this.viewdocFile, '_blank', `width=${width},height=${height},top=${top},left=${left}`);

}
AgreementTable() {
  var tbl = $('#Agreementtable')
  var table = $('#Agreementtable').DataTable();
  table.clear()
  table.destroy();
  $(document).ready(function () {



    $('#Agreementtable').DataTable({


      pageLength: 10,
      fixedHeader: true,
      // scrollX: true,
      scrollY: '450px',
      // scrollCollapse: true,
      paging: true,
      scrollX: true,
      destroy: true,
      responsive: true,
      retrieve: false,
      inilitizer: true,



      "order": [],

      dom: '<"html5buttons"B>lTfgitp',

      columnDefs: [
        { targets: 'no-sort', orderable: false }
      ],
      // dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
      // "<'row'<'col-sm-12'tr>>" +
      // "<'row'<'col-sm-5'i><'col-sm-7'p>>",
      buttons:
        [
          //   text: 'Close',
          //   className: 'tableBtnClose',
          //   action: function ( e, dt, node, config ) {
          //    buttonFunction()
          //   }},
          //   {
          //     text: 'Grace',
          //     className: 'tableBtnClose',
          //     action: function ( e, dt, node, config ) {
          //       buttonFunction()
          //     }},
          //     {
          //       text: 'QRT',
          //       className: 'tableBtnClose',
          //       action: function ( e, dt, node, config ) {
          //         buttonFunction()
          //       }},
          //       {
          //         text: 'Escalate',
          //         className: 'tableBtnClose',
          //         action: function ( e, dt, node, config ) {
          //           buttonFunction()
          //         }},
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
            customize: function (doc) {
              var colCount = new Array();
              $(tbl).find('tbody tr:first-child td').each(() => {
                if ($(this).attr('colspan')) {
                  for (var i = 1; i <= $(this).attr('colspan'); i++) {
                    colCount.push('*');
                  }
                } else { colCount.push('*'); }
              });
              doc.content[1].table.widths = colCount;
            },


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
          }],
      "language": {
        search: '',
        searchPlaceholder: 'Search'
      },
    }

    );
  });





}

///////////////////////////////////////////////////////


  DateselectGroup() {
    this.Dateselect('#Date-select');
    this.Dateselect('#bid-date');
    this.Dateselect('#quoteStartDate')
    this.Dateselect('#quoteEndDate')
  }
  Dateselect(id) {
    console.log(id);
    $(document).ready(() => {
      $(id)
        .datepicker({
          format: 'yyyy-mm-dd',
          todayBtn: 'linked',
          keyboardNavigation: false,
          forceParse: false,
          autoclose: true,
          defaultViewDate: new Date(),
        })
        .datepicker('setDate', new Date());
    });
  }
  
  timeselect() {
    $(document).ready(() => {
      $('#time-picker').datetimepicker({
        timeFormat: 'h:mm p',
        interval: 60,
        minTime: '10',
        maxTime: '6:00pm',
        defaultTime: '11',
        startTime: '10:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true,
      });
    });
  }
  addtable() {
    this.getcustumerinvoice().push(this.gettable());
  }
  deletetable(index) {
    this.getcustumerinvoice().removeAt(index);
  }
  transporterDataF() {
    var formdataCustomer = new FormData();
    formdataCustomer.append('AccessToken', this.token);
    // formdataCustomer.append('GroupId', '0986');
    // formdataCustomer.append('UserType', 'master');
    // formdataCustomer.append('DataFilter', js);

    this.service.venderListS(formdataCustomer).subscribe((res: any) => {
      console.log(res);
      this.venderList = res.Filter.customer;
    });
  }
  filterDataagreementF() {
    var formdataCustomer = new FormData();
    formdataCustomer.append('AccessToken', this.token);
    // formdataCustomer.append('GroupId', '0986');
    // formdataCustomer.append('UserType', 'master');
    // formdataCustomer.append('DataFilter', js);

    this.service.filterS(formdataCustomer).subscribe((res: any) => {
      console.log('allfilter', res);
      this.filterDataagreement = res.data;

      // this.venderList=res.Filter.customer
    });
  }
  TripTypeF(value) {
    console.log(value);
    if (value == undefined) {
      this.Based = ' ';
      this.tripF = '';
    } else if (value.id == 1) {
      this.Based = 'Trip Based';
      this.tripF = 'T';
    } else if (value.id == 3) {
      this.Based = 'Hourly Based';
      this.tripF = 'H';
    } else if (value.id == 2) {
      this.Based = 'Distance Based';
      this.tripF = 'D';
    } else if (value.id == 4) {
      this.Based = 'Distance & Hourly Based';
      this.tripF = 'DH';
    }
  }
  Nightf(e) {
    if (e.target.checked == true) {
      this.TimeCheck = true;
    }
    if (e.target.checked == false) {
      this.TimeCheck = false;
    }
  }

  // selectAllItems() {
  //   if (this.isAllSelected()) {
  //     this.selectedItems = [];
  //   } else {
  //     this.selectedItems = this.Safety_ceck_list.map(item => item.id);
  //   }
  // }
  isMandatoryCheckboxChecked: boolean = false;
  toggleMandatoryCheckbox() {
    if (this.selectedItems.length > 0) {
      this.isMandatoryCheckboxChecked = !this.isMandatoryCheckboxChecked;
    }
  }
  // isSafetySelected(id: number): boolean {
  //   return this.Safety_ceck_list.includes(id);
  // }
  onSafetyItemSelect(id: number, target): void {
    const index = this.Safety_ceck_list.indexOf(id);
    if (target.checked && index === -1) {
      this.selectedItems.push(id);
    } else if (!target.checked && index > -1) {
      this.selectedItems.splice(index, 1);
    }
  }
  selectAllItems(event: any) {
    if (event.target.checked) {
      this.selectedItems = this.Safety_ceck_list.map((item) => item.id);
    } else {
      this.selectedItems = [];
    }
  }

  isSafetySelected(id: number): boolean {
    return this.selectedItems.includes(id);
  }

  onSafetyItemChange() {
    // This will update the "Select All" checkbox state when items are selected/deselected.
    if (this.selectedItems.length == 0) {
      this.isMandatoryCheckboxChecked = false;
    }
    const selectAll =
      this.selectedItems.length === this.Safety_ceck_list.length;
  }

  // selectAllItems(event: any) {
  //   if (event.target.checked) {
  //     this.selectedItems = this.Sa.map(item => item.id);
  //   } else {
  //     this.selectedItems = [];
  //   }
  // }
  // selectAllItems(): void {
  //   if (this.isAllSelected()) {
  //     this.Safety_ceck_list.forEach(item => item.value = false);
  //     this.selectedItems = [];
  //   } else {
  //     this.Safety_ceck_list.forEach(item => item.value = true);
  //     this.selectedItems = this.Safety_ceck_list.map(item => item.id);
  //   }
  // }
  // isAllSelected() {
  //   return this.selectedItems.length === this.Safety_ceck_list.length;
  // }
  // onItemSelect(item: any,index): void {
  //   // Toggle the value based on the current selection

  //   item.value = !item.value;
  //   console.log(item,index, this.Safety_ceck_list[index]);

  //   // Update selectedItems array based on current selection
  //   if (item.value) {
  //     this.selectedItems.push(item.id);
  //   } else {
  //     this.selectedItems = this.selectedItems.filter(id => id !== item.id);
  //   }

  //   // Check if "Select All" should be checked or unchecked
  //   if (this.isAllSelected()) {
  //     this.selectedItems.push(0); // Ensure "Select All" is checked if all items are selected
  //   } else {
  //     const selectAllIndex = this.selectedItems.indexOf(0);
  //     if (selectAllIndex !== -1) {
  //       this.selectedItems.splice(selectAllIndex, 1); // Remove "Select All" if it's in the selected items
  //     }
  //   }
  //   if(this.selectedItems.length==0)
  //     this.isMandatoryCheckboxChecked=false
  // }
  // onItemSelect() {
  //   if (this.isAllSelected()) {
  //     this.selectedItems.push(0);  // Ensure "Select All" is checked if all items are selected
  //   } else {
  //     const selectAllIndex = this.selectedItems.indexOf(0);
  //     if (selectAllIndex !== -1) {
  //       this.selectedItems.splice(selectAllIndex, 1);  // Remove "Select All" if it's in the selected items
  //     }
  //   }
  // }

  allRoutesDisabled: boolean = false; // Flag to control whether options are disabled

  onRouteChange(event: any): void {
    console.log(
      'Event:',
      event,
      'Selected Routes:',
      this.selectedRoutes.length
    );
    if (event[0]?.route_sequence) {
      console.log('hii');
      this.routeLocationId = event[0]?.location_ids?.split(',');
      this.routeSequence = event[0]?.route_sequence?.split('-');
      console.log(this.routeSequence);
    }

    if (event) {
      // If the event is defined, update the selected routes
      const selectedRoute = event[0]?.route_sequence || event;
      console.log(selectedRoute, 'select');

      if (this.selectedRoutes.length <= 1 && event[0]?.route_sequence) {
        this.selectedRoutes = selectedRoute?.split('-') || [];
      }
      // Split the first selected route by '-'

      console.log('After Split:', selectedRoute);

      // Disable all options if the selectedRoutes length is 4
      if (this.selectedRoutes.length > 2) {
        this.allRoutesDisabled = true;
        // alert('All options are disabled because you have selected 4 routes.');
      }

      // Enable options if the user removes items so that only 2 remain
      console.log(this.selectedRoutes.length);

      if (this.selectedRoutes.length <= 1) {
        this.allRoutesDisabled = false;
        console.log('Options enabled, 2 routes remaining.');
      }

      // If the user removes more values, leaving less than 2, remove all values
      if (this.selectedRoutes.length <= 1) {
        this.selectedRoutes = [];
        console.log('All values removed because less than 2 routes remain.');
      }
    }
  }

  // Function to check whether an option should be disabled
  isOptionDisabled(): boolean {
    return this.allRoutesDisabled;
  }
  indentingfilter_list() {
    console.log(this.token);
    var formdata = new FormData();
    formdata.append('AccessToken', this.token);

    this.service.indentingfilter(formdata).subscribe((data: any) => {
      console.log('data', data);
      if (data.Status == 'sucess') {
        this.Source = [];
        this.Destination = [];
        this.Safety_ceck_list = [];
        this.Load_type = [];
        this.Vehicle_capacity = [];
        this.Vehicle_Body_Type = [];
        this.Booking_Type = [];
        var Filter: any = [];
        Filter = data.Filter;
        this.indentFilter = Filter;
        console.log('indent filter', Filter);

        this.Source = Filter.Source;
        this.Destination = Filter.Destination;
        this.Safety_ceck_list = Filter.Safety_ceck_list;
        this.Load_type = Filter.Load_type;
        this.Vehicle_capacity = Filter.Vehicle_Capacity;
        this.Vehicle_Body_Type = Filter.VechileBodyType;
        this.Booking_Type = Filter.BookingType;
      } else {
        //  alert(data.Message)
      }
    });
  }
  // changecheck(event: any, index: number, key: any) {
  //   const isChecked = event.target.checked; // Check if the checkbox is checked

  //   // Update the Safety_ceck_list based on the checkbox state
  //   this.Safety_ceck_list[index][key] = isChecked;

  //   console.log(this.Safety_ceck_list);
  // }
  qallIndentSelected: any = false;
  selectIndentIds: any = [];
  indentObject: any = [];
  qtoggleIndentTableAllSelection() {
    this.qallIndentSelected = !this.qallIndentSelected;
    if (this.qallIndentSelected) {
      this.selectIndentIds = [];
      console.log(this.vehicleTableData);

      this.searched_data?.forEach((item, index) => {
        this.selectIndentIds.push(item?.Transporter_Name?.id);
        this.indentObject.push(item);
      });
    } else {
      this.selectIndentIds = [];
      this.indentObject = [];
    }
    console.log(this.indentObject);
  }

  qtoggleIndentTableSelection(itemId: any, item) {
    const index = this.selectIndentIds.indexOf(itemId);
    if (index > -1) {
      this.selectIndentIds.splice(index, 1);
      this.indentObject.splice(index, 1);
    } else {
      this.selectIndentIds.push(itemId);
      this.indentObject.push(item);
    }
    console.log("qtoggleIndentTableSelection cv",this.indentObject);

    this.qallIndentSelected =
      this.selectIndentIds.length === this.searched_data?.length;
    console.log('selected', JSON.stringify(this.selectIndentIds), index);
  }
  isIndentSelected(itemId: any): boolean {
    return this.selectIndentIds.includes(itemId);
  }
  filterSubmit(eve) {
    console.log(this.Safety_ceck_list);
    // $('#masterUpload').DataTable().destroy();
    // var tbl = $('#masterUpload')
    //  var table = $('#masterUpload').DataTable();
    //  table.clear()
    //  table.destroy();
    if (eve?.status == 'VALID') {
      this.SpinnerService.show('spinner-5');
      this.hide_column = true;
      //     const transformedObject:any = {};

      // // Iterate over each object in the original array
      // this.Safety_ceck_list.forEach(item => {
      //   // Get the key (property name) and value (boolean) from each object
      //   const key = Object.keys(item)[0]; // Assuming each object has only one key
      //   const value = item[key] ? 1 : 0; // Convert true to 1, false to 0

      //   // Assign the key-value pair to the transformed object
      //   transformedObject[key] = value;
      // });

      // console.log(transformedObject);
      //  var k= {'GPS':0/1, 'E-lock':0/1,'Fire':0/1}
      // accesstoken = request.data['AccessToken']
      //           Safety_ceck_list = request.data['Safety_check_list']
      //           Load_type = request.data['Load_type']
      //           Vehicle_Capacity = request.data['Vehicle_Capacity']
      //           VechileBodyType = request.data['VechileBodyType']
      //           BookingType = request.data['BookingType']
      //           Source = request.data['Source']
      //           Destination = request.data['Destination']
      //           Date = request.data['Date']
      //           time = request.data['time']
      //           age_of_vehicle = request.data['age_of_vehicle']
      //           no_of_vehicle = request.data['no_of_vehicle']
      // var date:any=;
      // const date = JSON.stringify(eve.value.Date);
      let sourceLocationId = '';
      let destinationLocationId = '';
      let routeSequenceArr: any = [];
      let routeLocationArr: any = [];
      if (this.selectedRoutes.length >= 2) {
        console.log('selectedroutes is >=2');
        const source = this.routeSequence.findIndex(
          (route) => route === this.selectedRoutes[0]
        );

        const destination = this.routeSequence.findIndex(
          (route) =>
            route === this.selectedRoutes[this.selectedRoutes.length - 1]
        );
        // console.log(source);
        if (source >= 0 && destination >= 0) {
          console.log(this.routeLocationId[source]);
          console.log(this.routeLocationId[destination]);
          sourceLocationId = this.routeLocationId[source];
          destinationLocationId = this.routeLocationId[destination];
        }
        for (let i = 0; i < this.selectedRoutes.length; i++) {
          const index = this.routeSequence.findIndex(
            (route) => route === this.selectedRoutes[i]
          );
          routeSequenceArr.push(this.routeSequence[index]);
          routeLocationArr.push(this.routeLocationId[index]);
        }
      }
      if (this.selectedItems?.length != 0) {
        // No items selected, return early
        const selectedSet = new Set(this.selectedItems);

        // Map over the list and update the value based on presence in selectedSet
        this.Safety_ceck_list = this.Safety_ceck_list.map((item) => ({
          ...item,
          value: selectedSet.has(item.id),
        }));
      }
      console.log(eve, this.selectedItems, this.routeLocationId);

      var formdata = new FormData();
      formdata.append('AccessToken', this.token);
      formdata.append('VechileBodyType', JSON.stringify(eve.value.Body));
      formdata.append('Vehicle_Size', JSON.stringify(eve.value.Size));
      formdata.append('Vehicle_Capacity', JSON.stringify(eve.value.Capacity));
      formdata.append('BookingType', JSON.stringify(eve.value.Bookingtype));
      formdata.append('Date', eve.value.To_Date);
      formdata.append('time', eve.value.To_time);
      formdata.append(
        'Source',
        JSON.stringify({ id: sourceLocationId, value: this.selectedRoutes[0] })
      );
      formdata.append(
        'Destination',
        JSON.stringify({
          id: destinationLocationId,
          value: this.selectedRoutes[this.selectedRoutes.length - 1],
        })
      );
      formdata.append(
        'RouteSequence',
        JSON.stringify({
          id: routeLocationArr.join('-'),
          value: routeSequenceArr.join('-'),
        })
      );
      //  formdata.append('Source','kanpur')
      formdata.append(
        'mandatorySafetyCheck',
        JSON.stringify(this.isMandatoryCheckboxChecked)
      );
      formdata.append('bidExpiryDate', eve.value?.bid_expiry_date);
      formdata.append('remarks', eve?.value?.remarks);
      formdata.append('tatHours', eve.value?.tatHours);
      formdata.append('baseCost', eve.value?.baseCost);
      formdata.append('no_of_vehicle', eve.value.novehicle);
      formdata.append(
        'Safety_check_list',
        JSON.stringify(this.Safety_ceck_list)
      );
      formdata.append('age_of_vehicle', eve.value.Agevehicle);
      formdata.append('Load_type', JSON.stringify(eve.value.Load_type));
      console.log(formdata);

      if (eve.value.Bookingtype.id == 1) {
        this.hide_column = true;
      } else {
        this.hide_column = false;
      }
      this.service.indentingvehiclesearch(formdata).subscribe((data: any) => {
        console.log('data', data);
        if (data.Status == 'sucess') {
          this.table_show = true;
          this.SpinnerService.hide('spinner-5');
          console.log(data);

          this.searched_data = data.Data;
          this.indentdata = data.indentdata;
          this.masterUploadTable_Assign();
        } else {
          alert(data?.Message);
        }
        this.SpinnerService.hide('spinner-5');
      });
    }
  }
  changecheck(event: Event, index: number, key: string) {
    const inputElement = event.target as HTMLInputElement;
    this.Safety_ceck_list[index].value = inputElement.checked;
    console.log(this.Safety_ceck_list);
  }
  masterUploadTable() {
    var tbl = $('#masterUpload');
    var table = $('#masterUpload').DataTable();
    table.clear();
    table.destroy();
    // table.draw()
    // $('#masterUpload').DataTable().clear;
    // if(datatable.length!=)

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
        // dom: '<f>t',
        //  dom: 'Bfrtip',

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
            title: 'report',
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
              $(tbl)
                .find('tbody tr:first-child td')
                .each(() => {
                  if ($(this).attr('colspan')) {
                    for (var i = 1; i <= $(this).attr('colspan'); i++) {
                      colCount.push('*');
                    }
                  } else {
                    colCount.push('*');
                  }
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
            title: 'report',
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

    setTimeout(() => {
      this.SpinnerService.hide();
    }, 3000);
  }
  //  openTab(tabId) {
  //   var tab:any = document.getElementById(tabId);
  //   var tabTrigger = tab.querySelector('.nav-link');
  //   var tabPane = document.querySelector(tabTrigger.getAttribute('data-bs-target'));

  //   // var tabInstance = new bootstrap.Tab(tabTrigger);
  //   // tabInstance.show();

  //   // // Optional: Scroll to the top of the tab content when opening
  //   // tabPane.scrollTop = 0;
  // }

  getStyle(score: number): any {
    if (score > 70) {
      return { color: 'green' };
    } else if (score > 40 && score <= 70) {
      return { color: 'blue' };
    } else {
      return { color: 'red' };
    }
  }
  getButtonColor(score: number): string {
    if (score > 70) {
      return 'green';
    } else if (score > 40 && score <= 70) {
      return 'blue';
    } else {
      return 'red';
    }
  }

  Request(status) {
    var formdata = new FormData();
    formdata.append('AccessToken', this.token);
    formdata.append('Data', JSON.stringify(this.indentObject));
    formdata.append('indentdata', JSON.stringify(this.indentdata));
    formdata.append('status', status);
    if(status=='1'&&this.selectIndentIds?.length>1){
      alert('You can only generate an order for 1 transporter at a time.');
      return
    }
    this.service.indentrequest(formdata).subscribe((data: any) => {
      console.log('data', data);
      if (data.Status == 'success') {
        alert(data.Message);
        this.selectIndentIds=[];
        this.indentObject=[];
      }
    });
  }

  // -----------------order fot customer---------------------------------------------------------------
  change_status() {
    this.All_data = false;
  }
  change_status1() {
    this.All_data = true;
  }
  getStyle_status(score: number): any {
    if (score == 0) {
      return 'green';
    } else if (score == 1) {
      return 'blue';
    } else {
      return 'red';
    }
  }
  orderTileData() {
    console.log(this.token);
    var formdata = new FormData();
    formdata.append('AccessToken', this.token);

    this.service.orderTileStatus(formdata).subscribe((data: any) => {
      console.log('orderTile', data);
      if (data.Status == 'sucess') {
        var Filter: any = [];
        Filter = data.Filter;

        // this.Source=Filter.Source;
        // this.Destination=Filter.Destination;
        this.client = Filter.customer;
      } else {
        //  alert(data.Message)
      }
    });
  }
  orderfilterfilter_list() {
    console.log(this.token);
    var formdata = new FormData();
    formdata.append('AccessToken', this.token);

    this.service.transporterdata(formdata).subscribe((data: any) => {
      console.log('data', data);
      if (data.Status == 'sucess') {
        var Filter: any = [];
        Filter = data.Filter;

        // this.Source=Filter.Source;
        // this.Destination=Filter.Destination;
        this.client = Filter.customer;
      } else {
        //  alert(data.Message)
      }
    });
  }
  Dateselect2() {
    $(document).ready(() => {
      $('#Date-select2')
        .datepicker({
          format: 'yyyy-mm-dd',
          todayBtn: 'linked',
          keyboardNavigation: false,
          forceParse: false,
          autoclose: true,
          defaultViewDate: new Date(),
        })
        .datepicker('setDate', new Date());
    });
  }

  Dateselect1() {
    $(document).ready(() => {
      $('#Date-select_end')
        .datepicker({
          format: 'yyyy-mm-dd',
          todayBtn: 'linked',
          keyboardNavigation: false,
          forceParse: false,
          autoclose: true,
          defaultViewDate: new Date(),
        })
        .datepicker('setDate', new Date());
    });
  }
 

quoteFilterForm:any
  filterSubmit_quote(form) {
    this.quoteFilterForm=form
    if (form.status == 'VALID') {
      this.SpinnerService.show('spinner-5');
      const startDate = $('#Date-select2').val();
      const endDate = $('#Date-select_end').val();
      // console.log(eve);
      if (startDate <= endDate) {
        let future: any;
        if (this.All_data) {
          future = new Date(endDate);
        } else {
          future = new Date(startDate);
        }

        // Calculate the date 10 days later
        const futureDate = new Date(
          future.getTime() + 10 * 24 * 60 * 60 * 1000
        );
        const date_10_days_later: any = this.datepipe.transform(
          futureDate,
          'yyyy-MM-dd HH:mm:ss'
        );

        if (endDate <= date_10_days_later) {
          var formdata = new FormData();
          formdata.append('AccessToken', this.token);
          formdata.append('order_id', form.value.Order_id);
          if(form?.value?.Client)
          formdata.append('transporter', JSON.stringify(form?.value?.Client));
           else
           formdata.append('transporter', '');
          formdata.append('from_date', form.value.from_Date);
          formdata.append('to_date', form.value.To_Date);
          formdata.append('status', '1');
          // formdata.append('Source',eve.value.From)
          // formdata.append('Destination',eve.value.To)
          console.log('customerQuote', formdata);

          this.service.customerQuote(formdata).subscribe((data: any) => {
            console.log('orderfilter', data);
            if (data.Status == 'sucess') {
              this.SpinnerService.hide('spinner-5');
              this.table_show_order = true;
              this.searched_data_quote = data;
              // this.quoteArrayData1 = Object.values(data?.Data1);
              this.quoteArrayData1 = Object.entries(data?.Data1);

              this.quoteMinMax = data?.min_max_data;
              console.log(this.quoteArrayData1);

              this.quoteDataTable()
              // this.quoteCreateTable();
            } else {
              this.SpinnerService.hide('spinner-5');
              alert(data.Message);
            }
          });
        } else {
          // alert('Message');
          alert(
            'The selected date range exceeds the allowed limit of 10 days.'
          );
        }
      } else {
        alert('The start date must be earlier than or equal to the end date.');
      }
    }
  }

 helperfn(value)
 {
  console.log(value);
  return "hii"
  
 }
 getStatus(document: any): number {
  return document?.status || 0;
}

getFilePath(document: any): string {
  return document?.file_path || '';
}

getDocTypeId(document: any): number {
  return document?.doc_type_id || 0;
}

  minQuote(value: any) {
    if (this.quoteMinMax[value]) return this.quoteMinMax[value][0][1];

    return '';
  }
  maxQuote(value: any) {
    if (this.quoteMinMax[value]) return this.quoteMinMax[value][1][1];

    return '';
  }
  popupQuote(value,e,index) {
    console.log(value);
    let table = $('#AssignvehicleQuote').DataTable();
    let tr = $(e.target).closest('tr');
    let row = table.row(tr);
    console.log(table);
    if (row.child.isShown()) {
      // This row is already open - close it
      console.log("hii");
      
      row.child.hide();
  }
  else {
      // Open this row
      console.log('bye');
      
      row.child(this.format(row.data(),value,index)).show();
  }
    
    this.popupQuoteTable = this.searched_data_quote?.Data2;
    this.popupQuoteTable = this.popupQuoteTable[value[0]];
    if (this.popupQuoteTable) {
      this.popupQuoteTable = Object.entries(this.popupQuoteTable);
      console.log(this.popupQuoteTable, '', value[0]);
    }
  }
  selectedValueQuote:any=''

  onRadioChange(value) {
    this.selectedValueQuote = value;
    // this.isRadioSelected = true;
    console.log(value);
    
    const acceptBtn = document.getElementById('acceptBtnQuote') as HTMLButtonElement;
    const rejectBtn = document.getElementById('rejectBtnQuote') as HTMLButtonElement;
    if (acceptBtn&&rejectBtn) {
      acceptBtn.disabled = false;
      rejectBtn.disabled=false
    }
  }
  acceptQuote(status_remark,status) {
   console.log(this.selectedValueQuote,status,status_remark);
   if (confirm(`Are you sure you want to ${status_remark} this?`)) {
    // console.log(this.token)
    // 1=pending
    // 2= Decline(Rejected)
    //
    var formdata = new FormData();
    formdata.append('AccessToken', this.token);
    formdata.append('status', status);
    formdata.append('order_id', this.selectedValueQuote.split(",")[1]);
    formdata.append('transporter_id',this.selectedValueQuote.split(",")[0])
    formdata.append('status_remark', status_remark);
    this.service.orderstatus(formdata).subscribe((data: any) => {
      console.log('data', data);
      if (data.Status == 'sucess') {
        alert(data.Message);
        this.filterSubmit_quote(this.quoteFilterForm);
      } else {
        alert(data.Message);
      }
    });
  }
  }
 
//    createNestedTable(rowD,nestedData, id) {
//     rowD={...rowD[1]}
//     console.log("created nested table",rowD);
    
//     const nestedHeaders = [
//       'Action','Sr No', 'Order No.', 'Transporter', 'Dispatch date and time',
//       'Bidding Amount', 'Source', 'Destination', 'Route Sequence',
//       'Vehicle Capacity', 'Vehicle Type', 'No. of vehicle', 'Requirement', 'Remark'
//     ];
//     let nestedTable = `<table id=${id} cellspacing="0" width="100%" class="table table-bordered">`;
//     nestedTable += '<thead>';
//     nestedTable += '<tr style="text-align: center; white-space: nowrap">';
//     nestedHeaders.forEach(header => {
//       nestedTable+=`<th class="table-primary" style="color: black !important;background-color: #cfe9ff;font-weight: 600;">${header}</th>`;
//     });
//     nestedTable += '</tr>';
//     nestedTable += '</thead>';
//     nestedTable += '<tbody>';


//     let ind = 0;
//     for (const [key, value] of Object.entries(nestedData)) {
//         ind++;
//         const x = value as any[];
//         nestedTable += '<tr style="text-align:center">';
//         nestedTable += `<td><input type="radio" name="selectRow" value="${ind}" onchange="onRadioChange(${ind})"></td>`;
//         nestedTable += `<td>${ind}</td>`;
//         nestedTable += `<td>${rowD['0']['OrderNumber']}</td>`;
//         nestedTable += `<td>${x[0]['transporter_name']}</td>`;
//         nestedTable += `<td>${rowD['0']['dispatchdate']} ${rowD['0']['dispatchtime']}</td>`;
//         nestedTable += `<td>${x[0]['quote']}</td>`;
//         nestedTable += `<td>${rowD['0']['Source']}</td>`;
//         nestedTable += `<td>${rowD['0']['Destination']}</td>`;
//         nestedTable += `<td>${rowD['0']['Route_Sequence']?.value}</td>`;
//         nestedTable += `<td>${x[0]['Capacity_tonns']}</td>`;
//         nestedTable += `<td>${x[0]['Type']}</td>`;
//         nestedTable += `<td>${rowD['0']['No_of_Vehicles']}</td>`;
//         nestedTable += `<td>${rowD['0']['Requirement']}</td>`;
//         nestedTable += `<td>${x[0]['remark']}</td>`;
//         nestedTable += '</tr>';
//     }

//     nestedTable += '</tbody>';
//     nestedTable += '</table>';

//     return nestedTable;
// }
createNestedTable(rowD, nestedData, id) {
  rowD = { ...rowD[1] };
  console.log("created nested table", nestedData);

  const nestedHeaders = [
    'Action', 'Sr No', 'Order No.', 'Transporter', 'Dispatch date and time',
    'Bidding Amount', 'Source', 'Destination', 'Route Sequence',
    'Vehicle Capacity', 'Vehicle Type', 'No. of vehicle', 'Requirement', 'Remark'
  ];

  let buttons = nestedData?`
    <div style="text-align: left; margin-bottom: 10px;">
      <button id="acceptBtnQuote" type='button' class="btn-green py-2 px-3 set-Assign shadow-none" style="margin-right: 5px;" disabled>Accept</button>
      <button id="rejectBtnQuote" type='button' class="btn-orange py-2 px-3 set-Decline shadow-none" disabled>Reject</button>
    </div>`:"";

  let nestedTable = `<table id=${id} cellspacing="0" width="100%" class="table table-bordered">`;
  nestedTable += '<thead>';
  nestedTable += '<tr style="text-align: center; white-space: nowrap">';
  nestedHeaders.forEach(header => {
    nestedTable += `<th class="table-primary" style="color: black !important;background-color: #cfe9ff;font-weight: 600;">${header}</th>`;
  });
  nestedTable += '</tr>';
  nestedTable += '</thead>';
  nestedTable += '<tbody>';

  let ind = 0;
  for (const [key, value] of Object.entries(nestedData)) {
    ind++;
    const x = value as any[];
    nestedTable += '<tr style="text-align:center">';
    if(nestedData)
    {
      nestedTable += `<td><input type="radio" name="selectRow" value="${x[0]['transporter_id']+","+rowD['0']['OrderNumber']}"></td>`;
      nestedTable += `<td>${ind}</td>`;
      nestedTable += `<td>${rowD['0']['OrderNumber']}</td>`;
      nestedTable += `<td>${x[0]['transporter_name']}</td>`;
      nestedTable += `<td>${rowD['0']['dispatchdate']} ${rowD['0']['dispatchtime']}</td>`;
      nestedTable += `<td>${x[0]['quote']}</td>`;
      nestedTable += `<td>${rowD['0']['Source']}</td>`;
      nestedTable += `<td>${rowD['0']['Destination']}</td>`;
      nestedTable += `<td>${rowD['0']['Route_Sequence']?.value}</td>`;
      nestedTable += `<td>${x[0]['Capacity_tonns']}</td>`;
      nestedTable += `<td>${x[0]['Type']}</td>`;
      nestedTable += `<td><button class='quoteVehicleModelbtn link-primary' data-item='${JSON.stringify(x)}'>${rowD['0']['No_of_Vehicles']}</button></td>`;
      nestedTable += `<td>${rowD['0']['Requirement']}</td>`;
      nestedTable += `<td>${x[0]['remark']}</td>`;
    }
    else
    nestedTable += `<td>No data available</td>`;

    nestedTable += '</tr>';
  }

  nestedTable += '</tbody>';
  nestedTable += '</table>';

  const fullContent = buttons + nestedTable;

  // Set the table content
  setTimeout(() => {
    // document.getElementById('acceptBtn').addEventListener('click', () => this.onAccept());
    const acceptBtn = document.getElementById('acceptBtnQuote');
    const rejectBtn = document.getElementById('rejectBtnQuote');
    acceptBtn?.addEventListener('click', () => this.acceptQuote('Accept',0));
    rejectBtn?.addEventListener('click', () => this.acceptQuote('Rejected',2));
    const radios = document.querySelectorAll(`input[name="selectRow"]`);
    radios.forEach(radio => {
      radio.addEventListener('change', (event: any) => this.onRadioChange(event.target.value));
    });
    const helpButtons = document.querySelectorAll('.quoteVehicleModelbtn');
    helpButtons.forEach(button => {
      button.addEventListener('click', (event: any) => {
        const item = JSON.parse(event.target.getAttribute('data-item'));
        this.help(item);
      });
    });
  }, 0);

  return fullContent;
}
format(rowData: any,value,index): string {
  console.log("rowdata",value);
  let childValue=''
  const nestedTableId = 'nestedtable' + index; // Unique ID for the nested table
  if (this.searched_data_quote?.Data2[value[0]]) {
    
    // var temp_cust: any = [];
    childValue = this.searched_data_quote?.Data2[value[0]];
    console.log("temp_cust",childValue);
    

  }
  // Create the HTML for the nested table
  let nestedTableHtml = this.createNestedTable(value,childValue,nestedTableId)

  this.initializeNestedTables(nestedTableId)
  return nestedTableHtml;
}

  ////////////////////////////////
  quoteCreateTable(): void {
    console.log('tableupperdata', this.quoteArrayData1);

    let table_new =
    '<table class="table table-bordered nowrap" id="simpledata" style="text-align:center; width: 100%;">';
  
  // Header construction
  const headers = [
    'SL', 'Order No', 'Min Transporter Quote', 'Max Transporter Quote',
    'Dispatch Date & Time', 'Base Cost', 'Source', 'Destination',
    'Route Sequence', 'Vehicle Capacity', 'Vehicle Type', 'No of Vehicles',
    'Billing Status', 'Requirement', 'Remark', 'Status'
  ];

  table_new += '<thead><tr style="text-align: center;">';
  headers.forEach(header => {
    table_new += `<th style="background-color: #cfe9ff;font-size: 12px;">${header}</th>`;
  });
  table_new += '</tr></thead>';

    let counterFlag: number = 0;
    // const resArrLength: number = this.new_array.length;

    let simpleTable = document.getElementById('simple_table');

    if (simpleTable) {
      // Clear any existing content
      simpleTable.innerHTML = '';

      // Append the new table
      simpleTable.innerHTML = table_new;

      // Proceed with populating the table
      const tabledata: any[] = [];

      for (const i in this.quoteArrayData1) {
        if (Object.prototype.hasOwnProperty.call(this.quoteArrayData1, i)) {
          counterFlag++;
          let rowD = { ...this.quoteArrayData1[i] };
          console.log('each data', rowD['0']['customer_name']);
          // break;
          const counter = counterFlag;
          const tablerow: any = [];
          let trow1 = '';
          console.log('counterFlag', counterFlag);
          // if (i !== this.new_array.length) {
         
            // trow1 = '<div   style="cursor:pointer ; text-align:center" id="row_' + counterFlag + '">'+counterFlag+'</div>';
            // trow1 = '<div  class="showhr" style="cursor:pointer; text-align:center;    margin-left: -65px;" id="row_' + counterFlag + '"><span  style="font-weight:bold; font-size:30px">+</span></div><div style="text-align: center;   ">'+counterFlag+'</div>';
            trow1 =
              '<div  class="showhr" style="cursor:pointer; text-align:center;margin-left: -36px;" id="row_' +
              counterFlag +
              '"><span  style="font-weight:bold; font-size:30px">+</span></div><div style="text-align: center;position: relative;top: -29px; left: -2px;height: 2px;">' +
              counterFlag +
              '</div>';
       
          tablerow.push(trow1);
          tablerow.push(rowD['0']['OrderNumber']);
          tablerow.push(this.minQuote(rowD['0']['OrderNumber']));
          // tablerow.push( '<a   class="show" id="' + i + '" title="Click here to track"  style="color:blue">'+rowD['name']+'</a>')
          // data-bs-toggle="modal" data-bs-target="#v_track_Modal"  tablerow.push('<div class="show"  style="cursor:pointer" id="' + i + '">'+rowD['name']+'</div>');
          // tablerow.push(rowD['name']);
          tablerow.push(this.maxQuote(rowD['0']['OrderNumber']));
          tablerow.push(
            rowD['0']['dispatchdate'] + ' ' + rowD['0']['dispatchtime']
          );
          tablerow.push(rowD['0']['basecost']);
          tablerow.push(rowD['0']['Source']);
          tablerow.push(rowD['0']['Destination']);
          tablerow.push(rowD['0']['Route_Sequence']?.value);
      
          tablerow.push(rowD['0']['Vehicle_Capacity']);
          tablerow.push(rowD['0']['Vehicle_Type']);
          tablerow.push(rowD['0']['No_of_Vehicles']);
        
          tablerow.push(rowD['0']['No_of_Vehicles']);
          tablerow.push(rowD['0']['Requirement']);
       
          tablerow.push(rowD['0']['No_of_Vehicles']);
          tablerow.push(rowD['0']['status_remark']);
    
          tabledata.push(tablerow);
          

          
          if (this.searched_data_quote?.Data2[rowD['0']['OrderNumber']]) {
    
            var temp_cust: any = [];
            temp_cust = this.searched_data_quote?.Data2[rowD['0']['OrderNumber']];
            console.log('destructure temp',temp_cust)
            var tablerow0: any = [];
           
 
            const nestedHeaders = [
              'Action','Sr No', 'Order No.', 'Transporter', 'Dispatch date and time',
              'Bidding Amount', 'Source', 'Destination', 'Route Sequence',
              'Vehicle Capacity', 'Vehicle Type', 'No. of vehicle', 'Requirement', 'Remark'
            ];
            tablerow0.push('<div style="background:blue" class="tr_aser aser_color"></div>');
            nestedHeaders.forEach(header => {
              tablerow0.push(`<div class="py-2" style="color: black !important;background-color: #cfe9ff;font-weight: 600;">${header}</div>`);
            });
     
            tablerow0.push('');
            tablerow0.push('');
           

         
            //  tablerow0.push('');
            //  tablerow0.push('');

            //  tablerow0.push('');
            //  tablerow0.push('');
            // console.log(tabledata)
            tabledata.push(tablerow0);
            let ind=0
            for (const [key, value] of Object.entries(temp_cust)) {
              let x:any=[]
              ind+=1
              x=value
              console.log(key,x[0])
             
              const tablerow1: any = [];
              // rowD = temp_cust[k];
              // let trow = '<div class="tr_aser aser_color"></div>';
              let trow = `<div class="tr_aser aser_color">
                       
                          </div>
                          `;

              tablerow1.push(trow);
              tablerow1.push(`<div>   <button class="accept-btn">Accept</button>
                          <button class="reject-btn">Reject</button></div>`)
              tablerow1.push( ind)
              tablerow1.push(
                 rowD['0']['OrderNumber']
              );
              tablerow1.push( x[0]['transporter_name'] );
              tablerow1.push(
                 rowD['0']['dispatchdate'] + ' ' + rowD['0']['dispatchtime'] 
              );
              tablerow1.push(
                 x[0]['quote'] 
              );
              tablerow1.push(
                 rowD['0']['Source'] 
              );
              tablerow1.push(
                 rowD['0']['Destination'] 
              );
              tablerow1.push(
                 rowD['0']['Route_Sequence'].value 
              );
              tablerow1.push(
                 x[0]['Capacity_tonns'] 
              );
              tablerow1.push(
                 x[0]['Type'] 
              );
              tablerow1.push(
                
                   ''
              );
              tablerow1.push(
                 rowD['0']['Requirement'] 
              );
              tablerow1.push(  x[0]['remark'] );
              tablerow1.push('');
              tablerow1.push('');
              tablerow1.push('');

              // tablerow1.push('');
              // tablerow1.push('');
              // tablerow1.push('');
              // tablerow1.push(rowD['']);
              console.log('tablerowcus', tablerow);

              tabledata.push(tablerow1);
            }
            // tabledata.push(tablerow);
          } else {
            // tabledata.push(tablerow);
          }
        }
        


      }

      this.makeDatatable1('simpledata', tabledata);
        $('.tr_aser').parent('td').parent('tr').addClass('aser');

      openDetails();
      collapseDetails();
      // this.show_t();

    

    }



  }

 help(event){
  console.log("working fine",event);
  this.popupQuoteVehicleDriver=event
  const modalElement = document.getElementById('quoteModal');
  if (modalElement) {
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }
}
  
 



  // makeDatatable(simple_datatable: any, tabledata: any) {
  //   // $(document).ready(function () {
  //     // console.log(this.new_array)
  //   //   var myDataTable = {
  //   //     new_array: []
  //   // };
  //   // myDataTable.new_array = this.new_array;
  //   const myTable = $('#' + simple_datatable).DataTable({
  //       data: tabledata,
  //       paging: true, fixedHeader: true, 
  //       // "scrollY": 400,
  //       ordering: false,
  //       "scrollX": true,
  //       "lengthMenu": [[50, 100, -1], [50, 100, "All"]],
  //       responsive: true,
  //       "order":true,
  //       dom: '<"html5buttons"B>lTfgitp',
  //       columnDefs: [
  //           { targets: 'no-sort', orderable: false },
  //       ],
  //       buttons: [
  //           {
  //               // extend: 'copy',
  //               extend: 'copy',
  //               footer: true,
  //               titleAttr: ' Copy  file',
  
  //               tag: 'span',
  
  //               className: 'datatablecopy-btn fa fa-copy ',
  //               text: '',
  //               orientation: 'landscape',
  //               pageSize: 'LEGAL',
  //               exportOptions: {
  //                   columns: "thead th:not(.no-sort)"
  //               }
  //           },
  //           {
  //               // extend: 'csv',
  //               extend: 'csv',
  //               footer: true,
  //               autoClose: 'true',
  //               titleAttr: 'Download csv file',
  
  //               className: 'datatablecsv-btn fa fa-file-text-o ',
  //               text: '',
  //               tag: 'span',
  
  //               exportOptions: {
  //                   //columns: [0,1,2,3,4,5,6,7,8,9,11,12,14,16,17,18,19,20,21,22,24,25,26,28,29,30,31,32,33,34,35,36,37,39,41,42,44,45,46,47,48,49,50,51,52]
  //               }
  //           },
  //           {
  //             extend: 'excel',
  //             footer: true,
  //             autoClose: 'true',
  //             //text: '',
  //             //className: 'fa fa-file-pdf-o',
  //             //color:'#ff0000',
  
  //             buttons: ['excel'],
  //             titleAttr: ' Download excel file',
  
  //             tag: 'span',
  
  //             className: 'datatableexcel-btn fa fa-file-excel-o',
  //             text: '',
  //               // extend: 'excel',
  //               exportOptions: {
  //               //     //columns: [0,1,2,3,4,5,6,7,8,9,11,12,14,16,17,18,19,20,21,22,24,25,26,28,29,30,31,32,33,34,35,36,37,39,41,42,44,45,46,47,48,49,50,51,52]
  //               }
  //           }
  //       ],
  //  "drawCallback": (settings) => {
    
  //     $('.tr_aser').parent('td').parent('tr').addClass('mehndi');
      
  //     // this.show_t(); // Assuming 'this' is correctly bound
  //     this.openDetails();
  //     this.collapseDetails();
  // }
  //   });
  // // })
  
  //   // ajax_loader(0);
  // }
  
  
  
  openDetails() {
    $(".showhr").off('click').on('click', function (this: JQuery<HTMLElement>) {
        var ide = $(this).attr('id');
        if ($('#' + ide).text() == "-") {
            $('#' + ide).text('+');
            $('#' + ide).css("font-size", "30px");
            $('#' + ide).css("font-weight", "bold");
        } else {
            $('#' + ide).text('-');
            $('#' + ide).css("font-size", "30px");
            $('#' + ide).css("font-weight", "bold");
        }
        $(this).closest('tr').nextUntil("tr:has(.showhr)").toggle("fast");
        // myTable.draw()
    });
  }
  
  collapseDetails(): void {
    $(".mehndi").hide();
    $('[data-toggle="tooltip"]').tooltip({
        placement: 'right',
        html: 'true'
    });
  }

  makeDatatable1(simpledata1:any, tabledata: any) {

    // console.log("sdddfdfdf",tabledata)
   
    // $(document).ready(function () {

    // if ($.fn.DataTable.isDataTable('#' + simple_datatable)) {
      $('#' + simpledata1).DataTable().destroy().clear();
    // }
    const myTable = $('#' + simpledata1).DataTable({
      data: tabledata,
      paging: false, 
      fixedHeader: true, 
      // "scrollY": 400, 
      "scrollX": true,
      // "lengthMenu": [[500, 1000, -1], [500, 1000, "All"]],
      responsive: true,
      "order": [],
      dom: '<"html5buttons"B>lTfgitp',
      columnDefs: [
        { targets: 'no-sort', orderable: false },
      ],
      buttons: [
        {
          // extend: 'copy',
          extend: 'copy',
          footer: true,
          titleAttr: ' Copy  file',

          tag: 'span',

          className: 'datatablecopy-btn fa fa-copy ',
          text: '',
          orientation: 'landscape',
          pageSize: 'LEGAL',
          exportOptions: {
            columns: "thead th:not(.no-sort)"
          }
        },
        {
          // extend: 'csv',
          extend: 'csv',
          footer: true,
          autoClose: 'true',
          titleAttr: 'Download csv file',

          className: 'datatablecsv-btn fa fa-file-text-o ',
          text: '',
          tag: 'span',

          exportOptions: {
            //columns: [0,1,2,3,4,5,6,7,8,9,11,12,14,16,17,18,19,20,21,22,24,25,26,28,29,30,31,32,33,34,35,36,37,39,41,42,44,45,46,47,48,49,50,51,52]
          }
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
          // extend: 'excel',
          exportOptions: {
            //     //columns: [0,1,2,3,4,5,6,7,8,9,11,12,14,16,17,18,19,20,21,22,24,25,26,28,29,30,31,32,33,34,35,36,37,39,41,42,44,45,46,47,48,49,50,51,52]
          }
        }
      ],
      createdRow: function (row: any, data: any, dataIndex: number) {
        // Set padding: 0 for all <td> elements in the body
        $('td', row).css('padding', '2');
      },
      ordering: false 
      
    });
    // })

    // ajax_loader(0);
  }

  // show_t() {
  //   const bb = this;
  //   $(".show").click(function (this: any) {
  //     // Get the id attribute of the clicked element
  //     // console.log($(this))
  //     const ide = $(this).attr('id');
  //     // console.log(this.new_array)
  //     // Accessing the 'new_array' property from the correct object
  //     // Replace 'MyData' with the actual type or interface name
  //     const trackData = bb.new_array[ide];

  //     // // Call the 'show_track' function with the track data
  //     // bb.show_track(trackData);
  //   });
  //   // console.log($(this).closest('tr').nextUntil("tr:has(.showhr)"));
  // }











////////////////////////////////////
  isArrays(value: any) {
    return Array.isArray(value);
  }
  filterSubmit_order(eve: any) {
    this.store_filtersubmit_data = eve;
    console.log(eve);
    
    if (eve.status == 'VALID') {
      this.SpinnerService.show('spinner-5');
      const startDate = $('#Date-select2').val();
      const endDate = $('#Date-select_end').val();
      // console.log(eve);
      if (startDate <= endDate) {
        let future: any;
        if (this.All_data) {
          future = new Date(endDate);
        } else {
          future = new Date(startDate);
        }

        // Calculate the date 10 days later
        const futureDate = new Date(
          future.getTime() + 10 * 24 * 60 * 60 * 1000
        );
        const date_10_days_later: any = this.datepipe.transform(
          futureDate,
          'yyyy-MM-dd HH:mm:ss'
        );

        if (endDate <= date_10_days_later) {
          var formdata = new FormData();
          formdata.append('AccessToken', this.token);
          formdata.append('order_id', eve.value.Order_id);
          if(eve?.value?.Client)
            formdata.append('transporter', JSON.stringify(eve.value.Client));
             else
             formdata.append('transporter', '');
      
          formdata.append('from_date', eve.value.from_Date);
          formdata.append('to_date', eve.value.To_Date);
          formdata.append('status', '1');
          // formdata.append('Source',eve.value.From)
          // formdata.append('Destination',eve.value.To)
          console.log('order',formdata);
          
          this.service.orderdata(formdata).subscribe((data: any) => {
            console.log('orderfilter', data);
            if (data.Status == 'sucess') {
              this.SpinnerService.hide('spinner-5');
              this.table_show_order = true;
              this.searched_data_order = data.Data;
              this.orderData();
            } else {
              this.SpinnerService.hide('spinner-5');
              alert(data.Message);
            }
          });
        } else {
          // alert('Message');
          alert(
            'The selected date range exceeds the allowed limit of 10 days.'
          );
        }
      } else {
        alert('The start date must be earlier than or equal to the end date.');
      }
    }
  }

  orderData() {
    var tbl = $('#Assignvehicle');
    var table = $('#Assignvehicle').DataTable();
    table.clear();
    table.destroy();
    // table.draw()
    // $('#masterUpload').DataTable().clear;
    // if(datatable.length!=)

    //  $('#masterUpload tbody').empty();

    $(document).ready(function () {
      $('#Assignvehicle').DataTable({
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
        // dom: '<f>t',
        //  dom: 'Bfrtip',

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
            title: 'report',
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
              $(tbl)
                .find('tbody tr:first-child td')
                .each(() => {
                  if ($(this).attr('colspan')) {
                    for (var i = 1; i <= $(this).attr('colspan'); i++) {
                      colCount.push('*');
                    }
                  } else {
                    colCount.push('*');
                  }
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
            title: 'report',
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

    setTimeout(() => {
      this.SpinnerService.hide();
    }, 3000);
  }
  quoteDataTable() {
    var tbl = $('#AssignvehicleQuote');
    var table = $('#AssignvehicleQuote').DataTable();
    table.clear();
    table.destroy();
    // table.draw()
    // $('#masterUpload').DataTable().clear;
    // if(datatable.length!=)

    //  $('#masterUpload tbody').empty();

    $(document).ready( ()=> {
      $('#AssignvehicleQuote').DataTable({
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
        // dom: '<f>t',
        //  dom: 'Bfrtip',

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
            title: 'report',
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
              $(tbl)
                .find('tbody tr:first-child td')
                .each(() => {
                  if ($(this).attr('colspan')) {
                    for (var i = 1; i <= $(this).attr('colspan'); i++) {
                      colCount.push('*');
                    }
                  } else {
                    colCount.push('*');
                  }
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
            title: 'report',
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
        drawCallback: () => {
          // this.initializeNestedTables(id:any='');
        }
      });
    });

    setTimeout(() => {
      this.SpinnerService.hide();
    }, 3000);
  }

  initializeNestedTables(id) {
    console.log("hii nested",id);
    var tbl = $(`#${id}`);
    var table = $(`#${id}`).DataTable();
    table.clear();
    table.destroy();

    $(document).ready( ()=> {
      $(`#${id}`).DataTable({
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
        // dom: '<f>t',
        //  dom: 'Bfrtip',

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
            title: 'report',
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
              $(tbl)
                .find('tbody tr:first-child td')
                .each(() => {
                  if ($(this).attr('colspan')) {
                    for (var i = 1; i <= $(this).attr('colspan'); i++) {
                      colCount.push('*');
                    }
                  } else {
                    colCount.push('*');
                  }
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
            title: 'report',
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
        drawCallback: () => {
          // this.initializeNestedTables(id:any='');
        }
      });
    });

    setTimeout(() => {
      this.SpinnerService.hide();
    }, 3000);
  }

  
  open_AssignVehicle(eve) {
    console.log(eve);
    $('#View').modal('show');
    var formdata = new FormData();
    formdata.append('AccessToken', this.token);
    formdata.append('order_id', eve.OrderNumber);

    this.service.orderassigneddata(formdata).subscribe((data: any) => {
      console.log(data);
      if (data.Status == 'sucess') {
        this.Assigned_vehicle = data.data;
        this.Assigned_table();
      } else {
        alert(data.Message);
      }
    });
  }
  Assigned_table() {
    var tbl = $('#Assignvehicle-view');
    var table = $('#Assignvehicle-view').DataTable();
    table.clear();
    table.destroy();
    // table.draw()
    // $('#masterUpload').DataTable().clear;
    // if(datatable.length!=)

    //  $('#masterUpload tbody').empty();

    $(document).ready(function () {
      $('#Assignvehicle-view').DataTable({
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
        // dom: '<f>t',
        //  dom: 'Bfrtip',

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
            title: 'report',
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
              $(tbl)
                .find('tbody tr:first-child td')
                .each(() => {
                  if ($(this).attr('colspan')) {
                    for (var i = 1; i <= $(this).attr('colspan'); i++) {
                      colCount.push('*');
                    }
                  } else {
                    colCount.push('*');
                  }
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
            title: 'report',
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

    setTimeout(() => {
      this.SpinnerService.hide();
    }, 3000);
  }

  selected_radio(order: any, event: any) {
    console.log(order,event);
    
    this.OneRow_Data = event;
    this.orderId = order;
    // this.vehicle_limit=event.No_of_Vehicles
    this.isRadioSelected = true;
  }
  orderstatus_Decline(status_remark: any, status: any) {
    if (confirm(`Are you sure you want to ${status_remark} this?`)) {
      // console.log(this.token)
      // 1=pending
      // 2= Decline(Rejected)
      //
      var formdata = new FormData();
      formdata.append('AccessToken', this.token);
      formdata.append('status', status);
      formdata.append('order_id', this.orderId);
      formdata.append('transporter_id',this.OneRow_Data?.transporter_id)
      formdata.append('status_remark', status_remark);
      this.service.orderstatus(formdata).subscribe((data: any) => {
        console.log('data', data);
        if (data.Status == 'sucess') {
          alert(data.Message);
          this.filterSubmit_order(this.store_filtersubmit_data);
        } else {
          alert(data.Message);
        }
      });
    }
  }
  ////////////mehndi/////////////////////////////////////////////////
  initForms(): void {
    this.billingForm = this.fb.group({
      customer: [null, Validators.required],
      vehicles: this.fb.array([]),
    });

    this.filterForm_Q = this.fb.group(
      {
        dateFrom: ['', Validators.required],
        dateTo: ['', Validators.required],
        customer: [null, Validators.required],
        status: [null, Validators.required],
      },
      { validators: dateRangeValidator() }
    );
  }

  initSidebar(): void {
    const App = document.querySelector('.app');
    App?.classList.add('sidenav-toggled');
  }

  // sidebarToggle() {
  //   let App = document.querySelector('.app');
  //   // App?.classList.add('sidenav-toggled');
  //   if (
  //     (this.navServices.collapseSidebar = !this.navServices.collapseSidebar)
  //   ) {
  //     App?.classList.remove('sidenav-toggled');
  //   } else {
  //     App?.classList.add('sidenav-toggled');
  //   }
  // }

  get vehicles(): FormArray {
    return this.billingForm.get('vehicles') as FormArray;
  }

  addVehicle(): void {
    const vehicleGroup = this.fb.group(
      {
        transporter: this.billingForm.value?.customer,
        Vehicle_Type: [null, Validators.required],
        Billing_Start_Data: ['', Validators.required],
        Billing_End_Data: ['', Validators.required],
        Billing_Mode: [null, Validators.required],
        No_of_Unit: ['', [Validators.required, Validators.min(0)]],
        Per_Unit_Charges: ['', [Validators.required, Validators.min(0)]],
        numberOfUnitsLabel: ['Number of Units'],
        perUnitChargesLabel: ['Per Unit Charges'],
        Total_Amount: [0],
      },
      { validators: dateRangeValidator() }
    );

    vehicleGroup
      .get('No_of_Unit')
      ?.valueChanges.subscribe(() => this.updateTotalCharges(vehicleGroup));
    vehicleGroup
      .get('Per_Unit_Charges')
      ?.valueChanges.subscribe(() => this.updateTotalCharges(vehicleGroup));

    this.vehicles.push(vehicleGroup);
  }

  removeVehicle(index: number): void {
    this.vehicles.removeAt(index);
  }

  updateTotalCharges(vehicleGroup: FormGroup): void {
    const No_of_Unit = vehicleGroup.get('No_of_Unit')?.value || 0;
    const Per_Unit_Charges = vehicleGroup.get('Per_Unit_Charges')?.value || 0;
    const Total_Amount = No_of_Unit * Per_Unit_Charges;
    vehicleGroup
      .get('Total_Amount')
      ?.setValue(Total_Amount, { emitEvent: false });
  }

  onBillingModeChange(vehicleIndex: number): void {
    const vehicleGroup = this.vehicles.at(vehicleIndex) as FormGroup;
    const Billing_Mode = vehicleGroup.get('Billing_Mode')?.value;

    let numberOfUnitsLabel = 'Number of Units';
    let perUnitChargesLabel = 'Per Unit Charges';
    numberOfUnitsLabel = Billing_Mode?.value;
    // switch (Billing_Mode) {
    //   case 'trip':
    //     numberOfUnitsLabel = 'Number of Trips';
    //     perUnitChargesLabel = 'Per Trip Charges';
    //     break;
    //   case 'km':
    //     numberOfUnitsLabel = 'KM Running';
    //     perUnitChargesLabel = 'Per KM Charges';
    //     break;
    //   case 'day':
    //     numberOfUnitsLabel = 'Number of Days';
    //     perUnitChargesLabel = 'Per Day Charges';
    //     break;
    // }

    vehicleGroup.patchValue({
      numberOfUnitsLabel,
      perUnitChargesLabel,
      Total_Amount: 0,
    });
  }
  closeTransporterModal() {
    const modalElement = $('#customerModal');
    if (modalElement) {
      modalElement.removeClass('show');
      modalElement.modal('hide');
    }
  }
  masterUploadTable_Assign() {
    var tbl = $('#Assign-vehicle');
    var table = $('#Assign-vehicle').DataTable();
    table.clear();
    table.destroy();
    // table.draw()
    // $('#masterUpload').DataTable().clear;
    // if(datatable.length!=)
    // console.log("table length",datatable.length)
    //  $('#masterUpload tbody').empty();

    $(document).ready(function () {
      $('#Assign-vehicle').DataTable({
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

  onFilter(): void {
    const filterValues = this.filterForm_Q.value;
    console.log(this.filterForm_Q.value);
    this.getBillingDetails(filterValues);
  }
  onSubmit(value: any) {
    if (this.billingForm.valid) {
      this.postTransporterBilling();
      console.log('customer onSubmit');
    }
  }

  fetchTransporters(): void {
    this.accessToken = localStorage.getItem('AccessToken') || '';
    const formData = new FormData();
    formData.append('AccessToken', this.accessToken);

    this.crudService.getTransporter(formData).subscribe(
      (response) => {
        this.transporters = response;
        console.log(response);
      },
      (error) => {
        console.error('Error sending data:', error);
      }
    );
  }

  postTransporterBilling(): void {
    this.saveBillButton = false;
    const formData = new FormData();
    formData.append('AccessToken', this.accessToken);
    formData.append(
      'Vehicles',
      JSON.stringify(this.billingForm.value.vehicles)
    );
    this.crudService.postBillingTransporter(formData).subscribe(
      (response) => {
        console.log(response);
        if (response.Status == 'sucess') {
          alert('Successfully added');
          this.saveBillButton = true;
          this.closeTransporterModal();
          this.vehicles.clear();
        } else {
          alert(response.Message);
          this.saveBillButton = true;
        }
      },
      (error) => {
        console.error('Error sending data:', error);
      }
    );
    console.log(formData);
  }
  getBillingDetails({ customer, dateFrom, dateTo, status }): void {
    this.isLoadingBilling = true; // Start loading
    this.anyCheckboxSelected = false;
    const formData = new FormData();
    formData.append('AccessToken', this.accessToken);
    formData.append('transporter_id', customer);
    formData.append('from_date', dateFrom);
    formData.append('to_date', dateTo);
    formData.append('status', status);
    this.crudService.billingDetails(formData).subscribe(
      (response) => {
        this.filterData = response?.data;
        this.isLoadingBilling = false;
        this.billingDetailsTable();
        this.customerItemsCount = this.filterData?.filter(
          (item) =>
            item?.Raised_By === 'tranporter' ||
            item?.Raised_By === 'transporter'
        ).length;
        console.log(this.filterData);
      },
      (error) => {
        console.error('error getting data', error);
        this.isLoadingBilling = false;
      }
    );
  }

  onAccept(): void {
    if (confirm('Do you want to accept the bills?')) {
      this.isLoadingBilling = true;
      const formData = new FormData();
      formData.append('AccessToken', this.accessToken);
      formData.append('billing_data', JSON.stringify(this.selectedIds));
      formData.append('userflag', JSON.stringify(2));
      formData.append('status', JSON.stringify(2));
      formData.append('status_remark', 'approved');
      console.log(formData);

      this.crudService.billingStatus(formData).subscribe(
        (response) => {
          console.log(response);
          if (response.Status === 'sucess') {
            this.selectedIds = [];
            alert('Approved successfully');
          } else {
            alert('Sorry,not able to update the status');
          }
          this.allSelected = false;
          this.getBillingDetails(this.filterForm_Q.value);
        },
        (error) => {
          console.error('error getting data', error);
          this.isLoadingBilling = false;
        }
      );
    } else {
      console.log('Selected items:Reject', this.selectedIds);
    }
  }
  onReject(): void {
    if (confirm('Do you want to reject the bills?')) {
      this.isLoadingBilling = true;
      const formData = new FormData();
      formData.append('AccessToken', this.accessToken);
      formData.append('billing_data', JSON.stringify(this.selectedIds));
      formData.append('userflag', JSON.stringify(2));
      formData.append('status', JSON.stringify(3));
      formData.append('status_remark', 'rejected');
      console.log(formData);
      this.crudService.billingStatus(formData).subscribe(
        (response) => {
          console.log(response);
          if (response.Status === 'sucess') {
            this.selectedIds = [];
            alert('Rejected successfully');
          } else {
            alert('Sorry,not able to update the status');
          }
          this.allSelected = false;
          this.getBillingDetails(this.filterForm_Q.value);
        },
        (error) => {
          console.error('error getting data', error);
          this.isLoadingBilling = false;
        }
      );
    } else {
      console.log('Selected items:Reject', this.selectedIds);
    }
  }
  onTransporterChange(transporter: any): void {
    if (transporter) {
      this.vehicles.clear();
      this.vehicleList = [];
      const formData = new FormData();
      formData.append('AccessToken', this.accessToken);
      formData.append('transporter_id', transporter?.id);
      this.crudService.getTransporterVehicles(formData).subscribe(
        (response) => {
          console.log(response);
          this.vehicleList = response;
        },
        (error) => {
          console.error('Error sending data:', error);
        }
      );
    }
  }

  toggleAllSelection() {
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.selectedIds = [];
      this.filterData?.forEach((item: any, index) => {
        if (
          item?.Raised_By === 'tranporter' ||
          item?.Raised_By === 'transporter'
        ) {
          console.log(this.filterData);

          this.selectedIds.push(item?._id);
        }
      });
    } else {
      this.selectedIds = [];
    }
    console.log('selected', this.selectedIds);
  }

  toggleSelection(itemId: any) {
    const index = this.selectedIds.indexOf(itemId);
    if (index > -1) {
      this.selectedIds.splice(index, 1);
    } else {
      this.selectedIds.push(itemId);
    }
    this.allSelected = this.selectedIds.length === this.customerItemsCount;
    console.log('selected', JSON.stringify(this.selectedIds));
  }
  isSelected(itemId: any): boolean {
    return this.selectedIds.includes(itemId);
  }
  /////////////////////////////////////////////////mehndi//////////////////////////////////////////////
  onTabClicked(tab) {
    if (tab === 'order') {
      {
        this.showOrderTile = true;
        console.log(tab);
        this.orderTileData()
      }
    } else {
      this.showOrderTile = false;
      console.log(this.showOrderTile);
    }
    if (tab == 'driver' && !Object.keys(this.driverDashboardData).length) {
      console.log('driver Tab');
      this.driverDashboard('');
    } else if (
      tab == 'vehicle' &&
      !Object.keys(this.vehicleDashboardData).length
    ) {
      console.log('vehicle Tab');
      this.vehicleDashboard();
    }
  }
  vehicleDashboard() {
    var formdata: any = new FormData();
    formdata.append('AccessToken', this.token);
    formdata.append('from_date', '');
    formdata.append('to_date', '');
    formdata.append('customer_id', '');
    this.isLoadingVehicleTable = true;
    this.isqVehicleChartLoading = true;
    this.service.vehicleDashboard(formdata).subscribe((res: any) => {
      console.log(res, 'aman');
      this.vehicleDashboardData = res?.Data;
      this.vehicleTableData =
        this.vehicleDashboardData?.listing_data?.vehicle_data;
      this.vehicleCategory =
        this.vehicleDashboardData?.listing_data?.filters_name?.category;
      this.vehicleMake =
        this.vehicleDashboardData?.listing_data?.filters_name?.make;
      this.vehicleModel =
        this.vehicleDashboardData?.listing_data?.filters_name?.model;
      this.vehicleFuelType =
        this.vehicleDashboardData?.listing_data?.filters_name?.vehicle_FuelType;
      this.vehicleBodyType =
        this.vehicleDashboardData?.listing_data?.filters_name?.vehicle_body_type;
      this.vehicleCapacityType =
        this.vehicleDashboardData?.listing_data?.filters_name?.vehicle_capacity_data;
      this.isqVehicleChartLoading = false;
      this.isLoadingVehicleTable = false;

      console.log(res, 'vehicle dashboard');
      this.chart1();
      // this.chart2()
      this.chart3();
      this.chart4();
      this.masterUploadTableQ();
    });
  }
  onVehicleFilter(value: any) {
    var formdata: any = new FormData();
    formdata.append('AccessToken', this.token);
    formdata.append('from_date', value?.from_date || '');
    formdata.append('to_date', value?.to_date || '');
    formdata.append('customer_id', value?.corpCustomer || '');
    console.log(formdata);
    this.isLoadingVehicleTable = true;
    this.service.vehicleDashboard(formdata).subscribe((res: any) => {
      this.vehicleTableData = res?.Data?.listing_data?.vehicle_data;
      console.log(this.vehicleTableData, 'Vehicle Table Data');
      this.isLoadingVehicleTable = false;

      this.masterUploadTableQ();
    });
  }
  updateVehicleStatus(status: string, values) {
    let vehicleID = this.selectVehicleIds.reduce((acc, id, index) => {
      acc[index] = String(id);
      return acc;
    }, {});
    const formData = new FormData();
    formData.append('AccessToken', this.token);
    formData.append('action', status);
    formData.append('vehicle_id', JSON.stringify(vehicleID));
    console.log(formData);
    if (confirm(`Do you want to ${status}?`)) {
      this.isLoadingVehicleTable = true;
      this.service.vehicleUpdateStatus(formData).subscribe(
        (res: any) => {
          console.log(res);
          if (res.Status === 'Success') {
            this.selectVehicleIds = [];
            this.onVehicleFilter(values);
            alert(res.Message);
          } else {
            if (res.Status === 'Fail') {
              alert('error in updating status');
              this.isLoadingVehicleTable = false;
            }
          }
        },
        (error) => {
          console.error('Error:', error);
          // Handle the error accordingly
          this.isLoadingVehicleTable = false;
        }
      );
    } else {
      console.log('cancel');
    }
  }

  chart1() {
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
            {
              value: this.vehicleDashboardData?.body_type?.existing_vehicle,
              name: 'Heavy Duty',
            },
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
            {
              value: this.vehicleDashboardData?.body_type?.open_body,
              name: 'Open Body',
            },
            {
              value: this.vehicleDashboardData?.body_type?.closed_body,
              name: 'Closed Body',
            },
            {
              value: this.vehicleDashboardData?.body_type?.container,
              name: 'Container',
            },
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
  masterUploadTableQ() {
    var tbl = $('#masterUploadQ');
    var table = $('#masterUploadQ').DataTable();
    table.clear();
    table.destroy();
    // table.draw()
    // $('#masterUpload').DataTable().clear;
    // if(datatable.length!=)
    // console.log("table length",datatable.length)
    //  $('#masterUpload tbody').empty();

    $(document).ready(function () {
      $('#masterUploadQ').DataTable({
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
    // table.draw()
    // $('#masterUpload').DataTable().clear;
    // if(datatable.length!=)
    // console.log("table length",datatable.length)
    //  $('#masterUpload tbody').empty();

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

  switch(vehicleData: any = null) {
    this.router.navigate(['/ILgic/Vehicle_dashboared'], {
      state: {
        vehicle: vehicleData,
        filters: this.vehicleDashboardData?.listing_data?.filters_name,
      },
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
    this.qallVehicleSelected =
      this.selectVehicleIds.length === this.vehicleTableData?.length;
    console.log('selected', JSON.stringify(this.selectVehicleIds));
  }
  isVehicleSelected(itemId: any): boolean {
    return this.selectVehicleIds.includes(itemId);
  }
  getDocumentPath(item: any, docTypeId: number): string | null {
    if (item?.document?.length) {
      const doc = item?.document?.find((d: any) => d.doc_type_id === docTypeId);

      return doc ? doc.file_path : null;
    }
    return null;
  }

  ///////////////////////////////////////Corporate Driver////////////////////////////////////////////////////////////////
  driverDashboard(value) {
    this.isLoadingDriverTable = true;
    var formdata: any = new FormData();
    formdata.append('AccessToken', this.token);
    formdata.append('FromDate', value?.from_timeD || '');
    formdata.append('ToDate', value?.to_timeD || '');
    formdata.append('UserCategory', 'Corporate');
    formdata.append('TransporterID', '');
    this.isqDriverChartLoading = true;
    console.log(formdata);
    this.service.Driverdashboard(formdata).subscribe((res: any) => {
      this.driverTableData = res?.Driver_Data;
      this.driverDashboardData = res;
      this.isLoadingDriverTable = false;
      console.log('driverfilterres', res);
      this.isqDriverChartLoading = false;
      this.chartD1();
      this.chartD2();
      this.chartD3();
      this.chartD4();
      this.masterUploadTable2();
    });
  }
  onFilterDriver(value) {
    // this.fullres=[];
    console.log('value', value);
    this.isLoadingDriverTable = true;
    var formdata: any = new FormData();
    formdata.append('AccessToken', this.token);
    formdata.append('FromDate', value?.from_timeD || '');
    formdata.append('ToDate', value?.to_timeD || '');
    formdata.append('UserCategory', 'Corporate');
    formdata.append('TransporterID', value?.corpCustomer || '');
    console.log(formdata);

    this.service.Driverdashboard(formdata).subscribe((res: any) => {
      // console.log(res);
      this.isLoadingDriverTable = false;
      this.driverTableData = res?.Driver_Data;
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
            {
              value:
                this.driverDashboardData?.Driver_Enrollment
                  ?.Authenticated_Drivers,
              name: 'Authenticated Drivers',
            },
            {
              value:
                this.driverDashboardData?.Driver_Enrollment?.Enrolled_Drivers,
              name: 'Enrolled Drivers',
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
            {
              value: this.driverDashboardData?.Vehicle_Types?.Heavy_Duty,
              name: 'Heavy Duty',
            },
            {
              value: this.driverDashboardData?.Vehicle_Types?.Medium_Duty,
              name: 'Medium Duty ',
            },
            {
              value: this.driverDashboardData?.Vehicle_Types?.Light_Duty,
              name: 'Light Duty',
            },
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
            {
              value:
                this.driverDashboardData?.Driver_Experience?.Less_than_5_yrs,
              name: 'Less than 5 years',
            },
            {
              value:
                this.driverDashboardData?.Driver_Experience
                  ?.Between_5_to_10_yrs,
              name: 'Between 5 to 10 years',
            },
            {
              value:
                this.driverDashboardData?.Driver_Experience?.More_than_10_yrs,
              name: 'More than 10 years',
            },
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
            {
              value: this.driverDashboardData?.Driver_Rating?.Less_than_2,
              name: 'Less Than 2',
            },
            {
              value: this.driverDashboardData?.Driver_Rating?.Between_2_to_4,
              name: '2 TO 4',
            },
            {
              value: this.driverDashboardData?.Driver_Rating?.More_than_4,
              name: 'More Than 4',
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

  scrollButtonB() {
    // this.scrollFlag=true
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  ////////////////////Driver////////////////////////////////////////////////////////////
  masterUploadTable2() {
    var tbl = $('#DmasterUpload');
    var table = $('#DmasterUpload').DataTable();
    table.clear();
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

  switch2(driverData: any = null) {
    this.router.navigate(['/ILgic/Driver_dashboared'], {
      state: { driver: driverData },
    });
    console.log(driverData);
  }

  toggleDriverAllSelection() {
    this.allDriverSelected = !this.allDriverSelected;
    if (this.allDriverSelected) {
      this.selectedDriverIds = [];
      this.driverTableData?.forEach((item: any, index) => {
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
    this.allDriverSelected =
      this.selectedDriverIds.length === this.driverTableData?.length;
    console.log('selected', JSON.stringify(this.selectedDriverIds));
  }
  isDriverSelected(itemId: any): boolean {
    return this.selectedDriverIds.includes(itemId);
  }
  updateDriverStatus(status: string, values) {
    let DriverID = this.selectedDriverIds.reduce((acc, id, index) => {
      acc[index] = String(id);
      return acc;
    }, {});
    const formData = new FormData();
    formData.append('AccessToken', this.token);
    formData.append('Status', status);
    formData.append('DriverID', JSON.stringify(DriverID));
    console.log(formData);
    if (confirm(`Do you want to ${status}?`)) {
      this.isLoadingDriverTable = true;
      this.service.driverUpdateStatus(formData).subscribe(
        (res: any) => {
          console.log(res);
          if (res.status === 'success') {
            alert(res.Message);
            this.selectedDriverIds = [];
            this.onFilterDriver(values);
          } else {
            alert('error in updating status');
            this.isLoadingDriverTable = false;
          }
        },
        (error) => {
          console.error('Error:', error);
          this.isLoadingDriverTable = false;
          // Handle the error accordingly
        }
      );
    } else {
      console.log('cancel');
    }
  }

  editDriver(data: any) {
    console.log(data);
    this.switch2(data);
  }
  getQTransporterList() {
    const formData = new FormData();
    formData.append('AccessToken', this.token);
    this.service.getQCorpCustomerList(formData).subscribe(
      (response) => {
        this.qTransporterList = response;
        console.log('Customer List:', this.qTransporterList);
      },
      (error) => {
        console.error('Error fetching customer list:', error);
      }
    );
  }
  //////////////////////////mehndi close/////////////////////////////////
}




$('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
  var target = $(e.target).data('bs-target'); // activated tab
  alert(target);
});
document.querySelectorAll('td').forEach((td) => {
  const key = td.innerText.slice(2, -2); // Get the key from {{key}}
  if (key === 'safetyFeatures') {
    td.innerText = data[key]
      .map((feature) => (feature ? 'True' : 'False'))
      .join(', ');
  } else {
    td.innerText = data[key] !== undefined ? data[key] : '';
  }

  // Apply class for status
  if (key.includes('status') && data[key] !== undefined) {
    td.classList.add(data[key] === 0 ? 'status-0' : 'status-1');
  }

  // Apply class for expiration dates
  if (
    key.includes('exp') &&
    data[key] !== undefined &&
    key.includes('_exp') === false
  ) {
    td.classList.add(data[key] === 0 ? 'status-0' : 'status-1');
  }
});


function openDetails(this: any) {
  // let thiss:any=this;
  $(".showhr").click(function (this: JQuery<HTMLElement>) {
    //alert($(this).attr('id'));
    var ide = $(this).attr('id');
    // console.log($(this).attr)
    if ($('#' + ide).text() == "-") {
      $('#' + ide).text('+');
      $('#' + ide).css("font-size", "25px");
      $('#' + ide).css("font-weight", "bold");
      // $('#' + ide).css("margin-left", "2px");
    }
    else {
      $('#' + ide).text('-');
      $('#' + ide).css("font-size", "25px");
      $('#' + ide).css("font-weight", "bold");
      // $('#' + ide).css("margin-left", "2px");
    }
    $(this).closest('tr').nextUntil("tr:has(.showhr)").toggle("fast", function () { });
  });



}


function collapseDetails(): void {
  $(".aser").hide();
  $('[data-toggle="tooltip"]').tooltip({
    placement: 'right',
    html: 'true'
  });
}