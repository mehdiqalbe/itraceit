import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavService } from 'src/app/shared/services/nav.service';
import { DtdcService } from '../services/dtdc.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import * as XLSX from 'xlsx';
// import 'ag-grid-enterprise';
// import { Console } from 'console';
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
declare var LZString:any;

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
  rowData_popup: any=[];
  gridOptions_popup: any=[];
  columnDefs_popup: any=[];
  gridApi_popup: any;
  flag: any;
  headerName: any;
  rowData: any;

  constructor(private route: ActivatedRoute,private router: Router,private navServices: NavService,private dtdcService:DtdcService,private CrudService: CrudService, private SpinnerService: NgxSpinnerService, private datepipe: DatePipe) {
    // this.vehicle_data= this.router.getCurrentNavigation()?.extras.state;
    // this.rowData_popup=this.vehicle_data.structuredata.rowData_popup;
    // this.flag=this.vehicle_data.structuredata.flag;
    // this.headerName=this.vehicle_data.structuredata.name;
   }

   ngAfterViewInit(): void {  // Ensure this method is properly implemented
    this.makeModalDraggable();
  }
  ngOnInit(): void {
    const storedData = sessionStorage.getItem('structuredata');
    // console.log(storedData)
    const decompressedData = JSON.parse(LZString.decompressFromUTF16(storedData));

// Output the decompressed data
// console.log(decompressedData);
this.rowData_popup=decompressedData.rowData_popup;
this.flag=decompressedData.flag;
this.headerName=decompressedData.name;
      this.token=localStorage.getItem('AccessToken')!;
      // var item:any=this.vehicle_data.structuredata;
      this.SpinnerService.show();
      console.log(this.flag)
      setTimeout(() => {
        if(this.flag==0){
        
      this.Detail();}
      else{
      // alert(0)
        this.Detail1(); 
      }

      }, 500);
      this.initMap1()
      // this.vehicleTrackF_new(item.imei, item.imei2, item.imei3,item.run_date, item.vehicle_no, item.item, item.Id, item.route_id)
     
  }
  initMap1() 
 {
   const center = { lat: 23.2599, lng: 77.4126 };
   this.map1 = new google.maps.Map(document.getElementById('map1') as HTMLElement, {
     zoom: 7,
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
  $('#v_track_Modal').modal('show');

// this.makeModalDraggable();
  this.initMap1();
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
      formData.append('portal', 'itraceit');
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
          this.router.navigate([`/auth/login`]);
        }
        this.trackingData = res.data;
        if (res.data === 'Vehicle is inactive.') {
          alert("Track data is not available");
        } else {
          console.log("trackingData", this.trackingData);
          // Add markers and polyline data
          this.addMarkersAndPolyline1(imei, vehicle_no);
         console.log(Id)
          this.fetchCustomerInfo(route_id);
        }
      // Hide the tracking spinner after the API call
      this.SpinnerService.hide("tracking");
    }
  }
} 
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
    console.log(computedStyle);
    console.log(modalDialog);
   
    console.log('Initial Rect:', rect);
    console.log('Initial Transform:', transform);
   
    // If transform is not set, center the modal
    if (transform === 'none') {
      const x = (window.innerWidth - rect.width) / 2;
      const y = (window.innerHeight - rect.height) / 2;
      console.log('Calculated Position:', { x, y });
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

  clearMarkersAndPolylines() {
    // throw new Error('Method not implemented.');
  }
// fetchCustomerInfo(Id: string) {
//   this.customer_info = []
//   const markers: google.maps.Marker[] = [];
//   const formdataCustomer = new FormData();
//   formdataCustomer.append('AccessToken', this.token);
//   formdataCustomer.append('forGroup', this.group_id);
//   formdataCustomer.append('id', Id);
//   // Log form data for debugging
//   formdataCustomer.forEach((value, key) => {
//     console.log("formdata...", key, value);
//   });
//   this.CrudService.tripCustomerS(formdataCustomer).subscribe((res: any) => {
//     console.log(res)
//     if(res.message=="success"){
//       if(res.customer_info!==null){
//     this.customer_info = res.customer_info;

//     // Log the customer data for debugging
//     console.log("Customer Info:", this.customer_info);
//     //  if(this.customer_info!==null){
//     this.customer_info.forEach((customer, index) => {
//       // Log SequenceNo to check its value
//       console.log("Customer SequenceNo:", customer.SequenceNo);

//       const sequenceNo = customer.SequenceNo ? customer.SequenceNo.toString() : ''; // Ensure this is a string
//       // const sequenceNo = customer.SequenceNo  // Ensure this is a string

//       let mark = new google.maps.Marker({
//         map: this.map1,
//         position: new google.maps.LatLng(customer.Lat, customer.Lng),
//         title: `${customer.Lat}, ${customer.Lng}`,
//         label: {
//           text: sequenceNo,  // Ensure this is a string
//           color: 'black'
//         }
//       });

//       this.demomarker.push(mark);
//       markers.push(mark);
//       // google.maps.event.addListener(mark, 'click', (event) => this.handleCustomerMarkerClick(event, index));
//       google.maps.event.addListener(mark, 'click', (event) => {
//         this.handleCustomerMarkerClick(event, index);
//       });
//   // const infowindowMarker = new google.maps.InfoWindow({ content: customer_Info });
//   //     infowindowMarker.setPosition(event.latLng);
//   //     infowindowMarker.open(this.map1);
//     });
//   }}
//     // this.demomarker=markers;
//   });
// }
// generateCustomerInfo(customer): string {
//   let pod = customer.CustVisited === 1 ? 'Already DONE' : 'Not Done';
//   // let type = customer.LocationSequence === 0 ? 'ORIGIN' : customer.LocationSequence === 1 ? 'INTERMEDIATE STATION' : 'DESTINATION';
//   // let arrival_time = customer.GeoArrivalTime ? `${customer.GeoArrivalTime} [GPS]` : customer.ArrivalTime;
//   // let departure_time = customer.GeoDepartureTime ? `${customer.GeoDepartureTime} [GPS]` : customer.DepartureTime;
  
//   return `<table class="border" style="font-size: 13px;line-height: 19px;border:none !important;width:220px">
//   <tbody style="border:none !important">
//     <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">Destination/Customer</td><td style="border:none !important">:</td><td style="border:none !important">${customer.CustName}</td></tr>
//     <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">ETA</td><td style="border:none !important">:</td><td style="border:none !important">${pod}</td></tr>
//   </tbody>
//   </table>`;
//   }
fetchCustomerInfo(Id: any) {
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
  this.dtdcService.dtdcTripCustomerDetails(formdataCustomer).subscribe((res: any) => {
    // console.log(res)
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
      console.log(customer.Coordinates,customer)
      const coordinates:any=customer.Coordinates;
      const [lat, lng] = coordinates.split(",");
      console.log(lat, lng)
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
// let departure_time = customer.GeoDepartureTime ? `${customer.GeoDepartureTime} [GPS]` : customer.DepartureTime;  ${customer.Status}  ${customer.Status}
// console.log(customer)
return `<table class="border" style="font-size: 13px;line-height: 19px;border:none !important;width:220px">
<tbody style="border:none !important">
  <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">Destination/Customer</td><td style="border:none !important">:</td><td style="border:none !important">${customer.Label}</td></tr>
  <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">ETA</td><td style="border:none !important">:</td><td style="border:none !important">-</td></tr>
  <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">Distance Left</td><td style="border:none !important">:</td><td style="border:none !important">-</td></tr>
</tbody>
</table>`;
}
generateCustomerInfo1(customer): string {
  let pod = customer.PodStatus === 1 ? 'DONE' : '-';
  let type = customer.LocationSequence === 0 ? 'ORIGIN' : customer.LocationSequence === 1 ? 'INTERMEDIATE STATION' : 'DESTINATION';
  let arrival_time = customer.GeoArrivalTime ? `${customer.GeoArrivalTime} [GPS]` : customer.ArrivalTime;
  let departure_time = customer.GeoDepartureTime ? `${customer.GeoDepartureTime} [GPS]` : customer.DepartureTime;
  
  return `<table class="border" style="font-size: 13px;line-height: 19px;border:none !important">
  <tbody style="border:none !important">

    <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">Location</td><td style="border:none !important">:</td><td style="border:none !important">${customer.LocationCode}</td></tr>
    <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">PodStatus</td><td style="border:none !important">:</td><td style="border:none !important">${pod}</td></tr>
    <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">Type</td><td style="border:none !important">:</td><td style="border:none !important">${type}</td></tr>
    <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">ArrivalTime</td><td style="border:none !important">:</td><td style="border:none !important">${arrival_time}</td></tr>
    <tr style="border:none !important"><td style="border:none !important; color:#0c0c66; Font-weight:bold">DepartureTime</td><td style="border:none !important">:</td><td style="border:none !important">${departure_time}</td></tr>
  </tbody>
</table>`;
}
  handleCustomerMarkerClick1(event: any, index: number): void {
    // Retrieve customer data based on index
    const customer = this.customer_info[index];
    if (!customer) {
      console.error(`No customer data found for index ${index}`);
      return;
    }
  
    // Generate customer info content
    const customer_Info = this.generateCustomerInfo1(customer);
  
    // Create and display the InfoWindow
    const infowindowMarker = new google.maps.InfoWindow({
      content: customer_Info,
    });
  
    // Set position and open the InfoWindow
    infowindowMarker.setPosition(event.latLng!);
    infowindowMarker.open(this.map1);
  
    console.log('Customer Info:', customer);
  }
// handleCustomerMarkerClick(event, index) {
 
//   const customer = this.customer_info[index];
//   console.log(customer)
//   const customer_Info = this.generateCustomerInfo(customer);
//   const infowindowMarker = new google.maps.InfoWindow({ content: customer_Info });
//   return customer_Info;
//   // this.closeLastOpenedInfoWindow();
//   // const infowindowMarker_custo = new google.maps.InfoWindow({ content: customer_Info });
//   // infowindowMarker_custo.setPosition(event.latLng);
//   // infowindowMarker_custo.open(this.map1);
//   // this.lastOpenedInfoWindow = infowindowMarker_custo;
//   }
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
    '<tr>' + data.io + '<tr>' +
    '<tr style=" border:none !important">' +
    '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;border:none !important">Location Type</td>' +
    '<td style="border:none !important;width:1%;color: blue;">:</td>' +
    '<td style="border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.loc_type + '</td>' +
    '</tr>' +
    '</tbody>' +
    '</table>'






}




Detail(){
  this.SpinnerService.hide();
 if (this.gridApi_popup) {
  this.gridApi_popup.destroy();
}
 this.columnDefs_popup = [
  { field: 'Sl', headerName: 'Sl', sortable: true, filter: true, width: 150,  minWidth: 150, maxWidth: 150, },
  { field: 'RouteType', headerName: 'Route Type', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150,},
  { field: 'Region', headerName: 'Region', sortable: true, filter: true, width: 150,  minWidth: 150, maxWidth: 150, },
  { field: 'Origin', headerName: 'Origin', sortable: true, filter: true, width: 100,  minWidth: 100, maxWidth: 100, },
  { field: 'Destination', headerName: 'Destination', sortable: true, filter: true, width: 150,  minWidth: 150, maxWidth: 150, },
  { field: 'Route', headerName: 'Route', sortable: true, filter: true, width: 150,  minWidth: 150, maxWidth: 150, },
  { field: 'Fleet', headerName: 'Fleet', sortable: true, filter: true, width: 100,  minWidth: 100, maxWidth: 100, },
  { field: 'TripID', headerName: 'Trip ID', sortable: true, filter: true , width: 100,  minWidth: 100, maxWidth: 100,},
  { field: 'RunCode', headerName: 'Run Code', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150,},
  { field: 'RunDate', headerName: 'Run Date', sortable: true, filter: true , width: 200,  minWidth: 200, maxWidth: 200,},
  
  { field: 'VehicleStatus', headerName: 'VehicleStatus', sortable: true, filter: true , width: 200,  minWidth: 200, maxWidth: 200,hide:true},
  { field: 'Vehicle', headerName: 'Vehicle', sortable: true, filter: true , width: 110,  minWidth: 110, maxWidth: 110,

    cellRenderer: params => {
      // console.log(params.data.Status,params)
    // Create the container div
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
  
    const serialSpan = document.createElement("span");
    // serialSpan.textContent = params.value;
  
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
  
    // Clear previous content
    if (params.data.VehicleStatus == 'Running') {
      button.innerHTML += '<span style="color: #6ABD46; margin-right: 0px;">'+params.data.Vehicle +' </span> ';
    }
    else  if (params.data.VehicleStatus == 'InActive') {
      button.innerHTML += '<span style="color: gray; margin-right: 0px;">'+params.data.Vehicle +' </span> ';
    }else  if (params.data.VehicleStatus == 'Stopped') {
      button.innerHTML += '<span style="color: red; margin-right: 0px;">'+params.data.Vehicle +' </span> ';
    }
    container.appendChild(serialSpan);
    container.appendChild(button);
  
    return container;
  }
  },
  { field: 'Track', headerName: 'Track', sortable: true, filter: true, width: 110,  minWidth: 110, maxWidth: 110,
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
        button.innerHTML +=  `
        <strong style="color: blue; margin-right: 5px;">
          <i class="fa fa-map-marker" style="font-size:17px; color:blue;"></i>
        </strong>
        
      `;
      // <span style="margin-left: 5px;">|</span>
        button.addEventListener("click", () => {
          console.log("Row Data:", params.data.Full);
          // this.Detail(params.data.Full)
          this.vehicleTrackF_new('', '',params.data.Full?.Imei, params.data.Full?.RunDateF, params.data.Full?.Vehicle, params.data.Full, params.data.Full?.Id, params.data.Full?.Id)
        });
      } else {
        button.innerHTML += `
        <span style="color: black; margin-right: 5px;">-</span>
       
      `;}
      //  <span style="margin-left: 5px;">|</span>
      if (params.data.Full?.Imei2 !== '') {
        button.innerHTML += `
            <strong style="color: blue; margin-right: 5px;">
              <i class="fa fa-map-marker" style="font-size:17px; color:blue;"></i>
            </strong>
           
          `;
        //  <span style="margin-left: 5px;">|</span>
        button.addEventListener("click", () => {
          // console.log("Row Data:", params.data.Full);
          // this.Detail(params.data.Full)
          this.vehicleTrackF_new('', '',params.data.Full?.Imei2, params.data.Full?.RunDateF, params.data.Full?.Vehicle, params.data.Full, params.data.Full?.Id, params.data.Full?.Id)
        });
      } else {
        button.innerHTML += `
        <span style="color: black; margin-right: 5px;">-</span>
        
      `;}
      // <span style="margin-left: 5px;">|</span>
      if (params.data.Full?.Imei3 !== '') {
        button.innerHTML += `
            <strong style="color: blue; margin-right: 5px;">
              <i class="fa fa-map-marker" style="font-size:17px; color:blue;"></i>
            </strong>
           
          `;
      //   <span style="margin-left: 5px;">|</span>
        button.addEventListener("click", () => {
          // console.log("Row Data:", params.data.Full);
          // this.Detail(params.data.Full)
          this.vehicleTrackF_new('', '',params.data.Full?.Imei3, params.data.Full?.RunDateF, params.data.Full?.Vehicle, params.data.Full, params.data.Full?.Id, params.data.Full?.Id)
        });
      } else {
        button.innerHTML += `
        <span style="color: black; margin-right: 5px;">-</span>
       
      `;}
      // <span style="margin-left: 5px;">|</span>
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
  { field: 'Transporter', headerName: 'Transporter', sortable: true, filter: true , width: 250,  minWidth: 250, maxWidth: 250,},
  { field: 'STD', headerName: 'STD', sortable: true, filter: true , width: 200,  minWidth: 200, maxWidth: 200,},
  { field: 'ATD', headerName: 'ATD', sortable: true, filter: true, width: 200,  minWidth: 200, maxWidth: 200, },
  { field: 'DelayDeparture', headerName: 'Delay Departure', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150,},
  { field: 'STA', headerName: 'STA', sortable: true, filter: true , width: 200,  minWidth: 200, maxWidth: 200,},
  { field: 'ATA', headerName: 'ATA', sortable: true, filter: true , width: 200,  minWidth: 200, maxWidth: 200,},
  { field: 'ttMapped', headerName: 'TT-Mapped', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150, },
  { field: 'TTTaken', headerName: 'TT-Taken', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150,},
  { field: 'delayArrival', headerName: 'Delay Arrival', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150,},
  { field: 'DelayTT', headerName: 'Delay TT', sortable: true, filter: true, width: 150,  minWidth: 150, maxWidth: 150, },
  { field: 'Distance', headerName: 'Distance (Km)', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150,},
  { field: 'GPSException', headerName: 'GPS Exception', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150, },
  { field: 'Status', headerName: 'Status', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150,},
  { field: 'CloseBy', headerName: 'Close By', sortable: true, filter: true, width: 200,  minWidth: 200, maxWidth: 200, },
  { field: 'CreateBy', headerName: 'Create By', sortable: true, filter: true , width: 150,  minWidth: 150, maxWidth: 150,},
  { field: 'Full', headerName: 'Full', sortable: true, filter: true, hide:true, width: 100,  minWidth: 100, maxWidth: 100, },
];
// console.log(this.rowData_popup)
this.rowData = this.rowData_popup.map((person, index) => ({
  Sl: index + 1,
  RouteType: person.RouteType,
  Region: person.Region,
  Origin: person.Origin,
  Destination: person.Destination,
  Route: person.Route,
  Fleet: person.Fleet,
  TripID: person.TripId,
  RunCode: person.RunCode,
  RunDate: this.formatDate(person.RunDateF),
  VehicleStatus:person.VehicleStatus,
  Vehicle: person.Vehicle,
  GPSVendor: person.gps_vendor_name,
  FixedElockVendor:person.DistanceKm2,
  PortableElockVendor: person.DistanceKm3,
  //   portableELockVendor: person.DistanceKm3,
  DriverName: person.DriverName,
  // area: person.Area,
  // driverName: person.Driver,
  DriverNumber:person.DriverNumber,
  // driverNumber: person.DriverMobile,
  Transporter: person.Transporter,
  STD:this.formatDate(person.STD), // Standard Time of Departure
  ATD: this.formatDate(person.ATD), // Actual Time of Departure
  DelayDeparture: person.DelayedDeparture,
  STA: this.formatDate(person.STA), // Standard Time of Arrival
  ATA: this.formatDate(person.ATA), // Actual Time of Arrival
  ttMapped: person.TT_Mapped,
  TTTaken: person.TT_Taken,
  delayArrival: person.DelayArrival,
  DelayTT: person.DelayTT,
  Distance: person.Distance_Km,
  GPSException: person.GpsException,
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
  Status: person.Status,
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
  rowData: this.rowData,
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
 onGridReady_pop(params: any) {
 
  this.gridApi_popup = params.api;
}
exportAsExcel_pop() {
  if (this.gridApi_popup) {
    this.gridApi_popup.exportDataAsCsv({ fileName: 'Summary.csv' });
  }
}
 Detail1(){

  this.SpinnerService.hide();
  // $('#Datail1').modal('show');
//  this.detail_data=eve;
 if (this.gridApi_popup) {
  this.gridApi_popup.destroy();
  // this.gridApi_popup='';
}
 this.columnDefs_popup = [
  { field: 'Sl', headerName: 'Sl', sortable: true, filter: true,width:150 },
  // { field: 'RouteType', headerName: 'Route Type', sortable: true, filter: true },
  { field: 'Region', headerName: 'Region', sortable: true, filter: true,width:300 },
  { field: 'Vehicle', headerName: 'Vehicle', sortable: true, filter: true ,width:300,
  },
  { field: 'LastStatus', headerName: 'Last Status', sortable: true, filter: true ,width:300},
  { field: 'TripCount', headerName: 'Trip Count', sortable: true, filter: true,width:400 },
 ];
console.log(this.rowData_popup);
this.rowData = this.rowData_popup.map((person, index) => ({
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
  rowData: this.rowData,
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
  pdfMake.createPdf(docDefinition).download( this.headerName+".pdf");
}




 
  onBtExport_pop() {
    // this.gridApi!.exportDataAsExcel();
    // this. gridApi_popup!.exportDataAsCsv();
    this. gridApi_popup!.exportDataAsCsv({
      fileName: this.headerName+".csv"
    });
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
  pdfMake.createPdf(docDefinition).download( this.headerName+".pdf");
}
onBtExport_pop1() {
  // this.gridApi!.exportDataAsExcel();
  // this. gridApi_popup!.exportDataAsCsv();
  this. gridApi_popup!.exportDataAsCsv({
    fileName: this.headerName+".csv"
  });
  }
  onFilterTextBoxChanged_pop() {
    // console.log("hii");
    
    this.gridApi_popup.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box-pop") as HTMLInputElement).value,
    )
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
  exportToExcel_datetime(): void {
   
   
    const rowData = this.rowData_popup.map((person, index) => ({
      Sl: index + 1,
      RouteType: person.RouteType,
      Region: person.Region,
      Origin: person.Origin,
      Destination: person.Destination,
      Route: person.Route,
      Fleet: person.Fleet,
      TripID: person.TripId,
      RunCode: person.RunCode,
      RunDate: this.parseDate(person.RunDateF),
      Vehicle: person.Vehicle,
      GPSVendor: person.gps_vendor_name,
      FixedElockVendor:person.DistanceKm2,
      PortableElockVendor: person.DistanceKm3,
      //   portableELockVendor: person.DistanceKm3,
      DriverName: person.DriverName,
      // area: person.Area,
      // driverName: person.Driver,
      DriverNumber:person.DriverNumber,
      // driverNumber: person.DriverMobile,
      Transporter: person.Transporter,
      STD:this.parseDate(person.STD), // Standard Time of Departure
      ATD: this.parseDate(person.ATD), // Actual Time of Departure
      DelayDeparture: person.DelayedDeparture,
      STA: this.parseDate(person.STA), // Standard Time of Arrival
      ATA: this.parseDate(person.ATA), // Actual Time of Arrival
      ttMapped: person.TT_Mapped,
      ttTaken: person.TT_Taken,
      delayArrival: person.DelayArrival,
      DelayTT: person.DelayTT,
      Distance: person.Distance_Km,
      GPSException: person.GpsException,
    CloseBy:person.CloseBy,
    CreateBy: person.CreateBy,
      Status: person.Status,
      Full:person
     }));
     console.log("rowData",rowData)
    // const ws = XLSX.utils.json_to_sheet(rowData, {
    //   cellDates: true,  
    //   dateNF: 'dd-mm-yyyy hh:mm:ss', // Set the desired date format
    //   // dateNF: 'yyyy/mm/dd hh:mm:ss', 
    // });
  
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Summary');
    // XLSX.writeFile(wb, 'Summary.xlsx');
    const ws = XLSX.utils.json_to_sheet(rowData, {
      cellDates: false,  // Prevents Excel from altering the time
      dateNF: 'dd-mm-yyyy hh:mm:ss',
    });
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws,  this.headerName);
    XLSX.writeFile(wb, this.headerName+".xlsx");
  }
  
  // private parseDate(dateString) {
  //   let parsedDate:any;
  //   if(dateString !==''&& dateString !=='-'){
  //   const [yearTime, month, day] = dateString.split('-');
  //   const [day1, time] = day.split(' ');
  //    parsedDate = new Date(`${month}/${day1}/${yearTime} ${time}`);
  //    parsedDate.setSeconds(parsedDate.getSeconds() - 10);
  //  }
  //   return parsedDate
  // }

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
  
  detail1_Excel(){
  const rowData=  this.rowData_popup.map((person, index) => ({
      Sl: index + 1,
      Region: person.Region,
      Vehicle: person.Vehicle,
      LastStatus: person.Status,
      TripCount: person.TripCnt,
    
     }));
     const ws = XLSX.utils.json_to_sheet(rowData, {
      cellDates: true,  
      dateNF: 'dd-mm-yyyy hh:mm:ss', // Set the desired date format
      // dateNF: 'yyyy/mm/dd hh:mm:ss', 
    });
  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws,  this.headerName);
    XLSX.writeFile(wb, this.headerName+".xlsx");
  
  }
  exportToCSV_popup(): void {
  
    const rows: string[] = [];
    const parentHeaders: string[] = [];
  
    // Extract parent headers, excluding the "Full" column
    this.columnDefs_popup.forEach((colDef: any) => {
      if (colDef.children) {
        // Add child headers, excluding "Full"
        parentHeaders.push(
          ...colDef.children
            .filter((child: any) => child.headerName !== "Full") // Exclude "Full"
            .map((child: any) => child.headerName)
        );
      } else if (colDef.headerName !== "Full") {
        // Add non-grouped column headers, excluding "Full"
        parentHeaders.push(colDef.headerName);
      }
    });
  
    // Create parent header row
    rows.push(parentHeaders.map(header => `"${header}"`).join(',')); // Wrap headers in quotes
  
    // Extract row data
    const rowData: any[] = [];
    this.gridOptions_popup.api.forEachNode((node: any) => {
      rowData.push(node.data);
    });
  
    // Map row data to match the column fields, excluding "Full"
    rowData.forEach((row: any) => {
      const rowValues = parentHeaders.map((header: string) => {
        const field = this.columnDefs_popup.find((colDef: any) =>
          (colDef.children?.some((child: any) => child.headerName === header) || colDef.headerName === header) &&
          colDef.headerName !== "Full" // Ensure "Full" is excluded
        )?.field;
  
        // Get the value and escape quotes
        const value = field ? row[field] || '' : '';
        return `"${String(value).replace(/"/g, '""')}"`; // Wrap values in quotes and escape double quotes
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
}
