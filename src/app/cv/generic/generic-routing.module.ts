import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'roadcast', loadChildren: () => import('./roadcast/roadcast.module').then(m => m.RoadcastModule) },
  { path: 'master', loadChildren: () => import('./master/master.module').then(m => m.MasterModule) },
  { path: '', redirectTo: 'roadcast', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericRoutingModule { }
