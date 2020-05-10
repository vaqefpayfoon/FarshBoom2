import { Component, OnInit } from '@angular/core';
import { PageContent } from '../../@models/Page';
import { PageService } from '../../@services/page.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit {
  constructor(private pageService: PageService, private route: ActivatedRoute) { }
  pageContents: PageContent[];
  _id: number;
  ngOnInit(): void {

    this.route.params.subscribe(
      (param: Params) => {
        this._id = param['id'];
        this.pageService.getContents(this._id, "id").subscribe((_pageContents: PageContent[]) => {
          this.pageContents = _pageContents;
        //   this.pageContents.forEach(element => {
        //     element.image = 'data:image/jpg;base64,' + element.image;
        // });
        })
      }, error => {console.log(error)}, () => {

      }
    )

  }

}
