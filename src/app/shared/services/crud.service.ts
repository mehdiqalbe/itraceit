// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from '../../../environments/environment';
// import * as fileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// // import { AppConstants } from './common/app.constants';
// //import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
// // const httpOptions = {
// //   headers: new HttpHeaders({ 'Content-Type': 'application/json',
// //   'Authorization': 'basicAuth' })
// //   };

//   declare var Razorpay: any;
// export interface Member {
//   $key: string;
//   firstName: string;
//   lastName: string;
//   email: string
//   mobileNumber: Number;
//   designation: string;
 
  
// }
// @Injectable({
//   providedIn: 'root'
// })

// export class CrudService {
//   // membersRef!: AngularFireList<any>;    // Reference to Member data list, its an Observable
//   // memberRef!: AngularFireObject<any>;   // Reference to Member object, its an Observable too

//   // Inject AngularFireDatabase Dependency in Constructor
//   constructor( private http: HttpClient) { }
//    url:any='https://testapi.secutrak.in/dev-app-cv-ilgic/'
//    Durl:any='https://api-py.secutrak.in/api/'
//    Qurl:any=' https://api-cv1.secutrak.in/cv_api/'
//      vUrl:any='https://api-cv2.secutrak.in/api/'

   
 
//   submitdata(val:any){
//     return this.http.post(this.url+'cvDashboard1',val);
//   }
//   vehicleLists(val:any){
//     return this.http.post(this.url+'cv_tripVehicle',val);
//   }
//   commoditysList(val:any){
//     return this.http.post(this.url+'cv_tripCommodity',val);
//   }
//   sourcesList(val:any){
//     return this.http.post(this.url+'cv_tripSource',val);
//   }
//   routessList(val:any){
//     return this.http.post(this.url+'cv_tripRoute',val);
//   }
// ///////////////////////////////////////////////////////

// genericTripDashboard(val:any){
//   return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardGeneric',val);
// }
// genericTripDashboardFilter(val:any){
//   return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardGenericFilter',val);
// }
// genericTDLink(val:any){
//   return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardGenericTrackingLink',val)
// }
// specificTripDashboard(val:any){
//   return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboard',val);
// }
// specificTripDashboardFilter(val:any){
//   return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardFilter',val);
// }
// specificTripDashboardDetails(val:any){
//   return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardDetails',val);
// }
// specificTDLink(val:any){
//   return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardTrackingLink',val)
// }
//   vehicleTrackongS(val:any)
//   {
//     // let apiurl=;
//     return this.http.post("https://api.secutrak.in/dev-app-secutrak/vehicleTrackingV2New",val);
//   }
//   tripCustomerS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/getTripCustomerAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   //////////////////////////////////////////////////////
//   dashboardS(val:any){
//     return this.http.post(this.url+'cv_tripDashboard',val);
//   }
//   expenseListS(val:any){
//     return this.http.post(this.url+'cv_expenseTypes',val);
//   }
//   docListS(val:any){
//     return this.http.post(this.url+'cv_documentTypes',val);
//   }
//   cancelTripS(val:any){
//     return this.http.post(this.url+'cv_tripCancel',val);
//   }
//   listByrouteS(val:any){
//     return this.http.post(this.url+'cv_customerListByRoute',val);
//   }

//   createTripS(val:any){
//     return this.http.post(this.url+'cv_tripCreation',val);
//   }
//   ImeiLIstS(val:any){
//     return this.http.post(this.url+'cv_tripIMEI',val);
//   }
//   closeTrip(val:any){
//     return this.http.post(this.url+'cv_tripClose',val);
//   }
//   cvUpdateDriver(val:any){
//     return this.http.post(this.url+'cv_tripUpdateDriver',val);
//   }
//   // chartclickS(val:any){
//   //   return this.http.post(this.url+'cvDashboardDetailedData',val);
//   // }
//   chartclickS(val:any){
//     return this.http.post('https://api-cv2.secutrak.in/api/CVDashboardSummaryData/',val);
//   }
//   walletMasterS(val:any){
//     return this.http.post(this.url+'documentWalletMaster',val);
//   }
//   filtersubmitS(val:any){
//     return this.http.post(this.url+'documentWallet',val);
//   }
//   buluploadS(val:any){
//     return this.http.post(this.url+'documentBulkUpload',val);
//   }
//   walletOperationS(val:any){
//     return this.http.post(this.url+'documentChangeStatus',val);
//   }
//   documentAddS(val:any){
//     return this.http.post(this.url+'documentAdd',val);
//   }
//   documentEditS(val:any){
//     return this.http.post(this.url+'documentEdit',val);
//   }
//   documentrenewS(val:any){
//     return this.http.post(this.url+'documentRenew',val);
//   }
//   AddexpenceS(val:any){
//     return this.http.post(this.url+'cv_addExpense',val);
//   }
//   ////////////////////////////deepak python//////////////////////////////////////////////////////////////////////////////
//   venderListS(val:any){
//     return this.http.post(this.Durl+'transporterdata/',val);
//   }
//   filterS(val:any){
//     return this.http.post(this.Durl+'agreementfilterdata/',val);
//   }
//   agreementS(val:any){
//     return this.http.post(this.Durl+'uploadcvagreementdata/',val);
//   }
//   ///////////////////////////////mehndi//////////////////////////////////////////////
//   public getCustomers( data: FormData): Observable<any> {
//     const url = 'https://api-py.secutrak.in/api/orderfilter/';

//     console.log(data);
    
