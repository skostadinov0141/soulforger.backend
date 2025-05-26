import { Prop } from '@nestjs/mongoose';
import { ModifierTypes } from '../../enums/modifier-types.enum';
import { CharacterLocations } from '../../enums/character-locations.enum';

export class CharacterModifier {
  @Prop()
  correlationId: string;
  @Prop({ type: String, enum: ModifierTypes })
  modifierType: ModifierTypes;
  @Prop()
  targetLocation: CharacterLocations;
  @Prop()
  next?: string;
  @Prop()
  previous?: string;
  @Prop()
  expression: string;
}
