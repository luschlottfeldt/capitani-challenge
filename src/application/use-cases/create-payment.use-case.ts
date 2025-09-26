import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Payment } from '../../domain/entities/payment.entity';
import type { PaymentRepositoryInterface } from '../../domain/repositories/payment.repository.interface';
import type { PaymentProcessorInterface } from '../../domain/services/payment-processor.interface';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { TemporalService } from '../../infrastructure/external-services/temporal/temporal.service';

@Injectable()
export class CreatePaymentUseCase {
  constructor(
    @Inject('PaymentRepositoryInterface')
    private readonly paymentRepository: PaymentRepositoryInterface,
    @Inject('PaymentProcessorInterface')
    private readonly paymentProcessor: PaymentProcessorInterface,
    private readonly temporalService: TemporalService,
  ) {}

  async execute(dto: CreatePaymentDto): Promise<Payment> {
    const payment = new Payment(
      uuidv4(),
      dto.cpf,
      dto.description,
      dto.amount,
      dto.paymentMethod,
    );

    const savedPayment = await this.paymentRepository.create(payment);

    if (payment.isCreditCardPayment()) {
      try {
        await this.paymentProcessor.processPayment(savedPayment);
      } catch (error) {
        console.error('Payment processing error:', error);
      }
    }

    return savedPayment;
  }
}