//     // return this.http.post(url, data);
//     return this.http.post<any>(url, data).pipe(
//       map(response => response.Filter.customer),
//     )
//   }
//   public getVehicles( data: FormData): Observable<any> {
//     const url='https://testapi.secutrak.in/dev-app-cv-ilgic/documentWalletMaster'

    
//     // return this.http.post(url, data);
//     return this.http.post<any>(url, data)
//   }
//   public postBillingCustomer(data:FormData):Observable<any> {
//     const url='https://api-py.secutrak.in/api/generatebillbytransporter/' 
//     // return this.http.post(url, data);
//     return this.http.post<any>(url, data)
//   }
//   public billingDetails(data:FormData):Observable<any>{
//     const url='https://api-py.secutrak.in/api/getbillingdetails/'
//     return this.http.post<any>(url,data)
//   }


//   ////////////////////////////////////////////////Customer///////////////////////////////////////////
//   public getTransporter( data: FormData): Observable<any> {
//     const url = 'https://api-py.secutrak.in/api/transporterdata/';

//     console.log(data);
    
//     // return this.http.post(url, data);

//     return this.http.post<any>(url, data).pipe(
//       map(response => {
//         if (response.Status == "error")  {
//           // this.router.navigate(['/login']);
//           console.log('failed');
//           return
          
//         }
//         return response?.Filter?.customer;
//       }),
//       // catchError(error => {
//       //   // Handle error appropriately
//       //   console.error('Error occurred:', error);
//       //   return [];
//       // })
//     );
//   }

//   public getTransporterVehicles( data: FormData): Observable<any> {
//     const url = 'https://api-py.secutrak.in/api/vehiclelist/';
//     return this.http.post(url, data);

//   }

//   public  billingStatus( data: FormData): Observable<any> {
//     const url = 'https://api-py.secutrak.in/api/billingstatus/';
//     return this.http.post(url, data);

//   }
//   public postBillingTransporter(data:FormData):Observable<any> {
//     const url=' https://api-py.secutrak.in/api/generatebillbycustomer/' 
//     // return this.http.post(url, data);
//     return this.http.post<any>(url, data)
//   }
//   /////////////////////////////saumya////////////////////////////////////////////
//   orderTileStatus(val:any)
//   {
//     return this.http.post('https://api-py.secutrak.in/api/orderstatuscount/',val)
//   }
//   customerQuote(val:any)
//   {
//     return this.http.post(this.Durl+'getcustomerquotedata/',val)
//   }
//   indentingfilter(val:any){
//     return this.http.post(this.Durl+'indentingfilter/',val);
//   }
//   indentingvehiclesearch(val:any){
//     return this.http.post(this.Durl+'indentingvehiclesearch/',val);
//   }
//   indentrequest(val:any){
//     return this.http.post(this.Durl+'indentrequest/',val);
//   }
//   orderfilter(val:any){
//     return this.http.post(this.Durl+'orderfilter/',val);
//   }
//   orderdata(val:any){
//     return this.http.post(this.Durl+'orderdata/',val);
//   }
//   orderstatus(val:any){
//     return this.http.post(this.Durl+'orderstatus/',val);
//   }
//   documentMasters(val:any){
    
//     return this.http.post('https://testapi.secutrak.in/dev-app-cv-ilgic/documentWalletMaster',val);
//   }
//   documentAdd(val:any){
    
//     return this.http.post('https://api.secutrak.in/dev-app-secutrak/documentAdd',val);
//   }
//   vehicledetails(val:any){
    
//     return this.http.post(this.Durl+'vehicledetails/',val);
//   }
//   driverdetails(val:any){
    
//     return this.http.post(this.Durl+'driverdetails/',val);
//   }
//   indentvehicleassignment(val:any){
    
//     return this.http.post(this.Durl+'indentvehicleassignment/',val);
//   }
//   transporterdata(val:any){
    
//     return this.http.post(this.Durl+'transporterdata/',val);
//   }
//   agreementDisplayS(val:any){
//     return this.http.post('https://api-py.secutrak.in/api/getagreementdata/',val);
//   }
//   orderassigneddata(val:any){
    
//     return this.http.post(this.Durl+'orderassigneddata/',val);
//   }
  
//   qEditVehicle(data): Observable<any> {
//     return this.http.post<any>(this.vUrl+'editvehicle/', data);
//   }

//   documentEdit(val:any){
    
//     return this.http.post('https://testapi.secutrak.in/dev-app-cv-ilgic/documentEdit',val);
//   }
//   documentChangeStatus(val:any){
    
//     return this.http.post('https://testapi.secutrak.in/dev-app-cv-ilgic/documentChangeStatus',val);
//   }
//   ////////////////////////////////////////////

//   vehicladashboared(val:any){
//     return this.http.post('https://testapi.secutrak.in/dev-app-cv-ilgic/cvVehicleDashboard',val);
//   }
//   Driverdashboard(val:any){
//     return this.http.post('https://api-cv1.secutrak.in/cv_api/driver',val);
//   }
//   vehicladashboaredfilter(val:any){
//     return this.http.post('https://api-cv2.secutrak.in/api/addfilters/',val);
//   }
//   // vehicleDashboard(val:any){
//   //   return this.http.post(' https://api-cv2.secutrak.in/api/vehicledashboard/',val);
//   // }
//   vehicleDashboard(val:any){
//     return this.http.post(this.vUrl+'Updatedvehicledashboard/',val);
//   }
//   vehicleFilterData(val:any):Observable<any>{
//     return this.http.post('https://api-cv2.secutrak.in/api/listingData/',val);
//   }
//   vehicleUpdateStatus(data): Observable<any> {
//     return this.http.post<any>('https://api-cv2.secutrak.in/api/changeStatus/', data);
//   }
//   stateData(val:any){
//     return this.http.post('https://api-cv1.secutrak.in/cv_api/stateDetails',val)
//   }
//   cityData(val:any){
//     return this.http.post('https://api-cv1.secutrak.in/cv_api/cityDetails',val)
//   }
  
