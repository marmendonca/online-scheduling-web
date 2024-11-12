import { BaseEntity } from "./BaseEntity"

export class Customer extends BaseEntity {
  name: string;
  phone: string;
  email: string;

  constructor(id: number, createdAt: Date, name: string, phone: string, email: string) {
    super(id, createdAt);
    this.name = name;
    this.phone = phone;
    this.email = email;
  }
}
