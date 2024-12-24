import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DtdcService {

 
  constructor( private http: HttpClient) { }

  specificTripDashboard(val:any){
    // https://apicvmob.secutrak.in/dev-app-dtdc
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardDtdc',val);
  }
  specificTripDashboardFilter(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardDtdcFilter',val);
  }
  specificTripDashboardDetails(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardDtdcDetails',val);
  }
  specificTDLink(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardDtdcTrackingLink',val)
  }
  networkVehicleDelayReport(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/networkVehicleDelayReport',val)
  }
  



  /////////////////////////Summary Dashboard/////////////////////////////////////////////////////////////////////////
  dtdcSummaryFilter(data){
  
    let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/dtdcSummaryFilter";
    
    return this.http.post(apiurl,data);
  }
  
  dtdcSummary(data){
    
    let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/dtdcSummary";
    
    return this.http.post(apiurl,data);
  }
  // -------------Trip Report--------------------------------------------------------------------------------------------------------
  dtdcTripReportFilter(data){
  
    let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/dtdcTripReportFilter";
    
    return this.http.post(apiurl,data);
  }
  
  dtdcTripReport(data){
    
    let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/dtdcTripReport";
    
    return this.http.post(apiurl,data);
  }
  dtdc_delayDashboard(data){
    // let apiurl="https://api.secutrak.in/dev-app-dtdc/delayDashboardDtdc";
    let apiurl="https://apinode2.secutrak.in/dev-app-itraceit/delayDashboardDtdc";
   
    return this.http.post(apiurl,data);
  }
 
}
