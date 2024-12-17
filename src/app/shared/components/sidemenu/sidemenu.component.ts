import { Component, ElementRef, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationSymbol } from 'angular-archwizard';
import { Menu, NavService } from '../../services/nav.service';
import { AuthService } from '../../services/auth.service';
import { GenericAlertService } from '../../services/generic-alert.service';
import { filter } from 'rxjs/operators';
import { SpecificService } from '../../services/specific.service';
import { GenericService } from '../../services/generic.service';
declare var $: any;
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  public menuItems: Menu[] | any;
  public url: any;
  // changeimage:any;
  imageSrc ='';
  messageText='';
  username: any='';
  sidenavtoggled1: any;

  //For Horizontal Menu
  public margin: any = 0;
  public width: any = window.innerWidth;
  profileImage: any='';

  constructor(
    private router: Router,
    private navServices: NavService,
    private authservice: AuthService,
    private specificService:SpecificService,
    private genericService:GenericService,
    private genericAlertService:GenericAlertService,
    public elementRef: ElementRef
  ) {
    this.navServices.items.subscribe(menuItems => {
      this.menuItems = menuItems;
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          menuItems.filter(items => {
            if (items.path === event.url) {
              this.setNavActive(items);
            }
            if (!items.children) { return false; }
            items.children.filter(subItems => {
              if (subItems.path === event.url) {
                this.setNavActive(subItems);
              }
              if (!subItems.children) { return false; }
              subItems.children.filter(subSubItems => {
                if (subSubItems.path === event.url) {
                  this.setNavActive(subSubItems);
                }
              });
              
              return;
            });

            return;
          });
        }
      });
    });
  }

  //Active NavBar State
  setNavActive(item:any) {
    this.menuItems.filter((menuItem:any) => {
      if (menuItem !== item) {
        menuItem.active = false;
        let App = document.querySelector('.sidebar-mini')
        this.navServices.collapseSidebar = !this.navServices.collapseSidebar
        // App?.classList.remove('sidenav-toggled');
        
      }
      if (menuItem.children && menuItem.children.includes(item)) {
        menuItem.active = true;
      }
      if (menuItem.children) {
        menuItem.children.filter((submenuItems:any) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          }
        });
      }
    });
  }

  // Click Toggle menu
  // toggleNavActive(item:any) {
  //   if (!item.active) {
  //     this.menuItems.forEach((a:any) => {
  //       if (this.menuItems.includes(item)) {
  //         a.active = false;
  //       }
  //       if (!a.children) { return false; }
  //       a.children.forEach((b:any) => {
  //         if (a.children.includes(item)) {
  //           b.active = false;
  //         }
  //       });
        
  //       return;
  //     });
  //   }
  //   item.active = !item.active;
  // }

  ngOnInit(): void {
    this.username = localStorage.getItem('UserName') || '';

    // Determine which service to use based on the class
    const userClass = localStorage.getItem('Class')?.split('/')[0];
    this.profileImage=localStorage.getItem('FullImage')
    if (userClass === 'genericAlert') {
      this.loadGenericAlertMenu();
    } else if (userClass === 'specific') {
      this.loadSpecificMenu();
    }
    else if(userClass==='generic'){
      this.loadGenericMenu()
    }
    // this.closeSidemini()
    // this.removeSidemini()
  }
  
  /**
   * Loads the menu items using the `navServices` for standard users.
   */
  private loadStandardMenu(): void {
    this.navServices.items.subscribe(menuItems => {
      this.menuItems = menuItems;
      this.activateMenuOnNavigation();
    });
  }
  /**
   * Loads the menu items using the `genericAlertService` for generic alert users.
   */
  private loadGenericAlertMenu(): void {
    this.genericAlertService.items.subscribe(menuItems => {
      this.menuItems = menuItems;
      this.activateMenuOnNavigation();
    });
  }
  private loadSpecificMenu(): void {
    this.specificService.items.subscribe(menuItems => {
      this.menuItems = menuItems;
      this.activateMenuOnNavigation();
    });
  }
  private loadGenericMenu(): void {
    this.genericService.items.subscribe(menuItems => {
      this.menuItems = menuItems;
      this.activateMenuOnNavigation();
    });
  }
  private activateMenuOnNavigation(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.menuItems.forEach(item => this.recursivelySetActive(item, event.url));
      });
  }
  /**
   * Recursively sets the active state for the menu items.
   * @param item - The menu item.
   * @param currentUrl - The current URL.
   */
  private recursivelySetActive(item: Menu, currentUrl: string): void {
    item.active = item.path === currentUrl;

    if (item.children) {
      item.children.forEach(subItem => this.recursivelySetActive(subItem, currentUrl));
    }
  }
  /**
   * Toggles the active state of a menu item.
   * @param item - The menu item.
   */
  toggleNavActive(item: Menu): void {
    item.active = !item.active;
    if (!item.active) {
      this.deactivateChildItems(item);
    }
  }
  /**
   * Deactivates all child items recursively.
   * @param item - The menu item.
   */
  private deactivateChildItems(item: Menu): void {
    if (item.children) {
      item.children.forEach(child => {
        child.active = false;
        this.deactivateChildItems(child);
      });
    }
  }

  sidebarToggle(){
    let App = document.querySelector('.app')
    if ((this.navServices.collapseSidebar = !this.navServices.collapseSidebar)) {
      App?.classList.remove('sidenav-toggled');
    }
    else {
      App?.classList.add('sidenav-toggled');
    }
  }
  sidebarToggle_open(){
    let App = document.querySelector('.app')
    // if ((this.navServices.collapseSidebar = !this.navServices.collapseSidebar)) {
      App?.classList.remove('sidenav-toggled');
    // }
    // else {
    //   App?.classList.add('sidenav-toggled');
    // }
  }
  hoverEffect($event:any){
    let App = document.querySelector('.app')
    this.sidenavtoggled1 = $event.type == 'mouseover' ? this.removeSidemini() :this.closeSidemini();
    // this.removeSidemini()  
    //  this.closeSidemini()
    // this.sidenavtoggled1 = $event.type == 'mouseout' ? App?.classList.remove('sidenav-toggled') : '';
  }

  removeSidemini(){
    if(window.innerWidth >= 768){
      let App = document.querySelector('.sidebar-mini')
      this.navServices.collapseSidebar = !this.navServices.collapseSidebar
      App?.classList.remove('sidenav-toggled');
    }
  }

  closeSidemini(){
    if(window.innerWidth >= 768){
      let App = document.querySelector('.sidebar-mini')
      this.navServices.collapseSidebar = this.navServices.collapseSidebar
      App?.classList.add('sidenav-toggled');

    }
  }
  sidebarClose(){
    let App = document.querySelector('.sidebar-mini')
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
    App?.classList.remove('sidenav-toggled');
  }
 
  updateImage(Index:any){
  
    this.updateallImage();

  for( var i=0;i<this.menuItems.length;i++){
  
    if(this.menuItems[i] == this.menuItems[Index]){
      this.menuItems[Index].status = 1;
    }
    

  }
    

  }

  updateallImage(){

    for( var i=0;i<this.menuItems.length;i++){
    
      this.menuItems[i].status = 0;
  
    }
      
  
    }
    isExternalUrl(url: string): boolean {
      const pattern = /^https?:\/\//i;
      return pattern.test(url);
    }
    logout() {
      console.log("logout");
      
      const formdata=new FormData
      const token=localStorage.getItem('AccessToken')

      formdata.append('AccessToken',String(token))

      this.authservice.Access(formdata).subscribe((resp: any) => {})
      localStorage.removeItem('AccessToken');
      console.log(this.router.url)
      
      if(localStorage.getItem('URL')=="/auth/login")
      {
        const link=localStorage.getItem('Domain')+"/auth/login"
        console.log(link);
        localStorage.clear();
        location.href = link;

       
        
      }
      else if(localStorage.getItem('URL')=="/auth/login?exttkn")
      {
        localStorage.clear();
        location.href = 'https://itraceit.in/logout';
      }
      // else if(localStorage.getItem('URL')=="/auth/login")
      // {
      //   localStorage.clear();
      //   location.href = 'http://localhost:4200/auth/login';
      // }
      else{
        localStorage.clear();
        location.href = 'https://ilfleetcare.com';

      }
      

    }
}