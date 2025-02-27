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
import { DtdcService } from '../services/dtdc.service';
import { Router } from '@angular/router';
declare var H: any;
declare var $: any;
declare const agGrid: any;
declare var LZString:any;
// import * as echarts from 'echarts';
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
  selector: 'app-summary-dashboard',
  templateUrl: './summary-dashboard.component.html',
  styleUrls: ['./summary-dashboard.component.scss']
})
export class SummaryDashboardComponent implements OnInit {
  params: any;
  echart:any;
  datetimepicker1: any;
  datetimepicker: any;
  // grid table --------------------------------------------
  columnDefs:any=[]  
  rowData:any=[] 
  gridOptions:any=[] 
  gridApi:any;
  new_array: any=[
    {agency_name_hn:'456',region_name:'78945',district_name:'789547'},{agency_name_hn:'456',region_name:'78945',district_name:'789547'},{agency_name_hn:'456',region_name:'78945',district_name:'789547'}
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
  colors = [
    '#FF5733',  // Red-Orange
  // '#33FF57',  // Green
  '#3357FF',  // Blue
  '#FF33A1',  // Pink
  '#FFAA33',  // Orange
  '#33F5FF',  // Light Blue
  '#F5FF33',  // Yellow
  '#9B59B6',  // Purple
  '#F39C12',  // Amber
  '#2ECC71',  // Emerald Green
  '#E74C3C',  // Red
  '#3498DB',  // Light Blue
  '#F1C40F',  // Yellow
  '#1ABC9C',  // Turquoise
  ];
  
  footerData: any=[];
  Filter_flag: boolean=false;
  Route_type: any;
  // width: any;
  // min_width: any;
  // maxWidth: any;
  width: any=70;// Default width
  min_width: any=70 ;// Minimum width
  maxWidth:any=70; // Maximum width
  demoPolyline: any=[];
  lastOpenedInfoWindow: any;
  header_text: any;
  Destination: any=[];
  Region: any=[];
  Customer: any=[];
  searchTerm: any;
  searchTerm1: any;
  filteredDestination: any=[];
  filteredDestination1: any=[];
  selectedDestination: string | null = null;
  
  selectedDestination1: string | null = null;
  selectedRouteType: any;
  routeTypes_filter: any=[];
  eve: any;
  selectedRouteType1: any=[];
  region: any=[];
  region_route: any=[];
  Route_url:any="https://cv2.secutrak.in/cv/specific/dtdc/map";
  // Route_url:any="http://localhost:4200/cv/specific/dtdc/map";
  constructor(private router: Router,private navServices: NavService,private dtdcService:DtdcService,private CrudService: CrudService, private SpinnerService: NgxSpinnerService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    let App = document.querySelector('.app');
    App?.classList.add('sidenav-toggled');
    this.token=localStorage.getItem('AccessToken')!;
    this.group_id=localStorage.getItem('GroupId')!;
    this.account_id=localStorage.getItem('AccountId')!;
    // this.datetimepicker1 =  this.datepipe.transform((new Date), 'yyyy-MM-dd ');
    const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  this.datetimepicker1 = this.datepipe.transform(yesterday, 'yyyy-MM-dd');
    this.datetimepicker =  this.datepipe.transform((new Date), 'yyyy-MM-dd ');
    this.end();
    this.start();
    this.initMap1();

    // this.Grid_table();
    this.dtdcTripReportFilter();
    // this.Grid_table();
    // this.triggerHstSubmit1('')
    // this.First_call();
    
  }
  onSearch(searchTerm: any) {
    // Filter and update results based on the search term
    searchTerm=searchTerm?.term
    this.filteredDestination = this.Destination.filter(dest =>
      dest?.value?.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 50); // Limit to a subset
  }
  onSearch1(searchTerm: any) {
    // Filter and update results based on the search term
    searchTerm=searchTerm?.term
    this.filteredDestination1 = this.Customer.filter(dest =>
      dest?.value?.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 50); // Limit to a subset
  }
  private getLargeDataset() {
    // Simulate a large dataset
    return Array.from({ length: 10000 }, (_, i) => ({ value: `Option ${i + 1}` }));
  }
  initMap1() 
 {
  //  const center = { lat: this.customer_info[0].Lat, lng: this.customer_info[0].Lng };
   const center = { lat: 23.2599, lng: 77.4126 };
  //  this.customer_info[full_length].Lat, this.customer_info[full_length].Lng)
  // var center: any = new google.maps.LatLng( this.customer_info[0].Lat,  this.customer_info[0].Lng)
   this.map1 = new google.maps.Map(document.getElementById('map1') as HTMLElement, {
     zoom: 4,
      center: center,

     mapTypeId: google.maps.MapTypeId.ROADMAP,
     scaleControl: true,

   }
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
        // format: "yyyy-mm-dd", // Ensure this matches your desired format
        format: "yyyy-mm-dd",
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
 masterUploadTable() {
  var tbl = $('#simple_datatable')
  
  $(document).ready(function () {
    $('#simple_datatable').DataTable({
      "language": {
        search: '',
        searchPlaceholder: 'Search'
      },
      pageLength: 10,
      fixedHeader: {
        header: true, // Enables fixed header
        footer: false // Set to true if you want the footer to be fixed as well
      },
      paging: true,
      destroy: true,
      responsive: false,
    
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
    });
  });
}
// masterUploadTable(){
//   $('#simple_datatable').DataTable({
//       responsive: true, // Enables responsive table
//       autoWidth: false, // Prevents DataTables from setting widths
//       paging: true, // Enables pagination
//       searching: true, // Enables search box
//       ordering: true, // Enables sorting
//       lengthMenu: [[500, 1000, -1], [500, "1,000", "All"]], // Number of rows per page
//       pageLength: 500, // Default rows per page
//       dom: 'Bfrtip', // Placement of buttons and table controls
//       buttons: [
//           'copy', 'csv', 'excel', 'pdf'
//       ], // Export buttons
//       initComplete: function () { 
//           // Adjust column widths to match existing styles
//           this.api().columns.adjust();
//       },
//       language: {
//           search: "Filter records:", // Custom placeholder for search
//           lengthMenu: "Display _MENU_ records per page",
//           zeroRecords: "No matching records found",
//           info: "Showing _START_ to _END_ of _TOTAL_ entries",
//           infoEmpty: "Showing 0 to 0 of 0 entries",
//           infoFiltered: "(filtered from _MAX_ total entries)"
//       }
//   });
// }
summary_detail(eve,tripsKey,h_name){
  const temp_data = this.new_array.Data[0].trips;
    const completedTrips = temp_data[eve];
    this.rowData_popup=completedTrips;
    if(this.rowData_popup){
    
         var structuredata:any= {
            token: this.token,
            rowData_popup: this.rowData_popup,
            group_id: this.group_id,
            flag:0,
            name:h_name,
          };
       
      const compressedData = LZString.compressToUTF16(JSON.stringify(structuredata));
      sessionStorage.setItem('structuredata', compressedData);
      window.open(this.Route_url, '_blank');
      // window.open('https://cv2.secutrak.in/cv/specific/dtdc/map', '_blank');
      // https://cv2.secutrak.in/cv/specific/dtdc/map
    }else{
      alert("Data not found");
    }
}
summary_detail_1(eve,tripsKey,h_name){
  const temp_data = this.new_array.Data[0].trips;
    const completedTrips = temp_data[eve].filter(item => item[tripsKey]=== 1);
    this.rowData_popup=completedTrips;
    // console.log(completedTrips)
    if(this.rowData_popup){
    
      var structuredata:any= {
         token: this.token,
         rowData_popup: this.rowData_popup,
         group_id: this.group_id,
         flag:0,
         name:h_name,
       };
    
   const compressedData = LZString.compressToUTF16(JSON.stringify(structuredata));
   sessionStorage.setItem('structuredata', compressedData);

   window.open(this.Route_url, '_blank');
  //  window.open('https://cv2.secutrak.in/cv/specific/dtdc/map', '_blank');
   // https://cv2.secutrak.in/cv/specific/dtdc/map
 }else{
   alert("Data not found");
 }
}
summary_detail_2(eve,tripsKey,h_name){
  const temp_data = this.new_array.Data[0][tripsKey];
    const completedTrips = temp_data[eve];
    this.rowData_popup=completedTrips;
    if(this.rowData_popup){
    
      var structuredata:any= {
         token: this.token,
         rowData_popup: this.rowData_popup,
         group_id: this.group_id,
         flag:1,
         name:h_name,
       };
    
   const compressedData = LZString.compressToUTF16(JSON.stringify(structuredata));
   sessionStorage.setItem('structuredata', compressedData);
   
   window.open(this.Route_url, '_blank');
  //  window.open('https://cv2.secutrak.in/cv/specific/dtdc/map', '_blank');
   // https://cv2.secutrak.in/cv/specific/dtdc/map
 }else{
   alert("Data not found");
 }
}
summary_detail_3(eve,tripsKey,h_name){
  const temp_data = this.new_array.Data[0][tripsKey];
    const completedTrips = temp_data[eve];
    this.rowData_popup=completedTrips;
    if(this.rowData_popup){
    
      var structuredata:any= {
         token: this.token,
         rowData_popup: this.rowData_popup,
         group_id: this.group_id,
         flag:0,
         name:h_name,
       };
    
   const compressedData = LZString.compressToUTF16(JSON.stringify(structuredata));
   sessionStorage.setItem('structuredata', compressedData);

  //  window.open('http://localhost:4200/cv/specific/dtdc/map', '_blank');
   window.open(this.Route_url, '_blank');
   // https://cv2.secutrak.in/cv/specific/dtdc/map
 }else{
   alert("Data not found");
 }
}
 Detail(){
  $('#Datail').modal('show');
 if (this.gridApi_popup) {
  this.gridApi_popup.destroy();
}
 this.columnDefs_popup = [
  { field: 'Sl', headerName: 'Sl', sortable: true, filter: true, width: 50,  minWidth: 50, maxWidth: 50, },
  { field: 'RouteType', headerName: 'Route Type', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150,},
  { field: 'Region', headerName: 'Region', sortable: true, filter: true, width: 150,  minWidth: 150, maxWidth: 150, },
  { field: 'Origin', headerName: 'Origin', sortable: true, filter: true, width: 100,  minWidth: 100, maxWidth: 100, },
  { field: 'Destination', headerName: 'Destination', sortable: true, filter: true, width: 150,  minWidth: 150, maxWidth: 150, },
  { field: 'Route', headerName: 'Route', sortable: true, filter: true, width: 100,  minWidth: 100, maxWidth: 100, },
  { field: 'Fleet', headerName: 'Fleet', sortable: true, filter: true, width: 100,  minWidth: 100, maxWidth: 100, },
  { field: 'TripID', headerName: 'Trip ID', sortable: true, filter: true , width: 100,  minWidth: 100, maxWidth: 100,},
  { field: 'RunCode', headerName: 'Run Code', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150,},
  { field: 'RunDate', headerName: 'Run Date', sortable: true, filter: true , width: 200,  minWidth: 200, maxWidth: 200,},
  { field: 'Vehicle', headerName: 'Vehicle', sortable: true, filter: true , width: 100,  minWidth: 100, maxWidth: 100,},
  { field: 'Track', headerName: 'Track', sortable: true, filter: true,
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
      // console.log(params.data.Full.TrackHistory1)
      // Clear previous content
  
      if (params.data.Full?.Imei !== '') {
        button.innerHTML += `<strong style="color: blue;"><i class="fa fa-map-marker" style="font-size:17px ; color:blue"></i></strong>|`;
        button.addEventListener("click", () => {
          console.log("Row Data:", params.data.Full);
          // this.Detail(params.data.Full)
          this.vehicleTrackF_new('', '',params.data.Full?.Imei, params.data.Full?.RunDateF, params.data.Full?.Vehicle, params.data.Full, params.data.Full?.ShpNo, params.data.Full?.Id)
        });
      } else {
        button.innerHTML += `<span style="color: black;">-</span>|`;
      }
      
      if (params.data.Full?.Imei2 !== '') {
        button.innerHTML += `<strong style="color: blue;"><i class="fa fa-map-marker" style="font-size:17px ; color:blue"></i></strong>|`;
        
        button.addEventListener("click", () => {
          // console.log("Row Data:", params.data.Full);
          // this.Detail(params.data.Full)
          this.vehicleTrackF_new('', '',params.data.Full?.Imei2, params.data.Full?.RunDateF, params.data.Full?.Vehicle, params.data.Full, params.data.Full?.ShpNo, params.data.Full?.Id)
        });
      } else {
        button.innerHTML += `<span style="color: black;">-</span>|`;
      }
      
      if (params.data.Full?.Imei3 !== '') {
        button.innerHTML += `<strong style="color: blue;"><i class="fa fa-map-marker" style="font-size:17px ; color:blue"></i></strong>|`;
       
        button.addEventListener("click", () => {
          // console.log("Row Data:", params.data.Full);
          // this.Detail(params.data.Full)
          this.vehicleTrackF_new('', '',params.data.Full?.Imei3, params.data.Full?.RunDateF, params.data.Full?.Vehicle, params.data.Full, params.data.Full?.ShpNo, params.data.Full?.Id)
        });
      } else {
        button.innerHTML += `<span style="color: black;">-</span>|`;
      }
      
      // Attach event listener to the button
     
    
      // Append span and button to the container
      container.appendChild(serialSpan);
      container.appendChild(button);
    
      return container;
    },

   },
  { field: 'GPSVendor', headerName: 'GPS Vendor', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150,},
  { field: 'FixedElockVendor', headerName: 'Fixed E-lock Vendor', sortable: true, filter: true , width: 200,  minWidth: 200, maxWidth: 200,},
  { field: 'PortableElockVendor', headerName: 'Portable E-lock Vendor', sortable: true, filter: true , width: 250,  minWidth: 250, maxWidth: 250,},
  { field: 'DriverName', headerName: 'Driver Name', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150,},
  { field: 'DriverNumber', headerName: 'Driver Number', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150,},
  { field: 'Transporter', headerName: 'Transporter', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150,},
  { field: 'STD', headerName: 'STD', sortable: true, filter: true , width: 200,  minWidth: 200, maxWidth: 200,},
  { field: 'ATD', headerName: 'ATD', sortable: true, filter: true, width: 200,  minWidth: 200, maxWidth: 200, },
  { field: 'DelayDeparture', headerName: 'Delay Departure', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150,},
  { field: 'STA', headerName: 'STA', sortable: true, filter: true , width: 200,  minWidth: 200, maxWidth: 200,},
  { field: 'ATA', headerName: 'ATA', sortable: true, filter: true , width: 200,  minWidth: 200, maxWidth: 200,},
  { field: 'ttMapped', headerName: 'TT-Mapped', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150, },
  { field: 'TT-Taken', headerName: 'TT-Taken', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150,},
  { field: 'delayArrival', headerName: 'Delay Arrival', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150,},
  { field: 'DelayTT', headerName: 'Delay TT', sortable: true, filter: true, width: 150,  minWidth: 150, maxWidth: 150, },
  { field: 'Distance', headerName: 'Distance (Km)', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150,},
  { field: 'GPSException', headerName: 'GPS Exception', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150, },
  { field: 'Status', headerName: 'Status', sortable: true, filter: true , width: 100,  minWidth: 100, maxWidth: 100,},
  { field: 'CloseBy', headerName: 'Close By', sortable: true, filter: true, width: 150,  minWidth: 150, maxWidth: 150, },
  { field: 'CreateBy', headerName: 'Create By', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150,},
  { field: 'Full', headerName: 'Full', sortable: true, filter: true, hide:true, width: 100,  minWidth: 100, maxWidth: 100, },
];
this.rowData_popup = this.rowData_popup.map((person, index) => ({
  Sl: index + 1,
  RouteType: person.RouteType,
  Region: person.Region,
  Origin: person.Origin,
  Destination: person.Destination,
  Route: person.Route,
  Fleet: person.Fleet,
  TripID: person.TripId,
  RunCode: person.RunCode,
  RunDate: person.RunDateF,
  Vehicle: person.Vehicle,
  GPSVendor: person.gps_vendor_name,
  FixedElockVendor:person.DistanceKm2,
  PortableElockVendor: person.DistanceKm3,
  //   portableELockVendor: person.DistanceKm3,
  DriverName: person.Driver,
  // area: person.Area,
  // driverName: person.Driver,
  DriverNumber:person.DriverMobile,
  // driverNumber: person.DriverMobile,
  Transporter: person.Transporter,
  STD: person.STD, // Standard Time of Departure
  ATD: person.ATD, // Actual Time of Departure
  DelayDeparture: person.dep_delayedTrips,
  STA: person.STA, // Standard Time of Arrival
  ATA: person.ATA, // Actual Time of Arrival
  ttMapped: person.TTMapped,
  ttTaken: person.TTTaken,
  delayArrival: person.DelayArrival,
  DelayTT: person.DelayTT,
  Distance: person.Distance_Km,
  GPSException: person.ActualHalt,
  // Status: person.ATT, // Actual Travel Time
  // alerts: 'person.alerts',
//  reverseDriving: 'person.reverse_driving',
CloseBy:person.CloseBy,
CreateBy: person.CreateBy,
  // portableELockKm:person.DistanceKm3,
  // gpsException1: person.GPSException1,
  // gpsException2: person.GPSException2,
  // gpsException3: person.GPSException3,
  // supervisorException: person.SupervisorException,
  Status: person.status,
  Full:person
  // systemRemarks: person.Remarks,
  // closeBy: person.CloseBy,
  // closeDate: person.CloseDate,
  // createBy: person.CreateBy,
  // totalBag: person.Bag,
  // remarks: person.remarks,
  // gpsVendor: person.GPSVendorType1,
  // fixedELockVendor: person.DistanceKm2,
  // portableELockVendor: person.DistanceKm3,
  // Full: person,
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
  // ServerGPSReceivedIn:  this.extra ? person.ServerGPSReceivedIn : null,
  // ServerGPSProcessedIn:  this.extra ? person.ServerGPSProcessedIn : null,
  // ServerGPSReceivedOut:  this.extra ? person.ServerGPSReceivedOut : null,
  // ServerGPSProcessedOut:  this.extra ? person.ServerGPSProcessedOut : null,
  // PushTimeIn:  this.extra ? person.PushTimeIn : null,
  // PushTimeOut:  this.extra ? person.PushTimeOut : null,
}));
this.gridOptions_popup = {
  rowHeight: 30,
  headerHeight: 40,
  
  columnDefs: this.columnDefs_popup,
  rowData: this.rowData_popup,
  pagination: true,
  paginationPageSize: 50,
  paginationPageSizeSelector: [10, 50, 100,500,1000],
  defaultColDef: {
    sortable: true,
    filter: true,
    resizable: true,
    tooltipComponentParams: {
      color: "#ececec" // Optional parameter for custom styling
    }
  },
  animateRows: true,
  onGridReady: (params) => this.onGridReady_pop(params),
 

};
const gridDiv = document.querySelector('#myGrid-popup');
new agGrid.Grid(gridDiv, this.gridOptions_popup);
 }

 Detail1(){

 
  $('#Datail1').modal('show');
//  this.detail_data=eve;
 if (this.gridApi_popup) {
  this.gridApi_popup.destroy();
  // this.gridApi_popup='';
}
 this.columnDefs_popup = [
  { field: 'Sl', headerName: 'Sl', sortable: true, filter: true },
  // { field: 'RouteType', headerName: 'Route Type', sortable: true, filter: true },
  { field: 'Region', headerName: 'Region', sortable: true, filter: true, },
  { field: 'Vehicle', headerName: 'Vehicle', sortable: true, filter: true ,width:150},
  { field: 'LastStatus', headerName: 'Last Status', sortable: true, filter: true ,},
  { field: 'TripCount', headerName: 'Trip Count', sortable: true, filter: true, },
 ];

this.rowData_popup = this.rowData_popup.map((person, index) => ({
  Sl: index + 1,
  Region: person.Region,
  Vehicle: person.Vehicle,
  LastStatus: person.Status,
  TripCount: person.TripCnt,

 }));
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
};

const gridDiv = document.querySelector('#myGrid-popup1');
new agGrid.Grid(gridDiv, this.gridOptions_popup);
// this.gridOptions_popup.columnApi.setColumnVisible("Full", false);
 }
 Grid_table(){
  if (this.gridApi) {
    this.gridApi.destroy();
  }
  
  this.columnDefs = [
    {
      headerName: "Region", 
      field: "Region", 
      sortable: true, 
      filter: true, 
      floatingFilter: this.floating_filter,
      headerClass: 'icon-header',
      // headerClass: 'custom-parent-header',
      // headerClass: 'clickable-header', 
      width: this.width, // Default width
      minWidth: this.min_width, // Minimum width
      maxWidth: this.maxWidth, // Maximum width
      // Custom class for child headers
    },
    
    {
      headerName: "Trip Status",
      headerClass: 'custom-parent-header', // Custom class for parent header
      children: [
        {
          // cellStyle: {  }, // Set blue text color
          headerName: 'Total',  // Text of the header
          field: 'Total',
          sortable: true,
          aggFunc: 'sum' ,
          filter: this.Filter_flag,
          // headerClass: 'multi-line-header',
          headerClass: 'icon-header',
          floatingFilter: this.floating_filter,
          width: this.width, // Default width
          minWidth: this.min_width, // Minimum width
          maxWidth: this.maxWidth, // Maximum width
          cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          autoHeight: true ,// Automatically adjust row height for wrapped content
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
        
            // Add click event listener
            span.addEventListener('click', () => {
              var Region=params.data.Region;
             var temp_data= this.new_array.Data[0].trips;
             console.log("temp_data",temp_data)
              const completedTrips = temp_data[Region]
              // .filter(item => item.TotalTrip=== 1);
              this.rowData_popup=completedTrips;
              if(this.rowData_popup){
                this.Detail();
              }else{
                alert("Data not found")
              }
            });
        
            return span;
          }
 // Use the custom header component
        },
        {
          headerName: "Schedule",
          field: "Schedule",
          sortable: true,
          filter: this.Filter_flag,aggFunc: 'sum' ,
          floatingFilter: this.floating_filter,
          headerClass: 'icon-header',
          width: this.width, // Default width
          minWidth: this.min_width, // Minimum width
          maxWidth: this.maxWidth, // Maximum width
          cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          autoHeight: true ,// Automatically adjust row height for wrapped content
          cellClass: 'wrap-cell', // Apply the CSS class for wrapping
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
        
            span.addEventListener('click', () => {
              var Region=params.data.Region;
             var temp_data= this.new_array.Data[0].trips;
              const completedTrips = temp_data[Region].filter(item => item.RunningOnTime=== 1);
              this.rowData_popup=completedTrips;
              if(this.rowData_popup){
                this.Detail();
              }else{
                alert("Data not found")
              }
            });
            return span;
          }
          // headerClass: 'custom-child-header'
        },
        {
          headerName: "Complete",
          field: "Complete",
          sortable: true,
          filter: this.Filter_flag,aggFunc: 'sum' ,
          floatingFilter: this.floating_filter,
          headerClass: 'icon-header',
          width: this.width, // Default width
          minWidth: this.min_width, // Minimum width
          maxWidth: this.maxWidth, // Maximum width
          cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability

            span.addEventListener('click', () => {
              var Region=params.data.Region;
             var temp_data= this.new_array.Data[0].trips;
              const completedTrips = temp_data[Region].filter(item => item.CompletedTrip=== 1);
              this.rowData_popup=completedTrips;
              if(this.rowData_popup){
                this.Detail();
              }else{
                alert("Data not found")
              }
            });
            return span;
          }
          // headerClass: 'custom-child-header'
        },
        {
          headerName: "DNA",
          field: "DNA",
          sortable: true,
          filter: this.Filter_flag,aggFunc: 'sum' ,
          floatingFilter: this.floating_filter,
          width: 100, // Default width
          minWidth: 100, // Minimum width
          cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          maxWidth: 100, // Maximum width
          headerClass: 'icon-header',
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
            span.addEventListener('click', () => {
              var Region=params.data.Region;
             var temp_data= this.new_array.Data[0].trips;
              const completedTrips = temp_data[Region].filter(item => item.DnaTrip=== 1);
              this.rowData_popup=completedTrips;
              if(this.rowData_popup){
                this.Detail();
              }else{
                alert("Data not found")
              }
            });
            return span;
          }
          // headerClass: 'custom-child-header'
        }
      ]
    },


    {
      headerName: "GPS Status",
      headerClass: 'custom-parent-header', // Custom class for parent header
      children: [
        {
          headerName: 'Vehicle Count',  // Text of the header
          field: 'VehicleCount',
          sortable: true,
          filter: this.Filter_flag,aggFunc: 'sum' ,
          cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          floatingFilter: this.floating_filter,
          headerClass: 'icon-header',
          width: this.width, // Default width
          minWidth: this.min_width, // Minimum width
          maxWidth: this.maxWidth, // Maximum width
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
        
            // Add click event listener
            span.addEventListener('click', () => {
              // alert(`You clicked on ${params.value}`);
              // console.log("params",params.data);
              this.new_array.Data[0].wrong_vehicle_data;
              var Region=params.data.Region;
              // console.log(Region)
              var rowData_popup= this.new_array.Data[0].vehicleCount;
              this.rowData_popup=rowData_popup[Region]
              // console.log(this.rowData_popup)
              // this.Detail1()
              if(this.rowData_popup){
                this.Detail1();
              }else{
                alert("Data not found")
              }
            });
        
            return span;
          }
 // Use the custom header component
        },
        {

          headerName: "GPS Active",
          field: "GPSActive",
          sortable: true,
          filter: this.Filter_flag,aggFunc: 'sum' ,
          floatingFilter: this.floating_filter,
          headerClass: 'icon-header',
          width: this.width, // Default width
          cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          minWidth: this.min_width, // Minimum width
          maxWidth: this.maxWidth, // Maximum width
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
        
            // Add click event listener
            span.addEventListener('click', () => {
              // alert(`You clicked on ${params.value}`);
              console.log("params",params.data);
              this.new_array.Data[0].active;
              var Region=params.data.Region;
              console.log(Region)
              var rowData_popup= this.new_array.Data[0].active;
              this.rowData_popup=rowData_popup[Region]
              console.log(this.rowData_popup)
              // this.Detail1()
              if(this.rowData_popup){
                this.Detail1();
              }else{
                alert("Data not found")
              }
            });
        
            return span;
          }
          // headerClass: 'custom-child-header'
        },
        {

          headerName: "GPS Inactive",
          field: "GPSInactive",
          sortable: true,
          filter: this.Filter_flag,aggFunc: 'sum' ,
          floatingFilter: this.floating_filter,
          headerClass: 'icon-header',
          width: this.width, // Default width
          cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          minWidth: this.min_width, // Minimum width
          maxWidth: this.maxWidth, // Maximum width
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
        
            // Add click event listener
            span.addEventListener('click', () => {
              // alert(`You clicked on ${params.value}`);
              console.log("params",params.data);
              this.new_array.Data[0].inactive;
              var Region=params.data.Region;
              console.log(Region)
              var rowData_popup= this.new_array.Data[0].inactive;
              this.rowData_popup=rowData_popup[Region]
              console.log(this.rowData_popup)
              // this.Detail1()
              if(this.rowData_popup){
                this.Detail1();
              }else{
                alert("Data not found")
              }
              
              // this.vehicle_newFunction(params.data.full_data)
              // this.show_customer(params.data.full_data.id, params.data.full_data.rating1)
             
            });
        
            return span;
          }
        },
        {

          headerName: "GPS NA",
          field: "GPSNA",
          sortable: true,
          filter: this.Filter_flag,aggFunc: 'sum' ,
          floatingFilter: this.floating_filter,
          headerClass: 'icon-header',
          width: this.width, // Default width
          cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          minWidth: this.min_width, // Minimum width
          maxWidth: this.maxWidth, // Maximum width
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
        
            // Add click event listener
            span.addEventListener('click', () => {
              // alert(`You clicked on ${params.value}`);
              console.log("params",params.data);
              this.new_array.Data[0].nogps;
              var Region=params.data.Region;
              console.log(Region)
              var rowData_popup= this.new_array.Data[0].nogps;
              this.rowData_popup=rowData_popup[Region]
              console.log(this.rowData_popup);
              if(this.rowData_popup){
                this.Detail1();
              }else{
                alert("Data not found")
              }
            });
        
            return span;
          }
          // headerClass: 'custom-child-header'
        }
      ]
    },

    {
      headerName: "Trip Creation Exception",
      headerClass: 'custom-parent-header', 
      // headerClass: 'clickable-header', // Ensure the class is applied to this header// Custom class for parent header
      children: [
        {
          headerName: 'Vehicle NA',  // Text of the header
          field: 'VehicleNA',
          sortable: true,
          cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          filter: this.Filter_flag,aggFunc: 'sum' ,
          floatingFilter: this.floating_filter,
          headerClass: 'icon-header',
          width: this.width, // Default width
          minWidth: this.min_width, // Minimum width
          maxWidth: this.maxWidth, // Maximum width
          // headerClass: 'clickable-header', // Ensure the class is applied to this header
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
        
            span.addEventListener('click', () => {
              var Region=params.data.Region;
             var temp_data= this.new_array.Data[0].trips;
              const completedTrips = temp_data[Region].filter(item => item.WrongVehicle=== 1);
              this.rowData_popup=completedTrips;
              if(this.rowData_popup){
                this.Detail();
              }else{
                alert("Data not found")
              }
            });
            return span;
          },
        },
        {
          headerName: "Route NA",
          field: "RouteNA",
          sortable: true,aggFunc: 'sum' ,
          filter: this.Filter_flag,  
          cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          headerClass: 'icon-header',
          // headerClass: 'clickable-header', // Ensure the class is applied to this header
          floatingFilter: this.floating_filter,
          width: this.width, // Default width
          minWidth: this.min_width, // Minimum width
          maxWidth: this.maxWidth, // Maximum width
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
        
           
            span.addEventListener('click', () => {
              var Region=params.data.Region;
             var temp_data= this.new_array.Data[0].trips;
              const completedTrips = temp_data[Region].filter(item => item.WrongRoute=== 1);
              this.rowData_popup=completedTrips;
              if(this.rowData_popup){
                this.Detail();
              }else{
                alert("Data not found")
              }
            });
            return span;
          }
          // headerClass: 'custom-child-header'
        },
        {
          headerName: "Fleet NA",
          field: "FleetNA",
          sortable: true,aggFunc: 'sum' ,
          filter: this.Filter_flag,
            // headerClass: 'clickable-header', // Ensure the class is applied to this header
            headerClass: 'icon-header',
          floatingFilter: this.floating_filter,
          cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          width: this.width, // Default width
          minWidth: this.min_width, // Minimum width
          maxWidth: this.maxWidth, // Maximum width
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
        
            span.addEventListener('click', () => {
              var Region=params.data.Region;
             var temp_data= this.new_array.Data[0].trips;
              const completedTrips = temp_data[Region].filter(item => item.WrongFleet=== 1);
              this.rowData_popup=completedTrips;
              if(this.rowData_popup){
                this.Detail();
              }else{
                alert("Data not found")
              }
            });
            return span;
          }
          // headerClass: 'custom-child-header'
        },
        // OTD/OTA Status
      ]
    },
    {
      headerName: "OTD/OTA Status",
      headerClass: 'custom-parent-header', // Custom class for parent header
      children: [
        {
          headerName: 'OTD',  // Text of the header
          field: 'OTD',
          sortable: true,
          filter: this.Filter_flag,aggFunc: 'sum' ,
          floatingFilter: this.floating_filter,
          headerClass: 'icon-header',
          cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          width: this.width, // Default width
          minWidth: this.min_width, // Minimum width
          maxWidth: this.maxWidth, // Maximum width
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
        
            span.addEventListener('click', () => {
              var Region=params.data.Region;
             var temp_data= this.new_array.Data[0].trips;
              const completedTrips = temp_data[Region].filter(item => item.OTD=== 1);
              this.rowData_popup=completedTrips;
              if(this.rowData_popup){
                this.Detail();
              }else{
                alert("Data not found")
              }
            });
            return span;
          }
 // Use the custom header component
        },
        {
          headerName: "Delayed Departure",
          field: "DelayedDeparture",
          sortable: true,
          filter: this.Filter_flag,aggFunc: 'sum' ,
          headerClass: 'icon-header',
          cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          floatingFilter: this.floating_filter,
          // headerClass: 'custom-child-header'
          width: this.width, // Default width
          minWidth: this.min_width, // Minimum width
          maxWidth: this.maxWidth, // Maximum width
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
        
            span.addEventListener('click', () => {
              var Region=params.data.Region;
             var temp_data= this.new_array.Data[0].trips;
              const completedTrips = temp_data[Region].filter(item => item.DelayedDeparture=== 1);
              this.rowData_popup=completedTrips;
              if(this.rowData_popup){
                this.Detail();
              }else{
                alert("Data not found")
              }
            });
            return span;
          }
        },
        {
          headerName: "ATD NA",
          field: "ATDNA",
          sortable: true,
          filter: this.Filter_flag,aggFunc: 'sum' ,
          headerClass: 'icon-header',
          floatingFilter: this.floating_filter,
          width: this.width, // Default width
          minWidth: this.min_width, // Minimum width
          cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          maxWidth: this.maxWidth, // Maximum width
          // headerClass: 'custom-child-header' atdnTrips
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
        
            span.addEventListener('click', () => {
              var Region=params.data.Region;
             var temp_data= this.new_array.Data[0].trips;
              const completedTrips = temp_data[Region].filter(item => item.ATAN=== 1);
              this.rowData_popup=completedTrips;
              if(this.rowData_popup){
                this.Detail();
              }else{
                alert("Data not found")
              }
            });
            return span;
          }
        },


        {
          headerName: " DINA",
          field: "DINA",
          sortable: true,
          filter: this.Filter_flag,aggFunc: 'sum' ,
          floatingFilter: this.floating_filter,
          headerClass: 'icon-header',
          width: this.width, // Default width
          minWidth: this.min_width, // Minimum width
          cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          maxWidth: this.maxWidth, // Maximum width
          // headerClass: 'custom-child-header'
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
            span.addEventListener('click', () => {
              var Region=params.data.Region;
             var temp_data= this.new_array.Data[0].trips;
              const completedTrips = temp_data[Region].filter(item => item.DINA=== 1);
              this.rowData_popup=completedTrips;
              if(this.rowData_popup){
                this.Detail();
              }else{
                alert("Data not found")
              }
            });
            return span;
          }
        },
        {
          headerName: "Runing on Time ",
          field: "RuningonTime",
          sortable: true,
          filter: this.Filter_flag,aggFunc: 'sum' ,
          floatingFilter: this.floating_filter,
          headerClass: 'icon-header',
          cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          width: this.width, // Default width
          minWidth: this.min_width, // Minimum width
          maxWidth: this.maxWidth, // Maximum width
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
            span.addEventListener('click', () => {
              var Region=params.data.Region;
             var temp_data= this.new_array.Data[0].trips;
              const completedTrips = temp_data[Region].filter(item => item.RunningOnTime=== 1);
              this.rowData_popup=completedTrips;
              if(this.rowData_popup){
                this.Detail();
              }else{
                alert("Data not found")
              }
            });
            return span;
          }
          // headerClass: 'custom-child-header'
        },
        {
          headerName: "Runing Late",
          field: "RuningLate",
          sortable: true,
          cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          filter: this.Filter_flag,aggFunc: 'sum' ,
          floatingFilter: this.floating_filter,
          headerClass: 'icon-header',
          width: this.width, // Default width
          minWidth: this.min_width, // Minimum width
          maxWidth: this.maxWidth, // Maximum width
          // headerClass: 'custom-child-header'
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
            span.addEventListener('click', () => {
              var Region=params.data.Region;
             var temp_data= this.new_array.Data[0].trips;
              const completedTrips = temp_data[Region].filter(item => item.RuningLate=== 1);
              this.rowData_popup=completedTrips;
              if(this.rowData_popup){
                this.Detail();
              }else{
                alert("Data not found")
              }
            });
            return span;
          }
        },
        {
          headerName: "Runing DNA ",
          field: "RuningDNA",
          sortable: true,
          filter: this.Filter_flag,aggFunc: 'sum' ,
          headerClass: 'icon-header',
          floatingFilter: this.floating_filter,
          width: this.width, // Default width
          minWidth: this.min_width, // Minimum width
          cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          maxWidth: this.maxWidth, // Maximum width
          // headerClass: 'custom-child-header' runningDnaTrips
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
            span.addEventListener('click', () => {
              var Region=params.data.Region;
             var temp_data= this.new_array.Data[0].trips;
              const completedTrips = temp_data[Region].filter(item => item.RunningDna=== 1);
              this.rowData_popup=completedTrips;
              if(this.rowData_popup){
                this.Detail();
              }else{
                alert("Data not found")
              }
            });
            return span;
          }
        },
        {
          headerName: "OTA",
          field: "OTA",
          sortable: true,
          filter: this.Filter_flag,aggFunc: 'sum' ,
          headerClass: 'icon-header',
          floatingFilter: this.floating_filter,
          cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          width: this.width, // Default width
          minWidth: this.min_width, // Minimum width
          maxWidth: this.maxWidth, // Maximum width
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
            span.addEventListener('click', () => {
              var Region=params.data.Region;
             var temp_data= this.new_array.Data[0].trips;
              const completedTrips = temp_data[Region].filter(item => item.OTA=== 1);
              this.rowData_popup=completedTrips;
              if(this.rowData_popup){
                this.Detail();
              }else{
                alert("Data not found")
              }
            });
            return span;
          }
          // headerClass: 'custom-child-header'
        },
        {
          headerName: "ATA Delayed",
          field: "ATADelayed",
          sortable: true,
          filter: this.Filter_flag,aggFunc: 'sum' ,
          headerClass: 'icon-header',
          floatingFilter: this.floating_filter,
                    cellStyle: { whiteSpace: 'normal', lineHeight: '1.2em',color: 'blue' }, // Enable wrapping
          width: this.width, // Default width
          minWidth: this.min_width, // Minimum width
          maxWidth: this.maxWidth, // Maximum width
          // headerClass: 'custom-child-header' ata_delayedTrips
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
            span.addEventListener('click', () => {
              var Region=params.data.Region;
             var temp_data= this.new_array.Data[0].trips;
              const completedTrips = temp_data[Region].filter(item => item.ATADelayed=== 1);
              this.rowData_popup=completedTrips;
              if(this.rowData_popup){
                this.Detail();
              }else{
                alert("Data not found")
              }
            });
        
            return span;
          }
        },
        {
          headerName: "AINA",
          field: "AINA",
          sortable: true,
          filter: false,aggFunc: 'sum' ,
          floatingFilter: this.floating_filter,
          headerClass: 'icon-header',
          width: this.width, // Default width
          minWidth: this.min_width, // Minimum width
          maxWidth: this.maxWidth, // Maximum width
          // headerClass: 'custom-child-header' ainaTrips
          cellRenderer: (params) => {
            // Create a clickable div or span element
            const span = document.createElement('span');
            span.innerText = params.value;
            span.style.cursor = 'pointer'; // Change the cursor to indicate clickability
            span.addEventListener('click', () => {
              var Region=params.data.Region;
             var temp_data= this.new_array.Data[0].trips;
              const completedTrips = temp_data[Region].filter(item => item.AINA=== 1);
              this.rowData_popup=completedTrips;
              if(this.rowData_popup){
                this.Detail();
              }else{
                alert("Data not found")
              }
            });
            return span;
          }
        },
        // OTD/OTA Status
      ]
    },
  ];
      this.rowData = this.new_array.Summary.map((person, index) => ({
        sl: index + 1, // Optional: Add row index
        Region: person.Region, // For parent-level columns
        Total: person.TotalTrip,   // For child columns under "Trip Status"
        Schedule: person.RunningTrip,
        Complete: person.CompletedTrip,
        DNA: person.DnaTrip,
        // Region: person.Region, // For parent-level columns
        VehicleCount: person.VehicleCount, // For child columns under "GPS Status"
        GPSActive: person.GPSActive,
        GPSInactive: person.GPSInactive,
        GPSNA: person.GPSNA,
        VehicleNA: person.WrongVehicle, // For child columns under "Trip Creation Exception"
        RouteNA: person.WrongRoute,
        FleetNA: person.WrongFleet,
        OTD: person.OTD, // For child columns under "OTD/OTA Status"
        DelayedDeparture: person.DelayedDeparture,
        ATDNA: person.ATAN,
        DINA: person.DINA,
        RuningonTime: person.RunningOnTime,
        RuningLate: person.RunningLate,
        RuningDNA: person.RuningDNA,
        OTA: person.OTA,
        ATADelayed: person.ATADelayed,
        ATANA: person.ATANA,
        AINA: person.AINA,
      }));
      this.footerData = this.new_array.Total.map((person, index) => ({
        sl: index + 1, // Optional: Add row index
        Region: 'Total', // For parent-level columns
        Total: person.TotalTrip,   // For child columns under "Trip Status"
        Schedule: person.RunningTrip,
        Complete: person.CompletedTrip,
        DNA: person.DnaTrip,
        // Region: person.Region, // For parent-level columns
        VehicleCount: person.VehicleCount, // For child columns under "GPS Status"
        GPSActive: person.GPSActive,
        GPSInactive: person.GPSInactive,
        GPSNA: person.GPSNA,
        VehicleNA: person.WrongVehicle, // For child columns under "Trip Creation Exception"
        RouteNA: person.WrongRoute,
        FleetNA: person.WrongFleet,
        OTD: person.OTD, // For child columns under "OTD/OTA Status"
        DelayedDeparture: person.DelayedDeparture,
        ATDNA: person.ATAN,
        DINA: person.DINA,
        RuningonTime: person.RunningOnTime,
        RuningLate: person.RunningLate,
        RuningDNA: person.RunningDna,
        OTA: person.OTA,
        ATADelayed: person.ATADelayed,
        ATANA: person.ATANA,
        AINA: person.AINA,
      }));
      this.gridOptions = {
        rowHeight: 50,
        headerHeight: 80,
        rowData: this.rowData,
        resizable: true,
        defaultColDef: {
          sortable: true,
          filter: true,
          resizable: true,
          tooltipComponentParams: {
            color: "#ececec", // Optional parameter for custom styling
          },
        },
        columnDefs: this.columnDefs.map((col, index) => ({
          ...col,
          children: col.children?.map((childCol) => ({
            ...childCol,
            // Apply blue text color for regular rows only
            cellStyle: (params) =>
              params.node.rowPinned ? {} : { color: 'blue' },
          })),
        })),
        pagination: true,
        paginationPageSize: 50,
        paginationPageSizeSelector: [10, 50, 100, 500, 1000],
        pinnedBottomRowData: this.footerData, // Footer data
        getRowStyle: (params) => {
          if (params.node.rowPinned) {
            return { color: 'black', fontWeight: 'bold' }; // Style for footer rows
          }
          return null; // No custom styling for regular rows
        },
        onGridReady: (params) => {
          this.onGridReady(params);
          this.adjustGridHeight();
          this.gridOptions.api = params.api;
          this.gridOptions.columnApi = params.columnApi;
          const gridContainer = document.querySelector('.ag-root-wrapper');
          if (gridContainer) {
            gridContainer.addEventListener('click', (event: any) => {
              const headerElement = event.target.closest('.ag-header-cell');
              if (headerElement) {
                const columnField = headerElement.innerText.trim();
                const fieldName = columnField.replace(/\s+/g, '');
                this.getColumnDataByField(fieldName);
              }
            });
          }
        },
      };
  const gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, this.gridOptions);
 }
 exportToCSV(): void {
  const rows: string[] = [];
  const parentHeaders: string[] = [];
  const childHeaders: string[] = [];

  // Extract parent and child headers
  this.columnDefs.forEach((colDef: any) => {
    if (colDef.children) {
      // Parent header for grouped columns
      parentHeaders.push(colDef.headerName);
      childHeaders.push(...colDef.children.map((child: any) => child.headerName));
    } else {
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
  this.gridOptions.api.forEachNode((node: any) => {
    rowData.push(node.data);
  });

  // Map row data to match the column fields
  rowData.forEach((row: any) => {
    const rowValues = childHeaders.map((header: string) => {
      const field = this.columnDefs.find((colDef: any) =>
        colDef.children?.some((child: any) => child.headerName === header) || colDef.headerName === header
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
  link.setAttribute('download', 'Summary.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
//  adjustGridHeight() {
//   const rowCount = this.rowData?.length || 0; // Get the number of rows
//   const rowsToShow = Math.min(rowCount, 16); // Show up to 10 rows
//   const totalHeight = (rowsToShow * this.gridOptions.rowHeight) + this.gridOptions.headerHeight;

//   // Set the height of the grid container dynamically
//   const gridElement = document.querySelector('.ag-theme-alpine'); // Adjust selector to match your theme
//   if (gridElement) {
//     (gridElement as HTMLElement).style.height = `${totalHeight}px`;
//   }
// }
adjustGridHeight(): void {
  const rowCount = this.gridOptions.api.getDisplayedRowCount(); // Get visible rows
  const rowHeight = this.gridOptions.rowHeight || 30; // Row height
  const headerHeight = this.gridOptions.headerHeight || 40; // Header height
  const footerHeight = this.footerData ? rowHeight : 0; // Footer height
  const paginationHeight = this.gridOptions.pagination ? 35 : 0; // Pagination height

  // Ensure a minimum height for no rows
  const gridHeight = rowCount > 0 
    ? headerHeight + (rowCount * rowHeight) + footerHeight + paginationHeight
    : headerHeight + footerHeight + paginationHeight + 100; // Fallback height

  const gridContainer:any = document.querySelector('#myGrid');
  if (gridContainer) {
    console.log('gridHeight',gridHeight)
    gridContainer.style.height = `${gridHeight+100}px`;
  }
}
// Function to fetch column data dynamically
getColumnDataByField(columnField: string) {
  $('#v_track_Modal1').modal('show');
  const allData:any = [];
  const Region_array:any=[];
  const rowCount = this.gridOptions.api.getDisplayedRowCount();
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    const rowNode = this.gridOptions.api.getDisplayedRowAtIndex(rowIndex);
    const rowData = rowNode.data;
    if (rowData[columnField] !== undefined) {
      allData.push(rowData[columnField]);
    }
    if (rowData['Region'] !== undefined) {
      Region_array.push(rowData['Region']);
    }
  }
    console.log(`Data for column "${columnField}":`, allData);
    // const array_data:any=[];
    var arr=allData;
    const array_data = allData.map((item, index) => ({
      value: item,
      name: Region_array[index]
    }));
  let chartDom:any = document.getElementById('pieChartContainer1');
  //  var echart = echarts.init(chartDom);
   var echart = echarts.init(chartDom, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  var option;

  option = {
      title: {
          // text: 'Donut Chart',
          // subtext: 'Living Expenses in Shenzhen'
      },
      tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          left:370 ,
          top:120,
          // bottom:'1',
          // fontsize:10,
          fontSize: '10',
          data:  Region_array
      },
      series: [
          {
              name: '',
              type: 'pie',
              radius: ['0%', '70%'],
              avoidLabelOverlap: false,
              color:this.colors,
              label: {
                  show: true,
                  // position: 'center'
                  position: 'inside',
                  fontSize: '15',
                      // rotate:'145',
                      color:'white',
                  formatter: '{c}' // display value
              },
              emphasis: {
                  label: {
                      show: true,
                      fontSize: '15',
                      color:'white',
                      // rotate:'145',
                      fontWeight: 'bold'
                  }
              },
              labelLine: {
                  show: false
              },
              data:array_data,
               
              backgroundStyle: {
                color: '#f0f0f0' // Change this color as needed
            }
          },
          {
            type: 'pie',
            radius: ['0%', '40%'],
            silent: true,
            color:'white',
           
            label: {
                show: true,
                position: 'center',
                color:'#1D4380',
               
                // formatter: function(params) {
                //     var total = 0;
                //     for (var i = 0; i < option.series[0].data.length; i++) {
                //         total += option.series[0].data[i].value;
                //     }
                //     return  total;
                // },
                fontSize: 25,
                fontWeight: 'bold'
            },
            // data: [
            //     {value: 1, name: 'Total'}
            // ]
        }
  
      ],
      backgroundColor: '#fff'
  };

  option && echart.setOption(option);
  }
//  onGridReady(params) {
//   // alert(5)
//   this.gridOptions.api = params.api;
//   this.gridOptions.columnApi = params.columnApi;

//   // Add event listener to the header of the 'Total' column
//   const headerElement = document.querySelector('.clickable-header');

//   if (headerElement) {
//     headerElement.addEventListener('click', () => {
      
//       const allData: any = [];
//       const rowCount = this.gridOptions.api.getDisplayedRowCount();
//       for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
//         const rowNode = this.gridOptions.api.getDisplayedRowAtIndex(rowIndex);
//         const rowData = rowNode.data;
//         allData.push(rowData['Total']);
//       }
//       console.log(allData);
//     });
//   }
// }
onGridReady(params: any) {
 
  this.gridApi = params.api;
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
dtdcTripReportFilter(){
  var formdata=new FormData()
  formdata.append('AccessToken',this.token);
  this.dtdcService.dtdcSummaryFilter(formdata).subscribe((data:any) => {
    console.log(data)
    if(data.Status=="success"){
      this.Master_filter=data.Filter.Master;
      this.Region=this.Master_filter?.Region
      this.Customer=this.Master_filter?.Customer;
      this.Destination=this.Master_filter?.Customer;
      this.selectedRouteType=this.Master_filter.DefualtFilter;
      const inputString = this.selectedRouteType;
      this.selectedRouteType1 = inputString.split(',').map(item => ({route_type: item.trim()}));

// this.routeTypes_filter = Object.keys(this.Route_type).map(key => ({ route_type: key }));
// console.log(this.selectedRouteType1);
      const Destination = this.Master_filter?.Customer || {};
      this.Destination = Object.entries(Destination).map(([key, value]) => ({ key, value }));
      
      this.filteredDestination = this.Destination.slice(0, 50); // Initial subset
     
      const Destination1 = this.Master_filter?.Customer || {};
      this.Customer = Object.entries(Destination1).map(([key, value]) => ({ key, value }));
      
      this.filteredDestination1 = this.Customer.slice(0, 50); // Initial subset
    
     this.First_call();

    }else{
      alert(data?.Message);
      this.router.navigate([`/auth/login`]);
    }
  })
}
validateRegion(){
  if(this.region.length===3){
    alert('You can only select a maximum of 3 regions or select "All".');
    return
  }
}
validateRegion_route(){
  if(this.region_route.length===3){
    alert('You can only select a maximum of 3 regions or select "All".');
    return
  }
}
onRegionChange(selectedRegions){
  
  
  if (selectedRegions.includes('')) {
    // If "All" is selected, clear other selections
    this.region = [''];
  } else {
    // If "All" is deselected, update the selection normally
    this.region = selectedRegions.filter((value) => value !== '');
  }
}
onRegionChange_route(selectedRegions){
  
  
  if (selectedRegions.includes('')) {
    // If "All" is selected, clear other selections
    this.region_route = [''];
  } else {
    // If "All" is deselected, update the selection normally
    this.region_route = selectedRegions.filter((value) => value !== '');
  }
}
triggerHstSubmit(eve){
  // console.log(eve)
  this.submit=true;
  if(eve.form.status=='VALID'){
    this.SpinnerService.show()
  var formdata=new FormData()
  formdata.append('AccessToken',this.token)
  var starteDate:any=this.datepipe.transform($("#datepicker").val(), 'yyyy-MM-dd');
  var endDate:any=this.datepipe.transform($("#datepicker1").val(), 'yyyy-MM-dd');
   formdata.append('DateFrom',starteDate)
   formdata.append('DateTo', endDate);
  if(eve.value.TripId){formdata.append('TripId',eve.value.TripId)
  }else{
    if(eve.value.Route){
      const result = eve.value.Route.map(item => item.route_type).join(", ");
      formdata.append('RouteType',result)}
   if(eve.value.RouteCategory){ formdata.append('RouteCategory',eve.value.RouteCategory)}
   if(eve.value.Origin){ formdata.append('Origin',eve.value.Origin)}
   if(eve.value.Destination){ formdata.append('Destination',eve.value.Destination)}
  //  if(eve.value.Route) {
  //   const result = eve.value.Route.map(item => item.route_type).join(", ");
    
  //   formdata.append('Route',result)}
   if(eve.value.Region){
    let text = eve.value.Region;
    const result = text.map(loc => loc.split("(")[0]).join(",");
    
     formdata.append('Region',result);}
   if(eve.value.TripStatus){ formdata.append('TripStatus',eve.value.TripStatus)}
   if(eve.value.vehicle_number){ formdata.append('VehicleNo',eve.value.vehicle_number)}
  }
  // formdata.forEach((value, key) => {
  //   console.log("formdata",key, value);
  // });
  this.dtdcService.dtdcSummary(formdata).subscribe((data:any) => {
    // console.log("Summary",data)
    this.submit=false;
    if(data.Status=="success"){
      this.new_array=[]
      this.new_array=data.Report;
      // console.log(this.new_array)
      if(this.new_array.Summary){
      // this.Grid_table();
      var table = $('#simple_datatable').DataTable();
  table.clear();
  table.destroy();
      this.masterUploadTable();
    }else{
      if (this.gridApi) {
        // this.gridApi.destroy();
      }
        alert("Data not found ")
      }
      this.SpinnerService.hide();
    }else{
      alert(data?.Message)
    }
    // console.log(data)
  })

}
}
RouteCategory(eve:any){
  console.log(eve)
  // console.log(this.Master_filter?.RouteType[eve[0]])
  this.Route_type=this.Master_filter?.RouteType[eve];
  // console.log(eve)
}
changeRoutetype(eve){
  this.routeTypes_filter=[];
  // console.log(this.filterdata,eve);
  this.eve=eve;
  this.selectedRouteType1 = []; // Reset to empty array to clear selection
  this.Route_type=this.Master_filter?.RouteType[eve];
  // console.log(routeTypes_filter)
  this.routeTypes_filter = Object.keys(this.Route_type).map(key => ({ route_type: key }));
  // console.log(this.routeTypes_filter)

}
First_call(){
  this.submit=true;
// console.log("ccccccccccccc",this.selectedRouteType)
    this.SpinnerService.show()
  var formdata=new FormData()
  // console.log($("#datepicker").val())
  formdata.append('AccessToken',this.token)
  // formdata.append('DateFrom', $("#datepicker").val())
  // formdata.append('DateTo', $("#datepicker1").val())
  var starteDate:any=this.datepipe.transform(this.datetimepicker1, 'yyyy-MM-dd');
  var endDate:any=this.datepipe.transform(this.datetimepicker, 'yyyy-MM-dd');
   formdata.append('DateFrom',starteDate)
   formdata.append('DateTo', endDate)
  // formdata.append('ReportType',eve.value.ReportType);
 formdata.append('RouteType',this.selectedRouteType)
  // formdata.forEach((value, key) => {
  //   console.log("formdata",key, value);
  // });
  this.dtdcService.dtdcSummary(formdata).subscribe((data:any) => {
  
    this.submit=false;
    console.log(data)
    if(data.Status=="success"){
      this.new_array=data.Report;
      this.masterUploadTable();
      // console.log(this.new_array)
      if(this.new_array.Summary){
      // this.Grid_table();

    }else{
        if (this.gridApi) {
          this.gridApi.destroy();
        }
        alert("Data not found ")
      }
      this.SpinnerService.hide();
    }else{
      alert(data?.Message);
      this.SpinnerService.hide();
      this.router.navigate([`/auth/login`]);
    }
    // console.log(data)
  })

// }
}
// triggerHstSubmit1(eve){
//   this.submit=true;

//   console.log(eve)
//   // if(eve.form.status=='VALID'){
//     this.SpinnerService.show()
//   var formdata=new FormData()
//   console.log($("#datepicker").val())
//   formdata.append('AccessToken',this.token)
//   formdata.append('DateFrom', $("#datepicker").val())
//   formdata.append('DateTo', $("#datepicker1").val())

//   this.CrudService.dtdcSummary(formdata).subscribe((data:any) => {
//     this.submit=false;
//     console.log(data)
//     if(data.Status=="success"){
//       this.new_array=data.Report;
//       console.log(this.new_array)
//       this.Grid_table();
//       this.SpinnerService.hide();
//     }else{
//       alert("Data not found ")
//     }
//     // console.log(data)
//   })

// // }
// }
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
async vehicleTrackF_new_here(imei, imei2, imei3, run_date, vehicle_no, item, Id, route_id) {
  console.log(imei, imei2, imei3, run_date, vehicle_no, item, Id, route_id);
  
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
      // if(item.CloseBy!=='-'){
      //   currentDateTime=item.CloseBy;
      // }
        console.log(run_date,currentDateTime,imei,this.group_id,this.account_id)
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
        console.log("tracking res", res);

        if (res.Status === "failed") {
          alert(res?.Message);
          this.router.navigate([`/auth/login`]);
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
        // alert("An error occurred while fetching tracking data");
      }
      
      // Hide the tracking spinner after the API call
      this.SpinnerService.hide("tracking");
    }
  }
}
getMarkerIcon_here(index: number): string {
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
addMarkersAndPolyline1_here(imei: string, vehicle_no: string) {
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
  formdataCustomer.append('portal', 'itraceit');
  this.CrudService.addressS(formdataCustomer).subscribe((res: any) => {
    const address = res.Data.Address;
    this.showWindow(trackingData, vehicle_no, address);
    // this.closeLastOpenedInfoWindow();
    // const infowindowMarker = new google.maps.InfoWindow({ content: this.contentsInfo });
    // infowindowMarker.setPosition(event.latLng);
    // infowindowMarker.open(this.map1);
  });
}
async handleMarkerClick_here(event, trackingData, vehicle_no, imei) {
  const markerPosition = event.target.getGeometry();
  const formdataCustomer = new FormData();
  formdataCustomer.append('AccessToken', this.token);
  formdataCustomer.append('VehicleId', vehicle_no);
  formdataCustomer.append('ImeiNo', imei);
  formdataCustomer.append('LatLong', `${markerPosition.lat},${markerPosition.lng}`);
  formdataCustomer.append('portal', 'itraceit');
  const res:any = await this.CrudService.addressS(formdataCustomer).toPromise(); // Assuming it returns an observable
 console.log("res",res)
  const address = res.Data.Address;
  
  return this.showWindow(trackingData, vehicle_no, address); // Return the content
}
showWindow_here(data, vnumber, add) {
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
exportToPDF_popup(): void {
  const parentHeaders: any[] = [];
  const childHeaders: any[] = [];
  
  this.columnDefs_popup.forEach((colDef) => {
    if (colDef.children) {
      // Add the parent header with colspan
      parentHeaders.push({
        text: colDef.headerName,
        colSpan: colDef.children.length,
        alignment: 'center',
        bold: true,
        fillColor: '#0074D9',
        color: 'white',
      });
      // Fill empty cells for the colspan
      for (let i = 1; i < colDef.children.length; i++) {
        parentHeaders.push('');
      }
      // Add child headers
      colDef.children.forEach((child) => {
        childHeaders.push({
          text: child.headerName,
          alignment: 'center',
          fillColor: '#DDDDDD',
          style: 'tableHeader',  // Apply tableHeader style for child headers
        });
      });
    } else {
      // For standalone columns without children
      parentHeaders.push({
        text: colDef.headerName,
        alignment: 'center',
        bold: true,
        fillColor: '#0074D9',
        color: 'white',
      });
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
          rowData.push(row[child.field] || '-'); // Add row data for child fields
        });
      } else {
        rowData.push(row[colDef.field] || '-'); // Add row data for top-level fields
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
          fillColor: (rowIndex) => {
            if (rowIndex === 0) return '#0074D9'; // Parent header color
            if (rowIndex === 1) return '#DDDDDD'; // Child header color
            return null; // No fill color for data rows
          },
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
        fillColor: '#DDDDDD',
      },
    },
    defaultStyle: {
      fontSize: 10,
    },
  };

  // Step 4: Generate and download the PDF
  pdfMake.createPdf(docDefinition).download('dynamic.pdf');
}

exportToCSV_popup(): void {
  const rows: string[] = [];
  const parentHeaders: string[] = [];
  const childHeaders: string[] = [];

  // Extract parent and child headers
  this.columnDefs_popup.forEach((colDef: any) => {
    if (colDef.children) {
      // Parent header for grouped columns
      parentHeaders.push(colDef.headerName);
      childHeaders.push(...colDef.children.map((child: any) => child.headerName));
    } else {
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

  // Map row data to match the column fields
  rowData.forEach((row: any) => {
    const rowValues = childHeaders.map((header: string) => {
      const field = this.columnDefs_popup.find((colDef: any) =>
        colDef.children?.some((child: any) => child.headerName === header) || colDef.headerName === header
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
  link.setAttribute('download', 'Summary.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
exportToPDF_popup1(): void {
  // Step 1: Extract parent and child headers dynamically
  const parentHeaders: any[] = [];
  const childHeaders: any[] = [];
  
  this.columnDefs_popup.forEach((colDef) => {
    if (colDef.children) {
      // Add the parent header with colspan
      parentHeaders.push({
        text: colDef.headerName,
        colSpan: colDef.children.length,
        alignment: 'center',
        bold: true,
        fillColor: '#0074D9',
        color: 'white',
      });
      // Fill empty cells for the colspan
      for (let i = 1; i < colDef.children.length; i++) {
        parentHeaders.push('');
      }
      // Add child headers
      colDef.children.forEach((child) => {
        childHeaders.push({
          text: child.headerName,
          alignment: 'center',
          fillColor: '#DDDDDD',
        });
      });
    } else {
      // For standalone columns without children
      parentHeaders.push({
        text: colDef.headerName,
        alignment: 'center',
        bold: true,
        fillColor: '#0074D9',
        color: 'white',
      });
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
          rowData.push(row[child.field] || '-'); // Add row data for child fields
        });
      } else {
        rowData.push(row[colDef.field] || '-'); // Add row data for top-level fields
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
          fillColor: (rowIndex) => {
            if (rowIndex === 0) return '#0074D9'; // Parent header color
            if (rowIndex === 1) return '#DDDDDD'; // Child header color
            return null; // No fill color for data rows
          },
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
exportToCSV_popup1(): void {
  const rows: string[] = [];
  const parentHeaders: string[] = [];
  const childHeaders: string[] = [];

  // Extract parent and child headers
  this.columnDefs_popup.forEach((colDef: any) => {
    if (colDef.children) {
      // Parent header for grouped columns
      parentHeaders.push(colDef.headerName);
      childHeaders.push(...colDef.children.map((child: any) => child.headerName));
    } else {
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

  // Map row data to match the column fields
  rowData.forEach((row: any) => {
    const rowValues = childHeaders.map((header: string) => {
      const field = this.columnDefs_popup.find((colDef: any) =>
        colDef.children?.some((child: any) => child.headerName === header) || colDef.headerName === header
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
  link.setAttribute('download', 'Summary.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
onBtExport1() {
  // this.gridApi!.exportDataAsExcel();
  this. gridApi!.exportDataAsCsv();
  }
  onBtExport_pop1() {
    // this.gridApi!.exportDataAsExcel();
    this. gridApi_popup!.exportDataAsCsv();
    }
// ---------------------------------------------------------------------------------------------------------------
showcommon_chart(columnIndex,text) {
  this.header_text=text;
  var table = $('#simple_datatable').DataTable();
  var columnData = table.column(columnIndex).data().toArray().map(function (data) {
      // If the data is a string (e.g., "Region 1"), just return it as-is
      if (typeof data === "string") {
          var tempDiv:any = document.createElement("div");
          tempDiv.innerHTML = data;  // Ensure any HTML tags are stripped
          return tempDiv.textContent.trim();  // Extract the plain text
      }
      return data;  // Return data as-is if it's already in the correct format
  });
  // console.log("columnData",columnData);
  var columnData_Region = table.column(0).data().toArray().map(function (data) {
    // If the data is a string (e.g., "Region 1"), just return it as-is
    if (typeof data === "string") {
        var tempDiv:any = document.createElement("div");
        tempDiv.innerHTML = data;  // Ensure any HTML tags are stripped
        return tempDiv.textContent.trim();  // Extract the plain text
    }
    return data;  // Return data as-is if it's already in the correct format
});
  $('#v_track_Modal1').modal('show');
  const array_data = columnData.map((item, index) => ({
    value: item,
    name: columnData_Region[index]
  }));
let chartDom:any = document.getElementById('pieChartContainer1');
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
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical', // Sets the orientation to horizontal
      left: 'center',   
      width: '100%',        // Ensure enough space for all items in one line
      // data: ['Series1', 'Series2', 'Series3'], // Legend items
      itemGap: 5,        
        data:  columnData_Region
    },
    series: [
        {
            name: '',
            type: 'pie',
            radius: ['0%', '70%'],
            avoidLabelOverlap: false,
            color:this.colors,
            label: {
                show: true,
                // position: 'center'
                position: 'inside',
                fontSize: '15',
                    // rotate:'145',
                    color:'white',
                formatter: '{c}' // display value
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '15',
                    color:'white',
                    // rotate:'145',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data:array_data,
             
            backgroundStyle: {
              color: '#f0f0f0' // Change this color as needed
          }
        },
        {
          type: 'pie',
          radius: ['0%', '40%'],
          silent: true,
          color:'white',
         
          label: {
              show: true,
              position: 'center',
              color:'#1D4380',
             
              // formatter: function(params) {
              //     var total = 0;
              //     for (var i = 0; i < option.series[0].data.length; i++) {
              //         total += option.series[0].data[i].value;
              //     }
              //     return  total;
              // },
              fontSize: 25,
              fontWeight: 'bold'
          },
          // data: [
          //     {value: 1, name: 'Total'}
          // ]
      }

    ],
    backgroundColor: '#fff'
};
option && echart.setOption(option);

}
async vehicleTrackF_new_1(imei, imei2, imei3, run_date, vehicle_no, item, Id, route_id) {

 
if (this.demomarker.length > 0) {
  this.demomarker.forEach(marker => marker.setMap(null));
  this.demomarker = [];  // Clear the array after removing markers
}

if (this.demoPolyline.length > 0) {
  this.demoPolyline.forEach(polyline => polyline.setMap(null));
  this.demoPolyline = [];  // Clear the array after removing polylines
}
  // console.log(imei, imei2, imei3);
  if (imei === '' && imei2 === '' && imei3 === '') {
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
  const imeis = [imei, imei2, imei3];
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
      const currentDateTime: any = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
      // this.router.navigate(['/cv/specific/dtdc/map'], {
      //   // state:{ structuredata:{1:form_date1,2:form_date2,3:vehicle_no}, array: 'worldgyan'}
      //   state: {
      //     structuredata: {
      //       token:this.token,
      //       run_date:run_date,
      //       currentDateTime:currentDateTime,
      //       imei:imei,
      //       group_id:this.group_id,
      //       account_id:this.account_id,vehicle_no:vehicle_no, item:item, Id:Id, route_id:route_id

      //     },
      //     array: 'worldgyan'
      //   }
      // })



      // formData.append('AccessToken', this.token);
      // formData.append('startdate', run_date);
      // formData.append('enddate', currentDateTime);
      // formData.append('time_interval', '120');
      // formData.append('imei', imei);
      // formData.append('group_id', this.group_id);
      // formData.append('AccountId', this.account_id);

      // // Log form data for debugging
      // formData.forEach((value, key) => {
      //   console.log("formdata...", key, value);
      // });

      // // try {
      //   // Wait for the API response
      //   const res: any = await this.CrudService.vehicleTrackongS(formData).toPromise();
      //   console.log("tracking res", res);
      //   this.SpinnerService.hide("tracking");
      //   if (res.Status === "failed") {
      //     alert(res?.Message);
      //   }
      //   this.trackingData = res.data;
      //   if (res.data === 'Vehicle is inactive.') {
      //     alert("Track data is not available");
      //   } else {
      //     console.log("trackingData", this.trackingData);
      //     // Add markers and polyline data
      //     this.addMarkersAndPolyline1(imei, vehicle_no);
         
      //     this.fetchCustomerInfo(Id);
      //   }
      // // Hide the tracking spinner after the API call
      // this.SpinnerService.hide("tracking");
    }
  }
} 
 }
 async vehicleTrackF_new(imei, imei2, imei3, run_date, vehicle_no, item, Id, route_id) {
  // $('#Datail').modal('hide');
  const currentDateTime: any = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
  this.router.navigate(['/cv/specific/dtdc/map'], {
    // state:{ structuredata:{1:form_date1,2:form_date2,3:vehicle_no}, array: 'worldgyan'}
    state: {
      structuredata: {
        token:this.token,
        run_date:run_date,
        currentDateTime:currentDateTime,
        imei:imei,
        group_id:this.group_id,
        account_id:this.account_id,vehicle_no:vehicle_no, item:item, Id:Id, route_id:route_id

      },
      array: 'worldgyan'
    }
  })
  const stateData = {
    structuredata: {
      token: this.token,
      run_date: run_date,
      currentDateTime: currentDateTime,
      imei: imei,
      group_id: this.group_id,
      account_id: this.account_id,
      vehicle_no: vehicle_no,
      item: item,
      Id: Id,
      route_id: route_id,
    },
    array: 'worldgyan',
  };
  
  // Serialize the state data
  const stateString = encodeURIComponent(JSON.stringify(stateData));
  
  // Construct the URL
  const url = `/cv/specific/dtdc/map?state=${stateString}`;
  
  // Open in a new tab
  window.open(url, '_blank');
  
 }
fetchCustomerInfo(Id: string) {
  this.customer_info = []
  const markers: google.maps.Marker[] = [];
 
  const formdataCustomer = new FormData();
  formdataCustomer.append('AccessToken', this.token);
  formdataCustomer.append('forGroup', this.group_id);
  formdataCustomer.append('id', Id);

  this.CrudService.tripCustomerS(formdataCustomer).subscribe((res: any) => {
    // console.log(res)
    if(res.status=='success'){
      if(res.customer_info!==null){
    this.customer_info = res.customer_info;
    // Log the customer data for debugging
    // console.log("Customer Info:", this.customer_info);
    //  if(this.customer_info!==null){
    this.customer_info.forEach((customer, index) => {
      // Log SequenceNo to check its value
      // console.log("Customer SequenceNo:", customer.SequenceNo);
      const sequenceNo = customer.SequenceNo ? customer.SequenceNo.toString() : ''; // Ensure this is a string
      // const sequenceNo = customer.SequenceNo  // Ensure this is a string
      let mark = new google.maps.Marker({
        map: this.map1,
        position: new google.maps.LatLng(customer.Lat, customer.Lng),
        title: `${customer.Lat}, ${customer.Lng}`,
        label: {
          text: sequenceNo,  // Ensure this is a string
          color: 'black'
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
      const mark = new google.maps.Marker({
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
      var trackingData:any=this.trackingData[i];
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
    console.log(res)
    const address = res.Data.Address;
    this.showWindow(trackingData, vehicle_no, address);
    this.closeLastOpenedInfoWindow();
    const infowindowMarker = new google.maps.InfoWindow({ content: this.contentsInfo });
    infowindowMarker.setPosition(event.latLng);
    infowindowMarker.open(this.map1);
  });
}
showWindow(data, vnumber, add) {
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
    '<tr style=" border:none !important">' +
    '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Location Type</td>' +
    '<td style="border:none !important;width:1%;color: blue;">:</td>' +
    '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.loc_type + '</td>' +
    '</tr>' +
    '</tbody>' +
    '</table>'






}
}


