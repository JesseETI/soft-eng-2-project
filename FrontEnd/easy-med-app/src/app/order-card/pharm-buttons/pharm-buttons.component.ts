import { Component, Input, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { PharmServicesService } from "src/app/service/pharm-services.service";

@Component({
  selector: "app-pharm-buttons",
  templateUrl: "./pharm-buttons.component.html",
  styleUrls: ["./pharm-buttons.component.scss"],
})
export class PharmButtonsComponent implements OnInit {
  @Input() status;
  @Input() orderId;
  constructor(
    private pharm: PharmServicesService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  updateOrderStatus(status: number) {
    this.pharm.updateStatus(this.orderId, status).subscribe((res) => {
      if (res) window.location.reload();
    });
  }
}
