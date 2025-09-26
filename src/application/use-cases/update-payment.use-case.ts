import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Payment } from '../../domain/entities/payment.entity';
import { PaymentStatus } from '../../domain/enums/payment-status.enum';
import type { PaymentRepositoryInterface } from '../../domain/repositories/payment.repository.interface';
import { UpdatePaymentDto } from '../dtos/update-payment.dto';

@Injectable()
export class UpdatePaymentUseCase {
  constructor(
    @Inject('PaymentRepositoryInterface')
    private readonly paymentRepository: PaymentRepositoryInterface,
  ) {}

  async execute(id: string, dto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.findPaymentById(id);

    if (dto.status) {
      payment.updateStatus(dto.status as PaymentStatus);
    }

    return await this.paymentRepository.update(payment);
  }

  private async findPaymentById(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }
    return payment;
  }
}
