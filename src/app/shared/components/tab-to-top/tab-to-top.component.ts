import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-to-top',
  templateUrl: './tab-to-top.component.html',
  styleUrls: ['./tab-to-top.component.scss']
})
export class TabToTopComponent implements OnInit {
  public show: boolean = false;
  date = new Date();
  constructor( private viewScroller: ViewportScroller) { }

  ngOnInit(): void {
    // console.log("S5",this.date.toLocaleTimeString());
  }
  @HostListener("window:scroll", [])
  onWindowScroll(){
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if(number > 600){
      this.show = true;
    } else {
      this.show = false;
    }
    // console.log("E5",this.date.toLocaleTimeString());
  }

  taptotop(){
    this.viewScroller.scrollToPosition([0,0]);
  }
}
