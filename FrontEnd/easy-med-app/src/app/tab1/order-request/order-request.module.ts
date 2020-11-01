import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderRequestPageRoutingModule } from './order-request-routing.module';

import { OrderRequestPage } from './order-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderRequestPageRoutingModule
  ],
  declarations: [OrderRequestPage]
})
export class OrderRequestPageModule {}
