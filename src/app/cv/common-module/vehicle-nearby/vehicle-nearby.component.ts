import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild,ChangeDetectorRef  } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NavService } from 'src/app/shared/services/nav.service';
import { CommonModuleService } from '../services/common-module.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';
declare const agGrid: any;
declare const pdfMake: any;
declare var $: any;
declare var H: any;
declare var google :any;
@Component({
  selector: 'app-vehicle-nearby',
  templateUrl: './vehicle-nearby.component.html',
  styleUrls: ['./vehicle-nearby.component.scss']
})
export class VehicleNearbyComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  vehicelRadius: number = 50;
  columnDefs: any[] = [];
  rowData: any[] = [];
  gridOptions: any = {};
  gridApi: any;
  map: any;
  platform: any;
  ui: any;
  defaultLayers: any;
  trackingData: any;
  token: any;
  GroupTypeId: any;
  tripStatus:any;
  group_id: any;
  account_id: any;
  filterObject: any = {
    tripStatus: {},
    tripType: {},
    transporter: {}
  };
  headerObject:any={
    All:[],
    Active:[],
    Nod:[],
    NGPs:[],
    NON:[],
    InActive:[]
  }
  vehicleData:any;
  selectedVehcileLtLng: any;
  selectedSearchEvent: any='Location';
  locationData: any;
  columnApi: any;
  feederTypes: any;
  nearby_LatLong: any;
  code_nearbyVehicle: any;
  type_nearbyVehicle: any;
  map1: any;
  store_circle: any=[];
  store_circle_vehicle: any=[];
  latlngbounds: any=[];
  polygonCoords1: any=[];
  maps: any;
  radius_vehicle_value: any;
  EventControl: boolean=false;
  toogle_circle: boolean=false;
  vehiclestore_nearby: any=[];
  store_circle_allvehicle: any=[];
  polygonCoords1_nearby: any=[];
  last_address: any;
  Address: any;
  infowindow_near: number=1;
  Status_save_value: any=[];
  path: number=0;
  imei_no_show: any;
  VehicleCategory: any;
  image_vehicle: any;
  latlong1: any;
  IMEINO: any;
  vehicle_id: any;
  current: any=[];
  str: any;
  DistanceFromNearestLandmark: any;
  DistanceCovered: any;
  lastOpenedInfoWindow: any;
  Reminder_list: any=[];
  modalService: any;
  show_summary:boolean=false;
  // radius_vehicle_value: string | Blob;
  constructor(
    private navServices: NavService,
    private SpinnerService: NgxSpinnerService,
    private service:CrudService,
    private commonModuleService:CommonModuleService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.token=localStorage.getItem('AccessToken')
    this.platform = new H.service.Platform({
      apikey: 'vQTBCs4xOBkG-mSZlCymIb0G-Jj2TF2pO_p7e9Lc90o',
    });
    this.initApi()
    this.onFilterDashboard('')
    // this.loadVehicles()
   this.initMap();
    this.initializeGrid();
   
    this.sidebarToggle();
  }
  initMap() 
  {
    const center = { lat: 28.6139, lng: 77.2090 };
    this.map1 = new google.maps.Map(document.getElementById('map1') as HTMLElement, {
      zoom: 8,
       center: center,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scaleControl: true,
    }
    );   
  }
  ngAfterViewInit(): void {
    const gridElement = document.querySelector('#myGrid') as HTMLElement;
    if (gridElement) {
      new agGrid.Grid(gridElement, this.gridOptions);
    }
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
  initApi(){
    const formData=new FormData()
    formData.append('AccessToken',this.token)
    this.commonModuleService.nearbyFilter(formData).subscribe(
      (res: any) => {
        // this.tripArray=res?.MainDashboard
  
  
        // console.log(this.SpinnerService);
               this.filterObject=res?.Filter
               console.log('nearbyFilter', this.filterObject);
              

      },
      (error) => {
        console.error('error getting data', error);
        this.SpinnerService.hide('tableSpinner');
      }
    );
  }
  onKeyUp(event){
    let location=(event?.target?.value);   
    this.loadLocation(location)
  }

  // loadVehicles(): void {
  //   this.http.get('../../../../assets/vehicle.json').subscribe(
  //     (data:any) => {
  //       this.vehicleData=data?.Data
  //       console.log("vehicle data",this.vehicleData);
  //        this.loadData()
  //     },
  //     (error) => {
  //       console.error('Error loading vehicle data:', error);
  //     }
  //   );
  // }

  loadLocation(val):any{
    console.log("hii");
    
    if(val.length==3)
    {
      const formData=new FormData()
      formData.append('AccessToken',this.token)
      formData.append('LocationCode',val)
      this.commonModuleService.nearbyLocation(formData).subscribe(
        (res: any) => {
          // this.tripArray=res?.MainDashboard
          
          // console.log(this.SpinnerService);
                 
                 console.log('nearbyFilter', res);
               
                 
          // // this.masterUploadTable()
          if (res?.Status == 'success') {
              this.locationData=res?.data
            this.SpinnerService.hide('tableSpinner');
          } else {
            this.SpinnerService.hide('tableSpinner');
          }
          // this.routeId = (res?.data);
          // console.log("customerList", this.routeId);
        },
        (error) => {
          console.error('error getting data', error);
          this.SpinnerService.hide('tableSpinner');
        }
      );
    }
   
  }
  onOptionSelected(event: any): void {
    console.log(event);
    
    // const selectedOption = event.target.value;
    if (event === 'Vehicle' || event === 'Location') {
      // this.makeApiCall(selectedOption);
      this.selectedSearchEvent=event
      
    }
  }
  /**
   * Initialize grid column definitions and options
   */
  initializeGrid(): void {
    this.columnDefs = [
      {
        headerName: 'Sl.',
        field: 'si',
        sortable: true,
        filter: false,
        width:'50px'      },
      {
        headerName: 'Vehicle',
        field: 'vehicles',
        sortable: true,
        filter: true,
        floatingFilter: false,
        flex:0.6
      },
      {
        headerName: 'Vehicle Status',
        field: 'vehicleStatus',
        sortable: true,
        filter: true,
        floatingFilter: false,
        flex:0.6
      },

      {
        headerName: 'Idle', // Hidden column
        field: 'idle',
        sortable: true,
        filter: true,
        floatingFilter: false,
        flex: 0.6,
        hide: true // This property hides the column
      },
      // {
      //   headerName: 'Distance Radius',
      //   field: 'distanceRadius',
      //   sortable: true,
      //   filter: true,
      //   floatingFilter: false,
      // },
      
      {
        headerName: 'Driver Details',
        field: 'driverDetails',
        sortable: true,
        filter: true,
        floatingFilter: false,
        flex:0.6
      },
      {
        headerName: 'Transporter',
        field: 'transporter',
        sortable: true,
        filter: true,
        floatingFilter: false,
        flex:0.6
      },
      {
        headerName: 'GPS Provider',
        field: 'gpsProvider',
        sortable: true,
        filter: true,
        floatingFilter: false,
        flex:0.6
      },
      {
        headerName: 'Last Data',
        field: 'lastData',
        sortable: true,
        filter: true,
        floatingFilter: false,
        flex:0.6
      },
      {
        headerName: 'FullData',
        field: 'fullData',
        sortable: true,
        filter: true,
        floatingFilter: false,
        hide:true,
        flex:0.6
      },
      {
        headerName: 'Nearby Count & Map View',
        field: 'nearbyCountMapView',
        sortable: true,
        filter: true,
        floatingFilter: false,
        flex:0.6,

      cellRenderer: params => {
        // Create the container div
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.justifyContent = "center";
        const button = document.createElement("button");
        button.innerHTML = "";
        button.style.border = "none";
        button.style.background = "none";
        button.style.marginLeft = "5px";
        button.style.cursor = "pointer";
         button.innerHTML += `<strong style="color: blue;">View Map</strong>`;
          button.addEventListener("click", () => {
          this.showMapView(params.data)
          });
        container.appendChild(button);
      
        return container;
      },
       },
    ];

    this.gridOptions = {
      columnDefs: this.columnDefs,
      // rowData: this.rowData,
      rowHeight: 'auto',
      paginationPageSize: 10,
      paginationPageSizeSelector: [10, 20, 50, 100],
      headerHeight: 40,
      pagination: true,
      defaultColDef: {
        editable: false,
        filter: true,
        enableCellTextSelection:true

        // flex: 1,
        // autoSizeStrategy: {
        //   type: 'fitCellContents',
        // },
      },
      // defaultExcelExportParams: {
      //   exportAsExcelTable: true,
      // },
      // paginationPageSize: 50,
      animateRows: true,
      domLayout: 'autoHeight',
      onGridReady: (params: any) => {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        this.loadData();
      },
      onCellClicked: (event) => this.onCellClicked(event),
    };
  }

  /**
   * Load data into the grid
   */
  loadData(): void {
    if (!this.vehicleData) return;
    this.rowData = Object.keys(this.vehicleData?.data).map((key, index) => {
      const item = this.vehicleData.data[key];
      return {
        si: index + 1,
        vehicles: item.vehicle_number || "N/A",
        vehicleStatus: item?.VehicleStatus,
        idle:item?.Idle,
        // closeDate: "", // No close date in provided data
        // distanceRadius: "", // No distance radius in provided data
        driverDetails: `${item?.DriverName}/${item?.DriverMobile}`,
        transporter: item.Transporter || "N/A",
        gpsProvider: item.gps_vendor_name || "N/A",
        lastData: item.RunDate || "N/A",
        fullData:item,
        nearbyCountMapView: "View Map", // Placeholder for clickable map link
      };
    });
   
    if (this.gridApi) {
      console.log("load data",this.rowData);
      this.gridApi.setGridOption('rowData', this.rowData)
    }
  }
  loadFilterData(val){

    console.log(val,this.headerObject[val]);
    val=this.headerObject[val]
    this.rowData = val.map((item, index) => {
    
      return {
        si: index + 1,
        vehicles: item.vehicle_number || "N/A",
        vehicleStatus: item?.VehicleStatus,
        // closeDate: "", // No close date in provided data
        // distanceRadius: "", // No distance radius in provided data
        driverDetails: `${item?.DriverName}/${item?.DriverMobile}`,
        transporter: item.Transporter || "N/A",
        gpsProvider: item.gps_vendor_name || "N/A",
        fullData:item,
        lastData: item.RunDate || "N/A",
        nearbyCountMapView: "View Map", // Placeholder for clickable map link
      };
    });
   
    if (this.gridApi) {
      console.log("load data",this.rowData);
      this.gridApi.setGridOption('rowData', this.rowData)
  }
}

  /**
   * Callback when the grid is ready
   */
  /**
   * Callback when the grid is ready
   */
  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }
  onFilterTextBoxChanged() {
    console.log('hii');

    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }
  onBtExport() {
    // this.gridApi!.exportDataAsExcel();
    // this.gridApi!.exportDataAsCsv();
    this.exportToExcel()
  }
  /**
   * Callback when a cell is clicked
   */
  onCellClicked(event: any): void {
    console.log('Cell clicked:', event);
  }

   exportToExcel(): void {
      const parentHeaders: string[] = [];
      const childHeaders: string[] = [];
      const rows: any[] = []; // Rows to be added in Excel
    
      // Extract parent and child headers, excluding 'trackHistory'
      this.columnDefs.forEach((colDef: any) => {
        if (colDef.children) {
          // Parent header for grouped columns
          console.log(colDef?.children);
          
          const filteredChildren = colDef.children.filter((child: any) => child.field !== 'trackHistory');
          if (filteredChildren.length > 0) {
            parentHeaders.push(colDef.headerName);
            childHeaders.push(...filteredChildren.map((child: any) => child.headerName));
          }
        } else if (colDef.field !== 'trackHistory') {
          // Parent and child headers are the same for non-grouped columns
          // parentHeaders.push(colDef.headerName);
          childHeaders.push(colDef.headerName);
        }
      });
    
      // Push parent headers and child headers as the first two rows
      // rows.push(parentHeaders); // Parent headers (merged columns in Excel)
      rows.push(childHeaders);  // Child headers
    
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
          return field ? row[field] || '' : '';
        });
        rows.push(rowValues); // Add the processed row to rows
      });
    
      // Create a workbook and worksheet
      const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(rows); // Convert array of arrays to sheet
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'GridData');
    
      // Generate Excel file and trigger download
      XLSX.writeFile(workbook, 'GridData.xlsx');
    }
  /**
   * Create a clickable cell content
   */
  createClickableCell(params: any, callback: Function): HTMLElement {
    console.log(params);
    
    const element = document.createElement('span');
    element.innerText = params.value;
    element.style.cursor = 'pointer';
    element.style.color = 'blue';
    console.log("params.data",params.data)
    element.addEventListener('click', () => callback(params.data));
    return element;
  }

  /**
   * Action for showing map view
   */
  showMapView(data: any): void {
    console.log('Map view clicked for:', data?.fullData);
    this.openMapModalFromTable(data?.fullData)
  }
  openMapModalFromTable(item) { 
    console.log(item,"mehdi");
    
    this.selectedVehcileLtLng=item
    const radius = this.vehicelRadius
        console.log(this.selectedVehcileLtLng);
        
    if (!this.selectedVehcileLtLng || !radius) {
      alert('Please select a vehicle and radius.');
      return;
    }

    console.log("Selected Vehicle Lat Long",this.selectedVehcileLtLng);

    const nearbyVehicles = this.findNearbyVehicles(this.selectedVehcileLtLng, radius);
    console.log('Nearby Vehicles:', nearbyVehicles);

    // console.log(this.findNearbyVehicles(this.selectedVehcileLtLng,radius));
    
    $('#mapModal').modal('show'); // Open modal using jQuery
    this.SpinnerService.show('mapSpinner');
    this.initMap();
    // Call the tracking function
    this.vehicleTrackF(nearbyVehicles,radius);

   
  //  vehicle-status
  }
  /**
   * Define cell styling for dynamic colors
   */
  styleCellColor(params: any): object {
    return { color: params.value ? 'blue' : 'green' };
  }

  /**
   * Action for tracking vehicle
   */
  showTrack(data: any): void {
    console.log('Track clicked:', data);
  }

  /**
   * Action for showing customer details
   */
  showCustomer(data: any): void {
    console.log('Customer clicked:', data);
  }

  /**
   * Export grid data as CSV
   */
  exportAsExcel(): void {
    if (this.gridApi) {
      this.gridApi.exportDataAsCsv({ fileName: 'table-data.csv' });
    }
  }

  exportToPDF(): void {
    const headers = this.columnDefs.map((col) => col.headerName);
    const body = this.rowData.map((row) =>
      this.columnDefs.map((col) => row[col.field])
    );
    body.unshift(headers);

    const docDefinition = {
      content: [
        { text: 'Vehicle Nearby Data', style: 'header', alignment: 'center' },
        { text: '\n' },
        {
          table: {
            headerRows: 1,
            widths: Array(headers.length).fill('auto'),
            body: body,
          },
          layout: {
            fillColor: (rowIndex) => (rowIndex === 0 ? '#0074D9' : null),
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
          color: 'white',
          fillColor: '#0074D9',
          alignment: 'center',
        },
        tableBody: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        fontSize: 9,
      },
    };

    pdfMake.createPdf(docDefinition).download('vehicle-nearby-data.pdf');
  }

  onFilterDashboard(val) {
    
    if(this.gridApi)
    this.gridApi.setFilterModel(null);

    console.log(val);
    let formData = new FormData();
    formData.append("AccessToken",this.token)
    formData.append('TripStatus', val?.tripStatus||'1');
    formData.append('FeederType', val?.tripType||'All');
    formData.append('RouteCategory', val?.routeCategory||'All');
    formData.append('Transporter', val?.transporter||'All');

    console.log(formData);

    this.SpinnerService.show('tableSpinner');
    this.commonModuleService.nearbyVehicleFilter(formData).subscribe(
      (res: any) => {
        console.log('specificDashboard', res);

        if (res?.Status == 'success') {
       
            this.vehicleData=res?.Data
            console.log("vehicle data",this.vehicleData);
             this.loadData()
             this.segregateVehicleFunction()

          this.SpinnerService.hide('tableSpinner');
        } else {
          this.SpinnerService.hide('tableSpinner');
          console.log("qalbe");
          
        }
      },
      (error) => {
        console.error('error getting data', error);
        this.SpinnerService.hide('tableSpinner');
      }
    );
  }

 segregateVehicleFunction(){
  const groupedVehicles:any = {};
const vehicleStatusSet = new Set();
groupedVehicles.NON = [];
  Object.values(this.vehicleData?.data).forEach((vehicle:any) => {
    const status = vehicle?.VehicleStatus;
    const imei = vehicle?.device_imei;
    //  console.log(vehicle);
     
    // Add to grouped vehicles
    if (!groupedVehicles[status]) {
        groupedVehicles[status] = [];
    }
    groupedVehicles[status].push(vehicle);
    if (!imei || imei.trim() === "") {
      groupedVehicles.NON.push(vehicle);
    }

    // Add to status set
    vehicleStatusSet.add(status);
});
// All:[],
//     Active:[],
//     Nod:[],
//     NGps:[],
//     NON:[],
//     InActive:[]
this.headerObject.All=this.vehicleData?.data
this.headerObject.Active=groupedVehicles?.Active||[]
this.headerObject.InActive=groupedVehicles?.InActive||[]
this.headerObject.Nod=groupedVehicles?.NoData||[]
this.headerObject.NGPs=groupedVehicles?.NoGPS||[]

const secutrakVehicles:any = [];
const thirdPartyVehicles:any = [];

this.headerObject?.InActive?.forEach((vehicle: any) => {
  if (vehicle?.gps_vendor_name === 'Secutrak') {
    secutrakVehicles.push(vehicle);
  } else {
    thirdPartyVehicles.push(vehicle);
  }
});

// Add new categories to headerObject
this.headerObject.Secutrak = secutrakVehicles;
this.headerObject.ThirdParty = thirdPartyVehicles;
console.log(groupedVehicles,this.headerObject,vehicleStatusSet);

 }
 
 filterTable(val){
  console.log(val);
  if(val=='All')
  this.loadData()
    else
   this.loadFilterData(val)
  
 }
  openMapModal(item,filterForm) {
    console.log(filterForm?.value,"open map modal");
   
    if(filterForm?.value?.tripStatus=='Location')
    {
      console.log(filterForm?.value?.tripType);
      const geoCord =filterForm?.value?.tripType?.geocoord
     const [Latitude, Longitude] = geoCord?.split(',').map(Number);
     this.selectedVehcileLtLng={Latitude:Latitude,Longitude:Longitude,TripStatus:'Location'}
     console.log(this.selectedVehcileLtLng);
         
    }
      else
    this.selectedVehcileLtLng=filterForm?.value?.tripType
    const radius = filterForm?.value?.radius;
        console.log(this.selectedVehcileLtLng);
        
    if (!this.selectedVehcileLtLng || !radius) {
      alert('Please select a vehicle and radius.');
      return;
    }

    console.log("Selected Vehicle Lat Long",this.selectedVehcileLtLng);

    const nearbyVehicles = this.findNearbyVehicles(this.selectedVehcileLtLng, radius);
    console.log('Nearby Vehicles:', nearbyVehicles);

    // console.log(this.findNearbyVehicles(this.selectedVehcileLtLng,radius));
    
    $('#mapModal').modal('show'); // Open modal using jQuery
    this.SpinnerService.show('mapSpinner');
    this.initMap();
    // Call the tracking function
    this.vehicleTrackF(nearbyVehicles,radius);

   
  //  vehicle-status
  }
 
  // datatable() {

  //   setTimeout(() => {
  
  
  //     $(document).ready(() => {
  
  
  //       $('#vehicle-status').DataTable({
  //         pageLength: 5,
  //         // pageLength: '10',
  //         // scrollY: '500px',
  //         paging: true,
  //         pagingType: 'full_numbers',
  
  //         // fixedHeader: true,
  //         scrollX: true,
  //         // destroy: true,
  //         responsive: true,
  
  //         "order": [],
  //         dom: '<"html5buttons"B>lTfgitp',
  //         columnDefs: [
  //           { targets: 'no-sort', orderable: false }
  //         ],
  //         buttons:
  //         [
  
  
  //           {
  //             extend: 'csv',
  //             footer: true,
  //             autoClose: 'true',
  //             titleAttr: 'Download csv file',
  
  //             className: 'datatablecsv-btn fa fa-file-text-o ',
  //             text: '',
  //             tag: 'span',
  
  //             exportOptions: {
  
  //               columns: ':visible',
  
  
  //             },
  //             title: 'dashboard_repor'
  //           },
  //           {
  //             extend: 'pdf',
  //             footer: true,
  //             orientation: 'landscape',
  //             pageSize: 'LEGAL',
  
  //             autoClose: 'true',
  
  //             titleAttr: 'Download Pdf file',
  //             tag: 'span',
  
  //             className: 'datatablepdf-btn fa fa-file-pdf-o ',
  //             text: '',
  //             // customize: function (doc) {
  //             //   var colCount = new Array();
  //             //   $(tbl).find('tbody tr:first-child td').each(() => {
  //             //     if ($(this).attr('colspan')) {
  //             //       for (var i = 1; i <= $(this).attr('colspan'); i++) {
  //             //         colCount.push('*');
  //             //       }
  //             //     } else { colCount.push('*'); }
  //             //   });
  //             //   doc.content[1].table.widths = colCount;
  //             // },
  
  
  //             exportOptions: {
  
  //               columns: ':visible',
  //               //  columns: [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 ]
  
  //             },
  //             title: 'dashboard_repor'
  //           },
  //           {
  //             extend: 'copy',
  //             footer: true,
  //             titleAttr: ' Copy  file',
  
  //             tag: 'span',
  
  //             className: 'datatablecopy-btn fa fa-copy ',
  //             text: '',
  //             orientation: 'landscape',
  //             pageSize: 'LEGAL',
  //             exportOptions: {
  
  //               columns: ':visible'
  
  //             },
  //             title: 'dashboard_repor'
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
  //             exportOptions: {
  
  //               columns: ':visible'
  
  //             },
  //             title: 'dashboard_repor'
  //           }]
  //       }
  
  //       );
  //     });
  
  //   }, 80);
  
  // }
  datatable() {
    // alert("1")
    // var tbl = $('#vehicle-status');
    var table = $('#vehicle-status').DataTable();
    // table.clear();
    table.destroy();
    table.clear();
    // table.draw()
    // $('#masterUpload').DataTable().clear;
    // if(datatable.length!=)
    // console.log("table length",datatable.length)
    //  $('#masterUpload tbody').empty();

    $(document).ready(() => {
      $('#vehicle-status').DataTable({
        language: {
          search: '',
          searchPlaceholder: 'Search',
        },
        pageLength: 5,
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
  vehicleTrackF(nearbyVehicles,radius) {
    // this.loading = true; // Set loading to true when API call starts

    const currentDateTime = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // To use 24-hour format
    }).replace(',', '');

    // const formData=new FormData()
   
    // // formData.append('AccessToken', this.token)
    // formData.append('AccessToken', this.token)
    // // formData.append('startdate', item?.RunDate);
    // formData.append('startdate', '2024-11-27 13:42:05');
    // formData.append('enddate', currentDateTime);
    // formData.append('time_interval', '60');
    // // formData.append('imei', item?.ImeiNo1||item?.ImeiNo2||item?.ImeiNo3);
    // formData.append('imei','2065860241')
    // formData.append('group_id', '5690');
    // formData.append('AccountId', '177914');
    // this.service.vehicleTrackongS(formData).subscribe((res: any) => {
    //   console.log("Response:", res);
     
      
    //   if (res.Status === 'success' && Array.isArray(res.data) && res.data.length > 0) {
        // Extract coordinates from the data array
   
        setTimeout(() => {
          const res=[this.selectedVehcileLtLng]
          console.log('myres',res);
          
          const coordinates = res.map(location => ({
            lat: this.normalizeCoordinate(location?.Latitude), // Use the correct key for latitude
            lng: this.normalizeCoordinate(location?.Longitude) // Use the correct key for longitude
          }));
          this.trackingData=this.vehicleData?.data
             console.log(coordinates);
             
          // Initialize the map with the coordinates
          this.initializeMap1(nearbyVehicles, this.selectedVehcileLtLng, radius);
        }, 1000); 
      // } else {
      //   alert(res?.Message)
      //   console.log('No valid locations found in the response.');
      // }
    // }, error => {
    //   alert('Error fetching vehicle tracking data:')
    //   console.error('Error fetching vehicle tracking data:', error);
    // });
  
    // const res=[this.selectedVehcileLtLng]
    // console.log('myres',res);
    
    // const coordinates = res.map(location => ({
    //   lat: this.normalizeCoordinate(location?.Latitude), // Use the correct key for latitude
    //   lng: this.normalizeCoordinate(location?.Longitude) // Use the correct key for longitude
    // }));
    // this.trackingData=this.vehicleData?.data
    //    console.log("coordinates",coordinates);
       
    // // Initialize the map with the coordinates
    // this.initializeMap(nearbyVehicles, this.selectedVehcileLtLng, radius);
  
  }
  
//   addCircleToMap(coordinate,item){
//     console.log("coordinate",coordinate[0].lat);
    
//     this.map.addObject(new H.map.Circle(
//       // The central point of the circle
//       {lat:coordinate[0].lat, lng:coordinate[0].lng},
//       // The radius of the circle in meters
//       item?.radius*1000,
//       {
//         style: {
//           strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
//           lineWidth: 2,
//           fillColor: 'rgba(0, 128, 0, 0.7)'  // Color of the circle
//         }
//       }
//     ));
//   }

  addInfoBubble(marker: any, coord: { lat: number, lng: number },trackingData): void {
    marker.addEventListener('tap', async (evt) => {
      // Close existing bubbles
      this.ui.getBubbles().forEach((existingBubble: any) => {
        existingBubble.close();
      });
  
      // Prepare form data for the API request
      const formData = new FormData();
      formData.append('AccessToken', this.token);
      formData.append('VehicleId', 'MH04KU6889');
      formData.append('ImeiNo', 'MH04KU6889');
      formData.append('LatLong', `${coord.lat},${coord.lng}`);
  
      try {
        // Fetch data from the API
        // const res: any = await this.service.addressS(formData).toPromise();
        // const address = res?.Data?.Address;
        const address='Ingen'
  
        // Build the InfoBubble content dynamically based on the API response
        const bubbleContent = this.createBubble(trackingData,address,'MH04KU6889')
  
        // Create a new InfoBubble with the dynamic content
        const bubble = new H.ui.InfoBubble(coord, {
          content: bubbleContent
        });
  
        // Open the new InfoBubble
        this.ui.addBubble(bubble);
      } catch (error) {
        console.error('Error fetching address:', error);
        // Optionally, show an error message in the bubble
        const errorBubble = new H.ui.InfoBubble(coord, {
          content: '<p>Error loading address data.</p>'
        });
        this.ui.addBubble(errorBubble);
      }
    });
  }

//   addMarker(coordinate: { lat: number, lng: number }, icon:any): void {
//     const marker = new H.map.Marker(coordinate, { icon });
//     this.map.addObject(marker);
//     return marker
// }

createBubble(data,add,vnumber) {

// return  '<table style="line-height: 16px; border:none !important">' +
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

return `<p>Aman</p>`




}

// addPolyline(coordinates: { lat: number, lng: number }[]): void {
//   this.SpinnerService.show('mapSpinner')
//   const lineString = new H.geo.LineString();
//   coordinates.forEach(coord => lineString.pushPoint(coord));
//   const polyline = new H.map.Polyline(lineString, {
//       style: { strokeColor: '#6334d8', lineWidth: 4 }
//   });
//   this.map.addObject(polyline);
//   this.SpinnerService.hide('mapSpinner')
// }
// private toRadians(degrees: number): number {
//   return degrees * (Math.PI / 180);
// }

// private haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
//   const R = 6371; // Radius of Earth in kilometers
//   const dLat = this.toRadians(lat2 - lat1);
//   const dLng = this.toRadians(lng2 - lng1);

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
//     Math.sin(dLng / 2) * Math.sin(dLng / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   return R * c; // Distance in kilometers
// }

// findNearbyVehicles(selectedVehicle): void {
//   let radiusKm=150
//   let nearbyVehicles = this.vehicleData?.data
//     .map(vehicle => {
//       const distance = this.haversine(
//         selectedVehicle.lat,
//         selectedVehicle.lng,
//         vehicle.lat,
//         vehicle.lng
//       );
//       return { ...vehicle, distance };
//     })
//     .filter(vehicle => vehicle.distance <= radiusKm);

//     return nearbyVehicles;
// }


// openMapModal(item, filterForm) {
//   // Get selected vehicle's lat, lng, and radius
//   const selectedLatLng = filterForm?.value?.tripType; // Assuming this contains the selected vehicle's lat, lng
//   const radius = filterForm?.value?.radius; // Radius in kilometers

//   if (!selectedLatLng || !radius) {
//     alert('Please select a vehicle and radius.');
//     return;
//   }
  
//   this.selectedVehcileLtLng = selectedLatLng; // Store selected vehicle lat, lng
//   console.log('Selected Vehicle LatLng:', this.selectedVehcileLtLng);

//   // Find nearby vehicles
//   const nearbyVehicles = this.findNearbyVehicles(selectedLatLng, radius);
//   console.log('Nearby Vehicles:', nearbyVehicles);

//   $('#mapModal').modal('show'); // Open modal using jQuery
//   this.SpinnerService.show('mapSpinner');

//   // Initialize map with nearby vehicles
//   this.initializeMap(nearbyVehicles, this.selectedVehcileLtLng, radius);
// }

normalizeCoordinate(coord: string | number):any {
  if (typeof coord === 'number') {
    return coord; // Already a number
  }

  if (typeof coord === 'string') {
    // Extract numeric part using regex
    const match = coord.match(/-?\d+(\.\d+)?/);
    if (match) {
      return parseFloat(match[0]); // Convert to float
    }
  }

  console.warn(`Invalid coordinate: ${coord}`);
  return null; // Return null if invalid
}

findNearbyVehicles(selectedLatLng: { Latitude: number; Longitude: number }, radius: number):any {
  const { Latitude: userLat, Longitude: userLng } = selectedLatLng;
  const nearbyVehicles:any = [];

  for (const vehicleKey in this.vehicleData?.data) {
    if (this.vehicleData?.data.hasOwnProperty(vehicleKey)) {
      const vehicle = this.vehicleData.data[vehicleKey];
      const vehicleLat = this.normalizeCoordinate(vehicle.Latitude);
      const vehicleLng = this.normalizeCoordinate(vehicle.Longitude);
      
       
      // Skip invalid coordinates
      if (isNaN(vehicleLat) || isNaN(vehicleLng)) {
        console.warn(`Invalid coordinates for vehicle: ${vehicle.vehicle_number}`);
        continue;
      }

      // Calculate distance using haversine
      const distance = this.haversine(userLat, userLng, vehicleLat, vehicleLng);
      if (distance <= radius) {
        nearbyVehicles.push(vehicle);
      }
    }
  }
  console.log("nearbyVehicles",nearbyVehicles);
  
  return nearbyVehicles;
}



// findNearbyVehicles(selectedLatLng, radius) {
//   const { Latitude, Longitude } = selectedLatLng;
//   const nearbyVehicles = this.vehicleData?.data.filter(vehicle => {
//     const distance = this.haversine(Latitude, Longitude, vehicle.Latitude, vehicle.Latitude);
//     return distance <= radius; // Filter vehicles within the radius
//   });
//   return nearbyVehicles;
// }

private toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

private haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = this.toRadians(lat2 - lat1);
  const dLng = this.toRadians(lng2 - lng1);
  // console.log("dlat",dLat,lat1,lng1,lat2,lng2);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // console.log(R*c);
  
  return R * c; // Distance in kilometers
}
//   addMarker(coordinate: { lat: number, lng: number }, icon:any): void {
//     const marker = new H.map.Marker(coordinate, { icon });
//     this.map.addObject(marker);
//     return marker
// }


// initializeMap(coordinates,item,radius) {
//   console.log("initMap",coordinates,item,radius);
  
//   if (!this.map) {
//     // Initialize HERE map platform and default layers
//     // const platform = new H.service.Platform({
//     //   apikey: 'your-api-key' // Replace with your actual API key
//     // });
//     this.defaultLayers = this.platform.createDefaultLayers();

//     // Create the map
//     this.map = new H.Map(
//       this.mapContainer.nativeElement,
//       this.defaultLayers.vector.normal.map,
//       {
//         center:   { lat: item?.Latitude, lng:item?.Longitude },
//         zoom: 8,
//         pixelRatio: window.devicePixelRatio || 1
//       }
//     );

//     // Make the map interactive
//     const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
//     this.ui=H.ui.UI.createDefault(this.map, this.defaultLayers);
//   }

//   // Clear existing markers
//   this.map.removeObjects(this.map.getObjects());

//   // Check if there are coordinates
//   if (coordinates.length > 0) {
//   // Create icons for source, destination, and intermediate points
//   let swLat = this.normalizeCoordinate(coordinates[0]?.Latitude)
//   let swLng = this.normalizeCoordinate(coordinates[0]?.Longitude)
//   let neLat = this.normalizeCoordinate(coordinates[0]?.Latitude)
//   let neLng = this.normalizeCoordinate(coordinates[0]?.Longitude)
//   console.log("SW",swLat,swLng,neLat,neLng);
  
//   function iconFn(color){
//     return `<svg width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,1,0,0)">
//     <path fill="${color}" d="M6 3h10v7H6zm9 11a2 2 0 1 1-3.999.001A2 2 0 0 1 15 14m-2-3c1.3 0 2.4.8 2.8 2h.2v-2z"></path>
//     <path fill="${color}" d="M5 5H1L0 9v4h1.2c.4-1.2 1.5-2 2.8-2s2.4.8 2.8 2h3.4c.4-1.2 1.5-2 2.8-2H5zM4 9H1l.8-3H4z"></path>
//     <path fill="${color}" d="M6 14a2 2 0 1 1-3.999.001A2 2 0 0 1 6 14"></path>
//   </svg>`
//   }
    
//   const sourceIcon = new H.map.Icon(iconFn('green'));
//       const destinationIcon = new H.map.Icon(iconFn('#1D4380'));
//       const intermediateIcon = new H.map.Icon(iconFn('#1D4380'));

//   let bounds = new H.geo.Rect(this.normalizeCoordinate(coordinates[0]?.Latitude),
//   this.normalizeCoordinate(coordinates[0]?.Longitude), 
//   this.normalizeCoordinate(coordinates[0]?.Latitude), 
//   this.normalizeCoordinate(coordinates[0]?.Longitude));
  
// // Create an icon, an object holding the latitude and longitude, and a marker:
// // var icon = new H.map.Icon(svgMarkup)
//     // Create markers and update bounds
//     coordinates.forEach((coord,index) => {
//       const icon = index === 0 ? sourceIcon : (index === coordinates.length - 1 ? destinationIcon : intermediateIcon);
//       // this.addMarker(coord, icon);

//     const latlong={lat:coord?.Latitude,lng:coord?.Longitude}

//       // Add marker using the helper function
//      const marker= this.addMarker(latlong, icon);
//      console.log("SW1",swLat,swLng,neLat,neLng);
//       this.addInfoBubble(marker, latlong,this.trackingData[index]);
//             // // Update bounds
//             swLat = Math.min(swLat, coord.Latitude);
//             swLng = Math.min(swLng, coord.Longitude);
//             neLat = Math.max(neLat, coord.Latitude);
//             neLng = Math.max(neLng, coord.Longitude);
//      // Expand the bounds to include each coordinate
//      const padding = 0.01;
//      bounds = this.calculateBoundsFromRadius({ lat: item?.Latitude, lng:item?.Longitude },radius);
//      bounds = bounds.mergePoint(latlong);

//     });
// console.log("below info bubble");

//     // Create bounds with updated southwest and northeast points
//     // const bounds = new H.geo.Rect(swLat, swLng, neLat, neLng);

//     // this.addPolyline(coordinates);

   

//     // Use setLookAtData to center and zoom the map to the bounds
//     this.map.getViewModel().setLookAtData({
//       bounds: bounds
//     });
//     this.addCircleToMap({ lat: item?.Latitude, lng:item?.Longitude },radius);
//   }
//   this.SpinnerService.hide('mapSpinner')
// }

initializeMap1(coordinates,item,radius){
  console.log("nearby vehicle:initializeMap1",coordinates,item,radius);
  this.store_circle = [];
  this.store_circle_vehicle = [];
  // var marker = this.Vehicle_list[this.code_nearbyVehicle];
  this.latlngbounds = new google.maps.LatLngBounds();
  this.polygonCoords1 = new Array();
  // var coord2 =  this.nearby_LatLong.split(",");
  this.polygonCoords1 = new google.maps.LatLng(parseFloat(item.Latitude), parseFloat(item.Longitude));
  this.latlngbounds.extend(new google.maps.LatLng(parseFloat(item.Latitude), parseFloat(item.Longitude)));
  var lat: any = { lat: 41.878, lng: -87.629 };
  var center_icon:any;
 
  // cityCircle.setMap(this.maps);
//   if(this.type_nearbyVehicle==1){
//    center_icon = {
//     url:'https://maps.gstatic.com/mapfiles/ms2/micons/truck.png',
//     // scaledSize: new google.maps.Size(40, 30), 
//   };
// }else if(this.type_nearbyVehicle==2){
//     center_icon = {
//       url:'assets/imagesnew/red_Marker1.png',
//       // scaledSize: new google.maps.Size(40, 30), 
//     };
//   }else{
if(this.selectedVehcileLtLng?.TripStatus==='Location'){
    center_icon = {
      // url:'assets/images/users/landmark_star.png',
      url:'assets/imagesnew/red_Marker1.png',
      scaledSize: new google.maps.Size(30, 30), 
    };
  }
  else{
       center_icon = {
    url:'https://maps.gstatic.com/mapfiles/ms2/micons/truck.png',
    // scaledSize: new google.maps.Size(40, 30), 
  };
  }
     var marker_center = new google.maps.Marker({
    position: this.polygonCoords1,
    icon: center_icon,
    draggable: false,
    map: this.map1,
    // VehicleId: VehicleId,
    maxZoom: 8,
  });
  this.store_circle_vehicle.push(marker_center);

  
  //    console.log(this.Reminder_list,"reminderlist")


  var  LatLong= `${item?.Latitude},${item?.Longitude}`;

  // ------Start largest Circle --------------------------
  var cityCircle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map: this.map1,
    center: this.polygonCoords1,
    radius: Math.sqrt(2014856) * radius,
    vehicle_number:item?.vehicle_number,
    device_imei:item?.device_imei,
    LatLong:LatLong,
  });
  this.store_circle.push(cityCircle);
  this.Reminder_list=coordinates;
  

  // google.maps.event.addListener(cityCircle, 'click', () => {
  //    console.log(this.Reminder_list,"reminderlist")
  //   // this.modalService.open('REMINDER', { size: 'lg' });
  //   // $('#REMINDER').modal('show');
        
  //        console.log(this.show_summary,"clicked");
  //       //  $("#mapModal").modal('show')
  //       this.show_summary=true
  //       console.log("showsumm",this.show_summary);
        
  //         // if(!this.show_summary)
  //         setTimeout(() => {
  //           this.datatable();
  //         }, 500);
            
      
         
  //   // this.show_vehicle_infowindow(cityCircle);
  //   this.EventControl = true;
  //   this.toogle_circle = true;
  //   // this.table_showReport();

  // });
  google.maps.event.addListener(cityCircle, 'click', async () => {
    console.log("Clicked, checking Reminder_list:", this.Reminder_list);

    this.show_summary = false; // Hide first to force re-render

    // await this.fetchReminderList(); // Fetch data if needed

    console.log("After fetching, Reminder_list:", this.Reminder_list);

    if (this.Reminder_list && this.Reminder_list.length > 0) {
        this.show_summary = true; 
        this.cdr.detectChanges();
        this.datatable(); // Force update UI
    } else {
        console.log("No data found, table not shown.");
    }

    // setTimeout(() => {
       
    // }, 100);

    this.EventControl = true;
    this.toogle_circle = true;
});

  // ------End largest Circle --------------------------
  this.map1.fitBounds(this.latlngbounds);
  var listener = google.maps.event.addListener(this.map1, "idle", () => {
    if (this.map1.getZoom() > 14) this.map1.setZoom(8);
    google.maps.event.removeListener(listener);
  });
  this.Reminder_list=coordinates;
  this.store_circle_allvehicle=[];
  for(var v=0;v<coordinates.length;v++){
    this.for_near(coordinates[v]);
  }
   // ------ End all Vehicle End --------------------------
  
  
    // ------ Start Center circle --------------------------
  var center= new google.maps.Marker({
    position: this.polygonCoords1,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
    },
    draggable: true,
    map: this.maps,
  });
  this.store_circle_vehicle.push(center);
  

}
  // table_showReport() {
  //   throw new Error('Method not implemented.');
  // }
