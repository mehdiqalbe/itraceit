import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { environment } from '../../../environments/environment';
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { AppConstants } from './common/app.constants';
//import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json',
//   'Authorization': 'basicAuth' })
//   };

  declare var Razorpay: any;
export interface Member {
  $key: string;
  firstName: string;
  lastName: string;
  email: string
  mobileNumber: Number;
  designation: string;
 
  
}
@Injectable({
  providedIn: 'root'
})

export class CrudService {
  // membersRef!: AngularFireList<any>;    // Reference to Member data list, its an Observable
  // memberRef!: AngularFireObject<any>;   // Reference to Member object, its an Observable too

  // Inject AngularFireDatabase Dependency in Constructor
  constructor( private http: HttpClient) { }
   url:any='https://testapi.secutrak.in/dev-app-cv-ilgic/'
   Durl:any='https://api-py.secutrak.in/api/'
   Qurl:any=' https://api-cv2.secutrak.in/api/'
  submitdata(val:any){
    return this.http.post(this.url+'cvDashboard1',val);
  }
  vehicleLists(val:any){
    return this.http.post(this.url+'cv_tripVehicle',val);
  }
  commoditysList(val:any){
    return this.http.post(this.url+'cv_tripCommodity',val);
  }
  sourcesList(val:any){
    return this.http.post(this.url+'cv_tripSource',val);
  }
  routessList(val:any){
    return this.http.post(this.url+'cv_tripRoute',val);
  }
  dashboardS(val:any){
    return this.http.post(this.url+'cv_tripDashboard',val);
  }
  expenseListS(val:any){
    return this.http.post(this.url+'cv_expenseTypes',val);
  }
  docListS(val:any){
    return this.http.post(this.url+'cv_documentTypes',val);
  }
  cancelTripS(val:any){
    return this.http.post(this.url+'cv_tripCancel',val);
  }
  listByrouteS(val:any){
    return this.http.post(this.url+'cv_customerListByRoute',val);
  }
  createTripS(val:any){
    return this.http.post(this.url+'cv_tripCreation',val);
  }
  ImeiLIstS(val:any){
    return this.http.post(this.url+'cv_tripIMEI',val);
  }
  closeS(val:any){
    return this.http.post(this.url+'cv_tripClose',val);
  }
  // chartclickS(val:any){
  //   return this.http.post(this.url+'cvDashboardDetailedData',val);
  // }
  chartclickS(val:any){
    return this.http.post(this.url+'CVDashboardSummaryData/',val);
  }
  walletMasterS(val:any){
    return this.http.post(this.url+'documentWalletMaster',val);
  }
  filtersubmitS(val:any){
    return this.http.post(this.url+'documentWallet',val);
  }
  walletOperationS(val:any){
    return this.http.post(this.url+'documentChangeStatus',val);
  }
  documentAddS(val:any){
    return this.http.post(this.url+'documentAdd',val);
  }
  documentEditS(val:any){
    return this.http.post(this.url+'documentEdit',val);
  }
  documentrenewS(val:any){
    return this.http.post(this.url+'documentRenew',val);
  }
  AddexpenceS(val:any){
    return this.http.post(this.url+'cv_addExpense',val);
  }
  ////////////////////////////deepak python//////////////////////////////////////////////////////////////////////////////
  venderListS(val:any){
    return this.http.post(this.Durl+'transporterdata/',val);
  }
  filterS(val:any){
    return this.http.post(this.Durl+'agreementfilterdata/',val);
  }
  agreementS(val:any){
    return this.http.post(this.Durl+'uploadcvagreementdata/',val);
  }
  ///////////////////////////////mehndi//////////////////////////////////////////////
  public getCustomers( data: FormData): Observable<any> {
    const url = 'https://api-py.secutrak.in/api/orderfilter/';

    console.log(data);
    
    // return this.http.post(url, data);
    return this.http.post<any>(url, data).pipe(
      map(response => response.Filter.customer),
    )
  }
  public getVehicles( data: FormData): Observable<any> {
    const url='http://testapi.secutrak.in/dev-app-cv-ilgic/documentWalletMaster'

    
    // return this.http.post(url, data);
    return this.http.post<any>(url, data)
  }
  public postBillingCustomer(data:FormData):Observable<any> {
    const url='https://api-py.secutrak.in/api/generatebillbytransporter/' 
    // return this.http.post(url, data);
    return this.http.post<any>(url, data)
  }
  public billingDetails(data:FormData):Observable<any>{
    const url='https://api-py.secutrak.in/api/getbillingdetails/'
    return this.http.post<any>(url,data)
  }


  ////////////////////////////////////////////////Customer///////////////////////////////////////////
  public getTransporter( data: FormData): Observable<any> {
    const url = 'https://api-py.secutrak.in/api/transporterdata/';

    console.log(data);
    
    // return this.http.post(url, data);

    return this.http.post<any>(url, data).pipe(
      map(response => {
        if (response.Status == "error")  {
          // this.router.navigate(['/login']);
          console.log('failed');
          return
          
        }
        return response?.Filter?.customer;
      }),
      // catchError(error => {
      //   // Handle error appropriately
      //   console.error('Error occurred:', error);
      //   return [];
      // })
    );
  }

