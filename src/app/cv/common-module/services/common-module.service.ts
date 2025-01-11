import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonModuleService {

  constructor(private http: HttpClient) { }
  baseURL:any="https://apinode2.secutrak.in/dev-app-itraceit/";
  nearbyFilter(val:any){
    return this.http.post(this.baseURL+'nearByVehiclesFilter',val)
  }
  nearbyLocation(val:any){
    return this.http.post(this.baseURL+'nearByVehiclesLocationList',val)
  }
  nearbyVehicleFilter(val:any){
    return this.http.post(this.baseURL+'nearByVehiclesBb',val)
  }
  
}
