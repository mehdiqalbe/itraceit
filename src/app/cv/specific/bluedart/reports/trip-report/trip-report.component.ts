import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { DataTable } from 'src/app/shared/data/tables_data/data_table';
import { FormsModule, NgForm } from '@angular/forms';
// import { ItraceItService } from 'src/app/shared/services/itrace-it.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { JsonPipe, KeyValue } from '@angular/common';
import { Chart } from 'chart.js';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
// import { obj } from '../../reports/trip-reports/modals';
import { Pipe, PipeTransform } from '@angular/core';
import { DataLayerManager } from '@agm/core';
import { DatePipe } from '@angular/common'
import { Position } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import * as echarts from 'echarts';
import { NavService } from 'src/app/shared/services/nav.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
declare var H: any;
declare var $: any;
declare const agGrid: any;
interface HTMLCanvasElement {
  willReadFrequently?: boolean;
}
declare const pdfMake: any;
declare global {
  interface Window {
    jspdf: any;
  }
}
@Component({
  selector: 'app-trip-report',
  templateUrl: './trip-report.component.html',
  styleUrls: ['./trip-report.component.scss']
})
export class TripReportComponent implements OnInit {
  datetimepicker1: any
  datetimepicker: any;
  // grid table --------------------------------------------
  columnDefs:any=[]  
  rowData:any=[] 
  gridOptions:any=[] 
  gridApi:any;
  new_array: any=[
    // {agency_name_hn:'456',region_name:'78945',district_name:'789547'},{agency_name_hn:'456',region_name:'78945',district_name:'789547'},{agency_name_hn:'456',region_name:'78945',district_name:'789547'}
  ];
  token:any;
  Master_filter: any;
  detail_data: any=[];
  // ------------------------MAP----------------------------
  
  trackingData: any=[];
  customer_info: any=[];
  poly_line: any=[];
  marker: any=[];
  map_flag: any;
  map1: any;
  markers: any=[];
  demomarker: any=[];
  polylines: any=[];
  // token: any;
  account_id: any;
  group_id: any;
  contentsInfo: any;
  gridOptions_popup: any=[];
  rowData_popup: any=[];
  columnDefs_popup: any=[];
  gridApi_popup: any;
  floating_filter:boolean=false;
  searchInput = new Subject<string>(); // Emits search text
  dataList: any[] = []; // List of data to display
  extra:boolean=false;
  submit: boolean=false;
  search_grid: boolean=false;
  selectedReportType: number = 1;
  constructor(private navServices: NavService,private CrudService: CrudService, private SpinnerService: NgxSpinnerService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('AccessToken')!;
    console.log( this.token)
    this.datetimepicker1 =  this.datepipe.transform((new Date), 'yyyy-MM-dd ');
   
    this.datetimepicker =  this.datepipe.transform((new Date), 'yyyy-MM-dd ');
    this.end();
    this.start();
    // this.masterUploadTable();
    // this.Grid_table();
    this.bdTripReportFilter()
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
  start() {
    $(document).ready(() => {
      $("#datepicker").datepicker({
        format: "yyyy-mm-dd", // Ensure this matches your desired format
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true
    });
    })
    
  }
  end() {
    $(document).ready(() => {
      $("#datepicker1").datepicker({
        format: "yyyy-mm-dd",
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        
      }
      );
    })
  
    
  }

  masterUploadTable()
  {




   var tbl = $('#masterUpload')
   var table = $('#masterUpload').DataTable();
   table.clear()
   table.destroy();
   // table.draw()
   // $('#masterUpload').DataTable().clear;
   // if(datatable.length!=)
   // console.log("table length",datatable.length)
   //  $('#masterUpload tbody').empty();



   $(document).ready(function () {



     $('#masterUpload').DataTable({


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
           }]
     }

     );
   });


   setTimeout(() => {
     this.SpinnerService.hide();
     // console.log("Timeout")
     this.SpinnerService.hide("LastAlert")

   }, 3000);