calculateBoundsFromRadius(center: { lat: number, lng: number }, radius: number) {
  const earthRadius = 6371; // Radius of Earth in kilometers
  const angularDistance = radius / earthRadius; // Radius in radians

  // Convert center coordinates to radians
  const lat = (center.lat * Math.PI) / 180;
  const lng = (center.lng * Math.PI) / 180;

  // Calculate bounds
  const minLat = lat - angularDistance;
  const maxLat = lat + angularDistance;
  const minLng = lng - angularDistance / Math.cos(lat);
  const maxLng = lng + angularDistance / Math.cos(lat);

  // Convert back to degrees
  return new H.geo.Rect(
    (minLat * 180) / Math.PI,
    (minLng * 180) / Math.PI,
    (maxLat * 180) / Math.PI,
    (maxLng * 180) / Math.PI
  );
}
// initializeMap(nearbyVehicles, selectedLatLng, radius) {
 
  
//   if (!this.map) {
//     // Initialize HERE map
//     this.defaultLayers = this.platform.createDefaultLayers();

//     this.map = new H.Map(
//       this.mapContainer.nativeElement,
//       this.defaultLayers.vector.normal.map,
//       {
//         center: { lat: selectedLatLng.lat, lng: selectedLatLng.lng },
//         zoom: 10,
//         pixelRatio: window.devicePixelRatio || 1
//       }
//     );

