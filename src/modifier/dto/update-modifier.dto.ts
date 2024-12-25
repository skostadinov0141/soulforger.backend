import { PartialType } from '@nestjs/swagger';
import { CreateModifierDto } from './create-modifier.dto';

export class UpdateModifierDto extends PartialType(CreateModifierDto) {
  /**
   * Is the modifier enabled.
   *
   * @example true
   */
  enabled: boolean;
}
