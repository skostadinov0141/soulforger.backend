import { Prop } from '@nestjs/mongoose';
import { ModifierTypes } from '../../enums/modifier-types.enum';

export class PropertyModifier {
  @Prop()
  correlationId: string;
  @Prop({ type: String, enum: ModifierTypes })
  modifierType: ModifierTypes;
  @Prop()
  expression: string;
}
