export class ChargeRequest {
  schedulingId: number;
  value: number;
  customerId: number;

  constructor(schedulingId: number, value: number, customerId: number) {
    this.schedulingId = schedulingId;
    this.value = value;
    this.customerId = customerId;
  }
}
