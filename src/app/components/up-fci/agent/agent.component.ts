import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NavService } from 'src/app/shared/services/nav.service';
import * as echarts from 'echarts';
declare var $: any;

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {

  charttt: any = ''
  chartttime: any = ''
  chartFlag: boolean = false;
  chartFlagTime: boolean = false;
  token: any
  datetimepicker1: any
  datetimepicker: any
  // GroupTypeId: any;
  group_id: any;
  currentDateTime: any;
  currentDateTime1: any;
  account_id: any;
  ShipmentNo: any
  full_Filter: any = [];
  scrollFlag: boolean = true;
  username: any = '';
  charttt1: any = '';
  chartFlag1: boolean = false;
  TransporterData: any = []
  AgencyData: any = []
  DistrictData: any = []
  MillData: any = []
  PurchaseData: any = []
  RegionData: any = []
  chartLabels: any = [];
  chartLabel: any = [];
  rTflag: boolean = true
  dTflag: boolean = false
  aTflag: boolean = false
  pTflag: boolean = false
  mTflag: boolean = false
  tTflag: boolean = false
  char_Title: any
  dummydata
  filterdata1: any = [];
  region: any = [];
  disrtck: any = []
  purches: any = []
  fulldistric: any = []
  eventtype: any
  legendArray: any = []
  dail_data: any = []
  chartTimeLabels: any = [];
  chartTimeFull: any = []
  xAxesDate: any = []
  kpiTime: any = []
  red_flag: any = []
  Dfg: any = []
  unAuth: any = []
  unStop: any = []
  ShipmentVehicle: any = []
  showcountFlag: boolean = true
  echart: any
  timeserieslabel: any = []
  timeechart: any
  mFlag: boolean = false
  Tflag: boolean = false
  Pflag: boolean = false
  chartimedpdownF: boolean = false;
  chartstatisticsF: boolean = true;
  chartimeDistLabels: any = []
  xAxesDateD: any = []
  dail_dataD: any = []
  chartimeAgeLabels: any = []
  chartimeRegLabels: any = []
  timeSeriesFlaf: boolean = false
  xAxesDateA: any = []
  xAxesDateR: any = []
  dail_dataR: any = []
  pCenterFlag: boolean = false
  timechart_Title: any = ''
  displayedItems: any[] = [];
  timeAtableF: boolean = true
  timeDtableF: boolean = false
  timeRtableF: boolean = false
  timetabRes: any = []
  TimeSeriesChart: any
  timeSerFlag: boolean = false
  chartSwitchflag: boolean = true
  sigmaMale: boolean = false
  sigmaMale2: boolean = false
  showcountFlagT: boolean = true
weektableflag:boolean=true;
    dailytableflag:boolean=false
    monthtableflag:boolean=false
     formfilter: NgForm | undefined;
     yAxesArrayS:any=[]
     loginFlag:boolean=true
     SummaryData: any=[]
     monthSummaryData: any=[]
     monthsummaryx: any=[]
     block_filterdata:any=[]
     Mill_filterdata:any=[]
     fromdate:any
     todate:any
     summaryVehicle:any=[]
     typeName:any
     show_hover:boolean=false

  constructor(private navServices: NavService,private modalService: NgbModal,  private router: Router, private service: CrudService,  private SpinnerService: NgxSpinnerService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    let App = document.querySelector('.app')
    // this.navServices.collapseSidebar = this.navServices.collapseSidebar
    App?.classList.add('sidenav-toggled');

    this.token = localStorage.getItem('AccessToken')!
    this.account_id = localStorage.getItem('AccountId')!
    this.submit();
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
  submit()
  {
    var js:any={}
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    formdataCustomer.append('GroupId', '0986');
    formdataCustomer.append('UserType', 'vertical');
    formdataCustomer.append('DataFilter', js);
    
    
    this.service.submitdata(formdataCustomer).subscribe((res: any) => {

      console.log("responce", res);
      this.SummaryData=res.Data;
      this.chart1();
      this.chart2();
      this.chart3();
    //   this.chart7()
    
    // this.chart5()
    // this.chart6()
    this.chartEchart()
    this.chartEchart2()

    })
  }
  chart1() {
    var cons=this.SummaryData?.vehicleStatus;
    console.log("Cons", cons);
    // alert("chart1")
    // let chartDom = document.getElementById('myChart1');
    // let echart = echarts.init(chartDom, {
    //     renderer: 'canvas',
    //     useDirtyRect: false
    // });
    let chartDom:any = document.getElementById('consSt');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '200px'; // Specify units (e.g., pixels)
    chartDom.style.width = '100%';
    
     var echart = echarts.init(chartDom, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var option;
  
    option = {
        title: {
            // text: 'Donut Chart',
            // subtext: 'Living Expenses in Shenzhen'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          show: false,
          orient: 'horizontal',
          left: 'left',
          // top:60,
          bottom:-6,
          textStyle: {
            fontSize: 10,
            fontweight: 'bold'
            // lineHeight: 10, // Adjust the line height if necessary
            // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
        },
        itemHeight: 8,
        itemWidth: 8,
            data: ['Running', 'Stop','In-Active','Non GPS'],
            layout: 'horizontal',
              // align: 'right',
              // verticalAlign: 'bottom',
              borderWidth: 0,
              width: '100%',
        },
        series: [
            {
                name: 'Shipment',
                type: 'pie',
                radius: ['30%', '70%'],
                avoidLabelOverlap: false,
                color:['#6ABD46','red','grey','#1D4380'],
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
                  
                    // { value:cons?.Good , name: 'Good' },
                    // { value:cons?.KpiViolation, name: 'KPI Violation' },
                    // { value: cons?.InActive, name: 'In-Active' },
                    // { value: cons?.NoGps, name: 'Non GPS' },
                    { value:cons?.running , name: 'Running'},
                    { value:cons?.stoppage, name: 'Stop' },
                    { value: cons?.inactive, name: 'In-Active'},
                    { value: cons?.nongps, name: 'Non GPS' },
                ]
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
                      return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
                      // return  total;
                  },
                  fontSize: 16,
                  fontWeight: 'bold'
              },
              data: [
                  {value: 1, name: 'Total'}
              ]
          }
    
        ]
    };
  
    option && echart.setOption(option);
  
    echart.on('click',  (params) => {
      if (params.componentType === 'series') {
          // Access the clicked data
          var name = params.name;
          var value = params.value;
  
          console.log('You clicked on', name, 'with value', value);
  
          if(name=='Good')
            {
              this.consSTtAct('ConsignmentStatus','GoodTrips');
            }
         else   if(name=='KPI Violation')
              {
                this.consSTtAct('ConsignmentStatus','KPIViolation');
              }
              else   if(name=='In-Active')
                {
                  this.consSTtAct('ConsignmentStatus','InActive');
                }
                else   if(name=='Non GPS')
                  {
                    this.consSTtAct('ConsignmentStatus','NonGps');
                  }
          
  
          // Perform actions based on the clicked segment
          // alert('You clicked on ' + name + ' with value ' + value);
      }
  });
  }
  chart2()
  {
  var cons=this.SummaryData?.customer
  
  // alert("chart1")
  // let chartDom = document.getElementById('myChart1');
  // let echart = echarts.init(chartDom, {
  //     renderer: 'canvas',
  //     useDirtyRect: false
  // });
  let chartDom:any = document.getElementById('tripSt');
  //  var echart = echarts.init(chartDom);
  chartDom.style.height = '200px'; // Specify units (e.g., pixels)
  chartDom.style.width = '100%';
  
   var echart = echarts.init(chartDom, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  var option;

  option = {
      title: {
          // text: 'Donut Chart',
          // subtext: 'Living Expenses in Shenzhen'
      },
      tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        show: false,
          orient: 'horizontal',
          left: 'left',
          // top:60,
          bottom:-6,
          textStyle: {
            fontSize: 10,
            fontweight: 'bold'
            // lineHeight: 10, // Adjust the line height if necessary
            // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
        },
        itemHeight: 8,
        itemWidth: 8,
          
      
          data: ['Existing Client', 'New Client'],
          layout: 'horizontal',
            // align: 'right',
            // verticalAlign: 'bottom',
            borderWidth: 0,
            width: '100%',
            // height: 25,
            
      },
      series: [
          {
              name: 'Shipment',
              type: 'pie',
              radius: ['30%', '70%'],
              avoidLabelOverlap: false,
              color:['#EC6625','#1D4380'],
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
                // 
                  
                  // { value:cons?.PartialDelivered, name: 'Partial Delivered' },
                  // { value:cons?.Delayed, name: 'Delayed' },
                  // { value: cons?.InActive, name: 'In-Active' },
                  // { value: cons?.NoGps, name: 'Non GPS' },
                  { value:cons?.existing_client, name: 'Existing Client' },
                  { value:cons?.new_client, name: 'New Client' },
                 
              ]
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
                    return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
                    // return  total;
                },
                fontSize: 16,
                fontWeight: 'bold'
            },
            data: [
                {value: 1, name: 'Total'}
            ]
        }
  
      ]
  };

  option && echart.setOption(option);
  echart.on('click',  (params) => {
    if (params.componentType === 'series') {
        // Access the clicked data
        var name = params.name;
        var value = params.value;

        console.log('You clicked on', name, 'with value', value);

        if(name=='Partial Delivered')
          {
            this.tripSTtAct('TripStatus','PartialDelivered')
          }
       else   if(name=='Delayed')
            {
              this.tripSTtAct('TripStatus','Delay');
            }
            else   if(name=='In-Active')
              {
                this.tripSTtAct('TripStatus','InActive');
              }
              else   if(name=='Non GPS')
                {
                  this.tripSTtAct('TripStatus','NonGps');
                }
        

        // Perform actions based on the clicked segment
        // alert('You clicked on ' + name + ' with value ' + value);
    }
});
}
   chart3() {
    var cons=this.SummaryData?.Iot
  
    // alert("chart1")
    // let chartDom = document.getElementById('myChart1');
    // let echart = echarts.init(chartDom, {
    //     renderer: 'canvas',
    //     useDirtyRect: false
    // });
    let chartDom:any = document.getElementById('deliverySt');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '200px'; // Specify units (e.g., pixels)
    chartDom.style.width = '100%';
    
     var echart = echarts.init(chartDom, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var option;
  
    option = {
        title: {
            // text: 'Donut Chart',
            // subtext: 'Living Expenses in Shenzhen'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          show: false,
          orient: 'horizontal',
          left: 'left',
          // top:60,
          bottom:-6,
          textStyle: {
            fontSize: 10,
            fontweight: 'bold'
            // lineHeight: 10, // Adjust the line height if necessary
            // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
        },
        itemHeight: 8,
        itemWidth: 8,
            data: ['GPS', 'E-Lock','Fuel Sensor'],
            layout: 'horizontal',
              // align: 'right',
              // verticalAlign: 'bottom',
              borderWidth: 0,
              width: '100%',
        },
        series: [
            {
                name: 'Shipment',
                type: 'pie',
                radius: ['30%', '70%'],
                avoidLabelOverlap: false,
                color:['#EC6625','#1D4380','grey'],
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
                 
                    // { value:cons?.PartialDelivered, name: 'GPS' },
                    // { value:cons?.NonEpod, name: 'E-Lock'},
                    // { value: cons?.Epod, name: 'Fuel Sensor'},
                    { value:cons?.gps, name: 'GPS' },
                    { value:cons?.elock, name: 'E-Lock'},
                    { value: cons?.fuelsensor, name: 'Fuel Sensor'},
                   
                ]
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
                      return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
                      // return  total;
                  },
                  fontSize: 16,
                  fontWeight: 'bold'
              },
              data: [
                  {value: 1, name: 'Total'}
              ]
          }
    
        ]
    };
  
    option && echart.setOption(option);
    echart.on('click',  (params) => {
      if (params.componentType === 'series') {
          // Access the clicked data
          var name = params.name;
          var value = params.value;
  
          console.log('You clicked on', name, 'with value', value);
  
          if(name=='Partial Delivered')
            {
              this.deliverySTtAct('DeliveryStatus','PartialDelivered')
            }
         else   if(name=='Non-EPOD')
              {
                this.deliverySTtAct('DeliveryStatus','NonEpod');
              }
              else   if(name=='EPOD')
                {
                  this.deliverySTtAct('DeliveryStatus','Epod');
                }
                else   if(name=='Geofence')
                  {
                    this.deliverySTtAct('DeliveryStatus','Geofence');
                  }
          
  
          // Perform actions based on the clicked segment
          // alert('You clicked on ' + name + ' with value ' + value);
      }
  });
    
    
  }
  vehicleStAct(status,type)
  {
   
    console.log("vehicleSt")
    $('#summaryModal').modal('show');
    this.typeName=type
    this.SpinnerService.show("summeryvehi")
    var formdat = new FormData()
    formdat.append('AccessToken', this.token)
    formdat.append('StartDate', this.fromdate)
  
    formdat.append('EndDate', this.todate)
    formdat.append('Status', status)
    formdat.append('Type', type)
  
    // this.service.summaryReport(formdat).subscribe((res: any) => {
    //   console.log("res",res)
    //   this.summaryVehicle=res.data
    //   this.SpinnerService.hide("summeryvehi")
    //   // this.masterUploadTable5()
  
    // })
   
  }
  deliverySTtAct(status,type)
  {
    // this.random()
    console.log("vehicleSt")
    $('#deliveryModal').modal('show');
    this.typeName=type
    this.SpinnerService.show("summeryvehi")
    var formdat = new FormData()
    formdat.append('AccessToken', this.token)
    formdat.append('StartDate', this.fromdate)
  
    formdat.append('EndDate', this.todate)
    formdat.append('Status', status)
    formdat.append('Type', type)
  
    // this.service.summaryReport(formdat).subscribe((res: any) => {
    //   console.log("res",res)
    //   this.summaryVehicle=res.data
    //   this.SpinnerService.hide("summeryvehi")
    //   // this.masterUploadTable6()
  
    // })
    // this.masterUploadTable6()
  }
  tripSTtAct(status,type)
  {
    console.log("vehicleSt")
    $('#TripModal').modal('show');
    this.typeName=type
    this.SpinnerService.show("summeryvehi")
    var formdat = new FormData()
    formdat.append('AccessToken', this.token)
    formdat.append('StartDate', this.fromdate)
  
    formdat.append('EndDate', this.todate)
    formdat.append('Status', status)
    formdat.append('Type', type)
  
    // this.service.summaryReport(formdat).subscribe((res: any) => {
    //   console.log("res",res)
    //   this.summaryVehicle=res.data
    //   this.SpinnerService.hide("summeryvehi")
    //   // this.masterUploadTable7()
    // })
  
    // this.masterUploadTable7()
  }
  consSTtAct(status,type)
  {
    console.log("vehicleSt")
    $('#consigtmentModal').modal('show');
    this.typeName=type
    this.SpinnerService.show("summeryvehi")
    var formdat = new FormData()
    formdat.append('AccessToken', this.token)
    formdat.append('StartDate', this.fromdate)
  
    formdat.append('EndDate', this.todate)
    formdat.append('Status', status)
    formdat.append('Type', type)
  
    // this.service.summaryReport(formdat).subscribe((res: any) => {
    //   console.log("res",res)
    //   this.summaryVehicle=res.data
    //   this.SpinnerService.hide("summeryvehi")
    //   // this.masterUploadTable8()
    // })
    // this.masterUploadTable8()
  }
  chartEchart() {
    var cons=this.SummaryData?.mom_vehicle
    var xAxisData = Object.keys(cons);
    var seriesData = Object.values(cons);
  
    console.log("echartschart", cons)
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
    var total_challan:any=[];
    var allotment_mismatch:any=[];
    var in_active:any=[];
    var total_trip_score:any=[];
    var no_gps:any=[];
    // for(let i = 0; i < this.monthSummaryData.length; i++) 
    //   {
    //     total_challan.push(this.monthSummaryData[i].total_challan)
    //     allotment_mismatch.push(this.monthSummaryData[i].allotment_mismatch)
    //     in_active.push(this.monthSummaryData[i].in_active)
    //     total_trip_score.push(this.monthSummaryData[i].total_trip_score)
    //     no_gps.push(this.monthSummaryData[i].no_gps)
    //   }
  
    console.log("chartEchart", this.monthSummaryData);
    let chartDom: any = document.getElementById('linechart');
    chartDom.style.height = '350px'; // Specify units (e.g., pixels)
    chartDom.style.width = '100%';
    // chartDom.style.left = '-20%';
  
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
          // left: 'right',
          // top: '30%',
          bottom: 0,
          textStyle: {
              fontSize: 10,
              fontWeight: 'bold',
              lineHeight: 10,
      },},
      xAxis: {
        type: 'category',
        splitLine: { show: false },
        data: xAxisData,
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
          // name: 'Shipment',
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
          name: 'MOM Vehicle',
          type: 'line',
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
          data: seriesData,
        },
      
      ]
    };
  
    option && this.echart.setOption(option);
    this.chartFlag = true;
    
      if (this.echart) {
        this.echart.resize();
      }
    
    
  }
  chartEchart2() {
    
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
    var cons=this.SummaryData?.chart_data
    const categories = Object.keys(cons.billing_statistics);
    const seriesData1 = categories.map(category => cons.billing_statistics[category]);
    const seriesData2 = categories.map(category => cons.commisions[category]);
    var total_challan:any=[];
    var allotment_mismatch:any=[];
    var in_active:any=[];
    var total_trip_score:any=[];
    var no_gps:any=[];
    // for(let i = 0; i < this.monthSummaryData.length; i++) 
    //   {
    //     total_challan.push(this.monthSummaryData[i].total_challan)
    //     allotment_mismatch.push(this.monthSummaryData[i].allotment_mismatch)
    //     in_active.push(this.monthSummaryData[i].in_active)
    //     total_trip_score.push(this.monthSummaryData[i].total_trip_score)
    //     no_gps.push(this.monthSummaryData[i].no_gps)
    //   }
  
    console.log("chartEchart", this.monthSummaryData);
    let chartDom: any = document.getElementById('barchart');
    chartDom.style.height = '350px'; // Specify units (e.g., pixels)
    chartDom.style.width = '100%';
    // chartDom.style.left = '-20%';
  
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
          name: 'Billing Statistics',
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
          data: seriesData1,
        },
        {
          name: 'Commisions',
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
          data: seriesData2,
        },
      
      ]
    };
  
    option && this.echart.setOption(option);
    this.chartFlag = true;
    
      if (this.echart) {
        this.echart.resize();
      }
    
    
  }
}
