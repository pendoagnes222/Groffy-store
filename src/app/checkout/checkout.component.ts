import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../shared/cart';
import { baseURL } from "../shared/baseurl";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
    user = {
    username: "",
    address: "",
    remember: false
  };
  id: string = this.authService.userId;
  BaseURL: string = baseURL;
  public cartItems: Cart[] = [];
  selectedIndex: number = 0;
  public total: number = 0;
  constructor(private cartService: CartService, private authService: AuthService) {

    
   }
  
  ngOnInit(): void {
    if (this.authService.isAuthenticated === true) {
      
       this.getTotalPrice();
     }
    
  }

  getCartItems() {
    this.cartService.getCartItems(this.id)
      .subscribe((items) => { 
      this.cartItems = items; 
    });
  }
  
  getTotalPrice() {
    this.cartService.getCartTotal(this.id)
    .subscribe((total) => this.total = total);
  };
  
  ngAfterViewInit(): void {
    
  }
  nextTab() {
    if (this.selectedIndex != 1) {
      this.selectedIndex += 1;
    }
  }

  previousTab() {
    if (this.selectedIndex != 0) {
      this.selectedIndex -= 1;
    }
  }
}

