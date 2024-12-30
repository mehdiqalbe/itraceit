import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BluedartService {

  constructor( private http: HttpClient) { }
  
    
    specificTripDashboard(val:any){
      return this.http.post('https://apinode2.secutrak.in:3001/dev-app-itraceit/scheduleDashboard',val);
    }
    specificTripDashboardFilter(val:any){
      return this.http.post('https://apinode2.secutrak.in:3001/dev-app-itraceit/scheduleDashboardFilter',val);
    }
    specificTripDashboardDetails(val:any){
      return this.http.post('https://apinode2.secutrak.in:3001/dev-app-itraceit/scheduleDashboardDetails',val);
    }
    specificTDLink(val:any){
      return this.http.post('https://apinode2.secutrak.in:3001/dev-app-itraceit/scheduleDashboardTrackingLink',val)
    }
  
    bdDelayDashboardFilter(val:any){
      return this.http.post('https://apinode2.secutrak.in:3001/dev-app-itraceit//bdDelayDashboardFilter',val)
    }
    bdDelayDashboard(val:any){
      return this.http.post('https://apinode2.secutrak.in:3001/dev-app-itraceit/bdDelayDashboard',val)
    }
    
  }
     