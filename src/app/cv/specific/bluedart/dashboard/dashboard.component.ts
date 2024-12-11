import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as echarts from 'echarts';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
// import { NgxSpinnerService } from 'ngx-spinner';
import { ModalComponent } from 'src/app/components/advanced-elements/modal/modal.component';
import { NavService } from 'src/app/shared/services/nav.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { BluedartService } from '../services/bluedart.service';
import { NgxSpinnerService } from 'ngx-spinner';
// import { ModalComponent } from '../../advanced-elements/modal/modal.component';
declare var $: any
declare var H:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  [x: string]: any;
  // @ViewChild('closeModalDesk') closeModalDesk: TemplateRef<ModalComponent> | undefined;
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @ViewChild('modal1') private modalContent1: TemplateRef<ModalComponent> | undefined
  private modalRef1!: NgbModalRef;
  Object = Object;
  imageurl = ''
  public show: boolean = false;
  map: any;
  data: any = 'All DEVICE VIEW';//////////////////////////////////////////for mouse hover imei numbers////////////////////////////////
  faClockTime: any = '03:36'
  tableLocation: string = '	0.05 km from Unnamed Road, Vishwakarma Industrial Area, Jaipur, Rajasthan 302013, India*'
  className: any;
  color = ['red', 'green', 'yellow']
  actionThreatListActLeve = "";
  fullDataArray: any = []
  destinationData: any = [];
  DistrictData: any = [];
  routes: any = []
  sources: any = []
  shipments: any = [];
  trip_sttus_filter: any = [];
  summaryData: any = []
  defaultDashboard: any = []
  data_latlng: any = [];
  fullDashBoardData: any = []
  Live_data: any = [];
  Regionnamedata: any
  RegionFlag: boolean = true
  RegionFlagD: boolean = false

  Agencynamedata: any;
  AgencyFlag: boolean = true
  AgencyFlagD: boolean = false

  sourcesFlag: boolean = true
  sourcesFlagD: boolean = false
  destinationFlag: boolean = true
  destinationFlagD: boolean = false
  vehicle_tripstatus: any;
  DistrictFlag: boolean = true;
  DistrictFlagD: boolean = false;
  triggerFlag: boolean = true
  marker_lable: any;
  triggerFlagD: boolean = false
  ETADelayFlag: boolean = true
  ETADelayFlagD: boolean = false;
  KPIFlagD: boolean = false;
  KPIFlag: boolean = true;
  alertData: any = []
  triggerData: any = []
  TriggerInfo: any = []
  interval: any
  threaddata: any
  threatFlag: boolean = true
  threatFlagD: boolean = false
  checkboxId: any = []
  alltrip: any = []
  threatsdata: any = []
  triggerSelectFlag: boolean = true
  threatSelectFlag: boolean = false
  alert_sum: any = [];
  newalertinfo: any = []
  newtripsubData: any = []
  alertType: boolean = true;
  sub_type_name: any = []
  tripLevel: any
  AlltripValue: any = []
  close_date_store: any;
  graceBtnFlag: boolean = true
  escalationbtnFlag: boolean = true
  trigger_Vehicle: any = [];
  qrtListData: any = []
  gracePeriodInfoData: any = []
  remainngGrace: any = 0
  GraceLoop: any

  graceAlertType: any
  graceId: any
  graceShipment: any
  graceVehicle: any
  sources_main: any = [];
  allThreatData: any = []
  totalThreat: any
  threatId: any
  gracelevel: any
  threatTrip_id: any
  threatalert_type: any
  threatActionBtnflag: boolean = true
  lastAlertdata: any = []
  lastalrtVehicleno: any
  driverFlagCheck: boolean = false
  token: any
  GroupTypeId: any;
  group_id: any;
  iscloseFlagbtn: boolean = true;
  marker_plant: any = [];
  user_escalationinfo: any = [];
  lat_lng: any;
  permission: any;
  escalation_check: any = []
  checkbox_phoneno: any = ''///////////////////////////////escalation_check
  checkbox_email: any = ''//////////////////////////////escalation_check
  grace_infoTbl: any
  graceTble_phoneno: any = ''
  graceTble_email: any = ''
  color_array: any = []
  trackingData: any = []
  prifile: any
  map1: any
  Api_color: any
  graceHistoryFlag: boolean = false
  escalationHistoryFlag: boolean = false
  graceHistoryData: any = []
  escaHistoryData: any = []
  Apicolor_array: any = []
  uploadfiledsk: any
  Shipment_select: any
  uploadDocData: any = []
  ShipmentNo = "";
  Type = "";
  trigger = "";
  trackingData_store_last: any = [];
  trackingData_store_last1: any = [];
  sub_type = "";
  Level = "";
  datetimepicker1: any
  datetimepicker: any

  qrtFlag: boolean = true
  uploadimageFlage: boolean = true
  close_history: boolean = false
  close_tabFlag: boolean = true
  addMoreFlag: boolean = false
  poly_line: any = []
  map_flag: any = 'Please Wait....'
  currentDateTime: any;
  currentDateTime1: any;
  customer_info: any = []
  InstallationReport: any = [];
  spin_flag: boolean = true
  history_dsk: any = []
  actionThreatList: any = 'Action List'
  threatHistorydata: any = []
  currentTime: any
  graceId_string: string = ''
  graceShipment_string: string = ''
  alertype_string: string = ''
  masterTableFlag: boolean = true
  color_level: any
  timeCOunter: any
  graceTime_left: any
  alertMessage: any
  alertModelFlag: boolean = false
  final_time: any
  x: any
  y: any
  countershow: any
  allColorFlag: boolean = true;
  colorLabelFlag: boolean = false;
  checkallFlag: boolean = false
  qrtHistoryData: any = []
  SENSITIVE_HALT_count = 0;
  DFG_count = 0;
  SCHEDULED_HALT_count = 0;
  UNSCHEDULED_HALT_count = 0;
  new_array: any = []
  new_array_full: any = []
  account_id: any
  triggerstring: string = ''
  triggerHistArray: any = []
  header_alert: any;
  header_Running: any;
  triggerFulldataReport: any = []
  triggerReportFlag: boolean = true
  treatReportFlag: boolean = false
  ReportTypeFlag: boolean = false
  threatSubType: any = []
  clusterChk: any = 0;
  last_address: any = [];
  threatDataNew: any = []
  markers_live: any = [];
  seconddaryTrack: any = [[]]
  mongoId: any
  GraceArray: any = []
  graceAlert: any = []
  shipmentcheckFlag: boolean = true
  vehicleCheckFlag: boolean = false
  colorTrack: any = []
  stock: any = {}
  spinFlagt: boolean = false
  hpColorFlag: boolean = false
  stoppedData: any = []
  Stoppedstock: any = {}
  account_type: any;
  soundFlag: boolean = true;
  trigger_source: any = [];
  trigger_Destination: any = [];
  trigger_KPI: any = [];
  trigger_Region: any = [];
  trigger_District: any = []; trigger_Agency: any = [];
  trigger_Trip: any = [];
  full_Filter: any = [];
  radius_vehicle_value: any;
  master_Region: any = [];
  array_temp: any = [];

  master_District: any = [];
  District_full: any = [];
  live_tracking_check: any = 0;
  map2: any;
  imei_no: any;
  zoomCls: number = 5;
  latlngbounds_live: any = [];

  vaa_lat: any;
  vaa_lng: any;
  latlngbounds_live1: any = [];
  latlngbounds_latlng: any = [];
  latlngbounds_landmark: any = [];
  latlngbounds_polyline: any = [];
  // contentsInfo:string=''
  sec_value: any = 10000;
  str1_live: any;
  clusterMarkers: any = [];
  gm_map: any;
  markers_cluster: any = [];
  clusterZoom: any = [];
  clusterLat: any = [];
  clusterLng: any = [];
  vehicle_liveid: any;
  live_tab_check: boolean = true;
  value_true: boolean = true;
  stop_referesh: boolean = true;
  stop_Zoom: boolean = true;
  angledeg_store: any = [];
  ///////////////////////////////////////////variable for active class fro pop up model///
  tab: any = 'tab1';
  tripmanagement_show: boolean = false;
  tripmanagement_show1: boolean = false;
  tab1: any
  tab2: any
  tab3: any;
  store_data: any = [];
  store_data_summary: any;
  chagePassword!: FormGroup;
  // show_drop:boolean=false;
  startPos: any = [42.42679066670903, -83.29210638999939];
  speed: any = 50; // km/h

  delay: any = 100;
  movemarker_check: boolean = true;
  store_lat: any;
  store_lng: any;
  Route_lat_lng: any = [];
  VBatteryReport: any = [];
  parentData: string = 'Data from parent';
  polyline_route_store: any = [];
  vehicle_no_store: any;
  imeistore: any;
  /////////////////////////////////////////////////////////////////////////////////////end popup model
  /////////////////////////////////////////Mehdi/////////////////////////////////////////////////////
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
  constructor(private navServices: NavService,private bluedartService:BluedartService,private service:CrudService,private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.platform = new H.service.Platform({
      apikey: 'vQTBCs4xOBkG-mSZlCymIb0G-Jj2TF2pO_p7e9Lc90o'
    });
    this.initApiCalls()
  }
    ///////////////////////////////////////////////////////////search function////////////////////////////////
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
      this.token=localStorage.getItem('AccessToken')
      this.group_id=localStorage.getItem('GroupId')
      this.account_id=localStorage.getItem('AccountId')
      var formdataCustomer = new FormData()
      formdataCustomer.append('AccessToken', this.token)
      // formdataCustomer.append('RouteId', id);
      // formdataCustomer.append('UserType', 'master');
      // formdataCustomer.append('DataFilter', js);
  
      this.SpinnerService.show('tableSpinner')
      this.bluedartService.specificTripDashboardFilter(formdataCustomer).subscribe((res: any) => {
        console.log("specificDashboardFilter", res);
       
        if(res.Status=='success')
        {
          const data=res?.Filter?.Master
          
          this.filterObject={
            region:data?.Region||{},
            origin:data?.Customer||{},
            destination:data?.Customer||{},
            route:data?.Route||{},
            etaDelay:data?.ETADelay||{},
            routeCategory:data?.RouteCategory||{},
            rawRouteType:data?.RouteType||{},
            routeType:data?.RouteType||{}
          }
          const routeType1 = data?.RouteType[1];
           const routeType2 = data?.RouteType[2];
           this.filterObject.routeType={...routeType1,...routeType2}
           this.selectedRoutes=[data?.DefualtFilter]
           console.log(this.selectedRoutes);
           
          
          
         
          formdataCustomer.append("RouteType",data?.DefualtFilter)
          this.bluedartService.specificTripDashboard(formdataCustomer).subscribe((res: any) => {
       
            // this.tripArray=res?.MainDashboard
            
            console.log("specificDashboard", res);
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
        // this.routeId = (res?.data);
        // console.log("customerList", this.routeId);
  
      })
      
      
      // this.SpinnerService.hide('tableSpinner')
      
    } 

    initChart(){
      this.chartObject=[{
        id:'consSt',
        name:'Trip',
        data:[{name:'Completed',value:this.dashboardHeader?.TripCompleted},
          { value: this.dashboardHeader?.TripSchedule,name: 'Schedule'}],
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
        colors:['#f4858e', '#5a86b3', '#34C759', 'grey']
      },
     ,{
  
        id:'chartDelay',
        name:'Delay',
        data:[
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
          },],
        colors:['#f07475', '#714169', '#31aa87', 'grey']
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
        colors:['#e77817', '#5a86b3', '#f4858e', 'grey']
      },
      ,{
  
        id:'chartAlerts',
        name:'Stoppage Alerts',
        data:[  {
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
        colors:['#e77817', '#97291e', '#d0cebb', '#00C0F3']
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
      this.bluedartService.specificTripDashboard(formData).subscribe((res: any) => {
        
        // this.tripArray=res?.MainDashboard
        
        console.log("specificDashboard", res);
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
    filterTableByChart(column,value){
      
      let table = $('#masterUpload').DataTable();
      table.search("").draw()

      if(column=='Trip')
        table.columns(33).search(value).draw();
      

    }
    filterTable(value){
      let table = $('#masterUpload').DataTable();
      table.search("").draw()
      table.columns(33).search("").draw();
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
        table.search("").draw()
        table.columns(1).search("").draw()
      }
      
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
        this.bluedartService.specificTripDashboardDetails(formData).subscribe((res: any) => {
          
          // this.tripArray=res?.MainDashboard
          
          console.log("working",res);
          this.SpinnerService.hide('alertSpinner')
          this.tripSingle.details=res?.TripDetails
          console.log("details",this.tripSingle);
          this.tripHeader()
          this.tripDetail()
            
        
    
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
      this.bluedartService.specificTDLink(formData).subscribe((res: any) => {
       
        // this.tripArray=res?.MainDashboard
        
        console.log("specificDashboard", res);
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
        echart.on('click',  (params) => {
          if (params.componentType === 'series') {
              // Access the clicked data
              var label = params.name;
              var value = params.value;
  
              console.log('You clicked on', name, 'with value', params,name);
              this.filterTableByChart(name,label)
            //   if(name=='Good')
            //     {
            //       this.consSTtAct('ConsignmentStatus','GoodTrips');
            //     }
            //  else   if(name=='KPI Violation')
            //       {
            //         this.consSTtAct('ConsignmentStatus','KPIViolation');
            //       }
            //       else   if(name=='In-Active')
            //         {
            //           this.consSTtAct('ConsignmentStatus','InActive');
            //         }
            //         else   if(name=='Non GPS')
            //           {
            //             this.consSTtAct('ConsignmentStatus','NonGps');
            //           }
  
              // Perform actions based on the clicked segment
              // alert('You clicked on ' + name + ' with value ' + value);
          }
      });
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
    openMapModal(item) {
    
      $('#mapModal').modal('show'); // Open modal using jQuery
  
      // Call the tracking function
      this.vehicleTrackF(item);
    }
    vehicleTrackF(item) {
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
          this.initializeMap(coordinates);
        } else {
          console.log('No valid locations found in the response.');
        }
      }, error => {
       
        console.error('Error fetching vehicle tracking data:', error);
      });
    }
  
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
            zoom: 5,
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
      let swLat = coordinates[0].lat;
      let swLng = coordinates[0].lng;
      let neLat = coordinates[0].lat;
      let neLng = coordinates[0].lng;
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
  
        
  
          // Add marker using the helper function
         const marker= this.addMarker(coord, icon);
  
          this.addInfoBubble(marker, coord,this.trackingData[index]);
                // // Update bounds
                swLat = Math.min(swLat, coord.lat);
                swLng = Math.min(swLng, coord.lng);
                neLat = Math.max(neLat, coord.lat);
                neLng = Math.max(neLng, coord.lng);
         // Expand the bounds to include each coordinate
         const padding = 0.01;
         bounds = new H.geo.Rect(swLat+padding, swLng-padding, neLat-padding, neLng+padding);
         bounds = bounds.mergePoint(coord);
  
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
    const lineString = new H.geo.LineString();
    coordinates.forEach(coord => lineString.pushPoint(coord));
    const polyline = new H.map.Polyline(lineString, {
        style: { strokeColor: '#6334d8', lineWidth: 4 }
    });
    this.map.addObject(polyline);
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
  


}
