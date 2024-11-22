import { BaseEntity } from "./BaseEntity"

export class Charge extends BaseEntity {
  scheduleId: number;
  value: number;

  constructor(id: number, createdAt: Date, scheduleId: number, value: number) {
    super(id, createdAt);
    this.scheduleId = scheduleId;
    this.value = value;
  }
}
