import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsObject, IsString } from 'class-validator';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';
import { UpdateTagDto } from '../../tag/dto/update-tag.dto';
import { UpdateGroupDto } from '../../group/dto/update-group.dto';

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
  tags: UpdateTagDto[];

  @ApiProperty()
  @IsObject()
  group: UpdateGroupDto;
}
