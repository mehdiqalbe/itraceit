import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'bpl', loadChildren: () => import('./bpl/bpl.module').then(m => m.BplModule) },
  { path: 'master', loadChildren: () => import('./master/master.module').then(m => m.MasterModule) },
  { path: '', redirectTo: 'bpl', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericAlertRoutingModule { }
