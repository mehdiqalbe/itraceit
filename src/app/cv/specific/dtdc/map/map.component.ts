import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavService } from 'src/app/shared/services/nav.service';
import { DtdcService } from '../services/dtdc.service';
import { CrudService } from 'src/app/shared/services/crud.service';
declare var $: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map1: any;
  header_text: any;
  colors: any;
  demomarker: any=[];
  demoPolyline: any=[];
  trackingData: any=[];
  customer_info: any=[];
  marker: any=[];
  poly_line: any=[];
  map_flag: any;
  token: any;
  group_id: any;
  account_id: any;
  contentsInfo: string | Node | undefined;
  lastOpenedInfoWindow: any;
  vehicle_data: any;

  constructor(private route: ActivatedRoute,private router: Router,private navServices: NavService,private dtdcService:DtdcService,private CrudService: CrudService, private SpinnerService: NgxSpinnerService, private datepipe: DatePipe) {
    // this.vehicle_data= this.router.getCurrentNavigation()?.extras.state;
    // console.log(this.vehicle_data)
   }


  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['state']) {
        try {
          this.vehicle_data = JSON.parse(decodeURIComponent(params['state']));
          console.log(this.vehicle_data); // Access the state data here
        } catch (error) {
          console.error('Error parsing state data:', error);
        }
      } else {
        console.error('No state data found in query parameters');
      }
    });
  
      this.initMap1(); 
      this.token=localStorage.getItem('AccessToken')!;
      var item:any=this.vehicle_data.structuredata;
      console.log('item,',item)
      this.vehicleTrackF_new(item.imei, item.imei2, item.imei3,item.run_date, item.vehicle_no, item.item, item.Id, item.route_id)
     
  }
  initMap1() 
 {
   const center = { lat: 23.2599, lng: 77.4126 };
   this.map1 = new google.maps.Map(document.getElementById('map-1') as HTMLElement, {
     zoom: 4,
      center: center,
     mapTypeId: google.maps.MapTypeId.ROADMAP,
     scaleControl: true,
   }
   );   
 }


async vehicleTrackF_new(imei, imei2, imei3, run_date, vehicle_no, item, Id, route_id) {
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
  // this.SpinnerService.show("tracking");

  // Define the array of IMEIs to process
  // const imeis = [imei,imei2,imei3];
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
  

      formData.append('AccessToken', this.token);
      formData.append('startdate', run_date);
      formData.append('enddate', currentDateTime);
      formData.append('time_interval', '120');
      formData.append('imei', imei);
      formData.append('group_id', this.group_id);
      formData.append('AccountId', this.account_id);

      // Log form data for debugging
      formData.forEach((value, key) => {
        console.log("formdata...", key, value);
      });

      // try {
        // Wait for the API response
        const res: any = await this.CrudService.vehicleTrackongS(formData).toPromise();
        console.log("tracking res", res);
        this.SpinnerService.hide("tracking");
        if (res.Status === "failed") {
          alert(res?.Message);
        }
        this.trackingData = res.data;
        if (res.data === 'Vehicle is inactive.') {
          alert("Track data is not available");
        } else {
          console.log("trackingData", this.trackingData);
          // Add markers and polyline data
          this.addMarkersAndPolyline1(imei, vehicle_no);
         
          this.fetchCustomerInfo(Id);
        }
      // Hide the tracking spinner after the API call
      this.SpinnerService.hide("tracking");
    }
  }
} 
 }
  clearMarkersAndPolylines() {
    // throw new Error('Method not implemented.');
  }
fetchCustomerInfo(Id: string) {
  this.customer_info = []
  const markers: google.maps.Marker[] = [];
  const formdataCustomer = new FormData();
  formdataCustomer.append('AccessToken', this.token);
  formdataCustomer.append('forGroup', this.group_id);
  formdataCustomer.append('id', Id);

  this.CrudService.tripCustomerS(formdataCustomer).subscribe((res: any) => {
    console.log(res)
    if(res.status=='success'){
      if(res.customer_info!==null){
    this.customer_info = res.customer_info;

    // Log the customer data for debugging
    console.log("Customer Info:", this.customer_info);
    //  if(this.customer_info!==null){
    this.customer_info.forEach((customer, index) => {
      // Log SequenceNo to check its value
      console.log("Customer SequenceNo:", customer.SequenceNo);

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
  handleCustomerMarkerClick(event: any, index: any): void {
    throw new Error('Method not implemented.');
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
