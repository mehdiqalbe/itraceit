import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CrudService, ExcelService } from 'src/app/shared/services/crud.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../../components/advanced-elements/modal/modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var google: any;
// declare function MarkerWithLabel(opt_options: {
//     position: any; map: any; icon: any; draggable: boolean; // the CSS class for the label
//     raiseOnDrag: boolean; labelContent: any; labelAnchor: any; //new google.maps.Point(100, 5),
//     // labelClass: my_label_class,  //my_label_class, // the CSS class for the label
//     labelInBackground: boolean; title: string; vNameLocal: any; Drivername: any; vSerialLocal: any; speedLocal: any; lHaltSpeedLocal: any; rstatus: any; vehicle_id: any; Battery: any; BatteryVoltage: any;
//   }):any;
import {CommonModuleService } from '../services/common-module.service';
import { NavService } from 'src/app/shared/services/nav.service';
declare var MarkerWithLabel:any; 
declare var MarkerClusterer:any;
declare var $: any;
@Component({
  selector: 'app-live-page', 
  templateUrl: './live-page.component.html',
  styleUrls: ['./live-page.component.scss']
})
export class LivePageComponent implements OnInit {
  @ViewChild('modallive8') private modalliveContent8: TemplateRef<ModalComponent> | undefined
  private modalliveRef8!: NgbModalRef;
  Live_content:boolean=false;
  DriverName: any;
  DeliveryDoor_track: any;
  MainHoleDoor_track: any ;
  key_tabs: any;
  search_value: any=1;
  geolist_excel: any=[];
  interval_value: any=30;
  MainHoleDoor_values_1: string='';
  DeliveryDoor_value_1: string='';
  Temperature:any;
  Temperature_string:string='';
  DeliveryDoor_last: any;
  DeliveryDoor_value_last: string='';
  MainHoleDoor_last: any;
  MainHoleDoor_values_last: string='';
  vehicle_no: any=[];
  Temperature_last: string='';
  check_temp: boolean=false;
  image_vehicle: any;
  textView: any=0;
  speedballoons: any=1;
  green_balloon: boolean=false;
  yellow_balloon: boolean=false;
  show_balloons_div: boolean=false;
  red_cross: boolean=false;
  green_cross: boolean=false;
  yellow_cross: boolean=false;
  red_balloon: boolean=false;
  store_latlng: any=[];
  latlng_on: boolean=false;
  storemarker_data: any=[];
  forvalue: any;
  zoom_value: any=0;
  markers_play: any=[];
  markersVehicle: any=[];
  range_toggle: any=0;
  settimeout_value: any=1000;
  address_report: any=[];
  Live_data: any=[];
  add_arrow: boolean=true;
  prev_lat: any=[];
  poly_pt: any=[];
  markers_live: any=[];
  clusterChk: any=0;
  live_new: boolean=false;
  Live_data1: any=[];
  mmm: any=[];
  // storemarker1:any=[];
  imeiArr: any=[];
  lng_store: any=[];
  lat_store: any=[];
  imeidata_arra: any=[];
  temp_index_live: any=[];
  sec_value: any=10000;
  str1_live: any;
  clusterMarkers: any=[];
  gm_map: any;
  markers_cluster: any=[];
  clusterZoom: any=[];
  clusterLat: any=[];
  clusterLng: any=[];
  zoomCls: number=5;
  map_text: any=0;
  data_table: any=[];
  Station_Type_list: any=[];
  run_Routes_list: any=[];
  StationMaster_id: any;
  RunRoute: boolean=false;
  imp: boolean=false;
  Customers: any;
  Runcode: any;
  StationMaster_text: any;
  serial_list: any=[];
  station_store: any=[];
  flag_zoom: any=0;
  user:any;
  vehicle_data: any=[];
  back_home: any=0;
  sec_value1: any=0;
  data_table1: any=[];
  livedata_table: any=[];
  groupId: any;
  Refersh_time: any;
  window_store:any;
  show_refersh: boolean=false;
  Raw_power: any;
  Raw_power_string: string='';
  window_store1: any;
  angledeg_store: any=[];
  ang: any=[];
  select: boolean=false;
  RoutePlant_filter_value: any=1;
  plant_filter_value: any;
  plantroute_code: any=[];
  plantLatlong: any=[];
  planrlatlng_store: any=[];
  marker_plant: any=[];
  MouseHover_value: string='click';
  modalliveRef8_va: boolean=true;
  data_table_fas: any=[];
  change_status: FormGroup;
  close_Status: FormGroup;
  Status_save_value: any=[];
  submit_status: boolean=false;
  vehicleStatus_Types: any=[];
  ve: any;
  num_value: number=0;
  Running_vehicle: any=[];
  Stopped_vehicle: any=[];
  // vehicle_array: any=[];
  public onClick(event: any): void
  {
      event.stopPropagation();
  }


  setTimeoutPlay:any;
  public isCollapsed3 = false;
  public isClosed3 = false;
  TabStyle1: any;
  scrollPosition_store:any;
  ClusrerName: any;
  current: any;
  current1: any = [];
  multi_array: { [id: string]: any; } = [];
  multi_array_rightside: { [id: string]: any; } = [];
  TabStyle2: any;
  TabStyle3: any;
  TabStyle5:any;
  marker_landmark: any;
  Geofence_name1: any = [];
  Map_info: any = [];
  polyline_id: any = [];
  test_s1:any=10;
  test_s:any=1;
  geocoord: any;
  image_edit:any;
  fromtime: any;
  totime: any;
  scroll_status:boolean=false;
  TabStyle4: any = 0;
  imeino: any;
  VEHICLENO: any = 0;
  polylinedetail_id: any = [];
  IMEINO: any;
  Filter_list: any = [];
  Landmark_geocoord: any;
  Filter_list_keys: any = [];
  vehicleno: any;
  lastOpenedInfoWindow:any;
  imei_no:any=[];
  value: any;
  polyline_details: any = [];
  imageURL:any;
  Math =Math;
 
  toggle = true;
  polyline_marker: any = []
  status = "Enable";
  latlong:any = [];
  marks:any=[]; 
  deletegeo:any=[];
  imei_no_show:any;
  cursor_polyline:any=[];
  polylinecoord:any=[];
  geo_detail: any = [];
  objarray: any = [];
  Document: any = [];
  FromDate1: any;
  nameroute: any = [];
  dropdowncontent:boolean =false;
  dropdowncontent1:boolean =false;
  Distance: any;
  getid:any;
  ToDate1: any;
  isDisabled1: boolean = true;
  isDisabled: boolean = false;
  data1:any= [];
  Report_list: any = [];
  geof_name: any;
  viewOredit: any = 0;
  active_data: any = [];
  NoData: any = [];
  keys_content:any=[];
  pageStart:number = 0;
  pageEnd:number = 1000;
  pageHeight:number = 30;
  pageBuffer:number = 10;
  Driver_list: any = [];
  vehicleno_pop: any;
  inactive_data: any = [];
  DriverProfile_data: any = [];
  DistanceFromNearestLandmark: any;
  DistanceCovered: any;
  Address: any;
  Address1:any;
  values_open:boolean=false;
  GEO_Id: any;
  check_value_Map:boolean=false;
  data4:any=[];
  check_value_Map1:boolean=false;
  loading:boolean=false;
  model1: any = {};

  DeliveryDoor:any=[];
  MainHoleDoor:any=[];
  temp_index: any = [];
  DeliveryDoor1:any;
  MainHoleDoor1:any;
  weather: any;
  temp_store: any = [];
  store_Landmark: any = [];
  color: any;
  polygonCoords: any = [];
  polygonCoords_polyline: any = [];
  maps: any;
  Live:any=new Array();
  centers: any;
  Geofence_name: any;
  Geofence_Remarks: any;
  vehicle_img: any = [];
  VehicleId: any = [];
  display = 'none';
  vehicleid:any;
  tabsclass: any;
  NoGPS:any=[];
  NoGPS_length:any=[];
  poly: any;
  marker: any = [];
  access: any;
  markers: any = [];
  marker1: any = [];
  item_status:any=1;
  check_value: any = false;
  currentRoute: any;
  urlData: any;
  DataFrequency: any;
  // openPopup: boolean;
  k: any;
  Filter_data: any = [];
  Filter_data1: any = [];
  store_vehicle: any = [];
  polygonCoords1: any = [];
  polygonCoords1_live:any=[];
  polygonCoords1_latlng:any = [];
  Rightmenu_list:any=[];
  markers_store:any=[];
  Rightmenu_keys:any=[];
  polygonCoords2: any = [];
  polygonCoords3: any = [];
  geo_coord: any = [];
  status1: any = 0;
iconsis:any='fa fa-files-o';
  popup: any = 1;
  NoData_length: any=[];
  inactive: any=[];
  active: any=[];
  groname_final: any;
  Landmark_name: any;
  GroupType:any;
  store_data10_store:any=[];
  changeText: any;
  geofence_id: any;
  status2: any = 0;
 
  get_id:any;
 
  filter_VehicleModel:any=[];
 
  showMe: boolean = false;
  // saumya:any='saumya';
  tem_landmark:any=[];
  // model!: NgbDateStruct;

  geo_list: any = [];
  LandmarkId: any;
  lat_lng_geo: any = [];
  minDate: any;
  maxDate = new Date();
  mixDate = new Date();
  last_address: any = [];
  GeofenceId: any = [];
  // changeitem:any=0;
  date: any = "";
  selectAll: boolean = false;
  todate: any = "";
  latlngbounds: any = [];
  latlngbounds_live:any=[];
  latlngbounds_live1:any=[];
  latlngbounds_latlng: any = [];
  latlngbounds_landmark: any = [];
  latlngbounds_polyline: any = [];
  drawTriangle: any = [];
  indes_id:any;
  vehicle_id: any;
  Geofencename: any;
  selecttext: any = "Select All";
  Name: any;
  polygonCoords4: any = [];
  side_icons:any=[];
  drawingManager_store:any=[];
  driver_id: any;
  Alldata:any=[];
  store_edit: any = [];
  Routedetail_list: any = [];
  Type: any;
  Zoom: any;
  Distance_va: any;
  add_trail:boolean=false;
  headers: any = [];
  nameroutel = this.router.getCurrentNavigation()?.extras.state;
  Remarks: any;
  files:any=[];
  public show: boolean = true;
  UnionSegments:any=[];
  Landmark_listvalue: any = [];
  public show1: boolean = false;
  messages: any;
  term: any;
  values_landmark:any;
  submite:boolean=false;
  title = 'custom-search-filter-example';
  Segmentunion_converted:any;
  searchedKeyword :any;
  searchedKeyword1 :any;
  color_value:any;
  drawingManager: any;
  myDateValue!: Date;
  isShowDivIf = true;
  
  DOB_add: any;
  Gender_add: any
  PrimaryPhone_add: any;
  PrimaryEmail_add: any;
  UserId_add: any;
  trackLine_add:any=[];
  Address_driver_add: any;
  DLNumber_add: any;
  FirstName_add: any;
  DLIssuingState_add: any;
  DLExpiryDate_add: any;
  // Gender_add:any;
  image:any;
  DlIssuingState:any;
  id:any;
   v:any;
   setting:any=false;
   

  DOB: any;
  det:any=[];
  Gender: any
  latlong1: any;
  PrimaryPhone: any;
  PrimaryEmail: any;
  UserId: any;
  trackLine:any=[];
  geostore:any=[];
  Filter_list1:any=[];
  Address_driver: any;
  DLNumber: any;
  FirstName: any;
  DLIssuingState: any;
  Show_searchbox:boolean=false;
  DLExpiryDate: any;
  path:any;
  array_geo_lng: any = [];
  Segment_converted:any=[];
  Segment_list:any=[];
  deletelandmark_map:any=[];
  array_geo_lat: any = [];
  Landmark_list: any = [];
  active_nav:any='active';
  Remark: any;
  isShowmarkerDivIf = true;
  geo_listvalue: any = [];
  markersLatLng: any = [];
  value11: any = "20:48"
  polygonPoints: any = [];
  vehicle_catagory:any=[];
  VehicleCategory:any;
  valid_segment:any;
  temp_markerarray: any = [];
  LastStatus: any = 0;
  Editable_driver: any;
  image_driver:any;
  store_data10:any=[];
  currentDateTime: any;
  chagePassword:FormGroup;
  currentDateTime1: any;
  FromdateTime: any;
  TodateTime: any;
  Vehicle_list: any = [];
  store_values: any = [];
  store_valuesmake: any = [];
  str: any;
  SpeedLimit_segment:any;
  Name_segment:any;
  Remark_add:any;
  AuthorizedStoppage_segment:any;
  StoppageTime_segment:any;
  TimeTaken_segment:any;
  ColorCode_segment:any;
  Distance_segment:any;
  ImageUrl:any;
  color1: string = '#FFFFFF';
  Remarks_segment:any;
  drawingManager_segment:any=[];
  Name_union:any;
  Code_union:any;
  SegmentIds_union:any;
  Remark_union:any;
  RouteId_polyline:any;
  Remark_polyline:any;
  UnionSegmentId_polyline:any;
  code_polyline:any;
  valid_form:any;
  // dateYesterday:any;
  Route_converted:any=[];
  Route:any=[];
  Landmark_converted:any=[];
  Landmarktype:any=[];
  marker_landmark_store:any=[];
  dateYesterday: Date = new Date();
  Breakdown: any=[];


  display5: string = 'none';
  Running_data:any=[];
  Stopped_data:any=[];
  add:any='block';

  Breakdown_length: any=[];
  @ViewChild('modal11') private modalContent11: TemplateRef<ModalComponent> | undefined
  private modalRef11!: NgbModalRef;
  @ViewChild('modal10') private modalContent10: TemplateRef<ModalComponent> | undefined
  private modalRef10!: NgbModalRef;
  constructor( private navServices: NavService,private router: Router,private service: CommonModuleService,private SpinnerService: NgxSpinnerService,private modalService: NgbModal) {
   this.vehicle_data= this.router.getCurrentNavigation()?.extras.state;
   this.chagePassword=new FormGroup({
    NewPassword: new FormControl('',[Validators.required,]),
    // UnionSegmentId:  new FormControl(''),
    CurrentPassword: new FormControl('',[Validators.required,]),
    RepeatNew: new FormControl('',[Validators.required,]),

  });
  this.change_status=new FormGroup({
    StatusTypeId: new FormControl('',[Validators.required,]),
    Remark:  new FormControl(''),
    startdate: new FormControl('',[Validators.required,]),
    // RepeatNew: new FormControl('',[Validators.required,]),

  });
  this.close_Status=new FormGroup({
    // StatusTypeId: new FormControl('',[Validators.required,]),
    // Remark:  new FormControl(''),
    startdate: new FormControl('',[Validators.required,]),
    // RepeatNew: new FormControl('',[Validators.required,]),

  });
   }

  ngOnInit(): void {
    // this.reload();
    this.GroupType = localStorage.getItem('GroupTypeId');
    let App = document.querySelector('.app');
    App?.classList.add('sidenav-toggled');
 
    this.groupId=localStorage.getItem('GroupId');
    if( this.groupId !==undefined){
     
      this.Station_Typelist();
    }
   if(this.vehicle_data==undefined){
    // this.List_vehicle();
   }else{
    var temp_index=this.vehicle_data.structuredata;
    this.temp_index.push(temp_index);
   
    this.GO_Livetracking();
    // this.Vehicle_list=this.vehicle_data.structuredata;
    
    // Object.keys(this.Vehicle_list).forEach((key) => {
    //   var data1 = this.Vehicle_list[key];
    //   this.data4.push(data1);
    // this.data1=this.vehicle_data.structuredata;
    
      // })
      // this.data1=this.data4;
      // this.Alldata=this.data1;
   }

    this.initMap();
    this.List_vehicle();
    // this.header_values();
    // this.Filterplant();
    // this.Station_Typelist();
    // this.geo_list();
    this.user= localStorage.getItem('UserName');
    this.vehicleStatusTypes();
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
  close2() {
    
    if(this.modalliveRef8!==undefined){
    this.modalliveRef8.close();}

  }
 
  List_vehicle() {
    // debugger;
    // data.preventDefault();
    this.SpinnerService.show('spinner-1');
    var formData = new FormData();formData.append('portal', 'itraceit');
    formData.append('AccessToken', localStorage.getItem('AccessToken') || "");
    this.service.Vehicle_detail(formData).subscribe((res: any) => {
      if (res.Status == 'success') {
        this.Vehicle_list = res.VehicleList;
     
        Object.keys(this.Vehicle_list).forEach((key) => {
          var data1 = this.Vehicle_list[key];
          this.data4.push(data1);
          
        })
        this.data1=this.data4;
        this.Alldata=this.data1;
        if(this.temp_index.length!==0){
          this.Vehicle_list[this.temp_index[0]?.VehicleNo].Checked=true;
         
          
        }
        // this.header_values();
        if(this.groupId=='0820'){
          this.header_values();
        }
        else{
          this.header_values1();
        }
        // this.show=true;
       
         this.SpinnerService.hide('spinner-1');
       
      }

    })
    //  event.stopPropagation();
  } 
  selectcheck( ind: any, event: any,VehicleNo:any) {
    // alert(0);
    // event.target.checked =true;
    // this.temp_index=[];
    if (event.target.checked == true) {
      this.Vehicle_list[VehicleNo].Checked=true;
      var indextype = this.Vehicle_list[VehicleNo];
      if(this.GroupType=='31'){
      this.temp_index=[];
      this.temp_index.push(this.Vehicle_list[VehicleNo]);
      this.plantroute_code.push(this.Vehicle_list[VehicleNo]);
      console.log("..." ,this.temp_index,this.temp_index.length)
      }
    }
    else {
      this.Vehicle_list[VehicleNo].Checked=false;
   

    }

    
    if(this.GroupType!=='31'){
      this.temp_index=[];
      this.plantroute_code=[];
      for (var i = 0; i <= this.data4.length; i++) {
          if (this.Vehicle_list[this.data4[i]?.VehicleNo]?.Checked==true) {
            // this.temp_index.splice(i, 1);
         
            this.plantroute_code.push(this.data4[i]);
           
            this.temp_index.push(this.Vehicle_list[this.data4[i]?.VehicleNo]);
          
          }
        }
      }
       
  }
  // HEADER FUNCATION START-------------
  clusterchecked(val:any){
    this.clusterChk=val;
    
  }
  settings(){
    this.setting=!this.setting;
  }
  // HEADER FUNCATION END-----------------
  
 
  header_values1(){
    
    this.active_data=[];
    this.inactive_data=[];
    this.NoData=[];
    this.active=[];
    this.inactive=[];
    this.NoData_length=[];
    this.NoGPS=[];
    this.NoGPS_length=[];
    this.Breakdown=[];
    this.Breakdown_length=[];
    this.Running_vehicle=[];
    this. Stopped_vehicle=[];
    for (var i = 0; i < this.data1.length; i++) {
      if(i<=10){

      
      this.store_data10.push(this.data1[i]);}
    }
    for (var i = 0; i < this.data1.length; i++) {
      if (this.data1[i]?.RunningStatus == 'Running') {
     
        this.Running_vehicle.push(this.data1[i]);
        
        }
        // if (this.data1[i]?.RunningStatus == 'InActive') {
        
        //   this.Running_vehicle.push(this.data1[i]);
        //   }
          if (this.data1[i]?.RunningStatus == 'Stopped') {
           
            this.Stopped_vehicle.push(this.data1[i]);
           
            }
      // if (this.data1[i]?.VehicleStatus == 'Active') {
      //   this.active_data.push(this.data1[i]);
      //   this.active = this.active_data;
      // }
      else if (this.data1[i]?.RunningStatus == 'InActive') {

        this.inactive_data.push(this.data1[i]);
        this.inactive = this.inactive_data;
      } else if (this.data1[i]?.RunningStatus == 'NoData') {

        this.NoData.push(this.data1[i]);
        this.NoData_length = this.NoData;
      } 
      else if (this.data1[i]?.RunningStatus == 'NoGPS') {

        this.NoGPS.push(this.data1[i]);
        this.NoGPS_length = this.NoGPS;

      }else if (this.data1[i]?.RunningStatus =='Breakdown'||this.data1[i]?.RunningStatus=='Accidental'||this.data1[i]?.RunningStatus=='Not In-Use') {
        
        this.Breakdown.push(this.data1[i]);
        this.Breakdown_length = this.Breakdown;
       

      }else{

      }

    }
  //  for(var p=0;p<)
  // this.serial_list=this.active_data;
  this.data1=[];
  this.data4=[];
  // this.serial_list = this.active_data.concat(this.NoData_length,this.NoGPS_length,this.inactive,this.Breakdown_length);
  // this.serial_list = this.Running_vehicle.concat(this.Stopped_vehicle, this.NoData_length,this.inactive);
  this.serial_list = this.Running_vehicle.concat(this.Stopped_vehicle,this.NoGPS_length,this.NoData_length,this.inactive,this.Breakdown_length);
  this.data1=this.serial_list;
  this.data4=this.serial_list;

    // this.serial_list=this.inactive;
    // this.serial_list=this.NoData_length;
    // this.serial_list= this.NoGPS_length ;
  //
  // 
    // this.serial_list.push(this.inactive_data);
    this.SpinnerService.hide();
  }
  header_values() {

    this.active_data = [];
    this.inactive_data = [];
    this.NoData = [];
    this.active = [];
    this.inactive = [];
    this.NoData_length = [];
    this.NoGPS = [];
    this.NoGPS_length = [];
    this.Breakdown = [];
    this.Breakdown_length = [];
    this.Running_data=[];
    this.Stopped_data=[];
    for (var i = 0; i < this.data1.length; i++) {
      if (i <= 10) {


        this.store_data10.push(this.data1[i]);
      }
    }
    // console.log (this.data1)
    for (var i = 0; i < this.data1.length; i++) {
      if (this.data1[i]?.VehicleStatus == 'Active') {
        // console.log(this.data1[i])
        if(this.groupId=='0820'){
          if (this.data1[i]?.RunningStatus == 'Running') {
            this.Running_data.push(this.data1[i]);
          }else if(this.data1[i]?.RunningStatus == 'Stopped'){
            this.Stopped_data.push(this.data1[i]);
          }

         
        }else{
        this.active_data.push(this.data1[i]);
        this.active = this.active_data;}

      }
      else if (this.data1[i]?.VehicleStatus == 'InActive') {

        this.inactive_data.push(this.data1[i]);
        this.inactive = this.inactive_data;
      } else if (this.data1[i]?.VehicleStatus == 'NoData') {

        this.NoData.push(this.data1[i]);
        this.NoData_length = this.NoData;
      } else if (this.data1[i]?.VehicleStatus == 'NoGPS') {

        this.NoGPS.push(this.data1[i]);
        this.NoGPS_length = this.NoGPS;

      } else if (this.data1[i]?.VehicleStatus == 'Breakdown' || this.data1[i]?.VehicleStatus == 'Accidental' || this.data1[i]?.VehicleStatus == 'Not In-Use') {

        this.Breakdown.push(this.data1[i]);
        this.Breakdown_length = this.Breakdown;


      }
      else {

      }

    }
    //  for(var p=0;p<)
    // this.serial_list=this.active_data;
    if(this.groupId !=='0820'){
    this.data1 = [];
    this.serial_list = this.active_data.concat(this.Breakdown_length, this.NoData_length, this.NoGPS_length, this.inactive);
    this.data1 = this.serial_list;
    this.display5 = 'none';
  
    }
    if(this.groupId=='0820'){
      this.data1 = [];
      this.serial_list = this.Running_data.concat(this.Stopped_data,this.NoGPS_length, this.inactive);
      this.data1 = this.serial_list;
      this.display5 = 'none';
    }
    // this.value_save = 0;
    // this.serial_list=this.inactive;
    // this.serial_list=this.NoData_length;
    // this.serial_list= this.NoGPS_length ;
    // this.serial_list.push(this.inactive_data);
    
    this.SpinnerService.hide();
  }
  // header_filter(id: any) {
  //   this.show = true;
  //   this.data1 = [];
  //   if (id == 1) {
  //     // this.data1=this.Alldata;
  //     this.data1 = this.Running_vehicle;
  //   }
  //   if (id == 2) {
  //     this.data1 = this.Stopped_vehicle;
  //   }
  //   if (id == 3) {
     
  //     this.data1 = this.NoData_length;
  //   }
  //   if (id == 4) {
  //     this.data1 = this.inactive;

  //   // } if (id == 5) {
  //   //   this.data1 = this.NoGPS_length;
  //   // } if (id == 6) {
  //   //   this.data1 = this.Breakdown_length;
  //   // }
  //   }
  // }
  header_filter(id: any) {
    this.show = true;
    this.data1 = [];
    if (id == 1) {
      // this.data1=this.Alldata;
      this.data1 = this.Running_vehicle;
    }
    if (id == 2) {
      this.data1 = this.Stopped_vehicle;
    }
    if (id == 3) {
     
      this.data1 = this.NoData_length;
    }
    if (id == 4) {
      this.data1 = this.inactive;

    } if (id == 5) {
      this.data1 = this.NoGPS_length;
    } if (id == 6) {
      this.data1 = this.Breakdown_length;
    }
    
  }
  initMap() {
    // var  lat_lng = { lat: 22.08672, lng: 78.42444 };
    var lat_lng = { lat:  17.679180, lng: 77.069720 };
    this.maps = new google.maps.Map(document.getElementById('maps'), {
      zoom: this.zoomCls,
      center: lat_lng,
      scaleControl:true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });;
   
    let infoWindow = new google.maps.InfoWindow({
      // content: "Click the map to get Lat/Lng!",
      position: lat_lng,
    });
    this.maps.addListener("click", (mapsMouseEvent) => {
      // Close the current InfoWindow.
      infoWindow.close();
  
      // Create a new InfoWindow.
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
      infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      );
      if(this.latlng_on==true){
      infoWindow.open(this.maps);}
    });
  
  }
  load_data(){
    
    this.searchedKeyword='';
    this.onsearch();
// this.onsearch();
    this.SpinnerService.show();
   
    // this.isCollapsed4 = !this.isCollapsed4;
    $('button[data-bs-toggle="tab"]').on('shown.bs.tab',  (e) => {
      // var $target:any = $($(e.target).attr('href'));
    
      setTimeout(() => {
         this.SpinnerService.hide();
      }, 800);
    
  });
  }
onsearch(){

  this.data1=this.data4;
    let input = (document.getElementsByName('searchBar') as any)[0].value;
  
    if(input!==null){
    let filteredNames = this.data1.filter((e => Object.values(e).map(e => String(e)).some(e => e.toLowerCase().includes(input.toLowerCase()))));
    

    this.data1=filteredNames;
    }else{
      // this.header_values();
      this.data1=this.data4;
      
      // if(this.store_data10_store!==undefined)
      // this.store_data10=this.store_data10_store;
    }
}
toggles(){
  if(this.show==true){

    this.show=false;
  }
}
onSelectAll() {
  if (this.check_value == false) {
    this.check_value = true;
    this.temp_index = this.data1;
    for (var i = 0; i < this.data1.length; i++) {
        this.data1[i].Checked=true;
        this.data4[i].Checked=true;
      
      }

  } else {
    this.check_value = false;
    for (var i = 0; i < this.data1.length; i++) {
      this.data1[i].Checked=false;
      this.data4[i].Checked=false;
      this.Vehicle_list[ this.data4[i]?.VehicleNo].Checked=false;
     
    }
    this.temp_index = [];

  }
}
maptext(va:any){
  this.map_text=va;
}
sec_live(eve:any){
  this.sec_value1=eve.target.value*1000;
  if(eve.target.value>30){
    const minutes = Math.floor(eve.target.value / 60);
    this.Refersh_time=minutes+'min';
  
  }else{
    this.Refersh_time=eve.target.value+'sec';
   
  }
 
}
GO_Livetracking(){
  this.back_home=0;
  this.angledeg_store=[];
  this. lat_store=[];
  this. lng_store=[];
  this.imeidata_arra=[];
  this.flag_zoom=0;
  this.show_refersh=true;
  this.modalliveRef8_va=true;
  // this.modalliveRef8! NgbModalRef;
console.log(this.temp_index)
  if(this.temp_index.length==0){
alert("Please select a vehicle");
this.back_home=1;
this.initMap();
  }else{
  $('#nav-profile-tab').click();
 if(this.temp_index.length>200){
  alert("Please select maximum 200 Vehicles at a time");
 }else{
    this.initMap();
   
    this. lat_store=[];
    this. lng_store=[];
    this.imeidata_arra=[];
  this.temp_index_live=[];
  var imeiArr:any=[];
  for(var i=0;i<this.temp_index.length;i++){
    this.temp_index_live.push( this.temp_index[i]);
    if(this.RoutePlant_filter_value==2 ||this.RoutePlant_filter_value==3){
    this.plantLatlong.push( this.temp_index[i]?.PlantLatLong);}
    var imei= this.temp_index_live[i]?.ImeiNo;
    imeiArr.push(this.temp_index_live[i]?.ImeiNo);
  }
  // for(var j=0;j<this.temp_index_live.length;j++){
  
  
  // }
  
  this.str1_live = imeiArr.toString();
  if(this.map_text==1){
    // this.live5();
    this.show_vehicle_sec();
  }else{
 this.show_vehicle_sec();}



}
 }
}

live5(){
  // debugger;
  // var livedata={};
  this.Live_data1=[];

  var formData = new FormData();formData.append('portal', 'itraceit');
  formData.append('AccessToken', localStorage.getItem('AccessToken')!);
  // formData.append('AccessToken', '91x1YhFQz010ki5P4966O85flXyLMG40');
  formData.append('ImeiNo',this.str1_live);
    // formData.append('ImeiNo','861359030554073');
    
    this.service.Live_latlng(formData).subscribe((res: any) => {
      if (res.Status == "success") {
        // livedata={};
        var livedata:any;
        livedata=res.Data;
     
        this.livedata_table=[];
        this.livedata_table=livedata;
       
        if(this.map_text==1){
          if(this.modalliveRef8_va==true){
          this.SpinnerService.show('spinner-8');}
          this.data_table=[];
         
          for(var dt=0;dt<this.temp_index_live.length;dt++){
          
       this.call_text(livedata,dt);
      }
      // this.close2();
  
     
    
      //  this.SpinnerService.show('spinner-2');
      
        }else{
      this.setMultipleMarkerLastLive(res.Data);
        }
    //  }
    
      
        // localStorage.removeItem('AccessToken');
        // this.router.navigate(['/auth/login']);
      }
      else {
      
      }
      
    });
  
 

}

call_text(livedata:any,dt:any){
  var vname=this.temp_index_live[dt]?.VehicleNo;
  var vehicle_id=this.temp_index_live[dt]?.vehicle_id;
  var vSerialLocal=this.temp_index_live[dt]?.ImeiNo;
  var str = livedata[dt]?.LatLong;
  var Speed=livedata[dt]?.Speed;
  var io=livedata[dt]?.IO;
 
  var runningStatus=livedata[dt]?.runningStatus;
  var HaltTime= livedata[dt]?.HaltTime;
  var HaltDuration= livedata[dt]?.HaltDuration;
  var DateTime= livedata[dt]?.DeviceDateTime;
var fault:any;
if(livedata[dt]?.runningStatus=='NoGPS'){
  fault='2';
}else if(livedata[dt]?.runningStatus=='NoData'){
fault='3'
}else if(livedata[dt]?.Battery=='0'){
  fault='1';
}else if(livedata[dt]?.runningStatus=='NoGPS' && livedata[dt]?.runningStatus=='NoData'){
  fault='2,3';
}
else if(livedata[dt]?.runningStatus=='NoGPS' && livedata[dt]?.Battery=='0'){
  fault='1,2';
}else if(livedata[dt]?.runningStatus=='NoData' && livedata[dt]?.Battery=='0'){
  fault='1,3';
}else if(livedata[dt]?.runningStatus=='NoData' && livedata[dt]?.Battery=='0' && livedata[dt]?.runningStatus=='NoGPS'){
  fault='1,2,3';
}
  var formData = new FormData();formData.append('portal', 'itraceit');
formData.append('AccessToken', localStorage.getItem('AccessToken')!);
formData.append('VehicleId', vehicle_id);
formData.append('ImeiNo',vSerialLocal);
formData.append('LatLong',str);

this.service.Lastlocation(formData).subscribe((res: any) => {
// alert(res.Status);
if (res.Status == "Failed") {

// localStorage.removeItem('AccessToken');
// this.router.navigate(['/auth/login']);
}
else {
this.last_address = res.Data;
this.Address = this.last_address.Address;
 
 };
//  var ad=this.Address;
//  var falut='';
//  this.data_table.push( { vname, vSerialLocal,Speed ,DateTime,HaltTime,
//  io, ad,falut,runningStatus});
this.data_table_fas=[];
var temp_arr: Array<{ "VehicleName": any, "IMEI":any,"Speed":any ,"DateTime":any,"LastHaltTime":any,"HaltDuration":any,
"IOStatus":any,"Location":any, "Fault":any,"MovementStatus":any}>;

temp_arr=Array( {"VehicleName": vname, "IMEI":vSerialLocal,"Speed":Speed ,"DateTime":DateTime,"LastHaltTime":HaltTime,"HaltDuration":HaltDuration,
"IOStatus":io,"Location": this.Address, "Fault":fault,"MovementStatus":runningStatus});


this.data_table.push(temp_arr[0] );
if(this.temp_index_live.length==this.data_table.length){
  // this.data_table_fas=[];
  this.data_table_fas=this.data_table;
  if(this.modalliveRef8_va==true){
    this.SpinnerService.hide('spinner-8');
    this.open_live8();
       this.table_showReport();
    this.modalliveRef8_va=false;
  
   }

}
});
      
// this.data_table.push( {"VehicleName": vname, "IMEI":vSerialLocal,"Speed":Speed ,"DateTime":DateTime,"LastHaltTime":HaltTime,
// "IOStatus":io,"Location": this.Address, "Fault":'',"MovementStatus":runningStatus});
}
table_showReport()
{
 
  
  // setTimeout(() => {

  $(document).ready( () => {

    var table:any;
    if ($.fn.dataTable.isDataTable('#showReportTable1')) 
     {
        table = $('#showReportTable1').DataTable();
      //    table.clear();
         //  $('#singleNodeTable tbody').empty();
         // table.fnDestroy();
         //  table.fnDraw();
        // table.rows.add().draw();
        
           $(document).ready(function () {
             $('#showReportTable1').DataTable({
                pageLength: 10,
                   //fixedHeader: true,
                  scrollX: true,
                  scrollY: '300px',
                scrollCollapse: true,
                 scroller: true,
                paging: true,
              
               destroy: true,
              responsive: true,
         
           "order": [],
               dom: '<"html5buttons"B>lTfgitp',
           columnDefs: [ 
              {targets  : 'no-sort',orderable : false}
               ],
          buttons: 
           [            
             {
                   extend: 'csv',
                   footer: true,
                  
                   exportOptions: {
       
             columns: ':visible'
      
                   },
                   title: 'planner_report'},
                   {
                    extend: 'excel',
                        footer: true,
                        exportOptions: {
            
                  columns: ':visible'
            
                        },
                        title: 'planner_report'},
                        {
                          extend: 'pdf',
                          orientation: 'landscape',
                          pageSize: 'LEGAL',
                          footer: true,
                          exportOptions: {
              
                    columns: ':visible'
              
                          },
                          title: 'planner_report'},]}
                
            );
            });
  
    this.SpinnerService.hide('spinner-2');
    }
    else{
     
      $(document).ready(function () {
        $('#showReportTable1').DataTable({
           pageLength: 10,
               //fixedHeader: true,
              scrollX: true,
               scrollY: '300px',
            scrollCollapse: true,
            scroller: true,
           paging: true,
             
              destroy: true,
             responsive: true,
        
         "order": [],
         dom: '<"html5buttons"B>lTfgitp',
         columnDefs: [ 
             {targets  : 'no-sort',orderable : false}
         ],
         buttons: 
         [            
             {
    extend: 'csv',
    footer: true,
    
    exportOptions: {
    
    columns: ':visible'
    
    },
    title: 'planner_report'},
    {
    extend: 'excel',
    footer: true,
     exportOptions: {
     columns: ':visible'
    
     },
    title: 'planner_report'},
     {
    extend: 'pdf',
     orientation: 'landscape',
    pageSize: 'LEGAL',
    footer: true,
    exportOptions: {
    
     columns: ':visible'
    
    },
    title: 'planner_report'},]}
    
    );
    });
   
    this.SpinnerService.hide('spinner-2');
    }
    
    
    });
    
  // },100)


 
}
datatable_data(){
   setTimeout(() => {
      

    $(document).ready(function () {
  
  
    $('#showReportTable1').DataTable({
    pageLength: 10,
    // pageLength: '10',
    scrollY: '500px',
    pagingType: 'full_numbers',
    
      // fixedHeader: true,
      // scrollX: true,
      // destroy: true,
      responsive: true,
      
      "order": [],
      dom: '<"html5buttons"B>lTfgitp',
      columnDefs: [ 
      {targets : 'no-sort',orderable : false}
      ],
      buttons: 
       [
      {
      extend: 'csv',
      exportOptions: {
      
       columns: ':visible'
      
       },
      title: 'planner_report'}]}
      
      );
      });
      
    }, 800);
 
}


