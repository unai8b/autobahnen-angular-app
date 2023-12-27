import { Component, Input } from '@angular/core';
import { Road } from '../../models/road.model';

@Component({
  selector: 'app-highway-card',
  templateUrl: './highway-card.component.html',
  styleUrl: './highway-card.component.css',
})
export class HighwayCardComponent {
  @Input() public road!: Road;

  getRoadworkCount(): number {
    return this.road.roadworks.length;
  }

  getWebcamsCount(): number {
    return this.road.webcams.length;
  }

  getParkingLorriesCount(): number {
    return this.road.parkingLorries.length;
  }

  getWarningCount(): number {
    return this.road.warnings.length;
  }

  getClosuresCount(): number {
    return this.road.closures.length;
  }

  getElectricChargingStationsCount(): number {
    return this.road.electricChargingStations.length;
  }
}
