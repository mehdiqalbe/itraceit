import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HorizontalMegaMenu, HorizontalMenu, HorizontalNavService } from '../../services/horizontal-nav.service';

@Component({
  selector: 'app-hori-sidemenu',
  templateUrl: './hori-sidemenu.component.html',
  styleUrls: ['./hori-sidemenu.component.scss']
})
export class HoriSidemenuComponent implements OnInit {
 
  
  public menuItems!: HorizontalMenu[];
  public megamenuItems!: HorizontalMegaMenu[];
  public url: any;
  public Body:any = document.querySelector('body');
  constructor(
    private router: Router,
    private horizontalNavService: HorizontalNavService,
    public elRef: ElementRef
  ) {
    this.horizontalNavService.items.subscribe(menuItems => {
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
      })
    })
    this.horizontalNavService.itemsMega.subscribe(megamenuItems => {
      this.megamenuItems = megamenuItems;
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          megamenuItems.filter(items => {
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
      })
    })
  }
  

  //Active NavBar State
  setNavActive(item) {
    this.menuItems.filter(menuItem => {
      if (menuItem !== item) {
        menuItem.active = false;
        this.Body.classList.remove('active')
      }
      if (menuItem.children && menuItem.children.includes(item)) {
        menuItem.active = true;
      }
      if (menuItem.children) {
        menuItem.children.filter(submenuItems => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          }
        });
      }
    });
    this.megamenuItems.filter(megaMenuItem => {
      if (megaMenuItem !== item) {
        megaMenuItem.active = false;
        this.Body.classList.remove('active')
      }
      if (megaMenuItem.children && megaMenuItem.children.includes(item)) {
        megaMenuItem.active = true;
      }
      if (megaMenuItem.children) {
        megaMenuItem.children.filter(submegaMenuItems => {
          if (submegaMenuItems.children && submegaMenuItems.children.includes(item)) {
            megaMenuItem.active = true;
            submegaMenuItems.active = true;
          }
        });
      }
    });
  }

  // Click Toggle menu
  toggleNavActive(item) {
    if (!item.active) {
      this.menuItems.forEach((a:any) => {
        if (this.menuItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) { return false; }
        a.children.forEach(b => {
          if (a.children.includes(item)) {
            b.active = false;
          }
        });
        return;
      });
      
      this.megamenuItems.forEach((a:any) => {
        if (this.megamenuItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) { return false; }
        a.children.forEach(b => {
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
  }

  arrow: boolean = false;
  removeMenu(){
    this.Body.classList.remove('active')
  }
  
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e){
    if(window.pageYOffset > 75) {
      document.querySelector('.sticky')?.classList.add('sticky-pin');
    } else {
      document.querySelector('.sticky')?.classList.remove('sticky-pin');
    }
    
  }
}
