import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DelayDashboardComponent } from './delay-dashboard/delay-dashboard.component';
import {IrunDashboardComponent } from './irun-dashboard/irun-dashboard.component';

const routes: Routes = 
  [{
    path: '',
    children: [

      { path: '', redirectTo: 'Trip-Dashboard', pathMatch: 'full' },
      { path: 'Report', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
      { path: 'Trip-Dashboard',component:DashboardComponent  },
      { path: 'Delay-Dashboard', component: DelayDashboardComponent },
      { path: 'Irun-Dashboard', component: IrunDashboardComponent },
       // Feature rout
    ]
    }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})      
export class BplRoutingModule { }