//     const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
//     this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
//   }

//   // Clear existing markers
//   this.map.removeObjects(this.map.getObjects());

//   // Plot nearby vehicles and selected vehicle
//   this.plotMarkers(nearbyVehicles, selectedLatLng);

//   // Add radius circle
//   this.addCircleToMap(selectedLatLng, radius);

//   this.SpinnerService.hide('mapSpinner');
// }

// plotMarkers(nearbyVehicles, selectedLatLng) {
//   console.log("initmap",selectedLatLng);
//   const sourceIcon = new H.map.Icon("../../../../assets/images/users/Polygon.png");
//   const nearbyIcon = new H.map.Icon('assets/images/users/green_Marker1.png');

//   // Add marker for the selected vehicle
//   const selectedMarker = this.addMarker(selectedLatLng, sourceIcon);
//   this.addInfoBubble(selectedMarker, selectedLatLng, { info: 'Selected Vehicle' });

//   // Add markers for nearby vehicles
//   // nearbyVehicles.forEach(vehicle => {
//   //   const coord = { lat: vehicle.lat, lng: vehicle.lng };
//   //   const marker = this.addMarker(coord, nearbyIcon);
//   //   this.addInfoBubble(marker, coord, vehicle);
//   // });
// }

addMarker(coordinate: { lat: number, lng: number }, icon: any) {
  const marker = new H.map.Marker(coordinate, { icon });
  this.map.addObject(marker);
  return marker;
}

