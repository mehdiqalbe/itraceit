import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent } from './dashboard/dashboard.component'
import { IrunDashboardComponent } from './irun-dashboard/irun-dashboard.component';
import { DelayDashboardComponent } from './delay-dashboard/delay-dashboard.component';
// import { VehicleNearbyComponent } from '../../common-module/vehicle-nearby/vehicle-nearby.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';

import { SummaryDashboardComponent } from './summary-dashboard/summary-dashboard.component';
import { SummaryReportComponent } from './summary-report/summary-report.component';
import { TriggerSummaryComponent } from './trigger-summary/trigger-summary.component';

const routes: Routes = [{
  path: '',
  children: [

    { path: '', redirectTo: (JSON.parse(localStorage.getItem('AccessMenu')||'')).ActivePage[0].name, pathMatch: 'full' }, // Default route
    { path: 'Trip-Dashboard', component: DashboardComponent },
    { path: 'Irun-Dashboard', component:IrunDashboardComponent },
    { path: 'Delay-Dashboard', component:DelayDashboardComponent },
    { path: 'Summary-Dashboard', component:SummaryDashboardComponent },
    {path:'SummaryReport',component:SummaryReportComponent},
    // {path:'vehicle-nearby',component:VehicleNearbyComponent},
    { path: 'Report', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
      { path: 'TriggerSummary', component:TriggerSummaryComponent },
     // Feature rout
  ]
  }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BluedartRoutingModule { }
