import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BplService {

  constructor(private http: HttpClient) { }
  genericTripReportFilter(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/genericTripReportFilter',val)
  }
    
  genericTripReport(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/genericTripReport',val)
  }

  getGenericVehicle(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/getGenericVehicle',val)
  }
}
