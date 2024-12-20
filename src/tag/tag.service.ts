import { HttpException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './entities/tag.entity';
import { Model } from 'mongoose';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name) readonly tagModel: Model<Tag>,
    private readonly i18n: I18nService,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const existingTag = await this.tagModel
      .findOne({
        name: createTagDto.name,
        rulebook: createTagDto.rulebook,
      })
      .exec();
    if (existingTag) {
      throw new HttpException(
        this.i18n.t('tag.errors.tagAlreadyExists', {
          lang: I18nContext.current().lang,
        }),
        400,
      );
    }
    const tag = new this.tagModel(createTagDto);
    return tag.save();
  }

  findAll(): Promise<Tag[]> {
    return this.tagModel.find({}, { __v: 0 }).exec();
  }

  findOne(id: string): Promise<Tag> {
    const result = this.tagModel.findById(id, { __v: 0 }).exec();
    if (!result) {
      throw new HttpException(
        this.i18n.t('tag.errors.tagNotFound', {
          lang: I18nContext.current().lang,
        }),
        400,
      );
    }
    return result;
  }

  findAllByRulebook(rulebook: string): Promise<Tag[]> {
    return this.tagModel.find({ rulebook }, { __v: 0 }).exec();
  }

  update(id: string, updateTagDto: UpdateTagDto) {
    const tag = this.tagModel.findById(id).exec();
    if (!tag) {
      throw new HttpException(
        this.i18n.t('tag.errors.tagNotFound', {
          lang: I18nContext.current().lang,
        }),
        400,
      );
    }
    return this.tagModel
      .findOneAndUpdate({ _id: id }, updateTagDto, {
        new: true,
      })
      .exec();
  }

  async remove(id: string) {
    const result = await this.tagModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new HttpException(
        this.i18n.t('tag.errors.tagNotFound', {
          lang: I18nContext.current().lang,
        }),
        400,
      );
    }
    return result;
  }
}
