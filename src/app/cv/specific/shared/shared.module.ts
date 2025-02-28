import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
// import { TranshipmentComponent } from './transhipment/transhipment.component';


@NgModule({
  declarations: [
    // TranshipmentComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
