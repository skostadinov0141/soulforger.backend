import { Schema } from '@nestjs/mongoose';
import { Tag } from '../../tag/entities/tag.entity';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';
import { Attribute } from './attribute.entity';
import { Property } from './property.entity';

@Schema({ timestamps: true })
export class CharacterTemplate {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  tags: Tag[];
  rulebook: Rulebook;
  attributes: Attribute[];
  properties: Property[];
  derivedAttributes: any;
  skills: any;
  items: any;
}
