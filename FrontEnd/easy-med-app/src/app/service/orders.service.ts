import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() { }

  getOrders(){
    
    return of(["pharmacy1","pharmacy2","pharmacy3","pharmacy4"]);
  }
}
