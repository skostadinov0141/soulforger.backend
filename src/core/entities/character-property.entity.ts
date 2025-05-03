import { Prop, Schema } from '@nestjs/mongoose';
import { TextTranslation } from './text-translation.entity';
import { PropertyTypes } from '../enums/property-types.enum';

@Schema({ timestamps: true })
export class CharacterProperty {
  _id: string;
  createdAt: Date;
  updatedAt: Date;

  @Prop({ enum: PropertyTypes })
  type: PropertyTypes;
  @Prop()
  name: TextTranslation[];
  @Prop()
  description: TextTranslation[];
}
