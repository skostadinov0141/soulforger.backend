import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { UpdateTagDto } from '../../tag/dto/update-tag.dto';
import { UpdateGroupDto } from '../../group/dto/update-group.dto';

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
  tags: UpdateTagDto[];

  @ApiProperty()
  @IsObject()
  group: UpdateGroupDto;
}
