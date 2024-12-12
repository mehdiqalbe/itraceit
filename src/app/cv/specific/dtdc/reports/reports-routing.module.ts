import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TripReportComponent } from './trip-report/trip-report.component';
const routes: Routes = 
  [{
    path: '',
    children: [
  
      { path: '', redirectTo: 'TripReport', pathMatch: 'full' }, // Default route
      { path: 'TripReport', component:TripReportComponent},
       // Feature rout
    ]
    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
