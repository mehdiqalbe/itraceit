import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

//MenuBar
export interface HorizontalMenu {
  headTitle?: string;
  title?: string;
  path?: string;
  icon?: string;
  type?: string;
  badgeClass?: string;
  badgeValue?: string;
  active?: boolean;
  children?: HorizontalMenu[];
}

//MenuBar
export interface HorizontalMegaMenu {
  headTitle?: string;
  title?: string;
  path?: string;
  icon?: string;
  type?: string;
  badgeClass?: string;
  badgeValue?: string;
  active?: boolean;
  children?: HorizontalMegaMenu[];
}

@Injectable({
  providedIn: 'root'
})
export class HorizontalNavService {

  constructor() { }


  MENUITEMS: HorizontalMenu[] = [
        
    {
        title: 'Dashboard', icon: 'home', type: 'sub', active: false,
        children: [
            { path: '/dashboard/sales-dashboard', title: 'Sales Dashboard', type: 'link', active:false },
            { path: '/dashboard/marketing-dashboard', title: 'Marketing Dashboard', type: 'link', active:false },
            { path: '/dashboard/service-dashboard', title: 'Service Dashboard', type: 'link', active:false },
            { path: '/dashboard/finance-dashboard', title: 'Finance Dahboard', type: 'link', active:false },
            { path: '/dashboard/it-dashboard', title: 'It Dashboard', type: 'link', active:false },
        ]
    },
    
    {
        path: '/widgets', title: 'Widgets', type: 'link', icon: 'package', badgeValue: 'Hot', active: false
    },

    {
        title: 'Components', icon: 'panel', type: 'sub', active: false,
        children: [
            { path: '/components/cards-design', title: 'Cards Design', type: 'link' },
            { path: '/components/default-calendar', title: 'Default Calendar', type: 'link' },
            { path: '/components/default-chat', title: 'Default Chat', type: 'link' },
            { path: '/components/notifications', title: 'Notifications', type: 'link' },
            { path: '/components/sweet-alerts', title: 'Sweet Alerts', type: 'link' },
            { path: '/components/range-slider', title: 'Range slider', type: 'link' },
            { path: '/components/content-scrollbar', title: 'Content Scrollbar', type: 'link' },
            { path: '/components/loaders', title: 'Loaders', type: 'link' },
            { path: '/components/counters', title: 'Counters', type: 'link' },
            { path: '/components/rating', title: 'Rating', type: 'link' },
            { path: '/components/timeline', title: 'Time Line', type: 'link' },
        ]
    },

    
    {
        title: 'Advanced Elements', icon: 'rocket', type: 'sub', active: false,
        children: [
            { path: '/advanced-elements/media-object', title: 'Media Object', type: 'link' },
            { path: '/advanced-elements/accordion', title: 'Accordion', type: 'link' },
            { path: '/advanced-elements/tabs', title: 'Tabs', type: 'link' },
            { path: '/advanced-elements/modal', title: 'Modal', type: 'link' },
            { path: '/advanced-elements/tooltip-popover', title: 'Tooltip and Popover', type: 'link' },
            { path: '/advanced-elements/progress', title: 'Progress', type: 'link' },
            { path: '/advanced-elements/carousel', title: 'Carousel', type: 'link' },
            { path: '/advanced-elements/headers', title: 'Headers', type: 'link' },
            { path: '/advanced-elements/footers', title: 'Footers', type: 'link' },
            { path: '/advanced-elements/user-list', title: 'User List', type: 'link' },
            { path: '/advanced-elements/search', title: 'Search', type: 'link' },
            { path: '/advanced-elements/crypto-currencies', title: 'Crypto Currencies', type: 'link' },
            {
                path: '/maps', title: 'Maps', type: 'link', icon: 'map-alt', badgeValue: '3', active: false
            },
        ]
    },

    {
        title: 'Charts', icon: 'bar-chart', type: 'sub', badgeValue: '6', active: false,
        children: [
            { path: '/charts/echarts', title: 'ECharts', type: 'link' },
            { path: '/charts/chartjs', title: 'ChartJS', type: 'link' },
            { path: '/charts/apex-charts', title: 'Apex Charts', type: 'link' },
            { path: '/charts/chartist', title: 'Chartist', type: 'link' },
            
        ]
    },


    {
        title: 'Icons', icon: 'shield', type: 'sub', badgeValue: '11', active: false,
        children: [
            { path: '/icons/font-awesome', title: 'Font Awesome Icons', type: 'link' },
            { path: '/icons/material-design', title: 'Material Design Icons', type: 'link' },
            { path: '/icons/simple-line', title: 'Simple Line Icons', type: 'link' },
            { path: '/icons/feather-icons', title: 'Feather Icons', type: 'link' },
            { path: '/icons/ionic-icons', title: 'Ionic Icons', type: 'link' },
            { path: '/icons/flag-icons', title: 'Flag Icons', type: 'link' },
            { path: '/icons/pe7-icons', title: 'pe7 Icons', type: 'link' },
            { path: '/icons/themify-icons', title: 'Themify Icons', type: 'link' },
            { path: '/icons/typicons', title: 'Typicons Icons', type: 'link' },
        ]
    },
    {
        title: 'Pages', icon: 'files', type: 'sub', active: false,
        children: [
            { path: '/pages/profile', title: 'Profile', type: 'link' },
            { path: '/pages/edit-profile', title: 'Edit Profile', type: 'link' },
            { path: '/pages/mail-inbox', title: 'Mail Inbox', type: 'link' },
            { path: '/pages/mail-compose', title: 'Mail Compose', type: 'link' },
            { path: '/pages/gallery', title: 'Gallery', type: 'link' },
            { path: '/pages/about-company', title: 'About Company', type: 'link' },
            { path: '/pages/services', title: 'Services', type: 'link' },
            { path: '/pages/faqs', title: 'Faqs', type: 'link' },
            { path: '/pages/terms', title: 'Terms', type: 'link' },
            { path: '/pages/invoice', title: 'Invoice', type: 'link' },
            { path: '/pages/pricing-tables', title: 'Pricing Tables', type: 'link' },
            { path: '/pages/blog', title: 'Blog', type: 'link' },
            { path: '/pages/blog-details', title: 'Blog Details', type: 'link' },
            { path: '/pages/empty-page', title: 'Empty Page', type: 'link' },
        ]
    },
    // {
    //     title: 'Firebase', icon: 'pulse', type: 'sub', active: false,
    //     children: [
    //         { path: '/firebase/crud/view-member', title: 'CRUD', type: 'link' },
    //         { path: '/firebase/task-list', title: 'Task', type: 'link' },
    //     ]
    // },        
];

