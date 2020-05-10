import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Slide } from '../@models/slide';
import { environment } from '../../../environments/environment';
import { StringModel } from '../@models/dropDown';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  baseUrl = environment.apiUrl + 'slide';

  constructor(private http: HttpClient) {}
  slides: Slide[];
  slide: Slide;

  getSlides(): Observable<Slide[]> {
    return this.http.get<Slide[]>(this.baseUrl + "/getSlides", { observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})})
    .pipe(map((response: any) => { this.slides = response.body;
      return this.slides;
    }));
  }

  getSlide(key, field) {
    let params = new HttpParams();
    params = params.append('key', key);
    params = params.append('field', field);
    return this.http.get<Slide>(this.baseUrl + "/getSlide", { observe: 'response', params }).pipe(map((response: any) => {
      this.slide = response.body;
      return this.slide;
    }));
  }

  slideId: any;
  saveSlide(model: Slide) {
    return this.http.post(this.baseUrl + '/saveSlide', model, {observe: 'response'}).pipe(
      map((response: any) => {
        const createdSlide = response.body;
         this.slideId = createdSlide.id;
      })
    );
  }

  updateSlide(model: Slide) {
    return this.http.post(this.baseUrl + '/updateSlide', model, {observe: 'response'}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  deleteSlide(id: number) {
    let name: StringModel = {id: id, name: ''};
    return this.http.post(this.baseUrl + '/deleteSlide', name, {observe: 'response'}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

}
