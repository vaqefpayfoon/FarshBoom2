import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Like } from '../@models/like';
import { LikeService } from '../@services/like.service';



@Injectable()
export class LikesResolver implements Resolve<Like[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private likeService: LikeService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Like[]> {
        return this.likeService.getAllLikes(this.pageNumber, this.pageSize)
        .pipe(catchError(error => {
                this.router.navigate(['/component/error']);
                return of(null);
            })
        );
    }
}
