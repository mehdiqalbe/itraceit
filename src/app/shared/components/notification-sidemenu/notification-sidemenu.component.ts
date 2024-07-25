import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarRightService } from '../../services/sidebar-right.service';

@Component({
  selector: 'app-notification-sidemenu',
  templateUrl: './notification-sidemenu.component.html',
  styleUrls: ['./notification-sidemenu.component.scss']
})
export class NotificationSidemenuComponent implements OnInit {

  layoutSub: Subscription;
  isOpen: boolean | any

  @ViewChild('sidebar', {static: true}) sidebar: ElementRef | any;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private sidebarRightService: SidebarRightService,
  ) {
    this.layoutSub = sidebarRightService.SidebarNotifyChangeEmitted.subscribe(
      value => {
        this.isOpen = document.querySelector('.sidebar')
        this.isOpen.classList.value.includes('sidebar-open')
        if ( this.isOpen == !this.isOpen) {
          this.renderer.removeClass(this.sidebar.nativeElement, 'sidebar-open');
        }
        else {
          this.renderer.addClass(this.sidebar.nativeElement, 'sidebar-open');
        }
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  onClose(){
    this.renderer.removeClass(this.sidebar.nativeElement, 'sidebar-open');
  }

}
