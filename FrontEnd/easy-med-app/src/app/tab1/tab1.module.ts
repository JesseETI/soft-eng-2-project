import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab1Page } from "./tab1.page";
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";

import { Tab1PageRoutingModule } from "./tab1-routing.module";
import { OrderCardComponent } from ".././order-card/order-card.component";
import { StatusComponent } from "../order-card/status/status.component";
import { PharmButtonsComponent } from "../order-card/pharm-buttons/pharm-buttons.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
  ],
  declarations: [
    Tab1Page,
    OrderCardComponent,
    StatusComponent,
    PharmButtonsComponent,
  ],
})
export class Tab1PageModule {}