    show_vehicle_sec(){
  if(this.back_home==0){
      if(this.temp_index_live.length!=0){
     
      if(this.temp_index_live.length>=6){
        // alert(0);
       if(this.sec_value1<120000){
        // alert(0);
        this.sec_value='';
        this.sec_value=120000;
       }else{
        this.sec_value= this.sec_value1;
       }
      }else{
     
          if(this.sec_value1==0){
            // alert(0);
            // this.sec_value='';
            this.sec_value=10000;
           }else{
            this.sec_value= this.sec_value1;
           }
      
      }
   
      if(this.sec_value>30000){
        const minutes = Math.floor(this.sec_value / 60000);
        this.Refersh_time=minutes+'min';
    
      }else{
        var time=this.sec_value/1000;
        this.Refersh_time=time+'sec';
       
      }
      // alert( this.sec_value);
      this.live5();
  
      this.setTimeoutPlay= setTimeout(() => {
        //alert('ss'+new_time);
        //return false;
     
      this. show_vehicle_sec();
        },this.sec_value);
        // 
      }else{
        // alert("Please select a vehicle");
      }
  }

    }
    open_live8(): Promise<boolean> {
      return new Promise<boolean>(resolve => {
        this.modalliveRef8 = this.modalService.open(this.modalliveContent8,{ size: 'xl' })
        this.modalliveRef8.result.then(resolve, resolve)
      })
    }
    setMultipleMarkerLastLive(live:any){
      // debugger;
      
      this.Live_data=[];
      this.Live_data=live;
      // var url_pre = $('#image_url_new').val();
      var url_pre = 'assets';
      var add_arrow = $('#add_arrow').val();
      this.deleteOverlays_live();
     
      if((this.Live_data.length ==1) && (!this.Live_data[0]) && (!this.Live_data[0])) {
        alert('Sorry! Either -GPS or Data Not Found');
       
    }
    if($('#mouseover_click').val()==1) {
      var mouse_action='mouseover';
  } else {
      var mouse_action='click';
  }
  var url;
  // this.latlngbounds_live1=[];
   this.latlngbounds_live1 = new google.maps.LatLngBounds();
      var str='';
      var clusLat='20.5937';
      var clusLng='78.9629';
      this.zoomCls=5;
      if(this.clusterLat.length!=0) {
          clusLat= this.clusterLat[0];
      }
      if(this.clusterLng.length!=0) {
        clusLng= this.clusterLng[0];
    }
    if(this.clusterZoom.length!=0) {
      // this.zoomCls=0;
      this.zoomCls= this.clusterZoom[0];
  }
   
  
      var options_googlemaps = {
          minZoom: 4,
          zoom: this.zoomCls,
          center: new google.maps.LatLng(clusLat, clusLng),
          maxZoom: 20,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          streetViewControl: false
      }
  // saumya------
      if(this.clusterChk==1) {
         this.gm_map = new google.maps.Map(document.getElementById('maps'), options_googlemaps);
         
          // var add_trail = document.getElementById('add_trail');
          // add_trail.setAttribute('disabled', 'disabled');
      }
      
      var angledeg_store:any=[];
      this.clusterMarkers = [];
      for(var i=0;i<this.Live_data.length;i++) {
       
 
        var position;
        var my_label_class;
        var my_label_classimg;
        var latlng_arr=this.Live_data[i]?.LatLong.split(',');
      
        var lat_tmp=latlng_arr[0];
        var lng_tmp=latlng_arr[1];
        var vehicle_id=this.temp_index_live[i]?.VehicleId;

        position=new google.maps.LatLng(latlng_arr[0],latlng_arr[1]);
  
        this.latlngbounds_live1.extend(position);
        // var icon1=this.setIconTypeV2(this.temp_index_live[i]?.VehicleCategory,this.Live_data[i].runningStatus);
        var icon1= this.temp_index_live[i]?.VehicleImage;
     
        // var icon1='https://maps.gstatic.com/mapfiles/ms2/micons/truck.png'
        var title='abc';
        // var dateTime=datetimearr[i];
        var vSerialLocal=this.Live_data[i]?.ImeiNo;
        var DeviceDateTime=this.Live_data[i]?.DeviceDateTime;
        var vNameLocal=this.temp_index_live[i]?.VehicleNo;
        var Drivername=this.temp_index_live[i]?.DriverName;
        if(Drivername==''){
          Drivername='/';
        }
        // var vRouteLocal=vRoutes[i];
        // var vPlantLocal=vPlants[i];
        var vNumberLocal=this.temp_index_live[i]?.VehicleNo;
        var Battery=this.Live_data[i].Battery;
       var BatteryVoltage=this.Live_data[i].BatteryVoltage;
       
        // vNumberLocal=vNumberLocal.split('$$$');
        var dMobNoLocal=this.temp_index_live[i].DriverName;
        var speedLocal=this.Live_data[i].Speed;
        var rstatusLocal=this.Live_data[i].runningStatus;
        var ioStrLocal=this.Live_data[i].IO;
        var dMaxSpeedLocal=this.Live_data[i].DayMaxSpeed;
        var lHaltSpeedLocal=this.Live_data[i].HaltTime;
        var venu_color = '#4682B4';
       var rstatus= this.Live_data[i].runningStatus;
       
      // }
  // add arrow--------------------------------
  var angle_deg:any;
  var my_scaled= new google.maps.Size(10, 10);
  if(this.add_arrow) {
    // alert(0);
    if( this. lat_store.length!=0){
      // alert("enter");
      var lat1:any;
      var lng1:any;
      for(var p=0;p<this.imeidata_arra.length;p++){
        if(this.Live_data[i].ImeiNo==this.imeidata_arra[p]){
   
           lat1 = parseFloat( this. lat_store[p]);
           lng1 = parseFloat( this. lng_store[p]);
         
        }
      }
      if(lat1!=''){
        var lat2:any;
      var lng2:any;
        // if(this.Live_data[i].Imei==this.imeidata_arra[p]){
          // alert(0);
          var latlng_arr=this.Live_data[i]?.LatLong.split(',');
         
          lat2 = parseFloat(latlng_arr[0]);
          lng2 = parseFloat(latlng_arr[1]);
          
      
        // }
      //  var lat2 = parseFloat(latlng_arr[0]);
      //  var lng2 = parseFloat(latlng_arr[1]);
        //var yaxis = (lat1 + lat2)/2;
        //var xaxis = (lng1 + lng2)/2;
        var angle_t = Math.atan( (lat2-lat1)/(lng2-lng1) );
       angle_deg = 360 * angle_t/(2 * Math.PI);
        if((lng2-lng1)<0) {
            angle_deg = 180 + angle_deg;
        } else if((lat2-lat1)<0) {
            angle_deg = 360 + angle_deg;
        }
  
        angle_deg = Math.round(angle_deg);
        if(isNaN(angle_deg)){
        if(this.angledeg_store.length!==0){
         
            angledeg_store.push(this.angledeg_store[i]);
          }else{angledeg_store.push(angle_deg);}
        }else{angledeg_store.push(angle_deg);}
        // angledeg_store.push(angle_deg);
      
        if(this.Live_data[i].runningStatus=='Running') {
            if(this.add_trail==true) {
              var  flightPlanCoordinates = [
                    {lat: lat1, lng: lng1},
                    {lat: lat2, lng: lng2}
                ];
             
                // if(lat1!==lat2){
                 
               var flightPath = new google.maps.Polyline({
                    path: flightPlanCoordinates,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                    // geodesic: true,
                    imei:vSerialLocal,
        //              icons: [{
        //   icon: { path: google.maps.SymbolPath.FORWARD_OPEN_ARROW  },
        //   //  google.maps.SymbolPath.FORWARD_CLOSED_ARROW
        //   offset: '100%',
        //   repeat: '100px'
        // }],
                });
              // } 
                flightPath.setMap(this.maps);
               var prev_poly = [
                    {'imei': vSerialLocal},
                    {'polyline':flightPath}
                ];
               var prev_poly1 = [
                    {vSerialLocal:flightPath}
                ];
               this.poly_pt.push(flightPath);
            }
        }
  
        if(this.Live_data[i].runningStatus=='Stopped'){
            if(this.poly_pt.length>0){
                for (var ipl = 0; ipl < this.poly_pt.length; ipl++) {
                    if(this.poly_pt[ipl].imei==vSerialLocal){
                        this.poly_pt[ipl].setMap(null);
                    }
                }
            }
            
        }
      }else{
        angle_deg=0;  
      }
  
     my_scaled = new google.maps.Size(10, 10);
    var vehicleColorDeg = 0;
    var saturate:any =100;
    var  brightness:any=100;
    if(angle_deg==0) {
        if(this.Live_data[i].runningStatus=='Running') {
            vehicleColorDeg = 120;
            saturate =100;
            brightness=100;
            //url = 'http://localhost/new_nimbumirchee/images/running.png';
            // url = icon1; 
            url = url_pre+'/imagesnew/running.png';
           
            my_label_class = 'custom_label_green';
            my_label_classimg = 'custom_label_greenimg';
        } else if(this.Live_data[i].runningStatus=='Stopped___') {
            vehicleColorDeg = 0;
            saturate =100;
            brightness=100
            //url = 'http://localhost/new_nimbumirchee/images/stop.png';
            url = url_pre+'/imagesnew/stop.png';
            my_label_class = 'custom_label_red';
            my_label_classimg = 'custom_label_redimg';
        } else if(this.Live_data[i].runningStatus=='Stopped____') {
            vehicleColorDeg = 0;
            saturate =100;
            brightness=100;
            //url = 'http://localhost/new_nimbumirchee/images/stop.png';
            url = url_pre+'/imagesnew/stop.png';
            my_label_class = 'custom_label_gray';
            my_label_classimg = 'custom_label_grayimg';
        } else if(this.Live_data[i].runningStatus=='Stopped_') {
            vehicleColorDeg = 0;
            saturate =100;
            brightness=100;
            //url = 'http://localhost/new_nimbumirchee/images/stop.png';
            url = url_pre+'/imagesnew/stop.png';
            my_label_class = 'custom_label_black';
            my_label_classimg = 'custom_label_blackimg';
        } else if(this.Live_data[i].runningStatus=='Stopped__') {
            vehicleColorDeg = 0;
            saturate =100;
            brightness=100;
            //url = 'http://localhost/new_nimbumirchee/images/stop.png';
            url = url_pre+'/imagesnew/stop.png';
            my_label_class = 'custom_label_purple';
            my_label_classimg = 'custom_label_purpleimg';
        } else if(this.Live_data[i].runningStatus=='Stopped') {
         
          vehicleColorDeg = 0;
          saturate =100;
            brightness=100;
          // url = icon1; 
          url = url_pre+'/imagesnew/stop.png';
          my_label_class = 'custom_label_red';
          my_label_classimg = 'custom_label_redimg';
          if(this.groupId=='0068'){
          
            if(this.Live_data[i]?.StatusColor=='black'){
              
              my_label_class = 'custom_label_black';
            }else if(this.Live_data[i]?.StatusColor=='purple'){
              my_label_class = 'custom_label_purple';
            }else if(this.Live_data[i]?.StatusColor=='blue'){
              my_label_class = 'custom_label_blue';
            }else if(this.Live_data[i]?.StatusColor=='red'){
              my_label_class = 'custom_label_red';
            }else if(this.Live_data[i]?.StatusColor=='green'){
              my_label_class = 'custom_label_green';
            }
          }
         
      } else if(this.Live_data[i].runningStatus=='NoData') {
         
        vehicleColorDeg = 38.8;
        saturate =100;
            brightness=200;
        // url = icon1; 
        url = url_pre+'/imagesnew/stop.png';
          my_label_class = 'custom_label_orange';
          my_label_classimg = 'custom_label_redimg';
    }else if(this.Live_data[i].runningStatus=='NoGPS') {
         
      vehicleColorDeg = 0;
      // url = icon1; 
      url = url_pre+'/imagesnew/stop.png';
        my_label_class = 'custom_label_blue';
        my_label_classimg = 'custom_label_redimg';
        my_scaled = new google.maps.Size(10, 10);
  }else if(this.Live_data[i].runningStatus=='Breakdown'||this.Live_data[i].runningStatus=='Accidental'||this.Live_data[i].runningStatus=='Not In-Use') {
         
    vehicleColorDeg = 30;
    saturate =100;
    brightness=29.4;
    // url = icon1; 
    url = url_pre+'/imagesnew/stop.png';
      my_label_class = 'custom_label_orange_breakdown';
      my_label_classimg = 'custom_label_redimg';
    
  }
  
        my_scaled = new google.maps.Size(10, 10);
     
     
    } else {
        //url = 'http://localhost/new_nimbumirchee/images/arrow_images/'+angle_deg+'.png';
        url = url_pre+'/imagesnew/arrow_images/'+angle_deg+'.png';
       
       var forFuture = url;
    }
  
    if(this.Live_data[i].runningStatus!='Running') {
        vehicleColorDeg = 0;
        saturate =100;
            brightness=100;
        url = url_pre+'/imagesnew/stop.png';
    }
  
    if(isNaN(angle_deg)) {
     
        if(this.Live_data[i].runningStatus=='Running') {
          if(this.lat_store.length!=0){
           
            
            if(!Number.isNaN(this.angledeg_store[i]) && this.angledeg_store.length!==0){
              angle_deg=this.angledeg_store[i];
           
            }else{angle_deg=0;}
          
        // my_scaled = new google.maps.Size(10, 10);
        url = url_pre+'/imagesnew/arrow_images/'+angle_deg+'.png';
        my_scaled = new google.maps.Size(20, 20);
          }else{
            vehicleColorDeg = 120;
            saturate =100;
            brightness=100;
            //url = 'http://localhost/new_nimbumirchee/images/running.png';
            // url = icon1; 
            url = url_pre+'/imagesnew/running.png';
            my_label_class = 'custom_label_green';
            my_label_classimg = 'custom_label_greenimg';
            my_scaled = new google.maps.Size(10, 10);}
        } else if(this.Live_data[i].runningStatus=='Stopped___') {
            vehicleColorDeg = 0;
            saturate =100;
            brightness=100;
            //url = 'http://localhost/new_nimbumirchee/images/stop.png';
            url = url_pre+'/imagesnew/stop.png';
            my_label_class = 'custom_label_red';
            my_label_classimg = 'custom_label_redimg';
            my_scaled = new google.maps.Size(10, 10);
        } else if(this.Live_data[i].runningStatus=='Stopped_') {
            vehicleColorDeg = 0;
            saturate =100;
            brightness=100;
            //url = 'http://localhost/new_nimbumirchee/images/stop.png';
            url = url_pre+'/imagesnew/stop.png';
            my_label_class = 'custom_label_black';
            my_label_classimg = 'custom_label_blackimg';
            my_scaled = new google.maps.Size(10, 10);
        } else if(this.Live_data[i].runningStatus=='Stopped__') {
            vehicleColorDeg = 0;
            saturate =100;
            brightness=100;
            //url = 'http://localhost/new_nimbumirchee/images/stop.png';
            url = url_pre+'/imagesnew/stop.png';
            my_label_class = 'custom_label_purple';
            my_label_classimg = 'custom_label_purpleimg';
            my_scaled = new google.maps.Size(10, 10);
        }
        else if(this.Live_data[i].runningStatus=='Stopped') {
          vehicleColorDeg = 0;
          saturate =100;
          brightness=100;
          // url = icon1; 
          url = url_pre+'/imagesnew/stop.png';
            my_label_class = 'custom_label_red';
            my_scaled = new google.maps.Size(10, 10);
            if(this.groupId=='0068'){
             
              if(this.Live_data[i]?.StatusColor=='black'){
                
                my_label_class = 'custom_label_black';
              }else if(this.Live_data[i]?.StatusColor=='purple'){
                my_label_class = 'custom_label_purple';
              }else if(this.Live_data[i]?.StatusColor=='blue'){
                my_label_class = 'custom_label_blue';
              }else if(this.Live_data[i]?.StatusColor=='red'){
                my_label_class = 'custom_label_red';
              }else if(this.Live_data[i]?.StatusColor=='green'){
                my_label_class = 'custom_label_green';
              }
            }
        }else if(this.Live_data[i].runningStatus=='NoData') {
          vehicleColorDeg = 38.8;
          saturate =100;
          brightness=200;
          url = url_pre+'/imagesnew/stop.png';
            my_label_class = 'custom_label_orange';
            my_scaled = new google.maps.Size(10, 10);
        }else if(this.Live_data[i].runningStatus=='NoGPS') {
         
          vehicleColorDeg = 0;

          // url = icon1; 
          url = url_pre+'/imagesnew/stop.png';
            my_label_class = 'custom_label_blue';
            my_label_classimg = 'custom_label_redimg';
            my_scaled = new google.maps.Size(10, 10);
      } else if(this.Live_data[i].runningStatus=='Breakdown'||this.Live_data[i].runningStatus=='Accidental'||this.Live_data[i].runningStatus=='Not In-Use') {
         
        vehicleColorDeg = 30;
        saturate =100;
        brightness=29.4;
        // url = icon1; 
        url = url_pre+'/imagesnew/stop.png';
          my_label_class = 'custom_label_orange_breakdown';
          my_label_classimg = 'custom_label_redimg';
          my_scaled = new google.maps.Size(10, 10);
      }else {
            vehicleColorDeg = 0;
            //url = 'http://localhost/new_nimbumirchee/images/stop.png';
            url = url_pre+'/imagesnew/stop.png';
            my_label_class = 'custom_label_gray';
            my_label_classimg = 'custom_label_grayimg';
            my_scaled = new google.maps.Size(10, 10);
        }
        // angle_deg=0;
        
        // url = url_pre+'/imagesnew/arrow_images/'+angle_deg+'.png';
    }
  }else{
    if(this.Live_data[i].runningStatus=='Running') {
      vehicleColorDeg = 120;
      saturate =100;
      brightness=100;
      // url = icon1; 
      // url = 'http://localhost/new_nimbumirchee/images/running.png';
      url =url_pre+'/imagesnew/running.png';
      my_label_class = 'custom_label_green';
      my_label_classimg = 'custom_label_greenimg';
  } else if(this.Live_data[i].runningStatus=='Stopped___') {
      vehicleColorDeg = 0;
      //url = 'http://localhost/new_nimbumirchee/images/stop.png';
      url = url_pre+'/imagesnew/stop.png';
      my_label_class = 'custom_label_red';
      my_label_classimg = 'custom_label_redimg';
  } else if(this.Live_data[i].runningStatus=='Stopped_') {
      vehicleColorDeg = 0;
      //url = 'http://localhost/new_nimbumirchee/images/stop.png';
      url = url_pre+'/imagesnew/stop.png';
      my_label_class = 'custom_label_black';
      my_label_classimg = 'custom_label_blackimg';
  } else if(this.Live_data[i].runningStatus=='Stopped__') {
      vehicleColorDeg = 0;
      //url = 'http://localhost/new_nimbumirchee/images/stop.png';
      url = url_pre+'/imagesnew/stop.png';
      my_label_class = 'custom_label_purple';
      my_label_classimg = 'custom_label_purpleimg';
  }
  else if(this.Live_data[i].runningStatus=='Stopped') {
    vehicleColorDeg = 0;
    url = url_pre+'/imagesnew/stop.png';
      my_label_class = 'custom_label_red';
  }else if(this.Live_data[i].runningStatus=='NoData') {
    vehicleColorDeg = 38.8;
    saturate =100;
    brightness=200;
    url = url_pre+'/imagesnew/stop.png';
      my_label_class = 'custom_label_orange';
  }else if(this.Live_data[i].runningStatus=='NoGPS') {
         
    vehicleColorDeg = 0;
    // url = icon1; 
    url = url_pre+'/imagesnew/stop.png';
      my_label_class = 'custom_label_blue';
      my_label_classimg = 'custom_label_redimg';
}else if(this.Live_data[i].runningStatus=='Breakdown'||this.Live_data[i].runningStatus=='Accidental'||this.Live_data[i].runningStatus=='Not In-Use') {
         
  vehicleColorDeg = 30;
  saturate =100;
  brightness=29.4;
  // url = icon1; 
  url = url_pre+'/imagesnew/stop.png';
    my_label_class = 'custom_label_orange_breakdown';
    my_label_classimg = 'custom_label_redimg';
  
}
  else {
      vehicleColorDeg = 0;
      //url = 'http://localhost/new_nimbumirchee/images/stop.png';
      url = url_pre+'/imagesnew/stop.png';
      my_label_class = 'custom_label_gray';
      my_label_classimg = 'custom_label_grayimg';
      vehicleColorDeg = 40;
      saturate =8;
      brightness=186;
  }
  }
  }
  //  else {
    
  //   if(this.Live_data[i].runningStatus=='Running') {
  //       vehicleColorDeg = 120;
  //       //url = 'http://localhost/new_nimbumirchee/images/running.png';
  //       url =url_pre+'/imagesnew/running.png';
  //       my_label_class = 'custom_label_green';
  //       my_label_classimg = 'custom_label_greenimg';
  //   } else if(this.Live_data[i].runningStatus=='Stopped___') {
  //       vehicleColorDeg = 0;
  //       //url = 'http://localhost/new_nimbumirchee/images/stop.png';
  //       url = 'assets/imagesnew/stop.png';
  //       my_label_class = 'custom_label_red';
  //       my_label_classimg = 'custom_label_redimg';
  //   } else if(this.Live_data[i].runningStatus=='Stopped_') {
  //       vehicleColorDeg = 0;
  //       //url = 'http://localhost/new_nimbumirchee/images/stop.png';
  //       url = 'assets/imagesnew/stop.png';
  //       my_label_class = 'custom_label_black';
  //       my_label_classimg = 'custom_label_blackimg';
  //   } else if(this.Live_data[i].runningStatus=='Stopped__') {
  //       vehicleColorDeg = 0;
  //       //url = 'http://localhost/new_nimbumirchee/images/stop.png';
  //       url = 'assets/imagesnew/stop.png';
  //       my_label_class = 'custom_label_purple';
  //       my_label_classimg = 'custom_label_purpleimg';
  //   } else {
  //       vehicleColorDeg = 0;
  //       //url = 'http://localhost/new_nimbumirchee/images/stop.png';
  //       url = 'assets/imagesnew/stop.png';
  //       my_label_class = 'custom_label_gray';
  //       my_label_classimg = 'custom_label_grayimg';
  //   }
  //  }
  // end arrow-------------------
  if(this.Live_data[i].runningStatus=='Running') {
    vehicleColorDeg = 120;
    my_label_class = 'custom_label_green';
    my_label_classimg = 'custom_label_greenimg';
  } else if(this.Live_data[i].runningStatus=='Stopped___') {
    vehicleColorDeg = 0;
    my_label_class = 'custom_label_red';
    my_label_classimg = 'custom_label_redimg';
  } else if(this.Live_data[i].runningStatus=='Stopped_') {
    vehicleColorDeg = 0;
    my_label_class = 'custom_label_black';
    my_label_classimg = 'custom_label_blackimg';
  } else if(this.Live_data[i].runningStatus=='Stopped__') {
    vehicleColorDeg = 0;
    my_label_class = 'custom_label_purple';
    my_label_classimg = 'custom_label_purpleimg';
  }
  else if(this.Live_data[i].runningStatus=='Stopped') {
    vehicleColorDeg = 0;
    url = url_pre+'/imagesnew/stop.png';
      my_label_class = 'custom_label_red';
      if(this.groupId=='0068'){
       
        if(this.Live_data[i]?.StatusColor=='black'){
          vehicleColorDeg =  276.9;
          my_label_class = 'custom_label_black';
        }else if(this.Live_data[i]?.StatusColor=='purple'){
          vehicleColorDeg =  276.9;
          my_label_class = 'custom_label_purple';
        }else if(this.Live_data[i]?.StatusColor=='blue'){
          my_label_class = 'custom_label_blue';
        }else if(this.Live_data[i]?.StatusColor=='red'){
          my_label_class = 'custom_label_red';
        }else if(this.Live_data[i]?.StatusColor=='green'){
          my_label_class = 'custom_label_green';
        }
      }
  }else if(this.Live_data[i].runningStatus=='NoData') {
    vehicleColorDeg = 30;
    url = url_pre+'/imagesnew/stop.png';
      my_label_class = 'custom_label_orange';
  }else if(this.Live_data[i].runningStatus=='NoGPS') {
         
    vehicleColorDeg = 0;
    // vehicleColorDeg = 38.8;
    saturate =100;
    brightness=100;
    // url = icon1; 
    url = url_pre+'/imagesnew/stop.png';
      my_label_class = 'custom_label_blue';
      my_label_classimg = 'custom_label_redimg';
} else if(this.Live_data[i].runningStatus=='Breakdown'||this.Live_data[i].runningStatus=='Accidental'||this.Live_data[i].runningStatus=='Not In-Use') {
         
  // vehicleColorDeg = 0;
  vehicleColorDeg = 30;
        saturate =100;
        brightness=29.4;
  // url = icon1; 
  url = url_pre+'/imagesnew/stop.png';
    my_label_class = 'custom_label_orange_breakdown';
    my_label_classimg = 'custom_label_redimg';
  
}else {
    vehicleColorDeg = 0;
    my_label_class = 'custom_label_gray';
    my_label_classimg = 'custom_label_grayimg';
    vehicleColorDeg = 40;
    saturate =8;
    brightness=186;
  }  
  if(angle_deg>0 &&this.Live_data[i].runningStatus=='Running') {
    vehicleColorDeg = 120;
    my_scaled = new google.maps.Size(20, 20);
  }
 
  var icon2 = {
    url: url,
    anchor: new google.maps.Point(0, 0),
    scaledSize: my_scaled,
    // scaledSize: new google.maps.Size(20, 20),
    labelOrigin:  new google.maps.Point(20,-5),
    labelAnchor:  new google.maps.Point(20,-5),
    
  };
  // vehicleColorDeg=0;
  var  vehicleLabel1='<span for="cdo"  class=\" cdo_hdr\"></span>';
  if(this.Live_data[i].runningStatus=='Running'){
    vehicleLabel1='';
    vehicleLabel1='<span for="cdo"  class=\" cdoRunning\"></span>';
   
  }
  var groupId = $('#groupId').val();
  var angle_deg2 = 360 - angle_deg;
  var vehicleLabel = '<span class=\"'+ my_label_class + '\">' + vNumberLocal +'</span>';
  var label_anchor = new google.maps.Point(-16, 4);
  // saturate(8%) brightness(186%);
  var vehicleIcon = '<img class=\"'+my_label_classimg+' \" src=\"'+icon1+'\" style=\"width: 30px; margin: 10px 7px; transform: rotate('+ angle_deg2 +'deg); -webkit-transform: rotate('+ angle_deg2 +'deg); -webkit-filter: hue-rotate('+ vehicleColorDeg +'deg);filter: hue-rotate('+ vehicleColorDeg +'deg) saturate('+saturate+'%) brightness('+brightness+'%);\"/>';
  var label_anchor = new google.maps.Point(-16, 4);new google.maps.Point(100, 5);
  var label_anchor = new google.maps.Point(-8, 4);
//  var label_anchor = new google.maps.Point(30, 5);
//  my_label_class = 'class_for_image';
  if ( this.groupId=='0521' &&   icon1 !== 'undefined' &&  this.groupId!== 'undefined' && icon1!='') {

    //     //var vehicleLabel = document.createElement('img');
  //     //vehicleLabel.setAttribute('style','width:39px');  
  //     //vehicleLabel.src = resultNow[vNumberLocal[0]];
  // class=\"'+my_label_classimg+'\
 
      vehicleLabel = '<img class=\"'+my_label_classimg+'\ " src=\"'+icon1+'\" style=\"width:30px;height:25px;transform: rotate(\"+angle_deg+\"deg);\"/>';
      my_label_class = 'class_for_image';//my_label_class+' '+my_label_class_add;
     label_anchor = new google.maps.Point(30, 5);
  }
  
  var finalVehicleLabel :any;
  if(this.Live_data.length==1) {
      finalVehicleLabel = vehicleIcon+' '+vehicleLabel1;
  } else {
      finalVehicleLabel = vehicleIcon + ' ' + vehicleLabel+''+vehicleLabel1;
      // finalVehicleLabel = vehicleIcon;
      // finalVehicleLabel = vNameLocal;
  }
  // var MarkerWithLabel = ('markerwithlabel')(google.maps);
  // new markerWithLabel.MarkerWithLabel();
  // finalVehicleLabel='values';
  if(this.Live_data[i]?.IO.Temperature==undefined){
  
    this.Temperature=''; 
    this.Temperature_string='';
  }else{
    this.Temperature=this.Live_data[i]?.IO.Temperature;
    this.Temperature_string='Temperature';
  }
  if(this.Live_data[i]?.IO.Raw_power==undefined){
    this.Raw_power='';
    this.Raw_power_string='';
  }else{
    this.Raw_power=this.Live_data[i]?.IO.Raw_power;
    this.Raw_power_string='Raw_power';
  }
  
if(this.Live_data[i]?.IO.DeliveryDoor==undefined){
this.DeliveryDoor_track='';
this.DeliveryDoor_value_1=''
}else{
if(this.Live_data[i]?.IO.DeliveryDoor==''){
  this.DeliveryDoor_track='/';

}else{
  this.DeliveryDoor_track=this.Live_data[i]?.IO.DeliveryDoor;
  this.DeliveryDoor_value_1='DeliveryDoor';
}
}

if(this.Live_data[i]?.IO.MainHoleDoor==undefined){
this.MainHoleDoor_track='';
this.MainHoleDoor_values_1='';
}else{
  if(this.Live_data[i]?.IO.MainHoleDoor==''){
    this.MainHoleDoor_track='--';
  
  }else{
    this.MainHoleDoor_track=this.Live_data[i]?.IO.MainHoleDoor;
    this.MainHoleDoor_values_1='MainHoleDoor';
  }
}
  this.marker_live(this.MainHoleDoor_track,this.MainHoleDoor_values_1,this.DeliveryDoor_track,this.DeliveryDoor_value_1,this.Raw_power,this.Raw_power_string,this.Temperature, this.Temperature_string,position,icon2,vNameLocal,vSerialLocal,speedLocal,lHaltSpeedLocal,rstatus,finalVehicleLabel,label_anchor,my_label_class,vNumberLocal,vehicle_id,Battery,BatteryVoltage,Drivername, DeviceDateTime)
  this.plant();
  
  
  }
  this.angledeg_store=angledeg_store;
  
  
  // for (let i = 0; i < this.markers_live.length; i++) {
  //   this.markers_live[i].setMap(this.maps);
  // }
  
  
  
  this.flag_zoom=1;
 
    this. lat_store=[];
    this. lng_store=[];
    this.imeidata_arra=[];
    
    for(var l=0;l<this.Live_data.length;l++){
     
      var latlng_arr1=this.Live_data[l].LatLong.split(',');
   
      var imeidata_arra=this.Live_data[l].ImeiNo;
     this.lat_store.push(latlng_arr1[0]);
     
     this.lng_store.push(latlng_arr1[1]);
     this.imeidata_arra.push(imeidata_arra);
      //return false;
    }
  
    }
  
