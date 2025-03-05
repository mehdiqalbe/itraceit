import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgreementComponent } from './agreement/agreement.component';
import {DocumentWalletComponent } from './document-wallet/document-wallet.component';
import { BillingComponent } from './billing/billing.component';
const routes: Routes = [
    { path: 'Agreement', component: AgreementComponent},
     { path: 'Document-Wallet', component: DocumentWalletComponent},
     { path: 'Billing', component: BillingComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransporterRoutingModule { }
