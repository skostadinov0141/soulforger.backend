import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import mongoose, { HydratedDocument } from 'mongoose';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';

@Schema({ timestamps: true })
export class Tag {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  @Prop()
  @Length(4, 32, {
    message: i18nValidationMessage('tag.validation.nameLength'),
  })
  name: string;

  @ApiProperty()
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: Rulebook.name,
  })
  rulebook: Rulebook;

  @ApiProperty()
  @Prop()
  @IsOptional()
  @Length(4, 32, {
    message: i18nValidationMessage('tag.validation.colorLength'),
  })
  color: string;

  @ApiProperty()
  @Prop()
  @IsOptional()
  @Length(2, 64, {
    message: i18nValidationMessage('tag.validation.iconLength'),
  })
  icon?: string;

  @ApiProperty()
  @Prop()
  @IsOptional()
  @Length(4, 128, {
    message: i18nValidationMessage('tag.validation.descriptionLength'),
  })
  description?: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
export type TagDocument = HydratedDocument<Tag>;
