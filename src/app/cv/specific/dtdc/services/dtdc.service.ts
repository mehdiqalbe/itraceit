import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DtdcService {

  constructor( private http: HttpClient) { }
  baseURL:any="https://apinode2.secutrak.in/dev-app-itraceit/";
  specificTripDashboard(val:any){
    // https://apicvmob.secutrak.in/dev-app-dtdc
    return this.http.post(this.baseURL+'scheduleDashboardDtdc',val);
  }
  specificTripDashboardFilter(val:any){
    return this.http.post(this.baseURL+'scheduleDashboardDtdcFilter',val);
  }
  specificTripDashboardDetails(val:any){
    return this.http.post(this.baseURL+'scheduleDashboardDtdcDetails',val);
  }
  specificTDLink(val:any){
    return this.http.post(this.baseURL+'scheduleDashboardDtdcTrackingLink',val)
  }
  networkVehicleDelayReport(val:any){
    return this.http.post(this.baseURL+'networkVehicleDelayReport',val)
  }
  /////////////////////////Summary Dashboard/////////////////////////////////////////////////////////////////////////
  dtdcSummaryFilter(data){
  
    let apiurl=this.baseURL+"dtdcSummaryFilter";
    
    return this.http.post(apiurl,data);
  }
  dtdcSummary(data){
    
    let apiurl=this.baseURL+"dtdcSummary";
    
    return this.http.post(apiurl,data);
  }
  // -------------Trip Report--------------------------------------------------------------------------------------------------------
  dtdcTripReportFilter(data){
  
    let apiurl=this.baseURL+"dtdcTripReportFilter";
    
    return this.http.post(apiurl,data);
  }
  dtdcTripReport(data){
    
    let apiurl=this.baseURL+"dtdcTripReport";
    
    return this.http.post(apiurl,data);
  }
  dtdc_delayDashboard(data){
    // let apiurl="https://api.secutrak.in/dev-app-dtdc/delayDashboardDtdc";
    let apiurl=this.baseURL+"delayDashboardDtdc";
   
    return this.http.post(apiurl,data);
  }
  // --------Vehicle Report----------------------------------------------------------------------
  vehicleReportFilter(val:any){
    return this.http.post(this.baseURL+'vehicleReportFilter',val)
  }
  searchTransporter(val:any){
    return this.http.post(this.baseURL+'searchTransporter',val)
  }
  searchVehicle(val:any){
    return this.http.post(this.baseURL+'searchVehicle',val)
  }
  vehicleReport(val:any){
    return this.http.post(this.baseURL+'vehicleReport',val)
  }
  delayDashboardDtdcFilter(val:any){
    return this.http.post(this.baseURL+'delayDashboardDtdcFilter',val)
  }
  // bdDelayDashboardFilter
  delayDashboardDisclaimer(val:any){
    return this.http.post(this.baseURL+'delayDashboardDisclaimer',val)
  }
    

//  ------------------------------------------------------------Slotwise Distance Report-------------------------------
// https://apinode2.secutrak.in:3001/dev-app-itraceit/slotwiseReportFilter
slotwiseDistanceFilter(data){
  
  let apiurl=this.baseURL+"slotwiseReportFilter";
 
  return this.http.post(apiurl,data);
}

slotwiseDistanceData(data){
  
  let apiurl=this.baseURL+"slotwiseGeneralReport";
 
  return this.http.post(apiurl,data);
}
slotwiseVehicleData(data){
  let apiurl=this.baseURL+"getslotwiseVehicle";
 
  return this.http.post(apiurl,data);
}
}
