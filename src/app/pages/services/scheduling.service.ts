import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../../entities/Service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {
  private url: string = 'https://localhost:5001/api/'

  constructor(private httpClient: HttpClient) { }

  getServices() {
    return this.httpClient.get<Service[]>(this.url + 'v1/services').pipe(
      map((response) => {
        return response;
      })
    )
  }
}
