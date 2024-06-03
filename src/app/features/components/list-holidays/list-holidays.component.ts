import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material/material.module';
import { NgxDatatableModule, TableColumn } from '@swimlane/ngx-datatable';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

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
  public date = new FormControl(new Date());

  public rows = [
    { date: '2021-01-01', festivo: 'Año Nuevo' },
    { date: '2021-01-11', festivo: 'Día de los Reyes Magos' },
    { date: '2021-03-22', festivo: 'Día de San José' },
  ];

  public columns: TableColumn[] = [
    { prop: 'festivo', name: 'Festivo', flexGrow: 1 },
    { prop: 'date', name: 'Fecha', flexGrow: 1 },
  ];

  constructor(private _adapter: DateAdapter<any>) {}

  public onSelectDate(newDate: Date, datePicker: MatDatepicker<Date>): void {
    this.date.setValue(newDate);
    datePicker.close();
  }

  public get year(): number {
    return this._adapter.getYear(this.date.value);
  }
}
