import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripReportComponent } from './trip-report/trip-report.component';
import { SlotwiseDistanceReportComponent } from './slotwise-distance-report/slotwise-distance-report.component';
import {DelayReportComponent} from './delay-report/delay-report.component';
import { VehicleReportComponent } from './vehicle-report/vehicle-report.component';
import { VehicleUtilizationComponent } from './vehicle-utilization/vehicle-utilization.component';
import { DataPushReportComponent } from './data-push-report/data-push-report.component';
const routes: Routes = 
  [{
    path: '',
    children: [
  
      { path: '', redirectTo: 'TripReport', pathMatch: 'full' }, // Default route
      { path: 'TripReport', component:TripReportComponent},
      { path: 'SlotwiseReport', component:SlotwiseDistanceReportComponent},
      { path: 'VehicleReport', component:VehicleReportComponent},
      { path: 'VehicleUtilization', component:VehicleUtilizationComponent},
      { path: 'DelayReport', component:DelayReportComponent},
      { path: 'DataPushReport', component:DataPushReportComponent},
       // Feature rout
    ]
    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
