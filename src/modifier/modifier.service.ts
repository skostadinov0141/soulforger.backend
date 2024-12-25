import { HttpException, Injectable } from '@nestjs/common';
import { CreateModifierDto } from './dto/create-modifier.dto';
import { UpdateModifierDto } from './dto/update-modifier.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Modifier, ModifierDocument } from './entities/modifier.entity';
import { Model } from 'mongoose';
import { RulebookService } from '../rulebook/rulebook.service';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class ModifierService {
  constructor(
    @InjectModel(Modifier.name) private modifierModel: Model<ModifierDocument>,
    private readonly rulebookService: RulebookService,
    private readonly i18nService: I18nService,
  ) {}

  translate(key: string) {
    return this.i18nService.translate(key, {
      lang: I18nContext.current().lang || 'en',
    });
  }

  async create(createModifierDto: CreateModifierDto) {
    const rulebook = await this.rulebookService.findOne(
      createModifierDto.rulebook,
    );
    return this.modifierModel.create({
      ...createModifierDto,
      rulebook: rulebook,
    });
  }

  async findAll(rulebook: string, page: number, limit: number) {
    await this.rulebookService.findOne(rulebook);
    return this.modifierModel
      .find({ rulebook }, null, { limit, skip: page * limit })
      .exec();
  }

  async findOne(id: string) {
    const modifier = await this.modifierModel.findById(id).exec();
    if (!modifier) {
      throw new HttpException(this.translate('modifier.errors.notFound'), 404);
    }
    return modifier;
  }

  async update(id: string, updateModifierDto: UpdateModifierDto) {
    const rulebook = await this.rulebookService.findOne(
      updateModifierDto.rulebook,
    );
    const modifier = await this.modifierModel.findById(id).exec();
    if (!modifier) {
      throw new HttpException(this.translate('modifier.errors.notFound'), 404);
    }
    modifier.set({
      ...updateModifierDto,
      rulebook: rulebook._id,
    });
    return modifier.save();
  }

  async remove(id: number) {
    const modifier = await this.modifierModel.findById(id).exec();
    if (!modifier) {
      throw new HttpException(this.translate('modifier.errors.notFound'), 404);
    }
    return this.modifierModel.findByIdAndDelete(id).exec();
  }
}
