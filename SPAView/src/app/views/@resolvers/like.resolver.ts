import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Like } from '../@models/like';
import { LikeService } from '../@services/like.service';


@Injectable()
export class LikeResolver implements Resolve<Like> {


    constructor(private likeService: LikeService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Like> | Promise<Like> | Like {
      if(route.params['id'] != -1) {
        return this.likeService.getLike(route.params['id'], 'id').pipe(catchError(error => {
          this.router.navigate(['/dashboard/login']);
          return of(null);
      })
  );
      } else {
        return null;
      }
    }
}