   // console.log("table length2",datatable.length)
 }
 Detail(eve){

 
  $('#Datail').modal('show');
 this.detail_data=eve;
 if (this.gridApi_popup) {
  this.gridApi_popup.destroy();
  // this.gridApi_popup='';
}
 this.columnDefs_popup = [
  // { headerName: "Full", field: "Full", sortable: false, filter: false, floatingFilter: false,hide: true},
  { headerName: "Sl.", field: "sl", sortable: true, filter: true, floatingFilter: this.floating_filter, 
    // cellRenderer: params => {
  //   // Create the container div
  //   const container = document.createElement("div");
  //   container.style.display = "flex";
  //   container.style.alignItems = "center";
  //   container.style.justifyContent = "center";
  
  //   // Create the span for the serial number
  //   const serialSpan = document.createElement("span");
  //   serialSpan.textContent = params.value;
  
  //   // Create the button
  //   const button = document.createElement("button");
  //   button.style.border = "none";
  //   button.style.background = "none";
  //   button.style.marginLeft = "5px";
  //   button.style.cursor = "pointer";
  //   button.innerHTML = `<strong style="color: blue;">+</strong>`;
  
  //   // Attach event listener to the button
  //   button.addEventListener("click", () => {
  //     console.log("Row Data:", params.data);
  //     // alert(`You clicked on row with data: ${JSON.stringify(params.data)}`);
  //     this.Detail(params.data.Full)
  //     // Call your functions here, e.g.:
  //     // this.vehicle_newFunction(params.data.full_data);
  //     // this.show_track(params.data.full_data);
  //   });
  
  //   // Append span and button to the container
  //   container.appendChild(serialSpan);
  //   container.appendChild(button);
  
  //   return container;
  // },
  width: 120 },
  { headerName: "RouteType", field: "routeType", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "Region", field: "region", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "Origin", field: "origin", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "Destination", field: "destination", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "Route", field: "route", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "RouteSequence", field: "routeSequence", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "Fleet", field: "fleet", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "TripId", field: "tripId", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "RunCode", field: "runCode", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "RunDate", field: "runDate", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "Vehicle", field: "vehicle", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "TrackHistory", field: "trackHistory", sortable: true, filter: true, floatingFilter: this.floating_filter ,
     cellRenderer: params => {
    // Create the container div
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
  
    // Create the span for the serial number
    const serialSpan = document.createElement("span");
    serialSpan.textContent = params.value;
  
    // Create the button
    
    const button = document.createElement("button");
    button.innerHTML = "";
    button.style.border = "none";
    button.style.background = "none";
    button.style.marginLeft = "5px";
    button.style.cursor = "pointer";



    const button1 = document.createElement("button");
    button1.innerHTML = "";
    button1.style.border = "none";
    button1.style.background = "none";
    button1.style.marginLeft = "5px";
    button1.style.cursor = "pointer";



    // const button = document.createElement("button");
    // button.innerHTML = "";
    // button.style.border = "none";
    // button.style.background = "none";
    // button.style.marginLeft = "5px";
    // button.style.cursor = "pointer";



    // const button = document.createElement("button");
    // button.innerHTML = "";
    // button.style.border = "none";
    // button.style.background = "none";
    // button.style.marginLeft = "5px";
    // button.style.cursor = "pointer";


    // const button = document.createElement("button");
    // button.innerHTML = "";
    // button.style.border = "none";
    // button.style.background = "none";
    // button.style.marginLeft = "5px";
    // button.style.cursor = "pointer";
    // console.log(params.data.Full.TrackHistory1)
    // Clear previous content

    if (params.data.Full?.TrackHistory1 !== 'NA') {
      button.innerHTML += `<strong style="color: blue;"><i class="fa fa-map-marker" style="font-size:17px ; color:blue"></i></strong>|`;
      button.addEventListener("click", () => {
        console.log("Row Data:", params.data.Full);
        this.Detail(params.data.Full)
        this.vehicleTrackF_new('', '',params.data.Full?.TrackHistory1.Imei, params.data.Full?.TrackHistory1.RnDt, params.data.Full?.TrackHistory1.Vno, params.data.Full?.TrackHistory1, params.data.Full?.TrackHistory1.ShpNo, params.data.Full?.TrackHistory1.Id)
      });
    } else {
      button.innerHTML += `<span style="color: black;">Na</span>|`;
    }
    
    if (params.data.Full?.TrackHistory2 !== 'NA') {
      button1.innerHTML += `<strong style="color: blue;"><i class="fa fa-map-marker" style="font-size:17px ; color:blue"></i></strong>|`;
      
      button1.addEventListener("click", () => {
        console.log("Row Data:", params.data.Full);
        // this.Detail(params.data.Full)
        this.vehicleTrackF_new('', '',params.data.Full?.TrackHistory2.Imei, params.data.Full?.TrackHistory2.RnDt, params.data.Full?.TrackHistory2.Vno, params.data.Full?.TrackHistory2, params.data.Full?.TrackHistory2.ShpNo, params.data.Full?.TrackHistory2.Id)
      });
    } else {
      button.innerHTML += `<span style="color: black;">Na</span>|`;
    }
    
    if (params.data.Full?.TrackHistory3 !== 'NA') {
      button.innerHTML += `<strong style="color: blue;"><i class="fa fa-map-marker" style="font-size:17px ; color:blue"></i></strong>|`;
     
      button.addEventListener("click", () => {
        // console.log("Row Data:", params.data.Full);
        // this.Detail(params.data.Full)
        this.vehicleTrackF_new('', '',params.data.Full?.TrackHistory3.Imei, params.data.Full?.TrackHistory3.RnDt, params.data.Full?.TrackHistory3.Vno, params.data.Full?.TrackHistory3, params.data.Full?.TrackHistory3.ShpNo, params.data.Full?.TrackHistory3.Id)
      });
    } else {
      button.innerHTML += `<span style="color: black;">Na</span>|`;
    }
    
    // Attach event listener to the button
   
  
    // Append span and button to the container
    container.appendChild(serialSpan);
    container.appendChild(button);
  
    return container;
  },
  width: 150 },
  { headerName: "State", field: "state", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "Branch", field: "branch", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "Area", field: "area", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "DriverName", field: "driverName", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "DriverNumber", field: "driverNumber", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "Transporter", field: "transporter", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "STD", field: "std", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "ATD", field: "atd", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "DelayDeparture", field: "delayDeparture", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "STA", field: "sta", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "ATA", field: "ata", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "TT-Mapped", field: "ttMapped", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "TT-Taken", field: "ttTaken", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "DelayArrival", field: "delayArrival", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "DelayTT", field: "delayTt", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "ScheduleHalt", field: "scheduleHalt", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "ActualHalt", field: "actualHalt", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "ATT", field: "att", sortable: true, filter: true, floatingFilter: this.floating_filter },
  // { headerName: "Alerts", field: "alerts", sortable: true, filter: true, floatingFilter: true },
  // { headerName: "ReverseDriving", field: "reverseDriving", sortable: true, filter: true, floatingFilter: true },
  { headerName: "FixedGPS(Km)", field: "fixedGpsKm", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "FixedE-Lock(Km)", field: "fixedELockKm", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "PortableE-Lock(Km)", field: "portableELockKm", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "GPS Exception-1", field: "gpsException1", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "GPS Exception-2", field: "gpsException2", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "GPS Exception-3", field: "gpsException3", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "SupervisorException", field: "supervisorException", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "Status", field: "status", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "SystemRemarks", field: "systemRemarks", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "CloseBy", field: "closeBy", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "CloseDate", field: "closeDate", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "CreateBy", field: "createBy", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "TotalBag", field: "totalBag", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "Remarks", field: "remarks", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "GPSVendor", field: "gpsVendor", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "Fixed E-lock Vendor", field: "fixedELockVendor", sortable: true, filter: true, floatingFilter: this.floating_filter },
  { headerName: "Portable E-lock Vendor", field: "portableELockVendor", sortable: true, filter: true, floatingFilter: this.floating_filter },
  // { headerName: "Branch Location", field: "BranchLocation", sortable: true, filter: true, floatingFilter: this.floating_filter },
  // { headerName: "Branch Handover Time", field: "BranchHandoverTime", sortable: true, filter: true, floatingFilter: this.floating_filter },
  // { headerName: "Gate In Time", field: "GateInTime", sortable: true, filter: true, floatingFilter: this.floating_filter },
  // { headerName: "Gate Out Time", field: "GateOutTime", sortable: true, filter: true, floatingFilter: this.floating_filter },
  // { headerName: "GPS ATA", field: "GPSATA", sortable: true, filter: true, floatingFilter: this.floating_filter },
  // { headerName: "GPS ATD", field: "GPSATD", sortable: true, filter: true, floatingFilter: this.floating_filter },
  // { headerName: "Bay IN/OUT", field: "Bay", sortable: true, filter: true, floatingFilter: this.floating_filter },
  // { headerName: "Shipment Count IN/OUT", field: "ShipmentCount", sortable: true, filter: true, floatingFilter: this.floating_filter },
  // { headerName: "Weight IN/OUT", field: "Weight", sortable: true, filter: true, floatingFilter: this.floating_filter },
  // { headerName: "Full", field: "Full", sortable: false, filter: false, floatingFilter: false,hide: true},
  // { headerName: "CloseDeviceBy", field: "closeDeviceBy", sortable: true, filter: true, floatingFilter: true },
  // { headerName: "Portable Lock Device", field: "portableLockDevice", sortable: true, filter: true, floatingFilter: true }
];
// onGridReady: params => {
  // Dynamically hide the "Full" column

// }
// routeSequence
// tripId
// trackHistory
// alerts
//  totalBag portableELockKm fixedELockKm fixedGpsKm reverseDriving
this.rowData_popup = this.new_array.map((person, index) => ({
  sl: index + 1,
  routeType: person.route_type,
  region: person.Region,
  origin: person.origin,
  destination: person.destination,
  route: person.RouteCode,
  routeSequence: person.RouteName,
  fleet: person.FleetNo,
  tripId: person.ShipmentNo,
  runCode: person.RunCode,
  runDate: person.RunDate,
  vehicle: person.VehicleNo,
  trackHistory:'',
  state: person.State,
  branch: person.BranchName,
  area: person.Area,
  driverName: person.Driver,
  driverNumber: person.DriverMobile,
  transporter: person.Transporter,
  std: person.STD, // Standard Time of Departure
  atd: person.ATD, // Actual Time of Departure
  delayDeparture: person.DelayDeparture,
  sta: person.STA, // Standard Time of Arrival
  ata: person.ATA, // Actual Time of Arrival
  ttMapped: person.TTMapped,
  ttTaken: person.TTTaken,
  delayArrival: person.DelayArrival,
  delayTt: person.DelayTT,
  scheduleHalt: person.ScheduleHalt,
  actualHalt: person.ActualHalt,
  att: person.ATT, // Actual Travel Time
  // alerts: 'person.alerts',
//  reverseDriving: 'person.reverse_driving',
  fixedGpsKm:person.DistanceKm1,
  fixedELockKm: person.DistanceKm2,
  portableELockKm:person.DistanceKm3,
  gpsException1: person.GPSException1,
  gpsException2: person.GPSException2,
  gpsException3: person.GPSException3,
  supervisorException: person.SupervisorException,
  status: person.status,
  systemRemarks: person.Remarks,
  closeBy: person.CloseBy,
  closeDate: person.CloseDate,
  createBy: person.CreateBy,
  totalBag: person.Bag,
  remarks: person.remarks,
  gpsVendor: person.GPSVendorType1,
  fixedELockVendor: person.DistanceKm2,
  portableELockVendor: person.DistanceKm3,
  Full: person,
  // BranchLocation: person.BranchLocation || "N/A",
  // BranchHandoverTime: person.BranchHandoverTime || "N/A",
  // GateInTime: person.GateInTime || "N/A",
  // GateOutTime: person.GateOutTime || "N/A",
  // GPSATA: person.GpsAta || "N/A",
  // GPSATD: person.GpsAtd || "N/A",
  // Bay: person.BayNoIn+'/'+person.BayNoOut || "N/A",
  // ShipmentCount: person.ShipmentCountIn+'/'+person.ShipmentCountOut || 0,
  // Weight: person.WeightIn+'/'+person.WeightOut || 0
  // closeDeviceBy:' person.close_device_by',
  // portableLockDevice: 'person.portable_lock_device'
  ServerGPSReceivedIn:  this.extra ? person.ServerGPSReceivedIn : null,
  ServerGPSProcessedIn:  this.extra ? person.ServerGPSProcessedIn : null,
  ServerGPSReceivedOut:  this.extra ? person.ServerGPSReceivedOut : null,
  ServerGPSProcessedOut:  this.extra ? person.ServerGPSProcessedOut : null,
  PushTimeIn:  this.extra ? person.PushTimeIn : null,
  PushTimeOut:  this.extra ? person.PushTimeOut : null,
}));

// this.rowData = this.new_array.map((person, index) => ({
//   si: index + 1,
//   agency: person.agency_name_hn,
//   region: person.region_name,
//   district: person.district_name,
//   // Purchase_Center: person.source_display,
//   // mill: person?.destination_display,
//   // vehicles: person.name,
//   // status: person.trip_status,
//   // driver_mobile: person.driver_mobile,
//   // driver_name: person.driver_name,
//   // Consignment_no: person.shipment_no,
//   // Consignment_Score: person.rating1,
//   // Consignment_Time: person.run_date,
//   // Consignment_Time1: person.close_date,
  
//   // duration: person.time,
//   // KML_Distance: person.polyline_route_dis,
//   // Missed_KML_Distance: person.missed_route_dis,
//   // Route_Deviation_Score: person.route_deviation_score,
//   // Route_Stoppage_Count: person.enroute_count,
//   // Route_Stoppage_Score: person.enroute_stoppage_score,
//   // // EPOD_Done: person.epod,
//   // // EPOD_Score: person.epod_score
//   // // ,
//   // Geofence_Done: person.geofence_done,
//   // Geofence_Score: person.geofence_score,
//   // // Trip_Closer_Type: person,
//   // Route_Deviation: person.route_deviation_score,
//   // Count_Force_Close: person.forceful_closure_count,
//   // Count_Auth: person.un_auth_loc_count,
//   // Count_Red_Flag: person.red_flag_count,
//   // Consignmen_Score: person.rating1,
//   // Transporter_Score: person.rating3,
//   // Distance_Travelled: person.distance_km,
//   // Transporter_Name: person.transporter_name,
//   // bags: person.quantity,
//   // quantity: person.load,
//   // full_data: person,
//   // Sorce: person.source_flag,
//   // destinaton: person.destination_flag,
//   // trip_status: person.trip_status

// }));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

this.gridOptions_popup = {
  rowHeight: 30,
  headerHeight: 40,
  
  columnDefs: this.columnDefs_popup,
  rowData: this.rowData_popup,
  pagination: true,
  paginationPageSize: 50,
  paginationPageSizeSelector: [10, 50, 100,500,1000],
 
  animateRows: true,
  onGridReady: (params) => this.onGridReady_pop(params),
 
  // onGridReady: (params: any) => {
  //   this.gridOptions.api = params.api; // Store API reference for later use
  // },
 

//   onGridReady: (params) => {
//     this.gridApi = params.api; // Store the API for later use
//     console.log('Grid API methods:', Object.getOwnPropertyNames(this.gridApi)); // Log the available API methods
// },
  // onGridReady: this.onGridReady.bind(this),  // Call `onGridReady` when the grid is ready
  // onCellClicked: (event) => {
  //   if (event.colDef.field === 'user_name') {
  //     // this.onUserClick(event.value); // Call your method
  //   }
  // },

};

const gridDiv = document.querySelector('#myGrid-popup');
new agGrid.Grid(gridDiv, this.gridOptions_popup);
// this.gridOptions_popup.columnApi.setColumnVisible("Full", false);
 }
 Grid_table(){

  if (this.gridApi) {
    this.gridApi.destroy();
  }
  // this.columnDefs = [
  //   { headerName: 'Sl.', field: 'si', sortable: true, filter: false,width: '75%' },
  //   { headerName: 'Agency', field: 'agency', sortable: true,filter: true, floatingFilter: true, },
  //   { headerName: 'Region', field: 'region', sortable: true, filter: true,floatingFilter: true,

      // cellRenderer: (params) => {
      //   // Create a clickable div or span element
      //   const span = document.createElement('span');
      //   span.innerText = params.value;
      //   span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
    
      //   // Add click event listener
      //   span.addEventListener('click', () => {
      //     // alert(`You clicked on ${params.value}`);
      
      //     console.log("params",params);
      //     // this.vehicle_newFunction(params.data.full_data)
      //     // this.show_track(params.data.full_data)
         
      //   });
    
      //   return span;
      // }
     

  //    },
  //   { headerName: 'District', field: 'district', sortable: true, filter: true ,floatingFilter: true,},
  //   // { headerName: 'Purchase Center', field: 'Purchase_Center', sortable: true, filter: true,floatingFilter: true, },
  //   // { headerName: 'Mill', field: 'mill', sortable: true, filter: true,floatingFilter: true, },
  //   // { headerName: 'Vehicle No.', field: 'vehicles', sortable: true, filter: true,floatingFilter: true,
  //   //   cellStyle: (params) => {
  //   //     if (params) {
  //   //       return { color: 'blue' };  // If status is 0, make background red
  //   //     } else  {
  //   //       return { color: 'green' }; // If status is not 0, make background blue
  //   //     }
  //   //   },
  //   //   cellRenderer: (params) => {
  //   //     // Create a clickable div or span element
  //   //     const span = document.createElement('span');
  //   //     span.innerText = params.value;
  //   //     span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
    
  //   //     // Add click event listener
  //   //     span.addEventListener('click', () => {
  //   //       // alert(`You clicked on ${params.value}`);
  //   //       console.log("params",params);
  //   //       // this.vehicle_newFunction(params.data.full_data)
  //   //       // this.show_track(params.data.full_data)
         
  //   //     });
    
  //   //     return span;
  //   //   }
  //   //  },
  //   // // { headerName: 'Epod Or Geofence Status', field: 'epod_status', sortable: true, filter: true },
  //   // { headerName: 'Driver Mobile No.', field: 'driver_number', sortable: true, filter: true ,floatingFilter: true,
  //   //   cellRenderer: (params: any) => {
  //   //     return `
  //   //       <div>
           
  //   //         <small>${params.data.driver_name}</small>/
  //   //         <small>${params.data.driver_mobile}</small>
  //   //       </div>
  //   //     `;
  //   //   }
  //   // },
  //   // { headerName: 'Consignment No', field: 'Consignment_no', sortable: true, filter: true ,floatingFilter: true,},
  //   // { headerName: 'Consignment Score', field: 'Consignment_Score', sortable: true, filter: true,floatingFilter: true,
  //   //   cellStyle: (params) => {
  //   //     if (params) {
  //   //       return { color: 'blue' };  // If status is 0, make background red
  //   //     } else  {
  //   //       return { color: 'green' }; // If status is not 0, make background blue
  //   //     }
  //   //   },
  //   //   cellRenderer: (params) => {
  //   //     // Create a clickable div or span element
  //   //     const span = document.createElement('span');
  //   //     span.innerText = params.value;
  //   //     span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
    
  //   //     // Add click event listener
  //   //     span.addEventListener('click', () => {
  //   //       // alert(`You clicked on ${params.value}`);
  //   //       console.log("params",params);
  //   //       // this.vehicle_newFunction(params.data.full_data)
  //   //       // this.show_customer(params.data.full_data.id, params.data.full_data.rating1)
         
  //   //     });
    
  //   //     return span;
  //   //   }
  //   //  },
  //   // { headerName: 'Consignment Start & End Time', field: '',

  //   //   valueGetter: (params: any) => {
  //   //     return `${params.data.Consignment_Time} / ${params.data.Consignment_Time1}`;
  //   //   },
  //   //    sortable: true, filter: true ,floatingFilter: true,},
  //   // { headerName: 'Duration', field: 'duration', sortable: true, filter: true },
  //   // { headerName: 'Missed KML Distance', field: 'Missed_KML_Distance', sortable: true, filter: true ,floatingFilter: true,},
  //   // { headerName: 'KML Distance/Total Distance', field: 'KML_Distance', sortable: true, filter: true,floatingFilter: true, },
  //   // { headerName: 'Route Deviation Score', field: 'Route_Deviation_Score', sortable: true, filter: true ,floatingFilter: true,},
  //   // { headerName: 'En-Route Stoppage Count', field: 'Route_Stoppage_Count', sortable: true, filter: true ,floatingFilter: true,},
  //   // { headerName: 'En-Route Stoppage Score', field: 'Route_Stoppage_Score', sortable: true, filter: true,floatingFilter: true, },
  //   // // { headerName: 'EPOD Done', field: 'EPOD_Done', sortable: true, filter: true },
  //   // // { headerName: 'EPOD Score', field: 'EPOD_Score', sortable: true, filter: true },
  //   // { headerName: 'Geofence Done', field: 'Geofence_Done', sortable: true, filter: true,floatingFilter: true, },
  //   // { headerName: 'Geofence Score', field: 'Geofence_Score', sortable: true, filter: true ,floatingFilter: true,},
  //   // // { headerName: 'Trip Closer Type', field: 'Trip_Closer_Type', sortable: true, filter: true },
  //   // { headerName: 'Route Deviation', field: 'Route_Deviation', sortable: true, filter: true,floatingFilter: true, },
  //   // { headerName: 'Count Of Force Close', field: 'Count_Force_Close', sortable: true, filter: true,floatingFilter: true, },
  //   // { headerName: 'Count Of Un-Auth', field: 'Count_Auth', sortable: true, filter: true ,floatingFilter: true,},
  //   // { headerName: 'Count Of Red Flag', field: 'Count_Red_Flag', sortable: true, filter: true,floatingFilter: true, },
  //   // { headerName: 'Consignment/District/Region Score', field: 'Consignmen_Score', sortable: true, filter: true,floatingFilter: true, },
  //   // { headerName: 'Transporter/DFMO/AMO/MI Score', field: 'Transporter_Score', sortable: true, filter: true,floatingFilter: true, },
  //   // { headerName: 'Distance Travelled', field: 'Distance_Travelled', sortable: true, filter: true,floatingFilter: true, },
  //   // { headerName: 'Transporter Name', field: 'Transporter_Name', sortable: true, filter: true,floatingFilter: true, },
  //   // { headerName: 'No. Of Bags', field: 'bags', sortable: true, filter: true ,floatingFilter: true,},
  //   // { headerName: 'Quantity', field: 'quantity', sortable: true, filter: true ,floatingFilter: true,},
  //   // { headerName: 'Trip Status', field: 'trip_status', sortable: true, filter: true,floatingFilter: true, },
  // ]
  if(this.extra){
    this.columnDefs = [

      { headerName: "Sl.", field: "sl", sortable: true, filter: true, floatingFilter: this.floating_filter, 
        
        cellRenderer: params => {
          console.log(params.data)
  
        // Create the container div
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.justifyContent = "center";
      
        // Create the span for the serial number
        const serialSpan = document.createElement("span");
        serialSpan.textContent = params.value;
      
        // Create the button
        const button = document.createElement("button");
        button.style.border = "none";
        button.style.background = "none";
        button.style.marginLeft = "5px";
        button.style.cursor = "pointer";
        if(params.data.Full.Detail.length!==0){
        button.innerHTML = `<strong style="color: blue;"><i class=" fa fa-plus" style="font-size:15px; color:black" ></strong>`;
      
        // Attach event listener to the button
  
        button.addEventListener("click", () => {
          console.log("Row Data:", params.data);
          // alert(`You clicked on row with data: ${JSON.stringify(params.data)}`);
          this.Detail(params.data.Full)
        });
        }
        // Append span and button to the container
        container.appendChild(serialSpan);
        container.appendChild(button);
      
        return container;
          
    },
      width: 120 },
      // { headerName: "RouteType", field: "routeType", sortable: true, filter: true, floatingFilter: this.floating_filter },
      // { headerName: "Region", field: "region", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Origin", field: "origin", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Destination", field: "destination", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Route", field: "route", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Route Sequence", field: "routeSequence", sortable: true, filter: true, floatingFilter: this.floating_filter },
      // { headerName: "Fleet", field: "fleet", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "TripId", field: "tripId", sortable: true, filter: true, floatingFilter: this.floating_filter },
      // { headerName: "RunCode", field: "runCode", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Track History", field: "trackHistory", sortable: true, filter: true, floatingFilter: this.floating_filter , 
     
        cellRenderer: (params) => {
          const container = document.createElement('div');
        
          // Create Button 1
          if (params.data.Full?.TrackHistory1 !== 'NA') {
            const button1 = document.createElement('button');
            button1.innerHTML = `<strong style="color: blue;">
              <i class="fa fa-map-marker" style="font-size:17px; color:blue"></i>
            </strong>`;
            button1.style.marginRight = '5px';
            button1.addEventListener('click', () => {
              // alert(0)
              this.Detail(params.data.Full);
              this.vehicleTrackF_new(
                '',
                '',
                params.data.Full?.TrackHistory1.Imei,
                params.data.Full?.TrackHistory1.RnDt,
                params.data.Full?.TrackHistory1.Vno,
                params.data.Full?.TrackHistory1,
                params.data.Full?.TrackHistory1.ShpNo,
                params.data.Full?.TrackHistory1.Id
              );
            });
            container.appendChild(button1);
          } else {
            container.innerHTML += `<span style="color: black;">NA</span>`;
          }
        
          // Create Button 2
          if (params.data.Full?.TrackHistory2 !== 'NA') {
            const button2 = document.createElement('button');
            button2.innerHTML = `<strong style="color: blue;">
              <i class="fa fa-map-marker" style="font-size:17px; color:blue"></i>
            </strong>`;
            button2.style.marginRight = '5px';
            button2.addEventListener('click', () => {
              // alert(1)
              this.vehicleTrackF_new(
                '',
                '',
                params.data.Full?.TrackHistory2.Imei,
                params.data.Full?.TrackHistory2.RnDt,
                params.data.Full?.TrackHistory2.Vno,
                params.data.Full?.TrackHistory2,
                params.data.Full?.TrackHistory2.ShpNo,
                params.data.Full?.TrackHistory2.Id
              );
            });
            container.appendChild(button2);
          } else {
            container.innerHTML += `<span style="color: black;">NA</span>`;
          }
        
          // Create Button 3
          if (params.data.Full?.TrackHistory3 !== 'NA') {
            const button3 = document.createElement('button');
            button3.innerHTML = `<strong style="color: blue;">
              <i class="fa fa-map-marker" style="font-size:17px; color:blue"></i>
            </strong>`;
            button3.style.marginRight = '5px';
            button3.addEventListener('click', () => {
              this.vehicleTrackF_new(
                '',
                '',
                params.data.Full?.TrackHistory3.Imei,
                params.data.Full?.TrackHistory3.RnDt,
                params.data.Full?.TrackHistory3.Vno,
                params.data.Full?.TrackHistory3,
                params.data.Full?.TrackHistory3.ShpNo,
                params.data.Full?.TrackHistory3.Id
              );
            });
            container.appendChild(button3);
          } else {
            container.innerHTML += `<span style="color: black;">NA</span>`;
          }
        
          return container;
        },
        
        width: 150 },
      { headerName: "Run Date", field: "runDate", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Vehicle", field: "vehicle", sortable: true, filter: true, floatingFilter: this.floating_filter },
      // { headerName: "TrackHistory", field: "trackHistory", sortable: true, filter: true, floatingFilter: this.floating_filter , 
     
      
      
      // cellRenderer: (params) => {
      //   const container = document.createElement('div');
      
      //   // Create Button 1
      //   if (params.data.Full?.TrackHistory1 !== 'NA') {
      //     const button1 = document.createElement('button');
      //     button1.innerHTML = `<strong style="color: blue;">
      //       <i class="fa fa-map-marker" style="font-size:17px; color:blue"></i>
      //     </strong>`;
      //     button1.style.marginRight = '5px';
      //     button1.addEventListener('click', () => {
      //       // alert(0)
      //       this.Detail(params.data.Full);
      //       this.vehicleTrackF_new(
      //         '',
      //         '',
      //         params.data.Full?.TrackHistory1.Imei,
      //         params.data.Full?.TrackHistory1.RnDt,
      //         params.data.Full?.TrackHistory1.Vno,
      //         params.data.Full?.TrackHistory1,
      //         params.data.Full?.TrackHistory1.ShpNo,
      //         params.data.Full?.TrackHistory1.Id
      //       );
      //     });
      //     container.appendChild(button1);
      //   } else {
      //     container.innerHTML += `<span style="color: black;">NA</span>`;
      //   }
      
      //   // Create Button 2
      //   if (params.data.Full?.TrackHistory2 !== 'NA') {
      //     const button2 = document.createElement('button');
      //     button2.innerHTML = `<strong style="color: blue;">
      //       <i class="fa fa-map-marker" style="font-size:17px; color:blue"></i>
      //     </strong>`;
      //     button2.style.marginRight = '5px';
      //     button2.addEventListener('click', () => {
      //       alert(1)
      //       this.vehicleTrackF_new(
      //         '',
      //         '',
      //         params.data.Full?.TrackHistory2.Imei,
      //         params.data.Full?.TrackHistory2.RnDt,
      //         params.data.Full?.TrackHistory2.Vno,
      //         params.data.Full?.TrackHistory2,
      //         params.data.Full?.TrackHistory2.ShpNo,
      //         params.data.Full?.TrackHistory2.Id
      //       );
      //     });
      //     container.appendChild(button2);
      //   } else {
      //     container.innerHTML += `<span style="color: black;">NA</span>`;
      //   }
      
      //   // Create Button 3
      //   if (params.data.Full?.TrackHistory3 !== 'NA') {
      //     const button3 = document.createElement('button');
      //     button3.innerHTML = `<strong style="color: blue;">
      //       <i class="fa fa-map-marker" style="font-size:17px; color:blue"></i>
      //     </strong>`;
      //     button3.style.marginRight = '5px';
      //     button3.addEventListener('click', () => {
      //       this.vehicleTrackF_new(
      //         '',
      //         '',
      //         params.data.Full?.TrackHistory3.Imei,
      //         params.data.Full?.TrackHistory3.RnDt,
      //         params.data.Full?.TrackHistory3.Vno,
      //         params.data.Full?.TrackHistory3,
      //         params.data.Full?.TrackHistory3.ShpNo,
      //         params.data.Full?.TrackHistory3.Id
      //       );
      //     });
      //     container.appendChild(button3);
      //   } else {
      //     container.innerHTML += `<span style="color: black;">NA</span>`;
      //   }
      
      //   return container;
      // },
      
      // width: 150 },
      { headerName: "Driver Name", field: "driverName", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Driver Number", field: "driverNumber", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Driver Name (s)", field: "driverName_s", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Driver Number(s)", field: "driverNumber_s", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Transporter", field: "transporter", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "STD", field: "std", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "ATD", field: "atd", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Delay Departure", field: "delayDeparture", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "STA", field: "sta", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "ATA", field: "ata", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "TT-Mapped", field: "ttMapped", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "TT-Taken", field: "ttTaken", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Delay Arrival", field: "delayArrival", sortable: true, filter: true, floatingFilter: this.floating_filter },


      { headerName: "Primary GPS Distance (Km)", field: "PrimaryGPSDistance", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Secondary GPS Distance (Km)", field: "Secondary", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Ternary GPS Distance (Km)", field: "Ternary", sortable: true, filter: true, floatingFilter: this.floating_filter },
      
      { headerName: "Primary GPS Exception", field: "PrimaryGPSException", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Secondary GPS Exception", field: "SecondaryGPSException", sortable: true, filter: true, floatingFilter: this.floating_filter },{ headerName: "Primary GPS Exception", field: "PrimaryGPSException ", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Ternary GPS Exception", field: "TernaryGPSException", sortable: true, filter: true, floatingFilter: this.floating_filter },
     
      { headerName: "Trip Stauts", field: "TripStauts", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Create By", field: "CreateBy ", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Close By", field: "closeBy", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Close Date", field: "closeDate", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Create By", field: "createBy", sortable: true, filter: true, floatingFilter: this.floating_filter },
      // { headerName: "TotalBag", field: "totalBag", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Remarks", field: "remarks", sortable: true, filter: true, floatingFilter: this.floating_filter },

      { headerName: "Primary GPS Service Provider", field: "PrimaryGPSServiceProvider", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Secondary GPS Service Provider", field: "SecondaryGPSServiceProvider", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Ternary GPS Service Provider", field: "TernaryGPSServiceProvider", sortable: true, filter: true, floatingFilter: this.floating_filter },


      { headerName: "Primary IMEI", field: "PrimaryIMEI", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Secondary IMEI", field: "SecondaryIMEI", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Ternary IMEI", field: "TernaryIMEI", sortable: true, filter: true, floatingFilter: this.floating_filter },

      // { headerName: "Trip Close By Device", field: "TripCloseByDevice", sortable: true, filter: true, floatingFilter: this.floating_filter },
      { headerName: "Invoice Number", field: "InvoiceNumber", sortable: true, filter: true, floatingFilter: this.floating_filter },
      // { headerName: "E-Way Bill No.", field: "E_WayBillNo", sortable: true, filter: true, floatingFilter: this.floating_filter },


    ];
  } else{
  this.columnDefs = [

    { headerName: "Sl.", field: "sl", sortable: true, filter: true, floatingFilter: this.floating_filter, 
      
      cellRenderer: params => {
        console.log(params.data)

      // Create the container div
      const container = document.createElement("div");
      container.style.display = "flex";
      container.style.alignItems = "center";
      container.style.justifyContent = "center";
    
      // Create the span for the serial number
      const serialSpan = document.createElement("span");
      serialSpan.textContent = params.value;
    
      // Create the button
      const button = document.createElement("button");
      button.style.border = "none";
      button.style.background = "none";
      button.style.marginLeft = "5px";
      button.style.cursor = "pointer";
      if(params.data.Full.Detail.length!==0){
      button.innerHTML = `<strong style="color: blue;"><i class=" fa fa-plus" style="font-size:15px; color:black" ></strong>`;
    
      // Attach event listener to the button

      button.addEventListener("click", () => {
        console.log("Row Data:", params.data);
        // alert(`You clicked on row with data: ${JSON.stringify(params.data)}`);
        this.Detail(params.data.Full)
        // Call your functions here, e.g.:
        // this.vehicle_newFunction(params.data.full_data);
        // this.show_track(params.data.full_data);
      });
      }
      // Append span and button to the container
      container.appendChild(serialSpan);
      container.appendChild(button);
    
      return container;
        
  },
    width: 120 },
    // { headerName: "RouteType", field: "routeType", sortable: true, filter: true, floatingFilter: this.floating_filter },
    // { headerName: "Region", field: "region", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Origin", field: "origin", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Destination", field: "destination", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Route", field: "route", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Route Sequence", field: "routeSequence", sortable: true, filter: true, floatingFilter: this.floating_filter },
    // { headerName: "Fleet", field: "fleet", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Trip Id", field: "tripId", sortable: true, filter: true, floatingFilter: this.floating_filter },
    // { headerName: "RunCode", field: "runCode", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Run Date", field: "runDate", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Vehicle", field: "vehicle", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Track History", field: "trackHistory", sortable: true, filter: true, floatingFilter: this.floating_filter , 
      
      cellRenderer: (params) => {
        // Create the container div
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.justifyContent = "center";
      
        // Create the span for the serial number
        const serialSpan = document.createElement("span");
        serialSpan.textContent = params.value;
      
        // Append serial span to the container
        container.appendChild(serialSpan);
      
        // Helper function to create a button
        const createButton = (trackHistory, trackIndex) => {
          const button = document.createElement("button");
          button.style.border = "none";
          button.style.background = "none";
          button.style.marginLeft = "5px";
          button.style.cursor = "pointer";
      
          if (trackHistory !== 'NA') {
            button.innerHTML = `<strong style="color: blue;">
                                  <i class="fa fa-map-marker" style="font-size:17px; color:blue"></i>
                                </strong>|`;
            button.addEventListener("click", () => {
              console.log(`TrackHistory${trackIndex} Clicked`);
              console.log("Row Data:", params.data.Full);
              this.vehicleTrackF_new(
                '',
                '',
                trackHistory.Imei,
                trackHistory.RnDt,
                trackHistory.Vno,
                trackHistory,
                trackHistory.ShpNo,
                trackHistory.Id
              );
            });
          } else {
            button.innerHTML = `<span style="color: black;">Na</span>|`;
          }
      
          return button;
        };
      
        // Append buttons for TrackHistory1, TrackHistory2, and TrackHistory3
        if (params.data.Full?.TrackHistory1) {
          container.appendChild(createButton(params.data.Full.TrackHistory1, 1));
        }
        if (params.data.Full?.TrackHistory2) {
          container.appendChild(createButton(params.data.Full.TrackHistory2, 2));
        }
        if (params.data.Full?.TrackHistory3) {
          container.appendChild(createButton(params.data.Full.TrackHistory3, 3));
        }
      
        return container; // Return the container with all buttons
      },
      
      
    width: 150 },
    { headerName: "Driver Name", field: "driverName", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Driver Number", field: "driverNumber", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Driver Name (s)", field: "driverName_s", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Driver Number(s)", field: "driverNumber_s", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Transporter", field: "transporter", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "STD", field: "std", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "ATD", field: "atd", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Delay Departure", field: "delayDeparture", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "STA", field: "sta", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "ATA", field: "ata", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "TT-Mapped", field: "ttMapped", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "TT-Taken", field: "ttTaken", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Delay Arrival", field: "delayArrival", sortable: true, filter: true, floatingFilter: this.floating_filter },


    { headerName: "Primary GPS Distance (Km)", field: "PrimaryGPSDistance", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Secondary GPS Distance (Km)", field: "Secondary", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Ternary GPS Distance (Km)", field: "Ternary", sortable: true, filter: true, floatingFilter: this.floating_filter },
    
    { headerName: "Primary GPS Exception", field: "PrimaryGPSException", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Secondary GPS Exception", field: "SecondaryGPSException", sortable: true, filter: true, floatingFilter: this.floating_filter },{ headerName: "Primary GPS Exception", field: "PrimaryGPSException ", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Ternary GPS Exception", field: "TernaryGPSException", sortable: true, filter: true, floatingFilter: this.floating_filter },
   
    { headerName: "Trip Stauts", field: "TripStauts", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Create By", field: "CreateBy ", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Close By", field: "closeBy", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Close Date", field: "closeDate", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Create By", field: "createBy", sortable: true, filter: true, floatingFilter: this.floating_filter },
    // { headerName: "TotalBag", field: "totalBag", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Remarks", field: "remarks", sortable: true, filter: true, floatingFilter: this.floating_filter },

    { headerName: "Primary GPS Service Provider", field: "PrimaryGPSServiceProvider", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Secondary GPS Service Provider", field: "SecondaryGPSServiceProvider", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Ternary GPS Service Provider", field: "TernaryGPSServiceProvider", sortable: true, filter: true, floatingFilter: this.floating_filter },


    { headerName: "Primary IMEI", field: "PrimaryIMEI", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Secondary IMEI", field: "SecondaryIMEI", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Ternary IMEI", field: "TernaryIMEI", sortable: true, filter: true, floatingFilter: this.floating_filter },

    // { headerName: "Trip Close By Device", field: "TripCloseByDevice", sortable: true, filter: true, floatingFilter: this.floating_filter },
    { headerName: "Invoice Number", field: "InvoiceNumber", sortable: true, filter: true, floatingFilter: this.floating_filter },
    // { headerName: "E-Way Bill No.", field: "E_WayBillNo", sortable: true, filter: true, floatingFilter: this.floating_filter },
    // { headerName: "E-Way Bill No.", field: "Full", sortable: true, filter: true, floatingFilter: this.floating_filter ,hide:true},
   ];}
  //  console.log(this.new_array)
  this.rowData = this.new_array.map((person, index) => ({

    sl: index + 1,
    routeType: person.route_type ?? "",
    origin: person.Source ?? "",
    destination: person.Destination ?? "",
    route: person.RouteCode ?? "",
    routeSequence: person.RouteName ?? "",
    fleet: person.FleetNo ?? "",
    tripId: person.ShipmentNo,
    runDate: person.RunDate ?? "",
    vehicle: person.VehicleNo ?? "",
    trackHistory: "",
    driverName: person.Driver ?? "",
    driverNumber: person.DriverMobile ?? "",
    driverName_s: person.Driver_S ?? "",
    driverNumber_s: person.DriverMobile_S ?? "",
    transporter: person.Transporter ?? "",
    std: person.STD ?? "", // Standard Time of Departure
    atd: person.ATD ?? "", // Actual Time of Departure
    delayDeparture: person.DelayDeparture ?? "",
    sta: person.STA ?? "", // Standard Time of Arrival
    ata: person.ATA ?? "", // Actual Time of Arrival
    ttMapped: person.TTMapped ?? "",
    ttTaken: person.TTTaken ?? "",
    delayArrival: person.DelayArrival ?? "",
    PrimaryGPSDistance: person.DistanceKm1 ?? "",
    Secondary: person.DistanceKm2 ?? "",
    Ternary: person.DistanceKm3 ?? "",
    PrimaryGPSException: person.GPSException1 ?? "",
    SecondaryGPSException: person.GPSException2 ?? "",
    TernaryGPSException: person.GPSException3 ?? "",
    TripStauts: person.TripStatus ?? "",
    closeBy: person.CloseBy ?? "",
    closeDate: person.CloseDate ?? "",
    createBy: person.CreateBy ?? "",
    totalBag: person.Bag ?? "",
    remarks: person.Remarks ?? "",
    PrimaryGPSServiceProvider: person.GPSVendorType1 ?? "",
    SecondaryGPSServiceProvider: person.GPSVendorType2 ?? "",
    TernaryGPSServiceProvider: person.GPSVendorType3 ?? "",
    PrimaryIMEI: person.Imei1 ?? "",
    SecondaryIMEI: person.Imei2 ?? "",
    TernaryIMEI: person.Imei3 ?? "",
    TripCloseByDevice: person.TripCloseByDevice ?? "",
    InvoiceNumber: person.InvoiceNo ?? "",
    Full: person ?? "",
  }));
  

