import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
// import { CrudService } from 'src/app/shared/services/crud.service';
import {CustomerService } from '../customer.service'
import { NavService } from 'src/app/shared/services/nav.service';
import { JsonPipe, KeyValue } from '@angular/common';
import * as echarts from 'echarts';
declare var $: any;

@Component({
  selector: 'app-document-wallet',
  templateUrl: './document-wallet.component.html',
  styleUrls: ['./document-wallet.component.scss']
})
export class DocumentWalletComponent implements OnInit {


  constructor(private navServices: NavService, private modalService: NgbModal, private formBuilder: FormBuilder, private router: Router, private service: CustomerService, private SpinnerService: NgxSpinnerService, private datepipe: DatePipe) { }
  ShipmentNo:any
  currentDateTime:any;
  datetimepicker1:any;
  token: any
  account_id: any
  master:any=[];
  echart:any
  fullDataOFchart:any=[];
  walletTable:any=[];
  allSelected: boolean = false;
  selectedIds: any = [];
  select:any
  Driver_name:any
  current_id:any
  store_eve:any
  Dcopy:any
  showIframe: boolean = false;
  Dcopy_edit:any
  imageURL_edit:any
  edit_data:any=[]
  vehicleFlag:boolean=false
  dummy:any={}
  groupId:any
  addDocCatagory:any=''
  addDocIds:any
  addDocName:any=''
  NamePlace:any=''
  NameOnBox:any
  UserType: any;
  viewdocFile:any
  ngOnInit(): void {
    let App = document.querySelector('.app')
    // this.navServices.collapseSidebar = this.navServices.collapseSidebar
    App?.classList.add('sidenav-toggled');

    this.token = localStorage.getItem('AccessToken')!
    this.groupId = localStorage.getItem('GroupId')!
    console.log("Access", this.token)
    this.account_id = localStorage.getItem('AccountId')!
    this.UserType = localStorage.getItem('UserType')!;
    this.walletMaster()
    this.dummy={
      "Date_type":"",
      "from_time":"",
      "To_time":"",
      "vehicle_id":"",
      "Document":"",
      "Status":"",
      "VerticleType":"",
      "TransporterType":"",
      "AgentType":"",
    }
    this.filterSubmit(this.dummy);
    
  }
  sidebarToggle() {

    let App = document.querySelector('.app')
    if ((this.navServices.collapseSidebar = !this.navServices.collapseSidebar)) {
      App?.classList.remove('sidenav-toggled');
    }
    else {
      App?.classList.add('sidenav-toggled');
    }
  }
  filterSubmit(value)
  {
    console.log("submit",value);
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    // formdataCustomer.append('GroupId', this.groupId);
    // formdataCustomer.append('GroupId', '5674');
    formdataCustomer.append('DateType', value.Date_type|| '');
    formdataCustomer.append('FromDate', value.from_time|| '');

    formdataCustomer.append('ToDate', value.To_time|| '');
    formdataCustomer.append('VehicleId', value.vehicle_id|| '');
    formdataCustomer.append('DocumentTypeId', value?.Document|| '');
    formdataCustomer.append('StatusTypeId', value.Status|| '');
    formdataCustomer.append('VerticalId', value?.VerticleType|| '');
    formdataCustomer.append('AgentId', value?.AgentType|| '');
    formdataCustomer.append('TransporterId', value?.TransporterType|| '');

    for (let [key, value] of (formdataCustomer as any).entries()) {
      console.log(key + ': ' + value);
  }
    this.service.filtersubmitS(formdataCustomer).subscribe((res: any) => {
      console.log("walletMaster res", res);
      this.fullDataOFchart=res
      this.walletTable=res.Data

      // this.expenseListdata = res.data;
      this.chartEchart2()
      this.chartEchart3()
      this.masterUploadTable()
     console.log("wallettabledata", this.walletTable)
    })
  }
  masterUploadTable()
  {
  
  
  
  
   var tbl = $('#walletTable')
   var table = $('#walletTable').DataTable();
   table.clear()
   table.destroy();
   // table.draw()
   // $('#masterUpload').DataTable().clear;
   // if(datatable.length!=)
   // console.log("table length",datatable.length)
   //  $('#masterUpload tbody').empty();
  
  
  
   $(document).ready(function () {
  
  
  
     $('#walletTable').DataTable({
  
  
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
             title: 'dashboard_repor'
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
             title: 'dashboard_repor'
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
             title: 'dashboard_repor'
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
             title: 'dashboard_repor'
           }]
     }
  
     );
   });
  
  
  //  setTimeout(() => {
  //    this.SpinnerService.hide();
  //    // console.log("Timeout")
  //    this.SpinnerService.hide("LastAlert")
  
  //  }, 3000);
  
   // console.log("table length2",datatable.length)
  }
  walletMaster()
  {

     var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    // formdataCustomer.append('GroupId', '0986');
    // formdataCustomer.append('UserType', 'master');
    // formdataCustomer.append('DataFilter', js);


    this.service.walletMasterS(formdataCustomer).subscribe((res: any) => {
      // console.log("walletMaster", res);
      this.master=res;
      // this.expenseListdata = res.data;

    })
  }
  chartEchart2() {

    var cons=this.fullDataOFchart.DriverGraph

    var categories = cons.map(item => item.Name);
        var activeData = cons.map(item => item.Active);
        var aboutToExpireData = cons.map(item => item["About to expire"]);
        var expiredData = cons.map(item => item.Expired);
    var total_challan:any=[];
    var allotment_mismatch:any=[];
    var in_active:any=[];
    var total_trip_score:any=[];
    var no_gps:any=[];
    if(categories.length<6)
      {
      }
  
    // console.log("chartEchart", this.monthSummaryData);
    let chartDom: any = document.getElementById('barchart');
    chartDom.style.height = '300px'; // Specify units (e.g., pixels)
    chartDom.style.width = '60vw';
    chartDom.style.left = '-10%';
  
    this.echart = echarts.init(chartDom, {
      renderer: 'canvas',
      useDirtyRect: false
    });
  
    var option = {
      title: {},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          position: 'top',
        },
        formatter: function (params) {
          var tar = params[0].name + '<br/>';
          for (let i = 0; i < params.length; i++) {
            let dataItem = params[i];
            if (dataItem.value !== undefined) {
              if (dataItem?.seriesName == 'Kpi Score') {
                tar += dataItem?.seriesName + ' : ' + dataItem?.value + '%' + '<br/>';
              } else {
                tar += dataItem?.seriesName + ' : ' + dataItem?.value + '<br/>';
              }
            }
          }
          return tar;
        }
      },
      grid: {
        right: '20%',
        
      },
      // toolbox: {
      //   feature: {
      //     dataView: { show: false, readOnly: false },
      //     restore: { show: false },
      //     saveAsImage: { show: false }
      //   }
      // },
      legend: {
        show: true,
        orient: 'horizontal',
        bottom: 0,
        // top: '30%',
        // bottom: '10%',
        textStyle: {
            fontSize: 10,
            fontWeight: 'bold',
            lineHeight: 10,
      },},
      xAxis: {
        type: 'category',
        splitLine: { show: false },
        data: categories,
        axisLabel: {
          interval: 0,
          rotate: 0,
          fontSize: 12,
          fontWeight: 'bold',
          color: 'black',
          overflow: 'truncate',
          tooltip: {
            show: true,
          }
        }
      },
      yAxis: [
        {
          type: 'value',
          // name: 'No. of Vehicles',
          nameLocation: 'middle',
          nameRotate: 90,
          nameGap: 50,
          position: 'left',
          alignTicks: true,
          splitLine: { show: false },
          axisLabel: {
            color: '#333',
            fontWeight: 'bold',
            fontSize: 12,
           
            formatter: function (value) {
              return value >= 1000 ? (value / 1000) + 'k' : value;
            }
          },
          nameTextStyle: {
            color: '#333',
            fontWeight: 'bold',
            fontSize: 14
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'black'
            }
          },
        },
       
       
      ],
      series: [
        {
          name: 'Active',
          type: 'bar',
          barWidth: 18,
          barGap: '0%',
          groupPadding: 2,
          barCategoryGap: 2,
          itemStyle: {
            borderColor: 'transparent',
            color: '#6ABD46',
          },
          label: {
            show: true,
            position: 'top',
            rotate: 90,
            align: 'center',
            padding: [5, -10, -5, 15],
            fontSize: 10,
            fontWeight: 'bold',
            formatter: function (params) {
              let value = params.value;
              return value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value;
            }
          },
          data: activeData,
        },
        {
          name: 'About To Expire',
          type: 'bar',
          barWidth: 18,
          barGap: '0%',
          groupPadding: 2,
          barCategoryGap: 2,
          itemStyle: {
            borderColor: 'transparent',
            color: '#1D4380',
          },
          label: {
            show: true,
            position: 'top',
            rotate: 90,
            align: 'center',
            padding: [5, -10, -5, 15],
            fontSize: 10,
            fontWeight: 'bold',
            formatter: function (params) {
              let value = params.value;
              return value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value;
            }
          },
          data: aboutToExpireData,
        },
        {
          name: 'Expired',
          type: 'bar',
          barWidth: 18,
          barGap: '0%',
          groupPadding: 2,
          barCategoryGap: 2,
          itemStyle: {
            borderColor: 'transparent',
            color: '#EC6625',
          },
          label: {
            show: true,
            position: 'top',
            rotate: 90,
            align: 'center',
            padding: [5, -10, -5, 15],
            fontSize: 10,
            fontWeight: 'bold',
            formatter: function (params) {
              let value = params.value;
              return value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value;
            }
          },
          data: expiredData,
        },
      
      ]
    };
  
    option && this.echart.setOption(option);

    ////////////////////////////////////////////
    this.echart.on('click',  (params) => {
      if (params.componentType === 'series') {
          // Access the clicked data
          var name = params.name;
          var value = params.seriesName;
          // var value = params.value;
  
          console.log('You clicked on', name, 'with value', value);

          this.TableFilter(name,value)
  
          if(name=='Running')
            {
              // this.consSTtAct('vehicle_status','Running','Running');

            }
         else   if(name=='Stop')
              {
                // this.consSTtAct('vehicle_status','Stop','Stopped');

              }
              else   if(name=='In-Active')
                {
                  // this.consSTtAct('vehicle_status','InActive','InActive');
                }
                else   if(name=='Non GPS')
                  {
                    // this.consSTtAct('ConsignmentStatus','NonGps','NonGps');
                  }
          
  
          // Perform actions based on the clicked segment
          // alert('You clicked on ' + name + ' with value ' + value);
      }
  });
    // this.chartFlag = true;
    
      if (this.echart) {
        this.echart.resize();
      }
    
    
  }
  ///////////////vehicle graphic //////////////////////////////////
  chartEchart3() {
    
    // if (this.chartFlag) {
      
    //   this.echart.dispose();
  
    // }
    // let blankArray:any=8-this.monthsummaryx.length;
    
    // if(this.monthsummaryx.length<5)
    //   {
    //     this.monthsummaryx.push(" ")
    //     this.monthsummaryx.push(" ")
    //     this.monthsummaryx.push(" ")
    //     this.monthsummaryx.push(" ")
    //     this.monthsummaryx.push(" ")
    //     this.monthsummaryx.push(" ")
       
    //   }
    var cons=this.fullDataOFchart.VehicleGraph


    var categories = cons.map(item => item.Name);
        var activeData = cons.map(item => item.Active);
        var aboutToExpireData = cons.map(item => item["About to expire"]);
        var expiredData = cons.map(item => item.Expired);
    var total_challan:any=[];
    var allotment_mismatch:any=[];
    var in_active:any=[];
    var total_trip_score:any=[];
    var no_gps:any=[];
    if(categories.length<6)
      {
        categories.push(" ")
        categories.push(" ")
        categories.push(" ")
       
       
      }
  
    // console.log("chartEchart", this.monthSummaryData);
    let chartDom: any = document.getElementById('barchart1');
    chartDom.style.height = '300px'; // Specify units (e.g., pixels)
    chartDom.style.width = '60vw';
    chartDom.style.left = '-10%';
  
    this.echart = echarts.init(chartDom, {
      renderer: 'canvas',
      useDirtyRect: false
    });
  
    var option = {
      title: {},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          position: 'top',
        },
        formatter: function (params) {
          var tar = params[0].name + '<br/>';
          for (let i = 0; i < params.length; i++) {
            let dataItem = params[i];
            if (dataItem.value !== undefined) {
              if (dataItem?.seriesName == 'Kpi Score') {
                tar += dataItem?.seriesName + ' : ' + dataItem?.value + '%' + '<br/>';
              } else {
                tar += dataItem?.seriesName + ' : ' + dataItem?.value + '<br/>';
              }
            }
          }
          return tar;
        }
      },
      grid: {
        right: '20%',
        
      },
      // toolbox: {
      //   feature: {
      //     dataView: { show: false, readOnly: false },
      //     restore: { show: false },
      //     saveAsImage: { show: false }
      //   }
      // },
      legend: {
        show: true,
        orient: 'horizontal',
        bottom: 0,
        // top: '30%',
        // bottom: '10%',
        textStyle: {
            fontSize: 10,
            fontWeight: 'bold',
            lineHeight: 10,
      },},
      xAxis: {
        type: 'category',
        splitLine: { show: false },
        data: categories,
        axisLabel: {
          interval: 0,
          rotate: 0,
          fontSize: 12,
          fontWeight: 'bold',
          color: 'black',
          overflow: 'truncate',
          tooltip: {
            show: true,
          },
          formatter: function(value) {
            return value.split(' ').join('\n');
        }
        }
      },
      yAxis: [
        {
          type: 'value',
          // name: 'No. of Vehicles',
          nameLocation: 'middle',
          nameRotate: 90,
          nameGap: 50,
          position: 'left',
          alignTicks: true,
          splitLine: { show: false },
          axisLabel: {
            color: '#333',
            fontWeight: 'bold',
            fontSize: 12,
           
            formatter: function (value) {
              return value >= 1000 ? (value / 1000) + 'k' : value;
            }
          },
          nameTextStyle: {
            color: '#333',
            fontWeight: 'bold',
            fontSize: 14
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'black'
            }
          },
        },
       
       
      ],
      series: [
        {
          name: 'Active',
          type: 'bar',
          barWidth: 18,
          barGap: '0%',
          groupPadding: 2,
          barCategoryGap: 2,
          itemStyle: {
            borderColor: 'transparent',
            color: '#6ABD46',
          },
          label: {
            show: true,
            position: 'top',
            rotate: 90,
            align: 'center',
            padding: [5, -10, -5, 15],
            fontSize: 10,
            fontWeight: 'bold',
            formatter: function (params) {
              let value = params.value;
              return value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value;
            }
          },
          data: activeData,
        },
        {
          name: 'About To Expire',
          type: 'bar',
          barWidth: 18,
          barGap: '0%',
          groupPadding: 2,
          barCategoryGap: 2,
          itemStyle: {
            borderColor: 'transparent',
            color: '#1D4380',
          },
          label: {
            show: true,
            position: 'top',
            rotate: 90,
            align: 'center',
            padding: [5, -10, -5, 15],
            fontSize: 10,
            fontWeight: 'bold',
            formatter: function (params) {
              let value = params.value;
              return value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value;
            }
          },
          data: aboutToExpireData,
        },
        {
          name: 'Expired',
          type: 'bar',
          barWidth: 18,
          barGap: '0%',
          groupPadding: 2,
          barCategoryGap: 2,
          itemStyle: {
            borderColor: 'transparent',
            color: '#EC6625',
          },
          label: {
            show: true,
            position: 'top',
            rotate: 90,
            align: 'center',
            padding: [5, -10, -5, 15],
            fontSize: 10,
            fontWeight: 'bold',
            formatter: function (params) {
              let value = params.value;
              return value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value;
            }
          },
          data: expiredData,
        },
      
      ]
    };
  
    option && this.echart.setOption(option);

    ////////////////////////////////////////////
    this.echart.on('click',  (params) => {
      if (params.componentType === 'series') {
          // Access the clicked data
          var name = params.name;
          var value = params.seriesName;
          // var value = params.value;
  
          console.log('You clicked on', name, 'with value', value);

          this.TableFilter(name,value)
  
          if(name=='Running')
            {
              // this.consSTtAct('vehicle_status','Running','Running');

            }
         else   if(name=='Stop')
              {
                // this.consSTtAct('vehicle_status','Stop','Stopped');

              }
              else   if(name=='In-Active')
                {
                  // this.consSTtAct('vehicle_status','InActive','InActive');
                }
                else   if(name=='Non GPS')
                  {
                    // this.consSTtAct('ConsignmentStatus','NonGps','NonGps');
                  }
          
  
          // Perform actions based on the clicked segment
          // alert('You clicked on ' + name + ' with value ' + value);
      }
  });
    // this.chartFlag = true;
    
      if (this.echart) {
        this.echart.resize();
      }
    
    
  }
  /////////////////////////table filter //////////////////////////////////
  TableFilter(name, value)
  {
    var table = $('#walletTable').DataTable();
    if(value=="About To Expire")
    {
      table.columns(4).search(name).draw();
      table.columns(10).search("Expiring in").draw();
    }
    else
    {
      table.columns(4).search(name).draw();
      table.columns(10).search(value).draw();
    }
   
  }
  ////////////////////////////////////////////////////////////////////
  resetTable()
  {
    var table = $('#walletTable').DataTable();
    table.columns().every(function(index) {
      table.column(index).search('');
  });

  // Redraw the table after clearing searches
  table.draw();
  }
  //////////////////////////////////////////////////////////////////
  viewF(item)
  {
    console.log("viewitem",item)
    this.viewdocFile=item.FilePath
    const width = 600;  // Set the desired width of the window
    const height = 400; // Set the desired height of the window

    // Calculate the position to center the window on the screen
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;

    window.open(this.viewdocFile, '_blank', `width=${width},height=${height},top=${top},left=${left}`);

  }
  toggleAllSelection() 
  {
    this.allSelected = !this.allSelected;
    if (this.allSelected) 
      {
      this.selectedIds = this.walletTable.map(item => item.DocumentId);
    } else {
      this.selectedIds = [];
    }
    console.log("selected", this.selectedIds)
  }
    toggleSelection(itemId: number) {
      const index = this.selectedIds.indexOf(itemId);
      if (index > -1) {
        this.selectedIds.splice(index, 1);
      } else {
        this.selectedIds.push(itemId);
      }
      this.allSelected = this.selectedIds.length === this.walletTable.length;
      console.log("selected", JSON.stringify(this.selectedIds))
    }

    isSelected(itemId: number): boolean {
      return this.selectedIds.includes(itemId);
    }
    operationF(value)
    {
      var commaSeparated = this.selectedIds.join(',');
      console.log("walletMaster res", commaSeparated);
      // console.log("walletMaster res", this.selectedIds);
      if (confirm("Do you want to proceed?")) {
        // User clicked "OK"
        alert("You clicked OK!");
          {
            var formdataCustomer = new FormData()
            formdataCustomer.append('AccessToken', this.token)
            // formdataCustomer.append('GroupId', '5674');
         
            formdataCustomer.append('DocumentId',commaSeparated);
            formdataCustomer.append('Status', value);
        
        
            this.service.walletOperationS(formdataCustomer).subscribe((res: any) => {
              console.log("walletMaster res", res);
              alert(res.Message);
              this.filterSubmit(this.dummy);
              this.selectedIds=[]
              this.walletMaster()
              
              const checkboxes = document.querySelectorAll('.checkbox')as NodeListOf<HTMLInputElement>;
              checkboxes.forEach(checkbox => {
                  checkbox.checked = false;
              });
            })
          }


    } else {
        // User clicked "Cancel"
        alert("You clicked Cancel!");
    }
   
    }
    AddDocId(id)
    {
      console.log("AddDocId", id);
      if( this.vehicleFlag==false)
        {
          this.addDocIds=id.vehicle_id
        //  this.addDocCatagory='vehicle'
        }
        else if(this.vehicleFlag==true)
          {
            // this.vehicleFlag=true;
            this.addDocIds=id.id
            // this.addDocCatagory='driver'
          }
      // this.addDocIds
    }
    AddDocName(name)
    {
      console.log("AddDocName", name);
      if( this.vehicleFlag==false)
        {
          this.addDocName=name
          
        //  this.addDocCatagory='vehicle'
        }
        else if(this.vehicleFlag==true)
          {
            this.addDocName=name
            // this.addDocIds=id.id
            // this.addDocCatagory='driver'
          }
    }
