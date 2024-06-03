import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material/material.module';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validar-festivo',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './validar-festivo.component.html',
  styleUrl: './validar-festivo.component.css',
})
export class ValidarFestivoComponent {
  public date: FormControl = new FormControl(new Date());
}
