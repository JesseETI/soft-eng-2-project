import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { OrdersService } from "src/app/service/orders.service";

@Component({
  selector: "app-pharmacies",
  templateUrl: "./pharmacies.page.html",
  styleUrls: ["./pharmacies.page.scss"],
})
export class PharmaciesPage implements OnInit {
  pharmacies: any;

  constructor(
    private orders: OrdersService,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.orders.getPharms().subscribe(
      (m) => {
        console.log(m);
        this.pharmacies = m;
      },
      (err) => {
        console.log(err);
        this.navCtrl.navigateRoot("/users");
      }
    );
  }

  ngOnInit() {}

  pharmacyClick(obj: any) {
    let navExtra: NavigationExtras = { state: { selectedPharmacy: obj } };
    this.router.navigate(["/users/tab1/order/"], navExtra);
  }
}
