import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsObject, IsString } from 'class-validator';
import { UpdateTagDto } from '../../tag/dto/update-tag.dto';
import { UpdateGroupDto } from '../../group/dto/update-group.dto';
import { CreateTextValueDto } from '../../text-value/dtos/create-text-value.dto';
import { CreateFixedNumericValueDto } from '../../fixed-numeric-value/dtos/create-fixed-numeric-value.dto';
import { CreateCalculatedNumericValueDto } from '../../calculated-numeric-value/dtos/create-calculated-numeric-value.dto';
import { UpdateTextValueDto } from '../../text-value/dtos/update-text-value.dto';
import { UpdateFixedNumericValueDto } from '../../fixed-numeric-value/dtos/update-fixed-numeric-value.dto';
import { UpdateCalculatedNumericValueDto } from '../../calculated-numeric-value/dtos/update-calculated-numeric-value.dto';

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
    | CreateTextValueDto
    | CreateFixedNumericValueDto
    | CreateCalculatedNumericValueDto
    | UpdateTextValueDto
    | UpdateFixedNumericValueDto
    | UpdateCalculatedNumericValueDto;

  @ApiProperty()
  @IsArray()
  @IsObject({ each: true })
  tags: UpdateTagDto[];

  @ApiProperty()
  @IsObject()
  group: UpdateGroupDto;
}
