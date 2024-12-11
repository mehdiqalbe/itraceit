import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NavService } from 'src/app/shared/services/nav.service';
import * as echarts from 'echarts';

declare var $: any;
declare var H: any;

@Component({
  selector: 'app-transporter',
  templateUrl: './transporter.component.html',
  styleUrls: ['./transporter.component.scss']
})
export class TransporterComponent implements OnInit {

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @ViewChild('mapModal') mapModal: any;
  token: any;
  group_id: any;
  account_id: any;
  show_hover: boolean = false;
  Object = Object;

  map: any;
  platform: any;
  defaultLayers: any;
   trackingData:any;
  constructor(
    private fb: FormBuilder,
    private navServices: NavService,
    private modalService: NgbModal,
    private router: Router,
    private service: CrudService,
    private SpinnerService: NgxSpinnerService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    const App = document.querySelector('.app');
    App?.classList.add('sidenav-toggled');

    this.token = localStorage.getItem('AccessToken')!;
    this.account_id = localStorage.getItem('AccountId')!;
    this.platform = new H.service.Platform({
      apikey: 'MoBysY-1fH4koFS2rGUDpwvRHSLfdX4GWYsRJUlB8VY'
    });
    // this.initializeMap();
  }
  // openMapModal() {
  //   // Open the modal and initialize the map after the modal is opened
  //   this.modalService.open(this.mapModal, { size: 'lg' }).result.then(() => {}, () => {});
  //   setTimeout(() => this.initializeMap(), 100); // Slight delay to ensure modal is rendered
  // }
  // openMapModal() {
  //   // Use setTimeout to allow the modal to render before initializing the map
  //   console.log("modal");
    
