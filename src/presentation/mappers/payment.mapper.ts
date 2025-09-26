import { CreatePaymentRequestDto } from '../dtos/create-payment-request.dto';
import { UpdatePaymentRequestDto } from '../dtos/update-payment-request.dto';
import { ListPaymentsRequestDto } from '../dtos/list-payments-request.dto';
import { CreatePaymentDto } from '../../application/dtos/create-payment.dto';
import { UpdatePaymentDto } from '../../application/dtos/update-payment.dto';
import { ListPaymentsDto } from '../../application/dtos/list-payments.dto';

export class PaymentMapper {
  static toCreatePaymentDto(
    request: CreatePaymentRequestDto,
  ): CreatePaymentDto {
    const dto = new CreatePaymentDto();
    dto.cpf = request.cpf;
    dto.description = request.description;
    dto.amount = request.amount;
    dto.paymentMethod = request.paymentMethod;
    return dto;
  }

  static toUpdatePaymentDto(
    request: UpdatePaymentRequestDto,
  ): UpdatePaymentDto {
    const dto = new UpdatePaymentDto();
    dto.status = request.status;
    return dto;
  }

  static toListPaymentsDto(request: ListPaymentsRequestDto): ListPaymentsDto {
    const dto = new ListPaymentsDto();
    dto.cpf = request.cpf;
    dto.paymentMethod = request.paymentMethod;
    return dto;
  }
}
