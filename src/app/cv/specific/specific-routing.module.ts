import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'bluedart', loadChildren: () => import('./bluedart/bluedart.module').then(m => m.BluedartModule) },
  { path: 'dtdc', loadChildren: () => import('./dtdc/dtdc.module').then(m => m.DtdcModule) },
  // { path: '', redirectTo: 'bluedart', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecificRoutingModule { }
