import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IrunDashboardComponent } from './irun-dashboard/irun-dashboard.component';
import { DelayDashboardComponent } from './delay-dashboard/delay-dashboard.component';
import { SummaryDashboardComponent } from './summary-dashboard/summary-dashboard.component';
import { MapComponent } from './map/map.component';
// import { VehicleNearbyComponent } from '../../common-module/vehicle-nearby/vehicle-nearby.component';
import { TriggerSummaryComponent } from './trigger-summary/trigger-summary.component';
import { TripDashboardComponent } from './trip-dashboard/trip-dashboard.component';
import { HomeComponent} from 'src/app/cv/common-module/home/home.component';
const routes: Routes = [{
  path: '',
  children: [

    { path: '', redirectTo: (JSON.parse(localStorage.getItem('AccessMenu')||'')).ActivePage[0].name, pathMatch: 'full' }, // Default route
    { path: 'Home', component: HomeComponent },
    { path: 'Trip-Dashboard', component: DashboardComponent },
    { path: 'Irun-Dashboard', component:IrunDashboardComponent },
    { path: 'Delay-Dashboard', component:DelayDashboardComponent },
    { path: 'Summary-Dashboard', component:SummaryDashboardComponent },
    // {path:'vehicle-nearby',component:VehicleNearbyComponent},
    { path: 'map', component:MapComponent },
    { path: 'TriggerSummary', component:TriggerSummaryComponent },
    { path: 'Dashboard', component:TripDashboardComponent },

    
    
    { path: 'Report', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
    { path: 'Manage', loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule) },
    
  { path: 'Transporter', loadChildren: () => import('src/app/cv/common-module/transporter/transporter.module').then(m => m.TransporterModule) },
     // Feature rout
  ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DtdcRoutingModule { }
