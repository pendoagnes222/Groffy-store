import { Injectable } from '@angular/core';
import { of, Observable } from "rxjs";
// import { HttpClient } from "@angular/common/http";
// import { baseURL } from '../shared/baseurl';
   import { map, delay, catchError } from 'rxjs/operators';
// import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  // getDishes(): Observable<Dish[]> {
  //   return of(DISHES)
  //   .pipe(delay(2000));
  // }

  // getDish(id: string): Observable<Dish> {
  //   return of(DISHES.filter((dish) => dish.id === id)[0])
  //   .pipe(delay(2000)); 
  //   }

  // getFeaturedDish(): Observable<Dish> {
  //   return of(DISHES.filter((dish) => dish.featured)[0])
  //   .pipe(delay(2000));
  // }

}
