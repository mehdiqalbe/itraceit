import { Component, OnInit, OnDestroy, HostListener, Input, Inject } from '@angular/core';
import { Router , NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError} from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  
  public showLoader: boolean = true;
  public isSpinnerVisible = true;
  date = new Date();
  @Input() display = false;
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) { 
    
    console.log("S2",this.date.toLocaleTimeString());
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          // console.log("true")
          this.isSpinnerVisible = true;
        } else if (
      
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ){
        
          this.isSpinnerVisible = false;
        }
      },
      () => {
        this.isSpinnerVisible = false;
      }
   
    )
    console.log("end-c time3",this.date.toLocaleTimeString());
  }
  ngOnInit(): void {
    console.log(localStorage.getItem('AccessToken'))
//  console.log("E2",this.date.toLocaleTimeString());
  } 
  ngOnDestroy() {
 

    this.isSpinnerVisible = false;

  }
}
