import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FixedNumericValue } from './entities/fixed-numeric-value.entity';
import { Model } from 'mongoose';
import { RulebookService } from '../rulebook/rulebook.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { CreateFixedNumericValueDto } from './dtos/create-fixed-numeric-value.dto';
import { UpdateFixedNumericValueDto } from './dtos/update-fixed-numeric-value.dto';

@Injectable()
export class FixedNumericValueService {
  constructor(
    @InjectModel(FixedNumericValue.name)
    private readonly fixedNumericValueModel: Model<FixedNumericValue>,
    @Inject() private readonly rulebookService: RulebookService,
    private readonly i18n: I18nService,
  ) {}

  async create(
    payload: CreateFixedNumericValueDto,
  ): Promise<FixedNumericValue> {
    const rulebook = await this.rulebookService.findOne(payload.rulebook);
    if (!rulebook) {
      throw new HttpException(
        this.i18n.t('rulebook.errors.rulebookNotFound', {
          lang: I18nContext.current().lang,
        }),
        404,
      );
    }
    const createdFixedNumericValue = new this.fixedNumericValueModel(payload);
    createdFixedNumericValue.rulebook = rulebook;
    return createdFixedNumericValue.save();
  }

  async update(
    payload: UpdateFixedNumericValueDto,
  ): Promise<FixedNumericValue> {
    const rulebook = await this.rulebookService.findOne(payload.rulebook);
    if (!rulebook) {
      throw new HttpException(
        this.i18n.t('rulebook.errors.rulebookNotFound', {
          lang: I18nContext.current().lang,
        }),
        404,
      );
    }
    const fixedNumericValue = await this.fixedNumericValueModel.findById(
      payload._id,
    );
    if (!fixedNumericValue) {
      throw new HttpException(
        this.i18n.t('fixed-numeric-value.errors.fixedNumericValueNotFound', {
          lang: I18nContext.current().lang,
        }),
        404,
      );
    }
    return this.fixedNumericValueModel.findByIdAndUpdate(payload._id, payload, {
      new: true,
    });
  }
}
