import { Prop } from '@nestjs/mongoose';
import { TextTranslation } from './text-translation.entity';
import { PropertyTypes } from '../enums/property-types.enum';
import { DerivedNumberMetadata } from './derived-number-metadata.entity';
import { NumberMetadata } from './number-metadata.entity';
import { TextMetadata } from './text-metadata.entity';
import { BooleanMetadata } from './boolean-metadata.entity';

export class CharacterProperty {
  @Prop({ enum: PropertyTypes })
  type: PropertyTypes;
  @Prop()
  correlationId: string;
  @Prop()
  name: TextTranslation[];
  @Prop()
  description: TextTranslation[];
  @Prop()
  metadata:
    | DerivedNumberMetadata
    | NumberMetadata
    | TextMetadata
    | BooleanMetadata;
  @Prop()
  value: any;
}
