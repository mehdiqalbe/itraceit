import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavService } from 'src/app/shared/services/nav.service';
// import { CrudService } from '../actionable/crud.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import * as echarts from 'echarts';
import { CrudService } from 'src/app/shared/services/crud.service';
declare var $: any;
@Component({
  selector: 'app-ilgic',
  templateUrl: './ilgic.component.html',
  styleUrls: ['./ilgic.component.scss']
})

export class ILGICComponent implements OnInit {
  filterForm_M!: FormGroup;
  ilgicDashboardData:any;



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
     summaryVehicle:any[]=[]
     typeName:any
     show_hover:boolean=false
     Object = Object;

  constructor(private fb: FormBuilder,private navServices: NavService,private modalService: NgbModal,  private router: Router, private service: CrudService,  private SpinnerService: NgxSpinnerService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    let App = document.querySelector('.app')
    // this.navServices.collapseSidebar = this.navServices.collapseSidebar
    App?.classList.add('sidenav-toggled');

    this.token = localStorage.getItem('AccessToken')!
    this.account_id = localStorage.getItem('AccountId')!
    
    // this.chartEchart2()
    this.initForms()
  
     

    this. submit()
    this.chart4()
  }
  submit()
  {
    var js:any={}
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    formdataCustomer.append('GroupId', '0986');
    formdataCustomer.append('UserType', 'master');
    formdataCustomer.append('DataFilter', js);
    
    
    this.service.submitdata(formdataCustomer).subscribe((res: any) => {

      console.log("responce", res);
      this.SummaryData=res.Data;
      this.chart1();
      this.chart2();
      this.chart3();
      this.chart7()
    
    this.chart5()
    this.chart6()
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
                color:['#6ABD46','#97291E','grey','#1D4380'],
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
  
          console.log('You clicked on new', name, 'with value', value);
  
          if(name=='Stop')
            {
              this.consSTtAct('vehicle_status','stop','Stopped');
            }
         else   if(name=='Running')
              {
                this.consSTtAct('vehicle_status','Running','Running');

              }
              else   if(name=='In-Active')
                {
                  this.consSTtAct('vehicle_status','InActive','InActive');

                }
                else   if(name=='Non GPS')
                  {
                    this.consSTtAct('vehicle_status','NonGps','NoGps');
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
  
          if(name=='Existing Client')
            {
              this.tripSTtAct('customer','Existing Client','Existing')

            }
         else   if(name=='New Client')
              {
                this.tripSTtAct('customer','New Client','New');

              }
              // else   if(name=='In-Active')
              //   {
              //     this.tripSTtAct('TripStatus','InActive');
              //   }
              //   else   if(name=='Non GPS')
              //     {
              //       this.tripSTtAct('TripStatus','NonGps');
              //     }
          
  
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
  
          if(name=='GPS')
            {
              this.deliverySTtAct('iot','GPS','Gps')
            }
         else   if(name=='E-Lock')
              {
                this.deliverySTtAct('iot','E-Lock','E-Lock');

              }
              else   if(name=='Fuel Sensor')
                {
                  this.deliverySTtAct('iot','Fuel Sensor','FuelSensor');
                }
                // else   if(name=='Geofence')
                //   {
                //     this.deliverySTtAct('DeliveryStatus','Geofence');
                //   }
          
  
          // Perform actions based on the clicked segment
          // alert('You clicked on ' + name + ' with value ' + value);
      }
  });
    
    
  }
  chart4() {
    var cons=this.SummaryData?.VehicleStatus
    // alert("chart1")
    // let chartDom = document.getElementById('myChart1');
    // let echart = echarts.init(chartDom, {
    //     renderer: 'canvas',
    //     useDirtyRect: false
    // });
    let chartDom:any = document.getElementById('vehicleSt');
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
          display: false,
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
            data: ['Active', 'Tamper','In-Active','Non-GPS'],
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
                color:['#6ABD46','#97291E','grey','#1D4380'],
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
                    // { value: this.trip_status.delayed, name: 'Delayed' },
                    // { value: this.trip_status.without_gps, name: 'W/O GPS' },
                    // { value: 0, name: 'No Data' },
                    { value:cons?.Active, name: 'Active' },
                    { value:cons?.Tamper, name: 'Tamper' },
                    { value: cons?.InActive, name: 'In-Active' },
                    { value: cons?.NoGps, name: 'Non-GPS' },
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
  
          if(name=='Active')
            {
              this.vehicleStAct('VehicleStatus','Active')
            }
         else   if(name=='Non-GPS')
              {
                this.vehicleStAct('VehicleStatus','NonGps');
              }
              else   if(name=='In-Active')
                {
                  this.vehicleStAct('VehicleStatus','InActive');
                }
                else   if(name=='Tamper')
                  {
                    this.vehicleStAct('VehicleStatus','Tamper');
                  }
          
  
          // Perform actions based on the clicked segment
          // alert('You clicked on ' + name + ' with value ' + value);
      }
  });
  }
  chart5()
  {
    var cons=this.SummaryData?.risk_vehicle_status
    let chartDom:any = document.getElementById('barchart1');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '250px'; // Specify units (e.g., pixels)
    chartDom.style.width = '120%';
    chartDom.style.left = '-37%';
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
          // show: true,
          //   orient: 'verticle',
          //   left: 'right',
          //   top:60,
          //   bottom:-6,
          //   textStyle: {
          //     fontSize: 10,
          //     fontweight: 'bold',
          //     lineHeight: 10, // Adjust the line height if necessary
          //     // padding: [-5, 0, 0, 0] // Adjust padding if necessary // Set the font size here
          // },
          show: true,
          orient: 'vertical',
          // left: 'right',
          right: '0%',
          top: '30%',
          bottom: '10%',
          textStyle: {
              fontSize: 10,
              fontWeight: 'bold',
              lineHeight: 10,
          },
          itemHeight: 8,
          itemWidth: 8,
            
        
            data: ['Low Risk Vehicle', 'Average Risk Vehicle','High Risk Vehicle'],
           
            layout: 'horizontal',
              // align: 'right',
              // verticalAlign: 'bottom',
              borderWidth: 0,
              width: '100%',
              height: 'auto',
              
        },
        series: [
            {
                name: 'Shipment',
                type: 'pie',
                radius: '75%',
                // avoidLabelOverlap: false,
                color:['#6ABD46','#1D4380','#97291E'],
                label: {
                    show: true,
                    // position: 'center'
                    position: 'inside',
                    fontSize: '15',
                        // rotate:'145',
                        color:'black',
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
                    { value:cons?.low, name: 'Low Risk Vehicle' },
                    { value:cons?.avg, name: 'Average Risk Vehicle' },
                    { value:cons?.high, name: 'High Risk Vehicle' },
                   
                    
                   
                ]
            }
          //   {
          //     type: 'pie',
          //     radius: ['50'],
          //     silent: true,
          //     color:'white',
             
          //     label: {
          //         show: true,
          //         position: 'center',
          //         color:'#1D4380',
                 
          //         formatter: function(params) {
          //             var total = 0;
          //             for (var i = 0; i < option.series[0].data.length; i++) {
          //                 total += option.series[0].data[i].value;
          //             }
          //             return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
          //             // return  total;
          //         },
          //         fontSize: 16,
          //         fontWeight: 'bold'
          //     },
          //     data: [
          //         {value: 1, name: 'Total'}
          //     ]
          // }
    
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
              // this.tripSTtAct('TripStatus','PartialDelivered')
            }
         else   if(name=='Delayed')
              {
                // this.tripSTtAct('TripStatus','Delay');
              }
              else   if(name=='In-Active')
                {
                  // this.tripSTtAct('TripStatus','InActive');
                }
                else   if(name=='Non GPS')
                  {
                    // this.tripSTtAct('TripStatus','NonGps');
                  }
          
  
          // Perform actions based on the clicked segment
          // alert('You clicked on ' + name + ' with value ' + value);
      }
  });

  }
  ////////////////////////////////////////////////////////////////////
   getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  ///////////////////////////////////////////////////////////////////
  chart6()
  {
    var cons=this.SummaryData?.gps_vendor_status
    var xAxisData = Object.keys(cons);
    var seriesData = Object.values(cons);
    var formattedData = Object.keys(cons).map(function (key) {
      return {
          value: cons[key],
          name: key
      };
  });
  const keysToKeep = ["map_my_india_ILGIC_CV", "Secutrak", "fleetx_bluedart"];
  const filteredData = {};
  let otherValueSum = 0;
  
  for (const [key, value] of Object.entries(cons)) {
    let k:any=value
      if (keysToKeep.includes(key)) {
          filteredData[key] = value;
      } else {
          otherValueSum += k;
      }
  }
  
  filteredData['other'] = otherValueSum;
  const chartData = Object.entries(filteredData).map(([name, value]) => {
    return { name, value };
});
  let coloraray:any=[];
  // coloraray.length = seriesData.length
  for(let i=0;i<seriesData.length;i++) {
    coloraray.push(this.getRandomColor())
  }
  console.log("color",filteredData)
 
    let chartDom:any = document.getElementById('barchart2');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '250px'; // Specify units (e.g., pixels)
    chartDom.style.width = '120%';
    chartDom.style.left = '-20%';
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
          show: true,
        orient: 'vertical',
        // left: 'right',
        right: '0%',
        top: '20%',
        bottom: '10%',
        textStyle: {
            fontSize: 10,
            fontWeight: 'bold',
            lineHeight: 10,
        },
          itemHeight: 8,
          itemWidth: 8,
            
        
            // data: ['Fleetx Vehicle','Secutrak Vehicle','MMI Vehicle', 'Other'],
            // data:filteredData,
            layout: 'horizontal',
              // align: 'right',
              // verticalAlign: 'bottom',
              borderWidth: 0,
              width: '100%',
              height: 'auto',
              
        },
        series: [
            {
                name: 'Shipment',
                type: 'pie',
                radius: '75%',
                // avoidLabelOverlap: false,
                color:['#EC6625','#1D4380','#6ABD46', '#808080'],
                // color:coloraray,
                label: {
                    show: true,
                    // position: 'center'
                    position: 'inside',
                    fontSize: '15',
                        // rotate:'145',
                        color:'black',
                    // formatter: '{c}' // display value
                    formatter: function(params) {
                      var value = params.value;
                    return value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value;
                      // return  total;
                  },
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
                data:chartData
                // data: [
                 
                //     { value:cons?.MMI, name: 'MMI Vehicle' },
                //     { value:cons?.FleetX, name: 'Fleetx Vehicle' },
                //     { value:cons?.Secutrak, name: 'Secutrak Vehicle' },
                   
                // ]
            },
       
    
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
              // this.tripSTtAct('TripStatus','PartialDelivered')
            }
         else   if(name=='Delayed')
              {
                // this.tripSTtAct('TripStatus','Delay');
              }
              else   if(name=='In-Active')
                {
                  // this.tripSTtAct('TripStatus','InActive');
                }
                else   if(name=='Non GPS')
                  {
                    // this.tripSTtAct('TripStatus','NonGps');
                  }
          
  
          // Perform actions based on the clicked segment
          // alert('You clicked on ' + name + ' with value ' + value);
      }
  });

  }
  chart7()
  {
    var cons=this.SummaryData?.vehicle_status_pi
    let chartDom:any = document.getElementById('barchart3');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '250px'; // Specify units (e.g., pixels)
    chartDom.style.width = '100%';
    chartDom.style.left = '0%';
    
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
          show: true,
        orient: 'vertical',
        // left: 'right',
        right: '0',
        top: '30%',
        bottom: '10%',
        textStyle: {
            fontSize: 10,
            fontWeight: 'bold',
            lineHeight: 10,
        },
          itemHeight: 8,
          itemWidth: 8,
            
        
            data: ['Running Vehicle', 'Stopped Vehicle', 'Inactive Vehicle',],
            layout: 'horizontal',
              // align: 'right',
              // verticalAlign: 'bottom',
              borderWidth: 0,
              width: '100%',
              height: 'auto',
              
        },
        series: [
            {
                name: 'Shipment',
                type: 'pie',
                radius: '75%',
                // avoidLabelOverlap: false,
                color:['#6ABD46','#97291E','grey'],
                label: {
                    show: true,
                    // position: 'center'
                    position: 'inside',
                    fontSize: '15',
                        // rotate:'145',
                        color:'black',
                    // formatter: '{c}' // display value
                    formatter: function(params) {
                      var value = params.value;
                      return value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value;
                      // return  total;
                  },
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
                    { value:cons?.running, name: 'Running Vehicle' },
                    { value:cons?.stoppage, name: 'Stopped Vehicle' },
                    { value:cons?.inactive, name: 'Inactive Vehicle' },
                   
                ]
            }
          //   {
          //     type: 'pie',
          //     radius: ['50'],
          //     silent: true,
          //     color:'white',
             
          //     label: {
          //         show: true,
          //         position: 'center',
          //         color:'#1D4380',
                 
          //         formatter: function(params) {
          //             var total = 0;
          //             for (var i = 0; i < option.series[0].data.length; i++) {
          //                 total += option.series[0].data[i].value;
          //             }
          //             return total >= 1000 ? (total / 1000).toFixed(1) + 'k' : total;
          //             // return  total;
          //         },
          //         fontSize: 16,
          //         fontWeight: 'bold'
          //     },
          //     data: [
          //         {value: 1, name: 'Total'}
          //     ]
          // }
    
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
              // this.tripSTtAct('TripStatus','PartialDelivered')
            }
         else   if(name=='Delayed')
              {
                // this.tripSTtAct('TripStatus','Delay');
              }
              else   if(name=='In-Active')
                {
                  // this.tripSTtAct('TripStatus','InActive');
                }
                else   if(name=='Non GPS')
                  {
                    // this.tripSTtAct('TripStatus','NonGps');
                  }
          
  
          // Perform actions based on the clicked segment
          // alert('You clicked on ' + name + ' with value ' + value);
      }
  });
  // const style = document.createElement('style');
  //   style.innerHTML = `
  //       @media (max-width: 600px) {
  //           #barchart3 .echarts-legend {
  //               font-size: 8px !important;
  //               itemHeight: 6 !important;
  //               itemWidth: 6 !important;
  //           }
  //       }
        
  //       @media (min-width: 600px) and (max-width: 1024px) {
  //           #barchart3 .echarts-legend {
  //               font-size: 10px !important;
  //               itemHeight: 8 !important;
  //               itemWidth: 8 !important;
  //           }
  //       }
        
  //       @media (min-width: 1024px) {
  //           #barchart3 .echarts-legend {
  //               font-size: 12px !important;
  //               itemHeight: 10 !important;
  //               itemWidth: 10 !important;
  //           }
  //       }
  //   `;
  //   document.head.appendChild(style);
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
deliverySTtAct(status,type,flag)
{
  this.summaryVehicle=[]
  // this.random()
  console.log("vehicleSt")
  $('#IotModal').modal('show');
  this.typeName=type
  // this.SpinnerService.show("summeryvehi")
  var formdat = new FormData()
  formdat.append('AccessToken', this.token)
  // formdat.append('StartDate', this.fromdate)

  // formdat.append('EndDate', this.todate)
  formdat.append('sub_type', status)
  formdat.append('type', "master")

  this.service.chartclickS(formdat).subscribe((res: any) => {
    console.log("res",res)
    for (const [key, value] of Object.entries(res.Data)) 
      {

        if (key==flag)
          {
            this.summaryVehicle.push(value)
          }
    }
  //   this.summaryVehicle=res.data
  //   this.SpinnerService.hide("summeryvehi")
  //   // this.masterUploadTable8()
  // console.log("masterUploadTable",this.summaryVehicle)
  this.masterUploadTable2()
  })

  // this.masterUploadTable6()
}
tripSTtAct(status,type,flag)
{
  this.summaryVehicle=[]
  console.log("vehicleSt")
  $('#deliveryModal').modal('show');
  this.typeName=type
  // this.SpinnerService.show("summeryvehi")
  var formdat = new FormData()
  formdat.append('AccessToken', this.token)
  // formdat.append('StartDate', this.fromdate)

  // formdat.append('EndDate', this.todate)
  formdat.append('sub_type', status)
  formdat.append('type', "master")

  this.service.chartclickS(formdat).subscribe((res: any) => {
    console.log("res",res)
    for (const [key, value] of Object.entries(res.Data)) 
      {

        if (key==flag)
          {
            this.summaryVehicle.push(value)
          }
    }
  //   this.summaryVehicle=res.data
  //   this.SpinnerService.hide("summeryvehi")
  //   // this.masterUploadTable8()
  console.log("masterUploadTable",this.summaryVehicle)
  this.masterUploadTable1()
  })


}
consSTtAct(status,type,flag)
{
  this.summaryVehicle=[]
  console.log("vehicleSt")
  $('#summaryModal').modal('show');
  this.typeName=type
  this.SpinnerService.show("summeryvehi")
  var formdat = new FormData()
  formdat.append('AccessToken', this.token)
  // formdat.append('StartDate', this.fromdate)

  // formdat.append('EndDate', this.todate)
  formdat.append('sub_type', status)
  formdat.append('type', "master")

  this.service.chartclickS(formdat).subscribe((res: any) => {
    console.log("res",res)

    let data = res.Data
    for (const [key, value] of Object.entries(data)) 
      {
        if (key==flag)
          {
            this.summaryVehicle.push(value)
          }
    }
  //   this.summaryVehicle=res.data
    this.SpinnerService.hide("summeryvehi")
    this.masterUploadTable()
  console.log("data",this.summaryVehicle)
  })
  // this.masterUploadTable8()
 
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
  chartDom.style.height = '260px'; // Specify units (e.g., pixels)
  chartDom.style.width = '120%';
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
        // left: 'right',
        // top: '30%',
        bottom: '0',
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
  const categories = Object.keys(cons.startegic_fleet_universe);
  const seriesData1 = categories.map(category => cons.startegic_fleet_universe[category]);
  const seriesData2 = categories.map(category => cons.vas_penetration[category]);
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
  chartDom.style.height = '260px'; // Specify units (e.g., pixels)
  chartDom.style.width = '130%';
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
      // left: 'bottom',
      // top: '30%',
      bottom: '0',
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
        name: 'Strategic Fleet Universe',
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
        data: seriesData1,
      },
      {
        name: 'VAS Penetration',
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
masterUploadTable()
{




 var tbl = $('#vehicleTable')
 var table = $('#vehicleTable').DataTable();
 table.clear()
 table.destroy();
 // table.draw()
 // $('#masterUpload').DataTable().clear;
 // if(datatable.length!=)
 // console.log("table length",datatable.length)
 //  $('#masterUpload tbody').empty();



 $(document).ready(function () {



   $('#vehicleTable').DataTable({


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
masterUploadTable1()
{




 var tbl = $('#customerTable')
 var table = $('#customerTable').DataTable();
 table.clear()
 table.destroy();
 // table.draw()
 // $('#masterUpload').DataTable().clear;
 // if(datatable.length!=)
 // console.log("table length",datatable.length)
 //  $('#masterUpload tbody').empty();



 $(document).ready(function () {



   $('#customerTable').DataTable({


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
masterUploadTable2()
{




 var tbl = $('#IotTable')
 var table = $('#IotTable').DataTable();
 table.clear()
 table.destroy();
 // table.draw()
 // $('#masterUpload').DataTable().clear;
 // if(datatable.length!=)
 // console.log("table length",datatable.length)
 //  $('#masterUpload tbody').empty();



 $(document).ready(function () {



   $('#IotTable').DataTable({


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



////////////////////////////////////////Mehdi Updated Code////////////////////////////////////////////////////////////

initForms(): void {
  this.filterForm_M = this.fb.group(
    {
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      customer_id: [null, Validators.required],
      gps_vendor: [null, Validators.required],
      agent_id: [null, Validators.required],
    },
    // { validators: dateRangeValidator() }
  );

   this.qFetchDashboardData()
}
// fetchTransporters(): void {
//   const formData = new FormData();
//   formData.append('AccessToken', this.token);

//   this.service.getTransporter(formData).subscribe(
//     (response) => {
//       this.customerList = response;
//       console.log(response);
//     },
//     (error) => {
//       console.error('Error sending data:', error);
//     }
//   );
// }
qFetchDashboardData(){
  console.log("qFetchDashboardData");
  
  const formData = new FormData();
  formData.append('AccessToken', this.token);
  formData.append('filter_data',"")
  
  this.service.getQCVDashboard(formData).subscribe(
    (response) => {
      this.ilgicDashboardData=response?.Data
      console.log(response,"ilgic data");
    },
    (error) => {
      console.error('Error sending data:', error);
    }
  );
}
qFetchFilterData(){
  const formData = new FormData();
  formData.append('AccessToken', this.token);
  formData.append('filter_data',JSON.stringify(this.filterForm_M.value))
  console.log(formData,"filterForm ilgic");
  
  this.service.getQCVDashboard(formData).subscribe(
    (response) => {
      console.log(response,"filter ilgic data");
    },
    (error) => {
      console.error('Error sending data:', error);
    }
  );
}
onFilterConsolidatedDashboard(){
  console.log(this.filterForm_M);
  this.qFetchFilterData()
  
}

}
// $(document).ready(() => {
//   let count=1;

//   // Adding row on click to Add New Row button
//   $('#addBtn').click(function () {
//       let dynamicRowHTML = `
//       <tr class="rowClass""> 
//           <td class="row-index text-center"> 
//               Dynamically added Row ${count}
//           </td> 
//           <td class="text-center"> 
//               <button class="btn btn-danger remove"
//                   type="button">Remove
//               </button> 
//           </td> 
//       </tr>`;
//       $('#tbody').append(dynamicRowHTML);
//       count++;
//   });

//   // Removing Row on click to Remove button
//   $('#tbody').on('click', '.remove', function(this: any) {
//       $(this).parent('td.text-center').parent('tr.rowClass').remove(); 
      
//   });
// })

