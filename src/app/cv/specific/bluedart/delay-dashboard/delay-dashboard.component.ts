import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NavService } from 'src/app/shared/services/nav.service';
declare var $: any;
import { from, of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { BluedartService } from '../services/bluedart.service';
import * as XLSX from 'xlsx';
import { id } from '@swimlane/ngx-datatable';
declare var $: any
declare var H: any;
declare var google:any;
interface HTMLCanvasElement {
  willReadFrequently?: boolean;
}
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
  selector: 'app-delay-dashboard',
  templateUrl: './delay-dashboard.component.html',
  styleUrls: ['./delay-dashboard.component.scss']
})
export class DelayDashboardComponent implements OnInit {
  contentsInfo: any;
  token: any;
  account_id: any;
  group_id: any;
  trackingData: any = [];
  customer_info: any = [];
  poly_line: any = [];
  marker: any = [];
  map_flag: any;
  map1: any;
  markers: any = [];
  demomarker: any = [];
  polylines: any = [];
  Delay_data: any;
  alertData: any;
  // selectedRouteType: any;
  selectedRouteType: any[] = [];
  routeTypes: any[] = []; // Options for ng-select
  commaSeparatedRoutes: any;
  lastOpenedInfoWindow: any;
  // -------------------------------------------------------------------
  columnDefs:any=[]  
  rowData:any=[] 
  gridOptions:any=[] 
  gridApi:any;
  new_array: any=[
    // {agency_name_hn:'456',region_name:'78945',district_name:'789547'},{agency_name_hn:'456',region_name:'78945',district_name:'789547'},{agency_name_hn:'456',region_name:'78945',district_name:'789547'}
  ];
  demoPolyline: any=[];
  stored_imei: any=[];
  stored_data: any=[];
  constructor(private bluedartService:BluedartService, private navServices: NavService, private itraceIt: CrudService, private SpinnerService: NgxSpinnerService, private datepipe: DatePipe) { }


  ngOnInit(): void {

    let App = document.querySelector('.app');
    App?.classList.add('sidenav-toggled');
    this.token = localStorage.getItem('AccessToken')!
    this.account_id = localStorage.getItem('AccountId')!
    // console.log("account_id", this.account_id)
    this.group_id = localStorage.getItem('GroupId')!
    this.bdDelayDashboardFilter();
    this.delayDashboardDisclaimer();
    this.initMap2()
  }
  delayDashboardDisclaimer(){
    const formdataCustomer = new FormData();
    // console.log( this.token)
    formdataCustomer.append('AccessToken', this.token);

    this.bluedartService.delayDashboardDisclaimer(formdataCustomer).subscribe((res: any) => {
      
      console.log("desclaimer",res)
      if(res.status=="success"){
      const marqueeContent:any = document.getElementById('marquee-content');
      const row = document.createElement('tr');
      Object.entries(res.data).forEach(([key, value]) => {
         
          const cell = document.createElement('td');
          cell.innerHTML = `${key} <span id="lbl_${key.replace(/ /g, '_')}" class="badge" style="background: white; color: red; font-weight: bold; font-size: 9px;margin-right: 9px;margin-left: 2px;">${value}</span>`;
          row.appendChild(cell);
          marqueeContent.appendChild(row);
      });
     
    }else{
      alert(res.Message);
      this.SpinnerService.hide()
    }
      // this.DelayTable();
    })
 
}
initMap2() 
{


 //  const center = { lat: this.customer_info[0].Lat, lng: this.customer_info[0].Lng };
  const center = { lat: 23.2599, lng: 77.4126 };

 //  this.customer_info[full_length].Lat, this.customer_info[full_length].Lng)
 // var center: any = new google.maps.LatLng( this.customer_info[0].Lat,  this.customer_info[0].Lng)
// 

  this.map1 = new google.maps.Map(document.getElementById('map2') as HTMLElement, {
    zoom: 4,
     center: center,

    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scaleControl: true,

  }
  );
}

