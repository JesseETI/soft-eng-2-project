import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  private PHARMACY_URL = "https://";
  private ORDER_URL = "https://";
  constructor(private auth: AuthService) {}

  getPharms(): Observable<any> {
    return of({
      pharmacies: [
        {
          name: "Pharmacy1",
          pharmacist: { email: "Jose@hose.com", role: "PHARM" },
          address: "address1",
          contact: "12312",
        },
        {
          name: "Pharmacy2",
          pharmacist: { email: "Jos@hose.com", role: "PHARM" },
          address: "address2",
          contact: "12312",
        },
        {
          name: "Pharmacy3",
          pharmacist: { email: "Jo@hose.com", role: "PHARM" },
          address: "address3",
          contact: "12312",
        },
        {
          name: "Pharmacy4",
          pharmacist: { email: "J@hose.com", role: "PHARM" },
          address: "address4",
          contact: "12312",
        },
      ],
    });
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
    formData.prescriptionText = formData.prescriptionText.filter(
      (res) => res.medName.length != 0
    );
    formData.prescriptionText = JSON.stringify(formData.prescriptionText);
    console.log(formData);
  }
}
