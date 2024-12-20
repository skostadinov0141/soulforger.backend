import { HttpException, Injectable } from '@nestjs/common';
import { CreateRulebookDto } from './dto/create-rulebook.dto';
import { UpdateRulebookDto } from './dto/update-rulebook.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { InjectModel } from '@nestjs/mongoose';
import { Rulebook } from './entities/rulebook.entity';
import { Model } from 'mongoose';

@Injectable()
export class RulebookService {
  constructor(
    private readonly i18n: I18nService,
    @InjectModel(Rulebook.name) private readonly rulebookModel: Model<Rulebook>,
  ) {}

  translate(path: string) {
    return this.i18n.t(path, { lang: I18nContext.current()?.lang || 'en' });
  }

  async create(createPayload: CreateRulebookDto): Promise<Rulebook> {
    if (await this.rulebookModel.exists({ name: createPayload.name }))
      throw new HttpException(this.translate('rulebook.errors.exists'), 409);
    return this.rulebookModel.create(createPayload);
  }

  findAll(page: number, limit: number): Promise<Rulebook[]> {
    return this.rulebookModel
      .find({}, null, { skip: page * limit, limit: limit })
      .exec();
  }

  async findOne(id: string): Promise<Rulebook> {
    const rulebook = await this.rulebookModel.findById(id).exec();
    if (!rulebook)
      throw new HttpException(this.translate('rulebook.errors.notFound'), 404);
    return rulebook;
  }

  async update(
    id: string,
    updatePayload: UpdateRulebookDto,
  ): Promise<Rulebook> {
    const model = await this.rulebookModel.findById(id).exec();
    if (!model)
      throw new HttpException(this.translate('rulebook.errors.notFound'), 404);
    model.set(updatePayload);
    return model.save();
  }

  remove(id: string): Promise<Rulebook> {
    return this.rulebookModel.findByIdAndDelete(id).exec();
  }
}
