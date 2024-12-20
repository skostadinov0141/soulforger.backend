import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateTagDto {
  @ApiProperty()
  @Length(4, 32, {
    message: i18nValidationMessage('tag.validation.nameLength'),
  })
  name: string;

  @ApiProperty()
  @IsString()
  rulebook: string;

  @ApiProperty()
  @IsOptional()
  @Length(4, 32, {
    message: i18nValidationMessage('tag.validation.colorLength'),
  })
  color: string;

  @ApiProperty()
  @IsOptional()
  @Length(2, 64, {
    message: i18nValidationMessage('tag.validation.iconLength'),
  })
  icon?: string;

  @ApiProperty()
  @IsOptional()
  @Length(4, 128, {
    message: i18nValidationMessage('tag.validation.descriptionLength'),
  })
  description?: string;
}
