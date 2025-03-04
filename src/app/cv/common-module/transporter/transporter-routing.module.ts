import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgreementComponent } from './agreement/agreement.component';
import {DocumentWalletComponent } from './document-wallet/document-wallet.component';
import {TMSComponent } from './tms/tms.component'
const routes: Routes = [
    { path: 'Agreement', component: AgreementComponent},
     { path: 'DocumentWallet', component: DocumentWalletComponent},
     { path: 'TMSDashboard', component: TMSComponent},
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransporterRoutingModule { }
