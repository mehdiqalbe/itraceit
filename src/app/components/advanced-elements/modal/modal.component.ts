import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalOptions!: NgbModalOptions;

  currentRoute: any;
  urlData: any;
  constructor(private router:Router,
    private modalService: NgbModal) { 
      
      router.events.pipe(filter((event:any)=> event instanceof NavigationEnd)).subscribe( (event:any) => {
        this.currentRoute = event.url;
        this.urlData = event.url.split("/")
      })
    }
    ngOnInit(): void {
    }
    BasicOpen(basicmodal:any) {
      this.modalService.open(basicmodal);
    }
    openScrollableContent(longContent:any) {
      this.modalService.open(longContent, { scrollable: true });
    }
    LargeSizeOpen(largesizemodal:any) {
      this.modalService.open(largesizemodal, { size: 'lg' });
    }
    GridOpen(gridmodal:any) {
      this.modalService.open(gridmodal);
    }
    SmallSizeOpen(smallsizemodal:any) {
      this.modalService.open(smallsizemodal, { size: 'sm' });
    }
    InputOpen(inputmodal:any) {
      this.modalService.open(inputmodal);
    }
}
