import { IEntrepreneur } from 'app/shared/model/entrepreneur.model';

export interface ILocation {
  id?: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  details?: string;
  activated?: boolean;
  entrepreneur?: IEntrepreneur;
}

export class Location implements ILocation {
  constructor(
    public id?: number,
    public name?: string,
    public latitude?: number,
    public longitude?: number,
    public details?: string,
    public activated?: boolean,
    public entrepreneur?: IEntrepreneur
  ) {
    this.activated = this.activated || false;
  }
}
