import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { Order } from "../shared/order";
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  id: string = this.authService.userId;
  orders: Order[] = [];
  BaseURL: string = baseURL;
  constructor(private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    
    if (this.authService.isAuthenticated === true) {
      this.cartService.refreshNeeded$
    .subscribe(()=> {
      this.getOrders();
    })
    this.getOrders();

      
    }
    
  }


  getOrders() {
    this.cartService.getOrders(this.id)
    .subscribe((orders) => {
      this.orders = orders;
    })
  }
}
