import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHolidaysComponent } from './list-holidays.component';

describe('ListHolidaysComponent', () => {
  let component: ListHolidaysComponent;
  let fixture: ComponentFixture<ListHolidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListHolidaysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
