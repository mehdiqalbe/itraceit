import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/shared/services/nav.service';
import { DatePipe } from '@angular/common';
// import { DtdcService } from '../../services/dtdc.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DtdcService } from '../services/dtdc.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
declare var $: any;
declare var google: any;
@Component({
  selector: 'app-trip-dashboard',
  templateUrl: './trip-dashboard.component.html',
  styleUrls: ['./trip-dashboard.component.scss']
})
export class TripDashboardComponent implements OnInit {
  regionSearch$ = new BehaviorSubject<string>('');
  displayedRegions: any[] = [];



  token: any;
  selectedRoutes:any
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

  map1: any
  demomarker:any=[]
  demoPolyline:any=[]
  trackingData: any = []
  poly_line: any = []
  map_flag: any = 'Please Wait....'
  currentDateTime: any = null
  customer_info: any = []

  tripArray:any=[]
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
  latlngbounds: any;
  constructor(private datepipe: DatePipe,private navServices: NavService,private dtdcServices:DtdcService,private service:CrudService,private SpinnerService: NgxSpinnerService) {
    this.initApiCalls()
   }

  ngOnInit(): void {
    // this.generateDays()
    // this.generateSlotHours()
    // this.generateStartTimes()
    
    this.regionSearch$
    .pipe(
      debounceTime(300), // Wait 300ms after the last keystroke.
      distinctUntilChanged(), // Only act on changes.
      switchMap((searchTerm) => this.searchRegions(searchTerm)) // Filter based on search term.
    )
    .subscribe((results) => {
      this.displayedRegions = results; // Update results.
    });

    this.token=localStorage.getItem("AccessToken");
    // this.end(new Date(),"")
    
    this.initMap1();
  }


