import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  public pageTitle: string;
  public linkedin: string; 
  public gmail: string;

  constructor() {
    this.pageTitle = 'Welcome!';
    this.linkedin = 'Unai Benajes Esbrí';
    this.gmail = 'unai8b@gmail.com';
  }

  openLinkedIn(): void {
    window.open('https://www.linkedin.com/in/unai-benajes-esbrí/', '_blank');
  }

  openGmail(): void {
    window.open('mailto:unai8b@gmail.com', '_blank');
  }
}
