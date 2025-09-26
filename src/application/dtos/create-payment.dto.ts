import { IsString, IsNumber, IsIn, IsNotEmpty, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  amount: number;

  @IsString()
  @IsIn(['PIX', 'CREDIT_CARD'])
  paymentMethod: string;
}
