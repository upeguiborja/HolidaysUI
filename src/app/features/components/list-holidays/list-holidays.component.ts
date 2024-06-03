import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material/material.module';
import { NgxDatatableModule, TableColumn } from '@swimlane/ngx-datatable';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { HolidaysService } from '../../services/holidays.service';
import { Holiday } from '../../../core/entities/Holiday';
import { delay } from 'rxjs';

type Status = 'LOADING' | 'LOADED' | 'ERROR';

@Component({
  selector: 'app-list-holidays',
  standalone: true,
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'P',
        },
        display: {
          dateInput: 'yyyy',
          monthYearLabel: 'yyyy',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM yyyy',
        },
      },
    },
  ],
  imports: [ReactiveFormsModule, MaterialModule, NgxDatatableModule],
  templateUrl: './list-holidays.component.html',
  styleUrl: './list-holidays.component.css',
})
export class ListHolidaysComponent {
  public status: Status = 'LOADING';
  public date = new FormControl(new Date());
  public rows: Holiday[] = [];
  public columns: TableColumn[] = [
    { prop: 'festivo', name: 'Festivo', flexGrow: 1 },
    { prop: 'fecha', name: 'Fecha', flexGrow: 1 },
  ];

  constructor(
    private holidaysService: HolidaysService,
    private dateAdapter: DateAdapter<any>
  ) {}

  public onSelectDate(newDate: Date, datePicker: MatDatepicker<Date>): void {
    this.date.setValue(newDate);
    datePicker.close();
  }

  ngOnInit() {
    this.onList();
  }

  public onList() {
    if (!this.date.value) return;
    this.status = 'LOADING';
    this.rows = [];
    this.holidaysService
      .listHolidays(this.year)
      .pipe(delay(500))
      .subscribe({
        next: (holidays) => {
          this.rows = holidays;
          this.status = 'LOADED';
        },
        error: (err) => {
          console.error(err);
          this.status = 'ERROR';
        },
      });
  }

  public get currentYear(): number {
    return this.dateAdapter.getYear(
      this.dateAdapter.parse(this.rows[0].fecha, 'yyyy-MM-dd')
    );
  }

  public get year(): number {
    return this.dateAdapter.getYear(this.date.value);
  }
}
