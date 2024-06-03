import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material/material.module';
import { FormControl } from '@angular/forms';
import { FestivosService } from '../../services/festivos.service';
import { delay } from 'rxjs';

type Status = 'LOADING' | 'LOADED' | 'ERROR';

@Component({
  selector: 'app-check-holiday',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './check-holiday.component.html',
  styleUrl: './check-holiday.component.css',
})
export class CheckHolidayComponent {
  public date = new FormControl(new Date());
  public status: Status = 'LOADING';
  public isHoliday: boolean = false;
  public formattedDate = '';

  constructor(private festivosService: FestivosService) {}

  ngOnInit() {
    this.onVerify();
  }

  public onVerify() {
    this.status = 'LOADING';
    if (!this.date.value) return;
    this.festivosService
      .verificarFestivo(this.date.value)
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
    console.log(date);
    this.formattedDate = date.toLocaleString('es-CO', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
    });
  }
}
