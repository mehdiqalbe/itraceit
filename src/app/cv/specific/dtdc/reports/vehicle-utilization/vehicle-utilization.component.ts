import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { DataTable } from 'src/app/shared/data/tables_data/data_table';
import { FormsModule, NgForm } from '@angular/forms';
import { CrudService } from 'src/app/shared/services/crud.service';
import { JsonPipe, KeyValue } from '@angular/common';
import { Chart } from 'chart.js';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
// import { obj } from '../../reports/trip-reports/modals';
import { Pipe, PipeTransform } from '@angular/core';
import { DataLayerManager } from '@agm/core';
import { DatePipe, Location } from '@angular/common'
import { Position } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
// import { TooltipAndPopoverComponent } from '../../advanced-elements/tooltip-and-popover/tooltip-and-popover.component';
import { NavigationStart, Router } from '@angular/router';
import { NavService } from 'src/app/shared/services/nav.service';
declare var $: any
@Component({
  selector: 'app-vehicle-utilization',
  templateUrl: './vehicle-utilization.component.html',
  styleUrls: ['./vehicle-utilization.component.scss']
})
export class VehicleUtilizationComponent implements OnInit {
  // table1res: { [key: string]: Table1ResItem } = {};
  fullArray: any = [];
  currentDateTime: any;
  datetimepicker1: any;
  datetimepicker: any;
  table1res: any = []
  Object = Object;
  table1Totalres: any = []
  token: any = '';
  group_id: any = '';
  selectedVehicleType: object = [];
  selectedVehicleType2: object = [];

  // selectedParentOption: any=''; // Change the type based on your data structure
  // selectedParentOption2: boolean=false; // Change the type based on your data structure
  default: boolean = true; // Change the type based on your data structure
  // selectedChildOption: any;
  // showChildSelect = '';
  expandable: boolean = false
  start: any = ''
  end: any = ''
  state: any = [];
  Branch: any = [];
  area: any = [];
  sfcLoc: any = [];
  repoty: any = '';
  isLocationWiseReportSelected: boolean = false;
  contract_hrs: any = "";
  selectedItem: any = 'Select Vehicle';
  con_Hrs: any = '';
  vehicle: any = [];
  new_array: any = [];
  constructor(private navServices: NavService,private itraceIt: CrudService, private SpinnerService: NgxSpinnerService, private datepipe: DatePipe, private router: Router, private location: Location) { }

  ngOnInit(): void {

    this.token = localStorage.getItem('AccessToken')!
    this.group_id = localStorage.getItem('GroupId')!
    // this.masterUploadTable();
    console.log("filter responce call", this.token, this.group_id)
    this.filterF();
    this.startDate();
    this.currentDateTime = this.datepipe.transform((new Date), 'yyyy-MM-dd');
    this.datetimepicker1 = this.currentDateTime;
    this.datetimepicker = this.currentDateTime;
    this.start = this.currentDateTime;
    this.end = this.currentDateTime;
  // this.filterF()
  }
 
  reportType(value: any) {

    // this.isLocationWiseReportSelected = value.target.value === "4";


    var table = $('#masterUpload').DataTable();
    this.table1res = []
    this.repoty = value;


    // table.clear();
    // table.destroy();
    // console.log("value",value)
    // if(value=='Location'){
    // this.router.navigate(['maps/2ndreport'])
    // }
  }


  filterF() {
    // this.masterUploadTable();

    var formdata = new FormData;
    formdata.append('AccessToken', this.token);
    this.itraceIt.filterS_new(formdata).subscribe((res: any) => {
      console.log("filter responce", res)
      this.fullArray = res;

      console.log("res",this.fullArray)
      this.selectedVehicleType = this.fullArray.NonContractVehicle
      this.selectedVehicleType2 = this.fullArray.ContractVehicle
      console.log(this.selectedVehicleType)

    },
      // (error) => {
      //   console.error("Error occurred while fetching vehicle data:", error);
      //   // Handle error if needed
      // }
    )
  }




