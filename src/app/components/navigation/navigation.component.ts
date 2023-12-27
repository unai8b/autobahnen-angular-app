import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  public homeSidenavText: string; 
  public highwaySidenavText: string;
  private breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.homeSidenavText = 'Home';
    this.highwaySidenavText = 'Highways';
  }

  @Input() title!: string;
  @Output() readonly themeModeSwitched = new EventEmitter<boolean>();

  /**
   * Observable that tracks the current viewport status indicating whether it matches a handset or small breakpoint.
   * @type {Observable<boolean>} Observable emitting true if the current viewport matches the specified breakpoints, false otherwise.
   */
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  /**
   * Handle the theme mode switch event triggered by a MatSlideToggle component.
   * @param {MatSlideToggleChange} event - The MatSlideToggleChange event containing the new checked state.
   */
  onThemeModeSwitched({ checked }: MatSlideToggleChange) {
    this.themeModeSwitched.emit(checked);
  }
}
