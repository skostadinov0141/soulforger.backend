import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TextValue } from './entities/text-value.entity';
import { Model } from 'mongoose';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { RulebookService } from '../rulebook/rulebook.service';
import { CreateTextValueDto } from './dtos/create-text-value.dto';
import { UpdateTextValueDto } from './dtos/update-text-value.dto';

@Injectable()
export class TextValueService {
  constructor(
    @InjectModel(TextValue.name)
    private readonly textValueModel: Model<TextValue>,
    @Inject() private readonly rulebookService: RulebookService,
    private readonly i18n: I18nService,
  ) {}

  async create(payload: CreateTextValueDto): Promise<TextValue> {
    const rulebook = await this.rulebookService.findOne(payload.rulebook);
    if (!rulebook) {
      throw new HttpException(
        this.i18n.t('rulebook.errors.rulebookNotFound', {
          lang: I18nContext.current().lang,
        }),
        404,
      );
    }
    const createdTextValue = new this.textValueModel(payload);
    createdTextValue.rulebook = rulebook;
    return createdTextValue.save();
  }

  async update(payload: UpdateTextValueDto): Promise<TextValue> {
    const rulebook = await this.rulebookService.findOne(payload.rulebook);
    if (!rulebook) {
      throw new HttpException(
        this.i18n.t('rulebook.errors.rulebookNotFound', {
          lang: I18nContext.current().lang,
        }),
        404,
      );
    }
    const textValue = await this.textValueModel.findById(payload._id);
    if (!textValue) {
      throw new HttpException(
        this.i18n.t('text-value.errors.textValueNotFound', {
          lang: I18nContext.current().lang,
        }),
        404,
      );
    }
    return this.textValueModel.findByIdAndUpdate(payload._id, payload, {
      new: true,
    });
  }
}
