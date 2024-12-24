import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleAddEditComponent } from './vehicle-add-edit/vehicle-add-edit.component';

const routes: Routes = 
  [{
    path: '',
    children: [
  
      { path: '', redirectTo: 'Vehicle', pathMatch: 'full' }, // Default route
      { path: 'Vehicle', component:VehicleComponent},
      { path: 'VehicleEdit', component:VehicleAddEditComponent},
     
    ]
    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
