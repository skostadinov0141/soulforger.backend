import { Tag } from '../../tag/entities/tag.entity';
import { Prop } from '@nestjs/mongoose';

export class Variable {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  targetId: string;

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
