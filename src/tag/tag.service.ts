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

  create(createTagDto: CreateTagDto) {
    const existingTag = this.tagModel.findOne({
      name: createTagDto.name,
      rulebook: createTagDto.rulebook,
    });
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

  findAll() {
    return `This action returns all tag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
