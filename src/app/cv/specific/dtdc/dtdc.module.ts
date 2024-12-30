import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DtdcRoutingModule } from './dtdc-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

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
import { IrunDashboardComponent } from './irun-dashboard/irun-dashboard.component';
import { DelayDashboardComponent } from './delay-dashboard/delay-dashboard.component';
import { SummaryDashboardComponent } from './summary-dashboard/summary-dashboard.component';
// import { DtdcFeature1Component } from './components/dtdc-feature1/dtdc-feature1.component';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    DashboardComponent,
    IrunDashboardComponent,
    DelayDashboardComponent,
    SummaryDashboardComponent,
    // DtdcFeature1Component,
    MapComponent
  ],
  imports: [
    CommonModule,
    DtdcRoutingModule,
    NgSelectModule,
    NgxDatatableModule,
    // DatePipe,
    // BrowserModule,
    ClickOutsideModule,
    ColorPickerModule,
    NgxDaterangepickerMd,
    NgxMaterialTimepickerModule,
    Ng2SearchPipeModule,
    NgbModule, 
    // NgbNavOutlet,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule,
    FormsModule, ReactiveFormsModule,
    LeafletModule
  ]
})
export class DtdcModule { }
