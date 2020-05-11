import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../@models/pagination';
import { User } from '../@models/user';
import { StringModel, NameModel } from '../@models/dropDown';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl + 'user';

  constructor(private http: HttpClient) {}
  users: User[];
  user: User;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + "/getUsers", { observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})})
    .pipe(map((response: any) => { this.users = response.body;
      return this.users;
    }));
  }

  getAllUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (userParams != null) {
      if(userParams.orderBy != null)
        params = params.append('orderBy', userParams.orderBy);
    }
    return this.http.get<User[]>(this.baseUrl + "/getAllUsers", { observe: 'response', params,
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

  getUser(key, field) {
    let params = new HttpParams();
    params = params.append('key', key);
    params = params.append('field', field);
    return this.http.get<User>(this.baseUrl + "/getUser", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')}) }).pipe(map((response: any) => {
      const createdUser = response.body;
      this.user = createdUser.userDto;
      return this.user;
    }));
  }
  usernames: string[];
  getUsernames() {
    return this.http.get<User>(this.baseUrl + "/getUsernames", { observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(map((response: any) => {
      const userName = response.body;
      this.usernames = userName;
      return this.usernames;
    }));
  }

  test(model: User) {
    let stringModel: StringModel = {id: '', name: 'model'};
    return this.http.post(this.baseUrl + '/default', stringModel, {observe: 'response'}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }
  userId: any;
  saveUser(model: User) {
    return this.http.post(this.baseUrl + '/saveUser', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        const createdUser = response.body;
         this.userId = createdUser.id;
      })
    );
  }

  updateUser(model: User) {
    return this.http.post(this.baseUrl + '/updateUser', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  deleteUser(id: number) {
    let name: StringModel = {id: id, name: ''};
    return this.http.post(this.baseUrl + '/deleteUser', name, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

}
