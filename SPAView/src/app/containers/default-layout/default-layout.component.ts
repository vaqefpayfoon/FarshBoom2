import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService } from '../../views/@services/auth.service';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';
import { CollapseDirective } from 'ngx-bootstrap/collapse';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {

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

  @ViewChild(CollapseDirective, { read: ElementRef, static: false }) collapse !: CollapseDirective;

  collapseRef;

  ngAfterViewChecked (): void {
    this.collapseRef = this.collapse;
  }

  constructor(public authService: AuthService,
    private router: Router, private renderer: Renderer2) {
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
