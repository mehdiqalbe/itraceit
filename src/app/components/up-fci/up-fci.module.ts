import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
// import { LeafletComponent } from './leaflet/leaflet.component';
// import { MapsRoutingModule } from './maps-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
// import { MapHeaderComponent } from 'src/app/shared/components/map-header/map-header.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import {NgbModule, NgbNavOutlet} from "@ng-bootstrap/ng-bootstrap";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ColorPickerModule } from 'ngx-color-picker';
import { ClickOutsideModule } from 'ng-click-outside';
// import { NgClockPickerLibModule } from 'ng-clock-picker-lib';
import { BrowserModule } from '@angular/platform-browser';
// import{ } from './shared/components/map-header/'
import { DatePipe } from '@angular/common';

// import { RootPlannerComponent } from './root-planner/root-planner.component';
// import { ItraceitComponent } from './itraceit/itraceit.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';

// import { CloseTriggerComponent } from './close-trigger/close-trigger.component';
// import { SummaryComponent } from './summary/summary.component';


import { UPFCIRoutingModule } from './up-fci-routing.module';



import { SidemenuComponent } from './sidemenu/sidemenu.component';

// import { CanvasJS } from '@canvasjs/angular-charts/lib/angular-charts.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

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

@NgModule({
  declarations: [
 
   
  
    SidemenuComponent,
 
    ILGICComponent,
    TransporterComponent,
    AgentComponent,
    TripDashboardComponent,
    CreateTripComponent,
    WalletComponent,
    AgreementComponent,
    CvComponent,
    TransporterDashboardComponent,
    DriverDashboaredComponent,
    VehicleDashboaredComponent,
  ],
  imports: [
    CommonModule,
    UPFCIRoutingModule,
    CommonModule,
    // MapsRoutingModule,
     SharedModule,
    HttpClientModule,
    LeafletModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    NgbModule,
    Ng2SearchPipeModule,
    NgxMaterialTimepickerModule,
    NgxDaterangepickerMd,
    ColorPickerModule,
    NgxSpinnerModule,
    NgxDatatableModule,
    NgSelectModule,
    NgbModule,
    ClickOutsideModule,
    // CanvasJS,
  ],
  providers: [DatePipe],
})
export class UPFCIModule { }