    deleteOverlays_live() {
      for (var i = 0; i < this.markers_live.length; i++) {
       this.markers_live[i].setMap(null);
    
      }
      for (var i = 0; i < this.marker_plant.length; i++) {
        this.marker_plant[i].setMap(null);
     
       }
    }
    setIconTypeV2(vType:any,status:any) {
      var icon;
      if(vType=='car') {
          if(status == 'Running') {
              icon='assets/imagesnew/kml/vehicle/cabs_running.png';
          } else if(status== 'Stopped') {
              icon='assets/imagesnew/kml/vehicle/cabs_stop.png';
          } else if(status=='InActive') {
              icon='assets/imagesnew/kml/vehicle/cabs_inactive.png';
          } else if(status=='Active') {
              icon='assets/imagesnew/kml/vehicle/cabs_running.png';
          } else {
              icon='assets/imagesnew/kml/vehicle/cabs.png';
          }
      } else if(vType=='Truck') {
          if(status == 'Running') {
              icon='assets/imagesnew/kml/vehicle/truck_running.png';
          } else if(status== 'Stopped') {
              icon='assets/imagesnew/kml/vehicle/truck_stop.png';
          } else if(status=='InActive') {
              icon='assets/imagesnew/kml/vehicle/truck_inactive.png';
          } else if(status=='Active') {
              icon='assets/imagesnew/kml/vehicle/truck_running.png';
          } else {
              icon='assets/imagesnew/kml/vehicle/truck.png';
          }
      } else if(vType=='train_wagon') {
          if(status == 'Running') {
              icon='assets/imagesnew/kml/vehicle/train_wagon_running.png';
          } else if(status== 'Stopped') {
              icon='assets/imagesnew/kml/vehicle/train_wagon_stop.png';
          } else if(status=='InActive') {
              icon='assets/imagesnew/kml/vehicle/train_wagon_inactive.png';
          } else if(status=='Active') {
              icon='assets/imagesnew/kml/vehicle/train_wagon_running.png';
          } else {
              icon='assets/imagesnew/kml/vehicle/train_wagon.png';
          }
      } else if(vType=='bus') {
          if(status == 'Running') {
              icon='assets/imagesnew/kml/vehicle/bus_running.png';
          } else if(status== 'Stopped') {
              icon='assets/imagesnew/kml/vehicle/bus_stop.png';
          } else if(status=='InActive') {
              icon='assets/imagesnew/kml/vehicle/bus_inactive.png';
          } else if(status=='Active') {
              icon='assets/imagesnew/kml/vehicle/bus_running.png';
          } else {
              icon='assets/imagesnew/kml/vehicle/bus.png';
          }
      } else if(vType=='motorbike') {
          if(status == 'Running') {
              icon='assets/imagesnew/kml/vehicle/motorcycling_running.png';
          } else if(status== 'Stop') {
              icon='assets/imagesnew/kml/vehicle/motorcycling_stop.png';
          } else if(status=='InActive') {
              icon='assets/imagesnew/kml/vehicle/motorcycling_inactive.png';
          } else if(status=='Active') {
              icon='assets/imagesnew/kml/vehicle/motorcycling_running.png';
          } else {
              icon='assets/imagesnew/kml/vehicle/motorcycling.png';
          }
      } else if(vType =='person') {
          if(status == 'Running') {
              icon='assets/imagesnew/kml/vehicle/person_running.png';
          } else if(status== 'Stopped') {
              icon='assets/imagesnew/kml/vehicle/person_stop.png';
          } else if(status=='InActive') {
              icon='assets/imagesnew/kml/vehicle/person_inactive.png';
          } else if(status=='Active') {
              icon='assets/imagesnew/kml/vehicle/person_running.png';
          } else {
              icon='assets/imagesnew/kml/vehicle/person.png';
          }
      } else if(vType =='rainfall') {
          if(status == 'stop') {
              icon='assets/imagesnew/kml/weather/rainy_no.png';
          } else if(status== 'heavy') {
              icon='assets/imagesnew/kml/weather/rainy_heavy.png';
          } else {
              icon='assets/imagesnew/kml/weather/rainy_mid.png';
          }
      }
      return icon;
  }
  marker_live(MainHoleDoor_track:any,MainHoleDoor_values_1:any,DeliveryDoor_track:any,DeliveryDoor_value_1:any,Raw_power:any,Raw_power_string:any,Temperature:any,Temperature_string:any,position:any,icon2:any,vNameLocal:any,vSerialLocal:any,speedLocal:any,lHaltSpeedLocal:any,rstatus:any,finalVehicleLabel:any,label_anchor:any,my_label_class:any,vNumberLocal:any,vehicle_id:any,Battery:any,BatteryVoltage:any,Drivername:any, DeviceDateTime:any){
  
    var marker = new MarkerWithLabel({
      position: position,
      map: this.maps,
      icon: icon2,
      draggable: false, // the CSS class for the label
      raiseOnDrag: false,
      labelContent: finalVehicleLabel,
      labelAnchor: label_anchor,//new google.maps.Point(100, 5),
      // labelClass: my_label_class,  //my_label_class, // the CSS class for the label
      labelInBackground: false,
     title: vNumberLocal+' => '+rstatus,
    
     Drivername:Drivername,
     ImeiNo:vSerialLocal,
     VehicleNo:vNameLocal,
     speedLocal:speedLocal,
     lHaltSpeedLocal:lHaltSpeedLocal,
     rstatus:rstatus,
     vehicle_id:vehicle_id,
     Battery:Battery,
     BatteryVoltage:BatteryVoltage,
     DeviceDateTime:DeviceDateTime,
     MainHoleDoor_track:MainHoleDoor_track,
     MainHoleDoor_values_1:MainHoleDoor_values_1,
     DeliveryDoor_track:DeliveryDoor_track,
     DeliveryDoor_value_1:DeliveryDoor_value_1,
     Raw_power:Raw_power,
     Raw_power_string:Raw_power_string,
     Temperature:Temperature,
     Temperature_string:Temperature_string
  });
  // this.latlngbounds.extend(position);
  var origPos = marker.getPosition();
  marker.setMap(this.maps);
  if(this.clusterChk==1) {
   
    this.clusterMarkers.push(marker);
  }
  marker.addListener('drag',function(e){marker.setPosition(origPos);})
  
  this.markers_live.push(marker);
  var infowindow = new google.maps.InfoWindow();
  var contentString:any;

if(this.Live_data.length==1){
  var str = this.Live_data[0]?.LatLong;
var formData = new FormData();formData.append('portal', 'itraceit');
      formData.append('AccessToken', localStorage.getItem('AccessToken')!);
      formData.append('VehicleId', marker.vehicle_id);
      formData.append('ImeiNo', marker.ImeiNo);
      formData.append('LatLong',str);
     
      this.service.Lastlocation(formData).subscribe((res: any) => {
        // alert(res.Status);
        if (res.Status == "Failed") {
          // alert("p");
          localStorage.removeItem('AccessToken');
          this.router.navigate(['/auth/login']);
        }
        else {
        
          this.last_address = res.Data;
        
          this.Address = this.last_address.Address;
          this.DistanceCovered = this.last_address.DistanceCovered;
          this.DistanceFromNearestLandmark = this.last_address.DistanceFromNearestLandmark;
       
  contentString='<table  border=\"0\">'+
 
  '<tr>'+
  '<td class=\"live_td_css1\"style="font-size: 11px;font-weight: 900;font-family:Roboto;">Address</td>'+
  '<td>:</td>'+
  '<td class=\"live_td_css2\"style=" color: blue; white-space: nowrap;font-size: 11px;">'+this.Address+ '</td>'+
 '</tr>'+
  '</table>'+
  '<b><font color=black size=2>'+marker.position+'</font></b>';
  // Create a new InfoWindow.
  // infoWindow = new google.maps.InfoWindow({
  //   position:marker.position,
   
  // infoWindow.close();
  infowindow.setContent(contentString);
  // infoWindow.open(marker);
  // closeLastOpenedInfoWindow();
  if (this.lastOpenedInfoWindow) {
    // marker.setMap(null);
      this.lastOpenedInfoWindow.close();
      
  }
  infowindow.open(this.maps, marker); 
  this.lastOpenedInfoWindow=0; 
  this.lastOpenedInfoWindow = infowindow;
} 
});
}


  google.maps.event.addListener(marker,this.MouseHover_value, (e) => {
    this.infowindow_seprate(marker);
  } );
 
  if(this.clusterChk==1) {
    var marker, f;
    var options_markerclusterer = {
        gridSize: 50,
        textSize: 1,
        maxZoom: 18,
        zoomOnClick: true,
        imagePath:  'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    };
    var markerCluster = new MarkerClusterer(this.gm_map, this.clusterMarkers, options_markerclusterer);
    
    google.maps.event.addListener(markerCluster, 'mouseover', (cluster) => {
      if (this.window_store!==undefined){
        this.window_store.close();}
      var markers = cluster.getMarkers();
      var array:any = [];
      var num = 0;
      var clusTered = '<table class=\"table table-bordered\" style=\"margin-top: 5px;width: 165px;\">';
      var colorCluster;
      for (f = 0; f < markers.length; f++) {
          num++;
         
          var vehicleTitle = markers[f].getTitle().split('=>');
          
          var color:any='green';
          if(vehicleTitle[1]==" Stopped"){
            color='red';
         
          }else if(vehicleTitle[1]==" InActive"){
            color='gray';
          }else if(vehicleTitle[1]==" Running"){
            color='green';
          }else if(vehicleTitle[1]==" NoGPS"){
            color='blue';
          }else if(vehicleTitle[1]==" NoData"){
            color='orange';
          }
          array.push(markers[f].getTitle() + '<br>');
          clusTered += '<tr onclick=\"myClick(1);\"><td style="color:'+color+'">'+vehicleTitle[0]+'</td><td style="color:'+color+'" >' +vehicleTitle[1]+'</td></tr>';
      }

      clusTered += '</table>';
      if ( this.window_store1) { this.window_store1.close();}
      infowindow = new google.maps.InfoWindow();
      //if (gm_map.getZoom() <= markerCluster.getMaxZoom()) {
          infowindow.setContent('<label>'+markers.length + ' Vehicles:</label><br>' + clusTered);
          infowindow.setPosition(cluster.getCenter());
          //infowindow.open(map_canvas, marker);
          infowindow.open(this.gm_map);
          this.window_store1=0;
          this.window_store1=infowindow;
    


    });
  
    google.maps.event.addListener(markerCluster, 'clusterclick', (cluster) => {
  
        var center = cluster.getCenter();
        var latitude = center.lat();
        var longitude = center.lng();
        this.clusterLat=[];
        this.clusterLng=[];
        this.clusterZoom=[];
        this.clusterLat.push(latitude);
        this.clusterLng.push(longitude);
        var cgZoom = this.gm_map.getZoom();
        this.clusterZoom.push(cgZoom);
  
        var content = '';
        // Convert lat/long from cluster object to a usable MVCObject
        var info = new google.maps.MVCObject;
        info.set('position', cluster.center_);
  
        //Get markers
        this.markers_cluster=[];
        this.markers_cluster = cluster.getMarkers();
        var titles = '';
        //Get all the titles
        for(var w = 0; w < this.markers_cluster.length; w++) {
            titles += this.markers_cluster[w].getTitle();
        }
        if (infowindow){ infowindow.close();}
        var infowindow = new google.maps.InfoWindow();
       
        infowindow.setContent(titles); //set infowindow content to titles
        infowindow.open(this.maps, info);
    });
    for (f = 0; f < this.clusterMarkers.length; f++) {
      this.marker = this.clusterMarkers[f];
      google.maps.event.addListener(marker, 'click', ((marker) => {
       
          return () => {
           
              //infoWindow = new google.maps.InfoWindow();
              //infowindow.setContent(this.getTitle());
              infowindow.open(this.gm_map, this);
          }
      })(marker));
  }
  var infowindow1 = new google.maps.InfoWindow();
  google.maps.event.addListener(this.gm_map, 'idle', () => {
    var center = this.gm_map.getCenter();
    var latitude = center.lat();
    var longitude = center.lng();
    
    this.clusterLat=[];
    this.clusterLng=[];
    this.clusterZoom=[];
    this.clusterLat.push(latitude);
    this.clusterLng.push(longitude);
    var cgZoom = this.gm_map.getZoom();
    this.clusterZoom.push(cgZoom);
    // markerCluster;
     markerCluster = new MarkerClusterer(this.gm_map, this.clusterMarkers, options_markerclusterer);
     google.maps.event.addListener(markerCluster, 'mouseover', (cluster) => {
      
      if ( this.window_store1) { this.window_store1.close();}
        var markers = cluster.getMarkers();
        var array:any = [];
        var num = 0;
        var clusTered =  
      //   '<a id="infowindow_submit1">bbbbb</a>'+
      '<table class=\"table table-bordered\" style=\"margin-top: 5px;\">';
        var colorCluster;
        for (f = 0; f < markers.length; f++) {
            num++;
           this.num_value=0;
           this.num_value= num++;
          
            var vehicleTitle = markers[f].getTitle().split('=>');
            
            // this.ve='';
            // var ve:any=vehicleTitle[0];
            var color:any='green';
            if(vehicleTitle[1]==" Stopped"){
              color='red';
          
            }else if(vehicleTitle[1]==" InActive"){
              color='gray';
            }else if(vehicleTitle[1]==" Running"){
              color='green';
            }else if(vehicleTitle[1]==" NoGPS"){
              color='blue';
            }else if(vehicleTitle[1]==" NoData"){
              color='orange';
            }
            
            array.push(markers[f].getTitle() + '<br>');
            clusTered += '<tr >'+
            '<td style="color:'+ color+'"><a id="infowindow_submit'+f+'">'+vehicleTitle[0]+'</a></td>'+
            '<td style="color:'+ color +'">'+vehicleTitle[1]+'</td>'+
            '</tr>';
           
      // onclick=\"myClick(1);\"

      // '<button type="button" class="btn btn-outline-secondary " id="infowindow_submit1" name="submit" value ="submit" style="margin-left: 5px;padding:0px !important; margin-top: 5px;">'+
      // '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Change Status</span>'+'</button>'
     
        // if(marker.length-1==f){
        //   clusTered += '</table>';
        // }
        
          }
  
          clusTered += '</table>';
        if (infowindow1){infowindow1.close();}
        infowindow1 = new google.maps.InfoWindow();
        //if (gm_map.getZoom() <= markerCluster.getMaxZoom()) {
          infowindow1.setContent('<label>'+markers.length + ' Vehicles:</label><br>' + clusTered);
          infowindow1.setPosition(cluster.getCenter());
            //infowindow.open(map_canvas, marker);
            infowindow1.open(this.gm_map);
            this.window_store=0;
            this.window_store=infowindow1;
          
            // google.maps.event.addListener(infowindow1, 'domready', () => {
            //   $(document).ready(() => {
              
            //     for (var h = 0; h < markers.length; h++) {
            //    
            //       var vehicleTitle = markers[h].getTitle().split('=>');
            //     $("#infowindow_submit"+h).click(() => {
                 
            //     
      
            //     }
            //     )
               
            //     }
            //     $("#infowindow_submit2").click(() => {
            //       alert(0)
            //       
        
            //       }
            //       )
            //   })
            // })
         

           
    
          });
         
  });
  var clusterOptions = {
    zoomOnClick: false
  }
        // map.fitBounds(latlngbounds);
    } else {
    }
    for (let v = 0; v < this.markers_cluster.length; v++) {
      this.markers_cluster[v].setMap(this.maps);
    }
    var current_zoom = this.maps.getZoom();
      // var flag_zoom=document.getElementById('flag_zoom').value;
      // this.flag_zoom=0;
      if(this.flag_zoom==0) {
        // this. maps.fitBounds(this.latlngbounds_live1);
       
         var current_zoom_fit = this.maps.getZoom();
        // 
      
         if(this.temp_index_live.length>0 && this.temp_index_live.length<=2) {
       
            // this.maps.fitBounds(this.latlngbounds_live1);
            this. maps.setCenter(this.latlngbounds_live1.getCenter());
             this.maps.setZoom(current_zoom_fit+5);
         
           
         } else if( this.temp_index_live.length>2 && this.temp_index_live.length<6) {
          // this. maps.setCenter(this.latlngbounds_live1.getCenter());
          //    this.maps.setZoom(current_zoom_fit+1);
            //  this.maps.setZoom(17);


            this.maps.fitBounds(this.latlngbounds_live1);
            this. maps.setCenter(this.latlngbounds_live1.getCenter());
         } else {
          this.maps.fitBounds(this.latlngbounds_live1);
            this. maps.setCenter(this.latlngbounds_live1.getCenter());
            
          
         }
        
     } else {
        this. maps.setZoom(current_zoom);
         //map.fitBounds(latlngbounds);
     }
  const closeLastOpenedInfoWindow = () => {
    if (this.lastOpenedInfoWindow) {
        this.lastOpenedInfoWindow.close();
    }
  }
  }
  infowindow_seprate(marker:any){
    this.Status_save_value=[];
    this.Status_save_value=marker;
   
    this.markers_live.push(marker);
    var infowindow = new google.maps.InfoWindow();
    var contentString:any;
  
    for (var i = 0; i < this.Live_data.length; i++) {
      if (this.Live_data[i]?.Imei == marker.ImeiNo) {
        // var temp = this.Live_data[i];
        // this.IMEINO = temp.ImeiNo;
        // this.vehicle_id = temp.VehicleId;
        var str = this.Live_data[i]?.LatLong;
      }
    }
    this.str='';
    var k= marker.position.toString();
    this.str= (((k.split('(')).join('')).split(')')).join('').split(' ').join('');
   
  var formData = new FormData();formData.append('portal', 'itraceit');
        formData.append('AccessToken', localStorage.getItem('AccessToken')!);
        formData.append('VehicleId', marker.vehicle_id);
        formData.append('ImeiNo', marker.ImeiNo);
        formData.append('LatLong',this.str);
       
        this.service.Lastlocation(formData).subscribe((res: any) => {
          // alert(res.Status);
          if (res.Status == "Failed") {
            // alert("p");
            localStorage.removeItem('AccessToken');
            this.router.navigate(['/auth/login']);
          }
          else {
          
            this.last_address = res.Data;
            this.Address = this.last_address.Address;
            this.DistanceCovered = this.last_address.DistanceCovered;
            this.DistanceFromNearestLandmark = this.last_address.DistanceFromNearestLandmark;
         
    contentString='<table  border=\"0\">'+
    '<tr>'+
    '<td class=\"live_td_css1\" style="font-size: 11px;font-weight: 900;font-family:Roboto;">Vehicle Name</td>'+
    '<td width=\"1%\">:</td>'+
    '<td class=\"live_td_css2\"style=" color: blue; white-space: nowrap;font-size: 11px;">'+marker.VehicleNo+'</td>'+
    '</tr>'+
    '<tr>'+
    '<td class=\"live_td_css1\" style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Name/Contact</td>'+
    '<td width=\"1%\">:</td>'+
    '<td class=\"live_td_css2\"style=" color: blue; white-space: nowrap;font-size: 11px;">'+marker.Drivername +'</td>'+
    '</tr>'+
    // '<tr class=\"route_class\">'+
    // '<td class=\"live_td_css1\">Route</td>'+
    // '<td>:</td>'+
    // '<td class=\"live_td_css2\">'+vRoute+'</td>'+
    // '</tr>'+
    // '<tr>'+
    // '<td class=\"live_td_css1\">Plant</td>'+
    // '<td>:</td>'+
    // // '<td class=\"live_td_css2\">'+vPlant+'</td>'+
    // '</tr>'+
    '<tr>'+
    '<td class=\"live_td_css1\" style="font-size: 11px;font-weight: 900;font-family:Roboto;">Imei</td>'+
    '<td>:</td>'+
    '<td class=\"live_td_css2\"style=" color: blue; white-space: nowrap;font-size: 11px;">'+marker.ImeiNo+'</td>'+
    '</tr>'+
    '<tr>'+
    '<td class=\"live_td_css1\" style="font-size: 11px;font-weight: 900;font-family:Roboto;">Date Time</td>'+
    '<td>:</td>'+
    '<td class=\"live_td_css2\"style=" color: blue; white-space: nowrap;font-size: 11px;">'+marker.DeviceDateTime+'</td>'+
    '</tr>'+
    // '<!--<tr>'+
    // '<td class=\"live_td_css1\" style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Name/Mob </td>'+
    // '<td>:</td>'+
    // '<td class=\"live_td_css2\"style=" color: blue; white-space: nowrap;font-size: 11px;">'+Drivername+'</td>'+
    // '</tr>-->'+
    // '<tr>'+
    '<tr>'+
    '<td class=\"live_td_css1\" style="font-size: 11px;font-weight: 900;font-family:Roboto;">Speed</td>'+
    '<td>:</td>'+
    '<td class=\"live_td_css2\"style=" color: blue; white-space: nowrap;font-size: 11px;">'+marker.speedLocal+'</td>'+
    '</tr>'+
    // '<tr>'+
    // '<td class=\"live_td_css1\">Date Time</td>'+
    // '<td>:</td>'+
    // '<td class=\"live_td_css2\">'+dateTimeArr+'</td>'+
    // '</tr>'+
    '<tr>'+
    '<td class=\"live_td_css1\"style="font-size: 11px;font-weight: 900;font-family:Roboto;">Address</td>'+
    '<td>:</td>'+
    '<td class=\"live_td_css2\"style=" color: blue; white-space: nowrap;font-size: 11px;">'+this.Address+ '</td>'+
   '</tr>'+
    '<tr>'+
    '<td class=\"live_td_css1\"style="font-size: 11px;font-weight: 900;font-family:Roboto;">Battery</td>'+
    '<td>:</td>'+
    '<td class=\"live_td_css2\"style=" color: blue; white-space: nowrap;font-size: 11px;">'+Math.round(marker.Battery)+'%'+'('+marker.BatteryVoltage+'v'+')'+'</td>'+
   '</tr>'+
   '<tr >'+
   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">'+marker.DeliveryDoor_value_1+'</td>'+
   '<td style="width:1%;color: blue;"> </td>'+
   '<td style=" color: blue; white-space: nowrap;font-size: 11px;" >'+  marker.DeliveryDoor_track+'</td>'+
 '</tr>'+
 '<tr>'+
   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">'+marker.MainHoleDoor_values_1+'</td>'+
   '<td style="width:1%;color: blue;"> </td>'+
   
   '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ marker.MainHoleDoor_track+'</td>'+
 '</tr>'+
 '<tr>'+
   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">'+marker.Temperature_string+'</td>'+
   '<td style="width:1%;color: blue;"> </td>'+
   
   '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+marker.Temperature+'</td>'+
 '</tr>'+
    '<tr>'+
    '<td class=\"live_td_css1\" style="font-size: 11px;font-weight: 900;font-family:Roboto;">Last Halt Time</td>'+
    '<td>:</td>'+
    '<td class=\"live_td_css2\"style=" color: blue; white-space: nowrap;font-size: 11px;">'+marker.lHaltSpeedLocal+'</td>'+
    '</tr>'+
    '<tr>'+
    '<td class=\"live_td_css1\" style="font-size: 11px;font-weight: 900;font-family:Roboto;">Status</td>'+
    '<td>:</td>'+
    '<td class=\"live_td_css2\"style=" color: blue; white-space: nowrap;font-size: 11px;">'+marker.rstatus+'</td>'+
    '</tr>'+
    '</table>'+
    '<b><font color=black size=2>'+marker.position+'</font></b>'+
    '</div>'+ 
    '<div class="" style="border-top:1px solid #dee2e6;justify-content: flex-end;padding: 2px;    border-bottom-right-radius: calc(0.3rem - 1px);border-bottom-left-radius: calc(0.3rem - 1px);display: flex;">'+
    '<button type="button" class="btn btn-outline-secondary " id="infowindow_submit1'+ marker.VehicleNo+'" name="submit" value ="submit" style="margin-left: 5px;padding:0px !important; margin-top: 5px;">'+
    '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Change Status</span>'+'</button>'+
    '</div>';

    // Create a new InfoWindow.
    // infoWindow = new google.maps.InfoWindow({
    //   position:marker.position,
     
    // infoWindow.close();
    infowindow.setContent(contentString);
    // infoWindow.open(marker);
    // closeLastOpenedInfoWindow();
  
    if (this.lastOpenedInfoWindow) {
      // marker.setMap(null);
        this.lastOpenedInfoWindow.close();
        
    }
    
    infowindow.open(this.maps, marker); 
    this.lastOpenedInfoWindow=0; 
    this.lastOpenedInfoWindow = infowindow;
    google.maps.event.addListener(infowindow, 'domready', () => {
      $(document).ready( () => {
      
      $("#infowindow_submit1"+marker.VehicleNo).click(() => 
     {
      
      // $(document).ready( () => {
  
      // closeLastOpenedInfoWindow();
        if(marker.rstatus=='Breakdown'||marker.rstatus=='Accidental'||marker.rstatus=='Not In-Use'){
          this.open11();
        }else{
        this.open10();
      }
    // })
  
      })
  
     
    
    })
  })
  } 
 
  });
 

  }
  open11(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef11 = this.modalService.open(this.modalContent11,{ size: 's' })
      
      this.modalRef11.result.then(resolve, resolve)
      this.StstusstartDate();
    })
  }
  open10(): Promise<boolean> {
   
    return new Promise<boolean>(resolve => {
      this.modalRef10 = this.modalService.open(this.modalContent10,{ size: 's' })
      
      this.modalRef10.result.then(resolve, resolve)
      this.StstusstartDate();
    })
  }
  StstusstartDate(){
    $(document).ready( () => {
      $("#statuschange").datepicker({
        format: 'yyyy-mm-dd' ,
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        
      }
      );
     

     })
  }  
  changestatus_submit(){
    this.submit_status=true;
    var ExpenseExpenseDate= $("#statuschange").val();

    this.change_status.patchValue({
      startdate: ExpenseExpenseDate
    });
    
   
    if(this.change_status.status=='VALID'){
      var formData = new FormData();formData.append('portal', 'itraceit');
      formData.append('AccessToken',localStorage.getItem('AccessToken')!);
      formData.append('VehicleNo', this.Status_save_value.VehicleNo);
      formData.append('StatusTypeId',this.change_status.value.StatusTypeId);
      formData.append('ImeiNo', this.Status_save_value.ImeiNo);
      formData.append('Address',this.Address);
      formData.append('GeoCoords',this.str);
      formData.append('StartTime',this.change_status.value.startdate );
      formData.append('Remark', this.change_status.value.Remark);
      if(this.groupId!=='undefined'){
        formData.append('GroupId',  this.groupId);}
      this.service.breakdownAdd(formData).subscribe((res: any) => {
      
        if (res.Status== "success") {
        alert(res.Message);
        this.modalService.dismissAll();
        this.submit_status=false;
        this.List_vehicle();
      
        }
          })


    }
  }
 
  vehicleStatusTypes(){
    var formData = new FormData();formData.append('portal', 'itraceit');
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    this.service.vehicleStatusTypes(formData).subscribe((res: any) => {
    
      if (res.Status =="success") {
        this.vehicleStatus_Types=res.Data;

      }
      else{
        //  this.segmentUnion_list();
        //  this.polyline_RouteAssignment();
         
      }
    });
  }
 
  breakdownClose(){
    
    var ExpenseExpenseDate= $("#statuschange").val();
    this.close_Status.patchValue({
      startdate: ExpenseExpenseDate
    });
    this.submit_status=true;
   
    if(this.close_Status.status=='VALID'){
    var formData = new FormData();formData.append('portal', 'itraceit');
      formData.append('AccessToken',localStorage.getItem('AccessToken')!);
      formData.append('VehicleNo', this.Status_save_value.VehicleNo);
      formData.append('ImeiNo', this.Status_save_value.ImeiNo);
      formData.append('CloseTime',this.close_Status.value.startdate);
      
      this.service.breakdownClose(formData).subscribe((res: any) => {
        if(res.Status== "success"){
          alert(res.Message);
          this.modalService.dismissAll();
          this.submit_status=false;
          this.List_vehicle();
        }
      });
    }
  }
  // lat_tmp,lng_tmp,vSerialLocal,vNameLocal,vNumberLocal,speedLocal,ioStrLocal,marker,dMaxSpeedLocal,lHaltSpeedLocal,rstatusLocal,dMobNoLocal
    infoCallbackLive(lat,lng,vSerial,vName,vNumber,speed,ioStr,marker,maxSpeed,maxHaltTime,rstatus,dMobileNoLocal) {
      // return function() {
          var contentString='';
          // if (infowindow) infowindow.close();
          var latlng = new google.maps.LatLng(lat, lng);
          const infowindow = new google.maps.InfoWindow(
            {
              position:marker.latlng
            }
          );
          
          var strSecURL='/secu_trak_location/getFormattedLocation?latlng='+lat+','+lng+'&rad=20';
          // var reqSec = getXMLHTTP();
          // reqSec.open('GET', strSecURL, false); //third parameter is set to false here
          // reqSec.send(null);
          // var loc_sec= reqSec.responseText;
          var all = vName;
          // if(loc_sec!='' || loc_sec!='()') {
            
              infowindow.setContent("contentString");
              infowindow.open( marker);
          // } 
          /* else {
              geocoder.geocode({'latLng': latlng}, function(results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                      if(results) {
                          var google_lat = '';
                          var google_lng = '';
                          var distance = '';
                          var tmp_address;
                          var google_add_flag=0;
                          for (var j=0; j<results.length; j++) {
                              // alert('type='+results[j].types[0]);
                              if ((results[j].types[0] == 'street_address') || (results[j].types[0] == 'route')) {
                                  google_lat = results[j].geometry.location.lat();
                                  google_lng = results[j].geometry.location.lng();
                                  distance = calculate_distance(lat, google_lat, lng, google_lng);
                                  tmp_address=distance+' Km From '+results[j].formatted_address;
                                  google_add_flag=1;
                              }
                          }
    
                          //alert('tmp_address='+tmp_address);
                          if(google_add_flag==0) {    // if address not come form google map then this block get address from xml
                              tmp_address=get_xml_location(latlng);
                          }
    
                          var str=lat+','+lng;
                          //var strURL='/nimbu_mirchee_v1/Homes/select_landmark_marker?content='+str;
                          contentString='<table width=\"50%\" border=\"0\">'+
                          '<tr>'+
                          '<td class=\"live_td_css1\">Vehicle Name</td>'+
                          '<td width=\"1%\">:</td>'+
                          '<td class=\"live_td_css2\">'+vName+'</td>'+
                          '</tr>'+
                          '<tr>'+
                          '<td class=\"live_td_css1\">Imei</td>'+
                          '<td>:</td>'+
                          '<td class=\"live_td_css2\">'+vSerial+'</td>'+
                          '</tr>'+
                          '<!--<tr>'+
                          '<td class=\"live_td_css1\">Driver Name/Mob </td>'+
                          '<td>:</td>'+
                          '<td class=\"live_td_css2\">'+dMobileNoLocal+'</td>'+
                          '</tr>-->'+
                          '<tr>'+
                          '<tr>'+
                          '<td class=\"live_td_css1\">Speed</td>'+
                          '<td>:</td>'+
                          '<td class=\"live_td_css2\">'+speed+'</td>'+
                          '</tr>'+
                          '<tr>'+
                          '<tr>'+
                          '<td class=\"live_td_css1\">Date Time</td>'+
                          '<td>:</td>'+
                          '<td class=\"live_td_css2\">'+dateTimeArr+'</td>'+
                          '</tr>'+
                          '<tr>'+
                          '<td class=\"live_td_css1\">Address</td>'+
                          '<td>:</td>'+
                          '<td class=\"live_td_css2\">'+tmp_address+'</td>'+ioStr+ 
                          '<!--<tr>'+
                          '<td class=\"live_td_css1\">Day Max Speed</td>'+
                          '<td>:</td>'+
                          '<td class=\"live_td_css2\">'+maxSpeed+'</td>'+ 
                          '<tr>-->'+
                          '<tr>'+
                          '<td class=\"live_td_css1\">Last Halt Time</td>'+
                          '<td>:</td>'+
                          '<td class=\"live_td_css2\">'+maxHaltTime+'</td>'+
                          '</tr>'+
                          '<tr>'+
                          '<td class=\"live_td_css1\">Status</td>'+
                          '<td>:</td>'+
                          '<td class=\"live_td_css2\">'+rstatus+'</td>'+
                          '</tr>'+
                          '</table>'+
                          '<b><font color=black size=2>('+lat+','+lng+')</font></b>';
                          infowindow.setContent(contentString);
                          infowindow.open(map_canvas, marker);
                      } else {
                          alert('No results found');
                      }
                  } else {
                      alert('Geocoder failed due to: ' + status);
                  }
                  //contentString='';
              });
          }*/
      
    }
    Arrow_add(){
      this.add_arrow=!this.add_arrow; 
     }
     Add_tail(){
      this.add_trail=!this.add_trail;
   
    }
    show_infowindow_live(id){
  
      if (this.Vehicle_list[id].Checked==true) {
  // position,vNameLocal,vSerialLocal,speedLocal,lHaltSpeedLocal,rstatus,finalVehicleLabel,label_anchor,my_label_class,vNumberLocal,vehicle_id,Battery
     for(var i=0;i<=this.temp_index_live.length;i++){
      if(this.temp_index_live[i]?.VehicleNo==id){
      var k=  this.temp_index_live[i]?.ImeiNo;
      var temp_index_live=this.temp_index_live[i];
      var formData = new FormData();formData.append('portal', 'itraceit');
      formData.append('AccessToken', localStorage.getItem('AccessToken')!);
        formData.append('ImeiNo',k);
        this.service.Live_latlng(formData).subscribe((res: any) => {
          if (res.Status == "success") { 
            // livedata={};
            var marker=res.Data[0];
            this.Status_save_value=[];
            this.Status_save_value=marker;
         
            this.latlngbounds_live=[];
            this.polygonCoords1_live=[];
            this.latlngbounds_live = new google.maps.LatLngBounds();
            this.polygonCoords1_live = new Array();
              var coord2 = marker.LatLong.split(",");
              //alert("lat="+parseFloat(coord2[0])+"lng="+parseFloat(coord2[1]));
              this.polygonCoords1_live = new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]));
        
              this.latlngbounds_live.extend(new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1])));
       ;
              if(marker.IO.Temperature==undefined){
                this.Temperature='';
                this.Temperature_string='';
              }else{
                this.Temperature=marker.IO.Temperature;
                this.Temperature_string='Temperature';
              }
              if(marker.IO.Raw_power==undefined){
                this.Raw_power='';
                this.Raw_power_string='';
              }else{
                this.Raw_power=marker.IO.Raw_power;
                this.Raw_power_string='Raw_power';
              }
              if(temp_index_live.DriverName==''){
                this.DriverName='/';
              }else{
                this.DriverName=temp_index_live.DriverName;
              }
          if(marker.IO.DeliveryDoor==undefined){
            this.DeliveryDoor_track='';
            this.DeliveryDoor_value_1=''
          }else{
            if(marker.IO.DeliveryDoor==''){
              this.DeliveryDoor_track='/';
            
            }else{
              this.DeliveryDoor_track=marker.IO.DeliveryDoor;
              this.DeliveryDoor_value_1='DeliveryDoor';
            }
          }
          
          if(marker.IO.MainHoleDoor==undefined){
            this.MainHoleDoor_track='';
            this.MainHoleDoor_values_1='';
          }else{
              if(marker.IO.MainHoleDoor==''){
                this.MainHoleDoor_track='--';
              
              }else{
                this.MainHoleDoor_track=marker.IO.MainHoleDoor;
                this.MainHoleDoor_values_1='MainHoleDoor';
              }
            }
          
            var infowindow = new google.maps.InfoWindow({  
              position: this.polygonCoords1_live,
              enableEventPropagation: true,
              // content: contents  ,
            }); 
            if(this.clusterChk==1) {  this.gm_map.fitBounds(this.latlngbounds_live);}
            else{this.maps.fitBounds(this.latlngbounds_live);}
            


            if(this.clusterChk==1) {  
              var listener = google.maps.event.addListener(this.gm_map, "idle", () => { 
                if (this.maps.getZoom() > 14) this.maps.setZoom(15); 
                google.maps.event.removeListener(listener); 
              });}
            else{
              var listener = google.maps.event.addListener(this.maps, "idle", () => { 
                if (this.maps.getZoom() > 14) this.maps.setZoom(15); 
                google.maps.event.removeListener(listener); 
              });}
          
            
           
            var contents:any;
              this.path=0;
              this.path=this.polygonCoords1_live;
              var val = temp_index_live.VehicleId;
              this.imei_no_show=marker.ImeiNo;
              this.VehicleCategory=temp_index_live.VehicleCategory;
              this.DeliveryDoor1=this.DeliveryDoor_track;
              this.MainHoleDoor1=this.MainHoleDoor_track;
              this.latlong1 = this.polygonCoords1_live;
              // this.Weather_forcast();
              this.IMEINO = 0;
              this.vehicle_id = 0;
              this.current = [];
              this.str = 0;
              this.IMEINO=k;
              this.vehicle_id=temp_index_live.VehicleId;
              this.str =  marker.LatLong;
              this.last_address=[];
              var formData = new FormData();formData.append('portal', 'itraceit');
              formData.append('AccessToken', localStorage.getItem('AccessToken')!);
              formData.append('VehicleId', this.vehicle_id);
              formData.append('ImeiNo', this.IMEINO);
              formData.append('LatLong',  this.str);
             
              this.service.Lastlocation(formData).subscribe((res: any) => {
                // alert(res.Status);
                if (res.Status == "Failed") {
                  // alert("p");
                  localStorage.removeItem('AccessToken');
                  this.router.navigate(['/auth/login']);
                }
                else {
                  this.last_address = res.Data;
                  this.Address = this.last_address.Address;
                  this.DistanceCovered = this.last_address.DistanceCovered;
                  this.DistanceFromNearestLandmark = this.last_address.DistanceFromNearestLandmark;
              
                }
                contents = 
                '<div id="content" >'+  
                '<div id="siteNotice">'+
                '<table>'+
                '<tbody>'+
              
              '<tr>'+
                '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Vehicle Name</td>'+
                '<td style="width:1%;color: blue;">:</td>'+
                '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+id+'</td>'+
              '</tr>'+
              '<tr>'+
              '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Name</td>'+
              '<td style="width:1%;color: blue;">:</td>'+
              '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ this.DriverName+'</td>'+
            '</tr>'+
              '<tr>'+
                '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Imei No</td>'+
                '<td style="width:1%;color: blue;">:</td>'+
                '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+k+'</td>'+
              '</tr>'+
              '<tr>'+
                '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Speed</td>'+
                '<td style="width:1%;color: blue;">:</td>'+
                '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ marker.Speed+'</td>'+
              '</tr>'+
              '<tr>'+
                '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Date Time</td>'+
                '<td style="width:1%;color: blue;">:</td>'+
                '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+marker.DeviceDateTime+'</td>'+
              '</tr>'+
              '<tr>'+
                '<td  style="width:100px ;font-size: 11px;font-weight: 900;font-family:Roboto;">Address</th>'+
                '<td style="width:1%;color: blue;">:</td>'+
                '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ this.Address+'</th>'+
             
             ' </tr>'+
             '<tr>'+
              '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">'+this.Raw_power_string+'</td>'+
              '<td style="width:1%;color: blue;"> </td>'+
              
              '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+this.Raw_power+'</td>'+
            '</tr>'+
             '<tr>'+
             '<td  style="width:100px ;font-size: 11px;font-weight: 900;font-family:Roboto;">Status</th>'+
             '<td style="width:1%;color: blue;">:</td>'+
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+marker.runningStatus+'</th>'+
          
          ' </tr>'+
              '<tr>'+
                '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Battery</td>'+
                '<td style="width:1%;color: blue;">:</td>'+
                '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+Math.round(marker.Battery)+'%'+'('+marker.BatteryVoltage+'v'+')'+'</td>'+
              '</tr>'+
              
              // '<tr>'+
              //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;"> Distance</td>'+
              //   '<td style="width:1%;color: blue;">:</td>'+
              //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ marker1.Distance+'</td>'+
              // '</tr>'+
              
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
              '<tr >'+
                '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">'+this.DeliveryDoor_value_1+'</td>'+
                '<td style="width:1%;color: blue;"> </td>'+
                '<td style=" color: blue; white-space: nowrap;font-size: 11px;" >'+  this.DeliveryDoor_track+'</td>'+
              '</tr>'+
              '<tr>'+
                '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">'+this.MainHoleDoor_values_1+'</td>'+
                '<td style="width:1%;color: blue;"> </td>'+
                
                '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ this.MainHoleDoor_track+'</td>'+
              '</tr>'+
              '<tr>'+
                '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">'+this.Temperature_string+'</td>'+
                '<td style="width:1%;color: blue;"> </td>'+
                
                '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+this.Temperature+'</td>'+
              '</tr>'+
              
              '<tr>'+
                '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Last HaltTime</td>'+
                '<td style="width:1%;color: blue;"> </td>'+
                
                '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+marker.HaltTime+'</td>'+
              '</tr>'+
              '<tr>'+
                '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;width: 111px;">'+'('+marker.LatLong+')'+'</td>'+
                '<td style="width:1%;color: blue;"> </td>'+
                
                '<td style=" color: blue; white-space: nowrap;font-size: 11px;"></td>'+
              '</tr>'+
            //   '<tr>'+
            //   '<td  style="font-size: 11px;font-weight: 900;font-family:Roboto;width: 111px;">'+marker1.position+'</td>'+
            //   '<td style="width:1%;color: blue;"> </td>'+
              
            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;"></td>'+
            // '</tr>'+
            // '</span>'+Temperature_string
            //   '<tr>'+
              '</tbody>'+
              '</table>'+
              '</div>'+ 
              '<div class="" style="border-top:1px solid #dee2e6;justify-content: flex-end;padding: 2px;    border-bottom-right-radius: calc(0.3rem - 1px);border-bottom-left-radius: calc(0.3rem - 1px);display: flex;">'+
              '<button type="button" class="btn btn-outline-secondary " id="infowindow_submit2'+ marker.VehicleNo+'" name="submit" value ="submit" style="margin-left: 5px;padding:0px !important; margin-top: 5px;">'+
              '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Change Status</span>'+'</button>'+
              '</div>'
              '</div>';
            
                infowindow.setContent(contents);
             
                closeLastOpenedInfoWindow();
                  if(this.clusterChk==1) {  infowindow.open(this.gm_map, marker,this.Address); }
            else{infowindow.open(this.maps, marker,this.Address); }
                  // 
                 
                  this.lastOpenedInfoWindow=0; 
                  this.lastOpenedInfoWindow = infowindow;
                 
        
                 
        
        
            })

             google.maps.event.addListener(infowindow, 'domready', () => {
    $(document).ready( () => {
     
    $("#infowindow_submit2"+marker.VehicleNo).click(() => 
   {
    // $(document).ready( () => {

    // closeLastOpenedInfoWindow();
      if(marker.rstatus=='Breakdown'||marker.rstatus=='Accidental'||marker.rstatus=='Not In-Use'){
        this.open11();
      }else{
      this.open10();
    }
  // })

    })

   
  
  })
})
          }
          const closeLastOpenedInfoWindow = () => {
            if(this.storemarker_data[1]!==undefined){
              this.storemarker_data[0].setMap(null);
              this.storemarker_data.splice( 0,1);
            }
            if (this.lastOpenedInfoWindow) {
              // marker.setMap(null);
                this.lastOpenedInfoWindow.close();
                
            }
        }
        });
      
     
      }
     }
  }
    }
    
