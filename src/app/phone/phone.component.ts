import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product';
import { ProductsService } from '../services/products.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { filter, map } from 'rxjs/operators';
import { baseURL } from "../shared/baseurl";

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  featuredIPhones: Product[];
  featuredAndroidPhones: Product[];
  BaseURL: string = baseURL;
  private mediaWatcher;
  public opened = true;
  breakpoint: any;
  rowHeight: any;

  constructor(private productService: ProductsService, private media: MediaObserver) { 
    this.mediaWatcher = this.media.asObservable().pipe(filter((changes:MediaChange[])=> changes.length > 0), map((changes: MediaChange[])=> changes[0]))
                .subscribe((mediaChange: MediaChange) => {
                  this.handleMediaChange(mediaChange);
                });
  }

  handleMediaChange(mediaChange: MediaChange) {
    if (this.media.isActive('xs')) {
      this.opened =false;
      this.breakpoint = 3;
      this.rowHeight = 180;
    }
else if (this.media.isActive('sm')) {
      this.opened =true;
      this.breakpoint = 4;
      this.rowHeight = 200;
    }
else if (this.media.isActive('md')) {
      this.opened =true;
      this.breakpoint = 5;
      this.rowHeight = 200;
    }
else if (this.media.isActive('lg')) {
      this.opened =true;
      this.breakpoint = 6;
      this.rowHeight = 200;
    }        

else {
      this.opened = true;
      this.breakpoint = 7;
      this.rowHeight = 220;
    }
}
      

 

  ngOnInit(): void {
    this.productService.getFeaturedIPhones()
    .subscribe((iPhone) => this.featuredIPhones = iPhone);
      
    this.productService.getFeaturedAndroidPhones()
    .subscribe((phone) => this.featuredAndroidPhones = phone);
  }
  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
  }

}
