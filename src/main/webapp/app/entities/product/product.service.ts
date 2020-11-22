import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProduct } from 'app/shared/model/product.model';

type EntityResponseType = HttpResponse<IProduct>;
type EntityArrayResponseType = HttpResponse<IProduct[]>;

@Injectable({ providedIn: 'root' })
export class ProductService {
  public resourceUrl = SERVER_API_URL + 'api/products';
  public entreURL = SERVER_API_URL + 'api/products/entrepreneur';
  public entreAllURL = SERVER_API_URL + 'api/products/entrepreneur-all';
  public activeURL = SERVER_API_URL + 'api/products/active';
  public nameURL = SERVER_API_URL + 'api/products/name';
  public categoryURL = SERVER_API_URL + 'api/products/category';

  constructor(protected http: HttpClient) {}

  create(product: IProduct): Observable<EntityResponseType> {
    return this.http.post<IProduct>(this.resourceUrl, product, { observe: 'response' });
  }

  update(product: IProduct): Observable<EntityResponseType> {
    return this.http.put<IProduct>(this.resourceUrl, product, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProduct>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduct[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findByEntrepreneur(id: number | undefined, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduct[]>(`${this.entreURL}/${id}`, { params: options, observe: 'response' });
  }
  findByEntrepreneurAll(id: number | undefined, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduct[]>(`${this.entreAllURL}/${id}`, { params: options, observe: 'response' });
  }

  findByNameByEntrepreneur(id: number | undefined, name: string | undefined, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduct[]>(`${this.entreURL}/${id}/${name}`, { params: options, observe: 'response' });
  }

  findAllActive(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduct[]>(`${this.activeURL}`, { params: options, observe: 'response' });
  }
  findAllActiveByName(name: string | undefined, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduct[]>(`${this.nameURL}/${name}`, { params: options, observe: 'response' });
  }

  findAllActiveByCategory(category: string | undefined, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduct[]>(`${this.categoryURL}/${category}`, { params: options, observe: 'response' });
  }
}
