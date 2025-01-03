import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


declare var $: any;
import { from, of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NavService } from 'src/app/shared/services/nav.service';
import { DtdcService } from '../services/dtdc.service';
declare var $: any
declare var H: any;
interface HTMLCanvasElement {
  willReadFrequently?: boolean;
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
  platform: any;
  demoPolyline: any=[];
  lastOpenedInfoWindow: any;
  alertData: any;
  selectedRouteType: any;
  routeTypes: any=[];
  selectedRoute: any;
  filterdata: any=[];
  routeTypes_filter: any=[];
  eve: any;
  commaSeparatedRoutes: any;
  constructor(private CrudService:CrudService , private navServices: NavService, private dtdcservice: DtdcService, private SpinnerService: NgxSpinnerService, private datepipe: DatePipe) { }


  ngOnInit(): void {

    let App = document.querySelector('.app');
    App?.classList.add('sidenav-toggled');

    this.token = localStorage.getItem('AccessToken')!
    this.account_id = localStorage.getItem('AccountId')!
    this.initMap2();
    // console.log("account_id", this.account_id)
    this.group_id = localStorage.getItem('GroupId')!
    this.delayDashboardDtdcFilter();
    // this.delayDashboardGeneric();
    this.delayDashboardDisclaimer();

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
  delayDashboardGeneric() {
    
    this.commaSeparatedRoutes = this.selectedRouteType.map(item => item.route_type).join(', ');
    // console.log("delayDashboardGeneric",this.commaSeparatedRoutes)
    this.SpinnerService.show()
    const formdataCustomer = new FormData();
    formdataCustomer.append('AccessToken', this.token);
    formdataCustomer.append('RouteType', this.commaSeparatedRoutes);
    
    this.dtdcservice.dtdc_delayDashboard(formdataCustomer).subscribe((res: any) => {
      // console.log('delayDashboardGenericr', res);
      if(res.status=="success"){
      this.Delay_data = Object.values(res.data);
      console.log(this.Delay_data);
      this.DelayTable();
      this.SpinnerService.hide()
      }else{
        alert(res.Message);
      }
    })
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
        formData.forEach((value, key) => {
          console.log("formdata...", key, value);
        });
        this.CrudService.vehicleTrackongS(formData).subscribe((res: any) => {
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
                    this.fetchCustomerInfo(Id);
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
  fetchCustomerInfo(Id: string) {
    this.customer_info = []
    // if (this.demomarker.length > 0) {
    //   this.demomarker.forEach(marker => marker.setMap(null));
    //   this.demomarker = [];  // Clear the array after removing markers
    // }
    // console.log("Removing",Id)
    const markers: google.maps.Marker[] = [];
    // if (this.demomarker.length > 0) {
    //   this.demomarker.forEach(marker => {
    //     // console.log("Removing marker from map", marker);
    //     marker.setMap(null);
    //   });
    //   this.demomarker = [];  // Clear the array after removing markers
    //   console.log("Marker array cleared");
    // }
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
  // async handleMarkerClick(event, trackingData, vehicle_no, imei) {
  //   const markerPosition = event.target.getGeometry();
  //   const formdataCustomer = new FormData();
  //   formdataCustomer.append('AccessToken', this.token);
  //   formdataCustomer.append('VehicleId', vehicle_no);
  //   formdataCustomer.append('ImeiNo', imei);
  //   formdataCustomer.append('LatLong', `${markerPosition.lat},${markerPosition.lng}`);

  //   const res: any = await this.CrudService.addressS(formdataCustomer).toPromise(); // Assuming it returns an observable
  //   console.log("res", res)
  //   const address = res.Data.Address;

  //   return this.showWindow(trackingData, vehicle_no, address); // Return the content
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
    // const platform = new H.service.Platform({
    //   apikey: 'MoBysY-1fH4koFS2rGUDpwvRHSLfdX4GWYsRJUlB8VY'  // Replace with your actual API key
    // });
    const defaultLayers = this.platform.createDefaultLayers();
    const ui = H.ui.UI.createDefault(this.map1, defaultLayers);
    const markers: google.maps.Marker[] = [];
    if (this.demomarker.length > 0) {
      this.demomarker.forEach(marker => {
        // console.log("Removing marker from map", marker);
        marker.setMap(null);
      });
      this.demomarker = [];  // Clear the array after removing markers
      // console.log("Marker array cleared");
    }
    const formdataCustomer = new FormData();
    formdataCustomer.append('AccessToken', this.token);
    formdataCustomer.append('forGroup', this.group_id);
    formdataCustomer.append('id', Id);

    this.CrudService.tripCustomerS(formdataCustomer).subscribe((res: any) => {
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
    return customer_Info;
    // this.closeLastOpenedInfoWindow();
    // const infowindowMarker_custo = new google.maps.InfoWindow({ content: customer_Info });
    // infowindowMarker_custo.setPosition(event.latLng);
    // infowindowMarker_custo.open(this.map1);
    // this.lastOpenedInfoWindow = infowindowMarker_custo;
  }

  generateCustomerInfo(customer): string {
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

  initializeMap(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      $('#v_track_Modal').on('shown.bs.modal', () => {
        if (!this.map1) {
          try {
            this.platform = new H.service.Platform({
              apikey: 'TqrKwyeojsEvyCPpJ-ybEZ0l49mO0w-b8_JCBHrQWdI'
            });

            const defaultLayers = this.platform.createDefaultLayers();

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
  // -----------------------Google map---------------------------------------------
  async vehicleTrackF_new(imei, imei2, imei3, run_date, vehicle_no, item, Id, route_id) {
   
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

        // } catch (error) {
        //   console.error("Error in API call:", error);
        //   alert("An error occurred while fetching tracking data");
        // }

        // Hide the tracking spinner after the API call
        this.SpinnerService.hide("tracking");
      }
    }
}  }

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



  delayDashboardDtdcFilter() {
    this.SpinnerService.show()
    const formdataCustomer = new FormData();
    formdataCustomer.append('AccessToken', this.token);

    this.dtdcservice.delayDashboardDtdcFilter(formdataCustomer).subscribe((res: any) => {
      
      if(res.Status=="success"){
      // console.log(res)
      
      this.alertData = res.data.filter1;
      this.selectedRoute=res.data.defaultFilter2
      this.selectedRouteType=res.data.defaultFilter1
      console.log( this.selectedRoute)
      this.filterdata=res.data.filter2;
      this.delayDashboardGeneric()
      // this.routeTypes = Object.keys(this.alertData).map((key) => ({
      //   id: key,
      //   route_type: this.alertData[key],
      // }));
      // this.SumbitFilter();
    }else{
      alert(res.Message);
    }
      // this.DelayTable();
    })
  }
  changeRoutetype(eve){
    this.routeTypes_filter=[];
    console.log(this.filterdata,eve);
    this.eve=eve;
    this.selectedRouteType = []; // Reset to empty array to clear selection
    var routeTypes_filter:any=this.filterdata[eve];
    this.routeTypes_filter = Object.keys(routeTypes_filter).map(key => ({ route_type: key }));
    console.log(this.routeTypes_filter)

  }
  delayDashboardDisclaimer(){
    // alert(0)
    // this.SpinnerService.show()
    const formdataCustomer = new FormData();
    formdataCustomer.append('AccessToken', this.token);

    this.dtdcservice.delayDashboardDisclaimer(formdataCustomer).subscribe((res: any) => {
      
      
      if(res.status=="success"){
      const marqueeContent:any = document.getElementById('marquee-content');
      const row = document.createElement('tr');
      Object.entries(res.data).forEach(([key, value]) => {
         
          const cell = document.createElement('td');
          cell.innerHTML = `${key}: <span id="lbl_${key.replace(/ /g, '_')}" class="badge" style="background: white; color: red; font-weight: bold; font-size: 9px;margin-right: 49px;margin-left: 2px;">${value}</span>`;
          row.appendChild(cell);
          marqueeContent.appendChild(row);
      });
      // this.routeTypes = Object.keys(this.alertData).map((key) => ({
      //   id: key,
      //   route_type: this.alertData[key],
      // }));
      // this.SumbitFilter();
    }else{
      alert(res.Message);
    }
      // this.DelayTable();
    })
 
}
}