//   createDriver(data): Observable<any> {
//     return this.http.post<any>('https://api-cv1.secutrak.in/cv_api/driverCreation', data);
//   }
//   uploadNewDriverDocument(data): Observable<any> {
//     return this.http.post<any>('https://testapi.secutrak.in/dev-app-cv-ilgic/documentAdd', data);
//   }
//   uploadEditDriverDocument(data): Observable<any> {
//     return this.http.post<any>('https://testapi.secutrak.in/dev-app-cv-ilgic/documentEdit', data);
//   }
//   driverUpdateStatus(data): Observable<any> {
//     return this.http.post<any>('https://api-cv1.secutrak.in/cv_api/updateStatus', data);
//   }
//   editDriver(data): Observable<any> {
//     return this.http.post<any>(this.Qurl+'driverEdit', data);
//   }
//   ////////////////////////////////////////////////////////////////////////////////////////////////
//   addVehicle(data): Observable<any> {
//     return this.http.post<any>(this.vUrl+'addvehicle/', data);
//   }
//   //Corporate////////////////////////////////////////////////////////////////////////////////////
//   getQCorpCustomerList(data: any): Observable<any> {
//     return this.http.post<any>(this.Qurl+"/customerList", data);
//   }
//   ////////////////////////////////////////////////////////////////////////

//     ////////////ILGIC Dashboard///////////////////
//     getQCVDashboard(data: any): Observable<any> {
//       return this.http.post<any>(this.vUrl+"CVDashboard/", data);
//     }
//     //////////////////create Trip////////////////////
//     qDocVehicleDriver(data: any): Observable<any> {
//       return this.http.post<any>(this.url+"cv_docList", data);
//     }

//     ////////////////////////////////////////////////////////////////////////////////
//     /////////////////////////loadPlanner//////////////////////////////////////////
//     loadPlannerLocation(data: any): Observable<any> {
//       return this.http.post<any>(this.vUrl+'GetLocation/', data);
//     }
//     createLoadPlan(data: any): Observable<any> {
//       return this.http.post<any>(this.vUrl+'PickupDeliveryAdd/', data);
//     }
//     loadPlannerOrder(data: any): Observable<any> {
//       return this.http.post<any>('https://api-cv2.secutrak.in/api/ListingPickupDelivery/', data);
//     }
//     loadPlannerMap(data: any): Observable<any> {
//       return this.http.post<any>('https://api-cv2.secutrak.in/api/RouteInfo/', data);
//     }
//   // https://testapi.secutrak.in/demo-dev-app-secutrak/chartReport

//   // dashboard(val:any){
//   //   return this.http.post('https://testapi.secutrak.in/dev-app-secutrak/analyticDashboardReport',val);
//   // }
//   //
//   // createOrder(order): Observable<any> {
//   //   const basicAuth = 'Basic ' + btoa(ApiEndUrl.RAZOR_PAY_KEY + ':' + ApiEndUrl.RAZOR_PAY_PASSWORD);

//     // const httpOptions = {
//     //   headers: new HttpHeaders({
//     //     'Content-Type': 'application/json',
//     //     'Authorization': basicAuth
//     //   })
//     // };

//   //   return this.http.post(API_URL + 'order', {
//   //     customerName: order.name,
//   //     email: order.email,
//   //     phoneNumber: order.phone,
//   //     amount: order.amount
//   //   }, httpOptions);
//   // }
  

//   async createOrder4(order: any): Promise<any> {
 
//   console.log(order);
//    var RAZOR_PAY_KEY = 'rzp_test_hn4WjdYuvj35Iw';
//    var RAZOR_PAY_PASSWORD = "Yh8qE2n1UF9sASI9lA1uOUZs";
//    const basicAuth = 'Basic  ' + btoa(RAZOR_PAY_KEY + ':' + RAZOR_PAY_PASSWORD);
 
//     var httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'authorization': basicAuth
//       })
//     }
//        console.log(basicAuth)
      
//        return this.http.post('https://api.razorpay.com/v1/orders' ,
//        {
//         "amount": order.amount,
//         "currency": order.currency
//         },
//          httpOptions);
//     // try {
//     //   const response = await this.http.post('https://api.razorpay.com/v1/orders', order, { headers }
//     //   ).toPromise();
//     //   return response;
//     // } catch (error) {
//     //   console.error('Error creating order:', error);
//     //   throw error;
//     // }
//   }
//   fullDataS()
//   {
//     let apiurl="http://localhost:3000/Master";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.get(apiurl);
//   }
//   summaryDataS()
//   {
//     let apiurl="http://localhost:3000/Summary";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.get(apiurl);
//   }
//   dashBoardDataS()
//   {
//     let apiurl="http://localhost:3000/Dashboard";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.get(apiurl);
//   }
//   triggerS()
//   {
//     let apiurl="http://localhost:3000/Triggers";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.get(apiurl);
//   }
//   AlltriggerS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/liveTriggerListFlashAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   homeDashboardS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   createAlertS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/createAlertFlashAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
  
//   assignQrtS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/getQrtUserAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   assignQrtSubmitS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/assignQrtAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   getGraceInfotS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/getGracePeriodInfoAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   graceSubmitS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/actionGracePeriodFlashAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   threatFullDataS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/liveThreatListFlashAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   threatActionSubS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/actionThreatFlashAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   escalationInfoS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/getEscalateInfoAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   escalatSubmitS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/actionEscalateFlashAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }

 
//   graceHistoryS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/graceHistoryAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   escalaHistoryS(data)
//   {
//     // let apiurl="http://uat.api.secutrak.in/dev-app-itraceit/escalateHistoryAT";
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/escalateHistoryAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   fileuploadDskS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/documentTripAT";
//     // let apiurl="http://uat.api.secutrak.in/dev-app-itraceit/documentTripAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   viewFileS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/viewDocumentTripAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
  
