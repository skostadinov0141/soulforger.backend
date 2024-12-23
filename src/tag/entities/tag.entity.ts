import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import mongoose, { HydratedDocument } from 'mongoose';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';

@Schema({ timestamps: true })
export class Tag {
  /**
   * The unique identifier of the tag.
   * @example '676861133aa08216967be40b'
   */
  _id: string;

  /**
   * The date and time the tag was created.
   * @example '2021-10-01T00:00:00.000Z'
   */
  createdAt: Date;

  /**
   * The date and time the tag was last updated.
   * @example '2021-10-01T00:00:00.000Z'
   */
  updatedAt: Date;

  /**
   * The name of the tag.
   * @example 'Board Games'
   */
  @Prop()
  @Length(4, 32, {
    message: i18nValidationMessage('tag.validation.nameLength'),
  })
  name: string;

  /**
   * The rulebook associated with the tag.
   * @example '676861133aa08216967be40b'
   */
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: Rulebook.name,
  })
  rulebook: Rulebook;

  /**
   * The color of the tag.
   * @example '#FF0000'
   */
  @Prop()
  @IsOptional()
  @Length(4, 32, {
    message: i18nValidationMessage('tag.validation.colorLength'),
  })
  color: string;

  /**
   * The icon of the tag.
   * @example 'mdi-chess'
   */
  @Prop()
  @IsOptional()
  @Length(2, 64, {
    message: i18nValidationMessage('tag.validation.iconLength'),
  })
  icon?: string;

  /**
   * The description of the tag.
   * @example 'A collection of board games.'
   */
  @Prop()
  @IsOptional()
  @Length(4, 128, {
    message: i18nValidationMessage('tag.validation.descriptionLength'),
  })
  description?: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
export type TagDocument = HydratedDocument<Tag>;
