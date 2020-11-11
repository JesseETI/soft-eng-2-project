import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { OrdersService } from "../service/orders.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  constructor(private router: Router, private orderService: OrdersService) {
    this.getOrders(null);
  }
  orders: any;
  numOrders = 0;
  openForm() {
    this.router.navigate(["/users/tab1/order"]);
  }

  getOrders(loadEvent) {
    this.orderService.getOrders().subscribe((res) => {
      console.log("Loaded orders");
      this.orders = res;
    });
    if (this.orders) this.numOrders = this.orders.length;
    if (loadEvent) loadEvent.target.complete();
  }
}
