import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { BrandDto, ProjectDto } from '../@models/dashboard';
import { Good } from '../@models/Good';
import { PaginatedResult } from '../@models/pagination';

@Injectable({providedIn: 'root'})

export class DashboardService {
  baseUrl = environment.apiUrl + 'dashboard';

  constructor(private http: HttpClient) {}
  brnads: BrandDto[];
  projects: ProjectDto[]

  getBrnads(): Observable<BrandDto[]> {
    return this.http.get<BrandDto[]>(this.baseUrl + "/getBrnads", { observe: 'response'})
    .pipe(map((response: any) => { const res = response.body;
      return res;
    }));
  }

  getProjects(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(this.baseUrl + "/getProjects", { observe: 'response'})
    .pipe(map((response: any) => { this.projects = response.body;
      return this.projects;
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

      if(userParams.porzId != null){
        params = params.append('porzId', userParams.porzId);
      }
      if(userParams.colorId != null){
        params = params.append('colorId', userParams.colorId);
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
      if(userParams.length != null){
        params = params.append('length', userParams.length);
      }
      if(userParams.weight != null){
        params = params.append('weight', userParams.weight);
      }
      if(userParams.cheleId != null){
        params = params.append('cheleId', userParams.cheleId);
      }
      if(userParams.rajId != null){
        params = params.append('rajId', userParams.rajId);
      }
      if(userParams.planId != null){
        params = params.append('planId', userParams.planId);
      }
      if(userParams.assessmentId != null){
        params = params.append('assessmentId', userParams.assessmentId);
      }
      if(userParams.fromPrice != null){
        params = params.append('fromPrice', userParams.fromPrice);
      }
      if(userParams.toPrice != null){
        params = params.append('toPrice', userParams.toPrice);
      }
    }
    return this.http.get<Good[]>(this.baseUrl + "/getAllGoods", { observe: 'response', params})
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

  good: Good;
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
}
