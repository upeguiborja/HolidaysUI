import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material/material.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HolidaysService } from '../../services/holidays.service';
import { delay } from 'rxjs';
import { DateAdapter } from '@angular/material/core';

type Status = 'LOADING' | 'LOADED' | 'ERROR';

@Component({
  selector: 'app-check-holiday',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './check-holiday.component.html',
  styleUrl: './check-holiday.component.css',
})
export class CheckHolidayComponent {
  public date = new FormControl(new Date());
  public status: Status = 'LOADING';
  public isHoliday: boolean = false;
  public formattedDate = '';

  constructor(
    private holidaysService: HolidaysService,
    private dateAdapter: DateAdapter<Date>
  ) {}

  ngOnInit() {
    this.onVerify();
  }

  public onVerify() {
    this.status = 'LOADING';
    if (!this.date.value) return;
    this.holidaysService
      .checkHoliday(this.date.value)
      .pipe(delay(500)) // Simulamos un delay de 500ms para que se vea el spinner.
      .subscribe({
        next: (isHoliday) => {
          this.formatDate();
          this.isHoliday = isHoliday;
          this.status = 'LOADED';
        },
        error: (err) => {
          console.error(err);
          this.status = 'ERROR';
        },
      });
  }

  public formatDate() {
    const date = this.date.value as Date;
    this.formattedDate = this.dateAdapter.format(date, "iiii d 'de' MMMM");
  }
}
