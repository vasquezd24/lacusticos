import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEntrepreneur } from 'app/shared/model/entrepreneur.model';

type EntityResponseType = HttpResponse<IEntrepreneur>;
type EntityArrayResponseType = HttpResponse<IEntrepreneur[]>;

@Injectable({ providedIn: 'root' })
export class EntrepreneurService {
  public resourceUrl = SERVER_API_URL + 'api/entrepreneurs';

  constructor(protected http: HttpClient) {}

  create(entrepreneur: IEntrepreneur): Observable<EntityResponseType> {
    return this.http.post<IEntrepreneur>(this.resourceUrl, entrepreneur, { observe: 'response' });
  }

  update(entrepreneur: IEntrepreneur): Observable<EntityResponseType> {
    return this.http.put<IEntrepreneur>(this.resourceUrl, entrepreneur, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEntrepreneur>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEntrepreneur[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
