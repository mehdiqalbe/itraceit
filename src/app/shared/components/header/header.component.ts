import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../services/layout.service';
import { NavService } from '../../services/nav.service';
import { SidebarRightService } from '../../services/sidebar-right.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  Account_type:any;
  Account_user:any;
  public isCollapsed = true;

  constructor(
    public navServices: NavService, 
    private sidebarRightservice: SidebarRightService,
    ){ }

  ngOnInit(): void {
    this.Account_type=localStorage.getItem('AccountType');
    this.Account_user=localStorage.getItem('UserName');
  }
  
  sidebarToggle(){
    let App = document.querySelector('.app')
    if ((this.navServices.collapseSidebar = !this.navServices.collapseSidebar)) {
      App?.classList.add('sidenav-toggled');
    }
    else {
      App?.classList.remove('sidenav-toggled');
    }
  }
  
  toggleSidebarNotification() {
    this.sidebarRightservice.emitSidebarNotifyChange(true);
  }
}
