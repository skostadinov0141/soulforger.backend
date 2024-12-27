import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tag } from '../../tag/entities/tag.entity';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';
import { Attribute } from './attribute.entity';
import { Property } from './property.entity';
import { DerivedAttribute } from './derived-attribute.entity';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class CharacterTemplate {
  _id: string;
  createdAt: Date;
  updatedAt: Date;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: Tag.name })
  tags: Tag[];

  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: Rulebook.name })
  rulebook: Rulebook;

  @Prop({ type: [Attribute], required: true })
  attributes: Attribute[];

  @Prop({ type: [Property], required: true })
  properties: Property[];

  @Prop({ type: [DerivedAttribute], required: true })
  derivedAttributes: DerivedAttribute[];
}

export const CharacterTemplateSchema =
  SchemaFactory.createForClass(CharacterTemplate);
export type CharacterTemplateDocument = HydratedDocument<CharacterTemplate>;
