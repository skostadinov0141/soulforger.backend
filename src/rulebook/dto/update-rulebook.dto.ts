import { PartialType } from '@nestjs/swagger';
import { CreateRulebookDto } from './create-rulebook.dto';

export class UpdateRulebookDto extends PartialType(CreateRulebookDto) {}