  searchRegions(searchTerm: string): Observable<any[]> {
    const regionArray = Object.entries(this.filterObject?.customer).map(([key, value]) => ({ key, value }));
    if (!searchTerm?.trim()) {
      // If search is empty, return all.
      return of(regionArray);
    }
    return of(
      regionArray.filter((region:any) =>
        region.value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }
  onRegionSearch(searchTerm: any) {
    if (!searchTerm || searchTerm.trim() === '') {
      // Reset to default view when search is cleared.
      this.displayedRegions = [];
      return;
    }
      console.log("aman");
      
    this.regionSearch$.next(searchTerm);
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
    
    console.log(formData);
    
    this.SpinnerService.show('tableSpinner')
    this.dtdcServices.slotwiseDistanceData(formData).subscribe((res: any) => {
      
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
    console.log("Qalbe");
    
    this.token=localStorage.getItem('AccessToken')
    this.group_id=localStorage.getItem('GroupId')
    this.account_id=localStorage.getItem('AccountId')
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    // formdataCustomer.append("RouteType",'Feeder,Commercial EBT,Carting-Outbound')
    
    // formdataCustomer.append('RouteId', id);
    // formdataCustomer.append('UserType', 'master');
    // formdataCustomer.append('DataFilter', js);

    this.SpinnerService.show('tableSpinner')
    // this.dtdcServices.specificTripDashboard(formdataCustomer).subscribe((res: any) => {
     
    //   // this.tripArray=res?.MainDashboard
      
    //   console.log("specificDashboard", res);
    //   // console.log(this.SpinnerService);
      
    //   // this.masterUploadTable()
    //   if(res.Status=='success')
    //   {
     
    //   //  this.tripArray=res?.MainDashboard
    //   //  this.dashboardHeader=res?.Header
    //    this.tripArray=Object.values(res?.MainDashboard)
    //    console.log("dashboardHeader",this.tripArray);
  
       
    //    this.masterUploadTable()
    //   // this.loadData()
    //    this.SpinnerService.hide('tableSpinner')
    //   //  this.initChart()
    //    }
    //    else if(res.Status=='fail'){
    //     alert(res?.Message)
    //     this.SpinnerService.hide('tableSpinner')
    //    }
    //   // this.routeId = (res?.data);
    //   // console.log("customerList", this.routeId);

    // },(error) => {
    //   console.error('error getting data', error);
    //   this.SpinnerService.hide('tableSpinner')
    // })

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
         
       
         
         console.log(this.selectedRoutes);
          
        formdataCustomer.append("RouteType",data?.DefualtFilter)

        this.dtdcServices.specificTripDashboard(formdataCustomer).subscribe((res: any) => {
     
          // this.tripArray=res?.MainDashboard
          
          console.log("specificDashboard", res);
          // console.log(this.SpinnerService);
          
          // this.masterUploadTable()
          if(res.Status=='success')
          {
         
          //  this.tripArray=res?.MainDashboard
          //  this.dashboardHeader=res?.Header
           this.tripArray=Object.values(res?.MainDashboard)
           console.log("dashboardHeader",this.tripArray);
      
           
           this.masterUploadTable()
          // this.loadData()
           this.SpinnerService.hide('tableSpinner')
          //  this.initChart()
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
        // this.initChart()
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

  onSearchVehicle(searchTerm: any): void {
    console.log(searchTerm?.term);
    // return
    this.vehicleOptions=[]
    if (searchTerm?.term && searchTerm?.term?.trim().length>=3) {
      let formData=new FormData()
      formData.append('AccessToken',this.token)
      formData.append('searchQuery',searchTerm?.term)
      this.dtdcServices.slotwiseVehicleData(formData).subscribe((res: any) => {
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
    onRefreshFilter(filterForm: any) {
      filterForm.reset(); // Reset the form to its default state
      this.selectedRoutes = []; // Clear selected values for multiselects
      console.log('Filters refreshed');
      this.initApiCalls()
    }


    openMapModal(item,imei) {
      // $('#v_track_Modal').modal('show');
    
      // Open modal using jQuery
     // this.SpinnerService.show('mapSpinner')
     // Call the tracking function
     // this.vehicleTrackF(item,imei);
     this.vehicleTrackF(item?.RunDate,item?.ImeiNo1,item?.ImeiNo2,item?.ImeiNo3,item?.VehicleNo,item,item?.MTripId,"")
   }
//    async vehicleTrackF_new(imei, imei2, imei3, run_date, vehicle_no, item, Id, route_id) {
//     this.initMap1()
//     // this.SpinnerService.show("tracking");

//   // Clear markers and polylines if they exist
//   if (this.demomarker.length > 0) {
//     this.demomarker.forEach(marker => marker.setMap(null));
//     this.demomarker = [];  // Clear the array after removing markers
//   }
//   if (this.demoPolyline.length > 0) {
//     this.demoPolyline.forEach(polyline => polyline.setMap(null));
//     this.demoPolyline = [];  // Clear the array after removing polylines
//   }
//     // console.log(imei, imei2, imei3);
//     if (imei === '' && imei2 === '' && imei3 === '') {
//       alert("IMEI not assign");
//       return
//     }else{
//     // Clear markers and polylines before starting
//     $('#mapModal').modal('show');
//     // this.clearMarkersAndPolylines();

//     // Initialize map
//     // try {
//     //   // await this.initializeMap();
//     // } catch (error) {
//     //   console.error('Error initializing map:', error);
//     //   this.SpinnerService.hide('spinner-1');
//     // }

//     // Show tracking spinner
//     // this.SpinnerService.show("mapSpinner");

//     // Define the array of IMEIs to process
//     // const imeis = [imei,imei2,imei3];
//     const imeis = [imei, imei2, imei3];
//     // console.log(imeis);

//     // Loop through each IMEI using a for...of loop to support async/await
//     for (const imei of imeis) {
//       // console.log(imei);

//       // Reset tracking data for each IMEI
//       this.trackingData = [];
//       this.customer_info = [];
//       this.marker = [];
//       this.poly_line = [];
//       this.map_flag = '';

//       if (imei === "") {
//         this.map_flag = 'Device unavailable';
//       } else {
//         this.map_flag = 'Please wait';
//         const formData = new FormData();
//         const currentDateTime: any = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

//         formData.append('AccessToken', this.token);
//         formData.append('startdate', run_date);
//         formData.append('enddate', currentDateTime);
//         formData.append('time_interval', '120');
//         formData.append('imei', imei);
//         formData.append('group_id', this.group_id);
//         formData.append('AccountId', this.account_id);

//         // Log form data for debugging
//         formData.forEach((value, key) => {
//           // console.log("formdata...", key, value);
//         });

//         // try {
//           // Wait for the API response
//           const res: any = await this.service.vehicleTrackongS(formData).toPromise();
//           console.log("tracking res", res);
//           this.SpinnerService.hide("mapSpinner");
//           if (res.Status === "failed") {
//             alert(res?.Message);
//           }

//           this.trackingData = res.data;

//           if (res.data === 'Vehicle is inactive.') {
//             alert("Track data is not available");
//           } else {
//             console.log("trackingData", this.trackingData);
//             // Add markers and polyline data
//             this.addMarkersAndPolyline1(imei, vehicle_no);
//             // Fetch DFG polyline data
//             // this.fetchDFGPolyline_new(route_id);
//         // this.fetchCustomerInfo(Id);
//             // Fetch customer info
//             // this.fetchCustomerInfo_new(Id);

//             // Handle alert markers
//             // this.handleAlertMarkers(item);
//             this.fetchCustomerInfo(item?.Customer);
//           }

//         // } catch (error) {
//         //   console.error("Error in API call:", error);
//         //   alert("An error occurred while fetching tracking data");
//         // }

//         // Hide the tracking spinner after the API call
//         // this.SpinnerService.hide("mapSpinner");
//       }
//     }
// }  }

vehicleTrackF(run_date, imei, imei2, imei3, vehicle_no, item, Id, route_id) {
  // if(!this.map1){
    // this.initMap1()
    // this.initMap1();
    // }
  console.log("demomarker", this.demomarker);
  this.SpinnerService.show("tracking");

  // Clear markers and polylines if they exist
  if (this.demomarker.length > 0) {
    this.demomarker.forEach(marker => marker.setMap(null));
    this.demomarker = [];  // Clear the array after removing markers
  }
  
  if (this.demoPolyline.length > 0) {
    this.demoPolyline.forEach(polyline => polyline.setMap(null));
    this.demoPolyline = [];  // Clear the array after removing polylines
  }
  // if( this.demomarker.length>0)
  //   {
  //     for(let i = 0; i < this.demomarker.length; i++)
  //     {
  //       this.demomarker[i].setMap(null);
  //     }
  //   }
  //   if( this.demoPolyline.length>0)
  //   {
  //     for(let i = 0; i < this.demoPolyline.length; i++)
  //     {
  //       this.demoPolyline[i].setMap(null);
  //     }
  //   }

  $('#v_track_Modal').modal('show');

  // Reset tracking data
  this.trackingData = [];
  this.customer_info = [];
  // this.marker = [];
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

    this.service.vehicleTrackongS(formData).subscribe((res: any) => {
      console.log("tracking res", res);
      if(res.Status=="failed")
      {
        alert(res?.Message);
        this.SpinnerService.hide("tracking");
        
      }
      this.trackingData = res.data;

      if (this.trackingData.length > 0) {
        this.map_flag = '';
        this.latlngbounds = new google.maps.LatLngBounds();
        this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.trackingData[0].lat), parseFloat(this.trackingData[0].long)));
        this.latlngbounds.extend(new google.maps.LatLng(parseFloat(this.trackingData[this.trackingData.length - 1].lat), parseFloat(this.trackingData[this.trackingData.length - 1].long)));
        
        // Ensure the map bounds are updated
        this.map1.fitBounds(this.latlngbounds);
      }

      if (res.data === 'Vehicle is inactive.') {
        alert("Track data is not available");
      } else {
        this.addMarkersAndPolyline(imei, vehicle_no);
      }

      this.SpinnerService.hide("tracking");
    });

    // Fetch DFG polyline data
    // this.fetchDFGPolyline(route_id);

    // Fetch customer info
    // this.fetchCustomerInfo(Id);

    // Handle alert markers
    // this.handleAlertMarkers(item);
  }
}

addMarkersAndPolyline(imei: string, vehicle_no: string) {
  // Prepare arrays for markers and polylines
  const markers: google.maps.Marker[] = [];
  const polylinePath: google.maps.LatLng[] = [];
  
  // Use requestAnimationFrame for batch processing
  requestAnimationFrame(() => {
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
      // mark.addListener('click', (event) => this.handleMarkerClick(event, this.trackingData[i], vehicle_no, imei));

      // Create an InfoWindow but don't attach it yet
      // const infowindowMarker = new google.maps.InfoWindow({ content: this.contentsInfo });
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
  });
}

getMarkerIcon(index: number): string {
  if (index === 0) {
    return 'assets/images/users/start_marker.png';
  }
  else if (index + 1 === this.trackingData.length) {

    setTimeout(() => {
      this.SpinnerService.hide("tracking");
    }, 5000);
    return 'assets/images/users/stop_marker.png';
  } else {
    return 'assets/images/users/green_Marker1.png';
  }
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
closeMap()
{ 
  //  if( this.demomarker.length>0)
  // {
  //   for(let i = 0; i < this.demomarker.length; i++)
  //   {
  //     this.demomarker[i].setMap(null);
  //   }
  // }
  // if( this.demoPolyline.length>0)
  // {
  //   for(let i = 0; i < this.demoPolyline.length; i++)
  //   {
  //     this.demoPolyline[i].setMap(null);
  //   }
  // }
  // // console.log("close", this.demoPolyline)
  // for(let i = 0; i < this.demomarker.length; i++)
  // {
  //   this.demomarker[i].setMap(null);
  // }
  // this.poly_line = []
  // this.demomarker=[]
  // this.demoPolyline=[]
  // this.trackingData = [];
 //  this.seconddaryTrack = [];
  // this.customer_info = [];
  // this.marker=[];
  // this.poly_line=[];
  
}
}


