import { Component, OnInit } from '@angular/core';
import { Good } from '../../@models/Good';
import { environment } from '../../../../environments/environment';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GoodService } from '../../@services/good.service';
import { FormBuilder } from '@angular/forms';
import { LikeService } from '../../@services/like.service';
import { User } from '../../@models/user';
import { AuthService } from '../../@services/auth.service';
import { Like } from '../../@models/like';


@Component({
  selector: 'app-farsh-card',
  templateUrl: './farsh-card.component.html',
  styleUrls: ['./farsh-card.component.css']
})
export class FarshCardComponent implements OnInit {
  [x: string]: any;

  good: Good;
  like: Like
  successMessage: string = 'کاربر گرامی نظر شما در سیستم ثبت شد';
  errorMessage: string = environment.error;
  constructor(private goodService: GoodService, private router: Router,
     private fb: FormBuilder, private route: ActivatedRoute, private likeService: LikeService, private authService: AuthService) { }
     saveState: string = "0";
     model: any = {};
     _id: any;

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this._id = param['id'];
        if(this._id != -1) {
          this.route.data.subscribe(data => {
            this.good = data['good'];
            if(data['like'])
              this.model = data['like'];
          });
        }
      }, error => {console.log(error)}, () => {

      }
    )
  }
  likeId: number;
  sendLike() {
    if(!this.loggedIn) {
      this.errorMessage = "لطفا وارد سایت شوید";
    } else {
      const token = localStorage.getItem('token');
      const user: User = JSON.parse(localStorage.getItem('user'));

      // if (token) {
      //   this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      //   if(this.authService.decodedToken.nameid != null)
      //     userId = this.authService.decodedToken.nameid;
      // }
      // if (userId) {
      //   this.authService.currentUser = user;
      //   userId = user.id;
      // }
      if(!user.id) {
        this.errorMessage = "لطفا وارد سایت شوید";
        return null;
      }

      this.model.srl = this._id;
      this.model.userId = user.id;
      this.likeService.saveLike(this.model).subscribe(() => {
        this.saveState = "1";
        this.likeId = this.likeService.likeId;
      }, error => {
        this.saveState = error.error;
        this.errorMessage = error.error
        }, () => {
          this.saveState = "1";
      });
    }

  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
