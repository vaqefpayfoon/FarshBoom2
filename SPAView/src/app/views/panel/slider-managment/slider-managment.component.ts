import { Component, OnInit, ViewChild, ViewChildren, Input, ElementRef } from '@angular/core';
import { Pagination, PaginatedResult } from '../../@models/pagination';
import { Good } from '../../@models/Good';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { GoodService } from '../../@services/good.service';
import { Size, Type, Brand} from '../../@models/base';
import { User } from '../../@models/user';
import { BaseService } from '../../@services/base.service';

@Component({
  selector: 'app-slider-managment',
  templateUrl: './slider-managment.component.html',
  styleUrls: ['./slider-managment.component.css']
})
export class SliderManagmentComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
    private goodService: GoodService, private baseService: BaseService) { }

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
 users: User[];

 successMessage: string = environment.successful;
 errorMessage: string = environment.error;

 keyword = 'providerCode';

 ngOnInit() {
   this.route.data.subscribe(data => {
     this.goods = data['goods'].result;
     this.pagination = data['goods'].pagination;
   });

   this.baseService.getSliderBase().subscribe((res) => {
    this.sizes = res.sizes;
    this.types = res.types;
    this.brands = res.brands;
    this.users = res.users;
  })

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

 resetFilters() {
  this.userParams.pageNumber = 1;
  this.userParams.pageSize = 5;
  this.userParams.userId = null;
  this.userParams.typeId = null;
  this.userParams.sizeId = null;
  this.userParams.brandId = null;
  this.loadGoods();
}

checkValue() {
    // this.goods.forEach(woak => {
    //   var item = document.getElementById(woak.id.toString()) as HTMLElement;
    // });
    console.log(this.good.slider);
  }
  isChecked: boolean;
}
