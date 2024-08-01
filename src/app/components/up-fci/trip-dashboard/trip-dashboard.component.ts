import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NavService } from 'src/app/shared/services/nav.service';
declare var $: any;

@Component({
  selector: 'app-trip-dashboard',
  templateUrl: './trip-dashboard.component.html',
  styleUrls: ['./trip-dashboard.component.scss']
})
export class TripDashboardComponent implements OnInit {
  UserType:any
  token:any;
  account_id:any;
  sourceListdata:any=[]
  routedata:any=[]
  DashboardData:any=[]
  TripId:any=[]
  tripData:any=[]
  expenseListdata:any=[]
  tripId:any
  location:any=[]
  summary:any=[]

  constructor(private navServices: NavService,private modalService: NgbModal,  private router: Router, private service: CrudService,  private SpinnerService: NgxSpinnerService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    let App = document.querySelector('.app')
    // this.navServices.collapseSidebar = this.navServices.collapseSidebar
    App?.classList.add('sidenav-toggled');
    this.UserType=localStorage.getItem('UserType')
    this.token = localStorage.getItem('AccessToken')!
    this.account_id = localStorage.getItem('AccountId')!
    // this. tTable()
    // this.routeList()
    this.sourceList()
    this.dashBoardData()
    this.expenseList()
    
  }
  sidebarToggle(){
    
    let App = document.querySelector('.app')
    if ((this.navServices.collapseSidebar = !this.navServices.collapseSidebar)) {
      App?.classList.remove('sidenav-toggled');
    }
    else {
      App?.classList.add('sidenav-toggled');
    }
  }
  tTable() {

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
              title: 'Dashboard_report'
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
              title: 'Dashboard_report'
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
              title: 'Dashboard_report'
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
              title: 'Dashboard_report'
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

  // routeList()
  // {
  //   // let vList:any=[]
  //   var formdataCustomer = new FormData()
  //   formdataCustomer.append('AccessToken', this.token)
  //   // formdataCustomer.append('GroupId', '0986');
  //   // formdataCustomer.append('UserType', 'master');
  //   // formdataCustomer.append('DataFilter', js);
    
    
  //   this.service.routessList(formdataCustomer).subscribe((res: any) => {
  //     console.log(" routeList",res);
  //     // this.commodityListA = res.data;
  //     // console.log("commodity",this.commodityListA);

    
  //     for (const [key, value] of Object.entries(res.route_data)) {
      
            
  //      this.routedata.push(value);
  //     }
     

  //   })
  // }
  dashBoardData()
  {
    this.DashboardData=[]
    // let vList:any=[]
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    // formdataCustomer.append('GroupId', '0986');
    // formdataCustomer.append('UserType', 'master');
    // formdataCustomer.append('DataFilter', js);
    
    this.SpinnerService.show('tripDashboardSpinner')
    this.service.dashboardS(formdataCustomer).subscribe((res: any) => {
      console.log("dashboard",res);
      this.summary = res.data.Summary

      let k:any=[];
      let l:any=[];
      // this.DashboardData=res.data.Dashboard[3];

      // this.commodityListA = res.data;
      // console.log("commodity",this.commodityListA);

      k=res.data.Dashboard
     let fullDash:any=[]
      // for (const [key, value] of Object.entries(k))
      //    {
      //   // l=value
      
      //     // this.DashboardData.push(value);
      
     
      
      // }
      // let dummydata:any=[]
      for (const [key, value] of Object.entries(k)) {

        fullDash = value;

        for (const [key, value] of Object.entries(fullDash)) {

          this.DashboardData.push(value)
          // this.defaultDashboard=(value)



        }
        
        // dummydata.push(fullDash.length)

      }
      console.log("dashboard1",this.DashboardData);      
      // console.log("dashboard2",dummydata);      
      //  this. sourceListdata.push(value);
      // }
      this.SpinnerService.hide('tripDashboardSpinner')
      this.tTable()
     

    })
  }
  routeFilter(value)
  {
    var table = $('#threatTable').DataTable();
    console.log(value);
    
    table.columns(6).search(value).draw();
    if(value==undefined)
      {
        table.columns(6).search("").draw();
      }
  }
  tableFilter(value)
  {
    console.log(value);
    
    var table = $('#threatTable').DataTable();
   
    console.log(table);
    
    if(value=='All')
      {
        table.search("").draw();
      }
    else  if(value==undefined)
        {
          table.columns(8).search("").draw();
        }
    else{
      console.log(value);
      table.search(value).columns(8).draw()
    }
   
  }
  sourceList()
  {
    // let vList:any=[]
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    // formdataCustomer.append('GroupId', '0986');
    // formdataCustomer.append('UserType', 'master');
    // formdataCustomer.append('DataFilter', js);
    
    
    this.service.sourcesList(formdataCustomer).subscribe((res: any) => {
      console.log("sourceList",res);
      // this.commodityListA = res.data;
      // console.log("commodity",this.commodityListA);

    
      for (const [key, value] of Object.entries(res.source_data  )) {
    
            
       this. sourceListdata.push(value);
      }
     

    })
  }
  cancelTripF(value)
  {
    this.TripId=value
    // console.log("cancelTripvvF",value);
    // return value
    
   
  }
  cancelSubmit(value)
  {
   
    console.log("cancelTripF",value);
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    formdataCustomer.append('TripId', this.TripId);
    formdataCustomer.append('Remark', value.remarks);
    // formdataCustomer.append('DataFilter', js);
    
    
    this.service.cancelTripS(formdataCustomer).subscribe((res: any) => {
      console.log("cancel",res);
      alert(res.Message)
      $('#canceltripModal').modal('hide');
      this.dashBoardData()
    })
  }
  closeTrip(data)
  {
    this.location=[]
    let demo:any=[]
    this.tripData=data;
    console.log("close",data);
    for(var i=1;i<data.customer.length;i++) {
      if(data.customer[i].in_flag!=1&&data.customer[i].location_sequence!=0)

        {
          demo.push(data.customer[i])
          this.location.push(data.customer[i])
        }


    }
    console.log("data",demo)
  }
  closeTripF(value)
  {
    let k=this.tripData.customer.length-1;
    console.log("close",value);
    console.log("closeTripF",this.tripData,value);
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    formdataCustomer.append('TripId', this.tripData.id);
    formdataCustomer.append('CustomerId', value.location);
    
    formdataCustomer.append('EpodDate', value.time);
    formdataCustomer.append('Remarks', value.remarks);
    formdataCustomer.append('EpodDocument', value.file);
    
    
    this.service.closeS(formdataCustomer).subscribe((res: any) => {
      console.log("close",res);
      alert(res.Message)
      $('#closetripModal').modal('hide');
      this.dashBoardData()
    })
  }
  routeList(e) {
    console.log("event", e);
    // let vList:any=[]
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    // formdataCustomer.append('GroupId', '0986');
    // formdataCustomer.append('UserType', 'master');
    formdataCustomer.append('SourceID', e);


    this.service.routessList(formdataCustomer).subscribe((res: any) => {
      console.log(" routeList", res);
      // this.commodityListA = res.data;
      // console.log("commodity",this.commodityListA);


      for (const [key, value] of Object.entries(res.route_data)) {


        this.routedata.push(value);
      }


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
  
  transShipment(item){
    console.log(item,"trans-shipment");
    $('#transShipModal').modal('hide');
  }
}
$(document).ready(function () {
  let modalContent: any = $('.modal-content');
  modalContent.draggable({
    handle: '.modal-header',
    revert: false,
    // revertDuration: 300,
    backdrop: false,
    show: true
  });
});
