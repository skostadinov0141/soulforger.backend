import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCharacterFieldPathDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  rulebook: string;

  @ApiProperty()
  @IsString()
  path: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  value?: number;
}
