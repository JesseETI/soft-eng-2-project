import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  private _selectedPharmacy;
  constructor() {}

  getPharms(): Observable<any> {
    return of({
      pharmacies: [
        {
          name: "Pharmacy1",
          address: "address1",
          contact: "12312",
        },
        {
          name: "Pharmacy2",
          address: "address2",
          contact: "12312",
        },
        {
          name: "Pharmacy3",
          address: "address3",
          contact: "12312",
        },
        {
          name: "Pharmacy4",
          address: "address4",
          contact: "12312",
        },
      ],
    });
  }

  getOrders(): Observable<any> {
    return of(null);
  }
  sendOrder(formData) {
    console.log(formData);
  }
}
