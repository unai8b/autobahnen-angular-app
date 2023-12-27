import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public title = 'Autobahnen Angular App';
  private darkTheme = false;
  
  /**
   * Get the theme mode based on the current dark theme setting.
   * @returns {string} The theme mode class, either 'dark-theme' or 'light-theme'.
   */
  @HostBinding('class')
  get themeMode(): string {
    return this.darkTheme ? 'dark-theme' : 'light-theme';
  }

  /**
   * Switch the theme mode based on the provided dark theme setting.
   * @param {boolean} darkTheme - The new dark theme setting.
   */
  switchThemeMode(darkTheme: boolean) {
    this.darkTheme = darkTheme;
  }
}
