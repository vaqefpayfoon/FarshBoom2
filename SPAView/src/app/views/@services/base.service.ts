import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Size, Type, Brand, Plan, Color, Porz, Chele, Assessment, Raj } from '../@models/base';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  baseUrl = environment.apiUrl + 'base';

  constructor(private http: HttpClient) {}

  size: Size;
  type: Type;
  brand: Brand;
  plan: Plan;
  color: Color;
  porz: Porz;
  chele: Chele;
  assessment: Assessment;
  raj: Raj;

  getBase() {
    return this.http.get<any>(this.baseUrl + "/getBase", { observe: 'response'}).pipe(map((response: any) => {
      const res = response.body;
      return res;
    }));
  }

  getSliderBase() {
    return this.http.get<any>(this.baseUrl + "/getSliderBase", { observe: 'response'}).pipe(map((response: any) => {
      const res = response.body;
      return res;
    }));
  }

  getBase1(entity) {
    let params = new HttpParams();
    params = params.append('entity', entity);
    return this.http.get<any>(this.baseUrl + "/getBase", { observe: 'response', params }).pipe(map((response: any) => {
      const createdBase = response.body;
      switch(entity) {
        case "size": {
           this.size = createdBase;
           return this.size;
           break;
        }
        case "type": {
          this.type = createdBase;
          return this.type;
          break;
        }
        case "brand": {
          this.brand = createdBase;
          return this.brand;
          break;
        }
        case "plan": {
          this.plan = createdBase;
          return this.plan;
          break;
        }
        case "color": {
          this.color = createdBase;
          return this.color;
          break;
        }
        case "porz": {
          this.porz = createdBase;
          return this.porz;
          break;
        }
        case "chele": {
          this.chele = createdBase;
          return this.chele;
          break;
        }
        case "assessment": {
          this.assessment = createdBase;
          return this.assessment;
          break;
        }
        case "raj": {
          this.raj = createdBase;
          return this.raj;
          break;
        }
        default: {
           //statements;
           break;
        }
     }
    }));
  }

}
