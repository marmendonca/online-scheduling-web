import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../../entities/Service';
import { map, Observable } from 'rxjs';
import { Professional } from '../../entities/Professional';

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
}