this.gridOptions = {
    rowHeight: 30,
    headerHeight: 40,
    
    columnDefs: this.columnDefs,
    rowData: this.rowData,
    pagination: true,
    paginationPageSize: 50,
    paginationPageSizeSelector: [10, 50, 100,500,1000],
   
    animateRows: true,

    onGridReady: (params) => this.onGridReady(params),
   
    // onGridReady: (params: any) => {
    //   this.gridOptions.api = params.api; // Store API reference for later use
    // },
   

  //   onGridReady: (params) => {
  //     this.gridApi = params.api; // Store the API for later use
  //     console.log('Grid API methods:', Object.getOwnPropertyNames(this.gridApi)); // Log the available API methods
  // },
    // onGridReady: this.onGridReady.bind(this),  // Call `onGridReady` when the grid is ready
    // onCellClicked: (event) => {
    //   if (event.colDef.field === 'user_name') {
    //     // this.onUserClick(event.value); // Call your method
    //   }
    // },
  
  };
  
 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

this.gridOptions = {
    rowHeight: 30,
    headerHeight: 40,
    
    columnDefs: this.columnDefs,
    rowData: this.rowData,
    pagination: true,
    paginationPageSize: 50,
    paginationPageSizeSelector: [10, 50, 100,500,1000],
   
    animateRows: true,
    onGridReady: (params) => this.onGridReady(params),
   
    // onGridReady: (params: any) => {
    //   this.gridOptions.api = params.api; // Store API reference for later use
    // },
   

  //   onGridReady: (params) => {
  //     this.gridApi = params.api; // Store the API for later use
  //     console.log('Grid API methods:', Object.getOwnPropertyNames(this.gridApi)); // Log the available API methods
  // },
    // onGridReady: this.onGridReady.bind(this),  // Call `onGridReady` when the grid is ready
    // onCellClicked: (event) => {
    //   if (event.colDef.field === 'user_name') {
    //     // this.onUserClick(event.value); // Call your method
    //   }
    // },
  
  };
  const gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, this.gridOptions);
 }








 
  onSearch(term: any) {
    console.log(term)
    const formdataCustomer = new FormData();
    formdataCustomer.append('AccessToken', this.token);
    formdataCustomer.append('searchQuery',term.term);
    // formdataCustomer.append('route_id', route_id);
  
    this.CrudService.getBdVehicle(formdataCustomer).subscribe((res: any) => {
      console.log(res)
      this.dataList = res.Data;
    })
    // this.searchInput.next(term); // Emit the input value
  }
 onGridReady(params: any) {
  this.gridApi = params.api;
 
  // this.gridOptions.api = params.api;
  console.log('Grid API:', this.gridApi); // Check if API is assigned correctly
}
exportAsExcel() {
  if (this.gridApi) {
    this.gridApi.exportDataAsCsv({ fileName: 'table-data.csv' });
  }
}


