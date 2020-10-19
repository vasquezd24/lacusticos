import { IEntrepreneur } from 'app/shared/model/entrepreneur.model';

export interface ILocation {
  id?: number;
  name?: string;
  latitude?: string;
  longitude?: string;
  details?: string;
  activated?: boolean;
  entrepreneur?: IEntrepreneur;
}

export class Location implements ILocation {
  constructor(
    public id?: number,
    public name?: string,
    public latitude?: string,
    public longitude?: string,
    public details?: string,
    public activated?: boolean,
    public entrepreneur?: IEntrepreneur
  ) {
    this.activated = this.activated || false;
  }
}
