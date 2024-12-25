import { Schema } from '@nestjs/mongoose';
import { Tag } from '../../tag/entities/tag.entity';

@Schema({ timestamps: true })
export class CharacterTemplate {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  tags: Tag[];
  attributes: any;
  derivedAttributes: any;
  skills: any;
  items: any;
}