onGridReady_pop(params: any) {
 
  this.gridApi_popup = params.api;
}
exportAsExcel_pop() {
  if (this.gridApi_popup) {
    this.gridApi_popup.exportDataAsCsv({ fileName: 'table-data.csv' });
  }
}
bdTripReportFilter(){
  var formdata=new FormData()
  formdata.append('AccessToken',this.token)
  
  this.CrudService.bdTripReportFilter(formdata).subscribe((data:any) => {
    // console.log(data)
    if(data.Status=="success"){
      this.Master_filter=data.Filter.Master;
      console.log(data.Filter)
    }else{
      alert("Data not found ")
    }
    // console.log(data)
  })
}
triggerHstSubmit(eve){
  this.search_grid=true;
  this.submit=true;
// alert(0)
  // console.log(eve.form.status,eve)
  if(eve.form.status=='VALID'){
    this.SpinnerService.show();
  var formdata=new FormData()
  console.log($("#datepicker").val());
  formdata.append('AccessToken',this.token);
  // formdata.append('DateFrom',$("#datepicker").val());
  // formdata.append('DateTo', $("#datepicker1").val());
  var starteDate:any=this.datepipe.transform($("#datepicker").val(), 'yyyy-MM-dd');
  var endDate:any=this.datepipe.transform($("#datepicker1").val(), 'yyyy-MM-dd');
   formdata.append('DateFrom',starteDate)
   formdata.append('DateTo', endDate)
  formdata.append('ReportType',eve.value.ReportType);

  // formdata.append('DateFrom','2024-12-04')
  // formdata.append('DateTo','2024-12-04')
  
  if(eve.value.TripId){
    formdata.append('TripId',eve.value.TripId)
  }else{
    // RouteType,RouteCategory,Origin,Destination,Route,Region,TripStatus,VehicleNo,SupervisorException
    if(eve.value.Feeder){formdata.append('RouteType',eve.value.Feeder)}
   if(eve.value.TripType){ formdata.append('RouteCategory',eve.value.TripType)}
   if(eve.value.Origin){ formdata.append('Origin',eve.value.Origin)}
   if(eve.value.Destination){ formdata.append('Destination',eve.value.Destination)}
   if(eve.value.Route) {formdata.append('Route',eve.value.Route)}
   if(eve.value.Region){ formdata.append('Region',eve.value.Region)}
   if(eve.value.TripStatus){ formdata.append('TripStatus',eve.value.TripStatus)}
   if(eve.value.vehicle_number){ formdata.append('VehicleNo',eve.value.vehicle_number)}
  }
  this.CrudService.bdTripReport(formdata).subscribe((data:any) => {
    this.submit=false;
    console.log(data)
    if(data.Status=="success"){
      this.new_array=data.Report;
      // console.log(this.new_array)
      this.Grid_table();
      this.SpinnerService.hide();
    }else{
      alert("Data not found ")
      this.SpinnerService.hide();
    }
    // console.log(data)
  })

}
}


