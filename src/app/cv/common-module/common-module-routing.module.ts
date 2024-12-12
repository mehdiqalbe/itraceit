import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleNearbyComponent } from './vehicle-nearby/vehicle-nearby.component';

const routes: Routes = [
  { path: 'vehicle-nearby', component:VehicleNearbyComponent },
  // { path: 'master', loadChildren: () => import('./master/master.module').then(m => m.MasterModule) },
  // { path: '', redirectTo: 'roadcast', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonModuleRoutingModule { }
