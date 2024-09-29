import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FixedNumericValue } from '../entities/fixed-numeric-value.entity';
import { Model } from 'mongoose';
import { TextValue } from '../entities/text-value.entity';
import { CharacterFieldPath } from '../entities/character-field-path.entity';
import { DiceRoll } from '../entities/dice-roll.entity';
import { CalculatedNumericValue } from '../entities/calculated-numeric-value.entity';

@Injectable()
export class AttributeService {
  constructor(
    @InjectModel(FixedNumericValue.name)
    private fixedNumericValueModel: Model<FixedNumericValue>,
    @InjectModel(TextValue.name) private textValueModel: Model<TextValue>,
    @InjectModel(CharacterFieldPath.name)
    private characterFieldPathModel: Model<CharacterFieldPath>,
    @InjectModel(DiceRoll.name) private diceRollModel: Model<DiceRoll>,
    @InjectModel(CalculatedNumericValue.name)
    private calculatedNumericValueModel: Model<CalculatedNumericValue>,
  ) {}

  create() {}

  findAll() {}

  findOne() {}

  update() {}
}
