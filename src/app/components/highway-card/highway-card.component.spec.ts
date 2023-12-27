import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighwayCardComponent } from './highway-card.component';

describe('HighwayCardComponent', () => {
  let component: HighwayCardComponent;
  let fixture: ComponentFixture<HighwayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighwayCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighwayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
