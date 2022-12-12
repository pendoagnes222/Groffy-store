import { Routes } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { MenFashionComponent } from "../men-fashion/men-fashion.component";
import { WomenFashionComponent } from "../women-fashion/women-fashion.component";
import { PhoneComponent } from "../phone/phone.component";
import { AndroidPhoneComponent } from "../phone/android-phone/android-phone.component";
import { IPhonesComponent } from "../phone/i-phones/i-phones.component";
import { CartComponent } from "../cart/cart.component";
import { ProductdetailComponent } from "../productdetail/productdetail.component";
import { ShoeComponent } from "../men-fashion/shoe/shoe.component";
import { WatchComponent } from "../men-fashion/watch/watch.component";
import { ClothingComponent } from "../men-fashion/clothing/clothing.component";
import { WomenClothingComponent } from "../women-fashion/women-clothing/women-clothing.component";
import { WomenBagsComponent } from "../women-fashion/women-bags/women-bags.component";
import { WomenShoesComponent } from "../women-fashion/women-shoes/women-shoes.component";
import { CheckoutComponent } from "../checkout/checkout.component";
import { PaymentComponent } from "../payment/payment.component";
import { OrderComponent } from "../order/order.component";
import { LoginComponent } from "../login/login.component";
import { SignupComponent } from "../signup/signup.component";

export const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "phones", component: PhoneComponent},
    {path: "men-fashion", component: MenFashionComponent},
    {path: "women-fashion", component: WomenFashionComponent},
    {path: "phones/android", component: AndroidPhoneComponent},
    {path: "phones/iphones", component: IPhonesComponent},
    {path: "cart", component: CartComponent},
    {path: "productdetail/:id", component: ProductdetailComponent},
    {path: "men-fashion/shoes", component: ShoeComponent},
    {path: "men-fashion/watches", component: WatchComponent},
    {path: "men-fashion/clothings", component: ClothingComponent},
    {path: "women-fashion/clothings", component: WomenClothingComponent},
    {path: "women-fashion/bags", component: WomenBagsComponent},
    {path: "women-fashion/shoes", component: WomenShoesComponent},
    {path: "checkout", component: CheckoutComponent},
    {path: "payment", component: PaymentComponent},
    {path: "orders", component: OrderComponent},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent}
];