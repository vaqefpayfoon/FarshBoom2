import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../../@models/pagination';
import { Good } from '../../@models/Good';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Size, Type, Brand, Color, Porz, Plan, Chele, Assessment, Raj} from '../../@models/base';
import { BaseService } from '../../@services/base.service';
import { DashboardService } from '../../@services/dashboard.service';
import { User } from '../../@models/user';

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
 plans: Plan[];
 colors: Color[];
 porzs: Porz[];
 cheles: Chele[];
 assessments: Assessment[];
 rajs: Raj[];

 successMessage: string = environment.successful;
 errorMessage: string = environment.error;

 keyword = 'providerCode';

 ngOnInit() {

   this.baseService.getBase().subscribe((res) => {
    this.sizes = res.sizes;
    this.types = res.types;
    this.brands = res.brands;
    this.plans = res.plans;
    this.colors = res.colors;
    this.porzs = res.porzs;
    this.cheles = res.cheles;
    this.assessments = res.assessments;
    this.rajs = res.rajs;
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
  this.userParams.chele = null;
  this.userParams.assessment = null;
  this.userParams.raj = null;
  this.userParams.plan = null;
  this.userParams.fromPrice = null;
  this.userParams.toPrice = null;
  this.loadGoods();
}

sendLike(good: Good) {
  this.router.navigate([good.id], { relativeTo: this.route });
}

}
