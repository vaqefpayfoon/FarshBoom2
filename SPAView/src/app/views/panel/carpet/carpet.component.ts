import { Component, OnInit } from '@angular/core';
import { Good } from '../../@models/good';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { GoodService } from '../../@services/good.service';
import { BaseService } from '../../@services/base.service';
import { Size, Type, Brand, Plan, Color, Porz, Chele, Assessment, Raj } from '../../@models/base';
import { User } from '../../@models/user';
import { AuthService } from '../../@services/auth.service';

@Component({
  selector: 'app-carpet',
  templateUrl: './carpet.component.html'
})
export class CarpetComponent implements OnInit {

  good: Good;
  registerForm: FormGroup;
  successMessage: string = environment.successful;
  errorMessage: string = environment.error;
  constructor(private goodService: GoodService, private router: Router,
     private fb: FormBuilder, private route: ActivatedRoute, private baseService: BaseService,
     private authService: AuthService) { }
     saveState: string = "0";

  _id: any;

  sizes: Size[];
  types: Type[];
  brands: Brand[];
  plans: Plan[];
  colors: Color[];
  porzs: Porz[];
  cheles: Chele[];
  assessments: Assessment[];
  rajs: Raj[];
  users: User[];

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this._id = param['id'];
        if(this._id != -1) {
          this.route.data.subscribe(data => {
            this.good = data['good'];
          });
        }
      }, error => {console.log(error)}, () => {

      }
    )
    this.baseService.getBase().subscribe((res) => {
      this.sizes = res.sizes;
      this.types = res.types;
      this.brands = res.brands;
      this.plans = res.plans;
      this.colors = res.colors;
      this.porzs = res.porzs;
      this.cheles = res.cheles;
      this.assessments = res.assessments;
      this.rajs = res.rajs;
      this.users = res.users;
    })
    this.createRegisterForm();
    setTimeout(() => {

      this._id != -1 ? this.registerForm.patchValue(this.good) : this.registerForm.reset();
    }, 900);

    this.initializeUploader();

  }

  createRegisterForm() {
    if(this._id == -1) {
      this.registerForm = this.fb.group({
        userId: ['', Validators.required],
        sizeId: ['', Validators.required],
        typeId: ['', Validators.required],
        brandId: ['', Validators.required],
        planId: ['', Validators.required],
        colorId: ['', Validators.required],
        colorId2: ['', Validators.required],
        assessmentId: ['', Validators.required],
        porzId: ['', Validators.required],
        cheleId: ['', Validators.required],
        rajId: ['', Validators.required],
        providerCode: ['', Validators.required],
        lenght: ['', Validators.required],
        width: ['', Validators.required],
        title: [''],
      });
    } else {
      this.registerForm = this.fb.group({
        id: ['', []],
        userId: ['', Validators.required],
        sizeId: ['', Validators.required],
        typeId: ['', Validators.required],
        brandId: ['', Validators.required],
        planId: ['', Validators.required],
        colorId: ['', Validators.required],
        colorId2: ['', Validators.required],
        assessmentId: ['', Validators.required],
        porzId: ['', Validators.required],
        cheleId: ['', Validators.required],
        rajId: ['', Validators.required],
        providerCode: ['', Validators.required],
        lenght: ['', Validators.required],
        width: ['', Validators.required],
        title: [''],
      });
    }
  }

  register() {
    if (this.registerForm.valid) {
      this.good = Object.assign({}, this.registerForm.value);
      this.good.slider = false;
      if(this._id == -1) {
        this.goodService.saveGood(this.good).subscribe(() => {
          this._id = this.goodService.goodId;
          this.initializeUploader();
          this.router.navigate([`/panel/carpet/${this._id}`]);
          this.saveState = '1';
        }, error => {
            this.saveState = error.error;
            this.errorMessage = error.error
        }, () => {
      });
      } else {
        this.goodService.updateGood(this.good).subscribe(() => {
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
    this.router.navigate(['/panel/carpet']);
  }

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  photo: string;
  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'good/'+ this._id +'/photoUpdate',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 3 * 500 * 500,

    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Good = JSON.parse(response);
        console.log(response);
        this.photo = res.imageUrl;
      }
    };

  }

}
