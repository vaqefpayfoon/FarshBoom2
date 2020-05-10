import { Component, OnInit } from '@angular/core';
import { PageContent, Page } from '../../@models/Page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { PageService } from '../../@services/page.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html'
})
export class PageContentComponent implements OnInit {

  pageContent: PageContent;

  pages: Page[];
  page: any;
  pageContents: PageContent[];
  registerForm: FormGroup;
  successMessage: string = environment.successful;
  errorMessage: string = environment.error;
  constructor(private pageService: PageService, private router: Router,
     private fb: FormBuilder, private route: ActivatedRoute) { }
     saveState: string = "0";

  _id: any;

  ngOnInit() {

    this.route.params.subscribe(
      (param: Params) => {
        this._id = param['id'];
        if(this._id != -1) {
          this.route.data.subscribe(data => {
            this.pages = data['pages'];
            this.pageContent = data['pageContent'];
          });
        } else {
          if(this._id == -1) {
            this.route.data.subscribe(data => {
              this.pages = data['pages'];
            });
          }
        }
      }, error => {console.log(error)}, () => {

      }
    )
    this.createRegisterForm();
    setTimeout(() => {

      this._id != -1 ? this.registerForm.patchValue(this.pageContent) : this.registerForm.reset();
    }, 900);

    this.initializeUploader();
  }

  createRegisterForm() {
    if(this._id == -1) {
      this.registerForm = this.fb.group({
        title: ['', Validators.required],
        pageId: ['', Validators.required],
        passage: ['', Validators.required],
      });
    } else {
      this.registerForm = this.fb.group({
        id: ['', []],
        title: ['', Validators.required],
        pageId: ['', Validators.required],
        passage: ['', Validators.required],
      });
    }
  }

  register() {
    if (this.registerForm.valid) {
      this.pageContent = Object.assign({}, this.registerForm.value);

      if(this._id == -1) {
        this.pageService.savePage(this.pageContent).subscribe(() => {
          this._id = this.pageService.pageId;
          this.initializeUploader();
          this.router.navigate([`/panel/content/${this._id}`]);
          this.saveState = '1';
        }, error => {
            this.saveState = error.error;
            this.errorMessage = error.error
        }, () => {
      });
      } else {
        this.pageService.updatePage(this.pageContent).subscribe(() => {
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
    this.router.navigate(['/panel/content']);
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
      url: this.baseUrl + 'Page/'+ this._id +'/photoUpdate',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 3 * 500 * 500,

    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: PageContent = JSON.parse(response);
        console.log(response);
        this.photo = res.imageUrl;
      }
    };

  }

}
