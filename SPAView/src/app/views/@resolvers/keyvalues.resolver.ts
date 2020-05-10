import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { KeyValue } from '../@models/keyvalue';
import { KeyValueService } from '../@services/keyvalue.service';


@Injectable()
export class KeyValuesResolver implements Resolve<KeyValue[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private keyvalueService: KeyValueService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<KeyValue[]> {
        return this.keyvalueService.getKeyValues()
        .pipe(catchError(error => {
                this.router.navigate(['/dashboard/error']);
                return of(null);
            })
        );
    }
}
