import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = 
  [{
    path: '',
    children: [
  
      { path: 'Report', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
       // Feature rout
    ]
    }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BplRoutingModule { }
