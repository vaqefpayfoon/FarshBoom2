import { Component, OnInit } from '@angular/core';
import { User } from '../../@models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DropDown } from '../../@models/dropDown';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../@services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  user: User;
  registerForm: FormGroup;
  successMessage: string = environment.successful;
  errorMessage: string = environment.error;
  constructor(private userService: UserService, private router: Router,
     private fb: FormBuilder, private route: ActivatedRoute) { }
     saveState: string = "0";

     _id: any;
  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this._id = param['id'];
        if(this._id != -1) {
          this.route.data.subscribe(data => {
            this.user = data['user'];
          });
        }
      }, error => {console.log(error)}, () => {

      }
    )
    this.createRegisterForm();
    setTimeout(() => {

      this._id != -1 ? this.registerForm.patchValue(this.user) : this.registerForm.reset();

      this._id != -1 ? this.registerForm.patchValue({'roleType': this.user.roleType.toString(),
        'gender': this.user.gender == 'Male' ? '0' : '1'})
       : this.registerForm.reset();
    }, 900);
  }
  userRoleArr : DropDown[] = [{id: 'Admin', name:'فرش بوم'}, {id: 'Provider', name: 'تامین کننده'}, {id: 'Customer', name:'مشتری'}];

  createRegisterForm() {
    if(this._id == -1) {
      this.registerForm = this.fb.group({
        title: ['', Validators.required],
        username: ['', Validators.required],
        roleType: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
        confirmPassword: ['', Validators.required],
        gender: ['', Validators.required],
        phone: ['',],
        email: ['', Validators.email],
      }, {validator: this.passwordMatchValidator});
    } else {
      this.registerForm = this.fb.group({
        id: ['', []],
        title: ['', Validators.required],
        username: ['', Validators.required],
        roleType: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
        confirmPassword: ['', Validators.required],
        gender: ['', Validators.required],
        phone: ['',],
        email: ['', Validators.email],
      }, {validator: this.passwordMatchValidator});
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      if(this._id == -1) {
        this.userService.saveUser(this.user).subscribe(() => {
          this.saveState = '1';
        }, error => {
            this.saveState = error.error;
            this.errorMessage = error.error
        }, () => {
      });
      } else {
        this.userService.updateUser(this.user).subscribe(() => {
          this.saveState = '1';
        }, error => {
            this.saveState = error.error;
            this.errorMessage = error.error
        }, () => {
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['/panel/user']);
  }

}
