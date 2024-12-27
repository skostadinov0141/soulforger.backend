import { PartialType } from '@nestjs/swagger';
import { CreateCharacterTemplateDto } from './create-character-template.dto';

export class UpdateCharacterTemplateDto extends PartialType(
  CreateCharacterTemplateDto,
) {}
