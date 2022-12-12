import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from "../shared/product";
import { AuthService } from '../services/auth.service';
import { Cart } from '../shared/cart';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {
  cartItems: Cart[] = [];
  id: string = this.authService.userId;
  constructor(private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated === true) {
      this.cartService.refreshNeeded$
      .subscribe(()=> {
        this.getCartItems();
      });
      
      this.getCartItems();
   }
    
}
  getCartItems() {
    this.cartService.getCartItems(this.id)
      .subscribe((items) => { 
      this.cartItems = items; 
    });
  }
}
