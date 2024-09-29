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

class TextValueDto {
  @ApiProperty()
  @IsString()
  value: string;

  @ApiProperty()
  @IsString()
  options: string[];
}

class FixedNumericValueDto {
  @ApiProperty()
  @IsString()
  value: string;
}

class CalculatedNumericValueDto {
  @ApiProperty()
  @IsString()
  formula: string;

  @ApiProperty()
  variables: CharacterFieldPathDto[];

  @ApiProperty()
  diceRolls: DiceRollDto[];
}

class CharacterFieldPathDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  path: string;
}

class DiceRollDto {
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
