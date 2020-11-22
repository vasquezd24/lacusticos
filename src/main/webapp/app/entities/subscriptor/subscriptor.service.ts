import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISubscriptor } from 'app/shared/model/subscriptor.model';

type EntityResponseType = HttpResponse<ISubscriptor>;
type EntityArrayResponseType = HttpResponse<ISubscriptor[]>;

@Injectable({ providedIn: 'root' })
export class SubscriptorService {
  public resourceUrl = SERVER_API_URL + 'api/subscriptors';
  public countURL = SERVER_API_URL + 'api/subscriptors/entrepreneur';

  constructor(protected http: HttpClient) {}

  create(subscriptor: ISubscriptor): Observable<EntityResponseType> {
    return this.http.post<ISubscriptor>(this.resourceUrl, subscriptor, { observe: 'response' });
  }

  update(subscriptor: ISubscriptor): Observable<EntityResponseType> {
    return this.http.put<ISubscriptor>(this.resourceUrl, subscriptor, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISubscriptor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubscriptor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findByEntrepreneur(id: number | undefined, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubscriptor[]>(`${this.countURL}/${id}`, { params: options, observe: 'response' });
  }
}
