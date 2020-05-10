import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { Slide } from '../../@models/slide';
import { SlideService } from '../../@services/slide.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html'
})
export class SliderComponent implements OnInit {

  slide: Slide;

  registerForm: FormGroup;
  successMessage: string = environment.successful;
  errorMessage: string = environment.error;
  constructor(private slideService: SlideService, private router: Router,
     private fb: FormBuilder, private route: ActivatedRoute) { }
     saveState: string = "0";

  _id: any;

  ngOnInit() {

    this.route.params.subscribe(
      (param: Params) => {
        this._id = param['id'];
        if(this._id != -1) {
          this.route.data.subscribe(data => {
            this.slide = data['slide'];
          });
        }
      }, error => {console.log(error)}, () => {

      }
    )
    this.createRegisterForm();
    setTimeout(() => {

      this._id != -1 ? this.registerForm.patchValue(this.slide) : this.registerForm.reset();
    }, 900);

    this.initializeUploader();
  }

  createRegisterForm() {
    if(this._id == -1) {
      this.registerForm = this.fb.group({
        title: ['', Validators.required],
        passage: ['', Validators.required],
      });
    } else {
      this.registerForm = this.fb.group({
        id: ['', []],
        title: ['', Validators.required],
        passage: ['', Validators.required],
      });
    }
  }

  register() {
    if (this.registerForm.valid) {
      this.slide = Object.assign({}, this.registerForm.value);

      if(this._id == -1) {
        this.slideService.saveSlide(this.slide).subscribe(() => {
          this._id = this.slideService.slideId;
          this.initializeUploader();
          this.router.navigate([`/panel/slide/${this._id}`]);
          this.saveState = '1';
        }, error => {
            this.saveState = error.error;
            this.errorMessage = error.error
        }, () => {
      });
      } else {
        this.slideService.updateSlide(this.slide).subscribe(() => {
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
    this.router.navigate(['/panel/slide']);
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
      url: this.baseUrl + 'slide/'+ this._id +'/photoUpload',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,

    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Slide = JSON.parse(response);
        this.photo = res.imageUrl;
        console.log(response);
      }
    };

  }

}