onFilterTextBoxChanged() {
  // console.log("hii");
  
  this.gridApi.setGridOption(
    "quickFilterText",
    (document.getElementById("filter-text-box") as HTMLInputElement).value,
  )
}
onFilterTextBoxChanged_pop() {
  // console.log("hii");
  
  this.gridApi_popup.setGridOption(
    "quickFilterText",
    (document.getElementById("filter-text-box-pop") as HTMLInputElement).value,
  )
}


// exportToPDF(): void {
  
//   const headers = this.columnDefs.map((col) => col.headerName);
//   const body = this.rowData.map((row) =>
//     this.columnDefs.map((col) => row[col.field])
//   );
//   body.unshift(headers);

//   const docDefinition = {
//     content: [
//       { text: 'Vehicle Nearby Data', style: 'header', alignment: 'center' },
//       { text: '\n' },
//       {
//         table: {
//           headerRows: 1,
//           widths: Array(headers.length).fill('auto'),
//           body: body,
//         },
//         layout: {
//           fillColor: (rowIndex) => (rowIndex === 0 ? '#0074D9' : null),
//           hLineWidth: () => 0.5,
//           vLineWidth: () => 0.5,
//         },
//       },
//     ],
//     pageOrientation: 'landscape',
//     styles: {
//       header: {
//         fontSize: 18,
//         bold: true,
//         margin: [0, 0, 0, 10],
//       },
//       tableHeader: {
//         bold: true,
//         fontSize: 12,
//         color: 'white',
//         fillColor: '#0074D9',
//         alignment: 'center',
//       },
//       tableBody: {
//         fontSize: 10,
//       },
//     },
//     defaultStyle: {
//       fontSize: 9,
//     },
//   };

