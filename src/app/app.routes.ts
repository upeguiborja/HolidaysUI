import { Routes } from '@angular/router';
import { CheckHolidayComponent } from './features/components/check-holiday/check-holiday.component';
import { ListHolidaysComponent } from './features/components/list-holidays/list-holidays.component';

export const routes: Routes = [
  {
    path: '',
    component: CheckHolidayComponent,
  },
  {
    path: 'lista',
    component: ListHolidaysComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
