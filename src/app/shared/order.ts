import { Cart } from "./cart";

export type Order = {
    _id: string;
    user: string;
    cart: Cart[];
    address: string;
    name: string;
    paymentId: string;
    status: string;
};

