import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import type { Payment } from '../../../domain/entities/payment.entity';

@Injectable()
export class MercadoPagoService {
  private client: MercadoPagoConfig;
  private preference: Preference;

  constructor(private configService: ConfigService) {
    const accessToken = this.configService.get<string>(
      'MERCADO_PAGO_ACCESS_TOKEN',
    );
    if (!accessToken) {
      throw new Error('MERCADO_PAGO_ACCESS_TOKEN is required');
    }

    this.client = new MercadoPagoConfig({
      accessToken,
    });
    this.preference = new Preference(this.client);
  }

  async createCheckoutPro(payment: Payment): Promise<string> {
    const preferenceData = {
      items: [
        {
          id: payment.id,
          title: payment.description,
          quantity: 1,
          unit_price: payment.amount,
        },
      ],
      payer: {
        email: `${payment.cpf}@example.com`,
      },
      external_reference: payment.id,
      notification_url: `${this.configService.get<string>('BASE_URL') || 'http://localhost:3000'}/payments/webhook`,
    };

    const response = await this.preference.create({ body: preferenceData });
    return (response.init_point as string) || '';
  }
}
