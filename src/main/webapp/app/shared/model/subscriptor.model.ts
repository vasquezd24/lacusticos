import { IEntrepreneur } from 'app/shared/model/entrepreneur.model';

export interface ISubscriptor {
  id?: number;
  email?: string;
  activated?: boolean;
  entrepreneurs?: IEntrepreneur[];
}

export class Subscriptor implements ISubscriptor {
  constructor(public id?: number, public email?: string, public activated?: boolean, public entrepreneurs?: IEntrepreneur[]) {
    this.activated = this.activated || false;
  }
}
