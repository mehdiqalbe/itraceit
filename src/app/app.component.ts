import { Component } from '@angular/core';
// import {LeafletComponent} from './../app/components/maps/leaflet/leaflet.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  public isSpinner = false;
  date = new Date();
  ngOnInit(): void {
    console.log("S3",this.date.toLocaleTimeString())
    setTimeout(() => {
      this.isSpinner = false;
    },100)
    console.log("E3",this.date.toLocaleTimeString())
  }
}
