import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BluedartService {

  constructor( private http: HttpClient) { }


  specificTripDashboard(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboard',val);
  }
  specificTripDashboardFilter(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardFilter',val);
  }
  specificTripDashboardDetails(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardDetails',val);
  }
  specificTDLink(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/scheduleDashboardTrackingLink',val)
  }
}
