import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  onThemeModeSwitched({ checked }: MatSlideToggleChange) {
    this.themeModeSwitched.emit(checked);
  }
}
