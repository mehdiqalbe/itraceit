import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavService } from 'src/app/shared/services/nav.service';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { DatePipe } from '@angular/common';
import { TaskService } from 'src/app/shared/services/task.service';
import { data } from 'jquery';
import { TransporterService} from '../transporter.service';
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
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements OnInit {

  AgreementData:any=[]
  viewdocFile:any=""
quoteStartDate:any
quoteEndDate:any;
token: any;
account_id: any;
account_type: any;
group_id: any;
GroupTypeId: any;
  UserType: any;
  uploadfiledsk: any;
  AgreementForm: FormGroup;
  Based: any = '';
  TimeCheck: boolean = true;
  selectedRoutes: any = []; 
  tripF: any = '';
  venderList: any=[];
  filterDataagreement: any;
  customers: any=[];

  constructor( private Task_Service: TaskService,
      private navServices: NavService,
      private modalService: NgbModal,
      private router: Router,
      private service: TransporterService,
      private SpinnerService: NgxSpinnerService,
      private datepipe: DatePipe,
      private fb: FormBuilder,
      private formBuilder: FormBuilder,
      private crudService: CrudService) {

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
    console.log('token', this.token);
    this.account_id = localStorage.getItem('AccountId')!;
    this.group_id = localStorage.getItem('GroupId')!;
    this.GroupTypeId = localStorage.getItem('GroupTypeId')!;
    this.filterDataagreementF();
   
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

  submitForm(value) {
    console.log('Submit', value);
    var agrmnt: any = [];
    for (var i = 0; i < value.Agreement.length; i++) {
      let tempagree = {
        vehicle_type_data: {
          vehicle_type_id: value.Agreement[i].vehcleType.id,
          vehicle_type: value.Agreement[i].vehcleType.value,
        },
        agreement_type_data: {
          agreement_type_id: value.Agreement[i].tripType.id,
          agreement_type_: value.Agreement[i].tripType.value,
        },
        toll_tax: value.Agreement[i].tolltax,
        // "Night_Charges":value.Agreement[i].tolltax,
        Night_Time_from: value.Agreement[i].NighFrom,
        Night_Time_to: value.Agreement[i].NightTo,
        from_Time: value.Agreement[i].fromdate,
        to_Time: value.Agreement[i].todate,
        no_of_Vehicle: value.Agreement[i].Noofvehcle,

        vehicle_capacity_data: {
          vehicle_capacity_id: value.Agreement[i].vehcleCapacity.id,

          vehicle_capacity: value.Agreement[i].vehcleCapacity.capacity,
        },
        trip_based: {
          TFixedCharges: value.Agreement[i].TFixedCharges,
          TTentativeDistance: value.Agreement[i].TTentativeDistance,
          Tminoftrips: value.Agreement[i].Tminoftrips,
          tMinimumMonthlyCost: value.Agreement[i].tMinimumMonthlyCost,
          ttripcost: value.Agreement[i].ttripcost,
        },
        distance_based: {
          DDistanceCost: value.Agreement[i].DDistanceCost,
          DMinimumDistance: value.Agreement[i].DMinimumDistance,
          dMinimumMonthlyCost: value.Agreement[i].dMinimumMonthlyCost,
          dTentativeDistance: value.Agreement[i].dTentativeDistance,
          dFixedCharges: value.Agreement[i].dFixedCharges,
        },
        hourly_based: {
          hFixedCharges: value.Agreement[i].hFixedCharges,
          hHourlyCost: value.Agreement[i].hHourlyCost,
          hMinimumDuration: value.Agreement[i].hMinimumDuration,
          hMinimumMonthlyCost: value.Agreement[i].hMinimumMonthlyCost,
          hTentativeDistance: value.Agreement[i].hTentativeDistance,
        },
        distance_hourly_based: {
          dhDistanceCost: value.Agreement[i].dhDistanceCost,
          dhFixedCharges: value.Agreement[i].dhFixedCharges,
          dhHourlyCost: value.Agreement[i].dhHourlyCost,
          dhMinimumDailyDistance: value.Agreement[i].dhMinimumDailyDistance,
          dhMinimumMonthlyCost: value.Agreement[i].dhMinimumMonthlyCost,
          dhTentativeDistance: value.Agreement[i].dhTentativeDistance,
          dhTentativeDurations: value.Agreement[i].dhTentativeDurations,
        },
      };
      agrmnt.push(tempagree);
    }
    let permaAgree = {
      agreeemnt_code: value.AgreementCode,
      agreement_date: value.AgreementDate,
      total_number_of_vehicles: value.TotalnoVehicle,
      assigned_group_id: value.VenderName.id,
      transporter_id: '',
      // "agreement_doc":this.uploadfiledsk
    };
    // uploadfiledsk
    console.log('perma', permaAgree);
    var formdataCustomer = new FormData();
    formdataCustomer.append('AccessToken', this.token);
    formdataCustomer.append('userflag', '2');
    formdataCustomer.append('agreement_doc', this.uploadfiledsk);
    formdataCustomer.append('agreement_mapping_data', JSON.stringify(agrmnt));
    formdataCustomer.append('agreement_data', JSON.stringify(permaAgree));

    this.service.agreementS(formdataCustomer).subscribe((res: any) => {
      console.log('agreementassign', res);
      alert(res.Message);

      // this.venderList=res.Filter.customer
    });

    console.log('agrmnt', agrmnt);
  }
  addtable() {
    this.getcustumerinvoice().push(this.gettable());
  }
  deletetable(index) {
    this.getcustumerinvoice().removeAt(index);
  }
  sidebarToggle() {
    let App = document.querySelector('.app');
    if (
      (this.navServices.collapseSidebar = !this.navServices.collapseSidebar)
    ) {
      App?.classList.remove('sidenav-toggled');
    } else {
      App?.classList.add('sidenav-toggled');
    }
  }
  transporterDataF() {
    var formdataCustomer = new FormData();
    formdataCustomer.append('AccessToken', this.token);
    // formdataCustomer.append('GroupId', '0986');
    // formdataCustomer.append('UserType', 'master');
    // formdataCustomer.append('DataFilter', js);

    this.service.venderListS(formdataCustomer).subscribe((res: any) => {
      console.log('res', res);
      this.venderList = res?.Filter?.customer;
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

  agreementView() {
    console.log('Agreement modal');

    $('#agreementView').modal('show');
  }
  AgreementList(value) {
    console.log(value);
    let formdata: FormData = new FormData();
    formdata.append('AccessToken', localStorage.getItem('AccessToken')!);
    formdata.append('customer_id', value.Client.id);
    formdata.append('agreement_type_id', value.Agreement.id);
    // formdata.append('Alert', '0');
    // formdata.append('Zip', '1');

    this.service.agreementDisplayS(formdata).subscribe((data: any) => {
      console.log(data);
      this.AgreementData = data?.data;
      this.AgreementTable();
    });
  }
  viewF(item) {
    console.log('viewitem', item);
    this.viewdocFile = item.agreement_documents;

    const width = 600; // Set the desired width of the window
    const height = 400; // Set the desired height of the window

    // Calculate the position to center the window on the screen
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;

    window.open(
      this.viewdocFile,
      '_blank',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  }
  AgreementTable() {
    var tbl = $('#Agreementtable');
    var table = $('#Agreementtable').DataTable();
    table.clear();
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

        order: [],

        dom: '<"html5buttons"B>lTfgitp',

        columnDefs: [{ targets: 'no-sort', orderable: false }],
        // dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
        // "<'row'<'col-sm-12'tr>>" +
        // "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        buttons: [
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
            customize: function (doc) {
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
              doc.content[1].table.widths = colCount;
            },

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
        language: {
          search: '',
          searchPlaceholder: 'Search',
        },
      });
    });
  }
  fetchCustomerAndVehicleData(): void {
    
    const formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken') || '');

    this.crudService.getCustomers(formData).subscribe(
      (response) => {
        this.customers = response;
        console.log('customer', this.customers);
      },
      (error) => {
        console.error('Error sending data:', error);
      }
      // console.log("Customer",this.customers)
    );
   
  }
}
