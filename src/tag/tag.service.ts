import { HttpException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './entities/tag.entity';
import { Model } from 'mongoose';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) readonly tagModel: Model<Tag>) {}

  create(createTagDto: CreateTagDto) {
    const existingTag = this.tagModel.findOne({
      name: createTagDto.name,
      rulebook: createTagDto.rulebook,
    });
    if (existingTag) {
      throw new HttpException('Tag already exists', 400);
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
