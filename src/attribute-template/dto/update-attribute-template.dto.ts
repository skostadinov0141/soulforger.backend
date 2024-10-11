import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateAttributeTemplateDto } from './create-attribute-template.dto';

export class UpdateAttributeTemplateDto extends PartialType(
  CreateAttributeTemplateDto,
) {
  @ApiProperty()
  @IsString()
  _id: string;
}
