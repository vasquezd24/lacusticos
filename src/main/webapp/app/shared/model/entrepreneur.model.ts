import { ICategory } from 'app/shared/model/category.model';
import { IUser } from 'app/core/user/user.model';

export interface IEntrepreneur {
  id?: number;
  email?: string;
  name?: string;
  description?: string;
  phoneNumber?: number;
  schedule?: string;
  pictureContentType?: string;
  picture?: any;
  webSite?: string;
  facebookPage?: string;
  instagramPage?: string;
  activated?: boolean;
  category?: ICategory;
  user?: IUser;
}

export class Entrepreneur implements IEntrepreneur {
  constructor(
    public id?: number,
    public email?: string,
    public name?: string,
    public description?: string,
    public phoneNumber?: number,
    public schedule?: string,
    public pictureContentType?: string,
    public picture?: any,
    public webSite?: string,
    public facebookPage?: string,
    public instagramPage?: string,
    public activated?: boolean,
    public category?: ICategory,
    public user?: IUser
  ) {
    this.activated = this.activated || false;
  }
}
