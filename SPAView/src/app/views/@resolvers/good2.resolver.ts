import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GoodService } from '../@services/good.service';
import { Good } from '../@models/good';
import { DashboardService } from '../@services/dashboard.service';


@Injectable()
export class Good2Resolver implements Resolve<Good> {


    constructor(private dashboardServie: DashboardService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Good> | Promise<Good> | Good {
      if(route.params['id'] != -1) {
        return this.dashboardServie.getGood(route.params['id'], 'id').pipe(catchError(error => {
          this.router.navigate(['/dashboard/error']);
          return of(null);
      })
  );
      } else {
        return null;
      }
    }
}