// addInfoBubble(marker, coordinate: { lat: number, lng: number }, data: any): void {
//   const bubble = new H.ui.InfoBubble(marker.getGeometry(), {
//     content: `<div>Lat: ${coordinate.lat}, Lng: ${coordinate.lng}<br>Info: ${data.info || 'N/A'}</div>`
//   });
//   this.ui.addBubble(bubble);
// }

addCircleToMap(center: { lat: number, lng: number }, radius: number): void {
  this.map.addObject(new H.map.Circle(
    center,
    radius * 1000, // Convert radius to meters
    {
      style: {
        strokeColor: 'rgba(55, 85, 170, 0.6)', // Perimeter color
        lineWidth: 2,
        fillColor: 'rgba(0, 128, 0, 0.3)'  // Circle fill color
      }
    }
  ));
}

onRouteCategoryChange(val){
  console.log(val);
  if(val)
  {
    this.feederTypes=this.filterObject?.FeederTypes[val]
    // console.log(feederTypes);
  }
  else{
    this.feederTypes={...Object.assign({}, ...Object.values(this.filterObject?.FeederTypes))}
    // console.log(feederTypes);
    
  }
  
  
}

onTransporterSelected(selectedTransporter: string): void {
  console.log(selectedTransporter?.split("(")[0]);
  selectedTransporter=selectedTransporter?.split("(")[0]
  if (selectedTransporter === 'All') {
    // If 'All' is selected, reset the grid filter
    this.gridApi.setFilterModel(null);
  } else {
    // Apply the transporter filter to the grid
    this.gridApi.setFilterModel({
      transporter: {
        type: 'equals',
        filter: selectedTransporter
      }
    });
  }
}

