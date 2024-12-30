import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BluedartService {

  constructor( private http: HttpClient) { }

  baseURL:any="https://apinode2.secutrak.in:3001/dev-app-itraceit/";
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

  bdDelayDashboardFilter(val:any){
    return this.http.post(this.baseURL+'bdDelayDashboardFilter',val)
  }
  bdDelayDashboard(val:any){
    return this.http.post(this.baseURL+'bdDelayDashboard',val)
  }
  
}
