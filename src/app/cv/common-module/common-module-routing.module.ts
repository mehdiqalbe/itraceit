import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { VehicleNearbyComponent } from './vehicle-nearby/vehicle-nearby.component';
// import {HomeComponent} from './home/home.component';
// import { LivePageComponent } from './live-page/live-page.component';
const routes: Routes = [
  
  { path: '', redirectTo: 'HomeDashboard', pathMatch: 'full' }, // Default route
  // { path: 'vehicle-nearby', component:VehicleNearbyComponent },
  // { path:'HomeDashboard', component:HomeComponent},
  // { path:'live', component:LivePageComponent},
  { path: 'Customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'Transporter', loadChildren: () => import('./transporter/transporter.module').then(m => m.TransporterModule) },
  // { path: '', redirectTo: 'roadcast', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonModuleRoutingModule { }
