import { Routes } from '@angular/router';
import { CheckHolidayComponent } from './features/components/check-holiday/check-holiday.component';

export const routes: Routes = [
  {
    path: '',
    component: CheckHolidayComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
