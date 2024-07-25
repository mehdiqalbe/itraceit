import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';
//import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object

export interface Member {
  $key: string;
  firstName: string;
  lastName: string;
  email: string
  mobileNumber: Number;
  designation: string;
}
@Injectable({
  providedIn: 'root'
})

export class CrudService {
  // membersRef!: AngularFireList<any>;    // Reference to Member data list, its an Observable
  // memberRef!: AngularFireObject<any>;   // Reference to Member object, its an Observable too

  // Inject AngularFireDatabase Dependency in Constructor
  constructor( private http: HttpClient) { }
// private db: AngularFireDatabase,
  // Create Member
  // Addmember(member: Member) {
  //   this.membersRef.push({
  //     firstName: member.firstName,
  //     lastName: member.lastName,
  //     email: member.email,
  //     mobileNumber: member.mobileNumber,
  //     designation: member.designation
  //   })
  // }

  // Fetch Single Member Object
  // Getmember(id: string) {
  //   this.memberRef = this.db.object('members-list/' + id);
  //   return this.memberRef;
  // }

  // Fetch members List
  // GetmembersList() {
  //   this.membersRef = this.db.list('members-list');
  //   return this.membersRef;
  // }

  // Update Member Object
  // Updatemember(member: Member) {
  //   this.memberRef.update({
  //     firstName: member.firstName,
  //     lastName: member.lastName,
  //     email: member.email,
  //     mobileNumber: member.mobileNumber,
  //     designation: member.designation
  //   })
  // }

  // Delete Member Object
  // Deletemember(id: string) {
  //   this.memberRef = this.db.object('members-list/' + id);
  //   this.memberRef.remove();
  // }

  Feedervalue(val: any) {
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/feederType', val);
  }

  Tripvalue(val: any) {

    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/tripType', val);

  }

  Vehiclevalue(val: any) {

    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/ajaxVehicle', val);

  }

  Routemaster(val: any) {
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/routeMaster', val);
  }

  Stationmaster(val: any) {
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/stationMaster', val);
  }

  Destination(val: any) {
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/stationMaster', val);
  }

  regionmaster(val: any) {
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/regionMaster', val);
  }


  tableData1(val: any) {
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/courierTripReportHeader', val);
  }


  TableData(val: any) {

    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/courierTripReport', val);
  }

  getMapLocation(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/downloadVehicleTrack', val);
  }

  getMap(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/vehicleTrack', val)
  }
  RouteCategory(val: any) {
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/routeCategoryV2', val);
  }
  RouteType(val: any) {
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/feederTypeV2', val);
  }
  Save(val: any) {
   
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/courierTripTextDashboardV2', val);
  }
  TableHeader(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/courierTripTextDashboardHeadersV2', val);
  }
  detail(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/downloadTripV2?',val);
  }
  MAP(val:any){
    
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/vehicleTrackingV2',val);
    // http://uat.api.secutrak.in/dev-app-itraceit/vehicleTrackV2
  }
  Vehicle_detail(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/userVehicleListV2',val);
  }
  Lastlocation(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/vehicleLastLocationV2',val);
  }
  Filter(val:any){
    return this.http.post(' http://uat.api.secutrak.in/dev-app-itraceit/vehicleFiltersV2',val);
  }
  // http://uat.api.secutrak.in/dev-app-itraceit/geofenceListV2
  geofence_list(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/geofenceListV2',val);
  }
  // http://uat.api.secutrak.in/dev-app-itraceit/geofenceAddV2
  geofence_detail(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/geofenceDetailV2',val);
  }
  geofence_add(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/geofenceAddV2',val);
  }
  geofence_Delete(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/geofenceDeleteV2',val);
  }
  
  geofence_Update(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/geofenceUpdateV2',val);
  }
 
  Landmark_list(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/landmarkListV2',val);
  }
  Landmark_add(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/landmarkAddV2',val);
  }
  Landmark_update(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/landmarkUpdateV2',val);
  }
  Landmark_delete(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/landmarkDeleteV2',val);
  }
  
  Route_list(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/polylineRoutesV2',val);
  }
  
  polyline_path(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/polylineClustersV2',val);
  }
  Driver_list(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/driverListV2',val);
  }
  Driver_edit(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/editDriverV2',val);
  }
  
  Driver_delete(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/deleteDriverV2',val);
  }
  Driver_profile(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/driverProfileV2',val);
  }
  Weather_forcast(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/weatherForecastV2',val);
  }
  documentation_wallet(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/documentWalletV2',val);
  }
  rightside_menu(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/homeMenu',val);
  }
  vehicle_filter(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/userVehicleListV2',val);
  }
  segment(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/segmentAddV2',val);
  }
  union(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/unionSegmentAddV2',val);
  }
  segment_list(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/segmentsListV2',val);
  }
  segmentUnion_list(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/unionSegmentListV2',val);
  }
  Route_id(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/routeListV2',val);
  }
  polyline_RouteAssignment(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/polylineRouteAssignmentAddV2',val);
  }
  Add_driver(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/addDriverProfileV2',val);
  }
  polyline_delete(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/polylineRouteAssignmentDeleteV2',val);
  }
  Landmark_type(val:any){
    return this.http.post('http://uat.api.secutrak.in/dev-app-itraceit/landmarkTypeListV2',val);
  }
  
  
  
}

@Injectable()
export class ExcelService {
  constructor() { }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json,{skipHeader:true});
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    fileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
  }
}