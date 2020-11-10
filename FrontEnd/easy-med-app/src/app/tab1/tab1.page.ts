import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  constructor(private router: Router) {}
  orders: any;
  numOrders = 0;
  openForm() {
    this.router.navigate(["/users/tab1/order"]);
  }

  getOrders(loadEvent) {
    console.log("Loaded orders");
    this.orders = {};
    this.numOrders = Object.keys(this.orders).length;
    loadEvent.target.complete();
  }
}
