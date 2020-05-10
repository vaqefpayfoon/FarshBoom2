import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProjectDto } from '../@models/dashboard';
import { DashboardService } from '../@services/dashboard.service';


@Injectable()
export class ProjectsResolver implements Resolve<ProjectDto[]> {

    constructor(private dashboardService: DashboardService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ProjectDto[]> {
        return this.dashboardService.getProjects()
        .pipe(catchError(error => {
                this.router.navigate(['/dashboard/error']);
                return of(null);
            })
        );
    }
}
