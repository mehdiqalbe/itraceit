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

export class NavService implements OnDestroy {

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
       
        // {
        //     path: '/maps', title: 'Dashboard',deactive_img:'de_nav1', active_img:'ac_nav1', status:0, type: 'link', icon: 'nav1', badgeType: 'danger', badgeValue: '3', active: false
        // },
        // {
        //     path: '/UPFCS/Manageaccount', title: 'Update Password',deactive_img:'de_nav1', active_img:'ac_nav1', status:1, type: 'link', icon: 'nav1', badgeType: 'danger', badgeValue: '3', active: true
        // },
        // {
        //     path: '/UPFCS/ManageUser', title:'Manage User', status:0,active_img:'ac_Vehicle',deactive_img:'de_Vehicle', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false
        // },      
        
        // {
        //     path: '/UPFCS/FCS', title: 'Dashboard',deactive_img:'fa fa-dashboard', active_img:'fa fa-dashboard', status:1, type: 'link', icon: 'nav1', badgeType: 'danger', badgeValue: '3', active: true,Account_id:''
        // },
        {
            // path: '/UPFCS/Account', title:'Account Setting', status:0,deactive_img:'far fa-user-circle', active_img:'far fa-user-circle', type: 'sub', icon: 'map-alt', badgeType: 'danger', badgeValue: '1', active: false,
            title:'Dashboards', status:0,deactive_img:'fa fa-dashboard', active_img:'fa fa-dashboard', type: 'sub', icon: 'map-alt', badgeType: 'danger', badgeValue: '1', active: true,Account_id:'',
            children: [
                { path: 'https://beta.secutrak.in', title: 'Vehicle Dashboard',active:false,type: 'link' },
              
            
                // { path: '/UPFCS/Summary', title: 'Summary Dashboard', type: 'link', active:false },
                // { path: '/UPFCS/FCS', title: 'Trip Dashboard', type: 'link', active:true },
                // { path: '/ILgic/ilgic', title: 'Ilgic Dashboard', type: 'link', active:true },
                // { path: '/ILgic/Transport', title: 'Transporter Dashboard', type: 'link', active:false},
                // { path: '/ILgic/Agent', title: 'Agent Dashboard', type: 'link', active:false },
                { path: '/ILgic/Trip', title: 'Trip Dashboard', type: 'link', active:false },
                // { path: '/ILgic/cv', title: 'CV Dashboard', type: 'link', active:false },
                // { path: '/ILgic/TransporterDashboard', title: 'TMS Dashboard', type: 'link', active:false },
                { path: '/ILgic/wallet', title: 'Document Wallet ', type: 'link', active:false },
                // { path: '/ILgic/Agreement', title: 'Agreement', type: 'link', active:false },
                { path:  localStorage.getItem('path')!, title: localStorage.getItem('Title')!, type: 'link', active:true},
                { path:  localStorage.getItem('path2')!, title: localStorage.getItem('Title2')!, type: 'link', active:false},


                //  localStorage.getItem('path')!
               
                // { path: '', title: 'Battery Report', type: '3', active:false },
                // { path: '', title: 'Vehicle Installation Report', type: '4', active:false },
                // { path: '', title: 'EN-RT-STP', type: 'link', active:false },
            ]
        
        },
        {
            path: 'https://beta.secutrak.in', title: 'Vehicle Dashboard ', type: 'link', active:false ,
        },
        // {
        //     path: 'https://www.secutrak.in/polylines/polylineroute', title:' Manage Route Polyline', status:0,active_img:'fas fa-draw-polygon',deactive_img:'fas fa-draw-polygon', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:localStorage.getItem('AccountType')!
        // },
      
