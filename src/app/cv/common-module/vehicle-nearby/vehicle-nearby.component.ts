import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NavService } from 'src/app/shared/services/nav.service';
import { CommonModuleService } from '../services/common-module.service';
declare const agGrid: any;
declare const pdfMake: any;
declare var $: any;
declare var H: any;
@Component({
  selector: 'app-vehicle-nearby',
  templateUrl: './vehicle-nearby.component.html',
  styleUrls: ['./vehicle-nearby.component.scss']
})
export class VehicleNearbyComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
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
  group_id: any;
  account_id: any;
  filterObject: any = {
    tripStatus: {},
    tripType: {},
    transporter: {}
  };
  vehicleData:any;
  selectedVehcileLtLng: any;
  selectedSearchEvent: any;
  locationData: any;
  columnApi: any;
  constructor(
    private navServices: NavService,
    private SpinnerService: NgxSpinnerService,
    private service:CrudService,
    private commonModuleService:CommonModuleService,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.token=localStorage.getItem('AccessToken')
    this.platform = new H.service.Platform({
      apikey: 'vQTBCs4xOBkG-mSZlCymIb0G-Jj2TF2pO_p7e9Lc90o',
    });
    this.initApi()
    this.loadVehicles()
 
    this.initializeGrid();
   
    this.sidebarToggle();
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

  loadVehicles(): void {
    this.http.get('../../../../assets/vehicle.json').subscribe(
      (data:any) => {
        this.vehicleData=data?.Data
        console.log("vehicle data",this.vehicleData);
         this.loadData()
      },
      (error) => {
        console.error('Error loading vehicle data:', error);
      }
    );
  }

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
        width: 75,
      },
      {
        headerName: 'Vehicle',
        field: 'vehicles',
        sortable: true,
        filter: true,
        floatingFilter: false,
      },
      {
        headerName: 'Vehicle Status',
        field: 'vehicleStatus',
        sortable: true,
        filter: true,
        floatingFilter: false,
      },
      // {
      //   headerName: 'Close Date',
      //   field: 'closeDate',
      //   sortable: true,
      //   filter: true,
      //   floatingFilter: false,
      // },
      {
        headerName: 'Distance Radius',
        field: 'distanceRadius',
        sortable: true,
        filter: true,
        floatingFilter: false,
      },
      {
        headerName: 'Driver Details',
        field: 'driverDetails',
        sortable: true,
        filter: true,
        floatingFilter: false,
      },
      {
        headerName: 'Transporter',
        field: 'transporter',
        sortable: true,
        filter: true,
        floatingFilter: false,
      },
      {
        headerName: 'GPS Provider',
        field: 'gpsProvider',
        sortable: true,
        filter: true,
        floatingFilter: false,
      },
      {
        headerName: 'Last Data',
        field: 'lastData',
        sortable: true,
        filter: true,
        floatingFilter: false,
      },
      {
        headerName: 'Nearby Count & Map View',
        field: 'nearbyCountMapView',
        sortable: true,
        filter: true,
        floatingFilter: false,
        cellRenderer: (params) =>
          this.createClickableCell(params, this.showMapView),
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
        editable: true,
        filter: true,
        // flex: 1,
        autoSizeStrategy: {
          type: 'fitCellContents',
        },
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
        vehicleStatus: item.vehicle_number ? "Active" : "Inactive",
        // closeDate: "", // No close date in provided data
        distanceRadius: "", // No distance radius in provided data
        driverDetails: `${item?.DriverName}/${item?.DriverMobile}`,
        transporter: item.Transporter || "N/A",
        gpsProvider: item.gps_vendor_name || "N/A",
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
    this.gridApi!.exportDataAsCsv();
  }
  /**
   * Callback when a cell is clicked
   */
  onCellClicked(event: any): void {
    console.log('Cell clicked:', event);
  }

  /**
   * Create a clickable cell content
   */
  createClickableCell(params: any, callback: Function): HTMLElement {
    const element = document.createElement('span');
    element.innerText = params.value;
    element.style.cursor = 'pointer';
    element.style.color = 'blue';
    element.addEventListener('click', () => callback(params.data));
    return element;
  }

  /**
   * Action for showing map view
   */
  showMapView(data: any): void {
    console.log('Map view clicked for:', data);
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
    console.log(val);
    let formData = new FormData();
    formData.append("AccessToken",this.token)
    formData.append('TripStatus', val?.tripStatus);
    formData.append('FeederType', val?.tripType);
    formData.append('Transporter', val?.transporter);

    console.log(formData);

    this.SpinnerService.show('tableSpinner');
    this.commonModuleService.nearbyVehicleFilter(formData).subscribe(
      (res: any) => {
        console.log('specificDashboard', res);

        if (res?.Status == 'success') {
       
            this.vehicleData=res?.Data
            console.log("vehicle data",this.vehicleData);
             this.loadData()

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



  openMapModal(item,filterForm) {
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
    this.SpinnerService.show('mapSpinner')
    // Call the tracking function
    this.vehicleTrackF(nearbyVehicles,radius);
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
          this.initializeMap(nearbyVehicles, this.selectedVehcileLtLng, radius);
        }, 2000); 
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


initializeMap(coordinates,item,radius) {
  console.log("initMap",coordinates,item,radius);
  
  if (!this.map) {
    // Initialize HERE map platform and default layers
    // const platform = new H.service.Platform({
    //   apikey: 'your-api-key' // Replace with your actual API key
    // });
    this.defaultLayers = this.platform.createDefaultLayers();

    // Create the map
    this.map = new H.Map(
      this.mapContainer.nativeElement,
      this.defaultLayers.vector.normal.map,
      {
        center:   { lat: 17.6732, lng: 78.4977 },
        zoom: 6,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    // Make the map interactive
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui=H.ui.UI.createDefault(this.map, this.defaultLayers);
  }

  // Clear existing markers
  this.map.removeObjects(this.map.getObjects());

  // Check if there are coordinates
  if (coordinates.length > 0) {
  // Create icons for source, destination, and intermediate points
  let swLat = this.normalizeCoordinate(coordinates[0]?.Latitude)
  let swLng = this.normalizeCoordinate(coordinates[0]?.Longitude)
  let neLat = this.normalizeCoordinate(coordinates[0]?.Latitude)
  let neLng = this.normalizeCoordinate(coordinates[0]?.Longitude)
  console.log("SW",swLat,swLng,neLat,neLng);
  
  function iconFn(color){
    return `<svg width="40" height="40" viewBox="0 0 40 40" fill='${color}' xmlns="http://www.w3.org/2000/svg">
    <path d="M2.25706 28.4622C1.58948 29.0343 1.13085 29.8382 0.994575 30.751H0.454183C0.204379 30.751 0 30.5467 0 30.2969V28.9163C0 28.6665 0.204314 28.4622 0.454183 28.4622L2.25706 28.4622ZM7.46137 30.751C7.49771 30.928 7.51588 31.1051 7.51588 31.2914C7.51588 32.849 6.2534 34.116 4.69118 34.116C3.13353 34.116 1.86647 32.849 1.86647 31.2914C1.86647 31.1051 1.88458 30.928 1.92092 30.751C2.17065 29.4475 3.3151 28.4621 4.69111 28.4621C6.06712 28.4621 7.21614 29.4475 7.46137 30.751ZM6.10353 31.2914C6.10353 31.1007 6.06726 30.9144 5.99458 30.751C5.78569 30.2378 5.28157 29.879 4.69124 29.879C4.10085 29.879 3.5968 30.2378 3.38784 30.751C3.31516 30.9144 3.27889 31.1007 3.27889 31.2914C3.27889 32.0679 3.91013 32.7037 4.69124 32.7037C5.47235 32.7037 6.10353 32.0679 6.10353 31.2914ZM1.11804 26.6502V13.1124C1.11804 12.36 1.72804 11.75 2.48046 11.75H24.188C24.9405 11.75 25.5504 12.36 25.5504 13.1124V26.6502C25.5504 26.8999 25.3461 27.1043 25.0963 27.1043H1.57222C1.32242 27.1043 1.11804 26.8999 1.11804 26.6502ZM22.2533 25.1218C22.2533 25.3374 22.4281 25.5122 22.6437 25.5122H22.6559C22.8714 25.5122 23.0462 25.3374 23.0462 25.1218V13.8889C23.0462 13.6733 22.8714 13.4986 22.6559 13.4986H22.6437C22.4281 13.4986 22.2533 13.6733 22.2533 13.8889V25.1218ZM18.5826 25.1218C18.5826 25.3374 18.7573 25.5122 18.9729 25.5122H18.985C19.2007 25.5122 19.3754 25.3374 19.3754 25.1218V13.8889C19.3754 13.6733 19.2007 13.4986 18.985 13.4986H18.9729C18.7573 13.4986 18.5826 13.6733 18.5826 13.8889V25.1218ZM14.9118 25.1218C14.9118 25.3374 15.0866 25.5122 15.3022 25.5122H15.3143C15.5299 25.5122 15.7046 25.3374 15.7046 25.1218V13.8889C15.7046 13.6733 15.5299 13.4986 15.3143 13.4986H15.3022C15.0866 13.4986 14.9118 13.6733 14.9118 13.8889V25.1218ZM11.2412 25.1218C11.2412 25.3374 11.4159 25.5122 11.6315 25.5122H11.6437C11.8592 25.5122 12.034 25.3374 12.034 25.1218V13.8889C12.034 13.6733 11.8592 13.4986 11.6437 13.4986H11.6315C11.4159 13.4986 11.2412 13.6733 11.2412 13.8889V25.1218ZM7.57046 25.1218C7.57046 25.3374 7.74516 25.5122 7.96078 25.5122H7.97294C8.1885 25.5122 8.3632 25.3374 8.3632 25.1218V13.8889C8.3632 13.6733 8.1885 13.4986 7.97294 13.4986H7.96078C7.74516 13.4986 7.57046 13.6733 7.57046 13.8889V25.1218ZM3.89974 25.1218C3.89974 25.3374 4.07451 25.5122 4.29007 25.5122H4.30222C4.51784 25.5122 4.69255 25.3374 4.69255 25.1218V13.8889C4.69255 13.6733 4.51784 13.4986 4.30222 13.4986H4.29007C4.07451 13.4986 3.89974 13.6733 3.89974 13.8889V25.1218ZM14.4324 30.751C14.4687 30.928 14.4869 31.1051 14.4869 31.2914C14.4869 32.849 13.2244 34.116 11.6622 34.116C10.1044 34.116 8.83745 32.849 8.83745 31.2914C8.83745 31.1051 8.85562 30.928 8.8919 30.751C9.1417 29.4475 10.2861 28.4621 11.6622 28.4621C13.0382 28.4621 14.1871 29.4475 14.4324 30.751ZM13.0745 31.2914C13.0745 31.1007 13.0382 30.9144 12.9701 30.751C12.7566 30.2378 12.2525 29.879 11.6622 29.879C11.0718 29.879 10.5676 30.2378 10.3542 30.751C10.2861 30.9144 10.2498 31.1007 10.2498 31.2914C10.2498 32.0679 10.881 32.7037 11.6622 32.7037C12.4433 32.7037 13.0745 32.0679 13.0745 31.2914ZM9.22797 28.4622H7.12542C7.58863 28.8617 7.95647 29.3749 8.17902 29.9562C8.39693 29.375 8.76477 28.8617 9.22797 28.4622ZM40 28.9162V30.2968C40 30.5466 39.7956 30.751 39.5459 30.751H35.8675C35.6041 28.948 34.0554 27.5539 32.1799 27.5539C30.3043 27.5539 28.7512 28.948 28.4878 30.751H15.3588C15.2225 29.8381 14.7639 29.0343 14.0963 28.4621H26.8484V15.4739C26.8484 14.9743 27.2525 14.5656 27.7566 14.5656H32.0437C33.2516 14.5656 34.3779 15.1651 35.0544 16.1642L37.8201 20.2605C38.2243 20.8599 38.4423 21.5684 38.4423 22.2904V28.4621H39.5458C39.7956 28.4622 40 28.6664 40 28.9162ZM35.3951 20.3649L33.1835 17.2223C33.0972 17.1042 32.961 17.0316 32.8111 17.0316H29.3643C29.1146 17.0316 28.9101 17.2359 28.9101 17.4858V20.6238C28.9101 20.8781 29.1146 21.0779 29.3643 21.0779H35.0227C35.3907 21.0779 35.604 20.6646 35.3951 20.3649ZM35.0045 31.2914C35.0045 32.849 33.7375 34.116 32.1798 34.116C30.6176 34.116 29.3551 32.849 29.3551 31.2914C29.3551 29.7292 30.6176 28.4622 32.1798 28.4622C33.7376 28.4622 35.0045 29.7291 35.0045 31.2914ZM33.5922 31.2914C33.5922 30.5103 32.961 29.879 32.1799 29.879C31.3988 29.879 30.7675 30.5103 30.7675 31.2914C30.7675 32.0679 31.3988 32.7037 32.1799 32.7037C32.961 32.7037 33.5922 32.0679 33.5922 31.2914Z"  fill="${color}"/>
    </svg>`
  }
    
  const sourceIcon = new H.map.Icon(iconFn('green'));
      const destinationIcon = new H.map.Icon(iconFn('#1D4380'));
      const intermediateIcon = new H.map.Icon(iconFn('#1D4380'));

  let bounds = new H.geo.Rect(this.normalizeCoordinate(coordinates[0]?.Latitude),
  this.normalizeCoordinate(coordinates[0]?.Longitude), 
  this.normalizeCoordinate(coordinates[0]?.Latitude), 
  this.normalizeCoordinate(coordinates[0]?.Longitude));
  
// Create an icon, an object holding the latitude and longitude, and a marker:
// var icon = new H.map.Icon(svgMarkup)
    // Create markers and update bounds
    coordinates.forEach((coord,index) => {
      const icon = index === 0 ? sourceIcon : (index === coordinates.length - 1 ? destinationIcon : intermediateIcon);
      // this.addMarker(coord, icon);

    const latlong={lat:coord?.Latitude,lng:coord?.Longitude}

      // Add marker using the helper function
     const marker= this.addMarker(latlong, icon);
     console.log("SW1",swLat,swLng,neLat,neLng);
      this.addInfoBubble(marker, latlong,this.trackingData[index]);
            // // Update bounds
            swLat = Math.min(swLat, coord.Latitude);
            swLng = Math.min(swLng, coord.Longitude);
            neLat = Math.max(neLat, coord.Latitude);
            neLng = Math.max(neLng, coord.Longitude);
     // Expand the bounds to include each coordinate
     const padding = 0.01;
     bounds = this.calculateBoundsFromRadius({ lat: 17.6732, lng: 78.4977 },radius);
     bounds = bounds.mergePoint(latlong);

    });
console.log("below info bubble");

    // Create bounds with updated southwest and northeast points
    // const bounds = new H.geo.Rect(swLat, swLng, neLat, neLng);

    // this.addPolyline(coordinates);

   

    // Use setLookAtData to center and zoom the map to the bounds
    this.map.getViewModel().setLookAtData({
      bounds: bounds
    });
    this.addCircleToMap({ lat: 17.6732, lng: 78.4977 },radius);
  }
  this.SpinnerService.hide('mapSpinner')
}

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

plotMarkers(nearbyVehicles, selectedLatLng) {
  console.log("initmap",selectedLatLng);
  const sourceIcon = new H.map.Icon('assets/images/users/start_marker.png');
  const nearbyIcon = new H.map.Icon('assets/images/users/green_Marker1.png');

  // Add marker for the selected vehicle
  const selectedMarker = this.addMarker(selectedLatLng, sourceIcon);
  this.addInfoBubble(selectedMarker, selectedLatLng, { info: 'Selected Vehicle' });

  // Add markers for nearby vehicles
  // nearbyVehicles.forEach(vehicle => {
  //   const coord = { lat: vehicle.lat, lng: vehicle.lng };
  //   const marker = this.addMarker(coord, nearbyIcon);
  //   this.addInfoBubble(marker, coord, vehicle);
  // });
}

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

}


