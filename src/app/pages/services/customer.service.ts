import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Customer } from '../../entities/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url: string = 'https://localhost:5001/api/'

  constructor(private httpClient: HttpClient) { }

  getCustomersByPhone(phone: string) {
    return this.httpClient.get<Customer>(this.url + `v1/customers/phone/${phone}`).pipe(
      map((response) => {
        return response;
      })
    )
  }

  createOrUpdateCustomer(customer: Customer) {
    return this.httpClient.post<number>(this.url + `v1/customers`, customer).pipe(
      map((response) => {
        return response;
      })
    )
  }
}
