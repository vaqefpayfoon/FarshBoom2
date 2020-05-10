import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FarshboomBankComponent } from './farshboom-bank/farshboom-bank-component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ContentComponent } from './content/content.component';
import { ErrorComponent } from './error/error.component';
import { KeyValuesResolver } from '../@resolvers/keyvalues.resolver';
import { SlidesResolver } from '../@resolvers/sliders.resolver';
import { ProjectsResolver } from '../@resolvers/projects.resolver';
import { BrandsResolver } from '../@resolvers/brands.resolver';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FarshCardComponent } from './farsh-card/farsh-card.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Good2Resolver } from '../@resolvers/good2.resolver';
import { LikeResolver } from '../@resolvers/like.resolver';


@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CarouselModule.forRoot(),
    HttpClientModule,
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule,
  ],
  declarations: [ DashboardComponent, FarshboomBankComponent, RegisterComponent, LoginComponent, ContentComponent,
    ErrorComponent,
    FarshCardComponent  ],
    providers:[BrandsResolver, ProjectsResolver, SlidesResolver, KeyValuesResolver, Good2Resolver, LikeResolver]
})
export class DashboardModule { }
