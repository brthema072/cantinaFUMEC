import { Product } from './product.model';

export interface Category{
    id?: number;
    cardSubtitle: string;
    cardTitle: string;
    imagem: string;
    menu: Product[];
}