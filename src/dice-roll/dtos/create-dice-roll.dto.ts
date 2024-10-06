import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDiceRollDto {
  @ApiProperty()
  @IsString()
  rulebook: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  diceSides: number;

  @ApiProperty()
  @IsNumber()
  diceAmount: number;

  @ApiProperty()
  @IsNumber()
  modifier: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  value?: number;
}
