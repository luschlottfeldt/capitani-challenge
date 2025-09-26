import {
  IsString,
  IsNumber,
  IsPositive,
  IsIn,
  IsNotEmpty,
} from 'class-validator';
import { IsCPF } from 'class-validator-cpf';

export class CreatePaymentRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsCPF()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['PIX', 'CREDIT_CARD'])
  paymentMethod: string;
}
