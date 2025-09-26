import { BaseEntity } from './base.entity';
import { PaymentStatus } from '../enums/payment-status.enum';

export class Payment extends BaseEntity {
  public cpf: string;
  public description: string;
  public amount: number;
  public paymentMethod: string;
  public status: PaymentStatus;

  constructor(
    id: string,
    cpf: string,
    description: string,
    amount: number,
    paymentMethod: string,
  ) {
    super(id);
    this.cpf = cpf;
    this.description = description;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.status = PaymentStatus.PENDING;
  }

  public updateStatus(status: PaymentStatus): void {
    this.status = status;
    this.updateTimestamp();
  }

  public isPending(): boolean {
    return this.status === PaymentStatus.PENDING;
  }

  public isPaid(): boolean {
    return this.status === PaymentStatus.PAID;
  }

  public isFailed(): boolean {
    return this.status === PaymentStatus.FAIL;
  }

  public isPixPayment(): boolean {
    return this.paymentMethod === 'PIX';
  }

  public isCreditCardPayment(): boolean {
    return this.paymentMethod === 'CREDIT_CARD';
  }
}
