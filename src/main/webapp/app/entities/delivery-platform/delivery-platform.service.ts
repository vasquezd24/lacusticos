import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDeliveryPlatform } from 'app/shared/model/delivery-platform.model';

type EntityResponseType = HttpResponse<IDeliveryPlatform>;
type EntityArrayResponseType = HttpResponse<IDeliveryPlatform[]>;

@Injectable({ providedIn: 'root' })
export class DeliveryPlatformService {
  public resourceUrl = SERVER_API_URL + 'api/delivery-platforms';
  public entreURL = SERVER_API_URL + 'api/delivery-platforms/entrepreneur';

  constructor(protected http: HttpClient) {}

  create(deliveryPlatform: IDeliveryPlatform): Observable<EntityResponseType> {
    return this.http.post<IDeliveryPlatform>(this.resourceUrl, deliveryPlatform, { observe: 'response' });
  }

  update(deliveryPlatform: IDeliveryPlatform): Observable<EntityResponseType> {
    return this.http.put<IDeliveryPlatform>(this.resourceUrl, deliveryPlatform, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDeliveryPlatform>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDeliveryPlatform[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findByEntrepreneur(id: number | undefined, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDeliveryPlatform[]>(`${this.entreURL}/${id}`, { params: options, observe: 'response' });
  }
}
