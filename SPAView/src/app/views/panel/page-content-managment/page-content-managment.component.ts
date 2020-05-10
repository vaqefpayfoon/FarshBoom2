import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageService } from '../../@services/page.service';
import { Page, PageContent } from '../../@models/Page';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-page-content-managment',
  templateUrl: './page-content-managment.component.html'
})
export class PageContentManagmentComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private pageService: PageService) { }

  pageContents: PageContent[];

  protected userName: string;
  pageContent: PageContent;
  saveState: string = "0";
  pageContentId: number;

  successMessage: string = environment.successful;
  errorMessage: string = environment.error;

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.pageContents = data['pageContents'];
    });

  }

  onAdd() {
    this.router.navigate([-1], { relativeTo: this.route });
  }
  onEdit() {
    this.router.navigate([this.pageContent.id], { relativeTo: this.route });
  }
  onDelete() {

    this.pageService.deletePage(this.pageContentId).subscribe(() => {
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    }, () => {
    })
  }

}
