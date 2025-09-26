import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { PaymentController } from './presentation/controllers/payment.controller';
import { CreatePaymentUseCase } from './application/use-cases/create-payment.use-case';
import { UpdatePaymentUseCase } from './application/use-cases/update-payment.use-case';
import { FindPaymentByIdUseCase } from './application/use-cases/find-payment-by-id.use-case';
import { ListPaymentsUseCase } from './application/use-cases/list-payments.use-case';
import { InMemoryPaymentRepository } from './infrastructure/database/repositories/in-memory-payment.repository';
import { PaymentProcessorAdapter } from './infrastructure/adapters/payment-processor.adapter';
import { MercadoPagoService } from './infrastructure/external-services/mercado-pago/mercado-pago.service';
import { TemporalService } from './infrastructure/external-services/temporal/temporal.service';
import { HttpExceptionFilter } from './presentation/filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [PaymentController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: 'PaymentRepositoryInterface',
      useClass: InMemoryPaymentRepository,
    },
    {
      provide: 'PaymentProcessorInterface',
      useClass: PaymentProcessorAdapter,
    },
    MercadoPagoService,
    TemporalService,
    CreatePaymentUseCase,
    UpdatePaymentUseCase,
    FindPaymentByIdUseCase,
    ListPaymentsUseCase,
  ],
})
export class AppModule {}
