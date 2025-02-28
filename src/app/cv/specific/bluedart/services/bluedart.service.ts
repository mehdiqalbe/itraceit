import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BluedartService {

  constructor( private http: HttpClient) { }

  baseURL:any="https://apinode2.secutrak.in/dev-app-itraceit/";
  BDE_URL:any="https://api-bde.secutrak.in/dev-app-itraceit/";
  // https://apinode2.secutrak.in/dev-app-itraceit/
  specificTripDashboard(val:any){
    return this.http.post(this.baseURL+'scheduleDashboard',val);
  }
  specificTripDashboardFilter(val:any){
    return this.http.post(this.baseURL+'scheduleDashboardFilter',val);
  }
  specificTripDashboardDetails(val:any){
    return this.http.post(this.baseURL+'scheduleDashboardDetails',val);
  }
  specificTDLink(val:any){
    return this.http.post(this.baseURL+'scheduleDashboardTrackingLink',val)
  }
  delayDashboardDisclaimer(val:any){
    return this.http.post(this.baseURL+'bddelayDashboardDisclaimer',val)
  }
  bdDelayDashboardFilter(val:any){
    return this.http.post(this.baseURL+'bdDelayDashboardFilter',val)
  }
  bdDelayDashboard(val:any){
    return this.http.post(this.baseURL+'bdDelayDashboard',val)
  }
  bdSummaryFilter(data){
  
    let apiurl=this.baseURL+"bdSummaryFilter";
    
    return this.http.post(apiurl,data);
  }
  ahtTimeAdd(data){
    let apiurl=this.baseURL+"/updateAhtBd";
    return this.http.post(apiurl,data);
  }

  bdSummary(data) {

    let apiurl = this.baseURL + "bdSummary";

    return this.http.post(apiurl, data);
  }
  bdTripCustomerDetails(data){
    let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/bdTripCustomerDetails";
    return this.http.post(apiurl,data);
    // https://apinode2.secutrak.in/dev-app-itraceit/dtdcTripCustomerDetails
  }
  // IRUN DASHBOARD _------------------------------------------------------
  // liveLocation2S(data) {
  //   let apiurl = "https://api-bde.secutrak.in/dev-app-home/liveDataV2";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //   //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl, data);
  // }
  homeDashboardS(data) {
    let apiurl: any;
      apiurl = this.BDE_URL+"triggerDashboardFlashAT";
    return this.http.post(apiurl, data);
  }
  fullDataS() {
    let apiurl = "http://localhost:3000/Master";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
    //let apiurl= 'http://localhost:3000/workZone'
    return this.http.get(apiurl);
  }
  AlltriggerS(data) {
    let apiurl: any;
      apiurl = this.BDE_URL+"liveTriggerListFlashAT";
     return this.http.post(apiurl, data);
  }
  triggerHistoryS(data) {
   
    let apiurl: any;
   
      apiurl = this.BDE_URL+"triggerReportAT";
      return this.http.post(apiurl, data);
 
  }
  graceHistoryS(data) {
   
    let apiurl: any;
   
      apiurl = this.BDE_URL+"graceHistoryAT";
    
    return this.http.post(apiurl, data);
  }
  escalaHistoryS(data) {
  
    let apiurl: any;
   
      apiurl = this.BDE_URL+"escalateHistoryAT";
    
    //let apiurl="https://jsonplaceholder.typicode.com/users";
    //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl, data);
  }
  fileuploadDskS(data) {
    let apiurl: any;
   
      apiurl = this.BDE_URL+"documentTripAT";
    return this.http.post(apiurl, data);
  }
  getGraceInfotS(data) {
    // let apiurl=this.BDE_URL+"getGracePeriodInfoAT";

    let apiurl: any;
    
      apiurl = this.BDE_URL+"getGracePeriodInfoAT";
    return this.http.post(apiurl, data);
  }

  graceSubmitS(data) {
 
    let apiurl: any;
   
      apiurl = this.BDE_URL+"actionGracePeriodFlashAT";
     return this.http.post(apiurl, data);
  }
  closeS(data) {
 
    let apiurl: any;
   
      apiurl = this.BDE_URL+"actionTriggerFlashAT";
    return this.http.post(apiurl, data);
  }

  viewFileS(data) {
    // let apiurl=this.BDE_URL+"viewDocumentTripAT";


    let apiurl: any;
  apiurl = this.BDE_URL+"viewDocumentTripAT";
    return this.http.post(apiurl, data);
  }
  tripCustomerS(data) {
 
    let apiurl: any;
   
      apiurl = this.BDE_URL+"getTripCustomerAT";
   return this.http.post(apiurl, data);
  }
  historyDashboardS(data) {
   let apiurl: any;
   
      apiurl = this.BDE_URL+"triggerHistoryAT";
    return this.http.post(apiurl, data);
  }
  qrtHistoryS(data) {

    let apiurl: any;
   
      apiurl = this.BDE_URL+"qrtActionHistoryAT";
    
    //let apiurl="https://jsonplaceholder.typicode.com/users";
    //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl, data);
  }
  threatHistoryS(data) {
  
    let apiurl: any;
   
      apiurl = this.BDE_URL+"threatHistoryAT";
    return this.http.post(apiurl, data);
  }
  qrtHistoryCloseS(data) {
  
    let apiurl: any;
      apiurl = this.BDE_URL+"deassignQrtAT";
    
    return this.http.post(apiurl, data);
  }
  vehicle_dfgS(data) {
    // let apiurl=this.BDE_URL+"getPolylineByRoute";


    let apiurl: any;
  
      apiurl = this.BDE_URL+"getPolylineByRoute";
    
      return this.http.post(apiurl, data);
  }


  closeTriggerValidS(data) {
    // let apiurl=this.BDE_URL+"validateAlertLink";


    let apiurl: any;
  
      apiurl = this.BDE_URL+"validateAlertLink";
    return this.http.post(apiurl, data);
  }
  closeTriggerS(data) {
    let apiurl: any;
      apiurl = this.BDE_URL+"actionAlertLink";
    return this.http.post(apiurl, data);
  }
  trackapiS(data) {
    let apiurl = " https://api.secutrak.in/dev-app-secutrak/vehicleTrackingV3";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
    //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl, data);
  }
  priorityS(data) {
    // let apiurl="this.BDE_URL+ setTripPriorityFlashAT";



    let apiurl: any;
  
      apiurl = this.BDE_URL+"setTripPriorityFlashAT";
    
    //let apiurl="https://jsonplaceholder.typicode.com/users";
    //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl, data);
  }
  // addressS(data) {
  //   // let apiurl = " https://api.secutrak.in/dev-app-secutrak/vehicleLastLocationV2";
  //   let apiurl = "https://api-bde.secutrak.in/dev-app-itraceit/vehicleLastLocationV2";
  //   //let apiurl="https://jsonplaceholder.typicode.com/users";
  //   //let apiurl= 'http://localhost:3000/workZone'
  //   return this.http.post(apiurl, data);
  // }
  addressS(data) {
    // let apiurl = " https://api.secutrak.in/dev-app-secutrak/vehicleLastLocationV2";
    let apiurl = "https://api-bde.secutrak.in/dev-app-itraceit/vehicleLastLocationV2";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
    //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl, data);
  }
  summaryS(data) {
    // let apiurl="this.BDE_URL+ triggerReportSummaryAT";


    let apiurl: any;
   
      apiurl = this.BDE_URL+"triggerReportSummaryAT";
    
       return this.http.post(apiurl, data);
  }
  createAlertS(data) {
    // let apiurl=this.BDE_URL+"createAlertFlashAT";

    let apiurl: any;
    // https://api.secutrak.in/dev-app-dtdc
    apiurl = this.BDE_URL + "createAlertFlashAT";


    //let apiurl="https://jsonplaceholder.typicode.com/users";
    //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl, data);
  }

  assignQrtSubmitS(data) {
    let apiurl: any;
    // https://api.secutrak.in/dev-app-dtdc
    apiurl = this.BDE_URL + "assignQrtAT";
    return this.http.post(apiurl, data);
  }



  threatFullDataS(data) {
    let apiurl: any;
      apiurl = this.BDE_URL+"liveThreatListFlashAT";
   
    return this.http.post(apiurl, data);
  }

  threatActionSubS(data) {
    let apiurl: any;
      apiurl = this.BDE_URL+"actionThreatFlashAT";

    return this.http.post(apiurl, data);
  }

  escalationInfoS(data) {
    let apiurl: any;
      apiurl = this.BDE_URL+"getEscalateInfoAT";
    return this.http.post(apiurl, data);
  }

  escalatSubmitS(data) {
    let apiurl: any;
      apiurl = this.BDE_URL+"actionEscalateFlashAT";
    return this.http.post(apiurl, data);
  }
  assignQrtS(data) {
    let apiurl = this.BDE_URL+"getQrtUserAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
    //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl, data);
  }
  // vehicleTrackongS(val: any) {
  //   // let apiurl=;
  //   return this.http.post("https://api.secutrak.in/dev-app-home/vehicleTrackingV2New", val);
  // }
  bdTripReportFilter(data){
    let apiurl=this.baseURL+"bdTripReportFilter";
    return this.http.post(apiurl,data);
  }
  bdTripReport(data){
    
    let apiurl=this.baseURL+"bdTripReport";
    
    return this.http.post(apiurl,data);
  }
  networkVehicleDelayReport(val:any){
    return this.http.post(this.baseURL+'networkVehicleDelayReport',val)
  }
  
  vehicleTrackongS(val: any) {
    // let apiurl=;
    return this.http.post("https://api-bde.secutrak.in/dev-app-itraceit/vehicleTrackingV2New", val);
  }
  slotwiseDistanceFilter(data){
  
    let apiurl=this.baseURL+"slotwiseReportFilter";
   
    return this.http.post(apiurl,data);
  }
  
  slotwiseDistanceData(data){
    
    let apiurl=this.baseURL+"slotwiseGeneralReport";
   
    return this.http.post(apiurl,data);
  }
  slotwiseAutoDistanceData(data){
    
    let apiurl=this.baseURL+"slotwiseAutoReport";
   
    return this.http.post(apiurl,data);
  }
  slotwiseVehicleData(data){
    let apiurl=this.baseURL+"getslotwiseVehicle";
    return this.http.post(apiurl,data);
  }
}
