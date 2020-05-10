import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../../@models/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Like } from '../../@models/like';
import { LikeService } from '../../@services/like.service';

@Component({
  selector: 'app-like-managment',
  templateUrl: './like-managment.component.html'
})
export class LikeManagmentComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
    private likeService: LikeService) { }
 page = 1;
 pagination: Pagination;
 userParams: any = {};

 likes: Like[];
 like: Like;
 saveState: string = "0";

 successMessage: string = environment.successful;
 errorMessage: string = environment.error;


 ngOnInit() {
   this.route.data.subscribe(data => {
     this.likes = data['likes'].result;
     this.pagination = data['likes'].pagination;
   });
 }


 pageChanged(event: any): void {
   this.pagination.currentPage = event.page;
   this.loadLikess();
 }

 loadLikess() {
   this.likeService.getAllLikes(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
     .subscribe((res: PaginatedResult<Like[]>) => {
       this.likes = res.result;
       this.pagination = res.pagination;
   }, error => {

   }, () => {this.page = this.pagination.currentPage});
 }


}
