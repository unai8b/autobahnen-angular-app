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

  constructor(private apiService: ApiRoadService) {}

  ngOnInit() {
    this.apiService.getRoads().subscribe((data: Road[]) => {
      this.roads = data;
      console.log(data);
    });
  }
}