//   historyDashboardS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerHistoryAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   qrtHistoryS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/qrtActionHistoryAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   threatHistoryS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/threatHistoryAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   qrtHistoryCloseS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/deassignQrtAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   vehicle_dfgS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/getPolylineByRoute";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   triggerHistoryS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerReportAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   liveLocation2S(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-secutrak/liveDataV2";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   closeTriggerValidS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/validateAlertLink";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   closeTriggerS(data)
//   {
//     let apiurl="https://api.secutrak.in/dev-app-itraceit/actionAlertLink";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   trackapiS(data)
//   {
//     let apiurl=" https://api.secutrak.in/dev-app-secutrak/vehicleTrackingV3";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   priorityS(data)
//   {
//     let apiurl=" https://api.secutrak.in/dev-app-itraceit/setTripPriorityFlashAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   addressS(data)
//   {
//     let apiurl=" https://api.secutrak.in/dev-app-secutrak/vehicleLastLocationV2";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
//   summaryS(data)
//   {
//     let apiurl=" https://api.secutrak.in/dev-app-itraceit/triggerReportSummaryAT";
//     //let apiurl="https://jsonplaceholder.typicode.com/users";
//    //let apiurl= 'http://localhost:3000/workZone'
//     return this.http.post(apiurl,data);
//   }
  

//   // createOrder(order: any): Observable<any> {
//   //   console.log(order);
//   //   const RAZOR_PAY_KEY = 'rzp_test_hn4WjdYuvj35Iw';
//   //   const RAZOR_PAY_PASSWORD = "Yh8qE2n1UF9sASI9lA1uOUZs";
//   //   const basicAuth = 'Basic  ' + btoa(RAZOR_PAY_KEY + ':' + RAZOR_PAY_PASSWORD);
  
//     // const httpOptions = {
//     //   headers: new HttpHeaders({
//     //     'Content-Type': 'application/json',
//     //     'Authorization': basicAuth // Note the correction here, 'authorization' to 'Authorization'
//     //   })
//     // };
  
  
//     // return this.http.post(
//     //   'https://api.razorpay.com/v1/orders',
//     //   {
//     //     "amount": order.amount,
//     //     "currency": order.currency
//     //   },
//     //   {headers: new HttpHeaders({
//     //     'Content-Type': 'application/json',
//     //     'Authorization': basicAuth // Note the correction here, 'authorization' to 'Authorization'
//     //   })}
//     // );
//   // }

 
// }

