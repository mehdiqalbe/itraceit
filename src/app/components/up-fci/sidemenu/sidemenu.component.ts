// import { Component, OnInit } from '@angular/core';
import { Component, ElementRef, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationSymbol } from 'angular-archwizard';
import { Menu, NavService } from 'src/app/shared/services/nav.service';


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  public menuItems: Menu[] | any;
  public url: any;
  temp_index: any;
  // changeimage:any;
  imageSrc ='';
  messageText='';

  sidenavtoggled1: any;

  //For Horizontal Menu
  public margin: any = 0;
  public width: any = window.innerWidth;
  token:any;
  account_id: any;

  constructor(
    private router: Router,
    private navServices: NavService,
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
  toggleNavActive(item:any) {
    if (!item.active) {
      this.menuItems.forEach((a:any) => {
        if (this.menuItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) { return false; }
        a.children.forEach((b:any) => {
          if (a.children.includes(item)) {
            b.active = false;
          }
        });
        
        return;
      });
    }
    item.active = !item.active;
  }

  ngOnInit(): void {
    this.temp_index=  localStorage.getItem('profile')!;
    this.token=localStorage.getItem('AccessToken')!;
    this.account_id=localStorage.getItem('AccountId')!;
    // let App = document.querySelector('.sidebar-mini')
    let App = document.querySelector('.app')
    // this.navServices.collapseSidebar = this.navServices.collapseSidebar
    App?.classList.remove('sidenav-toggled');
  }
  logout() {
  
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('profile');
    localStorage.clear();
    // this.router.navigate(['https://secutrak.in/logout/']);
    // window.open('https://secutrak.in/logout/'); 
    // window.location='https://secutrak.in/logout/';
    // this.router.navigate(['https://secutrak.in/logout/']);
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
  hoverEffect($event:any){
    let App = document.querySelector('.app')
    this.sidenavtoggled1 = $event.type == 'mouseover' ? this.removeSidemini() :this.closeSidemini();
    console.log(this.sidenavtoggled1)
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
    alert(Index);
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
    show(){
      alert(0)
    }
}
