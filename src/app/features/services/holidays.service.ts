import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Holiday } from '../../core/entities/Holiday';

@Injectable({
  providedIn: 'root',
})
export class HolidaysService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.holidayApiUrl}/festivos`;
  }

  public checkHoliday(date: Date): Observable<boolean> {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return this.http
      .get(`${this.url}/verificar/${year}/${month}/${day}`, {
        responseType: 'text',
      })
      .pipe(map((response) => response?.toLowerCase() === 'es festivo'));
  }

  public listHolidays(year: number): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(`${this.url}/obtener/${year}`);
  }
}
