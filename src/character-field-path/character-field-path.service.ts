import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CharacterFieldPath } from './entities/character-field-path.entity';
import { Model } from 'mongoose';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { CreateCharacterFieldPathDto } from './dtos/create-character-field-path.dto';
import { RulebookService } from '../rulebook/rulebook.service';
import { UpdateCharacterFieldPathDto } from './dtos/update-character-field-path.dto';

@Injectable()
export class CharacterFieldPathService {
  constructor(
    @InjectModel(CharacterFieldPath.name)
    private readonly characterFieldPathModel: Model<CharacterFieldPath>,
    @Inject() private readonly rulebookService: RulebookService,
    private readonly i18n: I18nService,
  ) {}

  async create(
    payload: CreateCharacterFieldPathDto,
  ): Promise<CharacterFieldPath> {
    const rulebook = await this.rulebookService.findOne(payload.rulebook);
    if (!rulebook) {
      throw new HttpException(
        this.i18n.t('characterFieldPath.errors.rulebookNotFound', {
          lang: I18nContext.current().lang,
        }),
        404,
      );
    }
    const createdCharacterFieldPath = new this.characterFieldPathModel(payload);
    return createdCharacterFieldPath.save();
  }

  async update(
    payload: UpdateCharacterFieldPathDto,
  ): Promise<CharacterFieldPath> {
    const rulebook = await this.rulebookService.findOne(payload.rulebook);
    if (!rulebook) {
      throw new HttpException(
        this.i18n.t('characterFieldPath.errors.rulebookNotFound', {
          lang: I18nContext.current().lang,
        }),
        404,
      );
    }
    const characterFieldPath = await this.characterFieldPathModel.findById(
      payload._id,
    );
    if (!characterFieldPath) {
      throw new HttpException(
        this.i18n.t('characterFieldPath.errors.characterFieldPathNotFound', {
          lang: I18nContext.current().lang,
        }),
        404,
      );
    }
    return this.characterFieldPathModel.findByIdAndUpdate(
      payload._id,
      payload,
      {
        new: true,
      },
    );
  }
}