//   pdfMake.createPdf(docDefinition).download('vehicle-nearby-data.pdf');
// }
// exportToPDF() {
//   const { jsPDF } = window.jspdf;
//   const doc = new jsPDF();
//   let row = ; // Initial row position
//   const pageHeight = doc.internal.pageSize.height;
//   const pageWidth = doc.internal.pageSize.width;

//   doc.setFontSize(12);

//   // Calculate dynamic column width based on page size and number of columns
//   const colWidth = pageWidth / this.columnDefs.length;
  
//   // Adding table headers
//   this.columnDefs.forEach((col, index) => {
//     doc.text(col.headerName, 10 + index * colWidth, row, { maxWidth: colWidth - 2 });
//   });

//   row += 10;

//   // Adding row data
//   this.rowData.forEach((data, dataIndex) => {
//     let colPos = 10;
//     this.columnDefs.forEach((col) => {
//       const text = data[col.field]?.toString() || '';
//       const wrappedText = doc.splitTextToSize(text, colWidth - 2);
//       doc.text(wrappedText, colPos, row, { maxWidth: colWidth - 2 });
//       colPos += colWidth;
//     });

//     // Move to the next row
//     row += 10;

//     // Check if we need to add a new page
//     if (row >= pageHeight - 10) {
//       doc.addPage(); // Add a new page
//       row = 10; // Reset row position

//       // Re-add headers on the new page
//       this.columnDefs.forEach((col, index) => {
//         doc.text(col.headerName, 10 + index * colWidth, row, { maxWidth: colWidth - 2 });
//       });
//       row += 10; // Move down for the next data row
//     }
//   });

//   doc.save('table-data.pdf');
// }


onBtExport() {
// this.gridApi!.exportDataAsExcel();
this. gridApi!.exportDataAsCsv();
}
onBtExport_pop() {
  // this.gridApi!.exportDataAsExcel();
  this. gridApi_popup!.exportDataAsCsv();
  }

// ------------------------------------------------MAP---------------------------------------------
handleAlertMarkers(item) {
  if (this.demomarker.length > 0) {
    this.demomarker.forEach(marker => marker.setMap(null));
    this.demomarker = [];  // Clear the array after removing markers
  }
  // console.log("handleAlertMarkers",item)
  item.forEach(alert => {
    // Check for alert_name and provide a fallback if it's undefined
    const alertName = alert.alert_type
      ? alert.alert_type.toString().substring(0, 5) // Limit to 5 characters
      : 'Unknown Alert'; // Fallback to 'Unknown Alert'

    // let markerLabel = new google.maps.Marker({
    //   map: this.map1,
    //   position: new google.maps.LatLng(alert.lat, alert.lng),
    //   title: `${alert.lat},${alert.lng}`,
    //   icon: {
    //     url: "assets/images/users/icons-flag-big.png",
    //     labelOrigin: new google.maps.Point(20, 15),

    //   },
    //   label: {
    //     text: alertName, // Safe to use with a fallback value
    //     color: 'white',
    //     fontSize: "12px",
    //     fontWeight: "bold",
    //     // fontFamily: 'Tangerine',
    //     textalign: 'center',
    //     Position: 'relative',
    //     // color: "black"
    //   },
    // });

    // this.demomarker.push(markerLabel);
  
  
  
    const locationOfMarker = { lat:alert.lat, lng:alert.lng };
      var html = document.createElement('div'),
      divIcon = document.createElement('div'),
      divText = document.createElement('div'),
      imgIco = document.createElement('img');
    imgIco.setAttribute('src', 'assets/images/users/icons-flag-big.png');
    // Set the size of the image
     imgIco.style.width = '42px';  // Adjust the width as needed
     imgIco.style.height = '40px'; // Adjust the height as needed
    divText.setAttribute("class", "textData");
    html.setAttribute("class", "parentDiv");

    divIcon.appendChild(imgIco);
    divText.textContent = alertName;
    divText.innerHTML = alertName;
    html.appendChild(divIcon);
    html.appendChild(divText);
    divText.style.top = '35%';
    divText.style.left = '50%';
    divText.style.fontSize = '12px';
    divText.style.position = 'absolute';
    divText.style.transform = 'translate(-50%, -50%)';
    divText.style.color = 'white'; // Set label color for visibility
    divText.style.fontWeight = 'bold'; // Make the label text bold if needed
    // const domIcon = document.createElement('div');
  //  domIcon.innerHTML = '<i class="fa fa-marker" style="font-size:24px; color:red;"></i>'; 
    var domIcon = new H.map.DomIcon(html);
    var marker = new H.map.DomMarker(locationOfMarker, {
      icon: domIcon,
      anchor: { x: 1, y: 1 }
    });

this.map1.addObject(marker)

this.markers.push(marker);

  
  
  
  
  
  
  
  
  });
}

async vehicleTrackF_new(imei, imei2, imei3, run_date, vehicle_no, item, Id, route_id) {
  // console.log(imei, imei2, imei3, run_date, vehicle_no, item, Id, route_id);
  
  // Clear markers and polylines before starting
  this.clearMarkersAndPolylines();
  
  // Initialize map
  try {
    await this.initializeMap();
  } catch (error) {
    console.error('Error initializing map:', error);
    this.SpinnerService.hide('spinner-1');
  }

  // Show tracking spinner
  this.SpinnerService.show("tracking");
  
  // Define the array of IMEIs to process
  // const imeis = [imei,imei2,imei3];
  const imeis = [imei,imei2,imei3];
  console.log(imeis);
  
  // Loop through each IMEI using a for...of loop to support async/await
  for (const imei of imeis) {
    // console.log(imei);
    
    // Reset tracking data for each IMEI
    this.trackingData = [];
    this.customer_info = [];
    this.marker = [];
    this.poly_line = [];
    this.map_flag = '';

    if (imei === "") {
      this.map_flag = 'Device unavailable';
    } else {
      this.map_flag = 'Please wait';
      const formData = new FormData();
      
      let currentDateTime: any = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
      if(item.CloseDt!=='-'){
        currentDateTime=item.CloseDt;
      }

      formData.append('AccessToken', this.token);
      formData.append('startdate', run_date);
      formData.append('enddate', currentDateTime);
      formData.append('time_interval', '120');
      formData.append('imei', imei);
      formData.append('group_id', this.group_id);
      formData.append('AccountId', this.account_id);
      try {
        // Wait for the API response
        const res: any = await this.CrudService.vehicleTrackongS(formData).toPromise();
        // console.log("tracking res", res);

        if (res.Status === "failed") {
          alert(res?.Message);
        }

        this.trackingData = res.data;

        if (res.data === 'Vehicle is inactive.') {
          alert("Track data is not available");
        } else {
          console.log("trackingData",this.trackingData)
          // Add markers and polyline data
          this.addMarkersAndPolyline1(imei, vehicle_no);
          // Fetch DFG polyline data
          // this.fetchDFGPolyline_new(route_id);
      
          // Fetch customer info
          this.fetchCustomerInfo_new(item);
      
          // Handle alert markers
          // this.handleAlertMarkers(item);
        }

      } catch (error) {
        console.error("Error in API call:", error);
        alert("An error occurred while fetching tracking data");
      }
      
      // Hide the tracking spinner after the API call
      this.SpinnerService.hide("tracking");
    }
  }
}

