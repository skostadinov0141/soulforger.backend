import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFixedNumericValueDto {
  @ApiProperty()
  @IsString()
  rulebook: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  value?: number;
}
