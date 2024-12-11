import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { CVRoutingModule } from './cv-routing.module';
// ------------------------------------------------------------

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
import { CommonModule, DatePipe } from '@angular/common';

// import { RootPlannerComponent } from './root-planner/root-planner.component';
// import { ItraceitComponent } from './itraceit/itraceit.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CVRoutingModule,
    NgSelectModule,
    NgxDatatableModule,
    
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
// -------------------------------

    
  ]
})
export class CVModule { }
