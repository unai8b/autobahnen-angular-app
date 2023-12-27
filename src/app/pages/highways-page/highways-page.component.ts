import { Component } from '@angular/core';
import { ApiRoadService } from '../../services/api-road.service';
import { Road } from '../../models/road.model';

@Component({
  selector: 'app-highways-page',
  templateUrl: './highways-page.component.html',
  styleUrl: './highways-page.component.css',
  providers: [ApiRoadService],
})
export class HighwaysPageComponent {
  public roads: Array<Road> = [];
  public pageTitle: string;

  constructor(private apiRoadService: ApiRoadService) {
    this.pageTitle = 'Highways';
  }

  ngOnInit() {
    this.apiRoadService.getRoads().subscribe((data: Road[]) => {
      this.roads = data;
    });
  }
}
