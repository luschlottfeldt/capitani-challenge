import { Payment } from '../entities/payment.entity';

export interface PaymentRepositoryInterface {
  create(payment: Payment): Promise<Payment>;
  findById(id: string): Promise<Payment | null>;
  findByCpf(cpf: string): Promise<Payment[]>;
  findByPaymentMethod(paymentMethod: string): Promise<Payment[]>;
  findAll(): Promise<Payment[]>;
  update(payment: Payment): Promise<Payment>;
  delete(id: string): Promise<void>;
}
