import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NavService } from 'src/app/shared/services/nav.service';
import * as echarts from 'echarts';
declare var $: any
declare var H:any;
declare var google: any
declare var MarkerWithLabel: any;
//  declare var MarkerWithLabel:any; 
declare var MarkerClusterer: any;
declare function processDoc(doc): any;
interface HTMLCanvasElement {
  willReadFrequently?: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  token: any
  GroupTypeId: any;
  group_id: any;
  account_id: any
  Object = Object;
    ui:any=''
  map: any;
  platform: any;
  defaultLayers: any;
   trackingData:any;
    /////////////////////////////////////////Mehdi/////////////////////////////////////////////////////
    tripId:any
    expenseListdata:any[]=[]
    driverData:any
    filterObject:any={
      region:{},
      origin:{},
      destination:{},
      route:{},
      etaDelay:{},
      routeCategory:{},
      routeType:{}
    }
    selectedRoutes:any
    dashboardHeader:any={}
    tripSingle:any={}
    tripArray:any=[]
    copyVariable:Boolean=true
    linkValue:any
    linkObject:any={
                    text:"Copy to clipboard",
                    copyVariable:true
    }
    markers:any=[];
    polylines:any=[];
    
    chartObject:any[]=[{
      id:'consSt',
      name:'Trip',
      data:[{name:'Completed Trip',value:this.dashboardHeader?.TripCompleted},
        { value: this.dashboardHeader?.TripSchedule,name: 'Scheduled Trip'}],
      colors:['rgb(239, 91, 11)', '#1D4380', 'red', 'grey']
    }]
  //   chartObject:any[]=[{
  //     id:'consSt',
  //     name:'Trip',
  //     data:[{name:'Completed Trip',value:this.dashboardHeader?.TripCompleted},
  //       { value: this.dashboardHeader?.TripSchedule,name: 'Scheduled Trip'}],
  //     colors:['rgb(239, 91, 11)', '#1D4380', 'red', 'grey'],
  //     img:"assets/tripIcon/Group.svg"
  //    }
  //  ,{

  //     id:'chartETA',
  //     name:'ETA',
  //     data:[
  //       {
  //         value: this.dashboardHeader?.ETA_2Hrs,
  //         name: 'less than 2 hrs',
  //       },
  //       {
  //         value: this.dashboardHeader?.ETA_2HrsMore,
  //         name: 'more than 2 hrs',
  //       },],
  //     colors:['#f4858e', '#00c0f3', '#34C759', 'grey']
  //   },
  //   ,{

  //     id:'chartStoppage',
  //     name:'Stoppage',
  //     data:[{value: this.dashboardHeader?.Running, name: 'Running',
  //       },
  //       { value: this.dashboardHeader?.Stop_2HrsLess, name: 'less than 2 hrs',
  //       },
  //       { value: this.dashboardHeader?.Stop_2Hrs, name: 'more than 2 hrs',
  //       },
  //     ],
  //     colors:['#e77817', '#00c0f3', '#f4858e', 'grey']
  //   },
  //   ,{

  //     id:'chartGPS',
  //     name:'GPS',
  //     data:[{value: this.dashboardHeader?.Running, name: 'Running',
  //     },
  //     { value: this.dashboardHeader?.Stopped,
  //       name: 'Stopped',
  //     },
  //     {  value: this.dashboardHeader?.InActive,
  //       name: 'Inactive',
  //     },
  //     { value: this.dashboardHeader?.NonGPS,
  //       name: 'Non GPS',
  //     },
  //     ],
  //     colors:['#e77817', '#97291e', '#d0cebb', '00c0f3']
  //   },
  //   ,{

  //     id:'chartFixedLock',
  //     name:'Fixed E-Lock',
  //     data:[   {
  //       value: this.dashboardHeader?.FixedLockClose,
  //       name: 'Lock Close',
  //     },
  //     {
  //       value: this.dashboardHeader?.FixedLockOpen,
  //       name: 'Lock Open',
  //     },
  //     ],
  //     colors:['#97291e', '#E77817', '#d0cebb', '00c0f3']
  //   },
  //   ,{

