import { Component, OnInit } from '@angular/core';
import { KeyValue } from '../../@models/keyvalue';
import { KeyValueService } from '../../@services/keyvalue.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html'
})
export class FileManagerComponent implements OnInit {

  keyvalue: KeyValue;
  dropDown: any[] = [{title: "فالوئر", value: "followers"},
  {title: "بازدید کنندگان", value: "observers"}];
  errorMessage: string = environment.error;
  successMessage: string = environment.successful;
  registerForm: FormGroup;

  constructor(private keyvalueService: KeyValueService, private router: Router,
     private fb: FormBuilder, private route: ActivatedRoute) { }
     saveState: string = "0";

  _id: any;
  keyvalues: KeyValue[];
  ngOnInit() {
    this.route.data.subscribe((param: Params) => {
      this.keyvalues = param["keyvalues"]
    })
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      value: ['', []],
      title: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.keyvalue = Object.assign({}, this.registerForm.value);

      this.keyvalueService.saveKeyvalue(this.keyvalue).subscribe(() => {
        this._id = this.keyvalueService.keyvalueId;
        this.saveState = '1';
      }, error => {
          this.saveState = error.error;
          this.errorMessage = error.error
      }, () => {
    });
    }
  }

  cancel() {
    this.router.navigate(['/panel/content']);
  }

}
