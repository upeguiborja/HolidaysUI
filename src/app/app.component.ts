import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from './shared/modules/material/material.module';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  DateFnsAdapter,
  MAT_DATE_FNS_FORMATS,
} from '@angular/material-date-fns-adapter';
import { es as esLocale } from 'date-fns/locale';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: esLocale },
    { provide: DateAdapter, useClass: DateFnsAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS },
  ],
  imports: [RouterModule, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Festivos en Colombia';
}
