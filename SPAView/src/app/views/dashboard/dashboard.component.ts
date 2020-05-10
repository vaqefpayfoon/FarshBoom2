import { Component, OnInit, OnDestroy } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

import { BrandDto, ProjectDto } from '../@models/dashboard';
import { ActivatedRoute, Params } from '@angular/router';
import { Pagination, PaginatedResult } from '../@models/pagination';
import { Good } from '../@models/Good';
import { environment } from '../../../environments/environment';
import { GoodService } from '../@services/good.service';
import { Size, Type, Brand} from '../@models/base';
import { User } from '../@models/user';
import { Slide } from '../@models/slide';
import { NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { StringModel } from '../@models/dropDown';
import { KeyValue } from '../@models/keyvalue';

@Component({
  templateUrl: 'dashboard.component.html',providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: false } },
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  radioModel: string = 'Month';

  myInterval: number | false = 6000;

  activeSlideIndex: number = 0;
  noWrapSlides: boolean = false;

  subtitle: string;
  page = 1;
  pagination: Pagination;
  userParams: any = {};
  goods: Good[];
  allGoods: Good[];
  good: Good;
  saveState: string = "0";

  sizes: Size[];
  types: Type[];
  brands: Brand[];
  users: User[];

  successMessage: string = environment.successful;
  errorMessage: string = environment.error;
  brandsDto: BrandDto[];
  projects: ProjectDto[];
  stringModel: StringModel[];
  keyvalues: KeyValue[];


  constructor(private route: ActivatedRoute, private goodService: GoodService, config: NgbCarouselConfig) {
    this.subtitle = 'FarshBoom';
    this.route.params.subscribe(
      (param: Params) => {
        this.route.data.subscribe(data => {
          const res = data['brands'];

          this.brandsDto = res.lstBrand;
          this.stringModel = res.lstUbozhi;
          this.projects = data['projects'];
          this.keyvalues = data['keyvalues'];

          this.pieChartLabels = this.brandsDto.map(woak => woak.brandName);
          this.pieChartData = this.brandsDto.map(woak => woak.brand);

          this.mainChartLabels = this.projects.map(woak => woak.projectName);
          this.mainChartDatas = [{data: this.projects.map(woak => woak.header), label: 'فرش بوم'}];


        });
      }, error => {console.log(error)}, () => {
      }
    )
    config.interval = 100;
    config.wrap = true;
    config.keyboard = false;

    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
}
showNavigationArrows = false;
showNavigationIndicators = false;
  dbslides: Slide[];
  ngOnInit() {
  this.route.data.subscribe(data => {
    this.dbslides = data['slides'];
    // this.slides.forEach(element => {
    //     element.image = 'data:image/jpg;base64,' + element.image;
    // });
  });

}

public mainChartDatas: Array<any> = [];
public mainChartLabels: Array<any> = [];

public DataOptions: any = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      gridLines: {
        color: 'transparent',
        zeroLineColor: 'transparent'
      },
      ticks: {
        fontSize: 2,
        fontColor: 'transparent',
      }

    }],
    yAxes: [{
      display: false,
      ticks: {
        display: false,
        min: 100,
        max: 2000,
      }
    }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
  legend: {
    display: false
  }
};

  ngOnDestroy(): void {
    this.myInterval = 0;
    this.noWrapSlides = true;
    this.myInterval = false;
  }

  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];
  public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend = false;
  public lineChart1Type = 'line';

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: 'Series A'
    }
  ];
  public lineChart2Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 1 - 5,
          max: 34 + 5,
        }
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours: Array<any> = [
    { // grey
      backgroundColor: getStyle('--info'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Legend = false;
  public lineChart2Type = 'line';


  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'Series A'
    }
  ];
  public lineChart3Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart3Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart3Legend = false;
  public lineChart3Type = 'line';


  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: 'Series A',
      barPercentage: 0.6,
    }
  ];
  public barChart1Labels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  public barChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];
  public barChart1Legend = false;
  public barChart1Type = 'bar';


  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';
  public chartClicked(e: any): void {

  }

  public chartHovered(e: any): void {

  }
}
