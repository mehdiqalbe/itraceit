import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { DelayDashboardComponent } from './delay-dashboard/delay-dashboard.component';

const routes: Routes = 
  [{
    path: '',
    children: [
      // { path: 'Delay-Dashboard', component: DelayDashboardComponent },
      { path: 'Report', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
       // Feature rout
    ]
    }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BplRoutingModule { }
