import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RegisterComponent } from './register/register.component';
import { FarshboomBankComponent } from './farshboom-bank/farshboom-bank-component';
import { ContentComponent } from './content/content.component';
import { BrandsResolver } from '../@resolvers/brands.resolver';
import { ErrorComponent } from './error/error.component';
import { ProjectsResolver } from '../@resolvers/projects.resolver';
import { SlidesResolver } from '../@resolvers/sliders.resolver';
import { KeyValuesResolver } from '../@resolvers/keyvalues.resolver';
import { LoginComponent } from './login/login.component';
import { FarshCardComponent } from './farsh-card/farsh-card.component';
import { Good2Resolver } from '../@resolvers/good2.resolver';
import { LikeResolver } from '../@resolvers/like.resolver';



const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: '',
      urls: [
        { title: 'Dashboard', url: '/register' },
        { title: 'ngComponent' },
        { title: 'Button' }
      ]
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: '',
      urls: [
        { title: 'Dashboard', url: '/login' },
        { title: 'ngComponent' },
        { title: 'Button' }
      ]
    }
  },
  {
    path: 'farshboombank',
    component: FarshboomBankComponent,
    data: {
      title: '',
      urls: [
        { title: 'Dashboard', url: '/register' },
        { title: 'ngComponent' },
        { title: 'Button' }
      ]
    }
  },
  {
    path: 'farshboombank/:id',
    component: FarshCardComponent,
    resolve: {good: Good2Resolver, like: LikeResolver},
    data: {
      title: '',
      urls: [
        { title: 'Dashboard', url: '/register' },
        { title: 'ngComponent' },
        { title: 'Button' }
      ]
    }
  },
  {
    path: 'content/:id',
      component: ContentComponent,
      data: {
        title: '',
        urls: [
          { title: 'Dashboard', url: '/content' },
          { title: 'ngComponent' },
          { title: 'Button' }
        ]
      }
    },
    {
      path: 'error',
      component: ErrorComponent,
      data: {
        title: 'عملیات ناموفق',
        urls: [
          { title: 'Dashboard', url: '/error' },
          { title: 'ngComponent' },
          { title: 'Button' }
        ]
      }
    },
    {
        path: 'dashboard',
        resolve: {brands: BrandsResolver, projects: ProjectsResolver, slides: SlidesResolver},
        data: {
            title: '',
            urls: [
                { title: 'Dashboard', url: '/dashboard' },
                { title: 'Dashboard' }
            ]
        },
        component: DashboardComponent
    },
  {
      path: '**',
      resolve: {brands: BrandsResolver, projects: ProjectsResolver, slides: SlidesResolver, keyvalues: KeyValuesResolver},
      data: {
          title: '',
          urls: [
              { title: 'Dashboard', url: '/dashboard' },
              { title: 'Dashboard' }
          ]
      },
      component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
