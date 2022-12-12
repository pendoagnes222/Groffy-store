import { Injectable } from '@angular/core';
import { of, Observable, Subject } from "rxjs";
import { Product } from "../shared/product";
import { HttpClient } from "@angular/common/http";
import { baseURL } from '../shared/baseurl';
import { catchError, retry, tap } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) {}
  
private _refreshNeeded$ = new Subject<void>();
get refreshNeeded$() {
  return this._refreshNeeded$;
}
      getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(baseURL + "products")
     .pipe(catchError(this.processHTTPMsgService.handleError));
     
  }

  getPhone(id: string): Observable<Product> {
    return this.http.get<Product>(baseURL + "products/" + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPhones(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + "phones?featured=true")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  
  getAndroidPhones(): Observable<[]> {
    return this.http.get<[]>(baseURL + "products?category=android")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  
  getIPhones(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + "products?category=iPhone")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedIPhones(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + "products?featured=true&category=iPhone")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  
  getFeaturedAndroidPhones(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + "products?featured=true&category=android")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getMenClothings(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + "products?category=men-clothing")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedMenClothings(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + "products?featured=true&category=men-clothing")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  
  getMenWatches(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + "products?category=men-watches")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedMenWatches(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + "products?featured=true&category=men-watches")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  
  getMenShoes(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + "products?category=men-shoes")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedMenShoes(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + "products?featured=true&category=men-shoes")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  
  getWomenClothings(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + "products?category=women-clothing")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedWomenClothings(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + "products?featured=true&category=women-clothing")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  
  getWomenBags(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + "products?category=women-bags")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedWomenBags(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + "products?featured=true&category=women-bags")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  
  getWomenShoes(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + "products?category=women-shoes")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedWomenShoes(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + "products?featured=true&category=women-shoes")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  postComment(productId: string, comment: any) {
    return this.http.post(baseURL + 'products/' + productId + '/comments', comment)
    .pipe(
      tap(()=> {
        this._refreshNeeded$.next();
      })
    )
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  removeComment(productId: string, commentId: string) {
    return this.http.delete(baseURL + "products/" + productId + "/cart/" + commentId)
    .pipe(
      tap(()=>{
        this._refreshNeeded$.next();
      })
    )
    .pipe(catchError(this.processHTTPMsgService.handleError));  
  }
  
}
