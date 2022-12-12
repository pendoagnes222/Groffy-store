import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flutterwave, InlinePaymentOptions, PaymentSuccessResponse } from 'flutterwave-angular-v3';
import { AuthService } from '../services/auth.service';
import { CartService } from "../services/cart.service";


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

  

export class PaymentComponent implements OnInit {
  public total: number = 0;
  paidFor = false;
  publicKey = "FLWPUBK_TEST-8ca4f96532de4fdcc5de74e9564cd28f-X";
  id: string = this.authService.userId;
  customerDetails = { name: 'Demo Customer Name', email: 'customer@mail.com', phone_number: '08100000000'}
 
  customizations = {title: 'payment', description: 'Customization Description', logo: 'https://flutterwave.com/images/logo-colored.svg'}
 
  meta = {'counsumer_id': this.id, 'consumer_mac': 'kjs9s8ss7dd'}
 
  constructor(private cartService: CartService, 
              private authService: AuthService, 
              private flutterwave: Flutterwave,
              private router: Router) { 
    
  }
 
  makePaymentCallback(response: PaymentSuccessResponse): void {
    
    const order = {
      paymentId: response.tx_ref 
      }
      console.log('payment made');
    this.placeOrder(order);
  }
  closedPaymentModal(): void {
    console.log('payment is closed');
    
          
    }

  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
  
  placeOrder(order) {
    this.cartService.placeOrder(order)
    .subscribe(()=> {
      this.cartService.removeAllCart(this.id)
      .subscribe();
      this.flutterwave.closePaymentModal(10);
      setTimeout(()=> {
        window.location.replace('https://cypherstore.netlify.app/orders');
      }, 3000);
    });
  }

  ngOnInit(): void {
    this.getTotalPrice();
  }

  getTotalPrice() {
    this.cartService.getCartTotal(this.id)
    .subscribe((total) => this.total = total);
  };
}
