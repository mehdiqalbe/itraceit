import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/shared/services/nav.service';
// import { DtdcService } from '../../services/dtdc.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NgxSpinnerService } from 'ngx-spinner';
// import { DtdcService } from '../../services/dtdc.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';
import { BluedartService } from '../../services/bluedart.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-slotwise-distance-report',
  templateUrl: './slotwise-distance-report.component.html',
  styleUrls: ['./slotwise-distance-report.component.scss']
})
export class SlotwiseDistanceReportComponent implements OnInit {
  token: any;
  location:any=[]
  searchLocation:any
  filterObject:any={
    regions: [], // Replace with your regions
    startTimes: [] as string[],
    slotHours: [] as string[],
    days: [] as number[],
    origin:{},
    gpsVendor:{},
    destination:{},
    route:{},
    etaDelay:{},
    routeCategory:{},
    routeType:{}
  }
  region: any = ['']
  todayDate: string = new Date().toISOString().split('T')[0]; // Today's date
  report:any={label:'standard',type:'default',data:[]}
  showTable:boolean=false
  exceptionDateRange = { min: '', max: '' };
  exceptionDate=[];
  selectedVehicles: any[] = []; // Holds selected vehicle IDs
  vehicleOptions: { id:any; vehicle_number:any }[] = [];
  travelledReportData: any;
  dataGap: any;
  reportDetailed: any;
  selectedReportFormat = 1;
  defaultReport:any=[]
  dayWise:any=[]
  standardReport: any=[];
  daywiseData: any;
  reportType:any
  hideFields: boolean=false;
  showTamperColumn: boolean=false;
  constructor(public datepipe: DatePipe,private navServices: NavService, private router:Router, private bluedartServices:BluedartService,private service:CrudService,private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.generateDays()
    this.generateSlotHours()
    this.generateStartTimes()
    this.token=localStorage.getItem("AccessToken");
    // this.end(new Date(),"")
    this.initApiCalls()
    this.sidebarToggle()
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

  getRandomYesNo(): string {
    return Math.random() < 0.5 ? 'Yes' : 'No';
  }

  stringToDate(val){
    const dateString = val;
    const dateObject = new Date(dateString);
    
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(dateObject.getDate()).padStart(2, '0');
    const hours = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    const seconds = String(dateObject.getSeconds()).padStart(2, '0');
    
    // Custom formatted date-time
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    // console.log(`Custom Formatted Date-Time: ${customFormattedDateTime}`);
// console.log(`Formatted Date: ${formattedDate}`);
// console.log(`Formatted Time: ${formattedTime}`);
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
    this.selectedReportFormat=1
    
    let formData=new FormData()
    if(this.hideFields){
      this.SpinnerService.show('tableSpinner')
      formData.append("AccessToken",this.token)
      formData.append("DateFrom",val?.date)
      formData.append("Region",val?.region||'')
      formData.append("StartTime",'00:00')
      formData.append("ReportType",'1')
      formData.append("ReportFormat",'1')
      formData.append("gpsVendor",val?.vendor||'')
      formData.append("Location",val?.location||'')
      formData.append("SlotHr",'24')
      formData.append("overlap",val?.overlap==true?'1':'0')
      // formData.append("ReportFormat",val?.reportFormat)
      formData.append("Days",val?.day)
      console.log(formData,"auto slot")
      if(val?.region=='')
        {
          const vehicleNosString = this.selectedVehicles.join(",");
          console.log("Aman",vehicleNosString);
          formData.append("VehicleNos",vehicleNosString)
        }
        formData.append("ExceptionDate",val?.exceptionDate||$("#datepicker1").val())
        this.bluedartServices.slotwiseAutoDistanceData(formData).subscribe((res: any) => {
      
          // this.tripArray=res?.MainDashboard
      
          console.log("workinghr", res);
          // console.log(this.SpinnerService);
          this.report.data=res?.Report
           this.standardReport=this.report?.data?.Standard
          this.showTable=true
          if(val?.reportType==2)
          {
            // this.masterUploadTableDetailed()
            this.reportDetailed=(Object.values(this.report?.data?.Detailed).reduce((acc:any, curr) => acc.concat(curr), []));
            console.log(this.reportDetailed);
           
            this.masterUploadTableDetailed()
          }
          else{
            this.showTamperColumn=true
            this.masterUploadTable()
    
          }
          console.log(this.report);
          
          this.SpinnerService.hide('tableSpinner')
    
        },(error) => {
          console.error('error getting data', error);
          this.SpinnerService.hide('tableSpinner')
        })
      return
    }
    this.showTamperColumn=false
    formData.append("AccessToken",this.token)
    formData.append("DateFrom",val?.date)
    formData.append("Region",val?.region||'')
    formData.append("StartTime",val?.startTime||'')
    formData.append("ReportType",val?.reportType||'')
    formData.append("ReportFormat",'1')
    formData.append("gpsVendor",val?.vendor||'')
    formData.append("SlotHr",val?.slotHr||'0')
    formData.append("ReportFormat",val?.reportFormat)
    formData.append("Location",val?.location||'')
    // formData.append("overlap",val?.overlap==true?'1':'0')
    formData.append("Days",val?.day)
    if(val?.region=='')
    {
      const vehicleNosString = this.selectedVehicles.join(",");
      console.log("Aman",vehicleNosString);
      formData.append("VehicleNos",vehicleNosString)
    }
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
    
    console.log(formData,this.region);
    
    this.SpinnerService.show('tableSpinner')
    this.bluedartServices.slotwiseDistanceData(formData).subscribe((res: any) => {
      
      // this.tripArray=res?.MainDashboard
      if(res?.Status=='fail'){
        alert(res?.Message)
        this.SpinnerService.hide('tableSpinner')
        this.router.navigate(['/auth/login']);
        return
      }
      console.log("slotwiseData", res);
      // console.log(this.SpinnerService);
      this.report.data=res?.Report
       this.standardReport=this.report?.data?.Standard
      this.showTable=true
      if(val?.reportType==2)
      {
        // this.masterUploadTableDetailed()
        this.reportDetailed=(Object.values(this.report?.data?.Detailed).reduce((acc:any, curr) => acc.concat(curr), []));
        console.log(this.reportDetailed);
        this.masterUploadTableDetailed()
        // setTimeout(() => {
        // }, 700);
        
      }
      else{
        this.masterUploadTable()

      }
      console.log(this.report);
      
      this.SpinnerService.hide('tableSpinner')

    },(error) => {
      console.error('error getting data', error);
      this.SpinnerService.hide('tableSpinner')
    })
    
  }

  onRegionChange(selectedRegions){
    if (selectedRegions.includes('')) {
      // If "All" is selected, clear other selections
      this.region = [''];
    } else {
      // If "All" is deselected, update the selection normally
      this.region = selectedRegions.filter((value) => value !== '');
    }
     
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
  onCheckboxToggle(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.hideFields = checkbox.checked; // Hide fields if checkbox is checked
  }
  onCheckboxOverlap(event){
    const checkbox=event.target
    console.log(checkbox,"overlap check")
  }
  onSubmit(formValue: any) {
    console.log('Filter Form Submitted', formValue);
  }
    
  initApiCalls(){
    let formData=new FormData
    formData.append('AccessToken',this.token)
    this.bluedartServices.slotwiseDistanceFilter(formData).subscribe((res: any) => {
      if(res?.Status=='fail'){
        alert(res?.Message)
        this.router.navigate(['/auth/login']);
        return
      }
      console.log("slotwise", res);
      const regionsArray = Object.entries(res?.Filter?.Master?.Region).map(([key, value]) => ({
        id: key, // Convert key to number
        name: value,
      }));
      const location = Object.entries(res?.Filter?.Master?.Location);
      this.filterObject.location=location||[]
      this.filterObject.regions=regionsArray
      // this.filterObject.locations=locationArray
      this.filterObject.gpsVendor=res?.Filter?.Master?.Vendor
   console.log(regionsArray);
   
      // this.routeId = (res?.data);
      // console.log("customerList", this.routeId);

    })
  }

  onSearchVehicle(searchTerm: any): void {
    console.log(searchTerm?.term);
    // return
    this.vehicleOptions=[]
    if (searchTerm?.term && searchTerm?.term?.trim().length>=3) {
      let formData=new FormData()
      formData.append('AccessToken',this.token)
      formData.append('searchQuery',searchTerm?.term)
      this.bluedartServices.slotwiseVehicleData(formData).subscribe((res: any) => {
        console.log("slotwise", res);
        this.vehicleOptions=res?.Data
        // this.routeId = (res?.data);
        // console.log("customerList", this.routeId);
  
      })
      console.log(searchTerm);
      
    }
  }


  masterUploadTable() {
    var tbl = $('#masterUpload');
    var table = $('#masterUpload').DataTable();
    console.log("",table);
    
    table.clear();
    table.destroy();
    // table.draw()
    // $('#masterUpload').DataTable().clear;
    // if(datatable.length!=)

    //  $('#masterUpload tbody').empty();

    $(document).ready( () => {
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
            filename: 'Slotwise Report',
            bom: true,
            columns: ':visible',

            exportOptions: {
              columns: ':visible',
            },
            title: 'Slotwise Report',
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
            title: 'report',
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
            title: 'Slotwise Report',
          },
          // {
          //   extend: 'excel',
          //   footer: true,
          //   autoClose: 'true',
          //   //text: '',
          //   //className: 'fa fa-file-pdf-o',
          //   //color:'#ff0000',

          //   buttons: ['excel'],
          //   titleAttr: ' Download excel file',
          //   charset: 'utf-8',
          //   tag: 'span',
          //   bom: true,
          //   className: 'datatableexcel-btn fa fa-file-excel-o',
          //   text: '',
          //   exportOptions: {
          //     columns: ':visible',
          //   },
          //   title: 'dashboard_repor',
          // },
          {
            text: '',
            className: 'datatableexcel-btn fa fa-file-excel-o',
            color:'#ff0000',
            titleAttr: ' Download excel file',
            charset: 'utf-8',
            tag: 'span',
            bom: true,
            exportOptions: {
                  columns: ':visible',
                },
            action: () => {
              this.exportToExcel_datetime(); // Call your custom export function
            },
          },
        //   {
        //     extend: 'excelHtml5',
        //     customize:  (xlsx)=> {
        //         var sheet = xlsx.xl.worksheets['sheet1.xml'];

        //         // Loop over the cells in column `C`
        //         sheet.querySelectorAll('row c[r^="C"]').forEach((row) => {
        //             // Get the value
        //             // let cell = row.querySelector('v');
        //             // let cell = cell.querySelector('is t');
        //             let cellRef = row.getAttribute('r');
        //              console.log(cellRef);
        //              if(cellRef=='C2')
        //               return
        //             let cell = row.querySelector('is t');
        //             console.log(row);
        //             // if (cell && cell.textContent === 'New York') {
        //             //     row.setAttribute('s', '20');
        //             // }
        //             if (cell && cell.textContent) {
        //               let originalValue = cell.textContent;
        //               console.log(originalValue,"original");
        //               // return
        //               let parsedDate = this.parseDate(originalValue); // Convert to desired format
        //               cell.textContent = parsedDate;
        //           }
        //         });
        //     }
        // },
          
        ],
      });
    });

    // setTimeout(() => {
    //   this.SpinnerService.hide();
    // }, 3000);
  }


  masterUploadTableDetailed() {
    var tbl = $('#masterUploadDetailed');
    var table = $('#masterUploadDetailed').DataTable();
    console.log("",table);
    
    table.clear();
    table.destroy();
    // table.draw()
    // $('#masterUpload').DataTable().clear;
    // if(datatable.length!=)

    //  $('#masterUpload tbody').empty();

    $(document).ready( () => {
      $('#masterUploadDetailed').DataTable({
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
            title: 'report',
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
          // {
          //   extend: 'excel',
          //   footer: true,
          //   autoClose: 'true',
          //   //text: '',
          //   //className: 'fa fa-file-pdf-o',
          //   //color:'#ff0000',

          //   buttons: ['excel'],
          //   titleAttr: ' Download excel file',

          //   tag: 'span',

          //   className: 'datatableexcel-btn fa fa-file-excel-o',
          //   text: '',
          //   exportOptions: {
          //     columns: ':visible',
          //   },
          //   title: 'dashboard_repor',
          // },
          {
            text: '',
            className: 'datatableexcel-btn fa fa-file-excel-o',
            color:'#ff0000',
            titleAttr: ' Download excel file',
            charset: 'utf-8',
            tag: 'span',
            bom: true,
            exportOptions: {
                  columns: ':visible',
                },
            action: () => {
              this.exportDetailedToExcel(); // Call your custom export function
            },
          },
        ],
      });
    });

    // setTimeout(() => {
    //   this.SpinnerService.hide();
    // }, 3000);
  }

  calculateDaysBetween(startDate:any, endDate:any) {
    // Parse the date strings into Date objects
    const start:any = new Date(startDate);
    const end:any = new Date(endDate);
  
    // Calculate the difference in milliseconds
    const differenceInMs = end - start;
  
    // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 ms)
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
  
    return differenceInDays+1;
  }
   
  convertHourMin(timeString):any{
    const [hours, minutes] = timeString.split(":");
  
    // Return only hours and minutes
    return `${hours}:${minutes}`;
  }

  openTravelledDistance(val,item){
    if(this.hideFields){
       const[startDate,startTime]=item?.StartDateTime?.split(' ')
    let formData=new FormData()
      console.log(this.hideFields,item)
      formData.append("AccessToken",this.token)
      formData.append("DateFrom",startDate||'')
      formData.append("Region",'')
      formData.append("StartTime",this.convertHourMin(startTime)||'')
      formData.append("ReportType",item?.reportType||'1')
      formData.append("ReportFormat",'1')
      formData.append("gpsVendor",'')
      formData.append("SlotHr",item?.SlotHours||'0')
      // formData.append("ReportFormat",item?.reportFormat)
      const days:any=this.calculateDaysBetween(startDate,item?.EndDateTime?.split(' ')[0])
      formData.append("Days",days||'3')
      formData.append("VehicleNos",item?.VehicleNo)
      
      console.log(formData);
      
      if((this.selectedReportFormat==1)){
        $('#travelledDistancePopup').modal('show');
        this.SpinnerService.show('travelledDistance')
      }
      else{
        $('#dayWiseDistancePopup').modal('show');
        this.SpinnerService.show('daywisePopup')
      }

      this.bluedartServices.slotwiseDistanceData(formData).subscribe((res: any) => {
      
        // this.tripArray=res?.MainDashboard
        
        console.log("slotwiseDataopenTravelled", res);
         const report=res?.Report

        this.travelledReportData=[]
    if(this.selectedReportFormat==2)
      {this.daywiseData=[]
        this.SpinnerService.hide('daywisePopup')
      this.daywiseData=report?.['Standard-DayWise']
      this.daywiseData=this.daywiseData[val]
      setTimeout(() => {
        this.tripHeaderDaywise()
      }, 200);
      this.tripHeaderDaywise()
      // $('#dayWiseDistancePopup').modal('show');
    }
   else
   {
    this.SpinnerService.hide('travelledDistance')
     this.travelledReportData=report?.TravelledDetailed[val]
     setTimeout(() => {
      this.tripHeader()
    }, 200);
    this.tripHeader()
    // $('#travelledDistancePopup').modal('show');
   }
   
  
      },(error) => {
        console.error('error getting data', error);
        this.SpinnerService.hide('tableSpinner')
      })
      return

    }
    
    this.travelledReportData=[]
    if(this.selectedReportFormat==2)
    {this.daywiseData=[]
      this.daywiseData=this.report?.data?.['Standard-DayWise']
      this.daywiseData=this.daywiseData[val]
      setTimeout(() => {
        this.tripHeaderDaywise()
      }, 200);
      this.tripHeaderDaywise()
      $('#dayWiseDistancePopup').modal('show');
    }
   else
   {
     this.travelledReportData=this.report?.data?.TravelledDetailed[val]
     setTimeout(() => {
      this.tripHeader()
    }, 200);
    this.tripHeader()
    $('#travelledDistancePopup').modal('show');
   }
    console.log(this.travelledReportData,val);
  }

  openDataGapModal(val,key){
    this.dataGap=this.report?.data[key]
    this.dataGap=this.dataGap[val?.ClickImei]
    console.log(this.dataGap,val);
   
    setTimeout(() => {
      this.dataGapTable()
    }, 200);
    this.dataGapTable()
    $('#DataGapup').modal('show');
  }
    
   tripHeader() {
      var tbl = $('#tripHeaderTable');
      var table = $('#tripHeaderTable').DataTable()
      console.log("Qalbe",table);
      
      // table.clear();
      table.destroy();
      // table.draw()
      // $('#masterUpload').DataTable().clear;
      // if(datatable.length!=)
  
      //  $('#masterUpload tbody').empty();
  
      $(document).ready( () => {
        $('#tripHeaderTable').DataTable({
          language: {
            search: '',
            searchPlaceholder: 'Search',
          },
          pageLength: 10,
          fixedHeader: true,
          // scrollX: true,
          
          ordering: true,
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
              title: 'report',
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
              text: '',
              className: 'datatableexcel-btn fa fa-file-excel-o',
              color:'#ff0000',
              titleAttr: ' Download excel file',
              charset: 'utf-8',
              tag: 'span',
              bom: true,
              exportOptions: {
                    columns: ':visible',
                  },
              action: () => {
                this.exportToPopupDefault(); // Call your custom export function
              },
            },
          ],
        });
      });
  
      // setTimeout(() => {
      //   this.SpinnerService.hide();
      // }, 3000);
    }

    tripHeaderDaywise() {
      var tbl = $('#tripHeaderTableDaywise');
      var table = $('#tripHeaderTableDaywise').DataTable()
      console.log("Qalbe",table);
      
      // table.clear();
      table.destroy();
      // table.draw()
      // $('#masterUpload').DataTable().clear;
      // if(datatable.length!=)
  
      //  $('#masterUpload tbody').empty();
  
      $(document).ready( () => {
        $('#tripHeaderTableDaywise').DataTable({
          language: {
            search: '',
            searchPlaceholder: 'Search',
          },
          pageLength: 10,
          fixedHeader: true,
          // scrollX: true,
          
          ordering: true,
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
              title: 'report',
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
              text: '',
              className: 'datatableexcel-btn fa fa-file-excel-o',
              color:'#ff0000',
              titleAttr: ' Download excel file',
              charset: 'utf-8',
              tag: 'span',
              bom: true,
              exportOptions: {
                    columns: ':visible',
                  },
              action: () => {
                this.exportToPopupDaywise(); // Call your custom export function
              },
            },
          ],
        });
      });
  
      // setTimeout(() => {
      //   this.SpinnerService.hide();
      // }, 3000);
    }
     
    dataGapTable() {
      var tbl = $('#dataGapTable');
      var table = $('#dataGapTable').DataTable()
      console.log("Qalbe",table);
      
      // table.clear();
      table.destroy();
      // table.draw()
      // $('#masterUpload').DataTable().clear;
      // if(datatable.length!=)
  
      //  $('#masterUpload tbody').empty();
  
      $(document).ready(function () {
        $('#dataGapTable').DataTable({
          language: {
            search: '',
            searchPlaceholder: 'Search',
          },
          pageLength: 10,
          fixedHeader: true,
          // scrollX: true,
          
          ordering: true,
          scrollY: '450px',
          scrollCollapse: true,
          paging: false,
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
              title: 'report',
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
  
      // setTimeout(() => {
      //   this.SpinnerService.hide();
      // }, 3000);
    }

    onReportFormatChange(format: number): void {
      // Update table data based on the selected format
      console.log(format,"Report",this.standardReport);
      if(this.report?.label=='standard')
      {
        // this.standardReport = format === 2 ?  (Object.values(this.report.data['Standard-DayWise']).reduce((acc:any, curr) => acc.concat(curr), [])) : this.report.data?.Standard;
        // this.masterUploadTable()
        // console.log("standardReport",this.standardReport);
        // this.travelledReportData=
      }
    else
    {
      // this.reportDetailed = format === 2 ? this.report.data['Detailed-DayWise'] : this.report.data.Detailed;
      // this.reportDetailed=(Object.values(this.reportDetailed).reduce((acc:any, curr) => acc.concat(curr), []))
      // this.masterUploadTableDetailed()
      // console.log("Detailed Report");

      
    }
    }
    
    public parseDate(dateString) {
       
      if(dateString=='-')
        return

      // Split the `dd-MM-yyyy HH:mm:ss` format into components
      const [yearTime, month, day] = dateString.split('-');
      const [day1, time] = day.split(' ');
      // console.log(year,month,day,time)
      // Create a new Date object
      const parsedDate = new Date(`${month}/${day1}/${yearTime} ${time}`);
      //  const parsedDate = new Date(`${day1}/${month}/${yearTime} ${time}`);
            console.log(parsedDate)
      return parsedDate
    }
    exportToExcel_datetime(): void {
      const rowData = this.standardReport.map((item, index) => ({
        Sl: index + 1,
        VehicleNo: item.VehicleNo,
        StartDateTime: this.parseDate(item.StartDateTime) ?? "",
        SlotHours: item.SlotHours,
        EndDateTime:this.parseDate(item.EndDateTime) ?? "",
        DistanceTravelled: item.DistanceTravelled,
        TravelDuration: item.TravelDuration,
        AvgSpeed: item.AvgSpeed,
        MaxSpeed: item.MaxSpeed,
        DataGapStanding:item?.DataGapStanding,
        DataGapNetworking: item.DataGapNetworking,
        TotalDataGap:item?.TotalDataGap,
        // Transporter: item.Transporter,
        // IntegrationDate:item.IntegrationDate ?? "",
        // Vendor: item.Vendor,
        // VehicleLocation: item.VehicleLocation,
        // ReportingTime: item.ReportingTime,
        // ExitTime: item.ExitTime,
        Region: item.Region,
        // TripCount: item.TripCount,
        // TripDistance: item.TripDistance,
        // ShipmentCount: item.ShipmentCount,
        // SumofWeight: item.SumofWeight,
        // TotalVehicleCapacity: item.TotalVehicleCapacity,
        Tampering: item.Tampering,
        Agreement: item.Agreement, // Include based on `showTamperColumn` logic if required
      }));
    
      const ws = XLSX.utils.json_to_sheet(rowData, {
        cellDates: true,
        dateNF: 'dd/mm/yyyy hh:mm:ss',
      });
    
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Report');
      XLSX.writeFile(wb, 'SlotwiseReport.xlsx');
    }
    exportDetailedToExcel(): void {
      // Map the table data into rowData for the Excel file
      const rowData = this.reportDetailed.map((item, index) => ({
        Sl: index + 1,
        VehicleNo: item.VehicleNo,
        IMEI: item.Device,  // Assuming Device is the IMEI field in your data
        StartTime: this.parseDate(item.StartTime) ?? "", // Ensure parseDate handles your date format
        EndTime: this.parseDate(item.EndTime) ?? "",   // Same for EndTime
        DistanceKm: item.Distance ?? "",  // If Distance is in kilometers
      }));
    
      // Create the worksheet with the rowData
      const ws = XLSX.utils.json_to_sheet(rowData, {
        cellDates: true,  // This ensures that date fields are correctly handled
        dateNF: 'dd/mm/yyyy hh:mm:ss', // Format for the dates in the Excel sheet
      });
    
      // Create a new workbook and append the worksheet
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Report');  // Naming the sheet as 'Report'
    
      // Export the workbook as an Excel file
      XLSX.writeFile(wb, 'DetailReport.xlsx');
    }
    exportToPopupDaywise(): void {
      // Map the table data into rowData for the Excel file
      const rowData = this.daywiseData.map((item, index) => ({
        Sl: index + 1,
        VehicleNo: item['Vehicle No'], // Access the Vehicle No field
        IMEI: item.Device,  // Assuming Device is the IMEI field
        StartTime: this.parseDate(item.StartDateTime) ?? "", // Parse Start DateTime
        EndTime: this.parseDate(item.EndDateTime) ?? "", // Parse End DateTime
        DistanceKm: item.Distance ?? "",  // Add Distance
        // DataGapS: item.DataGapStanding ?? "", // Add DataGap S (hidden in the table)
        DataGapN: item.DataGapNetworking ?? "", // Add DataGap N
      }));
    
      // Create the worksheet with the rowData
      const ws = XLSX.utils.json_to_sheet(rowData, {
        cellDates: true,  // This ensures that date fields are correctly handled
        dateNF: 'dd/mm/yyyy hh:mm:ss', // Format for the dates in the Excel sheet
      });
    
      // Create a new workbook and append the worksheet
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Report');  // Naming the sheet as 'Report'
    
      // Export the workbook as an Excel file
      XLSX.writeFile(wb, 'TripReportDaywise.xlsx');
    }
    exportToPopupDefault(): void {
      // Map the table data into rowData for the Excel file
      const rowData = this.travelledReportData.map((item, index) => ({
        Sl: index + 1, // Serial Number
        VehicleNo: item.VehicleNo ?? "", // Vehicle Number
        IMEI: item.IMEI ?? "", // IMEI
        StartTime: this.parseDate(item.StartTime) ?? "", // Start Time (Parsed)
        EndTime: this.parseDate(item.EndTime) ?? "", // End Time (Parsed)
        DistanceKm: item.Distance ?? "", // Distance in km
      }));
    
      // Create the worksheet with the rowData
      const ws = XLSX.utils.json_to_sheet(rowData, {
        cellDates: true, // Handle date cells properly
        dateNF: 'dd/mm/yyyy hh:mm:ss', // Desired date format
      });
    
      // Create a new workbook and append the worksheet
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Travelled Report'); // Naming the sheet
    
      // Export the workbook as an Excel file
      XLSX.writeFile(wb, 'TravelledReport.xlsx');
    }
    validateLocation(){
      if(this.location.length===10){
        alert('You can only select a maximum of 10 location');
        return
      }
   }
   onSearchLocation(val: any) {
    if (!val?.term || !this.filterObject?.location) {
      console.log('No search term or location data available');
      return;
    }
    console.log(val);
    val=val?.term
    
    const searchPattern = new RegExp(`^${val}`, 'i'); // Create a case-insensitive regex pattern.
    console.log(this.filterObject?.location);
    
    // const customerEntries = Object.entries(this.filterObject?.origin); // Convert object to an array of key-value pairs.
    // console.log(customerEntries);
    // Filter entries based on the value matching the regex pattern.
    const filteredResults = this.filterObject?.location
    .filter((item:any) => searchPattern.test(item[1])) // Test the second element.
    .map(([key, value]) => ({ key, value })); // Map to an array of objects.
    this.searchLocation=filteredResults
  console.log(filteredResults, 'filteredResults');
   
  }
  onLocationChange(selectedRegions){
    console.log(this.location,"onLocationChange");
    
    // if(this.region.length>3){
    //   console.log(this.region);
    //    // Remove the last added selection
    //    this.region.pop()
    //    console.log(this.region);
    //   alert('You can only select a maximum of 3 regions or select "All".');
    //   return
    // }
    
    if (selectedRegions.includes('')) {
      // If "All" is selected, clear other selections
      this.location = [''];
    } else {
      // If "All" is deselected, update the selection normally
      this.location = selectedRegions.filter((value) => value !== '');
    }
     
  }
}