onTripStatusChange(status: string): void {
  console.log(this.tripStatus);
  
}
onFilterSelected(status,col){
 console.log(status);
//  status=selectedTransporter?.split("(")[0]
 if (status === 'All') {
   // If 'All' is selected, reset the grid filter
   this.gridApi.setFilterModel(null);
 } else {
   // Apply the transporter filter to the grid
   if(col=='transporter')
   {
    this.gridApi.setFilterModel({
      transporter: {
        type: 'equals',
        filter: status
      }
    });
   }
   else if(col=='idle')
   {
    {
      this.gridApi.setFilterModel({
        idle: {
          type: 'equals',
          filter: status
        }
      });
   }
  
 }
}
}




show_vehicle_infowindow(marker1: any) {
  this.Status_save_value = [];
  this.Status_save_value = marker1;

  var infowindow = new google.maps.InfoWindow({
    enableEventPropagation: true,
    // content: contents  ,
  });
  var contents: any;

  // this.show=true;
  // this.show = false;

  // this.toggler();

  this.path = 0;
  this.path = marker1.position;
  var val = marker1.VehicleId;
  this.imei_no_show = marker1.ImeiNo;
  this.VehicleCategory = marker1.VehicleCategory;
  // this.DeliveryDoor1 = marker1.DeliveryDoor;
  // this.MainHoleDoor1 = marker1.MainHoleDoor;
  this.image_vehicle = marker1.icon;
  // this.latlong1 = marker1.getPosition();
  // marker1.position
  // this.Weather_forcast();
  this.IMEINO = 0;
  this.vehicle_id = 0;
  this.current = [];
  this.str = 0;

  var current: any;
  // for (var i = 0; i < this.data1.length; i++) {
  //   if (this.data1[i]?.VehicleId == val) {
  //     var temp = this.data1[i];
  //     this.IMEINO = temp.ImeiNo;
  //     this.vehicle_id = temp.VehicleId;
  //     this.str = temp.LatLong;
  //   }
  // }
  //  var temp_array:any=[];
  //  temp_array.push(current);
  //  this.current=temp_array;
  // this.current1 = temp;
  // this.vehicleno_pop = '';
  // this.vehicleno_pop = this.current1.VehicleNo;
  // // this.Driverprofile();

  // this.documentation_wallet();
  // this.Lastlocation();
  //  vehicle_number:item.vehicle_number,
  //   device_imei:item.device_imei,
  this.last_address = [];
  var formData = new FormData();
  formData.append('AccessToken', localStorage.getItem('AccessToken')!);
  formData.append('VehicleId', marker1.vehicle_number);
  formData.append('ImeiNo',marker1.device_imei);
  formData.append('LatLong',marker1.LatLong);

  this.service.addressS(formData).subscribe((res: any) => {
    // alert(res.Status);
    if (res.Status == "Failed") {
      // alert("p");
      localStorage.removeItem('AccessToken');
      // this.router.navigate(['/auth/login']);
    }
    else {
      this.last_address = res.Data;
      this.Address = this.last_address.Address;
      this.DistanceCovered = this.last_address.DistanceCovered;
      this.DistanceFromNearestLandmark = this.last_address.DistanceFromNearestLandmark;
      
    }
   

    // if(this.groupId =='0820'||this.groupId =='5671'){
      contents =
        '<div id="content" >' +
        '<div id="siteNotice">' +
        '<table>' +
        '<tbody>' +

        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Vehicle Name</td>' +
        '<td style="width:1%;color: blue;">:</td>' +
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">' + marker1.vehicle_number + '</td>' +
        '</tr>' +
        
        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Imei No</td>' +
        '<td style="width:1%;color: blue;">:</td>' +
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">' + marker1.device_imei + '</td>' +
        '</tr>' +
        // '<tr>' +
        // '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Name</td>' +
        // '<td style="width:1%;color: blue;">:</td>' +
        // '<td style=" color: blue; white-space: nowrap;font-size: 11px;">' +marker1.DriverName + '</td>' +
        // '</tr>' +
       
        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Speed</td>' +
        '<td style="width:1%;color: blue;">:</td>' +
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">' + this.last_address.Speed + '</td>' +
        '</tr>' +
       
        '<tr>' +
        '<td  style="width:100px ;font-size: 11px;font-weight: 900;font-family:Roboto;">Address</th>' +
        '<td style="width:1%;color: blue;">:</td>' +
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">' + this.Address + '</th>' +
        ' </tr>' +
        
        '<tr>'+
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;"> Distance travelled</td>'+
          '<td style="width:1%;color: blue;">:</td>'+
          '<td style=" color: blue; white-space: nowrap;font-size: 11px;"></td>'+
        '</tr>'+
        
        // '<tr>'+
        //   '<td>Alfreds Futterkiste</td>'+
        //   '<td>'+ marker1.+'</td>'+
        // '</tr>'+
        // '<tr>'+
        //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Distance Covered</td>'+
        //   '<td style="width:1%;color: blue;" >:</td>'+
        //   '<td>'+ marker1.LastHaltTime+'</td>'+

        // '</tr>'+
        // '<tr>'+
        //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Latlng</td>'+
        //   '<td style="width:1%;color: blue;">:</td>'+
        //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ marker1.position+'</td>'+
        // '</tr>'+
      
                  //   '<tr>'+
        //   '<td  style="font-size: 11px;font-weight: 900;font-family:Roboto;width: 111px;">'+marker1.position+'</td>'+
        //   '<td style="width:1%;color: blue;"> </td>'+

        //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;"></td>'+
        // '</tr>'+
        // '</span>'+Temperature_string
        //   '<tr>'+
        '</tbody>' +
        '</table>' +
        '</div>' +
        
      '</div>';

      infowindow.setContent(contents);
      // }

    closeLastOpenedInfoWindow();
    infowindow.open(this.maps, marker1, this.Address);
    this.lastOpenedInfoWindow = 0;
    this.lastOpenedInfoWindow = infowindow;





  })

  // });





  // this.SmallSizeOpenp();

  const closeLastOpenedInfoWindow = () => {
    if (this.lastOpenedInfoWindow) {
      this.lastOpenedInfoWindow.close();
    }
  }
}













// ----------------------------------------------------------------------------------------------------------------------------------------------

// circle(eve:any) {

//   if(eve!=='1'){
   
   
//     this.nearby_LatLong= eve.LatLong;
//     this.code_nearbyVehicle=eve.VehicleNo;
//     this.type_nearbyVehicle=1; 
//   }

//     this.vehiclestore_nearby=[];
//       this.vehiclestore_nearby=res.Vehicles;
//   if (this.store_circle_vehicle.length !== 0) {
//     for (var v = 0; v < this.store_circle_vehicle.length; v++) {
//       this.store_circle_vehicle[v].setMap(null);
//     }
//     for (var v = 0; v < this.store_circle.length; v++) {
//       this.store_circle[v].setMap(null);
//     }
//     for (var v = 0; v < this.store_circle_allvehicle.length; v++) {
//       this.store_circle_allvehicle[v].setMap(null);
//     }
    
//   }
//   this.store_circle = [];
//   this.store_circle_vehicle = [];
//   // var marker = this.Vehicle_list[this.code_nearbyVehicle];
//   this.latlngbounds = new google.maps.LatLngBounds();
//   this.polygonCoords1 = new Array();
//   var coord2 =  this.nearby_LatLong.split(",");
//   this.polygonCoords1 = new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]));
//   this.latlngbounds.extend(new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1])));
//   var lat: any = { lat: 41.878, lng: -87.629 };
//   var center_icon:any;
 
