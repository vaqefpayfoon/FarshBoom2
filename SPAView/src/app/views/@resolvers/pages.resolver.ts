import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PageService } from '../@services/page.service';
import { Page } from '../@models/page';


@Injectable()
export class PagesResolver implements Resolve<Page[]> {


    constructor(private pageService: PageService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Page[]> | Promise<Page[]> | Page[] {
        return this.pageService.getPages()
        .pipe(catchError(error => {
                this.router.navigate(['/dashboard/error']);
                return of(null);
            })
        );
    }
}
