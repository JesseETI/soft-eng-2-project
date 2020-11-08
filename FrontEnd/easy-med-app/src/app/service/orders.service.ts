import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  private _selectedPharmacy;
  constructor() {}

  getOrders() {
    return of(["pharmacy 1", "pharmacy 2", "pharmacy 3", "pharmacy 4"]);
  }
}
