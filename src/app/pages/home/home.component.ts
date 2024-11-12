import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CustomerService } from '../services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../../entities/Customer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  customerForm: FormGroup;
  showAdditionalFields: boolean = false;

  constructor(
    private customerService: CustomerService,
    private toastr: ToastrService) {
    this.customerForm = new FormGroup({
      phone: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  onSearchClick() {
    let customer = this.customerForm.getRawValue();
    this.customerService.getCustomersByPhone(customer['phone']).subscribe((customer) => {
      if (customer != null) {
        this.customerForm.patchValue(customer);
      }

      this.showAdditionalFields = true;
    });
  }
}
