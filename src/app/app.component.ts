import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public title = 'Autobahnen Angular App';
  private darkTheme = false;
  
  @HostBinding('class')
  get themeMode() {
    return this.darkTheme ? 'dark-theme' : 'light-theme';
  }

  switchThemeMode(darkTheme: boolean) {
    this.darkTheme = darkTheme;
  }
}
