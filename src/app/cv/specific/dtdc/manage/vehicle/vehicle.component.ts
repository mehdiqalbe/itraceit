import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { NavService } from 'src/app/shared/services/nav.service';
import {
  NgbAccordion,
  NgbModal,
  NgbPanelChangeEvent,
} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { DatePipe } from '@angular/common';
import { dateRangeValidator } from 'src/app/shared/validations/dateValidators';
import { NgxSpinnerService } from 'ngx-spinner';
import * as echarts from 'echarts';

declare var $: any;
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
 ///////////////////////mehndir////////////////
 totalBids: number = 100; // Example value
 pendingBids: number = 20; // Example value
 completedBids: number = 70; // Example value
 canceledBids: number = 10; //
 showOrderTile = true;

 vehicleCapacityType: any = '';
 vehicleBodyType: any = '';
 vehicleFuelType: any = '';
 vehicleCategory: any = '';
 vehicleMake: any = '';
 vehicleModel: any = '';
 vehicleDocumentType: any = '';
 selectVehicleIds: Array<any> = [];
 qallVehicleSelected: boolean = false;
 vehicleTableData: Array<any> = [];
 filterForm_Q!: FormGroup;
 ShipmentNo: any;
 token: any = '';
 fullres: any = [];

 driverDashboardData: any = {};
 vehicleDashboardData: any = {};
 driverTableData: Array<any> = [];

 isLoadingDriverTable: Boolean = true;
 allDriverSelected: boolean = false;
 selectedDriverIds: Array<any> = [];
 account_id: any;
  datetimepicker1: any;
  group_id: any;
  GroupTypeId: any;
  // isLoadingVehicleTable: boolean;
  isqVehicleChartLoading: Boolean = true;
  isLoadingVehicleTable: boolean = true;
  venderList: any;
  constructor(
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private navServices: NavService,
    private modalService: NgbModal,
    private router: Router,
    private datepipe: DatePipe,
    private crudService: CrudService,
    private service: CrudService,
    private SpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('AccessToken')!;
    console.log('token', this.token);
    this.account_id = localStorage.getItem('AccountId')!;
    this.datetimepicker1 = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.group_id = localStorage.getItem('GroupId')!;
    this.GroupTypeId = localStorage.getItem('GroupTypeId')!;
  this.transporterDataF()
    const state = window.history.state;
    if (state?.tab === 'driver') {
      $('#nav-Driver-tab').click();
    } else if (state?.tab == 'vehicle') {
      $('#nav-Vehicle-tab').click();
    }
    console.log(state, 'navigation');

  }
  transporterDataF() {
    var formdataCustomer = new FormData();
    formdataCustomer.append('AccessToken', this.token);
    // formdataCustomer.append('GroupId', '0986');
    // formdataCustomer.append('UserType', 'master');
    // formdataCustomer.append('DataFilter', js);

    this.service.venderListS(formdataCustomer).subscribe((res: any) => {
      console.log('res', res);
      this.venderList = res?.Filter?.customer;
    });
  }
  switch(vehicleData: any = null) {
    this.router.navigate(['/VehicleEdit/'], {
      state: {
        vehicle: vehicleData,
        filters: this.vehicleDashboardData?.listing_data?.filters_name,
      },
    });
  }
  switch2(driverData: any = null) {
    this.router.navigate(['/ILgic/Driver_dashboared'], {
      state: { driver: driverData },
    });
    console.log(driverData);
  }
  sidebarToggle() {
    let App = document.querySelector('.app');
    if (
      (this.navServices.collapseSidebar = !this.navServices.collapseSidebar)
    ) {
      App?.classList.remove('sidenav-toggled');
    } else {
      App?.classList.add('sidenav-toggled');
    }
  }
  getDocumentPath(item: any, docTypeId: number): string | null {
    if (item?.document?.length) {
      const doc = item?.document?.find((d: any) => d.doc_type_id === docTypeId);

      return doc ? doc.file_path : null;
    }
    return null;
  }

  onVehicleFilter(value: any) {
    var formdata: any = new FormData();
    formdata.append('AccessToken', this.token);
    formdata.append('from_date', value?.from_date || '');
    formdata.append('to_date', value?.to_date || '');
    this.isLoadingVehicleTable = true;
    // console.log(value);
    this.service.vehicleDashboard(formdata).subscribe((res: any) => {
      this.isLoadingVehicleTable = false;

      this.vehicleDashboardData = res?.Data;
      this.vehicleTableData =
        this.vehicleDashboardData?.listing_data?.vehicle_data;
      // console.log('vehicleTableData', this.vehicleTableData);

      // this.vehicleDashboardData = res.Data;
      // console.log(this.fullres);

      // this.chart1();
      // // this.chart2()
      // this.chart3();
      // this.chart4();
      this.masterUploadTable();
    });
  }
  vehicleDashboard() {
    var formdata: any = new FormData();
    formdata.append('AccessToken', this.token);
    formdata.append('from_date', '');
    formdata.append('to_date', '');
    this.isqVehicleChartLoading = true;
    this.isLoadingVehicleTable = true;
    this.service.vehicleDashboard(formdata).subscribe((res: any) => {
      this.isqVehicleChartLoading = false;
      this.isLoadingVehicleTable = false;
      this.vehicleDashboardData = res?.Data;
      this.vehicleTableData =
        this.vehicleDashboardData?.listing_data?.vehicle_data;
      this.vehicleCategory =
        this.vehicleDashboardData?.listing_data?.filters_name?.category;
      this.vehicleMake =
        this.vehicleDashboardData?.listing_data?.filters_name?.make;
      this.vehicleModel =
        this.vehicleDashboardData?.listing_data?.filters_name?.model;
      this.vehicleFuelType =
        this.vehicleDashboardData?.listing_data?.filters_name?.vehicle_FuelType;
      this.vehicleBodyType =
        this.vehicleDashboardData?.listing_data?.filters_name?.vehicle_body_type;
      this.vehicleCapacityType =
        this.vehicleDashboardData?.listing_data?.filters_name?.vehicle_capacity_data;
      this.vehicleDocumentType =
        this.vehicleDashboardData?.listing_data?.filters_name?.vehicle_DocType;
      // console.log(this.vehicleTableData, 'aman');
      // console.log(this.vehicleModel);
      this.chart1();
      // this.chart2()
      this.chart3();
      this.chart4();
      this.masterUploadTable();
    });
  }
  qtoggleVehcileAllSelection() {
    this.qallVehicleSelected = !this.qallVehicleSelected;
    if (this.qallVehicleSelected) {
      this.selectVehicleIds = [];
      console.log(this.vehicleTableData);

      this.vehicleTableData?.forEach((item, index) => {
        this.selectVehicleIds.push(item?.vehicle?.id);
      });
    } else {
      this.selectVehicleIds = [];
    }
    console.log('selected', this.selectVehicleIds);
  }

  qtoggleVehicleSelection(itemId: any) {
    const index = this.selectVehicleIds.indexOf(itemId);
    if (index > -1) {
      this.selectVehicleIds.splice(index, 1);
    } else {
      this.selectVehicleIds.push(itemId);
    }
    this.qallVehicleSelected =
      this.selectVehicleIds.length === this.vehicleTableData?.length;
    console.log('selected', JSON.stringify(this.selectVehicleIds));
  }
  isVehicleSelected(itemId: any): boolean {
    return this.selectVehicleIds.includes(itemId);
  }

  updateVehicleStatus(status: string, values) {
    let vehicleID = this.selectVehicleIds.reduce((acc, id, index) => {
      acc[index] = String(id);
      return acc;
    }, {});
    const formData = new FormData();
    formData.append('AccessToken', this.token);
    formData.append('action', status);
    formData.append('vehicle_id', JSON.stringify(vehicleID));
    console.log(formData);
    if (confirm(`Do you want to ${status}?`)) {
      this.service.vehicleUpdateStatus(formData).subscribe(
        (res: any) => {
          console.log(res);
          //  this.isLoadingDriverTable=true
          this.selectVehicleIds = [];
          this.onVehicleFilter(values);
        },
        (error) => {
          console.error('Error:', error);
          // Handle the error accordingly
        }
      );
    } else {
      console.log('cancelled');
    }
  }
  chart1() {
    // var cons=this.SummaryData?.vehicleStatus;
    // console.log("Cons", cons);
    // alert("chart1")
    // let chartDom = document.getElementById('myChart1');
    // let echart = echarts.init(chartDom, {
    //     renderer: 'canvas',
    //     useDirtyRect: false
    // });
    let chartDom: any = document.getElementById('consSt');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '150px'; // Specify units (e.g., pixels)
    chartDom.style.width = '150px';

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
          name: 'Shipment',
          type: 'pie',
          radius: ['40%', '70%'],
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
              fontSize: '15',
              color: 'white',
              // rotate:'145',
              fontWeight: 'bold',
            },
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
              value: this.vehicleDashboardData?.vehicle?.existing_vehicle,
              name: 'Existing Transporter',
            },
            {
              value: this.vehicleDashboardData?.vehicle?.new_vehicle,
              name: 'New Transporter',
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

  chart2() {
    // var cons=this.SummaryData?.customer

    // alert("chart1")
    // let chartDom = document.getElementById('myChart1');
    // let echart = echarts.init(chartDom, {
    //     renderer: 'canvas',
    //     useDirtyRect: false
    // });
    let chartDom: any = document.getElementById('tripSt');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '150px'; // Specify units (e.g., pixels)
    chartDom.style.width = '150px';

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

        // data: ['Existing Client', 'New Client'],
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
          color: ['#EC6625', '#1D4380', '#613704'],
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
              fontSize: '15',
              color: 'white',
              // rotate:'145',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            //

            // { value:cons?.PartialDelivered, name: 'Partial Delivered' },
            // { value:cons?.Delayed, name: 'Delayed' },
            // { value: cons?.InActive, name: 'In-Active' },
            // { value: cons?.NoGps, name: 'Non GPS' },
            {
              value: this.vehicleDashboardData?.body_type?.existing_vehicle,
              name: 'Heavy Duty',
            },
            { value: 40, name: 'Medium Duty ' },
            { value: 30, name: 'Light Duty' },
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
    //   echart.on('click',  (params) => {
    // //     if (params.componentType === 'series') {
    // //         // Access the clicked data
    // //         var name = params.name;
    // //         var value = params.value;

    // //         console.log('You clicked on', name, 'with value', value);

    // //         if(name=='Partial Delivered')
    // //           {
    // //             this.tripSTtAct('TripStatus','PartialDelivered')
    // //           }
    // //        else   if(name=='Delayed')
    // //             {
    // //               this.tripSTtAct('TripStatus','Delay');
    // //             }
    // //             else   if(name=='In-Active')
    // //               {
    // //                 this.tripSTtAct('TripStatus','InActive');
    // //               }
    // //               else   if(name=='Non GPS')
    // //                 {
    // //                   this.tripSTtAct('TripStatus','NonGps');
    // //                 }

    // //         // Perform actions based on the clicked segment
    // //         // alert('You clicked on ' + name + ' with value ' + value);
    // //     }
    // // });
  }

  chart3() {
    // var cons=this.SummaryData?.Iot

    // alert("chart1")
    // let chartDom = document.getElementById('myChart1');
    // let echart = echarts.init(chartDom, {
    //     renderer: 'canvas',
    //     useDirtyRect: false
    // });
    let chartDom: any = document.getElementById('deliverySt');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '150px'; // Specify units (e.g., pixels)
    chartDom.style.width = '150px';

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
        // data: ['GPS', 'E-Lock','Fuel Sensor'],
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
          color: ['#EC6625', '#1D4380', 'rgb(253, 195, 5)'],
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
              fontSize: '15',
              color: 'white',
              // rotate:'145',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            // { value:cons?.PartialDelivered, name: 'GPS' },
            // { value:cons?.NonEpod, name: 'E-Lock'},
            // { value: cons?.Epod, name: 'Fuel Sensor'},
            {
              value: this.vehicleDashboardData?.body_type?.open_body,
              name: 'Open Body',
            },
            {
              value: this.vehicleDashboardData?.body_type?.closed_body,
              name: 'Closed Body',
            },
            {
              value: this.vehicleDashboardData?.body_type?.container,
              name: 'Container',
            },
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
    //   echart.on('click',  (params) => {
    //     if (params.componentType === 'series') {
    //         // Access the clicked data
    //         var name = params.name;
    //         var value = params.value;

    //         console.log('You clicked on', name, 'with value', value);

    //         if(name=='Partial Delivered')
    //           {
    //             this.deliverySTtAct('DeliveryStatus','PartialDelivered')
    //           }
    //        else   if(name=='Non-EPOD')
    //             {
    //               this.deliverySTtAct('DeliveryStatus','NonEpod');
    //             }
    //             else   if(name=='EPOD')
    //               {
    //                 this.deliverySTtAct('DeliveryStatus','Epod');
    //               }
    //               else   if(name=='Geofence')
    //                 {
    //                   this.deliverySTtAct('DeliveryStatus','Geofence');
    //                 }

    //         // Perform actions based on the clicked segment
    //         // alert('You clicked on ' + name + ' with value ' + value);
    //     }
    // });
  }

  chart4() {
    // var cons=this.SummaryData?.VehicleStatus
    // alert("chart1")
    // let chartDom = document.getElementById('myChart1');
    // let echart = echarts.init(chartDom, {
    //     renderer: 'canvas',
    //     useDirtyRect: false
    // });
    let chartDom: any = document.getElementById('vehicleSt');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '150px'; // Specify units (e.g., pixels)
    chartDom.style.width = '150px';

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
        display: false,
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
        // data: ['Active', 'Tamper','In-Active','Non-GPS'],
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
          color: ['#EC6625', '#1D4380', '#613704'],
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
              fontSize: '15',
              color: 'white',
              // rotate:'145',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            //
            // { value: this.trip_status.delayed, name: 'Delayed' },
            // { value: this.trip_status.without_gps, name: 'W/O GPS' },
            // { value: 0, name: 'No Data' },
            {
              value: this.vehicleDashboardData?.vehicle_rating?.less_than_two,
              name: 'Less Than 2',
            },
            {
              value: this.vehicleDashboardData?.vehicle_rating?.two_to_four,
              name: '2 TO 4',
            },
            {
              value: this.vehicleDashboardData?.vehicle_rating?.more_than_four,
              name: 'Less Than 4',
            },
            // { value: 6, name: 'Non-GPS' },
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
    //   echart.on('click',  (params) => {
    //     if (params.componentType === 'series') {
    //         // Access the clicked data
    //         var name = params.name;
    //         var value = params.value;

    //         console.log('You clicked on', name, 'with value', value);

    //         if(name=='Active')
    //           {
    //             this.vehicleStAct('VehicleStatus','Active')
    //           }
    //        else   if(name=='Non-GPS')
    //             {
    //               this.vehicleStAct('VehicleStatus','NonGps');
    //             }
    //             else   if(name=='In-Active')
    //               {
    //                 this.vehicleStAct('VehicleStatus','InActive');
    //               }
    //               else   if(name=='Tamper')
    //                 {
    //                   this.vehicleStAct('VehicleStatus','Tamper');
    //                 }

    //         // Perform actions based on the clicked segment
    //         // alert('You clicked on ' + name + ' with value ' + value);
    //     }
    // });
  }

  chartD1() {
    // var cons=this.SummaryData?.vehicleStatus;
    // console.log("Cons", cons);
    // alert("chart1")
    // let chartDom = document.getElementById('myChart1');
    // let echart = echarts.init(chartDom, {
    //     renderer: 'canvas',
    //     useDirtyRect: false
    // });
    let chartDom: any = document.getElementById('DconsSt');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '150px'; // Specify units (e.g., pixels)
    chartDom.style.width = '150px';

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
        // width: '100%',
      },
      series: [
        {
          name: 'Shipment',
          type: 'pie',
          radius: ['40%', '70%'],
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
              fontSize: '15',
              color: 'white',
              // rotate:'145',
              fontWeight: 'bold',
            },
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
              value:
                this.driverDashboardData?.Driver_Enrollment
                  ?.Authenticated_Drivers,
              name: 'Authenticated Drivers',
            },
            {
              value:
                this.driverDashboardData?.Driver_Enrollment?.Enrolled_Drivers,
              name: 'Enrolled Drivers',
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

  chartD2() {
    // var cons=this.SummaryData?.customer

    // alert("chart1")
    // let chartDom = document.getElementById('myChart1');
    // let echart = echarts.init(chartDom, {
    //     renderer: 'canvas',
    //     useDirtyRect: false
    // });
    let chartDom: any = document.getElementById('DtripSt');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '150px'; // Specify units (e.g., pixels)
    chartDom.style.width = '150px';

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

        // data: ['Existing Client', 'New Client'],
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
          color: ['#EC6625', '#1D4380', '#613704'],
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
              fontSize: '15',
              color: 'white',
              // rotate:'145',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            //

            // { value:cons?.PartialDelivered, name: 'Partial Delivered' },
            // { value:cons?.Delayed, name: 'Delayed' },
            // { value: cons?.InActive, name: 'In-Active' },
            // { value: cons?.NoGps, name: 'Non GPS' },
            {
              value: this.driverDashboardData?.Vehicle_Types?.Heavy_Duty,
              name: 'Heavy Duty',
            },
            {
              value: this.driverDashboardData?.Vehicle_Types?.Medium_Duty,
              name: 'Medium Duty ',
            },
            {
              value: this.driverDashboardData?.Vehicle_Types?.Light_Duty,
              name: 'Light Duty',
            },
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
    //   echart.on('click',  (params) => {
    // //     if (params.componentType === 'series') {
    // //         // Access the clicked data
    // //         var name = params.name;
    // //         var value = params.value;

    // //         console.log('You clicked on', name, 'with value', value);

    // //         if(name=='Partial Delivered')
    // //           {
    // //             this.tripSTtAct('TripStatus','PartialDelivered')
    // //           }
    // //        else   if(name=='Delayed')
    // //             {
    // //               this.tripSTtAct('TripStatus','Delay');
    // //             }
    // //             else   if(name=='In-Active')
    // //               {
    // //                 this.tripSTtAct('TripStatus','InActive');
    // //               }
    // //               else   if(name=='Non GPS')
    // //                 {
    // //                   this.tripSTtAct('TripStatus','NonGps');
    // //                 }

    // //         // Perform actions based on the clicked segment
    // //         // alert('You clicked on ' + name + ' with value ' + value);
    // //     }
    // // });
  }

  chartD3() {
    // var cons=this.SummaryData?.Iot

    // alert("chart1")
    // let chartDom = document.getElementById('myChart1');
    // let echart = echarts.init(chartDom, {
    //     renderer: 'canvas',
    //     useDirtyRect: false
    // });
    let chartDom: any = document.getElementById('DdeliverySt');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '150px'; // Specify units (e.g., pixels)
    chartDom.style.width = '150px';

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
        // data: ['GPS', 'E-Lock','Fuel Sensor'],
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
          color: ['#EC6625', '#1D4380', '#613704'],
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
              fontSize: '15',
              color: 'white',
              // rotate:'145',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            // { value:cons?.PartialDelivered, name: 'GPS' },
            // { value:cons?.NonEpod, name: 'E-Lock'},
            // { value: cons?.Epod, name: 'Fuel Sensor'},
            {
              value:
                this.driverDashboardData?.Driver_Experience?.Less_than_5_yrs,
              name: 'Less than 5 years',
            },
            {
              value:
                this.driverDashboardData?.Driver_Experience
                  ?.Between_5_to_10_yrs,
              name: 'Between 5 to 10 years',
            },
            {
              value:
                this.driverDashboardData?.Driver_Experience?.More_than_10_yrs,
              name: 'More than 10 years',
            },
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
    //   echart.on('click',  (params) => {
    //     if (params.componentType === 'series') {
    //         // Access the clicked data
    //         var name = params.name;
    //         var value = params.value;

    //         console.log('You clicked on', name, 'with value', value);

    //         if(name=='Partial Delivered')
    //           {
    //             this.deliverySTtAct('DeliveryStatus','PartialDelivered')
    //           }
    //        else   if(name=='Non-EPOD')
    //             {
    //               this.deliverySTtAct('DeliveryStatus','NonEpod');
    //             }
    //             else   if(name=='EPOD')
    //               {
    //                 this.deliverySTtAct('DeliveryStatus','Epod');
    //               }
    //               else   if(name=='Geofence')
    //                 {
    //                   this.deliverySTtAct('DeliveryStatus','Geofence');
    //                 }

    //         // Perform actions based on the clicked segment
    //         // alert('You clicked on ' + name + ' with value ' + value);
    //     }
    // });
  }

  chartD4() {
    // var cons=this.SummaryData?.VehicleStatus
    // alert("chart1")
    // let chartDom = document.getElementById('myChart1');
    // let echart = echarts.init(chartDom, {
    //     renderer: 'canvas',
    //     useDirtyRect: false
    // });
    let chartDom: any = document.getElementById('DvehicleSt');
    //  var echart = echarts.init(chartDom);
    chartDom.style.height = '150px'; // Specify units (e.g., pixels)
    chartDom.style.width = '150px';

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
        display: false,
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
        // data: ['Active', 'Tamper','In-Active','Non-GPS'],
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
          color: ['#EC6625', '#1D4380', '#613704'],
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
              fontSize: '15',
              color: 'white',
              // rotate:'145',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            //
            // { value: this.trip_status.delayed, name: 'Delayed' },
            // { value: this.trip_status.without_gps, name: 'W/O GPS' },
            // { value: 0, name: 'No Data' },
            {
              value: this.driverDashboardData?.Driver_Rating?.Less_than_2,
              name: 'Less Than 2',
            },
            {
              value: this.driverDashboardData?.Driver_Rating?.Between_2_to_4,
              name: '2 TO 4',
            },
            {
              value: this.driverDashboardData?.Driver_Rating?.More_than_4,
              name: 'More Than 4',
            },
            // { value: 6, name: 'Non-GPS' },
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
    //   echart.on('click',  (params) => {
    //     if (params.componentType === 'series') {
    //         // Access the clicked data
    //         var name = params.name;
    //         var value = params.value;

    //         console.log('You clicked on', name, 'with value', value);

    //         if(name=='Active')
    //           {
    //             this.vehicleStAct('VehicleStatus','Active')
    //           }
    //        else   if(name=='Non-GPS')
    //             {
    //               this.vehicleStAct('VehicleStatus','NonGps');
    //             }
    //             else   if(name=='In-Active')
    //               {
    //                 this.vehicleStAct('VehicleStatus','InActive');
    //               }
    //               else   if(name=='Tamper')
    //                 {
    //                   this.vehicleStAct('VehicleStatus','Tamper');
    //                 }

    //         // Perform actions based on the clicked segment
    //         // alert('You clicked on ' + name + ' with value ' + value);
    //     }
    // });
  }

  scrollButtonB() {
    // this.scrollFlag=true
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }
  ////////////////////
  masterUploadTable2() {
    var tbl = $('#DmasterUpload');
    var table = $('#DmasterUpload').DataTable();
    table.clear();
    table.destroy();
    // table.draw()
    // $('#masterUpload').DataTable().clear;
    // if(datatable.length!=)
    // console.log("table length",datatable.length)
    //  $('#masterUpload tbody').empty();

    $(document).ready(function () {
      $('#DmasterUpload').DataTable({
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

            exportOptions: {
              columns: ':visible',
            },
            title: 'dashboard_repor',
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
            // customize: function (doc) {
            //   var colCount = new Array();
            //   $(tbl)
            //     .find('tbody tr:first-child td')
            //     .each(() => {
            //       if ($(this).attr('colspan')) {
            //         for (var i = 1; i <= $(this).attr('colspan'); i++) {
            //           colCount.push('*');
            //         }
            //       } else {
            //         colCount.push('*');
            //       }
            //     });
            //   doc.content[1].table.widths = colCount;
            // },

            exportOptions: {
              columns: ':visible',
              //  columns: [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 ]
            },
            title: 'dashboard_repor',
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

    //  setTimeout(() => {
    //  this.SpinnerService.hide();
    // console.log("Timeout")
    //  this.SpinnerService.hide("LastAlert")

    //  }, 3000);

    // console.log("table length2",datatable.length)
  }
  masterUploadTable() {
    var tbl = $('#masterUpload');
    var table = $('#masterUpload').DataTable();
    table.clear();
    table.destroy();
    // table.draw()
    // $('#masterUpload').DataTable().clear;
    // if(datatable.length!=)
    // console.log("table length",datatable.length)
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

            exportOptions: {
              columns: ':visible',
            },
            title: 'dashboard_repor',
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
            // customize: function (doc) {
            //   var colCount = new Array();
            //   $(tbl)
            //     .find('tbody tr:first-child td')
            //     .each(() => {
            //       if ($(this).attr('colspan')) {
            //         for (var i = 1; i <= $(this).attr('colspan'); i++) {
            //           colCount.push('*');
            //         }
            //       } else {
            //         colCount.push('*');
            //       }
            //     });
            //   doc.content[1].table.widths = colCount;
            // },

            exportOptions: {
              columns: ':visible',
              //  columns: [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 ]
            },
            title: 'dashboard_repor',
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

    //  setTimeout(() => {
    //  this.SpinnerService.hide();
    // console.log("Timeout")
    //  this.SpinnerService.hide("LastAlert")

    //  }, 3000);

    // console.log("table length2",datatable.length)
  }
}
