import { Prop } from '@nestjs/mongoose';
import { TextTranslation } from './text-translation.entity';
import { PropertyTypes } from '../enums/property-types.enum';

export class CharacterProperty {
  @Prop({ enum: PropertyTypes })
  type: PropertyTypes;
  @Prop()
  name: TextTranslation[];
  @Prop()
  description: TextTranslation[];
  // TODO: make an interface for metadata for each type
  @Prop()
  metadata: any;
  @Prop()
  value: any;
}
