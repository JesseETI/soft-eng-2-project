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

    // return of({
    //   pharmacies: [
    //     {
    //       name: "Pharmacy1",
    //       pharmacist: { email: "Jose@hose.com", role: "PHARM" },
    //       address: "address1",
    //       contact: "12312",
    //     },
    //     {
    //       name: "Pharmacy2",
    //       pharmacist: { email: "Jos@hose.com", role: "PHARM" },
    //       address: "address2",
    //       contact: "12312",
    //     },
    //     {
    //       name: "Pharmacy3",
    //       pharmacist: { email: "Jo@hose.com", role: "PHARM" },
    //       address: "address3",
    //       contact: "12312",
    //     },
    //     {
    //       name: "Pharmacy4",
    //       pharmacist: { email: "J@hose.com", role: "PHARM" },
    //       address: "address4",
    //       contact: "12312",
    //     },
    //   ],
    // });
  }

  getOrders(): Observable<any> {
    return this.auth.user.pipe(
      map((user) => {
        if (user.role === "USER")
          return [
            {
              prescriptionText: JSON.stringify([
                { medName: "Panadol", dosage: "12mg", quantity: 6 },
                { medName: "test2", dosage: "10mg", quantity: 10 },
              ]),
              pharmacy: {
                name: "Pharmacy1",
                pharmacist: { email: "Jose@hose.com", role: "PHARM" },
                address: "address1",
                contact: "12312",
              },
              user: "ram@ram.com",
              status: "0",
            },
            {
              prescriptionText: "",
              pharmacy: {
                name: "Pharmacy1",
                pharmacist: { email: "Jose@hose.com", role: "PHARM" },
                address: "address1",
                contact: "12312",
              },
              user: "ram@ram.com",
              status: "1",
            },
          ];
      })
    );
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
