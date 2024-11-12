import { BaseEntity } from "./BaseEntity"

export class Schedule extends BaseEntity {
  serviceId: number;
  customerId: number;
  professionalId: number;
  scheduleAt: Date;
  active: boolean;

  constructor(id: number, createdAt: Date, serviceId: number, customerId: number, professionalId: number, scheduleAt: Date, active: boolean) {
    super(id, createdAt);
    this.serviceId = serviceId;
    this.customerId = customerId;
    this.professionalId = professionalId;
    this.scheduleAt = scheduleAt;
    this.active = active;
  }
}
