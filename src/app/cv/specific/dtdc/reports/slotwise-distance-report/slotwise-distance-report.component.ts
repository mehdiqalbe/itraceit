import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/shared/services/nav.service';
import { DtdcService } from '../../services/dtdc.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-slotwise-distance-report',
  templateUrl: './slotwise-distance-report.component.html',
  styleUrls: ['./slotwise-distance-report.component.scss']
})
export class SlotwiseDistanceReportComponent implements OnInit {
  token: any;
  filterObject:any={
    regions: [], // Replace with your regions
    startTimes: [] as string[],
    slotHours: [] as string[],
    days: [] as number[],
    origin:{},
    destination:{},
    route:{},
    etaDelay:{},
    routeCategory:{},
    routeType:{}
  }
  report:any={label:'standard',type:'default',data:[]}
  showTable:boolean=false
  exceptionDateRange = { min: '', max: '' };
  exceptionDate=[];
  selectedVehicles: any[] = []; // Holds selected vehicle IDs
  vehicleOptions: { id:any; name:any }[] = [];
  constructor(private datepipe: DatePipe,private navServices: NavService,private dtdcServices:DtdcService,private service:CrudService,private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.generateDays()
    this.generateSlotHours()
    this.generateStartTimes()
    this.token=localStorage.getItem("AccessToken");
    // this.end(new Date(),"")
    this.initApiCalls()
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


  end(date,days): void {
    const dateObject = new Date(date);
    if (!date || !days) {
      alert("Please select a start date first.");
      return;
    }
    if (isNaN(dateObject.getTime())) {
      console.error("Invalid date provided.");
      return;
    }
  
    const startDate = dateObject;
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + days-1);
  console.log(this.exceptionDate);
  
    // Prevent reinitializing if already configured
    if (!$("#datepicker1").data('datepicker')) {
      $("#datepicker1").datepicker({
        format: "yyyy-mm-dd",
        multidate: true,
        todayBtn: "linked",
        autoclose: false,
        clearBtn: true,
      });
    }
  
    // Update datepicker range
    $("#datepicker1").datepicker('setStartDate', startDate);
    console.log($("#datepicker1").datepicker('setStartDate', startDate)?.value);
    
    $("#datepicker1").datepicker('setEndDate', endDate);
  }
  
  onFilterDashboard(val){
    console.log(val);
    
    let formData=new FormData()
    formData.append("AccessToken",this.token)
    formData.append("DateFrom",val?.date)
    // formData.append("Region",val?.region||'')
    formData.append("StartTime",val?.startTime||'')
    formData.append("ReportType",val?.reportType||'')
    formData.append("ReportFormat",val?.reportFormat||'')
    formData.append("SlotHr",val?.slotHr||'0')
    formData.append("ReportFormat",val?.reportFormat)
    formData.append("Days",val?.day)
    formData.append("VehicleNos",'TN22BD6397')
    formData.append("ExceptionDate",val?.exceptionDate||$("#datepicker1").val())
    if(val?.reportType=='1')
      this.report.label='standard'
    else
      this.report.label='detailed'
    if(val?.reportFormat=='1')
      this.report.type='default'
    else
    this.report.type='daywise'
    
    console.log(this.report);
    
    console.log(formData);
    
    this.SpinnerService.show('tableSpinner')
    this.dtdcServices.slotwiseDistanceData(formData).subscribe((res: any) => {
      
      // this.tripArray=res?.MainDashboard
      
      console.log("slotwiseData", res);
      // console.log(this.SpinnerService);
      this.report.data=res?.Report
      console.log(this.report);
      this.showTable=true
      // this.masterUploadTable()
      this.SpinnerService.hide('tableSpinner')

    },(error) => {
      console.error('error getting data', error);
      this.SpinnerService.hide('tableSpinner')
    })
    
  }

  updateExceptionDateRange(selectedDate: any, selectedDays: any, filter: any): void {
    console.log(filter?.value);
  
    if (true) {
      // Clear the exception date field
      console.log("hii");
      
      $("#datepicker1").val(""); // Clear the value of the input field
      if ($("#datepicker1").data('datepicker')) {
        $("#datepicker1").datepicker('clearDates'); // Reset the datepicker if initialized
      }
      // return;
    }
  
    console.log("Selected Date:", $("#datepicker1").val());
    // this.end(selectedDate, selectedDays);
  }
  generateStartTimes() {
    const hours = 24;
    const interval = 30; // 30 minutes
    for (let i = 0; i < hours; i++) {
      for (let j = 0; j < 60; j += interval) {
        const hour = i < 10 ? `0${i}` : `${i}`;
        const minute = j < 10 ? `0${j}` : `${j}`;
        this.filterObject.startTimes.push(`${hour}:${minute}`);
      }
    }
  }

  generateSlotHours() {
    const maxHours = 24;
    for (let i = 0; i <= maxHours; i++) {
      if (i !== maxHours) {
        this.filterObject.slotHours.push(i.toFixed(0)); // Whole number (e.g., "1")
        this.filterObject.slotHours.push(`${i}.30`); // Half hour (e.g., "1.30")
      } else {
        this.filterObject.slotHours.push(i.toFixed(0)); // Add the last hour (e.g., "24")
      }
    }
  }

  generateDays() {
    this.filterObject.days = Array.from({ length: 31 }, (_, i) => i + 1);
  }

  onSubmit(formValue: any) {
    console.log('Filter Form Submitted', formValue);
  }
  initApiCalls(){
    let formData=new FormData
    formData.append('AccessToken',this.token)
    this.dtdcServices.slotwiseDistanceFilter(formData).subscribe((res: any) => {
      console.log("slotwise", res);
      const regionsArray = Object.entries(res?.Filter?.Master?.Region).map(([key, value]) => ({
        id: key, // Convert key to number
        name: value,
      }));
      this.filterObject.regions=regionsArray
   console.log(regionsArray);
   
      // this.routeId = (res?.data);
      // console.log("customerList", this.routeId);

    })
  }

  onSearchVehicle(searchTerm: any): void {
    console.log(searchTerm?.term);
    // return
    
    if (searchTerm?.term && searchTerm?.term?.trim().length>=3) {
      let formData=new FormData()
      formData.append('Vehicle',searchTerm?.term)
      this.dtdcServices.slotwiseVehicleData(formData).subscribe((res: any) => {
        console.log("slotwise", res);
        // this.routeId = (res?.data);
        // console.log("customerList", this.routeId);
  
      })
      console.log(searchTerm);
      
    }
  }
}


