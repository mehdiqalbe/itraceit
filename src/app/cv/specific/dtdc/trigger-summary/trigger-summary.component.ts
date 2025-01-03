import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { DataTable } from 'src/app/shared/data/tables_data/data_table';
import { FormsModule, NgForm } from '@angular/forms';
import { CrudService } from 'src/app/shared/services/crud.service'; 
import { JsonPipe, KeyValue } from '@angular/common';
import { Chart } from 'chart.js';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
// import { obj } from '../../reports/trip-reports/modals';
import { Pipe, PipeTransform } from '@angular/core';
import { DataLayerManager } from '@agm/core';
import { DatePipe } from '@angular/common'
import { Position } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
// import { TooltipAndPopoverComponent } from '../../advanced-elements/tooltip-and-popover/tooltip-and-popover.component';
import { config } from 'rxjs';
import { NavService } from 'src/app/shared/services/nav.service';
declare var $: any


@Component({
  selector: 'app-trigger-summary',
  templateUrl: './trigger-summary.component.html',
  styleUrls: ['./trigger-summary.component.scss']
})
export class TriggerSummaryComponent implements OnInit {
  token:any;
  account_id:any;
  group_id:any;
  currentDateTime:any;
  datetimepicker1:any;
  threatArray:any=[]
  triggerArray:any=[]
  Object = Object;
  alrtName:any=[];
  alrtcount:any=[];
  threatName:any=[];
  threatcount:any=[];
  extra:any=[];
  summaryArray:any=[]
  TrpsummaryArray:any={};
  unRsummaryArray:any={};
  unVsummaryArray:any={};
  title:any
  chartFlag:boolean=false
  chartFlag1:boolean=false
  myChart:any
  myChart1:any
  Name:any
  triggerFlg:boolean=true
  filterFlag:boolean=false
  threatFlg:boolean=true
  constructor(private navServices: NavService,private CrudService: CrudService,private SpinnerService: NgxSpinnerService,private datepipe:DatePipe) { }

