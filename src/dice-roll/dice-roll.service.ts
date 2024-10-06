import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DiceRoll } from './entities/dice-roll.entity';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Model } from 'mongoose';
import { CreateDiceRollDto } from './dtos/create-dice-roll.dto';
import { RulebookService } from '../rulebook/rulebook.service';
import { UpdateDiceRollDto } from './dtos/update-dice-roll.dto';

@Injectable()
export class DiceRollService {
  constructor(
    @InjectModel(DiceRoll.name) private readonly diceRollModel: Model<DiceRoll>,
    @Inject() private readonly rulebookService: RulebookService,
    private readonly i18n: I18nService,
  ) {}

  async create(payload: CreateDiceRollDto): Promise<DiceRoll> {
    const rulebook = await this.rulebookService.findOne(payload.rulebook);
    if (!rulebook) {
      throw new HttpException(
        this.i18n.t('dice-roll.errors.rulebookNotFound', {
          lang: I18nContext.current().lang,
        }),
        404,
      );
    }
    const createdDiceRoll = new this.diceRollModel(payload);
    createdDiceRoll.rulebook = rulebook;
    return createdDiceRoll.save();
  }

  async update(payload: UpdateDiceRollDto): Promise<DiceRoll> {
    const rulebook = await this.rulebookService.findOne(payload.rulebook);
    if (!rulebook) {
      throw new HttpException(
        this.i18n.t('dice-roll.errors.rulebookNotFound', {
          lang: I18nContext.current().lang,
        }),
        404,
      );
    }
    const diceRoll = await this.diceRollModel.findById(payload._id).exec();
    if (!diceRoll) {
      throw new HttpException(
        this.i18n.t('dice-roll.errors.diceRollNotFound', {
          lang: I18nContext.current().lang,
        }),
        404,
      );
    }
    return this.diceRollModel.findByIdAndUpdate(payload._id, payload, {
      new: true,
    });
  }
}
