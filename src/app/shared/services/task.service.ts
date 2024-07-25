import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})


export class TaskService {

  constructor(private http:HttpClient) { }
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
  AlltriggerS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/liveTriggerListAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  homeDashboardS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerDashboardAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  createAlertS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/createAlertAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  vehicleTrackongS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-secutrak/vehicleTrackingV2New";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  assignQrtS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/getQrtUserAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  assignQrtSubmitS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/assignQrtAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  getGraceInfotS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/getGracePeriodInfoAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  graceSubmitS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/actionGracePeriodAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  threatFullDataS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/liveThreatListAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  threatActionSubS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/actionThreatAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  escalationInfoS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/getEscalateInfoAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  escalatSubmitS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/actionEscalateAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }

  fcsTriggerClose(data)
  {
    let apiurl="https://testapi.secutrak.in/demo-dev-app-secutrak/fcsTriggerClose";
    
    // let apiurl="https://api.secutrak.in/dev-app-itraceit/actionTriggerAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  graceHistoryS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/graceHistoryAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  escalaHistoryS(data)
  {
    // let apiurl="http://uat.api.secutrak.in/dev-app-itraceit/escalateHistoryAT";
    let apiurl="https://api.secutrak.in/dev-app-itraceit/escalateHistoryAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  fileuploadDskS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/documentTripAT";
    // let apiurl="http://uat.api.secutrak.in/dev-app-itraceit/documentTripAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  viewFileS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/viewDocumentTripAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  tripCustomerS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/getTripCustomerAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  historyDashboardS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/triggerHistoryAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  qrtHistoryS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/qrtActionHistoryAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  threatHistoryS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/threatHistoryAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  qrtHistoryCloseS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/deassignQrtAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  vehicle_dfgS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/getPolylineByRoute";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  triggerHistoryS(data)
  {
    let apiurl="https://testapi.secutrak.in/demo-dev-app-secutrak/fciTtriggerReport";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  liveLocation2S(data)
  {
    let apiurl="https://api.secutrak.in/demo-dev-app-secutrak/liveDataV2";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  closeTriggerValidS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/validateAlertLink";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  closeTriggerS(data)
  {
    let apiurl="https://api.secutrak.in/dev-app-itraceit/actionAlertLink";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  trackapiS(data)
  {
    let apiurl=" https://api.secutrak.in/demo-dev-app-secutrak/vehicleTrackingV3";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  priorityS(data)
  {
    let apiurl=" https://api.secutrak.in/dev-app-itraceit/setTripPriorityAT";
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
    let apiurl=" https://api.secutrak.in/dev-app-itraceit/triggerReportSummaryAT";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  fciTripTextDashboard(data)
  {
    let apiurl="https://testapi.secutrak.in/demo-dev-app-secutrak/fciTripTextDashboard";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  fciTtriggerReportFilter(data)
  {
    let apiurl="https://testapi.secutrak.in/demo-dev-app-secutrak/fciTtriggerReportFilter";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
 
  fciTripReportFilter(data)
  {
    let apiurl="  https://testapi.secutrak.in/demo-dev-app-secutrak/fciTripReportFilter";
    //let apiurl="https://jsonplaceholder.typicode.com/users";
   //let apiurl= 'http://localhost:3000/workZone'
    return this.http.post(apiurl,data);
  }
  fciTripReport(data)
  {
    let apiurl="https://testapi.secutrak.in/demo-dev-app-secutrak/fciTripReportV3";

    return this.http.post(apiurl,data);
  }
  fciTripTextDashboardTest(data)
  {
    let apiurl="https://testapi.secutrak.in/demo-dev-app-secutrak/fciTripTextDashboardTest";

    return this.http.post(apiurl,data);
  }
  vehicleInstallationReport(val:any){
    return this.http.post('https://testapi.secutrak.in/demo-dev-app-secutrak/vehicleInstallationReport',val);
  }
  fcsTrackingData(val:any){
    return this.http.post('https://testapi.secutrak.in/demo-dev-app-secutrak/fcsTrackingData',val);
  }
  
  myMethod(val:any) {
    console.log('Service method called');
  
  
  }

}
