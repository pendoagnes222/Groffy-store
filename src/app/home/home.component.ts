import { Component, OnInit} from '@angular/core';
import { Product } from '../shared/product';
import { ProductsService } from '../services/products.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { filter, map } from 'rxjs/operators';
import { baseURL } from "../shared/baseurl";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  BaseURL: string = baseURL;

  private mediaWatcher;
  public opened = true;
  breakpoint: any;
  rowHeight: any;
  featuredIPhones: Product[];
  featuredAndroidPhones: Product[];
  cols: number;
  
  clothings: Product[];

  constructor(private productService: ProductsService, private media: MediaObserver) { 
    this.mediaWatcher = this.media.asObservable().pipe(filter((changes:MediaChange[])=> changes.length > 0), map((changes: MediaChange[])=> changes[0]))
                .subscribe((mediaChange: MediaChange) => {
                  this.handleMediaChange(mediaChange);
                });
  }

  handleMediaChange(mediaChange: MediaChange) {
    if (this.media.isActive('xs')) {
      this.opened =false;
      this.breakpoint = 2;
      this.rowHeight = 180;
      this.cols = 1;
    }
else if (this.media.isActive('sm')) {
      this.opened = false;
      this.breakpoint = 2;
      this.rowHeight = 180;
      this.cols = 1;
    }
    
else if (this.media.isActive('md')) {
      this.opened =true;
      this.breakpoint = 3;
      this.rowHeight = 180;
      this.cols = 2;
    }
else if (this.media.isActive('lg')) {
      this.opened =true;
      this.breakpoint = 3;
      this.rowHeight = 200;
      this.cols = 2;
    }        

else {
      this.opened = true;
      this.breakpoint = 3;
      this.rowHeight = 200;
      this.cols = 2;
    }
}
      


ngOnInit(): void {
      this.productService.getFeaturedIPhones()
      .subscribe((phones) => this.featuredIPhones = phones);
      
      this.productService.getFeaturedAndroidPhones()
      .subscribe((phones) => this.featuredAndroidPhones = phones);
      
      this.productService.getFeaturedMenClothings()
      .subscribe((clothings) => this.clothings = clothings);
      
    }

  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
  }
}