// @Injectable()
// export class ExcelService {
//   constructor() { }
//   public exportAsExcelFile(json: any[], excelFileName: string): void {
//     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json,{skipHeader:true});
//     const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
//     const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
//     this.saveAsExcelFile(excelBuffer, excelFileName);
//   }
//   private saveAsExcelFile(buffer: any, fileName: string): void {
//     const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
//     fileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
//   }
// }


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
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
  group_id: any;
  apiurl:any;
  // membersRef!: AngularFireList<any>;    // Reference to Member data list, its an Observable
  // memberRef!: AngularFireObject<any>;   // Reference to Member object, its an Observable too

  // Inject AngularFireDatabase Dependency in Constructor
  constructor( private http: HttpClient) {
    this.group_id = localStorage.getItem('GroupId')!
    if(this.group_id=='5691'){
      // https://api.secutrak.in/dev-app-dtdc
       this.apiurl="https://api.secutrak.in/dev-app-dtdc/";
          }else if(this.group_id=='5690'){
            // https://api.secutrak.in/dev-app-dtdc
            this.apiurl="https://api.secutrak.in/dev-app-roadcast/";
                }else{
                  this.apiurl="https://api.secutrak.in/dev-app-itraceit/";
          }
   }
   url:any='https://testapi.secutrak.in/dev-app-cv-ilgic/'
   Durl:any='https://api-py.secutrak.in/api/'
   Qurl:any=' https://api-cv1.secutrak.in/cv_api/'
     vUrl:any='https://api-cv2.secutrak.in/api/'

   
 
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
///////////////////////////////////////////////////////
  specificTripDashboard(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboard',val);
  }
  specificTripDashboardFilter(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardFilter',val);
  }
  specificTripDashboardDetails(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardDetails',val);
  }
  vehicleTrackongS(val:any)
  {
    // let apiurl=;
    return this.http.post("https://api.secutrak.in/dev-app-secutrak/vehicleTrackingV2New",val);
  }
  // tripCustomerS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/getTripCustomerAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  //////////////////////////////////////////////////////
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
  closeTrip(val:any){
    return this.http.post(this.url+'cv_tripClose',val);
  }
  cvUpdateDriver(val:any){
    return this.http.post(this.url+'cv_tripUpdateDriver',val);
  }
  // chartclickS(val:any){
  //   return this.http.post(this.url+'cvDashboardDetailedData',val);
  // }
  chartclickS(val:any){
    return this.http.post('https://api-cv2.secutrak.in/api/CVDashboardSummaryData/',val);
  }
  walletMasterS(val:any){
    return this.http.post(this.url+'documentWalletMaster',val);
  }
  filtersubmitS(val:any){
    return this.http.post(this.url+'documentWallet',val);
  }
  buluploadS(val:any){
    return this.http.post(this.url+'documentBulkUpload',val);
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
    const url='https://testapi.secutrak.in/dev-app-cv-ilgic/documentWalletMaster'

    
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
  orderTileStatus(val:any)
  {
    return this.http.post('https://api-py.secutrak.in/api/orderstatuscount/',val)
  }
  customerQuote(val:any)
  {
    return this.http.post(this.Durl+'getcustomerquotedata/',val)
  }
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
  agreementDisplayS(val:any){
    return this.http.post('https://api-py.secutrak.in/api/getagreementdata/',val);
  }
  orderassigneddata(val:any){
    
    return this.http.post(this.Durl+'orderassigneddata/',val);
  }
  
  qEditVehicle(data): Observable<any> {
    return this.http.post<any>(this.vUrl+'editvehicle/', data);
  }

  documentEdit(val:any){
    
    return this.http.post('https://testapi.secutrak.in/dev-app-cv-ilgic/documentEdit',val);
  }
  documentChangeStatus(val:any){
    
    return this.http.post('https://testapi.secutrak.in/dev-app-cv-ilgic/documentChangeStatus',val);
  }
  ////////////////////////////////////////////

  vehicladashboared(val:any){
    return this.http.post('https://testapi.secutrak.in/dev-app-cv-ilgic/cvVehicleDashboard',val);
  }
  Driverdashboard(val:any){
    return this.http.post('https://api-cv1.secutrak.in/cv_api/driver',val);
  }
  vehicladashboaredfilter(val:any){
    return this.http.post('https://api-cv2.secutrak.in/api/addfilters/',val);
  }
  // vehicleDashboard(val:any){
  //   return this.http.post(' https://api-cv2.secutrak.in/api/vehicledashboard/',val);
  // }
  vehicleDashboard(val:any){
    return this.http.post(this.vUrl+'Updatedvehicledashboard/',val);
  }
  vehicleFilterData(val:any):Observable<any>{
    return this.http.post('https://api-cv2.secutrak.in/api/listingData/',val);
  }
  vehicleUpdateStatus(data): Observable<any> {
    return this.http.post<any>('https://api-cv2.secutrak.in/api/changeStatus/', data);
  }
  stateData(val:any){
    return this.http.post('https://api-cv1.secutrak.in/cv_api/stateDetails',val)
  }
  cityData(val:any){
    return this.http.post('https://api-cv1.secutrak.in/cv_api/cityDetails',val)
  }
  
  createDriver(data): Observable<any> {
    return this.http.post<any>('https://api-cv1.secutrak.in/cv_api/driverCreation', data);
  }
  uploadNewDriverDocument(data): Observable<any> {
    return this.http.post<any>('https://testapi.secutrak.in/dev-app-cv-ilgic/documentAdd', data);
  }
  uploadEditDriverDocument(data): Observable<any> {
    return this.http.post<any>('https://testapi.secutrak.in/dev-app-cv-ilgic/documentEdit', data);
  }
  driverUpdateStatus(data): Observable<any> {
    return this.http.post<any>('https://api-cv1.secutrak.in/cv_api/updateStatus', data);
  }
  editDriver(data): Observable<any> {
    return this.http.post<any>(this.Qurl+'driverEdit', data);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  addVehicle(data): Observable<any> {
    return this.http.post<any>(this.vUrl+'addvehicle/', data);
  }
  //Corporate////////////////////////////////////////////////////////////////////////////////////
  getQCorpCustomerList(data: any): Observable<any> {
    return this.http.post<any>(this.Qurl+"/customerList", data);
  }
  ////////////////////////////////////////////////////////////////////////

    ////////////ILGIC Dashboard///////////////////
    getQCVDashboard(data: any): Observable<any> {
      return this.http.post<any>(this.vUrl+"CVDashboard/", data);
    }
    //////////////////create Trip////////////////////
    qDocVehicleDriver(data: any): Observable<any> {
      return this.http.post<any>(this.url+"cv_docList", data);
    }

    ////////////////////////////////////////////////////////////////////////////////
    /////////////////////////loadPlanner//////////////////////////////////////////
    loadPlannerLocation(data: any): Observable<any> {
      return this.http.post<any>(this.vUrl+'GetLocation/', data);
    }
    createLoadPlan(data: any): Observable<any> {
      return this.http.post<any>(this.vUrl+'PickupDeliveryAdd/', data);
    }
    loadPlannerOrder(data: any): Observable<any> {
      return this.http.post<any>('https://api-cv2.secutrak.in/api/ListingPickupDelivery/', data);
    }
    loadPlannerMap(data: any): Observable<any> {
      return this.http.post<any>('https://api-cv2.secutrak.in/api/RouteInfo/', data);
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
  fullDataS()
  {
    let apiurl="http://localhost:3000/Master";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.get(apiurl);
  }
  summaryDataS()
  {
    let apiurl="http://localhost:3000/Summary";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.get(apiurl);
  }
  dashBoardDataS()
  {
    let apiurl="http://localhost:3000/Dashboard";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.get(apiurl);
  }
  triggerS()
  {
    let apiurl="http://localhost:3000/Triggers";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.get(apiurl);
  }
  // AlltriggerS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/liveTriggerListFlashAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  // homeDashboardS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  // createAlertS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/createAlertFlashAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  
  assignQrtS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/getQrtUserAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  // assignQrtSubmitS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/assignQrtAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  // getGraceInfotS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/getGracePeriodInfoAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  // graceSubmitS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/actionGracePeriodFlashAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  // threatFullDataS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/liveThreatListFlashAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  // threatActionSubS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/actionThreatFlashAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  // escalationInfoS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/getEscalateInfoAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  // escalatSubmitS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/actionEscalateFlashAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }

 
  // graceHistoryS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/graceHistoryAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  // escalaHistoryS(data)
  // {
  //   // let apiurl="http://uat.api.secutrak.in/dev-app-itraceit/escalateHistoryAT";
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/escalateHistoryAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  // fileuploadDskS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/documentTripAT";
  //   // let apiurl="http://uat.api.secutrak.in/dev-app-itraceit/documentTripAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  // viewFileS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/viewDocumentTripAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  
  // historyDashboardS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerHistoryAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  // qrtHistoryS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/qrtActionHistoryAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  // threatHistoryS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/threatHistoryAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  // qrtHistoryCloseS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/deassignQrtAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  // vehicle_dfgS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/getPolylineByRoute";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  // triggerHistoryS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerReportAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  liveLocation2S(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-secutrak/liveDataV2";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  // closeTriggerValidS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/validateAlertLink";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  // closeTriggerS(data)
  // {
  //   let apiurl="https://api.secutrak.in/dev-app-itraceit/actionAlertLink";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  // trackapiS(data)
  // {
  //   let apiurl=" https://api.secutrak.in/dev-app-secutrak/vehicleTrackingV3";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  // priorityS(data)
  // {
  //   let apiurl=" https://api.secutrak.in/dev-app-itraceit/setTripPriorityFlashAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }

  // summaryS(data)
  // {
  //   let apiurl=" https://api.secutrak.in/dev-app-itraceit/triggerReportSummaryAT";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }
  delayDashboardGeneric(data){
    let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/delayDashboardGeneric";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  dtdc_delayDashboard(data){
    // let apiurl="https://api.secutrak.in/dev-app-dtdc/delayDashboardDtdc";
    let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/delayDashboardDtdc";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  dtdcTripReportFilter(data){
  
  let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/dtdcTripReportFilter";
  
  return this.http.post(apiurl,data);
}

dtdcTripReport(data){
  
  let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/dtdcTripReport";
  
  return this.http.post(apiurl,data);
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

//  -=-------------------------------------------------------------------------------------


AlltriggerS(data)
{
  let apiurl:any;
      if(this.group_id=='5691'){
  // https://api.secutrak.in/dev-app-dtdc
   apiurl="https://api.secutrak.in/dev-app-dtdc/liveTriggerListFlashAT";
      }else{
         apiurl="https://api.secutrak.in/dev-app-itraceit/liveTriggerListFlashAT";
      }
  //let apiurl="https://jsonplaceholder.typicode.com/users";
 //let apiurl= 'http://localhost:3000/workZone'
  return this.http.post(apiurl,data);
}
homeDashboardS(data)
{
  let apiurl:any;
  // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
  if(this.group_id=='5691'){
    // https://api.secutrak.in/dev-app-dtdc
     apiurl="https://api.secutrak.in/dev-app-dtdc/triggerDashboardFlashAT";
        }else{
           apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
        }
  //let apiurl="https://jsonplaceholder.typicode.com/users";
 //let apiurl= 'http://localhost:3000/workZone'
  return this.http.post(apiurl,data);
}
createAlertS(data)
{
  // let apiurl="https://api.secutrak.in/dev-app-itraceit/createAlertFlashAT";

  let apiurl:any;
          // https://api.secutrak.in/dev-app-dtdc
           apiurl=this.apiurl+"createAlertFlashAT";


  //let apiurl="https://jsonplaceholder.typicode.com/users";
 //let apiurl= 'http://localhost:3000/workZone'
  return this.http.post(apiurl,data);
}

assignQrtSubmitS(data)
{
  // let apiurl="https://api.secutrak.in/dev-app-itraceit/assignQrtAT";


  let apiurl:any;
    // https://api.secutrak.in/dev-app-dtdc
     apiurl=this.apiurl+"assignQrtAT";
        



  //let apiurl="https://jsonplaceholder.typicode.com/users";
 //let apiurl= 'http://localhost:3000/workZone'
  return this.http.post(apiurl,data);
}

getGraceInfotS(data)
{
  // let apiurl="https://api.secutrak.in/dev-app-itraceit/getGracePeriodInfoAT";

  let apiurl:any;
  // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
  if(this.group_id=='5691'){
    // https://api.secutrak.in/dev-app-dtdc
     apiurl="https://api.secutrak.in/dev-app-dtdc/getGracePeriodInfoAT";
        }else{
           apiurl="https://api.secutrak.in/dev-app-itraceit/getGracePeriodInfoAT";
        }




  //let apiurl="https://jsonplaceholder.typicode.com/users";
 //let apiurl= 'http://localhost:3000/workZone'
  return this.http.post(apiurl,data);
}
graceSubmitS(data)
{
  // let apiurl="https://api.secutrak.in/dev-app-itraceit/actionGracePeriodFlashAT";

  let apiurl:any;
  // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
  if(this.group_id=='5691'){
    // https://api.secutrak.in/dev-app-dtdc
     apiurl="https://api.secutrak.in/dev-app-dtdc/actionGracePeriodFlashAT";
        }else{
           apiurl="https://api.secutrak.in/dev-app-itraceit/actionGracePeriodFlashAT";
        }





  //let apiurl="https://jsonplaceholder.typicode.com/users";
 //let apiurl= 'http://localhost:3000/workZone'
  return this.http.post(apiurl,data);
}
threatFullDataS(data)
{
  // let apiurl="https://api.secutrak.in/dev-app-itraceit/liveThreatListFlashAT";


  let apiurl:any;
  // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
  if(this.group_id=='5691'){
    // https://api.secutrak.in/dev-app-dtdc
     apiurl="https://api.secutrak.in/dev-app-dtdc/liveThreatListFlashAT";
        }else{
           apiurl="https://api.secutrak.in/dev-app-itraceit/liveThreatListFlashAT";
        }



  //let apiurl="https://jsonplaceholder.typicode.com/users";
 //let apiurl= 'http://localhost:3000/workZone'
  return this.http.post(apiurl,data);
}

threatActionSubS(data)
{
  // let apiurl="https://api.secutrak.in/dev-app-itraceit/actionThreatFlashAT";

  let apiurl:any;
  // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
  if(this.group_id=='5691'){
    // https://api.secutrak.in/dev-app-dtdc
     apiurl="https://api.secutrak.in/dev-app-dtdc/actionThreatFlashAT";
        }else{
           apiurl="https://api.secutrak.in/dev-app-itraceit/actionThreatFlashAT";
        }
  //let apiurl="https://jsonplaceholder.typicode.com/users";
 //let apiurl= 'http://localhost:3000/workZone'
  return this.http.post(apiurl,data);
}

escalationInfoS(data)
{
  // let apiurl="https://api.secutrak.in/dev-app-itraceit/getEscalateInfoAT";


  let apiurl:any;
  // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
  if(this.group_id=='5691'){
    // https://api.secutrak.in/dev-app-dtdc
     apiurl="https://api.secutrak.in/dev-app-dtdc/getEscalateInfoAT";
        }else{
           apiurl="https://api.secutrak.in/dev-app-itraceit/getEscalateInfoAT";
        }


  //let apiurl="https://jsonplaceholder.typicode.com/users";
 //let apiurl= 'http://localhost:3000/workZone'
  return this.http.post(apiurl,data);
}

escalatSubmitS(data)
{
  // let apiurl="https://api.secutrak.in/dev-app-itraceit/actionEscalateFlashAT";



  let apiurl:any;
  // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
  if(this.group_id=='5691'){
    // https://api.secutrak.in/dev-app-dtdc
     apiurl="https://api.secutrak.in/dev-app-dtdc/actionEscalateFlashAT";
        }else{
           apiurl="https://api.secutrak.in/dev-app-itraceit/actionEscalateFlashAT";
        }



  //let apiurl="https://jsonplaceholder.typicode.com/users";
 //let apiurl= 'http://localhost:3000/workZone'
  return this.http.post(apiurl,data);
}

closeS(data)
  {
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/actionTriggerFlashAT";

    let apiurl:any;
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
    if(this.group_id=='5691'){
      // https://api.secutrak.in/dev-app-dtdc
       apiurl="https://api.secutrak.in/dev-app-dtdc/actionTriggerFlashAT";
          }else{
             apiurl="https://api.secutrak.in/dev-app-itraceit/actionTriggerFlashAT";
          }




    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }

  graceHistoryS(data)
  {
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/graceHistoryAT";

    let apiurl:any;
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
    if(this.group_id=='5691'){
      // https://api.secutrak.in/dev-app-dtdc
       apiurl="https://api.secutrak.in/dev-app-dtdc/graceHistoryAT";
          }else{
             apiurl="https://api.secutrak.in/dev-app-itraceit/graceHistoryAT";
          }



    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }

escalaHistoryS(data)
  {
    // let apiurl="http://uat.api.secutrak.in/dev-app-itraceit/escalateHistoryAT";
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/escalateHistoryAT";

   

    let apiurl:any;
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
    if(this.group_id=='5691'){
      // https://api.secutrak.in/dev-app-dtdc
       apiurl="https://api.secutrak.in/dev-app-dtdc/escalateHistoryAT";
          }else{
             apiurl="https://api.secutrak.in/dev-app-itraceit/escalateHistoryAT";
          }


    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  fileuploadDskS(data)
  {
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/documentTripAT";

    let apiurl:any;
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
    if(this.group_id=='5691'){
      // https://api.secutrak.in/dev-app-dtdc
       apiurl="https://api.secutrak.in/dev-app-dtdc/documentTripAT";
          }else{
             apiurl="https://api.secutrak.in/dev-app-itraceit/documentTripAT";
          }


    // let apiurl="http://uat.api.secutrak.in/dev-app-itraceit/documentTripAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  viewFileS(data)
  {
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/viewDocumentTripAT";

    
    let apiurl:any;
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
    if(this.group_id=='5691'){
      // https://api.secutrak.in/dev-app-dtdc
       apiurl="https://api.secutrak.in/dev-app-dtdc/viewDocumentTripAT";
          }else{
             apiurl="https://api.secutrak.in/dev-app-itraceit/viewDocumentTripAT";
          }
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  tripCustomerS(data)
  {
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/getTripCustomerAT";


    let apiurl:any;
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
    if(this.group_id=='5691'){
      // https://api.secutrak.in/dev-app-dtdc
       apiurl="https://api.secutrak.in/dev-app-dtdc/getTripCustomerAT";
          }else{
             apiurl="https://api.secutrak.in/dev-app-itraceit/getTripCustomerAT";
          }


    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  historyDashboardS(data)
  {
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerHistoryAT";


    let apiurl:any;
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
    if(this.group_id=='5691'){
      // https://api.secutrak.in/dev-app-dtdc
       apiurl="https://api.secutrak.in/dev-app-dtdc/triggerHistoryAT";
          }else{
             apiurl="https://api.secutrak.in/dev-app-itraceit/triggerHistoryAT";
          }


    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  qrtHistoryS(data)
  {
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/qrtActionHistoryAT";




    let apiurl:any;
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
    if(this.group_id=='5691'){
      // https://api.secutrak.in/dev-app-dtdc
       apiurl="https://api.secutrak.in/dev-app-dtdc/qrtActionHistoryAT";
          }else{
             apiurl="https://api.secutrak.in/dev-app-itraceit/qrtActionHistoryAT";
          }
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  threatHistoryS(data)
  {
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/threatHistoryAT";



    let apiurl:any;
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
    if(this.group_id=='5691'){
      // https://api.secutrak.in/dev-app-dtdc
       apiurl="https://api.secutrak.in/dev-app-dtdc/threatHistoryAT";
          }else{
             apiurl="https://api.secutrak.in/dev-app-itraceit/threatHistoryAT";
          }
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  qrtHistoryCloseS(data)
  {
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/deassignQrtAT";



    let apiurl:any;
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
    if(this.group_id=='5691'){
      // https://api.secutrak.in/dev-app-dtdc
       apiurl="https://api.secutrak.in/dev-app-dtdc/deassignQrtAT";
          }else{
             apiurl="https://api.secutrak.in/dev-app-itraceit/deassignQrtAT";
          }
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  vehicle_dfgS(data)
  {
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/getPolylineByRoute";


    let apiurl:any;
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
    if(this.group_id=='5691'){
      // https://api.secutrak.in/dev-app-dtdc
       apiurl="https://api.secutrak.in/dev-app-dtdc/getPolylineByRoute";
          }else{
             apiurl="https://api.secutrak.in/dev-app-itraceit/getPolylineByRoute";
          }

    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  triggerHistoryS(data)
  {
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerReportAT";



    let apiurl:any;
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
    if(this.group_id=='5691'){
      // https://api.secutrak.in/dev-app-dtdc
       apiurl="https://api.secutrak.in/dev-app-dtdc/triggerReportAT";
          }else{
             apiurl="https://api.secutrak.in/dev-app-itraceit/triggerReportAT";
          }
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }

  closeTriggerValidS(data)
  {
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/validateAlertLink";


    let apiurl:any;
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
    if(this.group_id=='5691'){
      // https://api.secutrak.in/dev-app-dtdc
       apiurl="https://api.secutrak.in/dev-app-dtdc/validateAlertLink";
          }else{
             apiurl="https://api.secutrak.in/dev-app-itraceit/validateAlertLink";
          }
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  closeTriggerS(data)
  {
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/actionAlertLink";


    let apiurl:any;
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
    if(this.group_id=='5691'){
      // https://api.secutrak.in/dev-app-dtdc
       apiurl="https://api.secutrak.in/dev-app-dtdc/actionAlertLink";
          }else{
             apiurl="https://api.secutrak.in/dev-app-itraceit/actionAlertLink";
          }
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  trackapiS(data)
  {
    let apiurl=" https://api.secutrak.in/dev-app-secutrak/vehicleTrackingV3";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  priorityS(data)
  {
    // let apiurl=" https://api.secutrak.in/dev-app-itraceit/setTripPriorityFlashAT";



    let apiurl:any;
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
    if(this.group_id=='5691'){
      // https://api.secutrak.in/dev-app-dtdc
       apiurl="https://api.secutrak.in/dev-app-dtdc/setTripPriorityFlashAT";
          }else{
             apiurl="https://api.secutrak.in/dev-app-itraceit/setTripPriorityFlashAT";
          }
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  addressS(data)
  {
    let apiurl=" https://api.secutrak.in/dev-app-secutrak/vehicleLastLocationV2";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  summaryS(data)
  {
    // let apiurl=" https://api.secutrak.in/dev-app-itraceit/triggerReportSummaryAT";


    let apiurl:any;
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardFlashAT";
    if(this.group_id=='5691'){
      // https://api.secutrak.in/dev-app-dtdc
       apiurl="https://api.secutrak.in/dev-app-dtdc/triggerReportSummaryAT";
          }else{
             apiurl="https://api.secutrak.in/dev-app-itraceit/triggerReportSummaryAT";
          }
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  // dtdc_delayDashboard(data){
  //   // let apiurl="https://api.secutrak.in/dev-app-dtdc/delayDashboardDtdc";
  //   let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/delayDashboardDtdc";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //  //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl,data);
  // }

//   dtdcTripReportFilter(data){
  
//   let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/dtdcTripReportFilter";
  
//   return this.http.post(apiurl,data);
// }

// dtdcTripReport(data){
  
//   let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/dtdcTripReport";
  
//   return this.http.post(apiurl,data);
// }

getVehicle(data){
  
  let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/getVehicle";
  
  return this.http.post(apiurl,data);
}
getBdVehicle(data){
  
  let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/getBdVehicle";
  
  return this.http.post(apiurl,data);
}

dtdcSummaryFilter(data){
  
  let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/dtdcSummaryFilter";
  
  return this.http.post(apiurl,data);
}

dtdcSummary(data){
  
  let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/dtdcSummary";
  
  return this.http.post(apiurl,data);
}

bdTripReport(data){
  
  let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/bdTripReport";
  
  return this.http.post(apiurl,data);
}
bdTripReportFilter(data){
  
  let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/bdTripReportFilter";
  
  return this.http.post(apiurl,data);
}
bdSummaryFilter(data){
  
  let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/bdSummaryFilter";
  
  return this.http.post(apiurl,data);
}

bdSummary(data){
  
  let apiurl=" https://apinode2.secutrak.in/dev-app-itraceit/bdSummary";
  
  return this.http.post(apiurl,data);
}


  genericTripDashboard(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardGeneric',val);
  }
  genericTripDashboardFilter(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardGenericFilter',val);
  }
  genericTDLink(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardGenericTrackingLink',val)
  }
  genericTDDetails(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardDetailsGeneric',val)
  }
  specificTDLink(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardTrackingLink',val)
  }

  // ---------------------------------Vehcile Nearby--------------------------------------------------------------------//
  nearbyFilter(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/nearByVehiclesFilter',val)
  }
  nearbyLocation(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/nearByVehiclesLocationList',val)
  }


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