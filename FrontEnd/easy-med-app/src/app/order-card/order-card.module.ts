import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { OrderCardComponent } from "./order-card.component";
import { StatusComponent } from "./status/status.component";
import { PharmButtonsComponent } from "./pharm-buttons/pharm-buttons.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [OrderCardComponent, StatusComponent, PharmButtonsComponent],
  exports: [OrderCardComponent],
})
export class OrderCardComponentModule {}