uploaddriver_submit(eve:any){
      console.log("value",eve);
      this.store_eve=eve;
     
  
    if(eve.status=='VALID'){
      // if (this.document_data.status == 'VALID') {
        var formData = new FormData();
        if( this.vehicleFlag=false)
          {
            formData.append('VehicleId', this.addDocIds);
            // this.addDocIds=id.vehicle_id
          //  this.addDocCatagory='vehicle'
          }
          else if(this.vehicleFlag=true)
            {
              formData.append('DriverId',this.addDocIds);
              // this.vehicleFlag=true;
              // this.addDocIds=id.id
              // this.addDocCatagory='driver'
            }
        formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    
          formData.append('Category', this.addDocCatagory);
          formData.append('GroupId', this.groupId);
          
   
        formData.append('DocumentTypeId', this.addDocName.id);
        formData.append('DocumentTypeName', this.addDocName.name);
     
          formData.append('DocumentNo', eve.value.documentNumber);
        
       
          formData.append('IssueDate', eve.value.from_Date);
          formData.append('ExpiryDate', eve.value.To_Date);
        
        formData.append('DocumentFile', this.Dcopy);
        formData.append('Remark', eve.value.remark);
    
        this.service.documentAddS(formData).subscribe((res: any) => {
          console.log(res);
          alert(res.Message
          );
    
          $('#upload').modal('hide');
          this.filterSubmit(this.dummy);
          this.walletMaster()
        })
    
      
    }
    }
    vehicle_upload(eve,name,id){
      // this.destroyModal()
        this.select=eve;
        this.Driver_name=name;
        this.current_id=id;
      $('#upload').modal('show');
    }
    onFileChange_doc(event: any) {
      if (event.target.files.length > 0) {
        const image = (event.target as HTMLInputElement).files![0];
        // Driverupload.patchValue({
          this.Dcopy= image;
        // });
        // var reader = new FileReader();
        // reader.readAsDataURL(event.target.files[0]);
        // reader.onload = (e: any) => {
        //   this.imageURL = e.target.result;
        // }
      }
    }
  vehicleFilter(value)
    {
      console.log(value);
      var table = $('#walletTable').DataTable();
      if(value)
        {
          table.columns(2).search(value).draw();
        }
        else{
          table.columns(2).search("").draw();
        }
      
      
     
    }
  docFilter(value)
    {
      console.log(value);
      var table = $('#walletTable').DataTable();
      if(value)
        {
          table.columns(4).search(value).draw();
        }
        else{
          table.columns(4).search("").draw();
        }
      
      
     
    }
    renewF(data)
    {
        this.edit_data=data;

         console.log(data);
    }
 renewChange(value)
{
  console.log(value);

  var formdataCustomer = new FormData()
            formdataCustomer.append('AccessToken', this.token);
            // formdataCustomer.append('GroupId', '5674');
         
            formdataCustomer.append('DocumentId',value.DocumentId);
            formdataCustomer.append('DocumentNo', value.DocumentNo);
            formdataCustomer.append('IssueDate', value.IssueDate);
            formdataCustomer.append('ExpiryDate', value.ExpiryDate);
            formdataCustomer.append('DocumentFile', value);
            formdataCustomer.append('Remark', value);
        
        
            // this.service.walletOperationS(formdataCustomer).subscribe((res: any) => {
            //   console.log("walletMaster res", res);
              
        
            // })
}    

