import { Comment } from './comment';

export type Product = {
    _id: string;
    name: string;
    description: string;
    rating: number;
    price: number;
    comments: Comment[];
    image: string,  
    category: string;
    featured: boolean;
    quantity: number;
};