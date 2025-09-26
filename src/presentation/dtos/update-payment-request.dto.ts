import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdatePaymentRequestDto {
  @IsOptional()
  @IsString()
  @IsIn(['PENDING', 'PAID', 'FAIL'])
  status?: string;
}