  masterUploadTable() {

    var tbl = $('#masterUpload')
    var table = $('#masterUpload').DataTable();
    table.clear();
    table.destroy();
    // table.draw()
    setTimeout(() => {
      $(document).ready(function () {

        $('#masterUpload').DataTable({


          "language": {
            search: '',
            searchPlaceholder: 'Search'
          },
          pageLength: 10,
          // lengthMenu: [[5, 10, 20,50,100, -1], [5, 10, 20,50,100, 'Todos']],
          fixedHeader: true,
          scrollX: true,
          scrollY: '450px',
          scrollCollapse: true,
          paging: true,
          // scrollX: true,
          destroy: true,
          responsive: true,

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
                header: true,
                customize: function (csvData, btn, tbl) {
                  let firstHeader = '" "," "," "," ","Total"," "," "," "," ","Contract Vehicles-GPS Active"," "," ","Contract Vehicles-GPS Issue"," ","","",\r\n'
                  return firstHeader + csvData;
                },
                autoClose: 'true',
                titleAttr: 'Download csv file',

                className: 'datatablecsv-btn fa fa-file-text-o ',
                text: '',
                tag: 'span',

                exportOptions: {

                  columns: ':visible',


                },
                title: 'Vehicle_report'
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

                extend: 'csv',
                footer: true,
                autoClose: 'true',
                header: true,
                customize: function (csvData, btn, tbl) {
                  let firstHeader = '"",,"","","","","","Performance Summary", \r\n,"","","","","Total","","","","","","","Contract Vehicles-GPS Active","","","","Contract Vehicles-GPS Issue"," "," "," ",\r\n'
                  return firstHeader + csvData;
                },

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
                title: 'dashboard_report'
              }
            ]
        }

        );

      });


    }, 500)

    setTimeout(() => {
      this.SpinnerService.hide();
    }, 3000);

    // console.log("table length2",datatable.length)
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

  regionF(value) {
    this.state = [];
    console.log("region", value);
    // var table = $('#masterUpload').DataTable();

    //    table.columns(0).search(value).draw();
    // for(var i = 0; i <this.fullArray.State;i++)
    // {

    // }
    var key = value.key;
    console.log(value.key)
    this.state = this.fullArray.State[key];
    console.log(this.state)

  }
  branchF(value) {
    this.Branch = [];
    console.log("state", value);
    // var table = $('#masterUpload').DataTable();

    //    table.columns(0).search(value).draw();
    // for(var i = 0; i <this.fullArray.State;i++)
    // {

    // }
    var key = value.key;
    console.log(value.key)
    this.Branch = this.fullArray.Branch[key];
    console.log(this.Branch)

  }

  areaF(value) {
    this.area = [];
    console.log("area", value);
    // var table = $('#masterUpload').DataTable();

    //    table.columns(0).search(value).draw();
    // for(var i = 0; i <this.fullArray.State;i++)
    // {

    // }
    var key = value.key;
    console.log(value.key)
    this.area = this.fullArray.Area[key];
    console.log(this.area)

  }
  Sfc_Loc(value) {
    this.sfcLoc = [];
    console.log("sfcLoc", value);
    // var table = $('#masterUpload').DataTable();

    //    table.columns(0).search(value).draw();
    // for(var i = 0; i <this.fullArray.State;i++)
    // {

    // }
    var key = value.key;
    console.log(value.key)
    this.sfcLoc = this.fullArray.SFCLoc[key];
    console.log(this.sfcLoc)

  }


  vehicles_s(value) {
    this.vehicle = []
    this.contract_hrs = '';
    console.log("value", value);
    // let x=value
    this.contract_hrs = value;
    // setTimeout(() => {
    //   this.SpinnerService.show();

    // const newValue = value === "0" ? false : true;
    // if (this.selectedParentOption !== newValue) {
    //     this.selectedParentOption = newValue;
    // }
    //    this.SpinnerService.hide();
    // }, 5000);
    // // setTimeout(() => {

    // }, 3000);
    // console.log("value",value)
    // this.selectedParentOption=''

  }

  contctH(value) {
    this.vehicle = []
    this.con_Hrs = '';
    console.log(value);
    this.con_Hrs = value;
  }

  onKeyUp(event: any) {
    this.vehicle = []
    const value = event.target.value;
    if (value.length >= 4) {
      // if(this.con_Hrs==''){
      //   this.con_Hrs="";
      // }
      console.log(this.contract_hrs);
      console.log(this.con_Hrs);
      console.log(this.token);
      console.log(value)
      var formdata = new FormData;
      formdata.append('AccessToken', this.token);
      formdata.append('contract_type', this.contract_hrs);
      formdata.append('contract_hrs', this.con_Hrs);
      formdata.append('vehicle_no', value);

      this.itraceIt.vehicle(formdata).subscribe((res: any) => {

        console.log("res", res)
        this.vehicle = res

      });
      // this.makeApiCall(value);
    }
  }



  Table1Submit(value: any) {
    var x = ''
    // var x:any=[];
    // x= value.vehicle.split('')
    console.log("value", value)
    // for(var i=0;i<value.vehicle,length;i++){

    // }
    if (value.vehicle != null) {
      x = value.vehicle.toString();
      console.log("x", x)
    }
    this.start = value.from_time;
    this.end = value.to_time;
    this.table1res = []
    this.table1Totalres = []
    this.SpinnerService.show();
    // console.log("form value",value);
    var from = this.datepipe.transform((value.from_time), 'yyyy-MM-dd');
    var to = this.datepipe.transform((value.to_time), 'yyyy-MM-dd');
    // console.log("form value t",from,to);
    var formdata: any = new FormData();
    formdata.append('AccessToken', this.token);
    formdata.append('start_date', from);
    formdata.append('end_date', to)

    // if(value.sfc_loc==''|| value.sfc_loc==null){
    //   formdata.append('sfc_loc', '0');
    // }else{        }
      formdata.append('sfc_location', value.sfc_loc !=null ? value.sfc_loc:"" );////value?.sfc_loc || ""
// }

    formdata.append('region', value.Region.key != undefined ? value.Region.key : "")
    // if(value.CONTRACT_HRS !=undefined){
    formdata.append('contract_hrs', this.con_Hrs != undefined ? this.con_Hrs : "") // formdata.append('contract_hrs',this.con_Hrs !=undefined ? this.con_Hrs:"")
    // }
    formdata.append('route_type', value?.Route_type?.key !== undefined ? value.Route_type.key : "")
    formdata.append('gps', value.GPS)
    formdata.append('origin', value.Origin.key !== undefined ? value.Origin.key : "")
    formdata.append('state', value.State.key !== undefined ? value.State.key : "")
    formdata.append('area', value.Area.key !== undefined ? value.Area.key : "")
    formdata.append('contract_hrs_type', value.CONTRACT)
    formdata.append('report_type', value.report)
    if (value.vehicle != undefined) {
      formdata.append('vehicle', x)
    }
    // if(value.report=="5"){
    this.itraceIt.table1S_1(formdata).subscribe((res: any) => {
      console.log("res", res)
      this.table1res = (res.data);

      this.table1Totalres = (res.G_total);
      // for (const [key, value] of Object.entries(this.table1res)){
      console.log(" table1Totalres", formdata)
      // }

      // this.fullArray = res
      this.masterUploadTable();
      if (value.report == '3') {
        this.processResponse(res)
      }
      if (value.report == '2') {
        this.processResponse1(res)
      }

    });
    // }
    //     if(value.report=="4"){
    //   this.itraceIt.table2S(formdata).subscribe((res:any)=> {
    //     console.log("res2",res)
    //     this.table1res=(res.data );

    //     this.table1Totalres=(res.G_total);
    //       // for (const [key, value] of Object.entries(this.table1res)){
    //         // console.log(" table1Totalres" ,res)
    //       // }

    //     // this.fullArray = res
    //     this.masterUploadTable();
    //   });
    // }
  }



  
  

  processResponse(res: any): void {
    // console.log('0', res);

    // var table = $('#simple_datatable').DataTable();  // table.clear()  table.destroy();
    let table_new = '<table class="table table-bordered nowrap" id="simpledata" style=" text-align:center;   width: 100%;" >';
    table_new += '<thead>';
    table_new += '<tr>';

    table_new += '<th colspan="14" style="text-align: center;background-color: rgb(207 226 255); font-size: 12px;"> Performance Summary (' + this.start + ' to ' + this.end + ')</th>';
    table_new += '</tr>';
    table_new += '<tr style="text-align: center;">';
    table_new += '<th rowspan="2" style="background-color: #d2d5f0;font-size: 12px;">SL</th>';
    table_new += '<th rowspan="2" style="background-color: #d2d5f0;font-size: 12px;"> Area</th>';
    table_new += '<th rowspan="2" style="background-color: #d2d5f0;font-size: 12px;">contract Hrs</th>';
    table_new += '<th colspan="4" style="background-color: rgb(235 237 214);font-size: 12px;">Total</th>';
    table_new += '<th rowspan="2" style="background-color: #d2d5f0;font-size: 12px;">Utilization Hrs.%</th>';
    table_new += '<th colspan="3" style="background-color: rgb(235 237 214);font-size: 12px;">Contract Vehicles-GPS Active</th>';
    table_new += '<th colspan="3" style="background-color: rgb(235 237 214);font-size: 12px;">Contract Vehicles-GPS Issue</th>';
    table_new += '</tr>';
    table_new += '<tr style="text-align: center;">';
    table_new += '<th style="background-color: #d2d5f0;font-size: 12px;"> #Vehicle count</th>';
    table_new += '<th style="background-color: #d2d5f0 ;font-size: 12px;">Trips</th>';
    table_new += '<th style="background-color: #d2d5f0 ;font-size: 12px;"> Usage Hrs.</th>';
    table_new += '<th style="background-color: #d2d5f0 ;font-size: 12px;"> Actual Hrs.</th>';
    table_new += '<th style="background-color: #d2d5f0 ;font-size: 12px;"> #Vehicle count</th>';
    table_new += '<th style="background-color: #d2d5f0 ;font-size: 12px;"> Trips</th>';
    table_new += '<th style="background-color: #d2d5f0 ;font-size: 12px;"> Usage Hrs</th>';
    table_new += '<th style="background-color: #d2d5f0 ;font-size: 12px;"> #Vehicle count</th>';
    table_new += '<th style="background-color: #d2d5f0 ;font-size: 12px;"> Trips</th>';
    table_new += '<th style="background-color: #d2d5f0 ;font-size: 12px;"> Usage Hrs</th>';
    table_new += '</tr>';
    table_new += '</thead>';
    // table_new += '<tbody>';


    let counterFlag: number = 0;
    // const resArrLength: number = this.new_array.length;



    const simpleTable = document.getElementById('simple_table');
    if (simpleTable) {
      // Clear any existing content
      simpleTable.innerHTML = '';

      // Append the new table
      simpleTable.innerHTML = table_new;

      // Proceed with populating the table
      const tabledata: any[] = [];

      for (const [key, value] of Object.entries(res.data)) {
        let x: any = value
        // console.log('value',x.grand_total)
        // if (Object.prototype.hasOwnProperty.call(res.data, i)) {
        counterFlag++;
        let rowD = x.grand_total;
        // const counter = counterFlag;
        const tablerow: any = [];
        // let trow1 = '';
        // console.log("counterFlag", counterFlag)
        // if (i !== this.new_array.length) {
          if (rowD['expand'].length !== 0) {
            tablerow.push('<div class="showhr" style="cursor:pointer; text-align:center;  font-size=25px" id="row_' + counterFlag + '"><span style="font-weight:bold; font-size:30px">+</span></div><div style="text-align: center; position: relative; top: -29px; left: -2px;height: 2px;"></div>');
          } else {
            tablerow.push('<div style="cursor:pointer; text-align:center" id="row_' + counterFlag + '"></div>');
          }

        tablerow.push(key);
        tablerow.push('grand_total');
        tablerow.push(rowD['total']['vehicle_count']);
        // tablerow.push( '<a   class="show" id="' + + '" title="Click here to track"  style="color:blue">'+rowD['name']+'</a>')
        // data-bs-toggle="modal" data-bs-target="#v_track_Modal"  tablerow.push('<div class="show"  style="cursor:pointer" id="' + i + '">'+rowD['name']+'</div>');
        // tablerow.push(rowD['name']);
        tablerow.push(rowD['total']['trips']);
        tablerow.push(rowD['total']['usage_hrs']);
        
        tablerow.push(rowD['total']['actual_hrs']);
        tablerow.push(rowD['total']['utilization_hrs']);
        tablerow.push(rowD['gps_active']['vehicle_count']);
        tablerow.push(rowD['gps_active']['trips']);
        // tablerow.push(rowD['distance_from_geofence']);
        tablerow.push(rowD['gps_active']['usage_hrs']);
        tablerow.push(rowD['gps_issue']['vehicle_count']);
        tablerow.push(rowD['gps_issue']['trips']);

        tablerow.push(rowD['gps_issue']['usage_hrs']);

        tabledata.push(tablerow);

        if (rowD['expand'].length !== 0) {
        

          for (const detail of rowD.expand) {
            const detailrow: any[] = [];

            console.log("detail",detail)
            // Add cells for the expanded detail
            detailrow.push('<div class="tr_aser aser_color"></div>');
            detailrow.push( detail.area  );
            detailrow.push(detail.contract_hrs);
            detailrow.push(detail.total.vehicle_count);
            detailrow.push(detail.total.trips);
            // detailrow.push(detail.total.usage_hrs !== undefined ? detail.total.usage_hrs : '');
            // detailrow.push(this.sum(detail.gps_active.usage_hrs,detail.gps_issue.usage_hrs));
            detailrow.push(detail.total.uage_hrs);
            detailrow.push(detail.total.actual_hrs);
            detailrow.push(detail.total.utilization_hrs);
            detailrow.push(detail.gps_active.vehicle_count);
            detailrow.push(detail.gps_active.trips);
            detailrow.push(detail.gps_active.usage_hrs);
            detailrow.push(detail.gps_issue.vehicle_count);
            detailrow.push(detail.gps_issue.trips);
            detailrow.push(detail.gps_issue.usage_hrs);

            // Push the detail row into tabledata
            tabledata.push(detailrow);
          }

        }



      }

      // console.log(counterFlag,resArrLength)
      // if(counterFlag == resArrLength){
        this.makeDatatable('simpledata', tabledata);
        $('.tr_aser').parent('td').parent('tr').addClass('aser');

      openDetails();
      collapseDetails();
      // this.show_t();
      
     
    }


  }
  processResponse1(res: any): void {
    console.log('0', res);

    // var table = $('#simple_datatable').DataTable();  // table.clear()  table.destroy();
    let table_new = '<table class="table table-bordered nowrap" id="simpledata1" style=" text-align:center;   width: 100%;" >';
    table_new += '<thead>';
    table_new += '<tr>';

    table_new += '<th colspan="14" style="text-align: center;background-color: rgb(207 226 255); font-size: 12px;"> Performance Summary (' + this.start + ' to ' + this.end + ')</th>';
    table_new += '</tr>';
    table_new += '<tr style="text-align: center;">';
    table_new += '<th rowspan="2" style="background-color: #d2d5f0;font-size: 12px;">SL</th>';
    table_new += '<th rowspan="2" style="background-color: #d2d5f0;font-size: 12px;"> Region</th>';
    table_new += '<th rowspan="2" style="background-color: #d2d5f0;font-size: 12px;">contract Hrs</th>';
    table_new += '<th colspan="4" style="background-color: rgb(235 237 214);font-size: 12px;">Total</th>';
    table_new += '<th rowspan="2" style="background-color: #d2d5f0;font-size: 12px;">Utilization Hrs.%</th>';
    table_new += '<th colspan="3" style="background-color: rgb(235 237 214);font-size: 12px;">Contract Vehicles-GPS Active</th>';
    table_new += '<th colspan="3" style="background-color: rgb(235 237 214);font-size: 12px;">Contract Vehicles-GPS Issue</th>';
    table_new += '</tr>';
    table_new += '<tr style="text-align: center;">';
    table_new += '<th style="background-color: #d2d5f0;font-size: 12px;"> #Vehicle count</th>';
    table_new += '<th style="background-color: #d2d5f0 ;font-size: 12px;">Trips</th>';
    table_new += '<th style="background-color: #d2d5f0 ;font-size: 12px;"> Usage Hrs.</th>';
    table_new += '<th style="background-color: #d2d5f0 ;font-size: 12px;"> Actual Hrs.</th>';
    table_new += '<th style="background-color: #d2d5f0 ;font-size: 12px;"> #Vehicle count</th>';
    table_new += '<th style="background-color: #d2d5f0 ;font-size: 12px;"> Trips</th>';
    table_new += '<th style="background-color: #d2d5f0 ;font-size: 12px;"> Usage Hrs</th>';
    table_new += '<th style="background-color: #d2d5f0 ;font-size: 12px;"> #Vehicle count</th>';
    table_new += '<th style="background-color: #d2d5f0 ;font-size: 12px;"> Trips</th>';
    table_new += '<th style="background-color: #d2d5f0 ;font-size: 12px;"> Usage Hrs</th>';
    table_new += '</tr>';
    table_new += '</thead>';
    // table_new += '<tbody>';


    let counterFlag: number = 0;
    // const resArrLength: number = this.new_array.length;



    const simpleTable1 = document.getElementById('simple_table1');
    if (simpleTable1) {
      // Clear any existing content
      simpleTable1.innerHTML = '';

      // Append the new table
      simpleTable1.innerHTML = table_new;

      // Proceed with populating the table
      const tabledata: any[] = [];

      for (const [key, value] of Object.entries(res.data)) {
        let x: any = value
        // console.log('value',x.grand_total)
        // if (Object.prototype.hasOwnProperty.call(res.data, i)) {
        counterFlag++;
        let rowD = x.grand_total;
        // const counter = counterFlag;
        const tablerow: any = [];
        // let trow1 = '';
        // console.log("counterFlag", counterFlag)
        // if (i !== this.new_array.length) {
          if (rowD['expand'].length !== 0) {
            tablerow.push('<div class="showhr" style="cursor:pointer; text-align:center;  font-size=25px" id="row_' + counterFlag + '"><span style="font-weight:bold; font-size:30px">+</span></div><div style="text-align: center; position: relative; top: -29px; left: -2px;height: 2px;"></div>');
          } else {
            tablerow.push('<div style="cursor:pointer; text-align:center" id="row_' + counterFlag + '"></div>');
          }

        tablerow.push(key);
        tablerow.push('grand_total');
        tablerow.push(rowD['total']['vehicle_count']);
        // tablerow.push( '<a   class="show" id="' + + '" title="Click here to track"  style="color:blue">'+rowD['name']+'</a>')
        // data-bs-toggle="modal" data-bs-target="#v_track_Modal"  tablerow.push('<div class="show"  style="cursor:pointer" id="' + i + '">'+rowD['name']+'</div>');
        // tablerow.push(rowD['name']);
        tablerow.push(rowD['total']['trips']);
        tablerow.push(rowD['total']['usage_hrs']);
        
        tablerow.push(rowD['total']['actual_hrs']);
        tablerow.push(rowD['total']['utilization_hrs']);
        tablerow.push(rowD['gps_active']['vehicle_count']);
        tablerow.push(rowD['gps_active']['trips']);
        // tablerow.push(rowD['distance_from_geofence']);
        tablerow.push(rowD['gps_active']['usage_hrs']);
        tablerow.push(rowD['gps_issue']['vehicle_count']);
        tablerow.push(rowD['gps_issue']['trips']);

        tablerow.push(rowD['gps_issue']['usage_hrs']);

        tabledata.push(tablerow);

        if (rowD['expand'].length !== 0) {
        

          for (const detail of rowD.expand) {
            const detailrow: any[] = [];

            console.log("detail",detail)
            // Add cells for the expanded detail
            detailrow.push('<div class="tr_aser aser_color"></div>');
            detailrow.push( detail.region  );
            detailrow.push(detail.contract_hrs);
            detailrow.push(detail.total.vehicle_count);
            detailrow.push(detail.total.trips);
            // detailrow.push(detail.total.usage_hrs !== undefined ? detail.total.usage_hrs : '');
            // detailrow.push(this.sum(detail.gps_active.usage_hrs,detail.gps_issue.usage_hrs));
            detailrow.push(detail.total.uage_hrs);
            detailrow.push(detail.total.actual_hrs);
            detailrow.push(detail.total.utilization_hrs);
            detailrow.push(detail.gps_active.vehicle_count);
            detailrow.push(detail.gps_active.trips);
            detailrow.push(detail.gps_active.usage_hrs);
            detailrow.push(detail.gps_issue.vehicle_count);
            detailrow.push(detail.gps_issue.trips);
            detailrow.push(detail.gps_issue.usage_hrs);

            // Push the detail row into tabledata
            tabledata.push(detailrow);
          }

        }



      }

      // console.log(counterFlag,resArrLength)
      // if(counterFlag == resArrLength){
        this.makeDatatable1('simpledata1', tabledata);
        $('.tr_aser').parent('td').parent('tr').addClass('aser');

      openDetails();
      collapseDetails();
      // this.show_t();
      
     
    }


  }
  sum(a: string, b: string): string {
    // Parse time values
    const [aHours, aMinutes] = a.split(':').map(Number);
    const [bHours, bMinutes] = b.split(':').map(Number);
  
    // Calculate total hours and minutes
    let totalHours = aHours + bHours;
    let totalMinutes = aMinutes + bMinutes;
  
    // Adjust for overflow in minutes
    if (totalMinutes >= 60) {
      totalHours += Math.floor(totalMinutes / 60);
      totalMinutes = totalMinutes % 60;
    }
  
    // Format the result
    const hoursStr = String(totalHours).padStart(2, '0');
    const minutesStr = String(totalMinutes).padStart(2, '0');
  
    return `${hoursStr}:${minutesStr}`;
  }


  makeDatatable(simpledata: any, tabledata: any) {

    // console.log("sdddfdfdf",tabledata)
   
    // $(document).ready(function () {

    // if ($.fn.DataTable.isDataTable('#' + simple_datatable)) {
      $('#' + simpledata).DataTable().destroy();
    // }
    const myTable = $('#' + simpledata).DataTable({
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
  makeDatatable1(simpledata1: any, tabledata: any) {

    // console.log("sdddfdfdf",tabledata)
   
    // $(document).ready(function () {

    // if ($.fn.DataTable.isDataTable('#' + simple_datatable)) {
      $('#' + simpledata1).DataTable().destroy();
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

  show_t() {
    const bb = this;
    $(".show").click(function (this: any) {
      // Get the id attribute of the clicked element
      // console.log($(this))
      const ide = $(this).attr('id');
      // console.log(this.new_array)
      // Accessing the 'new_array' property from the correct object
      // Replace 'MyData' with the actual type or interface name
      const trackData = bb.new_array[ide];

      // // Call the 'show_track' function with the track data
      // bb.show_track(trackData);
    });
    // console.log($(this).closest('tr').nextUntil("tr:(.showhr)"));
  }
  startDate() {
   
    // if (!$("#datepicker1").data('datepicker')) {
      $("#datepicker1").datepicker({
        format: "yyyy-mm-dd",
        multidate: true,
        todayBtn: "linked",
        autoclose: false,
        clearBtn: true,
      });
        // Update datepicker range
    $("#datepicker1").datepicker('setStartDate', this.datetimepicker1);
    console.log($("#datepicker1").datepicker('setStartDate',  this.datetimepicker1)?.value);
    
    $("#datepicker1").datepicker('setEndDate',  this.datetimepicker);
    // }
    
  }


  changestartdate(eve){
  this.datetimepicker1 =eve.target.value;
  }
  changeenddate(eve){
    // console.log(eve)
    this.datetimepicker =eve.target.value;
  }
}


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




