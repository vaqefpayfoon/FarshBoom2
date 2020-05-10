import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../../@models/pagination';
import { Good } from '../../@models/Good';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { GoodService } from '../../@services/good.service';

@Component({
  selector: 'app-carpet-mangment',
  templateUrl: './carpet-mangment.component.html'
})
export class CarpetMangmentComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
     private goodService: GoodService) { }
  page = 1;
	pagination: Pagination;
  userParams: any = {};
  goods: Good[];
  allGoods: Good[];
  good: Good;
  saveState: string = "0";

  successMessage: string = environment.successful;
  errorMessage: string = environment.error;

  keyword = 'providerCode';

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.goods = data['goods'].result;
      this.pagination = data['goods'].pagination;
    });
    this.goodService.getGoods().subscribe((allGoods: Good[]) => {
      this.allGoods = allGoods;
    })
  }


  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadGoods();
  }

  loadGoods() {
    this.goodService.getAllGoods(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<Good[]>) => {
        this.goods = res.result;
        this.pagination = res.pagination;
    }, error => {

    }, () => {this.page = this.pagination.currentPage});
  }
  selectedGood: Good;
  selectEvent(item: Good) {
    this.selectedGood = item;
  }

  onAdd() {
    this.router.navigate([-1], { relativeTo: this.route });
  }
  onEdit() {
    this.router.navigate([this.selectedGood.id], { relativeTo: this.route });
  }
  onDelete() {

    this.goodService.deleteGood(this.selectedGood.id).subscribe(() => {
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    }, () => {
    })
  }

}
