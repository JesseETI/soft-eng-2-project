import { Component, Input, OnInit } from "@angular/core";
import { StatusComponent } from "./status/status.component";

@Component({
  selector: "app-order-card",
  templateUrl: "./order-card.component.html",
  styleUrls: ["./order-card.component.scss"],
})
export class OrderCardComponent implements OnInit {
  @Input() order: any;
  @Input() userRole: string;
  medications: string[] = [];
  constructor() {}

  ngOnInit() {
    if (this.order.prescriptionText.length > 0) {
      this.order.prescriptionText = JSON.parse(this.order.prescriptionText);
      for (let med of this.order.prescriptionText) {
        this.medications.push(
          med.quantity + " of " + " " + med.dosage + " " + med.medName
        );
      }
    }
  }
}
