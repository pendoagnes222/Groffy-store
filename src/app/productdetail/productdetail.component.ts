import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Product } from '../shared/product';
import { ProductsService } from "../services/products.service";
import { Params, ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { switchMap, delay } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from "@angular/animations";
import { CartService } from '../services/cart.service';
import { MatSnackBar} from "@angular/material/snack-bar";
import { baseURL } from "../shared/baseurl";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
  // animations: [
  //   trigger('visibility', [
  //     state("shown", style({
  //       transform: "scale(0.5)",
  //       opacity: 0
  //     })),
  //     state("hidden", style({
  //       transform: "scale(1.0)",
  //       opacity: 1
  //     })),
  //     transition("* => *", animate("0.5s ease-in-out"))
  //   ])
  // ]
})

export class ProductdetailComponent implements OnInit {
  @ViewChild('cform') commentFormDirective;
  
    product: Product;  
    BaseURL: string = baseURL;
    comment: any;
    errMess: string;
    id: string = this.authService.userId;

    constructor(private productService: ProductsService,
     private route: ActivatedRoute, private location: Location,
     private _snackBar: MatSnackBar, private cartService: CartService,
     private fb: FormBuilder, private authService: AuthService,
     private router: Router
     ) { }
     formErrors = {
      'comment': ''
    };
  
    validationMessages = {
      'comment': {
        'required':      'Comment is required.'
      }
    };
  
    commentForm: FormGroup;
  
  ngOnInit(): void {
    this.createForm();
   
    this.cartService.refreshNeeded$
    .subscribe(()=> {
      this.route.params.pipe(switchMap((params: Params) => this.productService.getPhone(params['id'])))
    .subscribe(product => this.product = product );
    });

    this.route.params.pipe(switchMap((params: Params) => this.productService.getPhone(params['id'])))
    .subscribe(product => this.product = product );
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
   
  createForm() {
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', Validators.required]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }
  onSubmit() {
    this.productService.postComment(this.product._id, this.commentForm.value)
      .subscribe(product => this.product = <Product>product);
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      rating: 5,
      comment: ''
    });
    
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
