import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighwaysPageComponent } from './highways-page.component';

describe('HighwaysPageComponent', () => {
  let component: HighwaysPageComponent;
  let fixture: ComponentFixture<HighwaysPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighwaysPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighwaysPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
