import { Component, Renderer2, ViewChild, ElementRef, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService } from '../../views/@services/auth.service';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';
import { CollapseDirective } from 'ngx-bootstrap/collapse';
import { Page } from '../../views/@models/Page';
import { PageService } from '../../views/@services/page.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {

  constructor(public authService: AuthService,
    private router: Router, private renderer: Renderer2, private pageService: PageService) {
      //this.navItems = navItems.filter(x => x.variant  == null);

      if(this.authService.decodedToken == undefined) {
        this.navItems = navItems.filter(x => x.variant  == null);
      } else {
        let rolType: string = this.authService.decodedToken.role;
        if(rolType) {
          this.navItems = navItems.filter(x => x.variant != null ? x.variant.includes(rolType) : false ||
          x.variant == null);
        } if(rolType == undefined || rolType == null) {
          this.navItems = navItems.filter(x => x.variant == null);
        }
      }
    }

  private _isCollapsed: boolean = true;
  set isCollapsed(value) {
    this._isCollapsed = value;
  }
  get isCollapsed() {
    if (this.collapseRef) {
      // temp fix for "overflow: hidden"
      if (getComputedStyle(this.collapseRef.nativeElement).getPropertyValue('display') === 'flex') {
       this.renderer.removeStyle(this.collapseRef.nativeElement, 'overflow');
      }
    }
    return this._isCollapsed;
  }

  pages: Page[];

  menu1: Page[];
  menu2: Page[];
  menu3: Page[];
  menu4: Page[];
  menu5: Page[];
  menu6: Page[];
  menu7: Page[];
  ngOnInit(): void {
    this.pageService.getPages().subscribe((_pages: Page[]) => {
      this.menu1 = _pages.filter(woak => woak.menuId == 1);
      this.menu2 = _pages.filter(woak => woak.menuId == 2);
      this.menu3 = _pages.filter(woak => woak.menuId == 3);
      this.menu4 = _pages.filter(woak => woak.menuId == 4);
      this.menu5 = _pages.filter(woak => woak.menuId == 5);
      this.menu6 = _pages.filter(woak => woak.menuId == 6);
      this.menu7 = _pages.filter(woak => woak.menuId == 7);
    });
    // this.pageService.getPageContents().subscribe((_pageContents: PageContent[]) => {
    //   this.pageContents = _pageContents;
    //   console.log(this.pageContents);
    // })
  }

  @ViewChild(CollapseDirective, { read: ElementRef, static: false }) collapse !: CollapseDirective;

  collapseRef;

  ngAfterViewChecked (): void {
    this.collapseRef = this.collapse;
  }

  public sidebarMinimized = false;
  navItems : INavData[];

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;

    this.router.navigate(['/dashboard']);
  }
}
