import { HttpClient } from '@angular/common/http';
import { Component,NgZone , Input, TemplateRef, NgModule, OnInit, ViewChild, ViewContainerRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgbDateStruct, NgbModal, NgbModalRef, NgbModalOptions, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { trigger, transition, query, style, animate, group, state } from '@angular/animations';
import { MapHeaderComponent } from 'src/app/shared/components/map-header/map-header.component';''
declare var google: any;
import * as L from 'leaflet';
import { NgxSpinnerService } from 'ngx-spinner';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClockPickerConfig, ClockPickerDialogService, NgClockPickerLibModule } from 'ng-clock-picker-lib';
declare var $: any;
import { DatePipe } from '@angular/common';
import { CrudService, ExcelService } from 'src/app/shared/services/crud.service';
import { event } from 'jquery';
import { ModalComponent } from '../../advanced-elements/modal/modal.component';
import { analyzeAndValidateNgModules, CompileShallowModuleMetadata } from '@angular/compiler';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import {Directive, HostListener} from "@angular/core";

declare var MarkerClusterer:any;
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
//--END----------------------
@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  
  // changeDetection: ChangeDetectionStrategy.CheckOnce,

  animations: [
    trigger('slide_in_out', [
      state(
        'slide_in',
        style({
          width: '350px',
        })
      ),
      state(
        'slide_out',
        style({
          width: '0px',
        })
      ),
      transition('slide_out <=> slide_in', animate(300)),
    ]),
  ],
})
// https://stackoverflow.com/questions/53669361/how-to-display-date-as-label-on-x-axis-in-chart-js
export class LeafletComponent implements OnInit {
   chartcolor1:string='';
   chartcolor:any=[];
  View_chart: boolean=false;
  show_Graph: boolean=false;
  graph_speed: any=[];
  graph_datetime: any=[];
  Math =Math;
 rotate:boolean=false;
 
//   public lineChartOptions: ChartOptions = {
//  maintainAspectRatio: false,
//  responsive: true,
//  tooltips:{
//    mode: 'index',
//    titleFontSize: 12,
//    titleFontColor: '#000',
//    bodyFontColor:"#000",
//    backgroundColor: '#fff',
//    cornerRadius: 1,
//    intersect: false
//  },
//  legend: {
//    display: false,
//    labels: {
//      usePointStyle: true,
//    },
//  },
//  scales: {
//    xAxes: [{
//      // type: 'time',
//      // time: {
//      //     parser: 'YYYY-MM-DD HH:mm:ss',
//      //     unit: 'day',
//      //     // displayFormats: {
//      //     //     'minute': 'YYYY-MM-DD HH:mm:ss',
//      //     //     'hour': 'YYYY-MM-DD HH:mm:ss'
//      //     // }
//      // },
//      ticks: {
//        min: this.graph_datetime[0],
//        max: this.graph_datetime[this.graph_datetime.length],
//        stepSize:this.graph_datetime[this.graph_datetime.length],
//      },
    
//      display: true,
//      gridLines: {
//        display: true,
//        color: 'rgba(119, 119, 142, 0.2)',
//        drawBorder: false
//      },
//      scaleLabel:{
//        display: false,
//        labelString: 'Month',
//        fontColor: 'rgba(0,0,0,0.8)'
//      }
//    }],
//    yAxes: [{
//      ticks: {
//        fontColor: '#77778e',
//        min:0,
//        max:140,
//        stepSize:140,
//        beginAtZero: true
//      },
//      display: true,
//      gridLines: {
//        display: false,
//            color: 'rgba(119, 119, 142, 0.2)',
//           // color: 'rgb(119, 251, 142)',
//            drawBorder: false
//      },
//      scaleLabel: {
//        display: false,
//        labelString: 'sales',
//        fontColor: 'transparent',
//        fontSize:1
//      },
     
//    }]
  
//  },

//  plugins: {
//   zoom: {
//     zoom: {
//       wheel: {
//         enabled: true,
//       },
//       pinch: {
//         enabled: true
//       },
//       mode: 'xy',
//     },
//     pan: {
//       enabled: true,
//       mode: 'xy',
//     },
//   }
// }
//      };
// https://www.fusioncharts.com/charts/line-area-charts/line-chart-with-zooming-and-panning?framework=javascript

// lineChartLabels:any = [];
// // this.graph_datetime
//  lineChartType: ChartType = 'line';
//  lineChartLegend = true;
// lineChartData = [
//    {
//      label: 'Total-Transactions', 
//      data:[],
//    }
//  ];
 

//  lineChartColors:any = [
//   {
//     pointHoverBorderColor: "#26c1c9",
//      borderWidth: 1,
//      backgroundColor:'transparent',
//      borderColor: '#0774f8',
     
//     // borderColor:  (ctx) => (ctx.chart.data.labels[ctx.p0DataIndex] === "Green" ? "Pink" : "Orange")
//     // (condition) ? (variable = Expression2) : (variable = Expression3)
 
   
//    },
//  ];
 
   
  Live_content:boolean=false;
  DriverName: any;
  DeliveryDoor_track: any;
  MainHoleDoor_track: any ;
  key_tabs: any;
  search_value: any=1;
  geolist_excel: any=[];
  interval_value: any=30;
  MainHoleDoor_values_1: string='';
  MainHoleDoor_values_1_con: boolean=false;
  DeliveryDoor_value_1: string='';
  DeliveryDoor_value_1_con: boolean=false;
  Temperature:any;
  Temperature_string_con:boolean=false;
  Temperature_string:string='';
  Raw_power: any;
  Raw_power_string_con: boolean=false;
  Raw_power_string: string='';
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
  zoom_value: any=1;
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
  // storemarker1: any=[];
  imeiArr: any=[];
  lng_store: any=[];
  lat_store: any=[];
  imeidata_arra: any=[];

  sec_value: any=10000;
  str1_live: any;
  clusterMarkers: any=[];
  gm_map: any;
  markers_cluster: any=[];
  clusterZoom: any=[];
  clusterLat: any=[];
  clusterLng: any=[];
  zoomCls: number=5;
  // map_text: any=0;
  data_table: any = [];
  myColumnDefs = new Object();
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
  Livepage_vehiclelist:any=[];
  url_1:any;
  vehicle_lastLocation: any=[];
  line_play: any=[];
  s_play: boolean=false;
  gif_store: any=[];
  playtrack_stop: any=0;
  geo_play_va: boolean=false;
  MouseHover_value: string='click';
  groupId: any;
  only_track: boolean=false;
  mousehover_show: boolean=false;
  Landmark_listvalue1: any=[];
  temp_index_store: any=[];
  unchecked_vehicle: boolean=false;
  index_tempar: any=[];
  usecellId_value: any=0;
  GroupType: any;
  modalReference !: NgbModalRef;
  place_name: any;
  url_store: any=[];
  dateVariable: any;
  AC_co: boolean=false;
  FuelLead_co: boolean=false;
  SOS_co: boolean=false;
  Rightmenu_titleName: any=[];
  addCustomer: FormGroup;
  plant_customer: any;
  Station_info: any;
  Radious_info: any;
  Customer_info: any;
  display_customer: any;
  geocoord_save: any=[];
  Reminder_list: any=[];
  place_from: any;
  near_from: any;
  show_options: boolean=false;
  icon_save: string='fas fa-exclamation-triangle';
  icon_save_con:boolean=false;
  value_save: any=0;
  submit: boolean=false;
  destination: any=[];
  show_driver: boolean=true;
  show_vehicle1: boolean=false;
  document_data: FormGroup;
  submitDoc: boolean=false;
  documentWallet_list: any=[];
  Document_Id: any=[];
  active_doc: boolean=true;
  // check_oo:boolean=false;
  document_Edit: FormGroup;
  docedit: any;
  Hide_Data: boolean=true;
  Hide_Date_DocNo: boolean=false;
  edit_title: any;
  DocumentTypes: any=[];
  documentMasters_list: any=[];
  DocumentIssueDate_status: boolean=true;
  DocumentExpiryDate_status: boolean=true;
  Expence_list: any=[];
  Expense_Id: any=[];
  active_expen: boolean=true;
  expense_Types: any=[];
  ExpenseExpenseDate_va: boolean=false;
  ExpenseExpenseDate: any;
  public onClick(event: any): void
  {
      event.stopPropagation();
  }
  @ViewChild('modal') private modalContent: TemplateRef<ModalComponent> | undefined
  private modalRef!: NgbModalRef;
  @ViewChild('modal1') private modalContent1: TemplateRef<ModalComponent> | undefined
  private modalRef1!: NgbModalRef;
  @ViewChild('modal2') private modalContent2: TemplateRef<ModalComponent> | undefined
  private modalRef2!: NgbModalRef;
  @ViewChild('modal3') private modalContent3: TemplateRef<ModalComponent> | undefined
  private modalRef3!: NgbModalRef;
  @ViewChild('modal4') private modalContent4: TemplateRef<ModalComponent> | undefined
  private modalRef4!: NgbModalRef;
  @ViewChild('smallsizemodal1') private modalContent5: TemplateRef<ModalComponent> | undefined
  private modalRef5!: NgbModalRef;
  @ViewChild('smallsizemodal4') private modalContent6: TemplateRef<ModalComponent> | undefined
  private modalRef6!: NgbModalRef;
  @ViewChild('modal7') private modalContent7: TemplateRef<ModalComponent> | undefined
  private modalRef7!: NgbModalRef;
  @ViewChild('modal8') private modalContent8: TemplateRef<ModalComponent> | undefined
  private modalRef8!: NgbModalRef;
  @ViewChild('modal9') private modalContent9: TemplateRef<ModalComponent> | undefined
  private modalRef9!: NgbModalRef;

  
  @ViewChild(MapHeaderComponent) child;
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
  date_value:any;
  Filter_list_keys: any = [];
  vehicleno: any;
  lastOpenedInfoWindow:any;
  imei_no:any=[];
  value: any;
  polyline_details: any = [];
  imageURL:any;
  toggle = true;
  polyline_marker: any = []
  status = "Enable";
  latlong: any = [];
  marks: any = [];
  AddExpens!: FormGroup;
  submit_expence:boolean=false;
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
  AddTrip!: FormGroup;
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
  model!: NgbDateStruct;
  modalOptions!: NgbModalOptions;
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
  location_on:boolean=true;
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
  expens_list:any=[];
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
  store_data10_store:any=[];
  changeText: any;
  geofence_id: any;
  status2: any = 0;
  reports: FormGroup;
  reportsa:FormGroup;
  Landmark_values:any;
  Driverupdate: FormGroup;
  DriverAdd: FormGroup;
  Update_Geofence: FormGroup;
  get_id:any;
  Geofence: FormGroup;
  Landmark: FormGroup;
  Landmarkupdate: FormGroup;
  segments:FormGroup;
  Union_segments:FormGroup;
  filter_VehicleModel:any=[];
  polyline_segmentsnew:FormGroup;
  chagePassword:FormGroup;
  showMe: boolean = false;
  // saumya:any='saumya';
  tem_landmark:any=[];
  // model!: NgbDateStruct;
  Model!: NgbDateStruct;
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
  counter:any=0;
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
  mapsZoomMarker = function(wnMarker){

    // map.setCenter(markers[wnMarker].getPosition());
    // map.setZoom(15);
  } 
  // @Input() data: string[] | undefined;
  myDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
  myDate1 = this.datepipe.transform(new Date(), 'yyyy/MM/dd HH:mm:ss');


  // from=new Date().setDate(new Date().getDate() - 1);


  TableHeadData = [
    { id: 1, value: ' Active vehicle', checked: false },
    { id: 2, value: 'Inactive vehicle', checked: false },
    { id: 3, value: 'No GPS', checked: false },
    { id: 4, value: 'No Data', checked: false },
    { id: 5, value: 'Stopped', checked: false },


  ];
  public options = [
    { value: "on", id: "On" },
    { value: "na", id: "NA" },
    { value: "off", id: "Off" },
  ];
  select2Countries1=[
    {
     
      countryNames: [
        { id: "1", title: 'Yes'},
        { id: "2", title: 'No' },
       
      ]
    },]
  select2Countries = [
    {
      countryNames: [
        { id: "1", title: '00:00:00'},
        { id: "2", title: '00:00:05' },
        { id: "3", title: '00:00:10' },
        { id: "4", title: '00:00:15' },
        { id: "5", title: '00:00:20' },
        { id: "6", title: '00:00:25' },
        { id: "7", title: '00:00:30' },
        { id: "8", title: '00:00:35' },
        { id: "9", title: '00:00:40' },
        { id: "10", title: '00:00:00'},
        { id: "11", title: '00:00:00'},
        { id: "12", title: '00:00:00'},
        { id: "13", title: '00:00:00'},
        { id: "14", title: '00:00:00'},
        { id: "15", title: '00:00:00'},
      ]
    },
    {
      
      countryNames: [
        { id: "1", title: '00:00:00'},
        { id: "2", title: '00:00:05' },
        { id: "3", title: '00:00:10' },
        { id: "4", title: '00:00:15' },
        { id: "5", title: '00:00:20' },
        { id: "6", title: '00:00:25' },
        { id: "7", title: '00:00:30' },
        { id: "8", title: '00:00:35' },
        { id: "9", title: '00:00:40' },
        { id: "10", title: '00:00:00'},
        { id: "11", title: '00:00:00'},
        { id: "12", title: '00:00:00'},
        { id: "13", title: '00:00:00'},
        { id: "14", title: '00:00:00'},
        { id: "15", title: '00:00:00'},
      ]
    }
  ]
  select2Countries2 = [
   
     
        { id: "1", title: '00:00:00'},
        { id: "2", title: '00:00:05' },
        { id: "3", title: '00:00:10' },
        { id: "4", title: '00:00:15' },
        { id: "5", title: '00:00:20' },
        { id: "6", title: '00:00:25' },
        { id: "7", title: '00:00:30' },
        { id: "8", title: '00:00:35' },
        { id: "9", title: '00:00:40' },
        { id: "10", title: '00:00:00'},
        { id: "11", title: '00:00:00'},
        { id: "12", title: '00:00:00'},
        { id: "13", title: '00:00:00'},
        { id: "14", title: '00:00:00'},
        { id: "15", title: '00:00:00'},
      ];
      Zoom_level1 = [
        0,1,2,3,4,5,6,7,8,9
      ];
      Zoom_level = [
        { id: 0},
        { id: 1},
        { id: 2},
        { id: 3},
        { id: 4},
        { id: 5},
        { id: 6},
        { id: 7},
        { id: 8},
        { id: 9},
      ];
      Distance_variable = [
        { id: "0"},
        { id: "1"},
        { id: "2"},
        { id: "3"},
        { id: "4"},
        { id: "5"},
        { id: "6"},
        { id: "7"},
        { id: "8"},
        { id: "9"},
        { id: "10"},
        { id: "20"},
        { id: "30"},
        { id: "40"},
        { id: "50"},
        { id: "60"},
        { id: "70"},
        { id: "80"},
        { id: "90"},
        { id: "100"},

      ]
     
 

  images = [
    // wifi
    // {image1:"Track vehicle selected icon" ,image2:"Track vehicle",id:0, status:0},
    { image1: "de_Vehicle", id: 1, status: 1, image2: "ac_Vehicle" },
    { image1: "Group", image2: "Group 39920", id: 2, status: 0 },
    { image1: "Landmark icon (inactive state)", image2: "Landmark icon (Active state)", id: 3, status: 0 },
    //  {image1:"user" ,image2:"user",id:4, status:0},
    { image1: "Driver icon", image2: "Driver icon active", id: 4, status: 0 },
    { image1: "Routeicon2x", image2: "Routeiconactive2x", id: 5, status: 0 },
    { image1: "filter unselected", image2: "filter selected", id: 6, status: 0 },
    //  {image1:"Track vehicle" ,image2:"track2",id:0, status:0},
  ]
  dropdownList = [
    { item_id: 1, item_text: 'Item1' },
    { item_id: 2, item_text: 'Item2' },
    { item_id: 3, item_text: 'Item3' },
    { item_id: 4, item_text: 'Item4' },
    { item_id: 5, item_text: 'Item5' }

  ];

  dropdownSettings: IDropdownSettings = {
    idField: 'item_id',
    textField: 'item_text',
    allowSearchFilter: true
  };

  name = 'Angular 5';

  slider_state: string = 'slide_in';
  modalConfig: any;
  tab1: any;
  toggleSlider(): void {
    // do something to change the animation_state variable
    this.slider_state =
      this.slider_state === 'slide_out' ? 'slide_in' : 'slide_out';
  }

  config1: ClockPickerConfig = {
    wrapperClassName: 'className',
    closeOnOverlayClick: true
  };

  date1 = new Date();
  currentYear = this.date1.getUTCFullYear();
  currentMonth = this.date1.getUTCMonth() + 1;
  currentDate = this.date1.getUTCDate();
  finalMonth: any;
  finalDate: any;
  todaydate: any;
  Fromdaydate: any;
  todaydate1: any;
  Fromdaydatetimepicker:any;
  Fromdaydate1: any;
  checkboxes = [
    {checked: false },

  ]
  json: any;
  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "assets/img/marker-icon.png",
      shadowUrl: "assets/img/marker-shadow.png"
    })
  };
  onDetailToggle(event: any) {
  }


  time = new Date()
  constructor( private ref: ChangeDetectorRef,public activatedRoute:ActivatedRoute,private service: CrudService, public datepipe: DatePipe, private router: Router, private fb: FormBuilder, private http: HttpClient, private modalService: NgbModal,
    private config: NgbDatepickerConfig, private vcr: ViewContainerRef, private SpinnerService: NgxSpinnerService,private ngZone: NgZone) {

      this.Livepage_vehiclelist=this.router.getCurrentNavigation()?.extras.state;
      this.currentDateTime = this.datepipe.transform((new Date), ' h:mm');
    // this.currentDateTime= moment(this.currentDateTime, " hh:mm:ss").format(" hh:mm a")
    this.currentDateTime1 = this.datepipe.transform((new Date), ' h:mm');
    this.isDisabled = false;
    this.Driverupdate = new FormGroup({
      // 'region': new FormControl(''),

      DOB: new FormControl({ value: '', disabled: this.isDisabled },),
      Gender: new FormControl({ value: '', disabled: this.isDisabled },),
      PrimaryPhone: new FormControl({ value: '', disabled: this.isDisabled },),
      PrimaryEmail: new FormControl({ value: '', disabled: this.isDisabled },),
      UserId: new FormControl({ value: '', disabled: this.isDisabled },),
      Address: new FormControl({ value: '', disabled: this.isDisabled },),
      DLNumber: new FormControl({ value: '', disabled: this.isDisabled },),
      DLIssuingState: new FormControl({ value: '', disabled: this.isDisabled },),
      DlExpiryDate: new FormControl({ value: '', disabled: this.isDisabled },),
      FirstName: new FormControl({ value: '', disabled: this.isDisabled },),
      file_edit: new FormControl('',[Validators.required,]),
    });
    this.AddTrip=new FormGroup({
      // datetime: new FormControl('',[Validators.required,]),
      Vehicle: new FormControl('',[Validators.required,]),
      Source: new FormControl('',[Validators.required,]),
      Destination: new FormControl('',[Validators.required,]),
      Remark: new FormControl('',[Validators.required,]),
     })
      //  this.Hide_Data=true;
      //     this.Hide_Date_DocNo=true;
     this.document_data=new FormGroup({
      Category: new FormControl('',[ Validators.required,]),
      DV: new FormControl('',[Validators.required,]),
      Dtype: new FormControl('',[Validators.required,]),
      
      DNO: new FormControl('',[Validators.required,]),
      Dcopy: new FormControl('',[Validators.required,]),
      // Photo: new FormControl('',[Validators.required,]),
      Remark: new FormControl('',),
     })
    this.DriverAdd=new FormGroup({
      DOB: new FormControl('',[ Validators.required,]),
      Gender: new FormControl('',[Validators.required,]),
      PrimaryPhone: new FormControl('',[Validators.required,Validators.pattern("^[0-9]{10}$")]),
      PrimaryEmail: new FormControl( '',[Validators.required,Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]+$') ]),
      // UserId: new FormControl('',[ Validators.required,]),
      Address: new FormControl('' ,[ Validators.required,]),
      DLNumber: new FormControl( '',[Validators.required,]),
      // Validators.pattern("^[a-zA-Z0-9]{10}$")
      DLIssuingState: new FormControl('',[ Validators.required,]),
      DLExpiryDate: new FormControl('',[ Validators.required,]),
      FirstName: new FormControl('',[ Validators.required,]),
      // image: new FormControl('',[ Validators.required,]),
      fileSource:new FormControl(''),
      Remark:new FormControl(''),
    });
    this.reports = new FormGroup({
      'region': new FormControl(''),
      Fromdaydate: new FormControl(''),
      todaydate: new FormControl(''),
      currentDateTime2: new FormControl(''),
      currentDateTime1: new FormControl(''),
      // 'today ': new FormControl(''),

    });
   
    this.reportsa=new FormGroup({
      aydate: new FormControl('',[ Validators.required,]),
    });

    this.Geofence = new FormGroup({
      // 'region': new FormControl(''),
      geo_name: new FormControl('',[ Validators.required,]),
      Remarks: new FormControl(''),


    });
    this.Update_Geofence=new FormGroup({
      // 'region': new FormControl(''),
      // Name: new FormControl('',),
    geocoord_latlng: new FormControl('',[ Validators.required,]),


    });
    this.Landmark = new FormGroup({
      // 'region': new FormControl(''),
      Name: new FormControl('',[Validators.required,Validators.pattern('^[0-9a-zA-Z_]*$')]),
      Type: new FormControl('',[Validators.required,Validators.pattern('^[0-9a-zA-Z_]*$')]),
      Zoom: new FormControl('',[Validators.required,Validators.pattern('^[0-9a-zA-Z_]*$')]),
      Distance: new FormControl('',[Validators.required,Validators.pattern('^[0-9a-zA-Z]*$')]),
      Remarks: new FormControl(''),

    });
    this.Landmarkupdate = new FormGroup({
      // 'region': new FormControl(''),
      // id: new FormControl(''),
      Type: new FormControl({value:''},[Validators.required,Validators.pattern('^[0-9a-zA-Z_]*$')]),
      Zoom: new FormControl({value:''},[Validators.required,Validators.pattern("^[0-9]$")]),
      Distance: new FormControl({value:''},[Validators.required,Validators.pattern('^[0-9a-zA-Z]*$')]),
      Remarks: new FormControl(''),

    });
    this.segments=new FormGroup({
      Name: new FormControl('',[Validators.required,Validators.pattern('^[0-9a-zA-Z_]*$')]),
      SpeedLimit: new FormControl('',[Validators.required,]),
      AuthorizedStoppage: new FormControl('',[Validators.required,]),
      // StoppageTime: new FormControl('',[Validators.required,]),
      // TimeTaken: new FormControl('',[Validators.required,]),
      color1: new FormControl(''),
      Distance: new FormControl('',[Validators.required,]),
      RouteId: new FormControl('',[Validators.required,]),
      Remark: new FormControl('',[Validators.required,]),

    });
    this.Union_segments=new FormGroup({
      Name: new FormControl('',[Validators.required,Validators.pattern('^[0-9a-zA-Z_]*$')]),
      Code: new FormControl('',[Validators.required,]),
      SegmentIds: new FormControl('',[Validators.required,]),
      Remark: new FormControl(''),

    });
    this.polyline_segmentsnew =new FormGroup({
      RouteId: new FormControl('',[Validators.required,]),
      // UnionSegmentId: new FormControl(''),
      codes: new FormControl('',[Validators.required,]),
      Remark: new FormControl(''),

    });
    this.chagePassword=new FormGroup({
      NewPassword: new FormControl('',[Validators.required,]),
      // UnionSegmentId:  new FormControl(''),
      CurrentPassword: new FormControl('',[Validators.required,]),
      RepeatNew: new FormControl('',[Validators.required,]),

    });
    this.document_Edit=new FormGroup({
      DNO: new FormControl('',[Validators.required,]),
      Remark:  new FormControl(''),
      // CurrentPassword: new FormControl('',[Validators.required,]),
      // RepeatNew: new FormControl('',[Validators.required,]),

    });
    this.addCustomer=new FormGroup({
      Gender: new FormControl('',[Validators.required,]),
      // UnionSegmentId:  new FormControl(''),
      // CurrentPassword: new FormControl('',[Validators.required,]),
      // RepeatNew: new FormControl('',[Validators.required,]),

    });
    this.AddExpens=new FormGroup({
      VehicleName: new FormControl('',[ Validators.required,]),
      DriverName: new FormControl('',[Validators.required,]),
      ExpenseType: new FormControl('',[Validators.required,]),
      // ExpenseDate: new FormControl('',),
      Amount: new FormControl('',[Validators.required,]),
      Photo: new FormControl('',[Validators.required,]),
      Remark: new FormControl('',[Validators.required,]),
     })

    const current = new Date();

    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

    router.events.pipe(filter((event: any) => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.currentRoute = event.url;
      this.urlData = event.url.split("/")
    })

  
  }

  ngOnInit(): void {
   


    this.access= localStorage.getItem('AccessToken');
    this. GroupType= localStorage.getItem('GroupTypeId');

   if(this. GroupType=='5'||localStorage.getItem('GroupType')=='Dairy'||localStorage.getItem('GroupType')=='dairy'){
    this.display_customer=' revert';
   }else{
    this.display_customer='none';
   }
   this.Remindertable();
    this.initMap();
    this.documentWallet();
    this.documentMasters();
    new google.maps.OverlayView();
    if(this.Livepage_vehiclelist==undefined){
      this.List_vehicle();
      this.myExpenses();
     
    }else{
      // this.data1=this.Livepage_vehiclelist.structuredata;
      this.Vehicle_list=this.Livepage_vehiclelist.structuredata;
   
      Object.keys(this.Vehicle_list).forEach((key) => {
        var data1 = this.Vehicle_list[key];
        this.data4.push(data1);
      // this.data1=this.vehicle_data.structuredata;
      
        })
        this.data1=this.data4;
        this.Alldata=this.data1;
      
      this.header_values();
    }
    this.groupId=localStorage.getItem('GroupId');
  
    if( this.groupId !==undefined){
     
      this.Station_Typelist();
    }
    // 
   this.Reminder();
    this.Landmark_type();


    this.user= localStorage.getItem('UserName');
    this.rightside_menu();
    this.dateYesterday = new Date(this.dateYesterday.setDate(this.dateYesterday.getDate() - 1));
    this.Fromdaydate = this.datepipe.transform(this.dateYesterday, 'yyyy-MM-dd 00:00:00');
    this.Fromdaydatetimepicker = this.datepipe.transform(this.myDate1, 'yyyy/MM/dd 00:00:00');
    this.Routelist();
    this.Driverlist();
    this.filter();
    this.segment_list();
    this.Route_id();
    this.segmentUnion_list();
    // this.table();
    // this.openval();
    this.Lanfmarklist();
    this.geofencelist();
    this.myDateValue = new Date();
    this.end();
    this.va();
    this.expenseTypes();
    // this.track_report_v1();
    
    // this.SpinnerService.hide();
    // this.get_id=this.activatedRoute.snapshot.params['id'];
  
  }
  //  show_chart(){
  //   this.show_Graph=!this.show_Graph;
  //   if(this.show_Graph && this.graph_datetime.length==0){
  //   this.lineChartLabels=[];
  //   this.graph_speed=[];
    
  //   for(var k=0;k<=this.Map_info.length;k++){
    
  //     this.graph_speed.push(Number(this.Map_info[k]?.Speed));
  //     this.graph_datetime.push(this.Map_info[k]?.DateTime);
  //     if(this.Map_info[k]?.Speed<30){
  //       this.chartcolor1='black';
  //     }else{
  //     this.chartcolor1='red'}
  //     this.chartcolor.push(this.chartcolor1);
  //   }
  //   // this.lineChartColors[0].borderColor=this.chartcolor;
  //   // this.lineChartColors[0].backgroundColor=this.chartcolor;
  //   this.lineChartData[0].data=[];
  //   this.lineChartData[0].data=this.graph_speed;

  //   this.lineChartLabels=this.graph_datetime;
  //   // }
  // }
  // }
  openval() {
    this.initMap();
    this.header_filter(this.activatedRoute.snapshot.params['id']);
  }
  open(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent)
      this.modalRef.result.then(resolve, resolve)
    })
  }
  open1(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef1 = this.modalService.open(this.modalContent1)
      this.modalRef1.result.then(resolve, resolve)
    })
  }
  open7(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef7 = this.modalService.open(this.modalContent7,{ size: 's' })
      this.modalRef7.result.then(resolve, resolve)
    })
  }
  open8(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef8 = this.modalService.open(this.modalContent8,{ size: 'xl' })
      this.modalRef8.result.then(resolve, resolve)
    })
  }
  open9(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef9 = this.modalService.open(this.modalContent9,{ size: 'xl' })
      this.modalRef9.result.then(resolve, resolve)
    })
  }
 
  
  open2(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef2 = this.modalService.open(this.modalContent2)
      this.modalRef2.result.then(resolve, resolve)
    })
  }
  open3(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef3 = this.modalService.open(this.modalContent3)
      this.modalRef3.result.then(resolve, resolve)
    })
  }
  open4(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef4 = this.modalService.open(this.modalContent4)
      this.modalRef4.result.then(resolve, resolve)
    })
  }
  open5(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef5 = this.modalService.open(this.modalContent5)
      this.modalRef5.result.then(resolve, resolve)
    })
  }
  open6(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef6 = this.modalService.open(this.modalContent6)
      this.modalRef6.result.then(resolve, resolve)
    })
  }
  close() {
    this.modalRef.close();

  }
  close1() {
    this.modalRef1.close();

  }
  close2() {
    this.modalRef2.close();

  }
