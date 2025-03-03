import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AgreementComponent } from 'src/app/components/up-fci/agreement/agreement.component';

import { AgreementComponent } from './agreement/agreement.component';
import {DocumentWalletComponent } from './document-wallet/document-wallet.component'

const routes: Routes = [

    
    { path: '', redirectTo: 'HomeDashboard', pathMatch: 'full' }, // Default route
    { path: 'Agreement', component:AgreementComponent},
    { path: 'Document-Wallet', component:DocumentWalletComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
