import { ApiProperty } from '@nestjs/swagger';
import {
  Equals,
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';

export class UpdateGroup {
  rulebook: Rulebook;

  @ApiProperty()
  @IsString()
  @IsOptional()
  _id?: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @Equals('attribute')
  for: string;
}

export class UpdateAttributeTag {
  rulebook: Rulebook;

  @ApiProperty()
  @IsString()
  @IsOptional()
  _id?: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @Equals('attribute')
  for: string;
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
  @IsObject()
  attributeValue:
    | UpdateTextValueTemplateDto
    | UpdateFixedNumericValueTemplateDto
    | UpdateCalculatedNumericValueTemplateDto;

  @ApiProperty()
  @IsArray()
  @IsObject({ each: true })
  tags: UpdateAttributeTag[];

  @ApiProperty()
  @IsObject()
  group: UpdateGroup;
}
