import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService } from '../../views/@services/auth.service';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {

  constructor(public authService: AuthService,
    private router: Router) {
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
