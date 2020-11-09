import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderRequestPage } from './order-request.page';

const routes: Routes = [
  {
    path: '',
    component: OrderRequestPage
  },  {
    path: 'pharmacies',
    loadChildren: () => import('./pharmacies/pharmacies.module').then( m => m.PharmaciesPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRequestPageRoutingModule {}
