import { Prop, Schema } from '@nestjs/mongoose';
import { Tag } from '../../tag/entities/tag.entity';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';
import { Attribute } from './attribute.entity';
import { Property } from './property.entity';
import { DerivedAttribute } from './derived-attribute.entity';

@Schema({ timestamps: true })
export class CharacterTemplate {
  _id: string;
  createdAt: Date;
  updatedAt: Date;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [Tag], required: true, ref: Tag.name })
  tags: Tag[];

  @Prop({ required: true, ref: Rulebook.name })
  rulebook: Rulebook;

  @Prop({ type: [Attribute], required: true })
  attributes: Attribute[];

  @Prop({ type: [Property], required: true })
  properties: Property[];

  @Prop({ type: [DerivedAttribute], required: true })
  derivedAttributes: DerivedAttribute[];

  @Prop({ required: true })
  skills: any;

  @Prop({ required: true })
  items: any;
}
