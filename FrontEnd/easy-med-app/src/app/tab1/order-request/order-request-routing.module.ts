import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderRequestPage } from './order-request.page';

const routes: Routes = [
  {
    path: '',
    component: OrderRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRequestPageRoutingModule {}
