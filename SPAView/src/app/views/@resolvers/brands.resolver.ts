import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BrandDto } from '../@models/dashboard';
import { DashboardService } from '../@services/dashboard.service';


@Injectable()
export class BrandsResolver implements Resolve<BrandDto[]> {

    constructor(private dashboardService: DashboardService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<BrandDto[]> {
        return this.dashboardService.getBrnads()
        .pipe(catchError(error => {
                this.router.navigate(['/dashboard/error']);
                return of(null);
            })
        );
    }
}
