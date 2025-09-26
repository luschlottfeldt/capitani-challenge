export class PaymentResponseDto {
  id: string;
  cpf: string;
  description: string;
  amount: number;
  paymentMethod: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
