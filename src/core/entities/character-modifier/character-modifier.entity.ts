import { Prop } from '@nestjs/mongoose';
import { ModifierTypes } from '../../enums/modifier-types.enum';

export class CharacterModifier {
  @Prop()
  correlationId: string;
  @Prop({ type: String, enum: ModifierTypes })
  modifierType: ModifierTypes;
  @Prop()
  next: string;
  @Prop()
  previous: string;
  @Prop()
  expression: string;
}
