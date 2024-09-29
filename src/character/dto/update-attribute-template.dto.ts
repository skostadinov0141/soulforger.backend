import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAttributeTemplateDto {
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
    | UpdateTextValueTemplateDto
    | UpdateFixedNumericValueTemplateDto
    | UpdateCalculatedNumericValueTemplateDto;
}

export class UpdateTextValueTemplateDto {
  @ApiProperty()
  @IsString()
  _id: string;

  @ApiProperty()
  @IsString()
  rulebook: string;

  @ApiProperty()
  @IsString()
  value: string;

  @ApiProperty()
  @IsString()
  options: string[];
}

export class UpdateFixedNumericValueTemplateDto {
  @ApiProperty()
  @IsString()
  _id: string;

  @ApiProperty()
  @IsString()
  rulebook: string;

  @ApiProperty()
  @IsString()
  value: string;
}

export class UpdateCalculatedNumericValueTemplateDto {
  @ApiProperty()
  @IsString()
  _id: string;

  rulebook?: string;

  @ApiProperty()
  @IsString()
  formula: string;

  @ApiProperty()
  variables: UpdateCharacterFieldPathTemplateDto[];

  @ApiProperty()
  diceRolls: UpdateDiceRollTemplateDto[];
}

export class UpdateCharacterFieldPathTemplateDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  _id?: string;

  rulebook?: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  path: string;
}

export class UpdateDiceRollTemplateDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  _id?: string;

  rulebook?: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  diceSides: number;

  @ApiProperty()
  @IsNumber()
  diceAmount: number;
}
