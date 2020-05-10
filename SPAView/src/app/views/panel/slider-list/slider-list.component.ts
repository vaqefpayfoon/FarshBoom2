import { Component, OnInit } from '@angular/core';
import { Slide } from '../../@models/slide';
import { Router, ActivatedRoute } from '@angular/router';
import { SlideService } from '../../@services/slide.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-slider-list',
  templateUrl: './slider-list.component.html'
})
export class SliderListComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private slideService: SlideService) { }


  slides: Slide[];
  slide: Slide;
  slideId: number;
  saveState: string = "0";

  successMessage: string = environment.successful;
  errorMessage: string = environment.error;

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.slides = data['slides'];
    });

  }

  onAdd() {
    this.router.navigate([-1], { relativeTo: this.route });
  }
  onEdit() {
    this.router.navigate([this.slideId], { relativeTo: this.route });
  }
  onDelete() {

    this.slideService.deleteSlide(this.slideId).subscribe(() => {
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    }, () => {
    })
  }


}