  public getTransporterVehicles( data: FormData): Observable<any> {
    const url = 'https://api-py.secutrak.in/api/vehiclelist/';
    return this.http.post(url, data);

  }

  public  billingStatus( data: FormData): Observable<any> {
    const url = 'https://api-py.secutrak.in/api/billingstatus/';
    return this.http.post(url, data);

  }
  public postBillingTransporter(data:FormData):Observable<any> {
    const url=' https://api-py.secutrak.in/api/generatebillbycustomer/' 
    // return this.http.post(url, data);
    return this.http.post<any>(url, data)
  }
  /////////////////////////////saumya////////////////////////////////////////////
  indentingfilter(val:any){
    return this.http.post(this.Durl+'indentingfilter/',val);
  }
  indentingvehiclesearch(val:any){
    return this.http.post(this.Durl+'indentingvehiclesearch/',val);
  }
  indentrequest(val:any){
    return this.http.post(this.Durl+'indentrequest/',val);
  }
  orderfilter(val:any){
    return this.http.post(this.Durl+'orderfilter/',val);
  }
  orderdata(val:any){
    return this.http.post(this.Durl+'orderdata/',val);
  }
  orderstatus(val:any){
    return this.http.post(this.Durl+'orderstatus/',val);
  }
  documentMasters(val:any){
    
    return this.http.post('https://testapi.secutrak.in/dev-app-cv-ilgic/documentWalletMaster',val);
  }
  documentAdd(val:any){
    
    return this.http.post('https://api.secutrak.in/dev-app-secutrak/documentAdd',val);
  }
  vehicledetails(val:any){
    
    return this.http.post(this.Durl+'vehicledetails/',val);
  }
  driverdetails(val:any){
    
    return this.http.post(this.Durl+'driverdetails/',val);
  }
  indentvehicleassignment(val:any){
    
    return this.http.post(this.Durl+'indentvehicleassignment/',val);
  }
  transporterdata(val:any){
    
    return this.http.post(this.Durl+'transporterdata/',val);
  }
  orderassigneddata(val:any){
    
    return this.http.post(this.Durl+'orderassigneddata/',val);
  }
  
  

  documentEdit(val:any){
    
    return this.http.post('http://testapi.secutrak.in/dev-app-cv-ilgic/documentEdit',val);
  }
  documentChangeStatus(val:any){
    
    return this.http.post(' http://testapi.secutrak.in/dev-app-cv-ilgic/documentChangeStatus',val);
  }
  // https://testapi.secutrak.in/demo-dev-app-secutrak/chartReport

  // dashboard(val:any){
  //   return this.http.post('https://testapi.secutrak.in/dev-app-secutrak/analyticDashboardReport',val);
  // }
  //
  // createOrder(order): Observable<any> {
  //   const basicAuth = 'Basic ' + btoa(ApiEndUrl.RAZOR_PAY_KEY + ':' + ApiEndUrl.RAZOR_PAY_PASSWORD);

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': basicAuth
    //   })
    // };

  //   return this.http.post(API_URL + 'order', {
  //     customerName: order.name,
  //     email: order.email,
  //     phoneNumber: order.phone,
  //     amount: order.amount
  //   }, httpOptions);
  // }
  

  async createOrder4(order: any): Promise<any> {
 
  console.log(order);
   var RAZOR_PAY_KEY = 'rzp_test_hn4WjdYuvj35Iw';
   var RAZOR_PAY_PASSWORD = "Yh8qE2n1UF9sASI9lA1uOUZs";
   const basicAuth = 'Basic  ' + btoa(RAZOR_PAY_KEY + ':' + RAZOR_PAY_PASSWORD);
 
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': basicAuth
      })
    }
       console.log(basicAuth)
      
       return this.http.post('https://api.razorpay.com/v1/orders' ,
       {
        "amount": order.amount,
        "currency": order.currency
        },
         httpOptions);
    // try {
    //   const response = await this.http.post('https://api.razorpay.com/v1/orders', order, { headers }
    //   ).toPromise();
    //   return response;
    // } catch (error) {
    //   console.error('Error creating order:', error);
    //   throw error;
    // }
  }
  // createOrder(order: any): Observable<any> {
  //   console.log(order);
  //   const RAZOR_PAY_KEY = 'rzp_test_hn4WjdYuvj35Iw';
  //   const RAZOR_PAY_PASSWORD = "Yh8qE2n1UF9sASI9lA1uOUZs";
  //   const basicAuth = 'Basic  ' + btoa(RAZOR_PAY_KEY + ':' + RAZOR_PAY_PASSWORD);
  
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': basicAuth // Note the correction here, 'authorization' to 'Authorization'
    //   })
    // };
  
  
    // return this.http.post(
    //   'https://api.razorpay.com/v1/orders',
    //   {
    //     "amount": order.amount,
    //     "currency": order.currency
    //   },
    //   {headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': basicAuth // Note the correction here, 'authorization' to 'Authorization'
    //   })}
    // );
  // }

 
}

@Injectable()
export class ExcelService {
  constructor() { }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json,{skipHeader:true});
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    fileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
  }
}