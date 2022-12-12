import { Injectable } from '@angular/core';
import { Product } from "../shared/product";
import { Cart } from "../shared/cart";
import { Order } from '../shared/order';
import {Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { baseURL } from '../shared/baseurl';
import { catchError, retry, tap } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
 constructor(private http: HttpClient,
  private processHTTPMsgService: ProcessHTTPMsgService) { }
  cartTotal!: number;
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }


  getCartItems(id: string): Observable<Cart[]> {
    return this.http.get<Product[]>(baseURL + "users/" + id + "/cart")   
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  

getCartTotal(id: string): Observable<number> {
  return this.http.get<number>(baseURL + "users/" + id +'/cartTotal')
  .pipe(catchError(this.processHTTPMsgService.handleError));
    
}

  addToCart(product: any, id: string) {
  return this.http.post(baseURL + 'users/' + id + '/cart', product)
    .pipe(
      tap(()=>{
        this._refreshNeeded$.next();
      })
    )
    .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }
  
  updateCartQuantity(id: string, cartId: string, quantity: number, price: number) {
    return this.http.put(baseURL + "users/" + id + "/cart/" + cartId, {quantity: quantity, price: price})
    .pipe(
      tap(()=>{
        this._refreshNeeded$.next();
      })
    );
  }

  removeFromCart(id: string, cartId: string) {
    return this.http.delete(baseURL + "users/" + id + "/cart/" + cartId)
    .pipe(
      tap(()=>{
        this._refreshNeeded$.next();
      })
    )
    .pipe(catchError(this.processHTTPMsgService.handleError));  
  }

  removeAllCart(id: string) {
    return this.http.delete(baseURL + "users/" + id + "/cart")
    .pipe(
      tap(()=>{
        this._refreshNeeded$.next();
      })
    )
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getOrders(id: string): Observable<Order[]> {
    return this.http.get<[]>(baseURL + "orders?user=" + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  placeOrder(order: any) {
    return this.http.post(baseURL + "orders", order)
    .pipe(
      tap(()=>{
        this._refreshNeeded$.next();
      })
    )
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