        {
            // path: '/UPFCS/Account', title:'Account Setting', status:0,deactive_img:'far fa-user-circle', active_img:'far fa-user-circle', type: 'sub', icon: 'map-alt', badgeType: 'danger', badgeValue: '1', active: false,
            title:'Reports', status:0,deactive_img:'fa fa-file-text-o', active_img:'far fa-user-circle', type: 'sub', icon: 'map-alt', badgeType: 'danger', badgeValue: '1', active: false,Account_id:'',
            children: [
                { path: 'https://itraceit.in/vehicle-report', title:'vehicle report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''},
                {
                 path: 'https://itraceit.in/travel-report/?exttkn=213H1Su703f0Xv7GFN13Q84s7154g570', title:'travel-report', status:0,active_img:'fas fa-file-upload',deactive_img:'fas fa-file-upload', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:''
             },
                // { path: '/UPFCS/Trip-Report', title: 'Trip Report', type: 'link', active:false },
                // { path: '/UPFCS/Trip-Report', title: 'KPI Report', type: 'link', active:false },
                // { path: '', title: 'Trigger Report', type: '2', active:false },
                // { path: '', title: 'Battery Report', type: '3', active:false },
                // { path: '', title: 'Vehicle Installation Report', type: '4', active:false },
                // { path: '', title: 'EN-RT-STP', type: 'link', active:false },
            ]
        
        },
        // {
        //     // path: '/UPFCS/Account', title:'Account Setting', status:0,deactive_img:'far fa-user-circle', active_img:'far fa-user-circle', type: 'sub', icon: 'map-alt', badgeType: 'danger', badgeValue: '1', active: false,
        //     title:'Alerts', status:0,deactive_img:'far fa-user-circle', active_img:'far fa-user-circle', type: 'sub', icon: 'map-alt', badgeType: 'danger', badgeValue: '1', active: false,Account_id:'',
        //     children: [
        //         { path: '', title: 'Red Flag', type: '9', active:false },
        //         { path: '', title: 'Route Deviation', type: '5', active:false },
        //         { path: '', title: 'Force closed', type: '6', active:false },
        //         { path: '', title: 'UN-AUTH', type: '7', active:false },
        //         { path: '', title: 'EN-RT-STP', type: '8', active:false },
        //     ]
        
        // },
        {
            path: 'https://beta.secutrak.in/secutrak/maps/map', title: 'Home',deactive_img:'fa fa-home', active_img:'fa fa-home', status:1, type: 'link', icon: 'nav1', badgeType: 'danger', badgeValue: '3', active: false,Account_id:''
        },
        // {
        //     path: '', title:'Log out', status:0,active_img:'fa fa-power-off',deactive_img:'fa fa-power-off', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '2', active: false,Account_id:'',
        // }, 
        // {
        //     path: 'https://www.secutrak.in/polylines/kml_polyline', title: 'Home Vehicle',deactive_img:'fa fa-home', active_img:'fa fa-home', status:1, type: 'link', icon: 'nav1', badgeType: 'danger', badgeValue: '3', active: false,Account_id:''
        // },
        // {
        //     title: 'Dashboard', icon: 'home', type: 'sub', active: false,
        //     children: [
        //         { path: '/dashboard/sales-dashboard', title: 'Sales Dashboard', type: 'link', active:false },
        //         { path: '/dashboard/marketing-dashboard', title: 'Marketing Dashboard', type: 'link', active:false },
        //         { path: '/dashboard/service-dashboard', title: 'Service Dashboard', type: 'link', active:false },
        //         { path: '/dashboard/finance-dashboard', title: 'Finance Dahboard', type: 'link', active:false },
        //         { path: '/dashboard/it-dashboard', title: 'It Dashboard', type: 'link', active:false },
        //     ]
        // },   
        // {
            // path: '/reports/;',title:'Report',status:0,deactive_img:'Report icon (inactive state)', active_img:'Report icon (active state)', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '3', active: false
        // },       
        // {
        //     path: '/reports/f',title:'Orders',status:0, deactive_img:'de_Orders', active_img:'Orders icon (active state)', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '3', active: false
        // },      
        // {
        //     path: '/reports/D' , title:'Reminders', status:0,active_img:'Reminders icon (active state)', deactive_img:'Reminders icon (inactive state)', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '3', active: false
        // },      
        // {
        //     path: 'll', title:'Geofence', status:0,active_img:'Landmarks icon (Active state)',deactive_img:'Landmarks icon (Inactive state)', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '3', active: false
        // },      
        // {
        //     path: '55', title:'Landmark',status:0,active_img:'Landmark icon (Active state)',deactive_img:'Landmarks icon (Inactive state)', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '3', active: false
        // },
        // {
        //     path: 'hgh',title:'Myloger',status:0, active_img:'My Ledger icon (active state)',deactive_img:'My Ledger icon (inactive state)', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '3', active: false
        // },      
        // {
        //     path: 'hgh',title:'Myloger',status:0, active_img:'Landmark icon (Active state)',deactive_img:'Landmarks icon (Inactive state)', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '3', active: false
        // },      
        // {
        //     path: 'kk',title:'Helps', status:0,active_img:'Help icon (Active state)',deactive_img:'Help icon (inActive state)', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '3', active: false
        // },      
        
       
        // {
        //     title: 'Dashboard', icon: 'home', type: 'sub', active: false,
        //     children: [
        //         { path: '/dashboard/sales-dashboard', title: 'Sales Dashboard', type: 'link', active:false },
        //         { path: '/dashboard/marketing-dashboard', title: 'Marketing Dashboard', type: 'link', active:false },
        //         { path: '/dashboard/service-dashboard', title: 'Service Dashboard', type: 'link', active:false },
        //         { path: '/dashboard/finance-dashboard', title: 'Finance Dahboard', type: 'link', active:false },
        //         { path: '/dashboard/it-dashboard', title: 'It Dashboard', type: 'link', active:false },
        //     ]
        // },

        //Ajay Added//  
       
        
        // {
        //     icon: 'receipt', type: 'sub', active: false,img:'Vehicleicon',
        //     children: [
        //         { path: '/courier/trip-text-dashboard',  title: 'Trip Text Dashboard', type: 'link', active:false },
        //     ]
        // },
     
        // {
        //     title: 'Reports', icon: 'receipt', type: 'sub', img:'Vehicleicon', active: false,
        //     children: [
        //         { path: '/reports/trip-reports', title: 'Trip Reports', type: 'link', active:false },
        //     ]
        // },
        // {
        //     title: 'Reports', icon: 'receipt', type: 'sub', img:'Log report icon (Active state)', active: false,
        //     children: [
        //         { path: '/reports/trip-reports', title: 'Trip Reports', type: 'link', active:false },
        //     ]
        // },
        // {
        //     title: 'Reports', icon: 'receipt', type: 'sub', img:'Report icon (active state)', active: false,
        //     children: [
        //         { path: '/reports/trip-reports', title: 'Trip Reports', type: 'link', active:false },
        //     ]
        // },
        // {
        //     title: 'Reports', icon: 'receipt', type: 'sub', img:'Orders icon (active state)', active: false,
        //     children: [
        //         { path: '/reports/trip-reports', title: 'Trip Reports', type: 'link', active:false },
        //     ]
        // },
        // {
        //     title: 'Reports', icon: 'receipt', type: 'sub', img:'Reminders icon (active state)', active: false,
        //     children: [
        //         { path: '/reports/trip-reports', title: 'Trip Reports', type: 'link', active:false },
        //     ]
        // },
        // {
        //     title: 'Reports', icon: 'receipt', type: 'sub', img:'Landmarks icon (Active state)', active: false,
        //     children: [
        //         { path: '/reports/trip-reports', title: 'Trip Reports', type: 'link', active:false },
        //     ]
        // },
        // {
        //     title: 'Reports', icon: 'receipt', type: 'sub', img:'My Ledger icon (active state)', active: false,
        //     children: [
        //         { path: '/reports/trip-reports', title: 'Trip Reports', type: 'link', active:false },
        //     ]
        // },
        // {
        //     title: 'Reports', icon: 'receipt', type: 'sub', img:'Help icon (Active state)', active: false,
        //     children: [
        //         { path: '/reports/trip-reports', title: 'Trip Reports', type: 'link', active:false },
        //     ]
        // },
        // {
        //     title: 'Reports', icon: 'receipt', type: 'sub', img:'My Ledger icon (active state)', active: false,
        //     children: [
        //         { path: '/reports/trip-reports', title: 'Trip Reports', type: 'link', active:false },
        //     ]
        // },
       


        
        // {
        //     path: '/widgets', title: 'Widgets', type: 'link', icon: 'package', badgeType: 'danger', badgeValue: 'Hot', active: false
        // },
        
      

        // {
        //     title: 'Components', icon: 'panel', type: 'sub', active: false,
        //     children: [
        //         { path: '/components/cards-design', title: 'Cards Design', type: 'link' },
        //         { path: '/components/default-calendar', title: 'Default Calendar', type: 'link' },
        //         { path: '/components/default-chat', title: 'Default Chat', type: 'link' },
        //         { path: '/components/notifications', title: 'Notifications', type: 'link' },
        //         { path: '/components/sweet-alerts', title: 'Sweet Alerts', type: 'link' },
        //         { path: '/components/range-slider', title: 'Range slider', type: 'link' },
        //         { path: '/components/content-scrollbar', title: 'Content Scrollbar', type: 'link' },
        //         { path: '/components/loaders', title: 'Loaders', type: 'link' },
        //         { path: '/components/counters', title: 'Counters', type: 'link' },
        //         { path: '/components/rating', title: 'Rating', type: 'link' },
        //         { path: '/components/timeline', title: 'Time Line', type: 'link' },
        //     ]
        // },

        // {
        //     title: 'Elements', icon: 'layers', type: 'sub', active: false,
        //     children: [
        //         { path: '/elements/alerts', title: 'Alerts', type: 'link' },
        //         { path: '/elements/buttons', title: 'Buttons', type: 'link' },
        //         { path: '/elements/colors', title: 'Colors', type: 'link' },
        //         { path: '/elements/avatar-square', title: 'Avatars Square', type: 'link' },
        //         { path: '/elements/avatar-rounded', title: 'Avatars Rounded', type: 'link' },
        //         { path: '/elements/avatar-radius', title: 'Avatars Radius', type: 'link' },
        //         { path: '/elements/dropdowns', title: 'Dropdowns', type: 'link' },
        //         { path: '/elements/list', title: 'List', type: 'link' },
        //         { path: '/elements/tags', title: 'Tags', type: 'link' },
        //         { path: '/elements/pagination', title: 'Pagination', type: 'link' },
        //         { path: '/elements/navigation', title: 'Navigation', type: 'link' },
        //         { path: '/elements/typography', title: 'Typography', type: 'link' },
        //         { path: '/elements/breadcrumbs', title: 'Breadcrumb', type: 'link' },
        //         { path: '/elements/badges', title: 'Badges', type: 'link' },
        //         { path: '/elements/panels', title: 'Panel', type: 'link' },
        //         { path: '/elements/thumbnails', title: 'Thumbnails', type: 'link' },

        //     ]
        // },
        
        // {
        //     title: 'Advanced Elements', icon: 'rocket', type: 'sub', active: false,
        //     children: [
        //         // { path: '/advanced-elements/media-object', title: 'Media Object', type: 'link' },
        //         // { path: '/advanced-elements/accordion', title: 'Accordion', type: 'link' },
        //         // { path: '/advanced-elements/tabs', title: 'Tabs', type: 'link' },
        //         // { path: '/advanced-elements/modal', title: 'Modal', type: 'link' },
        //         // { path: '/advanced-elements/tooltip-popover', title: 'Tooltip and Popover', type: 'link' },
        //         // { path: '/advanced-elements/progress', title: 'Progress', type: 'link' },
        //         // { path: '/advanced-elements/carousel', title: 'Carousel', type: 'link' },
        //         { path: '/advanced-elements/headers', title: 'Headers', type: 'link' },
        //         // { path: '/advanced-elements/footers', title: 'Footers', type: 'link' },
        //         // { path: '/advanced-elements/user-list', title: 'User List', type: 'link' },
        //         // { path: '/advanced-elements/search', title: 'Search', type: 'link' },
        //         // { path: '/advanced-elements/crypto-currencies', title: 'Crypto Currencies', type: 'link' },

        //     ]
        // },

        // {
        //     title: 'Charts', icon: 'bar-chart', type: 'sub', badgeType: 'success', badgeValue: '6', active: false,
        //     children: [
        //         { path: '/charts/echarts', title: 'ECharts', type: 'link' },
        //         { path: '/charts/chartjs', title: 'ChartJS', type: 'link' },
        //         { path: '/charts/apex-charts', title: 'Apex Charts', type: 'link' },
        //         { path: '/charts/chartist', title: 'Chartist', type: 'link' },
                
        //     ]
        // },

        // {
        //     title: 'Tables', icon: 'clipboard', type: 'sub', active: false,
        //     children: [
        //         { path: '/tables/default-tables', title: 'Default Table', type: 'link' },
        //         { path: '/tables/data-tables', title: 'Data Table', type: 'link' }
        //     ]
        // },

        // {
        //     title: 'Forms', icon: 'receipt', type: 'sub', badgeType: 'success', badgeValue: '6', active: false,
        //     children: [
        //         { path: '/forms/form-elements', title: 'Form Elements', type: 'link' },
        //         { path: '/forms/form-editor', title: 'Form Editor', type: 'link' },
        //         { path: '/forms/form-wizards', title: 'Form Wizards', type: 'link' }
        //     ]
        // },

        // {
        //     title: 'Icons', icon: 'shield', type: 'sub', badgeType: 'warning', badgeValue: '11', active: false,
        //     children: [
        //         { path: '/icons/font-awesome', title: 'Font Awesome Icons', type: 'link' },
        //         { path: '/icons/material-design', title: 'Material Design Icons', type: 'link' },
        //         { path: '/icons/simple-line', title: 'Simple Line Icons', type: 'link' },
        //         { path: '/icons/feather-icons', title: 'Feather Icons', type: 'link' },
        //         { path: '/icons/ionic-icons', title: 'Ionic Icons', type: 'link' },
        //         { path: '/icons/flag-icons', title: 'Flag Icons', type: 'link' },
        //         { path: '/icons/pe7-icons', title: 'pe7 Icons', type: 'link' },
        //         { path: '/icons/themify-icons', title: 'Themify Icons', type: 'link' },
        //         { path: '/icons/typicons', title: 'Typicons Icons', type: 'link' },
        //     ]
        // },
        // {
        //     title: 'Pages', icon: 'files', type: 'sub', active: false,
        //     children: [
        //         { path: '/pages/profile', title: 'Profile', type: 'link' },
        //         { path: '/pages/edit-profile', title: 'Edit Profile', type: 'link' },
        //         { path: '/pages/mail-inbox', title: 'Mail Inbox', type: 'link' },
        //         { path: '/pages/mail-compose', title: 'Mail Compose', type: 'link' },
        //         { path: '/pages/gallery', title: 'Gallery', type: 'link' },
        //         { path: '/pages/about-company', title: 'About Company', type: 'link' },
        //         { path: '/pages/services', title: 'Services', type: 'link' },
        //         { path: '/pages/faqs', title: 'Faqs', type: 'link' },
        //         { path: '/pages/terms', title: 'Terms', type: 'link' },
        //         { path: '/pages/invoice', title: 'Invoice', type: 'link' },
        //         { path: '/pages/pricing-tables', title: 'Pricing Tables', type: 'link' },
        //         { path: '/pages/blog', title: 'Blog', type: 'link' },
        //         { path: '/pages/blog-details', title: 'Blog Details', type: 'link' },
        //         { path: '/pages/empty-page', title: 'Empty Page', type: 'link' },
        //     ]
        // },
        // {
        //     title: 'E-Commerce', icon: 'shopping-cart', type: 'sub', badgeType: 'danger', badgeValue: '3', active: false,
        //     children: [
        //         { path: '/ecommerce/products', title: 'Products', type: 'link' },
        //         { path: '/ecommerce/product-details', title: 'Product Details', type: 'link' },
        //         { path: '/ecommerce/shopping-cart', title: 'Shopping Cart', type: 'link' },
        //         { path: '/ecommerce/wishlist', title: 'Wishlist', type: 'link' },
        //         { path: '/ecommerce/checkout', title: 'Checkout', type: 'link' },
        //     ]
        // },
        // {
        //     title: 'Firebase', icon: 'pulse', type: 'sub', active: false,
        //     children: [
        //         { path: '/firebase/crud/view-member', title: 'CRUD', type: 'link' },
        //         { path: '/firebase/task-list', title: 'Task', type: 'link' },
        //     ]
        // },

        // {
        //     title: 'Account', icon: 'settings', type: 'sub', active: false,
        //     children: [
        //         { path: '/custom-pages/login', title: 'Login', type: 'link' },
        //         { path: '/custom-pages/register', title: 'Register', type: 'link' },
        //         { path: '/custom-pages/forget-password', title: 'Forget Password', type: 'link' },
        //         { path: '/custom-pages/lock-screen', title: 'Lock Screen', type: 'link' },
        //         { path: '/custom-pages/under-construction', title: 'Under Construction', type: 'link' },
        //     ]
        // },
        // {
        //     title: 'Error Pages', icon: 'info-alt', type: 'sub', active: false,
        //     children: [
        //         { path: '/error/error400', title: '400', type: 'link' },
        //         { path: '/error/error401', title: '401', type: 'link' },
        //         { path: '/error/error403', title: '403', type: 'link' },
        //         { path: '/error/error404', title: '404', type: 'link' },
        //         { path: '/error/error500', title: '500', type: 'link' },
        //         { path: '/error/error503', title: '503', type: 'link' },
        //     ]
        // }        
    ];


