import { Injectable, Inject } from '@nestjs/common';
import { Payment } from '../../domain/entities/payment.entity';
import type { PaymentRepositoryInterface } from '../../domain/repositories/payment.repository.interface';
import { ListPaymentsDto } from '../dtos/list-payments.dto';

@Injectable()
export class ListPaymentsUseCase {
  constructor(
    @Inject('PaymentRepositoryInterface')
    private readonly paymentRepository: PaymentRepositoryInterface,
  ) {}

  async execute(dto: ListPaymentsDto): Promise<Payment[]> {
    if (dto.cpf) {
      return await this.paymentRepository.findByCpf(dto.cpf);
    }

    if (dto.paymentMethod) {
      return await this.paymentRepository.findByPaymentMethod(
        dto.paymentMethod,
      );
    }

    return await this.paymentRepository.findAll();
  }
}
