import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../@models/pagination';

import { StringModel, NameModel } from '../@models/dropDown';
import { environment } from '../../../environments/environment';
import { KeyValue } from '../@models/keyvalue';

@Injectable({providedIn: 'root'})
export class KeyValueService {

  baseUrl = environment.apiUrl + 'keyvalue';

  constructor(private http: HttpClient) {}
  keyvalues: KeyValue[];
  keyvalue: KeyValue;

  getKeyValues(): Observable<KeyValue[]> {
    return this.http.get<KeyValue[]>(this.baseUrl + "/getKeyValues", { observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})})
    .pipe(map((response: any) => { this.keyvalues = response.body;
      return this.keyvalues;
    }));
  }

  keyvalueId: any;
  saveKeyvalue(model: KeyValue) {
    return this.http.post(this.baseUrl + '/saveKeyValue', model, {observe: 'response'}).pipe(
      map((response: any) => {
        const createdKeuvalue = response.body;
         this.keyvalueId = createdKeuvalue.id;
      })
    );
  }
}
