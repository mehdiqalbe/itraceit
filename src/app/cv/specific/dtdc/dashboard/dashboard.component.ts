import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { NgxSpinnerService } from 'ngx-spinner';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NavService } from 'src/app/shared/services/nav.service';
import { DtdcService } from '../services/dtdc.service';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';

declare const agGrid: any;
declare const pdfMake: any;
declare var $: any
declare var H:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  columnDefs: any[] = [];
  rowData: any[] = [];
  gridOptions: any = {};
  gridApi: any;
  columnApi: any;
  Object=Object;
  map: any;
  token: any
  GroupTypeId: any;
  group_id: any;
  account_id: any
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
  linkValue:any='';
  platform:any
  ui:any
  defaultLayers: any;
  trackingData:any;

  chartObject:any[]=[{
    id:'consSt',
    name:'Trip',
    data:[{name:'Completed Trip',value:this.dashboardHeader?.TripCompleted},
      { value: this.dashboardHeader?.TripSchedule,name: 'Scheduled Trip'}],
    colors:['rgb(239, 91, 11)', '#1D4380', 'red', 'grey']
  }]
  demomarker: any=[];
  demoPolyline: any=[];
  map1: any;
  customer_info: any=[];
  marker: any[]=[];
  poly_line: any[]=[];
  map_flag: any;
  contentsInfo: string | Node | undefined;
  lastOpenedInfoWindow: any;

  constructor(private datepipe: DatePipe,private navServices: NavService,private dtdcServices:DtdcService,private service:CrudService,private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    
    // this.platform = new H.service.Platform({
    //   apikey: 'vQTBCs4xOBkG-mSZlCymIb0G-Jj2TF2pO_p7e9Lc90o'
    // });
    this.initMap1()
    this.initApiCalls()
    // this.initializeColumnDefs()
  }
  // ngAfterViewInit(): void {
  //   const gridElement = document.querySelector('#myGrid') as HTMLElement;
  //   if (gridElement) {
  //     new agGrid.Grid(gridElement, this.gridOptions);
  //   }
  // }
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
      this.dtdcServices.specificTripDashboardFilter(formdataCustomer).subscribe((res: any) => {
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
            if(data?.DefualtFilter)
            {
              this.selectedRoutes=data?.DefualtFilter.split(",")
            }
           
            {
              this.selectedRoutes=data?.DefualtFilter.split(",")
            }
           
           console.log(this.selectedRoutes);
           
          
          
         
          formdataCustomer.append("RouteType",data?.DefualtFilter)
          this.dtdcServices.specificTripDashboard(formdataCustomer).subscribe((res: any) => {
       
            // this.tripArray=res?.MainDashboard
            
            console.log("specificDashboard", res);
            // console.log(this.SpinnerService);
            
            // this.masterUploadTable()
            if(res.Status=='success')
            {
           
             this.tripArray=res?.MainDashboard
             this.dashboardHeader=res?.Header
             this.tripArray=Object.values(this.tripArray)
             console.log("dashboardHeader",Object.values(this.tripArray));
             this.tripArray=Object.values(this.tripArray)
             console.log("dashboardHeader",Object.values(this.tripArray));
             
             this.masterUploadTable()
            // this.loadData()
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
        else if(res?.Status=='fail')
        {
          alert(res?.Message)
          this.SpinnerService.hide('tableSpinner')
          this.initChart()
        }
        else{
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
            name: 'ETA<2Hrs',
          },
          {
            value: this.dashboardHeader?.ETA_2HrsMore,
            name: 'ETA>2Hrs',
          },],
        colors:['#f4858e', '#00c0f3', '#34C759', 'grey']
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
          { value: this.dashboardHeader?.Stop_2HrsLess, name: 'Stop<2Hrs',
          },
          { value: this.dashboardHeader?.Stop_2Hrs, name: 'Stop>2Hrs',
          },
        ],
        colors:['#e77817', '#00c0f3', '#f4858e', 'grey']
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
          name: 'NonGPS',
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
          name: 'Close',
        },
        {
          value: this.dashboardHeader?.PortableLockOpen,
          name: 'Open',
        },
        ],
        colors:['#97291e', '#E77817', '#d0cebb', '00c0f3']
      },
      ]
  
  
      this.chartObject.forEach(({id,name,data,colors}) => {
        // console.log(id,name,data,colors);
        
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
      formData.append("RouteCategory",val?.routeCategory)
      console.log(formData);
      
      this.SpinnerService.show('tableSpinner')
      this.dtdcServices.specificTripDashboard(formData).subscribe((res: any) => {
        
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
    onRouteCategoryChange(val) {
      // Clear selected route types
      this.selectedRoutes = [];
    
      if (val) {
        console.log(val);
        this.filterObject.routeType = {
          "": "All", // Add "All" field
          ...this.filterObject.rawRouteType[val],
        };
      } else {
        // Merge all values from rawRouteType into a single object and add "All" field
        this.filterObject.routeType = {
          "": "All", // Add "All" field
          ...Object.assign({}, ...Object.values(this.filterObject.rawRouteType)),
        };
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
    clearFilter(table){
      table.search("").draw()
      table.columns(40).search("").draw();
      table.columns(3).search("").draw();
      table.columns(4).search("").draw();
      table.columns(5).search("").draw();
      table.columns(6).search("").draw();
      table.columns(7).search("").draw();
      table.columns(8).search("").draw();
      table.columns(9).search("").draw();
    }
    filterTableByChart(column,value){
      console.log(value);
      
      let table = $('#masterUpload').DataTable();
       this.clearFilter(table)

      if(column=='Trip')
        table.columns(40).search(value).draw();
      else if(column=='GPS')
        table.column(6).search(value).draw();
      else if(column=='Stoppage')
        table.column(7).search(value).draw();
      else if(column=='Delay')
        table.column(8).search(value).draw();
      else if(column=='ETA')
        table.column(9).search(value).draw();
    }
    filterTable(value){
      let table = $('#masterUpload').DataTable();
      
    this.clearFilter(table)
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
        this.dtdcServices.specificTripDashboardDetails(formData).subscribe((res: any) => {
          
          // this.tripArray=res?.MainDashboard
          
          console.log("working",res);
          this.SpinnerService.hide('alertSpinner')
          this.tripSingle.details=res?.TripDetails
          console.log("details",this.tripSingle);
          // this.tripHeader()
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
      this.dtdcServices.specificTDLink(formData).subscribe((res: any) => {
       
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
      // console.log("Qalbe",table);
      
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
              filename: 'Dashboard Report',
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
              title: 'Dashboard Report',
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
              title: 'Dashboard Report',
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
              title: 'Dashboard Report',
            },
          ],
        });
      });
  
      // setTimeout(() => {
      //   this.SpinnerService.hide();
      // }, 3000);
    }



    // tripHeader() {
    //   var tbl = $('#tripHeaderTable');
    //   var table = $('#tripHeaderTable').DataTable()
    //   console.log("Qalbe",table);
      
    //   // table.clear();
    //   // table.destroy();
    //   // table.draw()
    //   // $('#masterUpload').DataTable().clear;
    //   // if(datatable.length!=)
  
    //   //  $('#masterUpload tbody').empty();
  
    //   $(document).ready(function () {
    //     $('#tripHeaderTable').DataTable({
    //       language: {
    //         search: '',
    //         searchPlaceholder: 'Search',
    //       },
    //       pageLength: 10,
    //       fixedHeader: true,
    //       // scrollX: true,
          
    //       ordering: true,
    //       scrollY: '450px',
    //       scrollCollapse: true,
    //       paging: false,
    //       scrollX: true,
    //       destroy: true,
    //       responsive: true,
    //       // dom: '<f>t',
    //       //  dom: 'Bfrtip',
  
    //       //   fixedColumns:   {
    //       //     leftColumns: 11,
    //       //     select: true,
  
    //       //     // rightColumns: 5
    //       // },
  
    //       order: [],
    //       dom: '<"html5buttons"B>lTfgitp',
    //       columnDefs: [{ targets: 'no-sort', orderable: false }],
  
    //       buttons: [
    //         {
    //           extend: 'csv',
    //           footer: true,
    //           autoClose: 'true',
    //           titleAttr: 'Download csv file',
  
    //           className: 'datatablecsv-btn fa fa-file-text-o ',
    //           text: '',
    //           tag: 'span',
    //           charset: 'utf-8',
    //           extension: '.csv',
  
    //           // fieldSeparator: ';',
    //           // fieldBoundary: '',
    //           filename: 'export',
    //           bom: true,
    //           columns: ':visible',
  
    //           exportOptions: {
    //             columns: ':visible',
    //           },
    //           title: 'report',
    //         },
    //         {
    //           extend: 'pdf',
    //           footer: true,
    //           orientation: 'landscape',
    //           pageSize: 'LEGAL',
  
    //           autoClose: 'true',
  
    //           titleAttr: 'Download Pdf file',
    //           tag: 'span',
    //           charset: 'utf-8',
    //           // extension: '.pdf',
    //           columns: ':visible',
    //           // fieldSeparator: ';',
    //           // fieldBoundary: '',
    //           // filename: 'export',
    //           bom: true,
  
    //           className: 'datatablepdf-btn fa fa-file-pdf-o ',
    //           text: '',
    //           customize: function (doc) {
    //             //   pdfMake.fonts = {
    //             //     Roboto: {
    //             //         normal: 'Roboto-Regular.ttf',
    //             //         bold: 'Roboto-Medium.ttf',
    //             //         italics: 'Roboto-Italic.ttf',
    //             //         bolditalics: 'Roboto-MediumItalic.ttf'
    //             //     },
    //             //     nikosh: {
    //             //         normal: "NikoshBAN.ttf",
    //             //         bold: "NikoshBAN.ttf",
    //             //         italics: "NikoshBAN.ttf",
    //             //         bolditalics: "NikoshBAN.ttf"
    //             //     }
    //             // };
    //             var colCount = new Array();
    //             $(tbl)
    //               .find('tbody tr:first-child td')
    //               .each(() => {
    //                 if ($(this).attr('colspan')) {
    //                   for (var i = 1; i <= $(this).attr('colspan'); i++) {
    //                     colCount.push('*');
    //                   }
    //                 } else {
    //                   colCount.push('*');
    //                 }
    //               });
    //             // doc.defaultStyle.font = "arial";
    //             doc.content[1].table.widths = colCount;
    //             // doc.defaultStyle.fontSize = 'Arial';
    //             // processDoc(doc);
  
    //             // doc.defaultStyle= {alef:'alef' } ;
    //           },
  
    //           exportOptions: {
    //             columns: ':visible',
    //             //  columns: [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 ]
    //           },
    //           title: 'report',
    //         },
    //         {
    //           extend: 'copy',
    //           footer: true,
    //           titleAttr: ' Copy  file',
  
    //           tag: 'span',
  
    //           className: 'datatablecopy-btn fa fa-copy ',
    //           text: '',
    //           orientation: 'landscape',
    //           pageSize: 'LEGAL',
    //           exportOptions: {
    //             columns: ':visible',
    //           },
    //           title: 'Dashboard Report',
    //         },
    //         {
    //           extend: 'excel',
    //           footer: true,
    //           autoClose: 'true',
    //           //text: '',
    //           //className: 'fa fa-file-pdf-o',
    //           //color:'#ff0000',
  
    //           buttons: ['excel'],
    //           titleAttr: ' Download excel file',
  
    //           tag: 'span',
  
    //           className: 'datatableexcel-btn fa fa-file-excel-o',
    //           text: '',
    //           exportOptions: {
    //             columns: ':visible',
    //           },
    //           title: 'Dashboard Report',
    //         },
    //       ],
    //     });
    //   });
  
    //   // setTimeout(() => {
    //   //   this.SpinnerService.hide();
    //   // }, 3000);
    // }
    tripDetail() {
      var tbl = $('#tripDetailTable');
      var table = $('#tripDetailTable').DataTable();
      console.log("M",table);
      
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
              title: 'Trip Detail Report',
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
              title: 'Trip Details Report',
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
              title: 'Trip Details Report',
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
          appendToBody: true, 
        },
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b}: {c} ({d}%)',
        //   position: function (point, params, dom, rect, size) {
        //     // point: [x, y] of the mouse position
        //     // size: {contentSize: [width, height], viewSize: [width, height]}
        //     console.log(point,params,dom,rect,size);
            
        //     let [x, y] = point;
        //     let {contentSize, viewSize} = size;
        //     let tooltipWidth = contentSize[0];
        //     let tooltipHeight = contentSize[1];
        
        //     // Prevent the tooltip from overflowing
        //     if (x + tooltipWidth > viewSize[0]) x -= tooltipWidth;
        //     if (y + tooltipHeight > viewSize[1]) y -= tooltipHeight;
        
        //     return [x, y];
        //   },
        // },
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
  
      // console.log(innerDiv);
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
  
    openMapModal(item,imei) {
    
       // Open modal using jQuery
      // this.SpinnerService.show('mapSpinner')
      // Call the tracking function
      // this.vehicleTrackF(item,imei);
      this.vehicleTrackF_new(item?.ImeiNo1,item?.ImeiNo2,item?.ImeiNo3,item?.RunDate,item?.VehicleNo,item,item?.MTripId,"")
    }
    // vehicleTrackF(item,imei) {
    //   // this.loading = true; // Set loading to true when API call starts
  
    //   const currentDateTime = new Date().toLocaleString('en-US', {
    //     month: '2-digit',
    //     day: '2-digit',
    //     year: 'numeric',
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     hour12: false // To use 24-hour format
    //   }).replace(',', '');
  
    //   const formData=new FormData()
    //   formData.append('AccessToken', this.token)
    //   formData.append('startdate', item?.RunDate);
    //   formData.append('enddate', currentDateTime);
    //   formData.append('time_interval', '60');
    //   if(imei)
    //     formData.append('imei', imei);
    //     else
    //   formData.append('imei', item?.ImeiNo1||item?.ImeiNo2||item?.ImeiNo3);
    //   formData.append('group_id', this.group_id);
    //   formData.append('AccountId', this.account_id);
    //   this.service.vehicleTrackongS(formData).subscribe((res: any) => {
    //     console.log("Response:", res);
       
        
    //     if (res.Status === 'success' && Array.isArray(res.data) && res.data.length > 0) {
    //       // Extract coordinates from the data array
    //       const coordinates = res.data.map(location => ({
    //         lat: location.lat, // Use the correct key for latitude
    //         lng: location.long  // Use the correct key for longitude
    //       }));
    //       this.trackingData=res?.data
    //          console.log(coordinates);
             
    //       // Initialize the map with the coordinates
    //       this.initializeMap(item,coordinates);
    //     } else {
    //       console.log('No valid locations found in the response.');
    //     }
    //   }, error => {
       
    //     console.error('Error fetching vehicle tracking data:', error);
    //   });
    // }

    async vehicleTrackF_new(imei, imei2, imei3, run_date, vehicle_no, item, Id, route_id) {
      this.initMap1()
      // this.SpinnerService.show("tracking");
  
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
        return
      }else{
      // Clear markers and polylines before starting
      $('#mapModal').modal('show');
      // this.clearMarkersAndPolylines();
  
      // Initialize map
      // try {
      //   // await this.initializeMap();
      // } catch (error) {
      //   console.error('Error initializing map:', error);
      //   this.SpinnerService.hide('spinner-1');
      // }
  
      // Show tracking spinner
      // this.SpinnerService.show("mapSpinner");
  
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
            // console.log("formdata...", key, value);
          });
  
          // try {
            // Wait for the API response
            const res: any = await this.service.vehicleTrackongS(formData).toPromise();
            console.log("tracking res", res);
            this.SpinnerService.hide("mapSpinner");
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
              // Fetch DFG polyline data
              // this.fetchDFGPolyline_new(route_id);
          // this.fetchCustomerInfo(Id);
              // Fetch customer info
              // this.fetchCustomerInfo_new(Id);
  
              // Handle alert markers
              // this.handleAlertMarkers(item);
              this.fetchCustomerInfo(item?.Customer);
            }
  
          // } catch (error) {
          //   console.error("Error in API call:", error);
          //   alert("An error occurred while fetching tracking data");
          // }
  
          // Hide the tracking spinner after the API call
          // this.SpinnerService.hide("mapSpinner");
        }
      }
  }  }
  
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
  fetchCustomerInfo(customer) {
    // this.customer_info=[]
    this.customer_info = customer||[]
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
    // const formdataCustomer = new FormData();
    // formdataCustomer.append('AccessToken', this.token);
    // formdataCustomer.append('forGroup', this.group_id);
    // formdataCustomer.append('id', Id);
  
    // this.service.tripCustomerS(formdataCustomer).subscribe((res: any) => {
      // console.log(res)
      // if(res.status=='success'){
        if(this.customer_info.length){
      
  
      // Log the customer data for debugging
      console.log("Customer Info:", this.customer_info);
      //  if(this.customer_info!==null){
      this.customer_info.forEach((customer, index) => {
        // Log SequenceNo to check its value
        // console.log("Customer SequenceNo:", customer?.location_label,index);
        if (customer?.location_geocoord&&customer?.location_label!=="M0") {
                              const [lat, lng] =customer?.location_geocoord.split(',').map(Number);
                              const coord = { lat, lng };
        const sequenceNo = customer.location_label ? customer.location_label.toString() : ''; // Ensure this is a string
        // const sequenceNo = customer.SequenceNo  // Ensure this is a string

        let mark = new google.maps.Marker({
          map: this.map1,
          position: new google.maps.LatLng(coord.lat, coord.lng),
          title: `${coord.lat}, ${coord.lng}`,
          label: {
            text: sequenceNo,  // Ensure this is a string
            color: 'black'
          }
        });
  
        this.demomarker.push(mark);
        markers.push(mark);
        google.maps.event.addListener(mark, 'click', (event) => this.handleCustomerMarkerClick(event, index));
      }
      }
    );
    }
  // }
      // this.demomarker=markers;
    // });
  }

  getMarkerIcon(index: number): string {
    // console.log(index)
    if (index === 0) {
      return 'assets/images/users/start_marker.png';
    }
    else if (index + 1 === this.trackingData.length) {

      setTimeout(() => {
        this.SpinnerService.hide("mapSpinner");
      }, 5000);
      return 'assets/images/users/stop_marker.png';
    } else {
      return 'assets/images/users/green_Marker1.png';
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
  
    this.service.addressS(formdataCustomer).subscribe((res: any) => {
      console.log(res)
      const address = res.Data.Address;
      this.showWindow(trackingData, vehicle_no, address);
      this.closeLastOpenedInfoWindow();
      const infowindowMarker = new google.maps.InfoWindow({ content: this.contentsInfo });
      infowindowMarker.setPosition(event.latLng);
      infowindowMarker.open(this.map1);
    });
  }
  closeLastOpenedInfoWindow() {
    if (this.lastOpenedInfoWindow) {
      this.lastOpenedInfoWindow.close();
    }
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
  handleCustomerMarkerClick(event, index) {
      
    const customer = this.customer_info[index];
    console.log(this.customer_info);
    
    const customer_Info = this.generateCustomerInfo(customer);
  // return customer_Info;
    this.closeLastOpenedInfoWindow();
    const infowindowMarker_custo = new google.maps.InfoWindow({ content: customer_Info });
    infowindowMarker_custo.setPosition(event.latLng);
    infowindowMarker_custo.open(this.map1);
    this.lastOpenedInfoWindow = infowindowMarker_custo;
  }
  
  generateCustomerInfo(customer): string {
    let pod = customer?.PodStatus === 1 ? 'DONE' : '-';
    let type = customer?.LocationSequence === 0 ? 'ORIGIN' : customer?.LocationSequence === 1 ? 'INTERMEDIATE STATION' : 'DESTINATION';
    let arrival_time = customer?.GeoArrivalTime ? `${customer?.GeoArrivalTime} [GPS]` : customer?.ArrivalTime;
    let departure_time = customer?.GeoDepartureTime ? `${customer?.GeoDepartureTime} [GPS]` : customer?.DepartureTime;
    
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
  initMap1() 
 {
   const center = { lat: 23.2599, lng: 77.4126 };
   this.map1 = new google.maps.Map(document.getElementById('map1') as HTMLElement, {
     zoom: 4,
      center: center,
     mapTypeId: google.maps.MapTypeId.ROADMAP,
     scaleControl: true,
   }
   );   
 }
  
  //   initializeMap(item, coordinates: { lat: number, lng: number }[]) {
  //     if (!this.map) {
  //         // Initialize HERE map platform and default layers
  //         this.defaultLayers = this.platform.createDefaultLayers();
  
  //         // Create the map
  //         this.map = new H.Map(
  //             this.mapContainer.nativeElement,
  //             this.defaultLayers.vector.normal.map,
  //             {
  //                 center: coordinates.length > 0 ? coordinates[0] : { lat: 50, lng: 5 },
  //                 zoom: 5,
  //                 pixelRatio: window.devicePixelRatio || 1,
  //             }
  //         );
  
  //         // Make the map interactive
  //         const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
  //         this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
  //     }
  
  //     // Clear existing objects from the map
  //     this.map.removeObjects(this.map.getObjects());
  
  //     if (coordinates.length > 0) {
  //         // Icons for different marker types
  //         const sourceIcon = new H.map.Icon('assets/images/users/start_marker.png');
  //         const destinationIcon = new H.map.Icon('assets/images/users/stop_marker.png');
  //         const intermediateIcon = new H.map.Icon('assets/images/users/green_Marker1.png');
  
  //         let bounds = new H.geo.Rect(coordinates[0].lat, coordinates[0].lng, coordinates[0].lat, coordinates[0].lng);
  
  //         // Add customer markers (DOM-based)
  //         const customer = item?.Customer;
  //         if (customer) {
  //           console.log("customer",customer.length,customer);
            
  //             customer.forEach(({ location_geocoord,location_label },index) => {
  //                 if (location_geocoord) {
  //                     const [lat, lng] = location_geocoord.split(',').map(Number);
  //                     const coord = { lat, lng };
  //                     this.addCustomerDomMarker(coord,location_label); // Use the DOM marker function for customers
  //                     bounds = bounds.mergePoint(coord);
  //                 }
  //             });
  //         }
  
  //         // Add regular markers for source, destination, and intermediate points
  //         coordinates.forEach((coord, index) => {
  //             const icon = index === 0 ? sourceIcon : (index === coordinates.length - 1 ? destinationIcon : intermediateIcon);
  //             const marker = this.addMarker(coord, icon); // Regular marker function
  //             this.addInfoBubble(marker, coord, this.trackingData[index]);
  //             bounds = bounds.mergePoint(coord);
  //         });
  
  //         // Draw a polyline for the route
  //         this.addPolyline(coordinates);
  
  //         // Adjust the map view to fit all markers
  //         this.map.getViewModel().setLookAtData({ bounds });
  //     }
  //     this.SpinnerService.hide('mapSpinner');
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
  // Function to create and add a customer DOM marker with a sequence number
  addCustomerDomMarker(coord: { lat: number, lng: number }, sequenceNo) {
  console.log(sequenceNo);
  
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
  
  elockFunctionDisplay(FixedLockOpen,PortableLockOpen):any{
    //  console.log("elock",FixedLockOpen);
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
   
  onRefreshFilter(filterForm: any) {
    filterForm.reset(); // Reset the form to its default state
    this.selectedRoutes = []; // Clear selected values for multiselects
    console.log('Filters refreshed');
    this.initApiCalls()
  }

  downloadExcel() {
    // Create a worksheet from the tracking data
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.trackingData);

    // Create a workbook and add the worksheet
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Tracking Data': worksheet },
      SheetNames: ['Tracking Data']
    };

    // Write the workbook to a file
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Save the file using file-saver
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'TrackingData.xlsx');
  }
  getExcelContent(val){
    const formData = new FormData();
    const currentDateTime: any = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

    formData.append('AccessToken', this.token);
    formData.append('startdate', val?.RunDate);
    formData.append('enddate', currentDateTime);
    formData.append('time_interval', '120');
    formData.append('imei', val?.ImeiNo1||val?.ImeiNo2||val?.ImeiNo3);
    formData.append('group_id', this.group_id);
    formData.append('AccountId', this.account_id);
    console.log("excel",formData,val);
    this.service.vehicleTrackongS(formData).subscribe((res: any) => {
      console.log("Response:", res);
     
      
      if (res.Status === 'success' && Array.isArray(res.data) && res.data.length > 0) {
   
        this.trackingData=res?.data
         this.downloadExcel()
           
        // Initialize the map with the coordinates
    
      } else {
        console.log('No valid locations found in the response.');
        alert("No tracking data")
      }
    }, error => {
     
      console.error('Error fetching vehicle tracking data:', error);
    });
  }


  transShipment(item){
    console.log(item,"trans-shipment");
    $('#transShipModal').modal('hide');
  }
 
  refreshPage(){
    this.initApiCalls()
  }
}