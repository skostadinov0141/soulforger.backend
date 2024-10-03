import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SearchAttributeTemplateDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  searchString?: string;

  @ApiProperty()
  @IsNumber()
  @IsEnum([1, -1])
  sortOrder: number;

  @ApiProperty()
  @IsString()
  @IsEnum(['name', 'createdAt', 'updatedAt'])
  sortBy: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  includeTags?: string[];

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  excludeTags?: string[];

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  includeGroups?: string[];

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  excludeGroups?: string[];
}
