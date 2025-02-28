import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonModuleRoutingModule } from './common-module-routing.module';
import { VehicleNearbyComponent } from './vehicle-nearby/vehicle-nearby.component';
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
import { HomeComponent } from './home/home.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartistModule } from 'ng-chartist';
// import { DatePipe } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { LivePageComponent } from './live-page/live-page.component';

@NgModule({
  declarations: [
    VehicleNearbyComponent,
    HomeComponent,
    LivePageComponent,
  ],
  imports: [
    NgxEchartsModule,
    ChartistModule,
    CommonModule,
    CommonModuleRoutingModule,
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
    LeafletModule,
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
    CanvasJSAngularChartsModule,
    // DatePipe,
    // NgClockPickerLibModule,
    // BrowserModule
    NgApexchartsModule,
    ChartsModule,
  ]
})
export class CommonModuleModule { }
