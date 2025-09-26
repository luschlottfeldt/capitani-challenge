import { Injectable } from '@nestjs/common';
import { Payment } from '../../../domain/entities/payment.entity';
import { PaymentRepositoryInterface } from '../../../domain/repositories/payment.repository.interface';

@Injectable()
export class InMemoryPaymentRepository implements PaymentRepositoryInterface {
  private payments: Map<string, Payment> = new Map();

  create(payment: Payment): Promise<Payment> {
    this.payments.set(payment.id, payment);
    return Promise.resolve(payment);
  }

  findById(id: string): Promise<Payment | null> {
    return Promise.resolve(this.payments.get(id) || null);
  }

  findByCpf(cpf: string): Promise<Payment[]> {
    return Promise.resolve(
      Array.from(this.payments.values()).filter(
        (payment) => payment.cpf === cpf,
      ),
    );
  }

  findByPaymentMethod(paymentMethod: string): Promise<Payment[]> {
    return Promise.resolve(
      Array.from(this.payments.values()).filter(
        (payment) => payment.paymentMethod === paymentMethod,
      ),
    );
  }

  findAll(): Promise<Payment[]> {
    return Promise.resolve(Array.from(this.payments.values()));
  }

  update(payment: Payment): Promise<Payment> {
    this.payments.set(payment.id, payment);
    return Promise.resolve(payment);
  }

  delete(id: string): Promise<void> {
    this.payments.delete(id);
    return Promise.resolve();
  }
}
