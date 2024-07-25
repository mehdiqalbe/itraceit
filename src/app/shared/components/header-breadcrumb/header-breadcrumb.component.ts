import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavService } from '../../services/nav.service';
import { SidebarRightService } from '../../services/sidebar-right.service';

@Component({
  selector: 'app-header-breadcrumb',
  templateUrl: './header-breadcrumb.component.html',
  styleUrls: ['./header-breadcrumb.component.scss']
})
export class HeaderBreadcrumbComponent implements OnInit {
  Account_type:any;
  Account_user:any;
  @Input() title!: string;
  @Input() items!: any[];
  @Input() active_item!: string;
  

  constructor(
    private sidebarRightservice: SidebarRightService,
    public navServices: NavService,private router: Router,
  ) { }
  ngOnInit(): void {
    this.Account_type=localStorage.getItem('AccountType');
    this.Account_user=localStorage.getItem('UserName');
  }

  toggleSidebarNotification() {
    this.sidebarRightservice.emitSidebarNotifyChange(true);
  }
  logout(){
    localStorage.removeItem('AccessToken');
    localStorage.clear();
    this.router.navigate(['/auth/login']);            
  }
}
