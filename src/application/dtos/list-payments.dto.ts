import { IsString, IsOptional } from 'class-validator';

export class ListPaymentsDto {
  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsString()
  paymentMethod?: string;
}
