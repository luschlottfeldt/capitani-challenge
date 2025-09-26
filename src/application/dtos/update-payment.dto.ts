import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdatePaymentDto {
  @IsOptional()
  @IsString()
  @IsIn(['PENDING', 'PAID', 'FAIL'])
  status?: string;
}
