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
  @IsObject()
  attributeValue:
    | CreateAttributeTextValueTemplateDto
    | CreateAttributeFixedNumericValueTemplateDto
    | CreateAttributeCalculatedNumericValueTemplateDto;

  @ApiProperty()
  @IsArray()
  @IsObject({ each: true })
  tags: CreateAttributeTag[];

  @ApiProperty()
  @IsObject()
  group: CreateAttributeGroup;
}

export class CreateAttributeTag {
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

export class CreateAttributeGroup {
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

export class CreateAttributeTextValueTemplateDto {
  rulebook: Rulebook;

  @ApiProperty()
  @IsString()
  value: string;

  @ApiProperty()
  @IsString()
  options: string[];
}

export class CreateAttributeFixedNumericValueTemplateDto {
  rulebook: Rulebook;

  @ApiProperty()
  @IsString()
  value: string;
}

export class CreateAttributeCalculatedNumericValueTemplateDto {
  rulebook: Rulebook;

  @ApiProperty()
  @IsString()
  formula: string;

  @ApiProperty()
  variables: CreateAttributeCharacterFieldPathTemplateDto[];

  @ApiProperty()
  diceRolls: CreateAttributeDiceRollTemplateDto[];
}

export class CreateAttributeCharacterFieldPathTemplateDto {
  rulebook: Rulebook;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  path: string;
}

export class CreateAttributeDiceRollTemplateDto {
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
