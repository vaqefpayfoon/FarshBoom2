import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

  //BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule
import { CarpetMangmentComponent } from '../panel/carpet-mangment/carpet-mangment.component';
import { CarpetComponent } from '../panel/carpet/carpet.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';
import { UserComponent } from '../panel/user/user.component';
import { SliderManagmentComponent } from '../panel/slider-managment/slider-managment.component';
import { SliderComponent } from '../panel/slider/slider.component';
import { PanelRoutes } from './panel.routing';
import { UsersResolver } from '../@resolvers/users.resolver';
import { UserResolver } from '../@resolvers/user.resolver';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { GoodsResolver } from '../@resolvers/goods.resolver';
import { GoodResolver } from '../@resolvers/good.resolver';
import { FileUploadModule } from 'ng2-file-upload';
import { PageContentManagmentComponent } from './page-content-managment/page-content-managment.component';
import { PageContentComponent } from './page-content/page-content.component';
import { SlidesResolver } from '../@resolvers/sliders.resolver';
import { PageContentResolver } from '../@resolvers/pageContent.resolver';
import { PagesResolver } from '../@resolvers/pages.resolver';
import { PageContentsResolver } from '../@resolvers/pageContents.resolver';
import { SliderListComponent } from './slider-list/slider-list.component';
import { SlideResolver } from '../@resolvers/slide.resolver';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { LikeManagmentComponent } from './like-managment/like-managment.component';
import { LikesResolver } from '../@resolvers/likes.resolver';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PanelRoutes),
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AutocompleteLibModule,
    FileUploadModule,
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  declarations: [
    CarpetMangmentComponent,
    CarpetComponent,
    UserManagmentComponent,
    UserComponent,
    SliderManagmentComponent,
    SliderComponent,
    PageContentComponent,
    PageContentManagmentComponent,
    SliderListComponent,
    FileManagerComponent,
    LikeManagmentComponent
  ],
  providers: [
    UsersResolver,
    UserResolver,
    GoodsResolver,
    GoodResolver,
    SlidesResolver,
    PageContentResolver,
    PagesResolver,
    PageContentsResolver,
    SlideResolver,
    LikesResolver
  ]
})
export class PanelModule {}
