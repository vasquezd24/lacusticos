export interface ICategory {
  id?: number;
  description?: string;
  activated?: boolean;
  type?: string;
}

export class Category implements ICategory {
  constructor(public id?: number, public description?: string, public activated?: boolean, public type?: string) {
    this.activated = this.activated || false;
  }
}
