import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../shared/cart';
import { baseURL } from "../shared/baseurl";
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  
  items: Cart[] = [];
  
  cartTotal: number = 0;
  BaseURL: string = baseURL;
  id: string = this.authService.userId;
  constructor(private cartService: CartService,
  private _snackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit(): void {
    
    if (this.authService.isAuthenticated === true) {
      this.cartService.refreshNeeded$
      .subscribe(()=> {
       this.getCartItems(); 
      this.getTotalPrice();
      
      });

      this.getTotalPrice();
      this.getCartItems();
    }
    
  }  


  getCartItems() {
    this.cartService.getCartItems(this.id)
      .subscribe((items) => { 
      this.items = items; 
    });
  }

ngAfterViewInit(): void {

}

increaseCart(id: string, quantity: number, price: number) {
  this.cartService.updateCartQuantity(this.id, id, quantity + 1, (price/quantity) * (quantity + 1))
  .subscribe();
}

decreaseCart(id: string, quantity: number, price: number) {
  this.cartService.updateCartQuantity(this.id, id, quantity - 1, (price/quantity) * (quantity - 1))
  .subscribe();

}

removeFromCart(id: string) {
  this.cartService.removeFromCart(this.id, id)
  .subscribe(() => {
    this.openSnackBar();
        
  });
  
  }

   getTotalPrice() {
    this.cartService.getCartTotal(this.id)
    .subscribe((total) => this.cartTotal = total);
  };

  openSnackBar() {
    this._snackBar.open("Item has been removed successfully","", {
      duration: 3000,
      panelClass: ["snackbar"]
    });
  }
}