  Grid_table(){

    if (this.gridApi) {
      this.gridApi.destroy();
    }
  // Define column definitions
  this.columnDefs = [
    { headerName: "Sl No.", field: "slNo", sortable: true,width: 100, },
    { headerName: "Vehicle No", field: "vehicleNo", sortable: true ,width: 120,
      cellRenderer: params => {
        // Create the container div
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.justifyContent = "center";
      
        // Create the span for the serial number
        const serialSpan = document.createElement("span");
        // serialSpan.textContent = params.value;
      
        // Create the button
        
        const button = document.createElement("button");
        button.innerHTML = "";
        button.style.border = "none";
        button.style.background = "none";
        button.style.marginLeft = "5px";
        button.style.cursor = "pointer";
        // Clear previous content
  
          // button.innerHTML += `<strong style="color: #1D4380; font-size:12px">${params.data.Full?.vehicle_no}</i></strong>`;
         
          if (params.data.Full.vehicle_status_current == 'running') {
            button.innerHTML += '<span style="color: #6ABD46; margin-right: 0px;">'+params.data.Full?.vehicle_no +' </span> ';
          }
          else  if (params.data.Full.vehicle_status_current == 'InActive') {
            button.innerHTML += '<span style="color: gray; margin-right: 0px;">'+params.data.Full?.vehicle_no +' </span> ';
          }else  if (params.data.Full.vehicle_status_current == 'Stopped') {
            button.innerHTML += '<span style="color: red; margin-right: 0px;">'+params.data.Full?.vehicle_no +' </span> ';
          }
          button.addEventListener("click", () => {
            this.stored_imei=[ params?.data.Full.imei_no,
              params?.data.Full.imei_no2,
              params?.data.Full.imei_no3,];
            // this.stored_imei=[];
            // console.log("Row Data:", params.data.Full);
            // this.Detail(params.data.Full)
            this.vehicleTrackF_new( params.data.Full?.imei_current,'','',params.data.Full?.run_date, params.data.Full?.vehicle_no, params.data.Full?.item, params.data.Full?.shipment_no, params.data.Full?._id)
            // this.vehicleTrackF_new('', '',params.data.Full?.TrackHistory1.Imei, params.data.Full?.TrackHistory1.RnDt, params.data.Full?.TrackHistory1.Vno, params.data.Full?.TrackHistory1, params.data.Full?.TrackHistory1.ShpNo, params.data.Full?.TrackHistory1.Id)
          });
       
        // Append span and button to the container
        // container.appendChild(serialSpan);
        container.appendChild(button);
      
        return container;
      },
    },
    { headerName: "Origin", field: "origin", sortable: true,width: 100, },
    
    { headerName: "Destination", field: "destination", sortable: true ,width: 130,},
    
    { headerName: "Feeder Type", field: "shipment_method", sortable: true ,width: 150,},
    { headerName: "STA", field: "sta", sortable: true },
    { headerName: "Delaying STA", field: "delayingSta", sortable: true },
    { headerName: "Delay Hours", field: "delayHours", sortable: true,width: 130, },
    { headerName: "Current Location", field: "currentLocation", sortable: true },
    { headerName: "Vehicle Status", field: "vehicleStatus", sortable: true ,width: 130,},
    { headerName: "Route", field: "route", sortable: true },
    { headerName: "Run Date", field: "runDate", sortable: true },
    { headerName: "Driver Name", field: "driverName", sortable: true },
    { headerName: "Driver Number", field: "driverNumber", sortable: true,width: 150, },
    { headerName: "Transporter", field: "transporter", sortable: true },
    { headerName: "Trip Id", field: "tripId", sortable: true ,width: 100,},
     { headerName: "Device-1", field: "device1", sortable: false ,
      cellRenderer: params => {
        // Create the container div
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.justifyContent = "center";
      
        // Check the condition for imei_no
        // console.log("params.data.imei_no",params.data.Full)
        if (params.data.Full.imei_no !== 'NA' && params.data.Full.imei_no !== '') {
          // Create anchor tag for valid imei_no
          const anchor = document.createElement("a");
          anchor.style.cursor = "pointer";
          if (params.data.Full.vehicle_status_current == 'running') {
            // button.innerHTML += '<span style="color: #6ABD46; margin-right: 0px;">'+params.data.Full?.vehicle_no +' </span> ';
            anchor.innerHTML = `<i class="fa fa-map-marker map-table-marker" aria-hidden="true" style="color:#6ABD46; font-size:20px"></i>`;

          }
          else  if (params.data.Full.vehicle_status_current == 'InActive') {
            // button.innerHTML += '<span style="color: gray; margin-right: 0px;">'+params.data.Full?.vehicle_no +' </span> ';
            anchor.innerHTML = `<i class="fa fa-map-marker map-table-marker" aria-hidden="true" style="color:gray; font-size:20px"></i>`;

          }else  if (params.data.Full.vehicle_status_current == 'Stopped') {
            // button.innerHTML += '<span style="color: red; margin-right: 0px;">'+params.data.Full?.vehicle_no +' </span> ';
            anchor.innerHTML = `<i class="fa fa-map-marker map-table-marker" aria-hidden="true" style="color:red; font-size:20px"></i>`;

          }
          // anchor.innerHTML = `<i class="fa fa-map-marker map-table-marker" aria-hidden="true" style="color:red;">-1</i>`;
          
          // Add click event listener to the anchor tag
          anchor.addEventListener("click", () => {
            this.stored_imei=[];
            this.vehicleTrackF_new(
              params.data.Full.imei_no,
              '',
              '', 
              params?.data?.Full?.run_date,
              params?.data?.Full?.vehicle_no,
              params?.data?.Full,
              params?.data?.Full?.shipment_no,
              params?.data?.Full?._id
            );
          });
      
          // Append anchor to the container
          container.appendChild(anchor);
        } else {
          // Display 'NA' for invalid imei_no
          const naSpan = document.createElement("span");
          naSpan.textContent = "NA";
          container.appendChild(naSpan);
        }
      
        return container;
      }
      
      ,width: 100, },
      {
        headerName: "Device-2",
        field: "device2",
        sortable: false,
        cellRenderer: params => {
          // Create the container div
          const container = document.createElement("div");
          container.style.display = "flex";
          container.style.alignItems = "center";
          container.style.justifyContent = "center";
      
          // Check the condition for imei_no
          if (params.data.Full.imei_no2 !== 'NA' && params.data.Full.imei_no2 !== '') {
            // Create anchor tag for valid imei_no
            const anchor = document.createElement("a");
            anchor.style.cursor = "pointer";
            anchor.style.marginRight = "5px"; // Space between marker and lock
      
            // Set marker icon color based on vehicle_status_current
            let markerColor = "gray";
            if (params.data.Full.vehicle_status_current == "running") {
              markerColor = "#6ABD46";
            } else if (params.data.Full.vehicle_status_current == "Stopped") {
              markerColor = "red";
            }
            
            anchor.innerHTML = `<i class="fa fa-map-marker map-table-marker" aria-hidden="true" style="color:${markerColor};font-size:20px"></i>`;
      
            // Add click event listener to the anchor tag
            anchor.addEventListener("click", () => {
              this.stored_imei = [];
              this.vehicleTrackF_new(
                params?.data.Full.imei_no2,
                '',
                '',
                params?.data.Full.run_date,
                params?.data.Full.vehicle_no,
                params?.data.Full,
                params?.data.Full.shipment_no,
                params?.data.Full._id
              );
            });
            let lockColor = "gray";
            let lockIcon_fa:any=" fa fa-lock";
            
            if (params.data.Full.fixed_lock == "0") {
              lockIcon_fa ="fa-solid fa-lock-open";
              lockColor = "#6ABD46";
            } else if (params.data.Full.fixed_lock == "1") {
              lockIcon_fa=" fa fa-lock";
              lockColor = "red";
            }
            
            // Create lock icon
            const lockIcon = document.createElement("i");
            lockIcon.className = lockIcon_fa;
            lockIcon.style.fontSize = "20px";
            lockIcon.style.color = markerColor;
            lockIcon.style.cursor = "pointer";
            lockIcon.style.padding = "4px";
            lockIcon.title = `${params.data.Full.imei_no2} / Door Close / ${params.data.Full.imei_no2_type}`;
      // portable lock -3----------------------------------------------------------------

      // let portablelockColor = "gray";
      // if (params.data.Full.fixed_lock == "0") {
      //   portablelockColor = "#6ABD46";
      // } else if (params.data.Full.fixed_lock == "1") {
      //   portablelockColor = "red";
      // }else if (params.data.Full.fixed_lock == "2") {
      //   portablelockColor = "gray";
      // }
      
      // // Create lock icon
      // const portablelockIcon = document.createElement("i");
      // portablelockIcon.className = "fa fa-lock";
      // portablelockIcon.style.fontSize = "20px";
      // portablelockIcon.style.color = portablelockColor;
      // portablelockIcon.style.cursor = "pointer";
      // portablelockIcon.style.padding = "4px";
      // portablelockIcon.title = `${params.data.Full.imei_no2} / Door Close / ${params.data.Full.imei_type2}`;

            // Append elements to the container
           
            if (params.data.Full.fixed_lock !== "3" &&params.data.Full.fixed_lock !== "") {
              
              lockIcon.addEventListener("click", () => {
                this.stored_imei = [];
                this.vehicleTrackF_new(
                  params?.data.Full.imei_no2,
                  '',
                  '',
                  params?.data.Full.run_date,
                  params?.data.Full.vehicle_no,
                  params?.data.Full,
                  params?.data.Full.shipment_no,
                  params?.data.Full._id
                );
              });
              
              container.appendChild(lockIcon);}else{
                container.appendChild(anchor);
              }
            // if (params.data.Full.fixed_lock !== "3"&&params.data.Full.fixed_lock !== "") {container.appendChild(portablelockIcon)}
          }
      
          return container;
        }
      
      ,width: 100,},
    { headerName: "Device-3", field: "device3", sortable: false,
      cellRenderer: params => {
        // Create the container div
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.justifyContent = "center";
      
        // Check the condition for imei_no
        if (params.data.Full.imei_no3 !== 'NA' && params.data.Full.imei_no3 !== '') {
          // Create anchor tag for valid imei_no
          const anchor = document.createElement("a");
          anchor.style.cursor = "pointer";
          if (params.data.Full.vehicle_status_current == 'running') {
            // button.innerHTML += '<span style="color: #6ABD46; margin-right: 0px;">'+params.data.Full?.vehicle_no +' </span> ';
            anchor.innerHTML = `<i class="fa fa-map-marker map-table-marker" aria-hidden="true" style="color:#6ABD46;font-size:20px"></i>`;

          }
          else  if (params.data.Full.vehicle_status_current == 'InActive') {
            // button.innerHTML += '<span style="color: gray; margin-right: 0px;">'+params.data.Full?.vehicle_no +' </span> ';
            anchor.innerHTML = `<i class="fa fa-map-marker map-table-marker" aria-hidden="true" style="color:gray;font-size:20px"></i>`;

          }else  if (params.data.Full.vehicle_status_current == 'Stopped') {
            // button.innerHTML += '<span style="color: red; margin-right: 0px;">'+params.data.Full?.vehicle_no +' </span> ';
            anchor.innerHTML = `<i class="fa fa-map-marker map-table-marker" aria-hidden="true" style="color:red;font-size:20px"></i>`;

          }          
          // Add click event listener to the anchor tag
          anchor.addEventListener("click", () => {
            this.stored_imei=[params?.data.Full.imei_no3,];
            this.vehicleTrackF_new(
              params?.data.Full.imei_no3,
              '',
              '',
              params?.data.Full.run_date,
              params?.data.Full.vehicle_no,
              params?.data.Full,
              params?.data.Full.shipment_no,
              params?.data.Full._id
            );
          });
          let portablelockColor = "gray";
          let lockIcon_fa:any=" fa fa-lock";
          if (params.data.Full.fixed_lock == "0") {
            
          lockIcon_fa ="fa-solid fa-lock-open";
            portablelockColor = "#6ABD46";
          } else if (params.data.Full.fixed_lock == "1") {
            portablelockColor = "red";
            lockIcon_fa=" fa fa-lock";
          }else if (params.data.Full.fixed_lock == "2") {
            portablelockColor = "gray";
          }

          let markerColor = "gray";
          if (params.data.Full.vehicle_status_current == "running") {
            markerColor = "#6ABD46";
          } else if (params.data.Full.vehicle_status_current == "Stopped") {
            markerColor = "red";
          }
          // Create lock icon
          const portablelockIcon = document.createElement("i");
          portablelockIcon.className = lockIcon_fa;
          portablelockIcon.style.fontSize = "20px";
          portablelockIcon.style.color = markerColor;
          portablelockIcon.style.cursor = "pointer";
          portablelockIcon.style.padding = "4px";
          portablelockIcon.title = `${params.data.Full.imei_no3} / Door Close / ${params.data.Full.imei_no3_type}`;
    
                // Append elements to the container
                // container.appendChild(anchor);
                // if (params.data.Full.portable_lock !== "3"&&params.data.Full.portable_lock !== "") { container.appendChild(lockIcon);}
             
         
          // Append anchor to the container
         
          if (params.data.Full.portable_lock !== "3" && params.data.Full.portable_lock !== "") {
                  
                  
            portablelockIcon.addEventListener("click", () => {
              this.stored_imei=[params?.data.Full.imei_no3,];
              this.vehicleTrackF_new(
                params?.data.Full.imei_no3,
                '',
                '',
                params?.data.Full.run_date,
                params?.data.Full.vehicle_no,
                params?.data.Full,
                params?.data.Full.shipment_no,
                params?.data.Full._id
              );
            });
            
            container.appendChild(portablelockIcon)}else{
              container.appendChild(anchor);
            }
        } else {
          // Display 'NA' for invalid imei_no
          const naSpan = document.createElement("span");
          naSpan.textContent = "NA";
          container.appendChild(naSpan);
        }
      
        return container;
      }
      ,width: 100, },
    { headerName: "Track(All)", field: "trackAll", sortable: false,
      cellRenderer: params => {
        // Create the container div
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.justifyContent = "center";
      
        // Check the condition for imei_no
        // console.log("params.data.imei_no",params.data.Full)
        // if (params.data.Full.imei_no3 !== 'NA' && params.data.Full.imei_no3 !== '') {
          // Create anchor tag for valid imei_no
          const anchor = document.createElement("a");
          anchor.style.cursor = "pointer";
          anchor.innerHTML = `<i class="fa fa-map-marker map-table-marker" aria-hidden="true" style="color:#1D4380; font-size:20px"></i>`;
          
          // Add click event listener to the anchor tag
          anchor.addEventListener("click", () => {
            this.stored_imei=[ params?.data.Full.imei_no,
              params?.data.Full.imei_no2,
              params?.data.Full.imei_no3,];
            this.vehicleTrackF_new(
              params?.data.Full.imei_no,
              params?.data.Full.imei_no2,
              params?.data.Full.imei_no3,
              params?.data.Full.run_date,
              params?.data.Full.vehicle_no,
              params?.data.Full,
              params?.data.Full.shipment_no,
              params?.data.Full._id
            );
          });
      
          // Append anchor to the container
          container.appendChild(anchor);
        // } else {
        //   // Display 'NA' for invalid imei_no
        //   const naSpan = document.createElement("span");
        //   naSpan.textContent = "NA";
        //   container.appendChild(naSpan);
        // }
      
        return container;
      }
      ,width: 100,  },
    { headerName: "Full", field: "Full", sortable: false ,hide:true}
  ];
  console.log(this.new_array)
    this.rowData = this.new_array.map((person, index) => ({
  
      slNo:index+1 ,
      vehicleNo:person?.vehicle_no,
      origin:person?.source_code,
      destination:person?.destination_code,
      shipment_method:person?.shipment_method,
      sta:person?.schedule_arrival,
      delayingSta:person?.delaying_sta,
      delayHours:person?.delay_hr,
      currentLocation:person?.last_address_current, vehicleStatus:person?.vehicle_status_current 
      ? person.vehicle_status_current.charAt(0).toUpperCase() + person.vehicle_status_current.slice(1).toLowerCase() 
      : '',
      route:person?.route_name,
      runDate: person?.run_date,
      driverName:person?.driver_name,
      driverNumber:person?.driver_mobile,
      transporter: person?.transporter_name,
      tripId: person?.shipment_no,
      device1:'',
      device2: '',
      device3:'',
      trackAll:'',
      Full:person
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
  
      // onGridReady: (params) => this.onGridReady(params),
      onGridReady: (params) => {
        this.onGridReady(params);
        this.adjustGridHeight(); // Adjust the grid height after initialization
      },
     
    };
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, this.gridOptions);
   }
   onGridReady(params: any) {
    this.gridApi = params.api;
   
    // this.gridOptions.api = params.api;
     // Check if API is assigned correctly
  }
  // Function to adjust grid height dynamically
adjustGridHeight() {
  const rowCount = this.rowData?.length || 0; // Get the number of rows
  const rowsToShow = Math.min(rowCount, 16); // Show up to 10 rows
  const totalHeight = (rowsToShow * this.gridOptions.rowHeight) + this.gridOptions.headerHeight;

  // Set the height of the grid container dynamically
  const gridElement = document.querySelector('.ag-theme-alpine'); // Adjust selector to match your theme
  if (gridElement) {
    (gridElement as HTMLElement).style.height = `${totalHeight}px`;
  }
}
  bdDelayDashboardFilter() {
    const formdataCustomer = new FormData();
    formdataCustomer.append('AccessToken', this.token);

    this.bluedartService.bdDelayDashboardFilter(formdataCustomer).subscribe((res: any) => {
      
      if(res.status=='success'){
console.log(res)
      
      this.alertData = res.data[1];
      this.selectedRouteType=res.data.defaultFilter
      

      this.routeTypes = Object.keys(this.alertData).map((key) => ({
        id: key,
        route_type: this.alertData[key],
      }));
      this.SumbitFilter();
    }else{
      alert(res.Message);
    }
      // this.DelayTable();
    })
  }
  onFilterTextBoxChanged() {
    // console.log("hii");
    
    this.gridApi.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box") as HTMLInputElement).value,
    )
  }
  SumbitFilter(){
    this.SpinnerService.show();
    // console.log(this.selectedRouteType)
    this.commaSeparatedRoutes = this.selectedRouteType.map(item => item.route_type).join(', ');
    
    const formdataCustomer = new FormData();
    formdataCustomer.append('AccessToken', this.token); 
    formdataCustomer.append('RouteType', this.commaSeparatedRoutes);
    this.bluedartService.bdDelayDashboard(formdataCustomer).subscribe((res: any) => {
      console.log('delayDashboardGenericr', res);
      if(res.status=="success"){

        const values:any = Object.values(res.data);
      this.new_array=values
      this.SpinnerService.hide();
      this.Grid_table()
    }
      else{
        this.SpinnerService.hide();
        alert(res.Message);
      }
      // this.DelayTable();
    })
  }
  onBtExport() {
    // this.gridApi!.exportDataAsExcel();
    this. gridApi!.exportDataAsCsv({
      fileName: 'DelayDashboard.csv'
    });
    }
    exportExcel(){
      console.log(this.new_array)
      const rowData = this.new_array.map((person, index) => ({
  
        Sl:index+1 ,
        VehicleNo:person?.vehicle_no,
        Origin:person?.source_code,
        Destination:person?.destination_code,
        FeederType:person?.shipment_method,
        STA:this.parseDate(person?.schedule_arrival),
        DelayingSTA:this.parseDate(person?.delaying_sta),
        DelayHours:person?.delay_hr,
        CurrentLocation:person?.last_address_current,
        vehicleStatus:person?.vehicle_status_current,
        Route:person?.route_name,
        RunDate: this.parseDate(person?.run_date),
        DriverName:person?.driver_name,
        DriverNumber:person?.driver_mobile,
        Transporter: person?.transporter_name,
        TripId: person?.shipment_no,
        // device1:'',
        // device2: '',
        // device3:'',
        // trackAll:'',
        // Full:person
      }));
         const ws = XLSX.utils.json_to_sheet(rowData, {
          cellDates: true,  
          dateNF: 'dd-mm-yyyy hh:mm:ss', // Set the desired date format
          // dateNF: 'yyyy/mm/dd hh:mm:ss', 
        });
      
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'DelayDashboard');
        XLSX.writeFile(wb, 'DelayDashboard.xlsx');
      
      }
      private parseDate(dateString: string): Date | null {
        if (!dateString || dateString === '-' || dateString === '') return null;
      
        const [yearTime, month, day] = dateString.split('-');
        const [day1, time] = day.split(' ');
      
        // Construct ISO format (YYYY-MM-DDTHH:MM:SS)
        const isoDateString = `${yearTime}-${month}-${day1}T${time}`;
      
        // Force UTC to avoid timezone inconsistencies
        const parsedDate = new Date(isoDateString + 'Z'); 
      
        
        return parsedDate;
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
  DelayTable()
  {

    var table = $('#DelayTable').DataTable();
    table.clear()
    table.destroy();
    setTimeout(() => {

      $(document).ready(function () {

        var tbl = $('#DelayTable')

        $('#DelayTable').DataTable({


          pageLength: 20,
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
          fixedColumns: {
            leftColumns: 4, // Freeze the first three columns (Region, District, Group Code)
          },
          columnDefs: [
            {
              // targets: 'no-sort',
              orderable: false
            }
          ],
          // dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
          // "<'row'<'col-sm-12'tr>>" +
          // "<'row'<'col-sm-5'i><'col-sm-7'p>>",
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
                title: 'KPI Report'
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
                title: 'KPI Report'
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
                title: 'KPI Report'
              }],
          "language": {
            search: '',
            searchPlaceholder: 'Search'
          },
        }

        );
      });
    }, 20);
  }
  handleAlertMarkers(item) {
    if (this.demomarker.length > 0) {
      this.demomarker.forEach(marker => marker.setMap(null));
      this.demomarker = [];  // Clear the array after removing markers
    }
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



      const locationOfMarker = { lat: alert.lat, lng: alert.lng };
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
  vehicleTrackF_new1(imei, imei2, imei3, run_date, vehicle_no, item, Id, route_id) {
    console.log(imei, imei2, imei3, run_date, vehicle_no, item, Id, route_id)
    // this.SpinnerService.show();
    this.clearMarkersAndPolylines();
    this.initializeMap().then(() => {
    }).catch(error => {
      console.error('Error initializing map:', error);
      this.SpinnerService.hide('spinner-1');
    });



    // console.log("demomarker", this.demomarker);
    this.SpinnerService.show("tracking");
    // }
    const imeis = ['HR47F0104'];
    console.log(imeis)
    // Loop through each IMEI
    imeis.forEach((imei) => {
      console.log(imei)
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

        formData.append('AccessToken', this.token);
        formData.append('startdate', "2024-10-30 12:19:58");
        formData.append('enddate', currentDateTime);
        formData.append('time_interval', '120');
        formData.append('imei', imei);
        formData.append('group_id', this.group_id);
        formData.append('AccountId', this.account_id);
        formData.append('portal', 'itraceit');
        formData.forEach((value, key) => {
          console.log("formdata...", key, value);
        });
        this.itraceIt.vehicleTrackongS(formData).subscribe((res: any) => {
          console.log("tracking res", res);
          if (res.Status == "failed") {
            alert(res?.Message);
            // this.SpinnerService.hide("tracking");

          }
          this.trackingData = res.data;

          // if (this.trackingData.length > 0) {
          //   this.map_flag = '';
          //   this.latlngbounds = new google.maps.LatLngBounds();
          //   this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.trackingData[0].lat), parseFloat(this.trackingData[0].long)));
          //   this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.trackingData[this.trackingData.length - 1].lat), parseFloat(this.trackingData[this.trackingData.length - 1].long)));

          //   // Ensure the map bounds are updated
          //   this.map1.fitBounds(this.latlngbounds);
          // }
          this.SpinnerService.hide("tracking");
          if (res.data === 'Vehicle is inactive.') {
            alert("Track data is not available");
          } else {
            this.addMarkersAndPolyline1(imei, vehicle_no);
            // Fetch DFG polyline data
            // this.fetchDFGPolyline_new(route_id);

            // Fetch customer info
            // this.fetchCustomerInfo_new(Id);

            // Handle alert markers
            // this.handleAlertMarkers(item);
          }

          // this.SpinnerService.hide("tracking");
        });

        // // Fetch DFG polyline data
        // this.fetchDFGPolyline(route_id);

        // // Fetch customer info
        // this.fetchCustomerInfo(Id);

        // // Handle alert markers
        // this.handleAlertMarkers(item);
      }
    })

  }

  // async vehicleTrackF_new(imei, imei2, imei3, run_date, vehicle_no, item, Id, route_id) {
  //   console.log(imei, imei2, imei3, run_date, vehicle_no, item, Id, route_id);

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
  //   const imeis = [imei, imei2, imei3];
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
  //       const currentDateTime: any = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

  //       formData.append('AccessToken', this.token);
  //       formData.append('startdate', run_date);
  //       formData.append('enddate', currentDateTime);
  //       formData.append('time_interval', '120');
  //       formData.append('imei', imei);
  //       formData.append('group_id', this.group_id);
  //       formData.append('AccountId', this.account_id);

  //       // Log form data for debugging
  //       // formData.forEach((value, key) => {
  //       //   console.log("formdata...", key, value);
  //       // });

  //       try {
  //         // Wait for the API response
  //         const res: any = await this.itraceIt.vehicleTrackongS(formData).toPromise();
  //         // console.log("tracking res", res);

  //         if (res.Status === "failed") {
  //           alert(res?.Message);
  //         }

  //         this.trackingData = res.data;

  //         if (res.data === 'Vehicle is inactive.') {
  //           alert("Track data is not available");
  //         } else {
  //           console.log("trackingData", this.trackingData)
  //           // Add markers and polyline data
  //           this.addMarkersAndPolyline1(imei, vehicle_no);
  //           // Fetch DFG polyline data
  //           // this.fetchDFGPolyline_new(route_id);

  //           // Fetch customer info
  //           this.fetchCustomerInfo_new(Id);

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

  //   let minLat = Infinity, minLng = Infinity, maxLat = -Infinity, maxLng = -Infinity;
  //   // const ui = H.ui.UI.createDefault(this.map1, new H.map.Platform({apikey: 'MoBysY-1fH4koFS2rGUDpwvRHSLfdX4GWYsRJUlB8VY'}).createDefaultLayers());
  //   const platform = new H.service.Platform({
  //     apikey: 'MoBysY-1fH4koFS2rGUDpwvRHSLfdX4GWYsRJUlB8VY'  // Replace with your actual API key
  //   });
  //   const defaultLayers = platform.createDefaultLayers();
  //   const ui = H.ui.UI.createDefault(this.map1, defaultLayers);
  //   for (let i = 0; i < this.trackingData.length; i++) {
  //     const position: any = this.trackingData[i];
  //     lineString.pushPoint({ lat: this.trackingData[i].lat, lng: this.trackingData[i].long });

  //     const locationOfMarker = { lat: position.lat, lng: position.long };

  //     const icon_temp = this.getMarkerIcon(i);
  //     const marker = this.createMarker(locationOfMarker, icon_temp, '2');

  //     // Add the marker to the map
  //     this.map1.addObject(marker);
  //     this.markers.push(marker);





  //     // Attach click event to each marker
  //     marker.addEventListener('tap', async (evt) => {
  //       //  var position= evt.latLng.lat()
  //       // Remove existing bubbles, if any
  //       ui.getBubbles().forEach(bubble => ui.removeBubble(bubble));

  //       // Create content for the info window
  //       // const infoContent =this.handleMarkerClick(evt, this.trackingData[i], vehicle_no, imei)
  //       console.log(position, i)
  //       const infoContent = await this.handleMarkerClick(evt, position, vehicle_no, imei);

  //       //  `<div>Marker #${i + 1}<br>Latitude: ${position.lat}<br>Longitude: ${position.long}</div>`;

  //       // Create an info bubble at the marker's location
  //       const infoBubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
  //         content: infoContent
  //       });

  //       // Add the info bubble to the map
  //       ui.addBubble(infoBubble);
  //     });















  //     // Update min and max lat/lng values to create bounding box
  //     minLat = Math.min(minLat, position.lat);
  //     minLng = Math.min(minLng, position.long);
  //     maxLat = Math.max(maxLat, position.lat);
  //     maxLng = Math.max(maxLng, position.long);
  //   }

  //   // Define padding in degrees (adjust as needed)
  //   const padding = 0.01;

  //   // Create a bounding box with padding
  //   const boundingBox = new H.geo.Rect(
  //     maxLat + padding,    // Top latitude (maxLat + padding)
  //     minLng - padding,    // Left longitude (minLng - padding)
  //     minLat - padding,    // Bottom latitude (minLat - padding)
  //     maxLng + padding     // Right longitude (maxLng + padding)
  //   );

  //   // Set the map view to fit all markers within the padded bounding box
  //   this.map1.getViewModel().setLookAtData({
  //     bounds: boundingBox
  //   });



  //   console.log("lineString", lineString)
  //   this.addPolylineToMap(lineString)
  // }
  handleMarkerClick1(event, trackingData, vehicle_no, imei) {
    const markerPosition = event.target.getGeometry();
    const formdataCustomer = new FormData();
    formdataCustomer.append('AccessToken', this.token);
    formdataCustomer.append('VehicleId', vehicle_no);
    formdataCustomer.append('ImeiNo', imei);
    formdataCustomer.append('LatLong', `${markerPosition.lat},${markerPosition.lng}`);
    formdataCustomer.append('portal', 'itraceit');
    this.itraceIt.addressS(formdataCustomer).subscribe((res: any) => {
      const address = res.Data.Address;
      this.showWindow(trackingData, vehicle_no, address);
      // this.closeLastOpenedInfoWindow();
      // const infowindowMarker = new google.maps.InfoWindow({ content: this.contentsInfo });
      // infowindowMarker.setPosition(event.latLng);
      // infowindowMarker.open(this.map1);
    });
  }
  // async handleMarkerClick(event, trackingData, vehicle_no, imei) {
  //   const markerPosition = event.target.getGeometry();
  //   const formdataCustomer = new FormData();
  //   formdataCustomer.append('AccessToken', this.token);
  //   formdataCustomer.append('VehicleId', vehicle_no);
  //   formdataCustomer.append('ImeiNo', imei);
  //   formdataCustomer.append('LatLong', `${markerPosition.lat},${markerPosition.lng}`);

  //   const res: any = await this.itraceIt.addressS(formdataCustomer).toPromise(); // Assuming it returns an observable
  //   console.log("res", res)
  //   const address = res.Data.Address;

  //   return this.showWindow(trackingData, vehicle_no, address); // Return the content
  // }

  // showWindow(data, vnumber, add) {
  //   // var add:any
  //   this.contentsInfo = ''
  //   console.log('show window of vehicle information', data, add)
  //   /////////////////////////address api////////////////////////////////////////////////////



  //   ////////////////////////////////////////////////////////////////////////////////////////////////////////////  

  //   return this.contentsInfo = '<table style="line-height: 16px; border:none !important">' +
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
  fetchCustomerInfo_new(Id: string) {
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
    const formdataCustomer = new FormData();
    formdataCustomer.append('AccessToken', this.token);
    formdataCustomer.append('forGroup', this.group_id);
    formdataCustomer.append('id', Id);

    this.itraceIt.tripCustomerS(formdataCustomer).subscribe((res: any) => {
      if (res.message == "success" && res.customer_info !== null) {
        this.customer_info = res.customer_info;
        //  console.log(res)
        // Log the customer data for debugging
        // console.log("Customer Info:", this.customer_info);

        this.customer_info.forEach((customer: any, index) => {

          const sequenceNo = customer.SequenceNo ? customer.SequenceNo.toString() : ''; // Ensure this is a string




          const locationOfMarker = { lat: customer.Lat, lng: customer.Lng };
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
          divText.style.color = 'white'; // Set label color for visibility
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




          marker.addEventListener('tap', async (evt) => {
            //  var position= evt.latLng.lat()
            // Remove existing bubbles, if any
            ui.getBubbles().forEach(bubble => ui.removeBubble(bubble));

            // Create content for the info window
            // const infoContent =this.handleMarkerClick(evt, this.trackingData[i], vehicle_no, imei)
            const infoContent = await this.handleCustomerMarkerClick(evt, index);

            console.log("infoContent", infoContent)
            //  `<div>Marker #${i + 1}<br>Latitude: ${position.lat}<br>Longitude: ${position.long}</div>`;

            // Create an info bubble at the marker's location
            const infoBubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
              content: infoContent
            });

            // Add the info bubble to the map
            ui.addBubble(infoBubble);
          });
        });
      }

      // this.demomarker=markers;
    });
  }
  addPolylineToMap(lineString) {

    var polyline = (new H.map.Polyline(
      lineString, { style: { lineWidth: 3, strokeColor: 'green' } }
    ));
    this.map1.addObject(polyline);
    this.polylines.push(polyline);
  }

  fetchDFGPolyline_new(route_id: string) {
    const formdataCustomer = new FormData();
    formdataCustomer.append('AccessToken', this.token);
    formdataCustomer.append('forGroup', this.group_id);
    formdataCustomer.append('route_id', route_id);

    this.itraceIt.vehicle_dfgS(formdataCustomer).subscribe((res: any) => {
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
            lineString.pushPoint({ lat: lat, lng: lng });
          }
        }


        var polyline = (new H.map.Polyline(
          lineString, { style: { lineWidth: 3, strokeColor: 'green' } }
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
    // return customer_Info;
    this.closeLastOpenedInfoWindow();
    const infowindowMarker_custo = new google.maps.InfoWindow({ content: customer_Info });
    infowindowMarker_custo.setPosition(event.latLng);
    infowindowMarker_custo.open(this.map1);
    this.lastOpenedInfoWindow = infowindowMarker_custo;
  }

//   generateCustomerInfo(customer): string {
//     let pod = customer.PodStatus === 1 ? 'DONE' : '-';
//     let type = customer.LocationSequence === 0 ? 'ORIGIN' : customer.LocationSequence === 1 ? 'INTERMEDIATE STATION' : 'DESTINATION';
//     let arrival_time = customer.GeoArrivalTime ? `${customer.GeoArrivalTime} [GPS]` : customer.ArrivalTime;
//     let departure_time = customer.GeoDepartureTime ? `${customer.GeoDepartureTime} [GPS]` : customer.DepartureTime;

//     return `<table class="border" style="font-size: 13px;line-height: 19px;border:none !important">
//   <tbody style="border:none !important">
//     <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">Location</td><td style="border:none !important">:</td><td style="border:none !important">${customer.LocationCode}</td></tr>
//     <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">PodStatus</td><td style="border:none !important">:</td><td style="border:none !important">${pod}</td></tr>
//   </tbody>
// </table>`;

// // <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">Type</td><td style="border:none !important">:</td><td style="border:none !important">${type}</td></tr>
// // <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">ArrivalTime</td><td style="border:none !important">:</td><td style="border:none !important">${arrival_time}</td></tr>
// // <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">DepartureTime</td><td style="border:none !important">:</td><td style="border:none !important">${departure_time}</td></tr>
//   }
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
  initializeMap(): Promise<void> {
    if (this.map1) {
      this.map1.dispose(); // Dispose of the existing map instance
      this.map1 = null;    // Reset the map reference
    }
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
            // alert(0)
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
  exportPDF(): void {
    // Step 1: Prepare the table body with data from the grid
    const tableBody:any = [];
  
    // Step 2: Add column headers (mapping from `columnDefs`)
    const headers = this.columnDefs.map(col => col.headerName || col.field);
    console.log('Headers:', headers);  // Log headers to check their validity
    tableBody.push(headers);
  
    // Step 3: Iterate over the rows of the grid and extract data for each column
    this.gridOptions.api.forEachNode((node) => {
      const row:any = [];
      this.columnDefs.forEach((col) => {
        // Handle custom cell renderer for "Vehicle No" column
        let value = node.data[col.field] || '';
  
        // If the column is "vehicleNo", extract the inner text of the button
        if (col.field === 'vehicleNo' && node.data[col.field]) {
          // Extracting the "imei_current" value (from the button's innerHTML)
          value = node.data[col.field].imei_current || '';
        }
  
        row.push(value);
      });
      tableBody.push(row);
    });
  
    console.log('Table Body:', tableBody);  // Log tableBody to check structure
  
    // Step 4: Define the PDF document structure
    const docDefinition = {
      content: [
        { text: 'Vehicle Tracking Report', style: 'header' },
        { text: `Generated on: ${new Date().toLocaleString()}`, style: 'subheader' },
        { text: '\n' },  // Spacer
        {
          table: {
            headerRows: 1,  // Number of header rows
            widths: Array(headers.length).fill('*'),  // Auto width for each column based on number of columns
            body: tableBody   // Table content (headers + rows)
          },
          layout: 'lightHorizontalLines'  // Optional layout for table
        }
      ],
      styles: {
        header: { fontSize: 18, bold: true, alignment: 'center' },
        subheader: { fontSize: 12, italics: true, alignment: 'center' }
      }
    };
  
    // Log the final docDefinition before generating the PDF
    console.log('Final Document Definition:', docDefinition);
  
    // Step 5: Generate and download the PDF
    pdfMake.createPdf(docDefinition).download('vehicle-tracking-report.pdf');
  }
  
  
  // ------------------------------------google map --------------------------------
  async vehicleTrackF_new(imei, imei2, imei3, run_date, vehicle_no, item, Id, route_id) {
    // this.stored_data=[];
       this.stored_data.push(run_date)
       
       this.stored_data.push(vehicle_no)
       this.stored_data.push(route_id)
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

    // Show tracking spinner
    this.SpinnerService.show("tracking");

    // Define the array of IMEIs to process
    // const imeis = [imei,imei2,imei3];
    $('#v_track_Modal').modal('show');
    // if(!this.map1){
      this.initMap2()
    // }
    const imeis = [imei, imei2, imei3];
    
    // this.stored_imei=imeis;
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
        const currentDateTime: any = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

        formData.append('AccessToken', this.token);
        formData.append('startdate', run_date);
        formData.append('enddate', currentDateTime);
        formData.append('time_interval', '120');
        formData.append('imei', imei);
        formData.append('group_id', this.group_id);
        formData.append('AccountId', this.account_id);
        formData.append('portal', 'itraceit');
        // Log form data for debugging
        // formData.forEach((value, key) => {
        //   console.log("formdata...", key, value);
        // });

        // try {
          // Wait for the API response
          const res: any = await this.itraceIt.vehicleTrackongS(formData).toPromise();
          console.log("tracking res", res);
          this.SpinnerService.hide("tracking");
          if (res.Status === "failed") {
            alert(res?.Message);
          }

          this.trackingData = res.data;

          if (res.data === 'Vehicle is inactive.') {
            alert("Track data is not available");
          } else {
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
 fetchCustomerInfo(Id: any) {
console.log(Id)
  this.customer_info = []
  // if (this.demomarker.length > 0) {
  //   this.demomarker.forEach(marker => marker.setMap(null));
  //   this.demomarker = [];  // Clear the array after removing markers
  // }
  // console.log("Removing",Id)
  const markers: google.maps.Marker[] = [];
  // console.log(Id,this.token)
  const formdataCustomer = new FormData();
  formdataCustomer.append('AccessToken', this.token);
  formdataCustomer.append('MTripId',Id);
// tripCustomerS
formdataCustomer.forEach((value, key) => {
  console.log("formdata...", key, value);
});
  this.bluedartService.bdTripCustomerDetails(formdataCustomer).subscribe((res: any) => {
    console.log("formdataCustomer",res)
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
 ngAfterViewInit(): void {  // Ensure this method is properly implemented
  this.makeModalDraggable();
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
    // Force a reflow
    void modalDialog.offsetHeight;


    const rect = modalDialog.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(modalDialog);
    let transform = computedStyle.transform;
    transform="matrix(1, 0, 0, 1, 0, -50)"
    // If transform is not set, center the modal
    if (transform === 'none') {
      const x = (window.innerWidth - rect.width) / 2;
      const y = (window.innerHeight - rect.height) / 2;
      // console.log('Calculated Position:', { x, y });
      modalDialog.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  // Call initialization after a slight delay to ensure the modal is visible
  setTimeout(initializePosition, 1000);

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
          icon: icon,
          io:this.trackingData[i]?.io
        });
  
        // Store marker for future reference
        markers.push(mark);
        this.demomarker.push(mark);
  
        // Handle marker click events
        // const markerPosition = mark.getPosition(); 
        let trackingData:any=this.trackingData[i];
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
    this.itraceIt.addressS(formdataCustomer).subscribe((res: any) => {
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
      '<tr>' + data.io + '<tr>' +
      '<tr style=" border:none !important">' +
      '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Location Type</td>' +
      '<td style="border:none !important;width:1%;color: blue;">:</td>' +
      '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.loc_type + '</td>' +
      '</tr>' +
      '</tbody>' +
      '</table>'






  }

  
  
  
  
  
  
  
}