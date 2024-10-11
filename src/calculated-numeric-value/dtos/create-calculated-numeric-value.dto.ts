import { IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCharacterFieldPathDto } from '../../character-field-path/dtos/create-character-field-path.dto';
import { CreateDiceRollDto } from '../../dice-roll/dtos/create-dice-roll.dto';
import { UpdateCharacterFieldPathDto } from '../../character-field-path/dtos/update-character-field-path.dto';
import { UpdateDiceRollDto } from '../../dice-roll/dtos/update-dice-roll.dto';

export class CreateCalculatedNumericValueDto {
  @ApiProperty()
  @IsString()
  rulebook: string;

  @ApiProperty()
  @IsObject({ each: true })
  variables: (CreateCharacterFieldPathDto | UpdateCharacterFieldPathDto)[];

  @ApiProperty()
  @IsObject({ each: true })
  diceRolls: (CreateDiceRollDto | UpdateDiceRollDto)[];

  @ApiProperty()
  @IsString()
  formula: string;
}