plant(){
  this.plantLatlong=[];
  this.planrlatlng_store=[];
  this.polygonCoords2 = new Array();
  if(this.RoutePlant_filter_value==2 ||this.RoutePlant_filter_value==3){
    for(var i=0;i<this.temp_index_live.length;i++){
      for(var k=0;k<this.data4.length;k++){
        if(this.temp_index_live[i]?.VehicleNo==this.data4[k]?.VehicleNo){
          this.planrlatlng_store.push(this.data4[k]?.PlantLatLong)
        //   var coord2= this.data4[k]?.PlantLatLong.split(',');
        
        //   this.polygonCoords2[i] = new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]));
          // var position=new google.maps.LatLng(parseFloat(latlng_arr[0]), parseFloat(latlng_arr[1]));
         
          // this.plantLatlong.push( position);
          
        }
      } 
    }
    
    for(var p=0;p<this.planrlatlng_store.length;p++){
      var coord2 = this.planrlatlng_store[p].split(",");
      this.polygonCoords2[p] = new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]));
      const image ='assets/imagesnew/stop.png';
      var icon2 = {
        url: image,
        
        anchor: new google.maps.Point(0, 0),
        // scaledSize: my_scaled,
        scaledSize: new google.maps.Size(20, 20),
        labelOrigin:  new google.maps.Point(20,-5),
        labelAnchor:  new google.maps.Point(20,-5),
        
      };
      const marker_plant = new google.maps.Marker({
        position:this.polygonCoords2[p],
        icon: icon2,
        map: this.maps,
        draggable: true,
        // LandmarkName: this.Landmark_name,
      });
      this.marker_plant.push(marker_plant);
      var infowindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker_plant, 'click', (event) => {
        infowindow.setContent(
        '<div id="content" >'+  
        '<div id="siteNotice">'+
        '<table>'+
        '<tbody>'+
        '<tr>'+
        '<td style="font-size: 12px;font-weight: bold;font-family:Roboto;">Type</td>'+
        '<td style="width:1%;color: blue;">:</td>'+
        '<td style=" color: blue; white-space: nowrap;font-size: 12px;color:red;font-weight: bold;">Plant</td>'+
      '</tr>'+
      '<tr>'+
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Latitude/Longitude</td>'+
        '<td style="width:1%;color: blue;">:</td>'+
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ marker_plant.position +'</td>'+
      '</tr>'+
      '</tbody>'+
      '</table>'+
      '</div>');
        infowindow.setPosition(event.latLng);
        infowindow.open(this.maps);
      });
    }
  
   
   

  //   var latlng_arr= this.temp_index[i]?.PlantLatLong.split(',');
  // var position=new google.maps.LatLng(latlng_arr[0],latlng_arr[1]);
  // this.plantLatlong.push( position);

}
}


    StationMaster(eve:any){
      this.StationMaster_id=eve.target.value;
      for(var v=0;v<this.Station_Type_list.length;v++){
        if(this.Station_Type_list[v]?.id==this.StationMaster_id){
         this.StationMaster_text= this.Station_Type_list[v]?.text;
        }
      }
      if(this.StationMaster_id==2||this.StationMaster_id==3){
        this.SpinnerService.show('spinner-station');
        this.runRoutes_list();
      }
    }
    runRoutes_list(){
   
      var formData = new FormData();formData.append('portal', 'itraceit');
      formData.append('AccessToken', localStorage.getItem('AccessToken')!);
      formData.append('StationTypeId', this.StationMaster_id);
      this.service.runRoutes(formData).subscribe((res: any) => {
  
        if (res.Status == "failed") {
          alert("No customer location founds");
          // localStorage.removeItem('AccessToken');
          // this.router.navigate(['/auth/login']);
        }
        else {
          this.run_Routes_list = res.Data;
          this.SpinnerService.hide('spinner-station');
          if(this.run_Routes_list==undefined){
            alert("Data is not found");
          }else{
          this.RunRoute=true;  }   
         
        }
      });
    }
    Station_Typelist(){
      var formData = new FormData();formData.append('portal', 'itraceit');
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    formData.append('GroupId',this.groupId);
    
    this.service.StationType(formData).subscribe((res: any) => {

      if (res.Status == "failed") {
        // localStorage.removeItem('AccessToken');
        // this.router.navigate(['/auth/login']);
      }
      else {
        this.Station_Type_list = res.Data;
       
      
      }
    });
    }
    test_check(eve:any,va:any){
      if(eve.target.checked){
      this.Runcode='';
      this.Runcode=va;
      for(var i=0;i<this.run_Routes_list.length;i++){
        if(this.run_Routes_list[i]?.RouteCode==va){
         var Customers:any=[];
         Customers =this.run_Routes_list[i]?.Customers;
       this.Customers = Customers.toString();
       this.stations();
        }
      }
    }else{
      
      for(var s=0;s<this.station_store.length;s++){
        if(this.station_store[s].Route==va){
          this.station_store[s].setMap(null);
        }
      }
    }
    }
    logout(){
      localStorage.removeItem('AccessToken');
      localStorage.clear();
      this.router.navigate(['/auth/login']);     
      location.href = 'https://secutrak.in/logout';       
    }
    stations(){
      var formData = new FormData();formData.append('portal', 'itraceit');
      formData.append('AccessToken', localStorage.getItem('AccessToken')!);
      formData.append('StationTypeId', this.StationMaster_id);
      if( this.StationMaster_id==2|| this.StationMaster_id==3){
      formData.append('RouteCode',  this.Runcode);}
      formData.append('StationCodes', this.Customers);
      formData.append('Live', '1');
      formData.append('Check', '1');
      this.service.stations(formData).subscribe((res: any) => {
  
        if (res.Status == "failed") {
          alert("No customer location founds");
          // localStorage.removeItem('AccessToken');
          // this.router.navigate(['/auth/login']);
        }
        else {
        var run_Routes_list:any=[];run_Routes_list = res;
        var Stations_detail:any=[];
        Stations_detail =run_Routes_list.Stations;
  
        this.latlngbounds = new google.maps.LatLngBounds();
        this.polygonCoords4 = new Array();
  
        for(var s=0;s<Stations_detail.length;s++){
          
            var coord2 = Stations_detail[s]?.LatLong.split(",");
            this.polygonCoords4[s] = new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]));
            this.latlngbounds.extend(this.polygonCoords4[s]);
            new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]))
          this.addmarker_plant(this.polygonCoords4[s],this.latlngbounds,Stations_detail[s]?.Name,Stations_detail[s]?.Code,
            Stations_detail[s]?.Type,Stations_detail[s]?.Icon,run_Routes_list.Color,run_Routes_list.Route);
        }
         
        
        }
      });
    }
    addmarker_plant(polygonCoords4:any,latlngbounds:any,Name:any,Code:any,Type:any,Icon:any, Color:any,Route:any){
      // const image = 'fa fa-men';
      var marker_landmark1 = new google.maps.Marker({
        position: polygonCoords4,
       
        map: this.maps,
        draggable: false,
        Name: Name,
        Type:Type,
        Route:Route,
        code:Code,
      //   label: {
      //     fontFamily: 'Fontawesome',
      //     text: '\uf192', //code for font-awesome icon
      //     fontSize: '15px',
      //     color: Color,
      // },
      // icon: {
      //   // path:'<i class="fa fa-map-marker fa-2x"></i>',
      //     path: google.maps.SymbolPath.CIRCLE, //or any others
      //     scale: 0
      // }
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: Color,
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 10
      },
      label: {
        fontFamily: "FontAwesome",
        fontWeight: '900',
        text: eval("'\\u"+'f0ab'+"'"),
        color: 'white'
      }
      }, "<h1>Marker 0</h1><p>This is the home marker.</p>");
    
     
      // this.plant_store.push( marker_landmark);
      marker_landmark1.setMap(this.maps);
      this.station_store.push(marker_landmark1);
      this.maps.fitBounds(this.latlngbounds);
      var listener = google.maps.event.addListener(this.maps, "idle", () => { 
        if (this.maps.getZoom() > 14) this.maps.setZoom(14); 
        google.maps.event.removeListener(listener); 
      });
      var infowindow = new google.maps.InfoWindow();
  
      google.maps.event.addListener(marker_landmark1, 'click', (event) => {
       
        infowindow.setPosition(event.latLng);
        this.closeLastOpenedInfoWindow();
        infowindow.open(this.maps);
        this.lastOpenedInfoWindow=0; 
      this.lastOpenedInfoWindow = infowindow;
      });
     
      infowindow.setContent(
        '<div id="content"style="padding-right: 0px; padding-bottom: 0px; max-width: 648px; max-height: 370px; min-width: 0px;" >'+  
        '<div id="siteNotice" style="overflow: scroll;max-height: 352px;">'+
        '<table>'+
        '<tbody>'+
      
      '<tr>'+
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;"><font style="font-size: 14px;font-weight: 700;"><b>Route</b></font></td>'+
        '<td style="width:1%;color: blue;">:</td>'+
        '<td style=" color: blue; white-space: nowrap;font-size: 14px;font-weight: 700;">'+ marker_landmark1.Route +'</td>'+
      '</tr>'+
      '<tr>'+
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;"><font style="font-size: 14px;font-weight: 700;"><b>STATION</b></font></td>'+
        '<td style="width:1%;color: blue;">:</td>'+
        '<td style=" color: blue; white-space: nowrap;font-size: 14px;font-weight: 700;">'+ marker_landmark1.Name +'</td>'+
      '</tr>'+
      '<tr>'+
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;"><font style="font-size: 14px;font-weight: 700;"><b>CUSTOMER	</b></font></td>'+
        '<td style="width:1%;color: blue;">:</td>'+
        '<td style=" color: red; white-space: nowrap;font-size: 14px;font-weight: 700;">'+ marker_landmark1.code +'</td>'+
      '</tr>'+
      '<tr>'+
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;"><font style="font-size: 14px;font-weight: 700;"><b>Type</b></font></td>'+
        '<td style="width:1%;color: blue;">:</td>'+
        '<td style=" color: red; white-space: nowrap;font-size: 14px;font-weight: 700;">'+ this.StationMaster_text +'</td>'+
      '</tr>'+
      '<tr>'+
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;"><font style="font-size: 14px;font-weight: 700;"><b>LatitudeLongitude</b></font></td>'+
        '<td style="width:1%;color: blue;">:</td>'+
        '<td style=" color: blue; white-space: nowrap;font-size: 14px;font-weight: 700;">'+ marker_landmark1.position +'</td>'+
      '</tr>'+
      
      '</tbody>'+
      '</table>'+
      '</div>');
     
   
      infowindow.setPosition(marker_landmark1.position);
      this.closeLastOpenedInfoWindow();
      infowindow.open(this.maps);
      this.lastOpenedInfoWindow=0; 
      this.lastOpenedInfoWindow = infowindow;
    }
    closeLastOpenedInfoWindow = () => {
      if (this.lastOpenedInfoWindow) {
          this.lastOpenedInfoWindow.close();
      }
  }
  station_value(eve:any){
    this.Customers=eve.target.value;
    this.stations();
  }

  checkAll(){
    // let input = (document.getElementsByName('mm'+i) as any)[0].checked=false;
    // input=false;
    for(var i=0;i<this.run_Routes_list.length;i++){
      let input = (document.getElementsByName('mm'+i) as any)[0].checked=false;

      input=false;
     
    }
    for(var s=0;s<this.station_store.length;s++){
       this.station_store[s].setMap(null);
   
    }
  }
  go_back(){
    this.back_home=1;
    // this.temp_index=[];
    for(var k=0;k<this.temp_index.length;k++){ 
      this.temp_index[k].Checked=false;
    }
    if(this.temp_index.length!==0){
      this.Vehicle_list[this.temp_index[0]?.VehicleNo].Checked=false;
    }
    this.router.navigate(['cv/common/HomeDashboard'], {
      state:{ structuredata:this.Vehicle_list, array: 'worldgyan'}
    })
  }
  smallsizeOpen11(smallsizemodal11: any) {
    this.setting=false;
    this.modalService.open(smallsizemodal11);
  }
  changepassword(){ 
    this.submite=true; 
    if(this.chagePassword.status=="VALID"){
   if( this.chagePassword.value.NewPassword==this.chagePassword.value.RepeatNew){
    var formData = new FormData();formData.append('portal', 'itraceit');
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    formData.append('oldPassword',this.chagePassword.value.CurrentPassword);
    formData.append('newPassword', this.chagePassword.value.NewPassword);
    formData.append('confirmPassword', this.chagePassword.value.RepeatNew);
    this.service.change_password(formData).subscribe((res: any) => {

      if (res.Status == "Failed") {
        // alert("p");
        // localStorage.removeItem('AccessToken');
        //  this.router.navigate(['/auth/login']);
      }
      else {
        alert("Successfully Changed");
        // this.Driver_list = res.DriverList;
       
      }
    });
   }else{
    alert("Incorrect Repeat Password");
   }
  }
   
  }
  opengsp(GSPREPORT: any) {
    this.key_tabs='09';
    this.SpinnerService.show('spinner-2');
    this. filter() ;
    setTimeout(() => {
      // $target.html(this.data1[$target[0].id]);
      // $target.removeClass('loading');
      this.modalService.open(GSPREPORT, { size: 'xs-5' });
      this.SpinnerService.hide('spinner-2');
  }, 800);
    
    
  }
  filter() {
    var formData = new FormData();formData.append('portal', 'itraceit');
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    this.service.Filter(formData).subscribe((res: any) => {
      if (res.Status == 'success') {
       var  Filter_list:any=[];
        this.Filter_list = res.FilterData;
        this.Filter_data1=this.Filter_list['VehicleModel'];
        Filter_list = this.Filter_list['VehicleModel']=[];
        this.Filter_list_keys = Object.keys(this.Filter_list);
      } else {
      }
    });
  }
  changesStatus(ind: string | number | any, event: { target: any }) {
    
    this.tabsclass='';
    this.tabsclass=this.key_tabs;
    var storevalues: any = [];
    storevalues = this. Filter_list[this.tabsclass][ind];
    if (event.target.checked == true) {
      storevalues = this. Filter_list[this.tabsclass][ind];
      storevalues.checked = true;
      if (this.tabsclass == 'VehicleCategory' || this.tabsclass == 'VehicleMake') {
        if (this.tabsclass == 'VehicleCategory') {
          this.store_values.push(storevalues);
            var tem_filter: any = [];
            var tem_filter1: any = [];
            for (var j = 0; j <= this.store_values.length; j++) {
              for (var i = 0; i < this.Filter_data1.length; i++) {
                if (this.Filter_data1[i]?.vehicle_category_id == this.store_values[j]?.id) {
                  tem_filter = this.Filter_data1[i];
                  tem_filter1.push(tem_filter);
                  this.SpinnerService.hide();
                }
              }
            }
            
            this.Filter_list['VehicleModel'] = tem_filter1;
            this.filter_VehicleModel=this.Filter_list['VehicleModel'];
            this.SpinnerService.hide();
          // }
        }
        if (this.tabsclass == 'VehicleMake') {
          this.store_valuesmake.push(storevalues);
          var tem_filter2: any = [];
            var tem_filter3: any = [];
            for (var j = 0; j < this.store_valuesmake.length; j++) {
              for (var i = 0; i <= this.filter_VehicleModel.length; i++) {
                if (this.filter_VehicleModel[i]?.vehicle_make_id == this.store_valuesmake[j]?.id) {
                  tem_filter2 = this.filter_VehicleModel[i];
                  tem_filter3.push(tem_filter2);
                }
              }
            }
            
            this.Filter_list['VehicleModel']=[];
            this.Filter_list['VehicleModel']=tem_filter3;
            // this.filter_VehicleModel=tem_filter3;
        }
        var obj = {}
        obj[this.tabsclass] = storevalues;
        this.objarray.push(obj);
      }

    } else {
      // for (var i = 0; i <= this.objarray.length; i++) {
      //   if (this.objarray[i]?.[this.tabsclass].id == storevalues.id) {
      //     this.objarray.splice(i, 1);
      //   }
      // }
      storevalues = this.Filter_list[this.tabsclass][ind];
      storevalues.checked = false;

      if (this.tabsclass == 'VehicleCategory' || this.tabsclass == 'VehicleMake') {
        if (this.tabsclass == 'VehicleCategory') {
          for (var i = 0; i <= this.store_values.length; i++) {
            if (this.store_values[i]?.id == storevalues.id) {
              this.store_values.splice(i, 1);
              var tem_filter: any = [];
              var tem_filter1: any = [];
             
              for (var j = 0; j <= this.store_values.length; j++) {
                for (var i = 0; i < this.Filter_data1.length; i++) {
                  if (this.Filter_data1[i]?.vehicle_category_id == this.store_values[j]?.id) {
              
                    tem_filter = this.Filter_data1[i];
                    tem_filter1.push(tem_filter);
                    this.SpinnerService.hide();
                  }
                }
              }
              this.Filter_list['VehicleModel'] = tem_filter1;
             this.filter_VehicleModel= this.Filter_list['VehicleModel'] ;
            //  this.Filter_data1=[];
            //  this.filter_VehicleModel=this.Filter_list['VehicleModel'];
             var tem_filter2: any = [];
             var tem_filter3: any = [];
             for (var j = 0; j < this.store_valuesmake.length; j++) {
               for (var i = 0; i <= this.filter_VehicleModel.length; i++) {
                 if (this.filter_VehicleModel[i]?.vehicle_make_id == this.store_valuesmake[j]?.id) {
                   tem_filter2 = this.filter_VehicleModel[i];
                   tem_filter3.push(tem_filter2);
                 }
               }
             }
             this.Filter_list['VehicleModel']=[];
             this.Filter_list['VehicleModel']=tem_filter3;
          
            }
          }
        }

        if (this.tabsclass == 'VehicleMake') {
          for (var i = 0; i <= this.store_valuesmake.length; i++) {
            if (this.store_valuesmake[i]?.id == storevalues.id) {
              this.store_valuesmake.splice(i, 1);

              var tem_filter2: any = [];
              var tem_filter3: any = [];
              for (var j = 0; j < this.store_valuesmake.length; j++) {
                for (var i = 0; i <= this.filter_VehicleModel.length; i++) {
                  if (this.filter_VehicleModel[i]?.vehicle_make_id == this.store_valuesmake[j]?.id) {
                    tem_filter2 = this.filter_VehicleModel[i];
                    tem_filter3.push(tem_filter2);
                  }
                }
              }
              this.Filter_list['VehicleModel']=[];
              this.Filter_list['VehicleModel']=tem_filter3;
              // this.filter_VehicleModel=tem_filter3;
            }
          }
        }

      }
      
    }

  }
  reload() {
    location.reload();
  }
  filters() {
    //  this.SpinnerService.show();
    this.SpinnerService.show('spinner-1');
    var arrays: any = [];
    for (var i = 0; i < this.Filter_list_keys.length; i++) {
      // multi_array['this.Filter_list_keys[]']=[];
      var keys = this.Filter_list_keys[i];
      arrays = [];
      for (var j = 0; j < this.Filter_list[keys].length; j++) {
        if (this.Filter_list[keys][j].checked == true) {
          arrays.push(this.Filter_list[keys][j].id);
        }
      }
      var strings = arrays.toString()
      this.multi_array[keys] = strings;
    }
    this.vehicle_filter();
  }
  vehicle_filter() {


    var formData = new FormData();formData.append('portal', 'itraceit');
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    // for (var j = 0; j < this.Filter_list[keys].length; j++) {}
    if (this.multi_array['Plant'] !== undefined && this.multi_array['Plant'] !== '') {

      formData.append('Plants', this.multi_array['Plant']);
    }
    if (this.multi_array['Transporter'] !== undefined && this.multi_array['Transporter'] !== '') {

      formData.append('Transporters', this.multi_array['Transporter']);
    }
    if (this.multi_array['Region'] !== '' && this.multi_array['Region'] !== undefined) {

      formData.append('Regions', this.multi_array['Region']);
    }
    if (this.geocoord !== undefined) {

      formData.append('Users', this.geocoord);
    }
    if (this.multi_array['VehicleCategory'] !== '' && this.multi_array['VehicleCategory'] !== undefined) {

      formData.append('VehicleCategories', this.multi_array['VehicleCategory']);
    }
    // formData.append('VehicleCategories', '1');
    if (this.multi_array['VehicleMake'] !== '' && this.multi_array['VehicleMake'] !== undefined) {

      formData.append('VehicleMakes', this.multi_array['VehicleMake']);
    }
    if (this.multi_array['VehicleModel'] !== '' && this.multi_array['VehicleModel'] !== undefined) {
      formData.append('VehicleModels ', this.multi_array['VehicleModel']);
    }
    // formData.append('Remark','');

    this.service.vehicle_filter(formData).subscribe((res: any) => {

      if (res.Status == "failed") {
        // localStorage.removeItem('AccessToken');
        // this.router.navigate(['/auth/login']);
        this.data1 = [];
        // this.header_values();
        if(this.groupId=='0820'){
          this.header_values();
        }
        else{
          this.header_values1();
        }
        // this.Alldata= this.data1;
        // this.show=true;
        // this.header_values();
        this.SpinnerService.hide('spinner-1');
        alert("Data not found");
      }
      else {
        var geo_detai: any = [];
        this.data1 = [];
        var store_data1: any = [];
        geo_detai = res.VehicleList;

        Object.keys(geo_detai).forEach((key) => {
          var data1 = geo_detai[key];
          store_data1.push(data1);

        })
        this.data1 = store_data1;
        this.Alldata = this.data1;
        this.show = true;
        // this.header_values();
        if(this.groupId=='0820'){
          this.header_values();
        }
        else{
          this.header_values1();
        }
        this.SpinnerService.hide('spinner-1');
      }
    });
  }

  Tabs(ind: any) {


    if (this.key_tabs !== ind) {
      this.SpinnerService.show('spinner-4');
      this.Filter_list1 = [];
      this.key_tabs = '';
      this.key_tabs = ind;
      setTimeout(() => {
        // this.Filter_list1 = this.Filter_list[this.key_tabs];
        this.Filter_list1 = this.Filter_list[ind];
        // $target.html(this.data1[$target[0].id]);
        // $target.removeClass('loading');
        this.SpinnerService.hide('spinner-4');
      }, 800);
      // this.SpinnerService.hide();
    }

  }
}
