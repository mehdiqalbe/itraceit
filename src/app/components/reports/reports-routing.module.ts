import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlltripsComponent} from './alltrips/alltrips.component'

const routes: Routes = [
  // path: '',
  // children: [
  //   {
  //     path: 'reportss', component: AlltripsComponent
  //   },]
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
