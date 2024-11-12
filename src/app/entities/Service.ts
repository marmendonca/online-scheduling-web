import { BaseEntity } from "./BaseEntity"

export class Service extends BaseEntity {
  name: string;
  value: number;
  completionTime: string;

  constructor(id: number, createdAt: Date, name: string, value: number, completionTime: string) {
    super(id, createdAt);
    this.name = name;
    this.value = value;
    this.completionTime = completionTime;
  }
}
