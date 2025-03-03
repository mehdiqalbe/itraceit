// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CommonModuleService {

//   constructor(private http: HttpClient) { }
//   baseURL:any="https://apinode2.secutrak.in/dev-app-itraceit/";
//   nearbyFilter(val:any){
//     return this.http.post(this.baseURL+'nearByVehiclesFilter',val)
//   }
//   nearbyLocation(val:any){
//     return this.http.post(this.baseURL+'nearByVehiclesLocationList',val)
//   }
//   nearbyVehicleFilter(val:any){
//     return this.http.post(this.baseURL+'nearByVehiclesBb',val)
//   }
  
// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonModuleService {

  constructor(private http: HttpClient) { }
  Home_BaseURL: any='https://api-bde.secutrak.in/dev-app-home/';
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
  
// ------------------------------HOME------------------------------------------------------------------
detail(val:any){
  return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/downloadTripV2?',val);
}
MAP(val:any){
  return this.http.post(this.Home_BaseURL+'vehicleTrackingV2',val);
  // http://uat.api.secutrak.in/dev-app-itraceit/vehicleTrackV2
}
Vehicle_detail(val:any){
  return this.http.post(this.Home_BaseURL+'userVehicleListV3',val);
}
// https://api-bde.secutrak.in
Vehicle_detail_pds(val:any){
  // return this.http.post('https://api-bde.secutrak.in/dev-app-pds/userVehicleListV3',val);
      return this.http.post('https://api-secutrak.secutrak.in/dev-app-pds/userVehicleListV3',val);
   
}
Lastlocation(val:any){
  return this.http.post(this.Home_BaseURL+'vehicleLastLocationV2',val);
}
Filter(val:any){
  return this.http.post(this.Home_BaseURL+'vehicleFiltersV2',val);
}
// http://uat.api.secutrak.in/dev-app-itraceit/geofenceListV2
geofence_list(val:any){
  return this.http.post(this.Home_BaseURL+'geofenceListV2',val);
}
// http://uat.api.secutrak.in/dev-app-itraceit/geofenceAddV2
geofence_detail(val:any){
  return this.http.post(this.Home_BaseURL+'geofenceDetailV2',val);
}
geofence_add(val:any){
  return this.http.post(this.Home_BaseURL+'geofenceAddV2',val);
}
geofence_Delete(val:any){
  return this.http.post(this.Home_BaseURL+'geofenceDeleteV2',val);
}

geofence_Update(val:any){
  return this.http.post(this.Home_BaseURL+'geofenceUpdateV2',val);
}

Landmark_list(val:any){
  return this.http.post(this.Home_BaseURL+'landmarkListV2',val);
}
Landmark_add(val:any){
  return this.http.post(this.Home_BaseURL+'landmarkAddV2',val);
}
Landmark_update(val:any){
  return this.http.post(this.Home_BaseURL+'landmarkUpdateV2',val);
}
Landmark_delete(val:any){
  return this.http.post(this.Home_BaseURL+'landmarkDeleteV2',val);
}

Route_list(val:any){
  return this.http.post(this.Home_BaseURL+'polylineRoutesV2',val);
}

polyline_path(val:any){
  return this.http.post(this.Home_BaseURL+'polylineClustersV2',val);
}
Driver_list(val:any){
  return this.http.post(this.Home_BaseURL+'myDriversList',val);
}

Driver_edit(val:any){
  return this.http.post(this.Home_BaseURL+'driverEdit',val);
}

Driver_delete(val:any){
  return this.http.post(this.Home_BaseURL+'deleteDriverV2',val);
}

Weather_forcast(val:any){
  return this.http.post(this.Home_BaseURL+'weatherForecastV2',val);
}
documentation_wallet(val:any){
  return this.http.post(this.Home_BaseURL+'documentVehicle',val);
}
rightside_menu(val:any){
  return this.http.post(this.Home_BaseURL+'homeMenu',val);
}
// rightside_menu(val:any){
//   return this.http.post(this.Home_BaseURL+'homeMenu',val);
// }
vehicle_filter(val:any){
  return this.http.post(this.Home_BaseURL+'userVehicleListV3',val);
}
segment(val:any){
  return this.http.post(this.Home_BaseURL+'segmentAddV2',val);
}
union(val:any){
  return this.http.post(this.Home_BaseURL+'unionSegmentAddV2',val);
}
segment_list(val:any){
  return this.http.post(this.Home_BaseURL+'segmentsListV2',val);
}
segmentUnion_list(val:any){
  return this.http.post(this.Home_BaseURL+'unionSegmentListV2',val);
}
Route_id(val:any){
  return this.http.post(this.Home_BaseURL+'routeListV2',val);
}
polyline_RouteAssignment(val:any){
  return this.http.post(this.Home_BaseURL+'polylineRouteAssignmentAddV2',val);
}

polyline_delete(val:any){
  return this.http.post(this.Home_BaseURL+'polylineRouteAssignmentDeleteV2',val);
}
Landmark_type(val:any){
  return this.http.post(this.Home_BaseURL+'landmarkTypeListV2',val);
}
change_password(val:any){
  return this.http.post(this.Home_BaseURL+'changePassword',val);
}

// extra===============
Feedervalue(val: any) {
  return this.http.post(this.Home_BaseURL+'feederType', val);
}

Tripvalue(val: any) {

  return this.http.post(this.Home_BaseURL+'tripType', val);

}

Vehiclevalue(val: any) {

  return this.http.post(this.Home_BaseURL+'ajaxVehicle', val);

}

Routemaster(val: any) {
  return this.http.post(this.Home_BaseURL+'routeMaster', val);
}

Stationmaster(val: any) {
  return this.http.post(this.Home_BaseURL+'stationMaster', val);
}

Destination(val: any) {
  return this.http.post(this.Home_BaseURL+'stationMaster', val);
}

regionmaster(val: any) {
  return this.http.post(this.Home_BaseURL+'regionMaster', val);
}


tableData1(val: any) {
  return this.http.post(this.Home_BaseURL+'courierTripReportHeader', val);
}


TableData(val: any) {

  return this.http.post(this.Home_BaseURL+'courierTripReport', val);
}

getMapLocation(val:any){
  return this.http.post(this.Home_BaseURL+'downloadVehicleTrack', val);
}

getMap(val:any){
  return this.http.post(this.Home_BaseURL+'vehicleTrack', val)
}
RouteCategory(val: any) {
  return this.http.post(this.Home_BaseURL+'routeCategoryV2', val);
}
RouteType(val: any) {
  return this.http.post(this.Home_BaseURL+'feederTypeV2', val);
}
Save(val: any) {
 
  return this.http.post(this.Home_BaseURL+'courierTripTextDashboardV2', val);
}
TableHeader(val:any){
  return this.http.post(this.Home_BaseURL+'courierTripTextDashboardHeadersV2', val);
}
Live_latlng(val:any){
  return this.http.post(this.Home_BaseURL+'liveDataV2',val);
}
StationType(val:any){
  return this.http.post(this.Home_BaseURL+'stationTypeMaster',val);
}
runRoutes(val:any){
  return this.http.post(this.Home_BaseURL+'runRoutes',val);
}
stations(val:any){
  return this.http.post(this.Home_BaseURL+'stations',val);
}
Filter_plant(val:any){
  return this.http.post(this.Home_BaseURL+'filteredVehicleLive',val);
}

