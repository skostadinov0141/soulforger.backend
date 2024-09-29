import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';

export class CreateAttributeTemplateDto {
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
    | TextValueTemplateDto
    | FixedNumericValueTemplateDto
    | CalculatedNumericValueTemplateDto;
}

export class TextValueTemplateDto {
  rulebook: Rulebook;

  @ApiProperty()
  @IsString()
  value: string;

  @ApiProperty()
  @IsString()
  options: string[];
}

export class FixedNumericValueTemplateDto {
  rulebook: Rulebook;

  @ApiProperty()
  @IsString()
  value: string;
}

export class CalculatedNumericValueTemplateDto {
  rulebook: Rulebook;

  @ApiProperty()
  @IsString()
  formula: string;

  @ApiProperty()
  variables: CharacterFieldPathTemplateDto[];

  @ApiProperty()
  diceRolls: DiceRollTemplateDto[];
}

export class CharacterFieldPathTemplateDto {
  rulebook: Rulebook;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  path: string;
}

export class DiceRollTemplateDto {
  rulebook: Rulebook;

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
