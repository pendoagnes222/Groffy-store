import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../shared/product';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
public products = new BehaviorSubject<Product[]>([]);
public search = new BehaviorSubject<string>('');

  constructor() { }
}
