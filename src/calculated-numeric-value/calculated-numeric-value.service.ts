import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CalculatedNumericValue } from './entities/calculated-numeric-value.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiceRollService } from '../dice-roll/dice-roll.service';
import { RulebookService } from '../rulebook/rulebook.service';
import { CharacterFieldPathService } from '../character-field-path/character-field-path.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { CreateCalculatedNumericValueDto } from './dtos/create-calculated-numeric-value.dto';
import { UpdateCalculatedNumericValueDto } from './dtos/update-calculated-numeric-value.dto';
import { CreateCharacterFieldPathDto } from '../character-field-path/dtos/create-character-field-path.dto';
import { CreateDiceRollDto } from '../dice-roll/dtos/create-dice-roll.dto';
import { UpdateDiceRollDto } from '../dice-roll/dtos/update-dice-roll.dto';
import { UpdateCharacterFieldPathDto } from '../character-field-path/dtos/update-character-field-path.dto';

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

  private translate(path: string): string {
    return this.i18n.t(path, { lang: I18nContext.current().lang });
  }

  async create(
    payload: CreateCalculatedNumericValueDto,
  ): Promise<CalculatedNumericValue> {
    const rulebook = await this.rulebookService.findOne(payload.rulebook);
    if (!rulebook) {
      throw new HttpException(
        this.translate('rulebook.errors.rulebookNotFound'),
        404,
      );
    }
    const calculatedNumericValue = new this.calculatedNumericValueModel(
      payload,
    );
    calculatedNumericValue.rulebook = rulebook;
    calculatedNumericValue.variables =
      await this.createOrUpdateCharacterFieldPath(payload.variables);
    calculatedNumericValue.diceRolls = await this.createOrUpdateDiceRoll(
      payload.diceRolls,
    );
    return calculatedNumericValue.save();
  }

  async update(
    payload: UpdateCalculatedNumericValueDto,
  ): Promise<CalculatedNumericValue> {
    const calculatedNumericValue =
      await this.calculatedNumericValueModel.findById(payload._id);
    if (!calculatedNumericValue) {
      throw new HttpException(
        this.translate(
          'calculatedNumericValue.errors.calculatedNumericValueNotFound',
        ),
        404,
      );
    }
    const rulebook = await this.rulebookService.findOne(payload.rulebook);
    if (!rulebook) {
      throw new HttpException(
        this.translate('rulebook.errors.rulebookNotFound'),
        404,
      );
    }
    calculatedNumericValue.rulebook = rulebook;
    calculatedNumericValue.variables =
      await this.createOrUpdateCharacterFieldPath(payload.variables);
    calculatedNumericValue.diceRolls = await this.createOrUpdateDiceRoll(
      payload.diceRolls,
    );
    calculatedNumericValue.formula = payload.formula;
    return calculatedNumericValue.save();
  }

  private async createOrUpdateCharacterFieldPath(
    variables: (CreateCharacterFieldPathDto | UpdateCharacterFieldPathDto)[],
  ) {
    return await Promise.all(
      variables.map(async (variable) => {
        if ((variable as UpdateCalculatedNumericValueDto)._id) {
          return await this.characterFieldPathService.findOne(
            (variable as UpdateCalculatedNumericValueDto)._id,
          );
        } else {
          return await this.characterFieldPathService.create(
            variable as CreateCharacterFieldPathDto,
          );
        }
      }),
    );
  }

  private async createOrUpdateDiceRoll(
    diceRolls: (CreateDiceRollDto | UpdateDiceRollDto)[],
  ) {
    return await Promise.all(
      diceRolls.map(async (diceRoll) => {
        if ((diceRoll as UpdateDiceRollDto)._id) {
          return await this.diceRollService.findOne(
            (diceRoll as UpdateDiceRollDto)._id,
          );
        } else {
          return await this.diceRollService.create(
            diceRoll as CreateDiceRollDto,
          );
        }
      }),
    );
  }
}
