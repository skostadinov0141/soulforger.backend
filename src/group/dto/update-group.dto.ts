import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGroupDto } from './create-group.dto';
import { IsString } from 'class-validator';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  @ApiProperty()
  @IsString()
  _id: string;
}
