import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  private _selectedPharmacy;
  constructor() {}

  getOrders() {
    return of(["pharmacy1", "pharmacy2", "pharmacy3", "pharmacy4"]);
  }
}
