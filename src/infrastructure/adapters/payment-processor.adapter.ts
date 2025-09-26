import { Injectable } from '@nestjs/common';
import type {
  PaymentProcessorInterface,
  PaymentResult,
} from '../../domain/services/payment-processor.interface';
import type { Payment } from '../../domain/entities/payment.entity';
import { MercadoPagoService } from '../external-services/mercado-pago/mercado-pago.service';

@Injectable()
export class PaymentProcessorAdapter implements PaymentProcessorInterface {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  async processPayment(payment: Payment): Promise<PaymentResult> {
    if (payment.isCreditCardPayment()) {
      try {
        const checkoutUrl =
          await this.mercadoPagoService.createCheckoutPro(payment);
        return {
          success: true,
          transactionId: checkoutUrl,
        };
      } catch (error) {
        return {
          success: false,
          errorMessage:
            error instanceof Error ? error.message : 'Unknown error',
        };
      }
    }

    return {
      success: true,
    };
  }
}
