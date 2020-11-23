import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { Observable, of, throwError } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  private PHARMACY_URL = "http://localhost:8001/api/pharmacy/";
  private ORDER_URL = "http://localhost:8001/api/orders/";
  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private route: Router,
    private toastCtrl: ToastController
  ) {}

  getPharms(): Observable<any> {
    return this.http.get(this.PHARMACY_URL).pipe(
      take(1),
      switchMap((res) => {
        if (res) return of(res);
        return of(null);
      })
    );
  }

  getOrders(): Observable<any> {
    return this.http.get(this.ORDER_URL).pipe((res) => res);
  }
  sendOrder(formData) {
    //FIlter out empty medications
    formData.prescriptionText = formData.prescriptionText.filter(
      (res) => res.medName.length != 0
    );
    formData.pharmacy = formData.pharmacy.id;
    formData.status = 0;
    formData.prescriptionText = JSON.stringify(formData.prescriptionText);
    console.log(formData);
    this.http.post(this.ORDER_URL, formData).subscribe(
      (res) => {
        this.route.navigateByUrl("/users");
        this.presentToast("Order successfully sent");
      },
      (error) => this.presentToast("Error sending order")
    );
  }

  async presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: "top",
    });

    (await toast).present();
  }
}