updatesubmit(eve:any,stauus:any){
  console.log(eve);
  this.store_eve=eve;
 
if(eve.status=='VALID'){
  // if (this.document_data.status == 'VALID') {
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    
    formData.append('DocumentId',this.edit_data.DocumentId);
    // formData.append('DocumentTypeName', eve.value.Documenttype.name);
 
      formData.append('DocumentNo', eve.value.documentNumber);
    
   
      formData.append('IssueDate', eve.value.from_Date);
      formData.append('ExpiryDate', eve.value.To_Date);
      if(eve.value.uploadDocument==''){
       
        formData.append('DocumentFile','' );
      }else{
    formData.append('DocumentFile', this.Dcopy_edit);
  }
   formData.append('Remark', eve.value.remark);

    this.service.documentEditS(formData).subscribe((res: any) => {
      console.log("responce",res);
      // alert(res.Message);
      if (res.Status == 'success') {
        // this.store_eve.resetForm();
        $('#upload-edit').modal('hide');
        this.filterSubmit(this.dummy);
    this.walletMaster()
        // this.modalService.close();
        alert(res.Message);
      } else {
        alert(res.Message);
      }
      
    })

  
}

}
////////////////////////////////////////////////////////////////////
renewSubmit(eve:any,stauus:any)
{
  console.log(eve);
  this.store_eve=eve;
 
if(eve.status=='VALID'){
  // if (this.document_data.status == 'VALID') {
    var formData = new FormData();
    formData.append('AccessToken', localStorage.getItem('AccessToken')!);
    
    formData.append('DocumentId',this.edit_data.DocumentId);
    // formData.append('DocumentTypeName', eve.value.Documenttype.name);
 
      formData.append('DocumentNo', eve.value.documentNumber);
    
   
      formData.append('IssueDate', eve.value.from_Date);
      formData.append('ExpiryDate', eve.value.To_Date);
      // if(eve.value.uploadDocument==''){
       
      //   formData.append('DocumentFile','' );
      // }
     
    formData.append('DocumentFile',(this.Dcopy_edit));
  
   formData.append('Remark', eve.value.remark);
      for (let [key, value] of (formData as any).entries()) {
        console.log(key + ': ' + value);
    }

    this.service.documentrenewS(formData).subscribe((res: any) => {
      console.log("responce",res);
      // alert(res.Message);
      if (res.Status == 'success') {
        // this.store_eve.resetForm();
        $('#RenewModel').modal('hide');
        this.filterSubmit(this.dummy);
    this.walletMaster()
        // this.modalService.close();
        alert(res.Message);
      } else {
        alert(res.Message);
      }
      
    })
  }
}
toggleIframe() {
  this.showIframe = !this.showIframe;
}
onFileChange_doc_edit(event: any) {
this.showIframe=false;
if (event.target.files.length > 0) {
  const image = (event.target as HTMLInputElement).files![0];
  // Driverupload.patchValue({
    this.Dcopy_edit= image;
  // });
  var reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.onload = (e: any) => {
    this.imageURL_edit = e.target.result;
    // console.log(this.imageURL)
  }
}
console.log("imahe",this.Dcopy_edit);
}
dataOneditF(data)
{
  this.edit_data=data;
  console.log(this.edit_data)
  if(data.Driver==null)
  {
    this.NamePlace="Vehicle Number"
    this.NameOnBox=data.VehicleNo
  }
 else if(data.VehicleNo==null)
  {
    this.NamePlace="Driver's Name"
    this.NameOnBox=data.Driver
  }
}
//////////////////////DELETE--------------------------------------
documentChangeStatus(eve){
  var formData = new FormData();
  formData.append('AccessToken', localStorage.getItem('AccessToken')!);
  
  formData.append('DocumentId', eve);
  formData.append('Status', '0');

   
  this.service.walletOperationS(formData).subscribe((res: any) => {

    if (res.Status == 'success') {
      // this.store_eve.resetForm();
      $('#upload-edit').modal('hide');
      // this.modalService.close();
      alert(res.Message);
    } else {
      alert(res.Message);
    }
  })



}
removeImage()
{
 this.imageURL_edit=''
}
addDocFilter(event)
{
  this.addDocCatagory='vehicle'
console.log("addDoc", event.target.id);
if(event.target.id=='vehicle')
  {
   this.vehicleFlag=false;
   this.addDocCatagory='vehicle'
  }
  else if(event.target.id=='driver')
    {
      this.vehicleFlag=true;
      this.addDocCatagory='driver'
    }
}
uploadBulk(event)
{
  this.Dcopy_edit=""
  if (event.target.files.length > 0) {
    const image = (event.target as HTMLInputElement).files![0];
    // Driverupload.patchValue({
      this.Dcopy_edit= image;
    // });
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e: any) => {
      this.imageURL_edit = e.target.result;
      // console.log(this.imageURL)
    }
  }
}
uploadBulkSubmit1()
{
  var formData = new FormData();
  formData.append('AccessToken', localStorage.getItem('AccessToken')!);
  
  formData.append('File', this.Dcopy_edit);
  // formData.append('Status', '0');

   
  this.service.buluploadS(formData).subscribe((res: any) => {

    console.log("responce",res)

  })
}

uploadBulkSubmit(fileinpt:HTMLInputElement)
{
  var formData = new FormData();
  formData.append('AccessToken', localStorage.getItem('AccessToken')!);
  
  formData.append('File', this.Dcopy_edit);
  // formData.append('Status', '0');

   
  // this.service.buluploadS(formData).subscribe((res: any) => {

  //   // alert()
  //   $('#uploadDoc').modal('hide')
  //   console.log("responce",res)

  // })

  this.service.buluploadS(formData).subscribe((res: any) => {
  
  // Close modal
  $('#uploadDoc').modal('hide');
  
  console.log("response", res);

  // Check if there are errors in the response
  if (res.Errors && res.Errors.length > 0) {
    // Show alert with error message
    alert('Errors occurred. Downloading error log.');

    // Create the error text
    let errorText = 'Error Log:\n\n';
    res.Errors.forEach((error: string) => {
      errorText += `${error}\n`;
    });

    // Convert the error text to a Blob
    const blob = new Blob([errorText], { type: 'text/plain' });

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = 'error_log.txt';

    // Append the link to the document and trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Remove the link from the document after the download
    document.body.removeChild(downloadLink);
  } else {
    alert('Upload was successful ');
  }
  fileinpt.value=""
});

}

}
