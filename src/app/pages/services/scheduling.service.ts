import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../../entities/Service';
import { map, Observable } from 'rxjs';
import { Professional } from '../../entities/Professional';
import { AvailableDates } from '../../entities/AvailableDates';
import { Schedule } from '../../entities/Schedule';
import { Charge } from '../../entities/Charge';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {
  private url: string = 'https://localhost:5001/api/'

  constructor(private httpClient: HttpClient) { }

  getServices() : Observable<Service[]> {
    return this.httpClient.get<Service[]>(this.url + 'v1/services').pipe(
      map((response) => {
        return response;
      })
    )
  }

  getProfessionalsByService(serviceId: number) : Observable<Professional[]> {
    return this.httpClient.get<Professional[]>(this.url + `v1/professional-services/professionals/${serviceId}`).pipe(
      map((response) => {
        return response;
      })
    )
  }

  getAvailableDates() : Observable<AvailableDates[]> {
    return this.httpClient.get<AvailableDates[]>(this.url + 'v1/available-dates').pipe(
      map((response) => {
        return response;
      })
    )
  }

  createSchedule(schedule: Schedule) : Observable<number> {
    return this.httpClient.post<number>(this.url + `v1/schedules`, schedule).pipe(
      map((response) => {
        return response;
      })
    )
  }

  createCharge(charge: Charge) : Observable<any> {
    return this.httpClient.post<any>(this.url + `v1/charges`, charge).pipe(
      map((response) => {
        return response;
      })
    )
  }
}