  //     id:'portableElock',
  //     name:'Portable E-Lock',
  //     data:[{
  //       value: this.dashboardHeader?.PortableLockClose,
  //       name: 'Running',
  //     },
  //     {
  //       value: this.dashboardHeader?.PortableLockOpen,
  //       name: 'Stopped',
  //     },
  //     ],
  //     colors:['#97291e', '#E77817', '#d0cebb', '00c0f3']
  //   },
  //   ]
    location:any[]=[];
  constructor(private navServices: NavService,private service:CrudService,private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {

    this.platform = new H.service.Platform({
      apikey: 'vQTBCs4xOBkG-mSZlCymIb0G-Jj2TF2pO_p7e9Lc90o'
    });
    this.initApiCalls()
    this.expenseList()
    this.onFilterDriver('')
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
  initApiCalls(){
    
    this.chartObject=[{
      id:'consSt',
      name:'Trip',
      data:[{name:'Completed Trip',value:this.dashboardHeader?.TripCompleted},
        { value: this.dashboardHeader?.TripSchedule,name: 'Scheduled Trip'}],
      colors:['rgb(239, 91, 11)', '#1D4380', 'red', 'grey'],
      img:"assets/tripIcon/Group.svg"
     }
   ,{

      id:'chartETA',
      name:'ETA',
      data:[
        {
          value: this.dashboardHeader?.ETA_2Hrs,
          name: 'less than 2 hrs',
        },
        {
          value: this.dashboardHeader?.ETA_2HrsMore,
          name: 'more than 2 hrs',
        },],
      colors:['#f4858e', '#00c0f3', '#34C759', 'grey']
    },
    ,{

      id:'chartStoppage',
      name:'Stoppage',
      data:[{value: this.dashboardHeader?.Running, name: 'Running',
        },
        { value: this.dashboardHeader?.Stop_2HrsLess, name: 'less than 2 hrs',
        },
        { value: this.dashboardHeader?.Stop_2Hrs, name: 'more than 2 hrs',
        },
      ],
      colors:['#e77817', '#00c0f3', '#f4858e', 'grey']
    },
    ,{

      id:'chartGPS',
      name:'GPS',
      data:[{value: this.dashboardHeader?.Running, name: 'Running',
      },
      { value: this.dashboardHeader?.Stopped,
        name: 'Stopped',
      },
      {  value: this.dashboardHeader?.InActive,
        name: 'Inactive',
      },
      { value: this.dashboardHeader?.NonGPS,
        name: 'Non GPS',
      },
      ],
      colors:['#e77817', '#97291e', '#d0cebb', '00c0f3']
    },
    ,{

      id:'chartFixedLock',
      name:'Fixed E-Lock',
      data:[   {
        value: this.dashboardHeader?.FixedLockClose,
        name: 'Lock Close',
      },
      {
        value: this.dashboardHeader?.FixedLockOpen,
        name: 'Lock Open',
      },
      ],
      colors:['#97291e', '#E77817', '#d0cebb', '00c0f3']
    },
    ,{

      id:'portableElock',
      name:'Portable E-Lock',
      data:[{
        value: this.dashboardHeader?.PortableLockClose,
        name: 'Running',
      },
      {
        value: this.dashboardHeader?.PortableLockOpen,
        name: 'Stopped',
      },
      ],
      colors:['#97291e', '#E77817', '#d0cebb', '00c0f3']
    },
    ]
    this.token=localStorage.getItem('AccessToken')
    this.group_id=localStorage.getItem('GroupId')
    this.account_id=localStorage.getItem('AccountId')
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    // formdataCustomer.append('RouteId', id);
    // formdataCustomer.append('UserType', 'master');
    // formdataCustomer.append('DataFilter', js);

    this.SpinnerService.show('tableSpinner')
    this.service.genericTripDashboardFilter(formdataCustomer).subscribe((res: any) => {
      console.log("specificDashboardFilter", res);
     
      if(res.Status=='success')
      {
        const data=res?.Filter?.Master
        
        this.filterObject={
          // region:data?.Region||{},
          origin:data?.Customer||{},
          destination:data?.Customer||{},
          // route:data?.Route||{},
          etaDelay:data?.ETADelay||{},
          // routeCategory:data?.RouteCategory||{},
          // rawRouteType:data?.RouteType||{},
          // routeType:data?.RouteType||{}
        }

         
        
        
       
        // formdataCustomer.append("RouteType",data?.DefualtFilter)
        this.service.genericTripDashboard(formdataCustomer).subscribe((res: any) => {
     
          // this.tripArray=res?.MainDashboard
          
          console.log("genericDashboard", res);
          // console.log(this.SpinnerService);
          
          // this.masterUploadTable()
          if(res.Status=='success')
          {
         
           this.tripArray=res?.MainDashboard
           this.dashboardHeader=res?.Header
           console.log("dashboardHeader",this.tripArray);
           
           this.masterUploadTable()
           this.SpinnerService.hide('tableSpinner')
           this.initChart()
           }
           else if(res.Status=='fail'){
            console.log("failed log");
            
            alert(res?.Message)
            this.SpinnerService.hide('tableSpinner')
           }
          // this.routeId = (res?.data);
          // console.log("customerList", this.routeId);
    
        },(error) => {
          console.error('error getting data', error);
          this.SpinnerService.hide('tableSpinner')
        })
      }
      else if(res.Status=='fail'){
        console.log("hagode");
        
        alert(res?.Message)
        this.SpinnerService.hide('tableSpinner')
       }
      // this.routeId = (res?.data);
      // console.log("customerList", this.routeId);

    })
    
    
    // this.SpinnerService.hide('tableSpinner')
    
  } 
  initChart(){
    this.chartObject=[{
      id:'consSt',
      name:'Trip',
      data:[{name:'Completed Trip',value:this.dashboardHeader?.TripCompleted},
        { value: this.dashboardHeader?.TripSchedule,name: 'Scheduled Trip'}],
      colors:['rgb(239, 91, 11)', '#1D4380', 'red', 'grey'],
      img:"assets/tripIcon/Group.svg"
     }
   ,{

      id:'chartETA',
      name:'ETA',
      data:[
        {
          value: this.dashboardHeader?.ETA_2Hrs,
          name: 'less than 2 hrs',
        },
        {
          value: this.dashboardHeader?.ETA_2HrsMore,
          name: 'more than 2 hrs',
        },],
      colors:['#f4858e', '#00c0f3', '#34C759', 'grey']
    },
    ,{

      id:'chartStoppage',
      name:'Stoppage',
      data:[{value: this.dashboardHeader?.Running, name: 'Running',
        },
        { value: this.dashboardHeader?.Stop_2HrsLess, name: 'less than 2 hrs',
        },
        { value: this.dashboardHeader?.Stop_2Hrs, name: 'more than 2 hrs',
        },
      ],
      colors:['#e77817', '#00c0f3', '#f4858e', 'grey']
    },
    ,{

      id:'chartGPS',
      name:'GPS',
      data:[{value: this.dashboardHeader?.Running, name: 'Running',
      },
      { value: this.dashboardHeader?.Stopped,
        name: 'Stopped',
      },
      {  value: this.dashboardHeader?.InActive,
        name: 'Inactive',
      },
      { value: this.dashboardHeader?.NonGPS,
        name: 'Non GPS',
      },
      ],
      colors:['#e77817', '#97291e', '#d0cebb', '00c0f3']
    },
    ,{

      id:'chartFixedLock',
      name:'Fixed E-Lock',
      data:[   {
        value: this.dashboardHeader?.FixedLockClose,
        name: 'Lock Close',
      },
      {
        value: this.dashboardHeader?.FixedLockOpen,
        name: 'Lock Open',
      },
      ],
      colors:['#97291e', '#E77817', '#d0cebb', '00c0f3']
    },
    ,{

      id:'portableElock',
      name:'Portable E-Lock',
      data:[{
        value: this.dashboardHeader?.PortableLockClose,
        name: 'Running',
      },
      {
        value: this.dashboardHeader?.PortableLockOpen,
        name: 'Stopped',
      },
      ],
      colors:['#97291e', '#E77817', '#d0cebb', '00c0f3']
    },
    ]


    this.chartObject.forEach(({id,name,data,colors}) => {
      console.log(id,name,data,colors);
      
      this.chartFunction(id,name,data,colors)
    });
    // this.chartFunction('consSt','Trip',[          {
    //   value: this.dashboardHeader?.TripCompleted,
    //   name: 'Completed Trip',
    // },
    // {
    //   value: this.dashboardHeader?.TripSchedule,
    //   name: 'Scheduled Trip',
    // }],['rgb(239, 91, 11)', '#1D4380', 'red', 'grey'])
    // this.chart1();
    // this.chartDelay()
    // this.chartETA()
    // this.chartStoppage()
    // this.chartAlerts()
    // this.chartGPS()
    // this.chartFixedLock()
    // this.chartPortableLock()
  }
  onFilterDashboard(val){
    console.log(val);
    let formData=new FormData()
    formData.append("AccessToken",this.token)
    formData.append("RouteType",val?.routeType)
    formData.append("Region",val?.Region||'')
    formData.append("Origin",val?.Origin||'')
    formData.append("Destination",val?.destination||'')
    formData.append("Route",val?.route||'')
    formData.append("Delay",val?.etaDelay||'0')
    formData.append("RouteCategory",val?.routeCatgory||'')
    console.log(formData);
    
    this.SpinnerService.show('tableSpinner')
    this.service.genericTripDashboard(formData).subscribe((res: any) => {
      
      // this.tripArray=res?.MainDashboard
      
      console.log("generic", res);
      // console.log(this.SpinnerService);
      
      // this.masterUploadTable()
      if(res?.Status=='success')
      {
     
       this.tripArray=res?.MainDashboard
       this.dashboardHeader=res?.Header
       console.log("dashboardHeader",this.dashboardHeader);
       
       this.masterUploadTable()
       this.SpinnerService.hide('tableSpinner')
      }
      else{
        this.SpinnerService.hide('tableSpinner')
      }
      // this.routeId = (res?.data);
      // console.log("customerList", this.routeId);

    },(error) => {
      console.error('error getting data', error);
      this.SpinnerService.hide('tableSpinner')
    })
    
  }
  dashboardData(){
    this.SpinnerService.show('tableSpinner')
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    this.service.genericTripDashboard(formdataCustomer).subscribe((res: any) => {
     
      // this.tripArray=res?.MainDashboard
      
      console.log("genericDashboard", res);
      // console.log(this.SpinnerService);
      
      // this.masterUploadTable()
      if(res.Status=='success')
      {
     
       this.tripArray=res?.MainDashboard
       this.dashboardHeader=res?.Header
       console.log("dashboardHeader",this.tripArray);
       
       this.masterUploadTable()
       this.SpinnerService.hide('tableSpinner')
       this.initChart()
       }
       else if(res.Status=='fail'){
        console.log("hagode");
        
        alert(res?.Message)
        this.SpinnerService.hide('tableSpinner')
       }
      // this.routeId = (res?.data);
      // console.log("customerList", this.routeId);

    },(error) => {
      console.error('error getting data', error);
      this.SpinnerService.hide('tableSpinner')
    })
  }

  onRouteCategoryChange(val){
    if(val)
    {
      console.log(val);
      this.filterObject.routeType=this.filterObject.rawRouteType[val]
    }
    else{
      const routeType1 = this.filterObject?.rawRouteType[1];
         const routeType2 = this.filterObject?.rawRouteType[2];
         this.filterObject.routeType={...routeType1,...routeType2}
      
    }
  }
  trackVehicle(item){
   const currentDateTime= new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // To use 24-hour format
    }).replace(',', '');

    console.log(item);
    const formData=new FormData()
    formData.append('AccessToken', this.token)
    formData.append('startdate', item?.RunDate);
    formData.append('enddate', currentDateTime);
    formData.append('time_interval', '60');
    formData.append('imei', item?.ImeiNo1||item?.ImeiNo2||item?.ImeiNo3);
    formData.append('group_id', this.group_id);
    formData.append('AccountId', this.account_id);
    this.service.vehicleTrackongS(formData).subscribe((res:any)=>{
      console.log("trackvehicle",res);
    })
  }
  filterTable(value){
    let table = $('#masterUpload').DataTable();
    table.columns(3).search("").draw();
    table.columns(4).search("").draw();
    table.columns(5).search("").draw();
    // table.destroy()
    if(value=='free_vehicle')
      {
        // table.columns(3).search("").draw();
        table.columns(3).search("1").draw();
        console.log(table);
      }
    else  if(value=='at_source')
        {
          
          // table.columns(5).search("").draw();
          console.log(value);
          table.columns(4).search("1").draw();
        }
    else if(value=='at_destination'){
      console.log(value);
      table.columns(5).search("1").draw();
    }
    else if(value=='All'){
      table.columns(1).search("").draw()
    }
    
  }
  
  elockFunctionDisplay(FixedLockOpen,PortableLockOpen):any{
    //  console.log("elock",val);
    let flag_lock_status_show=0;
     let  flag_exist_lock=0;
if(FixedLockOpen!="" && FixedLockOpen!="NA")
{
    flag_exist_lock=1;
    if(FixedLockOpen=="Open")
    {
        return "Open";
        
    }
}
if(PortableLockOpen!="" && PortableLockOpen!="NA")
{
    flag_exist_lock=1;
    if(PortableLockOpen=="Open")
    {
        return "Open";
    }
}

if(flag_exist_lock==1 && flag_lock_status_show==0)
{
  return "Close"
}
  }

