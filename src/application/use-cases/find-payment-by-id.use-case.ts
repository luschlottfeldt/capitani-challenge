import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Payment } from '../../domain/entities/payment.entity';
import type { PaymentRepositoryInterface } from '../../domain/repositories/payment.repository.interface';

@Injectable()
export class FindPaymentByIdUseCase {
  constructor(
    @Inject('PaymentRepositoryInterface')
    private readonly paymentRepository: PaymentRepositoryInterface,
  ) {}

  async execute(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }
    return payment;
  }
}
