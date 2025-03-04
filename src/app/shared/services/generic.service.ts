import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

//Menu Bar

export interface Menu {
    headTitle?: string,
    path?: string;
    title?: string;
    icon?: string;
    type?: string;
    badgeType?: string;
    badgeValue?: string;
    active?: boolean;
    bookmark?: boolean;
    children?: Menu[];
    img?:string;
    img1?:string;
    deactive_img?:string;
    active_img?:string;
    status?:number;
    Account_id?:string;
}

@Injectable({
  providedIn: 'root'
})
export class GenericService implements OnDestroy {

  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

  public megaMenu: boolean = false;
  public megaMenuCollapse: boolean = window.innerWidth < 1199 ? true : false;
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;
  public fullScreen: boolean = false;
  constructor(
      private router: Router
  ) {
      this.setScreenWidth(window.innerWidth);
      fromEvent(window, 'resize').pipe(
          debounceTime(1000),
          takeUntil(this.unsubscriber)
      ).subscribe((evt: any) => {
          this.setScreenWidth(evt.target.innerWidth);
          if (evt.target.innerWidth < 991) {
              this.collapseSidebar = false;
              this.megaMenu = false;
          }
          if (evt.target.innerWidth < 1199) {
              this.megaMenuCollapse = true;
          }
      });
      if (window.innerWidth < 991) {
          this.router.events.subscribe(event => {
              this.collapseSidebar = false;
              this.megaMenu = false;
          });
      }
  }


  ngOnDestroy() {
      this.unsubscriber.next();
      this.unsubscriber.complete();
  }
  
  
  private setScreenWidth(width: number): void {
      this.screenWidth.next(width);
  }
  
  MENUITEMS: Menu[] = [
     
    {
        title: 'Dashboard',
        status: 0,
        deactive_img: 'fa fa-dashboard',
        active_img: 'fa fa-dashboard',
        type: 'sub',
        icon: 'map-alt',
        badgeType: 'danger',
        badgeValue: '1',
        active: true,
        Account_id: '',
        children: this.generateDashboardItems((JSON.parse(localStorage.getItem('AccessMenu')||''))?.Dashboard)
     },
     {
        path: 'https://beta.secutrak.in',
        title: 'Vehicle Dashboard',
        type: 'link',
        active: false
     },
     ...this.generateReportSection((JSON.parse(localStorage.getItem('AccessMenu')||''))?.Report),
     {
                     path: '/cv/common/HomeDashboard', title:'Home', status:0,active_img:'fas fa-home',deactive_img:'fas fa-home', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
                 },
      
  ];



  //array
  private generateDashboardItems(pages: { name: string; title: string }[] = []): Menu[] {
    console.log("MENUITEM MENUITEM",pages)
    if (!pages || !Array.isArray(pages)) {
      console.error("dashboardPages is undefined or not an array!");
      return []; // Return an empty array to prevent errors
    }
  
    const classValue = localStorage.getItem('Class')?.split('/')[1] || ''; // Extract class value
    const excludeTitles = ["Billing", "TMS Dashboard","Consolidated Dashboard","Vehicle","Document Wallet","Transporter Dashboard","Driver"]; // Titles to exclude
  
    return pages
      .filter(page => !excludeTitles.includes(page.title)) // Remove unwanted titles
      .map(page => ({
             path: `/cv/generic/${localStorage.getItem('Routes')}/${page.name}`,
        // path: `/cv/generic/${classValue}/${classValue === 'Transporter' || classValue === 'Customer' ? `${classValue}/` : ''}${page.name}`,
        title: page.title,
        type: 'link',
        active: false 
      }));
  }
  
   // Function to dynamically generate report menu items or remove the section if empty
   private generateReportSection(pages: { name: string; title: string }[]): Menu[] {
     console.log("MENUITEM MENUITEM",pages)
     if (pages.length === 0) return []; // Remove Reports section if no items
   
     return [
       {
         title: 'Reports',
         status: 0,
         deactive_img: 'fa fa-file-text-o',
         active_img: 'far fa-user-circle',
         type: 'sub',
         icon: 'map-alt',
         badgeType: 'danger',
         badgeValue: '1',
         active: false,
         Account_id: '',
         children: this.generateReportItems(pages)
       }
     ];
   }
   private generatesingleSection(pages: { name: string; title: string }[]): Menu[] {
    console.log("MENUITEM",this.MENUITEMS)
    if (pages.length === 0) return []; // Remove Reports section if no items
  
    return [
      {
        title: 'Reports',
        status: 0,
        deactive_img: 'fa fa-file-text-o',
        active_img: 'far fa-user-circle',
        type: 'sub',
        icon: 'map-alt',
        badgeType: 'danger',
        badgeValue: '1',
        active: false,
        Account_id: '',
        children: this.generateReportItems(pages)
      }
    ];
  }
   // Function to dynamically generate report menu items
   private generateReportItems(pages: { name: string; title: string }[]): Menu[] {
     return pages.map(page => ({
        path: `/cv/generic/${localStorage.getItem('Class')?.split('/')[1]}/Report/${page.name}`,

       title: page.title,
       status: 0,
       active_img: 'fas fa-file-upload',
       deactive_img: 'fas fa-file-upload',
       type: 'link',
       icon: 'map-alt',
       badgeType: 'danger',
       badgeValue: '2',
       active: false,
       Account_id: ''
     }));
   }



  //array
  
   client:any=localStorage.getItem('Class')?.split('/')[1];
   


  //array
//   items = new BehaviorSubject<Menu[]>(this.MENUITEM);
items = new BehaviorSubject<Menu[]>(this.MENUITEMS);

//   items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
