import { PartialType } from '@nestjs/swagger';
import { CreateDiceRollDto } from './create-dice-roll.dto';

export class UpdateDiceRollDto extends PartialType(CreateDiceRollDto) {}
