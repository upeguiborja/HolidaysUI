import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from './shared/modules/material/material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Festivos en Colombia';
}
