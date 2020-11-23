import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { OrdersService } from "../service/orders.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  orders: any;
  numOrders = 0;
  role: string;

  constructor(
    private router: Router,
    private orderService: OrdersService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.user.subscribe((user) => (this.role = user.role));
  }

  ionViewWillEnter() {
    this.getOrders(null);
  }

  openForm() {
    this.router.navigate(["/users/tab1/order"]);
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
