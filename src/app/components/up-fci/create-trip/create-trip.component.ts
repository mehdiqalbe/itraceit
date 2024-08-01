import { DatePipe } from '@angular/common';
import { APP_BOOTSTRAP_LISTENER, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NavService } from 'src/app/shared/services/nav.service';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { DoBootstrap } from '@angular/core';
import { JsonPipe, KeyValue } from '@angular/common';
import { event } from 'jquery';
declare var bootstrap: any;
declare var $: any;
interface PortableDevice {
  device_id: string;
  device_imei: string;
  device_type: string;
  DeviceLastDateTime: string;
  GPSStatus: string;
  Color: string;
}

interface ApiResponse {
  Data: { [key: string]: PortableDevice };
  DeviceTypeName: string;
}  


@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent implements OnInit {
  tripcreationform_marin: FormGroup;

  constructor(private navServices: NavService, private modalService: NgbModal, private formBuilder: FormBuilder, private router: Router, private service: CrudService, private SpinnerService: NgxSpinnerService, private datepipe: DatePipe) {
    this.tripcreationform_marin = this.formBuilder.group({
      custumerinvoice: this.formBuilder.array([this.gettable()]),
    });
  }
  token: any
  account_id: any
  qDocuments: Map<any, any> = new Map();
  qArrayDocs:any=[]
  qFileLists:any=[]
  qFile:any
  nextId:number=0
  selectedPort:any
  // selectbox = {
  //   selectedOption: null
  // };
  commodityListListselected: any = []
  selectbox: any[] = []
  vList: any = []
  portableF: boolean = true
  tripBoxF:boolean = false
  commodityListA: any = [
  ]
  sourceListdata: any = []
  routedata: any = []
  PortvList: ApiResponse | null = null;
  expensearray: any = []
  expenseListdata: any = []
  docListdata: any = []
  routeId: any = []
  Object = Object;
  imageurl:string[] = [];
  tripdetailsArray: any = []
  invoicearraydata:any=[]
  extraImei:any=[]
  uploadfiledsk:any=[]
  nextTabflag:boolean = true;
  uploadeway:any=[]
  p_name:any=''
  s_name:any=''
  t_name:any=''
  ngOnInit(): void {
    let App = document.querySelector('.app')
    // this.navServices.collapseSidebar = this.navServices.collapseSidebar
    App?.classList.add('sidenav-toggled');

    this.token = localStorage.getItem('AccessToken')!
    console.log("Access", this.token)
    this.account_id = localStorage.getItem('AccountId')!
    this.tTable()
    this.vehicleList()
    this.commodityList()
    this.sourceList()
    // this.routeList()
    this.expenseList()
    this.docList()
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
  addNgselect() {
    // this.selectbox=this.commodityListA
    if (this.selectbox.length < 4) {


      // const data=`<div><ng-select name="subassets" placeholder="" id="ShipmentNo" ngModel=""
      //                                     class="cutombox" required name="shipment_no">
      //                                     <ng-option value="" selected>ING001</ng-option>
      //                                     <ng-option value="">ING001</ng-option>


      //                                 </ng-select></div>`;
      //            this.selectbox.push(data);    
      //            console.log(data);  
      this.selectbox.push({ id: this.selectbox.length, selectedOption: null });
    }
  }
  removeNgselect() {
    this.selectbox.pop();
  }
  tTable() {

    var tbl = $('#TableId')
    var table = $('#TableId').DataTable();
    // table.clear();
    // table.destroy();





    $(document).ready(function () {



      $('#TableId').DataTable({


        pageLength: 2,
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
  gettable(): FormGroup {
    // alert(0)
    return this.formBuilder.group({
      destination: new FormControl(''),
      customer: new FormControl(''),
      invoiceNo: new FormControl(''),
      invoiceDate: new FormControl(''),
      eta: new FormControl(''),
      upload: new FormControl(''),
      rows: new FormGroup({
        invoicearray: this.formBuilder.array([this.putNewinvoice()])
      }),


    });

  }
  putNewinvoice() {

    return this.formBuilder.group({
      Product: new FormControl(''),
      tareWeight: new FormControl(''),
      netWeight: new FormControl(''),
      grossWeight: new FormControl(''),
      lotNo: new FormControl(''),
      subLotNo: new FormControl(''),
      lorryNo: new FormControl(''),
      lorryDate: new FormControl(''),
      e_waybill: new FormControl(''),
      upload_e_way: new FormControl(''),
      remarks: new FormControl(''),
    })

  }

  getcustumerinvoice() {
    return this.tripcreationform_marin.get('custumerinvoice') as FormArray;
  }
  addtable() {
    this.getcustumerinvoice().push(this.gettable());
  }
  deletetable(index) {
    this.getcustumerinvoice().removeAt(index);
  }

  invoiceformarry(i: number) {
    return this.getcustumerinvoice().at(i).get('rows') as FormGroup;
  }

  getinvoice(i: number) {


    return this.invoiceformarry(i).get('invoicearray') as FormArray;
  }
  addRow(i: any) {
    this.getinvoice(i).push(this.putNewinvoice());
  }
  deleteRow(i: number, j: number) {
    this.getinvoice(i).removeAt(j);
  }
  selectFileF(event) {
    // this.imageurl = ''
    const file = (event.target).files[0]
    this.uploadfiledsk.push(event.target.files[0])


    const reader = new FileReader();
    reader.onload = () => {
      // this.imageurl = reader.result as string;
    }
    reader.readAsDataURL(file)
    console.log("file", this.uploadfiledsk)
    // console.log("file stringyfy", JSON.stringify(this.uploadfiledsk))



  }
  submitForm(data) {



    console.log("invoice", data);
    var demoarray: any = new Array();
    var temp_data = new Array();

    var temp_array: any = [];
    for(var i=0;i<data.custumerinvoice.length;i++)
      {
      // alert(0)

      temp_data=[];
      for(var j=0;j<data.custumerinvoice[i].rows.invoicearray.length;j++)
        {
        // 
        var tem_invoice:any=[]
        tem_invoice={
          "lot_no":data.custumerinvoice[i].rows.invoicearray[j].lotNo,
          "sub_lot_no":data.custumerinvoice[i].rows.invoicearray[j].subLotNo,
          "product_code":data.custumerinvoice[i].rows.invoicearray[j].Product,
          // "product_id":data.custumerinvoice[i].rows.invoicearray[j].Product,
          "tare_weight":data.custumerinvoice[i].rows.invoicearray[j].tareWeight,
          "net_weight":data.custumerinvoice[i].rows.invoicearray[j].netWeight,
          "gross_weight":data.custumerinvoice[i].rows.invoicearray[j].grossWeight,
          "lorry_no":data.custumerinvoice[i].rows.invoicearray[j].lorryNo,
          "lorry_date":data.custumerinvoice[i].rows.invoicearray[j].lorryDate,
          "eway_bill_no":data.custumerinvoice[i].rows.invoicearray[j].e_waybill,
          "Ewaybill":data.custumerinvoice[i].rows.invoicearray[j].upload_e_way,
          "remark":data.custumerinvoice[i].rows.invoicearray[j].remarks,
          // "invoice_no": data.custumerinvoice[i].invoiceNo,
        }
        temp_data.push(tem_invoice)
        // console.log("temp_data",temp_data);
      }
      ///////////////////////////////////////////////////
      
      // if (data.custumerinvoice[i]?.customer?.customer_id !== undefined) {
        temp_array = {
          "customer_id": data.custumerinvoice[i].customer,
          "Invoice": this.uploadfiledsk[i],
          // "Invoice": data.custumerinvoice[i].upload,
          // "customer_name": data.custumerinvoice[i].customer?.customer_name,
          // "customer_code": data.custumerinvoice[i].customer?.customer_code,
          // "customer_geocoord": data.custumerinvoice[i].customer?.customer_geocoord,
          // "radius": data.custumerinvoice[i].customer?.customer_radius,
          // "destination_id": data.custumerinvoice[i].destination?.destination_id,
          // "destination_name": data.custumerinvoice[i].destination?.destination_name,
          // "destination_geocoord": data.custumerinvoice[i].destination?.destination_geocoord,
          // "destination_code": data.custumerinvoice[i].destination?.destination_code,
          "invoice_date": data.custumerinvoice[i].invoiceDate,
          "invoice_no": data.custumerinvoice[i].invoiceNo,
          "eta": data.custumerinvoice[i]?.eta,
          "INVOICE": temp_data,
        }
        demoarray.push(temp_array)
      }
    // }
        this.invoicearraydata=demoarray
    console.log('created',demoarray)
    // this.invoicedetails=value;
  }
  openTab(id: any,form ) {
    this.tripDetailsF(form?.value,form)
    console.log(this.nextTabflag,"open tab",form.value);
    
    if(this.nextTabflag)
    {
     this.helpingTab(id) 
    } 
  }
  helpingTab(tabId: string): void {
    const allTabs = document.querySelectorAll('.tab-pane');
    const selectedTab = document.getElementById(tabId);
    allTabs.forEach(tab => {
      tab.classList.remove('show');
    });
    selectedTab?.classList.add('show');

    setTimeout(() => {
      allTabs.forEach(tab => {
        tab.classList.remove('active');
      });
      if (selectedTab) {
        selectedTab.classList.add('show','active');
      }
    }, 500); // 1000 milliseconds = 1 second

    const allButtons = document.querySelectorAll('.nav-link');
    allButtons.forEach(button => {
      button.classList.remove('active');
    });
    const selectedButton = document.getElementById(tabId + '-tab');
    if (selectedButton) {
      selectedButton.classList.add('active');
    }
  }
  vehicleList() {
    // let vList:any=[]
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    // formdataCustomer.append('GroupId', '0986');
    // formdataCustomer.append('UserType', 'master');
    // formdataCustomer.append('DataFilter', js);


    this.service.vehicleLists(formdataCustomer).subscribe((res: any) => {
      console.log("vehicle", res);
      for (const [key, value] of Object.entries(res.vehicle_data)) {

        this.vList.push(value);
      }
      console.log("vehicleList", this.vList);
     this.PortvList=res?.portable_device_data
     console.log("Porttable",this.PortvList);
     

    })
  }
  commodityList() {
    // let vList:any=[]
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    // formdataCustomer.append('GroupId', '0986');
    // formdataCustomer.append('UserType', 'master');
    // formdataCustomer.append('DataFilter', js);


    this.service.commoditysList(formdataCustomer).subscribe((res: any) => {
      // console.log("commodity",res);
      this.commodityListA = res.data;
      console.log("commodity", this.commodityListA);


      // for (const [key, value] of Object.entries(res.FIXED_vehicle_mapping_data)) {

      // //  this. vList.push(value);
      // }


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
  sourceList() {
    // let vList:any=[]
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    // formdataCustomer.append('GroupId', '0986');
    // formdataCustomer.append('UserType', 'master');
    // formdataCustomer.append('DataFilter', js);


    this.service.sourcesList(formdataCustomer).subscribe((res: any) => {
      console.log("sourceList", res);
      // this.commodityListA = res.data;
      // console.log("commodity",this.commodityListA);


      for (const [key, value] of Object.entries(res.source_data)) {


        this.sourceListdata.push(value);
      }


    })
  }
  enablePortable(e) {
    let l: any = document.getElementById('portable')
    if (e.target.checked == false) {
      this.portableF = true;
      l.style.border = "0.5px solid #FF0000";
      //  console.log("enablePortable", this.portableF);
    }
    else if (e.target.checked == true) {
      this.portableF = false;
      // console.log("enablePortable", this.portableF);

      l.style.border = "0.5px solid #1D4380";
    }
  }
  tripf(e)
  {
    if (e.target.checked == false) {
       this.tripBoxF=true;
    }
    else if (e.target.checked == true) {
      this.tripBoxF=false;
    }
  }
  addexpenseF(value: any)
   {
    let audit:any
    if(value.type==true)
      {
        audit="Credit"
      }
      else{
        audit="Debit"
      }
  
    let data = {
      'date': value.expenseTime,
      'expense_type_id': value.expensetype.id,
      'expense_type_name': value.expensetype.name,
      'amountType': value.expensevalue,
      'remark': value.remarks,
      'credit': audit
    }
    this.expensearray.push(data)
    console.log("addexpenseF", this.expensearray);
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
  docList() {
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    // formdataCustomer.append('GroupId', '0986');
    // formdataCustomer.append('UserType', 'master');
    // formdataCustomer.append('DataFilter', js);


    this.service.docListS(formdataCustomer).subscribe((res: any) => {
      console.log("docList", res);
      this.docListdata = res.data;

    })
  }
  tripDetailsF(value, form: NgForm)
   {
    this.nextTabflag = false;
    this.tripdetailsArray=[]
    console.log("tripDetails", value, form);
    this.tripdetailsArray = value;

    if (form.invalid) {
      this.nextTabflag = true;
      Object.keys(form.controls).forEach(field => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      
    }
     else 
    {
      // $('#nav-District-tab').click();
      // Form is valid, proceed to the next step
      // this.openTab('nav-District-tab');
      // this.nextTabflag = false;

      // this.tripdetailsArray=value;
    }
  







  }
 

  tripdetailsreset(form: NgForm) {
    form.reset();
    this.extraImei.imei3=""
    this.extraImei.imei2=""
    this.extraImei.imei1=""
    this.p_name=""
    this.s_name=""
    this.t_name=""
    this.portableF=true
    let l:any=document.getElementById("enablePortableID")
    l.checked=false
    this.nextTabflag = true;
  }
  resetexpence(form: NgForm)
  {
    console.log("reset",form);
  }
  findRoute(id) {
    console.log("findRoute", id);

    this.customerList(id)
  }
  customerList(id) {
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    formdataCustomer.append('RouteId', id);
    // formdataCustomer.append('UserType', 'master');
    // formdataCustomer.append('DataFilter', js);


    this.service.listByrouteS(formdataCustomer).subscribe((res: any) => {
      console.log("customerList", res);
      this.routeId = (res.data);
      console.log("customerList", this.routeId);

    })
  }
  selectFile(event) {
    this.uploadfiledsk.push(event.target.files[0])
    // this.uploadfiledsk=(event.target.files[0])
    // console.log("uploadfiledsk", event.target.files)
    // this.imageurl = ''
    // const file = (event.target).files[0]
    // // this.uploadfiledsk = event.target.files[0]


    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.imageurl = reader.result as string;
    // }
    // reader.readAsDataURL(file)
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        
        const file = input.files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageurl.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
    


  }
  removeImage(index: number): void {
    this.imageurl.splice(index, 1);
  }
  commodityListsel(value) {
    // console.log("commodityList",value);
    this.commodityListListselected.push(value);
  }
 
  docFile(e)
  {

  }
  resetFileInput(fileInput: HTMLInputElement): void {
    console.log("resetFileInput",fileInput);
    fileInput.value = '';
    this.uploadfiledsk=null;
    this.imageurl=[];

  }
  uploadewaybill(data:any,indexC:any,indexI:any){
    
    // data.target.value = null;
   
    var image=data.target.files![0];
 
    if(!this.uploadeway.hasOwnProperty(indexC)){
      this.uploadeway[indexC] = [];
    }

    
    if(!this.uploadeway[indexC].hasOwnProperty(indexI)){
      this.uploadeway[indexC][indexI] = [];
    }
    
    this.uploadeway[indexC][indexI] = image;
    // console.log("ljljljj",this.uploadeway[indexC][indexI]);
// alert(0)
    // Access the specific custumerinvoice FormGroup within the custumerinvoice FormArray
    const custumerinvoiceArray = this.tripcreationform_marin.get('custumerinvoice') as FormArray;
    const specificCustumerinvoiceFormGroup = custumerinvoiceArray.at(indexC) as FormGroup;
    
    // Access the invoicearray FormArray within the specific custumerinvoice FormGroup
    const invoicearrayArray = specificCustumerinvoiceFormGroup.get('rows.invoicearray') as FormArray;
    
    // Access the specific FormGroup within the invoicearray FormArray
    var specificInvoiceFormGroup = invoicearrayArray.at(indexI) as FormGroup;
    
    // alert(1)
    // Use patchValue to update the tareWeight and netWeight controls within that FormGroup
    
    const reader = new FileReader();
    if (data.target.files && data.target.files.length) {
      const [file] = data.target.files;
      // console.log 
      reader.readAsDataURL(file);
      reader.onload = () => {
        specificInvoiceFormGroup.patchValue({
          reader: reader.result
        });
     
      }
    }
     console.log("rr", this.uploadeway) 
  }
    
  imeiListF(e)
  { this.s_name=''
   this.p_name=''
   this.t_name=''
    this.extraImei=[];
    console.log("imeiListF", e);
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    formdataCustomer.append('VehicleID',e.vehicle_id);
    // formdataCustomer.append('UserType', 'master');
    // formdataCustomer.append('DataFilter', js);


    this.service.ImeiLIstS(formdataCustomer).subscribe((res: any) => {
      console.log("imeiListF", res);
      this.extraImei=res
      if(this.extraImei.IMEI_1_data!="")
      {
        this.p_name=res?.IMEI_1_data?.device_type_name
      }
      if(this.extraImei?.IMEI_2_data!="")
      {
        this.s_name=res?.IMEI_2_data?.device_type_name
      }
      if(this.extraImei?.IMEI_3_data!="")
      {
        this.t_name=res?.IMEI_3_data?.device_type_name
      }
      
      // console.log("customerList", this.routeId);

    })
  }
  cancelTrip()
  {
    if (confirm("Do you want to proceed?")) {
      // User clicked "OK"
      alert("You clicked OK!");
      this.router.navigate(['/ILgic/Trip']);
    }
    else {
      // User clicked "Cancel"
      alert("You clicked Cancel!");
    }
  }
  createTripF(tripForm,customerForm,expenseForm)
  {
  
  console.log(tripForm,"==",tripForm.value);
  
   this.tripDetailsF(tripForm.value,tripForm)
   this.submitForm(customerForm)
   const docData=this.qDocumentDetailsF()
   console.log(docData);
   this.addexpenseF(expenseForm)
   console.log("files",this.uploadfiledsk)

   ////////////////////////////////////////////////////////////////////////////////////
   console.log(this.tripdetailsArray?.commodity,"create trip commodity");

       if(tripForm.valid)
{
   ////////////////////////////////////////////////////////////////////////////////////
    if(this.tripdetailsArray?.commodity?.id)
       this.commodityListListselected.push(this.tripdetailsArray?.commodity);

      console.log(this.commodityListListselected,"create trip commodity");
      
   console.log("invoicedataF",  this.invoicearraydata)
   console.log("createTripdetailsF", this.tripdetailsArray)
   console.log("selectboc", this.commodityListListselected);
   let tripdetails = {
     "TRIP": {
       "trip_id": this.tripdetailsArray?.tripId,
       "vehicle_id": this.tripdetailsArray?.Vname?.vehicle_id,


       "vehicle_no": this.tripdetailsArray?.Vname?.vehicle_number,
       "portable_imei": this.tripdetailsArray?.Imei?.device_imei,
       "imei_no_type3":this.tripdetailsArray?.Imei?.device_type,
       "driver_name": this.tripdetailsArray.Driver1Name,
       "driver_mobile": this.tripdetailsArray.Driver1Mobno,

       "route_id": this.tripdetailsArray.route_name,
       "remarks": this.tripdetailsArray.remarks,
       "run_date": this.tripdetailsArray.runDate,
       "opening_odometer_reading": this.tripdetailsArray.odometer,
       "scheduled_in_transit_time": this.tripdetailsArray.transit_Time,
       // "commodity":this.tripdetailsArray.remarks,
       "CUSTOMER":  this.invoicearraydata,
       // "scheduled_in_transit_time":this.tripdetailsArray.remarks,

     },
     // "Trip_Expense":this.expensearray,
     // "Trip_docs":this.uploadfiledsk
   }
   // if(this.nextTabflag==true)
   //   {
   //     alert("Please Fill Trip Details ")
   //   }
   //   else{

   
   var formdataCustomer = new FormData()
   formdataCustomer.append('AccessToken', this.token)
   formdataCustomer.append('fields', JSON.stringify(tripdetails));
   formdataCustomer.append('Doc_Data',JSON.stringify(docData))
   this.qFileLists.forEach((el,index) => {
    console.log(el,"qFileLists");
    formdataCustomer.append(`Trip_docs[${index}]`,el)
   });
   this.qFileLists=[];
  //  formdataCustomer.append('Trip_docs[]',this.qFileLists)
   formdataCustomer.append('Ewaybill', this.uploadeway);
   formdataCustomer.append('Trip_Expense',JSON.stringify(this.expensearray));

   console.log(formdataCustomer);
  

   this.service.createTripS(formdataCustomer).subscribe((res: any) => {
     console.log("tripcreationres",res);
     alert(res?.status )
    



   })
 }

 }
  qDocumentDetailsF(){
    const docData: any[] = [];
    const tripDocs: any[] = [];
    const formData = new FormData();

    this.qDocuments.forEach((doc, index) => {
      docData.push({
        DocTypeId: doc.type?.id,
        DocNo: doc?.number,
        IssueDate: doc?.issueDate,
        ExpiryDate: doc?.expiryDate,
        Remarks: doc?.remarks,
        Trip_docs:doc?.file||''
      });
      if(doc.file)
        this.qFileLists.push(doc.file)
    });
  formData.append("docs",JSON.stringify(this.qDocuments))
    console.log(formData,"----",docData);
    return docData
  }
  
  addDocument(form: any) {
    if (form.valid && this.qFile) {
      const newDocument = {
        id: this.nextId++,
        type: form.value.docName,
        number: form.value.docNumber,
        issueDate: form.value.issueDate,
        expiryDate: form.value.expiryDate,
        remarks: form.value.Remarks,
        image: [...this.imageurl], // create a copy of the array
        file: this.qFile
      };
      // this.qArrayDocs.push(newDocument)
      this.qDocuments.set(newDocument.id, newDocument);
      form.reset();
      // this.imageurl = [];
      // this.qFile = null;
      console.log(this.qDocuments);
    
    } else {
      alert('Please fill all the fields and select a file.');
    }
  }
  removeDocument(id: number) {
    this.qDocuments.delete(id);
  }
  qSelectFile(event){
    const file = (event.target).files[0]
    this.qFile=file
    console.log(file);
    
  }
  viewDocument(blob: Blob): void {
    if (blob) {
      const url = URL.createObjectURL(blob);
      console.log(url);
      
      window.open(url, '_blank');
    } else {
      alert('No document available to view.');
    }
  }
  onPortImeiChange(event: any) {
  
    this.selectedPort=event
    console.log('Selected item:', this.selectedPort);
  }
}
