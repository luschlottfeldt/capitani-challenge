import { Payment } from '../entities/payment.entity';

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  errorMessage?: string;
}

export interface PaymentProcessorInterface {
  processPayment(payment: Payment): Promise<PaymentResult>;
}
