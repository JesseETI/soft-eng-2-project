import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PharmServicesService {
  private PHARMACY_URL = "http://localhost:8001/api/orders/";
  constructor(
    private http: HttpClient,
    private route: Router,
    private toastCtrl: ToastController
  ) {}

  updateStatus(id: Number, status: Number): Observable<boolean> {
    const url = this.PHARMACY_URL + id + "/";
    const data = { status: status };

    return this.http.patch(url, data).pipe(
      take(1),
      switchMap((res) => {
        this.presentToast("Order has been updated!");
        return of(true);
      }),
      catchError((_) => {
        return of(false);
      })
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
