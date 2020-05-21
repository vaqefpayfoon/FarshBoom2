import { Component, Renderer2, ViewChild, ElementRef, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService } from '../../views/@services/auth.service';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';
import { CollapseDirective } from 'ngx-bootstrap/collapse';
import { Page, PageContent } from '../../views/@models/Page';
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
  pageContents1: PageContent[];
  pageContents2: PageContent[];
  pageContents3: PageContent[];
  pageContents4: PageContent[];
  pageContents5: PageContent[];
  pageContents6: PageContent[];
  pageContents7: PageContent[];

  ngOnInit(): void {
    this.pageService.getPages().subscribe((_pages: Page[]) => {
      this.pages = _pages;
    });
    this.pageService.getPageContents().subscribe((_pageContents: PageContent[]) => {
      this.pageContents1 = _pageContents.filter(woak => woak.pageId == 10);
      this.pageContents2 = _pageContents.filter(woak => woak.pageId == 11);
      this.pageContents3 = _pageContents.filter(woak => woak.pageId == 12);
      this.pageContents4 = _pageContents.filter(woak => woak.pageId == 13);
      this.pageContents5 = _pageContents.filter(woak => woak.pageId == 14);
      this.pageContents6 = _pageContents.filter(woak => woak.pageId == 15);
      this.pageContents7 = _pageContents.filter(woak => woak.pageId == 16);

    })
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
