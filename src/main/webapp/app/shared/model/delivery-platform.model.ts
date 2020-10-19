import { IEntrepreneur } from 'app/shared/model/entrepreneur.model';

export interface IDeliveryPlatform {
  id?: number;
  name?: string;
  entrepreneur?: IEntrepreneur;
}

export class DeliveryPlatform implements IDeliveryPlatform {
  constructor(public id?: number, public name?: string, public entrepreneur?: IEntrepreneur) {}
}
