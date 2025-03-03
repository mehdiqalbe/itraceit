import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransporterService {

 
   constructor(private http: HttpClient) {
 
     
    }
     Durl:any='https://api-py.secutrak.in/api/';
     url:any='https://testapi.secutrak.in/dev-app-cv-ilgic/'
    agreementDisplayS(val: any) {
     return this.http.post('https://api-py.secutrak.in/api/getagreementdata/', val);
   }
   venderListS(val:any){
     return this.http.post(this.Durl+'transporterdata/',val);
   }
   filterS(val:any){
     return this.http.post(this.Durl+'agreementfilterdata/',val);
   }
   agreementS(val:any){
     return this.http.post(this.Durl+'uploadcvagreementdata/',val);
   }
    // Documant Wallet-----------------------------------------------------------------------------
 
  walletMasterS(val:any){
    return this.http.post(this.url+'documentWalletMaster',val);
  }
  
  documentAddS(val:any){
    return this.http.post(this.url+'documentAdd',val);
  }
  documentEditS(val:any){
    return this.http.post(this.url+'documentEdit',val);
  }
  documentrenewS(val:any){
    return this.http.post(this.url+'documentRenew',val);
  }
  AddexpenceS(val:any){
    return this.http.post(this.url+'cv_addExpense',val);
  }
  filtersubmitS(val:any){
    return this.http.post(this.url+'documentWallet',val);
  }
  
  walletOperationS(val:any){
    return this.http.post(this.url+'documentChangeStatus',val);
  }
  buluploadS(val:any){
    return this.http.post(this.url+'documentBulkUpload',val);
  }
  // Document Wallet END-------------------------------------------------------------------------------------------------

}
