import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { OrdersService } from "../service/orders.service";
import { PharmServicesService } from "../service/pharm-services.service";

@Component({
  selector: "app-tab4",
  templateUrl: "tab4.page.html",
  styleUrls: ["tab4.page.scss"],
})
export class Tab4Page {
  orders: any;
  numOrders = 0;
  role: string;

  constructor(private orderService: OrdersService, private auth: AuthService) {}

  ngOnInit() {
    this.auth.user.subscribe((user) => (this.role = user.role));
  }

  ionViewWillEnter() {
    this.getOrders(null);
  }

  getOrders(loadEvent = null) {
    this.orderService.getOrders().subscribe((res) => {
      console.log("Loaded orders");
      console.log(res);
      this.orders = res;
      if (this.orders) this.numOrders = this.orders.length;
    });
    if (loadEvent) loadEvent.target.complete();
  }
}
