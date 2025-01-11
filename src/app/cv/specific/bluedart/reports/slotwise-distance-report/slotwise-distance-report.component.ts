import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/shared/services/nav.service';
// import { DtdcService } from '../../services/dtdc.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BluedartService } from '../../services/bluedart.service';
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
  region: string = ''
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
  constructor(private datepipe: DatePipe,private navServices: NavService,private bluedartServices:BluedartService,private service:CrudService,private SpinnerService: NgxSpinnerService) { }

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
    this.selectedReportFormat=1
    let formData=new FormData()
    formData.append("AccessToken",this.token)
    formData.append("DateFrom",val?.date)
    formData.append("Region",val?.region||'')
    formData.append("StartTime",val?.startTime||'')
    formData.append("ReportType",val?.reportType||'')
    formData.append("ReportFormat",'1')
    formData.append("SlotHr",val?.slotHr||'0')
    formData.append("ReportFormat",val?.reportFormat)
    formData.append("Days",val?.day)
    if(val?.region=='')
    formData.append("VehicleNos",JSON.stringify(this.selectedVehicles))
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
    this.bluedartServices.slotwiseDistanceData(formData).subscribe((res: any) => {
      
      // this.tripArray=res?.MainDashboard
      
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
    this.bluedartServices.slotwiseDistanceFilter(formData).subscribe((res: any) => {
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
  masterUploadTableDetailed() {
    var tbl = $('#masterUploadDetailed');
    var table = $('#masterUploadDetailed').DataTable();
    console.log("",table);
    
    // table.clear();
    table.destroy();
    // table.draw()
    // $('#masterUpload').DataTable().clear;
    // if(datatable.length!=)

    //  $('#masterUpload tbody').empty();

    $(document).ready(function () {
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
  openTravelledDistance(val){
    if(this.selectedReportFormat==2)
       console.log("2");
       
    this.travelledReportData=this.report?.data?.TravelledDetailed[val]

    console.log(this.travelledReportData,val);
    $('#travelledDistancePopup').modal('show');
    setTimeout(() => {
      this.tripHeader()
    }, 200);
  }
  openDataGapModal(val,key){
    this.dataGap=this.report?.data[key]
    this.dataGap=this.dataGap[val?.ClickImei]
    console.log(this.dataGap,val);
    $('#DataGapup').modal('show');
    setTimeout(() => {
      this.dataGapTable()
    }, 200);
  }

   tripHeader() {
      var tbl = $('#tripHeaderTable');
      var table = $('#tripHeaderTable').DataTable()
      console.log("Qalbe",table);
      
      // table.clear();
      // table.destroy();
      // table.draw()
      // $('#masterUpload').DataTable().clear;
      // if(datatable.length!=)
  
      //  $('#masterUpload tbody').empty();
  
      $(document).ready(function () {
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

    dataGapTable() {
      var tbl = $('#dataGapTable');
      var table = $('#dataGapTable').DataTable()
      console.log("Qalbe",table);
      
      // table.clear();
      // table.destroy();
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
}


