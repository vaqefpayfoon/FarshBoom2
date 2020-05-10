import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SlideService } from '../@services/slide.service';
import { Slide } from '../@models/slide';


@Injectable()
export class SlideResolver implements Resolve<Slide> {

    constructor(private slideService: SlideService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Slide> | Promise<Slide> | Slide {
      if(route.params['id'] != -1) {
        return this.slideService.getSlide(route.params['id'], 'id').pipe(catchError(error => {
          this.router.navigate(['/dashboard/error']);
          return of(null);
      })
  );
      } else {
        return null;
      }
  }
}
