import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../@services/user.service';
import { User } from '../@models/user';


@Injectable()
export class UsersResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private userService: UserService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getAllUsers(this.pageNumber, this.pageSize)
        .pipe(catchError(error => {
                this.router.navigate(['/dashboard/error']);
                return of(null);
            })
        );
    }
}
