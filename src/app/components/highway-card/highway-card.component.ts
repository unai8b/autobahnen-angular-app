import { Component, Input } from '@angular/core';
import { Road } from '../../models/road.model';

@Component({
  selector: 'app-highway-card',
  templateUrl: './highway-card.component.html',
  styleUrl: './highway-card.component.css',
})
export class HighwayCardComponent {
  @Input() public road!: Road;

  /**
   * Get the count of roadworks associated with the current road.
   * @returns {number} The count of roadworks for the current road.
   */
  getRoadworkCount(): number {
    return this.road.roadworks.length;
  }

  /**
   * Get the count of webcams associated with the current road.
   * @returns {number} The count of webcams for the current road.
   */
  getWebcamsCount(): number {
    return this.road.webcams.length;
  }

  /**
   * Get the count of parking lorries associated with the current road.
   * @returns {number} The count of parking lorries for the current road.
   */
  getParkingLorriesCount(): number {
    return this.road.parkingLorries.length;
  }

  /**
   * Get the count of warnings associated with the current road.
   * @returns {number} The count of warnings for the current road.
   */
  getWarningCount(): number {
    return this.road.warnings.length;
  }

  /**
   * Get the count of closures associated with the current road.
   * @returns {number} The count of closures for the current road.
   */
  getClosuresCount(): number {
    return this.road.closures.length;
  }

  /**
   * Get the count of electric charging stations associated with the current road.
   * @returns {number} The count of electric charging stations for the current road.
   */
  getElectricChargingStationsCount(): number {
    return this.road.electricChargingStations.length;
  }
}
