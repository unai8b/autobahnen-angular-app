import { Component, Input } from '@angular/core';
import { Road } from '../../models/road.model';

@Component({
  selector: 'app-highway-card',
  templateUrl: './highway-card.component.html',
  styleUrl: './highway-card.component.css',
})
export class HighwayCardComponent {
  @Input() public road!: Road;
}
