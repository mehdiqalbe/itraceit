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
import { DtdcService } from '../../services/dtdc.service';
declare var H: any;
declare var google:any;
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
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
  new_array: any=[]
  //   // {agency_name_hn:'456',region_name:'78945',district_name:'789547'},{agency_name_hn:'456',region_name:'78945',district_name:'789547'},{agency_name_hn:'456',region_name:'78945',district_name:'789547'}
  // ];

  selectedReportType: number = 1;
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
  demoPolyline: any=[];
  lastOpenedInfoWindow: any;
  feeder_type: any;
  columnApi: any;
  Destination: any=[];
  Region: any=[];
  Customer: any=[];
  searchTerm: any;
  searchTerm1: any;
  filteredDestination: any=[];
  filteredDestination1: any=[];
  selectedDestination: string | null = null;
  selectedDestination1: string | null = null;
  region: any=[];
  filterObject:any={
    routeCategory:{},
    routeType:{}
  }
  routeCategory:any
  selectedRoutes:any=[]
  constructor(private router: Router,private navServices: NavService,private CrudService: CrudService, private SpinnerService: NgxSpinnerService, private datepipe: DatePipe, private dtdcService:DtdcService ) { }

  ngOnInit(): void {
    let App = document.querySelector('.app');
    App?.classList.add('sidenav-toggled');
    this.token=localStorage.getItem('AccessToken')!;
    this.group_id=localStorage.getItem('GroupId')!;
     const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
  
    this.datetimepicker1 = this.datepipe.transform(yesterday, 'yyyy-MM-dd');
    this.group_id=localStorage.getItem('GroupId')!;
     const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
  
    this.datetimepicker1 = this.datepipe.transform(yesterday, 'yyyy-MM-dd');
   
    this.datetimepicker =  this.datepipe.transform((new Date), 'yyyy-MM-dd ');
    this.end();
    this.start();
    // this.masterUploadTable();
    // this.Grid_table();
    this.dtdcTripReportFilter();
    this.initMap1();
  }
  ngAfterViewInit(): void {  // Ensure this method is properly implemented
    this.makeModalDraggable();
  }

  initMap1() 
  {
      const center = { lat: 23.2599, lng: 77.4126 };
       this.map1 = new google.maps.Map(document.getElementById('map1') as HTMLElement, {
      zoom: 10,
      const center = { lat: 23.2599, lng: 77.4126 };
       this.map1 = new google.maps.Map(document.getElementById('map1') as HTMLElement, {
      zoom: 10,
       center: center,
 
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scaleControl: true,
 
    }
    );   
    );   
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
// console.log("eve",eve)
 
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
  width: 100 },
  // { headerName: "RouteType", field: "routeType", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 100, },
  { headerName: "Region", field: "region", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 100, },
  { headerName: "Origin", field: "origin", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 100,},
  { headerName: "Destination", field: "destination", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150,},
  { headerName: "Route", field: "route", sortable: true, filter: true, floatingFilter: this.floating_filter  ,width: 100,},
  { headerName: "RouteSequence", field: "routeSequence", sortable: true, filter: true, floatingFilter: this.floating_filter  ,width: 200,},
  { headerName: "Fleet", field: "fleet", sortable: true, filter: true, floatingFilter: this.floating_filter  ,width: 100,},
  { headerName: "TripId", field: "tripId", sortable: true, filter: true, floatingFilter: this.floating_filter  ,width: 100,},
  { headerName: "RunCode", field: "runCode", sortable: true, filter: true, floatingFilter: this.floating_filter  ,width: 200,},
  { headerName: "RunDate", field: "runDate", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150,  minWidth: 150, maxWidth: 150,},
  { headerName: "Run Time", field: "runtime", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150,  minWidth: 150, maxWidth: 150,},
  { headerName: "Vehicle", field: "vehicle", sortable: true, filter: true, floatingFilter: this.floating_filter  ,width: 200,},
  { headerName: "TrackHistory", field: "trackHistory", sortable: true, filter: true, floatingFilter: this.floating_filter  ,width: 200,
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

    // Clear previous content
    if (params.data.Full?.TrackHistory1 !== 'NA') {
      button.innerHTML += `<strong style="color: blue;"><i class="fa fa-map-marker" style="font-size:17px ; color:blue"></i></strong>|`;
      button.addEventListener("click", () => {
        // console.log("Row Data:", params.data.Full);
        // this.Detail(params.data.Full)
        this.vehicleTrackF_new('', '',params.data.Full?.TrackHistory1.Imei, params.data.Full?.TrackHistory1.RnDt, params.data.Full?.TrackHistory1.Vno, params.data.Full?.TrackHistory1, params.data.Full?.TrackHistory1.ShpNo, params.data.Full?.TrackHistory1.Id)
      });
    } else {
      button.innerHTML += `<span style="color: black;">-</span>|`;
    }
    
    if (params.data.Full?.TrackHistory2 !== 'NA') {
      button.innerHTML += `<strong style="color: blue;"><i class="fa fa-map-marker" style="font-size:17px ; color:blue"></i></strong>|`;
      
      button.addEventListener("click", () => {
        // console.log("Row Data:", params.data.Full);
        // this.Detail(params.data.Full)
        this.vehicleTrackF_new('', '',params.data.Full?.TrackHistory2.Imei, params.data.Full?.TrackHistory2.RnDt, params.data.Full?.TrackHistory2.Vno, params.data.Full?.TrackHistory2, params.data.Full?.TrackHistory2.ShpNo, params.data.Full?.TrackHistory2.Id)
      });
    } else {
      button.innerHTML += `<span style="color: black;">-</span>|`;
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
   },
  { headerName: "State", field: "state", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200, },
  { headerName: "Branch", field: "branch", sortable: true, filter: true, floatingFilter: this.floating_filter  ,width: 100,},
  { headerName: "Area", field: "area", sortable: true, filter: true, floatingFilter: this.floating_filter  ,width: 100,},
  { headerName: "DriverName", field: "driverName", sortable: true, filter: true, floatingFilter: this.floating_filter  ,width: 150,},
  { headerName: "DriverNumber", field: "driverNumber", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150, },
  { headerName: "Transporter", field: "transporter", sortable: true, filter: true, floatingFilter: this.floating_filter  ,width: 150,},
  { headerName: "STD", field: "std", sortable: true, filter: true, floatingFilter: this.floating_filter  ,width: 150,},
  { headerName: "ATD", field: "atd", sortable: true, filter: true, floatingFilter: this.floating_filter  ,width: 200,},
  { headerName: "DelayDeparture", field: "delayDeparture", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 100, },
  { headerName: "STA", field: "sta", sortable: true, filter: true, floatingFilter: this.floating_filter  ,width: 200,},
  { headerName: "ATA", field: "ata", sortable: true, filter: true, floatingFilter: this.floating_filter  ,width: 200,},
  { headerName: "TT-Mapped", field: "ttMapped", sortable: true, filter: true, floatingFilter: this.floating_filter  ,width: 150,},
  { headerName: "TT-Taken", field: "ttTaken", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150,},
  { headerName: "DelayArrival", field: "delayArrival", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200, },
  { headerName: "DelayTT", field: "delayTt", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150,},
  { headerName: "ScheduleHalt", field: "scheduleHalt", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200,},
  { headerName: "ActualHalt", field: "actualHalt", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 150, },
  { headerName: "ATT", field: "att", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150,},
  // { headerName: "Alerts", field: "alerts", sortable: true, filter: true, floatingFilter: true },
  // { headerName: "ReverseDriving", field: "reverseDriving", sortable: true, filter: true, floatingFilter: true },
  { headerName: "FixedGPS(Km)", field: "fixedGpsKm", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200, },
  { headerName: "FixedE-Lock(Km)", field: "fixedELockKm", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200,},
  { headerName: "PortableE-Lock(Km)", field: "portableELockKm", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200, },
  { headerName: "GPS Exception-1", field: "gpsException1", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200,},
  { headerName: "GPS Exception-2", field: "gpsException2", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200,},
  { headerName: "GPS Exception-3", field: "gpsException3", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200,},
  { headerName: "SupervisorException", field: "supervisorException", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200, },
  { headerName: "Status", field: "status", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 100,},
  { headerName: "SystemRemarks", field: "systemRemarks", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200,},
  { headerName: "CloseBy", field: "closeBy", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150,},
  { headerName: "CloseDate", field: "closeDate", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150,},
  { headerName: "CreateBy", field: "createBy", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150,},
  { headerName: "TotalBag", field: "totalBag", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150,},
  { headerName: "Remarks", field: "remarks", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150,},
  { headerName: "GPSVendor", field: "gpsVendor", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 150, },
  { headerName: "Fixed E-lock Vendor", field: "fixedELockVendor", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200, },
  { headerName: "Portable E-lock Vendor", field: "portableELockVendor", sortable: true, filter: true, floatingFilter: this.floating_filter, width: 200, },
  { headerName: "Branch Location", field: "BranchLocation", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200,  },
  { headerName: "Branch Handover Time", field: "BranchHandoverTime", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200, },
  { headerName: "Gate In Time", field: "GateInTime", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200, },
  { headerName: "Gate Out Time", field: "GateOutTime", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200, },
  { headerName: "GPS ATA", field: "GPSATA", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200,  },
  { headerName: "GPS ATD", field: "GPSATD", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200, },
  { headerName: "Bay IN/OUT", field: "Bay", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200, },
  { headerName: "Shipment Count IN/OUT", field: "ShipmentCount", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200, },
  { headerName: "Weight IN/OUT", field: "Weight", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200,  },
  // { headerName: "Full", field: "Full", sortable: false, filter: false, floatingFilter: false,hide: true},
  // { headerName: "CloseDeviceBy", field: "closeDeviceBy", sortable: true, filter: true, floatingFilter: true },
  // { headerName: "Portable Lock Device", field: "portableLockDevice", sortable: true, filter: true, floatingFilter: true }

  { headerName: "Server GPS Received In", field: "ServerGPSReceivedIn", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200,  },
  { headerName: "Server GPS Processed In", field: "ServerGPSProcessedIn", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200,  },
  { headerName: "Server GPS Received Out", field: "ServerGPSReceivedOut", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200, },
  { headerName: "Server GPSP rocessed Out", field: "ServerGPSProcessedOut", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200, },
  { headerName: "Push Time In", field: "PushTimeIn", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200, },
  { headerName: "Push Time Out", field: "PushTimeOut", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200,  },
 

];
// onGridReady: params => {
  // Dynamically hide the "Full" column

// }
// routeSequence
// tripId
// trackHistory
// alerts
//  totalBag portableELockKm fixedELockKm fixedGpsKm reverseDriving
this.rowData_popup = eve.Detail.map((person, index) => ({
  sl: index + 1,
  // routeType: person.route_type,
  region: person.Region,
  origin: person.Source ?? "",
  destination: person.Destination ?? "",
  route: person.RouteCode ?? "",
  routeSequence: person.RouteName ?? "",
  fleet: person.FleetNo ?? "",
  tripId: person.ShipmentNo,
  runCode: person.RunCode,
  runDate: new Date(person.RunDate).toLocaleDateString('en-CA') ?? "",
  runtime: person.RunDate ? new Date(person.RunDate).toLocaleTimeString('en-GB') : "",
  vehicle: person.VehicleNo ?? "",
  trackHistory: "",
  state: person.State,

  branch: person.BranchName,
  area: person.Area,
  driverName: person.Driver ?? "",
  driverNumber: person.DriverMobile ?? "",
  // driverName_s: person.Driver_S ?? "",
  // driverNumber_s: person.DriverMobile_S ?? "",
  // driverName_s: person.Driver_S ?? "",
  // driverNumber_s: person.DriverMobile_S ?? "",
  transporter: person.Transporter ?? "",
  std: person.STD ?? "", // Standard Time of Departure
  atd: person.ATD ?? "", // Actual Time of Departure
  delayDeparture: person.DelayDeparture ?? "",
  sta: person.STA ?? "", // Standard Time of Arrival
  ata: person.ATA ?? "", // Actual Time of Arrival
  ttMapped: person.TTMapped ?? "",
  ttTaken: person.TTTaken ?? "",
  delayArrival: person.DelayArrival ?? "",
  delayTt: person.DelayTT,
  scheduleHalt: person.ScheduleHalt,
  actualHalt: person.ActualHalt,
  att: person.ATT, // Actual Travel Time


  fixedGpsKm:person.DistanceKm1,
  fixedELockKm: person.DistanceKm2,
  portableELockKm:person.DistanceKm3,
  gpsException1: person.GPSException1,
  gpsException2: person.GPSException2,
  gpsException3: person.GPSException3,
  supervisorException: person.SupervisorException,
  status: person.TripStatus,
  status: person.TripStatus,
  systemRemarks: person.Remarks,
  closeBy: person.CloseBy,
  closeDate: person.CloseDate,
  createBy: person.CreateBy,
  totalBag: person.Bag,
  remarks: person.remarks,
  gpsVendor: person.GPSVendorType1,
  fixedELockVendor: person.GPSVendorType2,
  portableELockVendor: person.GPSVendorType3,
  Full: person,
  BranchLocation: person.BranchLocation || "N/A",
BranchHandoverTime: person.BranchHandoverTime || "N/A",
GateInTime: person.GateInTime || "N/A",
GateOutTime: person.GateOutTime || "N/A",
GPSATA: person.GpsAta || "N/A",
GPSATD: person.GpsAtd || "N/A",
Bay: person.BayNoIn+'/'+person.BayNoOut || "N/A",
ShipmentCount: person.ShipmentCountIn+'/'+person.ShipmentCountOut || 0,
Weight: person.WeightIn+'/'+person.WeightOut || 0,

ServerGPSReceivedIn:  this.extra ? person.ServerGPSReceivedIn : null,
ServerGPSProcessedIn:  this.extra ? person.ServerGPSProcessedIn : null,
ServerGPSReceivedOut:  this.extra ? person.ServerGPSReceivedOut : null,
ServerGPSProcessedOut:  this.extra ? person.ServerGPSProcessedOut : null,
PushTimeIn:  this.extra ? person.PushTimeIn : null,
PushTimeOut:  this.extra ? person.PushTimeOut : null,

  // closeDeviceBy:' person.close_device_by',
  // portableLockDevice: 'person.portable_lock_device'
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
 private parseDate(dateString) {
  console.log("dateString",dateString)
  let parsedDate:any;
  console.log(dateString)
  if(dateString !==''&& dateString !=='-'){
  // Split the `dd-MM-yyyy HH:mm:ss` format into components
  const [yearTime, month, day] = dateString.split('-');
  const [day1, time] = day.split(' ');
  console.log("time",time)
   parsedDate = new Date(`${month}/${day1}/${yearTime} ${time}`);
  //  parsedDate.setSeconds(parsedDate.getSeconds() - 10);
 }
 console.log("parsedDate",parsedDate)
  return parsedDate
}
// private parseDate(dateString) {
//   console.log("dateString:", dateString);
//   let parsedDate: any;

//   if (dateString && dateString !== '-' && dateString.trim() !== '') {
//     // Split the `dd-MM-yyyy HH:mm:ss` format into components
//     const [day, month, yearTime] = dateString.split('-');
//     const [year, time] = yearTime.split(' ');

//     // Construct the date in MM/DD/YYYY HH:mm:ss format for JavaScript
//     parsedDate = new Date(`${month}/${day}/${year} ${time}`);

//     if (!isNaN(parsedDate.getTime())) {
//       // Subtract 10 seconds
//       parsedDate.setSeconds(parsedDate.getSeconds() - 10);
//     } else {
//       console.error("Invalid date format:", dateString);
//       return '';
//     }
//   }

//   console.log("Parsed Date:", parsedDate);
//   return parsedDate;
// }




formatDate(dateTimeString) {
  if(dateTimeString !==''&& dateTimeString !=='-'&&dateTimeString !==undefined){
  const date = new Date(dateTimeString);

  // Validate if the input is a valid date
  if (isNaN(date.getTime())) {
    return ''; // Return an appropriate error or message if the input is not valid
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}else{
  return '';
}
}

 Grid_table(){
  if (this.gridApi) {
    console.log("aman");
    this.gridApi.destroy();
  }
  if(this.extra){
    this.columnDefs = [

      { headerName: "Sl.", field: "sl", sortable: true, filter: true, floatingFilter: this.floating_filter, 
        
        cellRenderer: params => {
  
        // Create the container div
        const container = document.createElement("div");
        
        container.style.marginLeft = "-26px";
       
        
        container.style.marginLeft = "-26px";
       
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
        button.style.width = "25px";
        button.style.width = "25px";
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
        container.appendChild(button);
        container.appendChild(serialSpan);
        
        container.appendChild(serialSpan);
        
      
        return container;
          
    },
    minWidth: 100, maxWidth: 100, },
    { headerName: "Route Category", field: "RouteCategory", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150,  minWidth: 150, maxWidth: 150},  
   
      { headerName: "RouteType", field: "routeType", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 130,  minWidth: 130, maxWidth: 130 },
     
      { headerName: "Region", field: "region", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 100,  minWidth: 100, maxWidth: 100, },
      { headerName: "Origin", field: "origin", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 100,  minWidth: 100, maxWidth: 100,},
      { headerName: "Destination", field: "destination", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 100,  minWidth: 100, maxWidth: 100,},
      
      { headerName: "Route", field: "route", sortable: true, filter: true, floatingFilter: this.floating_filter ,Width: 200},
      { headerName: "RouteSequence", field: "routeSequence", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200,  minWidth: 200, maxWidth: 200,},
      { headerName: "Fleet", field: "fleet", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 100,  minWidth: 100, maxWidth: 100, },
      { headerName: "TripId", field: "tripId", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 100,  minWidth: 100, maxWidth: 100,},
      { headerName: "RunCode", field: "runCode", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200,  minWidth: 200, maxWidth: 200, },
      { headerName: "Run Date & Time", field: "runDate", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 180,  minWidth: 180, maxWidth: 180,},
      // { headerName: "Run Time", field: "runtime", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150,  minWidth: 150, maxWidth: 150,},
      { headerName: "Run Date & Time", field: "runDate", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 180,  minWidth: 180, maxWidth: 180,},
      // { headerName: "Run Time", field: "runtime", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150,  minWidth: 150, maxWidth: 150,},
      { headerName: "Vehicle", field: "vehicle", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150,  minWidth: 150, maxWidth: 150,},
      { headerName: "TrackHistory", field: "trackHistory", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 170,  minWidth: 170, maxWidth: 170,
      //    cellRenderer: params => {
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
      //   button.innerHTML = "";
      //   button.style.border = "none";
      //   button.style.background = "none";
      //   button.style.marginLeft = "5px";
      //   button.style.cursor = "pointer";
  
      //   // Clear previous content
  
      //   if (params.data.Full?.TrackHistory1 !== 'NA') {
      //     button.innerHTML += `<strong style="color: blue;"><i class="fa fa-map-marker" style="font-size:17px ; color:blue"></i></strong>|`;
      //     button.addEventListener("click", () => {
      //       console.log("Row Data:", params.data.Full);
      //       // this.Detail(params.data.Full)
      //       this.vehicleTrackF_new('', '',params.data.Full?.TrackHistory1.Imei, params.data.Full?.TrackHistory1.RnDt, params.data.Full?.TrackHistory1.Vno, params.data.Full?.TrackHistory1, params.data.Full?.TrackHistory1.ShpNo, params.data.Full?.TrackHistory1.Id)
      //     });
      //   } else {
      //     button.innerHTML += `<span style="color: black;">Na</span>|`;
      //   }
        
      //   if (params.data.Full?.TrackHistory2 !== 'NA') {
      //     button.innerHTML += `<strong style="color: blue;"><i class="fa fa-map-marker" style="font-size:17px ; color:blue"></i></strong>|`;
          
      //     button.addEventListener("click", () => {
      //       console.log("Row Data:", params.data.Full);
      //       // this.Detail(params.data.Full)
      //       this.vehicleTrackF_new('', '',params.data.Full?.TrackHistory2.Imei, params.data.Full?.TrackHistory2.RnDt, params.data.Full?.TrackHistory2.Vno, params.data.Full?.TrackHistory2, params.data.Full?.TrackHistory2.ShpNo, params.data.Full?.TrackHistory2.Id)
      //     });
      //   } else {
      //     button.innerHTML += `<span style="color: black;">Na</span>|`;
      //   }
        
      //   if (params.data.Full?.TrackHistory3 !== 'NA') {
      //     button.innerHTML += `<strong style="color: blue;"><i class="fa fa-map-marker" style="font-size:17px ; color:blue"></i></strong>|`;
         
      //     button.addEventListener("click", () => {
      //       // console.log("Row Data:", params.data.Full);
      //       // this.Detail(params.data.Full)
      //       this.vehicleTrackF_new('', '',params.data.Full?.TrackHistory3.Imei, params.data.Full?.TrackHistory3.RnDt, params.data.Full?.TrackHistory3.Vno, params.data.Full?.TrackHistory3, params.data.Full?.TrackHistory3.ShpNo, params.data.Full?.TrackHistory3.Id)
      //     });
      //   } else {
      //     button.innerHTML += `<span style="color: black;">Na</span>|`;
      //   }
      //   if (params.data.Full?.TrackHistory3 !== 'NA'||params.data.Full?.TrackHistory2 !== 'NA'||params.data.Full?.TrackHistory1 !== 'NA') {
      //     button.innerHTML += `<strong style="color: blue;"><i class="fa fa-download" style="font-size:17px ; color:#6ABD46"></i></strong>|`;
         
      //     button.addEventListener("click", () => {
      //       // alert(1)
      //       this.getExcelContent(params.data.Full)
      //       // console.log("Row Data:", params.data.Full);
      //       // this.Detail(params.data.Full)
      //       // this.vehicleTrackF_new('', '',params.data.Full?.TrackHistory3.Imei, params.data.Full?.TrackHistory3.RnDt, params.data.Full?.TrackHistory3.Vno, params.data.Full?.TrackHistory3, params.data.Full?.TrackHistory3.ShpNo, params.data.Full?.TrackHistory3.Id)
      //     });
      //   }
      //   // Attach event listener to the button
       
      
      //   // Append span and button to the container
      //   container.appendChild(serialSpan);
      //   container.appendChild(button);
      
      //   return container;
      // },
      cellRenderer: params => {
        
      { headerName: "TrackHistory", field: "trackHistory", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 170,  minWidth: 170, maxWidth: 170,
      //    cellRenderer: params => {
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
      //   button.innerHTML = "";
      //   button.style.border = "none";
      //   button.style.background = "none";
      //   button.style.marginLeft = "5px";
      //   button.style.cursor = "pointer";
  
      //   // Clear previous content
  
      //   if (params.data.Full?.TrackHistory1 !== 'NA') {
      //     button.innerHTML += `<strong style="color: blue;"><i class="fa fa-map-marker" style="font-size:17px ; color:blue"></i></strong>|`;
      //     button.addEventListener("click", () => {
      //       console.log("Row Data:", params.data.Full);
      //       // this.Detail(params.data.Full)
      //       this.vehicleTrackF_new('', '',params.data.Full?.TrackHistory1.Imei, params.data.Full?.TrackHistory1.RnDt, params.data.Full?.TrackHistory1.Vno, params.data.Full?.TrackHistory1, params.data.Full?.TrackHistory1.ShpNo, params.data.Full?.TrackHistory1.Id)
      //     });
      //   } else {
      //     button.innerHTML += `<span style="color: black;">Na</span>|`;
      //   }
        
      //   if (params.data.Full?.TrackHistory2 !== 'NA') {
      //     button.innerHTML += `<strong style="color: blue;"><i class="fa fa-map-marker" style="font-size:17px ; color:blue"></i></strong>|`;
          
      //     button.addEventListener("click", () => {
      //       console.log("Row Data:", params.data.Full);
      //       // this.Detail(params.data.Full)
      //       this.vehicleTrackF_new('', '',params.data.Full?.TrackHistory2.Imei, params.data.Full?.TrackHistory2.RnDt, params.data.Full?.TrackHistory2.Vno, params.data.Full?.TrackHistory2, params.data.Full?.TrackHistory2.ShpNo, params.data.Full?.TrackHistory2.Id)
      //     });
      //   } else {
      //     button.innerHTML += `<span style="color: black;">Na</span>|`;
      //   }
        
      //   if (params.data.Full?.TrackHistory3 !== 'NA') {
      //     button.innerHTML += `<strong style="color: blue;"><i class="fa fa-map-marker" style="font-size:17px ; color:blue"></i></strong>|`;
         
      //     button.addEventListener("click", () => {
      //       // console.log("Row Data:", params.data.Full);
      //       // this.Detail(params.data.Full)
      //       this.vehicleTrackF_new('', '',params.data.Full?.TrackHistory3.Imei, params.data.Full?.TrackHistory3.RnDt, params.data.Full?.TrackHistory3.Vno, params.data.Full?.TrackHistory3, params.data.Full?.TrackHistory3.ShpNo, params.data.Full?.TrackHistory3.Id)
      //     });
      //   } else {
      //     button.innerHTML += `<span style="color: black;">Na</span>|`;
      //   }
      //   if (params.data.Full?.TrackHistory3 !== 'NA'||params.data.Full?.TrackHistory2 !== 'NA'||params.data.Full?.TrackHistory1 !== 'NA') {
      //     button.innerHTML += `<strong style="color: blue;"><i class="fa fa-download" style="font-size:17px ; color:#6ABD46"></i></strong>|`;
         
      //     button.addEventListener("click", () => {
      //       // alert(1)
      //       this.getExcelContent(params.data.Full)
      //       // console.log("Row Data:", params.data.Full);
      //       // this.Detail(params.data.Full)
      //       // this.vehicleTrackF_new('', '',params.data.Full?.TrackHistory3.Imei, params.data.Full?.TrackHistory3.RnDt, params.data.Full?.TrackHistory3.Vno, params.data.Full?.TrackHistory3, params.data.Full?.TrackHistory3.ShpNo, params.data.Full?.TrackHistory3.Id)
      //     });
      //   }
      //   // Attach event listener to the button
       
      
      //   // Append span and button to the container
      //   container.appendChild(serialSpan);
      //   container.appendChild(button);
      
      //   return container;
      // },
      cellRenderer: params => {
        
        // Create the container div
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.justifyContent = "center";
      
        const serialSpan = document.createElement("span");
        serialSpan.textContent = params.value;
      
      
        const button = document.createElement("button");
        button.style.border = "none";
        button.style.background = "none";
        button.style.marginLeft = "5px";
        button.style.cursor = "pointer";
      
        const div = document.createElement("div");
        div.style.border = "none";
        div.style.background = "none";
        div.style.marginLeft = "5px";
        div.style.cursor = "pointer";
      
      
        const div = document.createElement("div");
        div.style.border = "none";
        div.style.background = "none";
        div.style.marginLeft = "5px";
        div.style.cursor = "pointer";
      
        // Clear previous content
        if (params.data.Full?.TrackHistory1 !== 'NA') {
          button.innerHTML += `
            <strong style="color: blue; margin-right: 0px;">
              <i class="fa fa-map-marker" style="font-size:17px; color:blue;"></i>
            </strong>
            <span style="margin-left: 5px;">|</span>
          `;
          button.innerHTML += `
            <strong style="color: blue; margin-right: 0px;">
              <i class="fa fa-map-marker" style="font-size:17px; color:blue;"></i>
            </strong>
            <span style="margin-left: 5px;">|</span>
          `;
          button.addEventListener("click", () => {
            this.vehicleTrackF_new(
              params.data.Full?.CloseDate,
              '',
              params.data.Full?.TrackHistory1.Imei,
              params.data.Full?.TrackHistory1.RnDt,
              params.data.Full?.TrackHistory1.Vno,
              params.data.Full?.TrackHistory1,
              params.data.Full?.TrackHistory1.ShpNo,
              params.data.Full?.TrackHistory1.Id
            );
            this.vehicleTrackF_new(
              params.data.Full?.CloseDate,
              '',
              params.data.Full?.TrackHistory1.Imei,
              params.data.Full?.TrackHistory1.RnDt,
              params.data.Full?.TrackHistory1.Vno,
              params.data.Full?.TrackHistory1,
              params.data.Full?.TrackHistory1.ShpNo,
              params.data.Full?.TrackHistory1.Id
            );
          });
        } else {
          button.innerHTML += `
            <span style="color: black; margin-right: 0px;">Na</span>
            <span style="margin-left: 5px;">|</span>
          `;
          button.innerHTML += `
            <span style="color: black; margin-right: 0px;">Na</span>
            <span style="margin-left: 5px;">|</span>
          `;
        }
      
      
        if (params.data.Full?.TrackHistory2 !== 'NA') {
          button.innerHTML += `
            <strong style="color: blue; margin-right: 0px;">
              <i class="fa fa-map-marker" style="font-size:17px; color:blue;"></i>
            </strong>
            <span style="margin-left: 5px;">|</span>
          `;
          button.innerHTML += `
            <strong style="color: blue; margin-right: 0px;">
              <i class="fa fa-map-marker" style="font-size:17px; color:blue;"></i>
            </strong>
            <span style="margin-left: 5px;">|</span>
          `;
          button.addEventListener("click", () => {
            this.vehicleTrackF_new(
              params.data.Full?.CloseDate,
              '',
              params.data.Full?.TrackHistory2.Imei,
              params.data.Full?.TrackHistory2.RnDt,
              params.data.Full?.TrackHistory2.Vno,
              params.data.Full?.TrackHistory2,
              params.data.Full?.TrackHistory2.ShpNo,
              params.data.Full?.TrackHistory2.Id
            );
            this.vehicleTrackF_new(
              params.data.Full?.CloseDate,
              '',
              params.data.Full?.TrackHistory2.Imei,
              params.data.Full?.TrackHistory2.RnDt,
              params.data.Full?.TrackHistory2.Vno,
              params.data.Full?.TrackHistory2,
              params.data.Full?.TrackHistory2.ShpNo,
              params.data.Full?.TrackHistory2.Id
            );
          });
        } else {
          button.innerHTML += `
            <span style="color: black; margin-right: 0px;">Na</span>
            <span style="margin-left: 5px;">|</span>
          `;
          button.innerHTML += `
            <span style="color: black; margin-right: 0px;">Na</span>
            <span style="margin-left: 5px;">|</span>
          `;
        }
      
      
        if (params.data.Full?.TrackHistory3 !== 'NA') {
          button.innerHTML += `
            <strong style="color: blue; margin-right: 0px;">
              <i class="fa fa-map-marker" style="font-size:17px; color:blue;"></i>
            </strong>
          `;
          button.innerHTML += `
            <strong style="color: blue; margin-right: 0px;">
              <i class="fa fa-map-marker" style="font-size:17px; color:blue;"></i>
            </strong>
          `;
          button.addEventListener("click", () => {
            this.vehicleTrackF_new(
              params.data.Full?.CloseDate,
              '',
              params.data.Full?.TrackHistory3.Imei,
              params.data.Full?.TrackHistory3.RnDt,
              params.data.Full?.TrackHistory3.Vno,
              params.data.Full?.TrackHistory3,
              params.data.Full?.TrackHistory3.ShpNo,
              params.data.Full?.TrackHistory3.Id
            );
            this.vehicleTrackF_new(
              params.data.Full?.CloseDate,
              '',
              params.data.Full?.TrackHistory3.Imei,
              params.data.Full?.TrackHistory3.RnDt,
              params.data.Full?.TrackHistory3.Vno,
              params.data.Full?.TrackHistory3,
              params.data.Full?.TrackHistory3.ShpNo,
              params.data.Full?.TrackHistory3.Id
            );
          });
        } else {
          button.innerHTML += `
            <span style="color: black; margin-right:0px;">Na</span>
            <span style="margin-left: 5px;">|</span>
          `;
          button.innerHTML += `
            <span style="color: black; margin-right:0px;">Na</span>
            <span style="margin-left: 5px;">|</span>
          `;
        }
      
        // Attach event listener to the download icon
        if (
          params.data.Full?.TrackHistory3 !== 'NA' ||
          params.data.Full?.TrackHistory2 !== 'NA' ||
          params.data.Full?.TrackHistory1 !== 'NA'
        ) {
          div.innerHTML += `
            <strong style="color: blue;">
              <i class="fa fa-download" style="font-size:17px; color:#6ABD46; margin-left: 0px;"></i>
            </strong>
          `;
          div.addEventListener("click", () => {
            this.getExcelContent(params.data.Full);
          });
        }
      
        // Append elements to the container
      
        // Attach event listener to the download icon
        if (
          params.data.Full?.TrackHistory3 !== 'NA' ||
          params.data.Full?.TrackHistory2 !== 'NA' ||
          params.data.Full?.TrackHistory1 !== 'NA'
        ) {
          div.innerHTML += `
            <strong style="color: blue;">
              <i class="fa fa-download" style="font-size:17px; color:#6ABD46; margin-left: 0px;"></i>
            </strong>
          `;
          div.addEventListener("click", () => {
            this.getExcelContent(params.data.Full);
          });
        }
      
        // Append elements to the container
        container.appendChild(serialSpan);
        container.appendChild(button);
        container.appendChild(div);
        container.appendChild(div);
      
        return container;
      },
      
      
       },
       { headerName: "State", field: "state", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200,  minWidth: 200, maxWidth: 200 },
       { headerName: "Branch", field: "branch", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 100,  minWidth: 100, maxWidth: 100},
       { headerName: "Area", field: "area", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 100,  minWidth: 100, maxWidth: 100 },
       { headerName: "DriverName", field: "driverName", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200,  minWidth: 200, maxWidth: 200},
       { headerName: "DriverNumber", field: "driverNumber", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200,  minWidth: 200, maxWidth: 200 },
       { headerName: "Transporter", field: "transporter", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200,  minWidth: 200, maxWidth: 200},
       { headerName: "STD", field: "std", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200,  minWidth: 200, maxWidth: 200 },
       { headerName: "ATD", field: "atd", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
       { headerName: "DelayDeparture", field: "delayDeparture", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
       { headerName: "STA", field: "sta", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 150 },
       { headerName: "ATA", field: "ata", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
       { headerName: "TT-Mapped", field: "ttMapped", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 150 },
       { headerName: "TT-Taken", field: "ttTaken", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150},
       { headerName: "DelayArrival", field: "delayArrival", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
       { headerName: "DelayTT", field: "delayTt", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
       { headerName: "ScheduleHalt", field: "scheduleHalt", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
       { headerName: "ActualHalt", field: "actualHalt", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 150 },
       { headerName: "ATT", field: "att", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 100},
       
    { headerName: "AHT", field: "AHT", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150},
    { headerName: "GPS ATA", field: "GPSATA", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150},
    { headerName: "Mobile ATA", field: "MobileATA", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150},
   
    { headerName: "API ATA", field: "APIATA", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150},
    { headerName: "GPS ATD", field: "GPSATD", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 100},
    { headerName: "Mobile ATD", field: "MobileATD", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150},
    { headerName: "API ATD", field: "APIATD", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150},
   
       // { headerName: "Alerts", field: "alerts", sortable: true, filter: true, floatingFilter: true },
       // { headerName: "ReverseDriving", field: "reverseDriving", sortable: true, filter: true, floatingFilter: true },
       { headerName: "FixedGPS(Km)", field: "fixedGpsKm", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
       { headerName: "FixedE-Lock(Km)", field: "fixedELockKm", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
       { headerName: "PortableE-Lock(Km)", field: "portableELockKm", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
       { headerName: "GPS Exception-1", field: "gpsException1", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
       { headerName: "GPS Exception-2", field: "gpsException2", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
       { headerName: "GPS Exception-3", field: "gpsException3", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
       { headerName: "SupervisorException", field: "supervisorException", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
       { headerName: "Status", field: "status", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
       { headerName: "SystemRemarks", field: "systemRemarks", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
       { headerName: "CloseBy", field: "closeBy", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 150 },
       { headerName: "CloseDate", field: "closeDate", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 150 },
       { headerName: "CreateBy", field: "createBy", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150},
       { headerName: "Close By Device", field: "CloseByDevice", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150},
       { headerName: "TotalBag", field: "totalBag", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
       { headerName: "Remarks", field: "remarks", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
       { headerName: "GPSVendor", field: "gpsVendor", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
       { headerName: "Fixed E-lock Vendor", field: "fixedELockVendor", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
       { headerName: "Portable E-lock Vendor", field: "portableELockVendor", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 250},
       // { headerName: "Full", field: "Full", sortable: true, filter: true, floatingFilter: this.floating_filter,hide:false },
      //  { headerName: "Portable E-lock Device", field: "portableELockDevice", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 250},
      //  { headerName: "Portable E-lock Device", field: "portableELockDevice", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 250},
   
       { headerName: "Branch Location", field: "BranchLocation", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 250 },
       { headerName: "Branch Handover Time", field: "BranchHandoverTime", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 250},
       { headerName: "Gate In Time", field: "GateInTime", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
       { headerName: "Gate Out Time", field: "GateOutTime", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
       { headerName: "GPS ATA", field: "GPSATA", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
       { headerName: "GPS ATD", field: "GPSATD", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
       { headerName: "Bay IN", field: "Bay", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
       { headerName: "Bay OUT", field: "BayOUT", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
       { headerName: "Shipment Count IN", field: "ShipmentCount", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 250},
       { headerName: "Shipment Count OUT", field: "ShipmentCountOUT", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 250},
       { headerName: "Weight IN", field: "Weight", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
       { headerName: "Weight OUT", field: "WeightOUT", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
        //  { headerName: "Server GPS Received In", field: "ServerGPSReceivedIn", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
      //  { headerName: "Server GPS Processed In", field: "ServerGPSProcessedIn", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200  },
      //  { headerName: "Server GPS Received Out", field: "ServerGPSReceivedOut", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200 },
      //  { headerName: "Server GPSP rocessed Out", field: "ServerGPSProcessedOut", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200  },
      //  { headerName: "Push Time In", field: "PushTimeIn", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200 },
      //  { headerName: "Push Time Out", field: "PushTimeOut", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200  },
       { headerName: "Bay IN", field: "Bay", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
       { headerName: "Bay OUT", field: "BayOUT", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
       { headerName: "Shipment Count IN", field: "ShipmentCount", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 250},
       { headerName: "Shipment Count OUT", field: "ShipmentCountOUT", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 250},
       { headerName: "Weight IN", field: "Weight", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
       { headerName: "Weight OUT", field: "WeightOUT", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
        //  { headerName: "Server GPS Received In", field: "ServerGPSReceivedIn", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
      //  { headerName: "Server GPS Processed In", field: "ServerGPSProcessedIn", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200  },
      //  { headerName: "Server GPS Received Out", field: "ServerGPSReceivedOut", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200 },
      //  { headerName: "Server GPSP rocessed Out", field: "ServerGPSProcessedOut", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200  },
      //  { headerName: "Push Time In", field: "PushTimeIn", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200 },
      //  { headerName: "Push Time Out", field: "PushTimeOut", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200  },
      
      // { headerName: "CloseDeviceBy", field: "closeDeviceBy", sortable: true, filter: true, floatingFilter: true },
      // { headerName: "Portable Lock Device", field: "portableLockDevice", sortable: true, filter: true, floatingFilter: true }
    ];
  } else{
  this.columnDefs = [

    { headerName: "Sl.", field: "sl", sortable: true, filter: true, floatingFilter: this.floating_filter, width:100,
      
      cellRenderer: params => {

      // Create the container div
      const container = document.createElement("div");
      container.style.display = "flex";
      container.style.alignItems = "center";
      container.style.justifyContent = "center";
      container.style.marginLeft = "-26px";
      container.style.marginLeft = "-26px";
      // Create the span for the serial number
      const serialSpan = document.createElement("span");
      serialSpan.textContent = params.value;
    
      // Create the button
      const button = document.createElement("button");
      button.style.border = "none";
      button.style.background = "none";
      button.style.marginLeft = "5px";
      button.style.cursor = "pointer";
      button.style.width = "25px";
      // width: 25px;
      button.style.width = "25px";
      // width: 25px;
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
      container.appendChild(button);
      container.appendChild(serialSpan);
     
      container.appendChild(serialSpan);
     
    
      return container;
        
  },
   },
   { headerName: "Route Category", field: "RouteCategory", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200,  minWidth: 200, maxWidth: 200},  
   
    { headerName: "RouteType", field: "routeType", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 150,  minWidth: 150, maxWidth: 150 },
    
    { headerName: "Region", field: "region", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 100,  minWidth: 100, maxWidth: 100},
    { headerName: "Origin", field: "origin", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 100,  minWidth: 100, maxWidth: 100 },
    { headerName: "Destination", field: "destination", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150,  minWidth: 150, maxWidth: 150},
    
    { headerName: "Route", field: "route", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200,  minWidth: 200, maxWidth: 200},
    { headerName: "RouteSequence", field: "routeSequence", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200,  minWidth: 200, maxWidth: 200},
    { headerName: "Fleet", field: "fleet", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 100,  minWidth: 100, maxWidth: 100},
    { headerName: "TripId", field: "tripId", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 100,  minWidth: 100, maxWidth: 100},
    { headerName: "RunCode", field: "runCode", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 150,  minWidth: 150, maxWidth: 150},
    { headerName: "Run Date & Time", field: "runDate", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 180,  minWidth: 180, maxWidth: 180},
    // { headerName: "Run Time", field: "runtime", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150,  minWidth: 150, maxWidth: 150,},
    { headerName: "Run Date & Time", field: "runDate", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 180,  minWidth: 180, maxWidth: 180},
    // { headerName: "Run Time", field: "runtime", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150,  minWidth: 150, maxWidth: 150,},
    { headerName: "Vehicle", field: "vehicle", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150,  minWidth: 150, maxWidth: 150},
    { headerName: "TrackHistory", field: "trackHistory", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 170,  minWidth: 170, maxWidth: 170,
   cellRenderer: params => { 
      // Create the container div
      const container = document.createElement("div");
      container.style.display = "flex";
      container.style.alignItems = "center";
      container.style.justifyContent = "center";
    
      const serialSpan = document.createElement("span");
      serialSpan.textContent = params.value;
    
    
      const button = document.createElement("button");
      button.style.border = "none";
      button.style.background = "none";
      button.style.marginLeft = "5px";
      button.style.cursor = "pointer";
    
      const div = document.createElement("div");
      div.style.border = "none";
      div.style.background = "none";
      div.style.marginLeft = "5px";
      div.style.cursor = "pointer";
    
    
      const div = document.createElement("div");
      div.style.border = "none";
      div.style.background = "none";
      div.style.marginLeft = "5px";
      div.style.cursor = "pointer";
    
      // Clear previous content
      if (params.data.Full?.TrackHistory1 !== 'NA') {
        button.innerHTML += `
          <strong style="color: blue; margin-right: 0px;">
            <i class="fa fa-map-marker" style="font-size:17px; color:blue;"></i>
          </strong>
          <span style="margin-left: 5px;">|</span>
        `;
        button.innerHTML += `
          <strong style="color: blue; margin-right: 0px;">
            <i class="fa fa-map-marker" style="font-size:17px; color:blue;"></i>
          </strong>
          <span style="margin-left: 5px;">|</span>
        `;
        button.addEventListener("click", () => {
          this.vehicleTrackF_new(
            params.data.Full?.CloseDate,
            '',
            params.data.Full?.TrackHistory1.Imei,
            params.data.Full?.TrackHistory1.RnDt,
            params.data.Full?.TrackHistory1.Vno,
            params.data.Full?.TrackHistory1,
            params.data.Full?.TrackHistory1.ShpNo,
            params.data.Full?.TrackHistory1.Id
          );
          this.vehicleTrackF_new(
            params.data.Full?.CloseDate,
            '',
            params.data.Full?.TrackHistory1.Imei,
            params.data.Full?.TrackHistory1.RnDt,
            params.data.Full?.TrackHistory1.Vno,
            params.data.Full?.TrackHistory1,
            params.data.Full?.TrackHistory1.ShpNo,
            params.data.Full?.TrackHistory1.Id
          );
        });
      } else {
        button.innerHTML += `
          <span style="color: black; margin-right: 0px;">Na</span>
          <span style="margin-left: 5px;">|</span>
        `;
        button.innerHTML += `
          <span style="color: black; margin-right: 0px;">Na</span>
          <span style="margin-left: 5px;">|</span>
        `;
      }
    
    
      if (params.data.Full?.TrackHistory2 !== 'NA') {
        button.innerHTML += `
          <strong style="color: blue; margin-right: 0px;">
            <i class="fa fa-map-marker" style="font-size:17px; color:blue;"></i>
          </strong>
          <span style="margin-left: 5px;">|</span>
        `;
        button.innerHTML += `
          <strong style="color: blue; margin-right: 0px;">
            <i class="fa fa-map-marker" style="font-size:17px; color:blue;"></i>
          </strong>
          <span style="margin-left: 5px;">|</span>
        `;
        button.addEventListener("click", () => {
          this.vehicleTrackF_new(
            params.data.Full?.CloseDate,
            '',
            params.data.Full?.TrackHistory2.Imei,
            params.data.Full?.TrackHistory2.RnDt,
            params.data.Full?.TrackHistory2.Vno,
            params.data.Full?.TrackHistory2,
            params.data.Full?.TrackHistory2.ShpNo,
            params.data.Full?.TrackHistory2.Id
          );
          this.vehicleTrackF_new(
            params.data.Full?.CloseDate,
            '',
            params.data.Full?.TrackHistory2.Imei,
            params.data.Full?.TrackHistory2.RnDt,
            params.data.Full?.TrackHistory2.Vno,
            params.data.Full?.TrackHistory2,
            params.data.Full?.TrackHistory2.ShpNo,
            params.data.Full?.TrackHistory2.Id
          );
        });
      } else {
        button.innerHTML += `
          <span style="color: black; margin-right: 0px;">Na</span>
          <span style="margin-left: 5px;">|</span>
        `;
        button.innerHTML += `
          <span style="color: black; margin-right: 0px;">Na</span>
          <span style="margin-left: 5px;">|</span>
        `;
      }
    
    
      if (params.data.Full?.TrackHistory3 !== 'NA') {
        button.innerHTML += `
          <strong style="color: blue; margin-right: 0px;">
            <i class="fa fa-map-marker" style="font-size:17px; color:blue;"></i>
          </strong>
        `;
        button.innerHTML += `
          <strong style="color: blue; margin-right: 0px;">
            <i class="fa fa-map-marker" style="font-size:17px; color:blue;"></i>
          </strong>
        `;
        button.addEventListener("click", () => {
          this.vehicleTrackF_new(
            params.data.Full?.CloseDate,
            '',
            params.data.Full?.TrackHistory3.Imei,
            params.data.Full?.TrackHistory3.RnDt,
            params.data.Full?.TrackHistory3.Vno,
            params.data.Full?.TrackHistory3,
            params.data.Full?.TrackHistory3.ShpNo,
            params.data.Full?.TrackHistory3.Id
          );
          this.vehicleTrackF_new(
            params.data.Full?.CloseDate,
            '',
            params.data.Full?.TrackHistory3.Imei,
            params.data.Full?.TrackHistory3.RnDt,
            params.data.Full?.TrackHistory3.Vno,
            params.data.Full?.TrackHistory3,
            params.data.Full?.TrackHistory3.ShpNo,
            params.data.Full?.TrackHistory3.Id
          );
        });
      } else {
        button.innerHTML += `
          <span style="color: black; margin-right: 0px;">Na</span>
          <span style="margin-left: 5px;">|</span>
        `;
        button.innerHTML += `
          <span style="color: black; margin-right: 0px;">Na</span>
          <span style="margin-left: 5px;">|</span>
        `;
      }
    
      // Attach event listener to the download icon
      if (
        params.data.Full?.TrackHistory3 !== 'NA' ||
        params.data.Full?.TrackHistory2 !== 'NA' ||
        params.data.Full?.TrackHistory1 !== 'NA'
      ) {
        div.innerHTML += `
          <strong style="color: blue;">
            <i class="fa fa-download" style="font-size:17px; color:#6ABD46; margin-left: 0px;"></i>
          </strong>
        `;
        div.addEventListener("click", () => {
          this.getExcelContent(params.data.Full);
        });
      }
    
      // Append elements to the container
    
      // Attach event listener to the download icon
      if (
        params.data.Full?.TrackHistory3 !== 'NA' ||
        params.data.Full?.TrackHistory2 !== 'NA' ||
        params.data.Full?.TrackHistory1 !== 'NA'
      ) {
        div.innerHTML += `
          <strong style="color: blue;">
            <i class="fa fa-download" style="font-size:17px; color:#6ABD46; margin-left: 0px;"></i>
          </strong>
        `;
        div.addEventListener("click", () => {
          this.getExcelContent(params.data.Full);
        });
      }
    
      // Append elements to the container
      container.appendChild(serialSpan);
      container.appendChild(button);
      container.appendChild(div);
      container.appendChild(div);
    
      return container;
    },
    
    
     },
    { headerName: "State", field: "state", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200,  minWidth: 200, maxWidth: 200 },
    { headerName: "Branch", field: "branch", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 100,  minWidth: 100, maxWidth: 100},
    { headerName: "Area", field: "area", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 100,  minWidth: 100, maxWidth: 100 },
    { headerName: "DriverName", field: "driverName", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200,  minWidth: 200, maxWidth: 200},
    { headerName: "DriverNumber", field: "driverNumber", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200,  minWidth: 200, maxWidth: 200 },
    { headerName: "Transporter", field: "transporter", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200,  minWidth: 200, maxWidth: 200},
    { headerName: "STD", field: "std", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200,  minWidth: 200, maxWidth: 200 },
    { headerName: "ATD", field: "atd", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "DelayDeparture", field: "delayDeparture", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "STA", field: "sta", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "ATA", field: "ata", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "TT-Mapped", field: "ttMapped", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 150 },
    { headerName: "TT-Taken", field: "ttTaken", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150},
    { headerName: "DelayArrival", field: "delayArrival", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
    { headerName: "DelayTT", field: "delayTt", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "ScheduleHalt", field: "scheduleHalt", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
    { headerName: "ActualHalt", field: "actualHalt", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 150 },
    { headerName: "ATT", field: "att", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 100},
    // { headerName: "Alerts", field: "alerts", sortable: true, filter: true, floatingFilter: true },
    // { headerName: "ReverseDriving", field: "reverseDriving", sortable: true, filter: true, floatingFilter: true },
   
    { headerName: "AHT", field: "AHT", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150},
    { headerName: "GPS ATA", field: "GPSATA", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150},
    { headerName: "Mobile ATA", field: "MobileATA", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150},
   
    { headerName: "API ATA", field: "APIATA", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150},
    { headerName: "GPS ATD", field: "GPSATD", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 100},
    { headerName: "Mobile ATD", field: "MobileATD", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150},
    { headerName: "API ATD", field: "APIATD", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150},
   
    { headerName: "FixedGPS(Km)", field: "fixedGpsKm", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
    { headerName: "FixedE-Lock(Km)", field: "fixedELockKm", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
    { headerName: "PortableE-Lock(Km)", field: "portableELockKm", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "GPS Exception-1", field: "gpsException1", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
    { headerName: "GPS Exception-2", field: "gpsException2", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
    { headerName: "GPS Exception-3", field: "gpsException3", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "SupervisorException", field: "supervisorException", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "Status", field: "status", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "SystemRemarks", field: "systemRemarks", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "CloseBy", field: "closeBy", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 150 },
    { headerName: "CloseDate", field: "closeDate", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "CreateBy", field: "createBy", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
    { headerName: "Close By Device", field: "CloseByDevice", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 150},
    { headerName: "TotalBag", field: "totalBag", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "Remarks", field: "remarks", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "GPSVendor", field: "gpsVendor", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "Fixed E-lock Vendor", field: "fixedELockVendor", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
    { headerName: "Portable E-lock Vendor", field: "portableELockVendor", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 250},
    // { headerName: "Full", field: "Full", sortable: true, filter: true, floatingFilter: this.floating_filter,hide:false },
    // { headerName: "Portable E-lock Device", field: "portableELockDevice", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 250},
    // { headerName: "Portable E-lock Device", field: "portableELockDevice", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 250},
    { headerName: "Branch Location", field: "BranchLocation", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 250 },
    { headerName: "Branch Handover Time", field: "BranchHandoverTime", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 250},
    { headerName: "Gate In Time", field: "GateInTime", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "Gate Out Time", field: "GateOutTime", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
    { headerName: "GPS ATA", field: "GPSATA", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "GPS ATD", field: "GPSATD", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "Bay IN", field: "Bay", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "Bay OUT", field: "BayOUT", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "Shipment Count IN", field: "ShipmentCount", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 250},
    { headerName: "Shipment Count OUT", field: "ShipmentCountOUT", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 250},
    { headerName: "Weight IN", field: "Weight", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
    { headerName: "Weight OUT", field: "WeightOUT", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
    
    { headerName: "Bay IN", field: "Bay", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "Bay OUT", field: "BayOUT", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    { headerName: "Shipment Count IN", field: "ShipmentCount", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 250},
    { headerName: "Shipment Count OUT", field: "ShipmentCountOUT", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 250},
    { headerName: "Weight IN", field: "Weight", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
    { headerName: "Weight OUT", field: "WeightOUT", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200},
    
    // if(){
    // { headerName: "Server GPS Received In", field: "ServerGPSReceivedIn", sortable: true, filter: true, floatingFilter: this.floating_filter },
    // { headerName: "Server GPS Processed In", field: "ServerGPSProcessedIn", sortable: true, filter: true, floatingFilter: this.floating_filter },
    // { headerName: "Server GPS Received Out", field: "ServerGPSReceivedOut", sortable: true, filter: true, floatingFilter: this.floating_filter },
    // { headerName: "Server GPSP rocessed Out", field: "ServerGPSProcessedOut", sortable: true, filter: true, floatingFilter: this.floating_filter },
    // { headerName: "Push Time In", field: "PushTimeIn", sortable: true, filter: true, floatingFilter: this.floating_filter },
    // { headerName: "Push Time Out", field: "PushTimeOut", sortable: true, filter: true, floatingFilter: this.floating_filter },
    // }
    // { headerName: "Server GPS Received In", field: "ServerGPSReceivedIn", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    // { headerName: "Server GPS Processed In", field: "ServerGPSProcessedIn", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200  },
    // { headerName: "Server GPS Received Out", field: "ServerGPSReceivedOut", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200 },
    // { headerName: "Server GPSP rocessed Out", field: "ServerGPSProcessedOut", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200  },
    // { headerName: "Push Time In", field: "PushTimeIn", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200 },
    // { headerName: "Push Time Out", field: "PushTimeOut", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200  },
    // { headerName: "Server GPS Received In", field: "ServerGPSReceivedIn", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200 },
    // { headerName: "Server GPS Processed In", field: "ServerGPSProcessedIn", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200  },
    // { headerName: "Server GPS Received Out", field: "ServerGPSReceivedOut", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200 },
    // { headerName: "Server GPSP rocessed Out", field: "ServerGPSProcessedOut", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200  },
    // { headerName: "Push Time In", field: "PushTimeIn", sortable: true, filter: true, floatingFilter: this.floating_filter ,width: 200 },
    // { headerName: "Push Time Out", field: "PushTimeOut", sortable: true, filter: true, floatingFilter: this.floating_filter,width: 200  },
   
    // { headerName: "CloseDeviceBy", field: "closeDeviceBy", sortable: true, filter: true, floatingFilter: true },
    // { headerName: "Portable Lock Device", field: "portableLockDevice", sortable: true, filter: true, floatingFilter: true }
  ];}
  console.log(this.new_array)
  this.rowData = this.new_array.map((person, index) => ({
    // runDate:person.RunDate,
    // runDate:person.RunDate,
    sl: index + 1,
    routeType: person.ShipmentMethod,
    region: person.Region,
    origin: person.Source ?? "",
    destination: person.Destination ?? "",
    route: person.RouteCode ?? "",
    RouteCategory:person.RouteCategory ?? "",
    routeSequence: person.RouteName ?? "",
    fleet: person.FleetNo ?? "",
    tripId: person.ShipmentNo,
    runCode: person.RunCode,
    // runDate: new Date(person.RunDate).toLocaleDateString('en-CA') ?? "",
    // runDate: person.RunDate,
    runDate:this.formatDate(person.RunDate),
    // runtime: person.RunDate ? new Date(person.RunDate).toLocaleTimeString('en-GB') : "",
    // runDate: new Date(person.RunDate).toLocaleDateString('en-CA') ?? "",
    // runDate: person.RunDate,
    runDate:this.formatDate(person.RunDate),
    // runtime: person.RunDate ? new Date(person.RunDate).toLocaleTimeString('en-GB') : "",
    vehicle: person.VehicleNo ?? "",
    trackHistory: "",
    state: person.State,
    branch: person.BranchName,
    area: person.Area,
    driverName: person.Driver ?? "",
    driverNumber: person.DriverMobile ?? "",
    // driverName_s: person.Driver_S ?? "",
    // driverNumber_s: person.DriverMobile_S ?? "",
    // driverName_s: person.Driver_S ?? "",
    // driverNumber_s: person.DriverMobile_S ?? "",
    transporter: person.Transporter ?? "",
    std: this.formatDate(person.STD) ?? "", // Standard Time of Departure
    atd: this.formatDate(person.ATD) ?? "", // Actual Time of Departure
    std: this.formatDate(person.STD) ?? "", // Standard Time of Departure
    atd: this.formatDate(person.ATD) ?? "", // Actual Time of Departure
    delayDeparture: person.DelayDeparture ?? "",
    sta: person.STA ?? "", // Standard Time of Arrival
    ata: person.ATA ?? "", // Actual Time of Arrival
    ttMapped: person.TTMapped ?? "",
    ttTaken: person.TTTaken ?? "",
    delayArrival: person.DelayArrival ?? "",
    delayTt: person.DelayTT,
    scheduleHalt: person.ScheduleHalt,
    actualHalt: person.ActualHalt,
    att: person.ATT, // Actual Travel Time
    CloseByDevice:person.CloseByDevice,

    AHT:person?.AHT?? "",
    // GPSATA:person?.GPSATA?? "",
    MobileATA:person?.MobileATA?? "",
    APIATA:person?.ApiATA?? "",
    // GPSATD:person?.GPSATD ?? "",
    MobileATD:person?.MobileATD ?? "",
    APIATD:person?.ApiATD ?? "",

    fixedGpsKm:person.DistanceKm1,
    fixedELockKm: person.DistanceKm2,
    portableELockKm:person.DistanceKm3,
    gpsException1: person.GPSException1,
    gpsException2: person.GPSException2,
    gpsException3: person.GPSException3,
    supervisorException: person.SupervisorException,
    status: person.TripStatus,
    status: person.TripStatus,
    systemRemarks: person.Remarks,
    closeBy: person.CloseBy,
    closeDate: person.CloseDate,
    createBy: person.CreateBy,
    totalBag: person.Bag,
    remarks: person.remarks,
    gpsVendor: person.GPSVendorType1,
    fixedELockVendor: person.GPSVendorType2,
    portableELockVendor: person.GPSVendorType3,
    // portableELockDevice:person.PortableLockVendor,
    // portableELockDevice:person.PortableLockVendor,
    Full: person,
    BranchLocation: person.BranchLocation || "",
  BranchHandoverTime: this.formatDate(person.BranchHandoverTime) || "",
  GateInTime: this.formatDate(person.GateInTime) || "",
  GateOutTime: this.formatDate(person.GateOutTime) || "",
  GPSATA:this.formatDate( person.GpsAta) || "",
  GPSATD:this.formatDate( person.GpsAtd )|| "",
  Bay: person.BayNoIn || "",
  BayOUT:person.BayNoOut,
  ShipmentCount: person.ShipmentCountIn || 0,
  ShipmentCountOUT: person.ShipmentCountOut || '',
  Weight: person.WeightIn || 0,
  WeightOUT: person.WeightOut || '',
    BranchLocation: person.BranchLocation || "",
  BranchHandoverTime: this.formatDate(person.BranchHandoverTime) || "",
  GateInTime: this.formatDate(person.GateInTime) || "",
  GateOutTime: this.formatDate(person.GateOutTime) || "",
  GPSATA:this.formatDate( person.GpsAta) || "",
  GPSATD:this.formatDate( person.GpsAtd )|| "",
  Bay: person.BayNoIn || "",
  BayOUT:person.BayNoOut,
  ShipmentCount: person.ShipmentCountIn || 0,
  ShipmentCountOUT: person.ShipmentCountOut || '',
  Weight: person.WeightIn || 0,
  WeightOUT: person.WeightOut || '',

  // ServerGPSReceivedIn:  this.extra ? person.ServerGPSReceivedIn : null,OUT
  // ServerGPSProcessedIn:  this.extra ? person.ServerGPSProcessedIn : null,
  // ServerGPSReceivedOut:  this.extra ? person.ServerGPSReceivedOut : null,
  // ServerGPSProcessedOut:  this.extra ? person.ServerGPSProcessedOut : null,
  // PushTimeIn:  this.extra ? person.PushTimeIn : null,
  // PushTimeOut:  this.extra ? person.PushTimeOut : null,
  // ServerGPSReceivedIn:  this.extra ? person.ServerGPSReceivedIn : null,OUT
  // ServerGPSProcessedIn:  this.extra ? person.ServerGPSProcessedIn : null,
  // ServerGPSReceivedOut:  this.extra ? person.ServerGPSReceivedOut : null,
  // ServerGPSProcessedOut:  this.extra ? person.ServerGPSProcessedOut : null,
  // PushTimeIn:  this.extra ? person.PushTimeIn : null,
  // PushTimeOut:  this.extra ? person.PushTimeOut : null,
    // closeDeviceBy:' person.close_device_by',BayNoIn
    // portableLockDevice: 'person.portable_lock_device'
  }));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// this.gridOptions = {
//     rowHeight: 30,
//     headerHeight: 40,
    
//     columnDefs: this.columnDefs,
//     rowData: this.rowData,
//     pagination: true,
//     paginationPageSize: 50,
//     paginationPageSizeSelector: [10, 50, 100,500,1000],
//     defaultColDef: {
//       sortable: true,
//       filter: true,
//       resizable: true,
//       tooltipComponentParams: {
//         color: "#ececec" // Optional parameter for custom styling
//       }
//     },
//     animateRows: true,
//     onGridReady: (params) => this.onGridReady(params),
   
//     // onGridReady: (params: any) => {
//     //   this.gridOptions.api = params.api; // Store API reference for later use
//     // },
   

//   //   onGridReady: (params) => {
//   //     this.gridApi = params.api; // Store the API for later use
//   //     console.log('Grid API methods:', Object.getOwnPropertyNames(this.gridApi)); // Log the available API methods
//   // },
//     // onGridReady: this.onGridReady.bind(this),  // Call `onGridReady` when the grid is ready
//     // onCellClicked: (event) => {
//     //   if (event.colDef.field === 'user_name') {
//     //     // this.onUserClick(event.value); // Call your method
//     //   }
//     // },
  
//   };
//   const gridDiv = document.querySelector('#myGrid');
//   new agGrid.Grid(gridDiv, this.gridOptions);
// alert(2)
// if (this.gridOptions.length == 0) {
// alert(2)
// if (this.gridOptions.length == 0) {
      this.gridOptions = {
        rowHeight: 30,
        // headerHeight: 40,

        // enableHtmlForHeaderNames: true,
        columnDefs: this.columnDefs,
        // rowData: this.rowData,
        // rowData: this.rowData,
        pagination: true,
        paginationPageSize: 50,
        paginationPageSizeSelector: [10, 50, 100, 500, 1000],
        enableCellTextSelection: true,
        // enableRangeSelection: true,
        clipboard: { suppressLastEmptyLine: true },
        // getContextMenuItems: this.getCustomContextMenu.bind(this), 
        animateRows: true,
        enableHtml: true, // Allows HTML in header names
        // defaultColDef: { resizable: true },
        tooltipShowDelay: 500, // Delay before tooltip shows (in ms)
        tooltipHideDelay: 2000, // Delay before tooltip hides (in ms)
        defaultColDef: {
          // flex: 1,
          headerClass: 'wrap-header-text',
          // cellClass: 'center-align',
          sortable: true,
          filter: true,
          resizable: true,
          tooltipComponentParams: {
            color: "#ececec" // Optional parameter for custom styling
          }
        },
        onGridReady: (params) => {
          // this.gridOptions.api = params.api; // Correctly set the API
          this.gridApi = params.api;
          this.columnApi = params.columnApi;
          // console.log('AG-Grid API:', this.gridOptions.api);
          if (this.gridApi) {
            this.gridApi.setGridOption('rowData', this.rowData)
          }
          // this.gridOptions.api = params.api; // Correctly set the API
          this.gridApi = params.api;
          this.columnApi = params.columnApi;
          // console.log('AG-Grid API:', this.gridOptions.api);
          if (this.gridApi) {
            this.gridApi.setGridOption('rowData', this.rowData)
          }
        },
        // onGridReady: (params) => {
        //   // Explicitly set API references
        //   this.gridApi = params.api;
        //   this.gridColumnApi = params.columnApi;
        //   console.log('AG-Grid API:', this.gridApi);
        //   console.log('AG-Grid Column API:', this.gridColumnApi);
        // },
        // onGridReady: (params) => this.onGridReady(params),
        ///////////////////////////////////////

      }
      const gridDiv = document?.querySelector('#myGrid');
      if(gridDiv)
      const gridDiv = document?.querySelector('#myGrid');
      if(gridDiv)
      new agGrid.Grid(gridDiv, this.gridOptions);
    // }
    // else {
    //   this.gridApi.setColumnDefs(this.columnDefs);
    //   this.gridApi.setRowData(this.rowData);
    // }
    // }
    // else {
    //   this.gridApi.setColumnDefs(this.columnDefs);
    //   this.gridApi.setRowData(this.rowData);
    // }
 }
 Grid_table1(){
  this.columnDefs = [
    {
      headerName: "Sl.",
      field: "sl",
      sortable: true,
      filter: true,
      floatingFilter: this.floating_filter,
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
        button.style.border = "none";
        button.style.background = "none";
        button.style.marginLeft = "5px";
        button.style.cursor = "pointer";
  
        if (params.data.Full.Detail.length !== 0) {
          button.innerHTML = `<strong style="color: blue;"><i class="fa fa-plus" style="font-size:15px; color:black"></i></strong>`;
          
          // Attach event listener to expand/collapse the child table
          button.addEventListener("click", () => {
            const node = params.node;
            node.setExpanded(!node.expanded); // Toggle row expansion
          });
        }
  
        // Append span and button to the container
        container.appendChild(serialSpan);
        container.appendChild(button);
  
        return container;
      },
      minWidth: 100,
      maxWidth: 100,
    },
    { headerName: "Region", field: "region", sortable: true, filter: true, floatingFilter: this.floating_filter, width: 100, minWidth: 100, maxWidth: 100 },
    { headerName: "Origin", field: "origin", sortable: true, filter: true, floatingFilter: this.floating_filter, width: 100, minWidth: 100, maxWidth: 100 },
    { headerName: "Destination", field: "destination", sortable: true, filter: true, floatingFilter: this.floating_filter, width: 100, minWidth: 100, maxWidth: 100 },
    { headerName: "Route", field: "route", sortable: true, filter: true, floatingFilter: this.floating_filter, width: 200 },
  ];
  // this.rowData = this.new_array.map((person, index) => ({
  //   sl: index + 1,
  //   region: person.Region,
  //   origin: person.Source ?? "",
  //   destination: person.Destination ?? "",
  //   route: person.Route ?? "",
  //   Full: {
  //     Detail: person.Details || [], // Child rows go here
  //   }
  // }));
  this.rowData = [
    {
      sl: 1,
      region: "North",
      origin: "City A",
      destination: "City B",
      route: "Route 1",
      Full: {
        Detail: [
          { sl: "1.1", region: "North", origin: "City AA", destination: "City BB", route: "Route 1A" },
          { sl: "1.2", region: "North", origin: "City CC", destination: "City DD", route: "Route 1B" },
        ],
      },
    },
    {
      sl: 2,
      region: "South",
      origin: "City C",
      destination: "City D",
      route: "Route 2",
      Full: {
        Detail: [
          { sl: "1.1", region: "North", origin: "City AA", destination: "City BB", route: "Route 1A" },
          { sl: "1.2", region: "North", origin: "City CC", destination: "City DD", route: "Route 1B" },
        ],
      },
    },
    {
      sl: 3,
      region: "East",
      origin: "City E",
      destination: "City F",
      route: "Route 3",
      Full: {
        Detail: [
          { sl: "1.1", region: "North", origin: "City AA", destination: "City BB", route: "Route 1A" },
          { sl: "1.2", region: "North", origin: "City CC", destination: "City DD", route: "Route 1B" },
        ],
      },
    },
  ];
  
  this.gridOptions = {
    columnDefs: this.columnDefs,
    rowData: this.rowData,
    masterDetail: true,
    detailCellRendererParams: {
      detailGridOptions: {
        columnDefs: this.columnDefs, // Use the same columns
        defaultColDef: {
          sortable: true,
          filter: true,
          resizable: true,
        },
      },
      getDetailRowData: (params) => {
        // Pass child rows to the detail grid
        params.successCallback(params.data.Full.Detail);
      },
    },
  };
  
  const gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, this.gridOptions);
 }
 getExcelContent(val){
 this.SpinnerService.show();
 var currentDateTime: any ;
  const formData = new FormData();
//  console.log(val)
  if(val.CloseDate==''){
    currentDateTime = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }else{
    currentDateTime= val.CloseDate;
  }
  formData.append('AccessToken', this.token);
  formData.append('startdate', val?.RunDate);
  formData.append('enddate', currentDateTime);
  formData.append('time_interval', '120');
  formData.append('imei',val?.Imei1||val?.Imei2||val?.Imei3);
  formData.append('group_id', this.group_id);
  formData.append('AccountId', this.account_id);
  formData.append('portal', 'itraceit');
  formData.forEach((value, key) => {
    console.log("formdata",key, value);
  });
  this.CrudService.vehicleTrackongS(formData).subscribe((res: any) => {
  
   
    
    if (res.Status === 'success' && Array.isArray(res.data) && res.data.length > 0) {
 
      this.trackingData=res?.data
       console.log(this.trackingData,"excel");
       const customFields = [
         { key: 'server_time', header: 'STS' },
        { key: 'device_time', header: 'Date Time' },
        { key: 'lat', header: 'Latitude' },
        { key: 'long', header: 'Longitude' },
        { key: 'speed', header: 'Speed' }, // Add Speed field
        { key: 'distance', header: 'Distance' },
        { key: 'location', header: 'Location' }, // Derived field
      ];
      const endDate: any = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
      const headerInfo = `DataLog For Vehicle: ${val?.VehicleNo} (${val?.VehicleNo}) Between Date: ${val?.RunDate} And ${endDate} On Route ${val?.Route}`;
       this.downloadExcel(customFields,headerInfo,val)
         
      // Initialize the map with the coordinates
  
    } else {
      this.SpinnerService.hide();
      console.log('No valid locations found in the response.');
      alert("No tracking data")
    }
  }, error => {
    this.SpinnerService.hide();
    console.error('Error fetching vehicle tracking data:', error);
  });
}

async downloadExcel(customFields, headerInfo: string, full_data) {
  // Define customFields inside the function
  // customFields = [
  //   { key: "server_time", header: "STS" },
  //   { key: "device_time", header: "Date Time" },
  //   { key: "lat", header: "Latitude" },
  //   { key: "long", header: "Longitude" },
  //   { key: "speed", header: "Speed" }, // Add Speed field
  //   { key: "distance", header: "Distance" },
  //   { key: "location", header: "Location" }, // Store Address in Location Column
  // ];
  const filteredData = await Promise.all(
    this.trackingData.map(async (item) => {
      const newItem: any = {};

      await Promise.all(
        customFields.map(async (field) => {
       
          if (field.header === "Location") {
            // console.log("Location")
            // Fetch address for the given lat-long
            const formdataCustomer = new FormData();
            formdataCustomer.append("AccessToken", this.token);
            formdataCustomer.append("VehicleId", full_data?.VehicleNo);
            formdataCustomer.append("ImeiNo",full_data?.Imei1||full_data?.Imei2||full_data?.Imei3);
            formdataCustomer.append("LatLong", `${item["lat"]},${item["long"]}`);
            formdataCustomer.append('portal', 'itraceit');
            try {
              const res: any = await this.CrudService.addressS(formdataCustomer).toPromise();
              console.log(res);
              newItem["Location"] = res.Data.Address; // Store address in "Location" column
            } catch (error) {
              console.error("Error fetching address:", error);
              newItem["Location"] = "Address Not Found"; // Handle errors
            }
          } else {
            newItem[field.header] = item[field.key]; // Store other fields normally
          }
        })
      );

      return newItem;
    })
  );

  // Create a worksheet and add the headerInfo as the first row
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
  XLSX.utils.sheet_add_aoa(worksheet, [[headerInfo]], { origin: "A1" });
  XLSX.utils.sheet_add_json(worksheet, filteredData, { origin: "A2", skipHeader: false });

  // Merge cells to make the header span the full row
  const numColumns = customFields.length;
  worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: numColumns - 1 } }];

  // Create a workbook and add the worksheet
  const workbook: XLSX.WorkBook = {
    Sheets: { "Tracking Data": worksheet },
    SheetNames: ["Tracking Data"],
  };

  // Write the workbook to a file
  const excelBuffer: any = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Save the file using file-saver
  const data: Blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, "TrackingData.xlsx");
  this.SpinnerService.hide();
}



// import * as XLSX from 'xlsx';
// import * as FileSaver from 'file-saver';

//  exportToExcel() {
//   // Prepare main data
//   const mainData = this.new_array.map((item, index) => ({
//     RowNo: index + 1, // Add row number for reference
//     ...item,
//     Detail: undefined, // Exclude Detail temporarily
//   }));

//   // Prepare detail data
//   const detailData = this.new_array.flatMap((item, index) =>
//     item.Detail.map((detail) => ({
//       ParentRowNo: index + 1, // Reference to the parent row
//       ...detail,
//     }))
//   );
//      console.log(detailData,mainData)
//   // Create a new workbook
//   const workbook = XLSX.utils.book_new();

//   // Add the main data sheet
//   const mainSheet = XLSX.utils.json_to_sheet(mainData);
//   XLSX.utils.book_append_sheet(workbook, mainSheet, 'Main Data');

//   // Add the detail data sheet
//   const detailSheet = XLSX.utils.json_to_sheet(detailData);
//   XLSX.utils.book_append_sheet(workbook, detailSheet, 'Detail Data');

//   // Save the workbook
//   XLSX.writeFile(workbook, 'ExportedDataWithDetails.xlsx');
// }

formatAlternatingParentChildData(data) {
  const formattedData:any = [];

  data.forEach((parent) => {
    // Add parent row
    formattedData.push({
      ...parent,
      Detail: undefined, // Remove Detail to prevent duplication
      Type: 'Parent', // Indicate this is a parent row
    });

    // Add each child row
    parent.Detail.forEach((child) => {
      formattedData.push({
        ...child,
        Type: 'Child', // Indicate this is a child row
      });
    });
  });

  return formattedData;
}
exportToExcel1_1() {
  // const transformedData = this.new_array; // Using your data array directly

  const transformedData = this.formatAlternatingParentChildData(this.new_array); 
  // Custom headers
  const headers = [
    "RouteType", 
    "Region", 
    "Origin", 
    "Destination", 
    "Route", 
    "RouteSequence", 
    "Fleet", 
    "TripId",
    "RunCode", 
    "Run Date Time", 
    // "Run Time", 
    "Vehicle", 
    "State", 
    "Branch", 
    "Area", 
    "DriverName", 
    "DriverNumber", 
    // "DriverName(S)", 
    // "DriverNumber(S)", 
    "Transporter", 
    "STD", 
    "ATD", 
    "DelayDeparture", 
    "STA", 
    "ATA", 
    "TT-Mapped", 
    "TT-Taken", 
    "DelayArrival", 
    "DelayTT", 
    "ScheduleHalt", 
    "ActualHalt", 
    "ATT", 
    "FixedGPS(Km)", 
    "FixedE-Lock(Km)", 
    "PortableE-Lock(Km)", 
    "GPS Exception-1", 
    "GPS Exception-2", 
    "GPS Exception-3", 
    "SupervisorException", 
    "Status", 
    "SystemRemarks", 
    "CloseBy", 
    "CloseDate", 
    "Close By Device", 
    "TotalBag", 
    "Remarks", 
    "GPSVendor", 
    "Fixed E-lock Vendor", 
    "Portable E-lock Vendor",
    "Branch Location",
     "Branch Handover Time", 
    "Gate In Time",
     "Gate Out Time", 
    "GPS ATA",
     "GPS ATD",
     "Bay IN", 
     "Bay OUT", 
    "Shipment Count IN",
    "Shipment Count OUT", 
    "Weight IN",
    "Weight OUT",
  ];
  const keys = [
    "ShipmentMethod",   // routeType
    "Region",           // region
    "Source",           // origin
    "Destination",      // destination
    "RouteCode",        // route
    "RouteName",        // routeSequence
    "FleetNo",          // fleet
    "ShipmentNo",       // tripId
    "RunCode",          // runCode
    "RunDate",          // runDate
    // "RunDate",          // runtime (formatted from RunDate)
    "VehicleNo",        // vehicle
    "State",            // state
    "BranchName",       // branch
    "Area",             // area
    "Driver",           // driverName
    "DriverMobile",     // driverNumber
    // "Driver_S",         // driverName_s
    // "DriverMobile_S",   // driverNumber_s
    "Transporter",      // transporter
    "STD",              // std
    "ATD",              // atd
    "DelayDeparture",   // delayDeparture
    "STA",              // sta
    "ATA",              // ata
    "TTMapped",         // ttMapped
    "TTTaken",          // ttTaken
    "DelayArrival",     // delayArrival
    "DelayTT",          // delayTt
    "ScheduleHalt",     // scheduleHalt
    "ActualHalt",       // actualHalt
    "ATT",              // att
    "DistanceKm1",      // fixedGpsKm
    "DistanceKm2",      // fixedELockKm
    "DistanceKm3",      // portableELockKm
    "GPSException1",    // gpsException1
    "GPSException2",    // gpsException2
    "GPSException3",    // gpsException3
    "SupervisorException", // supervisorException
    "TripStatus",       // status
    "Remarks",          // systemRemarks
    "CloseBy",          // closeBy
    "CloseDate",        // closeDate
    "CloseByDevice",        // createBy
    "Bag",              // totalBag
    "Remarks",          // remarks
    "GPSVendorType1",   // gpsVendor
    "GPSVendorType2",   // fixedELockVendor
    // "GPSVendorType3",   // portableELockVendor
    "PortableLockVendor", // portableELockDevice
    "BranchLocation",   // BranchLocation
    "BranchHandoverTime", // BranchHandoverTime
    "GateInTime",       // GateInTime
    "GateOutTime",      // GateOutTime
    "GpsAta",           // GPSATA
    "GpsAtd",           // GPSATD
    "BayNoIn",          // Bay (combined with BayNoOut)
    "BayNoOut",         // Bay (combined with BayNoIn)
    "ShipmentCountIn",  // ShipmentCount (combined with ShipmentCountOut)
    "ShipmentCountOut", // ShipmentCount (combined with ShipmentCountIn)
    "WeightIn",         // Weight (combined with WeightOut)
    "WeightOut",        // Weight (combined with WeightIn)
    ];

const dataWithHeaders = [
  headers,
  ...transformedData.map(row =>
    headers.map((header, index) => {
      const key = keys[index]; // Get the corresponding key for the header
      return this.transformField(header, row[key]); // Pass the header and corresponding row[key] to transformField
    })
  ),
];
  // Convert to Exce
  // const workbook = XLSX.utils.book_new();
  // const sheet = XLSX.utils.aoa_to_sheet(dataWithHeaders);
  // XLSX.utils.book_append_sheet(workbook, sheet, 'ParentChildData');
  // XLSX.writeFile(workbook, 'TripReport.xlsx');
}

exportToExcel(): void {
  const headers = [
    "Sl",
    "RouteType", 
    "Region", 
    "Origin", 
    "Destination", 
    "Route", 
    "RouteSequence", 
    "Fleet", 
    "TripId",
    "RunCode", 
    "Run Date & Time", 
    // "Run Time", 
    "Vehicle", 
    "State", 
    "Branch", 
    "Area", 
    "DriverName", 
    "DriverNumber", 
    // "DriverName(S)", 
    // "DriverNumber(S)", 
    "Transporter", 
    "STD", 
    "ATD", 
    "DelayDeparture", 
    "STA", 
    "ATA", 
    "TT-Mapped", 
    "TT-Taken", 
    "DelayArrival", 
    "DelayTT", 
    "ScheduleHalt", 
    "ActualHalt", 
    "ATT", 
    "FixedGPS(Km)", 
    "FixedE-Lock(Km)", 
    "PortableE-Lock(Km)", 
    "GPS Exception-1", 
    "GPS Exception-2", 
    "GPS Exception-3", 
    "SupervisorException", 
    "Status", 
    "SystemRemarks", 
    "CloseBy", 
    "CloseDate", 
    "Create By",
    "Close By Device", 
    "TotalBag", 
    "Remarks", 
    "GPSVendor", 
    "Fixed E-lock Vendor", 
    "Portable E-lock Vendor",
    "Branch Location",
    "Branch Handover Time", 
    "Gate In Time",
    "Gate Out Time", 
    "GPS ATA",
    "GPS ATD",
    "Bay IN", 
    "Bay OUT", 
    "Shipment Count IN",
    "Shipment Count OUT", 
    "Weight IN",
    "Weight OUT",
  ];

  const keys = [
    "sl",
    "ShipmentMethod", 
    "Region", 
    "Source", 
    "Destination", 
    "RouteCode", 
    "RouteName", 
    "FleetNo", 
    "ShipmentNo",
    "RunCode", 
    "RunDate", 
    // "RunDate", 
    "VehicleNo", 
    "State", 
    "BranchName", 
    "Area", 
    "Driver", 
    "DriverMobile", 
    // "Driver_S", 
    // "DriverMobile_S", 
    "Transporter", 
    "STD", 
    "ATD", 
    "DelayDeparture", 
    "STA", 
    "ATA", 
    "TTMapped", 
    "TTTaken", 
    "DelayArrival", 
    "DelayTT", 
    "ScheduleHalt", 
    "ActualHalt", 
    "ATT", 
    "DistanceKm1", 
    "DistanceKm2", 
    "DistanceKm3", 
    "GPSException1", 
    "GPSException2", 
    "GPSException3", 
    "SupervisorException", 
    "TripStatus", 
    "Remarks", 
    "CloseBy", 
    "CloseDate", 
    "CreateBy",
    "CloseByDevice", 
    "Bag", 
    "Remarks", 
    "GPSVendorType1", 
    "GPSVendorType2", 
    "PortableLockVendor",
    "BranchLocation", 
    "BranchHandoverTime", 
    "GateInTime", 
    "GateOutTime", 
    "GpsAta", 
    "GpsAtd", 
    "BayNoIn", 
    "BayNoOut", 
    "ShipmentCountIn", 
    "ShipmentCountOut", 
    "WeightIn", 
    "WeightOut",
  ];

  const transformedData = this.formatAlternatingParentChildData(this.new_array);

  // Construct data with headers
  const dataWithHeaders = [
    headers,
    ...transformedData.map((row, rowIndex) =>
      headers.map((header, index) => {
       
        const key = keys[index]; // Match the key to the header
        let value = row[key] || ""; // Use the row's value or an empty string if undefined
           
        // Check if the header is "Run Time" or "RunDate" to split date and time
        if (header === "Sl") {
          // Extract time from RunDate
          const ind = rowIndex + 1;
          // console.log("runDate",ind)
          value = ind; // Get the time in HH:MM:SS format

        }
        if (header === "Run Time" && row["RunDate"]) {
          // Extract time from RunDate
          const runDate = new Date(row["RunDate"]);
          value = runDate.toTimeString().split(" ")[0]; // Get the time in HH:MM:SS format


        } else if (header === "Run Date & Time" && row["RunDate"]) {
          const runDate = new Date(row["RunDate"]);  
          value =this.formatDate(runDate); // Get the date in YYYY-MM-DD format
        }
        else if (header === "STD" && row["STD"]) {
          const runDate = new Date(row["STD"]);  
          value =this.formatDate(runDate); // Get the date in YYYY-MM-DD format
        }
        else if (header === "ATD" && row["ATD"]) {
          const runDate = new Date(row["ATD"]);  
          value =this.formatDate(runDate); // Get the date in YYYY-MM-DD format
        }
        else if (header === "CloseDate" && row["CloseDate"]) {
          const runDate = new Date(row["CloseDate"]);  
          value =this.formatDate(runDate); // Get the date in YYYY-MM-DD format
        }
        else if (header === "Branch Handover Time" && row["BranchHandoverTime"]) {
          const runDate = new Date(row["BranchHandoverTime"]);  
          value =this.formatDate(runDate); // Get the date in YYYY-MM-DD format
        }

        else if (header === "Gate In Time" && row["GateInTime"]) {
          const runDate = new Date(row["GateInTime"]);  
          value =this.formatDate(runDate); // Get the date in YYYY-MM-DD format
        }

        else if (header === "Gate Out Time" && row["GateOutTime"]) {
          const runDate = new Date(row["GateOutTime"]);  
          value =this.formatDate(runDate); // Get the date in YYYY-MM-DD format
        }

        else if (header === "GPS ATA" && row["GpsAta"]) {
          const runDate = new Date(row["GpsAta"]);  
          value =this.formatDate(runDate); // Get the date in YYYY-MM-DD format
        }else if (header === "GPS ATD" && row["GpsAtd"]) {
          const runDate = new Date(row["GpsAtd"]);  
          value =this.formatDate(runDate); // Get the date in YYYY-MM-DD format
        }
        // Enclose value in double quotes if it contains a comma or double quote
        const safeValue = value.toString().includes(",") || value.toString().includes('"')
          ? `"${value.toString().replace(/"/g, '""')}"`
          : value;
  
        return safeValue;
      })
    )
  ];
  

  // Convert to CSV string
  const csvContent = dataWithHeaders.map(row => row.join(',')).join('\n');

  // Trigger CSV download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'TripReport.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

transformField(header, value) {
  // console.log(header,value)
  if (header === "RunDate" && value) {
    const [date, time] = value.split(" "); // Split date and time
    return this.datepipe.transform(date, 'yyyy-MM-dd') ; // Return only the date
  }
  if (header === "Run Time" && value) {
    const [, time] = value.split(" "); // Split date and time
    return  time || ""; // Return only the time or an empty string if time is missing
  }
  return value || ""; // Return the value as is for other fields
}




// exportToExcel(){
//   const transformedData = this.formatAlternatingParentChildData(this.new_array);

// // Convert to Excel
// const workbook = XLSX.utils.book_new();
// const sheet = XLSX.utils.json_to_sheet(transformedData);
// XLSX.utils.book_append_sheet(workbook, sheet, 'ParentChildData');
// XLSX.writeFile(workbook, 'TripReport.xlsx');
// }
// const transformedData = formatAlternatingParentChildData(data);
// console.log(transformedData);
onSearch_origin(searchTerm: any) {
  // Filter and update results based on the search term
  searchTerm=searchTerm?.term
  this.filteredDestination = this.Customer.filter(dest =>
    dest?.value?.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 50); // Limit to a subset
}
onSearch_Destination(searchTerm: any) {
  // Filter and update results based on the search term
  searchTerm=searchTerm?.term
  this.filteredDestination1 = this.Destination.filter(dest =>
    dest?.value?.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 50); // Limit to a subset
}
onSearch_origin(searchTerm: any) {
  // Filter and update results based on the search term
  searchTerm=searchTerm?.term
  this.filteredDestination = this.Customer.filter(dest =>
    dest?.value?.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 50); // Limit to a subset
}
onSearch_Destination(searchTerm: any) {
  // Filter and update results based on the search term
  searchTerm=searchTerm?.term
  this.filteredDestination1 = this.Destination.filter(dest =>
    dest?.value?.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 50); // Limit to a subset
}
  onSearch(term: any) {
    console.log(term)
    if(term.term.length>=3){
    const formdataCustomer = new FormData();
    formdataCustomer.append('AccessToken', this.token);
    formdataCustomer.append('searchQuery',term.term);
    // formdataCustomer.append('route_id', route_id);
  
    this.CrudService.getVehicle(formdataCustomer).subscribe((res: any) => {
      console.log(res)
      this.dataList = res.Data;
    })
  }
    // this.searchInput.next(term); // Emit the input value
  }
 onGridReady(params: any) {
  this.gridApi = params.api;
 
  // this.gridOptions.api = params.api;
  console.log('Grid API:', this.gridApi); // Check if API is assigned correctly
}
// exportAsExcel() {
// exportAsExcel() {

//   if (this.gridApi) {
//     this.gridApi.exportDataAsCsv({
//       fileName: 'table-data.csv',
//       columnKeys: this.columnDefs
//         .filter(colDef => colDef.field !== 'trackHistory') // Exclude trackHistory column
//         .map(colDef => colDef.field),
//     });
//   }
// }
exportAsExcel() {
//   if (this.gridApi) {
//     this.gridApi.exportDataAsCsv({
//       fileName: 'table-data.csv',
//       columnKeys: this.columnDefs
//         .filter(colDef => colDef.field !== 'trackHistory') // Exclude trackHistory column
//         .map(colDef => colDef.field),
//     });
//   }
// }
exportAsExcel() {
  if (this.gridApi) {
    this.gridApi.exportDataAsCsv({
      fileName: 'table-data.csv',
      columnKeys: this.columnDefs
        .filter(colDef => colDef.field !== 'trackHistory') // Exclude trackHistory column
        .map(colDef => colDef.field),
      processCellCallback: (params) => {
        const value = params.value;
        if (typeof value === 'string' && value.includes(',')) {
          // If the value contains a comma, wrap it in double quotes
          return `"${value.replace(/"/g, '""')}"`; // Escape any existing double quotes
        }
        return value; // Return the value as-is if no commas
      },
      processCellCallback: (params) => {
        const value = params.value;
        if (typeof value === 'string' && value.includes(',')) {
          // If the value contains a comma, wrap it in double quotes
          return `"${value.replace(/"/g, '""')}"`; // Escape any existing double quotes
        }
        return value; // Return the value as-is if no commas
      },
    });
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
dtdcTripReportFilter(){
  this.selectedRoutes = [];
  var formdata=new FormData()
  formdata.append('AccessToken',this.token)
  
  this.dtdcService.dtdcTripReportFilter(formdata).subscribe((data:any) => {
 
 
    if(data.Status=="success"){
      console.log(data)
      this.Master_filter=data.Filter.Master;

      this.Customer=this.Master_filter?.Customer
      this.Destination=this.Master_filter?.Customer
     
      const Destination = this.Master_filter?.Customer || {};
      this.Destination = Object.entries(Destination).map(([key, value]) => ({ key, value }));
      
      this.filteredDestination = this.Destination.slice(0, 50); // Initial subset
     
      const Destination1 = this.Master_filter?.Customer || {};
      this.Customer = Object.entries(Destination1).map(([key, value]) => ({ key, value }));
      
      this.filteredDestination1 = this.Customer.slice(0, 50); // Initial subset
     
      const updatedRouteType = Object.entries(this.Master_filter?.RouteType as Record<string, Record<string, string>>).reduce((acc, [key, value],index) => {
        const category = this.Master_filter?.RouteCategory[key]; // Get category name from RouteCategory
     
        const updatedInnerObject: Record<string, string> = {};
        
        Object.entries(value).forEach(([typeKey, typeValue]) => {
          updatedInnerObject[typeKey] = `${typeValue} (${category})`;
        });
         
        acc[key] = updatedInnerObject;
        console.log(acc[key],updatedInnerObject)
        return acc;
      }, {} as Record<string, Record<string, string>>);
      
      console.log(updatedRouteType,"updated Inner ");
     // Merging all nested objects into a single object
     const mergedObject = Object.assign({}, ...Object.values(updatedRouteType));

        console.log(mergedObject);
      this.filterObject={
        routeCategory:this.Master_filter?.RouteCategory||{},
        rawRouteType:updatedRouteType||{},
        routeType:mergedObject||{}
      }

    }else{
      // alert("Data not found ")
      alert(data?.Message);
      this.router.navigate([`/auth/login`]);
    }
    // console.log(data)
  })
}
onRouteCategoryChange(val) {
  // Clear selected route types
  this.selectedRoutes = [];

  if (val.includes('')) {
    console.log(val);
    this.routeCategory = [''];
    this.filterObject.routeType = {
      "": "All", // Add "All" field
      ...Object.assign({}, ...Object.values(this.filterObject.rawRouteType)),
    };
  } else {
    console.log(this.routeCategory, "route category");

    // Merge route types of all selected categories
    const mergedRouteTypes = this.routeCategory.reduce((acc, categoryId) => {
      return { ...acc, ...this.filterObject.rawRouteType[categoryId] };
    }, {});

    this.filterObject.routeType = {
      "": "All", // Add "All" field
      ...mergedRouteTypes,
    };
  }
}


validateRegion(){
  if(this.region.length===3){
    alert('You can only select a maximum of 3 regions or select "All".');
    return
  }
}
onRegionChange(selectedRegions){
  // if(this.region.length>3){
  //   console.log(this.region);
  //    // Remove the last added selection
  //    this.region.pop()
  //    console.log(this.region);
  //   alert('You can only select a maximum of 3 regions or select "All".');
  //   return
  // }
  
  if (selectedRegions.includes('')) {
    // If "All" is selected, clear other selections
    this.region = [''];
  } else {
    // If "All" is deselected, update the selection normally
    this.region = selectedRegions.filter((value) => value !== '');
  }
}
triggerHstSubmit(eve){
  // console.log("qmMulticontainer",eve)
  this.search_grid=true;
  this.submit=true;
  if(eve.form.status=='VALID'){
    this.SpinnerService.show()
  var formdata=new FormData()
  formdata.append('AccessToken',this.token)
 var starteDate:any=this.datepipe.transform($("#datepicker").val(), 'yyyy-MM-dd');
 var endDate:any=this.datepipe.transform($("#datepicker1").val(), 'yyyy-MM-dd');
  formdata.append('DateFrom',starteDate)
  formdata.append('DateTo', endDate)
  if(eve.value.ReportType=='3'){
  formdata.append('ReportType','2');
}else if(eve.value.ReportType=='4'){
  formdata.append('ReportType','1');
}else{
  formdata.append('ReportType',eve.value.ReportType);
  }
  if(eve.value.TripId){
    formdata.append('TripId',eve.value.TripId)
  }else{
    // console.log(eve.value.vehicle_number.$ngOptionLabel);
    // RouteType,RouteCategory,Origin,Destination,Route,Region,TripStatus,VehicleNo,SupervisorException
    if(eve.value.Feeder){
      const commaSeparated = eve.value.Feeder.join(", ");
      formdata.append('RouteType',commaSeparated)}

      if(eve.value.TripType){
        const commaSeparated = eve.value.TripType.join(", ");
        formdata.append('RouteCategory',commaSeparated)}

  //  if(eve.value.TripType){ formdata.append('RouteCategory',eve.value.TripType)}
   if(eve.value.Origin){ formdata.append('Origin',eve.value.Origin)}
   if(eve.value.Destination){ formdata.append('Destination',eve.value.Destination)}
   if(eve.value.Route) {formdata.append('Route',eve.value.Route)}
   if(eve.value.Vendor) {formdata.append('Vendor',eve.value.Vendor)}
   if(eve.value.Region){
    let text = eve.value.Region;
    const result = text.map(loc => loc.split("(")[0]).join(",");
    console.log(result)
     formdata.append('Region',result);
   }
   if(eve.value.TripStatus){ formdata.append('TripStatus',eve.value.TripStatus)}
   if(eve.value.vehicle_number){ formdata.append('VehicleNo',eve.value.vehicle_number.$ngOptionLabel)}
  }
  this.dtdcService.dtdcTripReport(formdata).subscribe((data:any) => {
    this.submit=false;
    if(data.Status=="success"){
      if(eve.value.ReportType=='3'||eve.value.ReportType=='4'){
       this.search_grid=false;
      this.new_array=data.Report;
        this.exportToExcel();
        this.SpinnerService.hide();
      }else{
      this.new_array=data.Report;
      this.Grid_table();
      this.SpinnerService.hide();}
    }else{
      alert(data?.Message);
      this.router.navigate([`/auth/login`]);
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


makeModalDraggable() {
  const modalDialog = document.querySelector("#v_track_Modal .modal-dialog") as HTMLElement;
  const dragHandles = [
    document.querySelector("#v_track_Modal .modal-header"),
    document.querySelector("#v_track_Modal .modal-drag-bottom")
  ].filter(Boolean) as HTMLElement[];

  if (!modalDialog || dragHandles.length === 0) return;

  let isDragging = false;
  let startX = 0, startY = 0;
  const animationFrame = { id: 0 };
 
  // Initialize position
  const initializePosition = () => {
    const rect = modalDialog.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(modalDialog);
    const transform = computedStyle.transform;
   
    // If transform is not set, center the modal
    if (transform === 'none') {
      const x = (window.innerWidth - rect.width) / 2;
      const y = (window.innerHeight - rect.height) / 2;
      modalDialog.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  // Call initialization
  initializePosition();

  const getCurrentPosition = () => {
    const transform = window.getComputedStyle(modalDialog).transform;
    if (transform === 'none') return { x: 0, y: 0 };
   
    const matrix = transform.match(/^matrix\((.+)\)$/);
    if (matrix) {
      const values = matrix[1].split(',').map(Number);
      return { x: values[4], y: values[5] };
    }
    return { x: 0, y: 0 };
  };

  const setPosition = (x: number, y: number) => {
    const rect = modalDialog.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width + rect.width * 0.2;
    const maxY = window.innerHeight - rect.height + rect.height * 0.2;
   
    x = Math.max(-rect.width * 0.8, Math.min(x, maxX));
    y = Math.max(-rect.height * 0.8, Math.min(y, maxY));

    modalDialog.style.transform = `translate(${x}px, ${y}px)`;
  };

  const startDrag = (clientX: number, clientY: number) => {
    isDragging = true;
    startX = clientX;
    startY = clientY;
   
    modalDialog.style.transition = 'none';
    modalDialog.style.zIndex = '1050';
    dragHandles.forEach(h => h.style.cursor = 'grabbing');
  };

  const moveDrag = (clientX: number, clientY: number) => {
    if (!isDragging) return;
   
    cancelAnimationFrame(animationFrame.id);
    animationFrame.id = requestAnimationFrame(() => {
      const currentPos = getCurrentPosition();
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      setPosition(currentPos.x + deltaX, currentPos.y + deltaY);
     
      // Update start positions for smooth continuous dragging
      startX = clientX;
      startY = clientY;
    });
  };

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationFrame.id);
    modalDialog.style.transition = 'transform 0.2s ease';
    dragHandles.forEach(h => h.style.cursor = 'move');
  };

  // Event handlers
  const handleMove = (e: MouseEvent | TouchEvent) => {
    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
    moveDrag(clientX, clientY);
  };

  dragHandles.forEach(handle => {
    handle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
    });

    handle.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (e.touches.length === 1) startDrag(e.touches[0].clientX, e.touches[0].clientY);
    });

    handle.addEventListener('dblclick', () => {
      modalDialog.style.transition = 'transform 0.3s ease';
      initializePosition();
    });
  });

  const eventCleanups = [
    { event: 'mousemove', handler: handleMove },
    { event: 'touchmove', handler: handleMove },
    { event: 'mouseup', handler: endDrag },
    { event: 'touchend', handler: endDrag },
    { event: 'resize', handler: initializePosition }
  ].map(({ event, handler }) => {
    window.addEventListener(event, handler as EventListener);
    return () => window.removeEventListener(event, handler as EventListener);
  });

  return () => {
    endDrag();
    eventCleanups.forEach(cleanup => cleanup());
  };
}
// async vehicleTrackF_new(imei, imei2, imei3, run_date, vehicle_no, item, Id, route_id) {
//   // console.log(imei, imei2, imei3, run_date, vehicle_no, item, Id, route_id);
  
//   // Clear markers and polylines before starting
//   this.clearMarkersAndPolylines();
  
//   // Initialize map
//   try {
//     await this.initializeMap();
//   } catch (error) {
//     console.error('Error initializing map:', error);
//     this.SpinnerService.hide('spinner-1');
//   }

//   // Show tracking spinner
//   this.SpinnerService.show("tracking");
  
//   // Define the array of IMEIs to process
//   // const imeis = [imei,imei2,imei3];
//   const imeis = [imei,imei2,imei3];
//   console.log(imeis);
  
//   // Loop through each IMEI using a for...of loop to support async/await
//   for (const imei of imeis) {
//     // console.log(imei);
    
//     // Reset tracking data for each IMEI
//     this.trackingData = [];
//     this.customer_info = [];
//     this.marker = [];
//     this.poly_line = [];
//     this.map_flag = '';

//     if (imei === "") {
//       this.map_flag = 'Device unavailable';
//     } else {
//       this.map_flag = 'Please wait';
//       const formData = new FormData();
      
//       let currentDateTime: any = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
//       if(item.CloseDt!=='-'){
//         currentDateTime=item.CloseDt;
//       }

//       formData.append('AccessToken', this.token);
//       formData.append('startdate', run_date);
//       formData.append('enddate', currentDateTime);
//       formData.append('time_interval', '120');
//       formData.append('imei', imei);
//       formData.append('group_id', this.group_id);
//       formData.append('AccountId', this.account_id);
//       try {
//         // Wait for the API response
//         const res: any = await this.CrudService.vehicleTrackongS(formData).toPromise();
//         // console.log("tracking res", res);

//         if (res.Status === "failed") {
//           alert(res?.Message);
//         }

//         this.trackingData = res.data;

//         if (res.data === 'Vehicle is inactive.') {
//           alert("Track data is not available");
//         } else {
//           console.log("trackingData",this.trackingData)
//           // Add markers and polyline data
//           this.addMarkersAndPolyline1(imei, vehicle_no);
//           // Fetch DFG polyline data
//           // this.fetchDFGPolyline_new(route_id);
      
//           // Fetch customer info
//           this.fetchCustomerInfo_new(item);
      
//           // Handle alert markers
//           // this.handleAlertMarkers(item);
//         }

//       } catch (error) {
//         console.error("Error in API call:", error);
//         alert("An error occurred while fetching tracking data");
//       }
      
//       // Hide the tracking spinner after the API call
//       this.SpinnerService.hide("tracking");
//     }
//   }
// }

// getMarkerIcon(index: number): string {
//   if (index === 0) {
//     return 'assets/images/users/start_marker.png';
//   }
//   else if (index + 1 === this.trackingData.length) {

//     setTimeout(() => {
//       this.SpinnerService.hide("tracking");
//     }, 5000);
//     return 'assets/images/users/stop_marker.png';
//   } else {
//     return 'assets/images/users/green_Marker1.png';
//   }
// }
// addMarkersAndPolyline1(imei: string, vehicle_no: string) {
//   var lineString = new H.geo.LineString();

// let minLat = Infinity, minLng = Infinity, maxLat = -Infinity, maxLng = -Infinity;
// // const ui = H.ui.UI.createDefault(this.map1, new H.map.Platform({apikey: 'MoBysY-1fH4koFS2rGUDpwvRHSLfdX4GWYsRJUlB8VY'}).createDefaultLayers());
// const platform = new H.service.Platform({
// apikey: 'MoBysY-1fH4koFS2rGUDpwvRHSLfdX4GWYsRJUlB8VY'  // Replace with your actual API key
// });
// const defaultLayers = platform.createDefaultLayers();
// const ui = H.ui.UI.createDefault(this.map1, defaultLayers);
// for (let i = 0; i < this.trackingData.length; i++) {
// const position :any= this.trackingData[i];
// lineString.pushPoint({ lat: this.trackingData[i].lat, lng: this.trackingData[i].long });

// const locationOfMarker = { lat: position.lat, lng: position.long };

// const icon_temp = this.getMarkerIcon(i);
// const marker = this.createMarker(locationOfMarker, icon_temp, '2');

// // Add the marker to the map
// this.map1.addObject(marker);
// this.markers.push(marker);





// // Attach click event to each marker
// marker.addEventListener('tap',  async (evt) => {
// //  var position= evt.latLng.lat()
//   // Remove existing bubbles, if any
//   ui.getBubbles().forEach(bubble => ui.removeBubble(bubble));
  
//   // Create content for the info window
//   // const infoContent =this.handleMarkerClick(evt, this.trackingData[i], vehicle_no, imei)
//   console.log(position,i)
//   const infoContent = await this.handleMarkerClick(evt, position, vehicle_no, imei);

//   //  `<div>Marker #${i + 1}<br>Latitude: ${position.lat}<br>Longitude: ${position.long}</div>`;
   
//   // Create an info bubble at the marker's location
//   const infoBubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
//     content: infoContent
//   });

//   // Add the info bubble to the map
//   ui.addBubble(infoBubble);
// });















// // Update min and max lat/lng values to create bounding box
// minLat = Math.min(minLat, position.lat);
// minLng = Math.min(minLng, position.long);
// maxLat = Math.max(maxLat, position.lat);
// maxLng = Math.max(maxLng, position.long);
// }

// // Define padding in degrees (adjust as needed)
// const padding = 0.01;

// // Create a bounding box with padding
// const boundingBox = new H.geo.Rect(
// maxLat + padding,    // Top latitude (maxLat + padding)
// minLng - padding,    // Left longitude (minLng - padding)
// minLat - padding,    // Bottom latitude (minLat - padding)
// maxLng + padding     // Right longitude (maxLng + padding)
// );

// // Set the map view to fit all markers within the padded bounding box
// this.map1.getViewModel().setLookAtData({
// bounds: boundingBox
// });



// console.log("lineString",lineString)
//   this.addPolylineToMap(lineString)
// }
// handleMarkerClick1(event, trackingData, vehicle_no, imei) {
//   const markerPosition = event.target.getGeometry();
//   const formdataCustomer = new FormData();
//   formdataCustomer.append('AccessToken', this.token);
//   formdataCustomer.append('VehicleId', vehicle_no);
//   formdataCustomer.append('ImeiNo', imei);
//   formdataCustomer.append('LatLong', `${markerPosition.lat},${markerPosition.lng}`);

//   this.CrudService.addressS(formdataCustomer).subscribe((res: any) => {
//     const address = res.Data.Address;
//     this.showWindow(trackingData, vehicle_no, address);
//     // this.closeLastOpenedInfoWindow();
//     // const infowindowMarker = new google.maps.InfoWindow({ content: this.contentsInfo });
//     // infowindowMarker.setPosition(event.latLng);
//     // infowindowMarker.open(this.map1);
//   });
// }
// async handleMarkerClick(event, trackingData, vehicle_no, imei) {
//   const markerPosition = event.target.getGeometry();
//   const formdataCustomer = new FormData();
//   formdataCustomer.append('AccessToken', this.token);
//   formdataCustomer.append('VehicleId', vehicle_no);
//   formdataCustomer.append('ImeiNo', imei);
//   formdataCustomer.append('LatLong', `${markerPosition.lat},${markerPosition.lng}`);

//   const res:any = await this.CrudService.addressS(formdataCustomer).toPromise(); // Assuming it returns an observable
//  console.log("res",res)
//   const address = res.Data.Address;
  
//   return this.showWindow(trackingData, vehicle_no, address); // Return the content
// }

// showWindow(data, vnumber, add) {
//   // var add:any
//   this.contentsInfo = ''
//   console.log('show window of vehicle information', data, add)
//   /////////////////////////address api////////////////////////////////////////////////////



//   ////////////////////////////////////////////////////////////////////////////////////////////////////////////  

// return  this.contentsInfo = '<table style="line-height: 16px; border:none !important">' +
//     '<tbody style="border:none !important">' +

//     '<tr style=" border:none !important">' +
//     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Lat Long</td>' +
//     '<td style="width:1%;color: blue;border:none !important">:</td>' +
//     '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.lat + ',' + data.long + '</td>' +
//     '</tr>' +
//     '<tr style=" border:none !important">' +
//     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Vehicle No</td>' +
//     '<td style="width:1%;color: blue;border:none !important">:</td>' +
//     '<td style=" border:none !important;color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + vnumber + '</td>' +
//     '</tr>' +
//     '<tr style=" border:none !important">' +
//     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Address</td>' +
//     '<td style="border:none !important;width:1%;color: blue;">:</td>' +
//     '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500;" ><div style=" width: 250px;  word-wrap: break-word;  overflow-wrap: break-word; word-break: break-all;   line-height: 1.2;    white-space: normal;">' + add + '</div></td>' +
//     '</tr>' +
//     '<tr style=" border:none !important">' +
//     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Imei</td>' +
//     '<td style="border:none !important;width:1%;color: blue;">:</td>' +
//     '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.imei + '</td>' +
//     '</tr>' +
//     '<tr style=" border:none !important">' +
//     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Date Time</td>' +
//     '<td style="border:none !important;width:1%;color: blue;">:</td>' +
//     '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.device_time + '</td>' +
//     '</tr>' +
//     '<tr style=" border:none !important">' +
//     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Speed(km/hr)</td>' +
//     '<td style="border:none !important;width:1%;color: blue;">:</td>' +
//     '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.speed + '</td>' +
//     '</tr>' +
//     '<tr style=" border:none !important">' +
//     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Server Time</td>' +
//     '<td style="border:none !important;width:1%;color: blue;">:</td>' +
//     '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.server_time + '</td>' +
//     '</tr>' +
//     '<tr style=" border:none !important">' +
//     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Distance</td>' +
//     '<td style="border:none !important;width:1%;color: blue;">:</td>' +
//     '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.distance + '</td>' +
//     '</tr>' +
//     '<tr style=" border:none !important">' +
//     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Location Type</td>' +
//     '<td style="border:none !important;width:1%;color: blue;">:</td>' +
//     '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.loc_type + '</td>' +
//     '</tr>' +
//     '</tbody>' +
//     '</table>'






// }

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
  // console.log(Full)
  this.customer_info = [];
  const platform = new H.service.Platform({
    apikey: 'MoBysY-1fH4koFS2rGUDpwvRHSLfdX4GWYsRJUlB8VY'  // Replace with your actual API key
  });
  const defaultLayers = platform.createDefaultLayers();
  const ui = H.ui.UI.createDefault(this.map1, defaultLayers);
  const markers: google.maps.Marker[] = [];
  if (this.demomarker.length > 0) {
    this.demomarker.forEach(marker => {
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
  
  // console.log(result);
  this.customer_info=result;
  // this.CrudService.tripCustomerS(formdataCustomer).subscribe((res: any) => {
    // console.log("dddddddddddddddddddd",res)
    // if(res.message=="success" && res.customer_info!==null){
      // this.customer_info = res.customer_info;
       
      // Log the customer data for debugging
      // console.log("Customer Info:", this.customer_info);
  
      this.customer_info.forEach((customer:any, index) => {
        var count:any=index+1;
        const sequenceNo = 'M'+count;  // Ensure this is a string
     
       
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
    // const infoContent = await this.handleCustomerMarkerClick(evt, index);
  
    // console.log("infoContent",infoContent)
    //  `<div>Marker #${i + 1}<br>Latitude: ${position.lat}<br>Longitude: ${position.long}</div>`;
     
    // Create an info bubble at the marker's location
    const infoBubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
      // content: infoContent
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
fetchCustomerInfo(Id: any) {
  this.customer_info = []
  // if (this.demomarker.length > 0) {
  //   this.demomarker.forEach(marker => marker.setMap(null));
  //   this.demomarker = [];  // Clear the array after removing markers
  // }
  // console.log("Removing",Id)
  const markers: google.maps.Marker[] = [];
 
  const formdataCustomer = new FormData();
  formdataCustomer.append('AccessToken', this.token);
  formdataCustomer.append('MTripId',Id);
// tripCustomerS
  this.dtdcService.dtdcTripCustomerDetails(formdataCustomer).subscribe((res: any) => {
 
    if(res.Status=="success"){
      if(res.customer_info!==null){
    this.customer_info = res.TripDetails;
  // console.log(this.customer_info)
    // Log the customer data for debugging
    // console.log("Customer Info:", this.customer_info);
    //  if(this.customer_info!==null){
    this.customer_info.forEach((customer, index) => {
      // Log SequenceNo to check its value
      // console.log("Customer SequenceNo:", customer.SequenceNo);
//  ? customer.SequenceNo.toString() : '';
      const sequenceNo = customer.Label; // Ensure this is a string
      // const sequenceNo = customer.SequenceNo  // Ensure this is a string
      // console.log(customer.Coordinates,customer)
      const coordinates:any=customer.Coordinates;
      const [lat, lng] = coordinates.split(",");
      // console.log(lat, lng)
      let mark = new google.maps.Marker({
        map: this.map1,
        position: new google.maps.LatLng(lat,lng),
        title: `${lat}, ${lng}`,
        Source:customer.Source,
        label: {
          text: sequenceNo,  // Ensure this is a string
          color: 'black',
          
        }
      });

      this.demomarker.push(mark);
      markers.push(mark);
      google.maps.event.addListener(mark, 'click', (event) => this.handleCustomerMarkerClick(event, index));
    });
  }}
    // this.demomarker=markers;
  });
}

handleCustomerMarkerClick(event, index) {

const customer = this.customer_info[index];
const customer_Info = this.generateCustomerInfo(customer);
// return customer_Info;
this.closeLastOpenedInfoWindow();
const infowindowMarker_custo = new google.maps.InfoWindow({ content: customer_Info });
infowindowMarker_custo.setPosition(event.latLng);
infowindowMarker_custo.open(this.map1);
this.lastOpenedInfoWindow = infowindowMarker_custo;
}

generateCustomerInfo(customer): string {
// let pod = customer.CustVisited === 1 ? 'Already DONE' : 'Not Done';
// let type = customer.LocationSequence === 0 ? 'ORIGIN' : customer.LocationSequence === 1 ? 'INTERMEDIATE STATION' : 'DESTINATION';
// let arrival_time = customer.GeoArrivalTime ? `${customer.GeoArrivalTime} [GPS]` : customer.ArrivalTime;
// let departure_time = customer.GeoDepartureTime ? `${customer.GeoDepartureTime} [GPS]` : customer.DepartureTime;
// console.log(customer)
return `<table class="border" style="font-size: 13px;line-height: 19px;border:none !important;width:220px">
<tbody style="border:none !important">
  <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">Destination/Customer</td><td style="border:none !important">:</td><td style="border:none !important">${customer.Source}</td></tr>
  <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">LatLong</td><td style="border:none !important">:</td><td style="border:none !important">${customer.Coordinates}</td></tr>

</tbody>
</table>`;
}
//   <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">Distance Left</td><td style="border:none !important">:</td><td style="border:none !important">-</td></tr>
extra_info(eve){
  const isChecked = (eve.target as HTMLInputElement).checked;
  // console.log(isChecked)
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
onBtExport() {
 
  // this.gridApi!.exportDataAsExcel();
  // this. gridApi!.exportDataAsCsv();
  // if (this.gridApi) {
  //   this.gridApi.exportDataAsCsv({
  //     fileName: 'table-data.csv',
  //     columnKeys: this.columnDefs
  //       .filter(colDef => colDef.field !== 'trackHistory') // Exclude trackHistory column
  //       .map(colDef => colDef.field),
  //   });
  // }
  }
  
exportToPDF(): void {
  // Step 1: Extract parent and child headers dynamically
  const parentHeaders: any[] = [];
  const childHeaders: any[] = [];
  this.columnDefs.forEach((colDef) => {
    if (colDef.children) {
      parentHeaders.push({ text: colDef.headerName, colSpan: colDef.children.length, alignment: 'center', bold: true });
      for (let i = 1; i < colDef.children.length; i++) {
        parentHeaders.push(''); // Fill empty cells for colspan
      }
      colDef.children.forEach((child) => {
        childHeaders.push({ text: child.headerName, alignment: 'center' });
      });
    } else {
      parentHeaders.push({ text: colDef.headerName, alignment: 'center', bold: true });
      childHeaders.push('');
    }
  });

  // Step 2: Prepare table body
  const body: any[] = [];
  body.push(parentHeaders); // Add parent headers
  body.push(childHeaders); // Add child headers

  // Add row data dynamically
  this.rowData.forEach((row) => {
    const rowData: any[] = [];
    this.columnDefs.forEach((colDef) => {
      if (colDef.children) {
        colDef.children.forEach((child) => {
          rowData.push(row[child.field] || ''); // Add row data for child fields
        });
      } else {
        rowData.push(row[colDef.field] || ''); // Add row data for top-level fields
      }
    });
    body.push(rowData);
  });

  // Step 3: Define PDF document structure
  const docDefinition = {
    content: [
      { text: 'Dynamic Table Export', style: 'header', alignment: 'center' },
      { text: '\n' }, // Add spacing
      {
        table: {
          headerRows: 2,
          widths: Array(body[0].length).fill('auto'), // Auto column widths
          body: body,
        },
        layout: {
          fillColor: (rowIndex) => (rowIndex === 0 ? '#0074D9' : rowIndex === 1 ? '#DDDDDD' : null), // Parent and child header colors
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
        },
      },
    ],
    pageOrientation: 'landscape',
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      tableHeader: {
        bold: true,
        fontSize: 12,
        alignment: 'center',
      },
    },
    defaultStyle: {
      fontSize: 10,
    },
  };

  // Step 4: Generate and download the PDF
  pdfMake.createPdf(docDefinition).download('dynamic-table.pdf');
}
exportToCSV_delete(): void {
exportToCSV_delete(): void {
  const rows: string[] = [];
  const parentHeaders: string[] = [];
  const childHeaders: string[] = [];

  // Extract parent and child headers, excluding 'trackHistory'
  this.columnDefs.forEach((colDef: any) => {
    if (colDef.children) {
      // Parent header for grouped columns
      const filteredChildren = colDef.children.filter((child: any) => child.field !== 'trackHistory');
      if (filteredChildren.length > 0) {
        parentHeaders.push(colDef.headerName);
        childHeaders.push(...filteredChildren.map((child: any) => child.headerName));
      }
    } else if (colDef.field !== 'trackHistory') {
      // Parent and child headers are the same for non-grouped columns
      parentHeaders.push(colDef.headerName);
      childHeaders.push(colDef.headerName);
    }
  });

  // Create parent header row
  // rows.push(parentHeaders.map(value => `"${value}"`).join(',')); // Wrap headers in quotes
  rows.push(childHeaders.map(value => `"${value}"`).join(',')); // Wrap headers in quotes
  // rows.push(parentHeaders.map(value => `"${value}"`).join(',')); // Wrap headers in quotes
  rows.push(childHeaders.map(value => `"${value}"`).join(',')); // Wrap headers in quotes

  // Extract row data
  const rowData: any[] = [];
  this.gridOptions.api.forEachNode((node: any) => {
    rowData.push(node.data);
  });

  // Map row data to match the column fields, excluding 'trackHistory'
  rowData.forEach((row: any) => {
    const rowValues = childHeaders.map((header: string) => {
      const field = this.columnDefs.find((colDef: any) =>
        colDef.children?.some((child: any) => child.headerName === header && child.field !== 'trackHistory') ||
        (colDef.headerName === header && colDef.field !== 'trackHistory')
      )?.field;

      let value = field ? row[field] || '' : '';
      
      // Handle commas and quotes in the value
      if (typeof value === 'string') {
        value = value.replace(/"/g, '""'); // Escape double quotes
        value = `"${value}"`; // Wrap in double quotes
      }
      return value;

      let value = field ? row[field] || '' : '';
      
      // Handle commas and quotes in the value
      if (typeof value === 'string') {
        value = value.replace(/"/g, '""'); // Escape double quotes
        value = `"${value}"`; // Wrap in double quotes
      }
      return value;
    });
    rows.push(rowValues.join(',')); // Combine row values into a single row
    rows.push(rowValues.join(',')); // Combine row values into a single row
  });

  // Convert rows to CSV string
  const csvContent = rows.join('\n');

  // Trigger CSV download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'Trip Report.csv');
  link.setAttribute('download', 'Trip Report.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
exportToCSV(): void {
  const parentHeaders: string[] = [];
  const childHeaders: string[] = [];
  const rows: any[] = []; // Rows to be added in CSV
  const fieldsArray = [
    "", "ShipmentMethod", "Region", "Source", "Destination", "RouteCode",
    "RouteName", "FleetNo", "ShipmentNo", "RunCode", "RunDate",
    "RunTime", "VehicleNo", "TrackHistory", "State", "BranchName",
    "Area", "Driver", "DriverMobile", "Transporter", "STD",
    "ATD", "DelayDeparture", "STA", "ATA", "TTMapped",
    "TTTaken", "DelayArrival", "DelayTT", "ScheduleHalt", "ActualHalt",
    "ATT", "CloseByDevice","AHT","GPSATA","MobileATA",
    "ApiATA","GPSATD","MobileATD","ApiATD",
    "DistanceKm1", "DistanceKm2", "DistanceKm3",
    "GPSException1", "GPSException2", "GPSException3", "SupervisorException",
    "TripStatus", "Remarks", "CloseBy", "CloseDate", "CreateBy",
    "Bag", "GPSVendorType1", "GPSVendorType2", "GPSVendorType3",
    "BranchLocation", "BranchHandoverTime", "GateInTime", "GateOutTime",
    "GpsAta", "GpsAtd", "BayNoIn", "BayNoOut", "ShipmentCountIn",
    "ShipmentCountOut", "WeightIn", "WeightOut"
  ];

  // Extract parent and child headers, excluding 'trackHistory'
  this.columnDefs.forEach((colDef: any) => {
    if (colDef.children) {
      const filteredChildren = colDef.children.filter((child: any) => child.field !== 'trackHistory');
      if (filteredChildren.length > 0) {
        parentHeaders.push(colDef.headerName);
        childHeaders.push(...filteredChildren.map((child: any) => child.headerName));
      }
    } else if (colDef.field !== 'trackHistory') {
      childHeaders.push(colDef.headerName);
    }
  });

  // Push child headers as the first row
  rows.push(childHeaders);

  // Extract row data from the grid
  const rowData: any[] = [];
  this.gridOptions.api.forEachNode((node: any) => {
    rowData.push(node.data);
  });

  // Map row data to match the column fields, including child rows from Full.Detail
  rowData.forEach((row: any) => {
    // Process parent row
    const rowValues = childHeaders.map((header: string) => {
      const field = this.columnDefs.find((colDef: any) =>
        colDef.children?.some((child: any) => child.headerName === header && child.field !== 'trackHistory') ||
        (colDef.headerName === header && colDef.field !== 'trackHistory')
      )?.field;

      return field ? row[field] || '' : ''; // Extract value for parent row
    });
    rows.push(rowValues); // Add the parent row to rows

    // Process child rows from Full.Detail if they exist
    if (row.Full?.Detail?.length) {
      row.Full.Detail.forEach((detail: any) => {
        const childRowValues = fieldsArray.map((field: string) => {
          console.log(field, detail[field]);
          return detail[field] || ''; // Extract value for each field in fieldsArray
        });
        rows.push(childRowValues); // Add child row to rows
      });
    }
  });

  // Convert rows to CSV format
  const csvContent = rows.map(row => row.map(value => `"${value}"`).join(',')).join('\n');

  // Create a Blob for CSV and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Trip Report.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
exportToCSV_new(): void {
  const rowData = this.new_array.map((person, index) => ({
    sl: index + 1,
    routeType: person.ShipmentMethod,
    region: person.Region,
    origin: person.Source ?? "",
    destination: person.Destination ?? "",
    route: person.RouteCode ?? "",
    routeSequence: person.RouteName ?? "",
    fleet: person.FleetNo ?? "",
    tripId: person.ShipmentNo,
    runCode: person.RunCode,
    runDate: this.formatDate(person.RunDate) ?? "",
    vehicle: person.VehicleNo ?? "",
    state: person.State,
    branch: person.BranchName,
    area: person.Area,
    driverName: person.Driver ?? "",
    driverNumber: person.DriverMobile ?? "",
    transporter: person.Transporter ?? "",
    std: person.STD ?? "", // Standard Time of Departure
    atd: person.ATD ?? "", // Actual Time of Departure
    delayDeparture: person.DelayDeparture ?? "",
    sta: person.STA ?? "", // Standard Time of Arrival
    ata: person.ATA ?? "", // Actual Time of Arrival
    ttMapped: person.TTMapped ?? "",
    ttTaken: person.TTTaken ?? "",
    delayArrival: person.DelayArrival ?? "",
    delayTt: person.DelayTT,
    scheduleHalt: person.ScheduleHalt,
    actualHalt: person.ActualHalt,
    att: person.ATT, // Actual Travel Time
    CloseByDevice: person.CloseByDevice,
    fixedGpsKm: person.DistanceKm1,
    fixedELockKm: person.DistanceKm2,
    portableELockKm: person.DistanceKm3,
    gpsException1: person.GPSException1,
    gpsException2: person.GPSException2,
    gpsException3: person.GPSException3,
    supervisorException: person.SupervisorException,
    status: person.TripStatus,
    systemRemarks: person.Remarks,
    closeBy: person.CloseBy,
    closeDate: person.CloseDate,
    createBy: person.CreateBy,
    totalBag: person.Bag,
    remarks: person.remarks,
    gpsVendor: person.GPSVendorType1,
    fixedELockVendor: person.GPSVendorType2,
    portableELockVendor: person.GPSVendorType3,
    BranchLocation: person.BranchLocation || "",
    BranchHandoverTime: person.BranchHandoverTime || "",
    GateInTime: person.GateInTime || "",
    GateOutTime: person.GateOutTime || "",
    GPSATA: person.GpsAta || "",
    GPSATD: person.GpsAtd || "",
    Bay: person.BayNoIn || "",
    BayOUT: person.BayNoOut,
    ShipmentCount: person.ShipmentCountIn || 0,
    ShipmentCountOUT: person.ShipmentCountOut || "",
    Weight: person.WeightIn || 0,
    WeightOUT: person.WeightOut || "",
  }));

  const ws = XLSX.utils.json_to_sheet(rowData);

  // Convert worksheet to CSV
  const csvData = XLSX.utils.sheet_to_csv(ws);

  // Create a blob and download the file
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'ExportedData.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// import * as XLSX from 'xlsx'; // Only required if using npm-installed library
 // rowData.forEach((row: any) => {
  //   const rowValues = childHeaders.map((header: string) => {
  //     const field = this.columnDefs.find((colDef: any) =>
  //       // console.log()
  //       colDef.children?.some((child: any) => child.headerName === header && child.field !== 'trackHistory') ||
  //       (colDef.headerName === header && colDef.field !== 'trackHistory')
  //     )?.field;
  //     return field ? row[field] || '' : '';
  //   });
  //   rows.push(rowValues); // Add the processed row to rows
  // });

  // Create a workbook and worksheet
 
  exportToExcel_datetime(): void {
    const rowData = this.new_array.map((person, index) => ({

      Sl: index + 1,
      RouteType: person.ShipmentMethod,
      Region: person.Region,
      Origin: person.Source ?? "",
      Destination: person.Destination ?? "",
      Route: person.RouteCode ?? "",
      RouteSequence: person.RouteName ?? "",
      Fleet: person.FleetNo ?? "",
      TripId: person.ShipmentNo,
      RunCode: person.RunCode,
      // runDate: new Date(person.RunDate).toLocaleDateString('en-CA') ?? "",
      RunDate: this.parseDate(person.RunDate) ?? "",
      // runtime: person.RunDate ? new Date(person.RunDate).toLocaleTimeString('en-GB') : "",
      Vehicle: person.VehicleNo ?? "",
      // trackHistory: "",
      State: person.State,
      Branch: person.BranchName,
      Area: person.Area,
      DriverName: person.Driver ?? "",
      DriverNumber: person.DriverMobile ?? "",
      // driverName_s: person.Driver_S ?? "",
      // driverNumber_s: person.DriverMobile_S ?? "",
      Transporter: person.Transporter ?? "",
      Std:this.parseDate( person.STD )?? "", // Standard Time of Departure
      Atd: this.parseDate(person.ATD) ?? "", // Actual Time of Departure
      DelayDeparture: person.DelayDeparture ?? "",
      Sta: person.STA ?? "", // Standard Time of Arrival
      Ata: person.ATA ?? "", // Actual Time of Arrival
      TTMapped: person.TTMapped ?? "",
      TTTaken: person.TTTaken ?? "",
      DelayArrival: person.DelayArrival ?? "",
      DelayTt: person.DelayTT,
      ScheduleHalt: person.ScheduleHalt,
      ActualHalt: person.ActualHalt,
      Att: person.ATT, // Actual Travel Time
      CloseByDevice:person.CloseByDevice,
      AHT:person?.AHT?? "",
      // GPSATA:person?.GPSATA?? "",
      MobileATA:this.parseDate(person?.MobileATA)?? "",
      APIATA:this.parseDate(person?.ApiATA)?? "",
      // GPSATD:person?.GPSATD ?? "",
      MobileATD:this.parseDate(person?.MobileATD )?? "",
      APIATD:this.parseDate(person?.ApiATD )?? "",

      FixedGpsKm:person.DistanceKm1,
      FixedELockKm: person.DistanceKm2,
      PortableELockKm:person.DistanceKm3,
      GpsException1: person.GPSException1,
      GpsException2: person.GPSException2,
      GpsException3: person.GPSException3,
      SupervisorException: person.SupervisorException,
      Status: person.TripStatus,
      SystemRemarks: person.Remarks,
      CloseBy: person.CloseBy,
      CloseDate: person.CloseDate,
      CreateBy: person.CreateBy,
      TotalBag: person.Bag,
      Remarks: person.remarks,
      GpsVendor: person.GPSVendorType1,
      FixedELockVendor: person.GPSVendorType2,
      PortableELockVendor: person.GPSVendorType3,
      // portableELockDevice:person.PortableLockVendor,
      Full: person,
      BranchLocation: person.BranchLocation || "",
    BranchHandoverTime: this.parseDate(person.BranchHandoverTime) || "",
    GateInTime: this.parseDate(person.GateInTime) || "",
    GateOutTime:this.parseDate( person.GateOutTime) || "",
    GPSATA:this.parseDate( person.GpsAta )|| "",
    GPSATD:this.parseDate( person.GpsAtd )|| "",
    Bay: person.BayNoIn || "",
    BayOUT:person.BayNoOut,
    ShipmentCount: person.ShipmentCountIn || 0,
    ShipmentCountOUT: person.ShipmentCountOut || '',
    Weight: person.WeightIn || 0,
    WeightOUT: person.WeightOut || '',
  
    // ServerGPSReceivedIn:  this.extra ? person.ServerGPSReceivedIn : null,OUT
    // ServerGPSProcessedIn:  this.extra ? person.ServerGPSProcessedIn : null,
    // ServerGPSReceivedOut:  this.extra ? person.ServerGPSReceivedOut : null,
    // ServerGPSProcessedOut:  this.extra ? person.ServerGPSProcessedOut : null,
    // PushTimeIn:  this.extra ? person.PushTimeIn : null,
    // PushTimeOut:  this.extra ? person.PushTimeOut : null,
      // closeDeviceBy:' person.close_device_by',BayNoIn
      // portableLockDevice: 'person.portable_lock_device'
    }));
    console.log(rowData)
    const ws = XLSX.utils.json_to_sheet(rowData, {
      cellDates: true,  
      dateNF: 'dd-mm-yyyy hh:mm:ss', // Set the desired date format
      // dateNF: 'yyyy/mm/dd hh:mm:ss', 
    });
  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Trip Report');
    XLSX.writeFile(wb, 'Trip Report.xlsx');



  }
  exportToExcel1(): void {
    const parentHeaders: string[] = [];
    const childHeaders: any[] = [];
    const rows: any[] = []; // Rows to be added in Excel
    const fieldsArray = [
      "","ShipmentMethod", "Region", "Source", "Destination", "RouteCode", 
      "RouteName", "FleetNo", "ShipmentNo", "RunCode", "RunDate", 
      "RunTime", "VehicleNo", "TrackHistory", "State", "BranchName", 
      "Area", "Driver", "DriverMobile", "Transporter", "STD", 
      "ATD", "DelayDeparture", "STA", "ATA", "TTMapped", 
      "TTTaken", "DelayArrival", "DelayTT", "ScheduleHalt", "ActualHalt", 
      "ATT", "CloseByDevice", "DistanceKm1", "DistanceKm2", "DistanceKm3", 
      "GPSException1", "GPSException2", "GPSException3", "SupervisorException", 
      "TripStatus", "Remarks", "CloseBy", "CloseDate", "CreateBy", 
      "Bag", "GPSVendorType1", "GPSVendorType2", "GPSVendorType3", 
      "BranchLocation", "BranchHandoverTime", "GateInTime", "GateOutTime", 
      "GpsAta", "GpsAtd", "BayNoIn", "BayNoOut", "ShipmentCountIn", 
      "ShipmentCountOut", "WeightIn", "WeightOut"
    ];
    
    // Extract parent and child headers, excluding 'trackHistory'
    this.columnDefs.forEach((colDef: any) => {
      if (colDef.children) {
        // Parent header for grouped columns
        const filteredChildren = colDef.children.filter((child: any) => child.field !== 'trackHistory');
        if (filteredChildren.length > 0) {
          parentHeaders.push(colDef.headerName);
          childHeaders.push(...filteredChildren.map((child: any) => child.headerName));
        }
      } else if (colDef.field !== 'trackHistory') {
        // For non-grouped columns
        childHeaders.push(colDef.headerName);
      }
    });
   
    
    // Push child headers as the first row
    rows.push(childHeaders);
  
    // Extract row data from the grid
    const rowData: any[] = [];
    this.gridOptions.api.forEachNode((node: any) => {
      rowData.push(node.data);
    });
  
    // Map row data to match the column fields, including child rows from Full.Detail
    rowData.forEach((row: any) => {
      // Process parent row
      const rowValues = childHeaders.map((header: string) => {
        const field = this.columnDefs.find((colDef: any) =>
          colDef.children?.some((child: any) => child.headerName === header && child.field !== 'trackHistory') ||
          (colDef.headerName === header && colDef.field !== 'trackHistory')
        )?.field;
  
        return field ? row[field] || '' : ''; // Extract value for parent row
      });
      rows.push(rowValues); // Add the parent row to rows
  
      // Process child rows from Full.Detail if they exist
      if (row.Full?.Detail?.length) {
        row.Full.Detail.forEach((detail: any) => {
          const childRowValues = fieldsArray.map((field: string) => {
            console.log(field, detail[field]);
            return detail[field] || ''; // Extract value for each field in fieldsArray
          });
          rows.push(childRowValues); // Add child row to rows
        });
      }
    });
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(rows); // Convert array of arrays to sheet
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Trip Report');
    XLSX.writeFile(workbook, 'Trip Report.xlsx');
  }
onBtExport_pop() {
  // this.gridApi!.exportDataAsExcel();
  // this. gridApi_popup!.exportDataAsCsv();
  if (this.gridApi_popup) {
    this.gridApi_popup.exportDataAsCsv({
      fileName: 'table-data.csv',
      columnKeys: this.columnDefs_popup
        .filter(colDef => colDef.field !== 'trackHistory') // Exclude trackHistory column
        .map(colDef => colDef.field),
    });
  }
  }

exportToPDF_popup(): void {
  // Step 1: Extract parent and child headers dynamically
  const parentHeaders: any[] = [];
  const childHeaders: any[] = [];
  this.columnDefs_popup.forEach((colDef) => {
    if (colDef.children) {
      parentHeaders.push({ text: colDef.headerName, colSpan: colDef.children.length, alignment: 'center', bold: true });
      for (let i = 1; i < colDef.children.length; i++) {
        parentHeaders.push(''); // Fill empty cells for colspan
      }
      colDef.children.forEach((child) => {
        childHeaders.push({ text: child.headerName, alignment: 'center' });
      });
    } else {
      parentHeaders.push({ text: colDef.headerName, alignment: 'center', bold: true });
      childHeaders.push('');
    }
  });

  // Step 2: Prepare table body
  const body: any[] = [];
  body.push(parentHeaders); // Add parent headers
  body.push(childHeaders); // Add child headers

  // Add row data dynamically
  this.rowData_popup.forEach((row) => {
    const rowData: any[] = [];
    this.columnDefs_popup.forEach((colDef) => {
      if (colDef.children) {
        colDef.children.forEach((child) => {
          rowData.push(row[child.field] || ''); // Add row data for child fields
        });
      } else {
        rowData.push(row[colDef.field] || ''); // Add row data for top-level fields
      }
    });
    body.push(rowData);
  });

  // Step 3: Define PDF document structure
  const docDefinition = {
    content: [
      { text: 'Dynamic Table Export', style: 'header', alignment: 'center' },
      { text: '\n' }, // Add spacing
      {
        table: {
          headerRows: 2,
          widths: Array(body[0].length).fill('auto'), // Auto column widths
          body: body,
        },
        layout: {
          fillColor: (rowIndex) => (rowIndex === 0 ? '#0074D9' : rowIndex === 1 ? '#DDDDDD' : null), // Parent and child header colors
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
        },
      },
    ],
    pageOrientation: 'landscape',
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      tableHeader: {
        bold: true,
        fontSize: 12,
        alignment: 'center',
      },
    },
    defaultStyle: {
      fontSize: 10,
    },
  };

  // Step 4: Generate and download the PDF
  pdfMake.createPdf(docDefinition).download('dynamic-table.pdf');
}
exportToCSV_popup(): void {
  const rows: string[] = [];
  const parentHeaders: string[] = [];
  const childHeaders: string[] = [];

  // Extract parent and child headers, excluding 'trackHistory'
  this.columnDefs_popup.forEach((colDef: any) => {
    if (colDef.children) {
      // Filter out children with 'field === trackHistory'
      const filteredChildren = colDef.children.filter((child: any) => child.field !== 'trackHistory');
      if (filteredChildren.length > 0) {
        parentHeaders.push(colDef.headerName);
        childHeaders.push(...filteredChildren.map((child: any) => child.headerName));
      }
    } else if (colDef.field !== 'trackHistory') {
      // Parent and child headers are the same for non-grouped columns
      parentHeaders.push(colDef.headerName);
      childHeaders.push(colDef.headerName);
    }
  });

  // Create parent header row
  rows.push(parentHeaders.join(','));

  // Create child header row
  rows.push(childHeaders.join(','));

  // Extract row data
  const rowData: any[] = [];
  this.gridOptions_popup.api.forEachNode((node: any) => {
    rowData.push(node.data);
  });

  // Map row data to match the column fields, excluding 'trackHistory'
  rowData.forEach((row: any) => {
    const rowValues = childHeaders.map((header: string) => {
      const field = this.columnDefs_popup.find((colDef: any) =>
        colDef.children?.some((child: any) => child.headerName === header && child.field !== 'trackHistory') ||
        (colDef.headerName === header && colDef.field !== 'trackHistory')
      )?.field;
      return field ? row[field] || '' : '';
    });
    rows.push(rowValues.join(','));
  });

  // Convert rows to CSV string
  const csvContent = rows.join('\n');

  // Trigger CSV download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'Trip Report.csv');
  link.setAttribute('download', 'Trip Report.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ----------------------------------------------------------------------------------------------------------------------------------------------
async vehicleTrackF_new(close_date, imei2, imei3, run_date, vehicle_no, item, Id, route_id) {

async vehicleTrackF_new(close_date, imei2, imei3, run_date, vehicle_no, item, Id, route_id) {

  $('#v_track_Modal').modal('show');
 
 
  this.initMap1()
  this.SpinnerService.show("tracking");
// Clear markers and polylines if they exist
if (this.demomarker.length > 0) {
  this.demomarker.forEach(marker => marker.setMap(null));
  this.demomarker = [];  // Clear the array after removing markers
}

if (this.demoPolyline.length > 0) {
  this.demoPolyline.forEach(polyline => polyline.setMap(null));
  this.demoPolyline = [];  // Clear the array after removing polylines
}
  // console.log(imei, imei2, imei3);
  if ( imei2 === '' && imei3 === '') {
  if ( imei2 === '' && imei3 === '') {
    alert("IMEI not assign");
  }else{
  // Clear markers and polylines before starting
  this.clearMarkersAndPolylines();

  // Initialize map
  try {
    // await this.initializeMap();
  } catch (error) {
    console.error('Error initializing map:', error);
    this.SpinnerService.hide('spinner-1');
  }

  // Show tracking spinner
  this.SpinnerService.show("tracking");

  // Define the array of IMEIs to process
  // const imeis = [imei,imei2,imei3];
  const imeis = [imei2, imei3];
  const imeis = [imei2, imei3];
  // console.log(imeis);

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
      let currentDateTime: any;
      if(close_date==''){
        currentDateTime = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
      }else{
        currentDateTime= close_date;
      }
      let currentDateTime: any;
      if(close_date==''){
        currentDateTime = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
      }else{
        currentDateTime= close_date;
      }

      formData.append('AccessToken', this.token);
      formData.append('startdate', run_date);
      formData.append('enddate', currentDateTime);
      formData.append('time_interval', '120');
      formData.append('imei', imei);
      formData.append('group_id', this.group_id);
      formData.append('AccountId', this.account_id);
      formData.append('portal', 'itraceit');
      // Log form data for debugging
      formData.forEach((value, key) => {
        console.log("formdata...", key, value);
        console.log("formdata...", key, value);
      });

      // try {
        // Wait for the API response
        const res: any = await this.CrudService.vehicleTrackongS(formData).toPromise();
        
        this.SpinnerService.hide("tracking");
        if (res.Status === "failed") {
          alert(res?.Message);
          this.router.navigate([`/auth/login`]);
        }

        this.trackingData = res.data;

        if (res.data === 'Vehicle is inactive.') {
          alert("Track data is not available");
        } else {
          console.log("trackingData", this.trackingData);
          // Add markers and polyline data
          this.addMarkersAndPolyline1(imei, vehicle_no);
         
          this.fetchCustomerInfo(route_id);
        }

      // } catch (error) {
      //   console.error("Error in API call:", error);
      //   alert("An error occurred while fetching tracking data");
      // }

      // Hide the tracking spinner after the API call
      this.SpinnerService.hide("tracking");
    }
  }
} 
 }

getMarkerIcon(index: number): string {
  // console.log(index)
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

  // Prepare arrays for markers and polylines
  const markers: any = [];
  const polylinePath: google.maps.LatLng[] = [];
  
  // Use requestAnimationFrame for batch processing
  // requestAnimationFrame(() => {
    for (let i = 0; i < this.trackingData.length; i++) {
      const icon = this.getMarkerIcon(i);
      const position = new google.maps.LatLng(this.trackingData[i].lat, this.trackingData[i].long);
      polylinePath.push(position);

      // Create a marker
      let mark = new google.maps.Marker({
        map: this.map1,
        position: position,
        title: `${this.trackingData[i].lat}, ${this.trackingData[i].long}`,
        icon: icon
      });

      // Store marker for future reference
      markers.push(mark);
      this.demomarker.push(mark);

      // Handle marker click events
      // const markerPosition = mark.getPosition(); 
      let trackingData:any=this.trackingData[i];
      // console.log('trackingData',trackingData,i)
      mark.addListener('click', (event) => this.handleMarkerClick(event, trackingData, vehicle_no, imei));

      // Create an InfoWindow but don't attach it yet
      const infowindowMarker = new google.maps.InfoWindow({ content: this.contentsInfo });
    }

    // Add markers to the map in batch
    // this.demomarker = markers;

    // Create and display polyline
    const draw_polyline = new google.maps.Polyline({
      path: polylinePath,
      geodesic: true,
      strokeColor: 'green',
      strokeOpacity: 0.8,
      strokeWeight: 1.5,
      map: this.map1,
      icons: [{ icon: { path: google.maps.SymbolPath.FORWARD_OPEN_ARROW }, offset: '100%', repeat: '2000px' }]
    });

    this.demoPolyline.push(draw_polyline);

    // Optionally fit bounds to include all markers and polyline
    if (markers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      markers.forEach(marker => bounds.extend(marker.getPosition()));
      this.map1.fitBounds(bounds);
    }
  // });
}
 closeLastOpenedInfoWindow() {
  if (this.lastOpenedInfoWindow) {
    this.lastOpenedInfoWindow.close();
  }
}
handleMarkerClick(event, trackingData, vehicle_no, imei) {

  // const markerPosition = event.getPosition();
  // const k = event.toString();
  // console.log(event.toString())
  // this.str= (((k.split('(')).join('')).split(')')).join('').split(' ').join('');
  // console.log(trackingData)
  const formdataCustomer = new FormData();
  formdataCustomer.append('AccessToken', this.token);
  formdataCustomer.append('VehicleId', vehicle_no);
  formdataCustomer.append('ImeiNo', imei);
  formdataCustomer.append('LatLong', event.latLng.lat() + ',' + event.latLng.lng());
  formdataCustomer.append('portal', 'itraceit');
  this.CrudService.addressS(formdataCustomer).subscribe((res: any) => {
    // console.log(res)
    const address = res.Data.Address;
    this.showWindow(trackingData, vehicle_no, address);
    this.closeLastOpenedInfoWindow();
    const infowindowMarker = new google.maps.InfoWindow({ content: this.contentsInfo });
    infowindowMarker.setPosition(event.latLng);
    infowindowMarker.open(this.map1);
  });
}
showWindow(data, vnumber, add) {
  // console.log(data)
  // var add:any
  this.contentsInfo = ''
  // console.log('show window of vehicle information', data, add)
  /////////////////////////address api////////////////////////////////////////////////////



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////  

   this.contentsInfo = '<table style="line-height: 16px; border:none !important">' +
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
    '<tr>' + data.io + '<tr>' +
    '<tr style=" border:none !important">' +
    '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Location Type</td>' +
    '<td style="border:none !important;width:1%;color: blue;">:</td>' +
    '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.loc_type + '</td>' +
    '</tr>' +
    '</tbody>' +
    '</table>'






}
change_feeder(eve){
  console.log(eve)
 this.feeder_type= this. Master_filter?.RouteType[eve];
change_feeder(eve){
  console.log(eve)
 this.feeder_type= this. Master_filter?.RouteType[eve];
}
}




}



