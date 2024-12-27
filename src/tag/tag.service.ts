import { HttpException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './entities/tag.entity';
import { Model } from 'mongoose';
import { RulebookService } from '../rulebook/rulebook.service';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name) private readonly tagModel: Model<Tag>,
    private readonly rulebookService: RulebookService,
    private readonly i18nService: I18nService,
  ) {}

  translate(path: string) {
    return this.i18nService.translate(path, {
      lang: I18nContext.current().lang || 'en',
    });
  }

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    if (
      await this.tagModel.exists({
        rulebook: createTagDto.rulebook,
        name: createTagDto.name,
      })
    )
      throw new HttpException(this.translate('tag.errors.exists'), 400);
    // ensure rulebook exists
    await this.rulebookService.findOne(createTagDto.rulebook);
    return this.tagModel.create(createTagDto);
  }

  findAll(
    page: number,
    limit: number,
    rulebook: string,
    order: string,
    populateRulebook: boolean,
    search?: string,
    sortBy?: string,
  ): Promise<Tag[]> {
    return this.tagModel
      .find(
        {
          rulebook,
          name: search ? { $regex: search, $options: 'i' } : undefined,
        },
        null,
        {
          skip: page * limit,
          limit,
          sort: sortBy ? { [sortBy]: order } : undefined,
          populate: populateRulebook ? 'rulebook' : undefined,
        },
      )
      .exec();
  }

  async findOne(id: string): Promise<Tag> {
    const tag = await this.tagModel.findById(id).exec();
    if (!tag)
      throw new HttpException(this.translate('tag.errors.notFound'), 404);
    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.tagModel.findById(id).exec();
    if (!tag)
      throw new HttpException(this.translate('tag.errors.notFound'), 404);
    // ensure rulebook exists
    await this.rulebookService.findOne(updateTagDto.rulebook);
    return tag.set(updateTagDto).save();
  }

  remove(id: string): Promise<Tag> {
    if (!this.tagModel.exists({ _id: id }))
      throw new HttpException(this.translate('tag.errors.notFound'), 404);
    return this.tagModel.findByIdAndDelete(id).exec();
  }
}