close4(){
  this.modalRef4.close();
}
  // dismiss() {
  //   this.modalRef.dismiss();
  // } 
  Submit_Updatedgeo(){
   var v= this.Update_Geofence.value.Name;
  }
  Submit() {
    this.submite=true;
    // this.Geofence.reset();
    if(this.Geofence.status=='VALID'){
      this.Geofence_name = 0;
    this.Geofence_name = this.Geofence.value.geo_name;
    this.Geofence_Remarks = this.Geofence.value.Remarks;
    this.geofenceadd();
    this.geofencelist();
    this.close();
    }
    
  

  }
  changeName(eve: any) {

  }
  onSubmit1() {
  
  }
  onSubmit11(){
    var dateVariable = $("#datepicker").val();
  }
  Reminder(){
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    this.service.Reminder(formData).subscribe((res: any) => {
    
      if (res.Status == 'success') {

this.Reminder_list=res.Data;


      }
    });
  }
  Reminder_popup(REMINDER){

    this.modalService.open(REMINDER, { size: 'lg' });
    this.table_showReport();
  }

  filter() {
    var formData = new FormData();
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
  Tabs(ind: any) {
   
    // alert(1);
    if(this.key_tabs !==ind){
    this.SpinnerService.show('spinner-4');
    this.Filter_list1=[];
    this.key_tabs='';
    this.key_tabs=ind;
      setTimeout(() => {
        
        this.Filter_list1=this.Filter_list[ind];
        // $target.html(this.data1[$target[0].id]);
        // $target.removeClass('loading');
        this.SpinnerService.hide('spinner-4');
    }, 800);
      // this.SpinnerService.hide();
  }

  }
  Tabs1(ind: any) {
    debugger;
    // this.SpinnerService.show();
    this.Filter_data = [];
    this.tabsclass = this.Filter_list_keys[ind];
    if (this.tabsclass == 'VehicleModel') {
      this.SpinnerService.show();
      this.Filter_data1 = this.Filter_list[this.tabsclass];
      
      // this.SpinnerService.hide();
      if (this.store_values.length !== 0) {
        var tem_filter: any = [];
        var tem_filter1: any = [];
        for (var i = 0; i <= this.Filter_data1.length; i++) {
          for (var j = 0; j <= this.store_values.length; j++) {
            if (this.Filter_data1[j]?.vehicle_category_id == this.store_values[i]?.id) {
             
              tem_filter = this.Filter_data1[j];
              tem_filter1.push(tem_filter);
              this.SpinnerService.hide();
            }
          }
        }
        
        this.Filter_data = tem_filter1;
        this.SpinnerService.hide();
      }
      if (this.store_valuesmake.length !== 0) {
        var tem_filter2: any = [];
        var tem_filter3: any = [];
        for (var i = 0; i <= this.Filter_data.length; i++) {
          for (var j = 0; j <= this.store_valuesmake.length; j++) {
            if (this.Filter_data[j]?.vehicle_make_id == this.store_valuesmake[i]?.id) {
              tem_filter2 = this.Filter_data[j];
              tem_filter3.push(tem_filter2);
            }
          }
        }
        
        this.Filter_data = tem_filter3;
        this.SpinnerService.hide();

      }

    }
    else {
      // this.SpinnerService.hide();
      this.Filter_data = this.Filter_list[this.tabsclass];
      this.SpinnerService.hide();
    }
// this.SpinnerService.hide();
  }
  // changeschecked(event: any) {
   
  //   if (event.target.checked == true) {

  //     this.LastStatus = 1;
  //   } else {
  //     this.LastStatus = 0;
  //   }
    
  // }
  k1: any = [];
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

  filters() {
  //  this.SpinnerService.show();
  this.SpinnerService.show('spinner-1');
    var arrays: any = [];
    for (var i = 0; i < this.Filter_list_keys.length; i++) {
      // multi_array['this.Filter_list_keys[]']=[];
      var keys = this.Filter_list_keys[i];
      arrays=[];
      for (var j = 0; j < this.Filter_list[keys].length; j++) {
        if (this.Filter_list[keys][j].checked == true) {
          arrays.push(this.Filter_list[keys][j].id);
        }
      }
      var strings=arrays.toString()
      this.multi_array[keys] = strings;
    }
this.vehicle_filter();
  }
  tabstyle(e){
    this.tab1=e;
  }
  openCity(evt, cityName) {
   
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    if(cityName!==null){
    var text= <HTMLElement>(document.getElementById(cityName));
    text.style.display = "block";
    evt.currentTarget.className += " active";
  }
  }
  // chan1()
  chan(){
    $('.timepicker').timepicker({ 
      timeFormat: 'HH:mm:ss',
      minTime: '00:00:01',
      interval: 5 // 5 minutes
  });
  }
  chan1(){
    $('.timepicker1').timepicker({ 
      timeFormat: 'HH:mm:ss',
      minTime: '00:00:01',
      interval: 5 // 5 minutes
  });
  }
  vehicle_filter(){

   
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    // for (var j = 0; j < this.Filter_list[keys].length; j++) {}
    if( this.multi_array['Plant']!==undefined && this.multi_array['Plant']!==''){
    // alert(0)
    formData.append('Plants', this.multi_array['Plant']);
    }
    if( this.multi_array['Transporter']!==undefined && this.multi_array['Transporter']!==''){
      // alert(1)
    formData.append('Transporters', this.multi_array['Transporter']); }
    if( this.multi_array['Region']!=='' && this.multi_array['Region']!==undefined){
      // alert(2)
    formData.append('Regions', this.multi_array['Region']);}
    if(this.geocoord!==undefined){
      // alert(3)
    formData.append('Users', this.geocoord);}
    if(this.multi_array['VehicleCategory']!==''&&this.multi_array['VehicleCategory']!==undefined){
      // alert(5)
    formData.append('VehicleCategories', this.multi_array['VehicleCategory']);
  }
    // formData.append('VehicleCategories', '1');
    if(  this.multi_array['VehicleMake']!=='' && this.multi_array['VehicleMake']!==undefined){
      // alert(6)
    formData.append('VehicleMakes', this.multi_array['VehicleMake']);}
    if( this.multi_array['VehicleModel']!=='' && this.multi_array['VehicleModel']!==undefined){
    formData.append('VehicleModels ', this.multi_array['VehicleModel']);
  }
    // formData.append('Remark','');
   
    this.service.vehicle_filter(formData).subscribe((res: any) => {

      if (res.Status == "failed") {
        // localStorage.removeItem('AccessToken');
        // this.router.navigate(['/auth/login']);
        this.data1=[];
        this.header_values();
        // this.Alldata= this.data1;
        // this.show=true;
        // this.header_values();
        this.SpinnerService.hide('spinner-1');
        alert("Data not found");
      }
      else {
        var geo_detai:any=[];
        this.data1=[];
        var store_data1:any=[];
        geo_detai = res.VehicleList;
        
        Object.keys(geo_detai).forEach((key) => {
          var data1 = geo_detai[key];
          store_data1.push(data1);
         
        })
        this.data1=store_data1;
        this.Alldata= this.data1;
        this.show=true;
        this.header_values();
        this.SpinnerService.hide('spinner-1');
      }
    });
  }
  rightside_menu() {
  
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken') || "");
    this.service.rightside_menu(formData).subscribe((res: any) => {

      if (res.Status == 'success') {
        this.Rightmenu_list = res.Menu;
  
        this.Rightmenu_keys=Object.keys(this.Rightmenu_list);
        // var arraystore:any=[];
       this.side_icons=[];
       this.url_store=[];
       this.Rightmenu_titleName=[];
      
        for(var i=0;i<this.Rightmenu_keys.length;i++){
          var temp_arr:any=[];
          var v=this.Rightmenu_keys[i];
          temp_arr=this.Rightmenu_list[v].icon;
          
          // this.Rightmenu_titleName.push()
          var id=this.Rightmenu_list[v].id;
          this.Rightmenu_titleName.push(id);
          this.url_store.push(this.Rightmenu_list[v].url);
         
          this.side_icons.push(temp_arr);
            
        }
       
      } else {

      }
    })
  }
  mapshow(ind:any){
    this.dropdowncontent=false; 
    this.dropdowncontent1=!this.dropdowncontent1;
    if(ind==this.color_value){
      this.color_value=0;
      this.color_value=ind;
      const box = document.getElementById('a' + ind);
     if (box != null) {
      box.classList.remove('background_color');
      this.color_value='';
     }
    }else{
      const box = document.getElementById('a' + this.color_value);
      if (box != null) {
    
    box.classList.remove('background_color');
    this.color_value='';
  }
    this.color_value=0;
    this.color_value=ind;
    const box1 = document.getElementById('a' + ind);
      if (box1 != null) {
    box1.classList.add('background_color');}
      }
  }
  drop(ind:any){
  this.dropdowncontent1=false;
if(ind==this.color_value){
  this.color_value=0;
  this.color_value=ind;
  const box = document.getElementById('a' + ind);
      if (box != null) {
  box.classList.remove('background_color');}
}else{
  const box = document.getElementById('a' + this.color_value);
  if (box != null) {

box.classList.remove('background_color');}
this.color_value=0;
this.color_value=ind;
const box1 = document.getElementById('a' + ind);
  if (box1 != null) {
box1.classList.add('background_color');}
}

//     const box = document.getElementById('a' + ind);
// alert(box);

//       if (box != null) {
//         // ✅ Add class
       
//         box.classList.add('bg-yellow');
//         box.classList.remove('bg-yellow');
//       }
     
    // $('#a'+id).addClass('background_color');
    if(this.indes_id==ind){
      this.dropdowncontent=!this.dropdowncontent; 
    }else{
      this.indes_id=0;
    this.indes_id=ind;
    this.dropdowncontent=true;
    this.keys_content=[];
    var temp_content:any=[];
    var keys_content:any=[]; 
    var v=this.Rightmenu_keys[ind];
  temp_content = Object.values(this.Rightmenu_list[v]);
 
    for(var i=0;i<temp_content.length;i++){
      if(temp_content[i].label==undefined){

      }else{
        this.keys_content.push(temp_content[i]);
      }
    }
//     const btn = document.getElementById('btn');

// // btn.addEventListener('click', function onClick(event) {
//   // 👇️ change background color
//   document.body.style.backgroundColor = 'salmon';

  // 👇️ optionally change text color
  // document.body.style.color = 'white';
// }); 
}

// for(var i=0;i<)
  }
  rightsidechange(id:any,event:any){
    
    var array_check:any;
    for(var i=0;i<this.keys_content.length;i++){

      
       if(this.keys_content[i].id == id){
        array_check=this.keys_content[i];
       }
    }
    if(event.target.checked==true){
      array_check.checked=true;
    }else{
      array_check.checked=false;
    }
   
  }
  rightsidemenu_apply(){
    var arrays:any=[];
    for (var i = 0; i < this.Rightmenu_keys.length; i++) {
      // multi_array['this.Filter_list_keys[]']=[];
      var keys = this.Rightmenu_keys[i];
      
      arrays=[];
     
      var array_content:any=[];
      array_content= this.Rightmenu_list[keys];
      array_content = Object.values(this.Rightmenu_list[keys]);
      for (var j = 0; j <array_content.length; j++) {
        if (array_content[j].checked == true) { 
          arrays.push(array_content[j].id);
        }
      }
      var strings=arrays.toString();
      this.multi_array_rightside[keys] = strings;
      
    }
    this.rightside_filter();
  }
  rightside_filter(){
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    // for (var j = 0; j < this.Filter_list[keys].length; j++) {}
    formData.append('Graphs', this.multi_array_rightside.Graphs);
    formData.append('Report', this.multi_array_rightside.Report);
    formData.append('Search', this.multi_array_rightside.Search);
    // formData.append('Users', this.geocoord);
   
    this.service.rightside_menu(formData).subscribe((res: any) => {

      if (res.Status == "Failed") {
        localStorage.removeItem('AccessToken');
        this.router.navigate(['/auth/login']);
      }
      else {
        var geo_detai:any=[];
        this.data1=[];
      
        geo_detai = res;
        // this.Vehicle_list = res.VehicleList;
       
        // Object.keys(geo_detai).forEach((key) => {
          // var a= Object.keys(this.Vehicle_list);
        
          // var data1 = geo_detai[key];
          // this.data1.push(data1);
        
        // })
      }
    });
  }
  List_vehicle() {
    // debugger;
    // data.preventDefault();
    this.SpinnerService.show('spinner-1');
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken') || "");
    this.service.Vehicle_detail(formData).subscribe((res: any) => {
      if (res.Status == 'success') {
        this.SpinnerService.show('spinner-1');
        this.Vehicle_list = res.VehicleList;
        Object.keys(this.Vehicle_list).forEach((key) => {
          var data1 = this.Vehicle_list[key];
          this.data4.push(data1);
        
        })
        
        this.data1=this.data4;
        this.Alldata=this.data1;
      
        this.header_values();
        // this.show=true;
       
         this.SpinnerService.hide('spinner-1');
       
      }
      this.SpinnerService.hide('spinner-1');
    })
    //  event.stopPropagation();
  }
  playtrack_switch(eve:any){
    if (eve.target.checked==true ){
      this.LastStatus=1;

    }else{
     
    }
  }
  usecell_id(eve:any){
    if (eve.target.checked==true){
   this.usecellId_value=1;
    }else{
      this.usecellId_value=0; 
    }
  }
  switch(eve:any){
  if (eve.target.checked==true ){
    this.only_track=false;
    this.MouseHover_value='click';
    this.mousehover_show=false;
    this.initMap();
    this.LastStatus=1;
    this.geo_play_va=false;
    this.forvalue= this.Map_info.length+1;
    // if(this.vehicle_lastLocation.length!==0){
    //   for(var l=0;l<this.vehicle_lastLocation.length;l++){
    //     this.vehicle_lastLocation[l].setMap(null);
    //         }
    //       }
    // this.maps.setMap(null);
    for(var k=0;k<this.temp_index.length;k++){
      this.temp_index[k].Checked=false;
    }
    // if( this.temp_markerarray.length!==0){   
    //   for(var k=0;k<=this.temp_markerarray.length;k++){
    //     this.temp_markerarray[k].setMap(null);
    //   }
    // }
    this.temp_index=[];
   
  }
  if (eve.target.checked==false )
  {
    this.MouseHover_value='click';
    this.mousehover_show=false;
    this.only_track=false;
    this.geo_play_va=false;
    this.LastStatus=0;
    this.forvalue= this.Map_info.length+1;
    this.initMap();

        // trmp_index_imp----------------------
        for(var k=0;k<this.temp_index.length;k++){
          this.temp_index[k].Checked=false;
        }
    this.temp_index=[];
  }
  // if()
  }
  switch_text(eve:any){
    if (eve.target.checked==true ){
      this.textView=1;
    }
    if (eve.target.checked==false )
    {
      this.textView=0;
    }
  }
  header_values(){
    
    this.active_data=[];
    this.inactive_data=[];
    this.NoData=[];
    this.active=[];
    this.inactive=[];
    this.NoData_length=[];
    this.NoGPS=[];
    this.NoGPS_length=[];
    for (var i = 0; i < this.data1.length; i++) {
      if(i<=10){

      
      this.store_data10.push(this.data1[i]);}
    }
    for (var i = 0; i < this.data1.length; i++) {
      if (this.data1[i]?.VehicleStatus == 'Active') {
        this.active_data.push(this.data1[i]);
        this.active = this.active_data;
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

      }else{

      }

    }
  //  for(var p=0;p<)
  // this.serial_list=this.active_data;
  this.data1=[];
  this.serial_list = this.active_data.concat(this.NoData_length,this.NoGPS_length,this.inactive);
  this.data1=this.serial_list;
    // this.serial_list=this.inactive;
    // this.serial_list=this.NoData_length;
    // this.serial_list= this.NoGPS_length ;
  //
  // 
    // this.serial_list.push(this.inactive_data);
    this.SpinnerService.hide();
  }
  scclick1(){
    const div_1 = document.querySelector("#div-container-for-table");
    var scrollBefore = 0;
if(div_1 !==null){
    div_1.addEventListener('scroll',(e) =>{
    var scrolled = div_1.scrollTop+1;
    if(scrollBefore > scrolled){
      // if(scrolled==0){
      //   scrollBefore = scrolled;
      // }
      
        //Desired action
    }else{
        scrollBefore = scrolled;
        //Desired action
        if(this.pageEnd<this.data1.length){
          // scrollTop = div_1.scrollTop;
          const scrollHeight = div_1.scrollHeight;
          const offsetHeight = div_1.clientHeight;
          const scrollPosition = div_1.scrollTop+ offsetHeight;
          const scrollTreshold = scrollHeight - this.pageHeight;
         
          if( scrollPosition > scrollTreshold ){
           
            this.pageStart=this.pageEnd-this.pageBuffer;
            this.pageEnd+= this.pageBuffer;
           this.scroll_status=true;
           div_1.scrollTop=1;
           scrolled=div_1.scrollTop;
          
      
          }
        }
    }
})
}
  //   if(div_1!==null){
  //     div_1.addEventListener("scroll", () => {
    //   if(this.pageEnd<this.data1.length){
    // const scrollTop = div_1.scrollTop;
    // const scrollHeight = div_1.scrollHeight;
    // const offsetHeight = div_1.clientHeight;
    // const scrollPosition = scrollTop + offsetHeight;
    // const scrollTreshold = scrollHeight - this.pageHeight;
   
    // if( scrollPosition > scrollTreshold ){
     
    //   this.pageStart=this.pageEnd-this.pageBuffer;
    //   this.pageEnd+= this.pageBuffer;
    

    // }else{
    // //   if( scrollTop== 0 ){
    //   //   if( this.pageStart !==0){
    //   //   this.pageStart=this.pageStart-this.pageBuffer;
    //   //   this.pageEnd= this.pageEnd-this.pageBuffer;
    //   // }
    // // }
    // }
  //   if( scrollTop == 0 ){
  //     if( this.pageStart !==0){
  //       this.pageStart=this.pageStart-this.pageBuffer;
  //       this.pageEnd= this.pageEnd-this.pageBuffer;
  //     }
      
  //    }
  // //   if( scrollTop == 0 ){
  // //     if( this.pageStart !==0){
  // //     this.pageStart=this.pageStart-this.pageBuffer;
  // //     this.pageEnd= this.pageEnd-this.pageBuffer;
  // //   }
  // // }
  
  // }
  // });
  // }
  
  }
  start(){
  
    $(document).ready( () => {
    $("#dateSingle1").datetimepicker({
      format: "yyyy/mm/dd hh:ii:ss",
      todayBtn: "linked",
      keyboardNavigation: false,
      forceParse: false,
      autoclose: true,
      endDate:   this.myDate1,
     
     },
  
     );
     
    })

}

  scclick(){
    
        const div_1 = document.querySelector("#div-container-for-table");
        // const element = document.getElementById('middle');

        
        var scrollBefore = 0;
    if(div_1 !==null){
      const middle =  (div_1.clientHeight / 2);
      div_1.scrollTo(0, middle);
      var scrolled;
        div_1.addEventListener('scroll',(e) =>{
          if(this.scroll_status){
           
             scrolled=div_1.scrollTop+1;
          }
          else {
           
            scrolled=div_1.scrollTop;
            
          }
          const scrollHeight = div_1.scrollHeight;
          const offsetHeight = div_1.clientHeight;
          var  scrollPosition = scrolled+ offsetHeight;
          const scrollTreshold = scrollHeight - this.pageHeight;
         
          if(scrolled==0 && !this.scroll_status){
            this.pageStart=this.pageStart-this.pageBuffer;
              this.pageEnd= this.pageEnd-this.pageBuffer;
          }
         
          if(this.pageEnd<this.data1.length){
            if( scrollPosition > scrollTreshold ){
              this.pageStart=this.pageEnd-this.pageBuffer;
              this.pageEnd+= this.pageBuffer;
             this.scroll_status=true;
            }
            else{
              
              this.scroll_status=false;
            }
         
          }
          else{
              
            this.scroll_status=false;
          }
    })
    }
      
      
      }
 
      settings(){
        this.setting=!this.setting;
      }
  onScroll( event )
  {
    // alert(1);
    const scrollTop = event.target.scrollTop;
    const scrollHeight = event.target.scrollHeight;
    const offsetHeight = event.target.offsetHeight;
    const scrollPosition = scrollTop + offsetHeight;
    const scrollTreshold = scrollHeight - this.pageHeight;
    if( scrollPosition > scrollTreshold ){
      this.pageEnd+= this.pageBuffer;
    }
  }
  loadMore = () => {
    var kk=this.store_data10.length+20;
    var vv=kk-10;
    if(kk<this.data1.length){
      this.store_data10=[];
      for(var i=vv;i<kk;i++){
      this.store_data10.push(this.data1[i]);
    }
  }
  
   
  };
  header_filter(id:any){
    this.show=true;
    this.data1=[];
    if(id==1){
      // this.data1=this.Alldata;
      this.data1= this.serial_list;
    }
     if (id==2) {
      this.data1=this.active;
    } 
     if(id==3) {
      this.data1=this.inactive;
      
     }
     if(id==4){
      this.data1=this.NoData_length;
    
     }if(id==5){
      this.data1=this.NoGPS_length;
     }
    }

  changeTOdate(eve: any) {
    this.ToDate1 = eve.target.value;
    this.todaydate = this.ToDate1;
  }
  changeFromdate(eve: any) {
    this.FromDate1 = eve.target.value;
    this.Fromdaydate = this.FromDate1;
  }
  changeFrom(eve: any) {
    this.fromtime = eve.target.value;
  }
  changeTo(eve: any) {
    this.totime = eve.target.value;
  }
  formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute;
  }
  datestime(eve:any){
    var dateVariable = $("#datepicker").val();
    this.reports.patchValue({
      Fromdaydate: dateVariable
    });
  }
  interval(eve:any){
  
    this.interval_value=eve.target.value;
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
 
 
  track() {
    this.show=!this.show;
    this.only_track=true;
    this.s_play=false;
    this.range_toggle=0;
    if(this.temp_markerarray.length!==0){
      for(var t=0;t<this.temp_markerarray.length;t++){
        this.temp_markerarray[t].setMap(null);
      }
      for(var n=0;n<this.trackLine.length;n++){
        this.trackLine[n].setMap(null);
      }
    }
    if(this.markers_play.length!==0){
      this.forvalue= this.Map_info.length+1;
      for(var t=0;t<this.line_play.length;t++){
        this.line_play[t].setMap(null);
      }
      for(var n=0;n<this.markers_play.length;n++){
        this.markers_play[n].setMap(null);
      }
      for(var g=0;g<this.gif_store.length;g++){
        this.gif_store[g].setMap(null);
      }
    }
    if(this.temp_index[0]?.VehicleStatus=='InActive'){
      this.show_vehicle();
    }else{
    this.isShowmarkerDivIf = true;

   if(this.vehicleno !==''){
    var letform:Date;
    var letTo:Date;
    
    this.FromdateTime='';
    this.TodateTime='';
    letform =$("#datepicker").val();
    this.Fromdaydate = this.datepipe.transform(letform, 'yyyy-MM-dd HH:mm:ss');
    this.FromdateTime=this.Fromdaydate;
    letTo=$("#datepicker1").val();
    this.TodateTime =this.datepipe.transform(letTo, 'yyyy-MM-dd HH:mm:ss');
    this.TodateTime= this.TodateTime;
   
    this.DataFrequency = 10;
    this.SpinnerService.show('spinner-3');
    var formData = new FormData();
   
    // formData.append('AccessToken',this.access);
    // formData.append('VehicleNo', this.vehicleno);
    // formData.append('RunDate',this.Fromdaydate);
    // formData.append('CloseDate', this.TodateTime);
    // formData.append('Interval', this.interval_value);
    // formData.append('ImeiNo', this.imeino);
    // formData.append('CellId', this.usecellId_value);
    
    formData.append('AccessToken',this.access);
    // formData.append('VehicleNo', this.vehicleno);
    formData.append('startdate',this.Fromdaydate);
    formData.append('enddate', this.TodateTime);
    formData.append('time_interval', this.interval_value);
    formData.append('imei', this.imeino);
    formData.append('cell_id', this.usecellId_value);
    formData.append('group_type',this. GroupType);
     formData.append('group_id',this.groupId);
     formData.append('AccountId',localStorage.getItem('AccountId')!);
     if(this.textView==1){
     formData.append('address','1');}else{
      formData.append('address','0');
     }
    //  address:0/1
   
    this.service.MAP_1(formData).subscribe((res: any) => {
      
      if (res.Status == "Failed") {
       
        // localStorage.removeItem('AccessToken');
        // this.router.navigate(['/auth/login']);
      }
      else {
       
        this.Map_info = res.data;
 
        this.View_chart=true;
        this.DataFrequency = res.data_frequency;
        if(this.textView==1){
          this.open8();
            this.table_showReport();
           
            
            this.SpinnerService.hide('spinner-3');
        //   }
        // }
       
         
        }else{
        if (this.Map_info == undefined) {
        } 
        else {
          // this.VEHICLENO = res.VehicleNo;
          // this.IMEINO = res.ImeiNo;
          // for(var a=0;a<this.Map_info.length;a++){
          // var  lat_lng = new google.maps.LatLng(this.Map_info[a]?.Latitude, this.Map_info[]?.Longitude);
          // this.addMarker2(lat_lng, this.Map_info[a]?.Icon, this.Map_info[a]?.Speed, this.Map_info[a]?.Distance,this.Map_info[a]?.VehicleNo,this.Map_info[a]?.ImeiNo,this.Map_info[a]?.DateTime,this.Map_info[a]?.Battery,this.Map_info[a]?.BatteryVoltage,); 
          
          // }
           this.formap1();  
           }
          }
          }
        })
        var formData = new FormData();
   
        formData.append('AccessToken',this.access);
        formData.append('VehicleNo', this.vehicleno);
        formData.append('RunDate',this.Fromdaydate);
        formData.append('CloseDate', this.TodateTime);
        formData.append('Interval', this.interval_value);
        formData.append('ImeiNo', this.imeino);
        formData.append('CellId', this.usecellId_value);
        this.service.MAP(formData).subscribe((res: any) => {
          if (res.Status !== "Failed") {
          
            // localStorage.removeItem('AccessToken');
            // this.router.navigate(['/auth/login']);
          }
            })
  }else{
    alert("Data is not available");
  }
  }
  }
  addMarker1(latlong: any) {
    google.maps.event.addListener(this.marker, "click", () => {
      this.SmallSizeOpenp(); 
    });
  }
  triangleCoords = [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.19 }
  ];



  geo_name() {
    this.status2 = 1
    // this.array();
    // this.toggleDisplayDivIf();
    // this.formap();
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


text_last(p:any){
 
  var vname=this.temp_index[p]?.VehicleNo;
  var vSerialLocal=this.temp_index[p]?.ImeiNo;
  var SimNo=this.temp_index[p]?.SimNo;
 var RegistrationNo=this.temp_index[p]?.RegistrationNo;
 
  // this.MainHoleDoor_values_1='';
  // this.DeliveryDoor_value_1='';
  var Temperature:any;
//  this.Temperature_string='';
 var Raw_power :any;
 var DeliveryDoor_track:any;
  // this.Raw_power_string ='';
  var MainHoleDoor_track:any;
  var AC:any;
  var FuelLead:any;
  var SOS:any;
if(this.temp_index[p]?.AC==undefined){
     AC='-';
     }else{
      this.AC_co=true;
  AC=this.temp_index[p]?.AC;
}
if(this.temp_index[p]?.FuelLead==undefined){
  FuelLead='-';
  }else{
   this.FuelLead_co=true;
   FuelLead=this.temp_index[p]?.AC;
}
if(this.temp_index[p]?.SOS==undefined){
  SOS='-';
  }else{
   this.SOS_co=true;
   SOS=this.temp_index[p]?.AC;
}




  if(this.temp_index[p]?.MainHoleDoor==undefined){
    MainHoleDoor_track='-';
    // this.MainHoleDoor_values_1='';
    }else{
      MainHoleDoor_track=this.temp_index[p]?.MainHoleDoor;
        this.MainHoleDoor_values_1_con=true;
    
    }
     
  if(this.temp_index[p]?.Temperature==undefined){
  
    Temperature='-'; 
    // this.Temperature_string='';
  }else{
    Temperature=this.temp_index[p]?.Temperature;
    this.Temperature_string_con=true;
  }
  if(this.temp_index[p]?.Raw_power==undefined){
  Raw_power='-';
    // this.Raw_power_string='';
  }else{
    Raw_power=this.temp_index[p]?.Raw_power;
    this.Raw_power_string_con=true;
  }
  
if(this.temp_index[p]?.DeliveryDoor==undefined){
DeliveryDoor_track='-';
// this.DeliveryDoor_value_1=''
}else{
if(this.temp_index[p]?.DeliveryDoor==''){
  this.DeliveryDoor_track='/';

}else{
  DeliveryDoor_track=this.temp_index[p]?.DeliveryDoor;
  this.DeliveryDoor_value_1_con=true;
}
}


  var DriverNo:any;
  if(this.temp_index[p]?.DriverNo==''){
     DriverNo='N/A';
  }else{
    DriverNo=this.temp_index[p]?.DriverNo;
  }
  var Battery=Math.round(this.temp_index[p]?.Battery);

  // var runningStatus=this.temp_index.runningStatus;
  // var HaltTime= this.temp_index.HaltTime;
      var formData = new FormData();
formData.append('AccessToken', localStorage.getItem('AccessToken')!);
formData.append('VehicleId', this.temp_index[p]?.VehicleId);
formData.append('ImeiNo',this.temp_index[p]?.ImeiNo);
formData.append('LatLong',this.temp_index[p]?.LatLong);

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
var HaltTime=this.last_address.LastHaltTime;
var Speed=this.last_address.Speed;
var DateTime=this.last_address.DateTime;
  
}
// this.data_table.push( 
//   {"VehicleName": vname, "IMEI":vSerialLocal,"Speed":Speed ,"LastHaltTime":HaltTime,
//   "Location": this.Address ,"DateTime":DateTime,"contactNo":DriverNo,"Battery":Battery,"DeliveryDoor_value_1":DeliveryDoor_track,"Raw_power":Raw_power,
//   "Temperature":Temperature,"MainHoleDoor_track":MainHoleDoor_track,"Ac":AC,"FuelLead":FuelLead,"SimNo":SimNo,'RegistrationNo':RegistrationNo
// });

var temp_arr: Array<{ "VehicleName": any, "IMEI":any,"Speed":any ,"LastHaltTime":any,
"Location": any ,"DateTime":any,"contactNo":any,"Battery":any,"DeliveryDoor_value_1":any,"Raw_power":any,
"Temperature":any,"MainHoleDoor_track":any,"Ac":any,"FuelLead":any,"SimNo":any,'RegistrationNo':any }>;
// this.myColumnDefs={};
// var tem_arr:any=[]
temp_arr=Array( {"VehicleName": vname, "IMEI":vSerialLocal,"Speed":Speed ,"LastHaltTime":HaltTime,
"Location": this.Address ,"DateTime":DateTime,"contactNo":DriverNo,"Battery":Battery,"DeliveryDoor_value_1":DeliveryDoor_track,"Raw_power":Raw_power,
"Temperature":Temperature,"MainHoleDoor_track":MainHoleDoor_track,"Ac":AC,"FuelLead":FuelLead,"SimNo":SimNo,'RegistrationNo':RegistrationNo
});

this.data_table.push(temp_arr[0]);

if(this.temp_index_store.length==this.data_table.length){
  this.SpinnerService.hide('spinner-2');
  var hh:any=[];
  hh.push( this.data_table);
  this.open9();
  this.track_report_v();
}
});



}
track_report_v(){

  setTimeout(() => {
      
    
    $(document).ready( () => {
  
  
    $('#showReportTable_last').DataTable({
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
      {targets : 'no-sort',orderable : false}
      ],
      buttons: 
       [
        {
          extend: 'csv',
          footer: true,
          messageTop: 'Last Data Report- Date Time:'+this.Fromdaydatetimepicker+'-'+this.myDate1,
           exportOptions: {
           columns: ':visible'
          
           },
          title: 'Vehicle report'},
      {
        extend: 'excel',
        footer: true,
        messageTop: 'Last Data Report- Date Time:'+this.Fromdaydatetimepicker+'-'+this.myDate1,
         exportOptions: {
         columns: ':visible'
        
         },
        title: 'Vehicle report'},
         {
        extend: 'pdf',
        messageTop: 'Last Data Report- Date Time:'+this.Fromdaydatetimepicker+'-'+this.myDate1,
         orientation: 'landscape',
        pageSize: 'LEGAL',
        footer: true,
        exportOptions: {
        
         columns: ':visible'
        
        },
        title: 'Vehicle report'},
        {
          extend: 'copy',
          text: 'Copy ',
          messageTop: 'Last Data Report- Date Time:'+this.Fromdaydatetimepicker+'-'+this.myDate1,
          exportOptions: {
              modifier: {
                  page: 'current'
              }
          }
      }
    ]}
        
      );
      });
      
    }, 80);
}

