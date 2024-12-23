import { IsOptional, IsString, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateTagDto {
  /**
   * The name of the tag.
   * @example 'Board Games'
   */
  @Length(4, 32, {
    message: i18nValidationMessage('tag.validation.nameLength'),
  })
  name: string;

  /**
   * The rulebook associated with the tag.
   * @example '676861133aa08216967be40b'
   */
  @IsString()
  rulebook: string;

  /**
   * The color of the tag.
   * @example '#FF0000'
   */
  @IsOptional()
  @Length(4, 32, {
    message: i18nValidationMessage('tag.validation.colorLength'),
  })
  color: string;

  /**
   * The icon of the tag.
   * @example 'mdi-chess'
   */
  @IsOptional()
  @Length(2, 64, {
    message: i18nValidationMessage('tag.validation.iconLength'),
  })
  icon?: string;

  /**
   * The description of the tag.
   * @example 'A collection of board games.'
   */
  @IsOptional()
  @Length(4, 128, {
    message: i18nValidationMessage('tag.validation.descriptionLength'),
  })
  description?: string;
}
