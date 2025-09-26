import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePaymentUseCase } from '../../application/use-cases/create-payment.use-case';
import { UpdatePaymentUseCase } from '../../application/use-cases/update-payment.use-case';
import { FindPaymentByIdUseCase } from '../../application/use-cases/find-payment-by-id.use-case';
import { ListPaymentsUseCase } from '../../application/use-cases/list-payments.use-case';
import { CreatePaymentRequestDto } from '../dtos/create-payment-request.dto';
import { UpdatePaymentRequestDto } from '../dtos/update-payment-request.dto';
import { ListPaymentsRequestDto } from '../dtos/list-payments-request.dto';
import { PaymentResponseDto } from '../dtos/payment-response.dto';
import { PaymentMapper } from '../mappers/payment.mapper';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
    private readonly updatePaymentUseCase: UpdatePaymentUseCase,
    private readonly findPaymentByIdUseCase: FindPaymentByIdUseCase,
    private readonly listPaymentsUseCase: ListPaymentsUseCase,
  ) {}

  @Post()
  async createPayment(
    @Body() requestDto: CreatePaymentRequestDto,
  ): Promise<PaymentResponseDto> {
    const createDto = PaymentMapper.toCreatePaymentDto(requestDto);
    return await this.createPaymentUseCase.execute(createDto);
  }

  @Put(':id')
  async updatePayment(
    @Param('id') id: string,
    @Body(ValidationPipe) requestDto: UpdatePaymentRequestDto,
  ): Promise<PaymentResponseDto> {
    const updateDto = PaymentMapper.toUpdatePaymentDto(requestDto);
    return await this.updatePaymentUseCase.execute(id, updateDto);
  }

  @Get(':id')
  async getPaymentById(@Param('id') id: string): Promise<PaymentResponseDto> {
    return await this.findPaymentByIdUseCase.execute(id);
  }

  @Get()
  async listPayments(
    @Query(ValidationPipe) requestDto: ListPaymentsRequestDto,
  ): Promise<PaymentResponseDto[]> {
    const listDto = PaymentMapper.toListPaymentsDto(requestDto);
    return await this.listPaymentsUseCase.execute(listDto);
  }

  @Post('webhook')
  async handleWebhook(@Body() webhookData: any): Promise<{ status: string }> {
    if (webhookData?.type === 'payment' && webhookData?.data?.id) {
      const paymentId = webhookData.data.id as string;
      const paymentStatus =
        webhookData.action === 'payment.updated' ? 'PAID' : 'PENDING';

      try {
        const updateDto = PaymentMapper.toUpdatePaymentDto({
          status: paymentStatus,
        });
        await this.updatePaymentUseCase.execute(paymentId, updateDto);
      } catch (error) {
        console.error('Webhook processing error:', error);
      }
    }

    return { status: 'ok' };
  }
}
