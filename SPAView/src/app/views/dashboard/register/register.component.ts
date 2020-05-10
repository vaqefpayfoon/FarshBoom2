import { Component, OnInit } from '@angular/core';
import { User } from '../../@models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../@services/auth.service';
import { DropDown } from '../../@models/dropDown';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  user: User;
  registerForm: FormGroup;
  //successMessage = environment.messages;
  successMessage: string;
  errorMessage: string;
  constructor(private authService: AuthService, private router: Router,
     private fb: FormBuilder) { }
     saveState: string = "0";

  ngOnInit() {
    this.createRegisterForm();
  }
  userRoleArr : DropDown[] = [{id: '0', name:'فرش بوم'}, {id: '1', name: 'تامین کننده'}, {id: '2', name:'مشتری'}];

  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      title: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['',],
      email: ['', Validators.email],
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.user.roleType = "2";
      this.authService.register(this.user).subscribe(() => {
          this.saveState = '1';
          this.successMessage = 'اطلاعات با موفقیت ثبت شد';
      }, error => {
          this.saveState = error.error;
          console.log(error.error);
          this.errorMessage = error.error
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/dashboard']);
        });
      });
    }
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
