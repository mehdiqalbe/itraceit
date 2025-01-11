import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BplService {

  constructor(private http: HttpClient) { }
  BASE_URL = "https://api.secutrak.in/dev-app-bpl";
  url="https://apinode2.secutrak.in/dev-app-itraceit/";
  genericTripReportFilter(val:any){
    return this.http.post(this.url+'genericTripReportFilter',val)
  }
    
  genericTripReport(val:any){
    return this.http.post(this.url+'genericTripReport',val)
  }

  getGenericVehicle(val:any){
    return this.http.post(this.url+'getGenericVehicle',val)
  }
  // BASE_URL = "https://api.secutrak.in/dev-app-bpl";
  createAlertS(data)
{
  // let apiurl="https://api.secutrak.in/dev-app-itraceit/createAlertFlashAT";

  let apiurl:any;
          // https://api.secutrak.in/dev-app-dtdc
           apiurl=this.BASE_URL+"createAlertFlashAT";


  //let apiurl="https://jsonplaceholder.typicode.com/users";
 //let apiurl= 'http://localhost:3000/workZone'
  return this.http.post(apiurl,data);
}

  AlltriggerS(data)
  {
    let apiurl:any;
     
     apiurl=this.BASE_URL+"/liveTriggerListFlashAT";
       
    return this.http.post(apiurl,data);
  }
  homeDashboardS(data) {
    const apiurl = `${this.BASE_URL}/triggerDashboardFlashAT`;
    return this.http.post(apiurl, data);
  }
  
  getGraceInfotS(data) {
    const apiurl = `${this.BASE_URL}/getGracePeriodInfoAT`;
    return this.http.post(apiurl, data);
  }
  
assignQrtSubmitS(data)
{
  // let apiurl="https://api.secutrak.in/dev-app-itraceit/assignQrtAT";


  let apiurl:any;
    // https://api.secutrak.in/dev-app-dtdc
     apiurl=this.BASE_URL+"assignQrtAT";
        



  //let apiurl="https://jsonplaceholder.typicode.com/users";
 //let apiurl= 'http://localhost:3000/workZone'
  return this.http.post(apiurl,data);
}
assignQrtS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/getQrtUserAT";
    return this.http.post(apiurl,data);
  }
  graceSubmitS(data) {
    const apiurl = `${this.BASE_URL}/actionGracePeriodFlashAT`;
    return this.http.post(apiurl, data);
  }
  threatFullDataS(data) {
    const apiurl = `${this.BASE_URL}/liveThreatListFlashAT`;
    return this.http.post(apiurl, data);
  }
  threatActionSubS(data) {
    const apiurl = `${this.BASE_URL}/actionThreatFlashAT`;
    return this.http.post(apiurl, data);
  }
  escalationInfoS(data) {
    const apiurl = `${this.BASE_URL}/getEscalateInfoAT`;
    return this.http.post(apiurl, data);
  }
  escalatSubmitS(data) {
    const apiurl = `${this.BASE_URL}/actionEscalateFlashAT`;
    return this.http.post(apiurl, data);
  }
  closeS(data) { 
    const apiurl = `${this.BASE_URL}/actionTriggerFlashAT`;
    return this.http.post(apiurl, data);
  }
  
  graceHistoryS(data) {
    const apiurl = `${this.BASE_URL}/graceHistoryAT`;
    return this.http.post(apiurl, data);
  }

  escalaHistoryS(data) {
    const apiurl = `${this.BASE_URL}/escalateHistoryAT`;
    return this.http.post(apiurl, data);
  }
  
  fileuploadDskS(data) {
    const apiurl = `${this.BASE_URL}/documentTripAT`;
    return this.http.post(apiurl, data);
  }
  
  viewFileS(data) {
    const apiurl = `${this.BASE_URL}/viewDocumentTripAT`;
    return this.http.post(apiurl, data);
  }
  
  tripCustomerS(data) {
    const apiurl = `${this.BASE_URL}/getTripCustomerAT`;
    return this.http.post(apiurl, data);
  }
  
  historyDashboardS(data) {
    const apiurl = `${this.BASE_URL}/triggerHistoryAT`;
    return this.http.post(apiurl, data);
  }
  
  qrtHistoryS(data) {
    const apiurl = `${this.BASE_URL}/qrtActionHistoryAT`;
    return this.http.post(apiurl, data);
  }
  
  threatHistoryS(data) {
    const apiurl = `${this.BASE_URL}/threatHistoryAT`;
    return this.http.post(apiurl, data);
  }
  
  qrtHistoryCloseS(data) {
    const apiurl = `${this.BASE_URL}/deassignQrtAT`;
    return this.http.post(apiurl, data);
  }
  
  vehicle_dfgS(data) {
    const apiurl = `${this.BASE_URL}/getPolylineByRoute`;
    return this.http.post(apiurl, data);
  }
  
  triggerHistoryS(data) {
    const apiurl = `${this.BASE_URL}/triggerReportAT`;
    return this.http.post(apiurl, data);
  }
  
  closeTriggerValidS(data) {
    const apiurl = `${this.BASE_URL}/validateAlertLink`;
    return this.http.post(apiurl, data);
  }
  
  trackapiS(data)
  {
    let apiurl=" https://api.secutrak.in/dev-app-secutrak/vehicleTrackingV3";
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





closeTriggerS(data) {
  const apiurl = ` ${this.BASE_URL}/actionAlertLink`;
  return this.http.post(apiurl, data);
}

priorityS(data) {
  const apiurl = ` ${this.BASE_URL}/setTripPriorityFlashAT`;
  return this.http.post(apiurl, data);
}

summaryS(data) {
  const apiurl = ` ${this.BASE_URL}/triggerReportSummaryAT`;
  return this.http.post(apiurl, data);
}

}

