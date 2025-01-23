import { SchedulingService } from './../services/scheduling.service';
import { Component, model, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'; // Adicione esta linha
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Service } from '../../entities/Service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Professional } from '../../entities/Professional';
import { AvailableDates } from '../../entities/AvailableDates';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { Schedule } from '../../entities/Schedule';
import { ToastrService } from 'ngx-toastr';
import { Charge } from '../../entities/Charge';
import { ChargeRequest } from '../../requests/ChargeRequest';
import { ChargeService } from '../services/charge.service';
import { ChargeResponse } from '../../responses/ChargeResponse';


@Component({
  selector: 'app-scheduling',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.css'
})
export class SchedulingComponent {
  schedulingForm: FormGroup;
  services: Service[] = [];
  professionals: Professional[] = [];
  showAdditionalFields: boolean = false;
  selectedDate = model<Date | null>(null);
  availableDate: AvailableDates | null = null;
  availableTimes: string[] = [];

  constructor(
    private schedulingService: SchedulingService,
    private chargeService: ChargeService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog) {

    this.schedulingForm = new FormGroup({
      customer: new FormControl(0),
      services: new FormControl([]),
      availableDate: new FormControl(null),
      professionals: new FormControl([]),
      time: new FormControl(""),
    });
  }

  ngOnInit(): void {
    this.getServices();
    this.getAvailableDates();
    this.setCustomer();
  }

  onServiceSelect() {
    this.schedulingService.getProfessionalsByService(this.schedulingForm.controls['services'].value.id).subscribe({
      next: (professionals) => {
        this.professionals = professionals;
        this.schedulingForm.controls['professionals'].setValue(null);
      },
      error: () => {
        this.toastr.error('Erro ao buscar profissionais');
      },
    });

    this.showAdditionalFields = true;
  }

  getServices() {
    this.schedulingService.getServices().subscribe({
      next: (services) => {
        this.services = services;
        this.schedulingForm.controls['services'].setValue(null);
      },
      error: () => {
        this.toastr.warning('Erro ao buscar serviços');
      },
    });
  }

  getAvailableDates() {
    this.schedulingService.getAvailableDates().subscribe({
      next: (availableDates) => {
        this.availableDate = availableDates[0];
        this.calculateAvailableTimes();
        this.schedulingForm.controls['availableDate'].setValue(null);
      },
      error: () => {
        this.toastr.warning('Erro ao buscar datas disponíveis');
      },
    });
  }

  calculateAvailableTimes() {
    if (!this.availableDate) {
      return;
    }

    const startDate = new Date(this.availableDate.startAt);
    const endDate = new Date(this.availableDate.endAt);

    const endDateWithTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(),
      endDate.getHours(), endDate.getMinutes(), endDate.getSeconds());

    const interval = this.availableDate.interval;
    const times = [];

    while (startDate.getHours() <= endDateWithTime.getHours()) {
      times.push(startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      startDate.setHours(startDate.getHours() + interval);
    }

    this.availableTimes = times;
  }

  async onConfirmScheduling() {

    let scheduleId = await this.createSchedule();
    let chargeResponse = this.createCharge(scheduleId);
  }

  setCustomer() {
    this.route.paramMap.subscribe(params => {
      this.schedulingForm.controls['customer'].setValue(+params.get('id')!);
    });
  }

  createSchedule(): Promise<number> {
    return new Promise((resolve, reject) => {
      let service = this.schedulingForm.controls['services'].value;
      let professional = this.schedulingForm.controls['professionals'].value;
      let time = this.schedulingForm.controls['time'].value;
      let customerId = this.schedulingForm.controls['customer'].value;
      let selectedDate = this.selectedDate();

      if (!this.validateSchedulingForm(selectedDate, service, professional))
        return;

      let [hours, minutes] = time.split(':').map(Number);
      let scheduleDate = new Date(
        selectedDate!.getFullYear(),
        selectedDate!.getMonth(),
        selectedDate!.getDate(),
        hours, minutes, 0);

      let schedule = new Schedule(0, new Date(), service.id, customerId, professional.id, scheduleDate);

      this.schedulingService.createSchedule(schedule).subscribe({
        next: (scheduleId) => {
          resolve(scheduleId);
        },
        error: (error) => {
          this.toastr.error('Erro ao criar agendamento');
          reject(error);
        },
      });
    });
  }

  createCharge(scheduleId: number) : ChargeResponse | null {
    let service = this.schedulingForm.controls['services'].value;
    let chargeValue = 50;

    if (service.value < 50)
      chargeValue = service.value * 0.5;

    let charge = new ChargeRequest(
      scheduleId,
      chargeValue,
      this.schedulingForm.controls['customer'].value);

    this.chargeService.createCharge(charge).subscribe({
      next: (response) => {
        console.log(response);
        return response;
      },
      error: () => {
        this.toastr.warning('Erro ao criar cobrança');
      },
    });

    return null;
  }

  validateSchedulingForm(selectedDate: Date | null, service: Service | null, professional: Professional | null) : boolean {
    if (!selectedDate) {
      this.toastr.error('Data não selecionada');
      return false;
    }

    if (!service) {
      this.toastr.error('Serviço não selecionado');
      return false;
    }

    if (!professional) {
      this.toastr.error('Profissional não selecionado');
      return false;
    }

    return true;
  }

}
