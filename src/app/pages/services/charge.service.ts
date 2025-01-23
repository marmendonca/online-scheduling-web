import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Charge } from '../../entities/Charge';
import { ChargeRequest } from '../../requests/ChargeRequest';
import { ChargeResponse } from '../../responses/ChargeResponse';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {
  private url: string = 'https://localhost:5001/api/'

  constructor(private httpClient: HttpClient) { }

  createCharge(charge: ChargeRequest) : Observable<ChargeResponse> {
      return this.httpClient.post<ChargeResponse>(this.url + `v1/charges`, charge).pipe(
        map((response) => {
          return response;
        })
      )
    }
}
