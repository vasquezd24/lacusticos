import { ICategory } from 'app/shared/model/category.model';
import { IEntrepreneur } from 'app/shared/model/entrepreneur.model';

export interface IProduct {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  productImageContentType?: string;
  productImage?: any;
  activated?: boolean;
  category?: ICategory;
  entrepreneur?: IEntrepreneur;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public price?: number,
    public productImageContentType?: string,
    public productImage?: any,
    public activated?: boolean,
    public category?: ICategory,
    public entrepreneur?: IEntrepreneur
  ) {
    this.activated = this.activated || false;
  }
}
