import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleNearbyComponent } from './vehicle-nearby/vehicle-nearby.component';
import {HomeComponent} from './home/home.component';
import { LivePageComponent } from './live-page/live-page.component';
const routes: Routes = [
  
  { path: '', redirectTo: 'HomeDashboard', pathMatch: 'full' }, // Default route
  { path: 'vehicle-nearby', component:VehicleNearbyComponent },
  { path:'HomeDashboard', component:HomeComponent},
  { path:'live', component:LivePageComponent},
  // { path: 'master', loadChildren: () => import('./master/master.module').then(m => m.MasterModule) },
  // { path: '', redirectTo: 'roadcast', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonModuleRoutingModule { }
