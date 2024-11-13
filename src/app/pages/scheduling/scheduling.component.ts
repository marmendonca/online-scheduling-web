import { SchedulingService } from './../services/scheduling.service';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Service } from '../../entities/Service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Professional } from '../../entities/Professional';


@Component({
  selector: 'app-scheduling',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.css'
})
export class SchedulingComponent {
  services: Service[] = [];
  selectedService: any;
  showAdditionalFields: boolean = false;
  selectedProfessional: any;
  professionals: Professional[] = [];

  constructor(private schedulingService: SchedulingService
  ) {

  }

  ngOnInit(): void {
    this.schedulingService.getServices().subscribe({
      next: (services) => {
        this.services = services;
      },
      error: () => {

      },
    });
  }

  onServiceSelect() {
    console.log('Serviço selecionado:', this.selectedService);
    this.schedulingService.getProfessionalsByService(this.selectedService.id).subscribe({
      next: (professionals) => {
        this.professionals = professionals;
      },
      error: () => {

      },
    });

    this.showAdditionalFields = true;
  }
}
