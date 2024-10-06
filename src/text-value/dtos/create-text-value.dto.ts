import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTextValueDto {
  @ApiProperty()
  @IsString()
  rulebook: string;

  @ApiProperty()
  @IsString({ each: true })
  options: string[];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  value?: number;
}
