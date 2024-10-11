import { Inject, Injectable } from '@nestjs/common';
import { CalculatedNumericValue } from './entities/calculated-numeric-value.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiceRollService } from '../dice-roll/dice-roll.service';
import { RulebookService } from '../rulebook/rulebook.service';
import { CharacterFieldPathService } from '../character-field-path/character-field-path.service';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class CalculatedNumericValueService {
  constructor(
    @InjectModel(CalculatedNumericValue.name)
    private readonly calculatedNumericValueModel: Model<CalculatedNumericValue>,
    @Inject() private readonly rulebookService: RulebookService,
    @Inject()
    private readonly characterFieldPathService: CharacterFieldPathService,
    @Inject() private readonly diceRollService: DiceRollService,
    @Inject() private readonly i18n: I18nService,
  ) {}

  private translate(path: string) {
    return this.i18n.t(path, { lang: I18nContext.current().lang });
  }
}
