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

  /**
   * Open the LinkedIn profile of the user in a new browser window or tab.
   */
  openLinkedIn(): void {
    window.open('https://www.linkedin.com/in/unai-benajes-esbrí/', '_blank');
  }

  /**
   * Open the Gmail composer for sending an email to the specified email address in a new browser window or tab.
   */
  openGmail(): void {
    window.open('mailto:unai8b@gmail.com', '_blank');
  }
}
