import { PartialType } from '@nestjs/swagger';
import { CreateAttributeTemplateDto } from './create-attribute-template.dto';

export class UpdateAttributeTemplateDto extends PartialType(
  CreateAttributeTemplateDto,
) {}