  ngOnInit(): void {

    // this.token=localStorage.getItem('AccessToken1')!
    // this.account_id=localStorage.getItem('AccountId')!
    
    // this.group_id=localStorage.getItem('forGroup')!
    
   this.token = localStorage.getItem('AccessToken')!
   this.account_id = localStorage.getItem('AccountId')!
   // console.log("account_id", this.account_id)
   this.group_id = localStorage.getItem('GroupId')!
    console.log("account_id",this.account_id,this.token,this.group_id)
    this.currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd');
    this.datetimepicker1=this.currentDateTime;
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
  summarySubmit(value)
  {
    this.filterFlag=true;
    this.SpinnerService.show();
    this. alrtName=[];
    this.alrtcount=[];
    this.threatName=[];
    this.threatcount=[];
    this.threatArray=[];
    this.triggerArray=[];
    this.extra=[]
    
    console.log("submit",value)
    var formdata=new FormData()
    formdata.append('AccessToken',this.token)
    formdata.append('forGroup',this.group_id)
    formdata.append('Type','summary')
    formdata.append('date_from',value.from_time)
    formdata.append('date_to',value.to_time)
    
    this.CrudService.summaryS(formdata).subscribe((data:any) => {
      console.log("data full",data)
      this.extra.push(value.from_time)
    this.extra.push(value.to_time)
      this.extra.push(data.fetch_time)
      this.threatArray=data.threat
      this.triggerArray=data.trigger   
      console.log("threat full",this.threatArray)
      console.log("trigger full",this.triggerArray)
      this.triggerHistoryTableF();

      
      var count:any
      var name:any
      var threatcount:any
      var threatname:any
      
      Object.entries(this.triggerArray).forEach(entry => {
        const [key, value] = entry;
        count=value
        name=key
        console.log(key, value);
        this.alrtName.push(name)
       this.alrtcount.push(count['Total Alert'])
        // alrtcount.push({[key]:count['Total Alert']})
      });

      Object.entries(this.threatArray).forEach(entry => {
        const [key, value] = entry;
        threatcount=value
        threatname=key
        console.log(key, value);
        this.threatName.push(threatname)
       this.threatcount.push(threatcount['Total Alert'])
        // alrtcount.push({[key]:count['Total Alert']})
      });
      
    
      
      this.chartF()
      this.chart1F()
    })
  }
  triggerHistoryTableF()
  {
   
    var  table = $('#triggerHistoryTable').DataTable();
    table.clear()
    table.destroy();
   
     
     
    
  
  
  
   setTimeout(() =>{
   
    $(document).ready(function () {

      var tbl = $('#triggerHistoryTable')

      $('#triggerHistoryTable').DataTable({
 
        
        pageLength: 25,
        fixedHeader: true,
        // scrollX: true,
        scrollY: '450px',
        // scrollCollapse: true,
        paging: true,
        scrollX: true,
        destroy: true,
        responsive: true,
        retrieve:false,
        inilitizer: true,
       
 
        
        "order": [],
         
        dom:'<"html5buttons"B>lTfgitp',
        
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
                 doc.defaultStyle.fontSize = 1;  doc.styles.tableHeader.fontSize = 1;
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
   },1000);
  
 
   setTimeout(()=>{
    this.SpinnerService.hide();
  },1000);
   
  
   // console.log("table length2",datatable.length)
 }
 chartF()
   {
    
    // var myChart:any
  


    console.log("label",this.alrtName)
    console.log("label count",this.alrtcount)
   if(this.chartFlag)
   {
    // this.myChart.data.datasets[0].data[2]=[];
    this.myChart.destroy();
   }

  

    
    // $('#chart').modal('show');
    let Ctx:any
    Ctx = document.getElementById('myChart');

   this.myChart=new Chart(Ctx, {
      type: 'pie',
      
      data: {
        labels: this.alrtName,
        datasets: [{
          label: 'Trigger Data',
          // type: 'pie',
          // label: 'Trigger Data',
          data: this.alrtcount,
          borderWidth: 1,
          backgroundColor:[ 'green', 'yellow', 'blue', 'red','grey','brown','Darkviolet', 'orange','purple','Maroon','LightBlue','Forestgreen'],
          
        },
        
        // {
        //   type: 'pie',
        //   label: 'Trigger Data',
        //   data: this.alrtcount,
        // },
       ]
      },
   
      
      options: {
        scales: {
          // y: {
          //   beginAtZero: true,
          
          // }
        },
        responsive: true,
      }
    });
    this.chartFlag=true;
    
   
   
  };
   chart1F()
   {
    // const mychart:any=null
    console.log(" threat label",this.threatName)
    console.log(" threat label count",this.threatcount)
    if(this.chartFlag1)
    {
     // this.myChart.data.datasets[0].data[2]=[];
     this.myChart1.destroy();
    }

    // $('#chart').modal('show');
    let Ctx:any
    Ctx = document.getElementById('myChart1');

    this.myChart1=new Chart(Ctx, {
      type: 'pie',
      data: {
        labels: this.threatName,
        datasets: [{
          // type: 'pie',
          label: ' Threat Data',
          data: this.threatcount,
          borderWidth: 1,
          backgroundColor:[ 'green', 'yellow', 'blue', 'red','grey','brown','Darkviolet', 'orange','purple','Maroon','LightBlue','Forestgreen'],
        }
      //   {
      //     type: 'line',
      //     label: ' Threat Data',
      //     data: this.threatcount,
        
        
      // }
    ]
      },
   
      
      options: {
        scales: {
          // y: {
          //   beginAtZero: true,
          
          // }
        },
        // responsive: true,
      //   plugins: {
      //     legend: {
      //         labels: {
      //             // This more specific font property overrides the global property
                  
      //             font: {
      //                 size: 14,
      //                 color:'black',
                      
                      
                      
      //             }
      //         }
      //     }
      // }
      
      }
    });
    this.chartFlag1=true;
   }
   detailSummaryThreat(name,type)
   {
    this.Name="Threat Report";
    this.TrpsummaryArray={}
    this.unRsummaryArray={}
    this.unVsummaryArray={}
    console.log("detailed threat",name,type);
    if(type=='Total Alert')
    {
      
    
    $('#summaryModal').modal('show');
    // this.summaryTableF()
    this.SpinnerService.show();
    }
    if(type=='Total Trip')
    {
      $('#tripsummaryModal').modal('show');
      // this.summaryTableF()
      this.SpinnerService.show();
    }
    if(type=='Unique Route')
    {
      $('#uniquesummaryModal').modal('show');
      // this.summaryTableF()
      this.SpinnerService.show();
    }
    if(type=='Unique Vehicle')
    {
      $('#uniqVesummaryModal').modal('show');
      // this.summaryTableF()
      this.SpinnerService.show();
    }
    var formdata=new FormData()
    formdata.append('AccessToken',this.token)
    formdata.append('forGroup',this.group_id)
    formdata.append('Type','detail')
    formdata.append('date_from',this.extra[0])
    formdata.append('date_to',this.extra[1])
    formdata.append('fetch_time',this.extra[2])
    formdata.append('block','threat')
    formdata.append('block_category',type)
    formdata.append('alert_name',name)
    
    this.CrudService.summaryS(formdata).subscribe((data:any) => {
      console.log("threat data received",data)
      if(type=='Total Alert')
      {
        
        this.summaryArray=data.total_alert
      // $('#summaryModal').modal('show');
      this.summaryTableF()
      // this.SpinnerService.hide();
      
      }
      if(type=='Total Trip')
      {
        var temp:any=[];
        Object.entries(data.total_trip).forEach(entry => {
          const [key, value] = entry;
        this.title=key
          temp.push(value);
        })
        
        Object.assign(this.TrpsummaryArray,temp[0]);
        console.log("responce",this.TrpsummaryArray)
        // $('#tripsummaryModal').modal('show');
        this.tripsummaryTableF();
        // this.SpinnerService.hide();
      }
       if(type=='Unique Route')
      {
        // this.summaryArray=data.unique_route
        console.log("responce",)
        var temp:any=[];
        Object.entries(data.unique_route).forEach(entry => {
          const [key, value] = entry;
          this.title=key
          temp.push(value);
        })
        
        Object.assign(this.unRsummaryArray,temp[0]);
        console.log("responce",this.unRsummaryArray)
        // $('#uniquesummaryModal').modal('show');
        this.uniqueRTableF();
        // this.SpinnerService.hide();
      }
       if(type=='Unique Vehicle')
      {
        // this.summaryArray=data.unique_vehicle
        console.log("responce",)
        var temp:any=[];
        Object.entries(data.unique_vehicle
          ).forEach(entry => {
          const [key, value] = entry;
          this.title=key
          temp.push(value);
        })
        Object.assign(this.unVsummaryArray,temp[0]);
        console.log("responce full",this.unVsummaryArray)
        // $('#uniqVesummaryModal').modal('show');
        this.uniqVeRTableF();
        // this.SpinnerService.hide();
        // console.log("responce uniq vehicle",temp)
  
      }
    })

   }
   detailSummaryTrigger(name,type)
   {
    this.Name="Trigger Report";
    this.TrpsummaryArray={}
    this.unRsummaryArray={}
    this.unVsummaryArray={}
    if(type=='Total Alert')
    {
      
    
    $('#summaryModal').modal('show');
    // this.summaryTableF()
    this.SpinnerService.show();
    }
    if(type=='Total Trip')
    {
      $('#tripsummaryModal').modal('show');
      // this.summaryTableF()
      this.SpinnerService.show();
    }
    if(type=='Unique Route')
    {
      $('#uniquesummaryModal').modal('show');
      // this.summaryTableF()
      this.SpinnerService.show();
    }
    if(type=='Unique Vehicle')
    {
      $('#uniqVesummaryModal').modal('show');
      // this.summaryTableF()
      this.SpinnerService.show();
    }

    console.log("detailed trigger",name,type);
    console.log("time",this.extra)
    var formdata=new FormData()
    formdata.append('AccessToken',this.token)
    formdata.append('forGroup',this.group_id)
    formdata.append('Type','detail')
    formdata.append('date_from',this.extra[0])
    formdata.append('date_to',this.extra[1])
    formdata.append('fetch_time',this.extra[2])
    formdata.append('block','trigger')
    formdata.append('block_category',type)
    formdata.append('alert_name',name)
    
    this.CrudService.summaryS(formdata).subscribe((data:any) => {
      console.log("detailed",data);
      if(type=='Total Alert')
      {
        
        this.summaryArray=data.total_alert
      // $('#summaryModal').modal('show');
      this.summaryTableF()
      
      }
     if(type=='Total Trip')
    {
      var temp:any=[];
      Object.entries(data.total_trip).forEach(entry => {
        const [key, value] = entry;
      this.title=key
        temp.push(value);
      })
      
      Object.assign(this.TrpsummaryArray,temp[0]);
      console.log("responce",this.TrpsummaryArray)
      // $('#tripsummaryModal').modal('show');
      this.tripsummaryTableF();
      // this.SpinnerService.hide();
    }
     if(type=='Unique Route')
    {
      // this.summaryArray=data.unique_route
      console.log("responce",)
      var temp:any=[];
      Object.entries(data.unique_route).forEach(entry => {
        const [key, value] = entry;
        this.title=key
        temp.push(value);
      })
      
      Object.assign(this.unRsummaryArray,temp[0]);
      console.log("responce",this.unRsummaryArray)
      // $('#uniquesummaryModal').modal('show');
      this.uniqueRTableF();
      // this.SpinnerService.hide();
    }
     if(type=='Unique Vehicle')
    {
      // this.summaryArray=data.unique_vehicle
      console.log("responce",)
      var temp:any=[];
      Object.entries(data.unique_vehicle
        ).forEach(entry => {
        const [key, value] = entry;
        this.title=key
        temp.push(value);
      })
      Object.assign(this.unVsummaryArray,temp[0]);
      console.log("responce full",this.unVsummaryArray)
      // $('#uniqVesummaryModal').modal('show');
      this.uniqVeRTableF();
      // this.SpinnerService.hide();
      // console.log("responce uniq vehicle",temp)

    }
    // console.log("responce",this.summaryArray)
      formdata.forEach((value,key) => {
        console.log("key=",key+"value= "+value)
      })
      // this.SpinnerService.hide();
    })  
    
   }
   /////////////////////////////////////////////////////////////////////////////////////////////////////
   summaryTableF()
   {
    // this.SpinnerService.show();
     var  table = $('#summaryTable').DataTable();
     table.clear()
     table.destroy();
    
      
      
     
   
   
   
    setTimeout(() =>{
    
     $(document).ready(function () {
 
       var tbl = $('#summaryTable')
 
       $('#summaryTable').DataTable({
  
         
         pageLength: 25,
         fixedHeader: true,
         // scrollX: true,
         scrollY: '450px',
         // scrollCollapse: true,
         paging: true,
         scrollX: true,
         destroy: true,
         responsive: true,
         retrieve:false,
         inilitizer: true,
        
  
         
         "order": [],
          
         dom:'<"html5buttons"B>lTfgitp',
         
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
                  doc.defaultStyle.fontSize = 1;  doc.styles.tableHeader.fontSize = 1;
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
    },1000);
   
  
   
    setTimeout(()=>{
      this.SpinnerService.hide();
    },1000);
    
    // console.log("table length2",datatable.length)
  }
  tripsummaryTableF()
  {
   
    var  table = $('#TripsummaryTable').DataTable();
    table.clear()
    table.destroy();
   
     
     
    
  
  
  
   setTimeout(() =>{
   
    $(document).ready(function () {

      var tbl = $('#TripsummaryTable')

      $('#TripsummaryTable').DataTable({
 
        
        pageLength: 25,
        fixedHeader: true,
        // scrollX: true,
        scrollY: '450px',
        // scrollCollapse: true,
        paging: true,
        scrollX: true,
        destroy: true,
        responsive: true,
        retrieve:false,
        inilitizer: true,
       
 
        
        "order": [],
         
        dom:'<"html5buttons"B>lTfgitp',
        
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
                 doc.defaultStyle.fontSize = 1;  doc.styles.tableHeader.fontSize = 1;
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
   },1000);
  
 
  
   setTimeout(()=>{
    this.SpinnerService.hide();
  },1000);
  
   // console.log("table length2",datatable.length)
 }
uniqueRTableF()
 {
  
   var  table = $('#UniqueRsummaryTable').DataTable();
   table.clear()
   table.destroy();
  
    
    
   
 
 
 
  setTimeout(() =>{
  
   $(document).ready(function () {

     var tbl = $('#UniqueRsummaryTable')

     $('#UniqueRsummaryTable').DataTable({

       
       pageLength: 25,
       fixedHeader: true,
       // scrollX: true,
       scrollY: '450px',
       // scrollCollapse: true,
       paging: true,
       scrollX: true,
       destroy: true,
       responsive: true,
       retrieve:false,
       inilitizer: true,
      

       
       "order": [],
        
       dom:'<"html5buttons"B>lTfgitp',
       
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
                doc.defaultStyle.fontSize = 1;  doc.styles.tableHeader.fontSize = 1;
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
  },1000);
 

  setTimeout(()=>{
    this.SpinnerService.hide();
  },1000);
  
 
  // console.log("table length2",datatable.length)
}
uniqVeRTableF()
 {
  
   var  table = $('#UniqveRsummaryTable').DataTable();
   table.clear()
   table.destroy();
  
    
    
   
 
 
 
  setTimeout(() =>{
  
   $(document).ready(function () {

     var tbl = $('#UniqveRsummaryTable')

     $('#UniqveRsummaryTable').DataTable({

       
       pageLength: 25,
       fixedHeader: true,
       // scrollX: true,
       scrollY: '450px',
       // scrollCollapse: true,
       paging: true,
       scrollX: true,
       destroy: true,
       responsive: true,
       retrieve:false,
       inilitizer: true,
      

       
       "order": [],
        
       dom:'<"html5buttons"B>lTfgitp',
       
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
                doc.defaultStyle.fontSize = 1;  doc.styles.tableHeader.fontSize = 1;
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
  },1000);
 
  setTimeout(()=>{
    this.SpinnerService.hide();
  },1000);
 
  
 
  // console.log("table length2",datatable.length)
}

playAudio(){
  let audio = new Audio();
  audio.src = "http://www.schillmania.com/projects/soundmanager2/demo/mpc/audio/CHINA_1.mp3";
  audio.load();
  audio.play();
  this.playAudio();
}
threatFilter(data)
{
  var table = $('#triggerHistoryTable').DataTable();
  console.log("threatFilter",data);
  if(data=="")
  {
    table.columns(0).search(" ").draw();
    table.columns(5).search(0).draw();
  }
  else
  {
    table.columns(0).search(data).draw();
  }

  
    
  
}
triggerFilter(data)
{
  var table = $('#triggerHistoryTable').DataTable();

  
    table.columns(0).search(data).draw();
  
}
AllSelectFilter(data)
{
  var table = $('#triggerHistoryTable').DataTable();
  console.log("select filter",data)
  if(data=="")
  {
    table.columns(0).search("").draw();
    table.columns(5).search("").draw();
    this.triggerFlg=true;
    this.threatFlg=true;
  }
  else if(data=="threat")
  {
    table.columns(0).search("").draw();
    table.columns(5).search(0).draw();
    this.triggerFlg=false;
    this.threatFlg=true;
  }
  else if(data=="trigger")
  {
    table.columns(0).search("").draw();
    table.columns(5).search(1).draw();
    this.triggerFlg=true;
    this.threatFlg=false;
  }
}



}

