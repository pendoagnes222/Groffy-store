import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { filter, map, switchMap } from 'rxjs/operators';
import { MatSnackBar} from "@angular/material/snack-bar";
import { baseURL} from "../../shared/baseurl";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-i-phones',
  templateUrl: './i-phones.component.html',
  styleUrls: ['./i-phones.component.scss']
})

export class IPhonesComponent implements OnInit {
  BaseURL: string = baseURL;
  
  iPhones: Product[];


  private mediaWatcher;
  public opened = true;
  breakpoint: any;
  rowHeight: any;
  length!: number;
  page: number = 1;
  id: string = this.authService.userId; 

  constructor(private productService: ProductsService, private _snackBar: MatSnackBar, 
    private cartService: CartService, private media: MediaObserver,
    private authService: AuthService,
    private router: Router) { 
    this.mediaWatcher = this.media.asObservable().pipe(filter((changes:MediaChange[])=> changes.length > 0), map((changes: MediaChange[])=> changes[0]))
                .subscribe((mediaChange: MediaChange) => {
                  this.handleMediaChange(mediaChange);
                });
  }

  handleMediaChange(mediaChange: MediaChange) {
    if (this.media.isActive('xs')) {
      this.opened =false;
      this.breakpoint = 2;
      this.rowHeight = 435;
    }
else if (this.media.isActive('sm')) {
      this.opened =true;
      this.breakpoint = 4;
      this.rowHeight = 250;
    }
else if (this.media.isActive('md')) {
      this.opened =true;
      this.breakpoint = 5;
      this.rowHeight = 250;
    }
else if (this.media.isActive('lg')) {
      this.opened =true;
      this.breakpoint = 6;
      this.rowHeight = 270;
    }        
else if (this.media.isActive('xl')) {
      this.opened =true;
      this.breakpoint = 6;
      this.rowHeight = 270;
    } 
else {
      this.opened = true;
      this.breakpoint = 6;
      this.rowHeight = 310;
    }
}
      

  ngOnInit(): void {
    
    this.cartService.refreshNeeded$
      .subscribe(()=> {
       this.getProducts(); 
      });
      
    this.getProducts();
    this.length = this.iPhones.length;   
    this.id = this.authService.userId;
  }
  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
  }

  getProducts() {
    this.productService.getIPhones()
    .subscribe((iPhone) => this.iPhones = iPhone);
    
  }

  addToCart(product: Product) {
    if (this.authService.isAuthenticated === false) {
      this.router.navigate(['/login']);
    }
    else {
      let item = {
        _id: product._id,
        name: product.name,
        description: product.description,
        rating: product.rating,
        price: product.price,
        image: product.image,  
        category: product.category,
        featured: product.featured,
        quantity: 1
        
       };
      this.cartService.addToCart(item, this.id)
     .subscribe(()=> {
      this.getProducts(); 
      this.openSnackBar();
    });
  }   
};

  openSnackBar() {
    this._snackBar.open("Item has been added to cart","", {
      duration: 3000,
      panelClass: ["snackbar"]
    });
  }
 
}