  MEGAMENUITEMS: HorizontalMegaMenu[] = [
      
   
    
   
    {
      title: 'Elements', icon: 'layers', type: 'sub', active: false,
      children: [
          { path: '/elements/alerts', title: 'Alerts', type: 'link' },
          { path: '/elements/buttons', title: 'Buttons', type: 'link' },
          { path: '/elements/colors', title: 'Colors', type: 'link' },
          { path: '/elements/avatar-square', title: 'Avatars Square', type: 'link' },
          { path: '/elements/avatar-rounded', title: 'Avatars Rounded', type: 'link' },
          { path: '/elements/avatar-radius', title: 'Avatars Radius', type: 'link' },
          { path: '/elements/dropdowns', title: 'Dropdowns', type: 'link' },
          { path: '/elements/list', title: 'List', type: 'link' },
          { path: '/elements/tags', title: 'Tags', type: 'link' },
          { path: '/elements/pagination', title: 'Pagination', type: 'link' },
          { path: '/elements/navigation', title: 'Navigation', type: 'link' },
          { path: '/elements/typography', title: 'Typography', type: 'link' },
          { path: '/elements/breadcrumbs', title: 'Breadcrumb', type: 'link' },
          { path: '/elements/badges', title: 'Badges', type: 'link' },
          { path: '/elements/panels', title: 'Panel', type: 'link' },
          { path: '/elements/thumbnails', title: 'Thumbnails', type: 'link' },

  
            { path: '/tables/default-tables', title: 'Default Table', type: 'link' },
            { path: '/tables/data-tables', title: 'Data Table', type: 'link' },

            { path: '/forms/form-elements', title: 'Form Elements', type: 'link' },
            { path: '/forms/form-editor', title: 'Form Editor', type: 'link' },
            { path: '/forms/form-wizards', title: 'Form Wizards', type: 'link' },

            { path: '/ecommerce/products', title: 'Products', type: 'link' },
            { path: '/ecommerce/product-details', title: 'Product Details', type: 'link' },
            { path: '/ecommerce/shopping-cart', title: 'Shopping Cart', type: 'link' },
            { path: '/ecommerce/wishlist', title: 'Wishlist', type: 'link' },
            { path: '/ecommerce/checkout', title: 'Checkout', type: 'link' },

            { path: '/custom-pages/login', title: 'Login', type: 'link' },
            { path: '/custom-pages/register', title: 'Register', type: 'link' },
            { path: '/custom-pages/forget-password', title: 'Forget Password', type: 'link' },
            { path: '/custom-pages/lock-screen', title: 'Lock Screen', type: 'link' },
            { path: '/custom-pages/under-construction', title: 'Under Construction', type: 'link' },

            { path: '/error/error400', title: '400', type: 'link' },
            { path: '/error/error401', title: '401', type: 'link' },
            { path: '/error/error403', title: '403', type: 'link' },
            { path: '/error/error404', title: '404', type: 'link' },
            { path: '/error/error500', title: '500', type: 'link' },
            { path: '/error/error503', title: '503', type: 'link' },
        ]

      },
     
  ];

  //array
  items = new BehaviorSubject<HorizontalMenu[]>(this.MENUITEMS);
  itemsMega = new BehaviorSubject<HorizontalMegaMenu[]>(this.MEGAMENUITEMS);


}