  //   setTimeout(() => {
  //     this.initializeMap();
  //   }, 500); // Delay to ensure modal is rendered
  // }
  openMapModal() {
    
    $('#mapModal').modal('show'); // Open modal using jQuery

    // Call the tracking function
    this.vehicleTrackF();
  }
  vehicleTrackF() {
    // this.loading = true; // Set loading to true when API call starts

    const currentDateTime = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // To use 24-hour format
    }).replace(',', '');

  
    const formData = new FormData();
    formData.append('AccessToken', '4AEFl63KC98HNRD86c33i1L')
    formData.append('startdate', '2024-11-05 22:19:59');
    formData.append('enddate', currentDateTime);
    formData.append('time_interval', '60');
    formData.append('imei', 'MH04KU6889');
    formData.append('group_id', '0041');
    formData.append('AccountId', '5659');
    
    this.service.vehicleTrackongS(formData).subscribe((res: any) => {
      console.log("Response:", res);
     
      
      if (res.Status === 'success' && Array.isArray(res.data) && res.data.length > 0) {
        // Extract coordinates from the data array
        const coordinates = res.data.map(location => ({
          lat: location.lat, // Use the correct key for latitude
          lng: location.long  // Use the correct key for longitude
        }));
        this.trackingData=res?.data
           console.log(coordinates);
           
        // Initialize the map with the coordinates
        this.initializeMap(coordinates);
      } else {
        console.log('No valid locations found in the response.');
      }
    }, error => {
     
      console.error('Error fetching vehicle tracking data:', error);
    });
  }
  // initializeMap(coordinates: { lat: number, lng: number }[]) {
  //   // Initialize the HERE Map platform
  //   if (!this.map) {
  //     this.defaultLayers = this.platform.createDefaultLayers();
  
  //     // Initialize the map centered over the first coordinate or a default location
  //     const initialCenter = coordinates.length > 0 ? coordinates[0] : { lat: 50, lng: 5 };
  //     this.map = new H.Map(
  //       this.mapContainer.nativeElement,
  //       this.defaultLayers.vector.normal.map,
  //       {
  //         center: initialCenter,
  //         zoom: 14,
  //         pixelRatio: window.devicePixelRatio || 1
  //       }
  //     );
  
  //     // Make the map interactive
  //     const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
  //     H.ui.UI.createDefault(this.map, this.defaultLayers);
  //   }
  
  //   // Clear existing markers
  //   this.map.removeObjects(this.map.getObjects());
  
  //   // Check if there are coordinates
  //   if (coordinates.length > 0) {
  //     // Initialize bounds using the first coordinate
  //     let swLat = coordinates[0].lat; // southwest latitude
  //     let swLng = coordinates[0].lng; // southwest longitude
  //     let neLat = coordinates[0].lat; // northeast latitude
  //     let neLng = coordinates[0].lng; // northeast longitude
  
  //     // Create markers and adjust bounds
  //     coordinates.forEach(coord => {
  //       const marker = new H.map.Marker(coord);
  //       this.map.addObject(marker);
  
  //       // Update bounds
  //       swLat = Math.min(swLat, coord.lat);
  //       swLng = Math.min(swLng, coord.lng);
  //       neLat = Math.max(neLat, coord.lat);
  //       neLng = Math.max(neLng, coord.lng);
  //     });
  
  //     // Create bounds with updated southwest and northeast points
  //     const bounds = new H.geo.Rect(swLat, swLng, neLat, neLng);
  //     this.map.setViewBounds(bounds);
  //   }
  // }
  ui:any=''
  initializeMap(coordinates: { lat: number, lng: number }[]) {
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
          center: coordinates.length > 0 ? coordinates[0] : { lat: 50, lng: 5 },
          zoom: 14,
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
    const sourceIcon = new H.map.Icon('assets/images/users/start_marker.png');
        const destinationIcon = new H.map.Icon('assets/images/users/stop_marker.png');
        const intermediateIcon = new H.map.Icon('assets/images/users/green_Marker1.png');

    let bounds = new H.geo.Rect(coordinates[0].lat, coordinates[0].lng, coordinates[0].lat, coordinates[0].lng);
  // Create an icon, an object holding the latitude and longitude, and a marker:
  // var icon = new H.map.Icon(svgMarkup)
      // Create markers and update bounds
      coordinates.forEach((coord,index) => {
        const icon = index === 0 ? sourceIcon : (index === coordinates.length - 1 ? destinationIcon : intermediateIcon);
        this.addMarker(coord, icon);

        // Expand the bounds to include each coordinate
        bounds = bounds.mergePoint(coord);

        // Add marker using the helper function
       const marker= this.addMarker(coord, icon);

        this.addInfoBubble(marker, coord,this.trackingData[index]);
      
     
        // // Update bounds
        // swLat = Math.min(swLat, coord.lat);
        // swLng = Math.min(swLng, coord.lng);
        // neLat = Math.max(neLat, coord.lat);
        // neLng = Math.max(neLng, coord.lng);
      });
      // Create bounds with updated southwest and northeast points
      // const bounds = new H.geo.Rect(swLat, swLng, neLat, neLng);
      this.addPolyline(coordinates);
      
      // Use setLookAtData to center and zoom the map to the bounds
      this.map.getViewModel().setLookAtData({
        bounds: bounds
      });
    }
  }
  
  createIcon(color: string, size: number): any {
    const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="${size}" height="${size}">
        <path fill="${color}" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
    </svg>`;
    return new H.map.Icon(svgMarkup);
}
addInfoBubble(marker: any, coord: { lat: number, lng: number },trackingData): void {
  marker.addEventListener('tap', async (evt) => {
    // Close existing bubbles
    this.ui.getBubbles().forEach((existingBubble: any) => {
      existingBubble.close();
    });

    // Prepare form data for the API request
    const formData = new FormData();
    formData.append('AccessToken', 'wkG63371A10h0KxtTFSmlWi');
    formData.append('VehicleId', 'MH04KU6889');
    formData.append('ImeiNo', 'MH04KU6889');
    formData.append('LatLong', `${coord.lat},${coord.lng}`);

    try {
      // Fetch data from the API
      const res: any = await this.service.addressS(formData).toPromise();
      const address = res?.Data?.Address;

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

// addInfoBubble(marker:any, coord: { lat: number, lng: number }, label: string): void {
//   // const bubble = new H.ui.InfoBubble(coord, {
//   //   content: `<div><strong>${label}</strong></div><p>Coordinates: ${coord.lat}, ${coord.lng}</p>`
//   // });

//   // Add an event listener to open the bubble when the marker is tapped
//   marker.addEventListener('tap', (evt) => {
//     // Always close existing bubbles before opening a new one
//     this.ui.getBubbles().forEach((existingBubble: any) => {
//       existingBubble.close();
//     });
//     // var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
//     //   // read custom data
//     //   content: `<div><strong>${label}</strong></div><p>Coordinates: ${coord.lat}, ${coord.lng}</p>`
//     // });
//     const bubble = new H.ui.InfoBubble(coord, {
//       content: `<div><strong>${label}</strong></div><p>Coordinates: ${coord.lat}, ${coord.lng}</p>`
//     });
//     // Open the InfoBubble
//     this.ui.addBubble(bubble); // Open the new bubble
//   },false);
// }







// Function to add a marker at a given coordinate with a specified icon
addMarker(coordinate: { lat: number, lng: number }, icon:any): void {
    const marker = new H.map.Marker(coordinate, { icon });
    this.map.addObject(marker);
    return marker
}
createBubble(data,add,vnumber) {
  // var add:any
 
  // console.log('show window of vehicle information', data, add)
  /////////////////////////address api////////////////////////////////////////////////////



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////  

return  '<table style="line-height: 16px; border:none !important">' +
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

addPolyline(coordinates: { lat: number, lng: number }[]): void {
  const lineString = new H.geo.LineString();
  coordinates.forEach(coord => lineString.pushPoint(coord));
  const polyline = new H.map.Polyline(lineString, {
      style: { strokeColor: '#6334d8', lineWidth: 4 }
  });
  this.map.addObject(polyline);
}
  moveMapToBerlin() {
    this.map.setCenter({ lat: 52.5159, lng: 13.3777 });
    this.map.setZoom(14);
  }

  sidebarToggle() {
    const App = document.querySelector('.app');
    if ((this.navServices.collapseSidebar = !this.navServices.collapseSidebar)) {
      App?.classList.remove('sidenav-toggled');
    } else {
      App?.classList.add('sidenav-toggled');
    }
  }
}