AddCustomerPlant(val:any){
  return this.http.post(this.Home_BaseURL+'stationAdd',val);
}
//this.Home_BaseURL+ reminderList
Reminder(val:any){
  return this.http.post(this.Home_BaseURL+'reminderListV2',val);
}
//this.Home_BaseURL+ placeAndNearFrom
placeAndNearFrom(val:any){
  return this.http.post(this.Home_BaseURL+'placeAndNearFrom',val);
}
// 
MAP_1(val:any){
  return this.http.post(this.Home_BaseURL+'vehicleTrackingV2New',val);
  //  return this.http.post(this.Home_BaseURL+'vehicleTrackingV2Home',val);
  
}
trip_creation(val:any){
  
  return this.http.post(this.Home_BaseURL+'retailTripCreate',val);
}
documentWallet(val:any){
  
  return this.http.post(this.Home_BaseURL+'documentWallet',val);
}
documentChangeStatus(val:any){
  
  return this.http.post(this.Home_BaseURL+'documentChangeStatus',val);
}
documentEdit(val:any){
  
  return this.http.post(this.Home_BaseURL+'documentEdit',val);
}
documentMasters(val:any){
  
  return this.http.post(this.Home_BaseURL+'documentMasters',val);
}
documentAdd(val:any){
  
  return this.http.post(this.Home_BaseURL+'documentAdd',val);
}
myExpenses(val:any){
  
  return this.http.post(this.Home_BaseURL+'myExpenses',val);
}
expenseStatusChange(val:any){
  
  return this.http.post(this.Home_BaseURL+'expenseStatusChange',val);
}
expenseTypes(val:any){
  
  return this.http.post(this.Home_BaseURL+'expenseTypes',val);
}
expenseAdd(val:any){
  
  return this.http.post(this.Home_BaseURL+'expenseAdd',val);
}
vehicleStatusTypes(val:any){
  
  return this.http.post(this.Home_BaseURL+'vehicleStatusTypes',val);
}
breakdownAdd(val:any){
  
  return this.http.post(this.Home_BaseURL+'breakdownAdd',val);
}
breakdownClose(val:any){
  
  return this.http.post(this.Home_BaseURL+'breakdownClose',val);
}
assignedDrivers(val:any){
  
  return this.http.post(this.Home_BaseURL+'assignedDrivers',val);
}
retailTrips(val:any){
  return this.http.post(this.Home_BaseURL+'retailTrips',val);
}
locationList(val:any){
  return this.http.post(this.Home_BaseURL+'locationList',val);
}
customerList(val:any){
  return this.http.post(this.Home_BaseURL+'customerList',val);
}
stateList(val:any){
  return this.http.post(this.Home_BaseURL+'stateList',val);
}
customerLocationMappingAdd(val:any){
  return this.http.post(this.Home_BaseURL+'customerLocationMappingAdd',val);
}
customerLocationMappings(val:any){
  return this.http.post(this.Home_BaseURL+'customerLocationMappings',val);
}
customerLocationMappingChangeStatus(val:any){
  return this.http.post(this.Home_BaseURL+'customerLocationMappingChangeStatus',val);
}
customerLocationMappingEdit(val:any){
  return this.http.post(this.Home_BaseURL+'customerLocationMappingEdit',val);
}
reminderMaster(val:any){
  return this.http.post(this.Home_BaseURL+'reminderMaster',val);
}
reminderAdd(val:any){
  return this.http.post(this.Home_BaseURL+'reminderAdd',val);
}
retailTripClose(val:any){
  return this.http.post(this.Home_BaseURL+'retailTripClose',val);
  // http://uat.api.secutrak.in/dev-app-secutrak/
}
reminderDismiss(val:any){
  return this.http.post(this.Home_BaseURL+'reminderDismiss',val);
}
reminderRenew(val:any){
  return this.http.post(this.Home_BaseURL+'reminderRenew',val);
}
documentRenew(val:any){
  return this.http.post(this.Home_BaseURL+'documentRenew',val);
}
stateCitiesList(val:any){
  return this.http.post(this.Home_BaseURL+'stateCitiesList',val);
}
driversChangeStatus(val:any){
  return this.http.post(this.Home_BaseURL+'driversChangeStatus',val);
}
myDriverAdd(val:any){
  return this.http.post(this.Home_BaseURL+'myDriverAdd',val);
}
vehicleDriverChange(val:any){
  return this.http.post(this.Home_BaseURL+'vehicleDriverChange',val);
}
vdAssignmentAdd(val:any){
  return this.http.post(this.Home_BaseURL+'vdAssignmentAdd',val);
}
dairySegment(val:any){
  return this.http.post(this.Home_BaseURL+'dairySegment',val);
  // https://api-bde.secutrak.in/dev-app-itraceit_uat
}
vehicleNumber(val:any){
  return this.http.post(this.Home_BaseURL+'vehicleNumber',val);
}
factoryPlant(val:any){
  return this.http.post(this.Home_BaseURL+'factoryPlant',val);
}
route(val:any){
  return this.http.post(this.Home_BaseURL+'route',val);
}
customer(val:any){
  return this.http.post(this.Home_BaseURL+'customer',val);
}
save_trip(val:any){
  return this.http.post(this.Home_BaseURL+'save',val);
  //  https://api-bde.secutrak.in/dev-app-itraceit_uat
}
nearbyVehicles(val:any){
  return this.http.post(this.Home_BaseURL+'nearbyVehicles',val);
}
updateVehicleInfo(val:any){
  return this.http.post(this.Home_BaseURL+'updateVehicleInfo',val);
}
landmarkSuggestion(val:any){
  return this.http.post(this.Home_BaseURL+'landmarkSuggestion',val);
}
paymentOrderGeneration(val:any){
  return this.http.post(this.Home_BaseURL+'paymentOrderGeneration',val);
}
// 
getAccountDetails(val:any){
  return this.http.post(this.Home_BaseURL+'getAccountDetails',val);
}
updateAccountDetails(val:any){
  return this.http.post(this.Home_BaseURL+'updateAccountDetails',val);
}
managerUsersDetails(val:any){
  return this.http.post(this.Home_BaseURL+'managerUsersDetails',val);
}
updatePassword(val:any){
  return this.http.post(this.Home_BaseURL+'updatePassword',val);
}
manage_alerts(val:any){
  return this.http.post(this.Home_BaseURL+'manage_alerts',val);
}
update_alerts(val:any){
  return this.http.post(this.Home_BaseURL+'update_alerts',val);
}
// getAccountDetails(data) {
//   let apiurl=this.Home_BaseURL+"getAccountDetails";
//   //let apiurl="https://jsonplaceholder.typicode.com/users";
//  //let apiurl= 'http://localhost:3000/workZone'
//   return this.http.post(apiurl,data);
// }


  razorpayGatewayKeys(val:any){
    return this.http.post(this.Home_BaseURL+'razorpayGatewayKeys',val);
  }
  paymentFinalization(val:any){
    return this.http.post(this.Home_BaseURL+'paymentFinalization',val);
  }
  paymentOrderInitiate(val:any){
    return this.http.post(this.Home_BaseURL+'paymentOrderInitiate',val);
    
  }
  userLedgerHistory(val:any){
    return this.http.post(this.Home_BaseURL+'userLedgerHistory',val);
  }
  paymentProof(val:any){
    return this.http.post(this.Home_BaseURL+'paymentProof',val);
  }
  findLandmark(val:any){
    return this.http.post(this.Home_BaseURL+'findLandmark',val);
  }

}