  openMapModal(item,imei) {
    
    $('#mapModal').modal('show'); // Open modal using jQuery
    this.SpinnerService.show('mapSpinner')
    // Call the tracking function
    this.vehicleTrackF(item,imei);
  }
  vehicleTrackF(item,imei) {
    // this.loading = true; // Set loading to true when API call starts

    const currentDateTime = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // To use 24-hour format
    }).replace(',', '');

    const formData=new FormData()
    formData.append('AccessToken', this.token)
    formData.append('startdate', item?.RunDate);
    formData.append('enddate', currentDateTime);
    formData.append('time_interval', '60');
    if(imei)
      formData.append('imei', imei);
      else
    formData.append('imei', item?.ImeiNo1||item?.ImeiNo2||item?.ImeiNo3);
    formData.append('group_id', this.group_id);
    formData.append('AccountId', this.account_id);
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
        this.initializeMap(item,coordinates);
      } else {
        console.log('No valid locations found in the response.');
      }
    }, error => {
     
      console.error('Error fetching vehicle tracking data:', error);
    });
  }

  initializeMap(item, coordinates: { lat: number, lng: number }[]) {
    if (!this.map) {
        // Initialize HERE map platform and default layers
        this.defaultLayers = this.platform.createDefaultLayers();

        // Create the map
        this.map = new H.Map(
            this.mapContainer.nativeElement,
            this.defaultLayers.vector.normal.map,
            {
                center: coordinates.length > 0 ? coordinates[0] : { lat: 50, lng: 5 },
                zoom: 5,
                pixelRatio: window.devicePixelRatio || 1,
            }
        );

        // Make the map interactive
        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
        this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
    }

    // Clear existing objects from the map
    this.map.removeObjects(this.map.getObjects());

    if (coordinates.length > 0) {
        // Icons for different marker types
        const sourceIcon = new H.map.Icon('assets/images/users/start_marker.png');
        const destinationIcon = new H.map.Icon('assets/images/users/stop_marker.png');
        const intermediateIcon = new H.map.Icon('assets/images/users/green_Marker1.png');

        let bounds = new H.geo.Rect(coordinates[0].lat, coordinates[0].lng, coordinates[0].lat, coordinates[0].lng);

        // Add customer markers (DOM-based)
        const customer = item?.Customer;
        if (customer) {
            customer.forEach(({ location_geocoord },index) => {
                if (location_geocoord) {
                    const [lat, lng] = location_geocoord.split(',').map(Number);
                    const coord = { lat, lng };
                    this.addCustomerDomMarker(coord,index); // Use the DOM marker function for customers
                    bounds = bounds.mergePoint(coord);
                }
            });
        }

        // Add regular markers for source, destination, and intermediate points
        coordinates.forEach((coord, index) => {
            const icon = index === 0 ? sourceIcon : (index === coordinates.length - 1 ? destinationIcon : intermediateIcon);
            const marker = this.addMarker(coord, icon); // Regular marker function
            this.addInfoBubble(marker, coord, this.trackingData[index]);
            bounds = bounds.mergePoint(coord);
        });

        // Draw a polyline for the route
        this.addPolyline(coordinates);

        // Adjust the map view to fit all markers
        this.map.getViewModel().setLookAtData({ bounds });
    }
    this.SpinnerService.hide('mapSpinner');
}

// Function to create and add a customer DOM marker with a sequence number
addCustomerDomMarker(coord: { lat: number, lng: number }, sequenceNo: number) {
  const html = document.createElement('div');
  const divIcon = document.createElement('div');
  const divText = document.createElement('div');
  const imgIco = document.createElement('img');

  imgIco.setAttribute('src', 'assets/imagesnew/redmarker_end.png');
  imgIco.style.width = '26px'; // Adjust marker image width
  imgIco.style.height = '37px'; // Adjust marker image height

  divText.setAttribute("class", "textData");
  html.setAttribute("class", "parentDiv");

  divIcon.appendChild(imgIco);
  divText.textContent = sequenceNo.toString(); // Display sequence number
  divText.style.top = '40%';
  divText.style.left = '50%';
  divText.style.position = 'absolute';
  divText.style.transform = 'translate(-50%, -50%)';
  divText.style.color = 'white'; // Set text color
  divText.style.fontWeight = 'bold'; // Bold text for visibility

  html.appendChild(divIcon);
  html.appendChild(divText);

  const domIcon = new H.map.DomIcon(html);
  const marker = new H.map.DomMarker(coord, { icon: domIcon });

  // Add marker to the map
  this.map.addObject(marker);

  // Add click listener to the marker
  marker.addEventListener('tap', async (evt) => {
      // Remove existing bubbles
      this.ui.getBubbles().forEach(bubble => this.ui.removeBubble(bubble));

      // Handle marker click
      const infoContent = `Customer Sequence: ${sequenceNo}`;
      const infoBubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
          content: infoContent
      });
      this.ui.addBubble(infoBubble);
  });
}


// Function to add regular markers
// addMarker(coord: { lat: number, lng: number }, icon) {
//     const marker = new H.map.Marker(coord, { icon });
//     this.map.addObject(marker);
//     return marker;
// }

// // Function to add a polyline for the route
// addPolyline(coordinates: { lat: number, lng: number }[]) {
//     const lineString = new H.geo.LineString();
//     coordinates.forEach(coord => lineString.pushPoint(coord));
//     const polyline = new H.map.Polyline(lineString, { style: { strokeColor: 'blue', lineWidth: 3 } });
//     this.map.addObject(polyline);
// }


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
  addMarker(coordinate: { lat: number, lng: number }, icon:any): void {
    const marker = new H.map.Marker(coordinate, { icon });
    this.map.addObject(marker);
    return marker
}

createBubble(data,add,vnumber) {

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
  this.SpinnerService.show('mapSpinner')
  const lineString = new H.geo.LineString();
  coordinates.forEach(coord => lineString.pushPoint(coord));
  const polyline = new H.map.Polyline(lineString, {
      style: { strokeColor: '#6334d8', lineWidth: 4 }
  });
  this.map.addObject(polyline);
  this.SpinnerService.hide('mapSpinner')
}
addCustomerMarker(item: any) {
  if (!item?.Customer) return; // Ensure there is data to process

  item.Customer.forEach((el: any,index) => {
    // Extract the coordinates and label
    const coordinates = this.parseCoordinates(el?.location_geocoord);
    const label = el?.location_label || `M${index}`; // Default label to "M#" if `location_label` is unavailable
    
     
    if (!coordinates) return; // Skip invalid coordinates

    // Create marker HTML
    // const html = `
    //   <div style="position: relative; width: 30px; height: 40px;">
    //     <img src="assets/imagesnew/redmarker_end.png" style="width: 100%; height: 100%;" />
    //     <div style="
    //       position: absolute;
    //       top: 50%;
    //       left: 50%;
    //       transform: translate(-50%, -50%);
    //       color: white;
    //       font-weight: bold;
    //       font-size: 12px;
    //     ">${label}</div>
    //   </div>
    // `;
    // console.log("customer",html);
        // Create marker elements
        const html = document.createElement('div');
        const divIcon = document.createElement('div');
        const divText = document.createElement('div');
        const imgIco = document.createElement('img');

        imgIco.setAttribute('src', 'assets/imagesnew/redmarker_end.png');
        imgIco.style.width = '26px'; // Adjust the width as needed
        imgIco.style.height = '37px'; // Adjust the height as needed

        divText.setAttribute("class", "textData");
        html.setAttribute("class", "parentDiv");
        divIcon.appendChild(imgIco);

        divText.textContent = el?.location_label;
        divText.style.top = '40%';
        divText.style.left = '50%';
        divText.style.position = 'absolute';
        divText.style.transform = 'translate(-50%, -50%)';
        divText.style.color = 'white'; // Set label color for visibility
        divText.style.fontWeight = 'bold'; // Make the label text bold

        html.appendChild(divIcon);
        html.appendChild(divText);
    // Create and add the marker
    const domIcon = new H.map.DomIcon(html);
    const marker = new H.map.DomMarker(coordinates, { icon: domIcon });
    this.map.addObject(marker);

    // Optional: Add a bubble or event listener if required
    marker.addEventListener('tap', () => {
      this.showInfoBubble(marker, el);
    });
  });
}

/**
 * Parses a string coordinate (e.g., "28.295683,77.526185") into an object.
 * @param geocoord The coordinate string.
 * @returns Parsed coordinates or null if invalid.
 */
parseCoordinates(geocoord: string) {
  if (!geocoord) return null;
   
   
  const [lat, lng] = geocoord.split(',');
  console.log(lat);

  return { lat, lng };
}

/**
 * Displays an info bubble for a marker with the associated data.
 * @param marker The marker object.
 * @param data The data to display in the bubble.
 */