Remindertable(){

 
  setTimeout(() => {
            
          
    $(document).ready( () => {
  
  
      var table:any;
     
        table = $('#Remindertableva').DataTable();
      
       
       $(document).ready(function () {
               $('#Remindertableva').DataTable({
                  pageLength: 10,
                     //fixedHeader: true,
                    scrollX: true,
                    scrollY: true,
        //           scrollCollapse: true,
                   scroller: true,
                  paging: true,
    //             search:false,
                 destroy: true,
                responsive: true,
     "bPaginate": false,
"bLengthChange": false,
"bFilter": true,
"bInfo": false,
"bAutoWidth": false,
"language": {
search: '',
searchPlaceholder: 'Search'
},
           
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
                     title: 'Reminder_Report'},
                     {
                      extend: 'excel',
                          footer: true,
                          exportOptions: {
              
                    columns: ':visible'
              
                          },
                          title: 'Reminder_Report'},
                          {
                            extend: 'pdf',
                            orientation: 'landscape',
                            pageSize: 'LEGAL',
                            footer: true,
                            exportOptions: {
                
                      columns: ':visible'
                
                            },
                            title: 'Reminder_Report'},]}
                  
              );
     });
      
     
      
      });
      
    },);
}
location_not(e:any){
 if( e.target.checked==false){
  this.location_on=false;
 }else{
  this.location_on=true; 
 }
} 
  show_vehicle() {
    this.SpinnerService.show('spinner-2');
    if(this.unchecked_vehicle){
      this.temp_index_store=this.index_tempar;
      this.unchecked_vehicle=false;
    }else{
    this.temp_index_store=[];
   this.temp_index_store=this.temp_index;}
   
    // this.SpinnerService.show('spinner-3');
    if(this.vehicle_lastLocation.length!==0){
    for(var l=0;l<this.vehicle_lastLocation.length;l++){
      this.vehicle_lastLocation[l].setMap(null);
          }
        }
    this.isShowmarkerDivIf = true;
    this.store_vehicle = [];
    var array_lat: any = [];
    this.VehicleId = [];
    this.vehicle_img = [];
    this.imei_no=[];
    this.DeliveryDoor=[];
    this.MainHoleDoor=[];
    this.vehicle_catagory=[];
    if(this.textView==1){
      this.data_table = [];
      
      for(var p=0;p<this.temp_index_store.length;p++){
       this.text_last(p);
      
      
 
      }
 
    }else{
    for (var i = 0; i < this.temp_index_store.length; i++) {
      var latlng4 = this.temp_index_store[i]?.LatLong;
      this.VehicleId.push(this.temp_index_store[i]?.VehicleId);
      this.vehicle_img.push(this.temp_index_store[i]?.VehicleImage);
      this.imei_no.push(this.temp_index_store[i]?.ImeiNo);
      this.vehicle_catagory.push(this.temp_index_store[i]?.VehicleCategory);
      this.store_vehicle.push(latlng4);
      this.vehicle_no.push(this.temp_index_store[i]?.VehicleNo)
      this.DeliveryDoor.push(this.temp_index_store[i]?.DeliveryDoor);
      this.MainHoleDoor.push(this.temp_index_store[i]?.MainHoleDoor);
    }
    // this.store_vehicle.push(latlng4);
    this.latlngbounds = new google.maps.LatLngBounds();
    this.polygonCoords1 = new Array();
    for (var z = 0; z < this.store_vehicle.length; z++) {
      var coord2 = this.store_vehicle[z].split(",");
 
      //alert("lat="+parseFloat(coord2[0])+"lng="+parseFloat(coord2[1]));
      this.polygonCoords1[z] = new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]));
      
      this.latlngbounds.extend(new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1])));
    this.formap();
  }
  this.SpinnerService.hide('spinner-2');
  this.SpinnerService.hide('spinner-3');
    }
  }
    formap() {
    for (var i = 0; i < this.polygonCoords1.length; i++) {
      let lat_lng = this.polygonCoords1[i];
      let VehicleId1 = this.VehicleId[i];
      let vehicle_img = this.vehicle_img[i];
      let imei_no=this.imei_no[i];
      let VehicleCategory =this.vehicle_catagory[i];
      let DeliveryDoor=this.DeliveryDoor[i];
      let MainHoleDoor=this.MainHoleDoor[i];
      let Temperature=this.temp_index_store[i].Temperature;
      let EngineStatus:any;
      EngineStatus=this.temp_index_store[i].EngineStatus;
   
      let status=this.temp_index_store[i].RunningStatus;
      
      // let vehicle_no=this.vehicle_no[i];
      if(Temperature==undefined){
        this.Temperature_last='';
        Temperature='';
      
      }else{
        Temperature=this.temp_index[i].Temperature;
        this.Temperature_last='Temperature';
      }
      if(DeliveryDoor==undefined){
        DeliveryDoor='';
        this.DeliveryDoor_last='';
      }else{
        this.DeliveryDoor_last='DeliveryDoor';
      }
      if(MainHoleDoor==undefined){
        MainHoleDoor='';
        this.MainHoleDoor_last='';
      }else{
        this.MainHoleDoor_last='MainHoleDoor';
      }
      if(EngineStatus==undefined){
        EngineStatus='/';
        
      }else{
       
      }
      // var Driver_name = this.DriverName[i]
      if (vehicle_img == 'N/A') {
        var icon;
        if(VehicleCategory=='Car')
        {  
          icon='https://maps.gstatic.com/mapfiles/ms2/micons/cabs.png';
        }
        else if(VehicleCategory=='Truck')
        {
            //icon='images/heavy_v2.png';
                                    icon='https://maps.gstatic.com/mapfiles/ms2/micons/truck.png';
                                    
        }
        else if(VehicleCategory=='Bus')
        {
            //icon='images/bus.png';    
                                    icon='https://maps.gstatic.com/mapfiles/ms2/micons/bus.png';
        }
        else if(VehicleCategory=='Motorbike')
        {
            //icon='images/motorbike.png';
                                    icon='https://maps.gstatic.com/mapfiles/ms2/micons/motorcycling.png';
        }
        else if(VehicleCategory=='Rainfall')
        {
             icon='http://maps.google.com/mapfiles/kml/pal4/icon32.png';
        }
        else if(VehicleCategory=='Wagon')
        {
             icon='https://maps.gstatic.com/mapfiles/ms2/micons/rail.png';
        }
        else if(VehicleCategory=='Rake')
        {
             icon='https://maps.gstatic.com/mapfiles/ms2/micons/rail.png';
        }
    
        this.addMarker(lat_lng, VehicleId1, icon,imei_no,VehicleCategory,MainHoleDoor,DeliveryDoor,EngineStatus,this.temp_index_store[i].Battery,this.temp_index_store[i].BatteryVoltage,this.temp_index_store[i].VehicleNo,Temperature,status);
        

      } else {
       var icon1 = {
          url: vehicle_img,
          scaledSize: new google.maps.Size(50, 20), // scaled size
          // origin: new google.maps.Point(0,0), // origin
          // anchor: new google.maps.Point(0, 0) // anchor
        };
      this.addMarker(lat_lng, VehicleId1, icon1,imei_no,VehicleCategory,MainHoleDoor,DeliveryDoor,EngineStatus,this.temp_index_store[i].Battery,this.temp_index_store[i].BatteryVoltage,this.temp_index_store[i].VehicleNo,Temperature,status);
      }

    }
    // this.SpinnerService.hide('spinner-3');
  }
 
  addMarker(location: any, VehicleId: any, vehicle_img: any,imei_no:any,VehicleCategory:any,MainHoleDoor:any,DeliveryDoor:any,EngineStatus:any,Battery:any,BatteryVoltage:any,VehicleNo:any,Temperature:any,status:any) {

    var marker1 = new google.maps.Marker({
      position: location,
      icon: vehicle_img,
      draggable: false,
      map: this.maps,
      VehicleId: VehicleId,
      maxZoom: 25,
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      imei_no:imei_no,
      VehicleCategory:VehicleCategory,
      MainHoleDoor:MainHoleDoor,
      DeliveryDoor:DeliveryDoor,
      // Speed:Speed,
      Battery:Battery,
      BatteryVoltage:BatteryVoltage,
      // EngineStatus:EngineStatus,
      VehicleNo:VehicleNo,
      Temperature:Temperature,
      status:status,
      //  DateTime:DateTime, 
      //  Distance:Distance,
      //  CellId:CellId,
    });
    
    // this.temp_markerarray.push(marker1);
    this.vehicle_lastLocation.push(marker1);
    marker1.setMap(this.maps);
    // this.storemarker1.push(marker1);
    this.maps.fitBounds(this.latlngbounds);
    var listener = google.maps.event.addListener(this.maps, "idle", () => { 
      if (this.maps.getZoom() > 14) this.maps.setZoom(14); 
      google.maps.event.removeListener(listener); 
    });
    // var infowindow = new google.maps.InfoWindow({  
    //   enableEventPropagation: true,
    //   // content: contents  ,
    // }); 
    google.maps.event.addListener(marker1, this.MouseHover_value, () => {
      this.show_vehicle_infowindow(marker1);
    });
  }
