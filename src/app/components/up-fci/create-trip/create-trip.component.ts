import { DatePipe } from '@angular/common';
import { APP_BOOTSTRAP_LISTENER, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NavService } from 'src/app/shared/services/nav.service';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray, NgForm, AbstractControl, ValidationErrors, Form, ValidatorFn } from '@angular/forms';
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

  constructor(private fb: FormBuilder,private navServices: NavService, private modalService: NgbModal, private formBuilder: FormBuilder, private router: Router, private service: CrudService, private SpinnerService: NgxSpinnerService, private datepipe: DatePipe) {
    this.tripcreationform_marin = this.formBuilder.group({
      custumerinvoice: this.formBuilder.array([this.gettable()]),
    });
  }
  token: any
  UserType:any
  UserCategory:any
  drivenVehicleTypes: string[] = ['HMV', 'LMV', 'MGV'];
  customerLists:any=''
  states:any = [];
  cities: any = [];
  addDriverForm!: FormGroup;

  
  account_id: any
  todayDate!: string;
  qDocuments: Map<any, any> = new Map();
  qArrayDocs:any=[]
  qFileLists:any=[]
  qFile:any
  vehicleDoc:any=[]
  vehicleDocImag:any={
    6:'assets/icon/Icon/Pollution Certificate.png',
    5:'assets/icon/Icon/RC.png',
    7:'assets/icon/Icon/Insurance.png',
    13:'assets/icon/Icon/Fitness.png',
    10:'assets/icon/Icon/National Goods Permit.png'
  }
  driverDoc:any=[]
  driverDocImage:any={
   3:'assets/icon/Icon/Driving License.png',
   1:'assets/icon/Icon/Aadhar.png',
   2:'assets/icon/Icon/Pan Card.jpg',
   15:'assets/icon/Icon/Voter id card.jpg',
   14:'assets/icon/Icon/Passsport.png',
  }
  driverName=''
  driverId=''
  driverDocMessage=''
  pendingDocument=0
  disableDriverText=false
  hasCalledDriverApi:boolean=false
  vehicleDocForm!: FormGroup;
  driverDocForm!: FormGroup;
  showDriver2:boolean=false
  GroupId:any=''
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
    this.GroupId=localStorage.getItem('GroupId')
    this.token = localStorage.getItem('AccessToken')!
    this.UserType = localStorage.getItem('UserType')!;
    console.log("Access", this.token)
    this.account_id = localStorage.getItem('AccountId')!
    this.tTable()
    this.vehicleList()
    this.commodityList()
    this.sourceList()
    // this.routeList()
    this.expenseList()
    this.docList()
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];


    this.vehicleDocForm = this.formBuilder.group({
      documents: this.formBuilder.array([])
    });
    this.driverDocForm = this.formBuilder.group({
      driverDocuments: this.formBuilder.array([])
    });




    this.initForm();

    if(this.UserType=='13')
      {
        this.fetchTransporters()
        this.UserCategory='Corporate'
          this.addDriverForm.addControl('customer', this.fb.control(null, Validators.required));
      }





  }
  
  initForm(){
    this.addDriverForm = this.fb.group({
      DriverName: ['', Validators.required],
      Gender: [null, Validators.required],
      dob: ['', [Validators.required, this.dateValidator, this.ageValidator(18)]],
      Mobilenum: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      atlMobile: ['', Validators.pattern(/^[6-9]\d{9}$/)],
      Email: ['', [Validators.email]],
      State: [null, Validators.required],
      City: [null, Validators.required],
      Address: ['', Validators.required],
      PinCode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      DrivingSince: [null, Validators.required],
      DrivenvehicleType: [null, Validators.required], 
    },);
    this.stateData()
  }
  onStateChange(state,cityId=''){
    const formData=new FormData();
    formData.append("AccessToken",this.token)
    formData.append('StateID',state?.StateID)
    console.log(state);
    this.cities = [];
    if(!cityId)
    {
    this.addDriverForm.get('City')?.setValue(null);
    this.addDriverForm.get('City')?.markAsTouched();
    this.addDriverForm.get('City')?.updateValueAndValidity();
    }
   
    console.log(this.addDriverForm);
    
    if(state?.StateID)
    {
      this.service.cityData(formData).subscribe(
        response => {
          this.cities=response
          console.log(response);
          
        },
        error => {
          console.error('Error sending data:', error);
        }
      ) 
    }
   
  }
  stateData(){
    const formData=new FormData();
    this.token=localStorage.getItem('AccessToken')||'';
    formData.append("AccessToken",this.token)
    this.service.stateData(formData).subscribe(
      response => {
         this.states=response
        console.log(response);
        
      },
      error => {
        console.error('Error sending data:', error);
      }
    )
  }
  dateValidator(control: AbstractControl): ValidationErrors | null {
    const dateValue = control.value;
    if (!dateValue) {
      return null;
    }
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) {
      return { 'invalidDate': true };
    }
    return null;
  }
  ageValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateValue = control.value;
      if (!dateValue) {
        return null;
      }
      const dob = new Date(dateValue);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return age >= minAge ? null : { 'ageInvalid': true };
    };
  }
  fetchTransporters(): void {
    this.token = localStorage.getItem('AccessToken') || '';
    const formData = new FormData();
    formData.append('AccessToken', this.token);

    this.service.getTransporter(formData).subscribe(
      (response) => {
        this.customerLists = response;
        console.log(response);
      },
      (error) => {
        console.error('Error sending data:', error);
      }
    );
  }
  driverForm(){
    if (this.addDriverForm.invalid) {
      this.addDriverForm.markAllAsTouched(); // Marks all fields as touched
      console.log('Form is invalid');
      return;
    }
    const formData=new FormData()
    formData.append('AccessToken',this.token)
    console.log(this.addDriverForm.value);
   
     
        const driverDetails = {
          DriverName: this.addDriverForm.get('DriverName')?.value,
          Gender: this.addDriverForm.get('Gender')?.value,
          DOB: this.addDriverForm.get('dob')?.value,
          MobileNo: this.addDriverForm.get('Mobilenum')?.value,
          AlternateMobNo: this.addDriverForm.get('atlMobile')?.value || '',
          Email: this.addDriverForm.get('Email')?.value,
          State_id: String(this.addDriverForm.get('State')?.value?.StateID),
          City_id: String(this.addDriverForm.get('City')?.value?.CityID),
          Address: this.addDriverForm.get('Address')?.value,
          Pincode: this.addDriverForm.get('PinCode')?.value,
          YrsofExp: String(this.addDriverForm.get('DrivingSince')?.value),
          DrivenVehType: this.addDriverForm.get('DrivenvehicleType')?.value
        };
        if (this.UserType === '13') {
          driverDetails['TransporterId'] = String(this.addDriverForm.get('customer')?.value?.id); // replace 'some value' with the appropriate value
        }
        formData.append('UserCategory',this.UserCategory)
        formData.append('DriverDetails',JSON.stringify(driverDetails))
        console.log(formData);
          this.SpinnerService.show("qDriverFormSpinner")
          this.service.createDriver(formData).subscribe(
            response => { 
            if(response.status==='success'){
                 alert("Driver Added Successfully")
            }    
                else
                 {
                  alert(response?.error)
                  console.log(response.status);
                  this.SpinnerService.hide("qDriverFormSpinner")
                 }
               
              
              
              console.log('Driver created successfully', response);
            },
            error => {
              console.error('Error creating driver:', error);
            }
          );
        
       
        console.log(this.addDriverForm);
        
      
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
  console.log(data,"customer invoice");
  


    console.log("invoice", data);
    var demoarray: any = new Array();
    var temp_data = new Array();

    var temp_array: any = [];
    for(var i=0;i<data.custumerinvoice.length;i++)
      {
      // alert(0)

      temp_data=[];
  
      // temp_data.push(invoice)
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
          "expiry_date":data.custumerinvoice[i].rows.invoicearray[j].lorryDate?.replace('T'," "),
          "eway_bill_no":data.custumerinvoice[i].rows.invoicearray[j].e_waybill,
          "remark":data.custumerinvoice[i].rows.invoicearray[j].remarks,
          // "invoice_no": data.custumerinvoice[i].invoiceNo,
        }
        temp_data.push(tem_invoice)
        // console.log("temp_data",temp_data);
      }
      ///////////////////////////////////////////////////
      const invoice={
        "invoice_date": data.custumerinvoice[i].invoiceDate?.replace('T'," "),
        "invoice_no": data.custumerinvoice[i].invoiceNo,
        "eta": data.custumerinvoice[i]?.eta?.replace('T'," "),
        "PRODUCT": temp_data,
      }
      // if (data.custumerinvoice[i]?.customer?.customer_id !== undefined) {
    
        temp_array = {
          "customer_id": data.custumerinvoice[i].customer,
          "INVOICE": invoice
          // "Invoice": data.custumerinvoice[i].upload,
          // "customer_name": data.custumerinvoice[i].customer?.customer_name,
          // "customer_code": data.custumerinvoice[i].customer?.customer_code,
          // "customer_geocoord": data.custumerinvoice[i].customer?.customer_geocoord,
          // "radius": data.custumerinvoice[i].customer?.customer_radius,
          // "destination_id": data.custumerinvoice[i].destination?.destination_id,
          // "destination_name": data.custumerinvoice[i].destination?.destination_name,
          // "destination_geocoord": data.custumerinvoice[i].destination?.destination_geocoord,
          // "destination_code": data.custumerinvoice[i].destination?.destination_code,
          // "invoice_date": data.custumerinvoice[i].invoiceDate,
          // "invoice_no": data.custumerinvoice[i].invoiceNo,
          // "eta": data.custumerinvoice[i]?.eta,
          // "PRODUCT": temp_data,
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
    
    if(!this.nextTabflag)
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
    }, 300); // 1000 milliseconds = 1 second

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
  addexpenseF(form: any)
   {
    if(form.valid){
    let value=form?.value
    console.log(form);
    
    let audit:any
    if(value.type==true)
      {
        audit="Credit"
      }
      else{
        audit="Debit"
      }
  
    let data = {
      'date': value.expenseTime?.replace('T'," "),
      'expense_type_id': value.expensetype.id,
      'expense_type_name': value.expensetype.name,
      'amount': value.expensevalue,
      'remark': value.remarks,
      'credit': audit
    }
    this.expensearray.push(data)
    console.log("addexpenseF", this.expensearray);
    form.reset()
  }
  else{
    form.control.markAllAsTouched();
  }
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
   
  
  async vehicleData(e)
  { this.s_name=''
   this.p_name=''
   this.t_name=''
    this.extraImei=[];
    console.log("imeiListF", e);
   
    if (e) {
      this.ImeiListCall(e);
  
      try {
        const res = await this.DocListCall(e?.vehicle_number, 'vehicle');
        const filteredDocuments=res?.DocumentList||[]
        console.log(filteredDocuments,"filterdoc");
        
        const validDocTypeIds = new Set(['5', '6', '7', '13', '10']);
        this.vehicleDoc = filteredDocuments.filter((doc: any) => validDocTypeIds.has(String(doc.doc_type_id)));
      } catch (error) {
        console.error('Error fetching or filtering documents:', error);
      }
    } else {
      console.log('Trip: vehicle event empty');
    }
  }
  ImeiListCall(e){
    var formdataCustomer = new FormData()
    formdataCustomer.append('AccessToken', this.token)
    formdataCustomer.append('VehicleID',e?.vehicle_id);
this.service.ImeiLIstS(formdataCustomer).subscribe((res: any) => {
  // console.log("imeiListF", res);
  this.extraImei={...res}
  console.log("extraimei", this.extraImei)
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
  DocListCall(e: string, type: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("AccessToken", this.token);
      formData.append("Type", type);
      formData.append("Number", e);
      console.log(formData);
      
      this.service.qDocVehicleDriver(formData).subscribe(
        (res: any) => {
          console.log("createTrip:docList", res);
          resolve(res);
        },
        (error: any) => {
          console.error('Error fetching document list:', error);
          reject(error);
        }
      );
    });
  }
 async onMobileNumberChange(value: number) {
    const mobileNumber = value?.toString();
    if (mobileNumber && mobileNumber?.length === 10 && !this.hasCalledDriverApi) {
      console.log(value);
      this.hasCalledDriverApi=true
      try {
        const res = await this.DocListCall(mobileNumber, 'driver');
        console.log(res);
        
        if(res?.Status==='success')
        {
          const filteredDocuments=res?.DocumentList||[]
           this.driverName=filteredDocuments[0]?.DriverName
           this.driverId=filteredDocuments[0]?.DriverId
           this.disableDriverText=true
          console.log(filteredDocuments,"filterdoc");
          
          const validDocTypeIds = new Set(['3', '1', '2', '15', '14']);
          this.driverDoc = filteredDocuments.filter((doc: any) => validDocTypeIds.has(String(doc.doc_type_id)));
          console.log(this.driverDoc,"filter driver document");
          this.driverDocMessage=''
        }
        else if(res?.Status=='failed'){
           this.driverDocMessage=res?.Message
           this.disableDriverText=false
        }
        
      } catch (error) {
        console.error('Error fetching or filtering documents:', error);
      }
    //  console.log(docs);   
    }
    else if(mobileNumber?.length!==10){
      this.driverDocMessage=''
      this.hasCalledDriverApi=false
      this.disableDriverText=false
      this.driverName=''
       this.driverDoc=[]
    }
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


   ////////////////////////////////////////////////////////////////////////////////////
   console.log(this.tripdetailsArray?.commodity,"create trip commodity");
   

       if(tripForm.valid)
{
  if(confirm("Are you sure you want to create this trip?"))
  {
  this.submitForm(customerForm)
  const docData=this.qDocumentDetailsF()
  console.log(docData);
  console.log("files",this.uploadfiledsk)
   ////////////////////////////////////////////////////////////////////////////////////
    if(this.tripdetailsArray?.commodity?.id)
       this.commodityListListselected.push(this.tripdetailsArray?.commodity);
    
      console.log(tripForm.value,"tripform")
      
      
      console.log(this.commodityListListselected,"create trip commodity");
      
   console.log("invoicedataF",  this.invoicearraydata)
   console.log("createTripdetailsF", this.tripdetailsArray)
   console.log("selectboc", this.commodityListListselected);
   let tripdetails = {
     "TRIP": {
       "challan_number": this.tripdetailsArray?.challan_number,
       "vehicle_id": this.tripdetailsArray?.Vname?.vehicle_id,


       "vehicle_no": this.tripdetailsArray?.Vname?.vehicle_number,
       "portable_imei": this.tripdetailsArray?.Imei?.device_imei||'',
       "imei_no_type3":this.tripdetailsArray?.Imei?.device_type||'',
       "driver_name": this.tripdetailsArray.Driver1Name||this.driverName,
       "driver_mobile": this.tripdetailsArray.Driver1Mobno,
       "driver_name2":this.tripdetailsArray.Driver2Name||'',
       "driver_mobile2":this.tripdetailsArray.Driver2Mobno||'',
       "route_id": this.tripdetailsArray.route_name,
       "remarks": this.tripdetailsArray.remarks,
       "run_date": this.tripdetailsArray.runDate?.replace('T'," "),
       "opening_odometer_reading": this.tripdetailsArray.odometer,
       "sync_device_time":this.extraImei?.IMEI_1_data?.DeviceLastDateTime||'',
       "sync_device_status":this.extraImei?.IMEI_1_data?.GPSStatus||'',
       "sync_device_time2":this.extraImei?.IMEI_2_data?.DeviceLastDateTime||'',
       "sync_device_status2":this.extraImei?.IMEI_2_data?.GPSStatus||'',
       "sync_device_time3":this.tripdetailsArray?.Imei?.DeviceLastDateTime||"",
       "sync_device_status3":this.tripdetailsArray?.Imei?.GPSStatus||"",
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
     if(res?.status==='success')
     {
      alert(res?.Message)
      this.router.navigate(['/ILgic/Trip']);
     }
     else
     alert(res?.Message )

   })
  }
  else{
    console.log("trip cancel");
    
  }
 }else{
  alert('Fill all the trip details')
 }

 }
  qDocumentDetailsF(){
    const docData: any[] = [];
    const tripDocs: any[] = [];
    const formData = new FormData();

    this.qDocuments.forEach((doc, index) => {
      docData.push({
        DocTypeId: doc.type?.id||'',
        DocNo: doc?.number||'',
        IssueDate: doc?.issueDate||'',
        ExpiryDate: doc?.expiryDate||'',
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


  openDriverVehicleModal(type)
  {
    if(type==='vehicle')
    this.setVehicleDocuments(this.vehicleDoc);
    else
     this.setDriverDocuments(this.driverDoc)
  }
  createDocumentFormGroup(doc: any = {}): FormGroup {
    return this.formBuilder.group({
      is_doc: [doc?.is_doc || ''],
      previewUrl:[doc?.file_path||''],
      DocId:[doc?.DocId||''],
      doc_type_id: [doc?.doc_type_id || ''],
      doc_name: [doc?.doc_name || ''],
      doc_no: [doc?.doc_no || ''],
      issue_date: [doc?.issue_date || ''],
      expiry_date: [doc?.expiry_date || ''],
      remarks: [doc?.remarks || ''],
      file_path: [doc?.file_path || '']
    });
  }
  setVehicleDocuments(vehicleDoc: any[]): void {
    const documentFormGroups = vehicleDoc.map(doc => this.createDocumentFormGroup(doc));
    const documentFormArray = this.formBuilder.array(documentFormGroups);
    this.vehicleDocForm.setControl('documents', documentFormArray);
  }
  get documents(): FormArray {
    return this.vehicleDocForm.get('documents') as FormArray;
  }
  setDriverDocuments(driverDoc: any[]): void {
    const documentFormGroups = driverDoc.map(doc => this.createDocumentFormGroup(doc));
    const documentFormArray = this.formBuilder.array(documentFormGroups);
    this.driverDocForm.setControl('driverDocuments', documentFormArray);
  }
  get driverDocuments():FormArray{
    return this.driverDocForm.get('driverDocuments') as FormArray
  }

  onFileSelected(event: any, index: number,type:string): void {
    const file = event.target.files[0];
    let control:FormGroup
    if(type==='vehicle')
     control = this.documents.at(index) as FormGroup;
    else
     control=this.driverDocuments.at(index) as FormGroup
    // control.patchValue({ file_path: file });
    if (file) {
      control.patchValue({ file_path: file });  // Store the file object
  
      const reader = new FileReader();
      reader.onload = () => {
        control.patchValue({ previewUrl: reader.result });  // Store the preview URL
      };
      reader.readAsDataURL(file);
    }
  }
  uploadDocuments(id,type): void {
  
    if(type==='vehicle')
    {
    if (this.vehicleDocForm.invalid) {
      this.vehicleDocForm.markAllAsTouched();
      return;
    }
  }
   else{
    console.log('driver');
    
    if (this.driverDocForm.invalid) {
      this.driverDocForm.markAllAsTouched();
      return;
    }
   }
    this.SpinnerService.show("modalSpinner")

   let documents:FormArray
   if(type==='vehicle')
    documents = this.documents
   else
   documents=this.driverDocuments

   console.log(documents);
   this.pendingDocument=documents.controls.length

    documents.controls.forEach((control, index) => {
      const formData = new FormData();
      if(control.value.file_path)
      {
        formData.append('AccessToken', this.token);
        formData.append('GroupId', this.GroupId);

        
        if(type=='vehicle')
        {
          formData.append('Category', 'vehicle');
          formData.append('VehicleId', id?.vehicle_id);
        }
       else
       {
        formData.append('Category', 'driver');
         formData.append('DriverId', this.driverId);
       }
        formData.append(`DocumentTypeName`, control.value.doc_name);
        formData.append(`DocumentFile`, control.value.file_path);
        formData.append(`DocumentNo`, control.value.doc_no);
        formData.append(`DocumentTypeId`, control.value.doc_type_id);
        formData.append(`IssueDate`, control.value.issue_date);
        formData.append(`ExpiryDate`, control.value.expiry_date);
        formData.append(`Remark`, control.value.remarks||'');
        // console.log('Form Data:', formData);
        if(control.value.DocId)
        {
          formData.append(`DocumentId`, control.value.DocId);
          this.editDocumentCall(formData)
        }
        else{
          this.addDocumentCall(formData)
        }
      }
      else{
        this.onCompleteDocumentIndicator()
      }

      if(this.pendingDocument==0)
        {
          console.log("pending docs");
          
          if(type==='vehicle')
          {
             const modal = bootstrap.Modal.getInstance(document.getElementById('vehcileDocModal'));
        modal.hide();
          }
          else{
            const modal = bootstrap.Modal.getInstance(document.getElementById('driverDocModal'));
            modal.hide();
          }
        }
    
    });    
   
  }
  onCompleteDocumentIndicator = () => {
    this.pendingDocument--;
    if (this.pendingDocument=== 0) {
      // this.loading = false;
      this.SpinnerService.hide("modalSpinner")
        alert('document details updated successfully');
       
    }
  };
  addDocumentCall(formData){
    console.log(formData);
    
    this.service.uploadNewDriverDocument(formData).subscribe(
      response => {
        console.log('Document added successfully', response);
        this.onCompleteDocumentIndicator()
      },
      error => {
        console.error('Error adding document:', error);
        alert(error)
        this.onCompleteDocumentIndicator()
      }
    );
   
  }
  editDocumentCall(formData){
    console.log(formData);
    this.service.uploadEditDriverDocument(formData).subscribe(
      response => {
        console.log('Document edited successfully', response);
        this.onCompleteDocumentIndicator()
      },
      error => {
        console.error('Error editing document:', error);
        alert(error)
        this.onCompleteDocumentIndicator()
      }
    );
    
  }


 






  //   fileRequiredValidator(control: AbstractControl): ValidationErrors | null {
  //   const file = control.get('file_path')?.value;
  //   const docNo = control.get('doc_no')?.value;
  //   const issueDate = control.get('issue_date')?.value;
  //   const expiryDate = control.get('expiry_date')?.value;
  
  //   if (file && (!docNo || !issueDate || !expiryDate)) {
  //     return { fileRequired: true };
  //   }
  
  //   return null;
  // }
}
