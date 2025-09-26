import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../app.module';
import { PaymentProcessorAdapter } from '../../adapters/payment-processor.adapter';
import { UpdatePaymentUseCase } from '../../../application/use-cases/update-payment.use-case';
import { FindPaymentByIdUseCase } from '../../../application/use-cases/find-payment-by-id.use-case';

let app: any;

async function getApp() {
  if (!app) {
    app = await NestFactory.createApplicationContext(AppModule);
  }
  return app;
}

export async function processPayment(paymentId: string): Promise<void> {
  const appContext = await getApp(); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
  const findPaymentUseCase = appContext.get(
    FindPaymentByIdUseCase,
  ) as FindPaymentByIdUseCase;
  const paymentProcessor = appContext.get(
    PaymentProcessorAdapter,
  ) as PaymentProcessorAdapter;

  const payment = await findPaymentUseCase.execute(paymentId);
  await paymentProcessor.processPayment(payment);
}

export async function updatePaymentStatus(
  paymentId: string,
  status: string,
): Promise<void> {
  const appContext = await getApp(); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
  const updatePaymentUseCase = appContext.get(
    UpdatePaymentUseCase,
  ) as UpdatePaymentUseCase;

  await updatePaymentUseCase.execute(paymentId, { status });
}
