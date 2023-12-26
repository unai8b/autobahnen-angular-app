import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  public linkedin: string; 
  public gmail: string;

  constructor() {
    this.linkedin = 'Unai Benajes Esbrí';
    this.gmail = 'unai8b@gmail.com';
  }
}
