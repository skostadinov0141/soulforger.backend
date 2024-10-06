import { CreateCharacterFieldPathDto } from './create-character-field-path.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCharacterFieldPathDto extends PartialType(
  CreateCharacterFieldPathDto,
) {
  @ApiProperty()
  @IsString()
  _id: string;
}
