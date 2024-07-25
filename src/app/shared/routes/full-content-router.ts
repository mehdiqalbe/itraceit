import { Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';

export const full_content: Routes = [
  
  // {
  //   path: 'maps',
  //   loadChildren: () => import('../../components/maps/maps.module').then(m => m.MapsModule), canActivate: [AuthGuard]
  // },
  {
    path: 'ILgic',
    loadChildren: () => import('../../components/up-fci/up-fci.module').then(m => m.UPFCIModule), canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    loadChildren: () => import('../../components/advanced-elements/advanced-elements.module').then(m => m.AdvancedElementsModule)
  },
  // {
  //   path:'reports',
  //   loadChildren: () => import('../../components/reports/reports.module').then(m => m.ReportsModule), canActivate: [AuthGuard]
  // },
 

]