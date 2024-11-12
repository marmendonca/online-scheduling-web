import { BaseEntity } from "./BaseEntity"

export class Professional extends BaseEntity {
  name: string;
  cpf: string;
  birthDate: Date;
  email: string;

  constructor(id: number, createdAt: Date, name: string, cpf: string, birthDate: Date, email: string) {
    super(id, createdAt);
    this.name = name;
    this.cpf = cpf;
    this.birthDate = birthDate;
    this.email = email;
  }
}
