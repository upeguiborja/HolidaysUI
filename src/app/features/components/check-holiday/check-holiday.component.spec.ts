import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckHolidayComponent } from './check-holiday.component';

describe('CheckHolidayComponent', () => {
  let component: CheckHolidayComponent;
  let fixture: ComponentFixture<CheckHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckHolidayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
