import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NotificationSidemenuComponent } from './components/notification-sidemenu/notification-sidemenu.component';
import { HeaderBreadcrumbComponent } from './components/header-breadcrumb/header-breadcrumb.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { HoriHeaderComponent } from './horiComponets/hori-header/hori-header.component';
import { HoriSidemenuComponent } from './horiComponets/hori-sidemenu/hori-sidemenu.component';
import { HoriFullLayoutComponent } from './components/hori-full-layout/hori-full-layout.component';
import { FullContentComponent } from './components/layouts/full-content/full-content.component';
import { ErrorStyleComponent } from './components/layouts/error-style/error-style.component';
import { ContentStyleComponent } from './components/layouts/content-style/content-style.component';
import { RouterModule } from '@angular/router';


import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullscreenDirective } from './directives/fullscreen-toggle.directive';
import { TabToTopComponent } from './components/tab-to-top/tab-to-top.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { MapHeaderComponent } from './components/map-header/map-header.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation:false
};

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    NotificationSidemenuComponent,
    HeaderBreadcrumbComponent,
    SidemenuComponent,
    HoriHeaderComponent,
    HoriSidemenuComponent,
    HoriFullLayoutComponent,
    FullContentComponent,ErrorStyleComponent, ContentStyleComponent,
    FullscreenDirective,
    TabToTopComponent,
    // MapHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    PerfectScrollbarModule,
    HttpClientModule,
   
    
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    HttpClient
  
  ],
  exports:[
    HoriFullLayoutComponent,
    FullContentComponent,ErrorStyleComponent, ContentStyleComponent,
    HeaderBreadcrumbComponent,
    TabToTopComponent,
    LoaderComponent,
    // MapHeaderComponent,

  ]
})
export class SharedModule { }
