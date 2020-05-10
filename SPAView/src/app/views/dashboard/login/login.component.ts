import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from '../../@services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(private modalService: NgbModal, public authService: AuthService,
    private router: Router) {}

  model: any = {};

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
    }, error => {
    }, () => {
      this.router.navigate(['/dashboard']);
    });
  }
  onRegister() {
    this.router.navigate(['/dashboard/register']);
  }

}
