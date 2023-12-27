import { Component } from '@angular/core';
import { ApiRoadService } from '../../services/api-road.service';
import { Road } from '../../models/road.model';
import { Roadwork } from '../../models/roadwork.model';

@Component({
  selector: 'app-highways-page',
  templateUrl: './highways-page.component.html',
  styleUrl: './highways-page.component.css',
  providers: [ApiRoadService],
})
export class HighwaysPageComponent {
  public roads: Array<Road> = [];
  public roadworks: Array<Roadwork> = [];
  public pageTitle: string;

  constructor(private apiRoadService: ApiRoadService) {
    this.pageTitle = 'Highways';
  }

  ngOnInit() {
    this.apiRoadService.getRoads().subscribe((data: Road[]) => {
      this.roads = data;
      console.log(data)
    });
    //this.apiRoadService.getRoadworksByRoadId('A1').subscribe((data: Roadwork[]) => {
    //  this.roadworks = data;
      //console.log(data)
    //});
  }
}
