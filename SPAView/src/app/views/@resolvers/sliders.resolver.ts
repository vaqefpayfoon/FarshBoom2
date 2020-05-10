import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SlideService } from '../@services/slide.service';
import { Slide } from '../@models/slide';


@Injectable()
export class SlidesResolver implements Resolve<Slide[]> {

    constructor(private slideService: SlideService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Slide[]> {
        return this.slideService.getSlides()
        .pipe(catchError(error => {
                this.router.navigate(['/dashboard/error']);
                return of(null);
            })
        );
    }
}
