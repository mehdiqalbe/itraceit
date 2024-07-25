import { Component, OnInit } from '@angular/core';
import { HorizontalNavService } from '../../services/horizontal-nav.service';
import { SidebarRightService } from '../../services/sidebar-right.service';

@Component({
  selector: 'app-hori-header',
  templateUrl: './hori-header.component.html',
  styleUrls: ['./hori-header.component.scss']
})
export class HoriHeaderComponent implements OnInit {
  
  public isCollapsed = true;
  Body:any = document.querySelector('body')

  constructor(
    public navServices: HorizontalNavService, 
    private sidebarRightservice: SidebarRightService,
    ){ }

  ngOnInit(): void {
  }
  
  sidebarToggle(){
    const sidebar:boolean = this.Body.classList.value.includes('active');
    
    if (sidebar == true) {
      this.Body.classList.remove('active');
    }
    else {
      this.Body.classList.add('active');
    }
  }
  
  toggleSidebarNotification() {
    this.sidebarRightservice.emitSidebarNotifyChange(true);
  }

}
