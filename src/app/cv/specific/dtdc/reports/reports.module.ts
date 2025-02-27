import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ClickOutsideModule } from 'ng-click-outside';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {TripReportComponent } from './trip-report/trip-report.component';
import { SlotwiseDistanceReportComponent } from './slotwise-distance-report/slotwise-distance-report.component';
import { DelayReportComponent } from './delay-report/delay-report.component';
import { VehicleReportComponent } from './vehicle-report/vehicle-report.component';
import { VehicleUtilizationComponent } from './vehicle-utilization/vehicle-utilization.component';
import { DataPushReportComponent } from './data-push-report/data-push-report.component';
import { WorkingHourDistanceReportComponent } from './working-hour-distance-report/working-hour-distance-report.component';


@NgModule({
  declarations: [
    TripReportComponent,
    SlotwiseDistanceReportComponent,
    DelayReportComponent,
    VehicleReportComponent,
    VehicleUtilizationComponent,
    DataPushReportComponent,
    WorkingHourDistanceReportComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NgSelectModule,
    NgxDatatableModule,
    ClickOutsideModule,
    ColorPickerModule,
    NgxDaterangepickerMd,
    NgxMaterialTimepickerModule,
    Ng2SearchPipeModule,
    NgbModule, 
    NgxSpinnerModule,
    NgMultiSelectDropDownModule,
    FormsModule, ReactiveFormsModule,
    LeafletModule
  ]
})
export class ReportsModule { }
