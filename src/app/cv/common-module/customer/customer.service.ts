import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {

    
   }
    url:any='https://api-bde.secutrak.in/dev-app-cv-ilgic/'
    Durl:any='https://api-py.secutrak.in/api/';
    // https://api-py.secutrak.in/api/transporterdata/
   agreementDisplayS(val: any) {
    return this.http.post('https://api-py.secutrak.in/api/getagreementdata/', val);
  }

  filtersubmitS(val:any){
    return this.http.post(this.url+'documentWallet',val);
  }
  buluploadS(val:any){
    return this.http.post(this.url+'documentBulkUpload',val);
  }
  walletOperationS(val:any){
    return this.http.post(this.url+'documentChangeStatus',val);
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
  // Document Wallet END-------------------------------------------------------------------------------------------------
}