getMarkerIcon(index: number): string {
  if (index === 0) {
    return 'assets/images/users/start_marker.png';
  }
  else if (index + 1 === this.trackingData.length) {

    setTimeout(() => {
      this.SpinnerService.hide("tracking");
    }, 5000);
    return 'assets/images/users/stop_marker.png';
  } else {
    return 'assets/images/users/green_Marker1.png';
  }
}
addMarkersAndPolyline1(imei: string, vehicle_no: string) {
  var lineString = new H.geo.LineString();

let minLat = Infinity, minLng = Infinity, maxLat = -Infinity, maxLng = -Infinity;
// const ui = H.ui.UI.createDefault(this.map1, new H.map.Platform({apikey: 'MoBysY-1fH4koFS2rGUDpwvRHSLfdX4GWYsRJUlB8VY'}).createDefaultLayers());
const platform = new H.service.Platform({
apikey: 'MoBysY-1fH4koFS2rGUDpwvRHSLfdX4GWYsRJUlB8VY'  // Replace with your actual API key
});
const defaultLayers = platform.createDefaultLayers();
const ui = H.ui.UI.createDefault(this.map1, defaultLayers);
for (let i = 0; i < this.trackingData.length; i++) {
const position :any= this.trackingData[i];
lineString.pushPoint({ lat: this.trackingData[i].lat, lng: this.trackingData[i].long });

const locationOfMarker = { lat: position.lat, lng: position.long };

const icon_temp = this.getMarkerIcon(i);
const marker = this.createMarker(locationOfMarker, icon_temp, '2');

// Add the marker to the map
this.map1.addObject(marker);
this.markers.push(marker);





// Attach click event to each marker
marker.addEventListener('tap',  async (evt) => {
//  var position= evt.latLng.lat()
  // Remove existing bubbles, if any
  ui.getBubbles().forEach(bubble => ui.removeBubble(bubble));
  
  // Create content for the info window
  // const infoContent =this.handleMarkerClick(evt, this.trackingData[i], vehicle_no, imei)
  console.log(position,i)
  const infoContent = await this.handleMarkerClick(evt, position, vehicle_no, imei);

  //  `<div>Marker #${i + 1}<br>Latitude: ${position.lat}<br>Longitude: ${position.long}</div>`;
   
  // Create an info bubble at the marker's location
  const infoBubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
    content: infoContent
  });

  // Add the info bubble to the map
  ui.addBubble(infoBubble);
});















// Update min and max lat/lng values to create bounding box
minLat = Math.min(minLat, position.lat);
minLng = Math.min(minLng, position.long);
maxLat = Math.max(maxLat, position.lat);
maxLng = Math.max(maxLng, position.long);
}

// Define padding in degrees (adjust as needed)
const padding = 0.01;

// Create a bounding box with padding
const boundingBox = new H.geo.Rect(
maxLat + padding,    // Top latitude (maxLat + padding)
minLng - padding,    // Left longitude (minLng - padding)
minLat - padding,    // Bottom latitude (minLat - padding)
maxLng + padding     // Right longitude (maxLng + padding)
);

// Set the map view to fit all markers within the padded bounding box
this.map1.getViewModel().setLookAtData({
bounds: boundingBox
});



console.log("lineString",lineString)
  this.addPolylineToMap(lineString)
}
handleMarkerClick1(event, trackingData, vehicle_no, imei) {
  const markerPosition = event.target.getGeometry();
  const formdataCustomer = new FormData();
  formdataCustomer.append('AccessToken', this.token);
  formdataCustomer.append('VehicleId', vehicle_no);
  formdataCustomer.append('ImeiNo', imei);
  formdataCustomer.append('LatLong', `${markerPosition.lat},${markerPosition.lng}`);

  this.CrudService.addressS(formdataCustomer).subscribe((res: any) => {
    const address = res.Data.Address;
    this.showWindow(trackingData, vehicle_no, address);
    // this.closeLastOpenedInfoWindow();
    // const infowindowMarker = new google.maps.InfoWindow({ content: this.contentsInfo });
    // infowindowMarker.setPosition(event.latLng);
    // infowindowMarker.open(this.map1);
  });
}
async handleMarkerClick(event, trackingData, vehicle_no, imei) {
  const markerPosition = event.target.getGeometry();
  const formdataCustomer = new FormData();
  formdataCustomer.append('AccessToken', this.token);
  formdataCustomer.append('VehicleId', vehicle_no);
  formdataCustomer.append('ImeiNo', imei);
  formdataCustomer.append('LatLong', `${markerPosition.lat},${markerPosition.lng}`);

  const res:any = await this.CrudService.addressS(formdataCustomer).toPromise(); // Assuming it returns an observable
 console.log("res",res)
  const address = res.Data.Address;
  
  return this.showWindow(trackingData, vehicle_no, address); // Return the content
}

showWindow(data, vnumber, add) {
  // var add:any
  this.contentsInfo = ''
  console.log('show window of vehicle information', data, add)
  /////////////////////////address api////////////////////////////////////////////////////



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////  

return  this.contentsInfo = '<table style="line-height: 16px; border:none !important">' +
    '<tbody style="border:none !important">' +

    '<tr style=" border:none !important">' +
    '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Lat Long</td>' +
    '<td style="width:1%;color: blue;border:none !important">:</td>' +
    '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.lat + ',' + data.long + '</td>' +
    '</tr>' +
    '<tr style=" border:none !important">' +
    '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Vehicle No</td>' +
    '<td style="width:1%;color: blue;border:none !important">:</td>' +
    '<td style=" border:none !important;color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + vnumber + '</td>' +
    '</tr>' +
    '<tr style=" border:none !important">' +
    '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Address</td>' +
    '<td style="border:none !important;width:1%;color: blue;">:</td>' +
    '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500;" ><div style=" width: 250px;  word-wrap: break-word;  overflow-wrap: break-word; word-break: break-all;   line-height: 1.2;    white-space: normal;">' + add + '</div></td>' +
    '</tr>' +
    '<tr style=" border:none !important">' +
    '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Imei</td>' +
    '<td style="border:none !important;width:1%;color: blue;">:</td>' +
    '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.imei + '</td>' +
    '</tr>' +
    '<tr style=" border:none !important">' +
    '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Date Time</td>' +
    '<td style="border:none !important;width:1%;color: blue;">:</td>' +
    '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.device_time + '</td>' +
    '</tr>' +
    '<tr style=" border:none !important">' +
    '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Speed(km/hr)</td>' +
    '<td style="border:none !important;width:1%;color: blue;">:</td>' +
    '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.speed + '</td>' +
    '</tr>' +
    '<tr style=" border:none !important">' +
    '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Server Time</td>' +
    '<td style="border:none !important;width:1%;color: blue;">:</td>' +
    '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.server_time + '</td>' +
    '</tr>' +
    '<tr style=" border:none !important">' +
    '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Distance</td>' +
    '<td style="border:none !important;width:1%;color: blue;">:</td>' +
    '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.distance + '</td>' +
    '</tr>' +
    '<tr style=" border:none !important">' +
    '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Location Type</td>' +
    '<td style="border:none !important;width:1%;color: blue;">:</td>' +
    '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.loc_type + '</td>' +
    '</tr>' +
    '</tbody>' +
    '</table>'






}

// Assuming you have imported or included Supercluster in your project

// addMarkersAndPolyline1(imei: string, vehicle_no: string) {
//   // Clear previous markers if needed
//   this.markers.forEach(marker => {
//       this.map1.removeObject(marker);
//   });
//   this.markers = []; // Reset markers array

//   // Prepare to collect points for clustering
//   const geojsonPoints:any = [];
//   const validPoints: any[] = [];
//   const lineString = new H.geo.LineString();

//   requestAnimationFrame(() => {
//       this.trackingData.forEach((position, i) => {
//           lineString.pushPoint({ lat: position.lat, lng: position.long });

//           const icon_temp = this.getMarkerIcon(i);
//           const icon = new H.map.Icon(icon_temp);

//           // Create a new point for clustering
//           geojsonPoints.push({
//               type: 'Feature',
//               properties: {
//                   cluster: false,
//                   markerId: i,
//               },
//               geometry: {
//                   type: 'Point',
//                   coordinates: [position.long, position.lat], // Note: longitude first, then latitude
//               },
//           });

//           validPoints.push(new H.geo.Point(position.lat, position.long));
//       });

//       // Create a Supercluster instance
//       const cluster = new Supercluster({
//           radius: 60,
//           maxZoom: 15,
//       });

//       // Load points into the cluster
//       cluster.load(geojsonPoints);

//       // Get clusters for the current map bounds
//       const bounds = this.map1.getViewModel().getLookAtData().bounds;

//       // Extract the coordinates from the bounds object
//       if (bounds.Fb && Array.isArray(bounds.Fb.S)) {
//           const coords = bounds.Fb.S;
//           const west = Math.min(coords[1], coords[4], coords[7], coords[10]); // Longitudes
//           const south = Math.min(coords[0], coords[3], coords[6], coords[9]); // Latitudes
//           const east = Math.max(coords[1], coords[4], coords[7], coords[10]); // Longitudes
//           const north = Math.max(coords[0], coords[3], coords[6], coords[9]); // Latitudes

//           const clusters = cluster.getClusters([west, south, east, north], this.map1.getZoom());

//           // Add cluster markers to the map
//           clusters.forEach(cluster => {
//               const [lng, lat] = cluster.geometry.coordinates;
//               const marker = new H.map.Marker({ lat, lng });

//               // Customize the marker based on whether it's a cluster or an individual point
//               if (cluster.properties.cluster) {
//                   marker.setIcon(new H.map.Icon('path/to/cluster-icon.svg')); // Replace with your cluster icon
//               } else {
//                   marker.setIcon(new H.map.Icon('path/to/individual-icon.svg')); // Replace with your individual icon
//               }

//               this.map1.addObject(marker);
//               this.markers.push(marker); // Store the marker for later use

//               // Optional: Add click event to show info
//               marker.addEventListener('click', () => {
//                   console.log(cluster.properties.markerId); // Or use other properties as needed
//               });
//           });

//           // Create and add polyline to the map
//           const polyline = new H.map.Polyline(lineString, {
//               style: { strokeColor: 'green', lineWidth: 4 }
//           });
//           this.map1.addObject(polyline);

//           // Set the view to encompass all markers
//           if (validPoints.length > 0) {
//               // const rect = H.geo.Rect.fromPoints(validPoints);
//               // this.map1.getViewModel().setLookAtData({ bounds: rect });
//               this.map1.setCenter(validPoints[0]);
//               this.map1.setZoom(8); // Optional: set default zoom level
//           }
//       } else {
//           console.error("Bounds do not contain expected structure:", bounds);
//       }
//   });
// }


