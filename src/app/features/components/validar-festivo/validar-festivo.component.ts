import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material/material.module';
import { FormControl } from '@angular/forms';
import { FestivosService } from '../../services/festivos.service';
import { delay } from 'rxjs';

type Status = 'LOADING' | 'LOADED' | 'ERROR';

@Component({
  selector: 'app-validar-festivo',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './validar-festivo.component.html',
  styleUrl: './validar-festivo.component.css',
})
export class ValidarFestivoComponent {
  public date = new FormControl(new Date());
  public status: Status = 'LOADING';
  public isHoliday: boolean = false;

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
          this.isHoliday = isHoliday;
          this.status = 'LOADED';
        },
        error: (err) => {
          console.error(err);
          this.status = 'ERROR';
        },
      });
  }

  public get formattedDate() {
    const date = this.date.value as Date;
    console.log(date);
    return date.toLocaleString('es-CO', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
    });
  }
}
