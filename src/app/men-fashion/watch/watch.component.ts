import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { filter, map } from 'rxjs/operators';
import { MatSnackBar} from "@angular/material/snack-bar";
import { baseURL } from "../../shared/baseurl";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {
  BaseURL: string = baseURL;
  watches: Product[];
  private mediaWatcher;
  public opened = true;
  breakpoint: any;
  rowHeight: any;
  length!: number;
  page: number = 1;
  id: string = this.authService.userId;

  constructor(private fashionService: ProductsService, private cartService: CartService, private media: MediaObserver,
    private _snackBar: MatSnackBar, private authService: AuthService,
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
      this.rowHeight = 470;
    }
else if (this.media.isActive('sm')) {
      this.opened =true;
      this.breakpoint = 4;
      this.rowHeight = 260;
    }
else if (this.media.isActive('md')) {
      this.opened =true;
      this.breakpoint = 4;
      this.rowHeight = 260;
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
      this.getWatches();    
    });  
    this.getWatches()
    this.length = this.watches.length;
   
  }

  getWatches() {
    this.fashionService.getMenWatches()
      .subscribe((watches) => this.watches = watches);
      
  }

  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
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
      this.getWatches();
      this.openSnackBar();
    }
    )}
  };

 openSnackBar() {
   this._snackBar.open("Item has been added to cart","", {
     duration: 3000,
     panelClass: ["snackbar"]
   });
 }

}