show_vehicle_infowindow(marker1:any){
  var infowindow = new google.maps.InfoWindow({  
    enableEventPropagation: true,
    // content: contents  ,
  }); 
  var contents:any;
 
    // this.show=true;
    // this.show = false;

    // this.toggler();
  
    this.path=0;
    this.path=marker1.position;
    var val = marker1.VehicleId;
    this.imei_no_show=marker1.imei_no;
    this.VehicleCategory=marker1.VehicleCategory;
    this.DeliveryDoor1=marker1.DeliveryDoor;
    this.MainHoleDoor1=marker1.MainHoleDoor ;
    this.image_vehicle=marker1.icon;
    this.latlong1 = marker1.getPosition();
    // marker1.position
    this.Weather_forcast();
    this.IMEINO = 0;
    this.vehicle_id = 0;
    this.current = [];
    this.str = 0;
    
    var current: any;
    for (var i = 0; i < this.data1.length; i++) {
      if (this.data1[i]?.VehicleId == val) {
        var temp = this.data1[i];
        this.IMEINO = temp.ImeiNo;
        this.vehicle_id = temp.VehicleId;
        this.str = temp.LatLong;
      }
    }
    //  var temp_array:any=[];
    //  temp_array.push(current);
    //  this.current=temp_array;
    this.current1 = temp;
    this.vehicleno_pop='';
    this.vehicleno_pop = this.current1.VehicleNo;
    this.Driverprofile();
   
    this.documentation_wallet();
    // this.Lastlocation();
    this.last_address=[];
    var formData = new FormData();
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
      '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ marker1.VehicleNo+'</td>'+
    '</tr>'+
    '<tr>'+
    '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Name</td>'+
    '<td style="width:1%;color: blue;">:</td>'+
    '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ this.DriverName+'</td>'+
  '</tr>'+
    '<tr>'+
      '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Imei No</td>'+
      '<td style="width:1%;color: blue;">:</td>'+
      '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ marker1.imei_no+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Speed</td>'+
      '<td style="width:1%;color: blue;">:</td>'+
      '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ this.last_address.Speed+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Date Time</td>'+
      '<td style="width:1%;color: blue;">:</td>'+
      '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+this.last_address.DateTime+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td  style="width:100px ;font-size: 11px;font-weight: 900;font-family:Roboto;">Address</th>'+
      '<td style="width:1%;color: blue;">:</td>'+
      '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ this.Address+'</th>'+
   
   ' </tr>'+
//    '<tr>'+
//    '<td  style="width:100px ;font-size: 11px;font-weight: 900;font-family:Roboto;">engin</th>'+
//    '<td style="width:1%;color: blue;">:</td>'+
//    '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+marker1.EngineStatus+'</th>'+

// ' </tr>'+
    '<tr>'+
      '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Battery</td>'+
      '<td style="width:1%;color: blue;">:</td>'+
      '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+Math.round(marker1.Battery)+'%'+'('+marker1.BatteryVoltage+'v'+')'+'</td>'+
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
      '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">'+this.DeliveryDoor_last+'</td>'+
      '<td style="width:1%;color: blue;"> </td>'+
      '<td style=" color: blue; white-space: nowrap;font-size: 11px;" >'+ marker1.DeliveryDoor+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">'+this.MainHoleDoor_last+'</td>'+
      '<td style="width:1%;color: blue;"> </td>'+
      
      '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+marker1.MainHoleDoor+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">'+this.Temperature_last+'</td>'+
      '<td style="width:1%;color: blue;"> </td>'+
      
      '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+marker1.Temperature+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Last HaltTime</td>'+
      '<td style="width:1%;color: blue;"> </td>'+
      
      '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+this.last_address.LastHaltTime+'</td>'+
    '</tr>'+
    '<tr>'+
    '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Status</td>'+
    '<td style="width:1%;color: blue;"> </td>'+
    
    '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+marker1.status+'</td>'+
  '</tr>'+
    
    '<tr>'+
      '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;width: 111px;">'+marker1.position+'</td>'+
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
    '<button type="button" class="btn btn-outline-secondary " id="infowindow_submit'+marker1.vehicleno+'" name="submit" value ="submit" style="margin-left: 5px;padding:0px !important; margin-top: 5px;">'+
    '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Landmark</span>'+'</button>'+
    '<button type="button" class="btn btn-outline-secondary "   style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_geofence'+marker1.vehicleno+'" name="submit" value ="submit">'+
    '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Geofence</span>'+'</button>'+
    '<button type="button" class="btn btn-outline-secondary " style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_polyline'+marker1.vehicleno+'" name="submit" value ="submit">'+
    '<span style="font-size: 10px;padding: 7px;font-weight: bold;">More..</span>'
    // '<a ng-click="popup_change_driver();">Add/Change Driver</a>'
    + '</button>'+
   
  '</div>'
    '</div>';
    
      infowindow.setContent(contents);
   
      closeLastOpenedInfoWindow();
        infowindow.open(this.maps, marker1,this.Address); 
        this.lastOpenedInfoWindow=0; 
        this.lastOpenedInfoWindow = infowindow;
        

       


  })

    // });



    google.maps.event.addListener(infowindow, 'domready', () => {
      $(document).ready( () => {

      $("#infowindow_submit"+marker1.vehicleno).click(() => 
     {
      closeLastOpenedInfoWindow();
      this.Landmaradd();
      // this.info_landmark(marker1.position);
     
     })
      $("#infowindow_geofence"+marker1.vehicleno).click(() => 
      {
        closeLastOpenedInfoWindow();
       this.hello();
        //  v.polylines();
      }
      
       
       )
       $("#infowindow_polyline"+marker1.vehicleno).click(() => 
      {
        closeLastOpenedInfoWindow();
        // this.table_showReport();
        this.open7();
      //  v.hello();
      // var smallsizemodal1:any=smallsizemodal1;
      // this.chan1();
      // this.chan();
      //    this.polylines(smallsizemodal1);

      }
      
       
       )
    })
      });
    
    // this.SmallSizeOpenp();

  const closeLastOpenedInfoWindow = () => {
    if (this.lastOpenedInfoWindow) {
        this.lastOpenedInfoWindow.close();
    }
}
}
infowindow_track(marker1:any){
 
//   this.geocoord_save=[];
// this.geocoord_save=marker1.position;
var infowindow = new google.maps.InfoWindow({  
  // enableEventPropagation: true,
  // content: contents  ,
}); 
var contents:any;
this.str='';
      // this.Lastlocation();
      var k= marker1.position.toString();
      this.str= (((k.split('(')).join('')).split(')')).join('').split(' ').join('');
           // this.placeAndNearFrom(this.str);
      // this.Lastlocation();
      var formData = new FormData();
      formData.append('AccessToken', localStorage.getItem('AccessToken')!);
      formData.append('VehicleId', this.vehicle_id);
      formData.append('ImeiNo', this.IMEINO);
      formData.append('LatLong', this.str);
      this.service.Lastlocation(formData).subscribe((res: any) => {
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

        contents = 
        '<div id="content" >'+  
        '<div id="siteNotice">'+
        '<table>'+
        '<tbody>'+
      
      '<tr>'+
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Vehicle No</td>'+
        '<td style="width:1%;color: blue;">:</td>'+
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ marker1.vehicleno+'</td>'+
      '</tr>'+
      '<tr>'+
      '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Name</td>'+
      '<td style="width:1%;color: blue;">:</td>'+
      '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ this.DriverName+'</td>'+
    '</tr>'+
      '<tr>'+
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Imei No</td>'+
        '<td style="width:1%;color: blue;">:</td>'+
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ marker1.imeino+'</td>'+
      '</tr>'+
      '<tr>'+
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Speed</td>'+
        '<td style="width:1%;color: blue;">:</td>'+
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ marker1.Speed+'</td>'+
      '</tr>'+
      '<tr>'+
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Date Time</td>'+
        '<td style="width:1%;color: blue;">:</td>'+
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+marker1.DateTime+'</td>'+
      '</tr>'+
      '<tr>'+
        '<td  style="width:100px ;font-size: 11px;font-weight: 900;font-family:Roboto;">Address</th>'+
        '<td style="width:1%;color: blue;">:</td>'+
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ this.last_address.Address+'</th>'+
     
     ' </tr>'+
      // '<tr>'+
      //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Battery</td>'+
      //   '<td style="width:1%;color: blue;">:</td>'+
      //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+Math.round(marker1.Battery)+'%'+'('+marker1.BatteryVoltage+'v'+')'+'</td>'+
      // '</tr>'+
      
      '<tr>'+
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;"> Distance</td>'+
        '<td style="width:1%;color: blue;">:</td>'+
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ marker1.Distance+'</td>'+
      '</tr>'+
      
      '<tr>'+marker1.io +'<tr>'+
      //   '<td>Alfreds Futterkiste</td>'+
      //   '<td>'+ marker1.+'</td>'+
      // '</tr>'+
     
      //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Distance Covered</td>'+
      //   '<td style="width:1%;color: blue;" >:</td>'+
      //   '<td>'+ marker1.LastHaltTime+'</td>'+
        
      // '</tr>'+
     
      // '<tr >'+
      //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">'+this.DeliveryDoor_value_1+'</td>'+
      //   '<td style="width:1%;color: blue;"> </td>'+
      //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;" >'+ this.DeliveryDoor_track+'</td>'+
      // '</tr>'+
      // '<tr>'+
      //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">'+this.MainHoleDoor_values_1+'</td>'+
      //   '<td style="width:1%;color: blue;"> </td>'+
        
      //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+this.MainHoleDoor_track+'</td>'+
      // '</tr>'+
      // '<tr>'+
      //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">'+this.Temperature_string+'</td>'+
      //   '<td style="width:1%;color: blue;"> </td>'+
        
      //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+this.Temperature+'</td>'+
      // '</tr>'+
      // '<ng-container style="display:'+this.display_customer +'" >'+
      '<tr style="display:'+this.display_customer +'" >'+
      '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;"><div style="width: 104px;">Near from Customer</div></td>'+
      '<td style="width:1%;color: blue;"> </td>'+
      
      '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+this.near_from+'</td>'+
    '</tr>'+
     '<tr style="display:'+this.display_customer +'" >'+   
    '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;"><div style="width: 107px;">Place from Customer</div></td>'+
    '<td style="width:1%;color: blue;"> </td>'+
    
    '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ this.place_from+'</td>'+
  '</tr>'+
  // '</ng-container>'+ 
  '<tr>'+
  '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Latlng</td>'+
  '<td style="width:1%;color: blue;">:</td>'+
  '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ marker1.position+'</td>'+
'</tr>'+
    // '</span>'+Temperature_string
    //   '<tr>'+
      '</tbody>'+
      '</table>'+
      '</div>'+ 
      '<span style="display:'+this.display_customer +'" >'+
      '<div class=" row" style="border-top:1px solid #dee2e6;justify-content: flex-end;padding: 2px;    border-bottom-right-radius: calc(0.3rem - 1px);border-bottom-left-radius: calc(0.3rem - 1px);display: flex;">'+
      // '<button type="button" class="btn btn-outline-secondary " id="infowindow_submit'+marker1.vehicleno+'" name="submit" value ="submit" style="margin-left: 5px;padding:0px !important; margin-top: 5px;">'+
      '<div class="col-lg-12">'+
      '<span style="font-weight: 600;margin-right: 5px;">Add</span>'+
      '<select class="" name="cars" id="plant_1" formControlName="Gender"placeholder="--Select--" style="width: 87px; height:26px; margin-top:5px;font-size:12px">'+
										// '	<option value="null" selected>Cus</option>'+
										'	<option value="1">Customer</option>'+
										'	<option value="3">Plant</option>'+
										'</select>'+
                    '<input type="text" placeholder="Station Name" id="Station" style="border: 1px solid #0000006b;height: 27px; width: 120px; border-radius: 4px 4px 4px 4px; margin: 2px;margin-top: 6px;">'+
                    '<input type="text" placeholder="Customer Code" id="Customer" style="border: 1px solid #0000006b;height: 27px; width: 120px; border-radius: 4px 4px 4px 4px; margin: 2px;margin-top: 6px;">'+
                    '<input type="text" placeholder="Radious" id="Radious" style="border: 1px solid #0000006b;height: 27px; width: 100px; border-radius: 4px 4px 4px 4px; margin: 2px;margin-top: 6px;">'+
                    '<span style="font-weight: 600;">KM</span>'+
                    '<button type="button" class="btn btn btn-secondary " id="infowindow_submitaa" name="submit" value ="submit" style="width:70px;margin-left: 5px;padding:0px !important; margin-top: 2px;"> submit</button>'+
                     '</div>'+
                     '</div>'+
                     '</span>'+
                     '<div class=" row" style="justify-content: flex-end; display: flex;">'+
      // '<button type="button" class="btn btn-outline-secondary " id="infowindow_submit'+marker1.vehicleno+'" name="submit" value ="submit" style="margin-left: 5px;padding:0px !important; margin-top: 5px;">'+
      '<div class="col-lg-12">'+
      '<button type="button" class="btn btn-outline-secondary " id="infowindow_submit'+marker1.imeino+'" name="submit" value ="submit" style="margin-left: 5px;padding:0px !important; margin-top: 5px;">'+
      '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Landmark</span>'+'</button>'+
      '<button type="button" class="btn btn-outline-secondary "   style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_geofence'+marker1.imeino+'" name="submit" value ="submit">'+
      '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Geofence</span>'+'</button>'+
      '<button type="button" class="btn btn-outline-secondary " style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_polyline'+marker1.imeino+'" name="submit" value ="submit">'+
      '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Polyline</span>'+'</button>'+
     '</div>'+
    '</div>'+
      '</div>';
      
        infowindow.setContent(contents);
     
        this.closeLastOpenedInfoWindow();
          infowindow.open(this.maps, marker1,this.Address); 
          this.lastOpenedInfoWindow=0; 
          this.lastOpenedInfoWindow = infowindow;
          


      });
      google.maps.event.addListener(infowindow, 'domready', () => {
        $("#infowindow_submit"+marker1.imeino).click(() => 
       {
        closeLastOpenedInfoWindow();
        this.Landmaradd();
      
    
       }
         )
        $("#infowindow_geofence"+marker1.imeino).click(() => 
        {
          closeLastOpenedInfoWindow();
         this.hello();
          //  v.polylines();
        }
        
         
         )
         $("#infowindow_polyline"+marker1.imeino).click(() => 
        {
          closeLastOpenedInfoWindow();
        //  v.hello();
        var smallsizemodal1:any=smallsizemodal1;
        this.chan1();
        this.chan();
           this.polylines(smallsizemodal1);
        }
         )
         $("#Station").change((data: any) =>{
          this.Station_info='';
          var toll = $('#Station').val();
          this.Station_info=toll;
        
         }
         )
         $("#Radious").change((data: any) =>{
          this.Radious_info='';
          var Radious = $('#Radious').val();
          this.Radious_info=Radious;
       
        
         }
         )
         $("#Customer").change((data: any) =>{
          this.Customer_info='';
          var Customer = $('#Customer').val();
          this.Customer_info=Customer;
       
        
         }
         )

         $("#plant_1").click((data: any) =>{
          this.plant_customer='';
          var tolls = $('#plant_1').val();
          this.plant_customer=tolls;
     
         })
         $("#infowindow_submitaa").click(() => 
         {
          this.Add_customer();
   
         }
         
          
          )
        });
       
        // });
        const closeLastOpenedInfoWindow = () => {
          if (this.lastOpenedInfoWindow) {
              this.lastOpenedInfoWindow.close();
          }
      }
}



  Add_customer(){
   
    var formData = new FormData();
        formData.append('AccessToken',this.access);
        formData.append('StationType', this.plant_customer);
        formData.append('StationName',this.Station_info);
        formData.append('CustomerCode', this.Customer_info);
        formData.append('Radius', this.Radious_info);
        formData.append('geocoord', this.str);
        // if( this.groupId !==undefined){
        formData.append('group_id', this.groupId);
      // }
      
        this.service.AddCustomerPlant(formData).subscribe((res: any) => {
          
          if (res.Status == "Failed") {
          alert(res.msg);
            // localStorage.removeItem('AccessToken');
            // this.router.navigate(['/auth/login']);
          }
          else {
            alert(res.msg);
            }
            
            } )



  }
  end1(){
    $(document).ready( () => {
    $("#dateSingle2").datetimepicker({
      format: "yyyy/mm/dd hh:ii:ss",
      todayBtn: "linked",
      keyboardNavigation: false,
      forceParse: false,
      autoclose: true,
   
     }
     );
    })

}

  load_data(){
    this.track_report_v1();
    // this.maps.setMap(null);
    this.initMap();
    this.only_track=false;
    this.mousehover_show=false;
    this.searchedKeyword='';
    this.geo_listvalue=[];
this.onsearch();
    // this.SpinnerService.show();
    this.SpinnerService.show('spinner-9');
   
    // this.isCollapsed4 = !this.isCollapsed4;
    $('button[data-bs-toggle="tab"]').on('shown.bs.tab',  (e) => {
    
      var $target = $($(e.target).attr('href'));
      // $target.addClass('loading');
      setTimeout(() => {
          // $target.html(this.data1[$target[0].id]);
          // $target.removeClass('loading');
          // this.SpinnerService.hide();
          this.SpinnerService.hide('spinner-9');
      }, 800);
  });
  }

  // opentruck(truckmodal: any) {
  //   this.modalService.open(truckmodal, { size: ' modal-sm' });
  // }

  // openmarker(marker: any) {
  //   this.modalService.open(marker, { size: ' modal-sm' });
  // }
  // SmallSizeOpen1(smallsizemodal1: any) {
  //   this.modalService.open(smallsizemodal1, { size: 'modal-sm' });
  //   // this.modalService.open(smallsizemodal1);
  // }
  // SmallSizeOpeng(smallsizemodalg: any) {
  //   this.modalService.open(smallsizemodalg, { size: 'sm' });
  // }
  // // SmallSizeOpeng_geoname() {
  // //   var v:any ="smallsizemodal2"
  // //   this.modalService.open(v, { size: 'lg' });
  // // }
  // SmallSizeOpen2(smallsizemodal2: any) {

  //   this.modalService.open(smallsizemodal2, { size: 'sm' });
  // }
  // SmallSizeOpen3(smallsizemodal3: any) {
  //   this.modalService.open(smallsizemodal3, { size: 'sm' });
  // }
  // SmallSizeOpen4(smallsizemodal4: any) {
  //   this.modalService.open(smallsizemodal4, { size: 'sm' });
  // }
  // SmallSizeOpen5(smallsizemodal5: any) {
  //   this.modalService.open(smallsizemodal5,);
  // }
  // SmallSizeOpen6(smallsizemodal6: any) {
  //   this.modalService.open(smallsizemodal6);
  // }
  // SmallSizeOpen7(smallsizemodal7: any) {    
  //   // this.SpinnerService.show();
  //   this.modalService.open(smallsizemodal7, { size: 'modal-sm' });
  //   // this.SpinnerService.hide();
  // }
  smallsizeOpen11(smallsizemodal11: any) {
    this.setting=false;
    this.modalService.open(smallsizemodal11);
  }
  SmallSizeOpen8(smallsizemodal8: any) {
    this.submite= false;
    this.SpinnerService.show('spinner-2');
  
   
   setTimeout(() => {
    this.modalReference = this.modalService.open(smallsizemodal8, { size: 'lg' });
    this.SpinnerService.hide('spinner-2');},500)
  }


  
  // llSizeOpen(smallsizemodal: any) {
  //   this.modalService.open(smallsizemodal, { size: 'sm' });
  // }

  opendetail(detailmodal: any) {
    this.modalService.open(detailmodal, { size: ' modal-sm' });
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
  BasicOpen(basicmodal: any) {
    this.modalService.open(basicmodal);
  }

  lat_lng = { lat: 22.08672, lng: 78.42444 };
place_search(place:any){
  
  var place_v=place.target.value;
  for(var l=0;l<this.Landmark_list.length;l++){
    if(this.Landmark_list[l]?.LandmarkName==place_v){
      // this.Landmark_listvalue=[];
      // this.Landmark_listvalue=this.Landmark_list[l];
      var landmark_id=this.Landmark_list[l]?.LandmarkId;
     
      this.single_landmark(landmark_id);

    }
  }
  

}

  initMap1() {
    var lat_lng = { lat: 17.08672, lng: 78.42444 };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: lat_lng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  }

    initMap() {

    // var lat_lng = { lat:  28.679079, lng: 77.069710 };
    var lat_lng = { lat:  17.679180, lng: 77.069720 };
    this.maps = new google.maps.Map(document.getElementById('map'), {
      zoom: this.zoomCls,
      center: lat_lng,
      scaleControl:true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
   
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





  latlng_onOff(){
    this.latlng_on=!this.latlng_on;
    
  }


      formap1() {
    
        // this.maps.setMap(null);
        for(var i=0;i<this.trackLine.length;i++){
          this.trackLine[i].setMap(null);
         
          };
          
          for(var i=0;i<this.temp_markerarray.length;i++){
            this.temp_markerarray[i].setMap(null);
            };
           
        this.latlngbounds = new google.maps.LatLngBounds();
        for (var i = 0; i < this.Map_info.length - 1; i++) {
          var lat_lng: any = [];
          var lat_lng1: any = [];
          var lat_lng2: any = [];
          var polyline_marker1: any = [];
          lat_lng = new google.maps.LatLng(this.Map_info[i]?.lat, this.Map_info[i]?.long);
          this.polyline_marker.push(lat_lng);
          lat_lng1 = new google.maps.LatLng(this.Map_info[i + 1]?.lat, this.Map_info[i + 1]?.long);
          this.polyline_marker.push(lat_lng1);

          this.latlngbounds.extend(lat_lng);
          var lineColor = 'blue';
          if(i>0){
            lat_lng1 = new google.maps.LatLng(this.Map_info[i -1]?.lat, this.Map_info[i -1]?.long);
            polyline_marker1.push(lat_lng1);
            lat_lng2 = new google.maps.LatLng(this.Map_info[i]?.lat, this.Map_info[i]?.long);
            polyline_marker1.push(lat_lng2);
            var dtafrncy  = 10;
            
            if(this.DataFrequency!=''){
                dtafrncy = this.DataFrequency/60;
            }
             if(this.diff_minutes(new Date(this.Map_info[i]?.device_time),new Date(this.Map_info[i-1]?.device_time))>dtafrncy){
                lineColor = 'red';
                if(this.Map_info[i].dtype=='nogps')
                {
                  lineColor = 'green';
                }
            }
            this.addpolylines_marker(lineColor, polyline_marker1,i);
            }
             var icon:any
            
            if(i==0) {
              
              icon='assets/imagesnew/start_marker.png';
              // $icon_type="start";
          } else if(i+2==this.Map_info.length) {
           
              icon='assets/imagesnew/stop_marker.png';
              // $icon_type="end";
          } else {
              if(this.Map_info[i]?.speed >5 && this.Map_info[i]?.speed <=20) {
                  icon='assets/imagesnew/yellow_Marker1.png';
                  // $icon_type="yellow";
              } else if((this.Map_info[i]?.speed>20)) {
                  icon='assets/imagesnew/green_Marker1.png';
                  // $icon_type="green";
              } else if((this.Map_info[i]?.speed<=5) ) {
                  icon='assets/imagesnew/red_Marker1.png';
                  // $icon_type="red";
              } else {
                  icon='assets/imagesnew/red_Marker1.png';
                  // $icon_type="red";
              }
          }
           
          if(this.speedballoons==0 && i!==0 && this.Map_info.length!==i && this.Map_info.length!==i+2 ){

            if(this.green_balloon==true){ 
              if(this.Map_info[i]?.speed>20){ continue;}
              // if( this.Map_info[i]?.speed >5 && this.Map_info[i]?.speed <=20){ continue;}
              else{
                
                if (this.yellow_balloon==true){

                    }else if (this.red_balloon==true) {
                  
                } else {

                  this.addMarker2(lat_lng, icon, this.Map_info[i]?.speed,this.Map_info[i]?.io, this.Map_info[i]?.distance,this.Map_info[i]?.vnumber,this.Map_info[i]?.imei,this.Map_info[i]?.device_time,this.Map_info[i]?.Battery,this.Map_info[i]?.BatteryVoltage,);        
                
                }
              }
            }
            else if (this.green_balloon==false){
              if(this.Map_info[i]?.speed>20){ 
                this.addMarker2(lat_lng, icon, this.Map_info[i]?.speed,this.Map_info[i]?.io, this.Map_info[i]?.distance,this.Map_info[i]?.vnumber,this.Map_info[i]?.imei,this.Map_info[i]?.device_time,this.Map_info[i]?.Battery,this.Map_info[i]?.BatteryVoltage,);
              }
            }
            if (this.yellow_balloon==true){
            if( this.Map_info[i]?.speed >5 && this.Map_info[i]?.speed <=20){ continue;}
              else{
                if(this.red_balloon==true){

                }else{
                  this.addMarker2(lat_lng, icon, this.Map_info[i]?.speed,this.Map_info[i]?.io, this.Map_info[i]?.distance,this.Map_info[i]?.vnumber,this.Map_info[i]?.imei,this.Map_info[i]?.device_time,this.Map_info[i]?.Battery,this.Map_info[i]?.BatteryVoltage,); }
              }
            }
            else if (this.yellow_balloon==false){
              
              if(this.Map_info[i]?.speed >5 && this.Map_info[i]?.speed <=20){ 
                this.addMarker2(lat_lng, icon, this.Map_info[i]?.speed,this.Map_info[i]?.io, this.Map_info[i]?.distance,this.Map_info[i]?.vnumber,this.Map_info[i]?.imei,this.Map_info[i]?.device_time,this.Map_info[i]?.Battery,this.Map_info[i]?.BatteryVoltage,);
              }
            }
           if(this.red_balloon==true){
              if(this.Map_info[i]?.speed>= 0 && this.Map_info[i]?.speed <5){continue;
              }                                                                                                                                                                
              else{
              
                this.addMarker2(lat_lng, icon, this.Map_info[i]?.speed,this.Map_info[i]?.io, this.Map_info[i]?.distance,this.Map_info[i]?.vnumber,this.Map_info[i]?.imei,this.Map_info[i]?.device_time,this.Map_info[i]?.Battery,this.Map_info[i]?.BatteryVoltage,);
                continue;
              }
            }
           
          }else{
            this.addMarker2(lat_lng, icon, this.Map_info[i]?.speed,this.Map_info[i]?.io, this.Map_info[i]?.distance,this.Map_info[i]?.vnumber,this.Map_info[i]?.imei,this.Map_info[i]?.device_time,this.Map_info[i]?.Battery,this.Map_info[i]?.BatteryVoltage,); }
        
          
    }
    
    //  this.SpinnerService.hide();

    setTimeout(() => {
   
      // $target.html(this.data1[$target[0].id]);
      // $target.removeClass('loading');
      this.SpinnerService.hide('spinner-3');
      
    }, 100);
        // this.SpinnerService.show(); 
        
        // this.formarkeronly();
        // alert(1);
        }

        zoom(eve:any){
          if (eve.target.checked==true ){
            this.zoom_value=1;
          }
          if (eve.target.checked==false )
          {
            this.zoom_value=0;
          }
          // if()
          }  
          MouseHover(eve:any){
          
            if (eve.target.checked==true ){
              this.MouseHover_value='mouseover';
            }
            if (eve.target.checked==false )
            {
              // this.MouseHover_value='';
              this.MouseHover_value='click';
            }
            // if()
            }  
          range(eve:any){
            var val=eve.target.value;
            this.settimeout_value=val*100;
         
           } 
           geo_playtrack(eve:any){
            if (eve.target.checked==false ){
              this.check_value_Map1=false;
              this.geo_listvalue=[];
              // this.geo_listvalue=[];
              // this.Landmark_listvalue =this.Landmark_list;
              // this.view_geofence();
              for(var i=0;i<=this.geostore.length;i++){
                this.geostore[i]?.setMap(null);
              }
             }else {
              this.geo_play_va=true;
              if(this.temp_index.length!==0){
              this.check_value_Map1=false;
              
              this.geofence_viewall_map();
              if(this.LastStatus==0){
                this.show_vehicle();
              }else{ 
                this.track();
              }
             }else{
              alert("Select a vehicle");
             }
            }
           }
           playtrack(eve:any){
      if(this.textView==0){
            if (eve.target.checked==false ){
             this.s_play=false;
             this.range_toggle=0;
             this.settimeout_value=1000;
            //  this.range_toggle=0;
             
             if(this.markers_play.length!==0){
              this.forvalue= this.Map_info.length+1;
              for(var t=0;t<this.line_play.length;t++){
                this.line_play[t].setMap(null);
              }
              for(var n=0;n<this.markers_play.length;n++){
                this.markers_play[n].setMap(null);
              }
              for(var g=0;g<this.gif_store.length;g++){
                this.gif_store[g].setMap(null);
              }
            }
            }else {
              this.s_play=true;
              // this.settimeout_value=1000;
              // this.trackLine.push(poly);
              // this.temp_markerarray
              // this.maps.setMap(null);
              // if( this.temp_markerarray.length!==0){
              //   for(var k=0;k<=this.temp_markerarray.length;k++){
              //     this.temp_markerarray[k].setMap(null);
              //   }
              // }
              if(this.trackLine.length!==0){
              for(var i=0;i<this.trackLine.length;i++){
                this.trackLine[i].setMap(null);
                // this.temp_markerarray[i].setMap(null);
              }
              for(var i=0;i<this.temp_markerarray.length;i++){
                // this.trackLine[i].setMap(null);
                this.temp_markerarray[i].setMap(null);
              }
            }
              this.deleteOverlays();
              this.range_toggle=1;
              this.playtrack1();
            }
          }
            }
    playtrack1(){
        this.deleteOverlays();
        this.range_toggle=1;
      if(this.vehicleno !==''){
        var letform:Date;
        var letTo:Date;
        this.FromdateTime='';
        this.TodateTime='';
        letform  =$("#datepicker").val();
        this.Fromdaydate = this.datepipe.transform(letform, 'yyyy-MM-dd HH:mm:ss');
        this.FromdateTime=this.Fromdaydate;
        letTo=$("#datepicker1").val();
        this.TodateTime =this.datepipe.transform(letTo, 'yyyy-MM-dd HH:mm:ss');
        this.TodateTime= this.TodateTime;      
        this.DataFrequency = 10;
        // this.SpinnerService.show('spinner-3');
        var formData = new FormData();
        formData.append('AccessToken',this.access);
        formData.append('VehicleNo', this.vehicleno);
        formData.append('RunDate',this.Fromdaydate);
        formData.append('CloseDate', this.TodateTime);
        formData.append('Interval', this.interval_value);
        formData.append('ImeiNo', this.imeino);
      
        this.service.MAP(formData).subscribe((res: any) => {
          if (res.Status == "Failed") {
          
            localStorage.removeItem('AccessToken');
            this.router.navigate(['/auth/login']);
          }
          else {
            this.Map_info = res.TrackData;
            this.DataFrequency = res.DataFrequency;
            this.latlngbounds = new google.maps.LatLngBounds();
            // for (var i = 0; i < this.Map_info.length - 1; i++) {  }
          this.forvalue=0;
            this. playgoogle();
            }
            
            } )
    }
  }
  
    
    playgoogle(){
      
      var i= this.forvalue;
      if(this.Map_info.length>i){
        var latlngbounds = new google.maps.LatLngBounds(); 
        var bounds =new google.maps.LatLngBounds();
                        if(i==this.Map_info.length-1 && this.zoom_value==1)
                        {
                            this.maps.setCenter(this.latlngbounds.getCenter());
                            this.maps.fitBounds(this.latlngbounds);
                           // return false;
                        }
                        else if( this.zoom_value==1)
                        {
                          this.maps.setCenter(this.latlngbounds.getCenter());
                          this.maps.fitBounds(this.latlngbounds);
                           // return false;
                        }
                        else if(i==0 && this.zoom_value==0)////code enabled after zoom is not checked
                        {
                       //alert(zoom_value);
                             var position_initial;
                            position_initial=new google.maps.LatLng(this.Map_info[0]?.Latitude,this.Map_info[0]?.Longitude);              
                            
                        
                            latlngbounds.extend(position_initial);
                            this.maps.setCenter(this.latlngbounds.getCenter());
                             this.maps.fitBounds(this.latlngbounds);
                             

                             var position_final;
                            position_final=new google.maps.LatLng(this.Map_info[this.Map_info.length-1]?.Latitude, this.Map_info[this.Map_info.length-1]?.Longitude);              
                            //alert(position_final);
                            this.latlngbounds.extend(position_final); 
                            
                             
                            
                             this.maps.setCenter(this.latlngbounds.getCenter());
                             this.maps.fitBounds(this.latlngbounds);
                             var listener = google.maps.event.addListener(this.maps, "idle", () => { 
                              if (this.maps.getZoom() > 11) this.maps.setZoom(11); 
                              google.maps.event.removeListener(listener); 
                            });
                          
                        }
                       var icon_flag=0;                    
                        //icon='';
                        var locType=null;
                        if(locType!=null)
                        {
                            if(locType[i]=='cellid')
                            {
                                if(i==0)
                                {
                                        // icon='images/start_marker.png';
                                         //icon='img/images/start_marker.png';                  
                                        icon_flag=1;
                                }
                                else if(i==(this.Map_info.length-1))
                                {
                                        // icon='images/stop_marker.png';
                                        //icon='img/images/stop_marker.png';
                                        icon_flag=1;
                                }
                                else
                                {

                                    //  icon='images/cell_red_Marker1.png';
                                      icon_flag=1;



                                }
                            }
                            else
                            {
                                if(i==0)
                                {
                                    // icon='images/start_marker.png';
                                    //icon='img/images/start_marker.png';  

                                    icon_flag=1;
                                }
                                else if(i==(this.Map_info.length-1))
                                {
                                    // icon='images/stop_marker.png';
                                    //icon='img/images/stop_marker.png';
                                    icon_flag=1;
                                }
                                else
                                {

                                    if((this.Map_info[i]?.Speed>5 &&this.Map_info[i]?.Speed<=20) && (document.forms[0].m1.value==1))
                                    {
                                    //alert('speed[i]>=1');
                                            // icon='images/yellow_Marker1.png';
                                            icon_flag=1;
                                    }                           
                                    else if((this.Map_info[i]?.Speed>20) && (document.forms[0].m2.value==1))
                                    {
                                            // icon='images/green_Marker1.png';
                                            icon_flag=1;
                                    }

                                    else if((this.Map_info[i]?.Speed<=5) && (document.forms[0].m3.value==1))
                                    {
                                            // icon='images/red_Marker1.png';
                                            icon_flag=1;
                                    }                           
                                    //else
                                    //{
                                    //       icon='images/green_Marker1.png';
                                    //}



                                }
                            }
                        }
                        else
                        {
                            if(i==0)
                            {
                                // icon='images/start_marker.png';
                                //icon='img/images/start_marker.png';  

                                icon_flag=1;
                            }
                            else if(i==(this.Map_info.length-1))
                            {
                                // icon='images/stop_marker.png';
                                //icon='img/images/stop_marker.png';
                                icon_flag=1;
                            }
                            else
                            {

                                if((this.Map_info[i]?.Speed>5 && this.Map_info[i]?.Speed<=20)&&this.yellow_balloon==false )
                                {
                                //alert('speed[i]>=1');
                                        // icon='images/yellow_Marker1.png';
                                        icon_flag=1;
                                }                           
                                else if((this.Map_info[i]?.Speed>20) &&this.green_balloon==false )
                                {
                                        // icon='images/green_Marker1.png';
                                        icon_flag=1;
                                }

                                else if((this.Map_info[i]?.Speed<=5)&&this.red_balloon==false)
                                {
                                        // icon='images/red_Marker1.png';
                                        icon_flag=1;
                                }                           
                                //else
                                //{
                                //       icon='images/green_Marker1.png';
                                //}



                            }
                        }
                        var position;
                        var lat_tmp=this.Map_info[i]?.Latitude;
                        var lng_tmp=this.Map_info[i]?.Longitude;
                        
                        position=new google.maps.LatLng(this.Map_info[i]?.Latitude,this.Map_info[i]?.Longitude); 
                        //code enabled after zoom is checked
                        if(this.zoom_value==1)
                        {
                            this.latlngbounds.extend(position); 
                            bounds.extend(position);
                        
                        }
                        if(i>0)
                        {                       
                           var latV1 = this.Map_info[i-1]?.Latitude;
                           var lngV1 =this.Map_info[i-1]?.Longitude;
                           var latV2 = this.Map_info[i]?.Latitude;
                           var lngV2 = this.Map_info[i]?.Longitude;

                            var yVaxis = (parseFloat(latV1) + parseFloat(latV2))/2;
                            var xVaxis = (parseFloat(lngV1) + parseFloat(lngV2))/2;
                           
                            var angle_tV = Math.atan( (parseFloat(latV2)-parseFloat(latV1))/(parseFloat(lngV2)-parseFloat(lngV1)) );
                           
                            var angle_degV = 360 * angle_tV/(2 * Math.PI);

                            if((lngV2-lngV1)<0)
                            {
                                angle_degV = 180 + angle_degV;
                            }
                            else if((latV2-latV1)<0)
                            {
                                angle_degV = 360 + angle_degV;
                            }
                            angle_degV = Math.round(angle_degV);
                          
                        }
                        else
                        {
                            angle_degV =0;
                        }
                        var iconVeh = 
                        {
                            url: 'assets/images/giphy1.gif',
                            size: new google.maps.Size(17, 17),
                            scaledSize: new google.maps.Size(17, 17),  
                            
                           setRotation: [angle_degV]
                            
                        };
                        if(icon_flag==1)
                        {
                            var marker = new google.maps.Marker
                            ({
                                position: position,  map: this.maps, icon: this.Map_info[i]?.Icon,
                            }); 
                            
                            var markerVehicle = new google.maps.Marker
                            ({
                                position: position, 
                                 map: this.maps,
                                  icon: iconVeh 
                            }); 
                            this.gif_store.push(markerVehicle);
                        }
                        else
                        {
                              
                        //alert('in else');
                            var marker = new google.maps.Marker
                            ({
                                position: position,  map: this.maps,  icon: {path: google.maps.SymbolPath.CIRCLE},
                                // title:title
                            });
                             var markerVehicle = new google.maps.Marker
                            ({
                                position: position,  map: this.maps, icon: iconVeh
                            }); 
                            this.gif_store.push(markerVehicle);
                        }

                        this.line_play.push(marker);
                        //=======false true===============//
                        markerVehicle.icon.rotation=240;
                         if(i>0)
                         {
                         this.markersVehicle[this.markersVehicle.length - 1].setVisible(false);                
                         }
                        this.markersVehicle.push(markerVehicle);
                        var line = new google.maps.Polyline
                        ({
                            path: [new google.maps.LatLng(this.Map_info[i-1]?.Latitude,this.Map_info[i-1]?.Longitude),new google.maps.LatLng(this.Map_info[i]?.Latitude,this.Map_info[i]?.Longitude)],
                            strokeColor: '#ff0000',
                            strokeOpacity: 1.0,
                            strokeWeight: 1.5,
                            icons: [{
                              icon: { path: google.maps.SymbolPath.FORWARD_OPEN_ARROW },
                              //  google.maps.SymbolPath.FORWARD_CLOSED_ARROW
                              offset: '100%',
                              repeat: '100px'
                            }]
                            
                        }); 
                        this.markers_play.push(line);                
                        line.setMap(this.maps);
                
                    //map.setCenter(latlngbounds.getCenter());
                    //code enabled after zoom is checked
                       if(this.zoom_value==1)
                        {
                             this.maps.setCenter(bounds.getCenter());
                            this.maps.fitBounds(bounds);    
                            this.maps.setZoom(14);
                        }
                   
                    
                   
                    
                    //for(var i=1;i<latarr.length;i++)
                    if(i>0)
                    {
                       var lat1 = this.Map_info[i-1]?.Latitude;
                        var lng1 = this.Map_info[i-1]?.Longitude;
                                                
                                                // alert('lat='+lat1+'lng1='+lng1);

                       var lat2 = this.Map_info[i]?.Latitude;
                       var lng2 = this.Map_info[i]?.Longitude;
                                                
                                                //alert('lat2='+lat2+'lng2='+lng2);
                                                   //var adddd=lat1 + lat2;
                                                   //alert('adddd='+adddd);
                        var yaxis = (parseFloat(lat1) + parseFloat(lat2))/2;
                        var xaxis = (parseFloat(lng1) + parseFloat(lng2))/2;
                        //alert('yaxis='+yaxis+'xaxis='+xaxis);
                        var angle_t = Math.atan( (parseFloat(lat2)-parseFloat(lat1))/(parseFloat(lng2)-parseFloat(lng1)) );
                        var angle_deg = 360 * angle_t/(2 * Math.PI);

                        if((lng2-lng1)<0)
                        {
                            angle_deg = 180 + angle_deg;
                        }
                        else if((lat2-lat1)<0)
                        {
                            angle_deg = 360 + angle_deg;
                        }
                        angle_deg = Math.round(angle_deg);
                        //alert('angle_degree='+angle_deg);
                        // var image = 
                        // {
                        //     url: 'images/arrow_images/'+angle_deg+'.png',
                        //     size: new google.maps.Size(21, 21),
                        //     scaledSize: new google.maps.Size(21, 21),                           
                        //     anchor: new google.maps.Point(10, 10)
                        // };
                                               // alert('image='+image);
                        // position=new google.maps.LatLng(yaxis, xaxis);
                                                 //alert('position='+position);
                        // var marker1 = new google.maps.Marker
                        // ({
                        //     position: position,
                        //     map: this.maps,
                        //     icons: 
                          
                        // }); 
                        // this.markers_play.push(marker1);

                    }
                    
                        this.forvalue=this.forvalue+1;
                      
                          this.setTimeoutPlay= setTimeout(() => {
                            //alert('ss'+new_time);
                            //return false;
                         
                          this. playgoogle();
                            }, this.settimeout_value);
                        
       
        }
    }
    deleteOverlays() 
    {
        for (var i = 0; i < this.markers_play.length; i++) 
        {
            this.markers_play[i].setMap(null);
           
        }
        for (var j = 0; j < this.markersVehicle.length; j++) 
        {
            
            this.markersVehicle[j].setMap(null);
        }
    }


    show_balloons()
    {
      this.show_balloons_div=!this.show_balloons_div;
    }
    yellow_cross_show(){
     this.yellow_cross=!this.yellow_cross;
     this.yellow_balloon=!this.yellow_balloon;
    }
    green_cross_show(){
      this.green_cross=!this.green_cross;
      this.green_balloon=!this.green_balloon;
     }
     red_cross_show(){
      this. red_cross=!this.red_cross;
      this.red_balloon=!this.red_balloon;
     }
     apply_track(){
      
      if(this. red_cross==true||this.green_cross==true||this.yellow_cross==true){
        this.speedballoons=0;
        if(this.range_toggle==1){
          this.playtrack1();
        }else{
          this.track();
        }
      }else{
        alert("Please Select a filter speed balloon");
      }
     }


    diff_minutes(dt2, dt1) 
    {
   
     var diff =(dt2.getTime() - dt1.getTime()) / 1000;
     diff /= 60;
     return Math.abs(Math.round(diff));
   
    }

formarkeronly(){
  for (var i = 0; i < this.Map_info.length - 1; i++) {
   var lat_lng = new google.maps.LatLng(this.Map_info[i]?.Latitude, this.Map_info[i]?.Longitude);
   this.latlngbounds.extend(lat_lng);
   var icon = this.Map_info[i]?.Icon;
   var Speed = this.Map_info[i]?.Speed;
   var Distance = this.Map_info[i]?.Distance;
   var vehicleno=this.Map_info[i]?.VehicleNo;
   var imeino=this.Map_info[i]?.ImeiNo;
 
   this.lastmarker(lat_lng, icon, Speed, Distance,vehicleno,imeino,this.Map_info[i]?.DateTime);
  }
  
  // this.SpinnerService.hide(); 
}
// lastmarker(lat_lng, this.Map_info[i]?.Icon, this.Map_info[i]?.Speed, this.Map_info[i]?.Distance,this.Map_info[i]?.VehicleNo,this.Map_info[i]?.ImeiNo,this.Map_info[i]?.DateTime);
lastmarker(location: any, icon: any, Speed: any, Distance: any,vehicleno:any,imeino:any,nowDateTime){
 
  this.str=[];
  var str:any=[];
   str.push(location.lat());
   str.push(location.lng());
   var coord = str.join(":");
   var coord1 = ((coord.split(':')).join(','));
   var str1=coord1;
  var formData = new FormData();
  formData.append('AccessToken', localStorage.getItem('AccessToken')!);
  formData.append('VehicleId', this.vehicle_id);
  formData.append('ImeiNo', imeino);
  formData.append('LatLong', str1);
  this.service.Lastlocation(formData).subscribe((res: any) => {
    // alert(res.Status);
    if (res.Status == "Failed") {
      // alert("p");
      localStorage.removeItem('AccessToken');
      this.router.navigate(['/auth/login']);
    }
    else {
      // alert("data");
      var last_address=res.Data.Address;
      var Battery=res.Data.Battery;
      var LastHaltTime=res.Data.LastHaltTime;
      // this.addMarker2(location, icon, Speed, Distance,vehicleno,imeino,last_address,Battery,LastHaltTime,nowDateTime);
    
    }
     
  })
  

}
abs(){
  this.values_open= !this.values_open;
}
  addpolylines_marker(color: any, polyline_marker:any,i:any) {
  
    var poly = new google.maps.Polyline({
      strokeColor: color,
      strokeOpacity: 1.0,
      strokeWeight: 2,
      geodesic: true,
      path: polyline_marker, 
      icons: [{
        icon: { path: google.maps.SymbolPath.FORWARD_OPEN_ARROW },
        //  google.maps.SymbolPath.FORWARD_CLOSED_ARROW
        offset: '100%',
        repeat: '100px'
      }],
      //saumya:color,
      //  PolylineName:this.ClusrerName,

    });
    this.trackLine.push(poly);
    poly.setMap(this.maps);
  
    if(this.Map_info.length==i+2){
      // alert(0);
    this.maps.fitBounds(this.latlngbounds);
    var listener = google.maps.event.addListener(this.maps, "idle", () => { 
      if (this.maps.getZoom() > 15) this.maps.setZoom(15);
      google.maps.event.removeListener(listener); 
    });
  }
  }

  // addMarker2(location: any, icon: any, Speed: any, DateTime: any, Distance: any, CellId: any,Io:any,vehicleno:any,imeino:any,last_address:any)
  addMarker2(location: any, icon: any, Speed: any,io, Distance: any,vehicleno:any,imeino:any,DateTime:any,Battery:any,BatteryVoltage:any) {

    var marker1 = new google.maps.Marker({
      position: location,
      icon: icon,
      draggable: false,
      map: this.maps,
      Speed: Speed,
      DateTime: DateTime,
      Distance: Distance,
      vehicleno:vehicleno,
      imeino:imeino,
     Battery:Battery,
     BatteryVoltage:BatteryVoltage,
     io:io
    });
    marker1.setMap(this.maps);
    this.temp_markerarray.push(marker1);
    // this.maps.fitBounds(this.latlngbounds);
    // var listener = google.maps.event.addListener(this.maps, "idle", () => { 
    //   if (this.maps.getZoom() > 15) this.maps.setZoom(15);
    //   google.maps.event.removeListener(listener); 
    // });
  
  
 
    marker1.addListener(this.MouseHover_value, () => { 
      if(this. GroupType=='5'){
      var k= marker1.position.toString();
      this.str= (((k.split('(')).join('')).split(')')).join('').split(' ').join('');
      var lat=this.str.split(",");
      // var cus=this.Customers
        var formData = new FormData();
              formData.append('AccessToken',this.access);
              formData.append('group_id', this.groupId);
              formData.append('AccountId',localStorage.getItem('AccountId')!);
              formData.append('lat', lat[0]);
              formData.append('lng', lat[1]);
             
              if(this.Customers!==undefined ||this.Customers!==''){
               
              formData.append('nearPlace', this.Customers);}
              
              this.service.placeAndNearFrom(formData).subscribe((res: any) => {
                
               this.place_from= res.place_from;
               this.near_from= res.near_from;
              
               this.infowindow_track(marker1); 
      
              })
           
            }else{
              this.infowindow_track(marker1); 
            }
     
      
    });
   
  
  
    
  }
  

  info_landmark(latlong:any){
    // alert(1);
     this.Landmark_geocoord=latlong;
     this.open1();
  }
  polylines(smallsizemodal1:any){
   
   var poly = new google.maps.Polyline({  
    path: this.polyline_marker,    
    geodesic: false,    
    strokeColor: '#FF0000',    
    strokeOpacity: 2.0,    
    strokeWeight: 5  ,
    Editable: true,
    });  
    poly.setMap(this.maps);

    var self=this;
    google.maps.event.addListener(poly, "mouseup", getPolygonCoords);
    google.maps.event.addListener(poly, "set_at", getPolygonCoords);
    function getPolygonCoords() {
      var coordinates_poly = poly .getPath().getArray();
      
      var coord1 = coordinates_poly.join(":");
      var coord = ((coord1.split(':')).join(','));;
      self.polylinecoord = coord;
    }
    google.maps.event.addListener(poly, "click", (event) => {
      // this.modalService.open(smallsizemodal1);
      this.chan1();
      this.chan();
      this.open4();

    });
  }
  Station_Typelist(){
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    if(this.groupId!==undefined){
      formData.append('GroupId',  this.groupId);}
      if(this.groupId==undefined){
        formData.append('GroupId','');}
    
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
  checkAll(){
    for(var i=0;i<this.run_Routes_list.length;i++){
      let input = (document.getElementsByName('mm'+i) as any)[0].checked=false;

    
      input=false;
     
    }
    for(var s=0;s<this.station_store.length;s++){
       this.station_store[s].setMap(null);
   
    }
  }
  runRoutes_list(){
   
    var formData = new FormData();
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
  station_value(eve:any){
  
    var input = document.getElementById("diff");
    if(input!==null){
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    // event.preventDefault();
    // alert(0);
  
     
       this.Customers=eve.target.value;
       this.stations();
    // document.getElementById("myBtn").click();
  }
});

}
  
  }
  stations(){
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    formData.append('StationTypeId', this.StationMaster_id);
    if( this.StationMaster_id==2|| this.StationMaster_id==3){
    formData.append('RouteCode',  this.Runcode);}
    formData.append('StationCodes', this.Customers);
    formData.append('Live', '0');
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
  geofencelist() {
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    this.service.geofence_list(formData).subscribe((res: any) => {

      if (res.Status == "failed") {
        localStorage.removeItem('AccessToken');
        this.router.navigate(['/auth/login']);
      }
      else {
        this.geo_list = res.GeofenceList;
        for (var i = 0; i <= this.geo_list.length; i++) {
          if (this.geo_list[i]?.GeoName == this.Geofence_name) {
            this.GEO_Id = this.geo_list[i]?.GeoId;
          }
        }
      }
    });
  }
  geofence_viewall_map(){
   
    if (this.check_value_Map1 == false) {
      this.check_value_Map1=true;
      this.geo_listvalue=[];
      this.geo_listvalue=this.geo_list;
      
      this.view_geofence();

    } else {
      this.check_value_Map1=false;
      this.geo_listvalue=[];
     
      // geo_listvalue
      // this.geo_listvalue=[];
      // this.Landmark_listvalue =this.Landmark_list;
      // this.view_geofence();
      for(var i=0;i<=this.geostore.length;i++){
        this.geostore[i]?.setMap(null);
      }
      
    }
   
  }
  geofence(GeoId: any, event: any) {
    // var geo_listvalue:any=[];
    // this.geo_listvalue=[];
   
    for(var i=0;i<=this.geostore.length;i++){
      this.geostore[i]?.setMap(null);
    }
   
    for(var i=0;i<this.geo_list.length;i++){
      if(this.geo_list[i]?.GeoId==GeoId){
        if (event.target.checked == true) {
          this.geo_listvalue.push(this.geo_list[i]);
        }
        else {
          var geo_listvalue1 = this.geo_list[i];
    
          for (var p = 0; p <= this.geo_listvalue.length; p++) {
            if (this.geo_listvalue[p]?.GeoId == geo_listvalue1.GeoId) {
              this.geo_listvalue.splice(p, 1);
             
            }
          }
        }
      }
    }
   
  }
 
  view_geofence() {

    if (this.geo_listvalue == 0) {
    
    } else {
      if(this.check_value_Map1 == true){

      }else{
        this.initMap();
      }
      this.Geofencename = [];
      this.Geofence_name1 = [];
      this.GeofenceId = 0;
      for (var v = 0; v < this.geo_listvalue.length; v++) {

        var values = this.geo_listvalue[v];
        this.GeofenceId = values?.GeoId;


        // this.Geofencename=this.Geofence_name1.toString();


        this.geofencedetail1();
        // this.geoformap();
      }
    }
  }
  view_geofence_single(G_Id:any){
 
    this.GeofenceId='';
    this.GeofenceId=G_Id;
    if(this.geostore.length!==0){
      for(var g=0;g<this.geostore.length;g++){
        this.geostore[g].setMap(null);
      }
    }
    this.geofencedetail1();
  }
  //  view_Landmark()

  call(GeoId: any) {
    // this.SpinnerService.show();
    var geo_listdelet: any = [];
    this.geofence_id = [];
    for(var i=0;i<this.geo_list.length;i++){
      if(this.geo_list[i]?.GeoId==GeoId){
    geo_listdelet = this.geo_list[i];
    this.GeofenceId = geo_listdelet.GeoId;
    this.geof_name = geo_listdelet.GeoName;
    this.geofencedetail();
  }
}
}
  
  hello() {

    // this. drawingManager=0;
  
    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        // position:[google.maps.ControlPosition.TOP_LEFT].push(emptyDiv),
        drawingModes: [
          // google.maps.drawing.OverlayType.POLYLINE,
          google.maps.drawing.OverlayType.POLYGON,
        ],
      },
      polygonOptions: {
        map: this.maps,
        fillColor: '#BCDCF9',
        fillOpacity: 0.5,
        strokeWeight: 2,
        strokeColor: '#57ACF9',
        zIndex: 1,
        editable: true,
      },

    });
    drawingManager.setMap(this.maps);
    
    this.drawingManager_store.push(drawingManager.drawingModes);
    
    google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
      // Polygon drawn
    
      this.submite=false;
      self.open();
      this.deletegeo=event.overlay;
      // event.overlay.setMap(null);
      if (event.type === google.maps.drawing.OverlayType.POLYGON) {
        this.geocoord = event.overlay.getPath().getArray();
        
      }
    });
    google.maps.event.addListener(this.maps, "click", (event) => {
      this.deletegeo?.setMap(null);
    });
    var self = this;getPolygonCoords
    google.maps.event.addListener(drawingManager, "mouseup",(event) => {
      drawingManager.setMap(null); 
    } );
    google.maps.event.addListener(drawingManager, "set_at", getPolygonCoords);
    function getPolygonCoords() {
      self.geocoord = drawingManager.polygonOptions.getPath().getArray();
      // drawingManager.polygonOptions.setMap(null);

    }
    google.maps.event.addListener(drawingManager.polygonOptions, 'rightclick', function (event) {
      // self.drawingManager_store.push(drawingManager);
      drawingManager.setMap(null);
       
      // self.open();
    });

    // this.geofenceUpdate();
    // var h;
    // this.view_geofence(h);
    google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
      this.overlayClickListener(event.overlay);
      this.centers = event.overlay.getPath().getArray();
      // this.centers = event.overlay
      // .getPath()
      // .getArray()
      // .map((coord) => {
      //   return {
      //     lat: coord.lat(),
      //     lng: coord.lng(),
      //   };
      // });
      drawingManager.setDrawingMode(null);
      drawingManager.setOptions({
        drawingControl: false,
      }); 
    }
    );
  }

  geofenceedit(ind: any) {
    var geo_list_temp = this.geo_list[ind];
    this.GeofenceId = geo_list_temp.GeoId;
    const drawingManager = new google.maps.drawing.DrawingManager({

      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_CENTER,
        drawingModes: [
          // google.maps.drawing.OverlayType.POLYLINE
          google.maps.drawing.OverlayType.POLYGON,
        ],
      },
    });
    // drawingManager.setMap(this.maps);
    // this.call(ind);
    this.geofencedetail();
    this.geoformap1();
    google.maps.event.addListener(this.drawTriangle, 'overlaycomplete', (event) => {
      this.overlayClickListener(event.overlay);
      this.centers = event.overlay.getPath().getArray();
      // this.centers = event.overlay
      // .getPath()
      // .getArray()
      // .map((coord) => {
      //   return {
      //     lat: coord.lat(),
      //     lng: coord.lng(),
      //   };
      // });
      this.drawTriangle.setDrawingMode(null);
      this.drawTriangle.setOptions({
        drawingControl: false,
      });
    }
    );
  }

  overlayClickListener(overlay) {
    
    var self = this;
    google.maps.event.addListener(overlay, 'mouseup', function (event) {
      self.centers = overlay.getPath().getArray();
      var coord1 = self.centers.join(":");
      var coord = ((coord1.split(':')).join(','));
      self.geocoord = coord;
    });
  }
  overlayClickListener1(overlay: any) {
    
    var self = this;
    google.maps.event.addListener(overlay, 'click', function (event) {

      var m: any = [];
      m.push(overlay.position.lat());
      m.push(overlay.position.lng());
      var coord = m.join(":");
      var coord1 = ((coord.split(':')).join(','));

      self.Landmark_geocoord = coord1;
      self.open1();

    });
  }
 
  geofenceUpdate() {
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    formData.append('GeofenceId', this.GEO_Id || this.GeofenceId);
    formData.append('GeoCoord', this.geocoord);
    // formData.append('Remark','');
    this.service.geofence_Update(formData).subscribe((res: any) => {

      if (res.Status == "Failed") {
        localStorage.removeItem('AccessToken');
        this.router.navigate(['/auth/login']);
      }
      else {
        alert("Your geofence successfully Modified!");
        this.geo_detail = res;
        this.initMap();
        this.geocoord = 0;
        this.GeofenceId = 0;
        this.GEO_Id = 0;
      }
    });
  }
  geofenceadd() {
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    formData.append('GeoName', this.Geofence_name);
    formData.append('Remark', this.Geofence_Remarks);
    formData.append('GeoCoord', this.geocoord);
    // formData.append('Remark','');
    this.service.geofence_add(formData).subscribe((res: any) => {

      if (res.Status == "Failed") {
        // alert("p");
        localStorage.removeItem('AccessToken');
        this.router.navigate(['/auth/login']);
      }
      else {
        this.geo_detail = res;
        alert("Your geofence successfully saved!");
        this.geofencelist();
      }
    });
  }
  geofencedetail() {
    if (this.GeofenceId == 0) {

    } else {
      this.polygonCoords = [];
      this.latlngbounds = [];
      var formData1 = new FormData();
      formData1.append('AccessToken', localStorage.getItem('AccessToken')!);
      formData1.append('GeofenceId', this.GeofenceId);
      this.service.geofence_detail(formData1).subscribe((res: any) => {
        if (res.Status == "failed") {
          localStorage.removeItem('AccessToken');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.geo_detail = res.Result;
          this.groname_final=this.geo_detail.geo_name;
          var geo_coord_temp: any = [];
          geo_coord_temp = this.geo_detail.geo_coord;
          this.geo_coord = atob(geo_coord_temp);
          // var str=this.geo_coord.split(','); 
          var coord_test = (((((this.geo_coord.split('),(')).join(':')).split('(')).join('')).split(')')).join('');
          var coord1 = coord_test.split(":");
          this.latlngbounds = new google.maps.LatLngBounds();
          this.polygonCoords = new Array();
          for (var z = 0; z < coord1.length; z++) {
            var coord2 = coord1[z].split(",");
            //alert("lat="+parseFloat(coord2[0])+"lng="+parseFloat(coord2[1]));
            this.polygonCoords[z] = new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]));
            this.latlngbounds.extend(new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1])));
          }
          this.initMap();
          this.geoformap1();
        }

      });
    }

  }
  geofencedetail1() {
    // debugger;
    if (this.GeofenceId == 0) {

    } else {
      this.polygonCoords = [];
      this.latlngbounds = [];
      var formData1 = new FormData();
      formData1.append('AccessToken', localStorage.getItem('AccessToken')!);
      // alert("p");
      formData1.append('GeofenceId', this.GeofenceId);
      this.service.geofence_detail(formData1).subscribe((res: any) => {
        // alert("p");
        if (res.Status == "Failed") {
          // alert("p");
          localStorage.removeItem('AccessToken');
          this.router.navigate(['/auth/login']);
        }
        else {
          
          this.geo_detail = res.Result;
          var geo_coord_temp: any = [];
          geo_coord_temp = this.geo_detail.geo_coord;
          this.groname_final = this.geo_detail.geo_name;
          this.geo_coord = atob(geo_coord_temp); 
          var coord_test = (((((this.geo_coord.split('),(')).join(':')).split('(')).join('')).split(')')).join('');
          var coord1 = coord_test.split(":");
          this.latlngbounds = new google.maps.LatLngBounds();
          this.polygonCoords = new Array();
          for (var z = 0; z < coord1.length; z++) {
            var coord2 = coord1[z].split(",");
            //alert("lat="+parseFloat(coord2[0])+"lng="+parseFloat(coord2[1]));
            this.polygonCoords[z] = new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]));
            this.latlngbounds.extend(new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1])));
          }
            this.geoformap();
          // }

        }

      });
    }
  }
  geoformap() {
    // alert(this.polygonCoords);
    var drawTriangle = new google.maps.Polygon({
      paths: this.polygonCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: '#ff00008c',
      fillOpacity: 0.35,
      Editable: false,
      GeoName: this.groname_final,
    });
    this.geostore.push(drawTriangle);
    drawTriangle.setMap(this.maps);
   
    if(this.check_value_Map1 == true){

    }else{
      this.maps.fitBounds(this.latlngbounds);
      this.maps.setCenter(this.latlngbounds.getCenter());
    }
   
    // drawTriangle.getPaths().forEach(function (paths, index) {
    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(drawTriangle, 'click', (event) => {
      infowindow.setContent(" <h6>" + drawTriangle.GeoName + "</h6>");
      infowindow.setPosition(event.latLng);
      infowindow.open(this.maps);

    });
    
    // if(this.geo_listvalue.length==this.geo_list.length){
    //   this.maps.fitBounds(this.latlngbounds);
    // }
    // drawTriangle.setMap(this.maps);
  }
  // change_item(){
  //   this.changeitem=1;
  // }
  // change_item1(){
  //   this.changeitem=2;
  // }
  geoformap1() {
    const drawTriangle = new google.maps.Polygon({
      paths: this.polygonCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      Editable: true,
      GeoName: this.groname_final,
    });
    drawTriangle.setMap(this.maps);
    // drawTriangle.setMap(this.maps);
    // drawTriangle.getPaths().forEach(function (paths, index) {
    var infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(drawTriangle, 'click', (event) => {
      // " <h6>" + drawTriangle.GeoName + "</h6>"
      infowindow.setContent(
      '<div id="siteNotice">'+
      '<table>'+
      '<tbody>'+
    
    '<tr>'+
      '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Geofence Name</td>'+
      '<td style="width:1%;color: blue;">:</td>'+
      '<td style=" color: blue; white-space: nowrap;font-size: 15px;">'+  drawTriangle.GeoName+'</td>'+
    '</tr>'+
    '</table>'+
      '</tbody>'+ '<div >');
      infowindow.setPosition(event.latLng);
      infowindow.open(this.maps);
    });



    this.maps.setCenter(this.latlngbounds.getCenter());
    this.maps.fitBounds(this.latlngbounds);
    drawTriangle.setMap(this.maps);
    var self = this;
    google.maps.event.addListener(drawTriangle, "mouseup", getPolygonCoords);
    google.maps.event.addListener(drawTriangle, "set_at", getPolygonCoords);
    function getPolygonCoords() {
      var coordinates_poly = drawTriangle.getPath().getArray();
      var coord1 = coordinates_poly.join(":");
      var coord = ((coord1.split(':')).join(','));;
      self.geocoord = coord;
    }
    var selt = this;
    google.maps.event.addListener(drawTriangle, "click", function (event) {
      /* do something on right click */
      // selt.open2();
      selt.open3();
      // alert(1);
    });



  }


  geofenceDelete(GeoId: any) {
    if (confirm('Are you sure you want to delete this?')) {
      this.geofence_id='';
    this.geofence_id = GeoId;
    var formData1 = new FormData();
    formData1.append('AccessToken', localStorage.getItem('AccessToken')!);
    formData1.append('GeofenceId', this.geofence_id);
    this.service.geofence_Delete(formData1).subscribe((res: any) => {
      if (res.Status == "Failed") {
        localStorage.removeItem('AccessToken');
        this.router.navigate(['/auth/login']);
      }
      else {
        var id = res;
        this.geofencelist();
        this.initMap();
      }
    });
  }
  }

  Update_grofence() {

  }


  Lastlocation() {
  
    this.last_address=[];
    
    var formData = new FormData();
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


    });
  }
  reload() {
    location.reload();
  }

 
  SmallSizeOpenp() {
    this.current = this.current1;
    this.toggleDisplaymarkerDivIf();
  }

  removeall() {
    this.status1 = 0;
    // this. toggleDisplaymarkerDivIf();
    this.isShowmarkerDivIf = true;
    // this.toggleDisplayDivIf();
    // this.stop_live();
  }

  isAllSelected(event: any) {

    event.target.checked == true
  }

  show_infowindow(id:any){
    if (this.Vehicle_list[id].Checked==true) {
  var marker=this.Vehicle_list[id];
    this.latlngbounds = new google.maps.LatLngBounds();
    this.polygonCoords1 = new Array();
    // for (var z = 0; z < this.store_vehicle.length; z++) {
      var coord2 = marker.LatLong.split(",");
      //alert("lat="+parseFloat(coord2[0])+"lng="+parseFloat(coord2[1]));
      this.polygonCoords1 = new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]));

      this.latlngbounds.extend(new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1])));
    // }

    if(marker.Temperature==undefined){
      this.Temperature='';
    
    }else{
      this.Temperature=marker.Temperature;
      this.Temperature_string='Temperature';
    }
    if(marker.DriverName==''){
      this.DriverName='--';
    
    }else{
      this.DriverName=marker.DriverName;
    }
