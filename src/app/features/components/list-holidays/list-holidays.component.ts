import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material/material.module';
import { NgxDatatableModule, TableColumn } from '@swimlane/ngx-datatable';
import { MatDatepicker } from '@angular/material/datepicker';
import {
  NativeDateAdapter,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-holidays',
  standalone: true,
  providers: [
    provideNativeDateAdapter({
      display: {
        dateInput: 'YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'YYYY',
        monthYearA11yLabel: 'YYYY',
      },
      parse: {
        dateInput: 'YYYY',
      },
    }),
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

  public onSelectYear(
    newDate: Date,
    datePicker: MatDatepicker<NativeDateAdapter>
  ): void {
    datePicker.close();
  }
}
