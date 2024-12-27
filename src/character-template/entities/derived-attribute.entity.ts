import { Tag } from '../../tag/entities/tag.entity';
import { Prop } from '@nestjs/mongoose';

export enum CharacterLocations {
  ATTRIBUTE = 'attributes',
  DERIVED_ATTRIBUTE = 'derivedAttributes',
}

export class Variable {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: CharacterLocations })
  location: CharacterLocations;

  @Prop({ required: true })
  targetName: string;

  @Prop({ required: true })
  variableId: string;
}

export class DerivedAttribute {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [Tag], required: true, ref: Tag.name })
  tags: Tag[];

  @Prop({ required: true })
  variables: Variable[];

  @Prop({ required: true })
  formula: string;
}
