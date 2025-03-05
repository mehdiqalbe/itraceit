import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NavService } from 'src/app/shared/services/nav.service';

declare var $: any;

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  filterForm_Q!: FormGroup;
  billingForm!: FormGroup;

  token: any = '';
  isLoadingBilling: Boolean = false;
  filterData: Array<any> = [];
  customers: Array<{ id: string; value: string }> = [];
  customerItemsCount: number = 0;
    constructor(private datepipe: DatePipe,private router: Router,private navServices: NavService,private service:CrudService,private SpinnerService: NgxSpinnerService,    private fb: FormBuilder,
      private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('AccessToken')!;
    this.initForms();
    this.sidebarToggle();
  }
  initForms(): void {
    this.billingForm = this.fb.group({
      transporter: [null, Validators.required],
      vehicles: this.fb.array([]),
    });

    this.filterForm_Q = this.fb.group(
      {
        dateFrom: ['', Validators.required],
        dateTo: ['', Validators.required],
        transporter: [null, Validators.required],
        status: [null, Validators.required],
        reportType: [null, Validators.required], // Added reportType field
        invoice: [''], // Added invoice field (assuming it's optional)
      },
      {
        // validators: dateRangeValidator(),
      }
    );
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
  refreshPage(){
    // this.initApiCalls()
  }
  onFilter(): void {
    const filterValues = this.filterForm_Q.value;
    console.log(this.filterForm_Q);
    this.getBillingDetails(filterValues);
  }
  getBillingDetails({ transporter, dateFrom, dateTo, status }): void {
    this.isLoadingBilling = true; // Start loading
    const formData = new FormData();
    formData.append('AccessToken', this.token);
    formData.append('customer_id', transporter);
    formData.append('from_date', dateFrom);
    formData.append('to_date', dateTo);
    formData.append('status', status);

    // this.crudService.billingDetails(formData).subscribe(
    //   (response) => {
    //     this.filterData = response?.data;
    //     if (this.filterData.length === 0)
    //       alert(
    //         'Sorry, no data was found with the provided values. Please try again with different values.'
    //       );
    //     this.isLoadingBilling = false;
    //     this.billingDetailsTable();
    //     console.log('full', response);
    //     this.customerItemsCount = this.filterData.filter(
    //       (item) => item?.Raised_By === 'customer'
    //     ).length;
    //     console.log(this.customerItemsCount);
    //   },
    //   (error) => {
    //     console.error('error getting data', error);
    //     this.isLoadingBilling = false;
    //   }
    // );
  }
  billingDetailsTable() {
    var tbl = $('#billing-table');
    var table = $('#billing-table').DataTable();
    table.clear();
    table.destroy();

    $(document).ready(function () {
      $('#billing-table').DataTable({
        language: {
          search: '',
          searchPlaceholder: 'Search',
        },
        pageLength: 10,
        fixedHeader: true,
        // // scrollX: true,
        sScrollY: '450px',
        scrollCollapse: true,
        paging: true,
        sScrollX: true,
        destroy: false,
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
            //   $(tbl).find('tbody tr:first-child td').each(() => {
            //     if ($(this).attr('colspan')) {
            //       for (var i = 1; i <= $(this).attr('colspan'); i++) {
            //         colCount.push('*');
            //       }
            //     } else { colCount.push('*'); }
            //   });
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
