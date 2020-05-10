import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../@models/pagination';
import { Good } from '../@models/good';
import { StringModel, NameModel } from '../@models/dropDown';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class GoodService {
  baseUrl = environment.apiUrl + 'good';

  constructor(private http: HttpClient) {}
  goods: Good[];
  good: Good;

  getGoods(): Observable<Good[]> {
    return this.http.get<Good[]>(this.baseUrl + "/getGoods", { observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})})
    .pipe(map((response: any) => { this.goods = response.body;
      return this.goods;
    }));
  }

  getAllGoods(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<Good[]>> {
    const paginatedResult: PaginatedResult<Good[]> = new PaginatedResult<Good[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (userParams != null) {
      if(userParams.orderBy != null){
        params = params.append('orderBy', userParams.orderBy);
      }
      if(userParams.userId != null){
        params = params.append('userId', userParams.userId);
      }
      if(userParams.typeId != null){
        params = params.append('typeId', userParams.typeId);
      }
      if(userParams.sizeId != null){
        params = params.append('sizeId', userParams.sizeId);
      }
      if(userParams.brandId != null){
        params = params.append('brandId', userParams.brandId);
      }
    }
    return this.http.get<Good[]>(this.baseUrl + "/getAllGoods", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getGood(key, field) {
    let params = new HttpParams();
    params = params.append('key', key);
    params = params.append('field', field);
    return this.http.get<Good>(this.baseUrl + "/getGood", { observe: 'response', params }).pipe(map((response: any) => {
      const createdGood = response.body;
      this.good = createdGood.goodDto;
      return this.good;
    }));
  }
  goodnames: string[];
  getGoodNames() {
    return this.http.get<Good>(this.baseUrl + "/getGoodNames", { observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(map((response: any) => {
      const goodName = response.body;
      this.goodnames = goodName;
      return this.goodnames;
    }));
  }

  goodId: any;
  saveGood(model: Good) {
    return this.http.post(this.baseUrl + '/saveGood', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        const createdGood = response.body;
         this.goodId = createdGood.id;
      })
    );
  }

  updateGood(model: Good) {
    return this.http.post(this.baseUrl + '/updateGood', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  deleteGood(id: number) {
    let name: StringModel = {id: id, name: ''};
    return this.http.post(this.baseUrl + '/deleteGood', name, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

}
