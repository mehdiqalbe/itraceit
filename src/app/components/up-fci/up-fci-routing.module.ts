import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';





import { ILGICComponent } from './ilgic/ilgic.component';
import { TransporterComponent } from './transporter/transporter.component';
import { AgentComponent } from './agent/agent.component';
import { TripDashboardComponent } from './trip-dashboard/trip-dashboard.component';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { WalletComponent } from './wallet/wallet.component';
import { AgreementComponent } from './agreement/agreement.component';
import { CvComponent } from './cv/cv.component';
import { TransporterDashboardComponent } from './transporter-dashboard/transporter-dashboard.component';
import { DriverDashboaredComponent } from './driver-dashboared/driver-dashboared.component';
import { VehicleDashboaredComponent } from './vehicle-dashboared/vehicle-dashboared.component';
const routes: Routes = [
  {
    path: '',
    children: [
 
      {
        path: 'Agent', component: AgentComponent
      },
      {
        path: 'Trip', component: TripDashboardComponent
      },
      {
        path: 'Transport', component: TransporterComponent
      },
      {
        path: 'ilgic', component: ILGICComponent
      },
      {
        path: 'createTrip', component: CreateTripComponent
      },
      {
        path: 'wallet', component: WalletComponent
      },
      {
        path: 'Agreement', component: AgreementComponent
      },
      {
        path: 'cv', component: CvComponent
      },
      {
        path: 'TransporterDashboard', component: TransporterDashboardComponent
      },
      {
        path: 'Driver_dashboared', component:DriverDashboaredComponent
      },
      {
        path: 'Vehicle_dashboared', component: VehicleDashboaredComponent
      },

      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UPFCIRoutingModule { }
