import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NavService } from 'src/app/shared/services/nav.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import * as echarts from 'echarts';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
declare var H: any;
interface HTMLCanvasElement {
  willReadFrequently?: boolean;
}

declare var google: any;
declare var MarkerClusterer: any;
declare var $: any;
// declare var google: any
declare var MarkerWithLabel: any;
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-irun-dashboard',
  templateUrl: './irun-dashboard.component.html',
  styleUrls: ['./irun-dashboard.component.scss']
})
export class IrunDashboardComponent implements  OnInit
{
  [x: string]: any;
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
  destinationData: any = []
  routes: any = []
  sources: any = []
  shipments: any = []
  summaryData: any = []
  defaultDashboard: any = []
  fullDashBoardData: any = []
  routenamedata: any
  routeFlag: boolean = true
  routeFlagD: boolean = false
  sourcesFlag: boolean = true
  sourcesFlagD: boolean = false
  destinationFlag: boolean = true
  destinationFlagD: boolean = false
  triggerFlag: boolean = true
  triggerFlagD: boolean = false
  shipmentFlag: boolean = true
  shipmentFlagD: boolean = false
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
  newalertinfo: any = []
  newtripsubData: any = []
  alertType: boolean = true;
  sub_type_name: any = []
  tripLevel: any
  AlltripValue: any = []
  graceBtnFlag: boolean = true
  escalationbtnFlag: boolean = true
  qrtListData: any = []
  gracePeriodInfoData: any = []
  remainngGrace: any = 0
  GraceLoop: any
  graceAlertType: any
  graceId: any
  graceShipment: any
  graceVehicle: any
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
  group_id: any
  iscloseFlagbtn: boolean = true
  user_escalationinfo: any = []
  permission: any
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
  sub_type = "";
  Level = "";
  datetimepicker1: any

  qrtFlag: boolean = true
  uploadimageFlage: boolean = true
  close_history: boolean = false
  close_tabFlag: boolean = true
  addMoreFlag: boolean = false
  poly_line: any = []
  map_flag: any = 'Please Wait....'
  currentDateTime: any = null
  customer_info: any = []
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
  account_id: any
  triggerstring: string = ''
  triggerHistArray: any = []
  triggerFulldataReport: any = []
  triggerReportFlag: boolean = true
  treatReportFlag: boolean = false
  ReportTypeFlag: boolean = false
  threatSubType: any = []
  threatDataNew: any = []
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
  soundFlag: boolean = false
  soundDisable: boolean = true
  lat_lng: any
  sirenArray: any = []
  LastAlertSummery: any = []
  tableAlert:any
  lastlaertFlag:boolean=true;
  demomarker:any=[]
  demoPolyline:any=[]
  lastalertmsg:any
  lasttableData:any=[]
  alertMoal:boolean=true
  markersArray: any = []
  multilocationArray:any=[]
  markerLocation:any=[]
  polylines:any=[];
  // contentsInfo:string=''
  markers:any=[]
  ///////////////////////////////////////////variable for active class fro pop up model///
  tab: any = 'tab1';
  tab1: any
  tab2: any
  tab3: any
  chart_if:any=[
    {id:'chart1',name:'DFG', data1:20,data2:20,data3:20},
    {id:'chart2',name:'UNSCHEDULED_HALT',data1:5,data2:3,data3:2},
    {id:'chart3',name:'SENSITIVE_HALT',data1:0,data2:120,data3:20},
    {id:'chart4',name:'RR5000',data1:30,data2:0,data3:20},
    {id:'chart5',name:'UNAUTHORIZED_LOCK',data1:20,data2:50,data3:20},
    {id:'chart6',name:'TAMPER_LOCK',data1:20,data2:50,data3:20},
    {id:'chart7',name:'CRITICAL',data1:20,data2:50,data3:20},
    {id:'chart8',name:'SCHEDULED_FUEL_STATION',data1:20,data2:50,data3:20},
    {id:'chart9',name:'SCHEDULED_DHABA',data1:20,data2:50,data3:20}
  ]
   filterData = [
    {
      category: "DFG",
      icon: "assets/IRUN_CV_IMG/DFG.svg",
      title:'DFG',
      filters: [
        { label: "< 30 Minutes", timeLimit: 30, color: "#E77817", count: 11 },
        { label: "< 1 Hour", timeLimit: 60, color: "#1D4380", count: 11 },
        { label: "< 2 Hours", timeLimit: 120, color: "#00C0F3", count: 11 },
        { label: "< 4 Hours", timeLimit: 180, color: "#F4858E", count: 11 },
        { label: "> 4 Hours", timeLimit: 181, color: "#917BB9", count: 11 }
      ]
    },
    {
      category: "Unschedule Halt",
      icon: "assets/IRUN_CV_IMG/Unshedulehalt.svg",
      title:'UNSCHEDULED_HALT',
      filters: [
        { label: "< 30 Minutes", timeLimit: 30, color: "#E77817", count: 11 },
        { label: "< 1 Hour", timeLimit: 60, color: "#1D4380", count: 11 },
        { label: "< 2 Hours", timeLimit: 120, color: "#00C0F3", count: 11 },
        { label: "< 4 Hours", timeLimit: 180, color: "#F4858E", count: 11 },
        { label: "> 4 Hours", timeLimit: 181, color: "#917BB9", count: 11 }
      ]
    },
    {
      category: "Schedule Halt",
      icon: "assets/images/IRUN/scheduleHalt.png",
      title:'SCHEDULED_HALT',
      filters: [
        { label: "< 30 Minutes", timeLimit: 30, color: "#E77817", count: 11 },
        { label: "< 1 Hour", timeLimit: 60, color: "#1D4380", count: 11 },
        { label: "< 2 Hours", timeLimit: 120, color: "#00C0F3", count: 11 },
        { label: "< 4 Hours", timeLimit: 180, color: "#F4858E", count: 11 },
        { label: "> 4 Hours", timeLimit: 181, color: "#917BB9", count: 11 }
      ]
    },
    {
      category: "Sensitive Halt",
      icon: "assets/IRUN_CV_IMG/sensitivehalt.svg",
      title:'SENSITIVE_HALT',
      filters: [
        { label: "< 30 Minutes", timeLimit: 30, color: "#E77817", count: 11 },
        { label: "< 1 Hour", timeLimit: 60, color: "#1D4380", count: 11 },
        { label: "< 2 Hours", timeLimit: 120, color: "#00C0F3", count: 11 },
        { label: "< 4 Hours", timeLimit: 180, color: "#F4858E", count: 11 },
        { label: "> 4 Hours", timeLimit: 181, color: "#917BB9", count: 11 }
      ]
    },
    {
      category: "RR5000",
      icon: "assets/IRUN_CV_IMG/u-turn-sign-icon.svg",
      title:'RR5000',
      filters: [
        { label: "< 30 Minutes", timeLimit: 30, color: "#E77817", count: 11 },
        { label: "< 1 Hour", timeLimit: 60, color: "#1D4380", count: 11 },
        { label: "< 2 Hours", timeLimit: 120, color: "#00C0F3", count: 11 },
        { label: "< 4 Hours", timeLimit: 180, color: "#F4858E", count: 11 },
        { label: "> 4 Hours", timeLimit: 181, color: "#917BB9", count: 11 }
      ]
    },
    {
      category: "Unauthorized Lock",
      icon: "assets/IRUN_CV_IMG/lock-off-line.svg",
      title:'UNAUTHORIZED_LOCK',
      filters: [
        { label: "< 30 Minutes", timeLimit: 30, color: "#E77817", count: 11 },
        { label: "< 1 Hour", timeLimit: 60, color: "#1D4380", count: 11 },
        { label: "< 2 Hours", timeLimit: 120, color: "#00C0F3", count: 11 },
        { label: "< 4 Hours", timeLimit: 180, color: "#F4858E", count: 11 },
        { label: "> 4 Hours", timeLimit: 181, color: "#917BB9", count: 11 }
      ]
    },
    {
      category: "Tamper Lock",
      icon: "assets/IRUN_CV_IMG/Untitledcircle_clock.svg",
      title:'TAMPER_LOCK',
      filters: [
        { label: "< 30 Minutes", timeLimit: 30, color: "#E77817", count: 11 },
        { label: "< 1 Hour", timeLimit: 60, color: "#1D4380", count: 11 },
        { label: "< 2 Hours", timeLimit: 120, color: "#00C0F3", count: 11 },
        { label: "< 4 Hours", timeLimit: 180, color: "#F4858E", count: 11 },
        { label: "> 4 Hours", timeLimit: 181, color: "#917BB9", count: 11 }
      ]
    },
    {
      category: "Critical",
      icon: "assets/IRUN_CV_IMG/alert-svgrepo.svg",
      title:'CRITICAL',
      filters: [
        { label: "< 30 Minutes", timeLimit: 30, color: "#E77817", count: 11 },
        { label: "< 1 Hour", timeLimit: 60, color: "#1D4380", count: 11 },
        { label: "< 2 Hours", timeLimit: 120, color: "#00C0F3", count: 11 },
        { label: "< 4 Hours", timeLimit: 180, color: "#F4858E", count: 11 },
        { label: "> 4 Hours", timeLimit: 181, color: "#917BB9", count: 11 }
      ]
    },
    {
      category: "Scheduled Fuel Station",
      icon: "assets/IRUN_CV_IMG/location-svgrepo.svg",
      title:'SCHEDULED_FUEL_STATION',
      filters: [
        { label: "< 30 Minutes", timeLimit: 30, color: "#E77817", count: 11 },
        { label: "< 1 Hour", timeLimit: 60, color: "#1D4380", count: 11 },
        { label: "< 2 Hours", timeLimit: 120, color: "#00C0F3", count: 11 },
        { label: "< 4 Hours", timeLimit: 180, color: "#F4858E", count: 11 },
        { label: "> 4 Hours", timeLimit: 181, color: "#917BB9", count: 11 }
      ]
    },
    {
      category: "Scheduled Dhaba",
      icon: "assets/IRUN_CV_IMG/scheduled.svg",
      title:'SCHEDULED_DHABA',
      filters: [
        { label: "< 30 Minutes", timeLimit: 30, color: "#E77817", count: 11 },
        { label: "< 1 Hour", timeLimit: 60, color: "#1D4380", count: 11 },
        { label: "< 2 Hours", timeLimit: 120, color: "#00C0F3", count: 11 },
        { label: "< 4 Hours", timeLimit: 180, color: "#F4858E", count: 11 },
        { label: "> 4 Hours", timeLimit: 181, color: "#917BB9", count: 11 }
      ]
    }
  ];
  
  alert_dashboard:any=[];
  defaultLayers:any;
 /////////////////////////////////////////////////////////////////////////////////////end popup model
 constructor(private router: Router,private navServices: NavService,private itraceIt: CrudService, private SpinnerService: NgxSpinnerService, private datepipe: DatePipe) { }


 ngOnInit(): void {
   // this.seconddaryTrack=[[]];
   this.triggerHistoryTableF();
   // this.farji();
   localStorage.setItem('critial', '0');
   let App = document.querySelector('.app');
   App?.classList.add('sidenav-toggled');

   this.currentDateTime = this.datepipe.transform((new Date), 'yyyy-MM-dd H:mm');
   this.datetimepicker1 = this.currentDateTime;
 
   this.interval = setInterval(() => {




     this.spin_flag = false;
   
     this.dashboardData1();
     this.threatDataF();
     this.qrtList();
     if(this.lastlaertFlag==true)
     {
       this.triggerFullData();
       
     }
     this.alertMoal=false;
  
   }, 360000);


   this.token = localStorage.getItem('AccessToken')!
   this.account_id = localStorage.getItem('AccountId')!
   // console.log("account_id", this.account_id)
   this.group_id = localStorage.getItem('GroupId')!
   // console.log("Access token on it", this.token);
   // console.log("group_id on it", this.group_id);
   this.initMap();
   this.initMap1();
   // this.closePopup(); 
   //  this.FullData();
   //  this.summarData()

   //  this.triggerdropdownF();
   //  this.dashboardData()
   //  this.searchbox()
   //  this.dashBoardIconF(event);


   this.dashboardData1();
   this.qrtList();
   this.threatDataF();
   this.triggerFullData();
   // this.triggerTable();
   // this.masterUploadTable();


 }
 //   ngOnDestroy() {
 //     this.subscription.unsubscribe();
 //     clearInterval(this.interval);
 //     clearInterval(this.interval1);
 // }
////////////////////////////////////////////////Sidebar////////////////////////////////////////////////////
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
 //////////new grace function////////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////grace period data//////////////////////////////////////////////////////
 gracedataF() {
   // console.log("gracedata")
   this.GraceArray = []
   for (var i = 0; i < this.defaultDashboard.length; i++) {
     for (var j = 0; j < this.defaultDashboard[i].alerts.length; j++) {
       // console.log("alert", this.defaultDashboard[i].alerts)
       if (this.defaultDashboard[i].alerts[j].remaining_grace_min > 0) {
         this.GraceArray.push(this.defaultDashboard[i].alerts[j])
       }

     }
   }

   if (this.GraceArray.length > 0) {
     let x = setInterval(() => {
       for (var k = 0; k < this.GraceArray.length; k++) {
         // console.log("grace called", this.GraceArray[k].remaining_grace_min)


         var y: any = new Date(this.GraceArray[k].escalate_grace_taken_time).getTime();

         //  var  x=setInterval(()=>{
         var now: any = new Date().getTime();
         //  console.log("now: " + now)

         var distance = now - y;
         // console.log("count",data,distance)
         var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));


         var rminutes = Math.round(this.GraceArray[k].remaining_grace_min - minutes);
         this.final_time = rminutes
         //  if(this.GraceArray[k].remaining_grace_min==0)
         //  {
         //   this.graceAlert=(this.GraceArray[k])
         //   $('#gracealert').modal('show');
         //  }
         // console.log("count", this.final_time)
         if (this.final_time == 0) {
           this.graceAlert = (this.GraceArray[k])
           $('#gracealert').modal('show');
           // console.log("graceAlert", this.graceAlert)

           clearInterval(x);
         }








       }
     }, 5000)
   }



 }

 //////////////////////////////////////////////////////countdown function/////////////////////////////

 countTimer(remainingtime: any, data: any) {
   // let s= setInterval(()=>{

   //  console.log("remainig: " , remainingtime,data);
   // console.log("data: " + data)
   var y: any = new Date(remainingtime).getTime();
   //  var  x=setInterval(()=>{
   var now: any = new Date().getTime();
   //  console.log("now: " + now)

   var distance = now - y;
   // console.log("count",data,distance)
   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));


   var rminutes = Math.round(data - minutes);
   this.final_time = rminutes
   // if(this.final_time==0)
   // {
   //   // alert("grace time expired");

   //   clearInterval(s);
   // }

   if (this.final_time > 0) {

     // var final=this.final_time

     // this.final_time=data-minutes
     return this.final_time

   }
   else

     return '0'

   // },1000)

   // return rhours + " Hr , " + rminutes + "Min ";





   //  },10000)



   console.log("count", this.final_time, data, remainingtime,);
 }
 ///////////////////////////////////////////////////////////////////////
 bell = document.getElementById('bell') as HTMLLIElement
 bellOver(event) {
   let bell = document.getElementById('bell') as HTMLLIElement
   let bellBadge = document.getElementById('bellBadge') as HTMLLIElement
   // console.log("over", bellBadge)
   bell.style.color = '#8B0000'
   //bell.style.fontStyle='bold'
   //bell.style.animation='reverse'
   // bell.style.backgroundPositionY = 'right'
   // bell.style.fontStyle = 'italic'
   bellBadge.style.fontSize = '12px'
 }
 bellOut(event) {
   let bell = document.getElementById('bell') as HTMLLIElement
   let bellBadge = document.getElementById('bellBadge') as HTMLLIElement
   // console.log("out", bellBadge)
   bell.style.color = 'red'
   bellBadge.style.fontSize = '9px'
   // bell.style.fontSize='20px'
   bell.style.fontStyle = 'normal'
   // bell.style.fontSize='20px'
 }
 tInActiveOver(event) {
   let Badge = document.getElementById('inActive') as HTMLLIElement
   Badge.style.fontSize = '12px'
 }
 tInActiveOut(event) {
   let Badge = document.getElementById('inActive') as HTMLLIElement
   Badge.style.fontSize = '9px'
 }
 ///////////////////////////datatable table//////////////////////////////////
 masterUploadTable()
  {
   var tbl = $('#masterUpload')
   var table = $('#masterUpload').DataTable();
   table.clear()
   table.destroy();
   // table.draw()
   // $('#masterUpload').DataTable().clear;
   // if(datatable.length!=)
   // console.log("table length",datatable.length)
   //  $('#masterUpload tbody').empty();



   $(document).ready(function () {



     $('#masterUpload').DataTable({


       "language": {
         search: '',
         searchPlaceholder: 'Search'
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


       //   fixedColumns:   {
       //     leftColumns: 11,
       //     select: true,

       //     // rightColumns: 5
       // },


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
            //  title: 'IRUN Dashboard Report'
             title: 'IRUN Dashboard Report'
           },
           {
             extend: 'pdf',
             footer: true,
             orientation: 'landscape',
             pageSize: 'LEGAL',

             autoClose: 'true',

             titleAttr: 'Download Pdf file',
             tag: 'span',
             title: 'IRUN Dashboard Report',
             className: 'datatablepdf-btn fa fa-file-pdf-o ',
             text: '',
             customize: function (doc) {
               var colCount = new Array();
               $(tbl).find('tbody tr:first-child td').each(() => {
                 if ($(this).attr('colspan')) {
                   for (var i = 1; i <= $(this).attr('colspan'); i++) {
                     colCount.push('*');
                   }
                 } else { colCount.push('*'); }
               });
               doc.content[1].table.widths = colCount;
             },


             exportOptions: {

               columns: ':visible',
               //  columns: [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 ]

             },
            //  title: 'IRUN Dashboard Report'
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
            //  title: 'IRUN Dashboard Report'
             title: 'IRUN Dashboard Report'
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
            //  title: 'IRUN Dashboard Report'
             title: 'IRUN Dashboard Report'
           }]
     }

     );
   });


   setTimeout(() => {
     this.SpinnerService.hide();
     // console.log("Timeout")
     this.SpinnerService.hide("LastAlert")

   }, 3000);

   // console.log("table length2",datatable.length)
 }
 initMap() {

   var lat_lng = { lat: 22.767427, lng: 88.388344 };
   this.map1 = new google.maps.Map(document.getElementById('map1') as HTMLElement, {
     zoom: 6,
     center: lat_lng,

     mapTypeId: google.maps.MapTypeId.ROADMAP,
     scaleControl: true,

   }
   );

   

    //this.map.fitBounds(this.latlngbounds)
   // alert("end");
  //this.draw_polyline.setMap();
 }
 initMap1() 
 {
  //  const center = { lat: this.customer_info[0].Lat, lng: this.customer_info[0].Lng };
   const center = { lat: 23.2599, lng: 77.4126 };

  //  this.customer_info[full_length].Lat, this.customer_info[full_length].Lng)
  // var center: any = new google.maps.LatLng( this.customer_info[0].Lat,  this.customer_info[0].Lng)
// 

   this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
     zoom: 4,
      center: center,
     mapTypeId: google.maps.MapTypeId.ROADMAP,
     scaleControl: true,
   }
   );   
 }
 ///////////////////////////////////////////////
//  initMap1() {
//   // Initialize the map only if it hasn't been initialized yet
//   if (this.map1) return;

//   const center = { lat: 23.2599, lng: 77.4126 };

//   this.map1 = new google.maps.Map(document.getElementById('map1') as HTMLElement, {
//     zoom: 4,
//     center: center,
//     mapTypeId: google.maps.MapTypeId.ROADMAP,
//     scaleControl: true,
//   });

//   // Call function to initialize data after the map is ready
//   // google.maps.event.addListenerOnce(this.map1, 'tilesloaded', () => {
//   //   // this.initializeMapData();
//   // });
// }

// initializeMapData() {
//   // Load markers and polylines after map is ready
//   if (this.trackingData.length > 0) {
//     this.addMarkersAndPolyline(this.trackingData);
//   }
// }

 ///////////////////////////////////////////////

 ////////////////////////////////////////////////////////////////////////////////////////////////////


 ////////////////////////////////////////////////////functin for active class of popup button/////////////
 onClick(check) {
   //    console.log(check);
   if (check == 1) {
     this.tab = 'tab1';
   }
   else if (check == 2) {
     this.tab = 'tab2';
   }
   else {
     this.tab = 'tab3';
   }

 }



 demo(event) {
   // console.log("button color", this.color)
 }
 ///////////////////////////dropdown button functions//////////////////
//  FullData() {
//    this.destinationData = []
//    this.itraceIt.fullDataS().subscribe(data => {
//      // this.fullDataArray=data
//      this.destinationData = data[0].Destination;

//      // console.log("fullData original", data)
//      this.routes = data[0].Route
//      // console.log("routesData", this.routes)
//      this.sources = data[0].Source
//      // console.log("sourceData", this.sources)
//      this.shipments = data[0].ShipmentMethod
//      // console.log("shipmentData", this.shipments)
//      // this.alertData=data[0].AssignedAlert

//      // console.log("alert data is..", data[0].AssignedAlert);
//      //this.workZoneNode=JSON.stringify(data);
//      // this.fullDataArray = JSON.parse(JSON.stringify(data))
//      //console.log("node called"+this.workZoneNode);
//      // this.table_node();

//    })
//  }
 /////////////////////////////////trigger function//////////////////////////
//  triggerdropdownF() {
//    this.itraceIt.triggerS().subscribe(data => {
//      // console.log("trigger..", data[0].TriggerInfo);


//    })
//  }
 ///////////////////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////summary functions //////////////////////////////
//  summarData() {
//    this.itraceIt.summaryDataS().subscribe(data => {

//      this.summaryData = data[0]
//      // console.log("summary", this.summaryData)
//    })
//  }
 // dashboardData() {
 //   this.SpinnerService.show();
 //   this.itraceIt.dashBoardDataS().subscribe(data => {

 //     // this.summaryData=data[0]
 //     console.log("dashboard full", data)
 //     console.log("dashboard", data[0][0])
 //     // this.defaultDashboard.push(data[0][0])
 //     // this.defaultDashboard.push(data[0][1])
 //     // this.defaultDashboard.push(data[0][2])
 //     // this.defaultDashboard.push(data[0][3])
 //     this.fullDashBoardData.push(data)
 //     // this.defaultDashboard=data[0][0].concat(data[0][1],data[0][2],data[0][3]);
 //     this.SpinnerService.hide();
 //     console.log("dashboard data", this.defaultDashboard)
 //     this.masterUploadTable();
 //   })

 // }
 ////////////////////////dashboard icon function///////////////////////////////////////////
 dashBoardIconF(data) {

   // this.SpinnerService.show();
   var table = $('#masterUpload').DataTable();

   if (data == 'Total Vehicles') {
     table.columns(3).search(" ").draw();
   }
   else {
     table.columns(3).search(data).draw();
   }
   // $('#masterUpload').clear().draw()
   // this.defaultDashboard=[]
   // console.log("icon full",data,this.fullDashBoardData[0][0][data])
   // this.defaultDashboard=this.fullDashBoardData[0][0][data]


   // setTimeout(() =>{
   //   this.defaultDashboard.push(this.fullDashBoardData[0][0][data])
   //   this.SpinnerService.hide();
   // },1000)

   // this.masterUploadTable();
   // alert("dashboard icon")
   // $('#masterUpload').fnDraw();

   // table.clear().draw();
   // this.masterUploadTable();

   // $('#dropdown_route').on('change', function () {
   // let value=document.getElementById('nod')
   // if(this.value!="0")
   // {
   //     var val1=this.value;
   // }                     


   //  } );

   // console.log("icon full",value)

 }
 ///////////////////////////////////////////////////////////search function////////////////////////////////
 searchboxRoute() {

   var input, filter, ul, li, a, i, div, txtValue;
   input = document.getElementById("myInputroute");
   filter = input.value.toUpperCase();
   div = document.getElementById("myDropdownroute");
   a = div.getElementsByTagName("a");
   for (i = 0; i < a.length; i++) {
     txtValue = a[i].textContent || a[i].innerText;
     if (txtValue.toUpperCase().indexOf(filter) > -1) {
       a[i].style.display = "";
     } else {
       a[i].style.display = "none";
     }
   }

 }
 ////////////////////////////////////////////////////////////////

 searchboxSource() {
   // console.log("sorce called")
   var input, filter, ul, li, a, i, div, txtValue;
   input = document.getElementById("myInputSource");
   filter = input.value.toUpperCase();
   div = document.getElementById("myDropdownSource");
   a = div.getElementsByTagName("a");
   for (i = 0; i < a.length; i++) {
     txtValue = a[i].textContent || a[i].innerText;
     if (txtValue.toUpperCase().indexOf(filter) > -1) {
       a[i].style.display = "";
     } else {
       a[i].style.display = "none";
     }
   }

 }
 ///////////////////////////////////////////////////////////////////////////////
 searchboxDestination() {

   var input, filter, ul, li, a, i, div, txtValue;
   input = document.getElementById("myInputDesti");
   filter = input.value.toUpperCase();
   div = document.getElementById("myDropdownDesti");
   a = div.getElementsByTagName("a");
   for (i = 0; i < a.length; i++) {
     txtValue = a[i].textContent || a[i].innerText;
     if (txtValue.toUpperCase().indexOf(filter) > -1) {
       a[i].style.display = "";
     } else {
       a[i].style.display = "none";
     }
   }

 }
 ////////////////////////////////////////////////////////////////////////////////
 searchboxTrigger() {

   var input, filter, ul, li, a, i, div, txtValue;
   input = document.getElementById("myInputTrigger");
   filter = input.value.toUpperCase();
   div = document.getElementById("myDropdownTrigger");
   a = div.getElementsByTagName("a");
   for (i = 0; i < a.length; i++) {
     txtValue = a[i].textContent || a[i].innerText;
     if (txtValue.toUpperCase().indexOf(filter) > -1) {
       a[i].style.display = "";
     } else {
       a[i].style.display = "none";
     }
   }

 }
 ///////////////////////////////////////////////////////////////////////////////////
 searchboxShipment() {

   var input, filter, ul, li, a, i, div, txtValue;
   input = document.getElementById("myInputShipment");
   filter = input.value.toUpperCase();
   div = document.getElementById("myDropdownShipment");
   a = div.getElementsByTagName("a");
   for (i = 0; i < a.length; i++) {
     txtValue = a[i].textContent || a[i].innerText;
     if (txtValue.toUpperCase().indexOf(filter) > -1) {
       a[i].style.display = "";
     } else {
       a[i].style.display = "none";
     }
   }

 }
 ////////////////////////////////////////////////////////////////////////
 routeF(data) {
   this.routeFlag = false
   this.routeFlagD = true
   this.routenamedata = data
   var table = $('#masterUpload').DataTable();
   // table.columns(14).search( data ).draw();
   if (data == 'All Routes') {
     table.columns(8).search(" ").draw();
   }
   else {
     table.columns(8).search(data).draw();
   }
   // console.log("rotedata", data)
 }
 sourcesF(data) {
   this.sourcesFlag = false
   this.sourcesFlagD = true
   this.sourcesnamedata = data
   var table = $('#masterUpload').DataTable();
   if (data == 'All Sources') {
     table.columns(9).search(" ").draw();
   }
   else {
     table.columns(9).search(data).draw();
   }
   // console.log("rotedata", data)
 }
 destinationF(data) {
   this.destinationFlag = false
   this.destinationFlagD = true
   this.destinationnamedata = data
   var table = $('#masterUpload').DataTable();
   if (data == 'All Destinations') {
     table.columns(10).search(" ").draw();
   }
   else {
     table.columns(10).search(data).draw();
   }
   // console.log("rotedata", data)
 }
 triggerF(data) {
   this.triggerFlag = false
   this.triggerFlagD = true
   this.triggernamedata = data
   var table = $('#triggerTableFull').DataTable();
   if (data == 'All Triggers') {
     table.columns(3).search(" ").draw();
   }
   else {
     table.columns(3).search(data).draw();
   }
   // console.log("rotedata", data)
 }
 ///////////////////////////////////////////////////////
 //////////////////////////////////////////all trigger filtor on lastalert modal///////////////////////////////////////
 triggerDeskF(data) {
   this.triggerFlag = false
   this.triggerFlagD = true
   this.triggernamedata = data
   var table = $('#lastalertTableId').DataTable();
   if (data == 'All Triggers') {
     table.columns(3).search(" ").draw();
   }
   else {
     table.columns(3).search(data).draw();
   }
   // console.log("rotedata", data)
 }

 //////////////////////////////////////////////////////////////////////////////////////////
 shipmentF(data) {
   this.shipmentFlag = false
   this.shipmentFlagD = true
   this.shipmentnamedata = data
   var table = $('#masterUpload').DataTable();
   if (data == 'All Shipment Method') {
     table.columns(16).search(" ").draw();
   }
   else {
     table.columns(16).search(data).draw();
   }
   // console.log("rotedata", data)
 }
 ///////////////////////////////////////////////////////////////trigger function with table calling////////////////////////////////////
 triggerFullData() {
   // this.lastlaertFlag=true;
   // console.log("alert data full new",this.alertData)
   this.SENSITIVE_HALT_count = 0
   this.UNSCHEDULED_HALT_count = 0
   this.SCHEDULED_HALT_count = 0
   this.DFG_count = 0
   // console.log("alert data full new",this.alertData)
   var count = 0
   this.TriggerInfo = []
   var formdata: any = new FormData();
   formdata.append('AccessToken', this.token)
   formdata.append('forGroup', this.group_id)
   formdata.append('Critical', localStorage.getItem('critial')!)
   this.itraceIt.AlltriggerS(formdata).subscribe(data => {

     // console.log("control console", data)
     this.triggerData = data
     // this.TriggerInfo=this.triggerData.TriggerInfo
     let entry = Object.entries(this.triggerData.TriggerInfo)

     for (const [key, value] of Object.entries(this.triggerData?.TriggerInfo)) {
       // console.log("called", value);
       this.TriggerInfo.push(value)


     }
     
       this.triggerTable();
     
     
     // console.log("allTrigger data", this.TriggerInfo)

     // this.workZoneNode = JSON.parse(JSON.stringify(data))
     // this.triggerTable();
     // console.log("called",this.TriggerInfo.length)
     var temp: any = [];
   
     
     // if(this.lastlaertFlag==false)
     // {
     //   // this.SpinnerService.show("LastAlert")
     //   this.graceBtnFlag = true
     //   this.escalationbtnFlag = true
     //   this.iscloseFlagbtn = true
     //   this.qrtFlag = true
     //   setTimeout(() => {
       
     //   this.lastalertNew(this.lastalertmsg);
     //   // $('#triggerModal').modal('show');
     //   // this.SpinnerService.hide("LastAlert")
     // },500);
     // } 
 
  
     

   })





   // console.log("SENSITIVE_HALT", count)


   
 }
 ///////////////////////////////////trigger table///////////////////////
 count() {
   //  this.stock=[]
   this.stock = {}
   var tmp: any = [];
   var c: any = 0
   // console.log("countlength", this.TriggerInfo.length)
   for (const [key, value] of Object.entries(this.alertData)) {
     tmp.push(value);
   }
   // console.log("temp array", tmp)
   var k: any
   for (k = 0; k < tmp.length; k++) {
     c = 0;
     for (var l = 0; l < this.TriggerInfo.length; l++) {
       if (this.TriggerInfo[l].AlertType == tmp[k]) {

         c++



       }
       // stock.splice(k,0,{[tmp[k]]:c})
     }
     // this.stock.push({[tmp[k]]:c})

     // this.stock.splice(0,0,{key:c})

     Object.assign(this.stock, { [tmp[k]]: c })


   }
   // console.log("alert type data count", this.stock)
 }

 triggerTable() {





  var tbl = $('#triggerTableFull')
  $(document).ready(function () {



    $('#triggerTableFull').DataTable({


      pageLength: 10,
      fixedHeader: true,
      // scrollX: true,
      scrollY: '400px',
      // scrollCollapse: true,
      paging: true,
      scrollX: true,
      destroy: true,
      responsive: true,
      retrieve: false,
      inilitizer: true,
      autoWidth: true,



      "order": [],

      dom: '<"html5buttons"B>lTfgitp',

      columnDefs: [
        { targets: 'no-sort', orderable: false }
      ],
      // dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
      // "<'row'<'col-sm-12'tr>>" +
      // "<'row'<'col-sm-5'i><'col-sm-7'p>>",
      buttons:
        [
          //   text: 'Close',
          //   className: 'tableBtnClose',
          //   action: function ( e, dt, node, config ) {
          //    buttonFunction()
          //   }},
          //   {
          //     text: 'Grace',
          //     className: 'tableBtnClose',
          //     action: function ( e, dt, node, config ) {
          //       buttonFunction()
          //     }},
          //     {
          //       text: 'QRT',
          //       className: 'tableBtnClose',
          //       action: function ( e, dt, node, config ) {
          //         buttonFunction()
          //       }},
          //       {
          //         text: 'Escalate',
          //         className: 'tableBtnClose',
          //         action: function ( e, dt, node, config ) {
          //           buttonFunction()
          //         }},
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
            title: 'Open Trigger Report'
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
            customize: function (doc) {
              var colCount = new Array();
              $(tbl).find('tbody tr:first-child td').each(() => {
                if ($(this).attr('colspan')) {
                  for (var i = 1; i <= $(this).attr('colspan'); i++) {
                    colCount.push('*');
                  }
                } else { colCount.push('*'); }
              });
              doc.content[1].table.widths = colCount;
            },


            exportOptions: {

              columns: ':visible',
              //  columns: [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 ]

            },
            title: 'Open Trigger Report'
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
            title: 'Open Trigger Report'
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
            title: 'Open Trigger Report'
          }],
      "language": {
        search: '',
        searchPlaceholder: 'Search'
      },
    }

    );
  });




  // console.log("table length2",datatable.length)
}
 //////////////////////trigger click history function ////////////////////////////////////////////////
 triggerHistoryClickF() {
   this.triggerstring = ''
   this.triggerHistArray = []
   // this.triggerHistoryTableF()

   $('#triggerHistoryModal').modal('show');
 }
 ///////////////////////////////////trigger history checkbox function //////////////////////////////////////////////
 trigerHistorycheckF(event) {
   // console.log("trigger history check", event)
   this.triggerstring = event + ','
   // console.log("trigger history check", this.triggerstring)
   // if(event.target.checked)
   // {


   //     {
   //         this.triggerHistArray.push(name);
   //     }

   // }
   // else if(event.target.checked!=true)
   // { 
   //   for(var i=0;i<this.triggerHistArray.length;i++)
   //   {
   //     if(this.triggerHistArray[i]==name)
   //     {
   //         this.triggerHistArray.splice(i,1);
   //     }
   //   }

   // }
   // console.log("trigger history check value array ",this.triggerHistArray)

   // // if(event.target.checked)
   // // {
   // // this.triggerstring+=name+','
   // // }
   // console.log("trigger history check value",this.triggerstring)
   // for(var j=0;j<this.triggerHistArray.length;j++)
   // {
   //   this.triggerstring+=this.triggerHistArray[j]+','
   // }
   // console.log("trigger history check value final",this.triggerstring)
 }
 /////////////////////////////threat history report check function //////////////////////////
 threatHistorycheckF(data) {
   // console.log("threat history", data)
   this.triggerstring = data + ','
 }
 //////////////////////////////trigger history submit function////////////////////////////////
 triggerHstSubmit(data)
  {
   let jsonData={}
   // var date1:any
   // var date2:any
   // console.log("trigger history submit",data)



   let dt1 = data.from_time.replace('T', ' ');
   let dt2 = data.to_time.replace('T', ' ');
   // console.log("trigger time",dt1)
   this.SpinnerService.show();
   this.triggerFulldataReport = []
   //  console.log("trigger history submit function",data)
   //  console.log("trigger history string",this.triggerstring)
   var formdata: any = new FormData();
   formdata.append('AccessToken', this.token)

   formdata.append('forGroup', this.group_id)
   formdata.append('date_from', dt1)
   formdata.append('date_to', dt2)
   formdata.append('alert_type', (this.triggerstring))
   formdata.append('type', data.type)





   // console.log("trigger history payload", this.token, dt1, dt2, data.type, this.group_id)
   let  date1: any
   let  date2: any
    date1 = new Date(dt1);
    date2 = new Date(dt2);
const diffTime = Math.abs(date2 - date1);

const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
   // console.log("trigger history payload",diffDays)

   if(diffDays<10)
   {
     this.itraceIt.triggerHistoryS(formdata).subscribe((res: any) => {
       let datalength:any=[]
       
       // console.log("trigger history submit function responce", res)
       // this.triggerFulldataReport=data.report
       // this.triggerFulldataReport.push(res.report)
        datalength=res.report
       jsonData=res.report
       // if(datalength.length<15000)
       // {
         this.triggerFulldataReport.push(res.report)
         this.triggerHistoryTableF()
       // }
       
       setTimeout(() => {
         this.SpinnerService.hide();
       }, 200);
        
       // this.exportAsExcelFile(jsonData,dt1+'-'+dt2+'triggerReport')
 
       /////////////////////////////tabel///////////////////////////////////////////
     })
   }
   else{ 
     formdata.append('download', 'yes')
     this.itraceIt.triggerHistoryS(formdata).subscribe((res: any) => {
     let datalength:any=[]
     this.triggerFulldataReport=[]
     // console.log("trigger history submit function responce", res)
     // this.triggerFulldataReport=data.report
     // this.triggerFulldataReport.push(res.report)
      datalength=res.report
     jsonData=res.report
     // if(datalength.length<15000)
     // {
       // this.triggerFulldataReport.push(res.report)
       // this.triggerHistoryTableF()
     // }
     
     setTimeout(() => {
       this.SpinnerService.hide();
     }, 200);
      
     this.exportAsExcelFile(jsonData,dt1+'-'+dt2+'triggerReport')

     /////////////////////////////tabel///////////////////////////////////////////
   })
   }


  


 }
 //////////////////////////////////download excel file////////////////////////////////
 exportAsExcelFile(json, excelFileName: string): void {
   //debugger;
   // console.log("enddd",json)
   // const ws: XLSX.WorkSheet=XLSX.utils.aoa_to_sheet(this.templateToExcel);
   // const worksheet: XLSX.WorkSheet=XLSX.utils.aoa_to_sheet(this.templateToExcel);
   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
   // console.log("worksheet",worksheet)
   const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
   // console.log("workbook",workbook)
   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
   this.saveAsExcelFile(excelBuffer, excelFileName);
 
 }
 private saveAsExcelFile(buffer: any, fileName: string): void {
   const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
 }
 ///////////////////////////////trigger his report type functions////////////////////////////////
 triggerreportTypf(data) {
   this.triggerstring = ''
   // console.log("report", data);
   if (data == '1') {
     this.triggerReportFlag = true;
     this.treatReportFlag = false;
     this.ReportTypeFlag = false;
   }
   else if (data == '2') {

     this.treatReportFlag = true;
     this.triggerReportFlag = false;
     this.ReportTypeFlag = false;
     // console.log("report", data, this.treatReportFlag);
   }
   else if (data == 'all') {
     this.triggerReportFlag = false;
     this.treatReportFlag = false;
     this.ReportTypeFlag = true;
   }
 }
 //////////////////////triggers history dashboard tabel////////////////////////////////////////////////////////



 triggerHistoryTableF() {

   var table = $('#triggerHistoryTable').DataTable();
   table.clear()
   table.destroy();







   setTimeout(() => {

     $(document).ready(function () {

       var tbl = $('#triggerHistoryTable')

       $('#triggerHistoryTable').DataTable({

         
         pageLength: 10,
         fixedHeader: true,
         // scrollX: true,
         scrollY: '380px',
         // scrollCollapse: true,
         paging: true,
         scrollX: true,
         destroy: true,
         responsive: true,
         retrieve: false,
         inilitizer: true,
         deferRender: true,
         // processing: true,
         // serverSide: true,
         // scroller: true,


         "order": [],

         dom: '<"html5buttons"B>lTfgitp',

         columnDefs: [
           { targets: 'no-sort', orderable: false }
         ],
         // dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
         // "<'row'<'col-sm-12'tr>>" +
         // "<'row'<'col-sm-5'i><'col-sm-7'p>>",
         buttons:
           [
             //   text: 'Close',
             //   className: 'tableBtnClose',
             //   action: function ( e, dt, node, config ) {
             //    buttonFunction()
             //   }},
             //   {
             //     text: 'Grace',
             //     className: 'tableBtnClose',
             //     action: function ( e, dt, node, config ) {
             //       buttonFunction()
             //     }},
             //     {
             //       text: 'QRT',
             //       className: 'tableBtnClose',
             //       action: function ( e, dt, node, config ) {
             //         buttonFunction()
             //       }},
             //       {
             //         text: 'Escalate',
             //         className: 'tableBtnClose',
             //         action: function ( e, dt, node, config ) {
             //           buttonFunction()
             //         }},
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
               title: 'Trigger_report'
             },
             {
               extend: 'pdf',
               footer: true,
               orientation: 'landscape',
               pageSize: 'A4',

               autoClose: 'true',

               titleAttr: 'Download Pdf file',
               tag: 'span',

               className: 'datatablepdf-btn fa fa-file-pdf-o ',
               text: '',
               customize: function (doc) {
                 doc.defaultStyle.fontSize = 1; doc.styles.tableHeader.fontSize = 1;
               },


               exportOptions: {

                 columns: ':visible',
                 // exportOptions: [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30 ]

               },
               title: 'Trigger_report'
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
               title: 'Trigger_report'
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
               title: 'Trigger_report'
             }],
         "language": {
           search: '',
           searchPlaceholder: 'Search'
         },
       }

       );
     });
   }, 2000);





   // console.log("table length2",datatable.length)
 }
 /////////////////////////////////////////////////////////////////////////////////////full dashboard data////////

 refresh(){
  this.SpinnerService.show();
 }
 dashboardData1()
  {
    // alert(0)
    // this.SpinnerService.show();
   if (this.spin_flag == true) 
   {
     this.SpinnerService.show();

   }

   this.defaultDashboard = []
   var dash: any = []
   this.alltrip=[]
   var fullDash: any = []
   var final: any = []
   this.Apicolor_array = []
   this.Apicolor_array=[]
   this.threatsdata=[]
   this.shipments=[]
   this.stoppedData=[]
   var formdata: any = new FormData();
   formdata.append('AccessToken', this.token)

   formdata.append('forGroup', this.group_id)
   formdata.append('Critical', localStorage.getItem('critial')!)




   this.itraceIt.homeDashboardS(formdata).subscribe(data => {
    console.log("dashboard",data);
  
    
     // this.defaultDashboard=[]
     // this.summaryData=data[0]
     // {
     //   this.SpinnerService.show();
     // }
     if (this.spin_flag == false) {
       this.SpinnerService.show();

     }
    //  this.spin_flag = true
     // console.log("dashboard full Api", data)
     dash = data
     if(dash.Dashboard ==null){
      this.SpinnerService.hide();
      alert("Data is not available");
      this.router.navigate([`/auth/login`]);
      
    }else{
     this.alert_keys=[];
     this.alert_dashboard=dash.UnattendedTrigger;
     for (const [key, value] of Object.entries(dash.UnattendedTrigger)) {
      // console.log(key, value);
      this.alert_keys.push(key)
    }
     this.alltrip = dash.AllTrip
     // console.log("dashboard all trip", this.alltrip)
     this.prifile = dash.Profile
     this.Api_color = dash.Master.Color
    
     // console.log("dashboard lat long", dash)
     //////////////////////////////////////////////////
     if (dash.Dashboard == null) {
       this.SpinnerService.hide();
       // alert("dashboard"+dash.Dashboard)
       alert("no data available")
     }


     // this.Apicolor_array=Object.keys(dash.Master.Color).length
     for (const [key, value] of Object.entries(dash.Master.Color)) {
       // console.log(key, value);
       this.Apicolor_array.push(value)
     }

     // console.log("color",this.Apicolor_array)



     for (const [key, value] of Object.entries(dash.AllTrip)) {

       this.AlltripValue.push(value)

     }
     // console.log("all trip value ",this.AlltripValue)/



     // console.log("dashboard Assign Alert data Api", dash.Master.AssignedAlert)
     this.threatsdata = (dash.Master.AssignedThreat)
     this.permission = dash.Master.Permission
     // console.log("permission", this.permission)
     this.alertData = dash.Master.AssignedAlert
     // console.log("all trigger",this.alertData)
     this.routes = dash.Master.Route
     this.sources = dash.Master.Source
     this.shipments = dash.Master.ShipmentMethod
     this.destinationData = dash.Master.Destination
     this.LastAlertSummery = dash.SummaryLastAlert
     // console.log("dashboard full Api dashboard",dash.Dashboard[1])
     // for( var i=0;i<dash.Dashboard.length;i++)
     // {
     //   fullDash.push(dash.Dashboard[i]);
     // }
     this.stoppedData = dash.Dashboard[0];
     // console.log("dashboard red",this.stoppedData);
     this.summaryData = dash.Summary
     // console.log("dashboard summary data Api", dash.Summary)/////////////////////////////summaryDataapi///////////

     // this.defaultDashboard=[]


     for (const [key, value] of Object.entries(dash.Dashboard)) {

       fullDash = value;

       for (const [key, value] of Object.entries(fullDash)) {

         this.defaultDashboard.push(value)
         // this.defaultDashboard=(value)



       }
     }

     // console.log("dash borad data", this.defaultDashboard)
     this.main_array= this.defaultDashboard
     this.new_array = this.defaultDashboard;
    
     // console.log("color data", this.new_array);///////////////////////////////final dashboard full data



     // console.log("last alert summerty", this.LastAlertSummery)
     // var table = $('#masterUpload').DataTable();
     // table.draw("full-hold");



     this.masterUploadTable();


     // this.SpinnerService.hide();
     // this.gracedataF();
     this.count();
     // this.stoppedDataF()
     // if(this.spin_flag==true)
     // {
     // this.SpinnerService.show();

     // }
     {
       (this.spin_flag = false)
     }
     this.sirenF();
    }
   })

   // setTimeout(() =>{
   //   if(this.spin_flag==true)
   //   {
   //     this.SpinnerService.show();

   //   }
   // }, 10000);

 }
 ////////////////////////////////////////////stopped data function///////////////////////////////////////
 stoppedDataF() {
   var data: any = [];
   this.Stoppedstock = {}
   var tmp: any = [];
   var c: any = 0
   var k: any = [];
   var p: any = []
   // console.log("stopped", this.stoppedData)
   for (var i = 0; i < this.stoppedData.length; i++) {
     p = this.stoppedData[i].alerts

     for (var j = 0; j < p.length; j++) {
       data.push(p[j])
     }
   }
   // console.log("red data",data)
   for (const [key, value] of Object.entries(this.alertData)) {
     tmp.push(value);
   }
   // console.log("temp array",tmp)
   var k: any
   for (k = 0; k < tmp.length; k++) {
     c = 0;
     for (var l = 0; l < data.length; l++) {
       if (data[l].alert_type == tmp[k]) {

         c++



       }
       // stock.splice(k,0,{[tmp[k]]:c})
     }
     // this.stock.push({[tmp[k]]:c})

     // this.stock.splice(0,0,{key:c})

     Object.assign(this.Stoppedstock, { [tmp[k]]: c })


   }
   // console.log("stopped type data count",  this.Stoppedstock)

 }



 ///////////////////////////////////color filter function//////////////////
 colorF(data) {
   // console.log("color filter function", data)
   if (data == 'All Color') {
     this.allColorFlag = true;
     this.colorLabelFlag = false;
     this.hpColorFlag = false;
   }
   else if (data == 1) {
     this.allColorFlag = false;
     this.hpColorFlag = false;
     this.colorLabelFlag = true;

     this.colorLabel = '#f7beb0'
   }
   else if (data == 2) {
     this.allColorFlag = false;
     this.colorLabelFlag = false;
     this.hpColorFlag = true;
     this.colorLabel = '<i class="fa fa-star" style="color:#ff0000"></i>'
   }
   else {
     this.allColorFlag = false;
     this.hpColorFlag = false;
     this.colorLabelFlag = true;
     this.colorLabel = data
   }

   var table = $('#masterUpload').DataTable();
   if (data == 'All Color') {
     table.columns(24).search(" ").draw();
     table.columns(27).search(" ").draw();
     table.columns(28).search(" ").draw();
     table.columns(32).search(" ").draw();
   }

   else if (data == 1) {
     table.columns(27).search(data).draw();
     table.columns(28).search(" ").draw();
     table.columns(24).search(" ").draw();
     table.columns(32).search(" ").draw();
   }
   else if (data == 2) {
     table.columns(28).search(1).draw();
     table.columns(27).search(" ").draw();
     table.columns(24).search(" ").draw();
     table.columns(32).search(" ").draw();
   }
   else {
     table.columns(24).search(data).draw();
     table.columns(27).search(" ").draw();
     table.columns(28).search(" ").draw();
     table.columns(32).search(" ").draw();
   }
   // if(event.target.checked==true)
   // {
   //   this.color_array.push(data)
   //   // table.columns(21).search(data).draw();
   // }
   // else{
   //   // table.columns(21).search(" ").draw();
   //   for(var i=0;i<this.color_array.length;i++)
   //   {
   //     if(this.color_array[i]==data)
   //           {
   //             this.color_array.splice(i,1)
   //           }


   //   }
   // }
   // if(event.target.checked==true)
   // {
   //   for(let i=0;i<this.color_array.length;i++)
   //   {
   //     var k:any=[]

   //   k[i]= table.columns(21).search(this.color_array[i],true)
   //  k[i].draw();


   //  console.log(k)
   //   console.log("color filtre",this.color_array)
   //   }
   // }

   // if(event.target.checked!=true)
   // {
   //   for(let i=0;i<this.color_array.length;i++)
   //   {
   //     var k:any=[]

   //   k[i]= table.columns(21).search(this.color_array[i])
   //  k[i].draw();
   //  console.log(k[i])
   //   console.log("color filtre",this.color_array)
   //   }
   // }


   // // $('#masterUpload').DataTable({"iDisplayLength": 100, "search": {regex: true}}).column(21).search(this.color_array[0]|this.color_array[1]|this.color_array[2]|this.color_array[3], true, false ).draw();
   // if(this.color_array.length==0)
   // {
   //   table.columns(21).search(" ").draw();
   // }



   // console.log("color", this.color_array)
   // if(event.target.checked==true)
   // {

   // }

 }
 ///////////////////////////////////////////////////////////////live location////////////////////////////////
 liveLocation8(lat, long, driver_mobile, driver_name, halt_time, transporter_name, imei, name, run_date, source_code, destination_code, deviceTime, lastspeed, loc_name, shipment_no) {
   var node
   this.initMap();
   this.map.setCenter(new google.maps.LatLng(lat, long));
   var Door: string = '';
   var latlong: any = [];
   var locationData
   var formdata = new FormData();
   formdata.append('AccessToken', this.token)
   formdata.append('ImeiNo', imei);
   formdata.append('portal', 'itraceit');
   this.latlngbounds = new google.maps.LatLngBounds();
   // console.log("live location", lat, long)
   this.itraceIt.liveLocation2S(formdata).subscribe((data: any) => {

     // console.log("imei2", data)
     locationData = data.Data[0];
     // latlong = locationData.LatLong.split(',');
     // console.log("new location", latlong[0])
     if (locationData.IO.Door_Status == 0) {
       Door = 'Open';
     }
     else if (locationData.IO.Door_Status == 1) {
       Door = 'Close';
     }

     //////////////////////////////////////////////////////////////////////////////////////////////////////
     let rot=245;
    
      ////////////////////////////////////////////////////////
      
     this.latlngbounds.extend(new google.maps.LatLng(parseFloat(latlong[0]), parseFloat(latlong[1])));
     node = new google.maps.LatLng(
       latlong[0], latlong[1])

     this.markers =
     {
       mark: new google.maps.Marker({
         map: this.map,

         position: new google.maps.LatLng(
           latlong[0], latlong[1]

          
         ),
         
         title: latlong[0] + "," + latlong[1],
         // label: {
         //   text: this.Label,
         //   color: 'black',
         //   fontSize: "20px",
         //   fontWeight: "1000px",
         //   fontFamily: 'Tangerine',
         //   // "http://maps.google.com/mapfiles/ms/icons/red-dot.png"

         // },
         // scaleControl:true

         icon:"assets/images/users/trucknewchhotaNew.png"
          

       
       


       })


     };

     // this.markers.mark.icon.rotation = rot;

     this.map.fitBounds(this.latlngbounds);
     var listener = google.maps.event.addListener(this.map, "idle", () => {
       if (this.map.getZoom() > 14) this.map.setZoom(14);
       google.maps.event.removeListener(listener);
     });
     //////////////////////////////////////////////////////////////////////////////////
     var contentsInfo: string = ''
     google.maps.event.addListener(this.markers.mark, 'click', (event) => {

       // console.log("eventy", event)/
       contentsInfo =
         // '<div id="content" >' +
         // '<div id="siteNotice">' +
         '<table class="border border-primary">' +
         '<tbody>' +

         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Vehicle No</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + name + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Name</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_name + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Mobile</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_mobile + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Imei No</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + imei + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Speed</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + lastspeed + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Date Time</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + deviceTime + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="width:100px ;font-size: 11px;font-weight: 900;font-family:Roboto;">Address</th>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + loc_name + '</th>' +

         ' </tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Plant</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + source_code + '</td>' +
         '</tr>' +

         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;"> Dispatch Date</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + run_date + '</td>' +
         '</tr>' +
         // '</tr>'+
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Customer</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + destination_code + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Transporter</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + transporter_name + '</td>' +
         '</tr>' +
         '<tr >' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Shipment No.</td>' +
         '<td style="width:1%;color: blue;">: </td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500" >' + shipment_no + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Last Halt Time</td>' +
         '<td style="width:1%;color: blue;">: </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + halt_time + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Lat Long</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.LatLong + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Battery</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.Battery + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Voltage</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.BatteryVoltage + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DayMaxSpeed</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DayMaxSpeed + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DayMaxSpeedTime</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DayMaxSpeedTime + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Door Status</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + Door + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DeviceDateTime</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DeviceDateTime + '</td>' +
         '</tr>' +
         // '</span>'+Temperature_string
         //   '<tr>'+
         '</tbody>' +
         '</table>'
       //       '</div>'+ 
       //       '<div class="" style="border-top:1px solid #dee2e6;justify-content: flex-end;padding: 2px;    border-bottom-right-radius: calc(0.3rem - 1px);border-bottom-left-radius: calc(0.3rem - 1px);display: flex;">'+
       //       '<button type="button" class="btn btn-outline-secondary " id="infowindow_submit'+  +'" name="submit" value ="submit" style="margin-left: 5px;padding:0px !important; margin-top: 5px;">'+
       //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Landmark</span>'+'</button>'+
       //       '<button type="button" class="btn btn-outline-secondary "   style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_geofence'+  +'" name="submit" value ="submit">'+
       //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Geofence</span>'+'</button>'+
       //       '<button type="button" class="btn btn-outline-secondary " style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_polyline'+  +'" name="submit" value ="submit">'+
       //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Polyline</span>'+'</button>'+
       //      
       // '</div>'
       //  '</div>';



       this.closeLastOpenedInfoWindow();
       infowindowMarker.setContent(contentsInfo);

       infowindowMarker.setPosition(event.latLng);
       infowindowMarker
       infowindowMarker.open(this.map, node);
       //this.lastOpenedInfoWindow=0; 
       this.lastOpenedInfoWindow = infowindowMarker;



     })

     var infowindowMarker = new google.maps.InfoWindow({
       content: contentsInfo,
       pixelOffset: new google.maps.Size(0, -20)
     });
   })
   
 }
 //////////////////////////////live location of 2 imei///////////////////////////////////////////////////////////////
 liveLocation28(lat, long, driver_mobile, driver_name, halt_time, transporter_name, imei, name, run_date, source_code, destination_code, deviceTime, lastspeed, loc_name, shipment_no, item) {
 
    console.log("imei", imei)
    this.multilocationArray = [];
    this.multilocationArray = item
    console.log("Live", imei);
    // $('#mapModal').modal('show');
    this.initializeMap1().then(() => {
      // var centerPoint = new H.geo.Point(parseFloat(long.replace(/[NW]/, '')), parseFloat(long.replace(/[EW]/, '')));
      // // if(this.map){
      // // this.map.setCenter(centerPoint);
      // this.map.getViewModel().setLookAtData({
      //   bounds: centerPoint
      // });
    // }
    
    var node
    // this.initMap();
    if (this.markerLocation.length > 0 && this.markerLocation[0]!==undefined) {
      // this.markerLocation[0].setMap(null)
      this.markerLocation.forEach(marker => this.map.removeObject(marker));
      this.markerLocation = []; // Reset the markers array
    }

    // this.map.setCenter(new google.maps.LatLng(lat, long));
    console.log(lat, long)

    var Door: string = '';
    var latlong: any = [];
    var locationData
    var formdata = new FormData();
    formdata.append('AccessToken', this.token)
    formdata.append('ImeiNo', imei);
    formdata.append('portal', 'itraceit');
    if (imei == '') {
      alert("Fixed Imei not found")
    }
    else {




      this.itraceIt.liveLocation2S(formdata).subscribe((data: any) => {

        console.log("imei2", data)
        locationData = data.Data[0];
        if (locationData.LatLong == "," || locationData.LatLong == "") {
          alert("Data not found")
        }
        else {


          latlong = locationData.LatLong.split(',');
          // console.log("new location", latlong[0])
          if (locationData.IO.Door_Status == 0) {
            Door = 'Open';
          }
          else if (locationData.IO.Door_Status == 1) {
            Door = 'Close';
          }
          //////////////////////////////////////////////////////////////////////////////////
          // this.latlngbounds = new google.maps.LatLngBounds();
          // // console.log("live location", lat, long)
          // this.latlngbounds.extend(new google.maps.LatLng(parseFloat(latlong[0]), parseFloat(latlong[1])));
          this.latlngbounds = new H.geo.Rect(90, 180, -90, -180);
          var point = new H.geo.Point(parseFloat(lat), parseFloat(long));

          // Extend the bounding box to include the new point
          this.latlngbounds = this.latlngbounds.mergePoint(point);
          // node = new google.maps.LatLng(
          //   latlong[0], latlong[1])

          // this.markers =
          // {
          //   mark: new google.maps.Marker({
          //     map: this.map,

          //     position: new google.maps.LatLng(
          //       latlong[0], latlong[1]


          //     ),
          //     title: latlong[0] + "," + latlong[1],
          //     // label: {
          //     //   text: this.Label,
          //     //   color: 'black',
          //     //   fontSize: "20px",
          //     //   fontWeight: "1000px",
          //     //   fontFamily: 'Tangerine',
          //     //   // "http://maps.google.com/mapfiles/ms/icons/red-dot.png"

          //     // },
          //     // scaleControl:true

          //     icon: "assets/images/users/trucknewchhotaNew.png"



          //   })


          // };

          const locationOfMarker = { lat:latlong[0], lng:latlong[1] };
       
    var html = document.createElement('div'),
    divIcon = document.createElement('div'),
    divText = document.createElement('div'),
    imgIco = document.createElement('img');
  imgIco.setAttribute('src', "assets/images/users/trucknewchhotaNew.png");
  divText.setAttribute("class", "textData");
  // html.setAttribute("class", "parentDiv");

  divIcon.appendChild(imgIco);
  // divText.textContent = label;
  //divText.innerHTML = label;
  html.appendChild(divIcon);
  html.appendChild(divText);

  var domIcon = new H.map.DomIcon(html);
  var marker = new H.map.DomMarker(locationOfMarker, {
    icon: domIcon,
    anchor: { x: 1, y: 10 }
  });
   this.map.addObject(marker)


          this.markerLocation.push(marker)
          // console.log("mark", this.markerLocation)
          // this.map.fitBounds(this.latlngbounds);
          // var listener = google.maps.event.addListener(this.map, "idle", () => {
          //   if (this.map.getZoom() > 14) this.map.setZoom(14);
          //   google.maps.event.removeListener(listener);
          // });



        //   this.map.getViewModel().setLookAtData({
        //     bounds: this.latlngbounds
        // }, true); // `true` for animation
        let minLat = Infinity, minLng = Infinity, maxLat = -Infinity, maxLng = -Infinity;
        const padding = 0.01;
        minLat = Math.min(minLat, latlong[0]);
        minLng = Math.min(minLng, latlong[1]);
        maxLat = Math.max(maxLat, latlong[0]);
        maxLng = Math.max(maxLng, latlong[1]);
// Create a bounding box with padding
          const boundingBox = new H.geo.Rect(
            minLat + padding,    // Top latitude (maxLat + padding)
           minLng - padding,    // Left longitude (minLng - padding)
           minLat - padding,    // Bottom latitude (minLat - padding)
           maxLng + padding     // Right longitude (maxLng + padding)
         );
        this.map.getViewModel().setLookAtData({
          bounds: boundingBox
        });
        // Add a one-time event listener for the "mapviewchangeend" event, similar to Google's "idle"
        // this.map.addEventListener('mapviewchangeend', () => {
        //     // Check if the zoom level is greater than 14
        //     if (this.map.getZoom() >14) {
        //         this.map.setZoom(20); // Set zoom level to 14 if it exceeds the limit
        //     }
        // });
        // const platform = new H.service.Platform({
        //   apikey: 'MoBysY-1fH4koFS2rGUDpwvRHSLfdX4GWYsRJUlB8VY'  // Replace with your actual API key
        // });
        const defaultLayers = this.platform1.createDefaultLayers();
        const ui = H.ui.UI.createDefault(this.map, defaultLayers);

          //////////////////////////////////////////////////////////////////////////////////
          var contentsInfo: string = ''
          marker.addEventListener('tap',  async (evt) => {
            //  var position= evt.latLng.lat()
              // Remove existing bubbles, if any
              ui.getBubbles().forEach(bubble => ui.removeBubble(bubble));
              
              // Create content for the info window
              // const infoContent =this.handleMarkerClick(evt, this.trackingData[i], vehicle_no, imei)
              // const infoContent = await this.handleMarkerClick(evt, this.trackingData[i], vehicle_no, imei);
          
              // console.log("infoContent",infoContent)
              //  `<div>Marker #${i + 1}<br>Latitude: ${position.lat}<br>Longitude: ${position.long}</div>`;
               
              // Create an info bubble at the marker's location
              contentsInfo =
              '<table class="border border-primary" style="    line-height: 15px; border:none !important">' +
              '<tbody style=" border:none !important">' +

              '<tr style=" border:none !important">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;">Vehicle No</td>' +
              '<td style=" border:none !important;width:1%;color: blue;">:</td>' +
              '<td style="  border:none !important;color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + name + '</td>' +
              '</tr>' +
              '<tr style=" border:none !important;">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Name</td>' +
              '<td style=" border:none !important;width:1%;color: blue;">:</td>' +
              '<td style=" border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_name + '</td>' +
              '</tr>' +
              '<tr style=" border:none !important">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Mobile</td>' +
              '<td style=" border:none !important;width:1%;color: blue;">:</td>' +
              '<td style="  border:none !important;color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_mobile + '</td>' +
              '</tr>' +
              '<tr style=" border:none !important">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;">Imei No</td>' +
              '<td style=" border:none !important;width:1%;color: blue;">:</td>' +
              '<td style=" border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + imei + '</td>' +
              '</tr>' +
              '<tr style=" border:none !important">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;">Speed</td>' +
              '<td style=" border:none !important;width:1%;color: blue;">:</td>' +
              '<td style="  border:none !important;color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + lastspeed + '</td>' +
              '</tr>' +
              '<tr style=" border:none !important">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;">Date Time</td>' +
              '<td style=" border:none !important;width:1%;color: blue;">:</td>' +
              '<td style=" border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + deviceTime + '</td>' +
              '</tr>' +
              '<tr style=" border:none !important">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;">Device type</td>' +
              '<td style=" border:none !important;width:1%;color: blue;">:</td>' +
              '<td style=" border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + item.imei_type + '</td>' +
              '</tr>' +
              '<tr style=" border:none !important">' +
              '<td style=" border:none !important;width:100px ;font-size: 11px;font-weight: 900;font-family:Roboto;">Address</th>' +
              '<td style=" border:none !important;width:1%;color: blue;">:</td>' +
              '<td style=" border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + loc_name + '</th>' +

              ' </tr>' +
              '<tr style=" border:none !important">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;">Source code</td>' +
              '<td style=" border:none !important;width:1%;color: blue;">:</td>' +
              '<td style=" border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + source_code + '</td>' +
              '</tr>' +

              '<tr style=" border:none !important">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;"> Dispatch Date</td>' +
              '<td style=" border:none !important;width:1%;color: blue;">:</td>' +
              '<td style=" border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + run_date + '</td>' +
              '</tr>' +
              // '</tr>'+
              '<tr style=" border:none !important">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;">Destination code</td>' +
              '<td style=" border:none !important;width:1%;color: blue;">:</td>' +
              '<td style=" border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + destination_code + '</td>' +
              '</tr>' +
              '<tr  style=" border:none !important">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;">Transporter</td>' +
              '<td style=" border:none !important;width:1%;color: blue;">:</td>' +
              '<td style=" border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + transporter_name + '</td>' +
              '</tr>' +
              '<tr  style=" border:none !important">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;">Trip id</td>' +
              '<td style=" border:none !important;width:1%;color: blue;">: </td>' +
              '<td style=" border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500" >' + shipment_no + '</td>' +
              '</tr>' +
              '<tr style=" border:none !important">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;">Last Halt Time</td>' +
              '<td style=" border:none !important;width:1%;color: blue;">: </td>' +

              '<td style="  border:none !important;color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + halt_time + '</td>' +
              '</tr>' +
              '<tr style=" border:none !important; border:none !important">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;">Lat Long</td>' +
              '<td style=" border:none !important;width:1%;color: blue;"> </td>' +

              '<td style="  border:none !important;color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.LatLong + '</td>' +
              '</tr>' +
              '<tr style=" border:none !important; border:none !important">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;">Battery</td>' +
              '<td style=" border:none !important;width:1%;color: blue;"> </td>' +

              '<td style=" border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.Battery + '</td>' +
              '</tr>' +
              '<tr style="  border:none !important;border:none !important">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;">Voltage</td>' +
              '<td style=" border:none !important;width:1%;color: blue;"> </td>' +

              '<td style="  border:none !important;color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.BatteryVoltage + '</td>' +
              '</tr>' +
              '<tr style=" border:none !important">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;">DayMaxSpeed</td>' +
              '<td style=" border:none !important;width:1%;color: blue;"> </td>' +

              '<td style="  border:none !important;color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DayMaxSpeed + '</td>' +
              '</tr>' +
              '<tr style="  border:none !important;border:none !important">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;">DayMaxSpeedTime</td>' +
              '<td style=" border:none !important;width:1%;color: blue;"> </td>' +

              '<td style="  border:none !important;color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DayMaxSpeedTime + '</td>' +
              '</tr>' +
              '<tr style=" border:none !important">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;">Door Status</td>' +
              '<td style=" border:none !important;width:1%;color: blue;"> </td>' +

              '<td style=" border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + Door + '</td>' +
              '</tr>' +
              '<tr style=" border:none !important">' +
              '<td style=" border:none !important;font-size: 11px;font-weight: 900;font-family:Roboto;">DeviceDateTime</td>' +
              '<td style=" border:none !important;width:1%;color: blue;"> </td>' +

              '<td style="  border:none !important;color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DeviceDateTime + '</td>' +
              '</tr>' +
              // '</span>'+Temperature_string
              //   '<tr>'+
              '</tbody>' +
              '</table>'
            //       '</div>'+ 
            //       '<div class="" style="border-top:1px solid #dee2e6;justify-content: flex-end;padding: 2px;    border-bottom-right-radius: calc(0.3rem - 1px);border-bottom-left-radius: calc(0.3rem - 1px);display: flex;">'+
            //       '<button type="button" class="btn btn-outline-secondary " id="infowindow_submit'+  +'" name="submit" value ="submit" style="margin-left: 5px;padding:0px !important; margin-top: 5px;">'+
            //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Landmark</span>'+'</button>'+
            //       '<button type="button" class="btn btn-outline-secondary "   style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_geofence'+  +'" name="submit" value ="submit">'+
            //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Geofence</span>'+'</button>'+
            //       '<button type="button" class="btn btn-outline-secondary " style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_polyline'+  +'" name="submit" value ="submit">'+
            //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Polyline</span>'+'</button>'+
            //      
            // '</div>'
            //  '</div>';
              const infoBubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
                content: contentsInfo
              });
          
              // Add the info bubble to the map
              ui.addBubble(infoBubble);
            });
          // google.maps.event.addListener(this.markers.mark, 'click', (event) => {

            // contentsInfo =
            //   '<table class="border border-primary">' +
            //   '<tbody>' +

            //   '<tr>' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Vehicle No</td>' +
            //   '<td style="width:1%;color: blue;">:</td>' +
            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + name + '</td>' +
            //   '</tr>' +
            //   '<tr>' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Name</td>' +
            //   '<td style="width:1%;color: blue;">:</td>' +
            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_name + '</td>' +
            //   '</tr>' +
            //   '<tr>' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Mobile</td>' +
            //   '<td style="width:1%;color: blue;">:</td>' +
            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_mobile + '</td>' +
            //   '</tr>' +
            //   '<tr>' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Imei No</td>' +
            //   '<td style="width:1%;color: blue;">:</td>' +
            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + imei + '</td>' +
            //   '</tr>' +
            //   '<tr>' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Speed</td>' +
            //   '<td style="width:1%;color: blue;">:</td>' +
            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + lastspeed + '</td>' +
            //   '</tr>' +
            //   '<tr>' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Date Time</td>' +
            //   '<td style="width:1%;color: blue;">:</td>' +
            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + deviceTime + '</td>' +
            //   '</tr>' +
            //   '<tr>' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Device type</td>' +
            //   '<td style="width:1%;color: blue;">:</td>' +
            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + item.imei_type + '</td>' +
            //   '</tr>' +
            //   '<tr>' +
            //   '<td style="width:100px ;font-size: 11px;font-weight: 900;font-family:Roboto;">Address</th>' +
            //   '<td style="width:1%;color: blue;">:</td>' +
            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + loc_name + '</th>' +

            //   ' </tr>' +
            //   '<tr>' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Source code</td>' +
            //   '<td style="width:1%;color: blue;">:</td>' +
            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + source_code + '</td>' +
            //   '</tr>' +

            //   '<tr>' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;"> Dispatch Date</td>' +
            //   '<td style="width:1%;color: blue;">:</td>' +
            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + run_date + '</td>' +
            //   '</tr>' +
            //   // '</tr>'+
            //   '<tr>' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Destination code</td>' +
            //   '<td style="width:1%;color: blue;">:</td>' +
            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + destination_code + '</td>' +
            //   '</tr>' +
            //   '<tr>' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Transporter</td>' +
            //   '<td style="width:1%;color: blue;">:</td>' +
            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + transporter_name + '</td>' +
            //   '</tr>' +
            //   '<tr >' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Trip id</td>' +
            //   '<td style="width:1%;color: blue;">: </td>' +
            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500" >' + shipment_no + '</td>' +
            //   '</tr>' +
            //   '<tr>' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Last Halt Time</td>' +
            //   '<td style="width:1%;color: blue;">: </td>' +

            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + halt_time + '</td>' +
            //   '</tr>' +
            //   '<tr>' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Lat Long</td>' +
            //   '<td style="width:1%;color: blue;"> </td>' +

            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.LatLong + '</td>' +
            //   '</tr>' +
            //   '<tr>' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Battery</td>' +
            //   '<td style="width:1%;color: blue;"> </td>' +

            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.Battery + '</td>' +
            //   '</tr>' +
            //   '<tr>' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Voltage</td>' +
            //   '<td style="width:1%;color: blue;"> </td>' +

            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.BatteryVoltage + '</td>' +
            //   '</tr>' +
            //   '<tr>' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DayMaxSpeed</td>' +
            //   '<td style="width:1%;color: blue;"> </td>' +

            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DayMaxSpeed + '</td>' +
            //   '</tr>' +
            //   '<tr>' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DayMaxSpeedTime</td>' +
            //   '<td style="width:1%;color: blue;"> </td>' +

            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DayMaxSpeedTime + '</td>' +
            //   '</tr>' +
            //   '<tr>' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Door Status</td>' +
            //   '<td style="width:1%;color: blue;"> </td>' +

            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + Door + '</td>' +
            //   '</tr>' +
            //   '<tr>' +
            //   '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DeviceDateTime</td>' +
            //   '<td style="width:1%;color: blue;"> </td>' +

            //   '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DeviceDateTime + '</td>' +
            //   '</tr>' +
            //   // '</span>'+Temperature_string
            //   //   '<tr>'+
            //   '</tbody>' +
            //   '</table>'
            // //       '</div>'+ 
            // //       '<div class="" style="border-top:1px solid #dee2e6;justify-content: flex-end;padding: 2px;    border-bottom-right-radius: calc(0.3rem - 1px);border-bottom-left-radius: calc(0.3rem - 1px);display: flex;">'+
            // //       '<button type="button" class="btn btn-outline-secondary " id="infowindow_submit'+  +'" name="submit" value ="submit" style="margin-left: 5px;padding:0px !important; margin-top: 5px;">'+
            // //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Landmark</span>'+'</button>'+
            // //       '<button type="button" class="btn btn-outline-secondary "   style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_geofence'+  +'" name="submit" value ="submit">'+
            // //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Geofence</span>'+'</button>'+
            // //       '<button type="button" class="btn btn-outline-secondary " style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_polyline'+  +'" name="submit" value ="submit">'+
            // //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Polyline</span>'+'</button>'+
            // //      
            // // '</div>'
            // //  '</div>';



          //   this.closeLastOpenedInfoWindow();
          //   infowindowMarker.setContent(contentsInfo);

          //   infowindowMarker.setPosition(event.latLng);
          //   infowindowMarker
          //   infowindowMarker.open(this.map, node);
          //   //this.lastOpenedInfoWindow=0; 
          //   this.lastOpenedInfoWindow = infowindowMarker;



          // })

          // var infowindowMarker = new google.maps.InfoWindow({
          //   content: contentsInfo,
          //   pixelOffset: new google.maps.Size(0, -20)

          // });
        }
      })
    }
    ////////////////////////////////////////////////////
  }).catch(error => {
    console.error('Error initializing map:', error);
    this.SpinnerService.hide('spinner-1');
  });

  }
  liveLocation38(imei, type) {
    console.log("data", this.markerLocation)

    let lat = this.multilocationArray.lat, long = this.multilocationArray.lng, driver_mobile = this.multilocationArray.driver_mobile, driver_name = this.multilocationArray.driver_name, halt_time = this.multilocationArray.halt_time, transporter_name = this.multilocationArray.transporter_name, name = this.multilocationArray.name, run_date = this.multilocationArray.run_date, source_code = this.multilocationArray.source_code, destination_code = this.multilocationArray.destination_code, deviceTime = this.multilocationArray.deviceTime2, lastspeed = this.multilocationArray.lastspeed, loc_name = this.multilocationArray.loc_name, shipment_no = this.multilocationArray.shipment_no
    var node
    let imeiType
    // this.initMap();
    if (this.markerLocation.length > 0 && this.markerLocation[0]!==undefined) {
      // this.markerLocation[0].setMap(null);
      // this.map.setCenter(new google.maps.LatLng(lat, long));
      this.markerLocation.forEach(marker =>
        
        this.map.removeObject(marker)
      );
      this.markerLocation = [];
    }

    var Door: string = '';
    var latlong: any = [];
    var locationData
    if (type == '1') {
      imeiType = this.multilocationArray.imei_type
    }
    else if (type == '2') {
      imeiType = this.multilocationArray.imei_type2
    }
    else if (type == '3') {
      imeiType = this.multilocationArray.imei_type3
    }
    var formdata = new FormData();
    formdata.append('AccessToken', this.token)
    formdata.append('ImeiNo', imei);
    formdata.append('portal', 'itraceit');

    this.itraceIt.liveLocation2S(formdata).subscribe((data: any) => {

      //  console.log("imei2", data)
      locationData = data.Data[0];
      if (locationData.LatLong == "," || locationData.LatLong == "") {
        alert("Data not found")
      }

      else {


        latlong = locationData.LatLong.split(',');
        //  console.log("new location", latlong[0])
        if (locationData.IO.Door_Status == 0) {
          Door = 'Open';
        }
        else if (locationData.IO.Door_Status == 1) {
          Door = 'Close';
        }
        //////////////////////////////////////////////////////////////////////////////////
        this.latlngbounds = new google.maps.LatLngBounds();
        //  console.log("live location", lat, long)
        this.latlngbounds.extend(new google.maps.LatLng(parseFloat(latlong[0]), parseFloat(latlong[1])));
        node = new google.maps.LatLng(
          latlong[0], latlong[1])

        // this.markers =
        // {
        //   mark: new google.maps.Marker({
        //     map: this.map,

        //     position: new google.maps.LatLng(
        //       latlong[0], latlong[1]


        //     ),
        //     title: latlong[0] + "," + latlong[1],
        //     // label: {
        //     //   text: this.Label,
        //     //   color: 'black',
        //     //   fontSize: "20px",
        //     //   fontWeight: "1000px",
        //     //   fontFamily: 'Tangerine',
        //     //   // "http://maps.google.com/mapfiles/ms/icons/red-dot.png"

        //     // },
        //     // scaleControl:true

        //     icon: "assets/images/users/trucknewchhotaNew.png"



        //   })


        // };
        const locationOfMarker = { lat:latlong[0], lng:latlong[1] };
       
        var html = document.createElement('div'),
        divIcon = document.createElement('div'),
        divText = document.createElement('div'),
        imgIco = document.createElement('img');
      imgIco.setAttribute('src', "assets/images/users/trucknewchhotaNew.png");
      divText.setAttribute("class", "textData");
      // html.setAttribute("class", "parentDiv");
    
      divIcon.appendChild(imgIco);
      // divText.textContent = label;
      //divText.innerHTML = label;
      html.appendChild(divIcon);
      html.appendChild(divText);
    
      var domIcon = new H.map.DomIcon(html);
      var marker = new H.map.DomMarker(locationOfMarker, {
        icon: domIcon,
        anchor: { x: 1, y: 10 }
      });
       this.map.addObject(marker)
    
    
        
        
        
        this.markerLocation.push(marker)
        // this.map.fitBounds(this.latlngbounds);
        // var listener = google.maps.event.addListener(this.map, "idle", () => {
        //   if (this.map.getZoom() > 14) this.map.setZoom(14);
        //   google.maps.event.removeListener(listener);
        // });
        let minLat = Infinity, minLng = Infinity, maxLat = -Infinity, maxLng = -Infinity;
        const padding = 0.01;
        minLat = Math.min(minLat, latlong[0]);
        minLng = Math.min(minLng, latlong[1]);
        maxLat = Math.max(maxLat, latlong[0]);
        maxLng = Math.max(maxLng, latlong[1]);
// Create a bounding box with padding
          const boundingBox = new H.geo.Rect(
            minLat + padding,    // Top latitude (maxLat + padding)
           minLng - padding,    // Left longitude (minLng - padding)
           minLat - padding,    // Bottom latitude (minLat - padding)
           maxLng + padding     // Right longitude (maxLng + padding)
         );
        this.map.getViewModel().setLookAtData({
          bounds: boundingBox
        });
        // Add a one-time event listener for the "mapviewchangeend" event, similar to Google's "idle"
        // this.map.addEventListener('mapviewchangeend', () => {
        //     // Check if the zoom level is greater than 14
        //     if (this.map.getZoom() >14) {
        //         this.map.setZoom(20); // Set zoom level to 14 if it exceeds the limit
        //     }
        // });
        // const platform = new H.service.Platform({
        //   apikey: 'MoBysY-1fH4koFS2rGUDpwvRHSLfdX4GWYsRJUlB8VY'  // Replace with your actual API key
        // });
        const defaultLayers = this.platform.createDefaultLayers();
        const ui = H.ui.UI.createDefault(this.map, defaultLayers);

          //////////////////////////////////////////////////////////////////////////////////
          var contentsInfo: string = ''

          marker.addEventListener('tap',  async (evt) => {
            //  var position= evt.latLng.lat()
              // Remove existing bubbles, if any
              ui.getBubbles().forEach(bubble => ui.removeBubble(bubble));
              
              // Create content for the info window
              // const infoContent =this.handleMarkerClick(evt, this.trackingData[i], vehicle_no, imei)
              // const infoContent = await this.handleMarkerClick(evt, this.trackingData[i], vehicle_no, imei);
          
              // console.log("infoContent",infoContent)
              //  `<div>Marker #${i + 1}<br>Latitude: ${position.lat}<br>Longitude: ${position.long}</div>`;
               
              // Create an info bubble at the marker's location
              contentsInfo =
            // '<div id="content" >' +
            // '<div id="siteNotice">' +
            '<table class="border border-primary" style="line-height:12px;border:none !important">' +
            '<tbody style="border:none !important">' +

            '<tr style="border:none !important">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;">Vehicle No</td>' +
            '<td style=" border:none !important; width:1%;color: blue;">:</td>' +
            '<td style="  border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + name + '</td>' +
            '</tr>' +
            '<tr style="border:none !important">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Name</td>' +
            '<td style=" border:none !important; width:1%;color: blue;">:</td>' +
            '<td style=" border:none !important;  color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_name + '</td>' +
            '</tr>' +
            '<tr style="border:none !important">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Mobile</td>' +
            '<td style=" border:none !important; width:1%;color: blue;">:</td>' +
            '<td style=" border:none !important;  color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_mobile + '</td>' +
            '</tr>' +
            '<tr style="border:none !important">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;">Imei No</td>' +
            '<td style=" border:none !important; width:1%;color: blue;">:</td>' +
            '<td style="  border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + imei + '</td>' +
            '</tr>' +
            '<tr style="border:none !important">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;">Device Type</td>' +
            '<td style=" border:none !important; width:1%;color: blue;">:</td>' +
            '<td style="  border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + imeiType + '</td>' +
            '</tr>' +
            '<tr style="border:none !important">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;">Speed</td>' +
            '<td style=" border:none !important; width:1%;color: blue;">:</td>' +
            '<td style=" border:none !important;  color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + lastspeed + '</td>' +
            '</tr>' +
            '<tr style="border:none !important">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;">Date Time</td>' +
            '<td style=" border:none !important; width:1%;color: blue;">:</td>' +
            '<td style=" border:none !important;  color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + deviceTime + '</td>' +
            '</tr>' +
            '<tr style="border:none !important">' +
            '<td style=" border:none !important; width:100px ;font-size: 11px;font-weight: 900;font-family:Roboto;">Address</th>' +
            '<td style=" border:none !important; width:1%;color: blue;">:</td>' +
            '<td style="  border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + loc_name + '</th>' +

            ' </tr>' +
            '<tr style="border:none !important">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;">Source Code </td>' +
            '<td style=" border:none !important; width:1%;color: blue;">:</td>' +
            '<td style=" border:none !important;  color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + source_code + '</td>' +
            '</tr>' +

            '<tr style="border:none !important">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;"> Dispatch Date</td>' +
            '<td style=" border:none !important; width:1%;color: blue;">:</td>' +
            '<td style=" border:none !important;  color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + run_date + '</td>' +
            '</tr>' +
            // '</tr>'+
            '<tr style="border:none !important">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;">Destination Code</td>' +
            '<td style=" border:none !important; width:1%;color: blue;">:</td>' +
            '<td style=" border:none !important;  color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + destination_code + '</td>' +
            '</tr>' +
            '<tr style="border:none !important">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;">Transporter</td>' +
            '<td style=" border:none !important; width:1%;color: blue;">:</td>' +
            '<td style="  border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + transporter_name + '</td>' +
            '</tr>' +
            '<tr style=" border:none !important; ">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;">trip Id</td>' +
            '<td style=" border:none !important; width:1%;color: blue;">: </td>' +
            '<td style="  border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500" >' + shipment_no + '</td>' +
            '</tr>' +
            '<tr style=" border:none !important; ">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;">Last Halt Time</td>' +
            '<td style=" border:none !important; width:1%;color: blue;">: </td>' +

            '<td style="  border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + halt_time + '</td>' +
            '</tr>' +
            '<tr style=" border:none !important; ">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;">Lat Long</td>' +
            '<td style="width:1%;color: blue;border:none !important;"> </td>' +

            '<td style=" border:none !important;  color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.LatLong + '</td>' +
            '</tr>' +
            '<tr style=" border:none !important;">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;">Battery</td>' +
            '<td style="width:1%;color: blue;border:none !important;"> </td>' +

            '<td style=" border:none !important;  color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.Battery + '</td>' +
            '</tr>' +
            '<tr style=" border:none !important; border:none !important">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;">Voltage</td>' +
            '<td style="width:1%;color: blue;border:none !important;"> </td>' +

            '<td style="  border:none !important; color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.BatteryVoltage + '</td>' +
            '</tr>' +
            '<tr style=" border:none !important;">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;">DayMaxSpeed</td>' +
            '<td style="width:1%;color: blue;border:none !important;"> </td>' +

            '<td style=" border:none !important;  color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DayMaxSpeed + '</td>' +
            '</tr>' +
            '<tr style=" border:none !important; ">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;">DayMaxSpeedTime</td>' +
            '<td style="width:1%;color: blue;border:none !important;"> </td>' +

            '<td style=" border:none !important;  color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DayMaxSpeedTime + '</td>' +
            '</tr>' +
            '<tr style=" border:none !important;">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;">Door Status</td>' +
            '<td style=" border:none !important; width:1%;color: blue;"> </td>' +

            '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500; border:none !important;">' + Door + '</td>' +
            '</tr>' +
            '<tr style="border:none !important;">' +
            '<td style=" border:none !important; font-size: 11px;font-weight: 900;font-family:Roboto;">DeviceDateTime</td>' +
            '<td style=" border:none !important; width:1%;color: blue;"> </td>' +

            '<td style=" border:none !important;  color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DeviceDateTime + '</td>' +
            '</tr>' +
            // '</span>'+Temperature_string
            //   '<tr>'+
            '</tbody>' +
            '</table>'
         
              const infoBubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
                content: contentsInfo
              });
          
              // Add the info bubble to the map
              ui.addBubble(infoBubble);
            });


       
     

    ////////////////////////////////////////////////////


  }
})
}
///////////////////////////////////////////////////////////////live location////////////////////////////////
liveLocation(lat, long, driver_mobile, driver_name, halt_time, transporter_name, imei, name, run_date, source_code, destination_code, deviceTime, lastspeed, loc_name, shipment_no) {
  var node
  this.initMap();
  this.map.setCenter(new google.maps.LatLng(lat, long));
  var Door: string = '';
  var latlong: any = [];
  var locationData
  var formdata = new FormData();
  formdata.append('AccessToken', this.token)
  formdata.append('ImeiNo', imei);
  formdata.append('portal', 'itraceit');
  this.latlngbounds = new google.maps.LatLngBounds();
  // console.log("live location", lat, long)
  this.itraceIt.liveLocation2S(formdata).subscribe((data: any) => {

    // console.log("imei2", data)
    locationData = data.Data[0];
    // latlong = locationData.LatLong.split(',');
    // console.log("new location", latlong[0])
    if (locationData.IO.Door_Status == 0) {
      Door = 'Open';
    }
    else if (locationData.IO.Door_Status == 1) {
      Door = 'Close';
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    let rot=245;
   
     ////////////////////////////////////////////////////////
     
    this.latlngbounds.extend(new google.maps.LatLng(parseFloat(latlong[0]), parseFloat(latlong[1])));
    node = new google.maps.LatLng(
      latlong[0], latlong[1])

    this.markers =
    {
      mark: new google.maps.Marker({
        map: this.map,

        position: new google.maps.LatLng(
          latlong[0], latlong[1]

         
        ),
        
        title: latlong[0] + "," + latlong[1],
        // label: {
        //   text: this.Label,
        //   color: 'black',
        //   fontSize: "20px",
        //   fontWeight: "1000px",
        //   fontFamily: 'Tangerine',
        //   // "http://maps.google.com/mapfiles/ms/icons/red-dot.png"

        // },
        // scaleControl:true

        icon:"assets/images/users/trucknewchhotaNew.png"
         

      
      


      })


    };

    // this.markers.mark.icon.rotation = rot;

    this.map.fitBounds(this.latlngbounds);
    var listener = google.maps.event.addListener(this.map, "idle", () => {
      if (this.map.getZoom() > 14) this.map.setZoom(14);
      google.maps.event.removeListener(listener);
    });
    //////////////////////////////////////////////////////////////////////////////////
    var contentsInfo: string = ''
    google.maps.event.addListener(this.markers.mark, 'click', (event) => {

      // console.log("eventy", event)/
      contentsInfo =
        // '<div id="content" >' +
        // '<div id="siteNotice">' +
        '<table class="border border-primary">' +
        '<tbody>' +

        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Vehicle No</td>' +
        '<td style="width:1%;color: blue;">:</td>' +
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + name + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Name</td>' +
        '<td style="width:1%;color: blue;">:</td>' +
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_name + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Mobile</td>' +
        '<td style="width:1%;color: blue;">:</td>' +
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_mobile + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Imei No</td>' +
        '<td style="width:1%;color: blue;">:</td>' +
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + imei + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Speed</td>' +
        '<td style="width:1%;color: blue;">:</td>' +
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + lastspeed + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Date Time</td>' +
        '<td style="width:1%;color: blue;">:</td>' +
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + deviceTime + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="width:100px ;font-size: 11px;font-weight: 900;font-family:Roboto;">Address</th>' +
        '<td style="width:1%;color: blue;">:</td>' +
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + loc_name + '</th>' +

        ' </tr>' +
        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Plant</td>' +
        '<td style="width:1%;color: blue;">:</td>' +
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + source_code + '</td>' +
        '</tr>' +

        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;"> Dispatch Date</td>' +
        '<td style="width:1%;color: blue;">:</td>' +
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + run_date + '</td>' +
        '</tr>' +
        // '</tr>'+
        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Customer</td>' +
        '<td style="width:1%;color: blue;">:</td>' +
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + destination_code + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Transporter</td>' +
        '<td style="width:1%;color: blue;">:</td>' +
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + transporter_name + '</td>' +
        '</tr>' +
        '<tr >' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Shipment No.</td>' +
        '<td style="width:1%;color: blue;">: </td>' +
        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500" >' + shipment_no + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Last Halt Time</td>' +
        '<td style="width:1%;color: blue;">: </td>' +

        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + halt_time + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Lat Long</td>' +
        '<td style="width:1%;color: blue;"> </td>' +

        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.LatLong + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Battery</td>' +
        '<td style="width:1%;color: blue;"> </td>' +

        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.Battery + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Voltage</td>' +
        '<td style="width:1%;color: blue;"> </td>' +

        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.BatteryVoltage + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DayMaxSpeed</td>' +
        '<td style="width:1%;color: blue;"> </td>' +

        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DayMaxSpeed + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DayMaxSpeedTime</td>' +
        '<td style="width:1%;color: blue;"> </td>' +

        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DayMaxSpeedTime + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Door Status</td>' +
        '<td style="width:1%;color: blue;"> </td>' +

        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + Door + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DeviceDateTime</td>' +
        '<td style="width:1%;color: blue;"> </td>' +

        '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DeviceDateTime + '</td>' +
        '</tr>' +
        // '</span>'+Temperature_string
        //   '<tr>'+
        '</tbody>' +
        '</table>'
      //       '</div>'+ 
      //       '<div class="" style="border-top:1px solid #dee2e6;justify-content: flex-end;padding: 2px;    border-bottom-right-radius: calc(0.3rem - 1px);border-bottom-left-radius: calc(0.3rem - 1px);display: flex;">'+
      //       '<button type="button" class="btn btn-outline-secondary " id="infowindow_submit'+  +'" name="submit" value ="submit" style="margin-left: 5px;padding:0px !important; margin-top: 5px;">'+
      //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Landmark</span>'+'</button>'+
      //       '<button type="button" class="btn btn-outline-secondary "   style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_geofence'+  +'" name="submit" value ="submit">'+
      //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Geofence</span>'+'</button>'+
      //       '<button type="button" class="btn btn-outline-secondary " style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_polyline'+  +'" name="submit" value ="submit">'+
      //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Polyline</span>'+'</button>'+
      //      
      // '</div>'
      //  '</div>';



      this.closeLastOpenedInfoWindow();
      infowindowMarker.setContent(contentsInfo);

      infowindowMarker.setPosition(event.latLng);
      infowindowMarker
      infowindowMarker.open(this.map, node);
      //this.lastOpenedInfoWindow=0; 
      this.lastOpenedInfoWindow = infowindowMarker;



    })

    var infowindowMarker = new google.maps.InfoWindow({
      content: contentsInfo,
      pixelOffset: new google.maps.Size(0, -20)
    });
  })
  
}
//////////////////////////////live location of 2 imei///////////////////////////////////////////////////////////////
liveLocation2(lat, long, driver_mobile, driver_name, halt_time, transporter_name, imei, name, run_date, source_code, destination_code, deviceTime, lastspeed, loc_name, shipment_no,item)
 {


  this.multilocationArray=[];
  this.multilocationArray=item
  console.log("Live",imei);
  $('#mapModal').modal('show');
  var node
  // this.initMap();
  if(this.markerLocation[0]!=null)
  {
    this.markerLocation[0].setMap(null)
  }
  
  this.map.setCenter(new google.maps.LatLng(lat, long));
  var Door: string = '';
  var latlong: any = [];
  var locationData
  var formdata = new FormData();
  formdata.append('AccessToken', this.token)
  formdata.append('ImeiNo', imei);formdata.append('portal', 'itraceit');
  if(imei == '')
   {
     alert("Fixed Imei not found")
   }
   else
   {
 
   

   
  this.itraceIt.liveLocation2S(formdata).subscribe((data: any) => {

    console.log("imei2", data)
    locationData = data.Data[0];
    if (locationData.LatLong == "," || locationData.LatLong == "") {
      alert("Data not found")
    }
    else {


      latlong = locationData.LatLong.split(',');
      // console.log("new location", latlong[0])
      if (locationData.IO.Door_Status == 0) {
        Door = 'Open';
      }
      else if (locationData.IO.Door_Status == 1) {
        Door = 'Close';
      }
      //////////////////////////////////////////////////////////////////////////////////
      this.latlngbounds = new google.maps.LatLngBounds();
      // console.log("live location", lat, long)
      this.latlngbounds.extend(new google.maps.LatLng(parseFloat(latlong[0]), parseFloat(latlong[1])));
      node = new google.maps.LatLng(
        latlong[0], latlong[1])

      this.markers =
      {
        mark: new google.maps.Marker({
          map: this.map,

          position: new google.maps.LatLng(
            latlong[0], latlong[1]


          ),
          title: latlong[0] + "," + latlong[1],
          // label: {
          //   text: this.Label,
          //   color: 'black',
          //   fontSize: "20px",
          //   fontWeight: "1000px",
          //   fontFamily: 'Tangerine',
          //   // "http://maps.google.com/mapfiles/ms/icons/red-dot.png"

          // },
          // scaleControl:true

          icon: "assets/images/users/trucknewchhotaNew.png"



        })


      };
      this.markerLocation.push(this.markers.mark)
      // console.log("mark", this.markerLocation)
      this.map.fitBounds(this.latlngbounds);
      var listener = google.maps.event.addListener(this.map, "idle", () => {
        if (this.map.getZoom() > 14) this.map.setZoom(14);
        google.maps.event.removeListener(listener);
      });
      //////////////////////////////////////////////////////////////////////////////////
      var contentsInfo: string = ''
      google.maps.event.addListener(this.markers.mark, 'click', (event) => {

        // console.log("eventy", event)
        contentsInfo =
          // '<div id="content" >' +
          // '<div id="siteNotice">' +
          '<table class="border border-primary">' +
          '<tbody>' +

          '<tr>' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Vehicle No</td>' +
          '<td style="width:1%;color: blue;">:</td>' +
          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + name + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Name</td>' +
          '<td style="width:1%;color: blue;">:</td>' +
          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_name + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Mobile</td>' +
          '<td style="width:1%;color: blue;">:</td>' +
          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_mobile + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Imei No</td>' +
          '<td style="width:1%;color: blue;">:</td>' +
          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + imei + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Speed</td>' +
          '<td style="width:1%;color: blue;">:</td>' +
          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + lastspeed + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Date Time</td>' +
          '<td style="width:1%;color: blue;">:</td>' +
          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + deviceTime + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Device type</td>' +
          '<td style="width:1%;color: blue;">:</td>' +
          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + item.imei_type + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td style="width:100px ;font-size: 11px;font-weight: 900;font-family:Roboto;">Address</th>' +
          '<td style="width:1%;color: blue;">:</td>' +
          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + loc_name + '</th>' +

          ' </tr>' +
          '<tr>' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Source code</td>' +
          '<td style="width:1%;color: blue;">:</td>' +
          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + source_code + '</td>' +
          '</tr>' +

          '<tr>' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;"> Dispatch Date</td>' +
          '<td style="width:1%;color: blue;">:</td>' +
          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + run_date + '</td>' +
          '</tr>' +
          // '</tr>'+
          '<tr>' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Destination code</td>' +
          '<td style="width:1%;color: blue;">:</td>' +
          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + destination_code + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Transporter</td>' +
          '<td style="width:1%;color: blue;">:</td>' +
          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + transporter_name + '</td>' +
          '</tr>' +
          '<tr >' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Trip id</td>' +
          '<td style="width:1%;color: blue;">: </td>' +
          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500" >' + shipment_no + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Last Halt Time</td>' +
          '<td style="width:1%;color: blue;">: </td>' +

          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + halt_time + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Lat Long</td>' +
          '<td style="width:1%;color: blue;"> </td>' +

          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.LatLong + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Battery</td>' +
          '<td style="width:1%;color: blue;"> </td>' +

          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.Battery + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Voltage</td>' +
          '<td style="width:1%;color: blue;"> </td>' +

          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.BatteryVoltage + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DayMaxSpeed</td>' +
          '<td style="width:1%;color: blue;"> </td>' +

          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DayMaxSpeed + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DayMaxSpeedTime</td>' +
          '<td style="width:1%;color: blue;"> </td>' +

          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DayMaxSpeedTime + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Door Status</td>' +
          '<td style="width:1%;color: blue;"> </td>' +

          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + Door + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DeviceDateTime</td>' +
          '<td style="width:1%;color: blue;"> </td>' +

          '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DeviceDateTime + '</td>' +
          '</tr>' +
          // '</span>'+Temperature_string
          //   '<tr>'+
          '</tbody>' +
          '</table>'
        //       '</div>'+ 
        //       '<div class="" style="border-top:1px solid #dee2e6;justify-content: flex-end;padding: 2px;    border-bottom-right-radius: calc(0.3rem - 1px);border-bottom-left-radius: calc(0.3rem - 1px);display: flex;">'+
        //       '<button type="button" class="btn btn-outline-secondary " id="infowindow_submit'+  +'" name="submit" value ="submit" style="margin-left: 5px;padding:0px !important; margin-top: 5px;">'+
        //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Landmark</span>'+'</button>'+
        //       '<button type="button" class="btn btn-outline-secondary "   style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_geofence'+  +'" name="submit" value ="submit">'+
        //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Geofence</span>'+'</button>'+
        //       '<button type="button" class="btn btn-outline-secondary " style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_polyline'+  +'" name="submit" value ="submit">'+
        //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Polyline</span>'+'</button>'+
        //      
        // '</div>'
        //  '</div>';



        this.closeLastOpenedInfoWindow();
        infowindowMarker.setContent(contentsInfo);

        infowindowMarker.setPosition(event.latLng);
        infowindowMarker
        infowindowMarker.open(this.map, node);
        //this.lastOpenedInfoWindow=0; 
        this.lastOpenedInfoWindow = infowindowMarker;



      })

      var infowindowMarker = new google.maps.InfoWindow({
        content: contentsInfo,
        pixelOffset: new google.maps.Size(0, -20)

      });
    }
  })
 }
  ////////////////////////////////////////////////////


}
//////////////////////////////live location 3 imei///////////////////////////////////////////////////
liveLocation3(imei,type)
{
let lat=this.multilocationArray.lat, long=this.multilocationArray.lng, driver_mobile=this.multilocationArray.driver_mobile, driver_name=this.multilocationArray.driver_name, halt_time=this.multilocationArray.halt_time, transporter_name=this.multilocationArray.transporter_name, name=this.multilocationArray.name, run_date=this.multilocationArray.run_date, source_code=this.multilocationArray.source_code, destination_code=this.multilocationArray.destination_code, deviceTime=this.multilocationArray.deviceTime2, lastspeed=this.multilocationArray.lastspeed, loc_name=this.multilocationArray.loc_name, shipment_no=this.multilocationArray.shipment_no
 var node
 let imeiType
 // this.initMap();
 if(this.markerLocation.length > 0)
   {
     this.markerLocation[0].setMap(null);
     this.map.setCenter(new google.maps.LatLng(lat, long));
   }
 var Door: string = '';
 var latlong: any = [];
 var locationData
 if(type=='1')
 {
   imeiType=this.multilocationArray.imei_type
 }
 else if(type=='2')
 {
   imeiType=this.multilocationArray.imei_type2
 }
 else if(type=='3')
 {
   imeiType=this.multilocationArray.imei_type3
 }
 var formdata = new FormData();
 formdata.append('AccessToken', this.token)
 formdata.append('ImeiNo', imei);
 formdata.append('portal', 'itraceit');

 this.itraceIt.liveLocation2S(formdata).subscribe((data: any) => {

  //  console.log("imei2", data)
   locationData = data.Data[0];
   if (locationData.LatLong == "," || locationData.LatLong == "") {
     alert("Data not found")
   }

   else {


     latlong = locationData.LatLong.split(',');
    //  console.log("new location", latlong[0])
     if (locationData.IO.Door_Status == 0) {
       Door = 'Open';
     }
     else if (locationData.IO.Door_Status == 1) {
       Door = 'Close';
     }
     //////////////////////////////////////////////////////////////////////////////////
     this.latlngbounds = new google.maps.LatLngBounds();
    //  console.log("live location", lat, long)
     this.latlngbounds.extend(new google.maps.LatLng(parseFloat(latlong[0]), parseFloat(latlong[1])));
     node = new google.maps.LatLng(
       latlong[0], latlong[1])

     this.markers =
     {
       mark: new google.maps.Marker({
         map: this.map,

         position: new google.maps.LatLng(
           latlong[0], latlong[1]


         ),
         title: latlong[0] + "," + latlong[1],
         // label: {
         //   text: this.Label,
         //   color: 'black',
         //   fontSize: "20px",
         //   fontWeight: "1000px",
         //   fontFamily: 'Tangerine',
         //   // "http://maps.google.com/mapfiles/ms/icons/red-dot.png"

         // },
         // scaleControl:true

         icon: "assets/images/users/trucknewchhotaNew.png"



       })


     };
     this.markerLocation.push(this.markers.mark)
     this.map.fitBounds(this.latlngbounds);
     var listener = google.maps.event.addListener(this.map, "idle", () => {
       if (this.map.getZoom() > 14) this.map.setZoom(14);
       google.maps.event.removeListener(listener);
     });
     //////////////////////////////////////////////////////////////////////////////////
     var contentsInfo: string = ''
     google.maps.event.addListener(this.markers.mark, 'click', (event) => {

      //  console.log("eventy", event)
       contentsInfo =
         // '<div id="content" >' +
         // '<div id="siteNotice">' +
         '<table class="border border-primary">' +
         '<tbody>' +

         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Vehicle No</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + name + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Name</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_name + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Mobile</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_mobile + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Imei No</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + imei + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Device Type</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + imeiType + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Speed</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + lastspeed + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Date Time</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + deviceTime + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="width:100px ;font-size: 11px;font-weight: 900;font-family:Roboto;">Address</th>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + loc_name + '</th>' +

         ' </tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Source Code </td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + source_code + '</td>' +
         '</tr>' +

         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;"> Dispatch Date</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + run_date + '</td>' +
         '</tr>' +
         // '</tr>'+
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Destination Code</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + destination_code + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Transporter</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + transporter_name + '</td>' +
         '</tr>' +
         '<tr >' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">trip Id</td>' +
         '<td style="width:1%;color: blue;">: </td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500" >' + shipment_no + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Last Halt Time</td>' +
         '<td style="width:1%;color: blue;">: </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + halt_time + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Lat Long</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.LatLong + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Battery</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.Battery + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Voltage</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.BatteryVoltage + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DayMaxSpeed</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DayMaxSpeed + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DayMaxSpeedTime</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DayMaxSpeedTime + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Door Status</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + Door + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DeviceDateTime</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DeviceDateTime + '</td>' +
         '</tr>' +
         // '</span>'+Temperature_string
         //   '<tr>'+
         '</tbody>' +
         '</table>'
       //       '</div>'+ 
       //       '<div class="" style="border-top:1px solid #dee2e6;justify-content: flex-end;padding: 2px;    border-bottom-right-radius: calc(0.3rem - 1px);border-bottom-left-radius: calc(0.3rem - 1px);display: flex;">'+
       //       '<button type="button" class="btn btn-outline-secondary " id="infowindow_submit'+  +'" name="submit" value ="submit" style="margin-left: 5px;padding:0px !important; margin-top: 5px;">'+
       //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Landmark</span>'+'</button>'+
       //       '<button type="button" class="btn btn-outline-secondary "   style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_geofence'+  +'" name="submit" value ="submit">'+
       //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Geofence</span>'+'</button>'+
       //       '<button type="button" class="btn btn-outline-secondary " style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_polyline'+  +'" name="submit" value ="submit">'+
       //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Polyline</span>'+'</button>'+
       //      
       // '</div>'
       //  '</div>';



       this.closeLastOpenedInfoWindow();
       infowindowMarker.setContent(contentsInfo);

       infowindowMarker.setPosition(event.latLng);
       infowindowMarker
       infowindowMarker.open(this.map, node);
       //this.lastOpenedInfoWindow=0; 
       this.lastOpenedInfoWindow = infowindowMarker;



     })

     var infowindowMarker = new google.maps.InfoWindow({
       content: contentsInfo,
       pixelOffset: new google.maps.Size(0, -20)

     });
   }
 })

 ////////////////////////////////////////////////////


}
 ///////////////////////////////////for view all deviceslocations new////////////////////////////////
 // liveLocationAllN(lat, long, driver_mobile, driver_name, halt_time, transporter_name, imei, imei2, imei3, name, run_date, source_code, destination_code, deviceTime, lastspeed, loc_name, shipment_no) {
 //   this.liveLocation(lat, long, driver_mobile, driver_name, halt_time, transporter_name, imei, name, run_date, source_code, destination_code, deviceTime, lastspeed, loc_name, shipment_no);
 //   if (imei2 != '') {
 //     this.liveLocation2(lat, long, driver_mobile, driver_name, halt_time, transporter_name, imei2, name, run_date, source_code, destination_code, deviceTime, lastspeed, loc_name, shipment_no);
 //   }
 //   if (imei3 != '') {
 //     this.liveLocation3(lat, long, driver_mobile, driver_name, halt_time, transporter_name, imei3, name, run_date, source_code, destination_code, deviceTime, lastspeed, loc_name, shipment_no);
 //   }


 // }

 ///////////////////////////////////////////////////////////////////////////////////
 liveLocationAll(lat, long, driver_mobile, driver_name, halt_time, transporter_name, imei1, imei2, name, run_date, source_code, destination_code, deviceTime, lastspeed, loc_name, shipment_no) {
   var node
   this.initMap();
   var Door: string = '';
   var latlong: any = [];
   var locationData
   var formdata = new FormData();
   formdata.append('AccessToken', this.token)
   formdata.append('ImeiNo', imei2);
   formdata.append('portal', 'itraceit');

   this.itraceIt.liveLocation2S(formdata).subscribe((data: any) => {

     // console.log("imei2", data)
     locationData = data.Data[0];
     latlong = locationData.LatLong.split(',');
     // console.log("new location", latlong[0])
     if (locationData.IO.Door_Status == 0) {
       Door = 'Open';
     }
     else if (locationData.IO.Door_Status == 1) {
       Door = 'Close';
     }
     //////////////////////////////////////////////////////////////////////////////////
     this.latlngbounds = new google.maps.LatLngBounds();
     // console.log("live location", lat, long)
     this.latlngbounds.extend(new google.maps.LatLng(parseFloat(latlong[0]), parseFloat(latlong[1])));
     node = new google.maps.LatLng(
       latlong[0], latlong[1])

     this.markers =
     {
       mark: new google.maps.Marker({
         map: this.map,

         position: new google.maps.LatLng(
           latlong[0], latlong[1]


         ),
         title: latlong[0] + "," + latlong[1],
         // label: {
         //   text: this.Label,
         //   color: 'black',
         //   fontSize: "20px",
         //   fontWeight: "1000px",
         //   fontFamily: 'Tangerine',
         //   // "http://maps.google.com/mapfiles/ms/icons/red-dot.png"

         // },
         // scaleControl:true

         icon: "assets/images/users/trucknewchhotaNew.png"



       })


     };

     this.map.fitBounds(this.latlngbounds);
     var listener = google.maps.event.addListener(this.map, "idle", () => {
       if (this.map.getZoom() > 14) this.map.setZoom(14);
       google.maps.event.removeListener(listener);
     });
     //////////////////////////////////////////////////////////////////////////////////
     var contentsInfo: string = ''
     google.maps.event.addListener(this.markers.mark, 'click', (event) => {

       // console.log("eventy", event)
       contentsInfo =
         // '<div id="content" >' +
         // '<div id="siteNotice">' +
         '<table class="border border-primary">' +
         '<tbody>' +

         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Vehicle No</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + name + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Name</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_name + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Mobile</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_mobile + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Imei No</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + imei2 + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Speed</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + lastspeed + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Date Time</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + deviceTime + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="width:100px ;font-size: 11px;font-weight: 900;font-family:Roboto;">Address</th>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + loc_name + '</th>' +

         ' </tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Plant</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + source_code + '</td>' +
         '</tr>' +

         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;"> Dispatch Date</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + run_date + '</td>' +
         '</tr>' +
         // '</tr>'+
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Customer</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + destination_code + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Transporter</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + transporter_name + '</td>' +
         '</tr>' +
         '<tr >' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Shipment No.</td>' +
         '<td style="width:1%;color: blue;">: </td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500" >' + shipment_no + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Last Halt Time</td>' +
         '<td style="width:1%;color: blue;">: </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + halt_time + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Lat Long</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.LatLong + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Battery</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.Battery + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Voltage</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.BatteryVoltage + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DayMaxSpeed</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DayMaxSpeed + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DayMaxSpeedTime</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DayMaxSpeedTime + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Door Status</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + Door + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DeviceDateTime</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DeviceDateTime + '</td>' +
         '</tr>' +
         // '</span>'+Temperature_string
         //   '<tr>'+
         '</tbody>' +
         '</table>'
       //       '</div>'+ 
       //       '<div class="" style="border-top:1px solid #dee2e6;justify-content: flex-end;padding: 2px;    border-bottom-right-radius: calc(0.3rem - 1px);border-bottom-left-radius: calc(0.3rem - 1px);display: flex;">'+
       //       '<button type="button" class="btn btn-outline-secondary " id="infowindow_submit'+  +'" name="submit" value ="submit" style="margin-left: 5px;padding:0px !important; margin-top: 5px;">'+
       //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Landmark</span>'+'</button>'+
       //       '<button type="button" class="btn btn-outline-secondary "   style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_geofence'+  +'" name="submit" value ="submit">'+
       //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Geofence</span>'+'</button>'+
       //       '<button type="button" class="btn btn-outline-secondary " style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_polyline'+  +'" name="submit" value ="submit">'+
       //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Polyline</span>'+'</button>'+
       //      
       // '</div>'
       //  '</div>';



       this.closeLastOpenedInfoWindow();
       infowindowMarker.setContent(contentsInfo);

       infowindowMarker.setPosition(event.latLng);
       infowindowMarker
       infowindowMarker.open(this.map, node);
       //this.lastOpenedInfoWindow=0; 
       this.lastOpenedInfoWindow = infowindowMarker;



     })

     var infowindowMarker = new google.maps.InfoWindow({
       content: contentsInfo,
       pixelOffset: new google.maps.Size(0, -20)

     });

   })

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   // this.latlngbounds.extend(new google.maps.LatLng(parseFloat(lat), parseFloat(long)));
   node = new google.maps.LatLng(
     lat, long)

   this.markers =
   {
     mark: new google.maps.Marker({
       map: this.map,

       position: new google.maps.LatLng(
         lat, long


       ),
       title: lat + "," + long,
       // label: {
       //   text: this.Label,
       //   color: 'black',
       //   fontSize: "20px",
       //   fontWeight: "1000px",
       //   fontFamily: 'Tangerine',
       //   // "http://maps.google.com/mapfiles/ms/icons/red-dot.png"

       // },
       // scaleControl:true

       icon: "assets/images/users/trucknewchhotaNew.png"



     })


   };

   // this.map.fitBounds(this.latlngbounds);
   var listener = google.maps.event.addListener(this.map, "idle", () => {
     if (this.map.getZoom() > 14) this.map.setZoom(14);
     google.maps.event.removeListener(listener);
   });
   //////////////////////////////////////////////////////////////////////////////////
   var contentsInfo2: string = ''
   google.maps.event.addListener(this.markers.mark, 'click', (event) => {

     // console.log("eventy", event)
     contentsInfo2 =
       // '<div id="content" >' +
       // '<div id="siteNotice">' +
       '<table class="border border-primary">' +
       '<tbody>' +

       '<tr>' +
       '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Vehicle No</td>' +
       '<td style="width:1%;color: blue;">:</td>' +
       '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + name + '</td>' +
       '</tr>' +
       '<tr>' +
       '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Name</td>' +
       '<td style="width:1%;color: blue;">:</td>' +
       '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_name + '</td>' +
       '</tr>' +
       '<tr>' +
       '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Mobile</td>' +
       '<td style="width:1%;color: blue;">:</td>' +
       '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_mobile + '</td>' +
       '</tr>' +
       '<tr>' +
       '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Imei No</td>' +
       '<td style="width:1%;color: blue;">:</td>' +
       '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + imei1 + '</td>' +
       '</tr>' +
       '<tr>' +
       '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Speed</td>' +
       '<td style="width:1%;color: blue;">:</td>' +
       '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + lastspeed + '</td>' +
       '</tr>' +
       '<tr>' +
       '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Date Time</td>' +
       '<td style="width:1%;color: blue;">:</td>' +
       '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + deviceTime + '</td>' +
       '</tr>' +
       '<tr>' +
       '<td style="width:100px ;font-size: 11px;font-weight: 900;font-family:Roboto;">Address</th>' +
       '<td style="width:1%;color: blue;">:</td>' +
       '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + loc_name + '</th>' +

       ' </tr>' +
       '<tr>' +
       '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Plant</td>' +
       '<td style="width:1%;color: blue;">:</td>' +
       '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + source_code + '</td>' +
       '</tr>' +

       '<tr>' +
       '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;"> Dispatch Date</td>' +
       '<td style="width:1%;color: blue;">:</td>' +
       '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + run_date + '</td>' +
       '</tr>' +
       // '</tr>'+
       '<tr>' +
       '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Customer</td>' +
       '<td style="width:1%;color: blue;">:</td>' +
       '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + destination_code + '</td>' +
       '</tr>' +
       '<tr>' +
       '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Transporter</td>' +
       '<td style="width:1%;color: blue;">:</td>' +
       '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + transporter_name + '</td>' +
       '</tr>' +
       '<tr >' +
       '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Shipment No.</td>' +
       '<td style="width:1%;color: blue;">: </td>' +
       '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500" >' + shipment_no + '</td>' +
       '</tr>' +
       '<tr>' +
       '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Last Halt Time</td>' +
       '<td style="width:1%;color: blue;">: </td>' +

       '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + halt_time + '</td>' +
       '</tr>' +
       '<tr>' +
       '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Lat Long</td>' +
       '<td style="width:1%;color: blue;"> </td>' +

       '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + node + '</td>' +
       '</tr>' +
       // '</span>'+Temperature_string
       //   '<tr>'+
       '</tbody>' +
       '</table>'
     //       '</div>'+ 
     //       '<div class="" style="border-top:1px solid #dee2e6;justify-content: flex-end;padding: 2px;    border-bottom-right-radius: calc(0.3rem - 1px);border-bottom-left-radius: calc(0.3rem - 1px);display: flex;">'+
     //       '<button type="button" class="btn btn-outline-secondary " id="infowindow_submit'+  +'" name="submit" value ="submit" style="margin-left: 5px;padding:0px !important; margin-top: 5px;">'+
     //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Landmark</span>'+'</button>'+
     //       '<button type="button" class="btn btn-outline-secondary "   style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_geofence'+  +'" name="submit" value ="submit">'+
     //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Geofence</span>'+'</button>'+
     //       '<button type="button" class="btn btn-outline-secondary " style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_polyline'+  +'" name="submit" value ="submit">'+
     //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Polyline</span>'+'</button>'+
     //      
     // '</div>'
     //  '</div>';



     this.closeLastOpenedInfoWindow();
     infowindowMarker.setContent(contentsInfo2);

     infowindowMarker.setPosition(event.latLng);
     infowindowMarker
     infowindowMarker.open(this.map, node);
     //this.lastOpenedInfoWindow=0; 
     this.lastOpenedInfoWindow = infowindowMarker;



   })

   var infowindowMarker = new google.maps.InfoWindow({
     content: contentsInfo2,
     pixelOffset: new google.maps.Size(0, -20)
   });
 }
//  closeLastOpenedInfoWindow = () => {
//    if (this.lastOpenedInfoWindow) {
//      this.lastOpenedInfoWindow.close();
//    }
//  }


 //////////////////////////////////////////////threat dropdown function/////////////////////////////////////////////

 threatF(data) {
   this.threatFlag = false
   this.threatFlagD = true
   this.threaddata = data
   var table = $('#threatTable').DataTable();
   if (data == 'All Threat') {
     table.columns(3).search(" ").draw();
   }
   else {
     table.columns(3).search(data).draw();
   }

   // console.log("threat", this.threaddata)
 }
 ////////////////////////////////////////////////////////////chechkbox function///////////////////
 trigTcheckF(id, event) {
   // console.log("trigTcheckF",id)
   var table = $('#threatTable').DataTable();

   //         table.columns(id).search(" ").draw();
   //         var removingRow = $(this).closest(id);
   // table.row(removingRow).remove().draw();

   // $("#"+id).hide();




   //   console.log("checkboxid",this.checkboxId)
   // //   // this.checkboxId=[]
   //   console.log("graceBtnFlag",this.checkboxId.length)

   //   var check = document.getElementById('triggerId') as HTMLLIElement 
   //       console.log("trigTcheckF",id)
   //       if(event.target.checked==true)
   //       {
   //          this.checkboxId.push(id)
   //          console.log("targetcheck",this.checkboxId)

   //       }
   //       else
   //       {


   //         for(var i=0;i<this.checkboxId.length;i++)
   //         {
   //           if(this.checkboxId[i]==id)
   //           {
   //             this.checkboxId.splice(i,1)
   //           }

   //         }



   //       }
   //       console.log("targetuncheck",this.checkboxId)

   //       if(this.checkboxId.length==1)
   //       {
   //         this.graceBtnFlag=false
   //         this.escalationbtnFlag=false

   //         this.qrtFlag=false
   //         this.uploadimageFlage=false

   //       }
   //       if(this.checkboxId.length!=1)
   //       {
   //         this.graceBtnFlag=true
   //         this.escalationbtnFlag=true

   //         this.qrtFlag=true
   //         this.uploadimageFlage=true
   //       }
   //       if(this.checkboxId.length==0)
   //       {
   //         this.iscloseFlagbtn=true
   //       }
   //     if(this.checkboxId.length!=0)
   //       {
   //         this.iscloseFlagbtn=false
   //       }


 }
 //////////////////////////////////////////////////////////////grace history////////////////////////////////////
 graceHistory() {
   this.graceHistoryData = []
   var formData: any = new FormData();

   if (this.graceHistoryFlag == true) {
     this.graceHistoryFlag = false
   }
   else if (this.graceHistoryFlag == false) {
     this.graceHistoryFlag = true
   }
   formData.append('trigger_id', this.graceId)
   formData.append('forGroup', this.group_id)
   formData.append('AccessToken', this.token)
   this.itraceIt.graceHistoryS(formData).subscribe(data => {
     // console.log("data", data)
     for (const [key, value] of Object.entries(data)) {
       // console.log(value);
       this.graceHistoryData.push(value)
       // console.log("grace history", this.graceHistoryData)
     }

   })
 }
 /////////////////////////////////////////escalation history///////////////////////////////////
 escalationHistory() {
   // console.log("escalation history")
   this.escaHistoryData = []
   var formData: any = new FormData();

   if (this.escalationHistoryFlag == true) {
     this.escalationHistoryFlag = false
   }
   else if (this.escalationHistoryFlag == false) {
     this.escalationHistoryFlag = true
   }
   formData.append('trigger_id', this.graceId)
   formData.append('forGroup', this.group_id)
   formData.append('AccessToken', this.token)
   this.itraceIt.escalaHistoryS(formData).subscribe(data => {
     // console.log("data", data)
     for (const [key, value] of Object.entries(data)) {
       // console.log(value);
       this.escaHistoryData.push(value)
       // console.log("escalaHistoryS", this.escaHistoryData)
     }

   })
 }
 /////////////////////////////upload image from trigger/////////////////////////////////////////////////
 uploadImage(value) {
   // console.log("upload value", value)
   var formdata: any = new FormData();
   formdata.append('AccessToken', this.token)
   formdata.append('forGroup', this.group_id)
   formdata.append('file_title', value.file_title)
   formdata.append('shipment_no', this.graceShipment)
   formdata.append('file', this.uploadfiledsk)
   this.itraceIt.fileuploadDskS(formdata).subscribe((res: any) => {
     // console.log("threatActionF", res)
     if (res.message == "success") {
       this.alertModelFlag = true
       this.alertMessage = "Upload Successfully!"
       // console.log("responce", res.message)
       // setTimeout(function () {
       $('#editwzalert').modal('show');
     }
     // alert(JSON.stringify(res))
   })
   // console.log("upload", this.token, value.file_title, this.Shipment_select, this.uploadfiledsk)
 }
 /////////////////////////////////////////gracecheck alll function on last alert///////////////////////
 getAllCheckboxItem(event, data) {

   if (event.target.checked == true) {

     this.graceBtnFlag = true
     this.escalationbtnFlag = true

     this.qrtFlag = true


     {
       var checkboxes: any = document.getElementsByName('triggerIdLastAlert');
       // console.log("checkboxlength", checkboxes.length)
       for (var checkbox of checkboxes) {
         checkbox.checked = true;
       }
     }
     this.checkallFlag = true
     this.iscloseFlagbtn = false
     for (var j = 0; j < data.length; j++) {
       // console.log("j ki value",data[j].id)

       {
         //  this.checkboxId.push(data[j].id)
         this.graceId_string += data[j].id + ','
         this.graceShipment_string += data[j].shipment_no + ','
         this.alertype_string += data[j].alert_type + ','
         // console.log("string value", this.graceId_string, this.graceShipment_string, this.alertype_string)

       }

     }
   }


   if (event.target.checked == false) {
     this.graceBtnFlag = true
     this.escalationbtnFlag = true

     this.qrtFlag = true

     this.checkallFlags = false
     // console.log("flag ", this.checkallFlags)
     this.iscloseFlagbtn = true
     this.checkboxId = []
     this.graceId_string = ' '
     this.graceShipment_string = ' '
     this.alertype_string = ' '


     {
       var checkboxes: any = document.getElementsByName('triggerIdLastAlert');
       for (var checkbox of checkboxes) {
         checkbox.checked = false;
       }
     }



     // console.log("string value after", this.graceId_string, this.graceShipment_string, this.alertype_string)
   }
 }
 /////////////////////////////////////////gracecheck alll function on last alert///////////////////////
 getAllCheckboxItemNew(event) {

   if (event.target.checked == true) {

     this.graceBtnFlag = true
     this.escalationbtnFlag = true

     this.qrtFlag = true


     {
       var checkboxes: any = document.getElementsByName('triggerIdLastAlertNew');
       // console.log("checkboxlength", checkboxes.length)
       for (var checkbox of checkboxes) {
         checkbox.checked = true;
       }
     }
     this.checkallFlag = true
     this.iscloseFlagbtn = false
     for (var j = 0; j < this.lastAlertdata.length; j++) {
       // console.log("j ki value",data[j].id)

       {
         //  this.checkboxId.push(data[j].id)
         this.graceId_string += this.lastAlertdata[j].id + ','
         this.graceShipment_string += this.lastAlertdata[j].shipment_no + ','
         this.alertype_string += this.lastAlertdata[j].alert_type + ','
         // console.log("string value", this.graceId_string, this.graceShipment_string, this.alertype_string)

       }

     }
   }


   if (event.target.checked == false) {
     this.graceBtnFlag = true
     this.escalationbtnFlag = true

     this.qrtFlag = true

     this.checkallFlags = false
     // console.log("flag ", this.checkallFlags)
     this.iscloseFlagbtn = true
     this.checkboxId = []
     this.graceId_string = ' '
     this.graceShipment_string = ' '
     this.alertype_string = ' '


     {
       var checkboxes: any = document.getElementsByName('triggerIdLastAlertNew');
       for (var checkbox of checkboxes) {
         checkbox.checked = false;
       }
     }



     // console.log("string value after", this.graceId_string, this.graceShipment_string, this.alertype_string)
   }
 }


 ////////////////////////////////////////////////////////grace checkfunction/////////////////////////////
 graceCheckF(event, AlertType, id, level, tripId, vehicle_no) {
   this.color_level = null;
   this.color_level = level;
   // console.log("checkboxlenth", this.checkboxId.length, vehicle_no)
   if (event.target.checked == true) {
     this.checkboxId.push(id)
     this.graceId_string += id + ','
     this.graceShipment_string += tripId + ','
     this.alertype_string += AlertType + ','
     // console.log("string value", this.graceId_string, this.graceShipment_string, this.alertype_string)

   }
   else {


     for (var i = 0; i < this.checkboxId.length; i++) {
       if (this.checkboxId[i] == id) {
         this.checkboxId.splice(i, 1)
         this.graceId_string = this.graceId_string.replace(id + ',', '')
         this.graceShipment_string = this.graceShipment_string.replace(tripId + ',', '')
         this.alertype_string = this.alertype_string.replace(AlertType + ',', '')
         // console.log("string value", this.graceId_string, this.graceShipment_string, this.alertype_string)
       }

     }



   }

   if (this.checkboxId.length == 1) {
     this.graceBtnFlag = false
     this.escalationbtnFlag = false

     this.qrtFlag = false
     this.uploadimageFlage = false

   }
   else {
     this.graceBtnFlag = true
     this.escalationbtnFlag = true

     this.qrtFlag = true
     this.uploadimageFlage = true
   }
   if (this.checkboxId.length == 0) {
     this.iscloseFlagbtn = true
   }
   else {
     this.iscloseFlagbtn = false
   }






   // this.graceId_string+=id+','
   // this.graceShipment_string+=tripId+','
   // this.alertype_string+=AlertType+','
   // console.log("string value",this.graceId_string,this.graceShipment_string,this.alertype_string)
   this.graceAlertType = null
   this.graceId = null
   this.graceShipment = null
   this.graceVehicle = null
   this.graceAlertType = AlertType
   this.graceId = id
   this.graceShipment = tripId
   this.graceVehicle = vehicle_no
   this.gracelevel = level

   var grace: any = []
   this.gracePeriodInfoData = []
   // var AccessToken='1';
   var watch: any

   // setInterval(() =>watch= (new Date().toLocaleTimeString()),1000);
   // console.log("watch",watch);
   var formData: any = new FormData();
   var typeId = Object.keys(this.alertData).find(key => this.alertData[key] === AlertType);
   // console.log("graceCheckF", id, typeId, AlertType, level)
   formData.append('AccessToken', this.token);
   formData.append('forGroup', this.group_id)
   formData.append('alert_type', AlertType);
   formData.append('trigger_id', id);
   formData.append('level', level);
   formData.append('alert_id', typeId);

   this.itraceIt.getGraceInfotS(formData).subscribe(data => {
     grace = Object.entries(data)
     // console.log("gracecheckinfodata", grace)
     this.remainngGrace = grace[1][1].remaining_grace
     this.GraceLoop = grace[1][1].loop
     this.grace_infoTbl = grace[2][1]
     // console.log("graceperiod_tblinfo", this.grace_infoTbl)
     // this.gracePeriodInfoData.push(data);
   })
   // alert("graceCheckF");
   //  console.log("gracecheckinfodata",Object.keys(array)))


 }
 /////////////////////////////not in use graceCheckF is used**********8 checkbox functions above all triggers click//////


 graceCheckAboveF(event, AlertType, id, level, tripId, vehicle_no) {
   this.color_level = null;
   this.color_level = level;
   if (event.target.checked == true) {
     this.checkboxId.push(id)
     this.graceId_string += id + ','
     this.graceShipment_string += tripId + ','
     this.alertype_string += AlertType + ','
     // console.log("string value", this.graceId_string, this.graceShipment_string, this.alertype_string)

   }
   else {


     for (var i = 0; i < this.checkboxId.length; i++) {
       if (this.checkboxId[i] == id) {
         this.checkboxId.splice(i, 1)
         this.graceId_string = this.graceId_string.replace(id + ',', '')
         this.graceShipment_string = this.graceShipment_string.replace(tripId + ',', '')
         this.alertype_string = this.alertype_string.replace(AlertType + ',', '')
         // console.log("string value", this.graceId_string, this.graceShipment_string, this.alertype_string)
       }

     }





   }
   if (this.checkboxId.length == 1) {
     this.graceBtnFlag = false
     this.escalationbtnFlag = false

     this.qrtFlag = false
     this.uploadimageFlage = false

   }
   else {
     this.graceBtnFlag = true
     this.escalationbtnFlag = true

     this.qrtFlag = true
     this.uploadimageFlage = true
   }
   if (this.checkboxId.length == 0) {
     this.iscloseFlagbtn = true
   }
   else {
     this.iscloseFlagbtn = false
   }



   this.graceAlertType = null
   this.graceId = null
   this.graceShipment = null
   this.graceVehicle = null
   this.graceAlertType = AlertType
   this.graceId = id
   this.graceShipment = tripId
   this.graceVehicle = vehicle_no
   this.gracelevel = level

   var grace: any = []
   this.gracePeriodInfoData = []
   // var AccessToken='1';
   var formData: any = new FormData();
   var typeId = Object.keys(this.alertData).find(key => this.alertData[key] === AlertType);
   // console.log("graceCheckF", id, typeId, AlertType, level)
   formData.append('AccessToken', this.token);
   formData.append('forGroup', this.group_id)
   formData.append('alert_type', AlertType);
   formData.append('trigger_id', id);
   formData.append('level', level);
   formData.append('alert_id', typeId);

   this.itraceIt.getGraceInfotS(formData).subscribe(data => {
     grace = Object.entries(data)
     // console.log("gracecheckinfodata", grace)
     this.remainngGrace = grace[1][1].remaining_grace
     this.GraceLoop = grace[1][1].loop
     this.grace_infoTbl = grace[2][1]
     // console.log("graceperiod_tblinfo", this.grace_infoTbl)
     // this.gracePeriodInfoData.push(data);
   })
   // alert("graceCheckF");
   //  console.log("gracecheckinfodata",Object.keys(array)))


 }
 /////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////grace tabler chechk sms function////////////////////////////////
 graceTblCheckSms(event, phon_no) {
   // console.log("graceTblCheckSms", phon_no)
   // console.log("trigger check change function", event)
   if (event.target.checked == true) {
     //  this.escalation_check.push(data)
     if (phon_no != "") {
       this.graceTble_phoneno += phon_no + ','
     }
   }

   else {
     this.graceTble_phoneno = this.graceTble_phoneno.replace(phon_no, '')
   }
   console.log("graceTblCheckSms", this.graceTble_phoneno)

 }
 ////////////////////////////////grace table email check function////////////////////////////////////
 graceTblCheckEmail(event, email) {
   // console.log("graceTblCheckEmail", email)
   if (event.target.checked == true) {
     //  this.escalation_check.push(data)
     if (email != "") {
       this.graceTble_email += email + ','
     }
   }

   else {
     this.graceTble_email = this.graceTble_email.replace(email, '')
   }
   // console.log("graceTblCheckSms", this.graceTble_email)

 }
 //////////////////////////////////graceperiod       Submit      function             ///////////////////////////////////////
 gracPeriodF(value) {
   var alrt = document.getElementById("alertPopUp")

   //////////////////////////////////////////////////////////////////////////////////
   for (var i = 0; i < this.grace_infoTbl.length; i++) {
     if (this.grace_infoTbl[i].checked_email == true) {
       // console.log("check mail")
       this.graceTble_email += +this.grace_infoTbl[i].email_id + ','

     }
     if (this.grace_infoTbl[i].checked_sms == true) {
       // console.log("check mail")
       this.graceTble_phoneno += +this.grace_infoTbl[i].phone_no + ','

     }
   }

   // console.log("grace_info", this.graceTble_phoneno, this.graceTble_email)
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   // var details:any
   var formdata: any = new FormData();
   this.graceAlertType
   this.graceId
   this.graceShipment
   this.graceVehicle
   var details = {
     "action_details": {
       "trigger_id": this.graceId,
       "grace_period": value.grace_hour,
       "email_to": "",
       "email_cc": this.graceTble_email,
       "sms_to": this.graceTble_phoneno,
       "remarks": value.graceRemarks,
       "alert_type": this.graceAlertType,
       "vehicle_no": this.graceVehicle,
       "shipment_no": this.graceShipment
     }
   }
   // console.log("action_details", details)
   formdata.append('action_type', "grace_start")
   formdata.append('AccessToken', this.token)
   formdata.append('forGroup', this.group_id)
   formdata.append('action_details', JSON.stringify(details))
   var size = Object.keys(details).length;

   if (this.remainngGrace >= value.grace_hour) {
     this.itraceIt.graceSubmitS(formdata).subscribe(data => {
       // alert(JSON.stringify(data))
       // console.log("responce", data)
       var responce: any = data
       // console.log("formdata fill", data)
       if (responce.message == "success") {
         this.alertModelFlag = true
         this.alertMessage = "Grace Taken Successfully!"
         // console.log("responce", responce.message)
         // setTimeout(function () {
         $('#editwzalert').modal('show');
         // },10000)


         setTimeout(() => {
           location.reload();
         }, 3000)






       }
       else {
         this.alertMessage = "Error!"
         // setTimeout(function () {
         $('#editwzalert').modal('show');
         //  }, 2000)
       }
       formdata.forEach((value, key) => {
         // console.log("key=", key + "value= " + value)
       });
     })


   }
   else {
     alert("please enter valid time")
   }





   // console.log("value==", value, this.graceAlertType, this.graceId, this.graceShipment, this.graceVehicle)

   // location.reload();
   // console.log("event", event.target.U7Email.value)
   // console.log("textvalue", value.graceRemarks)

   //  this.dashboardData1();

 }
 //////////////////////////////////////////////////////////////xclosetabsubmitfunctions////////////////////////////////
 xCloseTabF(value) {
   var remark = '';
   // console.log("event", value)
   // let dr=document.getElementById('Driver')
   const Driver = $("#" + 'Driver').is(":checked");
   const Escalation_trns = $("#" + 'Escalation-Transporter').is(":checked");
   const Escalation_Manager = $("#" + 'Escalation-Manager').is(":checked");
   const Escalation_SrManager = $("#" + 'Escalation-Sr.Manager').is(":checked");
   const Escalation_QR = $("#" + 'Escalation-QR').is(":checked");
   const Escalation_Field = $("#" + 'Escalation-Field').is(":checked");
   if (Driver == true) {
     remark = 'Driver,' + 'name=' + value.driverName + ',' + 'remarks=' + value.driverRemarks + ',' + 'Att=' + value.driverTime

   }
   else if (Escalation_trns == true) {
     remark = 'Escalation_transport,' + 'name=' + value.transproterName + ',' + 'remarks=' + value.transporterRemarks + ',' + 'Att=' + value.transporterTime
   }
   else if (Escalation_Manager == true) {
     remark = 'Escalation_manager,' + 'name=' + value.managerName + ',' + 'tremarks=' + value.managerRemarks + ',' + 'Att=' + value.managerTime
   }
   else if (Escalation_SrManager == true) {
     remark = 'Escalation_srManager,' + 'name=' + value.srManagerName + ',' + 'remarks=' + value.srManagerRemarks + ',' + 'Att=' + value.srManagerTime
   }
   else if (Escalation_QR == true) {
     remark = 'Escalation_QR,' + 'name=' + value.qrTeamName + ',' + 'remarks=' + value.qrTeamRemarks + ',' + 'Att' + value.qrTeamTime
   }
   else if (Escalation_Field == true) {
     remark = 'Escalation_field,' + 'name=' + value.fieldOfficerName + ',' + 'remarks=' + value.fieldOfficerRemarks + ',' + 'Att' + value.fieldOfficerTime

   }
   else {
     alert("Please check and fill one of the following")
     return;


   }

   // console.log("exiting...", remark)
   // return;

   var formData: any = new FormData();

   var pay_load = {
     "action_details": {
       "shipment_no": this.graceShipment,
       "remarks": remark,

       "trigger_log_id": this.graceId,

       "aalert_type": this.graceAlertType,
       "email_to": "",
       "email_cc": "",
       "sms_to": ""


     }
   }
   // console.log("close pay", pay_load)
   formData.append('AccessToken', this.token);
   formData.append('forGroup', this.group_id)
   formData.append('action_type', '0');
   formData.append('action_details', JSON.stringify(pay_load));
   //////////////////////////////////////////////



   //////////////////////////////////////
   this.itraceIt.closeS(formData).subscribe(data => {
     // console.log("close", data)
     alert(JSON.stringify(data));
   })


   setTimeout(() => {
     // this.dashboardData1();
     location.reload();
   }, 1000)

   // console.log("event",)



 }
 ////////////////////////////////////////////////////new close event///////////////
 closeNewf(value) {
   // console.log("close last", value)
   var remark = '';
   const Driver = $("#" + 'Drivern').is(":checked");
   const Escalation_trns = $("#" + 'Escalation-Transportern').is(":checked");

   if (Driver == true) {
     if (value.driverName == "" || value.driverRemarks == "") {
       alert("Please enter a driver name or reamrks the driver field");
     }
     else

       remark += 'Called to Driver:' + value.driverRemarks + " "
     // remark+=value.driverRemarks+' '+'|'+' '+ 'Called to Driver:'+' '+value.driverName+' '+'|'+ ' '+'Time:'+value.driverTime+" "

   }
   if (Escalation_trns == true) {
     if (value.transproterName == "" || value.transporterRemarks == "") {
       alert("Please enter a Transporter name or reamrks the Transporter field");
     }
     else
       remark += 'called_to_transport:' + value.transporterRemarks + " "
     // remark+=value.transporterRemarks+' '+'|'+' '+ 'called_to_transport:'+' '+value.transproterName+' '+'|'+ ' '+'Time:'+value.transporterTime+' '
   }
   if (value.other_list == "Manager") {
     if (value.OtherName == "" || value.OtherRemarks == "") {
       alert("Please enter a  name or reamrks From list  field");
     }
     else
       remark += 'called_to_manager:' + value.OtherRemarks + " "
     // remark+=value.OtherRemarks+' '+'|'+' '+ 'called_to_manager:'+' '+value.OtherName+' '+'|'+ ' '+'Time:'+value.OtherTime+' '
   }
   if (value.other_list == "Sr.Manager") {
     if (value.OtherName == "" || value.OtherRemarks == "") {
       alert("Please enter a  name or reamrks From list  field");
     }
     else
       remark += 'called_to_Sr.manager:' + value.OtherRemarks + " "
     // remark+=value.OtherRemarks+' '+'|'+' '+ 'called_to_Sr.manager:'+' '+value.OtherName+' '+'|'+ ' '+'Time:'+value.OtherTime+' '
   }
   if (value.other_list == "QR_Team") {
     if (value.OtherName == "" || value.OtherRemarks == "") {
       alert("Please enter a  name or reamrks From list  field");
     }
     else
       remark += 'called_to_QRTeam_manager:' + value.OtherRemarks + " "
     // remark+=value.OtherRemarks+' '+'|'+' '+ 'called_to_QRTeam_manager:'+' '+value.OtherName+' '+'|'+ ' '+'Time:'+value.OtherTime+' '
   }
   if (value.other_list == "Field_Officer") {
     if (value.OtherName == "" || value.OtherRemarks == "") {
       alert("Please enter a  name or reamrks From list  field");
     }
     else
       remark += 'called_to_fieldOfficer:' + value.OtherRemarks + " "
     // remark+=value.OtherRemarks+' '+'|'+' '+ 'called_to_fieldOfficer:'+' '+value.OtherName+' '+'|'+ ' '+'Time:'+value.OtherTime+' '
   }

   var formData: any = new FormData();

   var pay_load = {
     "action_details": {
       "shipment_no": this.graceShipment_string,
       "remarks": remark,

       "trigger_log_id": this.graceId_string,

       "alert_type": this.alertype_string,
       "email_to": "",
       "email_cc": "",
       "sms_to": ""


     }
   }
   // console.log("close pay load", pay_load)
   formData.append('AccessToken', this.token);
   formData.append('forGroup', this.group_id)
   formData.append('action_type', '0');
   formData.append('action_details', JSON.stringify(pay_load));
   formData.append('file', this.uploadfiledsk);

   if (pay_load.action_details.remarks.length > 10) {

     formData.forEach((value, key) => {
       // console.log("key-" + key + " ," + "value-" + value)
     });
     // console.log("continue.....")
     this.itraceIt.closeS(formData).subscribe(data => {
       var responce: any = data
       // console.log("qrt submit", data)
       if (responce.message == "success") {
         // console.log("responce", responce.message)

         this.alertMessage = "Trigger Close Successfully!"
         // console.log("responce", responce.message)
         // setTimeout(function () {
         $('#editwzalert').modal('show');
         $('#closeModalDesk').modal('hide');
         // }, 5000)


         // setTimeout( ()=> {
         //   location.reload();
         // },1000)
         // alert("Trigger Close Successfully,Trigger Log ID="+JSON.stringify(responce.trigger_log_id))
       }
       else {
         this.alertMessage = "Error!"
         // setTimeout(function () {
         $('#editwzalert').modal('show');
         //  }, 2000)
       }
     })

     // setTimeout(() =>{

     //   location.reload();
     // },2000)
   }
   else {
     alert("please fill at least one field");
   }

   // console.log("closeNewf",value)
   // console.log("check",Driver,Escalation_trns)
   // console.log("remark_full", remark)

   let w = document.getElementById("Drivern") as HTMLInputElement;
   w.checked = false;
   let w1 = document.getElementById("Escalation-Transportern") as HTMLInputElement;
   w1.checked = false;



 }
 /////////////////close function for above///////////////////////////////
 closeNewAbovef(value) {
   var table = $('#masterUpload').DataTable();

   // console.log("total trigger id", this.lastalrtVehicleno)
   let data = '<label "style=color:#0000FF">Updating...</label>'
   let c = $('#' + this.lastalrtVehicleno).html();
   var replaceValue = c + data;
   jQuery('#' + this.lastalrtVehicleno).html(replaceValue);
   // console.log("html data", c);
   var dummyId: any
   var arry: any = []
   let s = this.graceId_string.split(",");
   let count: any = 0
   for (var i = 0; i < s.length; i++) {
     dummyId = s[i]
     if (dummyId != null && dummyId != '') {
       $('#' + dummyId).hide()
       count++;
       // $('#'+dummyId).closest('tr').remove().draw(true);
     }
     // console.log("close above id", dummyId)

   }
   this.triggerData.Total = this.triggerData.Total - (count);
   // let id=this.graceId_string
   //   $('#triggerTableFull tbody tr').each(function(j){            
   //     $('#triggerTableFull tbody tr td:first').html(j+1);          
   // });




   // console.log("close above", value)
   var remark = '';
   const Driver = $("#" + 'DrivernA').is(":checked");
   const Escalation_trns = $("#" + 'Escalation-TransporternA').is(":checked");

   if (Driver == true) {
     if (value.driverName == "" || value.driverRemarks == "") {
       alert("Please enter a driver name or reamrks the driver field");
     }
     else

       remark += 'Called to Driver:' + value.driverRemarks + " "
     // remark+=value.driverRemarks+' '+'|'+' '+ 'Called to Driver:'+' '+value.driverName+' '+'|'+ ' '+'Time:'+value.driverTime+" "

   }
   if (Escalation_trns == true) {
     if (value.transproterName == "" || value.transporterRemarks == "") {
       alert("Please enter a Transporter name or reamrks the Transporter field");
     }
     else
       remark += 'called_to_transport:' + value.transporterRemarks + " "
     // remark+=value.transporterRemarks+' '+'|'+' '+ 'called_to_transport:'+' '+value.transproterName+' '+'|'+ ' '+'Time:'+value.transporterTime+' '
   }
   if (value.other_list == "Manager") {
     if (value.OtherName == "" || value.OtherRemarks == "") {
       alert("Please enter a  name or reamrks From list  field");
     }
     else
       remark += 'called_to_manager:' + value.OtherRemarks + " "
     // remark+=value.OtherRemarks+' '+'|'+' '+ 'called_to_manager:'+' '+value.OtherName+' '+'|'+ ' '+'Time:'+value.OtherTime+' '
   }
   if (value.other_list == "Sr.Manager") {
     if (value.OtherName == "" || value.OtherRemarks == "") {
       alert("Please enter a  name or reamrks From list  field");
     }
     else
       remark += 'called_to_Sr.manager:' + value.OtherRemarks + " "
     // remark+=value.OtherRemarks+' '+'|'+' '+ 'called_to_Sr.manager:'+' '+value.OtherName+' '+'|'+ ' '+'Time:'+value.OtherTime+' '
   }
   if (value.other_list == "QR_Team") {
     if (value.OtherName == "" || value.OtherRemarks == "") {
       alert("Please enter a  name or reamrks From list  field");
     }
     else
       remark += 'called_to_QRTeam_manager:' + value.OtherRemarks + " "
     // remark+=value.OtherRemarks+' '+'|'+' '+ 'called_to_QRTeam_manager:'+' '+value.OtherName+' '+'|'+ ' '+'Time:'+value.OtherTime+' '
   }
   if (value.other_list == "Field_Officer") {
     if (value.OtherName == "" || value.OtherRemarks == "") {
       alert("Please enter a  name or reamrks From list  field");
     }
     else
       remark += 'called_to_fieldOfficer:' + value.OtherRemarks + " "
     // remark+=value.OtherRemarks+' '+'|'+' '+ 'called_to_fieldOfficer:'+' '+value.OtherName+' '+'|'+ ' '+'Time:'+value.OtherTime+' '
   }


   var formData: any = new FormData();

   var pay_load = {
     "action_details": {
       "shipment_no": this.graceShipment_string,
       "remarks": remark,

       "trigger_log_id": this.graceId_string,

       "alert_type": this.alertype_string,
       "email_to": "",
       "email_cc": "",
       "sms_to": ""


     }
   }
   // console.log("close pay", pay_load)
   formData.append('AccessToken', this.token);
   formData.append('forGroup', this.group_id)
   formData.append('action_type', '0');
   formData.append('action_details', JSON.stringify(pay_load));
   formData.append('file', this.uploadfiledsk);



   formData.forEach((value, key) => {
     // console.log("key-" + key + " ," + "value-" + value)
   });

   if (pay_load.action_details.remarks.length > 10) {
     // console.log("okay");
     this.itraceIt.closeS(formData).subscribe(data => {
       var responce: any = data
       // console.log("qrt submit", data)
       if (responce.message == "success") {
         // console.log("responce", responce.message)

         this.alertMessage = "Trigger Close Successfully!"
         // console.log("responce", responce.message)
         // console.log("total trigger", this.triggerData.total)

         $('#editwzalert').modal('show');
         $('#closeModalabove').modal('hide');
         $('#triggerModal').modal('hide');

         //  $("#"+this.graceId_string).hide();


         // setTimeout( ()=> {
         //   location.reload();
         // },1000)
         // alert("Trigger Close Successfully,Trigger Log ID="+JSON.stringify(responce.trigger_log_id))
       }
       else {
         this.alertMessage = "Error!"
         // setTimeout(function () {
         $('#editwzalert').modal('show');
         //  }, 2000)
       }
     })

     // setTimeout(() =>{

     //   location.reload();
     // },2000)
   }
   else {
     alert("please fill at least one field");
   }

   // console.log("closeNewf", value)
   // console.log("check", Driver, Escalation_trns)
   // console.log("remark_full", remark)

 }
 //////////////closeDummy////////////////////////////////////////////////////////
 closeDummy(id) {

 }

 /////////////////////////////////////////////////////get escalation information/////////////////
 getEscalationInfo() {
   this.user_escalationinfo = []
   var response: any = []
   this.graceAlertType
   this.graceId
   this.graceShipment
   this.graceVehicle
   this.gracelevel
   var typeId = Object.keys(this.alertData).find(key => this.alertData[key] === this.graceAlertType);

   var formdata: any = new FormData();
   formdata.append('AccessToken', this.token)
   formdata.append('forGroup', this.group_id)
   formdata.append('alert_type', this.graceAlertType)
   formdata.append('trigger_id', this.graceId)
   formdata.append('alert_id', typeId)
   formdata.append('level', this.gracelevel)

   this.itraceIt.escalationInfoS(formdata).subscribe(res => {
     response = res;
     this.user_escalationinfo = response.user_escalation_list
     // console.log("trigger escalation info",res)
     // console.log("trigger escalation info list", this.user_escalationinfo)
     // console.log("checbox dataa", this.escalation_check)
   })





 }
 /////////////////////////////////////////////trigger history on lst alert///////////////////////
 TriggerHistoryF() {

 }
 ///////////////////////////////////////////////////////////////trigger check change function for email///////////////
 triggerCheckemailF(event, email) {
   // for( var i=0; i<this.user_escalationinfo.length; i++ )
   // {
   //   if(this.user_escalationinfo[i].checked_email==true)
   //   {
   //     console.log("check mail")
   //   }
   // }
   // console.log("checbox dataa", this.escalation_check)
   // var checkbox_phoneno = ''
   // console.log("trigger check change function", event)
   if (event.target.checked == true) {
     if (email != "") {
       this.checkbox_email += email + ','
     }
   }

   else {
     this.checkbox_email = this.checkbox_email.replace(email, '')

   }
   // console.log("checbox dataa", this.escalation_check)
   // console.log("phone", this.checkbox_email);
 }
 //////////////////////////////////////////////////////trigger check sms function///////////
 triggerCheckSmsF(event, sms) {

   // var checkbox_phoneno = ''
   // console.log("trigger check change function", event)
   if (event.target.checked == true) {
     if (sms != "") {


       //  this.escalation_check.push(data)
       this.checkbox_phoneno += sms + ','
     }
   }

   else {
     this.checkbox_phoneno = this.checkbox_phoneno.replace(sms, '')
   }
   // for(var i=0;i<this.escalation_check.length;i++)
   // {
   //   if(this.escalation_check[i].user_id==data.user_id)
   //   {
   //     this.escalation_check.splice(i,1)
   //   }

   // }

   // console.log("checbox dataa fon", this.checkbox_phoneno)

 }
 ////////////////////////////////////escalation submit function////////////////////////////////////////
 escalationF(value) {
   // console.log("escalation full data", value)
   for (var i = 0; i < this.user_escalationinfo.length; i++) {
     if (this.user_escalationinfo[i].checked_email == true) {
       // console.log("check mail")
       this.checkbox_email += +this.user_escalationinfo[i].email_id + ','

     }
     if (this.user_escalationinfo[i].checked_sms == true) {
       // console.log("check mail")
       this.checkbox_phoneno += +this.user_escalationinfo[i].phone_no + ','

     }
   }
   // console.log("checbox dataa fon no.", this.checkbox_phoneno)
   // console.log("checbox dataa email.", this.checkbox_email)
   // console.log("checbox dataa", this.escalation_check)
   // console.log("escalation submit function", value)
   var typeId = Object.keys(this.alertData).find(key => this.alertData[key] === this.graceAlertType);
   var formdata: any = new FormData();

   var AccessToken: any
   var pay_load = {
     "action_details": {
       "shipment_no": this.graceShipment,
       "remarks": value.graceRemarks,
       "vehicle_no": this.graceVehicle,
       "trigger_id": this.graceId,
       "level": value.actionLevel,
       "alert_type": this.graceAlertType,
       "email_to": "",
       "email_cc": this.checkbox_email,
       "sms_to": this.checkbox_phoneno


     }
   }
   // console.log("trigger escalation patload", pay_load)
   formdata.append('action_type', "escalate")
   formdata.append('action_details', JSON.stringify(pay_load))
   formdata.append('AccessToken', this.token)
   formdata.append('forGroup', this.group_id)
   // formdata.append('action_details',this.gracelevel)
   this.itraceIt.escalatSubmitS(formdata).subscribe(res => {
     // console.log("trigger escalation", res)
     var responce: any = res
     // console.log("qrt submit", res)
     if (responce.message == "success") {
       // console.log("responce", responce.message)

       this.alertMessage = "Escalate Successfully!"
       // console.log("responce", responce.message)
       // setTimeout(function () {
       $('#editwzalert').modal('show');
       // }, 2000)



       setTimeout(() => {
         location.reload();
       }, 3000)
     }
     else {
       this.alertMessage = "Error!"
       // setTimeout(function () {
       $('#editwzalert').modal('show');
       //  }, 2000)
     }

     // alert(JSON.stringify(res))
   })
   // location.reload();




 }
 demotable() {
   alert("called")
 }

 buttonFunction() {
   alert("cakll")

   let Badge = document.getElementById('inActive') as HTMLLIElement

   // console.log("buttonFunction");



   // throw new Error('Function not implemented.');
 }
 ///////////////////////////////////////////////////////graceBTNSUBMIT///////////////////////////////////////
 qrtList() {
   this.qrtListData = []
   var f: any = []
   var qrtList: any = []
   // var dummy:any
   var formData = new FormData();
   console.log("formData", this.token, this.group_id)
   formData.append('AccessToken', this.token)
   formData.append('forGroup', this.group_id)
   this.itraceIt.assignQrtS(formData).subscribe(data => {
     // console.log("qrtList original", data)
     //  next: (response) => alert(response),
     //     error: (error) => alert(error),
   console.log("qrtList",data);
   
     f = data
     var dummy: any = []
     dummy = f.qrt_user
     //  console.log("dummy", dummy)
     for (const [key, value] of Object.entries(f.qrt_user)) {
       qrtList = value

       // this.qrtListData.push(key)
       this.qrtListData.push(value)
       // this.qrtListData.push(qrtList.name)
       // this.qrtListData.push(key)

     }
     // console.log("qrtList", this.qrtListData);

     // qrtList.push(f.qrt_user)
     // console.log("formdata",qrtList.name)
     // this.qrtListData=res.qrt_user

   })
 }
 //////////////////////////////////////////////qrt submit funstion//////////////////////////
 qrtSubmitF(data) {
   // console.log("fullqrtdata",data)
   // console.log("fullqrtdata", data.qrtUser)
   var formData: any = new FormData();
   var AccessToken: any
   var pay_load = {
     "action_details": {
       "shipment_no": this.graceShipment,
       "remarks": data.remarks,
       "vehicle_no": this.graceVehicle


     }
   }

   formData.append('AccessToken', this.token)
   formData.append('forGroup', this.group_id)
   formData.append('action_details', JSON.stringify(pay_load));


   formData.append('qrt_user_id', data.qrtUser);

   // console.log("qrtSubmitF",data)
   // console.log("qrtSubmitF",pay_load)
   //  console.log("qrtSubmitF",pay_load)

   if (pay_load.action_details.remarks != (false || undefined)) {


     if (pay_load.action_details.shipment_no != null && data.qrtUser != null) {
       // console.log("userid",data.qrtUser)
       this.itraceIt.assignQrtSubmitS(formData).subscribe(res => {
         // console.log("qrt submit responce", res)
         var responce: any = res

         if (responce.message == "success") {
           // console.log("qrt responce", responce.message)
           this.alertMessage = "QRT submit Successfully!"
           // console.log("responce", responce.message)
           // setTimeout(function () {
           $('#editwzalert').modal('show');
           // }, 2000)



           setTimeout(() => {
             location.reload();
           }, 3000)
           // alert("QRT Assigned Successfully")
         }
         else {
           this.alertMessage = "Error!"
           // setTimeout(function () {
           $('#editwzalert').modal('show');
           //  }, 2000)
         }

       })
       // console.log("qrtSubmit")
       // console.log("remarks", pay_load.action_details.remarks)


     }
     else {
       alert("All fields are Mandatory")
     }
   }

   else {
     alert("All fields are Mandatory")

   }
   //   this.itraceIt.assignQrtSubmitS(formData ).subscribe(res=> {

   //     var responce:any = []
   //     responce= res
   //     console.log("qrtSubmit", res)
   //     alert(JSON.stringify(res))
   //  })
   //  location.reload();

 }
 ///////////////////////////////////////////////qrtSubmit from desktop above//////////////
 qrtSubmitAboveF(data) {
   // console.log("fullqrtdata", data)
   // console.log("fullqrtdata", data.qrtUser)
   var formData: any = new FormData();
   var AccessToken: any
   var pay_load = {
     "action_details": {
       "shipment_no": this.graceShipment,
       "remarks": data.remarks,
       "vehicle_no": this.graceVehicle


     }
   }
   formData.append('AccessToken', this.token)
   formData.append('forGroup', this.group_id)
   formData.append('action_details', JSON.stringify(pay_load));


   formData.append('qrt_user_id', data.qrtUser);

   // console.log("qrtSubmitF", data)

   if (pay_load.action_details.remarks != (false || undefined)) {


     if (pay_load.action_details.shipment_no != null && data.qrtUser != null) {
       // console.log("userid", data.qrtUser)
       this.itraceIt.assignQrtSubmitS(formData).subscribe(res => {

         var responce: any = res
         // console.log("qrt submit", res)
         if (responce.message == "success") {
           // console.log("responce", responce.message)

           this.alertMessage = "Grace Taken Successfully!"
           // console.log("responce", responce.message)
           // setTimeout(function () {
           $('#editwzalert').modal('show');
           // }, 2000)



           setTimeout(() => {
             location.reload();
           }, 3000)
           // alert("QRT Assigned Successfully")
         }

         else {
           this.alertMessage = "Error!"
           // setTimeout(function () {
           $('#editwzalert').modal('show');
           //  }, 2000)
         }
       })
       // console.log("qrtSubmit")
       // console.log("remarks", pay_load.action_details.remarks)

     }
     else {
       alert("All fields are Mandatory")
     }
   }

   else {
     alert("All fields are Mandatory")

   }
   //   this.itraceIt.assignQrtSubmitS(formData ).subscribe(res=> {

   //     var responce:any = []
   //     responce= res
   //     console.log("qrtSubmit", res)
   //     alert(JSON.stringify(res))
   //  })
   //  location.reload();

 }
 /////////////////////////////////////////////////////////////////qrt submit from desktop////////////
 qrtSubmitDskF(data) {
   // console.log("fullqrtdata",data)
   // console.log("fullqrtdata")
   var formData: any = new FormData();
   var AccessToken: any
   var pay_load = {
     "action_details": {
       "shipment_no": data.shipment_No,
       "remarks": data.remarks,
       "vehicle_no": this.newalertinfo.vehicle_no !=undefined ? this.newalertinfo.vehicle_no:""

     }
   }
   formData.append('AccessToken', this.token)
   formData.append('forGroup', this.group_id)
   formData.append('action_details', JSON.stringify(pay_load));


   formData.append('qrt_user_id', data.qrtUser);

   // console.log("qrtSubmitF", pay_load);
   // console.log("qrtSubmitF", data.qrtUser);

   if (pay_load.action_details.remarks != (false || undefined)) {


     if (pay_load.action_details.shipment_no != null && data.qrtUser != null) {
       // console.log("userid", data.qrtUser)
       this.itraceIt.assignQrtSubmitS(formData).subscribe(res => {

         var responce: any = res
         // console.log("qrt submit", res)
         if (responce.message == "success") {
           // console.log("responce", responce.message)
           // alert("QRT Assigned Successfully")

           this.alertMessage = "Grace Taken Successfully!"
           // console.log("responce", responce.message)
           // setTimeout(function () {
           $('#editwzalert').modal('show');
           // }, 2000)



           setTimeout(() => {
             location.reload();
           }, 3000)
         }
         else {
           this.alertMessage = "Error!"
           // setTimeout(function () {
           $('#editwzalert').modal('show');
           //  }, 2000)
         }
       })
       // console.log("qrtSubmit")
       // console.log("remarks", pay_load.action_details.remarks)
       // setTimeout(() =>{
       //   // this.dashboardData1();
       //   location.reload();
       // },2000)
     }
     else {
       alert("All fields are Mandatory")
     }
   }

   else {
     alert("All fields are Mandatory")

   }

   //  location.reload();

 }
 //////////////////////////////////////////////////////Xclosefunctions////////////////
 xcloseF() {
   // console.log("xcloseF")
 }
 ////////////////////////////////////////////////////////////////alert type functions/////////////////
 alertTypeF(event) {
   var sub_type_nameTrig: any = []
   ///////////1==trigger,2===threat/////
   if (event == '1') {
     // alert(event)
     this.alertType = true
     this.triggerSelectFlag = true
     this.threatSelectFlag = false
     // console.log("alertTypedata", this.threatsdata)
     sub_type_nameTrig = { name: "", color: "", code: "", id: "" }
     // console.log("dummy", sub_type_nameTrig)

   }
   else if (event == '2') {
     this.alertType = false
     // alert(event)
     this.triggerSelectFlag = false
     this.threatSelectFlag = true
   }
   // console.log("triggr", this.triggerSelectFlag)
 }
 ///////////////////////////////////////////////////////shipment function
 shipmentSelectF(event) {

   this.newalertinfo = []

   // console.log("shipmentSelectF", event)
   // console.log("shipmentSelect",this.alltrip)
   for (const [key, value] of Object.entries(this.alltrip)) {
     if (key == event) {
       // console.log("shipmentSelect matched")
       this.newalertinfo = (value)
     }

   }
   // console.log("array", this.newalertinfo);
 }
 ///////////////////////////change functin for threat type//////////////////////////////////////////
 threatType(event) {
   // console.log("threatType", event);
   this.threatDataNew = event
   // console.log("threatType new", this.threatDataNew);
   this.threatSubType = event.category
 }
 ////////////////////////////////////////////////////////////////submit function of add new alert//////////////////////////////////////
 newTripF(data) {
   // $('#editwzalert').modal('show');
   // this.alertMessage="Please wait!"
   var formData: any = new FormData();
   // console.log("full data", data)
   // console.log("form data level", this.newtripsubData)
   // console.log(" mt fill", this.newalertinfo)
   // console.log(" mtrip id", this.newalertinfo['id'])


   // console.log("form data find", data.sub_type_name)  /////////////////////////value of trigger
   var lost = Object.keys(this.alertData).find(key => this.alertData[key] === data.sub_type_name); //////////key of trigger value
   // console.log("lost", lost)
   var sub_type_nameTrig: any = []

   this.newtripsubData = []
   //  this.newalertinfo['m_trip_id']=this.newalertinfo['id']
   //  delete this.newalertinfo['id']

   var load =
     this.newtripsubData



   this.newtripsubData = Object.assign(this.newalertinfo, data)


   // Object.keys(this.newtripsubData).forEach(key => {
   //  console.log('key', key);     
   // console.log('value', this.newtripsubData[key]);   
   // items.push({'id':5}); 
   // temp.push ({[key]:this.newtripsubData[key]})
   // });
   // console.log('key', temp);
   // console.log("load", this.newtripsubData)
   if (this.alertType == false) {
     //////////////////////////////////////////////threat///////////////////////////

     // this.tripLevel=""
     // this.sub_type_name=this.newtripsubData.sub_type_name
     formData.append('name', data.sub_type_name.name);
     formData.append('id', data.sub_type_name.id);
     formData.append('color', data.sub_type_name.color);
     formData.append('code', data.sub_type_name.code);
     formData.append('level', "");
     formData.append('category', data.Threat_sub_type);
     this.alertMessage = "New Threat Create Successfully!"
     // console.log("threat data", data.sub_type_name.name, data.sub_type_name.id, data.sub_type_name.color, data.sub_type_name.code, data.Threat_sub_type)

   }
   else if (this.alertType == true) {
     formData.append('name', data.sub_type_name);
     formData.append('id', lost);

     formData.append('color', "");
     formData.append('code', "");

     formData.append('level', data.level);
     // console.log('level', data.level);
     this.alertMessage = "New Alert Create Successfully!"
     ////////////////////////////////////////////trigger/////////////////////////////

     // sub_type_nameTrig={name: this.newtripsubData.sub_type_name,color:"",code:"",id:"4"}
     this.sub_type_name = sub_type_nameTrig
     this.tripLevel = this.newtripsubData.level
   }

   // console.log("message data", this.newtripsubData);


   let dt = this.newtripsubData.log_time.replace('T', ' ');
   // console.log("time a", dt)
   // console.log("time bef", this.newtripsubData.log_time)
   formData.append('AccessToken', this.token)
   formData.append('forGroup', this.group_id)
   formData.append('shipment_no', this.newtripsubData.shipment_no);

   // formData.append('sub_type_id', this.newtripsubData.sub_type_id);
   formData.append('type', this.newtripsubData.type);
   // formData.append('level', this.tripLevel);
   // formData.append('color', this.newtripsubData.color);
   formData.append('vehicle_no', this.newtripsubData.vehicle_no);
   formData.append('run_date', this.newtripsubData.run_date);
   // formData.append('log_time', this.newtripsubData.log_time);

   formData.append('log_time', dt);
   formData.append('location', this.newtripsubData.location);
   formData.append('route_id', this.newtripsubData.route_id);
   formData.append('route', this.newtripsubData.route);
   formData.append('shipment_method', this.newtripsubData.shipment_method);
   formData.append('geocoord', this.newtripsubData.geocoord);
   formData.append('message', this.newtripsubData.message);
   formData.append('driver_info', this.newtripsubData.driver_info);
   formData.append('source_code', this.newtripsubData.source_code);
   formData.append('destination_code', this.newtripsubData.destination_code);
   // formData.append('m_trip_id', this.newtripsubData.m_trip_id);
   formData.append('m_trip_id', this.newalertinfo['id']);

   // console.log("shipment_no",this.newtripsubData.shipment_no);
   // console.log("type name",this.sub_type_name)
   // console.log("level",this.tripLevel)
   // console.log("level",formData.append)
   // for (let [key, value] of formData.entries()) {
   //   console.log(`${key}: ${value}`);
   // }
   // console.log("start payload", data.level)

   formData.forEach((value, key) => {
     // console.log("key-" + key + " ," + "value-" + value)
   });
   // setTimeout( ()=> {
   //             location.reload();
   //           },20000)



   this.itraceIt.createAlertS(formData).subscribe(res => {

     var responce: any = res
     // console.log("new trip eresponce", res)

     if (responce.status == "success") {
       $('#editwzalert').modal('show');
       // console.log("responce", responce.message)


       // console.log("responce", responce.message)











     }
     else {
       this.alertMessage = "Error!" + responce.message
       // setTimeout(function () {
       $('#editwzalert').modal('show');
       //  }, 2000)
     }
     $('#editwzalert').modal('show');
     setTimeout(() => {
       location.reload();
     }, 2000)


   })


 }
 /////////////////////vehicle track track dfg///////////////////////////////
 vehicle_dfg(route_id, alertsummary) {
   this.initMap1();
   for (let b = 0; b < alertsummary.length; b++) {
     if (alertsummary[b].alert_name == 'DFG') {
       console.log("alert summary", alertsummary)
       var dfgPolyline: any = [];
       var lat_long: any = []
       var formdataCustomer = new FormData()
       formdataCustomer.append('AccessToken', this.token)
       formdataCustomer.append('forGroup', this.group_id);
       formdataCustomer.append('route_id', route_id);
       var obj: any = []

       this.itraceIt.vehicle_dfgS(formdataCustomer).subscribe((res: any) => {
         console.log("dfg polyloine", res)
         console.log("hello")
         this.latlngbounds = new google.maps.LatLngBounds();
         if (res.Polyline != "") {
           console.log("after condition", res.Polyline)
           const arry = res.Polyline
           const arry1 = arry.split("^")

           var color = arry1[1].split("~")
           console.log("color", color)
           // const arry1=arry.split(/[,()]+/)
           const arry2 = arry1[0].split(/[,( )]+/)
           console.log("split", arry1)
           console.log("lat long", arry2)
           console.log("araay2length", arry2.length)
           for (let i = 1; i < arry2.length - 1; i++) {

             this.latlngbounds.extend(new google.maps.LatLng(parseFloat(arry2[i]), parseFloat(arry2[i + 1])));
             lat_long = new google.maps.LatLng(
               arry2[i], arry2[i + 1])


             // console.log("draw", lat_long);

             dfgPolyline.push(lat_long);
             dfgPolyline.push(lat_long);


             i++;
             let draw_polyline = new google.maps.Polyline({
               path: dfgPolyline,
               geodesic: true,
               strokeColor: color[0],
               strokeOpacity: 2.0,
               strokeWeight: 3,
               map: this.map1,





             });
             this.map1.fitBounds(this.latlngbounds);
             // console.log("draw", draw_polyline.path);
             // console.log("draw", dfgPolyline);

           }

         }

       })
     }
   }

 }
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 dummytracking(item) {
   $('#v_track_Modal').modal('show');
   var dfgFlag: any
   // this.lat_lng = { lat: lati, lng:long };
   console.log("lat long", item.lat, item.lng);
   var flag: any
   this.map_flag = ''
   this.initMap1();
   // this.map1.setCenter(new google.maps.LatLng(item.lat, item.lng));

   if (item.imei == "" && item.imei2 == "" && item.imei3 == "") {
     this.map_flag = 'Device unavailable '
     flag = 0
   }
   console.log("ist imei", item.imei)
   var address: any
   var imei: any = item.imei
   //  this.seconddaryTrack=[];
   //  this.seconddaryTrack.push([run_date,imei2,vehicle_no,item,Id,route_id,alertsummary,imei,imei3]);
   // console.log("secondary track",this.seconddaryTrack);
   // console.log("secondary track 8",this.seconddaryTrack[0][8]);
   if (item.imei == '') {
     // alert("Device not available")
     // this.map_flag='Device unavailable '
     imei = item.imei2
   }
   if (item.imei == '' && item.imei2 == '') {
     imei = item.imei3
   }
   // else{


   //   this.map_flag='Device unavailable '
   // }


   // var lat_lng = { lat: 22.767427, lng: 88.388344 };
   // this.map1 = new google.maps.Map(document.getElementById('map1') as HTMLElement, {
   //   zoom: 12,
   //   // center: lat_lng,

   //   mapTypeId: google.maps.MapTypeId.ROADMAP,
   //   scaleControl: true,

   // }
   // );
   // this.map1.setCenter(new google.maps.LatLng(lati, long));
   if (flag != 0) {

     this.map_flag = 'please wait'
     this.customer_info = []

     this.poly_line = []
     var myarray: any = []
     var latlongS: any = []
     var customer: any = []
     var custolatlong: any = []
     var icon: any
     let currentDateTime = this.datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');

     console.log("dat time", currentDateTime);
     console.log("vehicle", item)
     this.latlngbounds = new google.maps.LatLngBounds();
     ////////////////////////////////////////trackings api/////////////////////////////////////////////////////////
     var rest: any = [];
     // console.log("tracking data values",this.token,)
     var formData: any = new FormData();
     console.log("vehicle", item.run_date, imei, item.vehicle_no, this.token, currentDateTime)
     formData.append('AccessToken', this.token)
     formData.append('startdate', item.run_date);
     formData.append('enddate', currentDateTime);
     formData.append('time_interval', '30');
     formData.append('imei', imei);
     formData.append('group_id', this.group_id);
     formData.append('AccountId', this.account_id);
     formData.append('portal', 'itraceit');
     this.itraceIt.vehicleTrackongS(formData).subscribe((res: any) => {
       // console.log("vehicle tracking responce tracking", res);
       console.log("vehicle tracking responce to check", this.token, item.run_date, currentDateTime, imei, this.group_id, this.account_id);
       //  rest=res
       //  next: (response) => alert(response),
       // error: (error) => alert(error),

       this.trackingData = (res.data)
       // this.initMap1();
       // if(item.lat=="" || item.lat==",")
       // {
       //   this.map1.setCenter(new google.maps.LatLng( this.trackingData[0].lat,  this.trackingData[0].long));
       // }


       // console.log("vehicle tracking 1", this.trackingData[0])
       if (rest.data == 'Vehicle is inactive.' || rest.data.length == 0) {
         alert("Track data is not available")
       }
       else {

         ///////////////////////////////////////////////////////////////marker/////////////
         for (let i = 0; i < this.trackingData.length; i++) {

           /////////////////////////////////////////////////////////icon//////////////////////////////
           if (i == 0) {

             icon = 'assets/images/users/start_marker.png';
             // $icon_type="start";
           } else if (i + 2 == this.trackingData.length) {

             icon = 'assets/images/users/stop_marker.png';
             // $icon_type="end";
           } else {
             icon = 'assets/images/users/green_Marker1.png';

             //   if(this.trackingData[i]?.speed >5 && this.trackingData[i]?.speed <=20) {
             //       icon='assets/images/users/yellow_Marker_bottom.png';
             //       // $icon_type="yellow";
             //   } else if((this.trackingData[i]?.speed>20 &&this.trackingData[i]?.speed<80 )) {
             //       icon='assets/images/users/green_Marker1.png';
             //       // $icon_type="green";
             //   }else if((this.trackingData[i]?.speed>80)) {



             //     icon='assets/images/users/green_Marker1.png';
             //     // $icon_type="green";
             // } else if((this.trackingData[i]?.speed<=5) ) {
             //       icon='assets/images/users/red_Marker1.png';
             //       // $icon_type="red";
             //   } else {
             //       icon='assets/images/users/red_Marker1.png';
             //       // $icon_type="red";
             //   }
           }



           //////////////////////////////////////////////////////////////////////////////////////////////
           // this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.trackingData[i].lat), parseFloat(this.trackingData[i].long)));
           // console.log("longituted tracking",this.trackingData[i].Longitude)
           // var lat_lng = { lat: this.trackingData[0].lat, lng: this.trackingData[0].long };
           // var node: any = []
           // node[i] = new google.maps.LatLng(
           //   this.trackingData[i].lat,this.trackingData[i].long)


           //   this.poly_line.push(node[i]);
           //   this.poly_line.push(node[i]);
           this.marker =
           {
             mark: new google.maps.Marker({
               map: this.map1,

               position: new google.maps.LatLng(
                 this.trackingData[i].lat, this.trackingData[i].long),
               title: this.trackingData[i].lat + "," + this.trackingData[i].long,

               icon: icon,
               // // Address: this.trackingData[i].Address,
               // vehicle_no:this.trackingData[i].vnumber,
               // Imei:this.trackingData[i].imei,
               // time:this.trackingData[i].device_time,
               // distance:this.trackingData[i].distance,
               // speed:this.trackingData[i].speed,
               // ServerTime:this.trackingData[i].server_time,
               // // Battery:this.trackingData[i].Battery,
               // DType:this.trackingData[i].dtype,





               // center: lat_lng,
             })




           }
           var node: any = []
           node[i] = new google.maps.LatLng(
             this.trackingData[i].lat, this.trackingData[i].long)


           this.poly_line.push(node[i]);
           this.poly_line.push(node[i]);
           // this.map1.setCenter(new google.maps.LatLng(lati, long));

           let draw_polyline = new google.maps.Polyline({
             path: this.poly_line,
             geodesic: true,
             strokeColor: 'green',
             strokeOpacity: 0.8,
             strokeWeight: 1.5,
             map: this.map1,
             icons: [{
               icon: { path: google.maps.SymbolPath.FORWARD_OPEN_ARROW },
               //  google.maps.SymbolPath.FORWARD_CLOSED_ARROW
               offset: '100%',
               repeat: '1000px'
             }],


             //   icons: [{
             //     icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
             //     offset: '80%',
             //     strokeOpacity: 1.0,

             //     // repeat: '30px',
             //     // fillOpacity: 0.8,
             //     //  strokeOpacity: 6,
             //     //  strokeColor: 'black',
             //     //  scale:2

             // }]




           });
           // this.map1.setZoom(8)
           // this.map1.fitBounds(this.latlngbounds);

           google.maps.event.addListener(this.marker.mark, 'click', (event) => {
             console.log("latlong", event.latLng.lat(), event.latLng.lng())
             //////////////////address//////////////////////////////////////
             var formdataCustomer = new FormData()
             formdataCustomer.append('AccessToken', this.token)
             formdataCustomer.append('VehicleId', item.vehicle_no);
             formdataCustomer.append('ImeiNo', imei);
             // formdataCustomer.append('ImeiNo',data.imei);
             formdataCustomer.append('LatLong', event.latLng.lat() + ',' + event.latLng.lng());
             formdataCustomer.append('portal', 'itraceit');

             this.itraceIt.addressS(formdataCustomer).subscribe((res: any) => {

               // console.log("responce", res)
               address = res.Data.Address
               console.log("address", res.Data.Address)

               this.showWindow(this.trackingData[i], item.vehicle_no, address)
               this.closeLastOpenedInfoWindow();
               infowindowMarker.setContent(this.contentsInfo);

               infowindowMarker.setPosition(event.latLng);

               infowindowMarker.open(this.map1, node);


             })


             ///////////////////////////////////////////////////////////////////////



           })
           // var listener = google.maps.event.addListener(this.map1, "idle", () => { 
           //   if (this.map1.getZoom() > 14) this.map1.setZoom(14); 
           //   google.maps.event.removeListener(listener); 
           // });

           var infowindowMarker = new google.maps.InfoWindow({
             content: this.contentsInfo,
           });
         }

       }


       /////////////////////////////////////////////////polyline/////////////////////////
       // var poly=new google.maps.LatLng(
       //   item[z].lat,  item[z].lng)


       // console.log("polyline: " + draw_polyline.path);

       //////////////////////////////////////////////////////////////////////////////////











       // this.map1.fitBounds(this.latlngbounds);
       // this.map1.setZoom(16)
       // this.map1.fitBounds(this.latlngbounds);


     })


     //////////////////////////////////////dfg polyline///////////////////////
     var dummy: any = [];
     var fdummy: any[]
     // for(let b=0;b<alertsummary.length;b++)
     //   {
     //     if(alertsummary[b].alert_name=='DFG')
     //     {
     console.log("alert summary", item.alertsummary)
     var dfgPolyline: any = [];
     var lat_long: any = []
     var formdataCustomer = new FormData()
     formdataCustomer.append('AccessToken', this.token)
     formdataCustomer.append('forGroup', this.group_id);
     formdataCustomer.append('route_id', item.route_id);
     var obj: any = []

     this.itraceIt.vehicle_dfgS(formdataCustomer).subscribe((res: any) => {
       // console.log("dfg polyloine", res.Polyline);
       dfgFlag = res.Polyline
       // console.log("hello");
       // this.latlngbounds = new google.maps.LatLngBounds();
       if (res.Polyline != "") {
         var last: any = []
         var arr1 = res.Polyline.split("~")
         var first = arr1[0];

         dummy.push(first);

         last = arr1[1]

         var str = res.Polyline.replace(/ *\^[^~]*\~ */g, "");
         // console.log("new string", str);
         //  dummy.push(str);
         /////////////////////////////////////////////////////////////////////////////////////////     
         // console.log("const final",last);
         var final: any = []











         // console.log("final dummy",dummy)

         const arry2 = str.split(/[,( )]+/)
         // fdummy.push(arry2)
         // console.log("fdummy new split ", arry2)
         for (let i = 1; i < (arry2.length) - 1; i++) {
           // console.log("fdummy i ki value",i, arry2[i])
           //  this.latlngbounds.extend(new google.maps.LatLng(parseFloat(arry2[i]), parseFloat(arry2[i+1])));
           lat_long = new google.maps.LatLng(
             arry2[i], arry2[i + 1])


           // console.log("draw", lat_long);

           dfgPolyline.push(lat_long);
           dfgPolyline.push(lat_long);


           i++;
           let draw_polyline = new google.maps.Polyline({
             path: dfgPolyline,
             geodesic: true,
             strokeColor: "blue",
             strokeOpacity: 2.0,
             strokeWeight: 3,
             map: this.map1,





           });

           // console.log("draw", draw_polyline.path);
           // console.log("draw", dfgPolyline);

         }



         // console.log("split array dummy", dummy)
         // console.log("split array fdummy",fdummy)



       }

     })
     //   }
     //   // this.map1.fitBounds(this.latlngbounds);
     // }
     //////////////////////////////////////////vehicle customer///////////
     var formdataCustomer = new FormData()
     formdataCustomer.append('AccessToken', this.token)
     formdataCustomer.append('forGroup', this.group_id);
     formdataCustomer.append('id', item.id);
     var obj: any = []

     this.itraceIt.tripCustomerS(formdataCustomer).subscribe((res: any) => {
       //  console.log("vehicle customer",res)
       // customer=res
       this.customer_info = res.customer_info
       // console.log("vehicle customer", this.customer_info)
       // this.latlngbounds = new google.maps.LatLngBounds();
       for (let x = 0; x < this.customer_info.length; x++) {

         // this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.customer_info[x].Lat), parseFloat(this.customer_info[x].Lng)));
         var custo: any = []
         custo[x] = new google.maps.LatLng(
           this.customer_info[x].Lat, this.customer_info[x].Lng)


         this.markers =
         {
           mark: new google.maps.Marker({
             map: this.map1,

             position: new google.maps.LatLng(
               this.customer_info[x].Lat, this.customer_info[x].Lng),
             title: this.customer_info[x].Lat + "," + this.customer_info[x].Lng,
             label: {
               text: this.customer_info[x].SequenceNo,
               color: 'black',
               fontSize: "12px",
               fontWeight: "500",
               fontFamily: 'Tangerine',


             },
             location: this.customer_info[x].LocationCode,
             podStatus: this.customer_info[x].PodStatus,
             arrivalTime: this.customer_info[x].GeoArrivalTime,
             departureTime: this.customer_info[x].GeoDepartureTime
             // labelContent: '<i class="fa fa-flag" style="color:rgba(153,102,102,0.8);"></i>',
             // icon: ' ',
             // Address: this.trackingData[i].Address,
             // vehicle_no:this.trackingData[i].VehicleNo,
             // Imei:this.trackingData[i].ImeiNo,





           }),






         }
         /////////////////////////////////////////////////////////////////////////customer///////////////////

         var customer_Info: string = ''
         let pod: string = '';
         let type: string = '';
         let arrival_time: string = '';
         let departure_time: string = '';
         google.maps.event.addListener(this.markers.mark, 'click', (event) => {
           console.log("event", x, this.markers.mark.podStatus, this.customer_info[x].LocationCode)

           if (this.customer_info[x].PodStatus == 0) {
             pod = '-'
           }
           if (this.customer_info[x].PodStatus == 1) {
             pod = 'DONE'
           }
           if (this.customer_info[x].LocationSequence == 0) {
             type = 'ORIGIN'
           }
           if (this.customer_info[x].LocationSequence == 1) {
             type = ' INTERMEDIATE STATION '
           }
           if (this.customer_info[x].LocationSequence == 2) {
             type = ' DESTINATION '
           }
           if (this.customer_info[x].GeoArrivalTime != '') {
             arrival_time = this.customer_info[x].GeoArrivalTime + '[GPS]'
           }
           if (this.customer_info[x].GeoArrivalTime == '') {
             arrival_time = this.customer_info[x].ArrivalTime
           }
           if (this.customer_info[x].GeoDepartureTime != '') {
             departure_time = this.customer_info[x].GeoDepartureTime + '[GPS]'
           }
           if (this.customer_info[x].GeoDepartureTime == '') {
             departure_time = this.customer_info[x].DepartureTime
           }


           customer_Info = '<table class="border">' +
             '<tbody>' +

             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Location</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + this.customer_info[x].LocationCode + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">PodStatus</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + pod + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Type</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + type + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">ArrivalTime</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + arrival_time + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DepartureTime</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + departure_time + '</td>' +
             '</tr>' +
             '</tbody>' +
             '</table>'




           this.closeLastOpenedInfoWindow();
           infowindowMarker_custo.setContent(customer_Info);

           infowindowMarker_custo.setPosition(event.latLng);

           infowindowMarker_custo.open(this.map1, custo);
           //this.lastOpenedInfoWindow=0; 
           this.lastOpenedInfoWindow = infowindowMarker_custo;
         })

         var infowindowMarker_custo = new google.maps.InfoWindow({
           content: customer_Info,
         });


       }
       // this.customer_info.push(obj);
       // console.log("obj",obj)



     })
     // var array:any=[]
     // console.log("customer array", this.customer_info)









     ////////////////////////////////////////////////////////////////////////////////////////////////////
     for (let z = 0; z < item.length; z++) {

       // this.latlngbounds.extend(new google.maps.LatLng(parseFloat(item[z].lat), parseFloat(item[z].lng)));
       //  console.log("myarray",item[z].lat);
       ///////////////////////////////////////////////////////////marker label //////////////////////////////////////////////////////////////////////////////////////////
       //        
       //        
       //  


       ///////////////////////////////////////////////show alert ///////////////////////////////////////////////////////////      

       var markerLabel =
       {
         mark: new google.maps.Marker({
           map: this.map1,

           position: new google.maps.LatLng(
             item[z].lat, item[z].lng),
           title: item[z].lat + "," + item[z].lng + "," + item[z].alert_type,
           // Icon:"assets/images/users/alertFlag.png",
           // label: {
           //   text:  (item[z].alert_type).slice(0,4),
           //   color: 'black',
           //   fontSize: "10px",
           //   fontWeight: "bold",
           //   fontFamily: "Helvetica",
           // },
           icon: {
             url: "assets/images/users/icons-flag-big.png",
             labelOrigin: new google.maps.Point(20, 15),

           },



           label: {
             text: (item[z].alert_type).slice(0, 4),
             color: 'white',
             fontSize: "12px",
             fontWeight: "bold",
             // fontFamily: 'Tangerine',
             textalign: 'center',
             Position: 'relative',
             // bottom: 1,



           },






         })





       }





     }
     // console.log("alert type", item)
     //  if(this.trackingData.length>0)
     //   {
     //     this.map_flag=' '
     //   }
     // setTimeout(() =>{
     //   // this.dashboardData1();
     //   if(this.trackingData.length==0 &&dfgFlag=="")
     //   {
     //     this.map_flag='Track data Not Available'
     //   }
     //  else if(this.trackingData.length>0)
     //   {
     //     this.map_flag=' '
     //   }

     // },1000)
   }


 }

 ////////////////////////////////////////////////////////////////////vehicle tracking functiom///////////////////
 vehicleTrackoldF(run_date, imei, imei2, vehicle_no, item, Id, route_id, alertsummary, imei3, lati, long)
  {
  //  this.initMap1();

   // this.marker.setMap(null);
   this.trackingData = [];
   this.seconddaryTrack = [];
   this.customer_info = [];
   // let center = { lat: lati, lng: long};
   
   // this.map1.setCenter(new google.maps.LatLng(lati, long));
   // this.map1.clearOverlays();

 //   for (var i = 0; i < this.markersArray.length; i++ ) {
 //     this.markersArray[i].setMap(null);
 //   }
 //  this. markersArray = [];
   




   let dfgFlag: any
   // this.lat_lng = { lat: lati, lng:long };
   console.log("lat long", lati, long);
   let flag: any
   this.map_flag = ''



   if (imei == "" && imei2 == "" && imei3 == "") {
     this.map_flag = 'Device unavailable '
     flag = 0
   }
   console.log("ist imei", imei)
   var address: any

   // this.seconddaryTrack.push([run_date, imei2, vehicle_no, item, Id, route_id, alertsummary, imei, imei3]);

   if (imei == '')
    {

     imei = imei2
   }
   if (imei == '' && imei2 == '') {
     imei = imei3
   }

   if (flag != 0) {

     this.map_flag = 'please wait'
     this.customer_info = []

     this.poly_line = []
     // let myarray: any = []
     // let latlongS: any = []
     // var customer: any = []
     // var custolatlong: any = []
     var icon: any
     let currentDateTime = this.datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');

     // console.log("dat time", currentDateTime);
     // console.log("vehicle", item)
     this.latlngbounds = new google.maps.LatLngBounds();
     ////////////////////////////////////////trackings api/////////////////////////////////////////////////////////
     var rest: any = [];

     var formData: any = new FormData();
     console.log("vehicle payload", run_date, imei, this.token, currentDateTime, this.group_id, this.account_id)
     formData.append('AccessToken', this.token)
     formData.append('startdate', run_date);
     formData.append('enddate', currentDateTime);
     formData.append('time_interval', '60');
     formData.append('imei', imei);
     formData.append('group_id', this.group_id);
     formData.append('AccountId', this.account_id);
     formData.append('portal', 'itraceit');
     this.itraceIt.vehicleTrackongS(formData).subscribe((res: any) => {
       // this.initMap1();
       // console.log("vehicle tracking responce tracking", res);
       this.trackingData = res.data
       if (this.trackingData.length > 0) {
         this.map_flag = ' '
       }

       // if (lati == "" || lati == ",") {
       //   this.map1.setCenter(new google.maps.LatLng(this.trackingData[0].lat, this.trackingData[0].long));
       // }



       if (rest.data == "Vehicle is inactive.") 
       {
         alert("Track data is not available")
       }
       else {

         ///////////////////////////////////////////////////////////////marker/////////////

         for (let i = 0; i < this.trackingData.length; i++)
          {

           /////////////////////////////////////////////////////////icon//////////////////////////////
           if (i == 0) {

             icon = 'assets/images/users/start_marker.png';
             // $icon_type="start";
           } else if (i + 1 == this.trackingData.length) {

             icon = 'assets/images/users/stop_marker.png';
             // $icon_type="end";
           } else {
             icon = 'assets/images/users/green_Marker1.png';

             //   if(this.trackingData[i]?.speed >5 && this.trackingData[i]?.speed <=20) {
             //       icon='assets/images/users/yellow_Marker_bottom.png';
             //       // $icon_type="yellow";
             //   } else if((this.trackingData[i]?.speed>20 &&this.trackingData[i]?.speed<80 )) {
             //       icon='assets/images/users/green_Marker1.png';
             //       // $icon_type="green";
             //   }else if((this.trackingData[i]?.speed>80)) {



             //     icon='assets/images/users/green_Marker1.png';
             //     // $icon_type="green";
             // } else if((this.trackingData[i]?.speed<=5) ) {
             //       icon='assets/images/users/red_Marker1.png';
             //       // $icon_type="red";
             //   } else {
             //       icon='assets/images/users/red_Marker1.png';
             //       // $icon_type="red";
             //   }
           }



           //////////////////////////////////////////////////////////////////////////////////////////////
           this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.trackingData[i].lat), parseFloat(this.trackingData[i].long)));

           this.marker =
           
              new google.maps.Marker({
               map: this.map1,

               position: new google.maps.LatLng(
                 this.trackingData[i].lat, this.trackingData[i].long),
               title: this.trackingData[i].lat + "," + this.trackingData[i].long,

               icon: icon,

             })




           
           // this.markersArray.push(this.marker.mark);
           // this.map1.fitBounds(this.latlngbounds);
           if (this.trackingData.length > 0) {
             this.map_flag = ' '
           }
           
           let node: any = []
           node[i] = new google.maps.LatLng(
             this.trackingData[i].lat, this.trackingData[i].long)


           this.poly_line.push(node[i]);
           this.poly_line.push(node[i]);


           // this.poly_line.push(new google.maps.LatLng(this.trackingData[i].lat, this.trackingData[i].long));





           google.maps.event.addListener(this.marker, 'click', (event) => {
             // console.log("latlong", event.latLng.lat(), event.latLng.lng())
             //////////////////address//////////////////////////////////////
             var formdataCustomer = new FormData()
             formdataCustomer.append('AccessToken', this.token)
             formdataCustomer.append('VehicleId', vehicle_no);
             formdataCustomer.append('ImeiNo', imei);
             // formdataCustomer.append('ImeiNo',data.imei);
             formdataCustomer.append('LatLong', event.latLng.lat() + ',' + event.latLng.lng());

             formdataCustomer.append('portal', 'itraceit');
             this.itraceIt.addressS(formdataCustomer).subscribe((res: any) => {

               // console.log("responce", res)
               address = res.Data.Address
               //  console.log("address",res.Data.Address)

               this.showWindow(this.trackingData[i], vehicle_no, address)
               this.closeLastOpenedInfoWindow();
               infowindowMarker.setContent(this.contentsInfo);

               infowindowMarker.setPosition(event.latLng);

               infowindowMarker.open(this.map1, node);


             })


             ///////////////////////////////////////////////////////////////////////



           })


           var infowindowMarker = new google.maps.InfoWindow({
             content: this.contentsInfo,
           });
         }
         let draw_polyline = new google.maps.Polyline({
           path: this.poly_line,
           geodesic: true,
           strokeColor: 'green',
           strokeOpacity: 0.8,
           strokeWeight: 1.5,
           map: this.map1,
           icons: [{
             icon: { path: google.maps.SymbolPath.FORWARD_OPEN_ARROW },
             //  google.maps.SymbolPath.FORWARD_CLOSED_ARROW
             offset: '100%',
             repeat: '1000px'
           }],
   
   
   
   
   
   
   
         });

       }


       /////////////////////////////////////////////////polyline/////////////////////////


       //////////////////////////////////////////////////////////////////////////////////














     })

    
     //////////////////////////////////////dfg polyline///////////////////////
    

     var dfgPolyline: any = [];
     var lat_long: any = []
     var formdataCustomer = new FormData()
     formdataCustomer.append('AccessToken', this.token)
     formdataCustomer.append('forGroup', this.group_id);
     formdataCustomer.append('route_id', route_id);
     var obj: any = []

     this.itraceIt.vehicle_dfgS(formdataCustomer).subscribe((res: any) => {
       // console.log("dfg polyloine", res.Polyline);
       // dfgFlag = res.Polyline

       if (res.Polyline != "") 
       {
         // var last: any = []
         // var arr1 = res.Polyline.split("~")
         // var first = arr1[0];

         // dummy.push(first);

         // last = arr1[1]

         var str = res.Polyline.replace(/ *\^[^~]*\~ */g, "");

         /////////////////////////////////////////////////////////////////////////////////////////     
         // console.log("const final",last);
         // var final: any = []













         let arry2 = str.split(/[,( )]+/)


         if (this.trackingData.length == 0) {
           this.map_flag = ' '
           // this.map1.setCenter(new google.maps.LatLng(arry2[1], arry2[2]));
         }
         for (let i = 1; i < (arry2.length) - 1; i++)
          {

           lat_long = new google.maps.LatLng(
             arry2[i], arry2[i + 1])




           dfgPolyline.push(lat_long);
           dfgPolyline.push(lat_long);


           i++;
        



         }
         let draw_polyline = new google.maps.Polyline({
           path: dfgPolyline,
           geodesic: true,
           strokeColor: "blue",
           strokeOpacity: 2.0,
           strokeWeight: 3,
           map: this.map1,





         });





       }

     })

     //////////////////////////////////////////vehicle customer///////////
     var formdataCustomer = new FormData()
     formdataCustomer.append('AccessToken', this.token)
     formdataCustomer.append('forGroup', this.group_id);
     formdataCustomer.append('id', Id);
     var obj: any = []

     this.itraceIt.tripCustomerS(formdataCustomer).subscribe((res: any) => {

       this.customer_info = res.customer_info
       this.map1.setCenter(new google.maps.LatLng(this.customer_info[0].Lat, this.customer_info[0].Lng));
       for (let x = 0; x < this.customer_info.length; x++) {


         var custo: any = []
         custo[x] = new google.maps.LatLng(
           this.customer_info[x].Lat, this.customer_info[x].Lng)


         this.markers =
         {
           mark: new google.maps.Marker({
             map: this.map1,

             position: new google.maps.LatLng(
               this.customer_info[x].Lat, this.customer_info[x].Lng),
             title: this.customer_info[x].Lat + "," + this.customer_info[x].Lng,
             label: {
               text: this.customer_info[x].SequenceNo,
               color: 'black',
               fontSize: "12px",
               fontWeight: "500",
               fontFamily: 'Tangerine',


             },
             location: this.customer_info[x].LocationCode,
             podStatus: this.customer_info[x].PodStatus,
             arrivalTime: this.customer_info[x].GeoArrivalTime,
             departureTime: this.customer_info[x].GeoDepartureTime






           }),






         }
         /////////////////////////////////////////////////////////////////////////customer///////////////////

         var customer_Info: string = ''
         let pod: string = '';
         let type: string = '';
         let arrival_time: string = '';
         let departure_time: string = '';
         google.maps.event.addListener(this.markers.mark, 'click', (event) => {
           console.log("event", x, this.markers.mark.podStatus, this.customer_info[x].LocationCode)

           if (this.customer_info[x].PodStatus == 0) {
             pod = '-'
           }
           if (this.customer_info[x].PodStatus == 1) {
             pod = 'DONE'
           }
           if (this.customer_info[x].LocationSequence == 0) {
             type = 'ORIGIN'
           }
           if (this.customer_info[x].LocationSequence == 1) {
             type = ' INTERMEDIATE STATION '
           }
           if (this.customer_info[x].LocationSequence == 2) {
             type = ' DESTINATION '
           }
           if (this.customer_info[x].GeoArrivalTime != '') {
             arrival_time = this.customer_info[x].GeoArrivalTime + '[GPS]'
           }
           if (this.customer_info[x].GeoArrivalTime == '') {
             arrival_time = this.customer_info[x].ArrivalTime
           }
           if (this.customer_info[x].GeoDepartureTime != '') {
             departure_time = this.customer_info[x].GeoDepartureTime + '[GPS]'
           }
           if (this.customer_info[x].GeoDepartureTime == '') {
             departure_time = this.customer_info[x].DepartureTime
           }


           customer_Info = '<table class="border">' +
             '<tbody>' +

             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Location</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + this.customer_info[x].LocationCode + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">PodStatus</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + pod + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Type</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + type + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">ArrivalTime</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + arrival_time + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DepartureTime</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + departure_time + '</td>' +
             '</tr>' +
             '</tbody>' +
             '</table>'




           this.closeLastOpenedInfoWindow();
           infowindowMarker_custo.setContent(customer_Info);

           infowindowMarker_custo.setPosition(event.latLng);

           infowindowMarker_custo.open(this.map1, custo);
           //this.lastOpenedInfoWindow=0; 
           this.lastOpenedInfoWindow = infowindowMarker_custo;
         })

         var infowindowMarker_custo = new google.maps.InfoWindow({
           content: customer_Info,
         });


       }




     })










     ////////////////////////////////////////////////////////////////////////////////////////////////////
     for (let z = 0; z < item.length; z++) {


       ///////////////////////////////////////////////////////////marker label //////////////////////////////////////////////////////////////////////////////////////////



       ///////////////////////////////////////////////show alert ///////////////////////////////////////////////////////////      

       var markerLabel =
       {
         mark: new google.maps.Marker({
           map: this.map1,

           position: new google.maps.LatLng(
             item[z].lat, item[z].lng),
           title: item[z].lat + "," + item[z].lng + "," + item[z].alert_type,

           icon: {
             url: "assets/images/users/icons-flag-big.png",
             labelOrigin: new google.maps.Point(20, 15),

           },



           label: {
             text: (item[z].alert_type).slice(0, 4),
             color: 'white',
             fontSize: "12px",
             fontWeight: "bold",
             // fontFamily: 'Tangerine',
             textalign: 'center',
             Position: 'relative',
             // bottom: 1,



           },






         })





       }





     }

   }
   this.seconddaryTrack.push([run_date, imei2, vehicle_no, item, Id, route_id, alertsummary, imei, imei3]);
 }
//////////////////////////////////////////////////////////////////////////////////////////////

vehicleTrackF(run_date, imei, vehicle_no, item, Id, route_id, alertsummary, lati, long) {
  // if(!this.map1){
    // this.initMap1()
    this.initMap();
    // }
  console.log("demomarker", this.demomarker);
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
  // if( this.demomarker.length>0)
  //   {
  //     for(let i = 0; i < this.demomarker.length; i++)
  //     {
  //       this.demomarker[i].setMap(null);
  //     }
  //   }
  //   if( this.demoPolyline.length>0)
  //   {
  //     for(let i = 0; i < this.demoPolyline.length; i++)
  //     {
  //       this.demoPolyline[i].setMap(null);
  //     }
  //   }

  $('#v_track_Modal').modal('show');

  // Reset tracking data
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
    this.itraceIt.vehicleTrackongS(formData).subscribe((res: any) => {
      console.log("tracking res", res);
      if(res.Status=="failed")
      {
        alert(res?.Message);
        this.SpinnerService.hide("tracking");
        this.router.navigate([`/auth/login`]);
        
      }
      this.trackingData = res.data;

      if (this.trackingData.length > 0) {
        this.map_flag = '';
        this.latlngbounds = new google.maps.LatLngBounds();
        this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.trackingData[0].lat), parseFloat(this.trackingData[0].long)));
        this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.trackingData[this.trackingData.length - 1].lat), parseFloat(this.trackingData[this.trackingData.length - 1].long)));
        
        // Ensure the map bounds are updated
        this.map1.fitBounds(this.latlngbounds);
      }

      if (res.data === 'Vehicle is inactive.') {
        alert("Track data is not available");
      } else {
        this.addMarkersAndPolyline(imei, vehicle_no);
      }

      this.SpinnerService.hide("tracking");
    });

    // Fetch DFG polyline data
    this.fetchDFGPolyline(route_id);

    // Fetch customer info
    this.fetchCustomerInfo(Id);

    // Handle alert markers
    // this.handleAlertMarkers(item);
  }
}

addMarkersAndPolyline(imei: string, vehicle_no: string) {
  // Prepare arrays for markers and polylines
  const markers: google.maps.Marker[] = [];
  const polylinePath: google.maps.LatLng[] = [];
  
  // Use requestAnimationFrame for batch processing
  requestAnimationFrame(() => {
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
      mark.addListener('click', (event) => this.handleMarkerClick(event, this.trackingData[i], vehicle_no, imei));

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
  });
}

vehicleTrackF_new(run_date, imei, vehicle_no, item, Id, route_id, alertsummary, lati, long) {
  // this.SpinnerService.show();
  this.clearMarkersAndPolylines();
  this.initializeMap().then(() => {
  }).catch(error => {
    console.error('Error initializing map:', error);
    this.SpinnerService.hide('spinner-1');
  });



  console.log("demomarker", this.demomarker);
  this.SpinnerService.show("tracking");

  // Clear markers and polylines if they exist
  // if (this.demomarker.length > 0) {
  //   this.demomarker.forEach(marker => marker.setMap(null));
  //   this.demomarker = [];  // Clear the array after removing markers
  // }

  // if (this.demoPolyline.length > 0) {
  //   this.demoPolyline.forEach(polyline => polyline.setMap(null));
  //   this.demoPolyline = [];  // Clear the array after removing polylines
  // }


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
    this.itraceIt.vehicleTrackongS(formData).subscribe((res: any) => {
      console.log("tracking res", res);
      if (res.Status == "failed") {
        alert(res?.Message);
        this.router.navigate([`/auth/login`]);
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
    // Fetch DFG polyline data
    this.fetchDFGPolyline_new(route_id);

    // Fetch customer info
    this.fetchCustomerInfo_new(Id);

    // Handle alert markers
    // console.log("lllllllllllllllllllll",item)
    this.handleAlertMarkers(item);
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
}
addMarkersAndPolyline1(imei: string, vehicle_no: string) {
  var lineString = new H.geo.LineString();

let minLat = Infinity, minLng = Infinity, maxLat = -Infinity, maxLng = -Infinity;
// const ui = H.ui.UI.createDefault(this.map1, new H.map.Platform({apikey: 'MoBysY-1fH4koFS2rGUDpwvRHSLfdX4GWYsRJUlB8VY'}).createDefaultLayers());
// const platform = new H.service.Platform({
// apikey: 'MoBysY-1fH4koFS2rGUDpwvRHSLfdX4GWYsRJUlB8VY'  // Replace with your actual API key
// });
const defaultLayers = this.platform.createDefaultLayers();
const ui = H.ui.UI.createDefault(this.map1, defaultLayers);
for (let i = 0; i < this.trackingData.length; i++) {
const position = this.trackingData[i];
lineString.pushPoint({ lat: position.lat, lng: position.long });

const locationOfMarker = { lat: position.lat, lng: position.long };

const icon_temp = this.getMarkerIcon(i);
const marker = this.createMarker(locationOfMarker, icon_temp, '2');

// Add the marker to the map
this.map1.addObject(marker);
this.markers.push(marker);





// Attach click event to each marker
marker.addEventListener('tap',  async (evt) => {
//  var position= evt.latLng.lat()
  // Remove existing bubbles, if any
  ui.getBubbles().forEach(bubble => ui.removeBubble(bubble));
  
  // Create content for the info window
  // const infoContent =this.handleMarkerClick(evt, this.trackingData[i], vehicle_no, imei)
  const infoContent = await this.handleMarkerClick(evt, this.trackingData[i], vehicle_no, imei);

  console.log("infoContent",infoContent)
  //  `<div>Marker #${i + 1}<br>Latitude: ${position.lat}<br>Longitude: ${position.long}</div>`;
   
  // Create an info bubble at the marker's location
  const infoBubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
    content: infoContent
  });

  // Add the info bubble to the map
  ui.addBubble(infoBubble);
});















// Update min and max lat/lng values to create bounding box
minLat = Math.min(minLat, position.lat);
minLng = Math.min(minLng, position.long);
maxLat = Math.max(maxLat, position.lat);
maxLng = Math.max(maxLng, position.long);
}

// Define padding in degrees (adjust as needed)
const padding = 0.01;

// Create a bounding box with padding
const boundingBox = new H.geo.Rect(
maxLat + padding,    // Top latitude (maxLat + padding)
minLng - padding,    // Left longitude (minLng - padding)
minLat - padding,    // Bottom latitude (minLat - padding)
maxLng + padding     // Right longitude (maxLng + padding)
);

// Set the map view to fit all markers within the padded bounding box
this.map1.getViewModel().setLookAtData({
bounds: boundingBox
});




  this.addPolylineToMap(lineString)
}
handleMarkerClick(event, trackingData, vehicle_no, imei) {
  
  // const markerPosition = event.getPosition();
  // const k = event.toString();
  // console.log(event.toString())
  // this.str= (((k.split('(')).join('')).split(')')).join('').split(' ').join('');
  // console.log(this.str)
  const formdataCustomer = new FormData();
  formdataCustomer.append('AccessToken', this.token);
  formdataCustomer.append('VehicleId', vehicle_no);
  formdataCustomer.append('ImeiNo', imei);
  formdataCustomer.append('LatLong', event.latLng.lat() + ',' + event.latLng.lng());
  formdataCustomer.append('portal', 'itraceit');
  this.itraceIt.addressS(formdataCustomer).subscribe((res: any) => {
    console.log(res)
    const address = res.Data.Address;
    this.showWindow(trackingData, vehicle_no, address);
    this.closeLastOpenedInfoWindow();
    const infowindowMarker = new google.maps.InfoWindow({ content: this.contentsInfo });
    infowindowMarker.setPosition(event.latLng);
    infowindowMarker.open(this.map1);
  });
}
async handleMarkerClick1(event, trackingData, vehicle_no, imei) {
  const markerPosition = event.target.getGeometry();
  const formdataCustomer = new FormData();
  formdataCustomer.append('AccessToken', this.token);
  formdataCustomer.append('VehicleId', vehicle_no);
  formdataCustomer.append('ImeiNo', imei);
  formdataCustomer.append('LatLong', `${markerPosition.lat},${markerPosition.lng}`);
  formdataCustomer.append('portal', 'itraceit');
  const res:any = await this.itraceIt.addressS(formdataCustomer).toPromise(); // Assuming it returns an observable
 console.log("res",res)
  const address = res.Data.Address;
  
  return this.showWindow(trackingData, vehicle_no, address); // Return the content
}

// showWindow(data, vnumber, add) {
//   // var add:any
//   this.contentsInfo = ''
//   // console.log('show window of vehicle information', data, add)
//   /////////////////////////address api////////////////////////////////////////////////////



//   ////////////////////////////////////////////////////////////////////////////////////////////////////////////  

// return  this.contentsInfo = '<table style="line-height: 16px; border:none !important">' +
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
  // const defaultLayers = platform.createDefaultLayers();
  const ui = H.ui.UI.createDefault(this.map1, this.defaultLayers);
  const markers: google.maps.Marker[] = [];
  if (this.demomarker.length > 0) {
    this.demomarker.forEach(marker => {
      console.log("Removing marker from map", marker);
      marker.setMap(null);
    });
    this.demomarker = [];  // Clear the array after removing markers
    console.log("Marker array cleared");
  }
  const formdataCustomer = new FormData();
  formdataCustomer.append('AccessToken', this.token);
  formdataCustomer.append('forGroup', this.group_id);
  formdataCustomer.append('id', Id);

  this.itraceIt.tripCustomerS(formdataCustomer).subscribe((res: any) => {
    this.customer_info = res.customer_info;

    // Log the customer data for debugging
    // console.log("Customer Info:", this.customer_info);

    this.customer_info.forEach((customer, index) => {
      // Log SequenceNo to check its value
      // console.log("Customer SequenceNo:", customer.SequenceNo);

      const sequenceNo = customer.SequenceNo ? customer.SequenceNo.toString() : ''; // Ensure this is a string
      // const sequenceNo = customer.SequenceNo  // Ensure this is a string

      // let mark = new google.maps.Marker({
      //   map: this.map1,
      //   position: new google.maps.LatLng(customer.Lat, customer.Lng),
      //   title: `${customer.Lat}, ${customer.Lng}`,
      //   label: {
      //     text: sequenceNo,  // Ensure this is a string
      //     color: 'black'
      //   }
      // });
     


      const locationOfMarker = { lat:customer.Lat, lng:customer.Lng };
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




marker.addEventListener('tap',  async (evt) => {
//  var position= evt.latLng.lat()
  // Remove existing bubbles, if any
  ui.getBubbles().forEach(bubble => ui.removeBubble(bubble));
  
  // Create content for the info window
  // const infoContent =this.handleMarkerClick(evt, this.trackingData[i], vehicle_no, imei)
  const infoContent = await this.handleCustomerMarkerClick(evt, index);

  console.log("infoContent",infoContent)
  //  `<div>Marker #${i + 1}<br>Latitude: ${position.lat}<br>Longitude: ${position.long}</div>`;
   
  // Create an info bubble at the marker's location
  const infoBubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
    content: infoContent
  });

  // Add the info bubble to the map
  ui.addBubble(infoBubble);
});






      
      // this.demomarker.push(mark);
   
      // google.maps.event.addListener(mark, 'click', (event) => this.handleCustomerMarkerClick(event, index));
    });
    // this.demomarker=markers;
  });
}
addPolylineToMap(lineString) {
  
  var polyline =(new H.map.Polyline(
    lineString, { style: { lineWidth: 3, strokeColor: 'green'}}
  ));
  this.map1.addObject(polyline);
  this.polylines.push(polyline);
}
fetchDFGPolyline_new(route_id: string) {
  const formdataCustomer = new FormData();
  formdataCustomer.append('AccessToken', this.token);
  formdataCustomer.append('forGroup', this.group_id);
  formdataCustomer.append('route_id', route_id);

  this.itraceIt.vehicle_dfgS(formdataCustomer).subscribe((res: any) => {
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
          lineString.pushPoint({ lat:lat, lng: lng });
        }
      }

      
        var polyline =(new H.map.Polyline(
          lineString, { style: { lineWidth: 3, strokeColor: 'green'}}
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





initializeMap(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    $('#v_track_Modal').on('shown.bs.modal', () => {
      if (!this.map1) {
        try {
           this.platform = new H.service.Platform({
            apikey: 'TqrKwyeojsEvyCPpJ-ybEZ0l49mO0w-b8_JCBHrQWdI'
          });

          this.defaultLayers = this.platform.createDefaultLayers({
            tileSize: 256,
            ppi: 320, // Try adjusting this value for raster clarity
            lg: 'ENG' // Optional: language
        });
          // platform.createDefaultLayers();

          // Initialize the map
          this.map1 = new H.Map(
            document.getElementById('map1'),
            this.defaultLayers.vector.normal.map,
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
initializeMap1(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      $('#mapModal').on('shown.bs.modal', () => {
        if (!this.map) {
          try {
            this.platform1 = new H.service.Platform({
              apikey: 'TqrKwyeojsEvyCPpJ-ybEZ0l49mO0w-b8_JCBHrQWdI'
            });

            const defaultLayers = this.platform1.createDefaultLayers();

            // Initialize the map
            this.map = new H.Map(
              document.getElementById('map'),
              defaultLayers.vector.normal.map,
              {
                center: { lat: 20.5937, lng: 78.9629 },
                zoom: 10,
                pixelRatio: window.devicePixelRatio || 1
              }
            );

            // Set willReadFrequently attribute on the canvas
            const canvas = document.querySelector('#map canvas') as HTMLCanvasElement; // Cast to HTMLCanvasElement
            if (canvas) {
              canvas.willReadFrequently = true; // Set the attribute
            }

            // Add events and UI controls
            const mapEvents = new H.mapevents.MapEvents(this.map);
            new H.mapevents.Behavior(mapEvents);
            // const ui = H.ui.UI.createDefault(this.map1, defaultLayers);
            // var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map1));

            // Create the default UI components
            // let ui:any = H.ui.UI.createDefault(this.map1, defaultLayers);
            // Force the map to resize properly on window resize
            const resizeMap = () => {
              if (this.map) {
                this.map.getViewPort().resize();
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
      $('#mapModal').modal('show');
    });
  }



// initializeMap(): Promise<void> {
//   return new Promise<void>((resolve, reject) => {
//       $('#v_track_Modal').on('shown.bs.modal', () => {
//           if (!this.map1) {
//               try {
//                   const platform = new H.service.Platform({
//                       apikey: 'MoBysY-1fH4koFS2rGUDpwvRHSLfdX4GWYsRJUlB8VY'
//                   });

//                   const defaultLayers = platform.createDefaultLayers();

//                   // Initialize the map
//                   this.map1 = new H.Map(
//                       document.getElementById('map1'), // Ensure map1 div exists in the DOM
//                       defaultLayers.vector.normal.map,
//                       { 
//                           center: { lat: 20.5937, lng: 78.9629 }, // India lat/lng as the center
//                           zoom: 10,
//                           pixelRatio: window.devicePixelRatio || 1
//                       }
//                   );

//                   // Add events and UI controls
//                   const mapEvents = new H.mapevents.MapEvents(this.map1);
//                   new H.mapevents.Behavior(mapEvents);
//                   const ui = H.ui.UI.createDefault(this.map1, defaultLayers);

//                   // Force the map to resize properly on window resize
//                   const resizeMap = () => {
//                       if (this.map1) {
//                           this.map1.getViewPort().resize();
//                       }
//                   };

//                   // Trigger initial resize to ensure correct rendering
//                   resizeMap();

//                   // Attach resize event listener to handle window resizing
//                   window.addEventListener('resize', resizeMap);

//                   // Resolve the Promise when map initialization is complete
//                   resolve();
//               } catch (error) {
//                   // Reject the Promise in case of errors
//                   reject(error);
//               }
//           } else {
//               // If the map is already initialized, just resolve
//               resolve();
//           }
//       });

//       // Show the modal (this might not be necessary to be in the Promise)
//       $('#v_track_Modal').modal('show');
//   });
// }
// vehicleTrackF_new(run_date: string, imei: string, vehicle_no: string, item: string, Id: string, route_id: string, alertsummary: any, lati: number, long: number) {
// this.initializeMap()
//   this.clearMarkersAndPolylines(); // Clear previous markers and polylines
//   this.SpinnerService.show("tracking");

//   if (imei === "") {
//       alert('Device unavailable');
//       this.SpinnerService.hide("tracking");
//       return;
//   }

//   const formData = new FormData();
//   const currentDateTime: any = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

//   formData.append('AccessToken', this.token);
//   formData.append('startdate', run_date);
//   formData.append('enddate', currentDateTime);
//   formData.append('time_interval', '120');
//   formData.append('imei', imei);
//   formData.append('group_id', this.group_id);
//   formData.append('AccountId', this.account_id);

//   this.itraceIt.vehicleTrackongS(formData).subscribe((res: any) => {
//       if (res.Status == "failed") {
//           alert(res?.Message);
//           this.SpinnerService.hide("tracking");
//           return;
//       }

//       this.trackingData = res.data;
//         // this.poly_line=res.data
//       if (res.data === 'Vehicle is inactive.') {
//           alert("Track data is not available");
//       } else {
//           this.addMarkersAndPolyline(imei, vehicle_no); // Add markers and polyline
//       }

//       this.SpinnerService.hide("tracking");
//   });
// }


// addMarkersAndPolyline1(imei: string, vehicle_no: string) {
//   const lineString = new H.geo.LineString();
//   this.markers=[];
//   // Iterate over tracking data to create markers and polyline points
//   this.trackingData.forEach((position, i) => {
//     const icon_temp:any=this.getMarkerIcon(i)
//       const marker = new H.map.Marker({ lat: position.lat, lng: position.long }, { icon: new H.map.Icon(icon_temp),
//                   anchor: { x: 16, y: 32 }  }
//                 );
//                 this.markers.push(marker);
//       this.map1?.addObject(marker); // Add marker to the map--------

//       // Add this point to the lineString for the polyline---------
//       lineString.pushPoint({ lat: position.lat, lng: position.long });
//   });

//   // Create a polyline from the lineString--------------
//   const polyline = new H.map.Polyline(lineString, {
//       style: { strokeColor: 'green', lineWidth: 4 } // Style options for the polyline
//   });

//   // Add the polyline to the map
//   this.map1?.addObject(polyline);

//   // Store the polyline reference in an array for future use
//   this.polylines?.push(polyline);
// }



getMarkerIcon(index: number): string {
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



fetchDFGPolyline(route_id: string) {
  const formdataCustomer = new FormData();
  formdataCustomer.append('AccessToken', this.token);
  formdataCustomer.append('forGroup', this.group_id);
  formdataCustomer.append('route_id', route_id);

  this.itraceIt.vehicle_dfgS(formdataCustomer).subscribe((res: any) => {
    if (res.Polyline) {
      const dfgPolyline: google.maps.LatLng[] = [];
      const str = res.Polyline.replace(/ *\^[^~]*\~ */g, "");
      const arry2 = str.split(/[,( )]+/);

      for (let i = 1; i < arry2.length - 1; i += 2) {
        const lat = parseFloat(arry2[i]);
        const lng = parseFloat(arry2[i + 1]);

        if (!isNaN(lat) && !isNaN(lng)) {
          const latLng = new google.maps.LatLng(lat, lng);
          dfgPolyline.push(latLng);
        }
      }

      const draw_polylineDfg = new google.maps.Polyline({
        path: dfgPolyline,
        geodesic: true,
        strokeColor: "blue",
        strokeOpacity: 2.0,
        strokeWeight: 3,
        map: this.map1
      });

      this.demoPolyline.push(draw_polylineDfg);
    }
  });
}



fetchCustomerInfo(Id: string) {
  this.customer_info = []
  // if (this.demomarker.length > 0) {
  //   this.demomarker.forEach(marker => marker.setMap(null));
  //   this.demomarker = [];  // Clear the array after removing markers
  // }
  const markers: google.maps.Marker[] = [];
  if (this.demomarker.length > 0) {
    this.demomarker.forEach(marker => {
      console.log("Removing marker from map", marker);
      marker.setMap(null);
    });
    this.demomarker = [];  // Clear the array after removing markers
    console.log("Marker array cleared");
  }
  const formdataCustomer = new FormData();
  formdataCustomer.append('AccessToken', this.token);
  formdataCustomer.append('forGroup', this.group_id);
  formdataCustomer.append('id', Id);

  this.itraceIt.tripCustomerS(formdataCustomer).subscribe((res: any) => {
    this.customer_info = res.customer_info;

    // Log the customer data for debugging
    console.log("Customer Info:", this.customer_info);

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

// handleAlertMarkers(item) {
//   if (this.demomarker.length > 0) {
//     this.demomarker.forEach(marker => marker.setMap(null));
//     this.demomarker = [];  // Clear the array after removing markers
//   }
//   // console.log("handleAlertMarkers",item)
//   item.forEach(alert => {
//     // Check for alert_name and provide a fallback if it's undefined
//     const alertName = alert.alert_type
//       ? alert.alert_type.toString().substring(0, 5) // Limit to 5 characters
//       : 'Unknown Alert'; // Fallback to 'Unknown Alert'

//     // let markerLabel = new google.maps.Marker({
//     //   map: this.map1,
//     //   position: new google.maps.LatLng(alert.lat, alert.lng),
//     //   title: `${alert.lat},${alert.lng}`,
//     //   icon: {
//     //     url: "assets/images/users/icons-flag-big.png",
//     //     labelOrigin: new google.maps.Point(20, 15),

//     //   },
//     //   label: {
//     //     text: alertName, // Safe to use with a fallback value
//     //     color: 'white',
//     //     fontSize: "12px",
//     //     fontWeight: "bold",
//     //     // fontFamily: 'Tangerine',
//     //     textalign: 'center',
//     //     Position: 'relative',
//     //     // color: "black"
//     //   },
//     // });

//     // this.demomarker.push(markerLabel);
  
  
  
//     const locationOfMarker = { lat:alert.lat, lng:alert.lng };
//       var html = document.createElement('div'),
//       divIcon = document.createElement('div'),
//       divText = document.createElement('div'),
//       imgIco = document.createElement('img');
//     imgIco.setAttribute('src', 'assets/images/users/icons-flag-big.png');
//     // Set the size of the image
//      imgIco.style.width = '42px';  // Adjust the width as needed
//      imgIco.style.height = '40px'; // Adjust the height as needed
//     divText.setAttribute("class", "textData");
//     html.setAttribute("class", "parentDiv");

//     divIcon.appendChild(imgIco);
//     divText.textContent = alertName;
//     divText.innerHTML = alertName;
//     html.appendChild(divIcon);
//     html.appendChild(divText);
//     divText.style.top = '35%';
//     divText.style.left = '50%';
//     divText.style.fontSize = '12px';
//     divText.style.position = 'absolute';
//     divText.style.transform = 'translate(-50%, -50%)';
//     divText.style.color = 'white'; // Set label color for visibility
//     divText.style.fontWeight = 'bold'; // Make the label text bold if needed
//     // const domIcon = document.createElement('div');
//   //  domIcon.innerHTML = '<i class="fa fa-marker" style="font-size:24px; color:red;"></i>'; 
//     var domIcon = new H.map.DomIcon(html);
//     var marker = new H.map.DomMarker(locationOfMarker, {
//       icon: domIcon,
//       anchor: { x: 1, y: 1 }
//     });

// this.map1.addObject(marker)

// this.markers.push(marker);

  
  
  
  
  
  
  
  
//   });
// }



closeLastOpenedInfoWindow() {
  if (this.lastOpenedInfoWindow) {
    this.lastOpenedInfoWindow.close();
  }
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 vehicleTrackdummyF(run_date, imei, vehicle_no, item, Id, route_id, alertsummary, lati, long)
 {
  // console.log("vehicle track",this.demomarker)
  this.SpinnerService.show("tracking")
  if( this.demomarker.length>0)
  {
    for(let i = 0; i < this.demomarker.length; i++)
    {
      this.demomarker[i].setMap(null);
    }
  }
  if( this.demoPolyline.length>0)
  {
    for(let i = 0; i < this.demoPolyline.length; i++)
    {
      this.demoPolyline[i].setMap(null);
    }
  }

  // console.log("lat long",lati.long)
  $('#v_track_Modal').modal('show');
 
  // this.poly_line = []
  this.demomarker=[]
  this.trackingData = [];
  this.demoPolyline=[]
 //  this.seconddaryTrack = [];
  this.customer_info = [];
  this.marker=[];
  this.poly_line=[];

  // this.initMap1();
  // this.map1.setCenter(new google.maps.LatLng(lati, long));
  // let flag: any
  this.map_flag = ''



  if (imei == "")
   {
    this.map_flag = 'Device unavailable '
   //  flag = 0
  }

  var address: any


  
   

    this.map_flag = 'please wait'
    this.customer_info = []

    // this.SpinnerService.show("tracking")

    var icon: any
    let currentDateTime = this.datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
//////////////////////////////////////////////////////////////////////////////////////////////////////

     
    ////////////////////////////////////////trackings api/////////////////////////////////////////////////////////
    // var rest: any = [];
    // this.latlngbounds = new google.maps.LatLngBounds();
    var formData: any = new FormData();
   //  console.log("vehicle payload", run_date, imei, this.token, currentDateTime, this.group_id, this.account_id)
    formData.append('AccessToken', this.token)
    formData.append('startdate', run_date);
    formData.append('enddate', currentDateTime);
    formData.append('time_interval', '60');
    formData.append('imei', imei);
    formData.append('group_id', this.group_id);
    formData.append('AccountId', this.account_id); formData.append('portal', 'itraceit');
    this.itraceIt.vehicleTrackongS(formData).subscribe((res: any) => {
      // this.initMap1();
     console.log("vehicle trackong",res);
      this.trackingData = (res.data)
      // this.demo_trackingData= res.data
      // console.log("demo tracking",this.demo_trackingData)
      let length=this.trackingData.length-1
      // this.map1.setCenter(new google.maps.LatLng(this.trackingData[0].lat,this.trackingData[0].long));
      if (this.trackingData.length > 0)
       {
        this.map_flag = ' '

        
    this.latlngbounds = new google.maps.LatLngBounds();
    this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.trackingData[0].lat), parseFloat(this.trackingData[0].long)));
    this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.trackingData[length].lat), parseFloat(this.trackingData[length].long)));
    // this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.trackingData[2].lat), parseFloat(this.trackingData[2].long)));
      }

  



      if (res.data == 'Vehicle is inactive.') 
      {
        alert("Track data is not available")
      }
      else {

        ///////////////////////////////////////////////////////////////marker/////////////

        for (let i = 0; i < this.trackingData.length; i++)
        {

         /////////////////////////////////////////////////////////icon//////////////////////////////
         if (i == 0) {

           icon = 'assets/images/users/start_marker.png';
           // $icon_type="start";
         } else if (i + 1 == this.trackingData.length) {

           icon = 'assets/images/users/stop_marker.png';
           // $icon_type="end";
         } else {
           icon = 'assets/images/users/green_Marker1.png';
           ///////////////////////////////////////////////////////////////////////////

           //   if(this.trackingData[i]?.speed >5 && this.trackingData[i]?.speed <=20) {
           //       icon='assets/images/users/yellow_Marker_bottom.png';
           //       // $icon_type="yellow";
           //   } else if((this.trackingData[i]?.speed>20 &&this.trackingData[i]?.speed<80 )) {
           //       icon='assets/images/users/green_Marker1.png';
           //       // $icon_type="green";
           //   }else if((this.trackingData[i]?.speed>80)) {



           //     icon='assets/images/users/green_Marker1.png';
           //     // $icon_type="green";
           // } else if((this.trackingData[i]?.speed<=5) ) {
           //       icon='assets/images/users/red_Marker1.png';
           //       // $icon_type="red";
           //   } else {
           //       icon='assets/images/users/red_Marker1.png';
           //       // $icon_type="red";
           //   }
         }



         //////////////////////////////////////////////////////////////////////////////////////////////
        //  this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.trackingData[i].lat), parseFloat(this.trackingData[i].long)));

        //  this.marker =
        //  {

        ///////////////////////////////////////////////////////////////
        let   mark=new google.maps.Marker({
             map: this.map1,

             position: new google.maps.LatLng(
               this.trackingData[i].lat, this.trackingData[i].long),
             title: this.trackingData[i].lat + "," + this.trackingData[i].long,

             icon: icon,

           })

      
           this.demomarker.push(mark);
         
       
         this.map1.fitBounds(this.latlngbounds);
         let node: any = []
         node[i] = new google.maps.LatLng(
           this.trackingData[i].lat, this.trackingData[i].long)


         this.poly_line.push(node[i]);
         this.poly_line.push(node[i]);


         // this.poly_line.push(new google.maps.LatLng(this.trackingData[i].lat, this.trackingData[i].long));

         



         google.maps.event.addListener(mark, 'click', (event) => {
           // console.log("latlong", event.latLng.lat(), event.latLng.lng())
           //////////////////address//////////////////////////////////////
           var formdataCustomer = new FormData()
           formdataCustomer.append('AccessToken', this.token)
           formdataCustomer.append('VehicleId', vehicle_no);
           formdataCustomer.append('ImeiNo', imei);
           // formdataCustomer.append('ImeiNo',data.imei);
           formdataCustomer.append('LatLong', event.latLng.lat() + ',' + event.latLng.lng());
           formdataCustomer.append('portal', 'itraceit');

           this.itraceIt.addressS(formdataCustomer).subscribe((res: any) => {

             // console.log("responce", res)
             address = res.Data.Address
             //  console.log("address",res.Data.Address)

             this.showWindow(this.trackingData[i], vehicle_no, address)
             this.closeLastOpenedInfoWindow();
             infowindowMarker.setContent(this.contentsInfo);

             infowindowMarker.setPosition(event.latLng);

             infowindowMarker.open(this.map1, node);


           })


           ///////////////////////////////////////////////////////////////////////



         })


         var infowindowMarker = new google.maps.InfoWindow({
           content: this.contentsInfo,
         });
       }
       // console.log("demo marker",this.demomarker)
      


       //  this.demo_polyline.push(draw_polyline)
       let draw_polyline = new google.maps.Polyline({
         path: this.poly_line,
         geodesic: true,
         strokeColor: 'green',
         strokeOpacity: 0.8,
         strokeWeight: 1.5,
         map: this.map1,
         icons: [{
           icon: { path: google.maps.SymbolPath.FORWARD_OPEN_ARROW },
           //  google.maps.SymbolPath.FORWARD_CLOSED_ARROW
           offset: '100%',
           repeat: '2000px'
         }],
 
 
 
 
 
 
 
       });
       this.demoPolyline.push(draw_polyline)
      }

    
   //    /////////////////////////////////////////////////polyline/////////////////////////


   //    //////////////////////////////////////////////////////////////////////////////////










  // setTimeout(() => {
    this.SpinnerService.hide("tracking")

  // }, 500);

  
    })
  
   
    //////////////////////////////////////dfg polyline///////////////////////
    let dummy: any = [];
    

    let dfgPolyline: any = [];
    let lat_long: any = []
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    formdataCustomer.append('forGroup', this.group_id);
    formdataCustomer.append('route_id', route_id);
    

    this.itraceIt.vehicle_dfgS(formdataCustomer).subscribe((res: any) => {
     //  console.log("dfg polyloine", res.Polyline);
      dfgPolyline=[];
     //  this.demo_polyline=[]
     //  dfgFlag = res.Polyline

      if (res.Polyline != "")
     {
       
       //  let arr1 = res.Polyline.split("~")
       //  let first = arr1[0];

       //  dummy.push(first);

       //  last = arr1[1]

        var str = res.Polyline.replace(/ *\^[^~]*\~ */g, "");

    //     /////////////////////////////////////////////////////////////////////////////////////////     
    //     // console.log("const final",last);
        













        let arry2 = str.split(/[,( )]+/)


        if (this.trackingData.length == 0) {
          this.map_flag = ' '
         //  this.map1.setCenter(new google.maps.LatLng(arry2[1], arry2[2]));
        }
        for (let i = 1; i < (arry2.length) - 1; i++)
         {

          lat_long = new google.maps.LatLng(
            arry2[i], arry2[i + 1])





          dfgPolyline.push(lat_long)
          dfgPolyline.push(lat_long)
          i++;
    // console.log("demo polyline",this.demo_polyline)
         



        }

        let draw_polylineDfg = new google.maps.Polyline({
          path: dfgPolyline,
          geodesic: true,
          strokeColor: "blue",
          strokeOpacity: 2.0,
          strokeWeight: 3,
          map: this.map1,





        });


        // this.demo_polyline.push(draw_polylineDfg)
        this.demoPolyline.push(draw_polylineDfg)

      }

    })

    //////////////////////////////////////////vehicle customer///////////
 
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    formdataCustomer.append('forGroup', this.group_id);
    formdataCustomer.append('id', Id);
    
    
    this.itraceIt.tripCustomerS(formdataCustomer).subscribe((res: any) => {
    
      this.customer_info = res.customer_info
      // let full_length=this.customer_info.length-1
      // this.initMap1();
      // this.initmap1(this.customer_info[0].Lat, this.customer_info[0].Lng);
     // console.log("customer", this.customer_info)
      // this.map1.setCenter(new google.maps.LatLng(this.customer_info[0].Lat, this.customer_info[0].Lng));
      // this.latlngbounds = new google.maps.LatLngBounds();
      // this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.customer_info[0].Lat), parseFloat(this.customer_info[0].Lng)));
      // this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.customer_info[full_length].Lat), parseFloat(this.customer_info[full_length].Lng)));
      for (let x = 0; x < this.customer_info.length; x++)
       {
    
    
        var custo: any = []
        custo[x] = new google.maps.LatLng(
          this.customer_info[x].Lat, this.customer_info[x].Lng)
    
    
        this.markers =
        {
          mark: new google.maps.Marker({
            map: this.map1,
    
            position: new google.maps.LatLng(
              this.customer_info[x].Lat, this.customer_info[x].Lng),
            title: this.customer_info[x].Lat + "," + this.customer_info[x].Lng,
            label: {
              text: this.customer_info[x].SequenceNo,
              color: 'black',
              fontSize: "12px",
              fontWeight: "500",
              fontFamily: 'Tangerine',
    
    
            },
            location: this.customer_info[x].LocationCode,
            podStatus: this.customer_info[x].PodStatus,
            arrivalTime: this.customer_info[x].GeoArrivalTime,
            departureTime: this.customer_info[x].GeoDepartureTime
    
    
    
    
    
    
          }),
    
    
    
    
    
    
        }
        this.demomarker.push(this.markers.mark);
        /////////////////////////////////////////////////////////////////////////customer///////////////////
    
        var customer_Info: string = ''
        let pod: string = '';
        let type: string = '';
        let arrival_time: string = '';
        let departure_time: string = '';
        google.maps.event.addListener(this.markers.mark, 'click', (event) => {
         //  console.log("event", x, this.markers.mark.podStatus, this.customer_info[x].LocationCode)
    
          if (this.customer_info[x].PodStatus == 0) {
            pod = '-'
          }
          if (this.customer_info[x].PodStatus == 1) {
            pod = 'DONE'
          }
          if (this.customer_info[x].LocationSequence == 0) {
            type = 'ORIGIN'
          }
          if (this.customer_info[x].LocationSequence == 1) {
            type = ' INTERMEDIATE STATION '
          }
          if (this.customer_info[x].LocationSequence == 2) {
            type = ' DESTINATION '
          }
          if (this.customer_info[x].GeoArrivalTime != '') {
            arrival_time = this.customer_info[x].GeoArrivalTime + '[GPS]'
          }
          if (this.customer_info[x].GeoArrivalTime == '') {
            arrival_time = this.customer_info[x].ArrivalTime
          }
          if (this.customer_info[x].GeoDepartureTime != '') {
            departure_time = this.customer_info[x].GeoDepartureTime + '[GPS]'
          }
          if (this.customer_info[x].GeoDepartureTime == '') {
            departure_time = this.customer_info[x].DepartureTime
          }
    
    
          customer_Info = '<table class="border">' +
            '<tbody>' +
    
            '<tr>' +
            '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Location</td>' +
            '<td style="width:1%;color: blue;">:</td>' +
            '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + this.customer_info[x].LocationCode + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">PodStatus</td>' +
            '<td style="width:1%;color: blue;">:</td>' +
            '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + pod + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Type</td>' +
            '<td style="width:1%;color: blue;">:</td>' +
            '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + type + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">ArrivalTime</td>' +
            '<td style="width:1%;color: blue;">:</td>' +
            '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + arrival_time + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DepartureTime</td>' +
            '<td style="width:1%;color: blue;">:</td>' +
            '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + departure_time + '</td>' +
            '</tr>' +
            '</tbody>' +
            '</table>'
    
    
    
    
          this.closeLastOpenedInfoWindow();
          infowindowMarker_custo.setContent(customer_Info);
    
          infowindowMarker_custo.setPosition(event.latLng);
    
          infowindowMarker_custo.open(this.map1, custo);
          //this.lastOpenedInfoWindow=0; 
          this.lastOpenedInfoWindow = infowindowMarker_custo;
        })
    
        var infowindowMarker_custo = new google.maps.InfoWindow({
          content: customer_Info,
        });
    
    
      }
    
    
    
    
    })









    ////////////////////////////////////////////////////////////////////////////////////////////////
    for (let z = 0; z < item.length; z++)
     {


      ///////////////////////////////////////////////////////////marker label //////////////////////////////////////////////////////////////////////////////////////////



      ///////////////////////////////////////////////show alert ///////////////////////////////////////////////////////////      

      var markerLabel =
      {
        mark: new google.maps.Marker({
          map: this.map1,

          position: new google.maps.LatLng(
            item[z].lat, item[z].lng),
          title: item[z].lat + "," + item[z].lng + "," + item[z].alert_type,

          icon: {
            url: "assets/images/users/icons-flag-big.png",
            labelOrigin: new google.maps.Point(20, 15),

          },



          label: {
            text: (item[z].alert_type).slice(0, 4),
            color: 'white',
            fontSize: "12px",
            fontWeight: "bold",
            // fontFamily: 'Tangerine',
            textalign: 'center',
            Position: 'relative',
            // bottom: 1,



          },






        })





      }

      this.demomarker.push(markerLabel.mark);



    }

  
 
}
closeMap()
{ 
  //  if( this.demomarker.length>0)
  // {
  //   for(let i = 0; i < this.demomarker.length; i++)
  //   {
  //     this.demomarker[i].setMap(null);
  //   }
  // }
  // if( this.demoPolyline.length>0)
  // {
  //   for(let i = 0; i < this.demoPolyline.length; i++)
  //   {
  //     this.demoPolyline[i].setMap(null);
  //   }
  // }
  // // console.log("close", this.demoPolyline)
  // for(let i = 0; i < this.demomarker.length; i++)
  // {
  //   this.demomarker[i].setMap(null);
  // }
  // this.poly_line = []
  // this.demomarker=[]
  // this.demoPolyline=[]
  // this.trackingData = [];
 //  this.seconddaryTrack = [];
  // this.customer_info = [];
  // this.marker=[];
  // this.poly_line=[];
  
}
 ///////////////////////////////tracking second imei//////////////////////////////////////////////
 vehicleTrack1F()
  {
   var address: any
   var item: any = [];
   console.log("vehicleTrack1", this.seconddaryTrack)
   var run_date = this.seconddaryTrack[0][0];
   var imei2 = this.seconddaryTrack[0][1];
   var vehicle_no = this.seconddaryTrack[0][2];
   item = this.seconddaryTrack[0][3];
   var Id = this.seconddaryTrack[0][4];
   var route_id = this.seconddaryTrack[0][5];
   var alertsummary = this.seconddaryTrack[0][6];
   if (imei2 == "") {
     alert("Device not available")
   }
   else {



     this.map_flag = 'Please Wait...'
     this.initMap1();


     this.customer_info = []

     this.poly_line = []
     // var myarray: any = []
     // var latlongS: any = []
     var customer: any = []
     // var custolatlong: any = []
     let currentDateTime = this.datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');

     console.log("dat time", currentDateTime);
     console.log("vehicle", item)
     // this.latlngbounds = new google.maps.LatLngBounds();
     ////////////////////////////////////////trackings api/////////////////////////////////////////////////////////
     var rest: any = [];
     // console.log("tracking data values",this.token,)
     var formData: any = new FormData();
     console.log("vehicle", run_date, imei2, vehicle_no, this.token, currentDateTime)
     formData.append('AccessToken', this.token)
     formData.append('startdate', run_date);
     formData.append('enddate', currentDateTime);
     formData.append('time_interval', '30');
     formData.append('imei', imei2);
     formData.append('group_id', this.group_id);
     formData.append('AccountId', this.account_id);
     formData.append('portal', 'itraceit');
     this.itraceIt.vehicleTrackongS(formData).subscribe(res => {
       // console.log("vehicle tracking responce tracking", res);
       console.log("vehicle tracking responce to check", this.token, run_date, currentDateTime, imei2, this.group_id, this.account_id);
       rest = res
       //  next: (response) => alert(response),
       // error: (error) => alert(error),

       this.trackingData = (rest.data)
       // console.log("vehicle tracking", this.trackingData)
       if (rest.data == 'Vehicle is inactive.') {
         alert("Track data is not available")
       }
       else {
         var icon: any
         ///////////////////////////////////////////////////////////////marker/////////////

         for (let i = 0; i < this.trackingData.length; i++)
          {

           /////////////////////////////////////////////////////////icon//////////////////////////////
           if (i == 0) {

             icon = 'assets/images/users/start_marker.png';
             // $icon_type="start";
           } else if (i + 2 == this.trackingData.length) {

             icon = 'assets/images/users/stop_marker.png';
             // $icon_type="end";
           } else {
             if (this.trackingData[i]?.speed > 5 && this.trackingData[i]?.speed <= 20) {
               icon = 'assets/images/users/yellow_Marker_bottom.png';
               // $icon_type="yellow";
             } else if ((this.trackingData[i]?.speed > 20 && this.trackingData[i]?.speed < 80)) {
               icon = 'assets/images/users/green_Marker1.png';
               // $icon_type="green";
             } else if ((this.trackingData[i]?.speed > 80)) {



               icon = 'assets/images/users/green_Marker1.png';
               // $icon_type="green";
             } else if ((this.trackingData[i]?.speed <= 5)) {
               icon = 'assets/images/users/red_Marker1.png';
               // $icon_type="red";
             } else {
               icon = 'assets/images/users/red_Marker1.png';
               // $icon_type="red";
             }
           }



           //////////////////////////////////////////////////////////////////////////////////////////////
           // this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.trackingData[i].lat), parseFloat(this.trackingData[i].long)));
           // console.log("longituted tracking",this.trackingData[i].Longitude)
           var node: any = []
           node[i] = new google.maps.LatLng(
             this.trackingData[i].lat, this.trackingData[i].long)


           this.poly_line.push(node[i]);
           this.poly_line.push(node[i]);
           this.marker =
           {
             mark: new google.maps.Marker({
               map: this.map1,

               position: new google.maps.LatLng(
                 this.trackingData[i].lat, this.trackingData[i].long),
               title: this.trackingData[i].lat + "," + this.trackingData[i].long,
               // label: {
               //   text: markLabel,
               //   color: 'black',
               //   fontSize: "20px",
               //   fontWeight: "1000px",
               //   fontFamily: 'Tangerine',


               // },
               icon: icon,
               // Address: this.trackingData[i].Address,
               vehicle_no: this.trackingData[i].vnumber,
               Imei: this.trackingData[i].imei,
               time: this.trackingData[i].device_time,
               distance: this.trackingData[i].distance,
               speed: this.trackingData[i].speed,
               ServerTime: this.trackingData[i].server_time,
               // Battery:this.trackingData[i].Battery,
               DType: this.trackingData[i].dtype,






             })




           }


          
           // this.map1.setZoom(16)
           // this.map1.fitBounds(this.latlngbounds);

           google.maps.event.addListener(this.marker.mark, 'click', (event) => {
             //////////////////////////////////addresss/////////////////////////////
             var formdataCustomer = new FormData()
             formdataCustomer.append('AccessToken', this.token)
             formdataCustomer.append('VehicleId', vehicle_no);
             formdataCustomer.append('ImeiNo', imei2);
             // formdataCustomer.append('ImeiNo',data.imei);
             formdataCustomer.append('LatLong', event.latLng.lat() + ',' + event.latLng.lng());
             formdataCustomer.append('portal', 'itraceit');

             this.itraceIt.addressS(formdataCustomer).subscribe((res: any) => {

               console.log("responce", res)
               address = res.Data.Address
               console.log("address", address)

               this.showWindow(this.trackingData[i], vehicle_no, address)
               this.closeLastOpenedInfoWindow();
               infowindowMarker.setContent(this.contentsInfo);

               infowindowMarker.setPosition(event.latLng);

               infowindowMarker.open(this.map1, node);
             })


             ///////////////////////////////////////////////////////////////////////////////////////////////////


           })

           var infowindowMarker = new google.maps.InfoWindow({
             content: this.contentsInfo,
           });
         }

         let draw_polyline = new google.maps.Polyline({
           path: this.poly_line,
           geodesic: true,
           strokeColor: 'green',
           strokeOpacity: 0.8,
           strokeWeight: 2,
           map: this.map1,
           icons: [{
             icon: { path: google.maps.SymbolPath.FORWARD_OPEN_ARROW },
             //  google.maps.SymbolPath.FORWARD_CLOSED_ARROW
             offset: '100%',
             repeat: '1000px'
           }],

           //   icons: [{
           //     icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
           //     offset: '100%',
           //     // repeat: '30px',

           // }]




         });
       }



       /////////////////////////////////////////////////polyline/////////////////////////
       // var poly=new google.maps.LatLng(
       //   item[z].lat,  item[z].lng)


       // console.log("polyline: " + draw_polyline.path);

       //////////////////////////////////////////////////////////////////////////////////











       // this.map1.fitBounds(this.latlngbounds);
       // this.map1.setZoom(16)
       // this.map1.fitBounds(this.latlngbounds);

     })
     //////////////////////////////////////dfg polyline///////////////////////
     
     // var fdummy: any[]
    
       
       
         var dfgPolyline: any = [];
         var lat_long: any = []
         var formdataCustomer = new FormData()
         formdataCustomer.append('AccessToken', this.token)
         formdataCustomer.append('forGroup', this.group_id);
         formdataCustomer.append('route_id', route_id);
         // var obj: any = []

         this.itraceIt.vehicle_dfgS(formdataCustomer).subscribe((res: any) => {
           // console.log("dfg polyloine", res.Polyline);
           // dfgFlag = res.Polyline
   
           if (res.Polyline != "") 
           {
             // var last: any = []
             // var arr1 = res.Polyline.split("~")
             // var first = arr1[0];
   
             // dummy.push(first);
   
             // last = arr1[1]
   
             var str = res.Polyline.replace(/ *\^[^~]*\~ */g, "");
   
             /////////////////////////////////////////////////////////////////////////////////////////     
             // console.log("const final",last);
             // var final: any = []
   
   
   
   
   
   
   
   
   
   
   
   
   
             let arry2 = str.split(/[,( )]+/)
   
   
             if (this.trackingData.length == 0) {
               this.map_flag = ' '
               this.map1.setCenter(new google.maps.LatLng(arry2[1], arry2[2]));
             }
             for (let i = 1; i < (arry2.length) - 1; i++)
              {
   
               lat_long = new google.maps.LatLng(
                 arry2[i], arry2[i + 1])
   
   
   
   
               dfgPolyline.push(lat_long);
               dfgPolyline.push(lat_long);
   
   
               i++;
            
   
   
   
             }
             let draw_polyline = new google.maps.Polyline({
               path: dfgPolyline,
               geodesic: true,
               strokeColor: "blue",
               strokeOpacity: 2.0,
               strokeWeight: 3,
               map: this.map1,
   
   
   
   
   
             });
   
   
   
   
   
           }
   
         })
       
       // this.map1.fitBounds(this.latlngbounds);
     
     //////////////////////////////////////////vehicle customer///////////
     var formdataCustomer = new FormData()
     formdataCustomer.append('AccessToken', this.token)
     formdataCustomer.append('forGroup', this.group_id);
     formdataCustomer.append('id', Id);
     var obj: any = []

     this.itraceIt.tripCustomerS(formdataCustomer).subscribe(res => {
       //  console.log("vehicle customer",res)
       customer = res
       this.customer_info = customer.customer_info
       // console.log("vehicle customer", this.customer_info)
       this.map1.setCenter(new google.maps.LatLng(this.customer_info[0].Lat, this.customer_info[0].Lng));
       // this.latlngbounds = new google.maps.LatLngBounds();
       for (let x = 0; x < this.customer_info.length; x++) 
       {

         // this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.customer_info[x].Lat), parseFloat(this.customer_info[x].Lng)));
         var custo: any = []
         custo[x] = new google.maps.LatLng(
           this.customer_info[x].Lat, this.customer_info[x].Lng)


         this.markers =
         {
           mark: new google.maps.Marker({
             map: this.map1,

             position: new google.maps.LatLng(
               this.customer_info[x].Lat, this.customer_info[x].Lng),
             title: this.customer_info[x].Lat + "," + this.customer_info[x].Lng,
             label: {
               text: this.customer_info[x].SequenceNo,
               color: 'black',
               fontSize: "12px",
               fontWeight: "500",
               fontFamily: 'Tangerine',


             },
             location: this.customer_info[x].LocationCode,
             podStatus: this.customer_info[x].PodStatus,
             arrivalTime: this.customer_info[x].GeoArrivalTime,
             departureTime: this.customer_info[x].GeoDepartureTime
             // labelContent: '<i class="fa fa-flag" style="color:rgba(153,102,102,0.8);"></i>',
             // icon: ' ',
             // Address: this.trackingData[i].Address,
             // vehicle_no:this.trackingData[i].VehicleNo,
             // Imei:this.trackingData[i].ImeiNo,





           }),






         }
         /////////////////////////////////////////////////////////////////////////customer///////////////////

         var customer_Info: string = ''
         let pod: string = '';
         let type: string = '';
         let arrival_time: string = '';
         let departure_time: string = '';
         google.maps.event.addListener(this.markers.mark, 'click', (event) => {
           console.log("event", x, this.markers.mark.podStatus, this.customer_info[x].LocationCode)

           if (this.customer_info[x].PodStatus == 0) {
             pod = '-'
           }
           if (this.customer_info[x].PodStatus == 1) {
             pod = 'DONE'
           }
           if (this.customer_info[x].LocationSequence == 0) {
             type = 'ORIGIN'
           }
           if (this.customer_info[x].LocationSequence == 1) {
             type = ' INTERMEDIATE STATION '
           }
           if (this.customer_info[x].LocationSequence == 2) {
             type = ' DESTINATION '
           }
           if (this.customer_info[x].GeoArrivalTime != '') {
             arrival_time = this.customer_info[x].GeoArrivalTime + '[GPS]'
           }
           if (this.customer_info[x].GeoArrivalTime == '') {
             arrival_time = this.customer_info[x].ArrivalTime
           }
           if (this.customer_info[x].GeoDepartureTime != '') {
             departure_time = this.customer_info[x].GeoDepartureTime + '[GPS]'
           }
           if (this.customer_info[x].GeoDepartureTime == '') {
             departure_time = this.customer_info[x].DepartureTime
           }


           customer_Info = '<table class="border">' +
             '<tbody>' +

             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Location</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + this.customer_info[x].LocationCode + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">PodStatus</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + pod + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Type</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + type + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">ArrivalTime</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + arrival_time + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DepartureTime</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + departure_time + '</td>' +
             '</tr>' +
             '</tbody>' +
             '</table>'




           this.closeLastOpenedInfoWindow();
           infowindowMarker_custo.setContent(customer_Info);

           infowindowMarker_custo.setPosition(event.latLng);

           infowindowMarker_custo.open(this.map1, custo);
           //this.lastOpenedInfoWindow=0; 
           this.lastOpenedInfoWindow = infowindowMarker_custo;
         })

         var infowindowMarker_custo = new google.maps.InfoWindow({
           content: customer_Info,
         });


       }
       // this.customer_info.push(obj);
       // console.log("obj",obj)



     })
     // var array:any=[]
     console.log("customer array", this.customer_info)









     ////////////////////////////////////////////////////////////////////////////////////////////////////
     for (let z = 0; z < item.length; z++) {
       var markerLabel =
       {
         mark: new google.maps.Marker({
           map: this.map1,

           position: new google.maps.LatLng(
             item[z].lat, item[z].lng),
           title: item[z].lat + "," + item[z].lng + "," + item[z].alert_type,
           icon: {
             url: "assets/images/users/icons-flag-big.png",
             labelOrigin: new google.maps.Point(20, 15),
           },
           label: {
             text: (item[z].alert_type).slice(0, 4),
             color: 'white',
             fontSize: "12px",
             fontWeight: "bold",
             // fontFamily: 'Tangerine',
             textalign: 'center',
             Position: 'relative',
             // bottom: 1,
           },
         })
       }
     }
     console.log("alert type", item)
     // setTimeout(() => {
       // this.dashboardData1();
       if (this.trackingData.length == 0) {
         this.map_flag = 'Track data Not Available'
       }
       else if (this.trackingData.length > 0) {
         this.map_flag = ' '
       }

     // }, 5000)
   }
 }
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
 vehicleTrack2F() {
   var address: any
   var item: any = [];
   console.log("vehicleTrack3F", this.seconddaryTrack)
   var run_date = this.seconddaryTrack[0][0];
   var imei2 = this.seconddaryTrack[0][7];
   var vehicle_no = this.seconddaryTrack[0][2];
   item = this.seconddaryTrack[0][3];
   var Id = this.seconddaryTrack[0][4];
   var route_id = this.seconddaryTrack[0][5];
   var alertsummary = this.seconddaryTrack[0][6];
   if (imei2 == "") {
     alert("Device not available")
   }
   else {



     this.map_flag = 'Please Wait...'
     this.initMap1();


     this.customer_info = []

     this.poly_line = []
     // var myarray: any = []
     // var latlongS: any = []
     var customer: any = []
     // var custolatlong: any = []
     let currentDateTime = this.datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');

     console.log("dat time", currentDateTime);
     console.log("vehicle", item)
     // this.latlngbounds = new google.maps.LatLngBounds();
     ////////////////////////////////////////trackings api/////////////////////////////////////////////////////////
     var rest: any = [];
     // console.log("tracking data values",this.token,)
     var formData: any = new FormData();
     console.log("vehicle", run_date, imei2, vehicle_no, this.token, currentDateTime)
     formData.append('AccessToken', this.token)
     formData.append('startdate', run_date);
     formData.append('enddate', currentDateTime);
     formData.append('time_interval', '30');
     formData.append('imei', imei2);
     formData.append('group_id', this.group_id);
     formData.append('AccountId', this.account_id);
     formData.append('portal', 'itraceit');
     this.itraceIt.vehicleTrackongS(formData).subscribe(res => {
       // console.log("vehicle tracking responce tracking", res);
       console.log("vehicle tracking responce to check", this.token, run_date, currentDateTime, imei2, this.group_id, this.account_id);
       rest = res
       //  next: (response) => alert(response),
       // error: (error) => alert(error),

       this.trackingData = (rest.data)
       // console.log("vehicle tracking", this.trackingData)
       var icon: any
       ///////////////////////////////////////////////////////////////marker/////////////

       for (let i = 0; i < this.trackingData.length; i++)
        {

         /////////////////////////////////////////////////////////icon//////////////////////////////
         if (i == 0) {

           icon = 'assets/images/users/start_marker.png';
           // $icon_type="start";
         } else if (i + 2 == this.trackingData.length) {

           icon = 'assets/images/users/stop_marker.png';
           // $icon_type="end";
         } else {
           if (this.trackingData[i]?.speed > 5 && this.trackingData[i]?.speed <= 20) {
             icon = 'assets/images/users/yellow_Marker_bottom.png';
             // $icon_type="yellow";
           } else if ((this.trackingData[i]?.speed > 20 && this.trackingData[i]?.speed < 80)) {
             icon = 'assets/images/users/green_Marker1.png';
             // $icon_type="green";
           } else if ((this.trackingData[i]?.speed > 80)) {



             icon = 'assets/images/users/green_Marker1.png';
             // $icon_type="green";
           } else if ((this.trackingData[i]?.speed <= 5)) {
             icon = 'assets/images/users/red_Marker1.png';
             // $icon_type="red";
           } else {
             icon = 'assets/images/users/red_Marker1.png';
             // $icon_type="red";
           }
         }



         //////////////////////////////////////////////////////////////////////////////////////////////
         // this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.trackingData[i].lat), parseFloat(this.trackingData[i].long)));
         // console.log("longituted tracking",this.trackingData[i].Longitude)
         var node: any = []
         node[i] = new google.maps.LatLng(
           this.trackingData[i].lat, this.trackingData[i].long)


         this.poly_line.push(node[i]);
         this.poly_line.push(node[i]);
         this.marker =
         {
           mark: new google.maps.Marker({
             map: this.map1,

             position: new google.maps.LatLng(
               this.trackingData[i].lat, this.trackingData[i].long),
             title: this.trackingData[i].lat + "," + this.trackingData[i].long,
             // label: {
             //   text: markLabel,
             //   color: 'black',
             //   fontSize: "20px",
             //   fontWeight: "1000px",
             //   fontFamily: 'Tangerine',


             // },
             icon: icon,
             // Address: this.trackingData[i].Address,
             vehicle_no: this.trackingData[i].vnumber,
             Imei: this.trackingData[i].imei,
             time: this.trackingData[i].device_time,
             distance: this.trackingData[i].distance,
             speed: this.trackingData[i].speed,
             ServerTime: this.trackingData[i].server_time,
             // Battery:this.trackingData[i].Battery,
             DType: this.trackingData[i].dtype,






           })




         }


        
         // this.map1.setZoom(16)
         // this.map1.fitBounds(this.latlngbounds);

         google.maps.event.addListener(this.marker.mark, 'click', (event) => {
           //////////////////////////////////addresss/////////////////////////////
           var formdataCustomer = new FormData()
           formdataCustomer.append('AccessToken', this.token)
           formdataCustomer.append('VehicleId', vehicle_no);
           formdataCustomer.append('ImeiNo', imei2);
           // formdataCustomer.append('ImeiNo',data.imei);
           formdataCustomer.append('LatLong', event.latLng.lat() + ',' + event.latLng.lng());
           formdataCustomer.append('portal', 'itraceit');

           this.itraceIt.addressS(formdataCustomer).subscribe((res: any) => {

             console.log("responce", res)
             address = res.Data.Address
             console.log("address", address)

             this.showWindow(this.trackingData[i], vehicle_no, address)
             this.closeLastOpenedInfoWindow();
             infowindowMarker.setContent(this.contentsInfo);

             infowindowMarker.setPosition(event.latLng);

             infowindowMarker.open(this.map1, node);
           })


           ///////////////////////////////////////////////////////////////////////////////////////////////////


         })

         var infowindowMarker = new google.maps.InfoWindow({
           content: this.contentsInfo,
         });
       }

       let draw_polyline = new google.maps.Polyline({
         path: this.poly_line,
         geodesic: true,
         strokeColor: 'green',
         strokeOpacity: 0.8,
         strokeWeight: 1.5,
         map: this.map1,
         icons: [{
           icon: { path: google.maps.SymbolPath.FORWARD_OPEN_ARROW },
           //  google.maps.SymbolPath.FORWARD_CLOSED_ARROW
           offset: '100%',
           repeat: '1000px'
         }],

         //   icons: [{
         //     icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
         //     offset: '100%',
         //     // repeat: '30px',

         // }]




       });
       /////////////////////////////////////////////////polyline/////////////////////////
       // var poly=new google.maps.LatLng(
       //   item[z].lat,  item[z].lng)


       // console.log("polyline: " + draw_polyline.path);

       //////////////////////////////////////////////////////////////////////////////////











       // this.map1.fitBounds(this.latlngbounds);
       // this.map1.setZoom(16)
       // this.map1.fitBounds(this.latlngbounds);

     })
     //////////////////////////////////////dfg polyline///////////////////////
     var dfgPolyline: any = [];
     var lat_long: any = []
     var formdataCustomer = new FormData()
     formdataCustomer.append('AccessToken', this.token)
     formdataCustomer.append('forGroup', this.group_id);
     formdataCustomer.append('route_id', route_id);
     // var obj: any = []

     this.itraceIt.vehicle_dfgS(formdataCustomer).subscribe((res: any) => {
       // console.log("dfg polyloine", res.Polyline);
       // dfgFlag = res.Polyline

       if (res.Polyline != "") 
       {
         // var last: any = []
         // var arr1 = res.Polyline.split("~")
         // var first = arr1[0];

         // dummy.push(first);

         // last = arr1[1]

         var str = res.Polyline.replace(/ *\^[^~]*\~ */g, "");

         /////////////////////////////////////////////////////////////////////////////////////////     
         // console.log("const final",last);
         // var final: any = []













         let arry2 = str.split(/[,( )]+/)


         // if (this.trackingData.length == 0) {
         //   this.map_flag = ' '
         //   this.map1.setCenter(new google.maps.LatLng(arry2[1], arry2[2]));
         // }
         for (let i = 1; i < (arry2.length) - 1; i++)
          {

           lat_long = new google.maps.LatLng(
             arry2[i], arry2[i + 1])




           dfgPolyline.push(lat_long);
           dfgPolyline.push(lat_long);


           i++;
        



         }
         let draw_polyline = new google.maps.Polyline({
           path: dfgPolyline,
           geodesic: true,
           strokeColor: "blue",
           strokeOpacity: 2.0,
           strokeWeight: 3,
           map: this.map1,





         });





       }

     })
     //////////////////////////////////////////vehicle customer///////////
     var formdataCustomer = new FormData()
     formdataCustomer.append('AccessToken', this.token)
     formdataCustomer.append('forGroup', this.group_id);
     formdataCustomer.append('id', Id);
     var obj: any = []

     this.itraceIt.tripCustomerS(formdataCustomer).subscribe(res => {
       //  console.log("vehicle customer",res)
       customer = res
       this.customer_info = customer.customer_info
       // console.log("vehicle customer", this.customer_info)
       this.map1.setCenter(new google.maps.LatLng(this.customer_info[0].Lat, this.customer_info[0].Lng));
       // this.latlngbounds = new google.maps.LatLngBounds();
       for (let x = 0; x < this.customer_info.length; x++) {

         // this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.customer_info[x].Lat), parseFloat(this.customer_info[x].Lng)));
         var custo: any = []
         custo[x] = new google.maps.LatLng(
           this.customer_info[x].Lat, this.customer_info[x].Lng)


         this.markers =
         {
           mark: new google.maps.Marker({
             map: this.map1,

             position: new google.maps.LatLng(
               this.customer_info[x].Lat, this.customer_info[x].Lng),
             title: this.customer_info[x].Lat + "," + this.customer_info[x].Lng,
             label: {
               text: this.customer_info[x].SequenceNo,
               color: 'black',
               fontSize: "12px",
               fontWeight: "500",
               fontFamily: 'Tangerine',


             },
             location: this.customer_info[x].LocationCode,
             podStatus: this.customer_info[x].PodStatus,
             arrivalTime: this.customer_info[x].GeoArrivalTime,
             departureTime: this.customer_info[x].GeoDepartureTime
             // labelContent: '<i class="fa fa-flag" style="color:rgba(153,102,102,0.8);"></i>',
             // icon: ' ',
             // Address: this.trackingData[i].Address,
             // vehicle_no:this.trackingData[i].VehicleNo,
             // Imei:this.trackingData[i].ImeiNo,





           }),






         }
         /////////////////////////////////////////////////////////////////////////customer///////////////////

         var customer_Info: string = ''
         let pod: string = '';
         let type: string = '';
         let arrival_time: string = '';
         let departure_time: string = '';
         google.maps.event.addListener(this.markers.mark, 'click', (event) => {
           console.log("event", x, this.markers.mark.podStatus, this.customer_info[x].LocationCode)

           if (this.customer_info[x].PodStatus == 0) {
             pod = '-'
           }
           if (this.customer_info[x].PodStatus == 1) {
             pod = 'DONE'
           }
           if (this.customer_info[x].LocationSequence == 0) {
             type = 'ORIGIN'
           }
           if (this.customer_info[x].LocationSequence == 1) {
             type = ' INTERMEDIATE STATION '
           }
           if (this.customer_info[x].LocationSequence == 2) {
             type = ' DESTINATION '
           }
           if (this.customer_info[x].GeoArrivalTime != '') {
             arrival_time = this.customer_info[x].GeoArrivalTime + '[GPS]'
           }
           if (this.customer_info[x].GeoArrivalTime == '') {
             arrival_time = this.customer_info[x].ArrivalTime
           }
           if (this.customer_info[x].GeoDepartureTime != '') {
             departure_time = this.customer_info[x].GeoDepartureTime + '[GPS]'
           }
           if (this.customer_info[x].GeoDepartureTime == '') {
             departure_time = this.customer_info[x].DepartureTime
           }


           customer_Info = '<table class="border">' +
             '<tbody>' +

             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Location</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + this.customer_info[x].LocationCode + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">PodStatus</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + pod + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Type</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + type + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">ArrivalTime</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + arrival_time + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DepartureTime</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + departure_time + '</td>' +
             '</tr>' +
             '</tbody>' +
             '</table>'




           this.closeLastOpenedInfoWindow();
           infowindowMarker_custo.setContent(customer_Info);

           infowindowMarker_custo.setPosition(event.latLng);

           infowindowMarker_custo.open(this.map1, custo);
           //this.lastOpenedInfoWindow=0; 
           this.lastOpenedInfoWindow = infowindowMarker_custo;
         })

         var infowindowMarker_custo = new google.maps.InfoWindow({
           content: customer_Info,
         });


       }
       // this.customer_info.push(obj);
       // console.log("obj",obj)



     })
     // var array:any=[]
     console.log("customer array", this.customer_info)









     ////////////////////////////////////////////////////////////////////////////////////////////////////
     for (let z = 0; z < item.length; z++) 
     {

       // this.latlngbounds.extend(new google.maps.LatLng(parseFloat(item[z].lat), parseFloat(item[z].lng)));
       console.log("myarray", item[z]);
       ///////////////////////////////////////////////////////////marker label //////////////////////////////////////////////////////////////////////////////////////////





       ///////////////////////////////////////////////show alert ///////////////////////////////////////////////////////////      

       var markerLabel =
       {
         mark: new google.maps.Marker({
           map: this.map1,

           position: new google.maps.LatLng(
             item[z].lat, item[z].lng),
           title: item[z].lat + "," + item[z].lng + "," + item[z].alert_type,
           // Icon:"assets/images/users/alertFlag.png",
           // label: {
           //   text:  (item[z].alert_type).slice(0,4),
           //   color: 'black',
           //   fontSize: "10px",
           //   fontWeight: "bold",
           //   fontFamily: "Helvetica",
           // },
           icon: {
             url: "assets/images/users/icons-flag-big.png",
             labelOrigin: new google.maps.Point(20, 15),

           },



           label: {
             text: (item[z].alert_type).slice(0, 4),
             color: 'white',
             fontSize: "12px",
             fontWeight: "bold",
             // fontFamily: 'Tangerine',
             textalign: 'center',
             Position: 'relative',
             // bottom: 1,



           },






         })





       }





     }
     console.log("alert type", item)
     // setTimeout(() => {
       // this.dashboardData1();
       if (this.trackingData.length == 0) {
         this.map_flag = 'Track data Not Available'
       }
       else if (this.trackingData.length > 0) {
         this.map_flag = ' '
       }

     // }, 5000)
   }
 }
 /////////////////////////////////////////third imei/////////////////////////////////////////////////////////////
 vehicleTrack3F()
  {
   var address: any
   var item: any = [];
   console.log("vehicleTrack3F", this.seconddaryTrack)
   var run_date = this.seconddaryTrack[0][0];
   var imei2 = this.seconddaryTrack[0][8];
   var vehicle_no = this.seconddaryTrack[0][2];
   item = this.seconddaryTrack[0][3];
   var Id = this.seconddaryTrack[0][4];
   var route_id = this.seconddaryTrack[0][5];
   var alertsummary = this.seconddaryTrack[0][6];
   console.log("imei3", imei2)
   if (imei2 == "") {
     alert("Device Not Available")
   }
   else {
     // var seconddaryTrack:any=[];
     // seconddaryTrack.push([run_date,imei2,vehicle_no,item,Id,route_id,alertsummary]);
     // console.log("secondary track",seconddaryTrack);
     this.map_flag = 'Please Wait...'
     this.initMap1();
     // this.map1 = new google.maps.Map(document.getElementById('map1') as HTMLElement, {
     //   zoom: 12,


     //   mapTypeId: google.maps.MapTypeId.ROADMAP,
     //   scaleControl: true,

     // })

     this.customer_info = []

     this.poly_line = []
     var myarray: any = []
     var latlongS: any = []
     var customer: any = []
     var custolatlong: any = []
     let currentDateTime = this.datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');

     console.log("dat time", currentDateTime);
     console.log("vehicle", item)
     // this.latlngbounds = new google.maps.LatLngBounds();
     ////////////////////////////////////////trackings api/////////////////////////////////////////////////////////
     var rest: any = [];
     // console.log("tracking data values",this.token,)
     var formData: any = new FormData();
     console.log("vehicle", run_date, imei2, vehicle_no, this.token, currentDateTime)
     formData.append('AccessToken', this.token)
     formData.append('startdate', run_date);
     formData.append('enddate', currentDateTime);
     formData.append('time_interval', '30');
     formData.append('imei', imei2);
     formData.append('group_id', this.group_id);
     formData.append('AccountId', this.account_id);
     formData.append('portal', 'itraceit');
     this.itraceIt.vehicleTrackongS(formData).subscribe(res => {
       // console.log("vehicle tracking responce tracking", res);
       console.log("vehicle tracking responce to check", this.token, run_date, currentDateTime, imei2, this.group_id, this.account_id);
       rest = res
       //  next: (response) => alert(response),
       // error: (error) => alert(error),

       this.trackingData = (rest.data)
       // console.log("vehicle tracking", this.trackingData)
       var icon: any
       ///////////////////////////////////////////////////////////////marker/////////////

       for (let i = 0; i < this.trackingData.length; i++) 
       {

         /////////////////////////////////////////////////////////icon//////////////////////////////
         if (i == 0) {

           icon = 'assets/images/users/start_marker.png';
           // $icon_type="start";
         } else if (i + 2 == this.trackingData.length) {

           icon = 'assets/images/users/stop_marker.png';
           // $icon_type="end";
         } else {
           if (this.trackingData[i]?.speed > 5 && this.trackingData[i]?.speed <= 20) {
             icon = 'assets/images/users/yellow_Marker_bottom.png';
             // $icon_type="yellow";
           } else if ((this.trackingData[i]?.speed > 20 && this.trackingData[i]?.speed < 80)) {
             icon = 'assets/images/users/green_Marker1.png';
             // $icon_type="green";
           } else if ((this.trackingData[i]?.speed > 80)) {



             icon = 'assets/images/users/green_Marker1.png';
             // $icon_type="green";
           } else if ((this.trackingData[i]?.speed <= 5)) {
             icon = 'assets/images/users/red_Marker1.png';
             // $icon_type="red";
           } else {
             icon = 'assets/images/users/red_Marker1.png';
             // $icon_type="red";
           }
         }



         //////////////////////////////////////////////////////////////////////////////////////////////
         // this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.trackingData[i].lat), parseFloat(this.trackingData[i].long)));
         // console.log("longituted tracking",this.trackingData[i].Longitude)
         var node: any = []
         node[i] = new google.maps.LatLng(
           this.trackingData[i].lat, this.trackingData[i].long)


         this.poly_line.push(node[i]);
         this.poly_line.push(node[i]);
         this.marker =
         {
           mark: new google.maps.Marker({
             map: this.map1,

             position: new google.maps.LatLng(
               this.trackingData[i].lat, this.trackingData[i].long),
             title: this.trackingData[i].lat + "," + this.trackingData[i].long,
             // label: {
             //   text: markLabel,
             //   color: 'black',
             //   fontSize: "20px",
             //   fontWeight: "1000px",
             //   fontFamily: 'Tangerine',


             // },
             icon: icon,
             // Address: this.trackingData[i].Address,
             vehicle_no: this.trackingData[i].vnumber,
             Imei: this.trackingData[i].imei,
             time: this.trackingData[i].device_time,
             distance: this.trackingData[i].distance,
             speed: this.trackingData[i].speed,
             ServerTime: this.trackingData[i].server_time,
             // Battery:this.trackingData[i].Battery,
             DType: this.trackingData[i].dtype,






           })




         }


       
         // this.map1.setZoom(16)
         // this.map1.fitBounds(this.latlngbounds);

         google.maps.event.addListener(this.marker.mark, 'click', (event) => {

           /////////////////////////////////////////address////////////////////////////
           var formdataCustomer = new FormData()
           formdataCustomer.append('AccessToken', this.token)
           formdataCustomer.append('VehicleId', vehicle_no);
           formdataCustomer.append('ImeiNo', imei2);
           // formdataCustomer.append('ImeiNo',data.imei);
           formdataCustomer.append('LatLong', event.latLng.lat() + ',' + event.latLng.lng());

           formdataCustomer.append('portal', 'itraceit');
           this.itraceIt.addressS(formdataCustomer).subscribe((res: any) => {

             console.log("responce", res)
             address = res.Data.Address
             console.log("address", address)
             this.showWindow(this.trackingData[i], vehicle_no, address)
             this.closeLastOpenedInfoWindow();
             infowindowMarker.setContent(this.contentsInfo);

             infowindowMarker.setPosition(event.latLng);

             infowindowMarker.open(this.map1, node);


           })


           ///////////////////////////////////////////////////////////////////////////////////////////////////////


         })

         var infowindowMarker = new google.maps.InfoWindow({
           content: this.contentsInfo,
         });
       }

       let draw_polyline = new google.maps.Polyline({
         path: this.poly_line,
         geodesic: true,
         strokeColor: 'green',
         strokeOpacity: 0.8,
         strokeWeight: 1.5,
         map: this.map1,
         icons: [{
           icon: { path: google.maps.SymbolPath.FORWARD_OPEN_ARROW },
           //  google.maps.SymbolPath.FORWARD_CLOSED_ARROW
           offset: '100%',
           repeat: '1000px'
         }],

         //   icons: [{
         //     icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
         //     offset: '100%',
         //     // repeat: '30px',

         // }]




       });
       /////////////////////////////////////////////////polyline/////////////////////////
       // var poly=new google.maps.LatLng(
       //   item[z].lat,  item[z].lng)


       // console.log("polyline: " + draw_polyline.path);

       //////////////////////////////////////////////////////////////////////////////////











       // this.map1.fitBounds(this.latlngbounds);
       // this.map1.setZoom(16)
       // this.map1.fitBounds(this.latlngbounds);

     })
     //////////////////////////////////////dfg polyline///////////////////////
     var dfgPolyline: any = [];
     var lat_long: any = []
     var formdataCustomer = new FormData()
     formdataCustomer.append('AccessToken', this.token)
     formdataCustomer.append('forGroup', this.group_id);
     formdataCustomer.append('route_id', route_id);
     // var obj: any = []

     this.itraceIt.vehicle_dfgS(formdataCustomer).subscribe((res: any) => {
       // console.log("dfg polyloine", res.Polyline);
       // dfgFlag = res.Polyline

       if (res.Polyline != "") 
       {
         // var last: any = []
         // var arr1 = res.Polyline.split("~")
         // var first = arr1[0];

         // dummy.push(first);

         // last = arr1[1]

         var str = res.Polyline.replace(/ *\^[^~]*\~ */g, "");

         /////////////////////////////////////////////////////////////////////////////////////////     
         // console.log("const final",last);
         // var final: any = []













         let arry2 = str.split(/[,( )]+/)


         if (this.trackingData.length == 0) {
           this.map_flag = ' '
           // this.map1.setCenter(new google.maps.LatLng(arry2[1], arry2[2]));
         }
         for (let i = 1; i < (arry2.length) - 1; i++)
          {

           lat_long = new google.maps.LatLng(
             arry2[i], arry2[i + 1])




           dfgPolyline.push(lat_long);
           dfgPolyline.push(lat_long);


           i++;
        



         }
         let draw_polyline = new google.maps.Polyline({
           path: dfgPolyline,
           geodesic: true,
           strokeColor: "blue",
           strokeOpacity: 2.0,
           strokeWeight: 3,
           map: this.map1,





         });





       }

     })
     //////////////////////////////////////////vehicle customer///////////
     var formdataCustomer = new FormData()
     formdataCustomer.append('AccessToken', this.token)
     formdataCustomer.append('forGroup', this.group_id);
     formdataCustomer.append('id', Id);
     var obj: any = []

     this.itraceIt.tripCustomerS(formdataCustomer).subscribe(res => {
       //  console.log("vehicle customer",res)
       customer = res
       this.customer_info = customer.customer_info
       // console.log("vehicle customer", this.customer_info)
       this.map1.setCenter(new google.maps.LatLng(this.customer_info[0].Lat, this.customer_info[0].Lng));
       // this.latlngbounds = new google.maps.LatLngBounds();
       for (let x = 0; x < this.customer_info.length; x++) {

         // this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.customer_info[x].Lat), parseFloat(this.customer_info[x].Lng)));
         var custo: any = []
         custo[x] = new google.maps.LatLng(
           this.customer_info[x].Lat, this.customer_info[x].Lng)


         this.markers =
         {
           mark: new google.maps.Marker({
             map: this.map1,

             position: new google.maps.LatLng(
               this.customer_info[x].Lat, this.customer_info[x].Lng),
             title: this.customer_info[x].Lat + "," + this.customer_info[x].Lng,
             label: {
               text: this.customer_info[x].SequenceNo,
               color: 'black',
               fontSize: "12px",
               fontWeight: "500",
               fontFamily: 'Tangerine',


             },
             location: this.customer_info[x].LocationCode,
             podStatus: this.customer_info[x].PodStatus,
             arrivalTime: this.customer_info[x].GeoArrivalTime,
             departureTime: this.customer_info[x].GeoDepartureTime
             // labelContent: '<i class="fa fa-flag" style="color:rgba(153,102,102,0.8);"></i>',
             // icon: ' ',
             // Address: this.trackingData[i].Address,
             // vehicle_no:this.trackingData[i].VehicleNo,
             // Imei:this.trackingData[i].ImeiNo,





           }),






         }
         /////////////////////////////////////////////////////////////////////////customer///////////////////

         var customer_Info: string = ''
         let pod: string = '';
         let type: string = '';
         let arrival_time: string = '';
         let departure_time: string = '';
         google.maps.event.addListener(this.markers.mark, 'click', (event) => {
           console.log("event", x, this.markers.mark.podStatus, this.customer_info[x].LocationCode)

           if (this.customer_info[x].PodStatus == 0) {
             pod = '-'
           }
           if (this.customer_info[x].PodStatus == 1) {
             pod = 'DONE'
           }
           if (this.customer_info[x].LocationSequence == 0) {
             type = 'ORIGIN'
           }
           if (this.customer_info[x].LocationSequence == 1) {
             type = ' INTERMEDIATE STATION '
           }
           if (this.customer_info[x].LocationSequence == 2) {
             type = ' DESTINATION '
           }
           if (this.customer_info[x].GeoArrivalTime != '') {
             arrival_time = this.customer_info[x].GeoArrivalTime + '[GPS]'
           }
           if (this.customer_info[x].GeoArrivalTime == '') {
             arrival_time = this.customer_info[x].ArrivalTime
           }
           if (this.customer_info[x].GeoDepartureTime != '') {
             departure_time = this.customer_info[x].GeoDepartureTime + '[GPS]'
           }
           if (this.customer_info[x].GeoDepartureTime == '') {
             departure_time = this.customer_info[x].DepartureTime
           }


           customer_Info = '<table class="border">' +
             '<tbody>' +

             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Location</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + this.customer_info[x].LocationCode + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">PodStatus</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + pod + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Type</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + type + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">ArrivalTime</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + arrival_time + '</td>' +
             '</tr>' +
             '<tr>' +
             '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DepartureTime</td>' +
             '<td style="width:1%;color: blue;">:</td>' +
             '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + departure_time + '</td>' +
             '</tr>' +
             '</tbody>' +
             '</table>'




           this.closeLastOpenedInfoWindow();
           infowindowMarker_custo.setContent(customer_Info);

           infowindowMarker_custo.setPosition(event.latLng);

           infowindowMarker_custo.open(this.map1, custo);
           //this.lastOpenedInfoWindow=0; 
           this.lastOpenedInfoWindow = infowindowMarker_custo;
         })

         var infowindowMarker_custo = new google.maps.InfoWindow({
           content: customer_Info,
         });


       }
       // this.customer_info.push(obj);
       // console.log("obj",obj)



     })
     // var array:any=[]
     console.log("customer array", this.customer_info)









     ////////////////////////////////////////////////////////////////////////////////////////////////////
     for (let z = 0; z < item.length; z++) 
     {

       // this.latlngbounds.extend(new google.maps.LatLng(parseFloat(item[z].lat), parseFloat(item[z].lng)));
       // console.log("myarray", item[z].lat);
       ///////////////////////////////////////////////////////////marker label //////////////////////////////////////////////////////////////////////////////////////////
       //        var icon2 = {
       //         url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
       //         anchor: new google.maps.Point(0, 0),
       //         // scaledSize: my_scaled,
       //         // scaledSize: new google.maps.Size(20, 20),
       //         labelOrigin:  new google.maps.Point(20,-5),
       //         labelAnchor:  new google.maps.Point(20,-5),

       //       };
       //       var vehicleIcon = '<img  src=\"'+icon2+'\" />';

       //     var  vehicleLabel = '<img  src=\"'+icon2+'\" />';

       //     var label_anchor = new google.maps.Point(-16, 4);new google.maps.Point(100, 5);
       //       var label_anchor = new google.maps.Point(-8, 4);
       //  var    finalVehicleLabel = vehicleIcon + ' ' + vehicleLabel;
       //  var marker = new MarkerWithLabel({
       //   position: new google.maps.LatLng(
       //         item[z].lat,  item[z].lng),
       //   map: this.map1,
       //   icon: vehicleIcon,
       //   draggable: false, // the CSS class for the label
       //   raiseOnDrag: false,
       //   labelContent: item[z].alert_type,
       //   labelAnchor: label_anchor,//new google.maps.Point(100, 5),
       //   labelClass: 'custom_label_black',  //my_label_class, // the CSS class for the label
       //   labelInBackground: false,
       //  })


       ///////////////////////////////////////////////show alert ///////////////////////////////////////////////////////////      

       var markerLabel =
       {
         mark: new google.maps.Marker({
           map: this.map1,

           position: new google.maps.LatLng(
             item[z].lat, item[z].lng),
           title: item[z].lat + "," + item[z].lng + "," + item[z].alert_type,
           // Icon:"assets/images/users/alertFlag.png",
           // label: {
           //   text:  (item[z].alert_type).slice(0,4),
           //   color: 'black',
           //   fontSize: "10px",
           //   fontWeight: "bold",
           //   fontFamily: "Helvetica",
           // },
           icon: {
             url: "assets/images/users/icons-flag-big.png",
             labelOrigin: new google.maps.Point(20, 15),

           },



           label: {
             text: (item[z].alert_type).slice(0, 4),
             color: 'white',
             fontSize: "12px",
             fontWeight: "bold",
             // fontFamily: 'Tangerine',
             textalign: 'center',
             Position: 'relative',
             // bottom: 1,



           },






         })





       }





     }
     console.log("alert type", item)
     // setTimeout(() => {
       // this.dashboardData1();
       if (this.trackingData.length == 0) {
         this.map_flag = 'Track data Not Available'
       }
       else if (this.trackingData.length > 0) {
         this.map_flag = ' '
       }

     // }, 5000)
   }

 }

 ///////////////////////show window of vehicle information///////////////////////////////////

 showWindow(data, vnumber, add) {
   // var add:any
   this.contentsInfo = ''
   // console.log('show window of vehicle information', data, add)
   /////////////////////////address api////////////////////////////////////////////////////



   ////////////////////////////////////////////////////////////////////////////////////////////////////////////

   this.contentsInfo = '<table >' +
     '<tbody>' +

     '<tr>' +
     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Lat Long</td>' +
     '<td style="width:1%;color: blue;">:</td>' +
     '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.lat + ',' + data.long + '</td>' +
     '</tr>' +
     '<tr>' +
     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Vehicle No</td>' +
     '<td style="width:1%;color: blue;">:</td>' +
     '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + vnumber + '</td>' +
     '</tr>' +
     '<tr>' +
     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Address</td>' +
     '<td style="width:1%;color: blue;">:</td>' +
     '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + add + '</td>' +
     '</tr>' +
     '<tr>' +
     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Imei</td>' +
     '<td style="width:1%;color: blue;">:</td>' +
     '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.imei + '</td>' +
     '</tr>' +
     '<tr>' +
     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Date Time</td>' +
     '<td style="width:1%;color: blue;">:</td>' +
     '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.device_time + '</td>' +
     '</tr>' +
     '<tr>' +
     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Speed(km/hr)</td>' +
     '<td style="width:1%;color: blue;">:</td>' +
     '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.speed + '</td>' +
     '</tr>' +
     '<tr>' +
     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Server Time</td>' +
     '<td style="width:1%;color: blue;">:</td>' +
     '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.server_time + '</td>' +
     '</tr>' +
     '<tr>' +
     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Distance</td>' +
     '<td style="width:1%;color: blue;">:</td>' +
     '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.distance + '</td>' +
     '</tr>' +
     '<tr>' + data.io + '<tr>' +
     '<tr>' +
     '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Location Type</td>' +
     '<td style="width:1%;color: blue;">:</td>' +
     '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + data.loc_type + '</td>' +
     '</tr>' +
     '</tbody>' +
     '</table>'






 }
 ///////////////////////////////////////////////////////////////full threat data ///////////////////
 threatDataF() {
   var token: any
   var threat: any = []
   this.allThreatData = []
   var formData: any = new FormData();
   // console.log("vehicle",run_date,imei,vehicle_no)
   formData.append('AccessToken', this.token)
   formData.append('forGroup', this.group_id)
   formData.append('forGroup', this.group_id)
   formData.append('Critical', localStorage.getItem('critial')!)
   this.itraceIt.threatFullDataS(formData).subscribe(res => {

     threat = res
     this.totalThreat = threat.Total
     for (const [key, value] of Object.entries(threat.ThreatInfo)) {
       // console.log("value===", value);
       this.allThreatData.push(value);
     }

     // console.log("threatData", this.allThreatData);
     this.threatTable()
   })

 }
 //////////////////////////////////////////////threat table//////////////////////////////////////////////////
 threatTable() {

   var tbl = $('#threatTable')
   var table = $('#threatTable').DataTable();
   table.clear();
   table.destroy();





   $(document).ready(function () {



     $('#threatTable').DataTable({


       pageLength: 10,
       fixedHeader: true,
       // scrollX: true,
       scrollY: '450px',
       // scrollCollapse: true,
       paging: true,
       scrollX: true,
       destroy: true,
       responsive: true,



       "order": [],

       dom: '<"html5buttons"B>lTfgitp',

       columnDefs: [
         { targets: 'no-sort', orderable: false }
       ],
       // dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
       // "<'row'<'col-sm-12'tr>>" +
       // "<'row'<'col-sm-5'i><'col-sm-7'p>>",
       buttons:
         [
           //   text: 'Close',
           //   className: 'tableBtnClose',
           //   action: function ( e, dt, node, config ) {
           //    buttonFunction()
           //   }},
           //   {
           //     text: 'Grace',
           //     className: 'tableBtnClose',
           //     action: function ( e, dt, node, config ) {
           //       buttonFunction()
           //     }},
           //     {
           //       text: 'QRT',
           //       className: 'tableBtnClose',
           //       action: function ( e, dt, node, config ) {
           //         buttonFunction()
           //       }},
           //       {
           //         text: 'Escalate',
           //         className: 'tableBtnClose',
           //         action: function ( e, dt, node, config ) {
           //           buttonFunction()
           //         }},
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
             title: 'Threats Report'
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
             customize: function (doc) {
               var colCount = new Array();
               $(tbl).find('tbody tr:first-child td').each(() => {
                 if ($(this).attr('colspan')) {
                   for (var i = 1; i <= $(this).attr('colspan'); i++) {
                     colCount.push('*');
                   }
                 } else { colCount.push('*'); }
               });
               doc.content[1].table.widths = colCount;
             },


             exportOptions: {

               columns: ':visible',
               //  columns: [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 ]

             },
             title: 'Threats Report'
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
             title: 'Threats Report'
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
             title: 'Threats Report'
           }],
       "language": {
         search: '',
         searchPlaceholder: 'Search'
       },
     }

     );
   });

   // console.log("table length2",datatable.length)
 }
 ////////////////////////////////////////////////////////////////action on threatr///////////////////////
 // actionThreatList(event)
 // {
 // console.log("event on threatr",event);
 // }
 //////////////////////////////thtreat history////////////////////////////////////////////
 threatHistory() {

   var formdata: any = new FormData();
   formdata.append('AccessToken', this.token)
   formdata.append('forGroup', this.group_id)
   formdata.append('shipment_no', this.threatTrip_id)
   this.itraceIt.threatHistoryS(formdata).subscribe(res => {
     this.threatHistorydata = res
     // console.log("threat history", this.threatHistorydata)
     // alert(JSON.stringify(res))
   })


 }
 //////////////////////////////////////////////////////////threat check function///////////
 threatTcheckF(log_id, tripid, alert_type, event) {

   var check = document.getElementById('threadCheckId') as HTMLLIElement
   this.threatId = log_id
   this.threatTrip_id = tripid
   this.threatalert_type = alert_type
   if (event.target.checked == true) {
     this.threatActionBtnflag = false
   }
   else {
     this.threatActionBtnflag = true

   }
   // console.log("threat check", log_id, tripid, alert_type, event);
 }
 ///////////////////////////////////////////////////////////////threat actioon submit function///////////////
 threatActionF(value) {
   var formdata: any = new FormData();
   formdata.append('AccessToken', this.token)
   formdata.append('forGroup', this.group_id)
   formdata.append('action_type', value.actionThreatList)
   var details = {
     "action_details": {
       "threat_log_id": this.threatId,
       "remarks": value.graceRemarks,
       "threat_type": this.threatalert_type,
       "shipment_no": this.threatTrip_id,
       "email_to": "",
       "email_cc": "",
       "sms_to": ""
     }
   }
   formdata.append('action_details', JSON.stringify(details))


   this.itraceIt.threatActionSubS(formdata).subscribe(res => {
     // console.log("threatActionF", res)
     var responce: any = res
     // console.log("threat action", res)
     if (responce.message == "success") {
       // console.log("responce", responce.message)
       this.alertMessage = " Successfully!"
       // console.log("responce", responce.message)
       // setTimeout(function () {
       $('#editwzalert').modal('show');
       // }, 2000)



       setTimeout(() => {
         location.reload();
       }, 3000)
       // alert("Threat Action Success")

     }
     else {
       this.alertMessage = "Error!"
       // setTimeout(function () {
       $('#editwzalert').modal('show');
       //  }, 2000)
     }
     // alert(JSON.stringify(res))
   })
 }


 ///////////////////////////////////////last alert function on desktop//////////////////
 lastAlertF(index)
  {
   this.lastlaertFlag=false;
   // this.lasttableData=index;
   // console.log("last alert function on desktop", this.lasttableData)
   var checkboxeshead: any = document.getElementsByName('flexCheckCheckedHead');
   for (var checkbox of checkboxeshead) {
     checkbox.checked = false;
   }
   // checkboxeshead.checked =false;
   var checkboxes: any = document.getElementsByName('triggerIdLastAlertNew');
   for (var checkbox of checkboxes) {
     checkbox.checked = false;
   }
   this.imageurl = '';
   // console.log("lastAlertF", index)
   this.checkboxId = []
   this.graceId_string = ''
   this.graceShipment_string = ''
   this.alertype_string = ''
   this.graceBtnFlag = true
   this.escalationbtnFlag = true
   this.iscloseFlagbtn = true
   this.qrtFlag = true
   this.checkbox_phoneno = ''///////////////////////////////escalation_check
   this.checkbox_email = ''//////////////////////////////escalation_check
   // this.grace_infoTbl:any
   this.graceTble_phoneno = ''
   this.graceTble_email = ''
   this.checkboxId = []///////////////////////////blank array for check legth enable disable button
   this.lastAlertdata = []
   this.lastalrtVehicleno = index.name
   // console.log("last alert function", index.name)
   this.lastAlertdata = index.alerts
   // console.log("last alert data", this.lastAlertdata)
   // console.log("last alert data", this.lastAlertdata[0].escalation_type)

   // this.lastAlertTable()

   

 }
 /////////////////////////////////////////////////////toytal trigger function on dashboard///////
 totaltriggerF() {
   // this.triggerTable();
    
   var table = $('#triggerTableFull').DataTable();

   table.columns(4).search("").draw();

   var checkboxeshead: any = document.getElementsByName('flexCheckCheckedHead');
   for (var checkbox of checkboxeshead) {
     checkbox.checked = false;
   }
   // checkboxeshead.checked =false;
   var checkboxes: any = document.getElementsByName('triggerIdLastAlertNew');
   for (var checkbox of checkboxes) {
     checkbox.checked = false;
   }

   this.imageurl = '';
   this.checkboxId = []
   this.graceId_string = ''
   this.graceShipment_string = ''
   this.alertype_string = ''
   this.graceAlertType = null
   this.graceId = null
   this.graceShipment = null
   this.graceVehicle = null
   ////////////////////////////////
   this.graceBtnFlag = true
   this.escalationbtnFlag = true
   this.iscloseFlagbtn = true
   this.checkbox_phoneno = ''///////////////////////////////escalation_check
   this.checkbox_email = ''//////////////////////////////escalation_check
   // this.grace_infoTbl:any
   this.graceTble_phoneno = ''
   this.graceTble_email = ''
   this.checkboxId = []
   // console.log("all trigger f", this.checkbox_phoneno, this.checkbox_email, this.checkboxId)


 }
 //////////////////////////////////////////////////////////last alert table function////////////////
 lastAlertTable() {

  var tbl = $('#lastalertTableId')
  var table = $('#lastalertTableId').DataTable();
  table.destroy();
  // table.clear().draw();

  setTimeout(() => {

    $(document).ready(function () {

      // table.columns.adjust()

      $('#lastalertTableId').DataTable({


        pageLength: 10,
        fixedHeader: true,
        // scrollX: true,
        scrollY: '400px',
        // scrollCollapse: true,
        paging: true,
        scrollX: true,
        destroy: true,
        responsive: true,
        retrieve: false,
        // initialize:true,
        autoWidth: true,
        columnAdjust: true,




        "order": [],

        dom: '<"html5buttons"B>lTfgitp',

        columnDefs: [
          { targets: 'no-sort', orderable: false }
        ],
        // dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
        // "<'row'<'col-sm-12'tr>>" +
        // "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        buttons:
          [
            //   text: 'Close',
            //   className: 'tableBtnClose',
            //   action: function ( e, dt, node, config ) {
            //    buttonFunction()
            //   }},
            //   {
            //     text: 'Grace',
            //     className: 'tableBtnClose',
            //     action: function ( e, dt, node, config ) {
            //       buttonFunction()
            //     }},
            //     {
            //       text: 'QRT',
            //       className: 'tableBtnClose',
            //       action: function ( e, dt, node, config ) {
            //         buttonFunction()
            //       }},
            //       {
            //         text: 'Escalate',
            //         className: 'tableBtnClose',
            //         action: function ( e, dt, node, config ) {
            //           buttonFunction()
            //         }},
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
              title: 'Open Trigger Report'
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
              customize: function (doc) {
                var colCount = new Array();
                $(tbl).find('tbody tr:first-child td').each(() => {
                  if ($(this).attr('colspan')) {
                    for (var i = 1; i <= $(this).attr('colspan'); i++) {
                      colCount.push('*');
                    }
                  } else { colCount.push('*'); }
                });
                doc.content[1].table.widths = colCount;
              },


              exportOptions: {

                columns: ':visible',
                //  columns: [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 ]

              },
              title: 'Open Trigger Report'
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
              title: 'Open Trigger Report'
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
              title: 'Open Trigger Report'
            }],
        "language": {
          search: '',
          searchPlaceholder: 'Search'
        },
      }

      );
    });
  }, 200)

  // console.log("table length2",datatable.length)
}
 ///////////////////////////////////////////////upload file from desktop///////////////////////////////////////////// 
 selectFile(event) {
   this.imageurl = ''
   const file = (event.target).files[0]
   this.uploadfiledsk = event.target.files[0]


   const reader = new FileReader();
   reader.onload = () => {
     this.imageurl = reader.result as string;
   }
   reader.readAsDataURL(file)
   // console.log("file", this.uploadfiledsk)
   // console.log("file stringyfy", JSON.stringify(this.uploadfiledsk))



 }
 ///////////////////////////////select shipment number from desktop for filr upload//////////////
 file_shipmnt(shipment) {
   this.imageurl = '';

   this.Shipment_select = shipment
   // console.log("shipment", shipment)
 }
 ///////////////////////////////////////file upload submit function////////////////////////////////
 UploadFiledskF(value) {
   // console.log("upload value", value)
   var formdata: any = new FormData();
   formdata.append('AccessToken', this.token)
   formdata.append('forGroup', this.group_id)
   formdata.append('file_title', value.file_title)
   formdata.append('shipment_no', this.Shipment_select)
   formdata.append('file', this.uploadfiledsk)
   this.itraceIt.fileuploadDskS(formdata).subscribe((res: any) => {
     // console.log("threatActionF", res)
     if (res.status == "success") {
       this.alertModelFlag = true
       this.alertMessage = "Upload Successfully!"
       // console.log("responce", res.message)

       $('#editwzalert').modal('show');
       setTimeout(function () {
         $('#editwzalert').modal('hide');
       }, 3000)
     }
     // alert(JSON.stringify(res))
   })
   // console.log("upload", this.token, value.file_title, this.Shipment_select, this.uploadfiledsk)
 }
 /////////////////////////////////////view file desktop/////////////////////////////////////
 viewFileF(shipment) {
   // console.log("ship", shipment)
   var formdata: any = new FormData();
   formdata.append('AccessToken', this.token)
   formdata.append('forGroup', this.group_id)
   formdata.append('shipment_no', shipment)
   this.itraceIt.viewFileS(formdata).subscribe(res => {
     this.uploadDocData = res
     // console.log("threatActionF", this.uploadDocData)
     // alert(JSON.stringify(res))
   })
 }
 ///////////////////////////////////////////////view history on dashboard/////////////////////////
 viewHitoryDash(shipment) {
   this.SpinnerService.show("history")
   this.history_dsk = []
   var fulldata: any = []
   var color: any = []
   var level: any = []
   var colordata: any = []
   var leveldata: any = []
   var formdata: any = new FormData();
   formdata.append('AccessToken', this.token)
   formdata.append('forGroup', this.group_id)
   formdata.append('shipment_no', shipment)
   this.itraceIt.historyDashboardS(formdata).subscribe(res => {
     fulldata = res
     console.log("historydata", fulldata)
     for (let i = 0; i < fulldata.length; i++) {
         if(fulldata[i]?.color!==null){
       color[i] = fulldata[i]?.color.split(":")}
       level[i] = fulldata[i]?.level.split(":")

       colordata[i] = {
         'colorS': color[i]
       }
       leveldata[i] = {
         'levelS': level[i]
       }
       // console.log("hCplore", colordata[i])
       fulldata[i] = this.Object.assign(fulldata[i], colordata[i])
       fulldata[i] = this.Object.assign(fulldata[i], leveldata[i])

     }


     this.history_dsk = fulldata
     // console.log("new history", this.history_dsk)
     // alert(JSON.stringify(res))
     this.SpinnerService.hide("history")
   })


 }
 ///////////////////////////////////////////////////////////view history on qrt click////////////////////
 qrtHistory(shipment) {
   this.qrtHistoryData = []
   var fulldata: any = []
   var color
   var level
   var formdata: any = new FormData();
   formdata.append('AccessToken', this.token)
   formdata.append('forGroup', this.group_id)
   formdata.append('shipment_no', shipment)
   this.itraceIt.qrtHistoryS(formdata).subscribe(res => {
     fulldata = res
     for (const [key, value] of Object.entries(fulldata)) {
       // console.log(key, value);
       this.qrtHistoryData.push(value)
     }
     //

     // console.log("qrt history", this.qrtHistoryData)
   })
 }



 /////////////////////////////////////////////

 //////////////////////////////close history function////////////////////////
 CLoseHistoryF() {
   if (this.close_history == true) {
     this.close_history = false
     this.close_tabFlag = true
   }
   else if (this.close_history == false) {
     this.close_history = true
     this.close_tabFlag = false
   }
 }
 /////////////////////////////////////////////////////////////////////////////////////////////
 addMoreCLose() {
   if (this.addMoreFlag == true) {
     this.addMoreFlag = false

   }
   else if (this.addMoreFlag == false) {
     this.addMoreFlag = true

   }
 }
 //////////////////////////////close qrt function///////////////////////
 Closeqrt(shipment) {
   // console.log("Close", shipment);
   var formdata: any = new FormData();
   formdata.append('AccessToken', this.token)
   formdata.append('forGroupId', this.group_id)
   formdata.append('shipment_no', shipment)
   this.itraceIt.qrtHistoryCloseS(formdata).subscribe(res => {
     // console.log("Close responce", res);
     var responce: any = res
     // console.log("threat action", res)
     if (responce.Status
       == "success") {
       // console.log("responce", responce.message)
       this.alertMessage = "QRT Close Successfully!"
       // console.log("responce", responce.message)
       // setTimeout(function () {
       $('#editwzalert').modal('show');
       // }, 2000)



       setTimeout(() => {
         location.reload();
       }, 3000)
       // alert("Threat Action Success")

     }
     if (responce.Status
       == "failed") {
       this.alertMessage = "Error!"
       // setTimeout(function () {
       $('#editwzalert').modal('show');
       //  }, 2000)
       // alert("Threat Action Success")

     }

   })


 }
 ///////////////////////////////////priorety/////////////////////////////////////////
 prioretySetF(data) {
   if (data.length >= 24) {
     alert("Max Limit exceeded")
   }
   // console.log("data", data);
 }
 ///////////////priorety submit//////////////////////////////////////////
 prioretySubmit(value) {
   var str: any = ''
   // console.log("value", value.shipment_No);
   for (var i = 0; i < value.shipment_No.length; i++) {

     str += value.shipment_No[i]?.id + ',';




   }
   // console.log("str", str);

   console.log("value all", value);
   var formdata: any = new FormData();
   formdata.append('AccessToken', this.token)
   formdata.append('id', str)
   formdata.append('forGroup', this.group_id)
   formdata.append('set_type', 1)
   formdata.append('set_priority', 1)
   this.itraceIt.priorityS(formdata).subscribe(res => {
     // console.log("res res", res);
     $('#prioretyModal').modal('hide');
     if (res == 'success') {

       alert("Trip set to High Priority successfully")
       setTimeout(() => {
         location.reload();
       }, 2000)

     }
     else {
       alert("error");
     }
   });

 }
 //////////////////////////////////////////////remove priorety submit////////////////////////////////
 RemoveprioretySubmit() {
   // console.log("value", this.mongoId)
   // console.log("value",value.shipment_No.id);
   var formdata: any = new FormData();
   formdata.append('AccessToken', this.token)
   formdata.append('id', this.mongoId)
   formdata.append('forGroup', this.group_id)
   formdata.append('set_type ', 0)
   formdata.append('set_priority', 0)
   this.itraceIt.priorityS(formdata).subscribe(res => {
     // console.log("res res", res);
     $('#remove_priority').modal('hide');
     if (res == 'success') {

       alert("Trip set to Normal Mode successfully")
       setTimeout(() => {
         location.reload();
       }, 2000)

     }
     else {
       alert("error");
     }
   });

 }
 //////////////////////////////////hold id on click shipmnt////////////
 remove_priorityId(value, permission) {
   // console.log("value", value, permission)
   this.mongoId = value;
   if (permission == 1) {
     $('#remove_priority').modal('show');
   }
   else {
     alert("You are not allowed to Change Priority")
   }
 }
 ///////////////////////////////change function of high priority////////////////////////////////////////
 changeHighP(data) {
   // console.log("data", data.target.value)
   if (data.target.value == 'shipment') {
     this.shipmentcheckFlag = true;
     this.vehicleCheckFlag = false;
   }
   else if (data.target.value == 'vehicle') {
     this.shipmentcheckFlag = false;
     this.vehicleCheckFlag = true;
   }
 }
 ////////////////////////////////////////////table color/////////////////////////////
 redF() {
   let l: any
   l = document.getElementById('red')
   l.style.background = 'black'
 }
 //////////////////////////chart function////////////////////////////////////////////////
 chartF() {
   $('#chart').modal('show');
   let Ctx: any
   Ctx = document.getElementById('myChart');

   var mychart = new Chart(Ctx, {
     type: 'bar',
     data: {
       labels: ['DFG', 'Sch_halt', 'Unch_halt', 'Senstive'],
       datasets: [{
         label: 'Alert Data',
         data: [this.DFG_count, this.SCHEDULED_HALT_count, this.UNSCHEDULED_HALT_count, this.SENSITIVE_HALT_count],
         borderWidth: 0,
         backgroundColor: ['red', 'green', 'yellow', 'cyan'],
       }]
     },
     options: {
       scales: {
         // 
         //   beginAtZero: true,

         // }
       }
     }
   });
 }
 ////////////////////////////////vehicle status for colour in map tracking////////////////////////////////////////////////////////////////////
 vehicleStatus(data1, data2, data3) {
   this.colorTrack = [];
   // console.log("status data", data1, data2, data3);
   if (data1 == 3) {
     this.colorTrack.splice(0, 0, { first: 'grey' });
   }
   else if (data1 == 1) {
     this.colorTrack.splice(0, 0, { first: 'green' });
   }
   else if (data1 == "") {
     this.colorTrack.splice(0, 0, { first: 'red' });
   }
   if (data2 == 3) {
     this.colorTrack.splice(1, 0, { second: 'grey' });
   }
   else if (data2 == 1) {
     this.colorTrack.splice(1, 0, { second: 'green' });
   }
   else if (data2 == "") {
     this.colorTrack.splice(1, 0, { second: 'red' });
   }
   if (data3 == 3) {
     this.colorTrack.splice(2, 0, { third: 'grey' });
   }
   else if (data3 == 1) {
     this.colorTrack.splice(2, 0, { third: 'green' });
   }
   else if (data3 == "") {
     this.colorTrack.splice(2, 0, { third: 'red' });
   }
   // console.log("status", this.colorTrack);
 }
 spinFlag() {
   this.SpinnerService.show();
 }
 //////////////////////////////////////////critical sound effect//////////////////////////////////



 playAudio() {
   var myAudio: any
   myAudio = document.getElementById("myAudio");
   if (this.soundFlag == false) {

     this.soundFlag = true;

   }
   else if (this.soundFlag == true) {
     this.soundFlag = false;
   }
   return myAudio.paused ? myAudio.play() : myAudio.pause();

   //   console.log("playAudio before",this.soundFlag)
   //   let audio = new Audio();
   //   if(this.soundFlag==true)
   //   {




   //   audio.src = "/assets/images/users/Vip Police Siren.mp3";
   //   audio.load();
   //   audio.play();
   //   console.log("playAudio",audio);
   //   }
   //   if(this.soundFlag==false)
   //   {

   //     this.soundFlag=true;

   //   }
   //  else if(this.soundFlag==true)
   //   {
   //     this.soundFlag=false;
   //   }
   console.log("playAudio after", this.soundFlag)
   // this.playAudio();
 }
 /////////////////////////////////////////////////////////play sound//////////////////////////////////
 autoSoundF() {
   var myAudio: any
   myAudio = document.getElementById("myAudio");
   // myAudio.loop=true;

   let audio = new Audio();





   // audio.src = "assets/images/users/Vip Police Siren.mp3";
   // audio.load();
   // audio.play();
   // audio.loop=true;
   if (myAudio.duration > 0 && !myAudio.paused) {


     myAudio.play();


   }
   // console.log("playAudio auto",myAudio.play());
   // return  myAudio.play();

 }
 ///////////////////////////////////siren function///////////////////////////////////////
 sirenF() {
   // this.sirenArray=[];
   var myAudio: any
   var l: any = [];

   for (var i = 0; i < this.defaultDashboard.length; i++) {
     if (this.defaultDashboard[i].FlagCritical == 1) {
       l = this.defaultDashboard[i].alerts
       // for(let j=0;j<l.length;j++)
       // {
       //   console.log("ok")
       //   if(l[j].alert_type=="CRITICAL")
       //   {
       //     this.sirenArray.push(this.defaultDashboard[i].alerts)
       //   }
       // }

       this.soundDisable = true;
       this.alertMessage = "critical Alert";
       $('#criticalMsg').modal('show');
       // console.log("yes")
       this.soundFlag = true;
       // this.playAudio();
       // this.autoSoundF()

       myAudio = document.getElementById("myAudio");
       // myAudio.loop=true;
       if (myAudio.duration > 0 || !myAudio.paused) {

         const promise = myAudio.play();
         if (promise !== undefined) { // On older browsers play() does not return anything, so the value would be undefined.
           promise
             .then(() => {
               // Audio is playing.
               myAudio.play();
               myAudio.loop = true;
             })
             .catch(error => {
               console.log(error);
             });
         }
         // myAudio.play();
         // myAudio.loop=true;

       }
     }
   }
   // console.log("siren", this.sirenArray)
 }
 /////////////////////////
 hideCriticlamsg() {
   this.allColorFlag = false;
   this.hpColorFlag = false;
   this.colorLabelFlag = true;

   this.colorLabel = 'rgb(114, 3, 3)'

   var table = $('#masterUpload').DataTable();

   let k = table.columns(32).search(1).draw();
   //  const cells = k.columns(1).nodes()
   // console.log("value", this.sirenArray)
   setTimeout(() => {
     $('#criticalMsg').modal('hide');
   }, 500);

   // console.log("yes criticalMsg")

   table.columns(27).search("").draw();
   table.columns(28).search("").draw();

 }
////////////////////////////////////////////////////////////////////////////////////////////
ClosehideCriticlamsg()
{
 // console.log("closehideCriticlamsg")
 $('#criticalMsg').modal('hide');
}
 lastalertNew(alert)
  {
   // console.log("lastalertNew", alert);
   // this.triggerTable();
   // this.tableAlert=alert;
   // var table = $('#triggerTableFull').DataTable();
   setTimeout(function () {
     var table = $('#triggerTableFull').DataTable();
     table.columns.adjust().draw();
 }, 300);
  
   $('#triggerModal').modal('show');

   var table = $('#triggerTableFull').DataTable();
   
   table.columns(4).search(alert).draw();
   // this.lastlaertFlag=false;
   // this.lastalertmsg=alert;
 }
 /////////////////////////////////////////////////////////////////////////////////
 closeLastAlert()
 {
   if(this.alertMoal==false)
     {
       this.triggerFullData();
       this.alertMoal=true;
     }
     this.lastlaertFlag=true;
   this.lastalertmsg=null;
 }
 ///////////////////////////////criticle toggler////////////////
 criticalToggle(event) {
   // console.log("criticalToggle", event.target.checked);
   if (event.target.checked == true) {
     this.SpinnerService.show();
     localStorage.setItem('critial', '1');
     this.dashboardData1();
     this.triggerFullData();
     this.threatDataF();
     // this.triggerHistoryTableF()
   }
   else if (event.target.checked == false) {
     this.SpinnerService.show();
     localStorage.setItem('critial', '0');
     this.triggerFullData();
     this.dashboardData1();
     this.threatDataF();
     //  this.triggerHistoryTableF()

   }
   // localStorage.setItem('critial', '0');
   // console.log("farji", localStorage.getItem('critial')!)
 }
 farji() {
   // console.log("farji", localStorage.getItem('critial')!)
 }
 /////////////////////////threattable filtor/////////////////////////////////////////////////////////////
 threatTablefilter(data) {
   var table = $('#threatTable').DataTable();
   setTimeout(function () {
     var table = $('#threatTable').DataTable();
     table.columns.adjust().draw();
 }, 300);
   $('#threatsModal').modal('show');
   table.columns(4).search(data).draw();
 }
 /////////////////////////////////////////////////////refresh data table/////////
 //     reloadDataTable()
 //     {
 //       var oTable = $('#masterUpload').DataTable( );
 //       // $.fn.dataTable.ext.errMode = 'throw';
 // // to reload
 //     //  oTable.ajax.reload(null, false);
 //      oTable.destroy();
 //      oTable.draw();
 //     }
viewmodal(){
  // $('#ViewModal').modal('show');
  // console.log(this.alert_keys)
  for(var i=0;i<=this.alert_keys.length;i++){
   
    this.pie_viewall_chart(this.alert_keys[i],this.alert_dashboard[this.alert_keys[i]])
  }
}
pie_viewall_chart1(id:any,x){
  let chartDom:any = document.getElementById(id);
      //  var echart = echarts.init(chartDom);
       var echart = echarts.init(chartDom, {
        renderer: 'canvas',
        useDirtyRect: false
      });
      var option:any;
    
      option = {
          title: {
              // text: 'Donut Chart',
              // subtext: 'Living Expenses in Shenzhen'
          },
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            containLabel: true // To ensure labels are still shown
        },
          legend: {
              orient: 'vertical',
              left:370 ,
              top:120,
              // bottom:'1',
              // fontsize:10,
              fontSize: '10',
              // data: [ 'Enroute Stoppage','Forced closed','Red flag' ,'Route Deviation' ,'Un-Authorized']
          },
          series: [
              {
                  name: 'Shipment',
                  type: 'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  color:['#E77817','#1D4380', '#00C0F3','#F4858E','#917BB'],
                  label: {
                      show: false,
                      // position: 'center'
                      position: 'inside',
                      fontSize: '15',
                          // rotate:'145',
                          color:'white',
                      formatter: '{c}' // display value
                  },
                  emphasis: {
                      label: {
                          show: true,
                          fontSize: '15',
                          color:'white',
                          // rotate:'145',
                          fontWeight: 'bold'
                      }
                  },
                  labelLine: {
                      show: false
                  },
                  data: [
                     
                      { value:x.min_30, name: '< 30' },
                      { value:x.hr_1, name: '< 1 Hours' },
                      { value: x.hr_2, name: '< 2 Hours' },
                      { value: x.hr_3, name: '< 4 Hours' },
                      { value: x.hr_4, name: '> 4 Hours' },
                      // { value: x.hr_, name: 'Red flag' },
                  ],
                  backgroundStyle: {
                    color: '#f0f0f0' // Change this color as needed
                }
              },
              {
                type: 'pie',
                radius: ['0%', '40%'],
                silent: true,
                color:'white',
               
                label: {
                    show: true,
                    position: 'center',
                    color:'#1D4380',
                   
                    formatter: function(params) {
                        var total = 0;
                        for (var i = 0; i < option.series[0].data.length; i++) {
                            total += option.series[0].data[i].value;
                        }
                        return  total;
                    },
                    fontSize: 25,
                    fontWeight: 'bold'
                },
                data: [
                    {value: 1, name: 'Total'}
                ]
            }
      
          ],
          // backgroundColor: '#fff'
      };
    
      option && echart.setOption(option);
    
}
 pie_viewall_chart(id, x) {
  let chartDom:any = document.getElementById(id);
  var echart = echarts.init(chartDom, {
    renderer: 'canvas',
    useDirtyRect: false,
  });

  var option :any= {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      containLabel: true, // To ensure labels are still shown
    },
    legend: {
      orient: 'vertical',
      left: 370,
      top: 120,
      fontSize: '10',
    },
    series: [
      {
        name: id,
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        color: ['#E77817', '#00C0F3',  '#1D4380','#F4858E', '#917BBB'], // Fixed hex color format
        label: {
          show: false,
          position: 'inside',
          fontSize: '15',
          color: 'white',
          formatter: '{c}', // display value
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15',
            color: 'white',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: x.min_30, name: '< 30' },
          { value: x.hr_1, name: '< 1 Hours' },
          { value: x.hr_2, name: '< 2 Hours' },
          { value: x.hr_3, name: '< 4 Hours' },
          { value: x.hr_4, name: '> 4 Hours' },
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
            return total;
          },
          fontSize: 25,
          fontWeight: 'bold',
        },
        data: [{ value: 1, name: 'Total' }],
      },
    ],
  };
  // echart.on('click', (params) => {
  
  //   const clickedData = params.data;
  //   let tepm_table:any=[];
  //   console.log(params)
  //   // alert(0)
  //   if(params?.data?.name == '< 30'){
  //   this.filterAlerts(params.seriesName,30,0)}
  // });
  echart.on('click', (params) => {
   
    // Type guard to check if 'params.data' has a 'name' property
    if (typeof params.data === 'object' && 'name' in params.data) {
      const clickedData = params.data as { name: string; value: any };
  
      if (clickedData.name === '< 30') {
            this.filterAlerts(params.seriesName,'<30min')
      } else if(clickedData.name === '< 1 Hours') {
        this.filterAlerts(params.seriesName,'<1hr')
      } else if(clickedData.name === '< 2 Hours') {
        this.filterAlerts(params.seriesName,'<2hr')
      } else if(clickedData.name === '< 4 Hours') {
        this.filterAlerts(params.seriesName,'<4hr')
      } else if(clickedData.name === '> 4 Hours') {
        // this.filterAlerts(params.seriesName,Infinity,240)
        this.filterAlerts(params.seriesName,'>4hr');
      }
    } else {
      console.log('Clicked data does not have a name property:', params.data);
    }
  });
  
  option && echart.setOption(option);
}

filterAlerts(alertTypeToFilter, time_duration) {
  console.log(this.main_array)
  this.new_array = [];
  const currentTime = new Date();

  this.new_array = this.main_array.map(item => {
      const filteredAlerts = item.alerts.filter(alert => {
          const alertStartTime = new Date(alert.sts);
          const timeDifference = (currentTime.getTime() - alertStartTime.getTime()) / (1000 * 60); // Convert ms to minutes

          // If checking for ">4hr_UNSH", use the condition accordingly
        
              return ( item.UnattenedFlag?.[time_duration+'_'+alertTypeToFilter] === 1   // Check the flag
                  // !alert.escalate_grace_taken_time
              );
          

          // Normal filtering logic for other conditions
        
      });

      // Return a new object with filtered alerts
      return { ...item, alerts: filteredAlerts };
  }).filter(item => item.alerts.length > 0); // Keep only items with alerts

  console.log(this.new_array);
  this.masterUploadTable();
}

getIconUrlByTitle(title) {
  // Find the object with the matching title
  const item = this.filterData.find(item => item.title === title);
  
  // Return the icon URL if found, otherwise return null
  return item ? item.icon : 'assets/IRUN_CV_IMG/DFG.svg';
}
liveLocation_new(lat, long, driver_mobile, driver_name, halt_time, transporter_name, imei, name, run_date, source_code, destination_code, deviceTime, lastspeed, loc_name, shipment_no,item)
{


  this.initializeMap()


// console.log("imei", imei)
 this.multilocationArray=[];
 this.multilocationArray=item
//  console.log("Live",imei);
//  $('#mapModal').modal('show');
 var node
 // this.initMap();
 if(this.markerLocation[0]!=null)
 {
   this.markerLocation[0].setMap(null)
 }
 
 this.map.setCenter(new google.maps.LatLng(lat, long));
 var Door: string = '';
 var latlong: any = [];
 var locationData
 var formdata = new FormData();
 formdata.append('AccessToken', this.token)
 formdata.append('ImeiNo', imei);
 formdata.append('portal', 'itraceit');
 if(imei == '')
  {
    alert("Fixed Imei not found")
  }
  else
  {

  

  
 this.itraceIt.liveLocation2S(formdata).subscribe((data: any) => {

  //  console.log("imei2", data)
   locationData = data.Data[0];
   if (locationData.LatLong == "," || locationData.LatLong == "") {
     alert("Data not found")
   }
   else {


     latlong = locationData.LatLong.split(',');
     // console.log("new location", latlong[0])
     if (locationData.IO.Door_Status == 0) {
       Door = 'Open';
     }
     else if (locationData.IO.Door_Status == 1) {
       Door = 'Close';
     }
     //////////////////////////////////////////////////////////////////////////////////
     this.latlngbounds = new google.maps.LatLngBounds();
     // console.log("live location", lat, long)
     this.latlngbounds.extend(new google.maps.LatLng(parseFloat(latlong[0]), parseFloat(latlong[1])));
     node = new google.maps.LatLng(
       latlong[0], latlong[1])

     this.markers =
     {
       mark: new google.maps.Marker({
         map: this.map,

         position: new google.maps.LatLng(
           latlong[0], latlong[1]


         ),
         title: latlong[0] + "," + latlong[1],
         // label: {
         //   text: this.Label,
         //   color: 'black',
         //   fontSize: "20px",
         //   fontWeight: "1000px",
         //   fontFamily: 'Tangerine',
         //   // "http://maps.google.com/mapfiles/ms/icons/red-dot.png"

         // },
         // scaleControl:true

         icon: "assets/images/users/trucknewchhotaNew.png"



       })


     };
     this.markerLocation.push(this.markers.mark)
     // console.log("mark", this.markerLocation)
     this.map.fitBounds(this.latlngbounds);
     var listener = google.maps.event.addListener(this.map, "idle", () => {
       if (this.map.getZoom() > 14) this.map.setZoom(14);
       google.maps.event.removeListener(listener);
     });
     //////////////////////////////////////////////////////////////////////////////////
     var contentsInfo: string = ''
     google.maps.event.addListener(this.markers.mark, 'click', (event) => {

       // console.log("eventy", event)
       contentsInfo =
         // '<div id="content" >' +
         // '<div id="siteNotice">' +
         '<table class="border border-primary">' +
         '<tbody>' +

         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Vehicle No</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + name + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Name</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_name + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Driver Mobile</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + driver_mobile + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Imei No</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + imei + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Speed</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + lastspeed + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Date Time</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + deviceTime + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Device type</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + item.imei_type + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="width:100px ;font-size: 11px;font-weight: 900;font-family:Roboto;">Address</th>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + loc_name + '</th>' +

         ' </tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Source code</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + source_code + '</td>' +
         '</tr>' +

         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;"> Dispatch Date</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + run_date + '</td>' +
         '</tr>' +
         // '</tr>'+
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Destination code</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + destination_code + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Transporter</td>' +
         '<td style="width:1%;color: blue;">:</td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + transporter_name + '</td>' +
         '</tr>' +
         '<tr >' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Trip id</td>' +
         '<td style="width:1%;color: blue;">: </td>' +
         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500" >' + shipment_no + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Last Halt Time</td>' +
         '<td style="width:1%;color: blue;">: </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + halt_time + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Lat Long</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.LatLong + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Battery</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.Battery + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Voltage</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.BatteryVoltage + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DayMaxSpeed</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DayMaxSpeed + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DayMaxSpeedTime</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DayMaxSpeedTime + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">Door Status</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + Door + '</td>' +
         '</tr>' +
         '<tr>' +
         '<td style="font-size: 11px;font-weight: 900;font-family:Roboto;">DeviceDateTime</td>' +
         '<td style="width:1%;color: blue;"> </td>' +

         '<td style=" color: blue; white-space: nowrap;font-size: 11px;font-weight:500">' + locationData.DeviceDateTime + '</td>' +
         '</tr>' +
         // '</span>'+Temperature_string
         //   '<tr>'+
         '</tbody>' +
         '</table>'
       //       '</div>'+ 
       //       '<div class="" style="border-top:1px solid #dee2e6;justify-content: flex-end;padding: 2px;    border-bottom-right-radius: calc(0.3rem - 1px);border-bottom-left-radius: calc(0.3rem - 1px);display: flex;">'+
       //       '<button type="button" class="btn btn-outline-secondary " id="infowindow_submit'+  +'" name="submit" value ="submit" style="margin-left: 5px;padding:0px !important; margin-top: 5px;">'+
       //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Landmark</span>'+'</button>'+
       //       '<button type="button" class="btn btn-outline-secondary "   style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_geofence'+  +'" name="submit" value ="submit">'+
       //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Geofence</span>'+'</button>'+
       //       '<button type="button" class="btn btn-outline-secondary " style="margin-left: 5px;padding:0px !important; margin-top: 5px;"id="infowindow_polyline'+  +'" name="submit" value ="submit">'+
       //       '<span style="font-size: 10px;padding: 7px;font-weight: bold;">Add Polyline</span>'+'</button>'+
       //      
       // '</div>'
       //  '</div>';



       this.closeLastOpenedInfoWindow();
       infowindowMarker.setContent(contentsInfo);

       infowindowMarker.setPosition(event.latLng);
       infowindowMarker
       infowindowMarker.open(this.map, node);
       //this.lastOpenedInfoWindow=0; 
       this.lastOpenedInfoWindow = infowindowMarker;



     })

     var infowindowMarker = new google.maps.InfoWindow({
       content: contentsInfo,
       pixelOffset: new google.maps.Size(0, -20)

     });
   }
 })
}
 ////////////////////////////////////////////////////


}
// initializeMap(): Promise<void> {
//   return new Promise<void>((resolve, reject) => {
//     // Ensure that the DOM is fully loaded before initializing the map
//     $('#v_track_Modal').on('shown.bs.modal', () => {
//       if (!this.map1) {
//         try {
//           const platform = new H.service.Platform({
//             apikey: 'MoBysY-1fH4koFS2rGUDpwvRHSLfdX4GWYsRJUlB8VY'
//           });

//           const defaultLayers = platform.createDefaultLayers();

//           // Initialize the map
//           this.map1 = new H.Map(
//             document.getElementById('map1'), // Ensure map1 div exists in the DOM
//             defaultLayers.vector.normal.map,
//             { 
//               center: { lat: 20.5937, lng: 78.9629 }, // India lat/lng as the center
//               zoom: 10,
//               pixelRatio: window.devicePixelRatio || 1
//             }
//           );

//           // Add events and UI controls
//           const mapEvents = new H.mapevents.MapEvents(this.map1);
//           new H.mapevents.Behavior(mapEvents);
//           this.ui = H.ui.UI.createDefault(this.map1, defaultLayers);

//           // Force the map to resize properly on window resize
//           const resizeMap = () => {
//             if (this.map1) {
//               this.map1.getViewPort().resize();
//             }
//           };

//           // Trigger initial resize to ensure correct rendering
//           resizeMap();

//           // Attach resize event listener to handle window resizing
//           window.addEventListener('resize', resizeMap);

//           // Resolve the Promise when map initialization is complete
//           resolve();
//         } catch (error) {
//           // Reject the Promise in case of errors
//           reject(error);
//         }
//       } else {
//         // If the map is already initialized, just resolve
//         resolve();
//       }
//     });

//     // Show the modal (this might not be necessary to be in the Promise)
//     $('#v_track_Modal').modal('show');
//   });
// }

}


// $(document).ready(function () {
//   let modal: any = $('.modal'); // Select the entire modal
//   modal.draggable({
//     handle: '.modal-header, .modal-footer', // Allow dragging from both header and footer
//     revert: false,
//     backdrop: false,
//     show: true
//   });
// });



/////////////////////////////////////////////for uncheck all checkbox//////////////////////
$(document).ready(function () {
  $('#btnUncheckAll').click(function () {
    $('input[type=checkbox]').each(
      function (index, checkbox) {
        if (index != 0) {
          checkbox.checked = false;

        }
      });
  });
});






function buttonFunction() {
  throw new Error('Function not implemented.');
}

function findKey(data: any, arg1: string) {
  throw new Error('Function not implemented.');
}

