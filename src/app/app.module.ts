import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { WomenFashionComponent } from './women-fashion/women-fashion.component';
import { PhoneComponent } from './phone/phone.component';
import { MenFashionComponent } from './men-fashion/men-fashion.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from "@angular/material/card";
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule} from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { HttpClientModule } from "@angular/common/http";
import "hammerjs";
import { MatSidenavModule } from "@angular/material/sidenav";
import { NgxPaginationModule } from "ngx-pagination";

import { MatTabsModule } from "@angular/material/tabs";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule} from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatBadgeModule } from "@angular/material/badge";
import { MatTreeModule } from "@angular/material/tree";
import { MatSliderModule } from "@angular/material/slider";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { MatMenuModule } from "@angular/material/menu";

import { ProductsService } from "./services/products.service";
import { CartService } from './services/cart.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { FeedbackService } from './services/feedback.service';
import { AuthService } from './services/auth.service';
import { AuthInterceptor, UnauthorizedInterceptor } from './services/auth.interceptor';
import { FavoriteService } from './services/favorite.service';
import { AuthGuardService } from './services/auth-guard.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { LoginComponent } from './login/login.component';

import { baseURL } from './shared/baseurl';
import { HighlightDirective } from './directives/highlight.directive';
import { IPhonesComponent } from './phone/i-phones/i-phones.component';
import { AndroidPhoneComponent } from "./phone/android-phone/android-phone.component";
import { CartComponent } from './cart/cart.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { WatchComponent } from './men-fashion/watch/watch.component';
import { ClothingComponent } from './men-fashion/clothing/clothing.component';
import { ShoeComponent } from './men-fashion/shoe/shoe.component';
import { WomenClothingComponent } from './women-fashion/women-clothing/women-clothing.component';
import { WomenBagsComponent } from './women-fashion/women-bags/women-bags.component';
import { WomenShoesComponent } from './women-fashion/women-shoes/women-shoes.component';
import { CheckoutComponent } from "./checkout/checkout.component";
import { PaymentComponent } from './payment/payment.component';
import { BadgeComponent } from './badge/badge.component';
import { FlutterwaveModule} from "flutterwave-angular-v3";
import { OrderComponent } from './order/order.component';
import { FilterPipe } from './shared/filter.pipe';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { FilterService } from './services/filter.service';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    HighlightDirective,
    SidenavComponent,
    WomenFashionComponent,
    PhoneComponent,
    MenFashionComponent,
    IPhonesComponent,
    AndroidPhoneComponent,
    CartComponent,
    ProductdetailComponent,
    WatchComponent,
    ClothingComponent,
    ShoeComponent,
    WomenClothingComponent,
    WomenBagsComponent,
    WomenShoesComponent,
    CheckoutComponent,
    PaymentComponent,
    BadgeComponent,
    OrderComponent,
    SearchFilterComponent,
    FilterPipe,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatListModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatBadgeModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDividerModule,
    NgxPaginationModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatTreeModule,
    MatSliderModule,
    NgxSkeletonLoaderModule,
    FlutterwaveModule,
    MatMenuModule
  ],
  providers: [
    ProductsService,
    CartService,
    {provide: 'baseURL', useValue: baseURL},
    ProcessHTTPMsgService,
    FeedbackService,
    AuthService,
    AuthGuardService,
    FavoriteService,
    FilterService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
