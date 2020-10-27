import { IEntrepreneur } from 'app/shared/model/entrepreneur.model';

export interface ISubscriptor {
  id?: number;
  email?: string;
  activated?: boolean;
  entrepreneur?: IEntrepreneur;
}

export class Subscriptor implements ISubscriptor {
  constructor(public id?: number, public email?: string, public activated?: boolean, public entrepreneur?: IEntrepreneur) {
    this.activated = this.activated || false;
  }
}
