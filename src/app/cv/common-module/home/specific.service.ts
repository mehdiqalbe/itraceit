
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

//Menu Bar
// declare  let client:any;
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
export class SpecificService implements OnDestroy {
//   client:any;
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

  public megaMenu: boolean = false;
  public megaMenuCollapse: boolean = window.innerWidth < 1199 ? true : false;
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;
  public fullScreen: boolean = false;
  constructor(
      private router: Router
  ) {
    //   client=

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
    //   console.log(client);
      
  }

  
  ngOnDestroy() {
      this.unsubscriber.next();
      this.unsubscriber.complete();
  }
  
  
  private setScreenWidth(width: number): void {
      this.screenWidth.next(width);
  }
  MENUITEM:any={
    bluedart: [
     
 
        {
      
            title:'Dashboard', status:0,deactive_img:'fa fa-dashboard', active_img:'fa fa-dashboard', type: 'sub', icon: 'map-alt', badgeType: 'danger', badgeValue: '1', active: true,Account_id:'',
            children: [
   
                { path: '/cv/specific/bluedart/Trip-Dashboard', title: 'Trip Dashboard', type: 'link', active:true },
  
                { path: '/cv/specific/bluedart/Irun-Dashboard', title: 'Irun Dashboard', type: 'link', active:false },
                { path: '/cv/specific/bluedart/Delay-Dashboard', title: 'Delay Dashboard', type: 'link', active:false },
                { path: '/cv/specific/bluedart/vehicle-nearby', title: 'Vehicle Nearby', type: 'link', active:false },
                { path: '/cv/specific/bluedart/Summary-Dashboard', title: 'Summary Dashboard', type: 'link', active:false },
                { path: '/ILgic/wallet', title: 'Document Wallet', type: 'link', active:false },
  
  
  
            ]
        
        },
       
        {
            path: 'https://beta.secutrak.in', title: 'Vehicle Dashboard ', type: 'link', active:false ,
        },
  
        {
           
            title:'Reports', status:0,deactive_img:'fa fa-file-text-o', active_img:'far fa-user-circle', type: 'sub', icon: 'map-alt', badgeType: 'danger', badgeValue: '1', active: false,Account_id:'',
            children: [
               
             { path: '/cv/specific/bluedart/Report/TripReport', title:'Trip Report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:'' },
             { path: '/cv/specific/bluedart/Report/SlotwiseReport', title:'Slotwise Distance Report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:'' },
            //  { path: 'https://itraceit.in/vehicle-report/?exttkn='+localStorage.getItem('AccessToken')!, title:'vehicle report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''},
            //     {
            //      path: 'https://itraceit.in/travel-report/?exttkn='+localStorage.getItem('AccessToken')!, title:'travel-report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
            //  },
            //     {
            //      path: 'https://secutrak.in/reports/distance_report_beta2/?exttkn='+localStorage.getItem('AccessToken')!, title:'Distance Report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
            //  },
            //     {
            //      path: 'https://secutrak.in/reports/monthly_distance_report_beta/?exttkn='+localStorage.getItem('AccessToken')!, title:'Monthly Distance Report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
            //  },
            //     {
            //      path: 'https://itraceit.in/reports/halt_report/?exttkn='+localStorage.getItem('AccessToken')!, title:'Halt Report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
            //  },
            {
                path: '/cv/specific/bluedart/Report/VehicleReport', title:'Vehicle Report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
            },
            { path: '/cv/specific/bluedart/Report/VehicleUtilization', title:'Vehicle Utilization', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''},
            {
                path: '/cv/specific/bluedart/Report/DataPushReport', title:'Data Push-report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
            },
            {
                path: '/cv/specific/bluedart/Report/DelayReport', title:'Delay Report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
            },
            ]
        
        },
  
        // {
        //     path: 'https://beta.secutrak.in/secutrak/auth/login?exttkn='+localStorage.getItem('AccessToken')!+'&Portal=itraceit', title: 'Home',deactive_img:'fa fa-home', active_img:'fa fa-home', status:1, type: 'link', icon: 'nav1', badgeType: 'danger', badgeValue: '3', active: false,Account_id:''
        // },
      
        {
            path: '/cv/common/HomeDashboard', title:'Home', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
        },
   
  
   
        //  { path: '/charts/chartist', title: 'Chartist', type: 'link' },
                
  
        
    ],
  
    dtdc: [ 
        {
      
            title:'Dashboard', status:0,deactive_img:'fa fa-dashboard', active_img:'fa fa-dashboard', type: 'sub', icon: 'map-alt', badgeType: 'danger', badgeValue: '1', active: true,Account_id:'',
            children: [
   
                { path: '/cv/specific/dtdc/Trip-Dashboard', title: 'Trip Dashboard', type: 'link', active:true },
  
                { path: '/cv/specific/dtdc/Irun-Dashboard', title: 'Irun Dashboard', type: 'link', active:false },
                { path: '/cv/specific/dtdc/Delay-Dashboard', title: 'Delay Dashboard', type: 'link', active:false },
                { path: '/cv/specific/dtdc/Summary-Dashboard', title: 'Summary Dashboard', type: 'link', active:false },
                // { path: '/cv/specific/dtdc/vehicle-nearby', title: 'Vehicle Nearby', type: 'link', active:false },
                { path: '/ILgic/wallet', title: 'Document Wallet', type: 'link', active:false },
  
  
  
            ]
        
        },
       
        // {
        //     path: 'https://beta.secutrak.in', title: 'Vehicle Dashboard ', type: 'link', active:false ,
        // },
  
        {
           
            title:'Reports', status:0,deactive_img:'fa fa-file-text-o', active_img:'far fa-user-circle', type: 'sub', icon: 'map-alt', badgeType: 'danger', badgeValue: '1', active: false,Account_id:'',
            children: [
            //     { path: 'https://itraceit.in/vehicle-report', title:'vehicle report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''},
            //     {
            //      path: 'https://itraceit.in/travel-report/?exttkn=213H1Su703f0Xv7GFN13Q84s7154g570', title:'travel-report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
            //  },
             {
                path: '/cv/specific/dtdc/Report/TripReport', title:'Trip Report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
            },
            {
                path: '/cv/specific/dtdc/Report/DelayReport', title:'Delay Report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
            },
            {
                path: '/cv/specific/dtdc/Report/VehicleReport', title:'Vehicle Report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
            },
            { path: '/cv/specific/dtdc/Report/VehicleUtilization', title:'Vehicle Utilization', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''},
            {
             path: '/cv/specific/dtdc/Report/DataPushReport', title:'Data Push-report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
         },
         { path: '/cv/specific/dtdc/Report/SlotwiseReport', title:'Slotwise Distance Report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''},
        //  { path: '/cv/specific/dtdc/Report/whSlotwiseReport', title:'Working Hours Slotwise Distance Report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''},

         

        //     {
        //      path: 'https://secutrak.in/reports/distance_report_beta2/?exttkn='+localStorage.getItem('AccessToken')!, title:'Distance Report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
        //  },
        //     {
        //      path: 'https://secutrak.in/reports/monthly_distance_report_beta/?exttkn='+localStorage.getItem('AccessToken')!, title:'Monthly Distance Report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
        //  },
        //     {
        //      path: 'https://itraceit.in/reports/halt_report/?exttkn='+localStorage.getItem('AccessToken')!, title:'Halt Report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
        //  },
        
        ]
    
    },
//     {
           
//         title:'Manage', status:0,deactive_img:'fa fa-cog', active_img:'fa fa-cog', type: 'sub', icon: 'map-alt', badgeType: 'danger', badgeValue: '1', active: false,Account_id:'',
//         children: [
//          {
//             path: '/cv/specific/dtdc/Manage/Vehicle', title:'Vehicle', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
//         },
        
        
    
//     ]

// },
    {
        path: 'https://beta.secutrak.in/secutrak/auth/login?exttkn='+localStorage.getItem('AccessToken')!+'&Portal=itraceit', title: 'Home',deactive_img:'fa fa-home', active_img:'fa fa-home', status:1, type: 'link', icon: 'nav1', badgeType: 'danger', badgeValue: '3', active: false,Account_id:''
    },
    // {
    //     path: '/cv/common/HomeDashboard', title:'Home', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
    // },
  
        //  { path: '/charts/chartist', title: 'Chartist', type: 'link' },
                
  
        
    ]
  }



  //array
  
   client:any=localStorage.getItem('Class')?.split('/')[1];
   
   
  items = new BehaviorSubject<Menu[]>(this.MENUITEM[this.client]);
}

