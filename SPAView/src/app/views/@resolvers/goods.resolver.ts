import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GoodService } from '../@services/good.service';
import { Good } from '../@models/good';


@Injectable()
export class GoodsResolver implements Resolve<Good[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private goodService: GoodService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Good[]> {
        return this.goodService.getAllGoods(this.pageNumber, this.pageSize)
        .pipe(catchError(error => {
                this.router.navigate(['/component/error']);
                return of(null);
            })
        );
    }
}
