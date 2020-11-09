import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  private _selectedPharmacy;
  constructor() {}

  getOrders(): Observable<any> {
    return of({
      pharmacies: [
        {
          name: "Pharmacy1",
          address: "address1",
        },
        {
          name: "Pharmacy2",
          address: "address2",
        },
        {
          name: "Pharmacy3",
          address: "address3",
        },
        {
          name: "Pharmacy4",
          address: "address4",
        },
      ],
    });
  }
}