    MENUITEMS2: Menu[] = [
       
        {
            path: '/maps', title: 'Dashboard',img:'nav1', img1:'Vehicle icon (Inactive state)', type: 'link', icon: 'nav1', badgeType: 'danger', badgeValue: '3', active: false
        },

        {
            path: '/reports/trip-reports', title:'Vehicles',img:'Vehicleicon', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '3', active: false
        },      
        {
            path: '/reports/x', title:'Logs',img:'Log report icon (Active state)', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '3', active: false
        },      
        {
            path: '/reports/;',title:'Report',img:'Report icon (active state)', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '3', active: false
        },      
        {
            path: '/reports/f',title:'Orders',img:'Orders icon (active state)', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '3', active: false
        },      
        {
            path: '/reports/D' , title:'Reminders',img:'Reminders icon (active state)', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '3', active: false
        },      
        {
            path: 'll', title:'Geofence',img:'Landmarks icon (Active state)', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '3', active: false
        },      
        {
            path: '55', title:'Landmark',img:'Landmark icon (Active state)', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '3', active: false
        },      
        {
            path: 'hgh',title:'Myloger', img:'My Ledger icon (active state)', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '3', active: false
        },      
        {
            path: 'kk',title:'Helps',img:'Help icon (Active state)', type: 'link', icon: 'map-alt', badgeType: 'danger', badgeValue: '3', active: false
        },      
    ];
    //array
    items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}

// account =  users
// Basic elemeent = cpu
// submenu  =  sliders