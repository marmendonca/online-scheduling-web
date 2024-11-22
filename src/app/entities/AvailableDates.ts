import { BaseEntity } from "./BaseEntity"

export class AvailableDates extends BaseEntity {
  startAt: Date;
  endAt: Date;
  interval: number;
  professionalId: number;
  active: boolean;

  constructor(id: number, createdAt: Date, startAt: Date, endAt: Date, interval: number, professionalId: number, active: boolean) {
    super(id, createdAt);
    this.startAt = startAt;
    this.endAt = endAt;
    this.interval = interval;
    this.professionalId = professionalId;
    this.active = active;
  }
}
