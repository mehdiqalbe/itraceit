import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'roadcast', loadChildren: () => import('./roadcast/roadcast.module').then(m => m.RoadcastModule) },
  { path: 'master', loadChildren: () => import('./master/master.module').then(m => m.MasterModule) },
  { path: '', redirectTo: 'roadcast', pathMatch: 'full' },
  { path: 'Transporter', loadChildren: () => import('src/app/cv/common-module/transporter/transporter.module').then(m => m.TransporterModule) },
  { path: 'Customer', loadChildren: () => import('src/app/cv/common-module/customer/customer.module').then(m => m.CustomerModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericRoutingModule { }
