import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Like } from '../@models/like';
import { PaginatedResult } from '../@models/pagination';

@Injectable({providedIn: 'root'})
export class LikeService {
  baseUrl = environment.apiUrl + 'like';

  constructor(private http: HttpClient) {}
  likes: Like[];
  like: Like;

  likeId: any;
  saveLike(model: Like) {
    return this.http.post(this.baseUrl + '/saveLike', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        const createdLike = response.body;
         this.likeId = createdLike.id;
      })
    );
  }

  getAllLikes(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<Like[]>> {
    const paginatedResult: PaginatedResult<Like[]> = new PaginatedResult<Like[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Like[]>(this.baseUrl + "/getAllLikes", { observe: 'response', params,
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

  getLike(key, field) {
    let params = new HttpParams();
    params = params.append('key', key);
    params = params.append('field', field);
    return this.http.get<Like>(this.baseUrl + "/getLike", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')}) }).pipe(map((response: any) => {
      const createdLike = response.body;
      this.like = createdLike.likeDto;
      return this.like;
    }));
  }

}
