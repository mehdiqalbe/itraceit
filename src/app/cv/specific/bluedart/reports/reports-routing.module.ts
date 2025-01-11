import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripReportComponent } from './trip-report/trip-report.component';
import { SlotwiseDistanceReportComponent } from './slotwise-distance-report/slotwise-distance-report.component';

const routes: Routes = 
  [{
    path: '',
    children: [
  
      { path: '', redirectTo: 'TripReport', pathMatch: 'full' }, // Default route
      { path: 'TripReport', component:TripReportComponent},
      { path: 'SlotwiseReport', component:SlotwiseDistanceReportComponent},
       // Feature rout
    ]
    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
