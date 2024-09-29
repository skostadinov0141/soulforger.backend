import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateAttributeDto {
  @ApiProperty()
  @IsString()
  rulebook: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  @IsEnum(['FixedNumericValue', 'TextValue', 'CalculatedNumericValue'])
  attributeType: string;

  @ApiProperty()
  @IsString()
  attributeValue:
    | TextValueDto
    | FixedNumericValueDto
    | CalculatedNumericValueDto;
}

export class TextValueDto {
  @ApiProperty()
  @IsString()
  value: string;

  @ApiProperty()
  @IsString()
  options: string[];
}

export class FixedNumericValueDto {
  @ApiProperty()
  @IsString()
  value: string;
}

export class CalculatedNumericValueDto {
  @ApiProperty()
  @IsString()
  formula: string;

  @ApiProperty()
  variables: CharacterFieldPathDto[];

  @ApiProperty()
  diceRolls: DiceRollDto[];
}

export class CharacterFieldPathDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  path: string;
}

export class DiceRollDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  diceSides: number;

  @ApiProperty()
  @IsNumber()
  diceAmount: string;
}
