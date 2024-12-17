import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonModuleService {

  constructor(private http: HttpClient) { }

  nearbyFilter(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/nearByVehiclesFilter',val)
  }
  nearbyLocation(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/nearByVehiclesLocationList',val)
  }
  nearbyVehicleFilter(val:any){
    return this.http.post('https://apinode2.secutrak.in/dev-app-itraceit/nearByVehiclesBb',val)
  }
  
}
