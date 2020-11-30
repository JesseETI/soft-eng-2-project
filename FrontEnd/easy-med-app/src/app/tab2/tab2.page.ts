import { HttpClient, HttpRequest } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { OrdersService } from "../service/orders.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
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

      this.orders = res.filter((order) => order.status === 3);
      if (this.orders) this.numOrders = this.orders.length;
    });

    if (loadEvent) loadEvent.target.complete();
  }
}
