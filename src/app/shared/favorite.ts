import { Product } from './product';
import { User } from './user';

export class Favorite {
    _id: string;
    user: User;
    products: Product[];
    createdAt: string;
    updatedAt: string;
}