createMarker(point, ico, label = '') {

  var html = document.createElement('div'),
    divIcon = document.createElement('div'),
    divText = document.createElement('div'),
    imgIco = document.createElement('img');
  imgIco.setAttribute('src', ico);
  divText.setAttribute("class", "textData");
  // html.setAttribute("class", "parentDiv");

  divIcon.appendChild(imgIco);
  // divText.textContent = label;
  //divText.innerHTML = label;
  html.appendChild(divIcon);
  html.appendChild(divText);

  var domIcon = new H.map.DomIcon(html);
  var marker = new H.map.DomMarker(point, {
    icon: domIcon,
    anchor: { x: 1, y: 10 }
  });
  return marker;
}
fetchCustomerInfo_new(Full: any) {
  console.log(Full)
  this.customer_info = []
  // if (this.demomarker.length > 0) {
  //   this.demomarker.forEach(marker => marker.setMap(null));
  //   this.demomarker = [];  // Clear the array after removing markers
  // }
  const platform = new H.service.Platform({
    apikey: 'MoBysY-1fH4koFS2rGUDpwvRHSLfdX4GWYsRJUlB8VY'  // Replace with your actual API key
  });
  const defaultLayers = platform.createDefaultLayers();
  const ui = H.ui.UI.createDefault(this.map1, defaultLayers);
  const markers: google.maps.Marker[] = [];
  if (this.demomarker.length > 0) {
    this.demomarker.forEach(marker => {
      console.log("Removing marker from map", marker);
      marker.setMap(null);
    });
    this.demomarker = [];  // Clear the array after removing markers
    // console.log("Marker array cleared");
  }
  const custNameArray = Full.CustName.split('`~');
  const rutCdArray = Full.RutCd.split('-');
  const custGeoArray = Full.CustGeo.split('|');
  const CustVisited=Full.CustVisited.split(':');
  // Combine into an array of objects
  const result = custNameArray.map((name, index) => ({
    CustName: name,
    RutCd: rutCdArray[index],
    CustGeo: custGeoArray[index],
    CustVisited:CustVisited[index]
  }));
  
  console.log(result);
  this.customer_info=result;
  // this.CrudService.tripCustomerS(formdataCustomer).subscribe((res: any) => {
    // console.log("dddddddddddddddddddd",res)
    // if(res.message=="success" && res.customer_info!==null){
      // this.customer_info = res.customer_info;
       
      // Log the customer data for debugging
      // console.log("Customer Info:", this.customer_info);
  
      this.customer_info.forEach((customer:any, index) => {
  
        const sequenceNo = 'M'+index; // Ensure this is a string
     
       
        const latlng = customer.CustGeo.split(',');
  
        const locationOfMarker = { lat:latlng[0], lng:latlng[1] };
        var html = document.createElement('div'),
        divIcon = document.createElement('div'),
        divText = document.createElement('div'),
        imgIco = document.createElement('img');
      imgIco.setAttribute('src', 'assets/imagesnew/redmarker_end.png');
      // Set the size of the image
       imgIco.style.width = '26px';  // Adjust the width as needed
       imgIco.style.height = '37px'; // Adjust the height as needed
      divText.setAttribute("class", "textData");
      html.setAttribute("class", "parentDiv");
  
      divIcon.appendChild(imgIco);
      divText.textContent = sequenceNo;
      divText.innerHTML = sequenceNo;
      html.appendChild(divIcon);
      html.appendChild(divText);
      divText.style.top = '40%';
      divText.style.left = '50%';
      divText.style.position = 'absolute';
      divText.style.transform = 'translate(-50%, -50%)';
      divText.style.color = 'black'; // Set label color for visibility
      divText.style.fontWeight = 'bold'; // Make the label text bold if needed
      // const domIcon = document.createElement('div');
    //  domIcon.innerHTML = '<i class="fa fa-marker" style="font-size:24px; color:red;"></i>'; 
      var domIcon = new H.map.DomIcon(html);
      var marker = new H.map.DomMarker(locationOfMarker, {
        icon: domIcon,
        // anchor: { x: 1, y: 1 }
      });
  
  this.map1.addObject(marker)
  
  this.markers.push(marker);
  
  
  
  
  marker.addEventListener('tap',  async (evt) => {
  //  var position= evt.latLng.lat()
    // Remove existing bubbles, if any
    ui.getBubbles().forEach(bubble => ui.removeBubble(bubble));
    
    // Create content for the info window
    // const infoContent =this.handleMarkerClick(evt, this.trackingData[i], vehicle_no, imei)
    const infoContent = await this.handleCustomerMarkerClick(evt, index);
  
    console.log("infoContent",infoContent)
    //  `<div>Marker #${i + 1}<br>Latitude: ${position.lat}<br>Longitude: ${position.long}</div>`;
     
    // Create an info bubble at the marker's location
    const infoBubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
      content: infoContent
    });
  
    // Add the info bubble to the map
    ui.addBubble(infoBubble);
  });
   });
    // }
   
    // this.demomarker=markers;
  // });
}
addPolylineToMap(lineString) {
  
  var polyline =(new H.map.Polyline(
    lineString, { style: { lineWidth: 3, strokeColor: 'green'}}
  ));
  this.map1.addObject(polyline);
  this.polylines.push(polyline);
}

fetchDFGPolyline_new(route_id: string) {
  const formdataCustomer = new FormData();
  formdataCustomer.append('AccessToken', this.token);
  formdataCustomer.append('forGroup', this.group_id);
  formdataCustomer.append('route_id', route_id);

  this.CrudService.vehicle_dfgS(formdataCustomer).subscribe((res: any) => {
    if (res.Polyline) {
      const dfgPolyline: google.maps.LatLng[] = [];
      const str = res.Polyline.replace(/ *\^[^~]*\~ */g, "");
      const arry2 = str.split(/[,( )]+/);
      var lineString = new H.geo.LineString();

      for (let i = 1; i < arry2.length - 1; i += 2) {
        const lat = parseFloat(arry2[i]);
        const lng = parseFloat(arry2[i + 1]);

        if (!isNaN(lat) && !isNaN(lng)) {
          // const latLng = new google.maps.LatLng(lat, lng);
          // dfgPolyline.push(latLng);
          lineString.pushPoint({ lat:lat, lng: lng });
        }
      }

      
        var polyline =(new H.map.Polyline(
          lineString, { style: { lineWidth: 3, strokeColor: 'green'}}
        ));
        this.map1.addObject(polyline);
        this.polylines.push(polyline);
      

      // this.demoPolyline.push(polyline);
    }
  });
}
clearMarkersAndPolylines() {
  // Clear existing markers
  if (this.markers.length > 0) {
    this.markers.forEach(marker => this.map1.removeObject(marker));
    this.markers = []; // Reset the markers array
  }

  // Clear existing polylines
  if (this.polylines?.length > 0) {
    this.polylines?.forEach(polyline => this.map1.removeObject(polyline));
    this.polylines = []; // Reset the polylines array
  }
}


handleCustomerMarkerClick(event, index) {
const customer = this.customer_info[index];
const customer_Info = this.generateCustomerInfo(customer);
return customer_Info;
// this.closeLastOpenedInfoWindow();
// const infowindowMarker_custo = new google.maps.InfoWindow({ content: customer_Info });
// infowindowMarker_custo.setPosition(event.latLng);
// infowindowMarker_custo.open(this.map1);
// this.lastOpenedInfoWindow = infowindowMarker_custo;
}

generateCustomerInfo(customer): string {
let pod = customer.CustVisited === 1 ? 'Already DONE' : 'Not Done';
// let type = customer.LocationSequence === 0 ? 'ORIGIN' : customer.LocationSequence === 1 ? 'INTERMEDIATE STATION' : 'DESTINATION';
// let arrival_time = customer.GeoArrivalTime ? `${customer.GeoArrivalTime} [GPS]` : customer.ArrivalTime;
// let departure_time = customer.GeoDepartureTime ? `${customer.GeoDepartureTime} [GPS]` : customer.DepartureTime;

return `<table class="border" style="font-size: 13px;line-height: 19px;border:none !important;width:220px">
<tbody style="border:none !important">
  <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">Destination/Customer</td><td style="border:none !important">:</td><td style="border:none !important">${customer.CustName}</td></tr>
  <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">ETA</td><td style="border:none !important">:</td><td style="border:none !important">${pod}</td></tr>
</tbody>
</table>`;
}
extra_info(eve){
  const isChecked = (eve.target as HTMLInputElement).checked;
  console.log(isChecked)
  this.extra=isChecked;
}




initializeMap(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    $('#v_track_Modal').on('shown.bs.modal', () => {
      if (!this.map1) {
        try {
          const platform = new H.service.Platform({
            apikey: 'MoBysY-1fH4koFS2rGUDpwvRHSLfdX4GWYsRJUlB8VY'
          });

          const defaultLayers = platform.createDefaultLayers();

          // Initialize the map
          this.map1 = new H.Map(
            document.getElementById('map1'),
            defaultLayers.vector.normal.map,
            {
              center: { lat: 20.5937, lng: 78.9629 },
              zoom: 10,
              pixelRatio: window.devicePixelRatio || 1
            }
          );

          // Set willReadFrequently attribute on the canvas
          const canvas = document.querySelector('#map1 canvas') as HTMLCanvasElement; // Cast to HTMLCanvasElement
          if (canvas) {
            canvas.willReadFrequently = true; // Set the attribute
          }

          // Add events and UI controls
          const mapEvents = new H.mapevents.MapEvents(this.map1);
          new H.mapevents.Behavior(mapEvents);
          // const ui = H.ui.UI.createDefault(this.map1, defaultLayers);
          // var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map1));

          // Create the default UI components
          // let ui:any = H.ui.UI.createDefault(this.map1, defaultLayers);
          // Force the map to resize properly on window resize
          
          const resizeMap = () => {
            if (this.map1) {
              this.map1.getViewPort().resize();
            }
          };

          // Trigger initial resize to ensure correct rendering
          resizeMap();

          // Attach resize event listener
          window.addEventListener('resize', resizeMap);

          // Resolve the Promise when map initialization is complete
          resolve();
        } catch (error) {
          reject(error);
        }
      } else {
        // If the map is already initialized, just resolve
        resolve();
      }
    });

    // Show the modal (this might not be necessary to be in the Promise)
    $('#v_track_Modal').modal('show');
  });
}

}