import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../../@models/pagination';
import { Good } from '../../@models/Good';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Size, Type, Brand, Color, Porz} from '../../@models/base';
import { BaseService } from '../../@services/base.service';
import { DashboardService } from '../../@services/dashboard.service';

@Component({
  selector: 'app-farshboom-bank',
  templateUrl: './farshboom-bank-component.html',
  styleUrls: ['./farshboom-bank-component.css']
})
export class FarshboomBankComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
    private baseService: BaseService, private dashboardService: DashboardService) {
      this.pagination = {currentPage: 1, itemsPerPage: 20, totalItems: 20, totalPages: 10};

     }

 page = 1;
 pagination: Pagination;
 userParams: any = {};
 goods: Good[];
 allGoods: Good[];
 good: Good;
 saveState: string = "0";

 sizes: Size[];
 types: Type[];
 brands: Brand[];
 porzs: Porz[];
 colors: Color[];

 successMessage: string = environment.successful;
 errorMessage: string = environment.error;

 keyword = 'providerCode';

 ngOnInit() {

   this.baseService.getSliderBase().subscribe((res) => {
    this.sizes = res.sizes;
    this.types = res.types;
    this.brands = res.brands;
    this.porzs = res.porzs;
    this.colors = res.colors;
  })

 }


 pageChanged(event: any): void {
   this.pagination.currentPage = event.page;
   this.loadGoods();
 }

 loadGoods() {
   this.dashboardService.getAllGoods(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
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

 resetFilters() {
  this.userParams.pageNumber = 1;
  this.userParams.pageSize = 5;
  this.userParams.porzId = null;
  this.userParams.colorId = null;
  this.userParams.typeId = null;
  this.userParams.sizeId = null;
  this.userParams.brandId = null;
  this.userParams.weight = null;
  this.userParams.length = null;
  this.loadGoods();
}

sendLike(good: Good) {
  this.router.navigate([good.id], { relativeTo: this.route });
}

}