if(marker.DeliveryDoor==undefined){
  this.DeliveryDoor_track='';
}else{
  if(marker.DeliveryDoor==''){
    this.DeliveryDoor_track='--';
  
  }else{
    this.DeliveryDoor_track=marker.DeliveryDoor;
    this.DeliveryDoor_value_1='DeliveryDoor';
  }
}

if(marker.MainHoleDoor==undefined){
  this.MainHoleDoor_track='';
}else{
    if(marker.MainHoleDoor==''){
      this.MainHoleDoor_track='--';
    
    }else{
      this.MainHoleDoor_track=marker.MainHoleDoor;
      this.MainHoleDoor_values_1='MainHoleDoor';
    }
  }
    var infowindow = new google.maps.InfoWindow({  
      position: this.polygonCoords1,
      enableEventPropagation: true,
      // content: contents  ,
    }); 
    this.maps.fitBounds(this.latlngbounds);
            var listener = google.maps.event.addListener(this.maps, "idle", () => { 
              if (this.maps.getZoom() > 14) this.maps.setZoom(15); 
              google.maps.event.removeListener(listener); 
            });
    var contents:any;
    // google.maps.event.addListener(marker1, "click", () => {
      // this.show=true;
      // this.show = false;

      // this.toggler();
      this.path=0;
      this.path=this.polygonCoords1;
      var val =  marker.VehicleId;
      this.imei_no_show=marker.ImeiNo;
      this.VehicleCategory=marker.VehicleCategory;
      this.DeliveryDoor1=this.DeliveryDoor_track;
      this.MainHoleDoor1=this.MainHoleDoor_track;
      // this.image_vehicle=marker1.icon;
      this.latlong1 = this.polygonCoords1;
      // marker1.position
      this.Weather_forcast();
      this.IMEINO = 0;
      this.vehicle_id = 0;
      this.current = [];
      this.str = 0;
      
      var current: any;
      for (var i = 0; i < this.data1.length; i++) {
        if (this.data1[i]?.VehicleId == val) {
          var temp = this.data1[i];
          this.IMEINO = temp.ImeiNo;
          this.vehicle_id = temp.VehicleId;
          this.str = temp.LatLong;
        }
      }
      //  var temp_array:any=[];
      //  temp_array.push(current);
      //  this.current=temp_array;
      this.current1 = temp;
      this.vehicleno_pop='';
      this.vehicleno_pop = this.current1.VehicleNo;
      this.Driverprofile();
      this.documentation_wallet();
      // this.Lastlocation();
      this.last_address=[];
      var formData = new FormData();
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
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ marker.VehicleNo+'</td>'+
      '</tr>'+
      '<tr>'+
      '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Name</td>'+
      '<td style="width:1%;color: blue;">:</td>'+
      '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ this.DriverName+'</td>'+
    '</tr>'+
      '<tr>'+
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Imei No</td>'+
        '<td style="width:1%;color: blue;">:</td>'+
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+marker.ImeiNo+'</td>'+
      '</tr>'+
      '<tr>'+
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Speed</td>'+
        '<td style="width:1%;color: blue;">:</td>'+
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ this.last_address.Speed+'</td>'+
      '</tr>'+
      '<tr>'+
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Date Time</td>'+
        '<td style="width:1%;color: blue;">:</td>'+
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+this.last_address.DateTime+'</td>'+
      '</tr>'+
      '<tr>'+
        '<td  style="width:100px ;font-size: 11px;font-weight: 900;font-family:Roboto;">Address</th>'+
        '<td style="width:1%;color: blue;">:</td>'+
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ this.Address+'</th>'+
     
     ' </tr>'+
  //    '<tr>'+
  //    '<td  style="width:100px ;font-size: 11px;font-weight: 900;font-family:Roboto;">engin</th>'+
  //    '<td style="width:1%;color: blue;">:</td>'+
  //    '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+marker.EngineStatus+'</th>'+
  // ' </tr>'+
      '<tr>'+
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Battery</td>'+
        '<td style="width:1%;color: blue;">:</td>'+
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+Math.round(marker.Battery)+'%'+'('+marker.BatteryVoltage+'v '+')'+'</td>'+
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
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">'+this.DeliveryDoor_last+'</td>'+
        '<td style="width:1%;color: blue;"> </td>'+
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;" >'+  this.DeliveryDoor_track+'</td>'+
      '</tr>'+
      '<tr>'+
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">'+this.MainHoleDoor_last+'</td>'+
        '<td style="width:1%;color: blue;"> </td>'+
        
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ this.MainHoleDoor_track+'</td>'+
      '</tr>'+
      '<tr>'+
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">'+this.Temperature_last+'</td>'+
        '<td style="width:1%;color: blue;"> </td>'+
        
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+this.Temperature+'</td>'+
      '</tr>'+
      '<tr>'+
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Last HaltTime</td>'+
        '<td style="width:1%;color: blue;"> </td>'+
        
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+this.last_address.LastHaltTime+'</td>'+
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
      '<button type="button" class="btn btn-outline-secondary " id="infowindow_submit'+ marker.VehicleNo+'" name="submit" value ="submit" style="margin-left: 5px;padding:0px !important; margin-top: 5px;">'+
      '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Landmark</span>'+'</button>'+
      '<button type="button" class="btn btn-outline-secondary "   style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_geofence'+ marker.VehicleNo+'" name="submit" value ="submit">'+
      '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Geofence</span>'+'</button>'+
      '<button type="button" class="btn btn-outline-secondary " style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_polyline'+ marker.VehicleNo+'" name="submit" value ="submit">'+
      '<span style="font-size: 10px;padding: 7px;font-weight: bold;">More..</span>'+'</button>'+
     
    '</div>'
      '</div>';
      
        infowindow.setContent(contents);
     
        closeLastOpenedInfoWindow();
        
          infowindow.open(this.maps, marker,this.Address); 
          this.lastOpenedInfoWindow=0; 
          this.lastOpenedInfoWindow = infowindow;
         

         


    })
    
  // })
  google.maps.event.addListener(infowindow, 'domready', () => {
    $("#infowindow_submit"+ marker.VehicleNo).click(() => 
   {
    closeLastOpenedInfoWindow();
    this.Landmaradd();
    // this.info_landmark(marker1.position);
   
   }
     )
    $("#infowindow_geofence"+ marker.VehicleNo).click(() => 
    {
      closeLastOpenedInfoWindow();
     this.hello();
      //  v.polylines();
    }
    
     
     )
     $("#infowindow_polyline"+marker.VehicleNo).click(() => 
    {
      closeLastOpenedInfoWindow();
    //  v.hello();
    this.open7();
    // var smallsizemodal1:any=smallsizemodal1;
    // this.chan1();
    // this.chan();
    //    this.polylines(smallsizemodal1);

    }
    
     
     )
    });
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
    }else{
      // alert("Please select a vehicle");
      this.index_tempar=[];
      if(this.temp_index.length!==0){
      for(var i=0;i<this.temp_index.length;i++){
        this.index_tempar.push(this.temp_index[i]);
      }
    }
      this.index_tempar.push(this.Vehicle_list[id]);
      
      this.unchecked_vehicle=true;

this.show_vehicle();

    }
  }

  
  selectcheck(vehicleid: any, ind: any, event: any,VehicleNo:any) {
    this.unchecked_vehicle=false;
    this.MouseHover_value='click';
    this.mousehover_show=true;
   
    // event.target.checked =true;
    // this.temp_index=[];
    if (event.target.checked == true) {
      this.Vehicle_list[VehicleNo].Checked=true;
      // UP77AN3965
      
      var indextype = this.Vehicle_list[VehicleNo];
      // this.temp_index.push(indextype);
      // for (var i = 0; i < this.data1.length; i++) {
      //   if (this.data1[i]?.VehicleId == vehicleid) {
      //     this.data1[i].checked=true;
      //     var indextype = this.data1[i];
      //     this.temp_index.push(indextype);
      //   }
      // }
  
    }
    else {
      this.Vehicle_list[VehicleNo].Checked=false;
      // var geo_listvalue1 = this.Vehicle_list[VehicleNo];
      // for (var i = 0; i <= this.temp_index.length; i++) {
      //   if (this.temp_index[i]?.VehicleId == geo_listvalue1.VehicleId) {
      //     this.temp_index.splice(i, 1);
      //   }
      // }
    

    }
      this.temp_index=[];
      for (var i = 0; i <= this.data1.length; i++) {
          if (this.data1[i]?.Checked == true) {
            // this.temp_index.splice(i, 1);
            this.temp_index.push(this.data1[i]);
          }
        }
  }
  toggleDisplaymarkerDivIf() {
    this.isShowmarkerDivIf = false;
    // this.popup=1;
  }
  // checkRender = () =>{
  // }
  myTrackByFunction(index, head) {
    return head.Checked; // or item.id, if your image has an ID
   
  }
  
  
  updateImage(Index: any) {
    this.SpinnerService.show();
   
   
    // Index.preventDefault();
    this.updateallImage();

    for (var i = 0; i < this.images.length; i++) {

      if (this.images[i] == this.images[Index]) {
        this.images[Index].status = 1;
      }


    }

    this.SpinnerService.hide();
  }

  updateallImage() {

    for (var i = 0; i < this.images.length; i++) {

      this.images[i].status = 0;

    }


  }

  onsearch_latlng(){
    let input = (document.getElementsByName('latlng-search') as any)[0].value;
    this.store_latlng.push(input);
    this.latlngbounds_latlng = new google.maps.LatLngBounds();
    this.polygonCoords1_latlng = new Array();
    for (var z = 0; z < this.store_latlng.length; z++) {
      var coord2 = this.store_latlng[z].split(",");
      //alert("lat="+parseFloat(coord2[0])+"lng="+parseFloat(coord2[1]));
      this.polygonCoords1_latlng = new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]));

      this.latlngbounds_latlng.extend(new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1])));
    }
    var marker1 = new google.maps.Marker({
      position: this.polygonCoords1_latlng,
      draggable: false,
      map: this.maps,
      maxZoom: 25,
      });
    // this.temp_markerarray.push(marker1);
    marker1.setMap(this.maps);
    let infoWindow = new google.maps.InfoWindow({
      // content: "Click the map to get Lat/Lng!",
      position: marker1.position,
    });
  
      // Close the current InfoWindow.
      // infoWindow.close();
  
      // Create a new InfoWindow.
      infoWindow = new google.maps.InfoWindow({
        position: marker1.position,
      });
      infoWindow.setContent(
        input
      );
      
      infoWindow.open(this.maps);
  }

  onsearch(){
    this.data1=this.data4;
      let input = (document.getElementsByName('searchBar') as any)[0].value;
    // input.click();
      if(input!==''){
      let filteredNames = this.data1.filter((e => Object.values(e).map(e => String(e)).some(e => e.toLowerCase().includes(input.toLowerCase()))));
      
      // this.store_data10_store=[];

      this.data1=filteredNames;
      }else{
        this.header_values();
      }
     }

  animationState = 'out';

  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
    }
  }
  toggleMe() {
    this.showMe = !this.showMe;
  }
  toggles(){
    if(this.show==true){

      this.show=false;
    }
  }
  // onDateSelect(event: { year: any; month: string | number; day: string | number; }) {
  //   let year = event.year;
  //   let month = event.month <= 9 ? '0' + event.month : event.month;;
  //   let day = event.day <= 9 ? '0' + event.day : event.day;;
  //   let finalDate = year + "-" + month + "-" + day;
  //   this.date = finalDate
  // }

  // toDate(event: { year: any; month: string | number; day: string | number; }) {
  //   let year = event.year;
  //   let month = event.month <= 9 ? '0' + event.month : event.month;;
  //   let day = event.day <= 9 ? '0' + event.day : event.day;;
  //   let finalDate = year + "-" + month + "-" + day;
  //   this.todate = finalDate
  // }
  selectall(event: any) {
    if (event.checked === true) {
      for (let i = 0; i < this.TableHeadData.length; i++) {
        this.TableHeadData[i].checked = true;
      }
      this.selecttext = "Deselect All";
    } else {
      for (let i = 0; i < this.TableHeadData.length; i++) {
        this.TableHeadData[i].checked = false;
      }
      this.selecttext = "Select All"
    }
  }
  openTableHeaderSetting(tableHeadermodal1: any) {
    this.modalService.open(tableHeadermodal1);
  }
  onSubmit() {
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }
  region(vehicleid: any, vehicleno: any, ImeiNo: any) {

    this.MouseHover_value='click';
    this.mousehover_show=true;
    this.s_play=false;
    this.range_toggle=0;
    this.vehicleid='';
    this.vehicleid=vehicleid;
    var tem_array;
    // this.Vehicle_list[vehicleno].checked=true;
    var indextype = this.Vehicle_list[vehicleno];
    this.temp_index=[];
    this.temp_index.push(indextype);
   
    if(indextype.Temperature==undefined){
      this.Temperature='';
    
    }else{
      this.Temperature=indextype.Temperature;
      this.Temperature_string='Temperature';
    }
    if(indextype.DriverName==''){
      this.DriverName='--';
    
    }else{
      this.DriverName=indextype.DriverName;
    }
if(indextype.DeliveryDoor==undefined){
  this.DeliveryDoor_track='';
}else{
  if(indextype.DeliveryDoor==''){
    this.DeliveryDoor_track='--';
  
  }else{
    this.DeliveryDoor_track=indextype.DeliveryDoor;
    this.DeliveryDoor_value_1='DeliveryDoor';
  }
}

if(indextype.MainHoleDoor==undefined){
  this.MainHoleDoor_track='';
}else{
    if(indextype.MainHoleDoor==''){
      this.MainHoleDoor_track='--';
    
    }else{
      this.MainHoleDoor_track=indextype.MainHoleDoor;
      this.MainHoleDoor_values_1='MainHoleDoor';
    }
  }
// this.Map_info[i].DeliveryDoor ,this.Map_info[i].MainHoleDoor
    // for (var i = 0; i < this.data1.length; i++) {
    //   if (this.data1[i]?.VehicleId == vehicleid) {
    //     var indextype = this.data1[i];
        tem_array = indextype;
        this.current1 = tem_array;
        
        this.vehicle_id = tem_array.VehicleId;
        this.imeino = ImeiNo;
     
        this.vehicleno = vehicleno;
        this.vehicle_id='';
    this.IMEINO='';

      this.vehicle_id= vehicleid;
      this.IMEINO=ImeiNo;
      
    //   }

    // }

  }
  region1(eve: any) {


  }

  getValue(event: Event) {

  }
  Routelist() {
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    this.service.Route_list(formData).subscribe((res: any) => {

      if (res.Status == "Failed") {
        // alert("p");
        localStorage.removeItem('AccessToken');
         this.router.navigate(['/auth/login']);
      }
      else {
        this.Routedetail_list = res.Data;
        
      }
    })
  }
  Route_change(id: any, event: any) {
    if (event.target.checked == true) {
      for (var i = 0; i < this.Routedetail_list.length; i++) {
        if (this.Routedetail_list[i]?.PolylineId == id) {
          this.polyline_id.push(this.Routedetail_list[i]);
        }
      }

    }
    else {
      for (var i = 0; i < this.Routedetail_list.length; i++) {
        if (this.Routedetail_list[i]?.PolylineId == id) {
          var poly_listvalue1 = this.Routedetail_list[i];
        }
      }
      //  var poly_listvalue1=this.Landmark_list[id];

      for (var i = 0; i <= this.polyline_id.length; i++) {
        if (this.polyline_id[i]?.PolylineId == poly_listvalue1.PolylineId) {
          this.polyline_id.splice(i, 1);
        }
      }
    }

  }
  polyline_delete(RouteId:any){
    if (confirm('Are you sure you want to delete this?')) {
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    formData.append('PolylineRouteAssignmentId', RouteId);
    this.service.polyline_delete(formData).subscribe((res: any) => {

      if (res.Status == "Failed") {
        // alert("p");
        localStorage.removeItem('AccessToken');
        this.router.navigate(['/auth/login']);
      }
      else {
        var k = res;
        this.Routelist();
      }
    });
  }
  }
  Polyline_list() {
    this.initMap();
    for (var i = 0; i < this.polyline_id.length; i++) {

      var poly_id = this.polyline_id[i]?.PolylineId;
      var formData = new FormData();
      formData.append('AccessToken', localStorage.getItem('AccessToken')!);
      formData.append('PolylineId', poly_id);
      this.service.polyline_path(formData).subscribe((res: any) => {

        if (res.Status == "Failed") {
          // alert("p");
          localStorage.removeItem('AccessToken');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.polyline_details = res.Clusters;
          
          for (var k = 0; k < this.polyline_details.length; k++) {
            this.ClusrerName = 0;
            var ClusterCoords = this.polyline_details[k]?.ClusterCoords;
            this.ClusrerName = this.polyline_details[k]?.ClusrerName;
            var kop = atob(ClusterCoords);
            var coord_test = (((((kop.split('),(')).join(':')).split('(')).join('')).split(')')).join('');
            var coord1 = coord_test.split(":");
            this.latlngbounds_polyline = new google.maps.LatLngBounds();
            this.polygonCoords_polyline = new Array();
            for (var z = 0; z < coord1.length; z++) {
              var coord2 = coord1[z].split(",");
              //alert("lat="+parseFloat(coord2[0])+"lng="+parseFloat(coord2[1]));
              this.polygonCoords_polyline[z] = new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]));
              this.latlngbounds_polyline.extend(new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1])));
            }
            this.addpolylines(this.polygonCoords_polyline);

            //  

          }
          // this.Lanfmarklist();
          // modal.dismiss('Cross click');
        }
      })
    }
  }
  addpolylines(ClusterCoords: any) {

    var poly = new google.maps.Polyline({
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 3,
      path: ClusterCoords,
      PolylineName: this.ClusrerName,
    

    });
    poly.setMap(this.maps);

    // Add a listener for the click event  
    // this.maps.addListener('click', addLatLng); 
    var infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(poly, 'click', (event) => {
      infowindow.setContent(
        '<table  border=\"0\">'+
  '<tr>'+
  '<td class=\"live_td_css1\" style="font-size: 11px;font-weight: 900;font-family:Roboto;">Polyline Name</td>'+
  '<td width=\"1%\">:</td>'+
  '<td class=\"live_td_css2\"style=" color: blue; white-space: nowrap;font-size: 11px;">'+poly.PolylineName+'</td>'+
  '</tr>'+
  // '<tr>'+
  // '<td class=\"live_td_css1\" style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Name/Contact</td>'+
  // '<td width=\"1%\">:</td>'+
  // '<td class=\"live_td_css2\"style=" color: blue; white-space: nowrap;font-size: 11px;">'+marker.Drivername +'</td>'+
  // '</tr>'+ 
  '</table>'
       );
      //  " <h6>" + poly.PolylineName + "</h6>"
      infowindow.setPosition(event.latLng);
      infowindow.open(this.maps);
    });

  }
  changepassword(){
    this.submite=true;
    if(this.chagePassword.status=="VALID"){
   if( this.chagePassword.value.NewPassword==this.chagePassword.value.RepeatNew){
    var formData = new FormData();
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
  Driverlist() {
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
  
    if(this.groupId!==undefined){
    formData.append('GroupId',  this.groupId);}
    if(this.groupId==undefined){
      formData.append('GroupId','');}
    this.service.Driver_list(formData).subscribe((res: any) => {

      if (res.Status == "Failed") {
        // alert("p");
        // localStorage.removeItem('AccessToken');
        //  this.router.navigate(['/auth/login']);
      }
      else {
        this.Driver_list = res.DriverList;
      
      
      }
    });
  }
  documentWallet(){
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    // formData.append('DriverId', DriverId);
    this.service.documentWallet(formData).subscribe((res: any) => {
    
      if (res.Status == "success") {
        this.documentWallet_list=res.Data;
        
      }
    });
  }
  changetabledata(ind: any, smallsizemodal7:any) {
    this.SpinnerService.show('spinner-8');
    this.driver_id = 0;
    this.driver_id = ind;
    // var DriverId=ind;
    this.Editable_driver = [];
    this.image_driver='';
    // this.SpinnerService.show();
    for (var i = 0; i <= this.Driver_list.length; i++) {
      if (this.Driver_list[i]?.DriverId == this.driver_id) {
        this.Editable_driver = this.Driver_list[i];

        this.image_driver=this.Editable_driver.DriverImage ;
      }
    }
    setTimeout(() => {
    this.fillvalues(smallsizemodal7);},500);
  }
loader(){
  // alert(2)
  // this.SpinnerService.show();
}


  fillvalues(smallsizemodal7:any) {
    
    // this.SpinnerService.show();
    this.Driverupdate.patchValue({
      FirstName: this.Editable_driver.FirstName,
      PrimaryEmail: this.Editable_driver.PrimaryEmail,
      DOB: this.Editable_driver.DOB,
      PrimaryPhone: this.Editable_driver.PrimaryPhone,
      DLIssuingState: this.Editable_driver.DlIssuingState,
      DLNumber: this.Editable_driver.DLNumber,
      DlExpiryDate: this.Editable_driver.DlExpiryDate,
      Gender: this.Editable_driver.Gender,
      Address: this.Editable_driver.Address,
    });
    // this.loader();
    
    this.modalService.open(smallsizemodal7);
    this.SpinnerService.hide('spinner-8');
  }
  editable(id:any,smallsizemodal5:any){
    this.loading=true;
    this.SpinnerService.show('spinner-8');
    this.driver_id = 0;
    this.driver_id = id;
    this.Editable_driver = [];
    for (var i = 0; i <= this.Driver_list.length; i++) {
      if (this.Driver_list[i]?.DriverId == this.driver_id) {
        this.Editable_driver = this.Driver_list[i];
        // DlIssuingState
        // this.DlIssuingState='';
        // this.DlIssuingState=this.Editable_driver.DlIssuingState

      }
    }
    this.Driverupdate.patchValue({
      FirstName: this.Editable_driver.FirstName,
      PrimaryEmail: this.Editable_driver.PrimaryEmail,
      DOB: this.Editable_driver.DOB,
      PrimaryPhone: this.Editable_driver.PrimaryPhone,
      DLIssuingState: this.Editable_driver.DlIssuingState,
      DLNumber: this.Editable_driver.DlNumber,
      DlExpiryDate: this.Editable_driver.DlExpiryDate,
      Gender: this.Editable_driver.Gender,
      Address: this.Editable_driver.Address,
    });
    setTimeout(() => {
    this.modalService.open(smallsizemodal5);
    this.SpinnerService.hide('spinner-8');},500)
  }
  Driver_Addsubmit(){
    this.submite= true;
    if(this.DriverAdd.status=='VALID'){
  //     $("#some_form")[0].reset();
  // return 1;
    this.PrimaryPhone_add = this.DriverAdd.value.PrimaryPhone;
    this.PrimaryEmail_add = this.DriverAdd.value.PrimaryEmail;
    this.Address_driver_add = this.DriverAdd.value.Address;
    this.DLNumber_add = this.DriverAdd.value.DLNumber;
    var DLIssuingState_add = this.DriverAdd.value.DLIssuingState;
    this.DLIssuingState_add = this.datepipe.transform(DLIssuingState_add, 'yyyy-MM-dd');
    var DLExpiryDate_add = this.DriverAdd.value.DLExpiryDate;
    this.DLExpiryDate_add = this.datepipe.transform(DLExpiryDate_add, 'yyyy-MM-dd');
    this.FirstName_add = this.DriverAdd.value.FirstName;
    this.image= this.DriverAdd.value.fileSource;
    this.Gender_add= this.DriverAdd.value.Gender;
    var DOB_add=this.DriverAdd.value.DOB;
    this.DOB_add = this.datepipe.transform(DOB_add, 'yyyy-MM-dd');
    this.Remark_add=this.DriverAdd.value.Remark;
 
  this.Driver_Addsubmit1();
  // this.modalService.dismissAll();

  
    }
    $("#some_form")[0].reset();
    return false;
  }
  Driver_Addsubmit1(){
      var formData = new FormData();
      formData.append('AccessToken', localStorage.getItem('AccessToken')!);
      if(this.groupId!==undefined){
        formData.append('GroupId',  this.groupId);}
        if(this.groupId==undefined){
          formData.append('GroupId','');}
      formData.append('Type', localStorage.getItem('GroupTypeId')!);
      // formData.append('DriverId', this.driver_id);
      formData.append('FirstName', this.FirstName_add);
      formData.append('Gender', this.Gender_add);
      formData.append('DOB', this.DOB_add);
      // formData.append('ZoomLevel',this.geocoord);
      formData.append('PrimaryPhone', this.PrimaryPhone_add);
      formData.append('Address', this.Address_driver_add);
      formData.append('DlNumber', this.DLNumber_add);
      formData.append('PrimaryEmail', this.PrimaryEmail_add);
      formData.append('DlIssuingState', this.DLIssuingState_add);
      formData.append('DlExpiryDate', this.DLExpiryDate_add);
  
      formData.append('Remark', this.Remark_add);
      formData.append('DriverImage', this.image);
      this.service.Add_driver(formData).subscribe((res: any) => {
  
        if (res.Status == "Failed") {
          alert("Somthing went wrong");
          // localStorage.removeItem('AccessToken');
          // this.router.navigate(['/auth/login']);
        }
        else {
          var k = res;
          // this.DriverAdd.reset();
          // this.modalService.dismissAll();
          this.modalReference.close();
          alert("successfully saved!");
         
        }
      })
    }
    // public ImageUrl = "";
  public FileImage : any;

    onFileChange(event : any) {
      if (event.target.files.length > 0) {
        const image= (event.target as HTMLInputElement).files![0];
        this.DriverAdd.patchValue({
          fileSource: image
        });
      var reader = new FileReader();
         reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e:any) => {
         this.imageURL = e.target.result;
        }
      }
      }
      onFileChange_expence(event : any) {
        if (event.target.files.length > 0) {
          const image= (event.target as HTMLInputElement).files![0];
          this.AddExpens.patchValue({
            Photo: image
          });
        var reader = new FileReader();
           reader.readAsDataURL(event.target.files[0]);
          reader.onload = (e:any) => {
           this.imageURL = e.target.result;
          }
        }
        }
      
      event_check(eve:any){

      }
      onFileChange1(event : any) {
    
        if (event.target.files.length > 0) {
          const image= (event.target as HTMLInputElement).files![0];
          this.Driverupdate.patchValue({
            file_edit: image
          });
    
        var reader = new FileReader();
           reader.readAsDataURL(event.target.files[0]);
          reader.onload = (e:any) => {
           this.imageURL = e.target.result;
           this.image_driver='';
           this.Editable_driver.DriverImage= e.target.result;
           
          }
        }
        }
  
    
  Driveredit() {
    var formData = new FormData(); 
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    if(this.groupId!==undefined){
      formData.append('GroupId',  this.groupId);}
      if(this.groupId==undefined){
        formData.append('GroupId','');}
    formData.append('Type', localStorage.getItem('GroupTypeId')!);
    formData.append('DriverId', this.driver_id);
    formData.append('FirstName', this.FirstName);
    formData.append('Gender', this.Gender);
    formData.append('DOB', this.DOB);
    // formData.append('ZoomLevel',this.geocoord);
    formData.append('PrimaryPhone', this.PrimaryPhone);
    formData.append('Address', this.Address);
    formData.append('DlNumber', this.DLNumber);
    formData.append('PrimaryEmail', this.PrimaryEmail);
    formData.append('DlIssuingState', this.DLIssuingState);
    formData.append('DlExpiryDate', this.DLExpiryDate);

    formData.append('Remark', this.Remarks);
    formData.append('DriverImage', this.image_edit);
    this.service.Driver_edit(formData).subscribe((res: any) => {

      if (res.Status == "Failed") {
        // alert("p");
        localStorage.removeItem('AccessToken');
        this.router.navigate(['/auth/login']);
      }
      else {
        var k = res;
      }
    })
  }
  va(){
    $(document).ready( () => {
    $("#datepicker").datetimepicker({
      format: "yyyy/mm/dd hh:ii:ss",
      todayBtn: "linked",
      keyboardNavigation: false,
      forceParse: false,
      autoclose: true,
      // startDate: this.Fromdaydate,
      endDate:   this.myDate1,
      // maxDate:this.myDate1, 
     }
     );
    })
  }
 
  end(){
    this.dateVariable = $("#datepicker").val();

    $(document).ready( () => {
      var dateVariable = $("#datepicker").val();
      
    $("#datepicker1").datetimepicker({
      format: "yyyy/mm/dd hh:ii:ss",
      todayBtn: "linked",
      keyboardNavigation: false,
      // forceParse: false,
      autoclose: true,
      // endDate: this.dateVariable,
       endDate:   this.myDate1,
      // maxDate:this.myDate1,
      // minDate:this.Fromdaydatetimepicker,
     });
    })
  }
  ExpiryDate(){
    $(document).ready( () => {
    $("#DocumentExpiryDate").datepicker({
      format: 'yyyy-mm-dd' ,
     
      "keyboardNavigation": false,
      forceParse: false,
      autoclose: true,
     }
     );
    })
  }
   ExpiryDate1(){
    $(document).ready( () => {
    $("#DocumentExpiryDate1").datepicker({
      format: 'yyyy-mm-dd' ,
     
      autoclose: true,
    }
     );
    })
  }
  IssueDate1(){
    $(document).ready( () => {
    $("#DocumentIssueDate1").datepicker({
      format: 'yyyy-mm-dd' ,
     
      "keyboardNavigation": false,
      forceParse: false,
      autoclose: true,
    }
     );
    })
  }
  IssueDate(){
    $(document).ready( () => {
    $("#DocumentIssueDate").datepicker({
      format: 'yyyy-mm-dd' ,
     
      "keyboardNavigation": false,
      forceParse: false,
      autoclose: true,

     }
     );
    })
  }
  Driver_editsubmit() {
    if(this.Driverupdate.status=='VALID'){
    this.DOB = this.Driverupdate.value.DOB;
 
    var gender = this.Driverupdate.value.Gender;
    if (gender == 'male') {
      this.Gender = 1;
    } else {
      this.Gender = 0;
    }
    this.PrimaryPhone = this.Driverupdate.value.PrimaryPhone;
    this.PrimaryEmail = this.Driverupdate.value.PrimaryEmail;
    this.Address_driver = this.Driverupdate.value.Address_driver;
    this.DLNumber = this.Driverupdate.value.DLNumber;
    this.UserId = this.Driverupdate.value.UserId;
    this.DLIssuingState = this.Driverupdate.value.DLIssuingState;
    this.DLExpiryDate = this.Driverupdate.value.DlExpiryDate;
    this.FirstName = this.Driverupdate.value.FirstName;
    this.image_edit = this.Driverupdate.value.file_edit;
    // this.Remark=this.Driverupdate.value.remark;
    this.Driveredit();
  }
  }
  Driverdelete(DriverId:any) {
    if (confirm('Are you sure you want to delete this?')) {
      var formData = new FormData();
      formData.append('AccessToken', localStorage.getItem('AccessToken')!);
      formData.append('DriverId', DriverId);
      this.service.Driver_delete(formData).subscribe((res: any) => {
  
        if (res.Status == "Failed") {
          // alert("p");
          localStorage.removeItem('AccessToken');
           this.router.navigate(['/auth/login']);
        }
        else {
          var k = res;
          alert("Your changes have been successfully saved!");
          this.Driverlist();
        }
      })
    }
   
  }
  identify(index: number, head: any): number {
    return head.imeino;
  }
  Driverprofile() {
  
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    if(this.groupId!==undefined){
      formData.append('GroupId',  this.groupId);}
      if(this.groupId==undefined){
       }
       
    formData.append('GroupTypeId',this.GroupType);
    formData.append('VehicleNo', this.vehicleno_pop);
    this.service.Driver_profile(formData).subscribe((res: any) => {

      if (res.Status == "failed") {

        this.DriverName='/';
        // localStorage.removeItem('AccessToken');
        //  this.router.navigate(['/auth/login']);
      }
      else {
        // var Driver_list:any=[];
        this.DriverProfile_data = res.DriverData;
     
        this.DriverName= this.DriverProfile_data.DriverName;
      
        if(this.DriverName==''){
          this.DriverName='/';
        
        }else if(this.DriverName==undefined){
          this.DriverName='/';
         
        
        }else{
          this.DriverName=this.DriverProfile_data.FirstName;
        }

      }
    });
  }
  documentation_wallet() {
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    formData.append('VehicleId', this.vehicle_id);


    this.service.documentation_wallet(formData).subscribe((res: any) => {
    
      if (res.Status == "failed") {
        // alert("f");
        // localStorage.removeItem('AccessToken');
        //  this.router.navigate(['/auth/login']); 
      }
      else {
        // var Driver_list:any=[];
        this.Document = res.Data;
      }
    })
  }

  Weather_forcast() {
    var Todate = moment(this.TodateTime).format('DD-MM-YYYY');
    var fromdate = moment(this.FromdateTime).format('DD-MM-YYYY');

    // position.lat()
    var m: any = [];
    m.push(this.latlong1.lat());
    m.push(this.latlong1.lng());
    var coord = m.join(":");
    var coord1 = ((coord.split(':')).join(','));
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    formData.append('FromDate', fromdate);
    formData.append('ToDate', Todate);
    formData.append('LatLong', coord1);

    this.service.Weather_forcast(formData).subscribe((res: any) => {

      if (res.Status == "failed") {
        //  alert("p");
        // localStorage.removeItem('AccessToken');
        //  this.router.navigate(['/auth/login']);
      }
      else {
        // var Driver_list:any=[];
        this.weather = res.PRate;

// alert(this.weather);

      }
    });

  }
  Lanfmarklist() {

    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    this.service.Landmark_list(formData).subscribe((res: any) => {

      if (res.Status == "Failed") {
        // alert("p");
        // localStorage.removeItem('AccessToken');
        //  this.router.navigate(['/auth/login']);
      }
      else {
        this.Landmark_list = res.LandmarkList;
      
        
      }
    });
  }
  landmark_viewall_map(){
    if (this.check_value_Map == false) {
      this.check_value_Map=true;
      this.Landmark_listvalue=[];
    this.Landmark_listvalue =this.Landmark_list;
    this.view_Landmark_map1();

    } else {
      this.check_value_Map=false;
      this.Landmark_listvalue=[];
      // this.Landmark_listvalue  =this.Landmark_list;
      this.view_Landmark_map();
      for(var i=0;i<=this.markers_store.length;i++){
        this.markers_store[i]?.setMap(null);
        // this.markers_store[i].setVisible(false);
      }
      
      

    }
    
  }
  view_Landmark_map() {
    this.initMap();
    this.store_Landmark = [];
    if (this.Landmark_listvalue == 0) {
    } else {
      this.Landmark_name = 0;
      var store_Landmarkname: any = [];
      for (var i = 0; i < this.Landmark_listvalue.length; i++) {
        var latlng4 = this.Landmark_listvalue[i]?.LandmarkGeoCoord;
        var Landmark_name = this.Landmark_listvalue[i]?.LandmarkName;
        store_Landmarkname.push(Landmark_name);
        this.store_Landmark.push(latlng4);
      }
      this.latlngbounds = new google.maps.LatLngBounds();
      this.polygonCoords2 = new Array();
      for (var z = 0; z < this.store_Landmark.length; z++) {
        var coord2 = this.store_Landmark[z].split(",");
        this.polygonCoords2[z] = new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]));
        this.latlngbounds.extend(this.polygonCoords2[z]);
        new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]))
      } 
     
      for (var v = 0; v < this.polygonCoords2.length; v++) {
        var location = this.polygonCoords2[v];
        this.Landmark_name = store_Landmarkname[v];
        this.addMarkerLandmark_map(location);
      }
    }
  }
  addMarkerLandmark_map(location: any) {
    // const image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    const image ='assets/images/users/landmark_star.png';
    this.marker_landmark = new google.maps.Marker({
      position: location,
      icon: image,
      map: this.maps,
      draggable: true,
      LandmarkName: this.Landmark_name,
    });
   
this.markers_store.push(this.marker_landmark);
    this.marker_landmark.setMap(this.maps);
    this.maps.fitBounds(this.latlngbounds);

    var infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(this.marker_landmark, 'click', (event) => {
      infowindow.setContent(" <span>" +  this.marker_landmark.position+"</span>");
      //  this.marker_landmark.LandmarkName
      infowindow.setPosition(event.latLng);
      infowindow.open(this.maps);
    });
    var selt = this;

  }

  view_Landmark_map1() {
    this.store_Landmark = [];
    if (this.Landmark_listvalue == 0) {
    } else {
      this.Landmark_name = 0;
      var store_Landmarkname: any = [];
      for (var i = 0; i < this.Landmark_listvalue.length; i++) {
        var latlng4 = this.Landmark_listvalue[i]?.LandmarkGeoCoord;
        var Landmark_name = this.Landmark_listvalue[i]?.LandmarkName;
        store_Landmarkname.push(Landmark_name);
        this.store_Landmark.push(latlng4);
      }
      this.latlngbounds = new google.maps.LatLngBounds();
      this.polygonCoords2 = new Array();
      
      for (var z = 0; z < this.store_Landmark.length; z++) {
        var coord2 = this.store_Landmark[z].split(",");
        this.polygonCoords2[z] = new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]));
        this.latlngbounds.extend(this.polygonCoords2[z]);
        new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]))
      }
    
      for (var v = 0; v < this.polygonCoords2.length; v++) {
        var location = this.polygonCoords2[v];
        this.Landmark_name = store_Landmarkname[v];
        this.addMarkerLandmark_map1(location);
      }
    }
  }
  addMarkerLandmark_map1(location: any) {
    this.marker_landmark=[];
    const image ='assets/images/users/landmark_star.png';
    // const image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    var marker_landmark = new google.maps.Marker({
      position: location,
      icon: image,
      map: this.maps,
      draggable: true,
      LandmarkName: this.Landmark_name,
    });
   
this.markers_store.push(marker_landmark);
    marker_landmark.setMap(this.maps);
    // this.maps.fitBounds(this.latlngbounds);

    var infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker_landmark, 'click', (event) => {
      infowindow.setContent(" <h6>" + marker_landmark.LandmarkName + "</h6>");
      infowindow.setPosition(event.latLng);
      infowindow.open(this.maps);
    });
    var selt = this;

  }

  Landmark_change(LandmarkId: any, event: any) {
    // var geo_listvalue:any=[];
    this.tem_landmark=[]
    for(var k=0;k<this.Landmark_list.length;k++){
      if(this.Landmark_list[k]?.LandmarkId==LandmarkId){
        if (event.target.checked == true) {
          // this.tem_landmark.push(this.Landmark_list[k]);
          this.Landmark_listvalue.push(this.Landmark_list[k]);
        }
        else {
          var geo_listvalue1 = this.Landmark_list[k];
    
          for (var i = 0; i <= this.Landmark_listvalue.length; i++) {
            if (this.Landmark_listvalue[i]?.LandmarkId == geo_listvalue1.LandmarkId) {
              this.Landmark_listvalue.splice(i, 1);
              for(var f=0;f<=this.marker_landmark_store.length;f++){
                if(geo_listvalue1.LandmarkId==this.marker_landmark_store[f]?.LandmarkId){
                  this.marker_landmark_store[f].setMap(null);
                }
              }
             
            }
          }
        }
      }
    }
   
  }
  single_landmark(LandmarkId:any){

    this.Landmark_listvalue1=[];
    if(this.marker_landmark_store.length!==0){
      for(var i=0;i<this.marker_landmark_store.length;i++){
   
        this.marker_landmark_store[i].setMap(null);
      }
    }
    for(var k=0;k<this.Landmark_list.length;k++){
      
      if(this.Landmark_list[k]?.LandmarkId==LandmarkId){
       
          // this.tem_landmark.push(this.Landmark_list[k]);
          this.Landmark_listvalue1.push(this.Landmark_list[k]);
      
      }
    }
    this.Landmark_name = 0;
    var store_Landmarkname: any = [];
    this.LandmarkId=[];
    var LandmarkId_store:any=[];
   this. store_Landmark=[];
   
    // for (var i = 0; i < this.Landmark_listvalue1.length; i++) {
      
      var latlng4 = this.Landmark_listvalue1[0]?.LandmarkGeoCoord;
      var LandmarkId =  this.Landmark_listvalue1[0]?.LandmarkId;
      LandmarkId_store.push(LandmarkId);
      var Landmark_name = this.Landmark_listvalue1[0]?.LandmarkName;
      store_Landmarkname.push(Landmark_name);
      this.store_Landmark.push(latlng4);
    // }
    this.latlngbounds = new google.maps.LatLngBounds();
    this.polygonCoords2 =[];
    this.polygonCoords2 = new Array();
    for (var z = 0; z < this.store_Landmark.length; z++) {
      var coord2 = this.store_Landmark[z].split(",");
      this.polygonCoords2[z] = new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]));
      this.latlngbounds.extend(this.polygonCoords2[z]);
      new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]))
    }
    // this.initMap();
    for (var v = 0; v < this.polygonCoords2.length; v++) {
      this.Landmark_name='';
      this.LandmarkId='';
      var location = this.polygonCoords2[v];
      this.Landmark_name = store_Landmarkname[v];
      this.LandmarkId= LandmarkId_store[v];
      
      this.addMarkerLandmark(location); 
    }
  }
  
  view_Landmark() {
    
    if(this.marker_landmark_store.length!==0){
    for(var i=0;i<this.marker_landmark_store.length;i++){
      this.marker_landmark_store[i].setMap(null);
    }
  }
    this.store_Landmark = [];

    if (this.Landmark_listvalue == 0) {
    } else {
      this.Landmark_name = 0;
      var store_Landmarkname: any = [];
      this.LandmarkId=[];
      var LandmarkId_store:any=[];
      for (var i = 0; i < this.Landmark_listvalue.length; i++) {
        var latlng4 = this.Landmark_listvalue[i]?.LandmarkGeoCoord;
        var LandmarkId =  this.Landmark_listvalue[i]?.LandmarkId;
        LandmarkId_store.push(LandmarkId);
        var Landmark_name = this.Landmark_listvalue[i]?.LandmarkName;
        store_Landmarkname.push(Landmark_name);
        this.store_Landmark.push(latlng4);
      }
      this.latlngbounds = new google.maps.LatLngBounds();
      this.polygonCoords2 = new Array();
      for (var z = 0; z < this.store_Landmark.length; z++) {
        var coord2 = this.store_Landmark[z].split(",");
        this.polygonCoords2[z] = new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]));
        this.latlngbounds.extend(this.polygonCoords2[z]);
        new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]))
      }
      this.initMap();
      for (var v = 0; v < this.polygonCoords2.length; v++) {
        this.Landmark_name='';
        this.LandmarkId='';
        var location = this.polygonCoords2[v];
        this.Landmark_name = store_Landmarkname[v];
        this.LandmarkId= LandmarkId_store[v];
        this.addMarkerLandmark(location); 
      }
    }
  }
  addMarkerLandmark(location: any) {
    this.marker_landmark=[];
    const image ='assets/images/users/landmark_star.png';
    // const image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  var marker_landmark = new google.maps.Marker({
      position: location,
      icon: image,
      map: this.maps,
      draggable: true,
      LandmarkName: this.Landmark_name,
      LandmarkId:this.LandmarkId,
    });
    this.marker_landmark_store.push(marker_landmark);
    marker_landmark.setMap(this.maps);
    
    this.maps.fitBounds(this.latlngbounds);
    var listener = google.maps.event.addListener(this.maps, "idle", () => { 
      if (this.maps.getZoom() > 14) this.maps.setZoom(14); 
      google.maps.event.removeListener(listener); 
    });
    var infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker_landmark, 'click', (event) => {
      infowindow.setContent(
      '<div id="content" >'+  
      '<div id="siteNotice">'+
      '<table>'+
      '<tbody>'+
    
    '<tr>'+
      '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Landmark Name</td>'+
      '<td style="width:1%;color: blue;">:</td>'+
      '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ marker_landmark.LandmarkName +'</td>'+
    '</tr>'+
    '<tr>'+
      '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Lat Lng</td>'+
      '<td style="width:1%;color: blue;">:</td>'+
      '<td style=" color: blue; white-space: nowrap;font-size: 11px;">'+ marker_landmark.position +'</td>'+
    '</tr>'+
    '</tbody>'+
    '</table>'+
    '</div>');
      infowindow.setPosition(event.latLng);
      infowindow.open(this.maps);
    });
    var selt = this;

  }



  Landmaradd() {
    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.MARKER,
          // google.maps.drawing.OverlayType.CIRCLE,

        ],
      },
     
      markerOptions: {
        // icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        icon:'assets/images/users/landmark_star.png',
        // icon : "assets/images/brand/favicon.png",
        draggable: true,
      },
      circleOptions: {
        fillColor: '#ffff00',
        fillOpacity: 1,
        strokeWeight: 5,
        clickable: false,
        editable: true,
        draggable: true,
        zIndex: 1,
      },
    });

    drawingManager.setMap(this.maps);
    // google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {

    // });
    
    google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
      // Polygon drawn
      drawingManager.setDrawingMode(null);
      if (event.type === google.maps.drawing.OverlayType.MARKER) {
        this.overlayClickListener1(event.overlay);
        this.deletelandmark_map=event.overlay;
        //this is the coordinate, you can assign it to a variable or pass into another function.
        var m: any = [];
        m.push(event.overlay.position.lat());
        m.push(event.overlay.position.lng());
        var coord = m.join(":");
        var coord1 = ((coord.split(':')).join(','));
        this.Landmark_geocoord = coord1;

        this.open1();
      }
    });
    google.maps.event.addListener(drawingManager, 'rightclick', function (event) {

    });
    google.maps.event.addListener(this.maps, 'click',  (event) => {
      this.deletelandmark_map.setMap(null);
      this.deletelandmark_map=[];
      drawingManager.setMap(null);
    });
    // drawingManager.setMap(this.maps);
    // var selt=this;
    // google.maps.event.addListener(drawingManager, "rightclick", function(event) {
    //   /* do something on right click */
    //   // selt.open2();
    //   selt.open1();
    //  
    // });
  }
  Submit_landmark() {
    this.submite= true;
  if(this.Landmark.status=="VALID"){
    this.Name = this.Landmark.value.Name;
    this.Type = this.Landmark.value.Type;
    this.Zoom = this.Landmark.value.Zoom;
    this.Distance_va = this.Landmark.value.Distance;
    this.Remarks = this.Landmark.value.Remarks;
    this.add_landmark( );
    this.close1();
    this.submite= false;
  
  }
  }
  
  add_landmark() {
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    // formData.append('LandmarkTypeId', '99');
    formData.append('LandmarkTypeId', this.Type );
    formData.append('LandmarkName', this.Name);
    formData.append('LandmarkGeoCoord', this.Landmark_geocoord);
    formData.append('ZoomLevel', this.Zoom);
    formData.append('DistanceVariable', this.Distance_va);
    // formData.append('ZoomLevel',this.geocoord);
    formData.append('Remark', this.Remarks);
    this.service.Landmark_add(formData).subscribe((res: any) => {

      if (res.Status == "Failed") {
        // alert("p");
        localStorage.removeItem('AccessToken');
        this.router.navigate(['/auth/login']);
      }
     
      else {
        var k = res;
        alert("Your landmark successfully saved!");
       
        this.Lanfmarklist();
        this.close1();
      }
    })
  }

  Landmark_edit(LandmarkId: any) {
   
    var values: any = [];
    this.store_edit = [];
    this.LandmarkId=[];
    var LandmarkId_store:any=[];
   var  store_Landmarkname:any=[];
   for(var k=0;k<this.Landmark_list.length;k++){
    if(this.Landmark_list[k]?.LandmarkId==LandmarkId){

   this.Landmark_values=this.Landmark_list[k];
   values.push(this.Landmark_list[k]);
this.values_landmark=values[0].LandmarkTypeId;

    for (var i = 0; i < values.length; i++) {
      var latlng4 = values[i]?.LandmarkGeoCoord;
      var LandmarkId = values[i]?.LandmarkId;
      LandmarkId_store.push(LandmarkId);
      var Landmark_name = values[i]?.LandmarkName;
      store_Landmarkname.push(Landmark_name);
      // this.store_Landmark.push(latlng4);
      this.store_edit.push(latlng4);
    }
    this.latlngbounds = new google.maps.LatLngBounds();
    this.polygonCoords3 = new Array();
    for (var z = 0; z < this.store_edit.length; z++) {
      var coord2 = this.store_edit[z].split(",");
     
      this.polygonCoords3[z] = new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1]));
      this.latlngbounds.extend(new google.maps.LatLng(parseFloat(coord2[0]), parseFloat(coord2[1])));
    }
  
    var selt = this;
    for (var v = 0; v < this.polygonCoords3.length; v++) {
      var location = this.polygonCoords3[v];
      this.Landmark_name = store_Landmarkname[v];
      this.LandmarkId= LandmarkId_store[v];
      // this.addMarkerLandmark(location);

      this.marker_landmark=[];
      const image ='assets/images/users/landmark_star.png';
      // const image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    var marker_landmark = new google.maps.Marker({
        position: location,
        icon: image,
        map: this.maps,
        draggable: true,
        LandmarkName: this.Landmark_name,
        LandmarkId:this.LandmarkId,
      });
      this.marker_landmark_store.push( marker_landmark);
      marker_landmark.setMap(this.maps);
      
      this.maps.fitBounds(this.latlngbounds);
  
      // var infowindow = new google.maps.InfoWindow();
  
      google.maps.event.addListener(marker_landmark, 'click', (event) => {
        // function getmarker() {
          var coordinates_poly = marker_landmark.position;
          var m: any = [];
          m.push(coordinates_poly.lat());
          m.push(coordinates_poly.lng());
          var coord = m.join(":");
          var coord1 = ((coord.split(':')).join(','));
  
          selt.Landmark_geocoord = coord1;
          // this.Landmarkupdate.patchValue({
          //   Type: this.Landmark_values.title,
          //   // Zoom: this.Landmark_values.PrimaryEmail,
          //   // Distance: this.Landmark_values.DOB,
           
          // });
         
          selt.open2();
  
        // }
       
    
  

      // google.maps.event.addListener(this.marker_landmark_store, "click", getmarker);

      // function getmarker() {
      //   var coordinates_poly = selt.marker_landmark.position;
      //   var m: any = [];
      //   m.push(coordinates_poly.lat());
      //   m.push(coordinates_poly.lng());
      //   var coord = m.join(":");
      //   var coord1 = ((coord.split(':')).join(','));

      //   selt.Landmark_geocoord = coord1;
      //   selt.open2();

      // }

    });
  }

}
}
// for(var m=0;m<=this.Zoom_level1.length;m++){
//   if(this.Landmark_values.ZoomLevel==this.Zoom_level1[m]){
//     alert("pppp");
//    }
// }
  }
  Submit_Updated() {
    //  this. Landmarkupdate
    //  this.LandmarkId=this.Landmarkupdate.value.id;
    this.submite=true;
    if(this.Landmarkupdate.status=="VALID"){
      
      this.Type= this.Landmarkupdate.value.Type;

    // for(var i=0;i<this.Landmark_converted.length;i++){
    //   if(this.Landmark_converted[i].title==type_landmark){
  
    //     this.Type= this.Landmark_converted[i].id;
    //   }
    // }
   
    this.Zoom = this.Landmarkupdate.value.Zoom;
    this.Distance_va = this.Landmarkupdate.value.Distance;
    this.Remarks = this.Landmarkupdate.value.Remarks;
    this.Landmark_update();
     this.close2();
     this.submite=false;
     this.Landmarkupdate;
  }
  }
  Landmark_update() {
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    formData.append('LandmarkTypeId', this.Type);
    formData.append('LandmarkId', this.LandmarkId);
    formData.append('LandmarkGeoCoord', this.Landmark_geocoord);
    formData.append('ZoomLevel', this.Zoom);
    formData.append('DistanceVariable', this.Distance_va);
    // formData.append('ZoomLevel',this.geocoord);
    formData.append('Remark', this.Remarks);
    this.service.Landmark_update(formData).subscribe((res: any) => {

      if (res.Status == "Failed") {
        
        localStorage.removeItem('AccessToken');
        this.router.navigate(['/auth/login']);
      }
      else {
        var k = res;
       
        alert("Your changes have been successfully saved!");
        this.Lanfmarklist();
        this.close2();
      }
    })
  }
  Landmark_delete(LandmarkId: any) {
    // alert("Are you sure want to delete");
    if (confirm('Are you sure you want to delete this?')) {
        this.LandmarkId = LandmarkId;
      var formData = new FormData();
      formData.append('AccessToken', localStorage.getItem('AccessToken')!);
      formData.append('LandmarkId', this.LandmarkId);
      this.service.Landmark_delete(formData).subscribe((res: any) => {
  
        if (res.Status == "Failed") {
          
          localStorage.removeItem('AccessToken');
          this.router.navigate(['/auth/login']);
        }
        else {
          var k = res;
          this.Lanfmarklist();
          // modal.dismiss('Cross click');
        }
      })
 }

  }
  changeZoom($event) { }
  changeType($event) { }
  changeName1($event) { }
  onSelectAll() {
    if (this.check_value == false) {
      this.check_value = true;
      this.temp_index = this.data1;
      for (var i = 0; i < this.data1.length; i++) {
          this.data1[i].Checked=true;
        
        }

    } else {
      this.check_value = false;
      for (var i = 0; i < this.data1.length; i++) {
        this.data1[i].Checked=false;
      }
      this.temp_index = [];

    }
  }
  
  cancel() {
   
    // $(".smallsizemodal8 input").val("");
    // $(".smallsizemodal8 select").val("").end();
    // alert(55);
    // this.deletelandmark_map.setMap(null);
  }
  // en() {
  //   this.isDisabled = false;
  //   this.Driverupdate = new FormGroup({

  //     DOB: new FormControl({ value: '', disabled: this.isDisabled },),
  //     Gender: new FormControl({ value: '', disabled: this.isDisabled },),
  //     PrimaryPhone: new FormControl({ value: '', disabled: this.isDisabled },),
  //     PrimaryEmail: new FormControl({ value: '', disabled: this.isDisabled },),
  //     UserId: new FormControl({ value: '', disabled: this.isDisabled },),
  //     Address: new FormControl({ value: '', disabled: this.isDisabled },),
  //     DLNumber: new FormControl({ value: '', disabled: this.isDisabled },),
  //     DLIssuingState: new FormControl({ value: '', disabled: this.isDisabled },),
  //     DlExpiryDate: new FormControl({ value: '', disabled: this.isDisabled },),
  //     FirstName: new FormControl({ value: '', disabled: this.isDisabled },),
  //   });
  // }
  vvv() {
    this.isDisabled = false;
  }
  enablee(smallsizemodal5:any) {
    this.isDisabled = false;
    // this.en();
    this.fillvalues(smallsizemodal5);
    // this.Driverupdate.controls['FirstName'].enable();
    // this.ngOnInit();
    // this.Driverupdate.controls.DOB.status='ENABLED'
  }
  enablefalse() {
    this.isDisabled = true;
    // this.en();
    this.Driver_editsubmit();
    this.Driveredit();


  }
  exportAsExcelFile1(json: any[], excelFileName: string){
for(var v=0;v<=this.geo_list.length;v++){
  this.geolist_excel.push({GeoId: this.geo_list[v]?.GeoId,GeoName: this.geo_list[v]?.GeoName , Remark: this.geo_list[v]?.Remark});
}
this.exportAsExcelFile(this.geolist_excel,excelFileName);

  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    //debugger;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
    
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }
  add_polylines(){
    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYLINE,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYLINE
          // google.maps.drawing.OverlayType.POLYGON,
        ],
      },
      polylineOptions: {
        strokeColor: '#ff0000',
        strokeOpacity: 1,
        strokeWeight: 3,
        zIndex: 1,
        editable: true,
      }

    });
    drawingManager.setMap(this.maps);
    var polylinecoord:any=[];
    this.drawingManager_segment.push(drawingManager.drawingModes);
    google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
      this.cursor_polyline=event.overlay;
      
      if (event.type === google.maps.drawing.OverlayType.POLYLINE) {
         polylinecoord = event.overlay.getPath().getArray();
        var coord1 = polylinecoord.join(":");
        var coord = ((coord1.split(':')).join(','));;
        this.polylinecoord = coord;
        drawingManager.setMap(null);
        this.open4();
      }
    });
    google.maps.event.addListener(drawingManager, "click", (event) => {
      this.cursor_polyline.setMap(null);
    });
    google.maps.event.addListener(this.maps, "click", (event) => {
      this.cursor_polyline.setMap(null);
    })
  }
  Submit_segment(){
    this.StoppageTime_segment= $('.timepicker').val();
    this.TimeTaken_segment = $('.timepicker1').val();

    this.submite=true;
    this.valid_segment=this.segments.status;
    if(this.valid_segment=='VALID' && this.TimeTaken_segment!==''&& this.StoppageTime_segment!==''){
    this.Name_segment = this.segments.value.Name;
    this.SpeedLimit_segment = this.segments.value.SpeedLimit;
    var AuthorizedStoppage_segment = this.segments.value.AuthorizedStoppage;
    var StoppageTime_segment = this.segments.value.StoppageTime;
    var TimeTaken_segment = this.segments.value.TimeTaken;
    this.ColorCode_segment = this.segments.value.color1;
    this.Distance_segment = this.segments.value.Distance;
    this.Remarks_segment = this.segments.value.Remarks;
    this.RouteId_polyline=this.segments.value.RouteId;
    this.AuthorizedStoppage_segment=AuthorizedStoppage_segment.id;
    // this.StoppageTime_segment=StoppageTime_segment.title;
    // this.TimeTaken_segment= TimeTaken_segment.title;
    
    // this.SegmentIds_union=this.Name_segment;
    this.Code_union=this.Name_segment;
    this.Remark_union= this.Remarks_segment;
    this.Name_union=this.Name_segment;

    // this.code_polyline =this.Name_segment;
    this.Remark_polyline =this.Name_segment;
    this.segment();
    this.submite=false;
   
   
    
    // this.open5()
    
  }
}
  segment(){
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    formData.append('CoOrdinates', this.polylinecoord);
    formData.append('Name', this.Name_segment);
    formData.append('ColorCode', this.color1);
    formData.append('StoppageTime', this.StoppageTime_segment);
    formData.append('SpeedLimit', this.SpeedLimit_segment);
    formData.append('TimeTaken',this.TimeTaken_segment);
    formData.append('AuthorizedStoppage', this.AuthorizedStoppage_segment);
    formData.append('Distance',this.Distance_segment);
    formData.append('Remark', this.Remarks_segment);
    this.service.segment(formData).subscribe((res: any) => {

      if (res.Status == "Failed") {
        // alert("p");
        localStorage.removeItem('AccessToken');
        this.router.navigate(['/auth/login']);
      }
      else{
         this.Segment_converted=[];
         this. segment_list();
        //   
      }
    }); 
  }
  segment_list(){
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    this.service.segment_list(formData).subscribe((res: any) => {
    if (res.Status == "Failed") {
      // alert("p");
      localStorage.removeItem('AccessToken');
      this.router.navigate(['/auth/login']);
    }
    else{
       this.Segment_list=res.Segments;
       this.Segment_converted = [];

for (var key in this.Segment_list) {
    if (this.Segment_list.hasOwnProperty(key)) {
        this.Segment_converted.push({id: this.Segment_list[key].id,title: this.Segment_list[key].text });
    }
}
if(this.Name_segment!== undefined){
  var Code_union=this.Name_segment;
  for(var i=0;i<this.Segment_converted.length;i++){
   if(this.Segment_converted[i].title==Code_union){
    this.SegmentIds_union =this.Segment_converted[i].id;
    this.union();
   }
  }
} 

    }

  }); 
  }
  Submit_Union(){
    var Code_union:any=[];
    var codeid:any=[];
    this.valid_form=this.Union_segments.status;
    if(this.valid_form=='VALID'){
    this.Name_union = this.Union_segments.value.Name;
     Code_union = this.Union_segments.value.Code;
    this.Code_union = this.Union_segments.value.SegmentIds;
    this.Remark_union = this.Union_segments.value.Remark;
    for(var i=0;i<Code_union.length;i++){
       codeid.push(Code_union[i].id);
    }
    this.SegmentIds_union=codeid.toString();
    this.union();
    this.open6();
    }
    // 
  }
  union(){
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    formData.append('SegmentIds', this.SegmentIds_union);
    formData.append('Remark', this.Remark_union);
    formData.append('Code', this.Code_union); 
    formData.append('Name', this.Name_union);
    this.service.union(formData).subscribe((res: any) => {
      if (res.Status == "Failed") {
        // alert("p");
        localStorage.removeItem('AccessToken');
        this.router.navigate(['/auth/login']);
      }
      else{
         this.segmentUnion_list();
        //  this.polyline_RouteAssignment();
         
      }
    });
  }
  segmentUnion_list(){
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    this.service.segmentUnion_list(formData).subscribe((res: any) => {
    if (res.Status == "Failed") {
      // alert("p");
      localStorage.removeItem('AccessToken');
      this.router.navigate(['/auth/login']);
    }
    else{
      this.UnionSegments=res.UnionSegments;
      this.Segmentunion_converted = [];
      for (var key in this.UnionSegments) {
        if (this.UnionSegments.hasOwnProperty(key)) {
          this.Segmentunion_converted.push({id: this.UnionSegments[key].Id,title: this.UnionSegments[key].Code }); 
          // this.Segmentunion_converted.push({id: this.UnionSegments[key].id,title: this.UnionSegments[key].code });
        }
      } 
      if(this.Name_segment!== undefined){
        var Code_union=this.Name_segment;
        for(var i=0;i<this.Segmentunion_converted.length;i++){
         if(this.Segmentunion_converted[i].title==Code_union){
          this.code_polyline =this.Segmentunion_converted[i].id;
          // this.union();
          this.polyline_RouteAssignment();
         }
        }
      }
      
    }
  });
  }
  Route_id(){
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    this.service.Route_id(formData).subscribe((res: any) => {
    if (res.Status == "Failed") {
      // alert("p");
      localStorage.removeItem('AccessToken');
      this.router.navigate(['/auth/login']);
    }
    else{
      
      this.Route=res.Routes;
      this.Route_converted = [];
      for (var key in this.Route) {
        if (this.Route.hasOwnProperty(key)) {
          this.Route_converted.push({id: this.Route[key].id,title: this.Route[key].text }); 
          // this.Segmentunion_converted.push({id: this.UnionSegments[key].id,title: this.UnionSegments[key].code });
        }
      } 
    }
  });
  }
  logout(){
    localStorage.removeItem('AccessToken');
    localStorage.clear();
    this.router.navigate(['/auth/login']);            
  }
  Landmark_type(){
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    this.service.Landmark_type(formData).subscribe((res: any) => {
    if (res.Status == "Failed") {
      // alert("p");
      localStorage.removeItem('AccessToken');
      this.router.navigate(['/auth/login']);
    }
    else{
     
      this.Landmarktype=res.LandmarkType;
      this.Landmark_converted = [];
      for (var key in this.Landmarktype) {
        if (this.Landmarktype.hasOwnProperty(key)) {
          this.Landmark_converted.push({id: this.Landmarktype[key].id,title: this.Landmarktype[key].name }); 
        
        }
      } 
    }
  });
  }
  changeText1() {
    
  }

  Submit_polyline(){

    this. RouteId_polyline = this.polyline_segmentsnew.value.RouteId.id;
    this.code_polyline = this.polyline_segmentsnew.value.codes.id;
    this.Remark_polyline = this.polyline_segmentsnew.value.Remark;
   this.polyline_RouteAssignment();
    
  }
  polyline_RouteAssignment(){
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    formData.append('RouteId', this.RouteId_polyline);
    formData.append('Remark', this.Remark_polyline);
    formData.append('UnionSegmentId', this.code_polyline); 
    this.service.polyline_RouteAssignment(formData).subscribe((res: any) => {
      if (res.Status == "Failed") {
        // alert("p");
        localStorage.removeItem('AccessToken');
        this.router.navigate(['/auth/login']);
      }
      else{
        this.modalRef4.close();
        alert("Your Polyline successfully saved!");
      }
    })
  }
 
  table_showReport(){

    setTimeout(() => {
      
    
    $(document).ready( () => {
  
  
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
      {targets : 'no-sort',orderable : false}
      ],
      buttons: 
       [
      {
      extend: 'csv',
      exportOptions: {
        //   messageTop: 'Last Data Report- Date Time:'+this.Fromdaydatetimepicker+'&nbsp;&nbsp; -&nbsp;&nbsp;'+this.myDate1,
        messageTop: 'Track Report :'+this.vehicleno+'('+this.imeino+') (Interval: '+this.interval_value+'sec)',
       columns: ':visible'
      
       },
      title: 'Vehicle report'},
      {
        extend: 'excel',
        footer: true,
        messageTop: 'Track Report :'+this.vehicleno+'('+this.imeino+') (Interval: '+this.interval_value+'sec)',
         exportOptions: {
         columns: ':visible'
        
         },
        title: 'Vehicle report'},
         {
        extend: 'pdf',
        messageTop: 'Track Report :'+this.vehicleno+'('+this.imeino+') (Interval: '+this.interval_value+'sec)',
         orientation: 'landscape',
        pageSize: 'LEGAL',
        footer: true,
        exportOptions: {
        
         columns: ':visible'
        
        },
        title: 'Vehicle report'},
        {
          extend: 'copy',
          text: 'Copy ',
          messageTop: 'Track Report :'+this.vehicleno+'('+this.imeino+') (Interval: '+this.interval_value+'sec)',
          exportOptions: {
              modifier: {
                  page: 'current'
              }
          }
      }
    ]}
        
      );
      });
      
    }, 80);
 
      }
     
      track_report_v1(){

        setTimeout(() => {
            
          
          $(document).ready( () => {
        
        
            var table:any;
           
              table = $('#doctableDocument').DataTable();
            
             
             $(document).ready(function () {
                     $('#doctableDocument').DataTable({
                        pageLength: 10,
                           //fixedHeader: true,
                          scrollX: true,
                          scrollY: true,
              //           scrollCollapse: true,
                         scroller: true,
                        paging: true,
          //             search:false,
                       destroy: true,
                      responsive: true,
           "bPaginate": false,
    "bLengthChange": false,
    "bFilter": true,
    "bInfo": false,
    "bAutoWidth": false,
    "language": {
      search: '',
      searchPlaceholder: 'Search'
  },
                 
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
                           title: 'Document_report'},
                           {
                            extend: 'excel',
                                footer: true,
                                exportOptions: {
                    
                          columns: ':visible'
                    
                                },
                                title: 'Document_report'},
                                {
                                  extend: 'pdf',
                                  orientation: 'landscape',
                                  pageSize: 'LEGAL',
                                  footer: true,
                                  exportOptions: {
                      
                            columns: ':visible'
                      
                                  },
                                  title: 'Document_report'},]}
                        
                    );
           });
            
           
            
            });
            
          },);
      }


      Expence_list_v1(){

        setTimeout(() => {
            
          
          $(document).ready( () => {
        
        
            var table:any;
           
              table = $('#Expence_list').DataTable();
            
             
             $(document).ready(function () {
                     $('#Expence_list').DataTable({
                        pageLength: 10,
                           //fixedHeader: true,
                          scrollX: true,
                          scrollY: true,
              //           scrollCollapse: true,
                         scroller: true,
                        paging: true,
          //             search:false,
                       destroy: true,
                      responsive: true,
           "bPaginate": false,
    "bLengthChange": false,
    "bFilter": true,
    "bInfo": false,
    "bAutoWidth": false,
    "language": {
      search: '',
      searchPlaceholder: 'Search'
  },
                 
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
                           title: 'Document_report'},
                           {
                            extend: 'excel',
                                footer: true,
                                exportOptions: {
                    
                          columns: ':visible'
                    
                                },
                                title: 'Document_report'},
                                {
                                  extend: 'pdf',
                                  orientation: 'landscape',
                                  pageSize: 'LEGAL',
                                  footer: true,
                                  exportOptions: {
                      
                            columns: ':visible'
                      
                                  },
                                  title: 'Document_report'},]}
                        
                    );
           });
            
           
            
            });
            
          },);
      }
      
      AllStatusChange(eve:any){
        if (eve.target.checked == true) {
          for (var i = 0; i < this.documentWallet_list.length; i++) {
           
              this.Document_Id.push(this.documentWallet_list[i]);
           
            if(this.Document_Id.length!==0){
              this.active_doc=false;
             }else{
              this.active_doc=true;
             }
          }
    
        }else{
        
          // for (var i = 0; i < this.Document_Id.length; i++) {
          
              this.Document_Id=[];
        
            if(this.Document_Id.length!==0){
              this.active_doc=false;
             }else{
              this.active_doc=true;
             }
        
          // }
        }
      }
      AllStatusChange_expence(eve:any){
        if (eve.target.checked == true) {
          for (var i = 0; i < this.Expence_list.length; i++) {
           
              this.Expense_Id.push(this.Expence_list[i]);
           
            if(this.Expense_Id.length!==0){
              this.active_expen=false;
             }else{
              this.active_expen=true;
             }
          }
    
        }else{
        
          // for (var i = 0; i < this.Document_Id.length; i++) {
          
              this.Expense_Id=[];
        
            if(this.Expense_Id.length!==0){
              this.active_expen=false;
             }else{
              this.active_expen=true;
             }
        
          // }
        }
      }
      StatusChange(DocId:any,eve:any){
        if (eve.target.checked == true) {
          for (var i = 0; i < this.documentWallet_list.length; i++) {
            if (this.documentWallet_list[i]?.DocumentId == DocId) {
              this.Document_Id.push(this.documentWallet_list[i]);
            }
            if(this.Document_Id.length!==0){
              this.active_doc=false;
             }else{
              this.active_doc=true;
             }
          }
    
        }else{
        
          for (var i = 0; i <= this.Document_Id.length; i++) {
            if (this.Document_Id[i]?.DocumentId == DocId) {
              this.Document_Id.splice(i, 1);
            }
            if(this.Document_Id.length!==0){
              this.active_doc=false;
             }else{
              this.active_doc=true;
             }
            
          }
        }
      }
      StatusChange_expence(DocId:any,eve:any){
        if (eve.target.checked == true) {
          for (var i = 0; i < this.Expence_list.length; i++) {
            if (this.Expence_list[i]?.ExpenseId == DocId) {
              this.Expense_Id.push(this.Expence_list[i]);
            }
            if(this.Expense_Id.length!==0){
              this.active_expen=false;
             }else{
              this.active_expen=true;
             }
          }
    
        }else{
        
          for (var i = 0; i <= this.Expense_Id.length; i++) {
            if (this.Expense_Id[i]?.ExpenseId == DocId) {
              this.Expense_Id.splice(i, 1);
            }
            if(this.Expense_Id.length!==0){
              this.active_expen=false;
             }else{
              this.active_expen=true;
             }
            
          }
        }
      }
      Deactive(status:any){
       
        for(var i=0;i<this.Document_Id.length;i++){
        var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    formData.append('DocumentId', this.Document_Id[i]?.DocumentId);
    formData.append('Status',status);
    // formData.append('UnionSegmentId', this.code_polyline); 
    this.service.documentChangeStatus(formData).subscribe((res: any) => {
   
      if (res.Status == "failed") {
      }
      else{
       
        alert("Updated successfully ");
        this.documentWallet();
      }
    })
  }  
      }
      Deactive_expence(status:any){
      
        for(var i=0;i<this.Expense_Id.length;i++){
        var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    formData.append('ExpenseId', this.Expense_Id[i]?.ExpenseId);
    formData.append('Status',status);
    // formData.append('UnionSegmentId', this.code_polyline); 
    this.service.expenseStatusChange(formData).subscribe((res: any) => {
  
      if (res.Status == "failed") {
      }
      else{
        this.Expense_Id=[];
        if(this.Expense_Id.length!==0){
          this.active_expen=false;
         }else{
          this.active_expen=true;
         }
        alert("Updated successfully ");
        this.myExpenses();
        
      }
    })
  }  
      }
      dropdown_show(){
        this.rotate=true;
        this.show_options=true;
      }
      multioption(eve){
        this.icon_save_con=true;
        this.show_options=false;
        if(eve==1){
          this.rotate=false;
          // this. track_report_v1();
          this.Remindertable();
          this.value_save=1;
          this.icon_save='fa fa-bell';
        }else if(eve==2){
          this.rotate=false;
       
          this.value_save=2;
          this.icon_save='fa-solid fa-wallet';
          this.track_report_v1();
        }else if(eve==4){
          this.rotate=false;
       
          this.value_save=4;
          this.icon_save='fa-solid fa-wallet';
          this.Expence_list_v1();
        }else{
          this.rotate=false;
          this. track_report_v1();
          // this.trip_editsubmit();
          this.value_save=3;
          this.icon_save='fas fa-bus';
        }
       
      }
    
    
      nextpage(){
        for(var k=0;k<this.temp_index.length;k++){
          this.temp_index[k].Checked=false;
        }
        // this.router.navigate(['/maps/Live'], {
        //   state:{ structuredata:this.Vehicle_list, array: 'worldgyan'}
        // })
        if(this.GroupType=='5'||localStorage.getItem('GroupType')=='Dairy'||localStorage.getItem('GroupType')=='dairy'){
      
          // window.open('/maps/Live'); 
          this.router.navigate(['/maps/Live']);
         
          // this.router.navigateByUrl('/maps ');
        }else{
          this.router.navigate(['/maps/LivePage']);
          // window.open('/maps/LivePage'); 
        }
       
      }
      individual_livePage(VehicleNo:any){
        var indextype:any=[];
        indextype = this.Vehicle_list[VehicleNo];
        // for(var k=0;k<this.temp_index.length;k++){
        //   this.temp_index[k].Checked=false;
        // }
        this.router.navigate(['/maps/Live'], {
          state:{ structuredata:indextype, array: 'worldgyan'}
        })
        // window.open('/maps/LivePage'); 
      }
      trip_editsubmit(){
        var k = $("#UserTripDate1").val();
        
       this.date_value = this.datepipe.transform(k, 'yyyy-MM-dd 00:00:00');
   
         if(k==''){
           this.dateVariable=true;
         }else{
           this.dateVariable=false;
         }
         this.submit=true;
        
        //  if(this.AddTrip.status!== "INVALID"&& this.dateVariable==false){
        
          var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    formData.append('DateTime', this.date_value);
    formData.append('Vehicle', this.AddTrip.value.Vehicle);
    formData.append('Source', this.AddTrip.value.Source); 
    formData.append('Destination', this.AddTrip.value.Destination);
    formData.append('Remark', this.AddTrip.value.Remark);
    formData.append('group_id',this.groupId);
    
    this.service.trip_creation(formData).subscribe((res: any) => {
     
      if (res.Status =="success") {
        alert(res.Message);

        // localStorage.removeItem('AccessToken');
        // this.router.navigate(['/auth/login']);
      }
      else{
        //  this.segmentUnion_list();
        //  this.polyline_RouteAssignment();
         
      }
    });
        //  }
       }
       UserexpenceDate(){
    
        $(document).ready( () => {
          $("#ExpenseExpenseDate").datepicker({
            format: 'yyyy-mm-dd' ,
            todayBtn: "linked",
            keyboardNavigation: false,
            forceParse: false,
            autoclose: true,
            
          }
          );
         })
      }
      UserTripDate(){
    
        $(document).ready( () => {
          $("#UserTripDate1").datetimepicker({
            format: "yyyy/mm/dd hh:ii:ss",
            todayBtn: "linked",
            keyboardNavigation: false,
            forceParse: false,
            autoclose: true,
            
          }
          );
         })
      }
      source(eve:any){
      
        var k=eve.split('$$');
       
        var destination:any=[];
        for(var i=0;i<this.Landmark_list.length;i++){
          if(this.Landmark_list[i].LandmarkId!==k[0]){
            destination.push(this.Landmark_list[i]);
          }
        }
        this.destination=destination;
      }
      add_exp(add_ex:any){
        this.UserTripDate();
        this.modalService.open(add_ex);
      }
      add_expence(add_ex:any){
        this.submit_expence=false; this.ExpenseExpenseDate_va=false;
        this.UserexpenceDate();
        this.modalService.open(add_ex, { size: 'sm' });
      }
      Edit_exp(add_ex:any,arr:any){
        this.edit_title=arr.DocumentType;
        this.Hide_Data=true;
        this.Hide_Date_DocNo=true;
        if(arr.DocumentType=='Driving License'){
          this.Hide_Data=true;
          this.Hide_Date_DocNo=true;
        }else if(arr.DocumentType=='Aadhaar Card' || arr.DocumentType=='Pan Card'){
          this.Hide_Data=false;
        }else if(arr.DocumentType=='Bank Passbook' || arr.DocumentType=='Photograph'){
          this.Hide_Date_DocNo=false;
          this.Hide_Data=false;
        }else{
          this.Hide_Data=true;
          this.Hide_Date_DocNo=true;
        }
        this.docedit=arr;
        this.document_Edit.patchValue({
          DNO: arr.DocumentNo,
          Remark:  arr.Remark,});
          this.IssueDate1();
          this.ExpiryDate1();
        this.modalService.open(add_ex,{ size:'s'});
      }
      documentEdit_save(){
      var  DocumentExpiryDate1= $("#DocumentExpiryDate1").val();
       var issu = $("#DocumentIssueDate1").val();

       if(DocumentExpiryDate1==''){
        DocumentExpiryDate1= this.docedit.ExpiryDate
       }
       if(issu==''){
        issu= this.docedit.IssueDate
       }

        if(this.document_Edit.status=="VALID"){
          
          var formData = new FormData();
          formData.append('AccessToken', localStorage.getItem('AccessToken')!);
          if(this.Hide_Date_DocNo){
          formData.append('DocumentId', this.docedit.DocumentId);}
          formData.append('DocumentNo', this.document_Edit.value.DNO);
          if(this.Hide_Data){
          formData.append('IssueDate', issu); 
          formData.append('ExpiryDate', DocumentExpiryDate1);}
          formData.append('Remark',  this.document_Edit.value.Remark);
          formData.append('DocumentFile',  this.document_Edit.value.Dcopy);
  
          this.service.documentEdit(formData).subscribe((res: any) => {
            
            if(res.Status=='success'){
              alert(res.Message);
              this.modalService.dismissAll();
            }else{
              alert(res.Message);
            }
          })
        }
      }
      
      expence_submit(){
        this.submit_expence=true; 
       
        var ExpenseExpenseDate= $("#ExpenseExpenseDate").val();
        console.log(ExpenseExpenseDate);
        if(ExpenseExpenseDate==''){
          this.ExpenseExpenseDate_va=true;
        }
        if(ExpenseExpenseDate!==''&&this.AddExpens.status=='VALID'){
          // this.ExpenseExpenseDate_va=true;
          var formData = new FormData();
          formData.append('AccessToken',this.access);
          formData.append('VehicleId', this.AddExpens.value.VehicleName);
          formData.append('DriverId',this.AddExpens.value.DriverName);
          formData.append('ExpenseTypeId', this.AddExpens.value.ExpenseType);
          formData.append('ExpenseDate', ExpenseExpenseDate);
          formData.append('ExpenseAmount', this.AddExpens.value.Amount);
          formData.append('ExpensePhoto', this.AddExpens.value.Photo);
          formData.append('Remark', this.AddExpens.value.Remark);
          this.service.expenseAdd(formData).subscribe((res: any) => {
            console.log(res)
            if (res.Status== "success") {
            alert(res.Message);
            this.modalService.dismissAll();
            this.myExpenses();
              // localStorage.removeItem('AccessToken');
              // this.router.navigate(['/auth/login']);
            }
              })



        }else{
          // this.ExpenseExpenseDate_va=false;
        }
        console.log( this.AddExpens);
      }

      add_exp1(add_exDoc:any){
        this.DocumentIssueDate_status=true; this.DocumentExpiryDate_status=true;
        this.Hide_Data=true;
        this.Hide_Date_DocNo=true;
        this.ExpiryDate();
         this.IssueDate();
        this.UserTripDate();
        this.modalService.open(add_exDoc,{size:'sm'});
      }
      disabled_inabled(eve:any){
          if(eve.target.value=='driver'){
            this.show_driver=true;
            this.show_vehicle1=false;
            this.DocumentTypes= this.documentMasters_list[0]?.DocumentTypes;
           
          }else{
            this.show_driver=false;
            this.show_vehicle1=true;
            this.DocumentTypes=this.documentMasters_list[1]?.DocumentTypes;
          }
          
      }
      DocumentTypes_change(eve:any){
       
        if(this.show_driver&& eve==4||eve==12){
          this.Hide_Date_DocNo=false;
          this.Hide_Data=false; 
        }else if(this.show_driver&& eve==1||eve==2){
          this.Hide_Data=false;
          this.Hide_Date_DocNo=true;
        }else{
          this.Hide_Data=true;
          this.Hide_Date_DocNo=true;
        }




        // this.Hide_Data=true;
        // this.Hide_Date_DocNo=true;
        // if(arr.DocumentType=='Driving License'){
        //   this.Hide_Data=true;
        //   this.Hide_Date_DocNo=true;
        // }else if(arr.DocumentType=='Aadhaar Card' || arr.DocumentType=='Pan Card'){
        //   this.Hide_Data=false;
        // }else if(arr.DocumentType=='Bank Passbook' || arr.DocumentType=='Photograph'){
        //  this.Hide_Date_DocNo=false;
        //   this.Hide_Data=false; 
        // }else{
        //   this.Hide_Data=true;
        //   this.Hide_Date_DocNo=true;
        // }
      }
      documentMasters(){
        var formData = new FormData();
        formData.append('AccessToken', localStorage.getItem('AccessToken')!);
        this.service.documentMasters(formData).subscribe((res: any) => {
      
          if(res.Status=='success'){
            this.documentMasters_list=res.Data;
          }
        })
      }
       onFileChange_doc(event:any) {
        if (event.target.files.length > 0) {
          const image= (event.target as HTMLInputElement).files![0];
          this.document_data.patchValue({
            Dcopy: image
          });
        var reader = new FileReader();
           reader.readAsDataURL(event.target.files[0]);
          reader.onload = (e:any) => {
           this.imageURL = e.target.result;
          }
        }
        }
      document_save(){
     
        this.submitDoc=true;
      if(this.Hide_Data){
        var DocumentIssueDate = $("#DocumentIssueDate").val();
        var DocumentExpiryDate = $("#DocumentExpiryDate").val();
      if(DocumentIssueDate==''){
        this.DocumentIssueDate_status=false; 
      }
      if(DocumentExpiryDate==''){
        this.DocumentExpiryDate_status=false;
      }
      }
   console.log(this.document_data.value.DV);
       
          var formData = new FormData();
         
        formData.append('AccessToken', localStorage.getItem('AccessToken')!);
        if(this.groupId!==undefined){
          formData.append('GroupId',  this.groupId);}
        formData.append('Category',this.document_data.value.Category );
        if(this.show_driver){
        formData.append('DriverId',this.document_data.value.DV );}
        if(this.show_vehicle1){
        formData.append('VehicleId',this.document_data.value.DV );}
        formData.append('DocumentTypeId',this.document_data.value.Dtype);
        if( this.Hide_Date_DocNo){
        formData.append('DocumentNo',this.document_data.value.DNO );
        }
        if( this.Hide_Data){
        formData.append('IssueDate',DocumentIssueDate );
        formData.append('ExpiryDate',DocumentExpiryDate);}
        formData.append('DocumentFile', this.document_data.value.Dcopy);
        formData.append('Remark',this.document_data.value.Remark);

        this.service.documentAdd(formData).subscribe((res: any) => {
    console.log(res)
          if(res.Status=='success'){
            // this.modalService.close();
            alert(res.Message);
            this.modalService.dismissAll();
            this.documentWallet();
           
          }else{
            alert(res.Message); 
          }
        })
       
      }
      myExpenses(){
        var formData = new FormData();
        formData.append('AccessToken', localStorage.getItem('AccessToken')!);
        this.service.myExpenses(formData).subscribe((res: any) => {
          console.log(res)
          if (res.Status == "failed") {
          }
          else{
           this.Expence_list=res.Data;
           console.log( this.Expence_list)
            // alert("Updated successfully ");
            // this.documentWallet();
          }
        })
      }
      expenseTypes(){
        var formData = new FormData();
        formData.append('AccessToken', localStorage.getItem('AccessToken')!);
        this.service.expenseTypes(formData).subscribe((res: any) => {
          console.log(res)
          if (res.Status == "failed") {
          }
          else{
           this.expense_Types=res.Data;
           console.log( this.expense_Types)
            // alert("Updated successfully ");
            // this.documentWallet();
          }
        })
      }
  }
 
function job(job: any) {
  throw new Error('Function not implemented.');
}
function mergeByIndex(arg0: string, str4: any) {
  throw new Error('Function not implemented.');
}

function getFormattedDate(arg0: Date) {
  throw new Error('Function not implemented.');
}

