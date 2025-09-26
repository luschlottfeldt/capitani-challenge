import { IsString, IsOptional, IsIn } from 'class-validator';

export class ListPaymentsRequestDto {
  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsString()
  @IsIn(['PIX', 'CREDIT_CARD'])
  paymentMethod?: string;
}