showInfoBubble(marker, data: any): void {
  this.ui.getBubbles().forEach((bubble) => this.ui.removeBubble(bubble)); // Clear previous bubbles

  const content = `
    <div>
      <strong>${data?.location_name || 'Unknown Location'}</strong><br/>
      Location ID: ${data?.location_id || 'N/A'}<br/>
      Coordinates: ${marker.getGeometry().lat}, ${marker.getGeometry().lng}
    </div>
  `;

  const infoBubble = new H.ui.InfoBubble(marker.getGeometry(), { content });
  this.ui.addBubble(infoBubble);
}



  ///////////////////////////////////////////Popup function////////////////////////////////////////////
  actionPopup(id,val){
    this.tripSingle={ 
       TripId: val?.ShipmentNo,
      RunDate: val?.RunDate,  // Replace this with actual `RunDate` if available
      Route: val?.Route,
      Vehicle: val?.VehicleNo}
    console.log(this.tripSingle);
    
    this.SpinnerService.show('alertSpinner')
    $('#alertPopUp').modal('show');
      const formData=new FormData()
      formData.append('AccessToken',this.token)
      formData.append('MTripId',id)
      this.service.genericTDDetails(formData).subscribe((res: any) => {
        
        // this.tripArray=res?.MainDashboard
        
        console.log("working",res);
        if(res?.Status=='fail'){
          alert(res?.Message)
          return
        }
        this.SpinnerService.hide('alertSpinner')
        this.tripSingle.details=res?.TripDetails
        console.log("details",this.tripSingle);
        this.tripHeader()
        this.tripDetail()
          
        // this.tripHeader()
        // this.tripSingle={ 
        //   TripId: val?.ShipmentNo,
        //  RunDate: val?.RunDate,  // Replace this with actual `RunDate` if available
        //  Route: val?.Route,
        //  Vehicle: val?.VehicleNo}
        
        // console.log(this.SpinnerService);
        
        // this.masterUploadTable()
        // if(res.Status=='success')
        // {
       
        //  this.tripArray=res?.MainDashboard
        //  this.dashboardHeader=res?.Header[0]
        //  console.log("dashboardHeader",this.dashboardHeader);
         
        //  this.masterUploadTable()
        //  this.SpinnerService.hide('tableSpinner')
        // }
        // else{
        //   this.SpinnerService.hide('tableSpinner')
        // }
        // this.routeId = (res?.data);
        // console.log("customerList", this.routeId);
  
      },(error) => {
        console.error('error getting data', error);
        this.SpinnerService.hide('tableSpinner')
      })
  
   
    
  
  }
  linkPopup(val:any){
    this.SpinnerService.show('linkSpinner')
    console.log("hii");
    $('#linkModal').modal('show');
    const formData=new FormData;
    formData.append('AccessToken',this.token);
    formData.append('ShipmentNo',val?.ShipmentNo)
    formData.append('VehicleLastTime',val?.VehicleLastTime)
    this.service.genericTDLink(formData).subscribe((res: any) => {
     
      // this.tripArray=res?.MainDashboard
      
      console.log("genericDashboard", res);
      // console.log(this.SpinnerService);
   
      // this.masterUploadTable()
      if(res?.Status=='success')
      {
       
       this.linkValue=res?.Link
      //  this.dashboardHeader=res?.Header
      //  console.log("dashboardHeader",this.tripArray);
       
      //  this.masterUploadTable()
       this.SpinnerService.hide('tableSpinner')
      //  this.initChart()
       }
       else{
        this.linkValue=res?.Message
       }
      // this.routeId = (res?.data);
      // console.log("customerList", this.routeId);
      this.SpinnerService.hide('linkSpinner')
    },(error) => {
      console.error('error getting data', error);
      this.SpinnerService.hide('linkSpinner')
    })
   
  }
  closeLinkModal(){
    console.log("hii"); 
    this.linkObject.text="Copy to clipboard"
    this.linkObject.copyVariable=true
  }
  copyToClipboard() {
    const linkInput = document.getElementById("linkTextQ") as HTMLInputElement;
     console.log(linkInput);
     
    if (linkInput) {
      navigator.clipboard.writeText(linkInput.value)
        .then(() => {
          this.linkObject.text='Copied!'
          this.linkObject.copyVariable=false
          console.log("Link copied to clipboard!");
        })
        .catch(err => {
          console.error("Could not copy text: ", err);
        });
    }
  }
  


  addexpenceID(value)
  {
    this.tripId=value;
    console.log(" addExpense", this.tripId);
  }
  addExpenseF(value)
  {
    console.log(" addExpense", value);
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    formdataCustomer.append('TripId', this.tripId);
    formdataCustomer.append('ExpenseTypeId', value?.expense?.id);

    formdataCustomer.append('ExpenseDate',value?. from_time);
    formdataCustomer.append('ExpenseAmount', value?.Amount);
    formdataCustomer.append('ExpCredit_Debit', '');
    formdataCustomer.append('Remark', value?.Remarks
    );


    this.service.AddexpenceS(formdataCustomer).subscribe((res: any) => {
      console.log("expenseList", res);
      alert(res?.Message)
      $('#expensivetripModal').modal('hide');
      
      

    })
  }
  expenseList() {
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    // formdataCustomer.append('GroupId', '0986');
    // formdataCustomer.append('UserType', 'master');
    // formdataCustomer.append('DataFilter', js);


    this.service.expenseListS(formdataCustomer).subscribe((res: any) => {
      console.log("expenseList", res);
      this.expenseListdata = res.data;

    })
  }

  cancelTripF(value)
  {
    this.tripId=value
    // console.log("cancelTripvvF",value);
    // return value
    
   
  }
  cancelSubmit(value)
  {
   
    console.log("cancelTripF",value);
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    formdataCustomer.append('TripId', this.tripId);
    formdataCustomer.append('Remark', value.remarks);
    // formdataCustomer.append('DataFilter', js);
    
    
    this.service.cancelTripS(formdataCustomer).subscribe((res: any) => {
      console.log("cancel",res);
      alert(res.Message)
      $('#canceltripModal').modal('hide');
      // this.dashBoardData()
    })
  }
  onFilterDriver(value) {
    console.log('value', value);
    var formdata: any = new FormData();
    formdata.append('AccessToken', this.token);
    formdata.append('FromDate', value?.from_timeD || '');
    formdata.append('ToDate', value?.to_timeD || '');
    if(this.GroupTypeId==3)
    formdata.append('UserCategory', 'Transporter');
  else
    formdata.append('UserCategory','Customer')
    formdata.append('TransporterID', '');
    console.log(formdata);

    this.service.Driverdashboard(formdata).subscribe((res: any) => {
     
      this.driverData = res?.Driver_Data;
     console.log("driver data",res);
     

    });

  }
  closeTrip(data)
  {
    this.location=[]
    let demo:any=[]
    this.tripId=data?.MTripId
    console.log(this.tripId);
    
    // this.tripData=data;
    console.log("close",data);
    for(var i=1;i<data?.Customer?.length;i++) {
      if(data?.Customer[i]?.in_flag!=1&&data?.Customer[i].location_sequence!=0)

        {
          demo.push(data?.Customer[i])
          this.location.push(data?.Customer[i])
        }


    }
    console.log("data",data)
  }
  closeTripF(value)
  {
    // let k=this.tripData.customer.length-1;
    console.log("close",value);
    console.log("closeTripF",this.tripId,value);
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    formdataCustomer.append('TripId', this.tripId);
    formdataCustomer.append('CustomerId', value.location);
    
    formdataCustomer.append('EpodDate', value.time);
    formdataCustomer.append('Remarks', value.remarks);
    formdataCustomer.append('EpodDocument', value.file);
    formdataCustomer.append('ClosingOdometerReading', value.odometer);
    
    $('#closetripModal').modal('hide');
    this.service.closeTrip(formdataCustomer).subscribe((res: any) => {
     
      console.log("close",res);
      alert(res.Message)
      if(res?.Status=='success')
      this.dashboardData()
    })
  }
  updateDriveTrip(data){
    console.log(data);
    var formdata: any = new FormData();
    formdata.append('AccessToken', this.token);
    formdata.append('TripId', this.tripId);
    formdata.append('DriverName', data?.vehicle.Name);
    formdata.append('DriverNumber', data?.vehicle.MobileNo);
 
    console.log(formdata);

    this.service.cvUpdateDriver(formdata).subscribe((res: any) => {
     if(res.Status==='success')
     {
       $('#updateDriverModal').modal('hide');
       alert(res.Message)
      //  this.dashBoardData()
     }
     console.log("driver data",res);
    });
  }

  transShipment(item){
    console.log(item,"trans-shipment");
    $('#transShipModal').modal('hide');
  }
  ////////////////////////////////////////////////////////////////
  masterUploadTable() {
    var tbl = $('#masterUpload');
    var table = $('#masterUpload').DataTable();
    console.log("Qalbe",table);
    
    // table.clear();
    table.destroy();
    // table.draw()
    // $('#masterUpload').DataTable().clear;
    // if(datatable.length!=)

    //  $('#masterUpload tbody').empty();

    $(document).ready(function () {
      $('#masterUpload').DataTable({
        language: {
          search: '',
          searchPlaceholder: 'Search',
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
        // dom: '<f>t',
        //  dom: 'Bfrtip',

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
            charset: 'utf-8',
            extension: '.csv',

            // fieldSeparator: ';',
            // fieldBoundary: '',
            filename: 'export',
            bom: true,
            columns: ':visible',

            exportOptions: {
              columns: ':visible',
            },
            title: 'report',
          },
          {
            extend: 'pdf',
            footer: true,
            orientation: 'landscape',
            pageSize: 'LEGAL',

            autoClose: 'true',

            titleAttr: 'Download Pdf file',
            tag: 'span',
            charset: 'utf-8',
            // extension: '.pdf',
            columns: ':visible',
            // fieldSeparator: ';',
            // fieldBoundary: '',
            // filename: 'export',
            bom: true,

            className: 'datatablepdf-btn fa fa-file-pdf-o ',
            text: '',
            customize: function (doc) {
              //   pdfMake.fonts = {
              //     Roboto: {
              //         normal: 'Roboto-Regular.ttf',
              //         bold: 'Roboto-Medium.ttf',
              //         italics: 'Roboto-Italic.ttf',
              //         bolditalics: 'Roboto-MediumItalic.ttf'
              //     },
              //     nikosh: {
              //         normal: "NikoshBAN.ttf",
              //         bold: "NikoshBAN.ttf",
              //         italics: "NikoshBAN.ttf",
              //         bolditalics: "NikoshBAN.ttf"
              //     }
              // };
              var colCount = new Array();
              $(tbl)
                .find('tbody tr:first-child td')
                .each(() => {
                  if ($(this).attr('colspan')) {
                    for (var i = 1; i <= $(this).attr('colspan'); i++) {
                      colCount.push('*');
                    }
                  } else {
                    colCount.push('*');
                  }
                });
              // doc.defaultStyle.font = "arial";
              doc.content[1].table.widths = colCount;
              // doc.defaultStyle.fontSize = 'Arial';
              // processDoc(doc);

              // doc.defaultStyle= {alef:'alef' } ;
            },

            exportOptions: {
              columns: ':visible',
              //  columns: [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 ]
            },
            title: 'report',
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

    // setTimeout(() => {
    //   this.SpinnerService.hide();
    // }, 3000);
  }
  tripHeader() {
    var tbl = $('#tripHeaderTable');
    var table = $('#tripHeaderTable').DataTable()
    console.log("Qalbe",table);
    
    // table.clear();
    // table.destroy();
    // table.draw()
    // $('#masterUpload').DataTable().clear;
    // if(datatable.length!=)

    //  $('#masterUpload tbody').empty();

    $(document).ready(function () {
      $('#tripHeaderTable').DataTable({
        language: {
          search: '',
          searchPlaceholder: 'Search',
        },
        pageLength: 10,
        fixedHeader: true,
        // scrollX: true,
        
        ordering: true,
        scrollY: '450px',
        scrollCollapse: true,
        paging: false,
        scrollX: true,
        destroy: true,
        responsive: true,
        // dom: '<f>t',
        //  dom: 'Bfrtip',

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
            charset: 'utf-8',
            extension: '.csv',

            // fieldSeparator: ';',
            // fieldBoundary: '',
            filename: 'export',
            bom: true,
            columns: ':visible',

            exportOptions: {
              columns: ':visible',
            },
            title: 'report',
          },
          {
            extend: 'pdf',
            footer: true,
            orientation: 'landscape',
            pageSize: 'LEGAL',

            autoClose: 'true',

            titleAttr: 'Download Pdf file',
            tag: 'span',
            charset: 'utf-8',
            // extension: '.pdf',
            columns: ':visible',
            // fieldSeparator: ';',
            // fieldBoundary: '',
            // filename: 'export',
            bom: true,

            className: 'datatablepdf-btn fa fa-file-pdf-o ',
            text: '',
            customize: function (doc) {
              //   pdfMake.fonts = {
              //     Roboto: {
              //         normal: 'Roboto-Regular.ttf',
              //         bold: 'Roboto-Medium.ttf',
              //         italics: 'Roboto-Italic.ttf',
              //         bolditalics: 'Roboto-MediumItalic.ttf'
              //     },
              //     nikosh: {
              //         normal: "NikoshBAN.ttf",
              //         bold: "NikoshBAN.ttf",
              //         italics: "NikoshBAN.ttf",
              //         bolditalics: "NikoshBAN.ttf"
              //     }
              // };
              var colCount = new Array();
              $(tbl)
                .find('tbody tr:first-child td')
                .each(() => {
                  if ($(this).attr('colspan')) {
                    for (var i = 1; i <= $(this).attr('colspan'); i++) {
                      colCount.push('*');
                    }
                  } else {
                    colCount.push('*');
                  }
                });
              // doc.defaultStyle.font = "arial";
              doc.content[1].table.widths = colCount;
              // doc.defaultStyle.fontSize = 'Arial';
              // processDoc(doc);

              // doc.defaultStyle= {alef:'alef' } ;
            },

            exportOptions: {
              columns: ':visible',
              //  columns: [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 ]
            },
            title: 'report',
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

    // setTimeout(() => {
    //   this.SpinnerService.hide();
    // }, 3000);
  }
  tripDetail() {
    var tbl = $('#tripDetailTable');
    var table = $('#tripDetailTable').DataTable();
    console.log("Qalbe",table);
    
    table.clear();
    table.destroy();
    // table.draw()
    // $('#masterUpload').DataTable().clear;
    // if(datatable.length!=)

    //  $('#masterUpload tbody').empty();

    $(document).ready(function () {
      $('#tripDetailTable').DataTable({
        language: {
          search: '',
          searchPlaceholder: 'Search',
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
        // dom: '<f>t',
        //  dom: 'Bfrtip',

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
            charset: 'utf-8',
            extension: '.csv',

            // fieldSeparator: ';',
            // fieldBoundary: '',
            filename: 'export',
            bom: true,
            columns: ':visible',

            exportOptions: {
              columns: ':visible',
            },
            title: 'report',
          },
          {
            extend: 'pdf',
            footer: true,
            orientation: 'landscape',
            pageSize: 'LEGAL',

            autoClose: 'true',

            titleAttr: 'Download Pdf file',
            tag: 'span',
            charset: 'utf-8',
            // extension: '.pdf',
            columns: ':visible',
            // fieldSeparator: ';',
            // fieldBoundary: '',
            // filename: 'export',
            bom: true,

            className: 'datatablepdf-btn fa fa-file-pdf-o ',
            text: '',
            customize: function (doc) {
              //   pdfMake.fonts = {
              //     Roboto: {
              //         normal: 'Roboto-Regular.ttf',
              //         bold: 'Roboto-Medium.ttf',
              //         italics: 'Roboto-Italic.ttf',
              //         bolditalics: 'Roboto-MediumItalic.ttf'
              //     },
              //     nikosh: {
              //         normal: "NikoshBAN.ttf",
              //         bold: "NikoshBAN.ttf",
              //         italics: "NikoshBAN.ttf",
              //         bolditalics: "NikoshBAN.ttf"
              //     }
              // };
              var colCount = new Array();
              $(tbl)
                .find('tbody tr:first-child td')
                .each(() => {
                  if ($(this).attr('colspan')) {
                    for (var i = 1; i <= $(this).attr('colspan'); i++) {
                      colCount.push('*');
                    }
                  } else {
                    colCount.push('*');
                  }
                });
              // doc.defaultStyle.font = "arial";
              doc.content[1].table.widths = colCount;
              // doc.defaultStyle.fontSize = 'Arial';
              // processDoc(doc);

              // doc.defaultStyle= {alef:'alef' } ;
            },

            exportOptions: {
              columns: ':visible',
              //  columns: [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 ]
            },
            title: 'report',
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

    // setTimeout(() => {
    //   this.SpinnerService.hide();
    // }, 3000);
  }

  chartFunction(id:string,name:string,data:any[],colors:string[]){
    let chartDom: any = document.getElementById(id);
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '120px'; // Specify units (e.g., pixels)
    chartDom.style.width = '120px';
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
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        show: false,
        orient: 'horizontal',
        left: 'left',
        // top:60,
        bottom: -6,
        textStyle: {
          fontSize: 10,
          fontweight: 'bold',
          // lineHeight: 10, // Adjust the line height if necessary
          // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
        },
        itemHeight: 8,
        itemWidth: 8,
        // data: ['Running', 'Stop','In-Active','Non GPS'],
        layout: 'horizontal',
        // align: 'right',
        // verticalAlign: 'bottom',
        borderWidth: 0,
        width: '100%',
      },
      series: [
        {
          name: name,
          type: 'pie',
          radius: ['64%', '90%'],
          avoidLabelOverlap: false,
          color: colors,
          label: {
            show: false,
            // position: 'center'
            position: 'inside',
            fontSize: '15',
            // rotate:'145',
            color: 'white',
            formatter: '{c}', // display value
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '13',
              color: 'black',
              // rotate:'120',
              fontWeight: 'bold',
            },
            itemStyle: {
              borderWidth: 14,  // Increases border width (thickness) on hover
              // borderColor: 'black'  // Optionally change color on hover
            }
          },
          labelLine: {
            show: false,
          },
          data:data
        },
        {
          type: 'pie',
          radius: ['0%', '40%'],
          silent: true,
          color: 'white',

          label: {
            show: true,
            position: 'center',
            color: '#1D4380',

            formatter: function (params) {
              var total = 0;
              for (var i = 0; i < option.series[0].data.length; i++) {
                total += option.series[0].data[i].value;
              }
              return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
              // return  total;
            },
            fontSize: 16,
            fontWeight: 'bold',
          },
          data: [{ value: 1, name: 'Total' }],
        },
      ],
    };

    option && echart.setOption(option);
    let innerDiv = chartDom.querySelector('div');
    innerDiv.style.zIndex = '1';

    console.log(innerDiv);
    //   echart.on('click',  (params) => {
    //     if (params.componentType === 'series') {
    //         // Access the clicked data
    //         var name = params.name;
    //         var value = params.value;

    //         console.log('You clicked on', name, 'with value', value);

    //         if(name=='Good')
    //           {
    //             this.consSTtAct('ConsignmentStatus','GoodTrips');
    //           }
    //        else   if(name=='KPI Violation')
    //             {
    //               this.consSTtAct('ConsignmentStatus','KPIViolation');
    //             }
    //             else   if(name=='In-Active')
    //               {
    //                 this.consSTtAct('ConsignmentStatus','InActive');
    //               }
    //               else   if(name=='Non GPS')
    //                 {
    //                   this.consSTtAct('ConsignmentStatus','NonGps');
    //                 }

    //         // Perform actions based on the clicked segment
    //         // alert('You clicked on ' + name + ' with value ' + value);
    //     }
    // });
  }

  chart1() {
    let chartDom: any = document.getElementById('consSt');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '120px'; // Specify units (e.g., pixels)
    chartDom.style.width = '120px';
   
    
    

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
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        show: false,
        orient: 'horizontal',
        left: 'left',
        // top:60,
        bottom: -6,
        textStyle: {
          fontSize: 10,
          fontweight: 'bold',
          // lineHeight: 10, // Adjust the line height if necessary
          // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
        },
        itemHeight: 8,
        itemWidth: 8,
        // data: ['Running', 'Stop','In-Active','Non GPS'],
        layout: 'horizontal',
        // align: 'right',
        // verticalAlign: 'bottom',
        borderWidth: 0,
        width: '100%',
      },
      series: [
        {
          name: 'Trip',
          type: 'pie',
          radius: ['64%', '90%'],
          avoidLabelOverlap: false,
          color: ['rgb(239, 91, 11)', '#1D4380', 'red', 'grey'],
          label: {
            show: false,
            // position: 'center'
            position: 'inside',
            fontSize: '15',
            // rotate:'145',
            color: 'white',
            formatter: '{c}', // display value
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '13',
              color: 'black',
              // rotate:'120',
              fontWeight: 'bold',
            },
            itemStyle: {
              borderWidth: 14,  // Increases border width (thickness) on hover
              // borderColor: 'black'  // Optionally change color on hover
            }
          },
          labelLine: {
            show: false,
          },
          data: [
            // { value:cons?.Good , name: 'Good' },
            // { value:cons?.KpiViolation, name: 'KPI Violation' },
            // { value: cons?.InActive, name: 'In-Active' },
            // { value: cons?.NoGps, name: 'Non GPS' },
            {
              value: this.dashboardHeader?.TripCompleted,
              name: 'Completed Trip',
            },
            {
              value: this.dashboardHeader?.TripSchedule,
              name: 'Scheduled Trip',
            },
            // { value: 30, name: 'In-Active'},
            // { value:55, name: 'Non GPS' },
          ],
        },
        {
          type: 'pie',
          radius: ['0%', '40%'],
          silent: true,
          color: 'white',

          label: {
            show: true,
            position: 'center',
            color: '#1D4380',

            formatter: function (params) {
              var total = 0;
              for (var i = 0; i < option.series[0].data.length; i++) {
                total += option.series[0].data[i].value;
              }
              return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
              // return  total;
            },
            fontSize: 16,
            fontWeight: 'bold',
          },
          data: [{ value: 1, name: 'Total' }],
        },
      ],
    };

    option && echart.setOption(option);
    let innerDiv = chartDom.querySelector('div');
    innerDiv.style.zIndex = '1';

    console.log(innerDiv);
    //   echart.on('click',  (params) => {
    //     if (params.componentType === 'series') {
    //         // Access the clicked data
    //         var name = params.name;
    //         var value = params.value;

    //         console.log('You clicked on', name, 'with value', value);

    //         if(name=='Good')
    //           {
    //             this.consSTtAct('ConsignmentStatus','GoodTrips');
    //           }
    //        else   if(name=='KPI Violation')
    //             {
    //               this.consSTtAct('ConsignmentStatus','KPIViolation');
    //             }
    //             else   if(name=='In-Active')
    //               {
    //                 this.consSTtAct('ConsignmentStatus','InActive');
    //               }
    //               else   if(name=='Non GPS')
    //                 {
    //                   this.consSTtAct('ConsignmentStatus','NonGps');
    //                 }

    //         // Perform actions based on the clicked segment
    //         // alert('You clicked on ' + name + ' with value ' + value);
    //     }
    // });
  }

  chartDelay() {
    let chartDom: any = document.getElementById('chartDelay');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '120px'; // Specify units (e.g., pixels)
    chartDom.style.width = '120px';
    chartDom.style.padding='0px'

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
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        show: false,
        orient: 'horizontal',
        left: 'left',
        // top:60,
        bottom: -6,
        textStyle: {
          fontSize: 10,
          fontweight: 'bold',
          // lineHeight: 10, // Adjust the line height if necessary
          // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
        },
        itemHeight: 8,
        itemWidth: 8,
        // data: ['Running', 'Stop','In-Active','Non GPS'],
        layout: 'horizontal',
        // align: 'right',
        // verticalAlign: 'bottom',
        borderWidth: 0,
        width: '100%',
      },
      series: [
        {
          name: 'Delay',
          type: 'pie',
          radius: ['64%', '90%'],
          avoidLabelOverlap: false,
          color: ['#C7C7CC', '#FF3B30', '#34C759', 'grey'],
          label: {
            show: false,
            // position: 'center'
            position: 'inside',
            fontSize: '15',
            // rotate:'145',
            color: 'white',
            formatter: '{c}', // display value
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '13',
              color: 'black',
              // rotate:'120',
              fontWeight: 'bold',
            },
            itemStyle: {
              borderWidth: 14,  // Increases border width (thickness) on hover
              // borderColor: 'black'  // Optionally change color on hover
            }
          },
          labelLine: {
            show: false,
          },
          data: [
            // { value:cons?.Good , name: 'Good' },
            // { value:cons?.KpiViolation, name: 'KPI Violation' },
            // { value: cons?.InActive, name: 'In-Active' },
            // { value: cons?.NoGps, name: 'Non GPS' },
            {
              value: this.dashboardHeader?.Delay,
              name: 'Delay',
            },
            {
              value: this.dashboardHeader?.CriticalDelay,
              name: 'Critical Delay',
            },
            {
              value: this.dashboardHeader?.OnTimeTrip,
              name: 'On Time',
            },
            // { value: 30, name: 'In-Active'},
            // { value:55, name: 'Non GPS' },
          ],
        },
        {
          type: 'pie',
          radius: ['0%', '40%'],
          silent: true,
          color: 'white',

          label: {
            show: true,
            position: 'center',
            color: '#1D4380',

            formatter: function (params) {
              var total = 0;
              for (var i = 0; i < option.series[0].data.length; i++) {
                total += option.series[0].data[i].value;
              }
              return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
              // return  total;
            },
            fontSize: 16,
            fontWeight: 'bold',
          },
          data: [{ value: 1, name: 'Total' }],
        },
      ],
    };

    option && echart.setOption(option);
    let innerDiv = chartDom.querySelector('div');
    innerDiv.style.zIndex = '1';
    //   echart.on('click',  (params) => {
    //     if (params.componentType === 'series') {
    //         // Access the clicked data
    //         var name = params.name;
    //         var value = params.value;

    //         console.log('You clicked on', name, 'with value', value);

    //         if(name=='Good')
    //           {
    //             this.consSTtAct('ConsignmentStatus','GoodTrips');
    //           }
    //        else   if(name=='KPI Violation')
    //             {
    //               this.consSTtAct('ConsignmentStatus','KPIViolation');
    //             }
    //             else   if(name=='In-Active')
    //               {
    //                 this.consSTtAct('ConsignmentStatus','InActive');
    //               }
    //               else   if(name=='Non GPS')
    //                 {
    //                   this.consSTtAct('ConsignmentStatus','NonGps');
    //                 }

    //         // Perform actions based on the clicked segment
    //         // alert('You clicked on ' + name + ' with value ' + value);
    //     }
    // });
  }

  chartETA() {
    let chartDom: any = document.getElementById('chartETA');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '120px'; // Specify units (e.g., pixels)
    chartDom.style.width = '120px';
    chartDom.style.padding='0px'

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
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        show: false,
        orient: 'horizontal',
        left: 'left',
        // top:60,
        bottom: -6,
        textStyle: {
          fontSize: 10,
          fontweight: 'bold',
          // lineHeight: 10, // Adjust the line height if necessary
          // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
        },
        itemHeight: 8,
        itemWidth: 8,
        // data: ['Running', 'Stop','In-Active','Non GPS'],
        layout: 'horizontal',
        // align: 'right',
        // verticalAlign: 'bottom',
        borderWidth: 0,
        width: '100%',
      },
      series: [
        {
          name: 'ETA',
          type: 'pie',
          radius: ['64%', '90%'],
          avoidLabelOverlap: false,
          color: ['#FDB92A', '#34C759', '#34C759', 'grey'],
          label: {
            show: false,
            // position: 'center'
            position: 'inside',
            fontSize: '15',
            // rotate:'145',
            color: 'white',
            formatter: '{c}', // display value
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '13',
              color: 'black',
              // rotate:'120',
              fontWeight: 'bold',
            },
            itemStyle: {
              borderWidth: 14,  // Increases border width (thickness) on hover
              // borderColor: 'black'  // Optionally change color on hover
            }
          },
          labelLine: {
            show: false,
          },
          data: [
            // { value:cons?.Good , name: 'Good' },
            // { value:cons?.KpiViolation, name: 'KPI Violation' },
            // { value: cons?.InActive, name: 'In-Active' },
            // { value: cons?.NoGps, name: 'Non GPS' },
            {
              value: this.dashboardHeader?.ETA_2Hrs,
              name: 'less than 2 hrs',
            },
            {
              value: this.dashboardHeader?.ETA_2HrsMore,
              name: 'more than 2 hrs',
            },
            // { value: 30, name: 'In-Active'},
            // { value:55, name: 'Non GPS' },
          ],
        },
        {
          type: 'pie',
          radius: ['0%', '40%'],
          silent: true,
          color: 'white',

          label: {
            show: true,
            position: 'center',
            color: '#1D4380',

            formatter: function (params) {
              var total = 0;
              for (var i = 0; i < option.series[0].data.length; i++) {
                total += option.series[0].data[i].value;
              }
              return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
              // return  total;
            },
            fontSize: 16,
            fontWeight: 'bold',
          },
          data: [{ value: 1, name: 'Total' }],
        },
      ],
    };

    option && echart.setOption(option);
    let innerDiv = chartDom.querySelector('div');
    innerDiv.style.zIndex = '1';
    //   echart.on('click',  (params) => {
    //     if (params.componentType === 'series') {
    //         // Access the clicked data
    //         var name = params.name;
    //         var value = params.value;

    //         console.log('You clicked on', name, 'with value', value);

    //         if(name=='Good')
    //           {
    //             this.consSTtAct('ConsignmentStatus','GoodTrips');
    //           }
    //        else   if(name=='KPI Violation')
    //             {
    //               this.consSTtAct('ConsignmentStatus','KPIViolation');
    //             }
    //             else   if(name=='In-Active')
    //               {
    //                 this.consSTtAct('ConsignmentStatus','InActive');
    //               }
    //               else   if(name=='Non GPS')
    //                 {
    //                   this.consSTtAct('ConsignmentStatus','NonGps');
    //                 }

    //         // Perform actions based on the clicked segment
    //         // alert('You clicked on ' + name + ' with value ' + value);
    //     }
    // });
  }
  chartStoppage() {
    let chartDom: any = document.getElementById('chartStoppage');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '120px'; // Specify units (e.g., pixels)
    chartDom.style.width = '120px';
    chartDom.style.padding='0px'

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
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        show: false,
        orient: 'horizontal',
        left: 'left',
        // top:60,
        bottom: -6,
        textStyle: {
          fontSize: 10,
          fontweight: 'bold',
          // lineHeight: 10, // Adjust the line height if necessary
          // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
        },
        itemHeight: 8,
        itemWidth: 8,
        // data: ['Running', 'Stop','In-Active','Non GPS'],
        layout: 'horizontal',
        // align: 'right',
        // verticalAlign: 'bottom',
        borderWidth: 0,
        width: '100%',
      },
      series: [
        {
          name: 'Stoppage',
          type: 'pie',
          radius: ['64%', '90%'],
          avoidLabelOverlap: false,
          color: ['#34C759', '#00C7BE', '#FF3B30', 'grey'],
          label: {
            show: false,
            // position: 'center'
            position: 'inside',
            fontSize: '15',
            // rotate:'145',
            color: 'white',
            formatter: '{c}', // display value
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '13',
              color: 'black',
              // rotate:'120',
              fontWeight: 'bold',
            },
            itemStyle: {
              borderWidth: 14,  // Increases border width (thickness) on hover
              // borderColor: 'black'  // Optionally change color on hover
            }
          },
          labelLine: {
            show: false,
          },
          data: [
            // { value:cons?.Good , name: 'Good' },
            // { value:cons?.KpiViolation, name: 'KPI Violation' },
            // { value: cons?.InActive, name: 'In-Active' },
            // { value: cons?.NoGps, name: 'Non GPS' },
            {
              value: this.dashboardHeader?.Running,
              name: 'Running',
            },
            {
              value: this.dashboardHeader?.Stop_2HrsLess,
              name: 'less than 2 hrs',
            },
            {
              value: this.dashboardHeader?.Stop_2Hrs,
              name: 'more than 2 hrs',
            },
            // { value: 30, name: 'In-Active'},
            // { value:55, name: 'Non GPS' },
          ],
        },
        {
          type: 'pie',
          radius: ['0%', '40%'],
          silent: true,
          color: 'white',

          label: {
            show: true,
            position: 'center',
            color: '#1D4380',

            formatter: function (params) {
              var total = 0;
              for (var i = 0; i < option.series[0].data.length; i++) {
                total += option.series[0].data[i].value;
              }
              return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
              // return  total;
            },
            fontSize: 16,
            fontWeight: 'bold',
          },
          data: [{ value: 1, name: 'Total' }],
        },
      ],
    };

    option && echart.setOption(option);
    let innerDiv = chartDom.querySelector('div');
    innerDiv.style.zIndex = '1';
    //   echart.on('click',  (params) => {
    //     if (params.componentType === 'series') {
    //         // Access the clicked data
    //         var name = params.name;
    //         var value = params.value;

    //         console.log('You clicked on', name, 'with value', value);

    //         if(name=='Good')
    //           {
    //             this.consSTtAct('ConsignmentStatus','GoodTrips');
    //           }
    //        else   if(name=='KPI Violation')
    //             {
    //               this.consSTtAct('ConsignmentStatus','KPIViolation');
    //             }
    //             else   if(name=='In-Active')
    //               {
    //                 this.consSTtAct('ConsignmentStatus','InActive');
    //               }
    //               else   if(name=='Non GPS')
    //                 {
    //                   this.consSTtAct('ConsignmentStatus','NonGps');
    //                 }

    //         // Perform actions based on the clicked segment
    //         // alert('You clicked on ' + name + ' with value ' + value);
    //     }
    // });
  }
  chartAlerts() {
    let chartDom: any = document.getElementById('chartAlerts');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '120px'; // Specify units (e.g., pixels)
    chartDom.style.width = '120px';
    chartDom.style.padding='0px'

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
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        show: false,
        orient: 'horizontal',
        left: 'left',
        // top:60,
        bottom: -6,
        textStyle: {
          fontSize: 10,
          fontweight: 'bold',
          // lineHeight: 10, // Adjust the line height if necessary
          // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
        },
        itemHeight: 8,
        itemWidth: 8,
        // data: ['Running', 'Stop','In-Active','Non GPS'],
        layout: 'horizontal',
        // align: 'right',
        // verticalAlign: 'bottom',
        borderWidth: 0,
        width: '100%',
      },
      series: [
        {
          name: 'Alerts',
          type: 'pie',
          radius: ['64%', '90%'],
          avoidLabelOverlap: false,
          color: ['#E77817', '#FF3B30', '#D0CEBB', 'grey'],
          label: {
            show: false,
            // position: 'center'
            position: 'inside',
            fontSize: '15',
            // rotate:'145',
            color: 'white',
            formatter: '{c}', // display value
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '13',
              color: 'black',
              // rotate:'120',
              fontWeight: 'bold',
            },
            itemStyle: {
              borderWidth: 14,  // Increases border width (thickness) on hover
              // borderColor: 'black'  // Optionally change color on hover
            }
          },
          labelLine: {
            show: false,
          },
          data: [
            // { value:cons?.Good , name: 'Good' },
            // { value:cons?.KpiViolation, name: 'KPI Violation' },
            // { value: cons?.InActive, name: 'In-Active' },
            // { value: cons?.NoGps, name: 'Non GPS' },
            {
              value: this.dashboardHeader?.LockAlert,
              name: 'Lock Alert',
            },
            {
              value: this.dashboardHeader?.Halt,
              name: 'Halt Alert',
            },
            {
              value: this.dashboardHeader?.RouteDeviation,
              name: 'Route Deviation',
            },
            // { value: 30, name: 'In-Active'},
            // { value:55, name: 'Non GPS' },
          ],
        },
        {
          type: 'pie',
          radius: ['0%', '40%'],
          silent: true,
          color: 'white',

          label: {
            show: true,
            position: 'center',
            color: '#1D4380',

            formatter: function (params) {
              var total = 0;
              for (var i = 0; i < option.series[0].data.length; i++) {
                total += option.series[0].data[i].value;
              }
              return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
              // return  total;
            },
            fontSize: 16,
            fontWeight: 'bold',
          },
          data: [{ value: 1, name: 'Total' }],
        },
      ],
    };

    option && echart.setOption(option);
    let innerDiv = chartDom.querySelector('div');
    innerDiv.style.zIndex = '1';
    //   echart.on('click',  (params) => {
    //     if (params.componentType === 'series') {
    //         // Access the clicked data
    //         var name = params.name;
    //         var value = params.value;

    //         console.log('You clicked on', name, 'with value', value);

    //         if(name=='Good')
    //           {
    //             this.consSTtAct('ConsignmentStatus','GoodTrips');
    //           }
    //        else   if(name=='KPI Violation')
    //             {
    //               this.consSTtAct('ConsignmentStatus','KPIViolation');
    //             }
    //             else   if(name=='In-Active')
    //               {
    //                 this.consSTtAct('ConsignmentStatus','InActive');
    //               }
    //               else   if(name=='Non GPS')
    //                 {
    //                   this.consSTtAct('ConsignmentStatus','NonGps');
    //                 }

    //         // Perform actions based on the clicked segment
    //         // alert('You clicked on ' + name + ' with value ' + value);
    //     }
    // });
  }
  chartGPS() {
    let chartDom: any = document.getElementById('chartGPS');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '120px'; // Specify units (e.g., pixels)
    chartDom.style.width = '120px';
    chartDom.style.padding='0px'

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
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        show: false,
        orient: 'horizontal',
        left: 'left',
        // top:60,
        bottom: -6,
        textStyle: {
          fontSize: 10,
          fontweight: 'bold',
          // lineHeight: 10, // Adjust the line height if necessary
          // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
        },
        itemHeight: 8,
        itemWidth: 8,
        // data: ['Running', 'Stop','In-Active','Non GPS'],
        layout: 'horizontal',
        // align: 'right',
        // verticalAlign: 'bottom',
        borderWidth: 0,
        width: '100%',
      },
      series: [
        {
          name: 'GPS',
          type: 'pie',
          radius: ['64%', '90%'],
          avoidLabelOverlap: false,
          color: ['#34C759', '#FF3B30', '#C7C7CC', '#000000'],
          label: {
            show: false,
            // position: 'center'
            position: 'inside',
            fontSize: '15',
            // rotate:'145',
            color: 'white',
            formatter: '{c}', // display value
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '13',
              color: 'black',
              // rotate:'120',
              fontWeight: 'bold',
            },
            itemStyle: {
              borderWidth: 14,  // Increases border width (thickness) on hover
              // borderColor: 'black'  // Optionally change color on hover
            }
          },
          labelLine: {
            show: false,
          },
          data: [
            // { value:cons?.Good , name: 'Good' },
            // { value:cons?.KpiViolation, name: 'KPI Violation' },
            // { value: cons?.InActive, name: 'In-Active' },
            // { value: cons?.NoGps, name: 'Non GPS' },
            {
              value: this.dashboardHeader?.Running,
              name: 'Running',
            },
            {
              value: this.dashboardHeader?.Stopped,
              name: 'Stopped',
            },
            {
              value: this.dashboardHeader?.InActive,
              name: 'Inactive',
            },
            {
              value: this.dashboardHeader?.NonGPS,
              name: 'Non GPS',
            },
            // { value: 30, name: 'In-Active'},
            // { value:55, name: 'Non GPS' },
          ],
        },
        {
          type: 'pie',
          radius: ['0%', '40%'],
          silent: true,
          color: 'white',

          label: {
            show: true,
            position: 'center',
            color: '#1D4380',

            formatter: function (params) {
              var total = 0;
              for (var i = 0; i < option.series[0].data.length; i++) {
                total += option.series[0].data[i].value;
              }
              return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
              // return  total;
            },
            fontSize: 16,
            fontWeight: 'bold',
          },
          data: [{ value: 1, name: 'Total' }],
        },
      ],
    };

    option && echart.setOption(option);
    let innerDiv = chartDom.querySelector('div');
    innerDiv.style.zIndex = '1';
    //   echart.on('click',  (params) => {
    //     if (params.componentType === 'series') {
    //         // Access the clicked data
    //         var name = params.name;
    //         var value = params.value;

    //         console.log('You clicked on', name, 'with value', value);

    //         if(name=='Good')
    //           {
    //             this.consSTtAct('ConsignmentStatus','GoodTrips');
    //           }
    //        else   if(name=='KPI Violation')
    //             {
    //               this.consSTtAct('ConsignmentStatus','KPIViolation');
    //             }
    //             else   if(name=='In-Active')
    //               {
    //                 this.consSTtAct('ConsignmentStatus','InActive');
    //               }
    //               else   if(name=='Non GPS')
    //                 {
    //                   this.consSTtAct('ConsignmentStatus','NonGps');
    //                 }

    //         // Perform actions based on the clicked segment
    //         // alert('You clicked on ' + name + ' with value ' + value);
    //     }
    // });
  }
  chartFixedLock() {
    let chartDom: any = document.getElementById('chartFixedLock');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '120px'; // Specify units (e.g., pixels)
    chartDom.style.width = '120px';
    chartDom.style.padding='0px'

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
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        show: false,
        orient: 'horizontal',
        left: 'left',
        // top:60,
        bottom: -6,
        textStyle: {
          fontSize: 10,
          fontweight: 'bold',
          // lineHeight: 10, // Adjust the line height if necessary
          // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
        },
        itemHeight: 8,
        itemWidth: 8,
        // data: ['Running', 'Stop','In-Active','Non GPS'],
        layout: 'horizontal',
        // align: 'right',
        // verticalAlign: 'bottom',
        borderWidth: 0,
        width: '100%',
      },
      series: [
        {
          name: 'GPS',
          type: 'pie',
          radius: ['64%', '90%'],
          avoidLabelOverlap: false,
          color: ['#34C759', '#FF3B30', '#C7C7CC', '#000000'],
          label: {
            show: false,
            // position: 'center'
            position: 'inside',
            fontSize: '15',
            // rotate:'145',
            color: 'white',
            formatter: '{c}', // display value
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '13',
              color: 'black',
              // rotate:'120',
              fontWeight: 'bold',
            },
            itemStyle: {
              borderWidth: 14,  // Increases border width (thickness) on hover
              // borderColor: 'black'  // Optionally change color on hover
            }
          },
          labelLine: {
            show: false,
          },
          data: [
            // { value:cons?.Good , name: 'Good' },
            // { value:cons?.KpiViolation, name: 'KPI Violation' },
            // { value: cons?.InActive, name: 'In-Active' },
            // { value: cons?.NoGps, name: 'Non GPS' },
            {
              value: this.dashboardHeader?.FixedLockClose,
              name: 'Lock Close',
            },
            {
              value: this.dashboardHeader?.FixedLockOpen,
              name: 'Lock Open',
            },
            // {
            //   value: this.dashboardHeader?.InActive,
            //   name: 'Inactive',
            // },
            // {
            //   value: this.dashboardHeader?.NonGPS,
            //   name: 'Non GPS',
            // },
            // { value: 30, name: 'In-Active'},
            // { value:55, name: 'Non GPS' },
          ],
        },
        {
          type: 'pie',
          radius: ['0%', '40%'],
          silent: true,
          color: 'white',

          label: {
            show: true,
            position: 'center',
            color: '#1D4380',

            formatter: function (params) {
              var total = 0;
              for (var i = 0; i < option.series[0].data.length; i++) {
                total += option.series[0].data[i].value;
              }
              return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
              // return  total;
            },
            fontSize: 16,
            fontWeight: 'bold',
          },
          data: [{ value: 1, name: 'Total' }],
        },
      ],
    };

    option && echart.setOption(option);
    let innerDiv = chartDom.querySelector('div');
    innerDiv.style.zIndex = '1';
    //   echart.on('click',  (params) => {
    //     if (params.componentType === 'series') {
    //         // Access the clicked data
    //         var name = params.name;
    //         var value = params.value;

    //         console.log('You clicked on', name, 'with value', value);

    //         if(name=='Good')
    //           {
    //             this.consSTtAct('ConsignmentStatus','GoodTrips');
    //           }
    //        else   if(name=='KPI Violation')
    //             {
    //               this.consSTtAct('ConsignmentStatus','KPIViolation');
    //             }
    //             else   if(name=='In-Active')
    //               {
    //                 this.consSTtAct('ConsignmentStatus','InActive');
    //               }
    //               else   if(name=='Non GPS')
    //                 {
    //                   this.consSTtAct('ConsignmentStatus','NonGps');
    //                 }

    //         // Perform actions based on the clicked segment
    //         // alert('You clicked on ' + name + ' with value ' + value);
    //     }
    // });
  }
  chartPortableLock() {
    let chartDom: any = document.getElementById('portableElock');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '120px'; // Specify units (e.g., pixels)
    chartDom.style.width = '120px';
    chartDom.style.padding='0px'

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
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        show: false,
        orient: 'horizontal',
        left: 'left',
        // top:60,
        bottom: -6,
        textStyle: {
          fontSize: 10,
          fontweight: 'bold',
          // lineHeight: 10, // Adjust the line height if necessary
          // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
        },
        itemHeight: 8,
        itemWidth: 8,
        // data: ['Running', 'Stop','In-Active','Non GPS'],
        layout: 'horizontal',
        // align: 'right',
        // verticalAlign: 'bottom',
        borderWidth: 0,
        width: '100%',
      },
      series: [
        {
          name: 'GPS',
          type: 'pie',
          radius: ['64%', '90%'],
          avoidLabelOverlap: false,
          color: ['#34C759', '#FF3B30', '#C7C7CC', '#000000'],
          label: {
            show: false,
            // position: 'center'
            position: 'inside',
            fontSize: '15',
            // rotate:'145',
            color: 'white',
            formatter: '{c}', // display value
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '13',
              color: 'black',
              // rotate:'120',
              fontWeight: 'bold',
            },
            itemStyle: {
              borderWidth: 14,  // Increases border width (thickness) on hover
              // borderColor: 'black'  // Optionally change color on hover
            }
          },
          labelLine: {
            show: false,
          },
          data: [
            // { value:cons?.Good , name: 'Good' },
            // { value:cons?.KpiViolation, name: 'KPI Violation' },
            // { value: cons?.InActive, name: 'In-Active' },
            // { value: cons?.NoGps, name: 'Non GPS' },
            {
              value: this.dashboardHeader?.PortableLockClose,
              name: 'Running',
            },
            {
              value: this.dashboardHeader?.PortableLockOpen,
              name: 'Stopped',
            },
            // {
            //   value: this.dashboardHeader?.InActive,
            //   name: 'Inactive',
            // },
            // {
            //   value: this.dashboardHeader?.NonGPS,
            //   name: 'Non GPS',
            // },
            // { value: 30, name: 'In-Active'},
            // { value:55, name: 'Non GPS' },
          ],
        },
        {
          type: 'pie',
          radius: ['0%', '40%'],
          silent: true,
          color: 'white',

          label: {
            show: true,
            position: 'center',
            color: '#1D4380',

            formatter: function (params) {
              var total = 0;
              for (var i = 0; i < option.series[0].data.length; i++) {
                total += option.series[0].data[i].value;
              }
              return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
              // return  total;
            },
            fontSize: 16,
            fontWeight: 'bold',
          },
          data: [{ value: 1, name: 'Total' }],
        },
      ],
    };

    option && echart.setOption(option);
    let innerDiv = chartDom.querySelector('div');
    innerDiv.style.zIndex = '1';
    //   echart.on('click',  (params) => {
    //     if (params.componentType === 'series') {
    //         // Access the clicked data
    //         var name = params.name;
    //         var value = params.value;

    //         console.log('You clicked on', name, 'with value', value);

    //         if(name=='Good')
    //           {
    //             this.consSTtAct('ConsignmentStatus','GoodTrips');
    //           }
    //        else   if(name=='KPI Violation')
    //             {
    //               this.consSTtAct('ConsignmentStatus','KPIViolation');
    //             }
    //             else   if(name=='In-Active')
    //               {
    //                 this.consSTtAct('ConsignmentStatus','InActive');
    //               }
    //               else   if(name=='Non GPS')
    //                 {
    //                   this.consSTtAct('ConsignmentStatus','NonGps');
    //                 }

    //         // Perform actions based on the clicked segment
    //         // alert('You clicked on ' + name + ' with value ' + value);
    //     }
    // });
  }




}

