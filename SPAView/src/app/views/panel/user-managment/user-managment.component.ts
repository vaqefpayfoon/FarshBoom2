import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../../@models/pagination';
import { User } from '../../@models/user';
import { UserService } from '../../@services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-user-mangment',
  templateUrl: './user-managment.component.html'
})
export class UserManagmentComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }
  page = 1;
	pagination: Pagination;
  userParams: any = {};
  users: User[];
  allUsers: User[];

  protected userName: string;
  user: User;
  saveState: string = "0";

  successMessage: string = environment.successful;
  errorMessage: string = environment.error;

  keyword = 'username';

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.userService.getUsers().subscribe((allUsers: User[]) => {
      this.allUsers = allUsers;
    })
  }


  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
    }, error => {

    }, () => {this.page = this.pagination.currentPage});
  }
  selectedUser: User;
  selectEvent(item: User) {
    // do something with selected item
    this.selectedUser = item;
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    //console.log(val);
  }

  onFocused(e){
    // do something when input is focused
    //console.log(e);
  }

  onAdd() {
    this.router.navigate([-1], { relativeTo: this.route });
  }
  onEdit() {
    this.router.navigate([this.selectedUser.id], { relativeTo: this.route });
  }
  onDelete() {

    this.userService.deleteUser(this.selectedUser.id).subscribe(() => {
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    }, () => {
    })
  }

}
