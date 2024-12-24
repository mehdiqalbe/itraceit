import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ManageRoutingModule } from './manage-routing.module';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleAddEditComponent } from './vehicle-add-edit/vehicle-add-edit.component';


@NgModule({
  declarations: [
    VehicleComponent,
    VehicleAddEditComponent
  ],
  imports: [
    CommonModule,
    ManageRoutingModule,
    CommonModule,
    // ReportsRoutingModule,
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
  ]
})
export class ManageModule { }
