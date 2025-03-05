import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'specific', loadChildren: () => import('./specific/specific.module').then(m => m.SpecificModule) },
  // { path: 'generic', loadChildren: () => import('./generic/generic.module').then(m => m.GenericModule) },
  // { path: 'genericAlert', loadChildren: () => import('./generic-alert/generic-alert.module').then(m => m.GenericAlertModule) },
  // { path: 'common', loadChildren: () => import('./common-module/common-module.module').then(m => m.CommonModuleModule) },
  // { path: '', redirectTo: 'specific', pathMatch: 'full' },
  // { path: '**', redirectTo: 'specific' } // Fallback route
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CVRoutingModule { }