//   // cityCircle.setMap(this.maps);
//   if(this.type_nearbyVehicle==1){
//    center_icon = {
//     url:'https://maps.gstatic.com/mapfiles/ms2/micons/truck.png',
//     // scaledSize: new google.maps.Size(40, 30), 
//   };
// }else if(this.type_nearbyVehicle==2){
//     center_icon = {
//       url:'assets/imagesnew/red_Marker1.png',
//       // scaledSize: new google.maps.Size(40, 30), 
//     };
//   }else{
//     center_icon = {
//       url:'assets/images/users/landmark_star.png',
//       // scaledSize: new google.maps.Size(30, 30), 
//     };
//   }
//      var marker_center = new google.maps.Marker({
//     position: this.polygonCoords1,
//     icon: center_icon,
//     draggable: false,
//     map: this.maps,
//     // VehicleId: VehicleId,
//     maxZoom: 25,
//   });
//   this.store_circle_vehicle.push(marker_center);


//   // ------Start largest Circle --------------------------
//   var cityCircle = new google.maps.Circle({
//     strokeColor: "#FF0000",
//     strokeOpacity: 0.8,
//     strokeWeight: 2,
//     fillColor: "#FF0000",
//     fillOpacity: 0.35,
//     map: this.maps,
//     center: this.polygonCoords1,
//     radius: Math.sqrt(2014856) * this.radius_vehicle_value,
//   });
//   this.store_circle.push(cityCircle);
//   google.maps.event.addListener(cityCircle, 'click', () => {
//     // this.show_vehicle_infowindow(marker1);
//     this.EventControl = true;
//     this.toogle_circle = true;
//     this.table_showReport();

//   });
//   // ------End largest Circle --------------------------
//   this.maps.fitBounds(this.latlngbounds);
//   var listener = google.maps.event.addListener(this.maps, "idle", () => {
//     if (this.maps.getZoom() > 14) this.maps.setZoom(12);
//     google.maps.event.removeListener(listener);
//   });

 


//  // ------Start all Vehicle --------------------------
//  for(var v=0;v<this.vehiclestore_nearby.length;v++){
//   this.for_near(v);
// }
//  // ------ End all Vehicle End --------------------------


//   // ------ Start Center circle --------------------------
// var center= new google.maps.Marker({
//   position: this.polygonCoords1,
//   icon: {
//     path: google.maps.SymbolPath.CIRCLE,
//     scale: 8,
//   },
//   draggable: true,
//   map: this.maps,
// });
// this.store_circle_vehicle.push(center);

// // ------ End Center circle --------------------------
// }
  
table_showReport() {

  setTimeout(() => {


    $(document).ready(() => {


      $('#showReportTable').DataTable({
        pageLength: 5,
        // pageLength: '10',
        // scrollY: '500px',
        pagingType: 'full_numbers',

        // fixedHeader: true,
        // scrollX: true,
        // destroy: true,
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

  }, 80);

}

info_Radius(eve: any) {

  // var id=this.Vehicle_list[eve.VehicleNo];
  // var vehicle_id=id.VehicleId;
   var formData = new FormData();
   formData.append('AccessToken', localStorage.getItem('AccessToken')!);
   formData.append('VehicleId', eve.VehicleNo);
   formData.append('ImeiNo', eve.ImeiNo);
   formData.append('LatLong', eve.LatLong);

   this.service.addressS(formData).subscribe((res: any) => {
     // alert(res.Status);
     if (res.Status == "Failed") {
       // alert("p");
       // localStorage.removeItem('AccessToken');
       // this.router.navigate(['/auth/login']);
     }
     else {
       this.last_address = res.Data;
       this.Address = this.last_address.Address;

     }
  
  

   var infowindow = new google.maps.InfoWindow();
   infowindow.setContent(
     '<div id="siteNotice">' +
     '<table>' +
     '<tbody>' +

     '<tr>' +
     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Vehicle Name</td>' +
     '<td style="width:1%;color: blue;">:</td>' +
     '<td style=" color: blue; white-space: nowrap;font-size: 11px;">' + eve.VehicleNo+ '</td>' +
     '</tr>' +
      '<tr>' +
     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Imei</td>' +
     '<td style="width:1%;color: blue;">:</td>' +
     '<td style=" color: blue; white-space: nowrap;font-size: 11px;">' + eve.ImeiNo + '</td>' +
     '</tr>' +
     '<tr>' +
     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Location</td>' +
     '<td style="width:1%;color: blue;">:</td>' +
     '<td style=" color: blue;font-size: 11px;">' +this.Address + '</td>' +
     '</tr>' +
     '</table>' +
     '</tbody>' + 
     '<div style=" color: blue; white-space: nowrap;font-size: 11px;font-weight: 900;">' +eve.LatLong+ '</div>'+
     '</div >'
     );
   // infowindow.setPosition(event.latLng);
   closeLastOpenedInfoWindow()
   infowindow.open(this.maps, eve);
   this.infowindow_near=0;
   this.infowindow_near=infowindow;
  
 });
 const closeLastOpenedInfoWindow = () => {
   if (this.infowindow_near) {
    
    //  this.infowindow_near.close();
   }
 }
 }
for_near(v:any){
  console.log("near by vehicle details",v)
 this.polygonCoords1_nearby = new Array();
//  var coord2 = this.vehiclestore_nearby[v].LatLong.split(",");
 this.polygonCoords1_nearby = new google.maps.LatLng(parseFloat(v.Latitude), parseFloat(v.Longitude));
 // this.latlngbounds.extend(new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1])));

var VehicleNo= v?.vehicle_number;
//  var Distance=  v?.Distance;
var  LatLong= `${v?.Latitude},${v?.Longitude}`;
var  ImeiNo= v?.device_imei;
var icon1 = {
 url:'https://maps.gstatic.com/mapfiles/ms2/micons/truck.png',
 // scaledSize: new google.maps.Size(40, 30), 
};
    
 var marker_near= new google.maps.Marker({
   position: this.polygonCoords1_nearby,
   icon: icon1,
   draggable: false,
   map: this.map1,
   VehicleNo:VehicleNo,
  //  Distance:Distance,
   LatLong:LatLong,
   ImeiNo:ImeiNo,
   maxZoom: 8,
 });
 this.store_circle_allvehicle.push(marker_near);

 google.maps.event.addListener(marker_near ,'click', () => {
   this.info_Radius(marker_near);
 });
//  const element: any = document.getElementById(v?.vehicle_number);
// element.addEventListener('click', () => {
            
//             this.triggerMarkerClick(v?.vehicle_number);
//           });
}

triggerMarkerClick(markerId) {
  console.log(markerId);
  const marker = this.store_circle_allvehicle.find((m) => m.VehicleNo === markerId);
  console.log(marker);
  if (marker) {
    alert(0)
      google.maps.event.trigger(marker, 'click');
  }
}
 radius_vehicle(eve: any) {
   this.radius_vehicle_value = '';
   this.radius_vehicle_value = eve.target.value;
 }
Nearby_change(code: any, event: any,LatLong:any) {

this.nearby_LatLong=LatLong;
this.code_nearbyVehicle=code;
this.type_nearbyVehicle=event; 

 }

//  changeMaxspeed_submit(){
//    this.submitDoc=true;
//    if( this.change_MaxSpeed.status=='VALID'){

//      // this.SpinnerService.show('spinner-3');
//    var formData = new FormData();
//    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
//    formData.append('VehicleId', this.vehicle_id);
//    formData.append('MaxSpeed', this.change_MaxSpeed.value.maxspeed);

//    this.service.updateVehicleInfo(formData).subscribe((res: any) => {
   
//      if (res.Status == "Failed") {
//        // alert("p");
//        localStorage.removeItem('AccessToken');
//        this.router.navigate(['/auth/login']);
//      }else{
//        // setTimeout(() => {
//        this.List_vehicle();
//      // }, 5000);
//        alert(res.Message);
//        this.submitDoc=false;
//        this.close13();
//        this.show = true;
//         for(var i=0;i<this.temp_markerarray.length;i++){
//          this.temp_markerarray[i].setMap(null);
//         } 
        
//         for(var i=0;i<this.trackLine.length;i++){
//          this.trackLine[i].setMap(null);
//         } 
//        //  this.
    
       
//      }
//    })
//  }
//  }


 
// nearbyCategory(eve: any) {
//   this.Near_category = 0;
//   var value = eve.target.value;
//   this.Near_category = value;

// }



// regionnear_byvehicle(vehicleid: any, vehicleno: any, ImeiNo: any) {
//   this.vehicleno_near = '';
//   this.vehicleno_near = vehicleno;

// }


closeMap(){
  this.show_summary=false
}





}


