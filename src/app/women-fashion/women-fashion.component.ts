import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product';
import { ProductsService } from '../services/products.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { filter, map } from 'rxjs/operators';
import { baseURL } from "../shared/baseurl";
@Component({
  selector: 'app-women-fashion',
  templateUrl: './women-fashion.component.html',
  styleUrls: ['./women-fashion.component.scss']
})
export class WomenFashionComponent implements OnInit {
  featuredClothing: Product[];
  featuredBags: Product[];
  featuredShoes: Product[];
  BaseURL: string = baseURL;
  private mediaWatcher;
  public opened = true;
  breakpoint: any;
  rowHeight: any;

  constructor(private fashionService: ProductsService, private media: MediaObserver) { 
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
    this.fashionService.getFeaturedWomenClothings()
    .subscribe((featuredClothing)=> this.featuredClothing = featuredClothing);
    
    this.fashionService.getFeaturedWomenBags()
    .subscribe((featuredBags)=> this.featuredBags = featuredBags);

    this.fashionService.getFeaturedWomenShoes()
    .subscribe((featuredShoes)=> this.featuredShoes = featuredShoes);
  
  }
  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
  }


}
